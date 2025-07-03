// Fichier d'internationalisation pour MyTTV (français, anglais et espagnol)
// Usage : import ou inclusion via <script> puis window.myttvI18n(lang)
window.myttvVersion = function () {
  if (typeof chrome === "undefined" || !chrome.runtime) {
    return "unknown";
  }
  // Récupère la version de l'extension depuis le manifeste
  // Si la version n'est pas définie, retourne "unknown"
  // Note : chrome.runtime.getManifest() est disponible dans les extensions Chrome
  // et permet d'accéder aux métadonnées de l'extension.
  // La version est définie dans le fichier manifest.json de l'extension.
  const APP_VERSION = chrome.runtime.getManifest().version;
  return APP_VERSION ? `v${APP_VERSION}` : "unknown";
};
window.myttvI18n = function (lang) {
  const dict = {
    fr: {
      settings: "Paramètres",
      favorites: "Chaînes favorites",
      noFavorites: "Aucun favori",
      live: "Live",
      offline: "Déconnecté(e)",
      viewers: "spectateurs",
      vodsub: "Permet d'afficher les VOD réservé aux abonnées\u00A0",
      preview: "Affiche la prévisualisation du stream au survol",
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
    },
    en: {
      settings: "Settings",
      favorites: "Favorites channels",
      noFavorites: "No favorite",
      live: "Live",
      offline: "Offline",
      viewers: "viewers",
      vodsub: "Allow viewing sub-only VODs\u00A0",
      preview: "Show stream preview on hover",
      refreshAvatars: "Refresh favorite avatars",
      update: "Update",
      backup: "Backup",
      export: "Export",
      import: "Import",
      importSuccess: "Import successful! Reload the page to see changes.",
      importFail: "Invalid file",
      exportFile: "myttv_settings.json",
      remove: "Remove",
      confirmRemove: "Remove this favorite?",
      noFavToRefresh: "No favorite to refresh.",
      avatarsRefreshed: "Avatars refreshed!",
      favoritesCount: "channels",
    },
    es: {
      settings: "Ajustes",
      favorites: "Canales favoritos",
      noFavorites: "Ningún favorito",
      live: "En directo",
      offline: "Desconectado(a)",
      viewers: "espectadores",
      vodsub: "Permitir ver VODs solo para suscriptores\u00A0",
      preview: "Mostrar la previsualización del stream al pasar el ratón",
      refreshAvatars: "Actualizar avatares de favoritos",
      update: "Actualizar",
      backup: "Copia de seguridad",
      export: "Exportar",
      import: "Importar",
      importSuccess:
        "¡Importación exitosa! Recarga la página para ver los cambios.",
      importFail: "Archivo inválido",
      exportFile: "myttv_settings.json",
      remove: "Eliminar",
      confirmRemove: "¿Eliminar este favorito?",
      noFavToRefresh: "Ningún favorito para actualizar.",
      avatarsRefreshed: "¡Avatares actualizados!",
      favoritesCount: "canales",
    },
  };
  const l = (lang || "").substring(0, 2).toLowerCase();
  return dict[l] || dict.en;
};
