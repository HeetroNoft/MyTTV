// Nouvelle apparence des settings avec logo centralisé
window.openMyTTVSettingsPopup = function () {
  // Détection de la langue et chargement des textes
  const lang = (
    window.getMyttvLang
      ? window.getMyttvLang()
      : document.documentElement.lang || navigator.language || "en"
  ).substring(0, 2);
  const t = window.myttvI18n
    ? window.myttvI18n(lang)
    : {
        settings: "Paramètres",
        favorites: "Chaînes favorites",
        noFavorites: "Aucun favori",
        vodsub: "Permet d'afficher les VOD réservé aux abonnées\u00A0",
        refreshAvatars: "Rafraîchir les avatars des favoris",
        update: "Mettre à jour",
        backup: "Backup",
        export: "Exporter",
        import: "Importer",
        importSuccess:
          "Import réussi ! Recharge la page pour voir les changements.",
        importFail: "Fichier invalide",
        exportFile: "myttv_settings.json",
        remove: "Supprimer",
        confirmRemove: "Supprimer ce favori ?",
        noFavToRefresh: "Aucun favori à rafraîchir.",
        avatarsRefreshed: "Images rafraîchies !",
        favoritesCount: "chaînes",
      };

  // Supprime la popup si déjà présente
  const oldPopup = document.getElementById("myttv-settings-popup");
  if (oldPopup) oldPopup.remove();

  // Overlay sombre
  const overlay = document.createElement("div");
  overlay.id = "myttv-settings-popup";
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0,0,0,0.4)";
  overlay.style.zIndex = 99999;
  overlay.onclick = function (e) {
    if (e.target === overlay) overlay.remove();
  };

  // Contenu de la popup
  const popup = document.createElement("div");
  popup.style.position = "absolute";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.background = "#18181B";
  popup.style.color = "#fff";
  popup.style.padding = "32px 48px 48px 48px";
  popup.style.borderRadius = "12px";
  popup.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)";
  popup.style.minWidth = "500px";
  popup.style.maxWidth = "90vw";
  popup.style.maxHeight = "80vh";
  popup.style.overflowY = "auto";

  // Header avec logo
  let settingsSVG = window.settingsSVG || "";
  // Nettoyage des attributs width/height pour éviter les erreurs SVG
  if (settingsSVG) {
    settingsSVG = settingsSVG
      .replace(/\swidth="[^"]*"/gi, "")
      .replace(/\sheight="[^"]*"/gi, "")
      .replace(
        "<svg ",
        '<svg style="height:60px;width:auto;vertical-align:middle;" '
      );
  }

  // (Retirer la balise <style> du innerHTML de la popup)
  popup.innerHTML = `
    <div class="myttv-settings-header">
      <span class="myttv-settings-title myttv-text-noselect">
        ${settingsSVG} ${t.settings}
      </span>
    </div>
    <div id="myttv-settings-body">
      <div id="myttv-settings-list-custom-container">
        <div class="myttv-settings-list-title myttv-text-noselect">${
          t.favorites
        } <span class="myttv-settings-list-title-count">0</span></div>
        <ul id="myttv-favs-list-popup" class="myttv-scrollbar myttv-settings-favs-list"></ul>
        <div id="myttv-favs-empty" class="myttv-settings-favs-empty myttv-text-noselect">${
          t.noFavorites
        }</div>
      </div>
      <div id="myttv-settings-vod-custom-container">
        <label class="myttv-settings-switch-label">
          <span style="width: 100%;" class="myttv-text-noselect">${
            t.vodsub
          }</span>
          <span class="myttv-settings-switch">
            <input type="checkbox" id="myttv-option-vodsub" class="myttv-settings-switch-input" />
            <span id="myttv-vodsub-switch" class="myttv-settings-switch-bar"></span>
            <span id="myttv-vodsub-knob" class="myttv-settings-switch-knob"></span>
          </span>
        </label>
      </div>
      <div id="myttv-settings-refresh-avatars-custom-container" class="myttv-settings-row">
        <span style="display: inline-block; width: 100%;" class="myttv-text-noselect">${
          t.refreshAvatars
        }</span>
        <div class="myttv-settings-refresh myttv-settings-row">
          <button id="myttv-refresh-avatars" class="myttv-settings-button gGttfb myttv-icon-settings myttv-text-noselect">${
            window.refreshSVG
          } ${t.update}</button>
        </div>
      </div>
      <div id="myttv-settings-export-import-custom-container" class="myttv-settings-row">
        <span style="display: inline-block; width: 100%;" class="myttv-text-noselect">${
          t.backup
        }</span>
        <div class="myttv-settings-export-import myttv-settings-row">
          <button id="myttv-export-settings" class="myttv-settings-button gGttfb myttv-icon-settings myttv-text-noselect">${window.downloadSVG(
            true
          )} ${t.export}</button>
          <div class="myttv-settings-button gGttfb">
            <label class="myttv-icon-settings myttv-text-noselect" for="myttv-import-settings">${window.uploadSVG(
              true
            )} ${
    t.import
  }<input type="file" id="myttv-import-settings" accept="application/json" style="display: none"/></label>
          </div>
        </div>
      </div>
    </div>
    <div class="myttv-settings-footer" style="margin-top:32px; text-align:center;">
      <span class="myttv-text-noselect" style="font-size: 12px; color: #aaa; display:block;">
        MyTTV ${window.myttvVersion()} – ${t.settings}<br>
        <span style="font-size:11px; color:#888;">par Heet – <a href="https://github.com/heetronoft" target="_blank" style="color:#888;text-decoration:underline;">github.com/heetronoft</a></span>
      </span>
    </div>
  `;

  // Gestion du switch VOD-Sub (toggle visuel + logique)
  const vodSubSwitch = popup.querySelector("#myttv-option-vodsub");
  const vodSubKnob = popup.querySelector("#myttv-vodsub-knob");
  const vodSubBar = popup.querySelector("#myttv-vodsub-switch");
  // Suppression de l'affichage du statut vodSubStatus
  const updateVodSubUI = (checked) => {
    vodSubKnob.style.left = checked ? "22px" : "2px";
    vodSubBar.style.background = checked ? "#9147ff" : "#444";
  };
  const vodEnabled = localStorage.getItem("myttv_vodsub_enabled") !== "false";
  vodSubSwitch.checked = vodEnabled;
  updateVodSubUI(vodEnabled);
  vodSubSwitch.onchange = function () {
    localStorage.setItem(
      "myttv_vodsub_enabled",
      vodSubSwitch.checked ? "true" : "false"
    );
    updateVodSubUI(vodSubSwitch.checked);
    console.log(
      "[MyTTV/Settings] VOD-Sub " +
        (vodSubSwitch.checked ? "activé" : "désactivé")
    );
    setTimeout(() => location.reload(), 500);
  };

  // Liste des favoris (apparence identique à la sidebar)
  const favsList = popup.querySelector("#myttv-favs-list-popup");
  const favsEmpty = popup.querySelector("#myttv-favs-empty");
  window.getFavorites((favs) => {
    const countSpan = popup.querySelector(".myttv-settings-list-title-count");
    if (!favs || favs.length === 0) {
      favsEmpty.style.display = "block";
      favsList.style.display = "none";
      favsList.innerHTML = "";
      if (countSpan) countSpan.textContent = `0 ${t.favoritesCount}`;
    } else {
      favsList.style.display = "block";
      favsEmpty.style.display = "none";
      if (countSpan)
        countSpan.textContent = favs.length.toString() + " " + t.favoritesCount;
      // Récupérer le cache d'avatars
      window.getAvatarCache((avatarCache) => {
        favsList.innerHTML = favs
          .map((name) => {
            const avatar =
              avatarCache && avatarCache[name.toLowerCase()]
                ? avatarCache[name.toLowerCase()]
                : "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png";
            return `
                <li>
                  <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" class="myttv-fav-popup-user" data-name="${name}">
                    <img src="${avatar}" alt="avatar" style="width:32px;height:32px;border-radius:50%;object-fit:cover;background:#23232b;" class="myttv-text-noselect">
                    <span style="font-weight:bold; text-transform:uppercase;">${name}</span>
                  </div>
                  <button class='myttv-remove-fav myttv-text-noselect' data-name='${name}' title='${t.remove}'>${window.closeSVG}</button>
                </li>
              `;
          })
          .join("");
        // Ajout du clic sur l'image ou le nom pour ouvrir la chaîne
        favsList.querySelectorAll(".myttv-fav-popup-user").forEach((el) => {
          el.onclick = function (e) {
            const name = el.getAttribute("data-name");
            // Fermer la popup puis naviguer
            document.getElementById("myttv-settings-popup")?.remove();
            window.location.href = "/" + name;
          };
        });
        favsList.querySelectorAll(".myttv-remove-fav").forEach((btn) => {
          btn.onclick = function () {
            const name = btn.getAttribute("data-name");
            if (confirm(t.confirmRemove)) {
              window.removeFavorite(name, () => {
                btn.parentElement.remove();
                if (typeof window.injectSidebarFavorites === "function") {
                  window.injectSidebarFavorites();
                }
                if (typeof window.injectFavButton === "function") {
                  // Supprime le bouton favori existant avant réinjection
                  document
                    .querySelectorAll("#myttv-fav-btn")
                    .forEach((btn) => btn.remove());
                  if (typeof myttvFavBtnInjected !== "undefined")
                    myttvFavBtnInjected = false;
                  setTimeout(() => window.injectFavButton(), 100); // Laisse le temps au storage de se mettre à jour
                }
                // Mettre à jour le compteur après suppression
                const newCount = favsList.querySelectorAll("li").length;
                if (countSpan)
                  countSpan.textContent =
                    newCount.toString() + " " + t.favoritesCount;
                if (newCount === 0) {
                  favsList.style.display = "none";
                  favsEmpty.style.display = "block";
                }
              });
            }
          };
        });
      });
    }
  });

  // Rafraîchir le cache des images
  popup.querySelector("#myttv-refresh-avatars").onclick = function () {
    window.getFavorites((favs) => {
      if (!favs || favs.length === 0) return alert(t.noFavToRefresh);
      let done = 0;
      favs.forEach((name) => {
        fetch(`https://decapi.me/twitch/avatar/${name}`)
          .then((res) => res.text())
          .then((url) => {
            window.getAvatarCache((cache) => {
              cache[name.toLowerCase()] = url;
              window.setAvatarCache(cache, () => {
                done++;
                if (done === favs.length) alert(t.avatarsRefreshed);
              });
            });
          });
      });
    });
  };

  // Export settings (favoris + avatars + options)
  popup.querySelector("#myttv-export-settings").onclick = function () {
    window.getFavorites((favs) => {
      window.getAvatarCache((avatars) => {
        const data = {
          favs,
          avatars,
          vodsub: localStorage.getItem("myttv_vodsub_enabled") !== "false",
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = t.exportFile;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      });
    });
  };

  // Import settings (favoris + avatars + options)
  popup.querySelector("#myttv-import-settings").onchange = function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
      try {
        const data = JSON.parse(evt.target.result);
        if (Array.isArray(data.favs)) {
          window.setFavorites(data.favs, () => {
            if (typeof window.injectSidebarFavorites === "function") {
              window.injectSidebarFavorites();
            }
            if (typeof window.openMyTTVSettingsPopup === "function") {
              window.openMyTTVSettingsPopup();
            }
          });
        } else {
          if (typeof window.injectSidebarFavorites === "function") {
            window.injectSidebarFavorites();
          }
          if (typeof window.openMyTTVSettingsPopup === "function") {
            window.openMyTTVSettingsPopup();
          }
        }
        if (typeof data.avatars === "object") {
          window.setAvatarCache(data.avatars, () => {});
        }
        if (typeof data.vodsub === "boolean") {
          localStorage.setItem(
            "myttv_vodsub_enabled",
            data.vodsub ? "true" : "false"
          );
        }
        alert(t.importSuccess);
      } catch {
        alert(t.importFail);
      }
    };
    reader.readAsText(file);
  };

  overlay.appendChild(popup);
  document.body.appendChild(overlay);
};

// Injection d'un bouton dans la navbar Twitch
window.injectNavbarSettingsButton = function (retry = 0) {
  const navbar = document.querySelector(".Layout-sc-1xcs6mc-0.bZYcrx");
  if (!navbar) {
    if (retry < 5) {
      setTimeout(() => window.injectNavbarSettingsButton(retry + 1), 500);
    } else {
      console.warn(
        "[MyTTV] Impossible d'injecter le bouton navbar après 5 tentatives."
      );
    }
    return;
  }
  const oldBtn = document.getElementById("myttv-navbar-btn");
  if (oldBtn) oldBtn.remove();
  const refBtn = navbar.querySelector(".Layout-sc-1xcs6mc-0.hdaUxc");
  if (!refBtn) {
    if (retry < 5) {
      setTimeout(() => window.injectNavbarSettingsButton(retry + 1), 500);
    } else {
      console.warn(
        "[MyTTV] Impossible de trouver le bouton de référence dans la navbar."
      );
    }
    return;
  }
  const wrapper = document.createElement("div");
  wrapper.id = "myttv-navbar-btn";
  // Utilisation dynamique du SVG depuis window.settingsSVG
  const svg = window.settingsSVG;
  wrapper.innerHTML = `
      <button id="myttv-navbar-settings-btn" style="background: transparent; border: none; cursor: pointer; padding: 6px; margin: 4px; display: flex; align-items: center; border-radius: 9999px;">
        ${svg}
      </button>
  `;
  const btn = wrapper.querySelector("#myttv-navbar-settings-btn");
  btn.onclick = function (e) {
    e.stopPropagation();
    window.openMyTTVSettingsPopup && window.openMyTTVSettingsPopup();
  };
  btn.onmouseenter = function () {
    btn.style.background = "#2F2F36";
  };
  btn.onmouseleave = function () {
    btn.style.background = "transparent";
  };
  const beforeElem = navbar.querySelector(".Layout-sc-1xcs6mc-0.hdaUxc");
  if (beforeElem) {
    navbar.insertBefore(wrapper, beforeElem);
  } else {
    navbar.appendChild(wrapper);
  }
};

// Injection auto du bouton settings navbar au chargement
(function () {
  // Attendre que window.settingsSVG soit présent (svg.js doit être chargé)
  function tryInject() {
    if (
      typeof window.injectNavbarSettingsButton === "function" &&
      window.settingsSVG
    ) {
      setTimeout(() => window.injectNavbarSettingsButton(), 2000);
    } else {
      setTimeout(tryInject, 200);
    }
  }
  tryInject();
})();
