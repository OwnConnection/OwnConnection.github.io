const config = window.SVOYSVYAZ_SUPABASE || {};
const callAudio = window.SVOYSVYAZ_AUDIO;
const elements = {
  setupBanner: document.getElementById("setup-banner"),
  authScreen: document.getElementById("auth-screen"),
  appShell: document.getElementById("app-shell"),
  registerTab: document.getElementById("register-tab"),
  loginTab: document.getElementById("login-tab"),
  registerForm: document.getElementById("register-form"),
  loginForm: document.getElementById("login-form"),
  registerEmail: document.getElementById("register-email"),
  registerPassword: document.getElementById("register-password"),
  registerUsername: document.getElementById("register-username"),
  registerDisplayName: document.getElementById("register-display-name"),
  loginEmail: document.getElementById("login-email"),
  loginPassword: document.getElementById("login-password"),
  authStatus: document.getElementById("auth-status"),
  profileBadge: document.getElementById("profile-badge"),
  profileAvatar: document.getElementById("profile-avatar"),
  profileBadgeLetter: document.getElementById("profile-badge-letter"),
  profileName: document.getElementById("profile-name"),
  profileUsername: document.getElementById("profile-username"),
  mobileOwnProfileAvatarImage: document.getElementById("mobile-own-profile-avatar-image"),
  mobileOwnProfileAvatarLetter: document.getElementById("mobile-own-profile-avatar-letter"),
  mobileOwnProfileName: document.getElementById("mobile-own-profile-name"),
  mobileOwnProfileUsername: document.getElementById("mobile-own-profile-username"),
  profileForm: document.getElementById("profile-form"),
  profileDisplayNameInput: document.getElementById("profile-display-name-input"),
  profileBioInput: document.getElementById("profile-bio-input"),
  profileAvatarInput: document.getElementById("profile-avatar-input"),
  profileAvatarStatus: document.getElementById("profile-avatar-status"),
  notificationStatus: document.getElementById("notification-status"),
  enableNotifications: document.getElementById("enable-notifications"),
  logoutButton: document.getElementById("logout-button"),
  userSearchForm: document.getElementById("user-search-form"),
  userSearchInput: document.getElementById("user-search-input"),
  searchResults: document.getElementById("search-results"),
  roomForm: document.getElementById("room-form"),
  roomType: document.getElementById("room-type"),
  roomTitle: document.getElementById("room-title"),
  roomMembers: document.getElementById("room-members"),
  roomStatus: document.getElementById("room-status"),
  chatList: document.getElementById("chat-list"),
  mobileChatSearch: document.getElementById("mobile-chat-search"),
  mobileChatAvatar: document.getElementById("mobile-chat-avatar"),
  mobileBackButton: document.getElementById("mobile-back-button"),
  mobileProfileTrigger: document.getElementById("mobile-profile-trigger"),
  mobileProfileModal: document.getElementById("mobile-profile-modal"),
  mobileProfileClose: document.getElementById("mobile-profile-close"),
  mobileProfileAvatar: document.getElementById("mobile-profile-avatar"),
  mobileProfileName: document.getElementById("mobile-profile-name"),
  mobileProfileBio: document.getElementById("mobile-profile-bio"),
  mobileProfilePresence: document.getElementById("mobile-profile-presence"),
  mobileProfileBlock: document.getElementById("mobile-profile-block"),
  themeToggleDesktop: document.getElementById("theme-toggle-desktop"),
  themeToggleMobile: document.getElementById("theme-toggle-mobile"),
  themeToggleAuth: document.getElementById("theme-toggle-auth"),
  audioPlayerBar: document.getElementById("audio-player-bar"),
  audioPlayerClose: document.getElementById("audio-player-close"),
  audioPlayerToggle: document.getElementById("audio-player-toggle"),
  audioPlayerName: document.getElementById("audio-player-name"),
  musicPlayer: document.getElementById("music-player"),
  imageViewer: document.getElementById("image-viewer"),
  imageViewerClose: document.getElementById("image-viewer-close"),
  imageViewerStage: document.getElementById("image-viewer-stage"),
  imageViewerImage: document.getElementById("image-viewer-image"),
  imageViewerCaption: document.getElementById("image-viewer-caption"),
  imageViewerZoomOut: document.getElementById("image-viewer-zoom-out"),
  imageViewerZoomReset: document.getElementById("image-viewer-zoom-reset"),
  imageViewerZoomIn: document.getElementById("image-viewer-zoom-in"),
  recordingIndicator: document.getElementById("recording-indicator"),
  recordingTime: document.getElementById("recording-time"),
  refreshChats: document.getElementById("refresh-chats"),
  messageSearchForm: document.getElementById("message-search-form"),
  messageSearchInput: document.getElementById("message-search-input"),
  messageSearchResults: document.getElementById("message-search-results"),
  activeChatTitle: document.getElementById("active-chat-title"),
  activeChatMeta: document.getElementById("active-chat-meta"),
  callButton: document.getElementById("call-button"),
  refreshMessages: document.getElementById("refresh-messages"),
  messageList: document.getElementById("message-list"),
  messageEditOverlay: document.getElementById("message-edit-overlay"),
  messageEditOverlayAction: document.querySelector("[data-edit-long-press]"),
  composerForm: document.getElementById("composer-form"),
  attachmentInput: document.getElementById("attachment-input"),
  messageInput: document.getElementById("message-input"),
  attachmentStatus: document.getElementById("attachment-status"),
  sendButton: document.getElementById("send-button"),
  cancelEditButton: document.getElementById("cancel-edit-button"),
  chatInfoCard: document.getElementById("chat-info-card"),
  stickerForm: document.getElementById("sticker-form"),
  stickerTitleInput: document.getElementById("sticker-title-input"),
  stickerFileInput: document.getElementById("sticker-file-input"),
  saveStickerButton: document.getElementById("save-sticker-button"),
  stickerStatus: document.getElementById("sticker-status"),
  stickerGallery: document.getElementById("sticker-gallery"),
  callHistoryList: document.getElementById("call-history-list"),
  appStatus: document.getElementById("app-status"),
  callOverlay: document.getElementById("call-overlay"),
  collapseCallButton: document.getElementById("collapse-call-button"),
  mobileCallMini: document.getElementById("mobile-call-mini"),
  mobileCallMiniName: document.getElementById("mobile-call-mini-name"),
  mobileCallMiniState: document.getElementById("mobile-call-mini-state"),
  callEyebrow: document.getElementById("call-eyebrow"),
  callTitle: document.getElementById("call-title"),
  callSubtitle: document.getElementById("call-subtitle"),
  callStateBadge: document.getElementById("call-state-badge"),
  callAvatarImage: document.getElementById("call-avatar-image"),
  callAvatarLetter: document.getElementById("call-avatar-letter"),
  toggleMic: document.getElementById("toggle-mic"),
  acceptCall: document.getElementById("accept-call"),
  declineCall: document.getElementById("decline-call"),
  hangupCall: document.getElementById("hangup-call"),
  remoteAudio: document.getElementById("remote-audio"),
};

const state = {
  supabase: null,
  session: null,
  profile: null,
  chats: [],
  activeChatId: null,
  activeMessages: [],
  activeMessagesRequestId: 0,
  chatListChannel: null,
  activeMessagesChannel: null,
  seenMessageIds: new Set(),
  audioContext: null,
  authChangeToken: 0,
  pendingAvatarFile: null,
  pendingAttachmentFile: null,
  pendingStickerFile: null,
  stickers: [],
  allMessages: [],
  blockedUserIds: new Set(),
  blockedByUserIds: new Set(),
  editingMessageId: null,
  longPressMessageId: null,
  messageLongPressTimerId: null,
  messageHoldStartPoint: null,
  lastRenderedChatId: null,
  favoritesEnsuredForUserId: null,
  chatListRefreshTimerId: null,
  callHistory: [],
  hasCallLogs: true,
  callChannel: null,
  callChannelReady: null,
  callChannelStatus: "idle",
  callChannelRetryId: null,
  typingChannel: null,
  typingChannelReady: null,
  typingUsersByChat: new Map(),
  localTypingChatId: null,
  localTypingStopTimerId: null,
  pendingIncomingCallSignals: new Map(),
  currentCall: null,
  callMinimized: false,
  callDurationTimerId: null,
  callCleanupTimerId: null,
  ringbackTimeoutId: null,
  ringtoneTimeoutId: null,
  activeSoundNodes: [],
  profilePresenceChannel: null,
  presenceHeartbeatId: null,
  voiceRecorder: null,
  voiceStream: null,
  voiceChunks: [],
  voiceRecordingRequested: false,
  voiceRecordingCancelled: false,
  voiceRecordingStartedAt: 0,
  voiceRecordingTimerId: null,
  renderedMessageSnapshots: new Map(),
};

const videoPlayerInstances = new Map();
const imageViewerState = {
  scale: 1,
  x: 0,
  y: 0,
  pointers: new Map(),
  pinchDistance: 0,
  panPoint: null,
};

const RTC_CONFIGURATION = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
    },
    {
      urls: "stun:openrelay.metered.ca:80",
    },
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443?transport=tcp",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
  ],
};

const PRESENCE_ACTIVE_WINDOW_MS = 45 * 1000;
const PRESENCE_HEARTBEAT_INTERVAL_MS = 20 * 1000;
const MAX_ATTACHMENT_SIZE = 50 * 1024 * 1024;
const CALL_CHANNEL_SUBSCRIBE_TIMEOUT_MS = 15000;
const CALL_CHANNEL_NAME = "messenger-calls";
const CALL_DISCONNECT_GRACE_MS = 8000;
const TYPING_CHANNEL_NAME = "messenger-typing";
const TYPING_IDLE_TIMEOUT_MS = 1800;

function createCallId() {
  return `call-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

function isConfigReady() {
  return Boolean(config.url && config.anonKey && !String(config.url).includes("PASTE") && !String(config.anonKey).includes("PASTE"));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function publicAssetUrl(bucket, path) {
  const { data } = state.supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

function createSafeSupabaseClient(url, anonKey, options) {
  const client = window.supabase.createClient(url, anonKey, options);
  if (!client || typeof client.rpc !== "function") {
    return client;
  }

  const originalRpc = client.rpc.bind(client);
  client.rpc = (...args) => {
    try {
      const result = originalRpc(...args);
      if (result && typeof result.catch === "function") {
        return result;
      }

      if (result && typeof result.then === "function") {
        return Promise.resolve(result);
      }

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return client;
}

async function fetchProfilesByIds(ids) {
  const uniqueIds = [...new Set((ids || []).filter(Boolean))];
  if (!uniqueIds.length) {
    return [];
  }

  const { data, error } = await state.supabase
    .from("profiles")
    .select("*")
    .in("id", uniqueIds);

  if (error) {
    throw error;
  }

  return data || [];
}

function slugifyFileName(name) {
  return name
    .normalize("NFKD")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "file";
}

function getMessagePreview(message) {
  if (message?.content) {
    return message.content;
  }

  if (message?.attachment_name) {
    return `Файл: ${message.attachment_name}`;
  }

  if (message?.sticker_name || message?.sticker_url) {
    return `Стикер: ${message.sticker_name || "без названия"}`;
  }

  return "Вложение";
}

function getPresenceTimestamp(profile) {
  if (!profile?.last_seen_at) {
    return 0;
  }

  return new Date(profile.last_seen_at).getTime();
}

function isUserAvailable(profile) {
  const lastSeenAt = getPresenceTimestamp(profile);
  return Boolean(lastSeenAt) && Date.now() - lastSeenAt <= PRESENCE_ACTIVE_WINDOW_MS;
}

function getPresenceLabel(profile) {
  if (!profile) {
    return "Статус неизвестен";
  }

  if (isUserAvailable(profile)) {
    return "В сети";
  }

  if (!profile.last_seen_at) {
    return "Не в сети";
  }

  return `Был(а) в сети ${formatTime(profile.last_seen_at)}`;
}

function getCompactPresenceLabel(profile) {
  if (!profile) {
    return "";
  }

  if (isUserAvailable(profile)) {
    return "онлайн";
  }

  if (!profile.last_seen_at) {
    return "не в сети";
  }

  return `был(а) ${formatTime(profile.last_seen_at)}`;
}

function getChatTitle(chat) {
  if (!chat) {
    return "Чат";
  }

  if (chat.chat_type === "favorites") {
    return "Избранное";
  }

  if (chat.chat_type === "direct") {
    return chat.partner?.display_name || "Личный чат";
  }

  return chat.title || (chat.chat_type === "channel" ? "Канал" : "Группа");
}

function getChatSubtitle(chat) {
  if (!chat) {
    return "";
  }

  if (chat.chat_type === "favorites") {
    return "Личные заметки и пересланное себе";
  }

  if (chat.chat_type === "direct") {
    return `@${chat.partner?.username || "user"} · ${getCompactPresenceLabel(chat.partner)}`;
  }

  const typeLabel = chat.chat_type === "channel" ? "Канал" : "Группа";
  const memberCount = chat.members?.length || 0;
  const owner = chat.members?.find((member) => member.id === chat.created_by);
  return owner
    ? `${typeLabel} • ${memberCount} участник(ов) • ${owner.display_name}`
    : `${typeLabel} • ${memberCount} участник(ов)`;
}

function getChatDescription(chat) {
  if (!chat) {
    return "";
  }

  if (chat.chat_type === "favorites") {
    return "Этот чат видите только вы.";
  }

  if (chat.chat_type === "direct") {
    return chat.partner?.bio || "Личный диалог";
  }

  const members = (chat.members || [])
    .map((member) => member?.display_name)
    .filter(Boolean)
    .slice(0, 6)
    .join(", ");

  return members || "Пока без описания";
}

function getCachedMessagesForChat(chatId) {
  if (!chatId) {
    return [];
  }

  const chat = state.chats.find((item) => item.id === chatId);
  if (chat?.messages?.length) {
    return [...chat.messages];
  }

  return (state.allMessages || [])
    .filter((message) => message.chat_id === chatId)
    .sort((left, right) => new Date(left.created_at) - new Date(right.created_at));
}

function syncChatMessages(chatId, messages) {
  const normalizedMessages = [...(messages || [])].sort(
    (left, right) => new Date(left.created_at) - new Date(right.created_at)
  );

  const otherMessages = (state.allMessages || []).filter((message) => message.chat_id !== chatId);
  state.allMessages = [...otherMessages, ...normalizedMessages].sort(
    (left, right) => new Date(left.created_at) - new Date(right.created_at)
  );

  state.chats = state.chats.map((chat) => {
    if (chat.id !== chatId) {
      return chat;
    }

    return {
      ...chat,
      messages: normalizedMessages,
      last_message: normalizedMessages[normalizedMessages.length - 1] || chat.last_message || null,
    };
  });
}

function showCachedMessages(chatId) {
  state.activeMessages = getCachedMessagesForChat(chatId);
  renderMessages();
}

function getPendingCallSignals(callId) {
  return state.pendingIncomingCallSignals.get(callId) || [];
}

function queuePendingCallSignal(callId, payload) {
  if (!callId || !payload) {
    return;
  }

  const pendingSignals = getPendingCallSignals(callId);
  pendingSignals.push(payload);
  state.pendingIncomingCallSignals.set(callId, pendingSignals);
}

function clearPendingCallSignals(callId) {
  if (!callId) {
    return;
  }

  state.pendingIncomingCallSignals.delete(callId);
}

function clearChatListRefreshTimer() {
  if (state.chatListRefreshTimerId) {
    window.clearTimeout(state.chatListRefreshTimerId);
    state.chatListRefreshTimerId = null;
  }
}

function scheduleChatListRefresh() {
  if (state.chatListRefreshTimerId) {
    return;
  }

  state.chatListRefreshTimerId = window.setTimeout(async () => {
    state.chatListRefreshTimerId = null;
    try {
      await loadChats();
    } catch (error) {
      console.error(error);
    }
  }, 80);
}

function mergeRecentMessagesIntoCache(messages) {
  if (!messages?.length) {
    return;
  }

  const byId = new Map((state.allMessages || []).map((message) => [message.id, message]));
  messages.forEach((message) => {
    byId.set(message.id, message);
  });

  state.allMessages = [...byId.values()].sort(
    (left, right) => new Date(left.created_at) - new Date(right.created_at)
  );
}

function buildChatMapById(chats) {
  return new Map((chats || []).map((chat) => [chat.id, chat]));
}

async function resolveChatById(chatId, fallbackUserId = null) {
  let chat = state.chats.find((item) => item.id === chatId);
  if (chat) {
    return chat;
  }

  const [{ data: chatRow, error: chatError }, { data: memberRows, error: memberError }] = await Promise.all([
    state.supabase
      .from("direct_chats")
      .select("id, created_at, chat_type, title, created_by")
      .eq("id", chatId)
      .maybeSingle(),
    state.supabase
      .from("direct_chat_members")
      .select("chat_id, user_id, last_read_at, role")
      .eq("chat_id", chatId),
  ]);

  if (chatError) {
    throw chatError;
  }

  if (memberError) {
    throw memberError;
  }

  if (!chatRow || !memberRows?.length) {
    return null;
  }

  const profileIds = [...new Set(memberRows.map((row) => row.user_id).filter(Boolean))];
  const profiles = await fetchProfilesByIds(profileIds);
  const profileMap = new Map(profiles.map((profile) => [profile.id, profile]));
  const selfRow = memberRows.find((row) => row.user_id === state.profile.id);
  const partnerRow = memberRows.find((row) => row.user_id !== state.profile.id)
    || (fallbackUserId ? memberRows.find((row) => row.user_id === fallbackUserId) : null);
  const partnerProfile = partnerRow ? profileMap.get(partnerRow.user_id) : null;
  const memberProfiles = memberRows
    .map((member) => {
      const profile = profileMap.get(member.user_id);
      return profile ? { ...profile, role: member.role || "member" } : null;
    })
    .filter(Boolean);
  const cachedMessages = getCachedMessagesForChat(chatId);

  chat = {
    id: chatRow.id,
    chat_type: chatRow.chat_type || "direct",
    title: chatRow.title || "",
    created_by: chatRow.created_by || null,
    created_at: chatRow.created_at,
    partner: chatRow.chat_type === "favorites"
      ? {
          id: state.profile.id,
          display_name: "Избранное",
          username: state.profile.username,
          avatar_url: "",
          isFavorites: true,
        }
      : partnerProfile,
    members: memberProfiles,
    self_role: selfRow?.role || "member",
    is_blocked: partnerProfile ? state.blockedUserIds.has(partnerProfile.id) : false,
    is_blocked_by_partner: partnerProfile ? state.blockedByUserIds.has(partnerProfile.id) : false,
    messages: cachedMessages,
    last_message: cachedMessages[cachedMessages.length - 1] || null,
    last_read_at: selfRow?.last_read_at || null,
    partner_last_read_at: partnerRow?.last_read_at || null,
  };

  state.chats = [chat, ...state.chats.filter((item) => item.id !== chat.id)];
  return chat;
}

function getChatHeaderDescription(chat) {
  if (!chat) {
    return "";
  }

  if (chat.chat_type === "favorites") {
    return "Ваше персональное Избранное. Здесь можно хранить сообщения, файлы и стикеры только для себя.";
  }

  if (chat.chat_type === "direct") {
    return chat.partner?.bio || "Пользователь пока ничего не написал о себе.";
  }

  const typeLabel = chat.chat_type === "channel" ? "Канал" : "Группа";
  const members = (chat.members || [])
    .map((member) => member?.display_name)
    .filter(Boolean)
    .join(", ");

  return `${typeLabel}. Участники: ${members || "пока только вы"}.`;
}

function canManageMembers(chat) {
  return Boolean(
    chat &&
    ["group", "channel"].includes(chat.chat_type) &&
    (chat.created_by === state.profile?.id || chat.self_role === "owner")
  );
}

function renderMemberManagement(chat) {
  if (!chat || !["group", "channel"].includes(chat.chat_type)) {
    return "";
  }

  const canManage = canManageMembers(chat);

  const memberItems = (chat.members || [])
    .map((member) => {
      const isOwner = member.id === chat.created_by || member.role === "owner";
      const canRemove = canManage && member.id !== state.profile?.id && !isOwner;
      return `
        <div class="member-manager__item">
          <div class="member-manager__person">
            <span class="member-manager__name">${escapeHtml(member.display_name || member.username || "Участник")}</span>
            <span class="member-manager__meta">@${escapeHtml(member.username || "user")}${isOwner ? " · Владелец" : ""}</span>
          </div>
          ${canRemove ? `<button class="danger-button member-manager__remove" type="button" data-remove-member-id="${member.id}">Удалить</button>` : ""}
        </div>
      `;
    })
    .join("");

  return `
    <div class="member-manager">
      <div class="info-card__title">Участники</div>
      ${canManage ? `
        <form class="member-manager__form" data-member-add-form="true">
          <input type="text" name="username" maxlength="40" placeholder="Логин участника: anna_dev" />
          <button class="secondary-button" type="submit">Добавить</button>
        </form>
      ` : `<div class="muted">Список участников. Управлять ими может владелец чата.</div>`}
      <div class="member-manager__list">${memberItems || `<div class="muted">Кроме вас участников пока нет.</div>`}</div>
    </div>
  `;
}

function getMessageAuthorName(message, chat) {
  if (message.sender_id === state.profile?.id) {
    return state.profile.display_name;
  }

  if (chat.chat_type === "direct") {
    return chat.partner?.display_name || "Собеседник";
  }

  return chat.members?.find((member) => member?.id === message.sender_id)?.display_name || "Участник";
}

function canCallChat(chat) {
  return Boolean(chat && chat.chat_type === "direct" && chat.partner && !chat.is_blocked && !chat.is_blocked_by_partner);
}

function canSendToChat(chat) {
  if (!chat || !state.profile) {
    return false;
  }

  if (chat.chat_type === "direct" && (chat.is_blocked || chat.is_blocked_by_partner)) {
    return false;
  }

  if (chat.chat_type !== "channel") {
    return true;
  }

  return chat.created_by === state.profile.id;
}

function getMessageSearchText(message) {
  return [
    message.is_deleted ? "" : (message.content || ""),
    message.attachment_name || "",
    message.sticker_name || "",
  ]
    .join(" ")
    .trim();
}

function isDirectChatBlocked(chat) {
  return Boolean(chat?.chat_type === "direct" && (chat.is_blocked || chat.is_blocked_by_partner));
}

function renderStickerMessage(message) {
  if (!message.sticker_url) {
    return "";
  }

  return `
    <div class="message-sticker">
      <img src="${escapeAttribute(message.sticker_url)}" alt="${escapeAttribute(message.sticker_name || "Стикер")}" class="message-sticker__image" />
    </div>
  `;
}

function getReadReceiptStatus(message, chat = getActiveChat()) {
  if (!message || !chat || chat.chat_type !== "direct" || message.sender_id !== state.profile?.id) {
    return "";
  }

  const partnerLastReadAt = chat.partner_last_read_at ? new Date(chat.partner_last_read_at).getTime() : 0;
  const messageCreatedAt = message.created_at ? new Date(message.created_at).getTime() : 0;

  return partnerLastReadAt >= messageCreatedAt ? "read" : "sent";
}

function renderReadReceipt(status, className = "") {
  if (!status) {
    return "";
  }

  const isRead = status === "read";
  const label = isRead ? "Прочитано" : "Не прочитано";

  return `
    <span class="read-receipt ${className} ${isRead ? "read-receipt--read" : "read-receipt--sent"}" aria-label="${label}" title="${label}">
      <span class="read-receipt__icon" aria-hidden="true">${isRead ? "✓✓" : "✓"}</span>
    </span>
  `;
}

function renderAttachment(message, chat = getActiveChat()) {
  if (!message.attachment_url) {
    return "";
  }

  const name = escapeHtml(message.attachment_name || "Файл");
  const href = escapeAttribute(message.attachment_url);
  const type = message.attachment_type || "";

  if (type.startsWith("image/")) {
    return `
      <div class="message-attachment">
        <button class="image-attachment" type="button" data-open-image="${href}" data-image-name="${name}" aria-label="Открыть изображение ${name}">
          <img src="${href}" alt="${name}" class="message-attachment__image" loading="lazy" />
          <span class="image-attachment__zoom" aria-hidden="true">⌕</span>
        </button>
        <span class="message-attachment__name">${name}</span>
      </div>
    `;
  }

  if (type.startsWith("audio/")) {
    const isVoice = /^voice[-_]/i.test(message.attachment_name || "");
    if (isVoice) {
      const waveform = Array.from({ length: 32 }, (_, index) => {
        const height = 8 + ((index * 17 + 11) % 22);
        return `<i style="--wave-height:${height}px"></i>`;
      }).join("");
      return `
        <div class="voice-message" data-voice-player data-audio-src="${href}">
          <button class="voice-message__play" type="button" data-voice-toggle aria-label="Воспроизвести голосовое">
            <svg class="voice-message__play-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="m8 5 12 7-12 7V5Z"></path></svg>
            <svg class="voice-message__pause-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 5h3v14H7zM14 5h3v14h-3z"></path></svg>
          </button>
          <div class="voice-message__body">
            <div class="voice-message__wave" aria-hidden="true">${waveform}</div>
            <div class="voice-message__duration">0:00</div>
          </div>
          <div class="voice-message__footer">
            <span>${escapeHtml(formatTime(message.created_at))}</span>
            ${renderReadReceipt(getReadReceiptStatus(message, chat), "read-receipt--message")}
          </div>
          <audio preload="metadata" src="${href}"></audio>
        </div>
      `;
    }

    return `
      <button class="music-attachment" type="button" data-play-music="${href}" data-audio-name="${name}">
        <span class="music-attachment__icon" aria-hidden="true">♫</span>
        <span class="music-attachment__name">${name}</span>
        <span class="music-attachment__action" aria-hidden="true">▶</span>
      </button>
    `;
  }

  if (type.startsWith("video/") || /\.(mp4|webm|ogg|m3u8)$/i.test(message.attachment_name || "")) {
    return `
      <div class="video-player" data-video-player>
        <video class="video-player__video" data-video-source="${href}" playsinline webkit-playsinline preload="metadata" aria-label="${name}"></video>
        <div class="video-player__controls">
          <button class="video-player__play" type="button" data-video-play aria-label="Воспроизвести видео">▶</button>
          <input class="video-player__seek" type="range" min="0" max="1000" value="0" data-video-seek aria-label="Перемотка видео" />
          <span class="video-player__time" data-video-time>0:00 / 0:00</span>
          <label class="video-player__setting">Скорость
            <select data-video-speed aria-label="Скорость видео">
              <option value="0.5">0.5x</option><option value="0.75">0.75x</option><option value="1" selected>1x</option><option value="1.25">1.25x</option><option value="1.5">1.5x</option><option value="2">2x</option>
            </select>
          </label>
          <label class="video-player__setting">Качество
            <select data-video-quality aria-label="Качество видео"><option value="-1">Авто / исходное</option></select>
          </label>
          <button class="video-player__fullscreen" type="button" data-video-fullscreen aria-label="На весь экран" title="На весь экран">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"></path></svg>
          </button>
        </div>
        <div class="video-player__error" data-video-error role="status" hidden>
          <span data-video-error-text>Не удалось воспроизвести видео.</span>
          <a href="${href}" target="_blank" rel="noreferrer">Открыть исходный файл</a>
        </div>
        <span class="video-player__name">${name}</span>
      </div>
    `;
  }

  return `
    <div class="message-attachment">
      <a href="${href}" target="_blank" rel="noreferrer" class="message-attachment__link">${name}</a>
    </div>
  `;
}

function formatMediaTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function updateVideoFullscreenButtons() {
  document.querySelectorAll("[data-video-fullscreen]").forEach((button) => {
    const container = button.closest("[data-video-player]");
    const video = container?.querySelector("video");
    const isFullscreen = document.fullscreenElement === container ||
      document.webkitFullscreenElement === container ||
      Boolean(video?.webkitDisplayingFullscreen);
    const label = isFullscreen ? "Выйти из полноэкранного режима" : "На весь экран";
    button.setAttribute("aria-label", label);
    button.title = label;
  });
}

function setupVideoPlayers(root = elements.messageList) {
  root.querySelectorAll("[data-video-player]").forEach((container) => {
    if (container.dataset.initialized) {
      return;
    }

    const video = container.querySelector("video");
    const quality = container.querySelector("[data-video-quality]");
    const playButton = container.querySelector("[data-video-play]");
    const seek = container.querySelector("[data-video-seek]");
    const errorBox = container.querySelector("[data-video-error]");
    const errorText = container.querySelector("[data-video-error-text]");
    const source = video.dataset.videoSource;
    const isHlsSource = /\.m3u8(?:$|\?)/i.test(source);
    container.dataset.initialized = "true";
    const showVideoError = (message) => {
      errorText.textContent = message;
      errorBox.hidden = false;
      container.classList.add("has-error");
    };
    const clearVideoError = () => {
      errorBox.hidden = true;
      container.classList.remove("has-error");
    };
    const updateVideoTime = () => {
      const time = container.querySelector("[data-video-time]");
      if (Number.isFinite(video.duration) && video.duration > 0) {
        seek.value = String((video.currentTime / video.duration) * 1000);
        seek.disabled = false;
      } else {
        seek.disabled = true;
      }
      time.textContent = `${formatMediaTime(video.currentTime)} / ${formatMediaTime(video.duration)}`;
    };
    video.addEventListener("loadedmetadata", updateVideoTime);
    video.addEventListener("durationchange", updateVideoTime);
    video.addEventListener("seeked", updateVideoTime);
    video.addEventListener("timeupdate", updateVideoTime);
    video.addEventListener("playing", () => {
      container.classList.add("is-playing");
      clearVideoError();
      playButton.setAttribute("aria-label", "Поставить видео на паузу");
    });
    video.addEventListener("pause", () => {
      container.classList.remove("is-playing");
      playButton.setAttribute("aria-label", "Продолжить видео");
    });
    video.addEventListener("ended", () => {
      container.classList.remove("is-playing");
      playButton.setAttribute("aria-label", "Воспроизвести видео");
    });
    video.addEventListener("loadeddata", clearVideoError);
    video.addEventListener("error", () => {
      const code = video.error?.code;
      const errorMessage = code === 4
        ? "Этот формат или кодек не поддерживается браузером. Откройте исходный файл или перекодируйте его в MP4 (H.264)."
        : code === 1
          ? "Загрузка видео была прервана. Нажмите воспроизведение ещё раз."
          : "Не удалось загрузить видео. Проверьте подключение или откройте исходный файл.";
      showVideoError(errorMessage);
    });
    video.addEventListener("waiting", () => container.classList.add("is-loading"));
    video.addEventListener("canplay", () => container.classList.remove("is-loading"));
    video.addEventListener("webkitbeginfullscreen", updateVideoFullscreenButtons);
    video.addEventListener("webkitendfullscreen", updateVideoFullscreenButtons);
    playButton.addEventListener("click", () => {
      if (video.paused) {
        video.play().catch((error) => {
          showVideoError(error.name === "NotAllowedError" ? "Нажмите кнопку воспроизведения, чтобы запустить видео." : "Браузер не смог воспроизвести этот файл.");
        });
      } else {
        video.pause();
      }
    });
    seek.addEventListener("input", (event) => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = (Number(event.target.value) / 1000) * video.duration;
      }
    });
    container.querySelector("[data-video-speed]").addEventListener("change", (event) => {
      video.playbackRate = Number(event.target.value) || 1;
    });
    container.querySelector("[data-video-fullscreen]").addEventListener("click", async () => {
      try {
        if (document.fullscreenElement === container || document.webkitFullscreenElement === container) {
          if (document.exitFullscreen) await document.exitFullscreen();
          else document.webkitExitFullscreen?.();
          return;
        }

        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen();
        } else if (video.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        } else {
          setStatus("Полноэкранный режим недоступен в этом браузере.", true);
        }
      } catch (error) {
        console.error(error);
        setStatus("Не удалось открыть видео на весь экран.", true);
      }
    });
    quality.addEventListener("change", (event) => {
      const hls = videoPlayerInstances.get(video);
      if (hls) {
        hls.currentLevel = Number(event.target.value);
      }
    });

    if (isHlsSource && window.Hls?.isSupported()) {
      const hls = new window.Hls();
      videoPlayerInstances.set(video, hls);
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
        quality.innerHTML = `<option value="-1">Авто</option>${hls.levels.map((level, index) => `<option value="${index}">${level.height ? `${level.height}p` : `${Math.round(level.bitrate / 1000)} кбит/с`}</option>`).join("")}`;
        quality.disabled = hls.levels.length === 0;
      });
      hls.on(window.Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          showVideoError(data.type === window.Hls.ErrorTypes.NETWORK_ERROR
            ? "Поток прервался. Попробуйте воспроизвести видео ещё раз."
            : "Не удалось декодировать HLS-поток. Откройте исходный файл.");
        }
      });
    } else if (isHlsSource && video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
      video.load();
      quality.innerHTML = "<option value=\"-1\">Авто (браузер)</option>";
      quality.disabled = true;
      quality.title = "Качество выбирается автоматически браузером для HLS";
    } else {
      if (isHlsSource) {
        showVideoError("Этот браузер не поддерживает HLS-видео.");
        quality.disabled = true;
        return;
      }
      video.src = source;
      video.load();
      quality.innerHTML = '<option value="-1">Исходное</option>';
      quality.disabled = true;
      quality.title = "Для этого файла доступно только исходное качество";
    }

  });
}

function disposeVideoPlayers(keepVideos = new Set()) {
  videoPlayerInstances.forEach((player, video) => {
    if (keepVideos.has(video)) return;
    player.destroy();
    videoPlayerInstances.delete(video);
  });
}

function setImageViewerTransform() {
  elements.imageViewerImage.style.transform = `translate(${imageViewerState.x}px, ${imageViewerState.y}px) scale(${imageViewerState.scale})`;
  elements.imageViewerZoomReset.textContent = `${Math.round(imageViewerState.scale * 100)}%`;
}

function zoomImage(nextScale) {
  imageViewerState.scale = Math.max(1, Math.min(4, nextScale));
  if (imageViewerState.scale === 1) {
    imageViewerState.x = 0;
    imageViewerState.y = 0;
  }
  setImageViewerTransform();
}

function openImageViewer(src, name) {
  elements.imageViewerImage.src = src;
  elements.imageViewerImage.alt = name || "Просмотр изображения";
  elements.imageViewerCaption.textContent = name || "";
  imageViewerState.scale = 1;
  imageViewerState.x = 0;
  imageViewerState.y = 0;
  setImageViewerTransform();
  elements.imageViewer.hidden = false;
  elements.imageViewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("image-viewer-open");
}

function closeImageViewer() {
  elements.imageViewer.hidden = true;
  elements.imageViewer.setAttribute("aria-hidden", "true");
  elements.imageViewerImage.removeAttribute("src");
  document.body.classList.remove("image-viewer-open");
  imageViewerState.pointers.clear();
}

function setMusicSource(src, name) {
  elements.musicPlayer.pause();
  elements.musicPlayer.src = src;
  elements.audioPlayerName.textContent = name || "Аудиофайл";
  elements.audioPlayerBar.hidden = false;
  document.body.classList.add("has-audio-player");
  elements.musicPlayer.play().catch(() => setStatus("Нажмите воспроизведение, чтобы запустить аудио."));
}

function closeMusicPlayer() {
  elements.musicPlayer.pause();
  elements.musicPlayer.removeAttribute("src");
  elements.musicPlayer.load();
  elements.audioPlayerBar.hidden = true;
  document.body.classList.remove("has-audio-player");
}

function updateMusicPlayerState() {
  elements.audioPlayerBar.classList.toggle("is-playing", !elements.musicPlayer.paused);
  elements.audioPlayerToggle.setAttribute("aria-label", elements.musicPlayer.paused ? "Воспроизвести" : "Пауза");
}

function setupVoicePlayers(root = elements.messageList) {
  root.querySelectorAll("[data-voice-player]").forEach((container) => {
    if (container.dataset.initialized) {
      return;
    }

    const audio = container.querySelector("audio");
    const duration = container.querySelector(".voice-message__duration");
    container.dataset.initialized = "true";
    audio.addEventListener("loadedmetadata", () => {
      duration.textContent = formatMediaTime(audio.duration);
    });
    audio.addEventListener("timeupdate", () => {
      duration.textContent = formatMediaTime(audio.currentTime);
      container.style.setProperty("--voice-progress", `${audio.duration ? (audio.currentTime / audio.duration) * 100 : 0}%`);
    });
    audio.addEventListener("play", () => container.classList.add("is-playing"));
    audio.addEventListener("pause", () => container.classList.remove("is-playing"));
    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
      container.classList.remove("is-playing");
      duration.textContent = formatMediaTime(audio.duration);
    });
  });
}

function applyTheme(theme, persist = true) {
  const nextTheme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  if (persist) {
    try {
      localStorage.setItem("svoysvyaz-theme", nextTheme);
    } catch (error) {
      console.warn("Не удалось сохранить тему:", error);
    }
  }
  const label = nextTheme === "dark" ? "Включить светлую тему" : "Включить тёмную тему";
  [elements.themeToggleDesktop, elements.themeToggleMobile, elements.themeToggleAuth].forEach((button) => {
    button.setAttribute("aria-label", label);
    button.title = label;
  });
}

function toggleTheme() {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
}

function openMobileProfile() {
  const chat = getActiveChat();
  const profile = chat?.partner || chat?.members?.find((member) => member.id !== state.profile?.id);
  if (!profile || chat?.chat_type === "favorites") {
    return;
  }

  elements.mobileProfileAvatar.innerHTML = renderAvatarMarkup(profile, "mobile-profile-sheet__avatar-image");
  elements.mobileProfileName.textContent = profile.display_name || getChatTitle(chat);
  elements.mobileProfileBio.textContent = profile.bio || "Пользователь пока ничего не написал о себе.";
  elements.mobileProfilePresence.textContent = chat.chat_type === "direct" ? getPresenceLabel(profile) : `${chat.members?.length || 0} участника в чате`;
  const canBlockProfile = chat.chat_type === "direct" && Boolean(profile.id);
  const isProfileBlocked = canBlockProfile && state.blockedUserIds.has(profile.id);
  elements.mobileProfileBlock.hidden = !canBlockProfile;
  elements.mobileProfileBlock.dataset.userId = canBlockProfile ? profile.id : "";
  elements.mobileProfileBlock.textContent = isProfileBlocked ? "Разблокировать" : "Заблокировать";
  elements.mobileProfileBlock.classList.toggle("mobile-profile-sheet__block--blocked", isProfileBlocked);
  elements.mobileProfileModal.hidden = false;
  elements.mobileProfileModal.setAttribute("aria-hidden", "false");
}

function closeMobileProfile() {
  elements.mobileProfileModal.hidden = true;
  elements.mobileProfileModal.setAttribute("aria-hidden", "true");
}

async function startVoiceRecording() {
  if (state.voiceRecorder || state.voiceRecordingRequested) {
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    setStatus("Запись голоса недоступна в этом браузере.", true);
    return;
  }

  state.voiceRecordingRequested = true;
  state.voiceRecordingCancelled = false;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (!state.voiceRecordingRequested) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }

    const mimeType = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"].find((type) => MediaRecorder.isTypeSupported(type));
    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    state.voiceStream = stream;
    state.voiceRecorder = recorder;
    state.voiceChunks = [];
    state.voiceRecordingStartedAt = Date.now();
    elements.recordingIndicator.hidden = false;
    elements.sendButton.classList.add("is-recording");
    elements.recordingTime.textContent = "00:00";
    state.voiceRecordingTimerId = window.setInterval(() => {
      elements.recordingTime.textContent = formatMediaTime((Date.now() - state.voiceRecordingStartedAt) / 1000);
    }, 250);

    recorder.addEventListener("dataavailable", (event) => {
      if (event.data.size) {
        state.voiceChunks.push(event.data);
      }
    });
    recorder.addEventListener("stop", async () => {
      const chunks = state.voiceChunks;
      const cancelled = state.voiceRecordingCancelled || Date.now() - state.voiceRecordingStartedAt < 500;
      const recordingType = recorder.mimeType || "audio/webm";
      const extension = recordingType.includes("mp4") ? "m4a" : "webm";
      state.voiceRecorder = null;
      state.voiceChunks = [];
      state.voiceStream?.getTracks().forEach((track) => track.stop());
      state.voiceStream = null;
      elements.recordingIndicator.hidden = true;
      elements.sendButton.classList.remove("is-recording");
      if (cancelled || !chunks.length) {
        return;
      }

      state.pendingAttachmentFile = new File(chunks, `voice-${Date.now()}.${extension}`, { type: recordingType });
      updateAttachmentStatus();
      try {
        await sendMessage();
      } catch (error) {
        console.error(error);
        setStatus(getFriendlyError(error, "Не удалось отправить голосовое сообщение."), true);
      }
    }, { once: true });
    recorder.start();
  } catch (error) {
    state.voiceRecordingRequested = false;
    elements.recordingIndicator.hidden = true;
    elements.sendButton.classList.remove("is-recording");
    console.error(error);
    setStatus(error.name === "NotAllowedError" ? "Разрешите доступ к микрофону, чтобы записать голосовое." : "Не удалось начать запись голоса.", true);
  }
}

function stopVoiceRecording(cancel = false) {
  state.voiceRecordingRequested = false;
  state.voiceRecordingCancelled = cancel;
  if (state.voiceRecordingTimerId) {
    clearInterval(state.voiceRecordingTimerId);
    state.voiceRecordingTimerId = null;
  }
  if (state.voiceRecorder?.state === "recording") {
    state.voiceRecorder.stop();
  } else if (!state.voiceRecorder) {
    elements.recordingIndicator.hidden = true;
    elements.sendButton.classList.remove("is-recording");
  }
}

function setStatus(text, isError = false) {
  elements.appStatus.textContent = text;
  elements.appStatus.classList.toggle("status-box--error", isError);
}

function setAuthStatus(text, isError = false) {
  elements.authStatus.textContent = text;
  elements.authStatus.classList.toggle("status-box--error", isError);
}

function getFriendlyError(error, fallback) {
  const message = error?.message || "";
  const responseStatus = error?.statusCode || error?.status || error?.originalResponse?.getStatus?.();
  if (Number(responseStatus) === 413 || /maximum allowed size|file too large|payload too large|exceeded.*size/i.test(message)) {
    return "Видео превышает лимит хранилища. Один файл может быть до 50 МиБ; проверьте лимит bucket attachments в Supabase.";
  }

  if (/возобновляемой загрузки не загрузился/i.test(message)) {
    return message;
  }

  if (message.includes("50 МиБ")) {
    return message;
  }

  if (message.includes("Failed to fetch") || message.includes("Load failed") || message.includes("NetworkError")) {
    return "Не удалось подключиться к Supabase. Проверьте Project URL, publishable key и статус проекта в панели Supabase.";
  }

  if (
    message.includes("avatar_url") ||
    message.includes("last_seen_at") ||
    message.includes("attachment_url") ||
    message.includes("attachment_path") ||
    message.includes("attachment_name") ||
    message.includes("attachment_type") ||
    message.includes("attachment_size") ||
    message.includes("sticker_url") ||
    message.includes("sticker_name") ||
    message.includes("user_stickers") ||
    message.includes("call_logs") ||
    message.includes("create_room_chat") ||
    message.includes("ensure_favorites_chat") ||
    message.includes("user_blocks") ||
    message.includes("edited_at") ||
    message.includes("deleted_at") ||
    message.includes("is_deleted") ||
    message.includes("chat_type") ||
    message.includes("created_by") ||
    message.includes("role")
  ) {
    return "Нужно заново выполнить docs/supabase-schema.sql в Supabase, чтобы включить новые чаты, поиск и стикеры.";
  }

  return fallback || message || "Произошла ошибка.";
}

function isMissingCallLogsError(error) {
  const message = String(error?.message || "");
  return message.includes("public.call_logs") || message.includes("call_logs");
}

async function ensureRemoteAudioPlayback() {
  try {
    elements.remoteAudio.volume = 1;
    elements.remoteAudio.muted = false;
    await elements.remoteAudio.play();
  } catch (error) {
    console.error("Не удалось запустить звук звонка/разговора:", error);
  }
}

function primeCallAudio() {
  callAudio.unlock().catch((error) => console.warn("Не удалось активировать звук звонка:", error));
  callAudio.preload().catch((error) => console.warn("Не удалось загрузить звуки звонка:", error));
}

function clearCallSounds({ preserveCallEndedAudio = false } = {}) {
  callAudio.stopCallEffects({ preserveEnded: preserveCallEndedAudio });
}

function playNotificationSound() {
  callAudio.playMessageBeep().catch((error) => console.warn("Не удалось воспроизвести звук сообщения:", error));
}

function startOutgoingRingback() {
  callAudio.stopCallEffects();
  callAudio.play("outgoing-call.wav", { channel: "outgoing-ringback", loop: true, volume: 0.36 });
}

function startIncomingRingtone() {
  callAudio.stopCallEffects();
  callAudio.play("ringtone.wav", { channel: "incoming-ringtone", loop: true, volume: 0.42 });
}

function startCallReconnectingTone() {
  callAudio.play("connecting.wav", { channel: "reconnecting", volume: 0.35 });
}

async function playCallConnectedTone() {
  callAudio.stopCallEffects();
  callAudio.play("connected.wav", { channel: "connected", volume: 0.4 });
}

async function playCallEndedTone() {
  callAudio.stopCallEffects();
  callAudio.play("call-ended.wav", { channel: "call-ended", volume: 0.4 });
}

function isNotificationSupported() {
  return "Notification" in window;
}

function updateNotificationUI() {
  if (!isNotificationSupported()) {
    elements.notificationStatus.textContent = "Этот браузер не поддерживает уведомления.";
    elements.enableNotifications.disabled = true;
    return;
  }

  const permission = Notification.permission;
  if (permission === "granted") {
    elements.notificationStatus.textContent = "Уведомления включены.";
    elements.enableNotifications.disabled = true;
    return;
  }

  if (permission === "denied") {
    elements.notificationStatus.textContent = "Уведомления заблокированы в браузере.";
    elements.enableNotifications.disabled = true;
    return;
  }

  elements.notificationStatus.textContent = "Разрешение ещё не выдано.";
  elements.enableNotifications.disabled = false;
}

async function requestNotificationPermission() {
  if (!isNotificationSupported()) {
    setStatus("Этот браузер не поддерживает системные уведомления.", true);
    updateNotificationUI();
    return;
  }

  const permission = await Notification.requestPermission();
  updateNotificationUI();

  if (permission === "granted") {
    setStatus("Системные уведомления включены.");
    return;
  }

  setStatus("Разрешение на уведомления не выдано.", true);
}

function notifyAboutMessage(chat, message) {
  if (!isNotificationSupported() || Notification.permission !== "granted") {
    return;
  }

  if (message.sender_id === state.profile.id) {
    return;
  }

  if (chat.is_blocked || chat.is_blocked_by_partner) {
    return;
  }

  if (!document.hidden && document.hasFocus() && chat.id === state.activeChatId) {
    return;
  }

  const notification = new Notification(getChatTitle(chat), {
    body: getMessageSearchText(message) || "Стикер",
    icon: "./favicon.svg",
    badge: "./favicon.svg",
    tag: `chat-${chat.id}`,
  });

  notification.onclick = () => {
    window.focus();
    state.activeChatId = chat.id;
    renderChats();
    renderChatHeader();
    subscribeToActiveChat(state.activeChatId);
    loadMessages(state.activeChatId).catch((error) => {
      console.error(error);
    });
    notification.close();
  };
}

function formatTime(value) {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(value));
}

function formatChatListTime(value) {
  const date = new Date(value);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" }).format(date);
  }

  const daysAgo = Math.floor((new Date(now.toDateString()) - new Date(date.toDateString())) / 86400000);
  if (daysAgo >= 0 && daysAgo < 7) {
    return new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(date).replace(".", "");
  }

  return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit" }).format(date);
}

function getInitials(name) {
  return String(name || "?").trim().slice(0, 1).toUpperCase();
}

function renderAvatarMarkup(profile, className = "") {
  if (!profile) {
    return `<div class="chat-avatar ${className}">?</div>`;
  }

  if (profile.isFavorites) {
    return `
      <div class="chat-avatar ${className} chat-avatar--favorites" aria-label="Избранное" title="Избранное">
        <svg aria-hidden="true" viewBox="0 0 24 24" class="chat-avatar__icon">
          <path d="M12 3.4c2.7 0 4.7 1.3 4.7 4.1v10.7c0 .8-.9 1.3-1.6.8L12 16.8 8.9 19c-.7.5-1.6 0-1.6-.8V7.5c0-2.8 2-4.1 4.7-4.1Z" fill="currentColor"></path>
        </svg>
      </div>
    `;
  }

  if (profile.avatar_url) {
    return `<div class="chat-avatar ${className}"><img src="${escapeAttribute(profile.avatar_url)}" alt="${escapeAttribute(profile.display_name)}" class="chat-avatar__image" /></div>`;
  }

  return `<div class="chat-avatar ${className}">${escapeHtml(getInitials(profile.display_name))}</div>`;
}

function renderEmpty(container, text) {
  container.innerHTML = `<div class="empty-state">${escapeHtml(text)}</div>`;
}

function showAuthMode(mode) {
  const isRegister = mode === "register";
  elements.registerForm.hidden = !isRegister;
  elements.loginForm.hidden = isRegister;
  elements.registerTab.classList.toggle("tab-button--active", isRegister);
  elements.loginTab.classList.toggle("tab-button--active", !isRegister);
}

async function ensureProfile(user, fallbackUsername, fallbackDisplayName) {
  const { data: existing, error: fetchError } = await state.supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (fetchError) {
    throw fetchError;
  }

  let generatedUsername = user.email?.split("@")[0]?.replace(/[^a-z0-9_]/g, "_").toLowerCase() || "user";
  if (generatedUsername.length > 24) {
    generatedUsername = generatedUsername.slice(0, 24);
  }
  if (generatedUsername.length < 3) {
    generatedUsername = "user";
  }

  const profile = {
    id: user.id,
    email: user.email,
    username: existing?.username || fallbackUsername || user.user_metadata?.username || generatedUsername,
    display_name: existing?.display_name || fallbackDisplayName || user.user_metadata?.display_name || "Пользователь",
    bio: existing?.bio || "",
    avatar_url: existing?.avatar_url || "",
    last_seen_at: existing?.last_seen_at || new Date().toISOString(),
  };

  const { error: upsertError } = await state.supabase.from("profiles").upsert(profile, { onConflict: "id" });
  if (upsertError) {
    throw upsertError;
  }

  state.profile = profile;
  updateProfileView();
}

function updateProfileView() {
  if (!state.profile) {
    return;
  }

  const letter = state.profile.display_name.slice(0, 1).toUpperCase();
  elements.profileBadgeLetter.textContent = letter;
  elements.profileBadgeLetter.hidden = Boolean(state.profile.avatar_url);
  elements.profileAvatar.hidden = !state.profile.avatar_url;
  if (state.profile.avatar_url) {
    elements.profileAvatar.src = state.profile.avatar_url;
  } else {
    elements.profileAvatar.removeAttribute("src");
  }
  elements.profileName.textContent = state.profile.display_name;
  elements.profileUsername.textContent = `@${state.profile.username}`;
  elements.mobileOwnProfileName.textContent = state.profile.display_name;
  elements.mobileOwnProfileUsername.textContent = `@${state.profile.username}`;
  elements.mobileOwnProfileAvatarLetter.textContent = letter;
  elements.mobileOwnProfileAvatarLetter.hidden = Boolean(state.profile.avatar_url);
  elements.mobileOwnProfileAvatarImage.hidden = !state.profile.avatar_url;
  if (state.profile.avatar_url) {
    elements.mobileOwnProfileAvatarImage.src = state.profile.avatar_url;
  } else {
    elements.mobileOwnProfileAvatarImage.removeAttribute("src");
  }
  elements.profileDisplayNameInput.value = state.profile.display_name;
  elements.profileBioInput.value = state.profile.bio || "";
  elements.profileAvatarStatus.textContent = state.pendingAvatarFile
    ? `Выбрано изображение: ${state.pendingAvatarFile.name}`
    : "Можно выбрать любое изображение, которое поддерживает браузер.";
}

function getActiveChat() {
  return state.chats.find((chat) => chat.id === state.activeChatId) || null;
}

function setMobileTab(tab) {
  document.body.dataset.mobileTab = tab;
  document.body.classList.toggle("mobile-chat-open", tab === "chat");
  document.querySelectorAll("[data-mobile-tab]").forEach((button) => {
    button.classList.toggle("mobile-nav__item--active", button.dataset.mobileTab === tab);
  });
}

function getTypingLabel(chat) {
  if (!chat?.id) {
    return "";
  }

  const typingUsers = state.typingUsersByChat.get(chat.id) || [];
  if (!typingUsers.length) {
    return "";
  }

  if (chat.chat_type === "direct") {
    return "Печатает...";
  }

  const firstName = typingUsers[0];
  return typingUsers.length === 1 ? `${firstName} печатает...` : "Несколько участников печатают...";
}

function updateCallButton() {
  const activeChat = getActiveChat();
  const hasChat = Boolean(activeChat);
  const inCall = Boolean(state.currentCall);
  const directChat = canCallChat(activeChat);

  elements.callButton.disabled = !hasChat || inCall || !directChat;
  elements.callButton.title = !hasChat
    ? "Сначала откройте диалог"
    : inCall
      ? "Сначала завершите текущий звонок"
      : activeChat?.is_blocked
        ? "Сначала разблокируйте собеседника"
      : activeChat?.is_blocked_by_partner
        ? "Собеседник ограничил общение"
      : !directChat
        ? "Звонки доступны только в личных диалогах"
        : `Позвонить ${activeChat.partner.display_name}`;
}

function renderChats() {
  const query = elements.mobileChatSearch.value.trim().toLocaleLowerCase("ru");
  const visibleChats = state.chats.filter((chat) => {
    if (!query) {
      return true;
    }

    const searchableText = [getChatTitle(chat), chat.partner?.username, getChatSubtitle(chat), getMessagePreview(chat.last_message)]
      .join(" ")
      .toLocaleLowerCase("ru");
    return searchableText.includes(query);
  });

  if (!visibleChats.length) {
    renderEmpty(elements.chatList, query ? "Чаты не найдены." : "Чатов пока нет. Найдите человека, создайте группу или канал.");
    return;
  }

  elements.chatList.innerHTML = visibleChats
    .map((chat) => {
      const active = chat.id === state.activeChatId;
      const preview = getMessagePreview(chat.last_message) || getChatDescription(chat) || "Нажмите, чтобы открыть диалог";
      const time = chat.last_message?.created_at
        ? (window.matchMedia("(max-width: 720px)").matches ? formatChatListTime(chat.last_message.created_at) : formatTime(chat.last_message.created_at))
        : "";
      const audioAttachment = /\.(mp3|mpeg|wav|ogg|m4a|aac)$/i.test(chat.last_message?.attachment_name || "");
      const previewClass = audioAttachment ? "chat-item__preview chat-item__preview--attachment" : "chat-item__preview";
      const receipt = chat.chat_type === "direct"
        ? renderReadReceipt(getReadReceiptStatus(chat.last_message, chat), "read-receipt--dialog")
        : "";
      const subtitle = getChatSubtitle(chat);
      return `
        <button class="chat-item ${active ? "chat-item--active" : ""}" type="button" data-chat-id="${chat.id}">
          ${renderAvatarMarkup(chat.chat_type === "direct" ? chat.partner : { display_name: getChatTitle(chat), avatar_url: "" }, "chat-item__avatar")}
          <div class="chat-item__body">
            <div class="chat-item__top">
              <span class="chat-item__title">${escapeHtml(getChatTitle(chat))}</span>
              <span class="chat-item__time">${escapeHtml(time)}</span>
            </div>
            <div class="chat-item__bottom">
              <span class="chat-item__preview">${escapeHtml(subtitle)}</span>
            </div>
            <div class="chat-item__bottom">
              <span class="${previewClass}">${audioAttachment ? `<svg class="chat-item__audio-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 13v-2a8 8 0 0 1 16 0v2M4 12h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a1 1 0 0 1 1-1Zm16 0h-2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1Z"></path></svg>` : ""}${escapeHtml(preview)}</span>
              ${receipt}
            </div>
          </div>
        </button>
      `;
    })
    .join("");
}

function renderMessages() {
  const activeChat = getActiveChat();
  if (!activeChat) {
    disposeVideoPlayers();
    elements.messageInput.disabled = true;
    elements.sendButton.disabled = true;
    state.lastRenderedChatId = null;
    renderEmpty(elements.messageList, "Выберите диалог слева.");
    return;
  }

  elements.messageInput.disabled = !canSendToChat(activeChat);
  elements.sendButton.disabled = !canSendToChat(activeChat);
  elements.cancelEditButton.hidden = !state.editingMessageId;
  elements.sendButton.title = state.editingMessageId ? "Сохранить изменения" : "Отправить";
  elements.messageInput.placeholder = canSendToChat(activeChat)
    ? (state.editingMessageId ? "Измените сообщение..." : "Введите сообщение...")
    : activeChat.is_blocked
      ? "Собеседник заблокирован"
    : activeChat.is_blocked_by_partner
      ? "Собеседник ограничил общение"
    : "В этом канале писать может только создатель";

  if (!state.activeMessages.length) {
    disposeVideoPlayers();
    state.lastRenderedChatId = activeChat.id;
    renderEmpty(
      elements.messageList,
      canSendToChat(activeChat) ? "Сообщений пока нет. Напишите первое." : "Сообщений пока нет."
    );
    return;
  }

  const isDifferentChat = state.lastRenderedChatId !== activeChat.id;
  const distanceFromBottom = elements.messageList.scrollHeight - elements.messageList.scrollTop - elements.messageList.clientHeight;
  const shouldStickToBottom = isDifferentChat || distanceFromBottom <= 80;

  const existingMessages = [...elements.messageList.querySelectorAll(".message-card[data-message-id]")];
  const canAppendWithoutReset =
    state.lastRenderedChatId === activeChat.id &&
    !elements.messageList.querySelector(".empty-state") &&
    existingMessages.length <= state.activeMessages.length &&
    existingMessages.every((element, index) => {
      const message = state.activeMessages[index];
      return element.dataset.messageId === message.id &&
        state.renderedMessageSnapshots.get(message.id) === JSON.stringify(message);
    });
  const messagesToRender = canAppendWithoutReset
    ? state.activeMessages.slice(existingMessages.length)
    : state.activeMessages;

  if (!canAppendWithoutReset) {
    disposeVideoPlayers();
    elements.messageList.replaceChildren();
    state.renderedMessageSnapshots.clear();
  }

  const messageMarkup = messagesToRender
    .map((message) => {
      const mine = message.sender_id === state.profile.id;
      const voiceMessage = message.attachment_type?.startsWith("audio/") && /^voice[-_]/i.test(message.attachment_name || "");
      const author = getMessageAuthorName(message, activeChat);
      const receipt = activeChat.chat_type === "direct"
        ? renderReadReceipt(getReadReceiptStatus(message, activeChat), "read-receipt--message")
        : "";
      const canManage = mine && !message.is_deleted;
      return `
        <article class="message-card ${mine ? "message-card--mine" : ""} ${voiceMessage ? "message-card--voice" : ""}" data-message-id="${message.id}">
          <div class="message-card__meta">
            <span>${escapeHtml(author)}</span>
            <span class="message-card__meta-end">
              ${receipt}
              <span>${escapeHtml(formatTime(message.created_at))}</span>
            </span>
          </div>
          ${message.is_deleted ? `<div class="message-card__text message-card__deleted">Сообщение удалено</div>` : ""}
          ${!message.is_deleted && message.content ? `<div class="message-card__text">${escapeHtml(message.content)}</div>` : ""}
          ${!message.is_deleted ? renderStickerMessage(message) : ""}
          ${!message.is_deleted ? renderAttachment(message, activeChat) : ""}
          <div class="message-card__footer">
            <span class="message-card__badge">${message.edited_at && !message.is_deleted ? "Изменено" : ""}</span>
            ${canManage ? `
              <span class="message-card__actions">
                <button class="message-card__action" type="button" data-edit-message-id="${message.id}">Изменить</button>
                <button class="message-card__action message-card__action--delete" type="button" data-delete-message-id="${message.id}">Удалить</button>
              </span>
            ` : "<span></span>"}
          </div>
        </article>
      `;
    })
    .join("");

  if (messageMarkup) {
    const messageTemplate = document.createElement("template");
    messageTemplate.innerHTML = messageMarkup;
    elements.messageList.append(messageTemplate.content);
  }

  setupVoicePlayers();
  setupVideoPlayers();

  state.activeMessages.forEach((message) => {
    state.seenMessageIds.add(message.id);
    state.renderedMessageSnapshots.set(message.id, JSON.stringify(message));
  });
  state.lastRenderedChatId = activeChat.id;

  if (shouldStickToBottom) {
    elements.messageList.scrollTop = elements.messageList.scrollHeight;
  }
}

function renderChatHeader() {
  const activeChat = getActiveChat();
  elements.mobileChatAvatar.innerHTML = activeChat
    ? renderAvatarMarkup(activeChat.partner, "mobile-chat-avatar__content")
    : "";

  if (!activeChat) {
    elements.activeChatTitle.textContent = "Выберите диалог";
    elements.activeChatMeta.textContent = "Найдите пользователя слева и откройте переписку.";
    renderEmpty(elements.chatInfoCard, "Здесь появится информация о собеседнике.");
    updateCallButton();
    return;
  }

  elements.activeChatTitle.textContent = getChatTitle(activeChat);
  const baseMeta = activeChat.chat_type === "direct"
    ? getPresenceLabel(activeChat.partner)
    : getChatSubtitle(activeChat);
  const typingLabel = getTypingLabel(activeChat);
  elements.activeChatMeta.textContent = typingLabel || baseMeta;
  const blockAction = activeChat.chat_type === "direct"
    ? `
      <button class="secondary-button" type="button" data-toggle-block="${activeChat.partner.id}">
        ${activeChat.is_blocked ? "Разблокировать" : "Заблокировать"}
      </button>
      ${activeChat.is_blocked_by_partner ? `<div class="muted">Собеседник ограничил общение с вами.</div>` : ""}
    `
    : "";
  const memberManagement = renderMemberManagement(activeChat);
  elements.chatInfoCard.innerHTML = `
    <div class="info-card__title">${escapeHtml(getChatTitle(activeChat))}</div>
    <div class="muted">${escapeHtml(getChatSubtitle(activeChat))}</div>
    <div>${escapeHtml(getChatHeaderDescription(activeChat))}</div>
    ${blockAction}
    ${memberManagement}
    <div class="muted">Диалог создан: ${escapeHtml(formatTime(activeChat.created_at))}</div>
  `;
  updateCallButton();
}

function renderSearchResults(users) {
  if (!users.length) {
    renderEmpty(elements.searchResults, "Ничего не найдено.");
    return;
  }

  elements.searchResults.innerHTML = users
    .map((user) => `
      <div class="search-item">
        <div class="search-item__header">
          <div>
            <div class="search-item__name">${escapeHtml(user.display_name)}</div>
            <div class="search-item__username">@${escapeHtml(user.username)}</div>
          </div>
        </div>
        <div class="muted">${escapeHtml(user.bio || "Без описания")}</div>
        <button class="search-item__button" type="button" data-user-id="${user.id}">Написать</button>
      </div>
    `)
    .join("");
}

function renderMessageSearchResults(results) {
  if (!results.length) {
    renderEmpty(elements.messageSearchResults, "Ничего не найдено.");
    return;
  }

  elements.messageSearchResults.innerHTML = results
    .map((item) => `
      <button class="message-search-item" type="button" data-chat-id="${item.chatId}" data-message-id="${item.messageId}">
        <div class="message-search-item__title">${escapeHtml(item.chatTitle)}</div>
        <div class="message-search-item__meta">${escapeHtml(item.meta)}</div>
        <div class="message-search-item__text">${escapeHtml(item.text)}</div>
      </button>
    `)
    .join("");
}

function updateStickerStatus() {
  if (!state.pendingStickerFile) {
    elements.stickerStatus.textContent = state.stickers.length
      ? "Нажмите «Отправить», чтобы отправить выбранный стикер в активный чат."
      : "Загрузите PNG, WEBP или другое изображение и отправляйте его в чат.";
    return;
  }

  elements.stickerStatus.textContent = `Выбран стикер: ${state.pendingStickerFile.name}`;
}

function renderStickerGallery() {
  if (!state.stickers.length) {
    renderEmpty(elements.stickerGallery, "У вас пока нет стикеров.");
    return;
  }

  const activeChat = getActiveChat();
  const canSend = canSendToChat(activeChat);

  elements.stickerGallery.innerHTML = state.stickers
    .map((sticker) => `
      <div class="sticker-tile">
        <img src="${escapeAttribute(sticker.image_url)}" alt="${escapeAttribute(sticker.title)}" class="sticker-tile__image" />
        <div class="sticker-tile__title">${escapeHtml(sticker.title)}</div>
        <button class="secondary-button sticker-tile__send" type="button" data-sticker-id="${sticker.id}" ${!activeChat || !canSend ? "disabled" : ""}>Отправить</button>
      </div>
    `)
    .join("");
}

function getCallStatusLabel(entry) {
  const directionLabel = entry.direction === "incoming" ? "Входящий" : "Исходящий";
  const statusLabels = {
    ringing: "Звонок",
    connected: "Соединён",
    declined: "Отклонён",
    missed: "Пропущен",
    canceled: "Отменён",
    ended: "Завершён",
  };

  return `${directionLabel} • ${statusLabels[entry.status] || entry.status}`;
}

function renderCallHistory() {
  if (!elements.callHistoryList) {
    return;
  }

  if (!state.hasCallLogs) {
    renderEmpty(elements.callHistoryList, "История звонков станет доступна после обновления SQL-схемы.");
    return;
  }

  if (!state.callHistory.length) {
    renderEmpty(elements.callHistoryList, "История звонков пока пуста.");
    return;
  }

  elements.callHistoryList.innerHTML = state.callHistory
    .map((entry) => `
      <div class="call-history-item">
        <div class="call-history-item__top">
          <div class="call-history-item__name">${escapeHtml(entry.partner_name || "Неизвестный контакт")}</div>
          <div class="call-history-item__time">${escapeHtml(formatTime(entry.started_at))}</div>
        </div>
        <div class="call-history-item__meta">${escapeHtml(getCallStatusLabel(entry))}</div>
      </div>
    `)
    .join("");
}

function updateCallOverlay({ preserveCallEndedAudio = false } = {}) {
  const call = state.currentCall;

  if (!call) {
    state.callMinimized = false;
  }

  document.body.classList.toggle("has-minimized-call", Boolean(call && state.callMinimized));
  elements.callOverlay.hidden = !call || state.callMinimized;
  elements.mobileCallMini.hidden = !call || !state.callMinimized;
  elements.callOverlay.classList.toggle("call-overlay--incoming", call?.status === "incoming");
  elements.callOverlay.classList.toggle("call-overlay--active", call?.status === "active");

  if (!call) {
    clearCallSounds({ preserveCallEndedAudio });
    elements.callAvatarImage.hidden = true;
    elements.callAvatarImage.removeAttribute("src");
    elements.callAvatarLetter.hidden = false;
    elements.callAvatarLetter.textContent = "С";
    elements.callTitle.textContent = "Звонок";
    elements.callSubtitle.textContent = "Подключение...";
    elements.callStateBadge.textContent = "Ожидание";
    elements.toggleMic.hidden = true;
    elements.toggleMic.classList.remove("is-muted");
    elements.acceptCall.hidden = true;
    elements.declineCall.hidden = true;
    elements.hangupCall.hidden = true;
    elements.remoteAudio.srcObject = null;
    updateCallButton();
    return;
  }

  const partner = call.partner;
  elements.mobileCallMiniName.textContent = partner.display_name;
  elements.mobileCallMiniState.textContent = call.status === "active"
    ? "Звонок продолжается"
    : call.status === "incoming"
      ? "Входящий звонок"
      : call.status === "calling"
        ? "Вызов..."
        : "Соединение...";
  elements.callEyebrow.textContent = call.direction === "incoming" ? "входящий звонок" : "аудиозвонок";
  elements.callTitle.textContent = partner.display_name;
  elements.callSubtitle.textContent =
    call.status === "incoming"
      ? `${partner.display_name} звонит вам`
      : call.status === "calling"
        ? `Вызываем ${partner.display_name}`
        : call.status === "connecting"
          ? "Соединяем аудио..."
          : "Соединение установлено";
  elements.callStateBadge.textContent =
    call.status === "incoming"
      ? "Входящий"
      : call.status === "calling"
        ? "Исходящий"
        : call.status === "connecting"
          ? "Подключение"
          : "В разговоре";
  if (call.status === "active") {
    updateCallDurationDisplay(call);
  }
  elements.toggleMic.hidden = !call.localStream;
  elements.toggleMic.classList.toggle("is-muted", !call.micEnabled);
  const microphoneLabel = call.micEnabled ? "Выключить микрофон" : "Включить микрофон";
  elements.toggleMic.setAttribute("aria-label", microphoneLabel);
  elements.toggleMic.title = microphoneLabel;
  elements.toggleMic.querySelector(".visually-hidden").textContent = microphoneLabel;
  elements.acceptCall.hidden = call.status !== "incoming";
  elements.declineCall.hidden = call.status !== "incoming";
  elements.hangupCall.hidden = !["calling", "connecting", "active"].includes(call.status);
  const hangupLabel = call.status === "calling" ? "Сбросить вызов" : "Завершить звонок";
  elements.hangupCall.setAttribute("aria-label", hangupLabel);
  elements.hangupCall.title = hangupLabel;
  const visibleHangupLabel = elements.hangupCall.querySelector(".call-control-label");
  if (visibleHangupLabel) visibleHangupLabel.textContent = hangupLabel;

  if (partner.avatar_url) {
    elements.callAvatarImage.hidden = false;
    elements.callAvatarImage.src = partner.avatar_url;
    elements.callAvatarLetter.hidden = true;
  } else {
    elements.callAvatarImage.hidden = true;
    elements.callAvatarImage.removeAttribute("src");
    elements.callAvatarLetter.hidden = false;
    elements.callAvatarLetter.textContent = getInitials(partner.display_name);
  }

  elements.remoteAudio.srcObject = call.remoteStream || null;
  elements.remoteAudio.volume = 1;
  elements.remoteAudio.muted = false;
  updateCallButton();
}

function formatCallDuration(connectedAt) {
  const totalSeconds = Math.max(0, Math.floor((Date.now() - connectedAt) / 1000));
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateCallDurationDisplay(call) {
  if (call !== state.currentCall || call.status !== "active" || !call.connectedAt) return;
  const duration = formatCallDuration(call.connectedAt);
  elements.callSubtitle.textContent = `Звонок длится ${duration}`;
  elements.mobileCallMiniState.textContent = `Разговор · ${duration}`;
}

function markCallActive(call) {
  call.status = "active";
  call.connectedAt ||= Date.now();
  if (!state.callDurationTimerId) {
    state.callDurationTimerId = window.setInterval(() => updateCallDurationDisplay(call), 1000);
  }
  updateCallDurationDisplay(call);
}

function clearCallDurationTimer() {
  if (!state.callDurationTimerId) return;
  window.clearInterval(state.callDurationTimerId);
  state.callDurationTimerId = null;
}

function stopCallMediaStream(stream) {
  if (!stream) {
    return;
  }

  stream.getTracks().forEach((track) => track.stop());
}

function clearCallChannelRetry() {
  if (state.callChannelRetryId) {
    window.clearTimeout(state.callChannelRetryId);
    state.callChannelRetryId = null;
  }
}

function ensureChannelSubscribed(channel) {
  if (!channel) {
    return Promise.reject(new Error("Канал звонка не создан."));
  }

  if (state.callChannelReady && !["TIMED_OUT", "CHANNEL_ERROR", "CLOSED", "retrying"].includes(state.callChannelStatus)) {
    return state.callChannelReady;
  }

  const readyPromise = new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      state.callChannelReady = null;
      state.callChannelStatus = "TIMED_OUT";
      reject(new Error("Подписка на канал звонка не успела установиться."));
    }, CALL_CHANNEL_SUBSCRIBE_TIMEOUT_MS);

    channel.subscribe((status) => {
      state.callChannelStatus = status;

      if (status === "SUBSCRIBED") {
        window.clearTimeout(timeoutId);
        resolve(channel);
        return;
      }

      if (["TIMED_OUT", "CHANNEL_ERROR", "CLOSED"].includes(status)) {
        window.clearTimeout(timeoutId);
        state.callChannelReady = null;
        reject(new Error(`Не удалось подключить канал звонка: ${status}.`));
      }
    });
  });

  state.callChannelReady = readyPromise;
  return state.callChannelReady;
}

async function updatePresence(force = false) {
  if (!state.supabase || !state.profile?.id || !state.session) {
    return;
  }

  if (!force && document.hidden) {
    return;
  }

  const lastSeenAt = new Date().toISOString();
  const { error } = await state.supabase
    .from("profiles")
    .update({ last_seen_at: lastSeenAt })
    .eq("id", state.profile.id);

  if (error) {
    throw error;
  }

  state.profile.last_seen_at = lastSeenAt;
}

function stopPresenceHeartbeat() {
  if (state.presenceHeartbeatId) {
    window.clearInterval(state.presenceHeartbeatId);
    state.presenceHeartbeatId = null;
  }
}

function startPresenceHeartbeat() {
  stopPresenceHeartbeat();
  updatePresence(true).catch((error) => {
    console.error("Не удалось обновить статус присутствия:", error);
  });
  state.presenceHeartbeatId = window.setInterval(() => {
    updatePresence().catch((error) => {
      console.error("Не удалось обновить статус присутствия:", error);
    });
  }, PRESENCE_HEARTBEAT_INTERVAL_MS);
}

function clearCallCleanupTimer() {
  if (state.callCleanupTimerId) {
    window.clearTimeout(state.callCleanupTimerId);
    state.callCleanupTimerId = null;
  }
}

function scheduleCallCleanup() {
  clearCallCleanupTimer();
  state.callCleanupTimerId = window.setTimeout(() => {
    if (!state.currentCall) {
      return;
    }

    finishCallLocally();
  }, CALL_DISCONNECT_GRACE_MS);
}

function finishCallLocally({ preserveCallEndedAudio = false } = {}) {
  const call = state.currentCall;
  clearCallCleanupTimer();
  clearCallDurationTimer();
  clearCallSounds({ preserveCallEndedAudio });

  if (call?.peerConnection) {
    call.peerConnection.onicecandidate = null;
    call.peerConnection.ontrack = null;
    call.peerConnection.onconnectionstatechange = null;
    call.peerConnection.close();
  }

  stopCallMediaStream(call?.localStream);
  stopCallMediaStream(call?.remoteStream);
  clearPendingCallSignals(call?.id);
  state.currentCall = null;
  updateCallOverlay({ preserveCallEndedAudio });
}

function toggleMicrophone() {
  const call = state.currentCall;

  if (!call?.localStream) {
    return;
  }

  call.micEnabled = !call.micEnabled;
  call.localStream.getAudioTracks().forEach((track) => {
    track.enabled = call.micEnabled;
  });
  updateCallOverlay();
}

function getCallChannel() {
  if (state.callChannel) {
    return state.callChannel;
  }

  state.callChannel = state.supabase
    .channel(CALL_CHANNEL_NAME, {
      config: {
        broadcast: {
          self: false,
          ack: true,
        },
      },
    })
    .on("broadcast", { event: "call-ring" }, ({ payload }) => {
      handleCallBroadcast("call-ring", payload).catch((error) => console.error(error));
    })
    .on("broadcast", { event: "call-accept" }, ({ payload }) => {
      handleCallBroadcast("call-accept", payload).catch((error) => console.error(error));
    })
    .on("broadcast", { event: "call-decline" }, ({ payload }) => {
      handleCallBroadcast("call-decline", payload).catch((error) => console.error(error));
    })
    .on("broadcast", { event: "call-end" }, ({ payload }) => {
      handleCallBroadcast("call-end", payload).catch((error) => console.error(error));
    })
    .on("broadcast", { event: "call-signal" }, ({ payload }) => {
      handleCallBroadcast("call-signal", payload).catch((error) => console.error(error));
    });

  return state.callChannel;
}

async function sendCallEvent(targetUserId, event, payload) {
  const channel = getCallChannel();
  await ensureChannelSubscribed(channel);

  const response = await channel.send({
    type: "broadcast",
    event,
    payload,
  });

  if (response === "ok" || response?.status === "ok") {
    return;
  }

  state.callChannelReady = null;
  state.callChannelStatus = "retrying";
  await ensureChannelSubscribed(channel);

  const retryResponse = await channel.send({
    type: "broadcast",
    event,
    payload,
  });

  if (retryResponse === "ok" || retryResponse?.status === "ok") {
    return;
  }

  throw new Error(`Не удалось отправить событие звонка: ${event}.`);
}

function buildCallState(chat, overrides = {}) {
  return {
    id: overrides.id || createCallId(),
    chatId: chat.id,
    partner: chat.partner,
    direction: overrides.direction || "outgoing",
    status: overrides.status || "calling",
    micEnabled: overrides.micEnabled ?? true,
    localStream: overrides.localStream || null,
    remoteStream: overrides.remoteStream || new MediaStream(),
    peerConnection: overrides.peerConnection || null,
    pendingIceCandidates: overrides.pendingIceCandidates || [],
    pendingRemoteOffer: overrides.pendingRemoteOffer || null,
    localTrackIds: overrides.localTrackIds || new Set(),
    offerStarted: overrides.offerStarted || false,
    logId: overrides.logId || null,
  };
}

async function loadCallHistory() {
  if (!state.profile?.id || !state.hasCallLogs) {
    state.callHistory = [];
    renderCallHistory();
    return;
  }

  const { data, error } = await state.supabase
    .from("call_logs")
    .select("*")
    .eq("user_id", state.profile.id)
    .order("started_at", { ascending: false })
    .limit(30);

  if (error) {
    if (isMissingCallLogsError(error)) {
      state.hasCallLogs = false;
      state.callHistory = [];
      renderCallHistory();
      return;
    }
    throw error;
  }

  const partnerProfiles = await fetchProfilesByIds((data || []).map((item) => item.partner_id));
  const partnerMap = new Map(partnerProfiles.map((profile) => [profile.id, profile]));

  state.callHistory = (data || []).map((item) => ({
    ...item,
    partner_name: partnerMap.get(item.partner_id)?.display_name || "Неизвестный контакт",
  }));
  renderCallHistory();
}

async function createCallLog(call, direction, status = "ringing") {
  if (!call?.partner?.id || !state.profile?.id || !state.hasCallLogs) {
    return null;
  }

  const { data, error } = await state.supabase
    .from("call_logs")
    .insert({
      call_id: call.id,
      user_id: state.profile.id,
      chat_id: call.chatId,
      partner_id: call.partner.id,
      direction,
      status,
    })
    .select("id")
    .single();

  if (error) {
    if (isMissingCallLogsError(error)) {
      state.hasCallLogs = false;
      return null;
    }
    throw error;
  }

  call.logId = data.id;
  await loadCallHistory();
  return data.id;
}

async function updateCallLog(call, status, extra = {}) {
  if (!call?.logId || !state.profile?.id || !state.hasCallLogs) {
    return;
  }

  const payload = {
    status,
    updated_at: new Date().toISOString(),
    ...extra,
  };

  const { error } = await state.supabase
    .from("call_logs")
    .update(payload)
    .eq("id", call.logId)
    .eq("user_id", state.profile.id);

  if (error) {
    if (isMissingCallLogsError(error)) {
      state.hasCallLogs = false;
      return;
    }
    throw error;
  }

  await loadCallHistory();
}

async function ensureLocalAudioStream() {
  if (state.currentCall?.localStream) {
    return state.currentCall.localStream;
  }

  return navigator.mediaDevices.getUserMedia({ audio: true, video: false });
}

function attachLocalTracks(call, peerConnection) {
  if (!call?.localStream || !peerConnection) {
    return;
  }

  const trackIds = call.localTrackIds || new Set();
  call.localTrackIds = trackIds;

  call.localStream.getTracks().forEach((track) => {
    if (trackIds.has(track.id)) {
      return;
    }

    peerConnection.addTrack(track, call.localStream);
    trackIds.add(track.id);
  });
}

async function flushPendingIceCandidates(call) {
  if (!call?.peerConnection?.remoteDescription || !call.pendingIceCandidates?.length) {
    return;
  }

  const pendingCandidates = [...call.pendingIceCandidates];
  call.pendingIceCandidates = [];

  for (const candidate of pendingCandidates) {
    try {
      await call.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error("Не удалось применить ICE-кандидат:", error);
    }
  }
}

function createPeerConnection(call) {
  if (call.peerConnection) {
    attachLocalTracks(call, call.peerConnection);
    return call.peerConnection;
  }

  const peerConnection = new RTCPeerConnection(RTC_CONFIGURATION);
  const remoteStream = call.remoteStream || new MediaStream();
  call.remoteStream = remoteStream;
  attachLocalTracks(call, peerConnection);

  peerConnection.ontrack = (event) => {
    event.streams[0]?.getTracks().forEach((track) => remoteStream.addTrack(track));
    const wasActive = call.status === "active";
    markCallActive(call);
    clearCallCleanupTimer();
    updateCallOverlay();
    ensureRemoteAudioPlayback().catch(() => {});
    if (!wasActive) {
      playCallConnectedTone().catch((error) => console.error(error));
    }
  };

  peerConnection.onicecandidate = (event) => {
    if (!event.candidate || !state.currentCall || state.currentCall.id !== call.id) {
      return;
    }

    sendCallEvent(call.partner.id, "call-signal", {
      chatId: call.chatId,
      callId: call.id,
      fromUserId: state.profile.id,
      targetUserId: call.partner.id,
      signal: {
        type: "candidate",
        candidate: event.candidate,
      },
    }).catch((error) => {
      console.error(error);
    });
  };

  peerConnection.onconnectionstatechange = () => {
    if (!state.currentCall || state.currentCall.id !== call.id) {
      return;
    }

    if (["connected", "completed"].includes(peerConnection.connectionState)) {
      const wasActive = call.status === "active";
      markCallActive(call);
      clearCallCleanupTimer();
      updateCallOverlay();
      if (!wasActive) {
        playCallConnectedTone().catch((error) => console.error(error));
      }
      return;
    }

    if (peerConnection.connectionState === "disconnected") {
      if (call.status === "active") {
        startCallReconnectingTone();
      }
      scheduleCallCleanup();
      return;
    }

    if (["failed", "closed"].includes(peerConnection.connectionState)) {
      clearCallCleanupTimer();
      setStatus("Звонок завершён.");
      playCallEndedTone().catch((error) => console.error(error));
      finishCallLocally({ preserveCallEndedAudio: true });
    }
  };

  peerConnection.oniceconnectionstatechange = () => {
    if (!state.currentCall || state.currentCall.id !== call.id) {
      return;
    }

    if (["connected", "completed"].includes(peerConnection.iceConnectionState)) {
      clearCallCleanupTimer();
      return;
    }

    if (peerConnection.iceConnectionState === "disconnected") {
      scheduleCallCleanup();
      return;
    }

    if (["failed", "closed"].includes(peerConnection.iceConnectionState)) {
      clearCallCleanupTimer();
      setStatus("Звонок завершён.");
      playCallEndedTone().catch((error) => console.error(error));
      finishCallLocally({ preserveCallEndedAudio: true });
    }
  };

  call.peerConnection = peerConnection;
  return peerConnection;
}

async function startOfferExchange(call) {
  if (call.offerStarted) {
    return;
  }

  call.offerStarted = true;
  const peerConnection = createPeerConnection(call);
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  call.status = "connecting";
  updateCallOverlay();
  await sendCallEvent(call.partner.id, "call-signal", {
    chatId: call.chatId,
    callId: call.id,
    fromUserId: state.profile.id,
    targetUserId: call.partner.id,
    signal: {
      type: "offer",
      sdp: peerConnection.localDescription,
    },
  });
}

async function answerIncomingOffer(call, chatId) {
  if (!call?.pendingRemoteOffer) {
    return;
  }

  const peerConnection = createPeerConnection(call);
  await peerConnection.setRemoteDescription(new RTCSessionDescription(call.pendingRemoteOffer));
  call.pendingRemoteOffer = null;
  await flushPendingIceCandidates(call);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  await sendCallEvent(call.partner.id, "call-signal", {
    chatId,
    callId: call.id,
    fromUserId: state.profile.id,
    targetUserId: call.partner.id,
    signal: {
      type: "answer",
      sdp: peerConnection.localDescription,
    },
  });
  call.status = "connecting";
  updateCallOverlay();
}

async function processQueuedCallSignals(callId, chatId) {
  const queuedSignals = [...getPendingCallSignals(callId)];
  clearPendingCallSignals(callId);

  for (const queuedPayload of queuedSignals) {
    await handleIncomingCallSignal(chatId, queuedPayload);
  }
}

async function startCall() {
  const activeChat = getActiveChat();

  if (!activeChat) {
    setStatus("Сначала откройте диалог.", true);
    return;
  }

  if (!canCallChat(activeChat)) {
    setStatus("Звонки доступны только в личных диалогах.", true);
    return;
  }

  if (state.currentCall) {
    setStatus("Сначала завершите текущий звонок.", true);
    return;
  }

  primeCallAudio();

  try {
    const localStream = await ensureLocalAudioStream();
    state.currentCall = buildCallState(activeChat, {
      direction: "outgoing",
      status: "calling",
      localStream,
    });
    await createCallLog(state.currentCall, "outgoing", "ringing");
    updateCallOverlay();
    await sendCallEvent(activeChat.partner.id, "call-ring", {
      chatId: activeChat.id,
      callId: state.currentCall.id,
      fromUserId: state.profile.id,
      targetUserId: activeChat.partner.id,
    });
    startOutgoingRingback();
    createPeerConnection(state.currentCall);
    await startOfferExchange(state.currentCall);
    setStatus(`Вызываем ${activeChat.partner.display_name}...`);
  } catch (error) {
    console.error(error);
    setStatus(getFriendlyError(error, "Не удалось начать звонок. Проверьте подключение к Realtime и разрешение на микрофон."), true);
    finishCallLocally();
  }
}

async function acceptIncomingCall() {
  const call = state.currentCall;

  if (!call || call.status !== "incoming") {
    return;
  }

  callAudio.stop("incoming-ringtone");
  primeCallAudio();

  try {
    call.localStream = await ensureLocalAudioStream();
    createPeerConnection(call);
    call.status = "connecting";
    clearCallSounds();
    await updateCallLog(call, "connected", { answered_at: new Date().toISOString() });
    await answerIncomingOffer(call, call.chatId);
    updateCallOverlay();
    await ensureRemoteAudioPlayback();
    await sendCallEvent(call.partner.id, "call-accept", {
      chatId: call.chatId,
      callId: call.id,
      fromUserId: state.profile.id,
      targetUserId: call.partner.id,
    });
    setStatus("Подключаем звонок...");
  } catch (error) {
    console.error(error);
    setStatus(getFriendlyError(error, "Не удалось принять звонок. Проверьте подключение к Realtime и разрешение на микрофон."), true);
    await declineCurrentCall();
  }
}

async function declineCurrentCall() {
  const call = state.currentCall;

  if (!call) {
    return;
  }

  primeCallAudio();

  const eventName = call.status === "incoming" ? "call-decline" : "call-end";
  await sendCallEvent(call.partner.id, eventName, {
    chatId: call.chatId,
    callId: call.id,
    fromUserId: state.profile.id,
    targetUserId: call.partner.id,
  }).catch((error) => {
    console.error(error);
  });

  if (call.status === "incoming") {
    await updateCallLog(call, "declined", { ended_at: new Date().toISOString() }).catch((error) => console.error(error));
  } else {
    await updateCallLog(call, "canceled", { ended_at: new Date().toISOString() }).catch((error) => console.error(error));
  }

  playCallEndedTone().catch((error) => console.error(error));
  finishCallLocally({ preserveCallEndedAudio: true });
}

async function hangupCurrentCall() {
  const call = state.currentCall;

  if (!call) {
    return;
  }

  primeCallAudio();

  await sendCallEvent(call.partner.id, "call-end", {
    chatId: call.chatId,
    callId: call.id,
    fromUserId: state.profile.id,
    targetUserId: call.partner.id,
  }).catch((error) => {
    console.error(error);
  });

  await updateCallLog(call, call.status === "active" ? "ended" : "canceled", { ended_at: new Date().toISOString() }).catch((error) => console.error(error));

  playCallEndedTone().catch((error) => console.error(error));
  finishCallLocally({ preserveCallEndedAudio: true });
}

async function handleIncomingCallSignal(chatId, payload) {
  if (!state.profile || payload.targetUserId !== state.profile.id) {
    return;
  }

  let chat = state.chats.find((item) => item.id === chatId) || null;
  if (!chat) {
    try {
      chat = await resolveChatById(chatId, payload.fromUserId);
    } catch (error) {
      console.error(error);
    }
  }

  if (!chat) {
    return;
  }

  if (!state.currentCall || state.currentCall.id !== payload.callId) {
    queuePendingCallSignal(payload.callId, payload);
    return;
  }

  const call = state.currentCall;

  if (payload.signal.type === "offer") {
    call.pendingRemoteOffer = payload.signal.sdp;
    if (call.localStream) {
      await answerIncomingOffer(call, chatId);
    } else {
      updateCallOverlay();
    }
    return;
  }

  if (payload.signal.type === "answer") {
    const peerConnection = createPeerConnection(call);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(payload.signal.sdp));
    await flushPendingIceCandidates(call);
    call.status = "connecting";
    updateCallOverlay();
    return;
  }

  if (payload.signal.type === "candidate" && payload.signal.candidate) {
    const peerConnection = createPeerConnection(call);
    if (!peerConnection.remoteDescription) {
      call.pendingIceCandidates = call.pendingIceCandidates || [];
      call.pendingIceCandidates.push(payload.signal.candidate);
      return;
    }

    try {
      await peerConnection.addIceCandidate(new RTCIceCandidate(payload.signal.candidate));
    } catch (error) {
      console.error("Не удалось добавить ICE-кандидат:", error);
    }
  }
}

async function handleCallBroadcast(event, payload) {
  if (!state.profile || payload?.fromUserId === state.profile.id) {
    return;
  }

  const chatId = payload?.chatId;
  if (!chatId) {
    return;
  }

  let chat = state.chats.find((item) => item.id === chatId) || null;
  if (!chat) {
    try {
      chat = await resolveChatById(chatId, payload.fromUserId);
    } catch (error) {
      console.error(error);
    }
  }

  if (!chat) {
    return;
  }

  if (event === "call-ring" && payload.targetUserId === state.profile.id) {
    if (state.currentCall?.id === payload.callId) {
      updateCallOverlay();
      startIncomingRingtone();
      await processQueuedCallSignals(payload.callId, chatId);
      return;
    }

    if (state.currentCall) {
      await sendCallEvent(chat.partner.id, "call-decline", {
        chatId,
        callId: payload.callId,
        fromUserId: state.profile.id,
        targetUserId: chat.partner.id,
      });
      return;
    }

    state.currentCall = buildCallState(chat, {
      id: payload.callId,
      direction: "incoming",
      status: "incoming",
      remoteStream: new MediaStream(),
    });
    await createCallLog(state.currentCall, "incoming", "ringing").catch((error) => console.error(error));
    updateCallOverlay();
    setStatus(`${chat.partner.display_name} звонит вам.`);
    startIncomingRingtone();
    await processQueuedCallSignals(payload.callId, chatId);
    return;
  }

  if (!state.currentCall || state.currentCall.id !== payload.callId) {
    return;
  }

  if (event === "call-accept" && payload.targetUserId === state.profile.id) {
    clearCallSounds();
    await updateCallLog(state.currentCall, "connected", { answered_at: new Date().toISOString() }).catch((error) => console.error(error));
    if (!state.currentCall.offerStarted) {
      await startOfferExchange(state.currentCall);
    }
    return;
  }

  if (event === "call-decline" && payload.targetUserId === state.profile.id) {
    clearCallSounds();
    await updateCallLog(
      state.currentCall,
      state.currentCall.direction === "incoming" ? "missed" : "declined",
      { ended_at: new Date().toISOString() }
    ).catch((error) => console.error(error));
    setStatus("Собеседник отклонил звонок.", true);
    playCallEndedTone().catch((error) => console.error(error));
    finishCallLocally({ preserveCallEndedAudio: true });
    return;
  }

  if (event === "call-end" && payload.targetUserId === state.profile.id) {
    clearCallSounds();
    await updateCallLog(
      state.currentCall,
      state.currentCall.status === "active" ? "ended" : "missed",
      { ended_at: new Date().toISOString() }
    ).catch((error) => console.error(error));
    setStatus("Собеседник завершил звонок.");
    playCallEndedTone().catch((error) => console.error(error));
    finishCallLocally({ preserveCallEndedAudio: true });
    return;
  }

  if (event === "call-signal") {
    if (payload.targetUserId === state.profile.id && (!state.currentCall || state.currentCall.id !== payload.callId)) {
      queuePendingCallSignal(payload.callId, payload);

      if (payload.signal?.type === "offer") {
        state.currentCall = buildCallState(chat, {
          id: payload.callId,
          direction: "incoming",
          status: "incoming",
          remoteStream: new MediaStream(),
        });
        await createCallLog(state.currentCall, "incoming", "ringing").catch((error) => console.error(error));
        updateCallOverlay();
        setStatus(`${chat.partner.display_name} звонит вам.`);
        startIncomingRingtone();
        await processQueuedCallSignals(payload.callId, chatId);
      }
      return;
    }

    await handleIncomingCallSignal(chatId, payload);
  }
}

function handleProfileRealtime(payload) {
  const changedProfile = payload.new || payload.old;
  const changedProfileId = changedProfile?.id;

  if (!changedProfileId) {
    return;
  }

  if (state.profile?.id === changedProfileId && payload.new) {
    state.profile = {
      ...state.profile,
      ...payload.new,
    };
  }

  let hasPartnerUpdate = false;
  state.chats = state.chats.map((chat) => {
    if (!payload.new) {
      return chat;
    }

    let nextChat = chat;
    if (chat.partner?.id === changedProfileId) {
      hasPartnerUpdate = true;
      nextChat = {
        ...nextChat,
        partner: {
          ...nextChat.partner,
          ...payload.new,
        },
      };
    }

    if (chat.members?.some((member) => member.id === changedProfileId)) {
      hasPartnerUpdate = true;
      nextChat = {
        ...nextChat,
        members: nextChat.members.map((member) => (
          member.id === changedProfileId ? { ...member, ...payload.new } : member
        )),
      };
    }

    return nextChat;
  });

  if (!hasPartnerUpdate) {
    return;
  }

  renderChats();
  renderChatHeader();
  renderMessages();
}

function stopCallSignalSubscriptions() {
  clearCallChannelRetry();

  if (state.callChannel) {
    state.supabase.removeChannel(state.callChannel);
    state.callChannel = null;
  }

  state.callChannelReady = null;
  state.callChannelStatus = "idle";
}

function clearLocalTypingTimer() {
  if (state.localTypingStopTimerId) {
    window.clearTimeout(state.localTypingStopTimerId);
    state.localTypingStopTimerId = null;
  }
}

function stopTypingSubscriptions() {
  clearLocalTypingTimer();

  if (state.typingChannel) {
    state.supabase.removeChannel(state.typingChannel);
    state.typingChannel = null;
  }

  state.typingChannelReady = null;
  state.typingUsersByChat = new Map();
  state.localTypingChatId = null;
}

function ensureTypingChannelSubscribed() {
  if (!state.supabase || !state.profile) {
    return Promise.reject(new Error("Typing channel unavailable."));
  }

  if (state.typingChannelReady) {
    return state.typingChannelReady;
  }

  if (!state.typingChannel) {
    state.typingChannel = state.supabase
      .channel(TYPING_CHANNEL_NAME, {
        config: {
          broadcast: {
            self: false,
            ack: false,
          },
        },
      })
      .on("broadcast", { event: "typing" }, ({ payload }) => {
        try {
          handleTypingBroadcast(payload);
        } catch (error) {
          console.error(error);
        }
      });
  }

  state.typingChannelReady = new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      state.typingChannelReady = null;
      reject(new Error("Typing channel subscribe timeout."));
    }, 10000);

    state.typingChannel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        window.clearTimeout(timeoutId);
        resolve(state.typingChannel);
        return;
      }

      if (["TIMED_OUT", "CHANNEL_ERROR", "CLOSED"].includes(status)) {
        window.clearTimeout(timeoutId);
        state.typingChannelReady = null;
        reject(new Error(`Typing channel error: ${status}`));
      }
    });
  });

  return state.typingChannelReady;
}

function handleTypingBroadcast(payload) {
  if (!payload?.chatId || !payload?.userId || payload.userId === state.profile?.id) {
    return;
  }

  const activeChat = getActiveChat();
  const typingNames = state.typingUsersByChat.get(payload.chatId) || [];
  const nextNames = payload.isTyping
    ? [...new Set([...typingNames, payload.displayName || "Собеседник"])]
    : typingNames.filter((name) => name !== (payload.displayName || "Собеседник"));

  if (nextNames.length) {
    state.typingUsersByChat.set(payload.chatId, nextNames);
  } else {
    state.typingUsersByChat.delete(payload.chatId);
  }

  if (activeChat?.id === payload.chatId) {
    renderChatHeader();
  }
}

async function sendTypingState(isTyping) {
  const activeChat = getActiveChat();
  if (!activeChat || !state.profile || !canSendToChat(activeChat)) {
    return;
  }

  try {
    const channel = await ensureTypingChannelSubscribed();
    await channel.send({
      type: "broadcast",
      event: "typing",
      payload: {
        chatId: activeChat.id,
        userId: state.profile.id,
        displayName: state.profile.display_name,
        isTyping,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

function scheduleTypingStop(chatId) {
  clearLocalTypingTimer();
  state.localTypingStopTimerId = window.setTimeout(() => {
    if (state.localTypingChatId !== chatId) {
      return;
    }

    sendTypingState(false).catch((error) => console.error(error));
    state.localTypingChatId = null;
    state.localTypingStopTimerId = null;
  }, TYPING_IDLE_TIMEOUT_MS);
}

function handleLocalTypingInput() {
  const activeChat = getActiveChat();
  if (!activeChat || !canSendToChat(activeChat)) {
    return;
  }

  const hasText = Boolean(elements.messageInput.value.trim());
  if (!hasText) {
    if (state.localTypingChatId === activeChat.id) {
      sendTypingState(false);
      state.localTypingChatId = null;
      clearLocalTypingTimer();
    }
    return;
  }

  if (state.localTypingChatId !== activeChat.id) {
    state.localTypingChatId = activeChat.id;
    sendTypingState(true);
  }

  scheduleTypingStop(activeChat.id);
}

function syncCallSignalSubscriptions() {
  if (!state.supabase || !state.profile) {
    return;
  }

  const channel = getCallChannel();
  ensureChannelSubscribed(channel).catch((error) => {
    console.warn("Не удалось сразу подключить канал звонков, пробуем ещё раз:", error);
    state.callChannelReady = null;

    if (state.callChannel) {
      state.supabase.removeChannel(state.callChannel);
      state.callChannel = null;
    }

    clearCallChannelRetry();
    state.callChannelRetryId = window.setTimeout(() => {
      state.callChannelRetryId = null;
      syncCallSignalSubscriptions();
    }, 3000);
  });
}

async function loadChats() {
  const previousActiveChatId = state.activeChatId;
  const previousChatMap = buildChatMapById(state.chats);
  if (state.favoritesEnsuredForUserId !== state.profile.id) {
    try {
      await state.supabase.rpc("ensure_favorites_chat");
      state.favoritesEnsuredForUserId = state.profile.id;
    } catch (error) {
      console.error("Не удалось подготовить Избранное:", error);
    }
  }
  const { data: myMemberships, error: membershipError } = await state.supabase
    .from("direct_chat_members")
    .select("chat_id")
    .eq("user_id", state.profile.id);

  if (membershipError) {
    throw membershipError;
  }

  const chatIds = myMemberships.map((item) => item.chat_id);
  if (!chatIds.length) {
    state.chats = [];
    state.activeChatId = null;
    state.activeMessages = [];
    syncCallSignalSubscriptions();
    renderChats();
    renderMessages();
    renderChatHeader();
    return;
  }

  const [{ data: memberRows, error: membersError }, { data: recentMessageRows, error: messagesError }, { data: chatsRows, error: chatsError }] = await Promise.all([
    state.supabase
      .from("direct_chat_members")
      .select("chat_id, user_id, last_read_at, role")
      .in("chat_id", chatIds),
    state.supabase
      .from("messages")
      .select("*")
      .in("chat_id", chatIds)
      .order("created_at", { ascending: false })
      .limit(Math.max(250, chatIds.length * 8)),
    state.supabase
      .from("direct_chats")
      .select("id, created_at, chat_type, title, created_by")
      .in("id", chatIds),
  ]);

  if (membersError) throw membersError;
  if (messagesError) throw messagesError;
  if (chatsError) throw chatsError;

  mergeRecentMessagesIntoCache(recentMessageRows || []);
  const recentMessages = recentMessageRows || [];

  const partnerIds = [...new Set(memberRows.map((row) => row.user_id))];
  const profilesRows = await fetchProfilesByIds(partnerIds);

  const profileMap = new Map(profilesRows.map((profile) => [profile.id, profile]));
  const latestMessageMap = new Map();
  recentMessages.forEach((message) => {
    if (!latestMessageMap.has(message.chat_id)) {
      latestMessageMap.set(message.chat_id, message);
    }
  });

  state.chats = chatsRows
    .map((chat) => {
      const previousChat = previousChatMap.get(chat.id);
      const members = memberRows.filter((row) => row.chat_id === chat.id);
      const partnerRow = members.find((row) => row.user_id !== state.profile.id);
      const selfRow = members.find((row) => row.user_id === state.profile.id);
      const partnerProfile = partnerRow ? profileMap.get(partnerRow.user_id) : null;
      const memberProfiles = members
        .map((member) => {
          const profile = profileMap.get(member.user_id);
          return profile ? { ...profile, role: member.role || "member" } : null;
        })
        .filter(Boolean);
      const favoritesProfile = chat.chat_type === "favorites"
        ? {
            id: state.profile.id,
            display_name: "Избранное",
            username: state.profile.username,
            avatar_url: "",
            isFavorites: true,
          }
        : null;
      if (chat.chat_type === "direct" && !partnerProfile) {
        return null;
      }

      const cachedMessages = previousChat?.messages?.length ? previousChat.messages : getCachedMessagesForChat(chat.id);
      const lastMessage = latestMessageMap.get(chat.id) || previousChat?.last_message || cachedMessages[cachedMessages.length - 1] || null;
      return {
        id: chat.id,
        chat_type: chat.chat_type || "direct",
        title: chat.title || "",
        created_by: chat.created_by || null,
        created_at: chat.created_at,
        partner: favoritesProfile || partnerProfile,
        members: memberProfiles,
        self_role: selfRow?.role || "member",
        is_blocked: partnerProfile ? state.blockedUserIds.has(partnerProfile.id) : false,
        is_blocked_by_partner: partnerProfile ? state.blockedByUserIds.has(partnerProfile.id) : false,
        messages: cachedMessages,
        last_message: lastMessage,
        last_read_at: selfRow?.last_read_at || null,
        partner_last_read_at: partnerRow?.last_read_at || null,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.chat_type === "favorites" && b.chat_type !== "favorites") {
        return -1;
      }

      if (b.chat_type === "favorites" && a.chat_type !== "favorites") {
        return 1;
      }

      const left = a.last_message?.created_at || a.created_at;
      const right = b.last_message?.created_at || b.created_at;
      return new Date(right) - new Date(left);
    });

  state.chats.forEach((chat) => {
    if (chat.last_message?.id) {
      state.seenMessageIds.add(chat.last_message.id);
    }
  });

  if (!state.activeChatId && state.chats[0]) {
    state.activeChatId = state.chats[0].id;
  }

  if (state.activeChatId && !state.chats.some((chat) => chat.id === state.activeChatId)) {
    state.activeChatId = state.chats[0]?.id || null;
  }

  if (previousActiveChatId !== state.activeChatId) {
    subscribeToActiveChat(state.activeChatId);
  }

  syncCallSignalSubscriptions();
  renderChats();
  renderChatHeader();
  renderStickerGallery();
  await loadMessages(state.activeChatId);
}

async function loadMessages(chatId) {
  const requestId = ++state.activeMessagesRequestId;

  if (!chatId) {
    state.activeMessages = [];
    renderMessages();
    return;
  }

  const { data, error } = await state.supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  if (requestId !== state.activeMessagesRequestId || chatId !== state.activeChatId) {
    return;
  }

  syncChatMessages(chatId, data || []);
  state.activeMessages = [...(data || [])];
  await markChatAsRead(chatId, data);
  renderChats();
  renderMessages();
  renderStickerGallery();
}

async function markChatAsRead(chatId, messages = state.activeMessages) {
  if (!chatId || !state.profile) {
    return;
  }

  const latestIncomingMessage = [...(messages || [])]
    .reverse()
    .find((message) => message.sender_id !== state.profile.id);

  const readAt = latestIncomingMessage?.created_at || new Date().toISOString();
  const chat = state.chats.find((item) => item.id === chatId);

  if (chat?.last_read_at && new Date(chat.last_read_at).getTime() >= new Date(readAt).getTime()) {
    return;
  }

  const { error } = await state.supabase
    .from("direct_chat_members")
    .update({ last_read_at: readAt })
    .eq("chat_id", chatId)
    .eq("user_id", state.profile.id);

  if (error) {
    throw error;
  }

  if (chat) {
    chat.last_read_at = readAt;
  }
}

async function handleChatListRealtime() {
  if (!state.session || !state.profile) {
    return;
  }

  scheduleChatListRefresh();
}

async function handleMessageRealtime(payload) {
  if (!state.session || !state.profile) {
    return;
  }

  const changedChatId = payload.new?.chat_id || payload.old?.chat_id;
  if (!changedChatId) {
    return;
  }

  const isInsert = payload.eventType === "INSERT";
  const isActiveChat = changedChatId === state.activeChatId;
  const targetChat = state.chats.find((chat) => chat.id === changedChatId) || getActiveChat();
  const changedMessage = payload.new?.chat_id ? payload.new : payload.old;

  if (changedMessage?.chat_id) {
    syncChatMessages(changedChatId, [
      ...getCachedMessagesForChat(changedChatId).filter((message) => message.id !== changedMessage.id),
      ...(payload.eventType === "DELETE" ? [] : [changedMessage]),
    ]);
  }

  if (isInsert && payload.new?.id && !state.seenMessageIds.has(payload.new.id)) {
    state.seenMessageIds.add(payload.new.id);
    if (targetChat) {
      playNotificationSound().catch((error) => {
        console.error(error);
      });
      notifyAboutMessage(targetChat, payload.new);
    }
  }

  renderChats();

  if (isActiveChat) {
    await loadMessages(changedChatId);
    setStatus("Новое сообщение пришло в реальном времени.");
    return;
  }

  const chatToPromote = state.chats.find((chat) => chat.id === changedChatId);
  if (chatToPromote) {
    state.chats = [
      chatToPromote,
      ...state.chats.filter((chat) => chat.id !== changedChatId),
    ];
    renderChats();
  }
}

function stopRealtimeSubscriptions() {
  if (state.chatListChannel) {
    state.supabase.removeChannel(state.chatListChannel);
    state.chatListChannel = null;
  }

  if (state.activeMessagesChannel) {
    state.supabase.removeChannel(state.activeMessagesChannel);
    state.activeMessagesChannel = null;
  }

  if (state.profilePresenceChannel) {
    state.supabase.removeChannel(state.profilePresenceChannel);
    state.profilePresenceChannel = null;
  }

  stopTypingSubscriptions();
  stopCallSignalSubscriptions();
}

function subscribeToActiveChat(chatId) {
  if (state.activeMessagesChannel) {
    state.supabase.removeChannel(state.activeMessagesChannel);
    state.activeMessagesChannel = null;
  }

  if (!state.profile) {
    return;
  }

  state.activeMessagesChannel = state.supabase
    .channel(`messages:${state.profile.id}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
      },
      async (payload) => {
        try {
          await handleMessageRealtime(payload);
        } catch (error) {
          console.error(error);
        }
      }
    )
    .subscribe();
}

function startRealtimeSubscriptions() {
  stopRealtimeSubscriptions();
  ensureTypingChannelSubscribed().catch((error) => console.error(error));
  syncCallSignalSubscriptions();

  state.chatListChannel = state.supabase
    .channel(`chat-members:${state.profile.id}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "direct_chat_members",
      },
      async () => {
        try {
          await handleChatListRealtime();
        } catch (error) {
          console.error(error);
        }
      }
    )
    .subscribe();

  state.profilePresenceChannel = state.supabase
    .channel(`profiles:${state.profile.id}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "profiles",
      },
      (payload) => {
        try {
          handleProfileRealtime(payload);
        } catch (error) {
          console.error(error);
        }
      }
    )
    .subscribe();

  subscribeToActiveChat(state.activeChatId);
}

async function handleSessionChange(session) {
  const authToken = ++state.authChangeToken;
  state.session = session;

  if (!session) {
    clearChatListRefreshTimer();
    state.profile = null;
    state.chats = [];
    state.activeChatId = null;
    state.activeMessages = [];
    state.allMessages = [];
    state.stickers = [];
    state.blockedUserIds = new Set();
    state.blockedByUserIds = new Set();
    state.editingMessageId = null;
    state.favoritesEnsuredForUserId = null;
    state.pendingIncomingCallSignals = new Map();
    state.callHistory = [];
    state.hasCallLogs = true;
    state.seenMessageIds.clear();
    state.pendingAvatarFile = null;
    state.pendingAttachmentFile = null;
    state.pendingStickerFile = null;
    finishCallLocally();
    clearCallSounds();
    stopPresenceHeartbeat();
    stopRealtimeSubscriptions();
    elements.authScreen.hidden = false;
    elements.appShell.hidden = true;
    elements.profileAvatarInput.value = "";
    elements.attachmentInput.value = "";
    elements.stickerFileInput.value = "";
    updateAttachmentStatus();
    updateStickerStatus();
    renderCallHistory();
    elements.roomStatus.textContent = "Для канала писать сообщения сможет создатель, участники будут читать.";
    updateNotificationUI();
    setAuthStatus("Войдите, чтобы искать пользователей и вести переписки.");
    return;
  }

  try {
    await ensureProfile(session.user);
    if (authToken !== state.authChangeToken) {
      return;
    }

    elements.authScreen.hidden = true;
    elements.appShell.hidden = false;
    state.hasCallLogs = true;
    renderEmpty(elements.searchResults, "Введите запрос и нажмите «Найти».");
    renderEmpty(elements.messageSearchResults, "Введите текст и нажмите «Искать».");
    elements.roomStatus.textContent = "Для канала писать сообщения сможет создатель, участники будут читать.";
    startRealtimeSubscriptions();
    await loadBlocks();
    await loadChats();
    await safeLoadStickers();
    await safeLoadCallHistory();
    if (authToken !== state.authChangeToken) {
      return;
    }

    updateNotificationUI();
    startPresenceHeartbeat();
    setAuthStatus("Авторизация выполнена.");
    setStatus("Сессия активна.");
  } catch (error) {
    console.error(error);
    stopRealtimeSubscriptions();
    elements.authScreen.hidden = false;
    elements.appShell.hidden = true;
    setAuthStatus(error.message || "Не удалось восстановить сессию.", true);
    setStatus(error.message || "Ошибка авторизации.", true);
  }
}

async function searchUsers(query) {
  if (!query.trim()) {
    renderEmpty(elements.searchResults, "Введите логин или имя пользователя.");
    return;
  }

  const safeQuery = query.trim().replaceAll(",", " ");
  const { data, error } = await state.supabase
    .from("profiles")
    .select("id, username, display_name, bio")
    .or(`username.ilike.%${safeQuery}%,display_name.ilike.%${safeQuery}%`)
    .neq("id", state.profile.id)
    .limit(12);

  if (error) {
    throw error;
  }

  renderSearchResults(data || []);
}

async function uploadAvatar(file) {
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "img";
  const path = `${state.profile.id}/${Date.now()}-${slugifyFileName(file.name || `avatar.${extension}`)}`;
  const { error } = await state.supabase.storage.from("avatars").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw error;
  }

  return publicAssetUrl("avatars", path);
}

function updateAttachmentUploadProgress(file, bytesSent, bytesTotal) {
  const percent = bytesTotal ? Math.round((bytesSent / bytesTotal) * 100) : 0;
  elements.attachmentStatus.hidden = false;
  elements.attachmentStatus.textContent = `Загрузка ${file.name}: ${percent}%`;
}

async function uploadAttachmentWithTus(file, path) {
  if (!window.tus?.Upload) {
    throw new Error("Модуль возобновляемой загрузки не загрузился. Обновите страницу и попробуйте ещё раз.");
  }

  const { data, error } = await state.supabase.auth.getSession();
  if (error) throw error;
  if (!data.session?.access_token) throw new Error("Сессия истекла. Войдите снова, чтобы загрузить видео.");

  await new Promise((resolve, reject) => {
    const upload = new window.tus.Upload(file, {
      endpoint: `${config.url.replace(/\/+$/, "")}/storage/v1/upload/resumable`,
      chunkSize: 6 * 1024 * 1024,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      removeFingerprintOnSuccess: true,
      headers: {
        authorization: `Bearer ${data.session.access_token}`,
        apikey: config.anonKey,
        "x-upsert": "false",
      },
      metadata: {
        bucketName: "attachments",
        objectName: path,
        contentType: file.type || "application/octet-stream",
        cacheControl: "3600",
      },
      onProgress: (bytesSent, bytesTotal) => updateAttachmentUploadProgress(file, bytesSent, bytesTotal),
      onError: reject,
      onSuccess: resolve,
    });

    upload.start();
  });
}

async function uploadAttachment(file) {
  if (file.size > MAX_ATTACHMENT_SIZE) {
    throw new Error("Файл больше 50 МиБ. Уменьшите размер видео или разделите его на части.");
  }

  const path = `${state.profile.id}/${Date.now()}-${slugifyFileName(file.name)}`;
  if (file.size > 6 * 1024 * 1024) {
    await uploadAttachmentWithTus(file, path);
    return {
      url: publicAssetUrl("attachments", path),
      path,
    };
  }

  const { error } = await state.supabase.storage.from("attachments").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw error;
  }

  return {
    url: publicAssetUrl("attachments", path),
    path,
  };
}

async function uploadSticker(file) {
  const path = `${state.profile.id}/${Date.now()}-${slugifyFileName(file.name)}`;
  const { error } = await state.supabase.storage.from("stickers").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw error;
  }

  return {
    url: publicAssetUrl("stickers", path),
    path,
  };
}

async function loadStickers() {
  const { data, error } = await state.supabase
    .from("user_stickers")
    .select("*")
    .eq("owner_id", state.profile.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  state.stickers = data || [];
  renderStickerGallery();
  updateStickerStatus();
}

async function loadBlocks() {
  if (!state.profile?.id) {
    state.blockedUserIds = new Set();
    state.blockedByUserIds = new Set();
    return;
  }

  const [{ data: blockedRows, error: blockedError }, { data: blockedByRows, error: blockedByError }] = await Promise.all([
    state.supabase
      .from("user_blocks")
      .select("blocked_id")
      .eq("blocker_id", state.profile.id),
    state.supabase
      .from("user_blocks")
      .select("blocker_id")
      .eq("blocked_id", state.profile.id),
  ]);

  if (blockedError) {
    throw blockedError;
  }

  if (blockedByError) {
    throw blockedByError;
  }

  state.blockedUserIds = new Set((blockedRows || []).map((row) => row.blocked_id));
  state.blockedByUserIds = new Set((blockedByRows || []).map((row) => row.blocker_id));
}

async function toggleBlockUser(userId) {
  if (!state.profile?.id || !userId) {
    return;
  }

  if (state.blockedUserIds.has(userId)) {
    const { error } = await state.supabase
      .from("user_blocks")
      .delete()
      .eq("blocker_id", state.profile.id)
      .eq("blocked_id", userId);

    if (error) {
      throw error;
    }
  } else {
    const { error } = await state.supabase
      .from("user_blocks")
      .insert({
        blocker_id: state.profile.id,
        blocked_id: userId,
      });

    if (error) {
      throw error;
    }
  }

  await loadBlocks();
  await loadChats();
}

async function addChatMember(username) {
  const activeChat = getActiveChat();
  const normalizedUsername = String(username || "").trim().replace(/^@/, "").toLowerCase();

  if (!activeChat || !canManageMembers(activeChat)) {
    throw new Error("Управлять участниками можно только в своих группах и каналах.");
  }

  if (!normalizedUsername) {
    throw new Error("Укажите логин участника.");
  }

  const { error } = await state.supabase.rpc("add_chat_member", {
    target_chat: activeChat.id,
    member_username: normalizedUsername,
  });

  if (error) {
    throw error;
  }

  await loadChats();
  if (state.activeChatId) {
    showCachedMessages(state.activeChatId);
    renderChatHeader();
  }
}

async function removeChatMember(memberId) {
  const activeChat = getActiveChat();

  if (!activeChat || !canManageMembers(activeChat)) {
    throw new Error("Управлять участниками можно только в своих группах и каналах.");
  }

  if (!memberId) {
    throw new Error("Не удалось определить участника для удаления.");
  }

  const { error } = await state.supabase.rpc("remove_chat_member", {
    target_chat: activeChat.id,
    member_id: memberId,
  });

  if (error) {
    throw error;
  }

  await loadChats();
  if (state.activeChatId) {
    showCachedMessages(state.activeChatId);
    renderChatHeader();
  }
}

async function safeLoadStickers() {
  try {
    await loadStickers();
  } catch (error) {
    console.error(error);
    state.stickers = [];
    renderStickerGallery();
    elements.stickerStatus.textContent = getFriendlyError(error, "Стикеры временно недоступны.");
  }
}

async function safeLoadCallHistory() {
  try {
    await loadCallHistory();
  } catch (error) {
    console.error(error);
    state.callHistory = [];
    renderCallHistory();
  }
}

function updateAttachmentStatus() {
  if (!state.pendingAttachmentFile) {
    elements.attachmentStatus.hidden = true;
    elements.attachmentStatus.textContent = "Файл не выбран.";
    return;
  }

  elements.attachmentStatus.hidden = false;
  const sizeMiB = (state.pendingAttachmentFile.size / (1024 * 1024)).toFixed(1);
  const limitHint = state.pendingAttachmentFile.size > MAX_ATTACHMENT_SIZE ? " · превышен лимит 50 МиБ" : "";
  elements.attachmentStatus.textContent = `Выбран файл: ${state.pendingAttachmentFile.name} · ${sizeMiB} МиБ${limitHint}`;
}

async function createRoom() {
  const roomType = elements.roomType.value;
  const roomTitle = elements.roomTitle.value.trim();
  const memberUsernames = elements.roomMembers.value
    .split(/[,\s]+/)
    .map((item) => item.trim().replace(/^@/, "").toLowerCase())
    .filter(Boolean);

  if (!roomTitle) {
    throw new Error("Укажите название группы или канала.");
  }

  const uniqueMembers = [...new Set(memberUsernames)].filter((username) => username !== state.profile.username);
  if (roomType === "group" && !uniqueMembers.length) {
    throw new Error("Для группы укажите хотя бы одного участника.");
  }

  const { data, error } = await state.supabase.rpc("create_room_chat", {
    room_type: roomType,
    room_title: roomTitle,
    member_usernames: uniqueMembers,
  });

  if (error) {
    throw error;
  }

  elements.roomForm.reset();
  state.activeChatId = data;
  await loadChats().catch(async () => {
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    await loadChats();
  });
}

async function searchMessages(query) {
  const safeQuery = query.trim().toLowerCase();
  if (!safeQuery) {
    renderEmpty(elements.messageSearchResults, "Введите текст для поиска.");
    return;
  }

  const chatIds = state.chats.map((chat) => chat.id);
  if (!chatIds.length) {
    renderEmpty(elements.messageSearchResults, "Сначала создайте или откройте чат.");
    return;
  }

  let sourceMessages = [];
  try {
    const { data, error } = await state.supabase
      .from("messages")
      .select("*")
      .in("chat_id", chatIds)
      .order("created_at", { ascending: false })
      .limit(250);

    if (error) {
      throw error;
    }

    sourceMessages = data || [];
  } catch (error) {
    console.warn("Поиск перешёл на локальный кэш сообщений:", error);
    sourceMessages = state.allMessages || [];
  }

  const results = sourceMessages
    .filter((message) => getMessageSearchText(message).toLowerCase().includes(safeQuery))
    .slice(0, 40)
    .map((message) => {
      const chat = state.chats.find((item) => item.id === message.chat_id);
      if (!chat) {
        return null;
      }

      return {
        chatId: chat.id,
        messageId: message.id,
        chatTitle: getChatTitle(chat),
        meta: `${getMessageAuthorName(message, chat)} • ${formatTime(message.created_at)}`,
        text: getMessageSearchText(message) || "Стикер",
      };
    })
    .filter(Boolean);

  renderMessageSearchResults(results);
}

async function createSticker() {
  const title = elements.stickerTitleInput.value.trim() || state.pendingStickerFile?.name || "Стикер";
  if (!state.pendingStickerFile) {
    throw new Error("Сначала выберите изображение для стикера.");
  }

  if (!String(state.pendingStickerFile.type || "").startsWith("image/")) {
    throw new Error("Стикер должен быть изображением.");
  }

  const uploaded = await uploadSticker(state.pendingStickerFile);
  const { error } = await state.supabase.from("user_stickers").insert({
    owner_id: state.profile.id,
    title,
    image_url: uploaded.url,
    image_path: uploaded.path,
  });

  if (error) {
    throw error;
  }

  state.pendingStickerFile = null;
  elements.stickerFileInput.value = "";
  elements.stickerTitleInput.value = "";
  await loadStickers();
  elements.stickerStatus.textContent = "Стикер сохранён и готов к отправке.";
}

async function sendSticker(stickerId) {
  const activeChat = getActiveChat();
  const sticker = state.stickers.find((item) => item.id === stickerId);
  if (!activeChat || !sticker || !canSendToChat(activeChat)) {
    return;
  }

  const { error } = await state.supabase.from("messages").insert({
    chat_id: activeChat.id,
    sender_id: state.profile.id,
    content: null,
    sticker_id: sticker.id,
    sticker_url: sticker.image_url,
    sticker_name: sticker.title,
  });

  if (error) {
    throw error;
  }

  await loadChats();
}

async function startChatWithUser(targetId) {
  const existing = state.chats
    .filter((chat) => chat.chat_type === "direct" && chat.partner?.id === targetId)
    .sort((left, right) => {
      const leftTime = left.last_message?.created_at || left.created_at;
      const rightTime = right.last_message?.created_at || right.created_at;
      return new Date(rightTime) - new Date(leftTime);
    })[0];
  if (existing) {
    state.activeChatId = existing.id;
    renderChats();
    renderChatHeader();
    showCachedMessages(existing.id);
    await loadMessages(existing.id);
    return;
  }

  const { data, error } = await state.supabase.rpc("start_direct_chat", { other_user: targetId });
  if (error) {
    throw error;
  }

  state.activeChatId = data;
  await loadChats();
}

async function sendMessage() {
  const activeChat = getActiveChat();
  const content = elements.messageInput.value.trim();
  if (!activeChat || !canSendToChat(activeChat) || (!content && !state.pendingAttachmentFile && !state.editingMessageId)) {
    return;
  }

  if (state.editingMessageId) {
    const { error } = await state.supabase
      .from("messages")
      .update({
        content: content || null,
        edited_at: new Date().toISOString(),
      })
      .eq("id", state.editingMessageId)
      .eq("sender_id", state.profile.id);

    if (error) {
      throw error;
    }

    state.editingMessageId = null;
    elements.messageInput.value = "";
    if (state.localTypingChatId === activeChat.id) {
      sendTypingState(false);
      state.localTypingChatId = null;
      clearLocalTypingTimer();
    }
    renderMessages();
    await loadMessages(activeChat.id);
    return;
  }

  let attachmentPayload = {};
  if (state.pendingAttachmentFile) {
    const uploaded = await uploadAttachment(state.pendingAttachmentFile);
    attachmentPayload = {
      attachment_url: uploaded.url,
      attachment_path: uploaded.path,
      attachment_name: state.pendingAttachmentFile.name,
      attachment_type: state.pendingAttachmentFile.type || "application/octet-stream",
      attachment_size: state.pendingAttachmentFile.size || null,
    };
  }

  const { error } = await state.supabase.from("messages").insert({
    chat_id: activeChat.id,
    sender_id: state.profile.id,
    content: content || null,
    ...attachmentPayload,
  });

  if (error) {
    throw error;
  }

  elements.messageInput.value = "";
  if (state.localTypingChatId === activeChat.id) {
    sendTypingState(false);
    state.localTypingChatId = null;
    clearLocalTypingTimer();
  }
  state.pendingAttachmentFile = null;
  elements.attachmentInput.value = "";
  updateAttachmentStatus();
  await loadChats();
}

async function deleteMessage(messageId) {
  const { error } = await state.supabase
    .from("messages")
    .update({
      content: null,
      attachment_url: null,
      attachment_path: null,
      attachment_name: null,
      attachment_type: null,
      attachment_size: null,
      sticker_id: null,
      sticker_url: null,
      sticker_name: null,
      is_deleted: true,
      deleted_at: new Date().toISOString(),
      edited_at: null,
    })
    .eq("id", messageId)
    .eq("sender_id", state.profile.id);

  if (error) {
    throw error;
  }

  if (state.editingMessageId === messageId) {
    state.editingMessageId = null;
    elements.messageInput.value = "";
  }

  await loadMessages(state.activeChatId);
}

function startEditingMessage(messageId) {
  const message = state.activeMessages.find((item) => item.id === messageId && item.sender_id === state.profile?.id && !item.is_deleted);
  if (!message) {
    return;
  }

  state.editingMessageId = messageId;
  elements.messageInput.value = message.content || "";
  elements.messageInput.focus();
  renderMessages();
}

function openMessageEditOverlay(messageId, messageCard) {
  if (!messageCard?.isConnected) return;

  state.longPressMessageId = messageId;
  elements.messageEditOverlay.hidden = false;
  elements.messageEditOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("message-edit-open");

  const messageRect = messageCard.getBoundingClientRect();
  const action = elements.messageEditOverlayAction;
  const actionWidth = action.offsetWidth;
  const actionHeight = action.offsetHeight;
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  const left = Math.min(
    Math.max(8, messageRect.left + (messageRect.width - actionWidth) / 2),
    viewportWidth - actionWidth - 8
  );
  const top = messageRect.top >= actionHeight + 12
    ? messageRect.top - actionHeight - 12
    : Math.min(messageRect.bottom + 12, viewportHeight - actionHeight - 8);

  action.style.left = `${left}px`;
  action.style.top = `${top}px`;
}

function closeMessageEditOverlay() {
  elements.messageEditOverlay.hidden = true;
  elements.messageEditOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("message-edit-open");
  elements.messageEditOverlayAction.style.removeProperty("left");
  elements.messageEditOverlayAction.style.removeProperty("top");
  state.longPressMessageId = null;
}

function cancelMessageLongPress() {
  if (state.messageLongPressTimerId) {
    window.clearTimeout(state.messageLongPressTimerId);
    state.messageLongPressTimerId = null;
  }
  state.messageHoldStartPoint = null;
}

function stopEditingMessage() {
  state.editingMessageId = null;
  elements.messageInput.value = "";
  renderMessages();
}

async function updateProfile() {
  const displayName = elements.profileDisplayNameInput.value.trim();
  if (!displayName) {
    return;
  }

  const payload = {
    id: state.profile.id,
    email: state.profile.email,
    username: state.profile.username,
    display_name: displayName,
    bio: elements.profileBioInput.value.trim(),
    avatar_url: state.profile.avatar_url || null,
    last_seen_at: state.profile.last_seen_at || new Date().toISOString(),
  };

  if (state.pendingAvatarFile) {
    payload.avatar_url = await uploadAvatar(state.pendingAvatarFile);
  }

  const { error } = await state.supabase.from("profiles").upsert(payload, { onConflict: "id" });
  if (error) {
    throw error;
  }

  state.profile = payload;
  state.pendingAvatarFile = null;
  elements.profileAvatarInput.value = "";
  updateProfileView();
  renderChatHeader();
  setStatus("Профиль сохранён.");
}

async function bootstrapSession() {
  const { data, error } = await state.supabase.auth.getSession();
  if (error) {
    throw error;
  }

  await handleSessionChange(data.session);
}

async function init() {
  if (!isConfigReady()) {
    elements.setupBanner.hidden = false;
    elements.authScreen.hidden = false;
    elements.appShell.hidden = true;
    setAuthStatus("Сначала заполните docs/supabase-config.js и выполните SQL-схему в Supabase.", true);
    return;
  }

  state.supabase = createSafeSupabaseClient(config.url, config.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  showAuthMode("register");
  updateNotificationUI();
  updateAttachmentStatus();
  updateStickerStatus();
  renderEmpty(elements.messageSearchResults, "Введите текст и нажмите «Искать».");
  renderCallHistory();

  state.supabase.auth.onAuthStateChange((_event, session) => {
    Promise.resolve()
      .then(() => handleSessionChange(session))
      .catch((error) => {
        console.error(error);
        setAuthStatus(error.message || "Ошибка авторизации.", true);
      });
  });

  await bootstrapSession();
}

elements.registerTab.addEventListener("click", () => showAuthMode("register"));
elements.loginTab.addEventListener("click", () => showAuthMode("login"));

elements.registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!state.supabase) {
    return;
  }

  try {
    const email = elements.registerEmail.value.trim();
    const password = elements.registerPassword.value.trim();
    let username = elements.registerUsername.value.trim().replace(/[^a-z0-9_]/g, "_").toLowerCase();
    const displayName = elements.registerDisplayName.value.trim();

    if (username.length < 3 || username.length > 24) {
      throw new Error("Имя пользователя должно содержать от 3 до 24 символов.");
    }

    if (!/^[a-z0-9_]+$/.test(username)) {
      throw new Error("Имя пользователя может содержать только буквы, цифры и подчеркивания.");
    }

    const { data, error } = await state.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          display_name: displayName,
        },
      },
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      const { data: sessionData, error: sessionError } = await state.supabase.auth.getSession();
      if (sessionError) {
        throw sessionError;
      }

      if (sessionData.session) {
        await ensureProfile(data.user, username, displayName);
      }
    }

    setAuthStatus("Аккаунт создан. Если вход не произойдёт сразу, подтвердите email в Supabase и затем войдите.");
    elements.registerForm.reset();
    showAuthMode("login");
  } catch (error) {
    console.error(error);
    setAuthStatus(getFriendlyError(error, "Не удалось зарегистрироваться."), true);
  }
});

elements.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!state.supabase) {
    return;
  }

  try {
    const { error } = await state.supabase.auth.signInWithPassword({
      email: elements.loginEmail.value.trim(),
      password: elements.loginPassword.value.trim(),
    });

    if (error) {
      throw error;
    }

    setAuthStatus("Вход выполнен.");
    elements.loginForm.reset();
  } catch (error) {
    console.error(error);
    setAuthStatus(error.message || "Не удалось войти.", true);
  }
});

elements.profileForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await updateProfile();
  } catch (error) {
    console.error(error);
    setStatus(getFriendlyError(error, "Не удалось сохранить профиль."), true);
  }
});

elements.profileAvatarInput.addEventListener("change", () => {
  const file = elements.profileAvatarInput.files?.[0] || null;
  state.pendingAvatarFile = file;
  updateProfileView();
});

elements.userSearchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await searchUsers(elements.userSearchInput.value);
    setStatus("Поиск выполнен.");
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Не удалось найти пользователей.", true);
  }
});

elements.roomForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await createRoom();
    elements.roomStatus.textContent = "Чат создан и открыт.";
    setStatus("Группа или канал созданы.");
  } catch (error) {
    console.error(error);
    elements.roomStatus.textContent = getFriendlyError(error, "Не удалось создать группу или канал.");
    setStatus(getFriendlyError(error, "Не удалось создать группу или канал."), true);
  }
});

elements.messageSearchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await searchMessages(elements.messageSearchInput.value);
    setStatus("Поиск по сообщениям выполнен.");
  } catch (error) {
    console.error(error);
    setStatus(getFriendlyError(error, "Не удалось выполнить поиск по сообщениям."), true);
  }
});

elements.attachmentInput.addEventListener("change", () => {
  state.pendingAttachmentFile = elements.attachmentInput.files?.[0] || null;
  updateAttachmentStatus();
});

elements.messageInput.addEventListener("input", () => {
  handleLocalTypingInput();
});

elements.stickerFileInput.addEventListener("change", () => {
  state.pendingStickerFile = elements.stickerFileInput.files?.[0] || null;
  updateStickerStatus();
});

elements.stickerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await createSticker();
    updateStickerStatus();
    setStatus("Стикер сохранён.");
  } catch (error) {
    console.error(error);
    elements.stickerStatus.textContent = getFriendlyError(error, "Не удалось сохранить стикер.");
    setStatus(getFriendlyError(error, "Не удалось сохранить стикер."), true);
  }
});

elements.searchResults.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-user-id]");
  if (!button) {
    return;
  }

  try {
    await startChatWithUser(button.dataset.userId);
    setMobileTab("chat");
    setStatus("Диалог открыт.");
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Не удалось открыть диалог.", true);
  }
});

elements.chatList.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-chat-id]");
  if (!button) {
    return;
  }

  if (state.localTypingChatId && state.localTypingChatId !== button.dataset.chatId) {
    sendTypingState(false);
    state.localTypingChatId = null;
    clearLocalTypingTimer();
  }

  state.activeChatId = button.dataset.chatId;
  setMobileTab("chat");
  showCachedMessages(state.activeChatId);
  renderChats();
  renderChatHeader();
  renderStickerGallery();
  subscribeToActiveChat(state.activeChatId);

  try {
    await loadMessages(state.activeChatId);
    renderChats();
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Не удалось загрузить сообщения.", true);
  }
});

elements.chatList.addEventListener("pointerdown", (event) => {
  const button = event.target.closest("[data-chat-id]");
  if (!button || button.dataset.chatId === state.activeChatId) {
    return;
  }

  state.activeChatId = button.dataset.chatId;
  showCachedMessages(state.activeChatId);
  renderChats();
  renderChatHeader();
});

elements.messageSearchResults.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-chat-id][data-message-id]");
  if (!button) {
    return;
  }

  if (state.localTypingChatId && state.localTypingChatId !== button.dataset.chatId) {
    sendTypingState(false);
    state.localTypingChatId = null;
    clearLocalTypingTimer();
  }

  state.activeChatId = button.dataset.chatId;
  setMobileTab("chat");
  showCachedMessages(state.activeChatId);
  renderChats();
  renderChatHeader();
  renderStickerGallery();
  subscribeToActiveChat(state.activeChatId);

  try {
    await loadMessages(state.activeChatId);
    const messageNode = elements.messageList.querySelector(`[data-message-id="${button.dataset.messageId}"]`);
    if (messageNode) {
      messageNode.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    setStatus("Найденное сообщение открыто.");
  } catch (error) {
    console.error(error);
    setStatus(getFriendlyError(error, "Не удалось открыть найденное сообщение."), true);
  }
});

elements.stickerGallery.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-sticker-id]");
  if (!button) {
    return;
  }

  try {
    await sendSticker(button.dataset.stickerId);
    setStatus("Стикер отправлен.");
  } catch (error) {
    console.error(error);
    setStatus(getFriendlyError(error, "Не удалось отправить стикер."), true);
  }
});

elements.chatInfoCard.addEventListener("click", async (event) => {
  const removeButton = event.target.closest("[data-remove-member-id]");
  if (removeButton) {
    try {
      await removeChatMember(removeButton.dataset.removeMemberId);
      setStatus("Участник удалён.");
    } catch (error) {
      console.error(error);
      setStatus(getFriendlyError(error, "Не удалось удалить участника."), true);
    }
    return;
  }

  const button = event.target.closest("[data-toggle-block]");
  if (!button) {
    return;
  }

  try {
    await toggleBlockUser(button.dataset.toggleBlock);
    setStatus("Статус блокировки обновлён.");
  } catch (error) {
    console.error(error);
    setStatus(getFriendlyError(error, "Не удалось изменить статус блокировки."), true);
  }
});

elements.chatInfoCard.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-member-add-form]");
  if (!form) {
    return;
  }

  event.preventDefault();
  const input = form.querySelector('input[name="username"]');

  try {
    await addChatMember(input?.value || "");
    if (input) {
      input.value = "";
    }
    setStatus("Участник добавлен.");
  } catch (error) {
    console.error(error);
    setStatus(getFriendlyError(error, "Не удалось добавить участника."), true);
  }
});

elements.messageList.addEventListener("click", async (event) => {
  const imageButton = event.target.closest("[data-open-image]");
  if (imageButton) {
    openImageViewer(imageButton.dataset.openImage, imageButton.dataset.imageName);
    return;
  }

  const musicButton = event.target.closest("[data-play-music]");
  if (musicButton) {
    setMusicSource(musicButton.dataset.playMusic, musicButton.dataset.audioName);
    return;
  }

  const voiceButton = event.target.closest("[data-voice-toggle]");
  if (voiceButton) {
    const audio = voiceButton.closest("[data-voice-player]").querySelector("audio");
    if (audio.paused) {
      elements.messageList.querySelectorAll("[data-voice-player] audio").forEach((otherAudio) => {
        if (otherAudio !== audio) otherAudio.pause();
      });
      audio.play().catch(() => setStatus("Не удалось воспроизвести голосовое."));
    } else {
      audio.pause();
    }
    return;
  }

  const editButton = event.target.closest("[data-edit-message-id]");
  if (editButton) {
    startEditingMessage(editButton.dataset.editMessageId);
    return;
  }

  const deleteButton = event.target.closest("[data-delete-message-id]");
  if (!deleteButton) {
    return;
  }

  try {
    await deleteMessage(deleteButton.dataset.deleteMessageId);
    setStatus("Сообщение удалено.");
  } catch (error) {
    console.error(error);
    setStatus(getFriendlyError(error, "Не удалось удалить сообщение."), true);
  }
});

elements.messageList.addEventListener("pointerdown", (event) => {
  if (!event.isPrimary || (event.button !== undefined && event.button !== 0)) return;
  const messageCard = event.target.closest(".message-card--mine[data-message-id]");
  if (!messageCard || event.target.closest("button, a, input, textarea, select")) return;
  const message = state.activeMessages.find((item) => item.id === messageCard.dataset.messageId);
  if (!message || message.sender_id !== state.profile?.id || message.is_deleted) return;

  cancelMessageLongPress();
  state.messageHoldStartPoint = { x: event.clientX, y: event.clientY };
  const messageId = messageCard.dataset.messageId;
  state.messageLongPressTimerId = window.setTimeout(() => {
    state.messageLongPressTimerId = null;
    state.messageHoldStartPoint = null;
    openMessageEditOverlay(messageId, messageCard);
  }, 500);
});

window.addEventListener("pointermove", (event) => {
  const startPoint = state.messageHoldStartPoint;
  if (!state.messageLongPressTimerId || !startPoint) return;
  if (Math.hypot(event.clientX - startPoint.x, event.clientY - startPoint.y) > 12) {
    cancelMessageLongPress();
  }
});

["pointerup", "pointercancel"].forEach((eventName) => {
  window.addEventListener(eventName, cancelMessageLongPress);
});

elements.messageList.addEventListener("contextmenu", (event) => {
  if (window.matchMedia("(pointer: coarse)").matches && event.target.closest(".message-card--mine")) {
    event.preventDefault();
  }
});

elements.messageEditOverlay.addEventListener("click", (event) => {
  if (event.target === elements.messageEditOverlay) closeMessageEditOverlay();
});

elements.messageEditOverlayAction.addEventListener("click", () => {
  const messageId = state.longPressMessageId;
  closeMessageEditOverlay();
  if (messageId) startEditingMessage(messageId);
});

elements.cancelEditButton.addEventListener("click", () => {
  stopEditingMessage();
});

elements.mobileChatSearch.addEventListener("input", renderChats);
elements.mobileBackButton.addEventListener("click", () => setMobileTab("chats"));
elements.mobileProfileTrigger.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 720px)").matches) openMobileProfile();
});
elements.mobileProfileClose.addEventListener("click", closeMobileProfile);
elements.mobileProfileModal.querySelector(".mobile-profile-modal__backdrop").addEventListener("click", closeMobileProfile);
elements.mobileProfileBlock.addEventListener("click", async () => {
  const userId = elements.mobileProfileBlock.dataset.userId;
  if (!userId) return;

  elements.mobileProfileBlock.disabled = true;
  try {
    await toggleBlockUser(userId);
    setStatus(state.blockedUserIds.has(userId) ? "Пользователь заблокирован." : "Пользователь разблокирован.");
    closeMobileProfile();
  } catch (error) {
    console.error(error);
    setStatus(getFriendlyError(error, "Не удалось изменить статус блокировки."), true);
  } finally {
    elements.mobileProfileBlock.disabled = false;
  }
});
elements.themeToggleDesktop.addEventListener("click", toggleTheme);
elements.themeToggleMobile.addEventListener("click", toggleTheme);
elements.themeToggleAuth.addEventListener("click", toggleTheme);
let savedTheme = "dark";
try {
  savedTheme = localStorage.getItem("svoysvyaz-theme") || "dark";
} catch (error) {
  console.warn("Не удалось прочитать сохранённую тему:", error);
}
applyTheme(savedTheme, false);

elements.imageViewerClose.addEventListener("click", closeImageViewer);
elements.imageViewerZoomIn.addEventListener("click", () => zoomImage(imageViewerState.scale + 0.25));
elements.imageViewerZoomOut.addEventListener("click", () => zoomImage(imageViewerState.scale - 0.25));
elements.imageViewerZoomReset.addEventListener("click", () => zoomImage(1));
document.addEventListener("fullscreenchange", updateVideoFullscreenButtons);
document.addEventListener("webkitfullscreenchange", updateVideoFullscreenButtons);
elements.imageViewerStage.addEventListener("wheel", (event) => {
  event.preventDefault();
  zoomImage(imageViewerState.scale + (event.deltaY < 0 ? 0.2 : -0.2));
}, { passive: false });
elements.imageViewerStage.addEventListener("pointerdown", (event) => {
  elements.imageViewerStage.setPointerCapture(event.pointerId);
  imageViewerState.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (imageViewerState.pointers.size === 2) {
    const [first, second] = [...imageViewerState.pointers.values()];
    imageViewerState.pinchDistance = Math.hypot(first.x - second.x, first.y - second.y);
  } else if (imageViewerState.scale > 1) {
    imageViewerState.panPoint = { x: event.clientX, y: event.clientY };
  }
});
elements.imageViewerStage.addEventListener("pointermove", (event) => {
  if (!imageViewerState.pointers.has(event.pointerId)) return;
  imageViewerState.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (imageViewerState.pointers.size === 2) {
    const [first, second] = [...imageViewerState.pointers.values()];
    const distance = Math.hypot(first.x - second.x, first.y - second.y);
    if (imageViewerState.pinchDistance) zoomImage(imageViewerState.scale * distance / imageViewerState.pinchDistance);
    imageViewerState.pinchDistance = distance;
  } else if (imageViewerState.panPoint && imageViewerState.scale > 1) {
    imageViewerState.x += event.clientX - imageViewerState.panPoint.x;
    imageViewerState.y += event.clientY - imageViewerState.panPoint.y;
    imageViewerState.panPoint = { x: event.clientX, y: event.clientY };
    setImageViewerTransform();
  }
});
["pointerup", "pointercancel", "lostpointercapture"].forEach((eventName) => {
  elements.imageViewerStage.addEventListener(eventName, (event) => {
    imageViewerState.pointers.delete(event.pointerId);
    imageViewerState.panPoint = null;
    if (imageViewerState.pointers.size < 2) imageViewerState.pinchDistance = 0;
  });
});
elements.audioPlayerToggle.addEventListener("click", () => {
  if (elements.musicPlayer.paused) {
    elements.musicPlayer.play().catch(() => setStatus("Не удалось воспроизвести аудио."));
  } else {
    elements.musicPlayer.pause();
  }
});
elements.audioPlayerClose.addEventListener("click", closeMusicPlayer);
elements.musicPlayer.addEventListener("play", updateMusicPlayerState);
elements.musicPlayer.addEventListener("pause", updateMusicPlayerState);
elements.sendButton.addEventListener("pointerdown", (event) => {
  if (elements.messageInput.value.trim() || state.pendingAttachmentFile || state.editingMessageId || elements.sendButton.disabled) return;
  event.preventDefault();
  elements.sendButton.setPointerCapture(event.pointerId);
  startVoiceRecording();
});
elements.sendButton.addEventListener("pointerup", () => stopVoiceRecording(false));
elements.sendButton.addEventListener("pointercancel", () => stopVoiceRecording(true));
elements.sendButton.addEventListener("click", (event) => {
  if (!elements.messageInput.value.trim() && !state.pendingAttachmentFile && !state.editingMessageId) event.preventDefault();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!elements.imageViewer.hidden) closeImageViewer();
    if (!elements.mobileProfileModal.hidden) closeMobileProfile();
    if (!elements.messageEditOverlay.hidden) closeMessageEditOverlay();
  }
});
document.querySelectorAll("[data-mobile-tab]").forEach((button) => {
  button.addEventListener("click", () => setMobileTab(button.dataset.mobileTab));
});

elements.composerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!elements.messageInput.value.trim() && !state.pendingAttachmentFile && !state.editingMessageId) return;
  try {
    await sendMessage();
  } catch (error) {
    console.error(error);
    setStatus(getFriendlyError(error, "Не удалось отправить сообщение."), true);
  }
});

elements.refreshChats.addEventListener("click", async () => {
  try {
    await loadChats();
    setStatus("Диалоги обновлены.");
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Не удалось обновить диалоги.", true);
  }
});

elements.refreshMessages.addEventListener("click", async () => {
  try {
    await loadMessages(state.activeChatId);
    renderChats();
    setStatus("Сообщения обновлены.");
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Не удалось обновить сообщения.", true);
  }
});

elements.callButton.addEventListener("click", async () => {
  try {
    await startCall();
  } catch (error) {
    console.error(error);
    setStatus(getFriendlyError(error, "Не удалось начать звонок."), true);
    finishCallLocally();
  }
});

elements.collapseCallButton.addEventListener("click", () => {
  if (!state.currentCall) return;
  state.callMinimized = true;
  updateCallOverlay();
});

elements.mobileCallMini.addEventListener("click", () => {
  if (!state.currentCall) return;
  state.callMinimized = false;
  updateCallOverlay();
});

elements.toggleMic.addEventListener("click", () => {
  toggleMicrophone();
});

elements.acceptCall.addEventListener("click", async () => {
  try {
    await acceptIncomingCall();
  } catch (error) {
    console.error(error);
    setStatus(getFriendlyError(error, "Не удалось принять звонок."), true);
    finishCallLocally();
  }
});

elements.declineCall.addEventListener("click", async () => {
  try {
    await declineCurrentCall();
  } catch (error) {
    console.error(error);
    finishCallLocally();
  }
});

elements.hangupCall.addEventListener("click", async () => {
  try {
    await hangupCurrentCall();
  } catch (error) {
    console.error(error);
    finishCallLocally();
  }
});

elements.logoutButton.addEventListener("click", async () => {
  try {
    await state.supabase.auth.signOut();
    setStatus("Вы вышли из аккаунта.");
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Не удалось выйти.", true);
  }
});

elements.enableNotifications.addEventListener("click", async () => {
  try {
    await requestNotificationPermission();
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Не удалось включить уведомления.", true);
  }
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    updatePresence(true).catch((error) => {
      console.error(error);
    });
  }

  if (document.hidden || !state.activeChatId) {
    return;
  }

  markChatAsRead(state.activeChatId).then(() => {
    renderChats();
    renderMessages();
  }).catch((error) => {
    console.error(error);
  });
});

window.addEventListener("focus", () => {
  updatePresence(true).catch((error) => {
    console.error(error);
  });

  if (!state.activeChatId) {
    return;
  }

  markChatAsRead(state.activeChatId).then(() => {
    renderChats();
    renderMessages();
  }).catch((error) => {
    console.error(error);
  });
});

init().catch((error) => {
  console.error(error);
  setStatus(error.message || "Ошибка инициализации приложения.", true);
});
