# MyTTV

**MyTTV** est une extension open-source pour navigateur (Chrome/Firefox) qui enrichit l'expérience Twitch en ajoutant une gestion avancée et personnalisable de vos chaînes favorites, ainsi que des outils pour contourner certaines restrictions VOD.

## Sommaire

- [MyTTV](#myttv)
  - [Sommaire](#sommaire)
  - [Fonctionnalités](#fonctionnalités)
  - [Installation](#installation)
    - [Depuis le code source (développement)](#depuis-le-code-source-développement)
    - [Depuis un package (à venir)](#depuis-un-package-à-venir)
  - [Utilisation](#utilisation)
  - [Gestion des favoris](#gestion-des-favoris)
  - [VOD-Sub (Bypass VOD Sub-Only)](#vod-sub-bypass-vod-sub-only)
  - [Paramètres et personnalisation](#paramètres-et-personnalisation)
  - [Export/Import des données](#exportimport-des-données)
  - [Développement](#développement)
  - [Structure du projet](#structure-du-projet)
  - [Permissions](#permissions)
  - [FAQ](#faq)
  - [Licence](#licence)
  - [Auteur \& Contact](#auteur--contact)

## Fonctionnalités

- **Ajout/Suppression rapide de chaînes favorites** via un bouton étoile sur chaque page de chaîne et dans les résultats de recherche.
- **Sidebar enrichie** :
  - Affichage de vos favoris dans la sidebar Twitch native.
  - Statut en direct, nombre de spectateurs, jeu en cours, avatars personnalisés.
  - Tri automatique : chaînes en direct en haut, offline en bas (ordre alphabétique).
- **Rafraîchissement automatique** des informations toutes les 5 minutes (statut, viewers, jeu, avatars).
- **Cache d’avatars** pour accélérer l’affichage et limiter les requêtes externes.
- **Export/Import** de vos paramètres (favoris, avatars, options) pour sauvegarder ou transférer votre configuration.
- **Option VOD-Sub** : permet de contourner certaines restrictions sur les VODs Twitch (VOD sub-only, géo-blocage, etc.).
- **Interface de paramètres** accessible via une icône violette dans la barre de navigation Twitch.
- **Support multilingue** (français/anglais, extensible).
- **Compatibilité multi-navigateurs** (Chrome, Firefox, Edge, etc.).

## Installation

### Depuis le code source (développement)

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/heetronoft/MyTTV.git
   ```
2. Ouvrez `chrome://extensions` (ou `about:debugging` sur Firefox).
3. Activez le mode développeur.
4. Cliquez sur « Charger l’extension non empaquetée » et sélectionnez le dossier du projet.

### Depuis un package (à venir)

- Un package zip sera proposé pour installation rapide.

## Utilisation

- **Ajouter/retirer un favori** : Cliquez sur l’étoile à côté du bouton « Suivre » sur une page de chaîne ou dans les résultats de recherche.
- **Sidebar** : Retrouvez tous vos favoris dans la sidebar Twitch, avec leur statut et informations en temps réel.
- **Paramètres** : Cliquez sur l’icône violette dans la barre de navigation pour accéder aux options (export/import, VOD-Sub, etc.).
- **VOD-Sub** : Activez l’option dans les paramètres pour tenter de contourner les restrictions sur les VODs sub-only ou bloqués.

## Gestion des favoris

- Les favoris sont stockés localement dans le navigateur (aucune donnée n’est envoyée à un serveur tiers).
- Vous pouvez ajouter/retirer des chaînes à tout moment.
- Le cache d’avatars est automatiquement géré et mis à jour.

## VOD-Sub (Bypass VOD Sub-Only)

- Permet de visionner certains VODs sub-only ou restreints (DMCA, géo-blocage, etc.).
- Fonctionne en patchant le player Twitch pour contourner les restrictions (dans la limite des possibilités techniques et légales).
- Peut cesser de fonctionner si Twitch modifie ses protections.
- Option désactivable à tout moment dans les paramètres.

## Paramètres et personnalisation

- **Export/Import** : Sauvegardez ou restaurez vos favoris et paramètres via un fichier JSON.
- **Options** : Activez/désactivez le VOD-Sub, réinitialisez le cache, personnalisez l’interface.
- **Langue** : Détection automatique, extensible via le dossier `scripts/i18n.js`.

## Export/Import des données

- Accédez à la popup de paramètres.
- Cliquez sur « Exporter » pour télécharger vos données.
- Cliquez sur « Importer » pour restaurer une sauvegarde.

## Développement

- Le code source est organisé dans le dossier `scripts/` :
  - `fav/` : gestion des favoris (boutons, sidebar, utilitaires)
  - `vod-sub/` : contournement des restrictions VOD (patchs, workers, scripts spécifiques)
  - `i18n.js` : gestion multilingue
  - `settings.js` : gestion des paramètres
  - `styles.js` : styles injectés
  - `svg.js` : icônes SVG
- Le script principal d’injection est `content.js`.
- Les assets (icônes, images) sont dans `assets/icons/`.

## Structure du projet

```
MyTTV/
├── content.js                # Script principal injecté
├── manifest.json             # Déclaration de l’extension
├── scripts/
│   ├── fav/                  # Gestion des favoris
│   ├── vod-sub/              # Scripts VOD-Sub (bypass)
│   ├── i18n.js               # Internationalisation
│   ├── settings.js           # Paramètres
│   ├── styles.js             # Styles custom
│   └── svg.js                # Icônes SVG
├── assets/
│   └── icons/                # Icônes de l’extension
├── README.md
└── ...
```

## Permissions

- Accès à Twitch (`https://*.twitch.tv/*`)
- Stockage local (favoris, avatars, paramètres)
- Aucune donnée n’est transmise à un serveur tiers

## FAQ

**Q : Mes favoris sont-ils synchronisés entre mes appareils ?**

- Non, ils sont stockés localement. Utilisez l’export/import pour transférer vos favoris.

**Q : Le VOD-Sub ne fonctionne plus, que faire ?**

- Twitch met régulièrement à jour ses protections. Vérifiez les mises à jour de l’extension ou signalez un problème sur GitHub.

**Q : L’extension est-elle sûre ?**

- Oui, le code est open-source et aucune donnée personnelle n’est transmise à un serveur externe.

**Q : Comment contribuer ?**

- Forkez le projet, proposez des PR ou ouvrez une issue sur GitHub.

## Licence

MIT

## Auteur & Contact

- **Auteur** : Heet
- **GitHub** : [heetronoft](https://github.com/heetronoft)
- **Contact** : via issues GitHub
