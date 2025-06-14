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
      <span id="myttv-fav-title-icon" style="display:inline;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#9147ff" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      </span>
      <span class="gLNOIm" id="myttv-fav-title-text">Mes favoris</span>
    </div>
    <div id="myttv-favs-list"></div>
  `;
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

window.addSidebarFavorite = async function (name) {
  window.myttvSidebarManualUpdate = true;
  const sidebar = document.querySelector(".Layout-sc-1xcs6mc-0.dtSdDz");
  const block = document.getElementById("myttv-sidebar-favs");
  if (!sidebar || !block) return;
  const list = block.querySelector("#myttv-favs-list");
  if (!list) return;
  // Ne pas ajouter si déjà présent
  if (list.querySelector(`[data-myttv-fav="${name}"]`)) return;
  // Récupère les infos du favori
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
    const sidebarWidth = sidebar.offsetWidth;
    let html = "";
    if (sidebarWidth <= 55) {
      html = `<div data-myttv-fav="${name}" class="ScTransitionBase-sc-hx4quq-0 jaUBmE tw-transition" aria-hidden="false" style="transition-property: transform, opacity; transition-timing-function: ease;">
        <div>
          <div class="Layout-sc-1xcs6mc-0 AoXTY side-nav-card">
            <a aria-haspopup="dialog" class="ScCoreLink-sc-16kq0mq-0 fytYW InjectLayout-sc-1i43xsx-0 eTNPYC side-nav-card tw-link" href="/${name}">
              <div class="Layout-sc-1xcs6mc-0 kErOMx side-nav-card__avatar">
                <div class="ScAvatar-sc-144b42z-0 dLsNfm tw-avatar">
                  <img class="InjectLayout-sc-1i43xsx-0 fAYJcN tw-image tw-image-avatar${
                    isLive ? "" : " myttv-avatar-offline"
                  }" alt="" src="${avatar}" style="object-fit: cover;">
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>`;
    } else {
      html = `<div data-myttv-fav="${name}" class="ScTransitionBase-sc-hx4quq-0 jaUBmE tw-transition" aria-hidden="false" style="transition-property: transform, opacity; transition-timing-function: ease;">
      <div>
        <div class="Layout-sc-1xcs6mc-0 AoXTY side-nav-card">
          <a aria-haspopup="dialog" class="ScCoreLink-sc-16kq0mq-0 fytYW InjectLayout-sc-1i43xsx-0 fxorZp side-nav-card__link tw-link" href="/${name}">
            <div class="Layout-sc-1xcs6mc-0 kErOMx side-nav-card__avatar">
              <div class="ScAvatar-sc-144b42z-0 dLsNfm tw-avatar">
                <img class="InjectLayout-sc-1i43xsx-0 fAYJcN tw-image tw-image-avatar${
                  isLive ? "" : " myttv-avatar-offline"
                }" alt="" src="${avatar}" style="object-fit: cover;">
              </div>
            </div>
            <div class="Layout-sc-1xcs6mc-0 BkJwo">
              <div class="Layout-sc-1xcs6mc-0 dJfBsr">
                <div data-a-target="side-nav-card-metadata" class="Layout-sc-1xcs6mc-0 ffUuNa">
                  <div class="Layout-sc-1xcs6mc-0 kvrzxX side-nav-card__title">
                    <p style="text-transform: uppercase;" title="${name}" data-a-target="side-nav-title" class="CoreText-sc-1txzju1-0 deIppZ InjectLayout-sc-1i43xsx-0 hnBAak">${name}</p>
                  </div>
                  ${
                    isLive && game
                      ? `<div class=\"Layout-sc-1xcs6mc-0 hZXGWn side-nav-card__metadata\" data-a-target=\"side-nav-game-title\"><p title=\"${game}\" class=\"CoreText-sc-1txzju1-0 catJxV\">${game}</p></div>`
                      : ""
                  }
                </div>
                <div class=\"Layout-sc-1xcs6mc-0 jxYIBi side-nav-card__live-status\" data-a-target=\"side-nav-live-status\"><div class=\"Layout-sc-1xcs6mc-0 kvrzxX\">
                  ${
                    isLive
                      ? '<div class="ScChannelStatusIndicator-sc-bjn067-0 fJwlvq tw-channel-status-indicator"></div>'
                      : ""
                  }
                  <p class=\"CoreText-sc-1txzju1-0 InjectLayout-sc-1i43xsx-0 cdydzE\">${
                    isLive ? "Live" : "Déconnecté(e)"
                  }</p>
                  <div class=\"Layout-sc-1xcs6mc-0 lnazSn\">
                    <span aria-hidden=\"true\" class=\"CoreText-sc-1txzju1-0 kyIlCg\">${
                      isLive ? viewers : ""
                    }</span>
                    <p class=\"CoreText-sc-1txzju1-0 InjectLayout-sc-1i43xsx-0 cdydzE\">${
                      isLive ? viewers + " spectateurs" : "Déconnecté(e)"
                    }</p>
                  </div>
                </div></div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>`;
    }
    list.insertAdjacentHTML("beforeend", html);
  } catch (e) {
    // ignore
  }
  window.myttvSidebarManualUpdate = false;
};

window.removeSidebarFavorite = function (name) {
  window.myttvSidebarManualUpdate = true;
  const block = document.getElementById("myttv-sidebar-favs");
  if (!block) return;
  const list = block.querySelector("#myttv-favs-list");
  if (!list) return;
  // Supprime tous les blocs correspondant à ce favori (même si imbriqué)
  list
    .querySelectorAll(`[data-myttv-fav="${name}"]`)
    .forEach((el) => el.remove());
  // Si la liste est vide après suppression, affiche le message
  if (!list.querySelector("[data-myttv-fav]")) {
    list.innerHTML =
      '<div style="color:#aaa;font-size:13px;">Aucune chaîne</div>';
  }
  window.myttvSidebarManualUpdate = false;
};

// Patch dans renderSidebarFavoritesList et updateIconVisibility pour ne rien faire si myttvSidebarManualUpdate est true
const oldRenderSidebarFavoritesList = window.renderSidebarFavoritesList;
window.renderSidebarFavoritesList = function (...args) {
  if (window.myttvSidebarManualUpdate) return;
  return oldRenderSidebarFavoritesList.apply(this, args);
};
