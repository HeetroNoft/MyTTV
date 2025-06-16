# MyTTV

**MyTTV** est une extension pour navigateur qui ajoute une gestion avancée de vos chaînes Twitch favorites directement dans la sidebar de Twitch.

## Fonctionnalités

- Ajout et suppression rapide de chaînes favorites
- Affichage des favoris dans la sidebar Twitch, avec statut en direct, nombre de spectateurs et jeu en cours
- Rafraîchissement automatique des informations toutes les 5 minutes
- Gestion d’un cache d’avatars pour les favoris
- Export et import de vos paramètres (favoris, avatars, options)
- Option VOD-Sub pour contourner certaines restrictions sur les VODs Twitch

## Utilisation

- Un bouton étoile apparaît sur chaque page de chaîne pour ajouter/retirer des favoris.
- Accédez aux paramètres via le bouton dans la barre de navigation Twitch (icône violette).
- Activez ou désactivez l’option VOD-Sub pour gérer les restrictions sur les VODs.
- Exportez ou importez vos paramètres depuis la popup de paramètres.

## Développement

- Le code source est organisé dans le dossier `scripts/` :
  - `fav/` : gestion des favoris
  - `vod-sub/` : Visionnage des VOD Sub-Only
- Le script principal d’injection est `content.js`.

## Permissions

- Accès à Twitch (`https://*.twitch.tv/*`)
- Stockage local pour les favoris et avatars

## Licence

MIT

---

**Auteur** : Heet  
**Contact** : github.com/heetronoft
