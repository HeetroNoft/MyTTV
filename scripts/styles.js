// styles.js
window.injectGlobalStyles = function () {
  // Injection dynamique du CSS si non déjà présent
  if (!document.getElementById("myttv-settings-style")) {
    const style = document.createElement("style");
    style.id = "myttv-settings-style";
    style.textContent = `
        .myttv-avatar-offline {
          filter: grayscale(1) !important;
          opacity: 0.6 !important;
        }
        .myttv-settings-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .myttv-settings-title {
          font-size: 1.3em;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .myttv-settings-close {
          background: none;
          border: none;
          color: #fff;
          font-size: 1.5em;
          cursor: pointer;
        }
        .myttv-settings-switch-label {
          display: flex;
          align-items: center;
          justify-content: space-between !important;
          width: 100%;
          cursor: pointer;
        }
        .myttv-settings-switch {
          display: inline-block;
          margin-right: 5px;
          position: relative;
          width: 44px;
          height: 24px;
        }
        .myttv-settings-switch-input {
          opacity: 0;
          width: 44px;
          height: 24px;
          position: absolute;
          left: 0;
          top: 0;
          cursor: pointer;
        }
        .myttv-settings-switch-bar {
          position: absolute;
          left: 0;
          top: 0;
          width: 44px;
          height: 24px;
          background: #444;
          border-radius: 12px;
          transition: background 0.2s;
        }
        .myttv-settings-switch-knob {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          background: #fff;
          border-radius: 50%;
          transition: left 0.2s;
        }
        .myttv-settings-row {
          display: flex;
          flex-direction: row !important;
          align-items: center !important;
        }
        .myttv-settings-button {
          padding: 0px 20px !important;
          cursor: pointer;
          width: fit-content;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          height: 30px;
        }
        .myttv-icon-settings {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          gap: 4px;
        }
        .myttv-icon-settings svg {
          width: 20px !important;
          height: 20px !important;
        }
        .myttv-settings-export-import {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
        }
        .myttv-settings-favs-list {
          list-style: none;
          padding: 0;
          margin: 0 0 8px 0;
        }
        .myttv-settings-favs-empty {
          color: #aaa;
          font-size: 13px;
          display: none;
        }
        #myttv-favs-list-popup {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 8px;
          width: 100%;
          max-height: 300px;
          overflow-y: auto;
          background: #26262b;
          border-radius: 0.4rem;
          border: 1px solid #35353c;
          margin: 0px;
        }
        .myttv-settings-refresh {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        [id*="-custom-container"] {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          flex-direction: column;
          width: 100%;
          gap: 8px;
        }
        #myttv-settings-body {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          gap: 24px;
        }
        .myttv-settings-list-title-count {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 8px;
          border-radius: 9999px;
          background: #26262b;
          min-width: 20px;
          height: 20px;
          font-size: 12px;
          color: #adadb8;
          font-weight: 600;
        }
        .myttv-settings-list-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row;
          width: 100%;
        }
        .myttv-settings-favs-list li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 8px;
          gap: 10px;
        }
        #myttv-settings-export-import-custom-container, #myttv-settings-refresh-avatars-custom-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between !important;
          width: 100%;
        }
        .myttv-text-noselect {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
          .myttv-remove-fav {
          width: 30px !important;
          height: 30px !important;
          display: inline-flex;
          position: relative;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
          vertical-align: middle;
          overflow: hidden;
          text-decoration: none;
          white-space: nowrap;
          user-select: none;
          font-weight: var(--font-weight-semibold);
          font-size: var(--button-text-default);
          height: var(--button-size-default);
          border-radius: 9999px;
          background: none; !important;
        }
        .myttv-remove-fav:hover {
          background:rgba(83, 83, 95, 0.32); !important;
          cursor: pointer;
        }
        
        .myttv-scrollbar::-webkit-scrollbar {
          width: 6px; /* for vertical scrollbars */
          height: 6px; /* for horizontal scrollbars */
        }

        /* Track (the background) */
        .myttv-scrollbar::-webkit-scrollbar-track {
          background: rgba(83, 83, 95, 0.32);
          border-radius: 4px;
        }

        /* Thumb (the draggable part) */
        .myttv-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(83, 83, 95, 0.64);
          border-radius: 4px;
        }

        /* On hover */
        .myttv-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(83, 83, 95, 0.78);
        }

        #myttv-fav-btn:not(.isFollow, .onSearch) {
          transform: translateX(-52px);
        }

        #myttv-fav-btn svg {
          transition: transform 0.2s ease-in;
        }

        #myttv-fav-btn:hover svg {
          transform: scale(1.2);
        }

        #myttv-fav-btn.isFav:hover {
          background: #FFAAA8 !important;
        }

        #myttv-fav-btn.isFav:hover svg {
          fill: #000000 !important;
        }

        .InjectLayout-sc-1i43xsx-0.kCBkGE:not(.isFollow) {
          transform: translateX(52px);
        }
      `;
    document.head.appendChild(style);
  }
};

// === CLASSES CSS UTILISÉES DANS LE PROJET ===
// Sidebar principale
const MYTTV_SIDEBAR_CLASS = "Layout-sc-1xcs6mc-0"; // Conteneur principal sidebar Twitch
const MYTTV_BLOCK_CLASS = "dtSdDz"; // Bloc custom MyTTV dans la sidebar
const MYTTV_SECTION_CLASS = "iGMbNn"; // Section de navigation (générique)
const MYTTV_STORIES_SECTION_CLASS = "storiesLeftNavSection--csO9S"; // Section stories Twitch
const MYTTV_TITLE_CLASS = "dTSUNJ"; // Bloc titre de section
const MYTTV_SIDE_NAV_SECTION_CLASS = "side-nav-section"; // Section de navigation latérale
const MYTTV_SIDE_NAV_TITLE_CLASS = "side-nav__title"; // Titre de la navigation latérale

// Header favoris (titre, étoile)
const MYTTV_INJECT_LAYOUT_CLASS = "InjectLayout-sc-1i43xsx-0";
const MYTTV_INJECT_LAYOUT_VARIANT = "iDMNUO";
const MYTTV_LAYOUT_CLASS = "Layout-sc-1xcs6mc-0";
const MYTTV_SVG_WRAPPER_CLASS = "ScSvgWrapper-sc-wkgzod-0";
const MYTTV_SVG_VARIANT = "dKXial";
const MYTTV_CORE_TEXT_CLASS = "CoreText-sc-1txzju1-0";
const MYTTV_CORE_TEXT_VARIANT = "dzXkjr";

// Items de la liste de favoris (cartes)
const MYTTV_TRANSITION_CLASS = "ScTransitionBase-sc-hx4quq-0"; // Animation carte
const MYTTV_TRANSITION_VARIANT = "jaUBmE";
const MYTTV_TW_TRANSITION = "tw-transition";
const MYTTV_LAYOUT_VARIANT_CARD = "AoXTY"; // Carte utilisateur
const MYTTV_SIDE_NAV_CARD = "side-nav-card";
const MYTTV_CORE_LINK_CLASS = "ScCoreLink-sc-16kq0mq-0"; // Lien utilisateur
const MYTTV_CORE_LINK_VARIANT = "fytYW";
const MYTTV_INJECT_LAYOUT_VARIANT_LINK = "cnzybN"; // Lien élargi
const MYTTV_INJECT_LAYOUT_VARIANT_COLLAPSED = "iCYICY"; // Lien réduit (sidebar réduite)
const MYTTV_SIDE_NAV_CARD_LINK = "side-nav-card__link";
const MYTTV_TW_LINK = "tw-link";
const MYTTV_LAYOUT_VARIANT_AVATAR = "kErOMx"; // Avatar utilisateur
const MYTTV_SIDE_NAV_CARD_AVATAR = "side-nav-card__avatar";
const MYTTV_AVATAR_CLASS = "ScAvatar-sc-144b42z-0";
const MYTTV_AVATAR_VARIANT = "dLsNfm";
const MYTTV_TW_AVATAR = "tw-avatar";
const MYTTV_IMAGE_CLASS = "tw-image";
const MYTTV_IMAGE_AVATAR_CLASS = "tw-image-avatar";
const MYTTV_LAYOUT_VARIANT_BLLIH = "bLlihH"; // Bloc infos utilisateur
const MYTTV_LAYOUT_VARIANT_DJFBSR = "dJfBsr";
const MYTTV_LAYOUT_VARIANT_FFUUNA = "ffUuNa";
const MYTTV_LAYOUT_VARIANT_KVRZXX = "kvrzxX";
const MYTTV_SIDE_NAV_CARD_TITLE = "side-nav-card__title";
const MYTTV_CORE_TEXT_VARIANT_KDJZHO = "kdjzho";
const MYTTV_INJECT_LAYOUT_VARIANT_HNBAAK = "hnBAak";
const MYTTV_LAYOUT_VARIANT_DWQOKW = "dWQoKW"; // Bloc jeu
const MYTTV_SIDE_NAV_CARD_METADATA = "side-nav-card__metadata";
const MYTTV_CORE_TEXT_VARIANT_LESGXA = "lesgXA";
const MYTTV_LAYOUT_VARIANT_JXYIBI = "jxYIBi"; // Bloc live/offline
const MYTTV_SIDE_NAV_CARD_LIVE_STATUS = "side-nav-card__live-status";
const MYTTV_LAYOUT_VARIANT_DQFEBK = "dqfEBK"; // Bloc viewers
const MYTTV_CORE_TEXT_VARIANT_FYAAAD = "fYAAA-D";
const MYTTV_CORE_TEXT_VARIANT_CDYDZE = "cdydzE";

// Exposition des classes pour utilisation dans le projet
window.MYTTV_SIDEBAR_CLASS = MYTTV_SIDEBAR_CLASS;
window.MYTTV_BLOCK_CLASS = MYTTV_BLOCK_CLASS;
window.MYTTV_SECTION_CLASS = MYTTV_SECTION_CLASS;
window.MYTTV_STORIES_SECTION_CLASS = MYTTV_STORIES_SECTION_CLASS;
window.MYTTV_TITLE_CLASS = MYTTV_TITLE_CLASS;
window.MYTTV_SIDE_NAV_SECTION_CLASS = MYTTV_SIDE_NAV_SECTION_CLASS;
window.MYTTV_SIDE_NAV_TITLE_CLASS = MYTTV_SIDE_NAV_TITLE_CLASS;
window.MYTTV_INJECT_LAYOUT_CLASS = MYTTV_INJECT_LAYOUT_CLASS;
window.MYTTV_INJECT_LAYOUT_VARIANT = MYTTV_INJECT_LAYOUT_VARIANT;
window.MYTTV_LAYOUT_CLASS = MYTTV_LAYOUT_CLASS;
window.MYTTV_SVG_WRAPPER_CLASS = MYTTV_SVG_WRAPPER_CLASS;
window.MYTTV_SVG_VARIANT = MYTTV_SVG_VARIANT;
window.MYTTV_CORE_TEXT_CLASS = MYTTV_CORE_TEXT_CLASS;
window.MYTTV_CORE_TEXT_VARIANT = MYTTV_CORE_TEXT_VARIANT;
window.MYTTV_TRANSITION_CLASS = MYTTV_TRANSITION_CLASS;
window.MYTTV_TRANSITION_VARIANT = MYTTV_TRANSITION_VARIANT;
window.MYTTV_TW_TRANSITION = MYTTV_TW_TRANSITION;
window.MYTTV_LAYOUT_VARIANT_CARD = MYTTV_LAYOUT_VARIANT_CARD;
window.MYTTV_SIDE_NAV_CARD = MYTTV_SIDE_NAV_CARD;
window.MYTTV_CORE_LINK_CLASS = MYTTV_CORE_LINK_CLASS;
window.MYTTV_CORE_LINK_VARIANT = MYTTV_CORE_LINK_VARIANT;
window.MYTTV_INJECT_LAYOUT_VARIANT_LINK = MYTTV_INJECT_LAYOUT_VARIANT_LINK;
window.MYTTV_INJECT_LAYOUT_VARIANT_COLLAPSED =
  MYTTV_INJECT_LAYOUT_VARIANT_COLLAPSED;
window.MYTTV_SIDE_NAV_CARD_LINK = MYTTV_SIDE_NAV_CARD_LINK;
window.MYTTV_TW_LINK = MYTTV_TW_LINK;
window.MYTTV_LAYOUT_VARIANT_AVATAR = MYTTV_LAYOUT_VARIANT_AVATAR;
window.MYTTV_SIDE_NAV_CARD_AVATAR = MYTTV_SIDE_NAV_CARD_AVATAR;
window.MYTTV_AVATAR_CLASS = MYTTV_AVATAR_CLASS;
window.MYTTV_AVATAR_VARIANT = MYTTV_AVATAR_VARIANT;
window.MYTTV_TW_AVATAR = MYTTV_TW_AVATAR;
window.MYTTV_IMAGE_CLASS = MYTTV_IMAGE_CLASS;
window.MYTTV_IMAGE_AVATAR_CLASS = MYTTV_IMAGE_AVATAR_CLASS;
window.MYTTV_LAYOUT_VARIANT_BLLIH = MYTTV_LAYOUT_VARIANT_BLLIH;
window.MYTTV_LAYOUT_VARIANT_DJFBSR = MYTTV_LAYOUT_VARIANT_DJFBSR;
window.MYTTV_LAYOUT_VARIANT_FFUUNA = MYTTV_LAYOUT_VARIANT_FFUUNA;
window.MYTTV_LAYOUT_VARIANT_KVRZXX = MYTTV_LAYOUT_VARIANT_KVRZXX;
window.MYTTV_SIDE_NAV_CARD_TITLE = MYTTV_SIDE_NAV_CARD_TITLE;
window.MYTTV_CORE_TEXT_VARIANT_KDJZHO = MYTTV_CORE_TEXT_VARIANT_KDJZHO;
window.MYTTV_INJECT_LAYOUT_VARIANT_HNBAAK = MYTTV_INJECT_LAYOUT_VARIANT_HNBAAK;
window.MYTTV_LAYOUT_VARIANT_DWQOKW = MYTTV_LAYOUT_VARIANT_DWQOKW;
window.MYTTV_SIDE_NAV_CARD_METADATA = MYTTV_SIDE_NAV_CARD_METADATA;
window.MYTTV_CORE_TEXT_VARIANT_LESGXA = MYTTV_CORE_TEXT_VARIANT_LESGXA;
window.MYTTV_LAYOUT_VARIANT_JXYIBI = MYTTV_LAYOUT_VARIANT_JXYIBI;
window.MYTTV_SIDE_NAV_CARD_LIVE_STATUS = MYTTV_SIDE_NAV_CARD_LIVE_STATUS;
window.MYTTV_LAYOUT_VARIANT_DQFEBK = MYTTV_LAYOUT_VARIANT_DQFEBK;
window.MYTTV_CORE_TEXT_VARIANT_FYAAAD = MYTTV_CORE_TEXT_VARIANT_FYAAAD;
window.MYTTV_CORE_TEXT_VARIANT_CDYDZE = MYTTV_CORE_TEXT_VARIANT_CDYDZE;
