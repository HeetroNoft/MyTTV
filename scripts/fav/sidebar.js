// sidebar.js
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
  document.querySelectorAll("#myttv-sidebar-favs").forEach((el) => el.remove());
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
  const block = document.createElement("div");
  block.id = "myttv-sidebar-favs";
  block.style.margin = "24px 0 8px 0";
  block.style.padding = "0";
  block.innerHTML = `
    <div style="display:flex;align-items:center;margin-bottom:8px;margin-left:10px;gap:6px;">
      <div class="InjectLayout-sc-1i43xsx-0 iDMNUO">
        <div class="Layout-sc-1xcs6mc-0 " data-a-target="side-nav-header-collapsed" role="heading" aria-level="3">
          <div style="margin-left:5px;" class="ScSvgWrapper-sc-wkgzod-0 dKXial tw-svg" id="myttv-fav-title-icon">
            ${window.sidebarStarSVG || ""}
          </div>
        </div>
      </div>
      <h3 style="margin-left:-5px;" class="CoreText-sc-1txzju1-0 dzXkjr" id="myttv-fav-title-text">${
        t.favorites
      }</h3>
    </div>
    <div id="myttv-favs-list"></div>
  `;

  setTimeout(() => {
    const text = block.querySelector("#myttv-fav-title-text");
    const svg = block.querySelector("#myttv-fav-title-svg");
    if (text && svg) svg.style.color = getComputedStyle(text).color;
  }, 0);

  if (storiesDiv && storiesDiv.parentNode) {
    // Insérer juste après la section stories
    storiesDiv.parentNode.insertBefore(block, storiesDiv.nextSibling);
  } else if (titleDiv && titleDiv.parentNode) {
    // Insert just after the title div
    titleDiv.parentNode.insertBefore(block, titleDiv.nextSibling);
  } else if (sidebar.children.length >= 2) {
    sidebar.insertBefore(block, sidebar.children[2]);
  } else {
    sidebar.appendChild(block);
  }

  window.getFavorites((favs) => {
    window.renderSidebarFavoritesList(
      block,
      favs,
      sidebar.offsetWidth,
      false,
      t
    );
  });

  function updateIconVisibility() {
    const icon = document.getElementById("myttv-fav-title-icon");
    const text = document.getElementById("myttv-fav-title-text");
    if (!icon || !text || !sidebar) return;
    const width = sidebar.offsetWidth;
    icon.style.display = width <= 55 || width < 230 ? "inline" : "none";
    text.style.display = width <= 55 ? "none" : "inline";
    window.getFavorites((favs) => {
      window.debounce(
        () => window.renderSidebarFavoritesList(block, favs, width),
        0
      );
    });
  }
  updateIconVisibility();
  // Appliquer la bonne marge selon la taille de la sidebar
  function updateBlockMargin() {
    if (!block || !sidebar) return;
    const width = sidebar.offsetWidth;
    block.style.margin = width <= 55 ? "8px 0 8px 0" : "24px 0 8px 0";
  }
  updateBlockMargin();
  // Mettre à jour la marge aussi lors du resize
  if (window.myttvSidebarMarginObs) window.myttvSidebarMarginObs.disconnect();
  window.myttvSidebarMarginObs = new ResizeObserver(updateBlockMargin);
  window.myttvSidebarMarginObs.observe(sidebar);

  if (window.myttvSidebarResizeObs) window.myttvSidebarResizeObs.disconnect();
  window.myttvSidebarResizeObs = new ResizeObserver(updateIconVisibility);
  window.myttvSidebarResizeObs.observe(sidebar);

  // Observer pour replacer la liste si la sidebar change de taille ou si le titre ou les stories sont recréés
  function observeTitleDiv() {
    const sidebar = document.querySelector(".Layout-sc-1xcs6mc-0.dtSdDz");
    const block = document.getElementById("myttv-sidebar-favs");
    if (!sidebar || !block) return;
    const config = { childList: true, subtree: true };
    if (window.myttvSidebarTitleObs) window.myttvSidebarTitleObs.disconnect();
    window.myttvSidebarTitleObs = new MutationObserver(() => {
      const storiesDiv = document.querySelector(
        ".Layout-sc-1xcs6mc-0.iGMbNn.storiesLeftNavSection--csO9S"
      );
      const titleDiv = document.querySelector(
        ".Layout-sc-1xcs6mc-0.dTSUNJ.side-nav__title"
      );
      if (storiesDiv) {
        // Ne déplacer que si ce n'est pas déjà le cas
        if (block.previousSibling !== storiesDiv) {
          storiesDiv.parentNode.insertBefore(block, storiesDiv.nextSibling);
        }
      } else if (titleDiv) {
        if (block.previousSibling !== titleDiv) {
          titleDiv.parentNode.insertBefore(block, titleDiv.nextSibling);
        }
      }
    });
    window.myttvSidebarTitleObs.observe(sidebar, config);
  }
  observeTitleDiv();

  block.addEventListener("click", () => {
    window.getFavorites((favs) => {
      console.log("[MyTTV/Fav] Favoris:", favs);
      if (window.getAvatarCache) {
        window.getAvatarCache((cache) => {
          console.log("[MyTTV/Fav] Cache des avatars:", cache);
        });
      }
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
        const [liveRes, viewersRes, gameRes] = await Promise.all([
          fetch(`https://decapi.me/twitch/uptime/${name}`),
          fetch(`https://decapi.me/twitch/viewercount/${name}`),
          fetch(`https://decapi.me/twitch/game/${name}`),
        ]);
        const uptimeText = liveRes.ok ? (await liveRes.text()).trim() : "";
        const isLive =
          uptimeText && !uptimeText.toLowerCase().includes("is offline");
        let viewers = viewersRes.ok ? (await viewersRes.text()).trim() : "";
        viewers = formatViewersCount(viewers);
        const game = gameRes.ok ? (await gameRes.text()).trim() : "";
        return { name, avatar, isLive, viewers, game };
      } catch {
        return { name, avatar, isLive: false, viewers: "", game: "" };
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
  const renderUser = (user) => `
    <div class="ScTransitionBase-sc-hx4quq-0 jaUBmE tw-transition" aria-hidden="false" style="transition-property: transform, opacity; transition-timing-function: ease;">
      <div>
        <div class="Layout-sc-1xcs6mc-0 AoXTY side-nav-card">
          <a aria-haspopup="dialog" class="ScCoreLink-sc-16kq0mq-0 fytYW InjectLayout-sc-1i43xsx-0 ${
            sidebarWidth <= 55 ? "iCYICY" : "cnzybN side-nav-card__link"
          } tw-link" href="/${user.name}">
            <div class="Layout-sc-1xcs6mc-0 kErOMx side-nav-card__avatar">
              <div class="ScAvatar-sc-144b42z-0 dLsNfm tw-avatar">
                <img class="InjectLayout-sc-1i43xsx-0 fAYJcN tw-image tw-image-avatar$${
                  user.isLive ? "" : " myttv-avatar-offline"
                }" alt="" src="${
    user.avatar
  }" style="object-fit: cover;" onerror="this.onerror=null;this.src='https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png'">
              </div>
            </div>
            ${
              sidebarWidth > 55
                ? `
            <div class="Layout-sc-1xcs6mc-0 bLlihH">
              <div class="Layout-sc-1xcs6mc-0 dJfBsr">
                <div data-a-target="side-nav-card-metadata" class="Layout-sc-1xcs6mc-0 ffUuNa">
                  <div class="Layout-sc-1xcs6mc-0 kvrzxX side-nav-card__title">
                    <p style="margin-top: 2px; text-transform: uppercase;" title="${
                      user.name
                    }" data-a-target="side-nav-title" class="CoreText-sc-1txzju1-0 kdjzho InjectLayout-sc-1i43xsx-0 hnBAak">${
                    user.name
                  }</p>
                  </div>
                  ${
                    user.isLive && user.game
                      ? `<div class=\"Layout-sc-1xcs6mc-0 dWQoKW side-nav-card__metadata\" data-a-target=\"side-nav-game-title\"><p title=\"${user.game}\" class=\"CoreText-sc-1txzju1-0 lesgXA\">${user.game}</p></div>`
                      : ""
                  }
                </div>
                <div class=\"Layout-sc-1xcs6mc-0 jxYIBi side-nav-card__live-status\" data-a-target=\"side-nav-live-status\"><div class=\"Layout-sc-1xcs6mc-0 kvrzxX\">
                  ${
                    user.isLive
                      ? '<div class="ScChannelStatusIndicator-sc-bjn067-0 fJwlvq tw-channel-status-indicator"></div>'
                      : ""
                  }
                  <p class=\"CoreText-sc-1txzju1-0 InjectLayout-sc-1i43xsx-0 cdydzE\">${
                    user.isLive ? t.live : t.offline
                  }</p>
                  <div class=\"Layout-sc-1xcs6mc-0 dqfEBK\">
                    <span aria-hidden=\"true\" class=\"CoreText-sc-1txzju1-0 fYAAA-D\">${
                      user.isLive ? user.viewers : ""
                    }</span>
                    <p class=\"CoreText-sc-1txzju1-0 InjectLayout-sc-1i43xsx-0 cdydzE\">${
                      user.isLive ? user.viewers + " " + t.viewers : t.offline
                    }</p>
                  </div>
                </div></div>
              </div>
            </div>
            `
                : ""
            }
          </a>
        </div>
      </div>
    </div>`;
  list.innerHTML = users.map(renderUser).join("");
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
