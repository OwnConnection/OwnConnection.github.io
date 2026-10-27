const APP_ROOT = new URL("./", self.registration.scope).href;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { body: event.data?.text() || "Новое событие" };
  }

  const data = payload.data || payload;
  const options = {
    body: payload.body || "",
    icon: new URL("favicon.svg", APP_ROOT).href,
    badge: new URL("favicon.svg", APP_ROOT).href,
    tag: payload.tag || "svoysvyaz-notification",
    renotify: Boolean(payload.renotify),
    requireInteraction: Boolean(payload.requireInteraction),
    data: {
      url: data.url || APP_ROOT,
      chatId: data.chatId || null,
      callId: data.callId || null,
      type: data.type || "message",
    },
  };

  event.waitUntil(self.registration.showNotification(payload.title || "СвояСвязь", options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const targetUrl = new URL(event.notification.data?.url || APP_ROOT, APP_ROOT).href;
    const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    const existing = windows.find((client) => client.url.startsWith(APP_ROOT));

    if (existing) {
      await existing.navigate(targetUrl);
      return existing.focus();
    }

    return self.clients.openWindow(targetUrl);
  })());
});
