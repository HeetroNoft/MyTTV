// ==UserScript==
// @name         MyTTV
// @namespace    http://tampermonkey.net/
// @version      0.2.7
// @description  Open-source browser extension for Twitch: advanced favorite channel management and VOD restriction bypass tools.
// @author       Heet
// @match        https://www.twitch.tv/*
// @grant        storage
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";
  if (typeof window.injectGlobalStyles === "function")
    window.injectGlobalStyles();

  // Affiche la liste des chaînes favorites dans la console au chargement
  if (typeof window.getFavorites === "function") {
    window.getFavorites((favs) => {
      console.log("[MyTTV/Fav] Favoris:", favs);
    });
  }

  // Surveille les changements de page (Twitch utilise du SPA)
  let lastPath = "";
  setInterval(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      setTimeout(() => {
        if (typeof window.injectFavButton === "function")
          window.injectFavButton();
        // Ajout pour la page de recherche
        if (
          window.location.pathname.startsWith("/search") &&
          typeof window.injectFavButtonOnSearch === "function"
        ) {
          setTimeout(() => window.injectFavButtonOnSearch(), 1000);
        }
      }, 1000);
    }
  }, 1000);

  // Première injection au chargement
  setTimeout(() => {
    if (typeof window.injectFavButton === "function") window.injectFavButton();
    // Ajout pour la page de recherche
    if (
      window.location.pathname.startsWith("/search") &&
      typeof window.injectFavButtonOnSearch === "function"
    ) {
      setTimeout(() => window.injectFavButtonOnSearch(), 1000);
    }
  }, 1500);

  // Appelle l'injection de la sidebar au chargement et à chaque navigation
  setTimeout(() => {
    if (typeof window.injectSidebarFavorites === "function")
      window.injectSidebarFavorites();
  }, 2000);

  // Rafraîchit viewers/catégorie toutes les 5 minutes
  if (!window.myttvSidebarAutoRefresh) {
    window.myttvSidebarAutoRefresh = setInterval(() => {
      const block = document.getElementById("myttv-sidebar-favs");
      if (!block) return;
      const sidebar = document.querySelector(".Layout-sc-1xcs6mc-0.dtSdDz");
      if (!sidebar) return;
      const width = sidebar.offsetWidth;
      if (typeof window.getFavorites === "function") {
        window.getFavorites((favs) => {
          if (typeof window.renderSidebarFavoritesList === "function") {
            window.renderSidebarFavoritesList(block, favs, width, true);
          } else if (typeof window.injectSidebarFavorites === "function") {
            window.injectSidebarFavorites();
          }
        });
      }
    }, 300000);
  }
})();
