// button.js
function createFavButton(isFav) {
  const btn = document.createElement("button");
  btn.id = "myttv-fav-btn";
  btn.title = isFav ? "Retirer des favoris" : "Ajouter aux favoris";
  btn.style.width = "40px";
  btn.style.height = "30px";
  btn.style.display = "flex";
  btn.style.alignItems = "center";
  btn.style.justifyContent = "center";
  btn.style.background = isFav ? "#9147ff" : "#2F2F36";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.borderRadius = "4px";
  btn.style.cursor = "pointer";
  btn.style.zIndex = 1000;
  btn.innerHTML = isFav
    ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`
    : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
  return btn;
}

window.injectFavButton = function (retry = 0) {
  // Ne rien faire sur la page de recherche
  if (window.location.pathname.startsWith("/search")) return;
  const channel = window.getChannelName();
  if (!channel) return;
  // Cibler précisément le parent d'injection (évite les doublons)
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
  // Supprimer uniquement les boutons dans ce parent
  parentDiv.querySelectorAll("#myttv-fav-btn").forEach((btn) => btn.remove());
  window.getFavorites((favs) => {
    let isFav = favs.includes(channel);
    const btn = createFavButton(isFav);
    btn.style.marginLeft = "10px";
    btn.style.marginRight = "0px";
    btn.onclick = () => {
      window.isFavorite(channel, (isFav) => {
        if (isFav) {
          window.removeFromFavorites(channel, () => {
            btn.style.background = "#2F2F36";
            btn.innerHTML = `<svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/></svg>`;
            const block = document.getElementById("myttv-sidebar-favs");
            if (block && typeof window.removeSidebarFavorite === "function")
              window.removeSidebarFavorite(channel);
          });
        } else {
          window.addToFavorites(channel, () => {
            btn.style.background = "#9147ff";
            btn.innerHTML = `<svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"#fff\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/></svg>`;
            const block = document.getElementById("myttv-sidebar-favs");
            if (block && typeof window.addSidebarFavorite === "function")
              window.addSidebarFavorite(channel);
          });
        }
      });
    };
    parentDiv.insertBefore(btn, parentDiv.children[1]);
  });
};

window.injectFavButtonOnSearch = function () {
  // Sélectionne tous les résultats de chaîne sur la page de recherche
  document.querySelectorAll(".Layout-sc-1xcs6mc-0.ldAEOa").forEach((result) => {
    const titleLink = result.querySelector(
      'strong[data-test-selector*="search-result-offline-channel__name"] a'
    );
    if (!titleLink) return;
    const channel = titleLink.textContent.trim();
    // Vérifie s'il y a déjà un bouton favoris injecté
    if (result.querySelector("#myttv-fav-btn")) return;
    // Trouve le bouton follow pour placer le bouton favoris à côté
    const followBtn = result.querySelector(
      'button[data-a-target="follow-button"]'
    );
    if (!followBtn) return;
    window.isFavorite(channel, (isFav) => {
      const btn = createFavButton(isFav);
      btn.style.marginLeft = "10px";
      btn.onclick = () => {
        window.isFavorite(channel, (isFav) => {
          if (isFav) {
            window.removeFromFavorites(channel, () => {
              btn.style.background = "#2F2F36";
              btn.innerHTML = `<svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/></svg>`;
              const block = document.getElementById("myttv-sidebar-favs");
              if (block && typeof window.removeSidebarFavorite === "function")
                window.removeSidebarFavorite(channel);
            });
          } else {
            window.addToFavorites(channel, () => {
              btn.style.background = "#9147ff";
              btn.innerHTML = `<svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"#fff\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/></svg>`;
              const block = document.getElementById("myttv-sidebar-favs");
              if (block && typeof window.addSidebarFavorite === "function")
                window.addSidebarFavorite(channel);
            });
          }
        });
      };
      // Place le bouton dans le parent de la div .Layout-sc-1xcs6mc-0.iglnKI
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
