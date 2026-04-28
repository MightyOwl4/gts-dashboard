# GTS Dashboard

<p align="center">
  <img src="https://github.com/Checker90/gtsmodlist/blob/main/gtsbanner.webp?raw=true" alt="Gate to Stars" />
</p>

> **Disclaimer:** GTS Dashboard is an unofficial, community-built tool. It is **not affiliated with, endorsed by, or sponsored by Bethesda Softworks, ZeniMax Media, or Microsoft**. "Starfield" and "Bethesda" are trademarks of their respective owners.

A Windows desktop dashboard and configuration tool, companion to the [**Gate to Stars**](https://github.com/Ry-Squid/Gate-To-Stars) Starfield modlist by [Checker90](https://github.com/Checker90). Reads and modifies game/mod files on disk to streamline modlist operations.

**Modlist links**

- [Gate to Stars (manual / docs)](https://github.com/Ry-Squid/Gate-To-Stars)
- [gtsmodlist (mod data)](https://github.com/Checker90/gtsmodlist)
- [Nexus Mods page](https://www.nexusmods.com/starfield/mods/14762)

## System requirements

- **Windows 10/11**
- Starfield installed
- The Gate to Stars modlist installed (see the [installation guide](https://github.com/Ry-Squid/Gate-To-Stars/blob/main/How%20to%20install.md))

## Tech stack

- Electron + Vite (via `electron-vite`)
- TypeScript + React 19
- Tailwind CSS v4 (Vite plugin)
- electron-trpc — fully typed renderer ↔ main IPC
- electron-builder — NSIS installer for Windows

## Project layout

```text
src/
├── main/              # Electron main process — file system, IPC, OS calls
│   └── trpc/          # tRPC router (the IPC API surface)
├── preload/           # contextBridge surface — exposes only the tRPC client
├── renderer/
│   ├── index.html
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── styles.css
│       ├── lib/                    # tRPC client setup
│       ├── hooks/                  # ALL renderer logic (IPC, derived state, side effects)
│       ├── components/
│       │   ├── presentational/     # Pure JSX + Tailwind. NO hooks, NO IPC, NO state.
│       │   └── containers/         # Thin wrappers wiring hooks → presentational
└── shared/            # Type-only sharing between main and renderer
```

### Container/Presentational split (mandatory)

To allow contributors who only know HTML/Tailwind to safely contribute UI:

- **Presentational components** are pure JSX with Tailwind classes. They receive plain props and render. No hooks (besides `useId`), no IPC, no data-fetching. Lint enforces this — see `eslint.config.js`.
- **Hooks** in `src/renderer/src/hooks/` own all logic, including IPC calls.
- **Containers** are thin wrappers that compose one hook with one presentational component.

See `src/renderer/src/components/presentational/AppInfoCard.tsx` and `containers/AppInfoCardContainer.tsx` for the canonical pattern.

## Setup

### Option 1 — Docker only (no host Node required for tooling)

```bash
docker compose --profile tools run --rm install   # one-time: install npm deps
docker compose --profile tools run --rm lint
docker compose --profile tools run --rm typecheck
docker compose --profile tools run --rm test
docker compose --profile tools run --rm bundle
docker compose up dev                              # renderer Vite dev server on :5173 with HMR
```

> Docker handles install, lint, typecheck, test, bundle, and the renderer dev server. The renderer-only dev server lets you iterate on Tailwind/markup with HMR; trpc calls won't resolve in this mode (no Electron preload bridge in a browser).

### Option 2 — Host Node (required for the full Electron experience)

Node 22+ is required to launch the Electron window with full main/preload/renderer hot-reload.

```powershell
winget install OpenJS.NodeJS.LTS
```

Then:

```bash
npm install
npm run dev          # full integrated dev: main + preload + renderer + Electron, all hot-reloading
```

## Build

```bash
npm run build        # produces release/GTS Dashboard-<version>-x64.exe (NSIS installer)
```

Or in Docker (bundle only — `electron-builder` for the actual installer must run on Windows):

```bash
docker compose --profile tools run --rm bundle
```

## CI/CD

- `.github/workflows/test.yml` — runs on PR / push to `main`: lint + typecheck + test + bundle (Ubuntu).
- `.github/workflows/release.yml` — triggered by pushing a tag matching `[0-9]*` (e.g. `0.1.0`): builds the Windows NSIS installer on `windows-latest` and attaches it to a GitHub Release.

To cut a release:

```bash
git tag 0.1.0
git push origin 0.1.0
```

## Development workflow

This project is driven by [Spec Kit](https://github.com/github/spec-kit). Each feature lives under `specs/NNN-slug/` and flows: `/speckit-specify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement`.

## Credits

- **[Gate to Stars](https://github.com/Ry-Squid/Gate-To-Stars)** by [Checker90](https://github.com/Checker90) — the modlist this tool exists to support. Banner image © 2025 Checker90, used under CC BY-NC-SA 4.0.
- **[Ry-Squid](https://github.com/Ry-Squid)** — modlist documentation and guides.

## License

[MIT](LICENSE). The Gate to Stars banner image is © 2025 Checker90 and remains under CC BY-NC-SA 4.0; this project's MIT license covers code only, not the bundled artwork.
