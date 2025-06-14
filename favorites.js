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
