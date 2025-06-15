// sidebar.js
window.injectSidebarFavorites = function () {
  document.querySelectorAll("#myttv-sidebar-favs").forEach((el) => el.remove());
  const sidebar = document.querySelector(".Layout-sc-1xcs6mc-0.dtSdDz");
  if (!sidebar) {
    setTimeout(window.injectSidebarFavorites, 1000);
    return;
  }
  const block = document.createElement("div");
  block.id = "myttv-sidebar-favs";
  block.style.margin = "16px 0 8px 0";
  block.style.padding = "0";
  block.innerHTML = `
    <div style="display:flex;align-items:center;margin-bottom:8px;margin-left:10px;gap:6px;">
      <div class="InjectLayout-sc-1i43xsx-0 iDMNUO" >
        <div class="Layout-sc-1xcs6mc-0 " data-a-target="side-nav-header-collapsed" role="heading" aria-level="3">
          <div style="margin-left:5px;" class="ScSvgWrapper-sc-wkgzod-0 dKXial tw-svg" id="myttv-fav-title-icon">
            <svg id="myttv-fav-title-svg" width="20" height="20" viewBox="0 0 24 24" fill="var(--color-text-alt-2)" xmlns="http://www.w3.org/2000/svg" style="color:inherit;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </div>
        </div>
      </div>
      <span class="gLNOIm" id="myttv-fav-title-text">Mes favoris</span>
    </div>
    <div id="myttv-favs-list"></div>
  `;
  // Synchronise la couleur de l'icône avec celle du texte du titre
  setTimeout(() => {
    const text = block.querySelector("#myttv-fav-title-text");
    const svg = block.querySelector("#myttv-fav-title-svg");
    if (text && svg) {
      const color = getComputedStyle(text).color;
      svg.style.color = color;
    }
  }, 0);
  if (sidebar.children.length >= 2) {
    sidebar.insertBefore(block, sidebar.children[2]);
  } else {
    sidebar.appendChild(block);
  }
  window.getFavorites((favs) => {
    const width = sidebar.offsetWidth;
    window.renderSidebarFavoritesList(block, favs, width);
  });
  function updateIconVisibility() {
    const icon = document.getElementById("myttv-fav-title-icon");
    const text = document.getElementById("myttv-fav-title-text");
    if (!icon || !text || !sidebar) return;
    const width = sidebar.offsetWidth;
    if (width <= 55) {
      icon.style.display = "inline";
      text.style.display = "none";
    } else if (width >= 230) {
      icon.style.display = "none";
      text.style.display = "inline";
    } else {
      icon.style.display = "inline";
      text.style.display = "inline";
    }
    window.getFavorites((favs) => {
      window.debounce(
        () => window.renderSidebarFavoritesList(block, favs, width),
        0
      );
    });
  }
  updateIconVisibility();
  if (window.myttvSidebarResizeObs) window.myttvSidebarResizeObs.disconnect();
  window.myttvSidebarResizeObs = new ResizeObserver(updateIconVisibility);
  window.myttvSidebarResizeObs.observe(sidebar);
};

window.myttvLastFavs = [];
window.myttvLastSidebarWidth = null;

window.renderSidebarFavoritesList = async function (
  block,
  favs,
  sidebarWidth,
  forceRefresh = false
) {
  const favsStr = JSON.stringify(favs);
  if (
    !forceRefresh &&
    window.myttvLastFavs === favsStr &&
    window.myttvLastSidebarWidth === sidebarWidth
  ) {
    return;
  }
  window.myttvLastFavs = favsStr;
  window.myttvLastSidebarWidth = sidebarWidth;
  const list = block.querySelector("#myttv-favs-list");
  if (favs.length === 0) {
    list.innerHTML =
      '<div style="color:#aaa;font-size:13px;">Aucune chaîne</div>';
    return;
  }
  const users = await Promise.all(
    favs.map(async (name) => {
      try {
        const [avatarRes, liveRes, viewersRes, gameRes] = await Promise.all([
          fetch(`https://decapi.me/twitch/avatar/${name}`),
          fetch(`https://decapi.me/twitch/uptime/${name}`),
          fetch(`https://decapi.me/twitch/viewercount/${name}`),
          fetch(`https://decapi.me/twitch/game/${name}`),
        ]);
        const avatar = await avatarRes.text();
        const uptimeText = liveRes.ok ? (await liveRes.text()).trim() : "";
        const isLive =
          uptimeText && !uptimeText.toLowerCase().includes("is offline");
        const viewers = viewersRes.ok ? (await viewersRes.text()).trim() : "";
        const game = gameRes.ok ? (await gameRes.text()).trim() : "";
        return { name, avatar, isLive, viewers, game };
      } catch {
        return { name, avatar: "", isLive: false, viewers: "", game: "" };
      }
    })
  );
  if (sidebarWidth <= 55) {
    list.innerHTML = users
      .map(
        (user) =>
          `<div class="ScTransitionBase-sc-hx4quq-0 jaUBmE tw-transition" aria-hidden="false" style="transition-property: transform, opacity; transition-timing-function: ease;">
        <div>
          <div class="Layout-sc-1xcs6mc-0 AoXTY side-nav-card">
            <a aria-haspopup="dialog" class="ScCoreLink-sc-16kq0mq-0 fytYW InjectLayout-sc-1i43xsx-0 eTNPYC side-nav-card tw-link" href="/${
              user.name
            }">
              <div class="Layout-sc-1xcs6mc-0 kErOMx side-nav-card__avatar">
                <div class="ScAvatar-sc-144b42z-0 dLsNfm tw-avatar">
                  <img class="InjectLayout-sc-1i43xsx-0 fAYJcN tw-image tw-image-avatar${
                    user.isLive ? "" : " myttv-avatar-offline"
                  }" alt="" src="${user.avatar}" style="object-fit: cover;">
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>`
      )
      .join("");
  } else {
    list.innerHTML = users
      .map(
        (user) =>
          `<div class="ScTransitionBase-sc-hx4quq-0 jaUBmE tw-transition" aria-hidden="false" style="transition-property: transform, opacity; transition-timing-function: ease;">
      <div>
        <div class="Layout-sc-1xcs6mc-0 AoXTY side-nav-card">
          <a aria-haspopup="dialog" class="ScCoreLink-sc-16kq0mq-0 fytYW InjectLayout-sc-1i43xsx-0 fxorZp side-nav-card__link tw-link" href="/${
            user.name
          }">
            <div class="Layout-sc-1xcs6mc-0 kErOMx side-nav-card__avatar">
              <div class="ScAvatar-sc-144b42z-0 dLsNfm tw-avatar">
                <img class="InjectLayout-sc-1i43xsx-0 fAYJcN tw-image tw-image-avatar${
                  user.isLive ? "" : " myttv-avatar-offline"
                }" alt="" src="${user.avatar}" style="object-fit: cover;">
              </div>
            </div>
            <div class="Layout-sc-1xcs6mc-0 BkJwo">
              <div class="Layout-sc-1xcs6mc-0 dJfBsr">
                <div data-a-target="side-nav-card-metadata" class="Layout-sc-1xcs6mc-0 ffUuNa">
                  <div class="Layout-sc-1xcs6mc-0 kvrzxX side-nav-card__title">
                    <p style="text-transform: uppercase;" title="${
                      user.name
                    }" data-a-target="side-nav-title" class="CoreText-sc-1txzju1-0 deIppZ InjectLayout-sc-1i43xsx-0 hnBAak">${
            user.name
          }</p>
                  </div>
                  ${
                    user.isLive && user.game
                      ? `<div class=\"Layout-sc-1xcs6mc-0 hZXGWn side-nav-card__metadata\" data-a-target=\"side-nav-game-title\"><p title=\"${user.game}\" class=\"CoreText-sc-1txzju1-0 catJxV\">${user.game}</p></div>`
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
                    user.isLive ? "Live" : "Déconnecté(e)"
                  }</p>
                  <div class=\"Layout-sc-1xcs6mc-0 lnazSn\">
                    <span aria-hidden=\"true\" class=\"CoreText-sc-1txzju1-0 kyIlCg\">${
                      user.isLive ? user.viewers : ""
                    }</span>
                    <p class=\"CoreText-sc-1txzju1-0 InjectLayout-sc-1i43xsx-0 cdydzE\">${
                      user.isLive
                        ? user.viewers + " spectateurs"
                        : "Déconnecté(e)"
                    }</p>
                  </div>
                </div></div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>`
      )
      .join("");
  }
};

// SUPPRESSION DU FLAG window.myttvSidebarManualUpdate ET SYNCHRONISATION DE LA LISTE

window.addSidebarFavorite = async function (name) {
  const sidebar = document.querySelector(".Layout-sc-1xcs6mc-0.dtSdDz");
  const block = document.getElementById("myttv-sidebar-favs");
  if (!sidebar || !block) return;
  // Ajoute le favori à la source (localStorage ou autre via window.addFavorite)
  if (typeof window.addFavorite === "function") {
    window.addFavorite(name, () => {
      // Après ajout, on recharge la liste depuis la source
      window.getFavorites((favs) => {
        window.renderSidebarFavoritesList(
          block,
          favs,
          sidebar.offsetWidth,
          true
        );
      });
    });
  }
};

window.removeSidebarFavorite = function (name) {
  const block = document.getElementById("myttv-sidebar-favs");
  if (!block) return;
  // Retire le favori de la source (localStorage ou autre via window.removeFavorite)
  if (typeof window.removeFavorite === "function") {
    window.removeFavorite(name, () => {
      // Après suppression, on recharge la liste depuis la source
      window.getFavorites((favs) => {
        window.renderSidebarFavoritesList(
          block,
          favs,
          block.parentElement.offsetWidth,
          true
        );
      });
    });
  }
};
