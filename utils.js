// utils.js
window.getChannelName = function () {
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
