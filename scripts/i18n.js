// Fichier d'internationalisation pour MyTTV (français, anglais et espagnol)
// Usage : import ou inclusion via <script> puis window.myttvI18n(lang)

window.myttvI18n = function (lang) {
  const dict = {
    fr: {
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
    },
    en: {
      settings: "Settings",
      favorites: "Favorites channels",
      noFavorites: "No favorite",
      vodsub: "Allow viewing sub-only VODs\u00A0",
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
      vodsub: "Permitir ver VODs solo para suscriptores\u00A0",
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
