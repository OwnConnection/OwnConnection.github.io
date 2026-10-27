import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY");
  const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY");
  const vapidSubject = Deno.env.get("VAPID_SUBJECT");
  const appUrl = Deno.env.get("APP_URL");
  if (!supabaseUrl || !serviceRoleKey || !vapidPublicKey || !vapidPrivateKey || !vapidSubject || !appUrl) {
    return jsonResponse({ error: "Push sender is not configured" }, 503);
  }

  const authorization = request.headers.get("Authorization") || "";
  const accessToken = authorization.replace(/^Bearer\s+/i, "");
  if (!accessToken) return jsonResponse({ error: "Authentication required" }, 401);

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: authData, error: authError } = await admin.auth.getUser(accessToken);
  if (authError || !authData.user) return jsonResponse({ error: "Invalid session" }, 401);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  const type = body.type;
  const chatId = String(body.chatId || "");
  const targetUserId = String(body.targetUserId || "");
  const callId = String(body.callId || "");
  const messageId = String(body.messageId || "");
  const senderId = authData.user.id;
  if (!chatId || !targetUserId || targetUserId === senderId || !["message", "incoming-call"].includes(String(type))) {
    return jsonResponse({ error: "Invalid notification request" }, 400);
  }

  const [{ data: chat, error: chatError }, { data: members, error: membersError }] = await Promise.all([
    admin.from("direct_chats").select("id, chat_type").eq("id", chatId).maybeSingle(),
    admin.from("direct_chat_members").select("user_id").eq("chat_id", chatId),
  ]);
  if (chatError || membersError) return jsonResponse({ error: "Could not verify chat" }, 500);
  const memberIds = new Set((members || []).map((member) => member.user_id));
  if (!chat || !memberIds.has(senderId) || !memberIds.has(targetUserId) || (type === "incoming-call" && chat.chat_type !== "direct")) {
    return jsonResponse({ error: "Not allowed for this chat" }, 403);
  }

  const [{ data: senderBlockedTarget, error: firstBlockError }, { data: targetBlockedSender, error: secondBlockError }] = await Promise.all([
    admin.from("user_blocks").select("blocker_id").eq("blocker_id", senderId).eq("blocked_id", targetUserId).maybeSingle(),
    admin.from("user_blocks").select("blocker_id").eq("blocker_id", targetUserId).eq("blocked_id", senderId).maybeSingle(),
  ]);
  if (firstBlockError || secondBlockError) return jsonResponse({ error: "Could not verify block status" }, 500);
  if (senderBlockedTarget || targetBlockedSender) return jsonResponse({ sent: 0, registered: 0 });

  let title = "СвояСвязь";
  let message = "Новое сообщение";
  let tag = `chat-${chatId}`;
  let callUrl = new URL(appUrl);
  callUrl.searchParams.set("openChatId", chatId);

  if (type === "incoming-call") {
    if (!callId) return jsonResponse({ error: "Call id is required" }, 400);
    const { data: callerLog, error: logError } = await admin
      .from("call_logs")
      .select("id, started_at")
      .eq("call_id", callId)
      .eq("user_id", senderId)
      .eq("chat_id", chatId)
      .eq("direction", "outgoing")
      .eq("status", "ringing")
      .gte("started_at", new Date(Date.now() - 2 * 60 * 1000).toISOString())
      .maybeSingle();
    if (logError || !callerLog) return jsonResponse({ error: "Call is no longer ringing" }, 409);

    const { error: recipientLogError } = await admin.from("call_logs").upsert({
      call_id: callId,
      user_id: targetUserId,
      chat_id: chatId,
      partner_id: senderId,
      direction: "incoming",
      status: "ringing",
    }, { onConflict: "call_id,user_id" });
    if (recipientLogError) return jsonResponse({ error: "Could not register incoming call" }, 500);

    const { data: callerProfile } = await admin.from("profiles").select("display_name").eq("id", senderId).maybeSingle();
    title = "Входящий звонок";
    message = `${callerProfile?.display_name || "Собеседник"} звонит вам`;
    tag = `call-${callId}`;
    callUrl.searchParams.set("incomingCall", callId);
    callUrl.searchParams.set("chatId", chatId);
    callUrl.searchParams.set("callerId", senderId);
  } else {
    if (!messageId) return jsonResponse({ error: "Message id is required" }, 400);
    const { data: newMessage, error: messageError } = await admin
      .from("messages")
      .select("id, content, attachment_url, sticker_url, created_at")
      .eq("id", messageId)
      .eq("chat_id", chatId)
      .eq("sender_id", senderId)
      .gte("created_at", new Date(Date.now() - 2 * 60 * 1000).toISOString())
      .maybeSingle();
    if (messageError || !newMessage) return jsonResponse({ error: "Message not found" }, 403);
    message = newMessage.content || (newMessage.sticker_url ? "Стикер" : newMessage.attachment_url ? "Вложение" : "Новое сообщение");
    callUrl.searchParams.set("openChatId", chatId);
  }

  const { data: subscriptions, error: subscriptionsError } = await admin
    .from("push_subscriptions")
    .select("endpoint, subscription")
    .eq("user_id", targetUserId);
  if (subscriptionsError) return jsonResponse({ error: "Could not load subscriptions" }, 500);

  webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
  const payload = JSON.stringify({
    title,
    body: message.slice(0, 180),
    tag,
    requireInteraction: type === "incoming-call",
    data: {
      type,
      chatId,
      callId: type === "incoming-call" ? callId : null,
      url: callUrl.href,
    },
  });

  const results = await Promise.all((subscriptions || []).map(async (row) => {
    try {
      await webpush.sendNotification(row.subscription, payload, { TTL: type === "incoming-call" ? 45 : 60 * 60 });
      return true;
    } catch (error) {
      const statusCode = Number((error as { statusCode?: number }).statusCode || 0);
      if (statusCode === 404 || statusCode === 410) {
        await admin.from("push_subscriptions").delete().eq("endpoint", row.endpoint);
      }
      console.error("Web Push delivery failed:", statusCode);
      return false;
    }
  }));

  return jsonResponse({ sent: results.filter(Boolean).length, registered: results.length });
});
