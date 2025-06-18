// favorites.js
const STORAGE_KEY = "myttv_favs";
const AVATAR_CACHE_KEY = "myttv_favs_avatars";

window.getFavorites = function (cb) {
  if (
    typeof chrome === "undefined" ||
    !chrome.storage ||
    !chrome.storage.local
  ) {
    cb([]);
    return;
  }
  chrome.storage.local.get([STORAGE_KEY], (result) => {
    cb(result[STORAGE_KEY] || []);
  });
};

window.setFavorites = function (favs, cb) {
  chrome.storage.local.set({ [STORAGE_KEY]: favs }, cb);
};

window.removeFavorite = function (name, cb) {
  window.getFavorites((favs) => {
    const newFavs = favs.filter(
      (fav) => fav.toLowerCase() !== name.toLowerCase()
    );
    // Supprimer l'avatar du cache
    window.getAvatarCache((cache) => {
      delete cache[name.toLowerCase()];
      window.setAvatarCache(cache, () => {
        window.setFavorites(newFavs, cb);
      });
    });
  });
};

window.getAvatarCache = function (cb) {
  chrome.storage.local.get([AVATAR_CACHE_KEY], (result) => {
    cb(result[AVATAR_CACHE_KEY] || {});
  });
};

window.setAvatarCache = function (cache, cb) {
  chrome.storage.local.set({ [AVATAR_CACHE_KEY]: cache }, cb);
};

window.addFavorite = function (name, cb) {
  window.getFavorites((favs) => {
    // On évite les doublons (insensible à la casse)
    if (!favs.some((fav) => fav.toLowerCase() === name.toLowerCase())) {
      favs.push(name);
      // Récupérer l'avatar et le stocker dans le cache
      fetch(`https://decapi.me/twitch/avatar/${name}`)
        .then((res) => res.text())
        .then((avatarUrl) => {
          window.getAvatarCache((cache) => {
            cache[name.toLowerCase()] = avatarUrl;
            window.setAvatarCache(cache, () => {
              window.setFavorites(favs, cb);
            });
          });
        })
        .catch(() => {
          window.setFavorites(favs, cb);
        });
    } else if (typeof cb === "function") {
      cb();
    }
  });
};

window.isFavorite = function (name, cb) {
  window.getFavorites((favs) => {
    cb(favs.some((fav) => fav.toLowerCase() === name.toLowerCase()));
  });
};

window.addToFavorites = function (name, cb) {
  window.addFavorite(name, cb);
};

window.removeFromFavorites = function (name, cb) {
  window.removeFavorite(name, cb);
};
