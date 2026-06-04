self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});

self.addEventListener('push', function(event) {
  console.log('Push message received:', event);
  const options = {
    body: data.description,
    icon: './android-chrome-512x512.png',
    badge: './android-chrome-512x512.png',
    data: {
      url: data.url || '/'
    }
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});