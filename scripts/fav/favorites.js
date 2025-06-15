// favorites.js
const STORAGE_KEY = "myttv_favs";

window.getFavorites = function (cb) {
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
    window.setFavorites(newFavs, cb);
  });
};

window.addFavorite = function (name, cb) {
  window.getFavorites((favs) => {
    // On évite les doublons (insensible à la casse)
    if (!favs.some((fav) => fav.toLowerCase() === name.toLowerCase())) {
      favs.push(name);
      window.setFavorites(favs, cb);
    } else if (typeof cb === "function") {
      cb();
    }
  });
};
