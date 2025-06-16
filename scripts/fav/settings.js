// import { settingsSVG } from "./svg.js"; // SUPPRIMÉ car incompatible content-script

// Fonction pour ouvrir la popup de settings MyTTV
window.openMyTTVSettingsPopup = function () {
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
  popup.style.background = "#18181b";
  popup.style.color = "#fff";
  popup.style.padding = "32px 24px 24px 24px";
  popup.style.borderRadius = "12px";
  popup.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)";
  popup.style.minWidth = "340px";
  popup.style.maxWidth = "90vw";
  popup.style.maxHeight = "80vh";
  popup.style.overflowY = "auto";

  // Header
  popup.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
      <span style="font-size:1.3em;font-weight:bold;">Paramètres MyTTV</span>
      <button id="myttv-settings-close" style="background:none;border:none;color:#fff;font-size:1.5em;cursor:pointer;">&times;</button>
    </div>
    <div style="margin-bottom:18px;">
      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
        <span>VOD-Sub&nbsp;</span>
        <span style="display:inline-block;position:relative;width:44px;height:24px;">
          <input type="checkbox" id="myttv-option-vodsub" style="opacity:0;width:44px;height:24px;position:absolute;left:0;top:0;cursor:pointer;">
          <span id="myttv-vodsub-switch" style="position:absolute;left:0;top:0;width:44px;height:24px;background:#444;border-radius:12px;transition:background 0.2s;"></span>
          <span id="myttv-vodsub-knob" style="position:absolute;top:2px;left:2px;width:20px;height:20px;background:#fff;border-radius:50%;transition:left 0.2s;"></span>
        </span>
        <span id="myttv-vodsub-status" style="font-size:0.95em;color:#aaa;"></span>
      </label>
    </div>
    <div style="margin-bottom:18px;">
      <button id="myttv-refresh-avatars" style="background:#23232b;color:#fff;border:none;padding:7px 16px;border-radius:6px;cursor:pointer;">Rafraîchir les images</button>
      <button id="myttv-export-settings" style="background:#23232b;color:#fff;border:none;padding:7px 16px;border-radius:6px;cursor:pointer;margin-left:10px;">Exporter</button>
      <label for="myttv-import-settings" style="background:#23232b;color:#fff;border:none;padding:7px 16px;border-radius:6px;cursor:pointer;margin-left:10px;">Importer<input type="file" id="myttv-import-settings" accept="application/json" style="display:none;"></label>
    </div>
    <div style="margin-bottom:8px;font-weight:bold;">Favoris :</div>
    <ul id="myttv-favs-list-popup" style="list-style:none;padding:0;margin:0 0 8px 0;"></ul>
    <div id="myttv-favs-empty" style="color:#aaa;font-size:13px;display:none;">Aucun favori</div>
  `;
  popup.querySelector("#myttv-settings-close").onclick = () => overlay.remove();

  // Gestion du switch VOD-Sub (toggle visuel + logique)
  const vodSubSwitch = popup.querySelector("#myttv-option-vodsub");
  const vodSubKnob = popup.querySelector("#myttv-vodsub-knob");
  const vodSubBar = popup.querySelector("#myttv-vodsub-switch");
  const vodSubStatus = popup.querySelector("#myttv-vodsub-status");
  const updateVodSubUI = (checked) => {
    vodSubKnob.style.left = checked ? "22px" : "2px";
    vodSubBar.style.background = checked ? "#9147ff" : "#444";
    vodSubStatus.textContent = checked ? "activé" : "désactivé";
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
    //window.toggleVodSubScripts(vodSubSwitch.checked);
    setTimeout(() => location.reload(), 500);
  };

  // Liste des favoris
  const favsList = popup.querySelector("#myttv-favs-list-popup");
  const favsEmpty = popup.querySelector("#myttv-favs-empty");
  window.getFavorites((favs) => {
    if (!favs || favs.length === 0) {
      favsEmpty.style.display = "block";
      favsList.innerHTML = "";
    } else {
      favsEmpty.style.display = "none";
      favsList.innerHTML = favs
        .map(
          (name) =>
            `<li style='display:flex;align-items:center;justify-content:space-between;padding:4px 0;'>
          <span style='overflow:hidden;text-overflow:ellipsis;max-width:180px;'>${name}</span>
          <button class='myttv-remove-fav' data-name='${name}' style='background:none;border:none;color:#ff5c5c;font-size:1.2em;cursor:pointer;margin-left:10px;' title='Supprimer'>&times;</button>
        </li>`
        )
        .join("");
      favsList.querySelectorAll(".myttv-remove-fav").forEach((btn) => {
        btn.onclick = function () {
          const name = btn.getAttribute("data-name");
          window.removeFavorite(name, () => {
            btn.parentElement.remove();
            if (favsList.children.length === 0)
              favsEmpty.style.display = "block";
          });
        };
      });
    }
  });

  // Rafraîchir le cache des images
  popup.querySelector("#myttv-refresh-avatars").onclick = function () {
    window.getFavorites((favs) => {
      if (!favs || favs.length === 0)
        return alert("Aucun favori à rafraîchir.");
      let done = 0;
      favs.forEach((name) => {
        fetch(`https://decapi.me/twitch/avatar/${name}`)
          .then((res) => res.text())
          .then((url) => {
            window.getAvatarCache((cache) => {
              cache[name.toLowerCase()] = url;
              window.setAvatarCache(cache, () => {
                done++;
                if (done === favs.length) alert("Images rafraîchies !");
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
        a.download = "myttv_settings.json";
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
          window.setFavorites(data.favs, () => {});
        }
        if (typeof data.avatars === "object") {
          window.setAvatarCache(data.avatars, () => {});
        }
        if (typeof data.vodsub === "boolean") {
          localStorage.setItem(
            "myttv_vodsub_enabled",
            data.vodsub ? "true" : "false"
          );
          //window.toggleVodSubScripts(data.vodsub);
        }
        alert("Import réussi ! Recharge la page pour voir les changements.");
      } catch {
        alert("Fichier invalide");
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
  const refBtn = navbar.querySelector(".Layout-sc-1xcs6mc-0.eaYOCu");
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
  const svg =
    window.settingsSVG ||
    '<svg width="20" height="20" viewBox="0 0 39 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#9147ff"/></svg>';
  wrapper.innerHTML = `
      <button id="myttv-navbar-settings-btn" style="background: transparent; border: none; cursor: pointer; padding: 5px; margin: 5px; display: flex; align-items: center; border-radius: 4px;">
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
  const beforeElem = navbar.querySelector(".Layout-sc-1xcs6mc-0.joVFfs");
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
