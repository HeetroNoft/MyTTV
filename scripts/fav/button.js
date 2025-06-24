// button.js
// Création d'un bouton favoris (étoile)
function createFavButton(isFav) {
  const btn = document.createElement("button");
  btn.id = "myttv-fav-btn";
  btn.title = isFav ? "Retirer des favoris" : "Ajouter aux favoris";
  if (isFav) btn.classList.add("isFav");
  Object.assign(btn.style, {
    width: "44px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: isFav ? "#9147ff" : "#2F2F36",
    color: "#fff",
    border: "none",
    borderRadius: "9999px",
    cursor: "pointer",
    zIndex: 1000,
    marginLeft: "10px",
    marginRight: "0px",
  });
  // Affichage initial : rempli si favori, vide sinon
  btn.innerHTML = window.starSVG(isFav);

  btn.addEventListener("mouseenter", function () {
    // Si favori, hover = vide. Sinon, hover = rempli
    if (btn.classList.contains("isFav")) {
      btn.innerHTML = window.starSVG(false);
    } else {
      btn.innerHTML = window.starSVG(true);
    }
  });
  btn.addEventListener("mouseleave", function () {
    // Retour à l'état initial
    if (btn.classList.contains("isFav")) {
      btn.innerHTML = window.starSVG(true);
    } else {
      btn.innerHTML = window.starSVG(false);
    }
  });
  return btn;
}

// Utilitaire pour injecter un bouton favoris dans un parent
function injectFavButtonTo(parent, channel, isFav) {
  const btn = createFavButton(isFav);
  btn.onclick = () => handleFavButtonClick(btn, channel);
  parent.appendChild(btn);
}

// Gestion du clic sur le bouton favoris (ajout/suppression)
function handleFavButtonClick(btn, channel) {
  window.isFavorite(channel, (isFav) => {
    if (isFav) {
      window.removeFromFavorites(channel, () => {
        btn.classList.remove("isFav");
        btn.style.background = "#2F2F36";
        btn.innerHTML = window.starSVG(false);
        // Forcer l'état visuel selon le hover après le click
        if (btn.matches(":hover")) {
          btn.innerHTML = window.starSVG(true);
        }
        const block = document.getElementById("myttv-sidebar-favs");
        if (block && typeof window.removeSidebarFavorite === "function")
          window.removeSidebarFavorite(channel);
      });
    } else {
      window.addToFavorites(channel, () => {
        btn.classList.add("isFav");
        btn.style.background = "#9147ff";
        btn.innerHTML = window.starSVG(true);
        // Forcer l'état visuel selon le hover après le click
        if (btn.matches(":hover")) {
          btn.innerHTML = window.starSVG(false);
        }
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
  if (
    window.location.pathname.startsWith("/search") ||
    myttvFavBtnInjected ||
    document.getElementById("myttv-fav-btn")
  )
    return;
  const channel = window.getChannelName();
  if (!channel) return;
  // Attendre que le bouton cible soit présent
  function tryInject(localRetry = retry) {
    if (myttvFavBtnInjected || document.getElementById("myttv-fav-btn")) return;
    const coreBtn = document.querySelector(".Layout-sc-1xcs6mc-0.hSUuOs");
    if (!coreBtn) {
      if (localRetry < 20) setTimeout(() => tryInject(localRetry + 1), 200);
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
        injectFavButtonTo(parentDiv, channel, favs.includes(channel));
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
    // Vérifie si le bouton existe déjà pour ce channel
    const existingBtn = result.querySelector(
      `#myttv-fav-btn[data-channel='${channel}']`
    );
    if (existingBtn) return;
    // Supprime seulement les boutons orphelins (sans data-channel ou mauvais channel)
    result.querySelectorAll("#myttv-fav-btn").forEach((btn) => {
      if (btn.getAttribute("data-channel") !== channel) btn.remove();
    });
    const followBtn = result.querySelector(
      'button[data-a-target="follow-button"]'
    );
    if (!followBtn) return;
    window.isFavorite(channel, (isFav) => {
      const iglnDiv = result.querySelector(".Layout-sc-1xcs6mc-0.iglnKI");
      const btn = createFavButton(isFav);
      btn.classList.add("onSearch");
      btn.setAttribute("data-channel", channel);
      btn.onclick = () => handleFavButtonClick(btn, channel);
      if (iglnDiv) iglnDiv.appendChild(btn);
      else if (followBtn.parentNode) followBtn.parentNode.appendChild(btn);
    });
  });
};

// Observateur unique pour la navigation et la disparition du bouton
if (typeof window !== "undefined") {
  let lastPath = "",
    lastSearchPath = "",
    lastWasPresent = false;
  setInterval(() => {
    const path = window.location.pathname;
    if (path !== lastPath) {
      lastPath = path;
      myttvFavBtnInjected = false;
    }
    // Réinjection sur disparition
    const isPresent = !!document.getElementById("myttv-fav-btn");
    if (lastWasPresent && !isPresent) {
      setTimeout(() => {
        myttvFavBtnInjected = false;
        window.injectFavButton();
      }, 500);
    }
    lastWasPresent = isPresent;
    // Gestion page search
    if (path.startsWith("/search")) {
      if (path !== lastSearchPath) {
        lastSearchPath = path;
        setTimeout(() => window.injectFavButtonOnSearch(), 500);
      } else {
        window.injectFavButtonOnSearch();
      }
    }

    // --- Ajout du check pour le bouton follow ---
    const coreBtn = document.querySelector(".ScCoreButton-sc-ocjdkq-0.gxYeIp");
    const injectDiv = document.querySelector(
      ".InjectLayout-sc-1i43xsx-0.kCBkGE"
    );
    const favBtn = document.getElementById("myttv-fav-btn");
    if (!coreBtn) {
      if (injectDiv) injectDiv.classList.add("isFollow");
      if (favBtn) favBtn.classList.add("isFollow");
    } else {
      if (injectDiv) injectDiv.classList.remove("isFollow");
      if (favBtn) favBtn.classList.remove("isFollow");
    }
    // --- Fin du check ---
  }, 700);
}
