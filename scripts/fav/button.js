// button.js
// Création d'un bouton favoris (étoile)
function createFavButton(isFav) {
  const btn = document.createElement("button");
  btn.id = "myttv-fav-btn";
  btn.title = isFav ? "Retirer des favoris" : "Ajouter aux favoris";
  Object.assign(btn.style, {
    width: "40px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: isFav ? "#9147ff" : "#2F2F36",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    zIndex: 1000,
    marginLeft: "10px",
    marginRight: "0px",
  });
  btn.innerHTML = isFav ? getStarSVG(true) : getStarSVG(false);
  return btn;
}

// SVG étoile (remplie ou vide)
function getStarSVG(filled) {
  return filled
    ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L16.15 19.78C16.91 20.24 17.8399 19.56 17.6399 18.7L16.54 13.98L20.2099 10.8C20.8799 10.22 20.5199 9.12001 19.6399 9.05001L14.81 8.64001L12.92 4.18001C12.58 3.37001 11.42 3.37001 11.08 4.18001L9.18995 8.63001L4.35995 9.04001C3.47995 9.11001 3.11995 10.21 3.78995 10.79L7.45995 13.97L6.35995 18.69C6.15995 19.55 7.08995 20.23 7.84995 19.77L12 17.27Z"/></svg>`
    : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0799 4.17991C11.4199 3.36998 12.5796 3.37011 12.9197 4.17991L14.8104 8.63987L19.6404 9.05002C20.5202 9.12026 20.8797 10.2201 20.2098 10.8L16.5398 13.9797L17.6404 18.7004C17.84 19.5602 16.9101 20.2394 16.1502 19.7795L11.9998 17.2697L7.85039 19.7698C7.09039 20.2298 6.16016 19.5497 6.36016 18.6897L7.45976 13.9699L3.78984 10.7903C3.11987 10.2103 3.48017 9.11026 4.36016 9.04026L9.19023 8.6301L11.0799 4.17991ZM11.0311 9.41135C10.7413 10.0936 10.0978 10.5606 9.35918 10.6233L7.60138 10.7715C7.33687 10.7938 7.22952 11.1234 7.43015 11.2972L8.77031 12.4582C9.3311 12.9442 9.57644 13.7013 9.40801 14.424L9.0068 16.1438C8.94654 16.4021 9.22649 16.6058 9.4537 16.469L10.9686 15.5569L11.0887 15.4895C11.7025 15.1751 12.4393 15.1986 13.035 15.5588L14.5436 16.4711C14.7707 16.6084 15.0511 16.4049 14.991 16.1464L14.5926 14.4338C14.4241 13.711 14.6694 12.954 15.2303 12.468L16.5691 11.3076C16.7696 11.1338 16.6624 10.8044 16.3979 10.782L14.6414 10.633C13.9486 10.5742 13.3391 10.1603 13.0271 9.54612L12.9686 9.42014L12.2748 7.78254C12.1715 7.53866 11.8259 7.53854 11.7224 7.78236L11.0311 9.41135Z" fill="#fff"/></svg>`;
}

// Gestion du clic sur le bouton favoris (ajout/suppression)
function handleFavButtonClick(btn, channel) {
  window.isFavorite(channel, (isFav) => {
    if (isFav) {
      window.removeFromFavorites(channel, () => {
        btn.style.background = "#2F2F36";
        btn.innerHTML = getStarSVG(false);
        const block = document.getElementById("myttv-sidebar-favs");
        if (block && typeof window.removeSidebarFavorite === "function")
          window.removeSidebarFavorite(channel);
      });
    } else {
      window.addToFavorites(channel, () => {
        btn.style.background = "#9147ff";
        btn.innerHTML = getStarSVG(true);
        const block = document.getElementById("myttv-sidebar-favs");
        if (block && typeof window.addSidebarFavorite === "function")
          window.addSidebarFavorite(channel);
      });
    }
  });
}

// Injection du bouton favoris sur une page de chaîne
window.injectFavButton = function (retry = 0) {
  if (window.location.pathname.startsWith("/search")) return;
  const channel = window.getChannelName();
  if (!channel) return;
  const parentDiv = document.querySelector(".Layout-sc-1xcs6mc-0.csXQOq");
  if (!parentDiv) {
    if (retry < 5) {
      setTimeout(() => window.injectFavButton(retry + 1), 500);
    } else {
      console.warn(
        "[MyTTV] Impossible d'injecter le bouton favoris après 5 tentatives."
      );
    }
    return;
  }
  parentDiv.querySelectorAll("#myttv-fav-btn").forEach((btn) => btn.remove());
  window.getFavorites((favs) => {
    const isFav = favs.includes(channel);
    const btn = createFavButton(isFav);
    btn.onclick = () => handleFavButtonClick(btn, channel);
    parentDiv.insertBefore(btn, parentDiv.children[1]);
  });
};

// Injection du bouton favoris sur la page de recherche
window.injectFavButtonOnSearch = function () {
  document.querySelectorAll(".Layout-sc-1xcs6mc-0.ldAEOa").forEach((result) => {
    const titleLink = result.querySelector(
      'strong[data-test-selector*="search-result-offline-channel__name"] a'
    );
    if (!titleLink) return;
    const channel = titleLink.textContent.trim();
    if (result.querySelector("#myttv-fav-btn")) return;
    const followBtn = result.querySelector(
      'button[data-a-target="follow-button"]'
    );
    if (!followBtn) return;
    window.isFavorite(channel, (isFav) => {
      const btn = createFavButton(isFav);
      btn.onclick = () => handleFavButtonClick(btn, channel);
      const iglnDiv = result.querySelector(".Layout-sc-1xcs6mc-0.iglnKI");
      if (iglnDiv) {
        iglnDiv.appendChild(btn);
      } else if (followBtn.parentNode) {
        followBtn.parentNode.appendChild(btn);
      } else {
        followBtn.parentNode.insertBefore(btn, followBtn.nextSibling);
      }
    });
  });
};

// (Toute la logique du bouton settings et de la popup a été déplacée dans settings.js)
