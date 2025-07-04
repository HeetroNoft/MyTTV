// styles.js
window.injectGlobalStyles = function () {
  // Injection dynamique du CSS si non déjà présent
  if (!document.getElementById("myttv-settings-style")) {
    const style = document.createElement("style");
    style.id = "myttv-settings-style";
    style.textContent = `
        :root {
          --myttv-fav-avatar-border-radius: 9999px;
          --myttv-font-size-4: 1.4rem;
          --myttv-font-weight-semibold: 600;
          --myttv-line-height-body: 1.4;
          --myttv-line-height-heading: 1.1;
        }
        :root.tw-root--theme-light {
          --myttv-color-bg: #F7F7F8;
          --myttv-color-surface: #EFEFF1;
          --myttv-color-surface-hover: #E6E6EA;
          --myttv-color-elevation: #FFFFFF;
          --myttv-color-elevation-hover: #E2E2E6;
          --myttv-color-border: #E2E2E6;
          --myttv-color-text: #0E0E10;
          --myttv-color-onAccent: #EFEFF1;
          --myttv-color-dark: #0E0E10;
          --myttv-color-legend: #53535F;
          --myttv-color-placeholder: #AAAAAA;
          --myttv-color-button: #E7E7EA;
          --myttv-color-button-hover: #DDDDE1;
          --myttv-color-accent: #9147ff;
          --myttv-color-lightDanger: #ffaaa8;
          --myttv-color-danger: #EB0200;
          --myttv-color-darkDanger: #971411;
        }
        :root.tw-root--theme-dark {
          --myttv-color-bg: #0E0E10;
          --myttv-color-surface: #1F1F23;
          --myttv-color-surface-hover: #26262B;
          --myttv-color-elevation: #18181B;
          --myttv-color-elevation-hover: #35353C;
          --myttv-color-border: #35353C;
          --myttv-color-text: #EFEFF1;
          --myttv-color-onAccent: #EFEFF1;
          --myttv-color-dark: #0E0E10;
          --myttv-color-legend: #ADADB8;
          --myttv-color-placeholder: #AAAAAA;
          --myttv-color-button: #29292E;
          --myttv-color-button-hover: #2F2F36;
          --myttv-color-accent: #9147ff;
          --myttv-color-lightDanger: #ffaaa8;
          --myttv-color-danger: #EB0200;
          --myttv-color-darkDanger: #971411;
        }

        /* ----------------------------------------- */
        /* ----------- SIDEBAR FAVORITES ----------- */
        /* ----------------------------------------- */

        #myttv-sidebar-favs {
          padding: 0;
          margin: 12px 0 12px 0;
        }

        /* ------------------------------------------------ */
        /* ----------- SIDEBAR FAVORITES HEADER ----------- */
        /* ------------------------------------------------ */

        #myttv-favs-header {
          display: flex;
          align-items: center;
          padding: 8px;
          gap: 6px;
        }
        #myttv-fav-title-svg {
          font-size: 1.2em;
          font-weight: bold;
        }
        #myttv-fav-title-icon {
          margin-left: 3px;
          display:inline-flex;
          align-items: center;
          justify-content: center;
          -webkit-box-align: center;
          color: var(--myttv-color-accent);
        }
        #myttv-fav-title-icon svg {
          width: 2rem;
          height: 2rem;
        }
        #myttv-fav-title-text {
          color: var(--myttv-color-text);
          font-size: var(--myttv-font-size-4);
          font-weight: var(--myttv-font-weight-semibold);
          line-height: var(--myttv-line-height-body);
          margin: 0 0 0 -5px !important;
          padding: 0;
        }
        #myttv-favs-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* ---------------------------------------------- */
        /* ----------- SIDEBAR FAVORITES LIST ----------- */
        /* ---------------------------------------------- */

        .myttv-user-list-item {
          display: flex;
          align-items: center;
          padding: 0 8px;
          transition-property: transform, opacity;
          transition-timing-function: ease;
          transition-delay: 0s;
          transition-duration: 150ms;
          opacity: 1;
          transform: scale(1);
          height: 42px !important;
          width: 100% !important;
        }
        .myttv-user-list-item:not(.myttv-fav-item-collapsed):hover {
          background: var(--myttv-color-button-hover);
        }
        .myttv-user-list-item:hover {
          cursor: pointer;
        }
        .myttv-user-list-item.myttv-fav-item-collapsed {
          margin-left: -2px !important;
        }
        .myttv-fav-item {
          position: relative; !important;
          width: 100% !important;
        }
        .myttv-user-fav-link {
          height: fit-content;
          text-decoration: none;
          padding-inline: 0 !important;
          padding-block: 0.5rem !important;
          display: flex !important;
          -webkit-box-align: center !important;
          align-items: center !important;
          flex-wrap: nowrap !important;
          width: 100% !important;
        }
        .myttv-user-fav-link:hover {
          text-decoration: none !important;
          cursor: pointer !important;
        }
        .myttv-fav-avatar {
          position: relative;
          background-color: inherit;
          width: 3rem;
          height: 3rem;
          max-height: 100%;
          flex-shrink: 0 !important;
          -webkit-box-align: center !important;
          align-items: center !important;
        }
        .myttv-fav-avatar-img {
          width: 100%;
          height: 100%;
          border-radius: var(--myttv-fav-avatar-border-radius);
        }
        .myttv-avatar-offline {
          filter: grayscale(100%) !important;
        }
        .myttv-fav-item-collapsed .myttv-fav-info {
          display: none !important;
        }
        .myttv-fav-info {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          margin-inline-start: 8px !important;
          width: 100% !important;
          display: flex !important;
          justify-content: space-between !important;
          flex-direction: row !important;
          -webkit-box-pack: justify !important;
        }
        .myttv-fav-card-metadata {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 100%;
        }
        .myttv-fav-card-title {
          display: flex !important;
          align-items: center !important;
          -webkit-box-align: center !important;
        }
        .myttv-fav-card-title p {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          -webkit-box-flex: 1 !important;
          flex-grow: 1 !important;
          font-weight: var(--myttv-font-weight-semibold) !important;
          font-size: var(--myttv-font-size-4) !important;
          line-height: var(--myttv-line-height-heading) !important;
          color: var(--myttv-color-text) !important;
        }
        .myttv-fav-game-title {
          padding-inline-end: 4px !important;
        }
        .myttv-fav-game-title p {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow-x: hidden;
          font-size: var(--myttv-font-size-4) !important;
          color: var(--myttv-color-legend) !important;
          line-height: var(--myttv-line-height-body) !important;
          text-align: -webkit-match-parent !important;
        }
        .myttv-fav-live-status {
          min-width: 4rem;
          flex-shrink: 0 !important;
          margin-inline-start: 4px !important;
          display: flex !important;
          align-items: center !important;
          -webkit-box-align: center !important;
          height: fit-content !important;
        }
        .myttv-fav-live-status p {
          width: 0.1rem;
          height: 0.1rem;
          border: none;
          clip: rect(0, 0, 0, 0);
          margin: -0.1rem;
          overflow: hidden;
          padding: 0;
          position: absolute;
          line-height: var(--myttv-line-height-body);
          font-size: var(--myttv-font-size-4);
        }
        .myttv-fav-viewers-count {
          margin-inline-start: 4px !important;
        }
        .myttv-fav-viewers-count span {
          color: var(--myttv-color-text) !important;
          font-size: var(--myttv-font-size-4) !important;
          line-height: var(--myttv-line-height-body) !important;
        }
        .myttv-fav-viewers-count p {
          width: 0,1rem;
          height: 0.1rem;
          border: none;
          clip: rect(0, 0, 0, 0);
          margin: -0.1rem;
          overflow: hidden;
          padding: 0;
          position: absolute;
          line-height: var(--myttv-line-height-body) !important;
        }

        /* ------------------------------------------------ */
        /* ----------- SIDEBAR PREVIEW ON HOVER ----------- */
        /* ------------------------------------------------ */

        .myttv-fav-tooltip {
          position: fixed;
          z-index: 99999;
          background: var(--myttv-color-surface);
          color: var(--myttv-color-text);
          border-radius: 8px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.4);
          padding: 0;
          width: 320px;
          pointer-events: none;
          transition: opacity 0.15s;
          opacity: 0;
          animation: myttv-fav-tooltip-fadein 0.15s;
        }
        .myttv-fav-tooltip-preview {
          width: 100%;
          height: 180px;
          overflow: hidden;
          border-radius: 8px 8px 0 0;
        }
        .myttv-fav-tooltip-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .myttv-fav-tooltip-info {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;

        }
        .myttv-fav-tooltip-title {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          -webkit-box-flex: 1 !important;
          flex-grow: 1 !important;
          font-weight: var(--myttv-font-weight-semibold) !important;
          font-size: var(--myttv-font-size-4) !important;
          line-height: var(--myttv-line-height-heading) !important;
          color: var(--myttv-color-text) !important;
          text-transform: capitalize;
        }
        .myttv-fav-tooltip-subtitle {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow-x: hidden;
          font-size: var(--myttv-font-size-4) !important;
          color: var(--myttv-color-legend) !important;
          line-height: var(--myttv-line-height-body) !important;
          text-align: -webkit-match-parent !important;
        }
        @keyframes myttv-fav-tooltip-fadein {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }

        /* -------------------------------- */
        /* ----------- SETTINGS ----------- */
        /* -------------------------------- */

        .myttv-settings-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.4);
          z-index: 99999;
        }
        .myttv-settings-popup {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--myttv-color-surface);
          color: var(--myttv-color-text);
          padding: 32px 48px 48px 48px;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          min-width: 500px;
          max-width: 90vw;
          max-height: 80vh;
          overflow-y: auto;
        }
        .myttv-fav-popup-user {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }
        .myttv-fav-popup-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          background: var(--myttv-grey-800);
        }
        .myttv-fav-popup-name {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          -webkit-box-flex: 1 !important;
          flex-grow: 1 !important;
          font-weight: var(--myttv-font-weight-semibold) !important;
          font-size: var(--myttv-font-size-4) !important;
          line-height: var(--myttv-line-height-heading) !important;
          color: var(--myttv-color-text) !important;
        }
        .myttv-navbar-settings-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px;
          margin: 4px;
          display: flex;
          align-items: center;
          border-radius: 9999px;
          transition: background 0.2s;
        }
        .myttv-navbar-settings-btn:hover {
          background: var(--myttv-color-elevation-hover);
        }

        .myttv-settings-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          color: var(--myttv-color-text);
        }
        .myttv-settings-title {
          font-size: 1.3em;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--myttv-color-text);
        }
        .myttv-settings-close {
          background: none;
          border: none;
          color: var(--myttv-color-text);
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
        .myttv-settings-switch-label-text {
          width: 100%;
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
          background: var(--myttv-border-color);
          border-radius: 12px;
          transition: background 0.2s;
        }
        .myttv-settings-switch-knob {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          background: var(--myttv-color-onAccent);
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
          background: var(--myttv-color-button);
          color: var(--myttv-color-accent);
        }
        .myttv-settings-button:hover {
          background: var(--myttv-color-button-hover);
          color: var(--myttv-color-surface);
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
          background: var(--myttv-color-button);
          border-radius: 0.4rem;
          border: 1px solid var(--myttv-color-border);
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
          background: var(--myttv-color-button);
          min-width: 20px;
          height: 20px;
          font-size: 12px;
          color: var(--myttv-color-legend);
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
          background: var(--myttv-color-elevation-hover) !important;
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

        .myttv-settings-footer-info {
          font-size: 12px;
          color: var(--myttv-color-legend); 
          display:block;
        }

        .myttv-settings-footer-link {
          font-size: 12px;
          color: var(--myttv-color-placeholder);
          text-decoration: none;
        }

        /* ------------------------------------- */
        /* ----------- FAVORI BUTTON ----------- */
        /* ------------------------------------- */

        #myttv-fav-btn:not(.isFollow, .onSearch) {
          transform: translateX(-52px);
        }

        .myttv-fav-btn-margin {
          margin-left: 8px;
          margin-right: 0px;
        }

        #myttv-fav-btn {
          width: 44px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--myttv-color-button-hover);
          color: var(--myttv-color-accent);
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          background: var(--myttv-color-button) !important;
        }

        #myttv-fav-btn:hover {
          background: var(--myttv-color-button) !important;
        }

        #myttv-fav-btn svg {
          transition: transform 0.2s ease-in;
          color: var(--myttv-color-text) !important;
        }

        #myttv-fav-btn:hover svg {
          transform: scale(1.2);
          color: var(--myttv-color-text) !important;
        }

        #myttv-fav-btn.isFav {
          background-color: var(--myttv-color-accent) !important;
        }

        #myttv-fav-btn.isFav:hover {
          background: var(--myttv-color-lightDanger) !important;
        }

        #myttv-fav-btn.isFav svg {
          transition: transform 0.2s ease-in;
          color: var(--myttv-color-onAccent) !important;
        }

        #myttv-fav-btn.isFav:hover svg {
          transform: scale(1.2);
          color: var(--myttv-color-dark) !important;
        }

        /* ---------------------------------------------- */
        /* ----------- NOTIF BUTTON TRANSLATE ----------- */
        /* ---------------------------------------------- */

        .InjectLayout-sc-1i43xsx-0.kCBkGE:not(.isFollow) {
          transform: translateX(52px);
        }
      `;
    document.head.appendChild(style);
  }
};
