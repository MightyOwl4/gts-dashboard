import { app, BrowserWindow, shell } from 'electron';
import path from 'node:path';
import { attachTrpc } from './trpc/ipc';

function createMainWindow(): BrowserWindow {
    const window = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 960,
        minHeight: 600,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, '../preload/index.cjs'),
            sandbox: true,
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    window.on('ready-to-show', () => {
        window.show();
    });

    window.webContents.setWindowOpenHandler(({ url }) => {
        void shell.openExternal(url);
        return { action: 'deny' };
    });

    const devServerUrl = process.env['ELECTRON_RENDERER_URL'];
    if (devServerUrl) {
        void window.loadURL(devServerUrl);
    } else {
        void window.loadFile(path.join(__dirname, '../renderer/index.html'));
    }

    attachTrpc(window);
    return window;
}

void app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('web-contents-created', (_event, contents) => {
    contents.on('will-navigate', (event, url) => {
        const target = new URL(url);
        const allowedDevHost = process.env['ELECTRON_RENDERER_URL']
            ? new URL(process.env['ELECTRON_RENDERER_URL']).host
            : null;
        if (target.host !== allowedDevHost) {
            event.preventDefault();
        }
    });
});
