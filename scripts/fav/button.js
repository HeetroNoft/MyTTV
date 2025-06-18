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
  btn.innerHTML = window.starSVG
    ? window.starSVG(isFav)
    : isFav
    ? getStarSVG(true)
    : getStarSVG(false);
  return btn;
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

let myttvFavBtnInjected = false;
// Injection du bouton favoris sur une page de chaîne
window.injectFavButton = function (retry = 0) {
  if (window.location.pathname.startsWith("/search")) return;
  if (myttvFavBtnInjected || document.getElementById("myttv-fav-btn")) return;
  const channel = window.getChannelName();
  if (!channel) return;
  // Attendre que le bouton cible soit présent
  function tryInject(localRetry = retry) {
    if (myttvFavBtnInjected || document.getElementById("myttv-fav-btn")) return;
    const coreBtn = document.querySelector(".ScCoreButton-sc-ocjdkq-0.jHHCzn");
    if (!coreBtn) {
      if (localRetry < 20) {
        setTimeout(() => tryInject(localRetry + 1), 200);
      } else {
        console.warn("[MyTTV] Bouton cible non trouvé après 20 tentatives.");
      }
      return;
    }
    myttvFavBtnInjected = true; // Flag dès le début pour éviter les doubles
    setTimeout(() => {
      if (document.getElementById("myttv-fav-btn")) return;
      document
        .querySelectorAll("#myttv-fav-btn")
        .forEach((btn) => btn.remove());
      const parentDiv = document.querySelector(".Layout-sc-1xcs6mc-0.csXQOq");
      if (!parentDiv) return;
      window.getFavorites((favs) => {
        const isFav = favs.includes(channel);
        const btn = createFavButton(isFav);
        btn.onclick = () => handleFavButtonClick(btn, channel);
        parentDiv.insertBefore(btn, parentDiv.children[1]);
      });
    }, 200);
  }
  tryInject();
};

// Injection du bouton favoris sur la page de recherche
window.injectFavButtonOnSearch = function () {
  document.querySelectorAll(".Layout-sc-1xcs6mc-0.ldAEOa").forEach((result) => {
    const titleLink = result.querySelector(
      'strong[data-test-selector*="search-result-offline-channel__name"] a'
    );
    if (!titleLink) return;
    const channel = titleLink.textContent.trim();
    // Toujours retirer les anciens boutons dans chaque bloc résultat
    result.querySelectorAll("#myttv-fav-btn").forEach((btn) => btn.remove());
    // Ne pas injecter si un bouton existe déjà dans le bloc résultat
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

// Réinitialisation du flag d'injection lors d'un changement de page
if (typeof window !== "undefined") {
  let lastPathBtn = "";
  setInterval(() => {
    if (window.location.pathname !== lastPathBtn) {
      lastPathBtn = window.location.pathname;
      myttvFavBtnInjected = false;
    }
  }, 500);
}

// Surveillance de la disparition du bouton favoris et réinjection automatique
(function () {
  let lastWasPresent = false;
  setInterval(() => {
    const isPresent = !!document.getElementById("myttv-fav-btn");
    if (lastWasPresent && !isPresent) {
      // Le bouton vient de disparaître, on tente la réinjection après 500ms
      setTimeout(() => {
        myttvFavBtnInjected = false;
        window.injectFavButton();
      }, 500);
    }
    lastWasPresent = isPresent;
  }, 300);
})();
