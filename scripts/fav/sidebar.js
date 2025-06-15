// sidebar.js
window.injectSidebarFavorites = function () {
  document.querySelectorAll("#myttv-sidebar-favs").forEach((el) => el.remove());
  const sidebar = document.querySelector(".Layout-sc-1xcs6mc-0.dtSdDz");
  if (!sidebar) return setTimeout(window.injectSidebarFavorites, 1000);

  const block = document.createElement("div");
  block.id = "myttv-sidebar-favs";
  block.style.margin = "16px 0 8px 0";
  block.style.padding = "0";
  block.innerHTML = `
    <div style="display:flex;align-items:center;margin-bottom:8px;margin-left:10px;gap:6px;">
      <div class="InjectLayout-sc-1i43xsx-0 iDMNUO">
        <div class="Layout-sc-1xcs6mc-0 " data-a-target="side-nav-header-collapsed" role="heading" aria-level="3">
          <div style="margin-left:5px;" class="ScSvgWrapper-sc-wkgzod-0 dKXial tw-svg" id="myttv-fav-title-icon">
            <svg id="myttv-fav-title-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L16.15 19.78C16.91 20.24 17.8399 19.56 17.6399 18.7L16.54 13.98L20.2099 10.8C20.8799 10.22 20.5199 9.12001 19.6399 9.05001L14.81 8.64001L12.92 4.18001C12.58 3.37001 11.42 3.37001 11.08 4.18001L9.18995 8.63001L4.35995 9.04001C3.47995 9.11001 3.11995 10.21 3.78995 10.79L7.45995 13.97L6.35995 18.69C6.15995 19.55 7.08995 20.23 7.84995 19.77L12 17.27Z" fill="#ADADB8"/></svg>
          </div>
        </div>
      </div>
      <span class="gLNOIm" id="myttv-fav-title-text">Mes favoris</span>
    </div>
    <div id="myttv-favs-list"></div>
  `;

  setTimeout(() => {
    const text = block.querySelector("#myttv-fav-title-text");
    const svg = block.querySelector("#myttv-fav-title-svg");
    if (text && svg) svg.style.color = getComputedStyle(text).color;
  }, 0);

  if (sidebar.children.length >= 2) {
    sidebar.insertBefore(block, sidebar.children[2]);
  } else {
    sidebar.appendChild(block);
  }

  window.getFavorites((favs) => {
    window.renderSidebarFavoritesList(block, favs, sidebar.offsetWidth);
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
  if (window.myttvSidebarResizeObs) window.myttvSidebarResizeObs.disconnect();
  window.myttvSidebarResizeObs = new ResizeObserver(updateIconVisibility);
  window.myttvSidebarResizeObs.observe(sidebar);

  block.addEventListener("click", () => {
    window.getFavorites((favs) => {
      console.log("Favoris:", favs);
      if (window.getAvatarCache) {
        window.getAvatarCache((cache) => {
          console.log("Cache des avatars:", cache);
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
  forceRefresh = false
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
    list.innerHTML =
      '<div style="color:#aaa;font-size:13px;">Aucune chaîne</div>';
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
  const renderUser = (user) => `
    <div class="ScTransitionBase-sc-hx4quq-0 jaUBmE tw-transition" aria-hidden="false" style="transition-property: transform, opacity; transition-timing-function: ease;">
      <div>
        <div class="Layout-sc-1xcs6mc-0 AoXTY side-nav-card">
          <a aria-haspopup="dialog" class="ScCoreLink-sc-16kq0mq-0 fytYW InjectLayout-sc-1i43xsx-0 ${
            sidebarWidth <= 55 ? "eTNPYC" : "fxorZp side-nav-card__link"
          } tw-link" href="/${user.name}">
            <div class="Layout-sc-1xcs6mc-0 kErOMx side-nav-card__avatar">
              <div class="ScAvatar-sc-144b42z-0 dLsNfm tw-avatar">
                <img class="InjectLayout-sc-1i43xsx-0 fAYJcN tw-image tw-image-avatar${
                  user.isLive ? "" : " myttv-avatar-offline"
                }" alt="" src="${user.avatar}" style="object-fit: cover;">
              </div>
            </div>
            ${
              sidebarWidth > 55
                ? `
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
            `
                : ""
            }
          </a>
        </div>
      </div>
    </div>`;
  list.innerHTML = users.map(renderUser).join("");
};

window.addSidebarFavorite = async function (name) {
  const sidebar = document.querySelector(".Layout-sc-1xcs6mc-0.dtSdDz");
  const block = document.getElementById("myttv-sidebar-favs");
  if (!sidebar || !block) return;
  if (typeof window.addFavorite === "function") {
    window.addFavorite(name, () => {
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
  if (typeof window.removeFavorite === "function") {
    window.removeFavorite(name, () => {
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
