self.addEventListener("install", e => {
    e.waitUntil(
      caches.open("laundry-cache").then(cache => {
        return cache.addAll([
          "/",
          "/index.html"
        ]);
      })
    );
  });
