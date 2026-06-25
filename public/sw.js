self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});

self.addEventListener("push", function (event) {
  const data = event?.data?.json();
  const options = {
    body: data.description,
    icon: "./android-chrome-512x512.png",
    badge: "./android-chrome-512x512.png",
    data: {
      url: data.url || "/",
    },
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", function (event) {
  // 1. Close the notification banner immediately
  event.notification.close();

  // 2. Get the custom URL provided by the admin (fallback to homepage if missing)
  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    // 4. Look through all open windows/tabs of your app
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (windowClients) {
        // If a tab is already open to that exact URL, just bring it to the front
        for (let client of windowClients) {
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
        }
        // If the tab isn't open, open a new one with the admin's link
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      }),
  );
});
