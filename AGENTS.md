# AGENTS.md

## Cursor Cloud specific instructions

This is an **OpenSumi IDE Web** starter project — a VS Code-like browser IDE built on the `@opensumi/ide-*` module ecosystem (v3.9.0).

### Architecture

| Component | Port | Description |
|---|---|---|
| Backend Server | 8000 | Node.js Koa server (WebSocket, file system, terminal PTY, extensions) |
| Frontend Dev Server | 8080 | Webpack-dev-server serving the browser IDE |
| Webview Dev Server | 8899 | Optional — only needed for extension webview development |

### Running the dev environment

- **Requires Node.js 18** (use `nvm use 18`).
- Package manager: **Yarn 1.x** (classic).
- Start all services: `yarn start` (runs `start:client`, `start:server`, `start:webview` in parallel).
- Open `http://127.0.0.1:8080` in Chrome. Use `?workspaceDir=/path/to/dir` to open a specific folder.
- See `package.json` scripts and `README.md` for standard commands.

### Gotchas

- The `postinstall` hook compiles `worker-host` and `ext-host` bundles, and downloads built-in extensions from Open VSX Registry. This runs automatically with `yarn install` and can take 60-90 seconds.
- The backend server (port 8000) returns HTTP 404 on `/` — this is normal; it serves WebSocket connections and API endpoints, not a root page.
- No external databases or third-party services are required. The IDE operates against the local filesystem.
- No lint or test scripts are configured in `package.json`; validation is done via `tsc --noEmit` and `yarn build`.
- Production build: `yarn build` (uses `cross-env NODE_ENV=production` with increased memory via `NODE_OPTIONS=--max_old_space_size=5120`).
