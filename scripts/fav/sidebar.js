// sidebar.js
// Import des classes CSS depuis styles.js si possible
// Utilise les variables globales sans redeclaration

window.injectSidebarFavorites = function () {
  // Détection de la langue et chargement des textes
  const lang = (
    window.getMyttvLang
      ? window.getMyttvLang()
      : document.documentElement.lang || navigator.language || "en"
  ).substring(0, 2);
  const t = window.myttvI18n
    ? window.myttvI18n(lang)
    : {
        favorites: "Mes favoris",
        noFavorites: "Aucune chaîne",
        live: "Live",
        offline: "Déconnecté(e)",
        viewers: "spectateurs",
      };
  // Supprime l'ancien bloc si présent
  const oldBlock = document.getElementById("myttv-sidebar-favs");
  if (oldBlock && oldBlock.parentNode)
    oldBlock.parentNode.removeChild(oldBlock);
  const sidebar = document.querySelector(".Layout-sc-1xcs6mc-0.dtSdDz");
  if (!sidebar) return setTimeout(window.injectSidebarFavorites, 1000);

  // Chercher la section stories si elle existe
  const storiesDiv = document.querySelector(
    ".Layout-sc-1xcs6mc-0.iGMbNn.storiesLeftNavSection--csO9S"
  );
  // Find the title block to insert after
  const titleDiv = document.querySelector(
    ".Layout-sc-1xcs6mc-0.dTSUNJ.side-nav__title"
  );
  // Chercher la section side-nav-section cible
  const navSection = document.querySelector(
    ".Layout-sc-1xcs6mc-0.iGMbNn.side-nav-section"
  );
  const block = document.createElement("div");
  block.id = "myttv-sidebar-favs";
  block.innerHTML = `
    <div id="myttv-favs-header">
      <div id="myttv-fav-title-svg" data-a-target="side-nav-header-collapsed" role="heading" aria-level="3">
        <div id="myttv-fav-title-icon">
          ${window.sidebarStarSVG || ""}
        </div>
      </div>
      <h3 id="myttv-fav-title-text">${t.favorites}</h3>
    </div>
    <div id="myttv-favs-list"></div>
  `;

  // Applique la couleur du texte au SVG dès que possible
  queueMicrotask(() => {
    const text = block.querySelector("#myttv-fav-title-text");
    const svg = block.querySelector("#myttv-fav-title-svg");
    if (text && svg) svg.style.color = getComputedStyle(text).color;
  });

  // Placement du bloc dans la sidebar
  if (navSection?.parentNode) {
    navSection.parentNode.insertBefore(block, navSection);
    if (navSection.classList.contains("side-nav-section"))
      block.classList.remove("dtSdDz");
  } else if (storiesDiv?.parentNode) {
    storiesDiv.parentNode.insertBefore(block, storiesDiv.nextSibling);
    block.classList.add("dtSdDz");
  } else if (titleDiv?.parentNode) {
    titleDiv.parentNode.insertBefore(block, titleDiv.nextSibling);
    block.classList.add("dtSdDz");
  } else if (sidebar.children.length >= 2) {
    sidebar.insertBefore(block, sidebar.children[2]);
    block.classList.add("dtSdDz");
  } else {
    sidebar.appendChild(block);
    block.classList.add("dtSdDz");
  }

  // Observer l'apparition de navSection si non présent
  // Si navSection absent, observer l'apparition pour déplacer le bloc au bon endroit
  if (!navSection) {
    const observer = new MutationObserver(() => {
      const navSectionNow = document.querySelector(
        ".Layout-sc-1xcs6mc-0.iGMbNn.side-nav-section"
      );
      const blockNow = document.getElementById("myttv-sidebar-favs");
      if (navSectionNow?.parentNode && blockNow) {
        navSectionNow.parentNode.insertBefore(blockNow, navSectionNow);
        observer.disconnect();
      }
    });
    observer.observe(sidebar, { childList: true, subtree: true });
  }

  // Affichage initial de la liste
  window.getFavorites((favs) => {
    window.renderSidebarFavoritesList(
      block,
      favs,
      sidebar.offsetWidth,
      false,
      t
    );
  });

  // Met à jour l'affichage icône/texte et la classe collapsed sur les favoris
  function updateIconVisibility() {
    const icon = block.querySelector("#myttv-fav-title-icon");
    const text = block.querySelector("#myttv-fav-title-text");
    if (!icon || !text || !sidebar) return;
    const width = sidebar.offsetWidth;
    icon.style.display = width <= 55 || width < 230 ? "inline" : "none";
    text.style.display = width <= 55 ? "none" : "inline";
    block.querySelectorAll(".myttv-user-list-item").forEach((el) => {
      el.classList.toggle("myttv-fav-item-collapsed", width <= 55);
    });
  }
  updateIconVisibility();

  // Ajout d'un ResizeObserver pour mettre à jour dynamiquement l'affichage lors du resize de la sidebar
  // Observer le resize de la sidebar pour adapter l'affichage
  if (window.ResizeObserver) {
    new ResizeObserver(updateIconVisibility).observe(sidebar);
  } else {
    window.addEventListener("resize", updateIconVisibility);
  }

  // Log favoris et cache au clic sur le bloc (debug)
  block.addEventListener("click", () => {
    window.getFavorites((favs) => {
      console.log("[MyTTV/Fav] Favoris:", favs);
      window.getAvatarCache?.((cache) => {
        console.log("[MyTTV/Fav] Cache des avatars:", cache);
      });
    });
  });
};

window.myttvLastFavs = [];
window.myttvLastSidebarWidth = null;

function formatViewersCount(viewers) {
  const n = parseInt(viewers, 10);
  return !isNaN(n) && n >= 1000
    ? (n / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " k"
    : viewers;
}

window.renderSidebarFavoritesList = async function (
  block,
  favs,
  sidebarWidth,
  forceRefresh = false,
  t = {
    favorites: "Mes favoris",
    noFavorites: "Aucune chaîne",
    live: "Live",
    offline: "Déconnecté(e)",
    viewers: "spectateurs",
  }
) {
  const favsStr = JSON.stringify(favs);
  if (
    !forceRefresh &&
    window.myttvLastFavs === favsStr &&
    window.myttvLastSidebarWidth === sidebarWidth
  )
    return;
  window.myttvLastFavs = favsStr;
  window.myttvLastSidebarWidth = sidebarWidth;
  const list = block.querySelector("#myttv-favs-list");
  if (favs.length === 0) {
    list.innerHTML = `<div style="margin-left:11px;color:#aaa;font-size:13px;">${t.noFavorites}</div>`;
    return;
  }
  const avatarCache = await new Promise((resolve) => {
    if (window.getAvatarCache) window.getAvatarCache(resolve);
    else resolve({});
  });
  const users = await Promise.all(
    favs.map(async (name) => {
      let avatar = avatarCache[name.toLowerCase()] || "";
      if (!avatar) {
        try {
          const avatarRes = await fetch(
            `https://decapi.me/twitch/avatar/${name}`
          );
          avatar = await avatarRes.text();
          if (avatar) {
            avatarCache[name.toLowerCase()] = avatar;
            if (window.setAvatarCache) window.setAvatarCache(avatarCache);
          }
        } catch {
          avatar = "";
        }
      }
      try {
        const [liveRes, viewersRes, gameRes, titleRes] = await Promise.all([
          fetch(`https://decapi.me/twitch/uptime/${name}`),
          fetch(`https://decapi.me/twitch/viewercount/${name}`),
          fetch(`https://decapi.me/twitch/game/${name}`),
          fetch(`https://decapi.me/twitch/title/${name}`),
        ]);
        const uptimeText = liveRes.ok ? (await liveRes.text()).trim() : "";
        const isLive =
          uptimeText && !uptimeText.toLowerCase().includes("is offline");
        let viewers = viewersRes.ok ? (await viewersRes.text()).trim() : "";
        viewers = formatViewersCount(viewers);
        const game = gameRes.ok ? (await gameRes.text()).trim() : "";
        const title = titleRes.ok ? (await titleRes.text()).trim() : "";
        return { name, avatar, isLive, viewers, game, title };
      } catch {
        return {
          name,
          avatar,
          isLive: false,
          viewers: "",
          game: "",
          title: "",
        };
      }
    })
  );
  // Tri : live d'abord (par viewers décroissant), offline ensuite (ordre alpha)
  users.sort((a, b) => {
    if (a.isLive && b.isLive) {
      // Extraire le nombre de viewers (ex: "1,3 k" → 1300)
      const parse = (v) => {
        if (!v) return 0;
        if (v.includes("k"))
          return parseFloat(v.replace(/\s?k/, "").replace(",", ".")) * 1000;
        return parseInt(v, 10) || 0;
      };
      return parse(b.viewers) - parse(a.viewers);
    }
    if (a.isLive) return -1;
    if (b.isLive) return 1;
    // Les deux offline : tri alpha
    return a.name.localeCompare(b.name);
  });
  const renderUser = (user) => {
    // Génère un id unique pour chaque favori
    const favId = `myttv-fav-${user.name.replace(/[^a-zA-Z0-9_-]/g, "")}`;
    return `
    <div class="myttv-user-list-item ${
      sidebarWidth > 55 ? `` : ` myttv-fav-item-collapsed`
    }" aria-hidden="false" data-fav-name="${user.name}" id="${favId}">
        <div class="myttv-fav-item">
          <a aria-haspopup="dialog" class="myttv-user-fav-link" href="/${
            user.name
          }">
              <div class="myttv-fav-avatar">
                <img class="myttv-fav-avatar-img ${
                  user.isLive ? "" : " myttv-avatar-offline"
                }"
                  alt="" src="${user.avatar}"
                  style="object-fit: cover;"
                  onerror="this.onerror=null;this.src='https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png'">
              </div>
              <div class="myttv-fav-info">
                <div data-a-target="side-nav-card-metadata" class="myttv-fav-card-metadata">
                  <div class="myttv-fav-card-title">
                    <p title="${user.name}" data-a-target="side-nav-title">${
      user.name
    }</p>
                  </div>
                  <div class="myttv-fav-game-title" data-a-target="side-nav-game-title">
                  ${
                    user.isLive && user.game
                      ? `<p title=\"${user.game}\">${user.game}</p>`
                      : `<p title=\"${t.offline}\">${t.offline}</p>`
                  }
                  </div>
                </div>
                <div class="myttv-fav-live-status" data-a-target="side-nav-live-status">
                  ${
                    user.isLive
                      ? '<div class="ScChannelStatusIndicator-sc-bjn067-0 fJwlvq tw-channel-status-indicator"></div>'
                      : ""
                  }
                  <p>${user.isLive ? t.live : t.offline}</p>
                  <div class="myttv-fav-viewers-count">
                    <span aria-hidden="true">${
                      user.isLive ? user.viewers : ""
                    }</span>
                    <p>${
                      user.isLive ? user.viewers + " " + t.viewers : t.offline
                    }</p>
                  </div>
                </div>
              </div>
          </a>
        </div>
    </div>`;
  };
  list.innerHTML = users.map(renderUser).join("");

  // TOOLTIP LOGIC: Ajout du tooltip de prévisualisation au hover d'un favori online
  // On attend que le DOM soit mis à jour
  setTimeout(() => {
    // Vérifie si la prévisualisation est activée dans les settings
    const previewEnabled = window.myttvSettings?.sidebarPreview !== false;
    // Nettoyage d'un éventuel tooltip restant
    document.querySelectorAll(".myttv-fav-tooltip").forEach((e) => e.remove());
    users.forEach((user) => {
      if (!user.isLive) return;
      const favId = `myttv-fav-${user.name.replace(/[^a-zA-Z0-9_-]/g, "")}`;
      const el = document.getElementById(favId);
      if (!el) return;
      let tooltip = null;
      let mouseMoveHandler = null;
      el.addEventListener("mouseenter", async (evt) => {
        if (!previewEnabled) return;
        // Supprime les autres tooltips
        document
          .querySelectorAll(".myttv-fav-tooltip")
          .forEach((e) => e.remove());
        // Crée le tooltip
        tooltip = document.createElement("div");
        tooltip.className = "myttv-fav-tooltip";
        const enabledPreview =
          localStorage.getItem("myttv_preview_enabled") !== "false";
        tooltip.innerHTML = `
          ${
            enabledPreview
              ? `<div class=\"myttv-fav-tooltip-preview\"><img src=\"https://static-cdn.jtvnw.net/previews-ttv/live_user_${user.name.toLowerCase()}-300x170.jpg?rand=${Date.now()}\" alt=\"preview\"></div>`
              : ""
          }
          <div class=\"myttv-fav-tooltip-info\">
            <p class=\"myttv-fav-tooltip-title\">${
              user.isLive && user.title ? user.title : ""
            }</p>
            <p class=\"myttv-fav-tooltip-subtitle\">${
              user.game ? user.game : ""
            }</p>
          </div>
        `;
        document.body.appendChild(tooltip);
        // Positionnement dynamique à droite de l'élément
        const rect = el.getBoundingClientRect();
        let left = rect.right + 8;
        let top = rect.top;
        // Si le tooltip sort de l'écran, on ajuste
        if (left + 320 > window.innerWidth) left = window.innerWidth - 330;
        if (top + 180 > window.innerHeight) top = window.innerHeight - 190;
        tooltip.style.left = left + "px";
        tooltip.style.top = top + "px";
        setTimeout(() => {
          tooltip.style.opacity = "1";
        }, 10);
        // Pour suivre la souris (optionnel)
        mouseMoveHandler = (moveEvt) => {
          const rect = el.getBoundingClientRect();
          let left = rect.right + 8;
          let top = rect.top;
          if (left + 320 > window.innerWidth) left = window.innerWidth - 330;
          if (top + 180 > window.innerHeight) top = window.innerHeight - 190;
          tooltip.style.left = left + "px";
          tooltip.style.top = top + "px";
        };
        window.addEventListener("scroll", mouseMoveHandler, true);
        window.addEventListener("resize", mouseMoveHandler, true);
      });
      el.addEventListener("mouseleave", () => {
        if (tooltip) {
          tooltip.remove();
          tooltip = null;
        }
        if (mouseMoveHandler) {
          window.removeEventListener("scroll", mouseMoveHandler, true);
          window.removeEventListener("resize", mouseMoveHandler, true);
        }
      });
    });
  }, 0);
};

// Optimisation : factorisation des observers et des updates

function updateSidebarFavorites(forceRefresh = true) {
  const sidebar = document.querySelector(".Layout-sc-1xcs6mc-0.dtSdDz");
  const block = document.getElementById("myttv-sidebar-favs");
  if (!sidebar || !block) return;
  window.getFavorites((favs) => {
    window.renderSidebarFavoritesList(
      block,
      favs,
      sidebar.offsetWidth,
      forceRefresh
    );
  });
}

window.addSidebarFavorite = function (name) {
  if (typeof window.addFavorite === "function") {
    window.addFavorite(name, () => updateSidebarFavorites(true));
  }
};

window.removeSidebarFavorite = function (name) {
  if (typeof window.removeFavorite === "function") {
    window.removeFavorite(name, () => updateSidebarFavorites(true));
  }
};
