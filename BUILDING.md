# Building hakuneko-new

This guide explains how to build the hakuneko-new project from source, including prerequisites and step-by-step instructions.

## Prerequisites

- **Node.js** (v14 or newer recommended)
- **npm** (comes with Node.js)
- **Git** (for cloning and version control)
- **Windows, macOS, or Linux** (Windows is recommended for portable builds)

## Optional (for packaging and advanced builds)
- **Electron** (for desktop builds)
- **7-Zip** or similar archiver (for packaging portable versions)
- **Inno Setup** (for creating Windows installers)
- **Linux packaging tools** (for .deb/.rpm builds)

## Install Dependencies

1. Open a terminal in the project root directory.
2. Run:
   ```sh
   npm install
   ```

## Build the Web Version

```
node build-web.js
```
- Output will be in `build/web/`.

## Build the Desktop App (Electron)

```
node build-app.js
```
- Output will be in `build/hakuneko-desktop_*`.

## Post-Build Steps
- For additional packaging, run `post-build-app.js` or `post-build-web.js` as needed.
- For Windows installer, use Inno Setup with the provided scripts in `iss/`.

## Notes
- Configuration files for builds are in the project root (e.g., `build-app.config`, `build-web.config`).
- Some build steps may require platform-specific tools (e.g., 7-Zip, Inno Setup, Linux packaging tools).
- For development, you can run the web version directly from `build/web/index.html`.

---
_Last updated: August 10, 2025_
