# MyTTV

**MyTTV** is an open-source browser extension (Chrome/Firefox) that enhances your Twitch experience by adding advanced and customizable favorite channel management, as well as tools to bypass certain VOD restrictions.

## Table of Contents

- [MyTTV](#myttv)
  - [Table of Contents](#table-of-contents)
  - [TODO](#todo)
  - [Features](#features)
  - [Installation](#installation)
    - [Chrome (ZIP or CRX)](#chrome-zip-or-crx)
      - [Installation via ZIP (developer mode)](#installation-via-zip-developer-mode)
      - [Installation via CRX](#installation-via-crx)
    - [Firefox (XPI)](#firefox-xpi)
    - [From source (development)](#from-source-development)
  - [Usage](#usage)
  - [Favorites Management](#favorites-management)
  - [VOD-Sub (Bypass VOD Sub-Only)](#vod-sub-bypass-vod-sub-only)
  - [Settings \& Customization](#settings--customization)
  - [Export/Import Data](#exportimport-data)
  - [Development](#development)
  - [Project Structure](#project-structure)
  - [Permissions](#permissions)
  - [FAQ](#faq)
  - [License](#license)
  - [Author \& Contact](#author--contact)

## TODO

- [x] Gestion avancée des favoris (ajout/retrait rapide, tri, avatars, cache)
- [x] Affichage des favoris dans la sidebar Twitch (statut live, viewers, jeu, avatars)
- [x] Rafraîchissement automatique des infos (5 min)
- [x] Export/Import des favoris, avatars et options
- [x] Option VOD-Sub (bypass VOD sub-only/geo)
- [x] Interface de paramètres accessible via la navbar
- [x] Support multi-langue (FR/EN)
- [x] Compatibilité multi-navigateurs (Chrome, Firefox)
- [x] Bouton favoris sur la page chaîne et dans la recherche
- [x] Gestion du cache d’avatars
- [x] Réorganisation dynamique de la sidebar selon la présence des stories
- [x] Navigation directe vers la chaîne depuis la popup settings (clic sur avatar/nom)
- [ ] Ajouter d’autres options de personnalisation (UI, notifications, etc.)
- [ ] Améliorer la gestion des erreurs réseau (avatars, viewers, etc.)
- [ ] Ajouter plus de langues
- [ ] Optimiser les performances sur de très grandes listes de favoris
- [ ] Intégration avec d’autres outils Twitch (à définir)

## Features

- **Quick add/remove favorite channels** via a star button on each channel page and in search results.
- **Enhanced sidebar**:
  - Display your favorites in the native Twitch sidebar.
  - Live status, viewer count, current game, custom avatars.
  - Automatic sorting: live channels at the top, offline at the bottom (alphabetical order).
- **Automatic refresh** of information every 5 minutes (status, viewers, game, avatars).
- **Avatar cache** for faster display and fewer external requests.
- **Export/Import** your settings (favorites, avatars, options) to backup or transfer your configuration.
- **VOD-Sub option**: allows you to bypass some Twitch VOD restrictions (sub-only, geo-blocking, etc.).
- **Settings interface** accessible via a purple icon in the Twitch navigation bar.
- **Multi-language support** (French/English, extensible).
- **Multi-browser compatibility** (Chrome, Firefox, Edge, etc.).

## Installation

### Chrome (ZIP or CRX)

The `.zip` (for developer installation) and `.crx` (for Chromium) files are available in the [Releases](https://github.com/heetronoft/MyTTV/releases) section of the GitHub repository, along with the future `.xpi` file for Firefox.

#### Installation via ZIP (developer mode)

1. Download the ZIP file from the [Releases](https://github.com/heetronoft/MyTTV/releases) or clone the repository.
2. Unzip the archive.
3. Open `chrome://extensions` in Chrome.
4. Enable developer mode (top right corner).
5. Click "Load unpacked" and select the unzipped folder.

#### Installation via CRX

1. Download the `.crx` file from the [Releases](https://github.com/heetronoft/MyTTV/releases).
2. (Chromium only) Drag and drop the `.crx` file into the `chrome://extensions` page (developer mode enabled).
3. (On Chrome, CRX installation is restricted, prefer the ZIP method above.)

### Firefox (XPI)

The `.xpi` file will also be available in the [Releases](https://github.com/heetronoft/MyTTV/releases) section once published.

1. Download the `.xpi` file from the [Releases](https://github.com/heetronoft/MyTTV/releases) or create it manually (see below).
2. Open `about:debugging#/runtime/this-firefox` in Firefox.
3. Click "Load Temporary Add-on" and select the `.xpi` file.
4. For permanent installation, publish the extension on the Firefox Add-ons website (AMO).

### From source (development)

1. Clone this repository:
   ```bash
   git clone https://github.com/heetronoft/MyTTV.git
   ```
2. Open `chrome://extensions` (or `about:debugging` on Firefox).
3. Enable developer mode.
4. Click "Load unpacked extension" and select the project folder.

## Usage

- **Add/remove a favorite**: Click the star next to the "Follow" button on a channel page or in search results.
- **Sidebar**: Find all your favorites in the Twitch sidebar, with real-time status and info.
- **Settings**: Click the purple icon in the navigation bar to access options (export/import, VOD-Sub, etc.).
- **VOD-Sub**: Enable the option in settings to try bypassing sub-only or blocked VOD restrictions.

## Favorites Management

- Favorites are stored locally in your browser (no data is sent to any third-party server).
- You can add/remove channels at any time.
- The avatar cache is managed and updated automatically.

## VOD-Sub (Bypass VOD Sub-Only)

- Allows you to watch some sub-only or restricted VODs (DMCA, geo-blocking, etc.).
- Works by patching the Twitch player to bypass restrictions (within technical and legal limits).
- May stop working if Twitch updates its protections.
- Option can be disabled at any time in settings.

## Settings & Customization

- **Export/Import**: Backup or restore your favorites and settings via a JSON file.
- **Options**: Enable/disable VOD-Sub, reset cache, customize the interface.
- **Language**: Auto-detected, extensible via `scripts/i18n.js`.

## Export/Import Data

- Open the settings popup.
- Click "Export" to download your data.
- Click "Import" to restore a backup.

## Development

- Source code is organized in the `scripts/` folder:
  - `fav/`: favorites management (buttons, sidebar, utilities)
  - `vod-sub/`: VOD restriction bypass (patches, workers, specific scripts)
  - `i18n.js`: multi-language support
  - `settings.js`: settings management
  - `styles.js`: injected styles
  - `svg.js`: SVG icons
- The main injection script is `content.js`.
- Assets (icons, images) are in `assets/icons/`.

## Project Structure

```
MyTTV/
├── content.js                # Main injected script
├── manifest.json             # Extension manifest
├── scripts/
│   ├── fav/                  # Favorites management
│   ├── vod-sub/              # VOD-Sub scripts (bypass)
│   ├── i18n.js               # Internationalization
│   ├── settings.js           # Settings
│   ├── styles.js             # Custom styles
│   └── svg.js                # SVG icons
├── assets/
│   └── icons/                # Extension icons
├── README.md
└── ...
```

## Permissions

- Access to Twitch (`https://*.twitch.tv/*`)
- Local storage (favorites, avatars, settings)
- No data is sent to any third-party server

## FAQ

**Q: Are my favorites synced between devices?**

- No, they are stored locally. Use export/import to transfer your favorites.

**Q: VOD-Sub no longer works, what should I do?**

- Twitch regularly updates its protections. Check for extension updates or report an issue on GitHub.

**Q: Is the extension safe?**

- Yes, the code is open-source and no personal data is sent to any external server.

**Q: How can I contribute?**

- Fork the project, submit PRs, or open an issue on GitHub.

## License

MIT

## Author & Contact

- **Author**: Heet
- **GitHub**: [heetronoft](https://github.com/heetronoft)
- **Contact**: via GitHub issues
