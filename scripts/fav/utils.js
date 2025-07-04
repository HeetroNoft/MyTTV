// utils.js
window.getChannelName = function () {
  // Essaye de récupérer le nom du streamer depuis le h1 spécifique
  const h1 = document.querySelector(
    "h1.CoreText-sc-1txzju1-0.ScTitleText-sc-d9mj2s-0"
  );
  if (h1 && h1.textContent) {
    return h1.textContent.trim();
  }
  // Fallback : ancienne méthode via l'URL
  const match = window.location.pathname.match(/^\/(\w+)/);
  if (match && match[1] && !["directory", "p", "settings"].includes(match[1])) {
    return match[1];
  }
  return null;
};

window.debounce = function (fn, delay = 0) {
  if (window.myttvSidebarDebounce) clearTimeout(window.myttvSidebarDebounce);
  window.myttvSidebarDebounce = setTimeout(fn, delay);
};

// Utilitaire pour obtenir la langue Twitch ou navigateur
window.getMyttvLang = function () {
  // Twitch définit la langue sur <html lang="xx">
  const htmlLang = document.documentElement.lang;
  if (htmlLang) return htmlLang.substring(0, 2).toLowerCase();
  // Fallback navigateur
  return (navigator.language || "en").substring(0, 2).toLowerCase();
};
