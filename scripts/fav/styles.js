// styles.js
window.injectGlobalStyles = function () {
  if (!document.getElementById("myttv-avatar-grayscale-style")) {
    const style = document.createElement("style");
    style.id = "myttv-avatar-grayscale-style";
    style.innerHTML =
      ".myttv-avatar-offline { filter: grayscale(1) !important; opacity: 0.6 !important; }";
    document.head.appendChild(style);
  }
};
