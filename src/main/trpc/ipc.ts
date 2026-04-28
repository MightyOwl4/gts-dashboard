import { createIPCHandler } from 'electron-trpc/main';
import type { BrowserWindow } from 'electron';
import { router } from './router';

export function attachTrpc(window: BrowserWindow): void {
    createIPCHandler({ router, windows: [window] });
}
