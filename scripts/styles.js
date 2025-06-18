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
        [id*="-container"] {
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
          border-radius: 0.4rem;
          background: #26262b;
          min-width: 24px;
          height: 24px;
        }
        .myttv-settings-list-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row;
          width: 100%;
        }
        .myttv-remove-fav {
          background: none;
          cursor: pointer;
          width: 30px;
          height: 30px;
        }
        .myttv-settings-favs-list li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 8px;
          gap: 10px;
        }
        #myttv-settings-export-import-container, #myttv-settings-refresh-avatars-container {
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
          border-radius: var(--input-border-radius-default);
          background: none; !important;
          cursor: pointer;
        }
        .myttv-remove-fav:hover {
          background:rgba(83, 83, 95, 0.32); !important;
          cursor: pointer;
        }
      `;
    document.head.appendChild(style);
  }
};
