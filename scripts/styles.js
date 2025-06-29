// styles.js
window.injectGlobalStyles = function () {
  // Injection dynamique du CSS si non déjà présent
  if (!document.getElementById("myttv-settings-style")) {
    const style = document.createElement("style");
    style.id = "myttv-settings-style";
    style.textContent = `
        :root {
          --myttv-bg-color: #1e1e22; /* Couleur de fond */
          --myttv-text-color: #efeff1; /* Couleur du texte */
          --myttv-accent-color: #9147ff; /* Couleur d'accentuation */
          --myttv-border-color: #35353c; /* Couleur des bordures */
          --myttv-hover-bg-color: #53535f; /* Couleur de fond au survol */
          --myttv-button-bg-color: #26262b; /* Couleur de fond des boutons */
          --myttv-button-hover-bg-color: #26262c; /* Couleur de fond des boutons au survol */
          --myttv-button-text-color: #adadb8; /* Couleur du texte des boutons */
          --myttv-text-fav-item-color: #dedee3; /* Couleur du texte des éléments favoris */
          --myttv-button-hover-text-color: #efeff1; /* Couleur du texte des boutons au survol */
          --myttv-fav-bg-color: #ffaaa8; /* Couleur de  fond du bouton favori */
          --myttv-fav-text-color: #000000; /* Couleur du texte du bouton favori */
          --myttv-fav-avatar-border-radius: 9999px; /* Bordure des avatars favoris */
          --myttv-font-size-4: 1.4rem; /* Taille de police pour les titres */
          --myttv-font-weight-semibold: 600; /* Poids de police pour les titres */
          --myttv-line-height-body: 1.4; /* Hauteur de ligne pour le texte */
          --myttv-line-height-heading: 1.1; /* Hauteur de ligne pour les titres */
        }


        /*-------------------*/
        /* SIDEBAR FAVORITES */
        /*-------------------*/

        #myttv-sidebar-favs {
          padding: 0;
          margin: 12px 0 12px 0;
        }

        /*--------------------------*/
        /* SIDEBAR FAVORITES HEADER */
        /*--------------------------*/

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
          fill: var(--myttv-button-text-color);
        }
        #myttv-fav-title-icon svg {
          width: 2rem;
          height: 2rem;
        }
        #myttv-fav-title-text {
          color: var(--myttv-text-color);
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

        /*------------------------*/
        /* SIDEBAR FAVORITES LIST */
        /*------------------------*/

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
          background: var(--myttv-button-hover-bg-color);
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
          color: var(--myttv-text-fav-item-color) !important;
          text-transform: capitalize;
        }
        .myttv-fav-game-title {
          padding-inline-end: 4px !important;
        }
        .myttv-fav-game-title p {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow-x: hidden;
          font-size: var(--myttv-font-size-4) !important;
          color: var(--myttv-button-text-color) !important;
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
          color: var(--myttv-text-fav-item-color) !important;
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

        /*----------*/
        /* SETTINGS */
        /*----------*/

        .myttv-settings-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          color: var(--myttv-text-color);
        }
        .myttv-settings-title {
          font-size: 1.3em;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--myttv-text-color);
        }
        .myttv-settings-close {
          background: none;
          border: none;
          color: var(--myttv-text-color);
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
          background: var(--myttv-button-bg-color);
          color: var(--myttv-button-text-color);
        }
        .myttv-settings-button:hover {
          background: var(--myttv-button-hover-bg-color);
          color: var(--myttv-button-hover-text-color);
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
          background: var(--myttv-button-bg-color);
          border-radius: 0.4rem;
          border: 1px solid var(--myttv-border-color);
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
          background: var(--myttv-button-bg-color);
          min-width: 20px;
          height: 20px;
          font-size: 12px;
          color: var(--myttv-button-text-color);
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
          background: var(--myttv-hover-bg-color) !important;
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
          background: var(--myttv-fav-bg-color) !important;
        }

        #myttv-fav-btn.isFav:hover svg {
          fill: var(--myttv-fav-text-color) !important;
        }

        .InjectLayout-sc-1i43xsx-0.kCBkGE:not(.isFollow) {
          transform: translateX(52px);
        }
      `;
    document.head.appendChild(style);
  }
};
