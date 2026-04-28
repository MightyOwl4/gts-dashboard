import { initTRPC } from '@trpc/server';
import { app } from 'electron';

const t = initTRPC.create({ isServer: true });

const appProcedures = t.router({
    info: t.procedure.query(() => ({
        version: app.getVersion(),
        name: app.getName(),
        platform: process.platform,
        electron: process.versions.electron,
        node: process.versions.node
    }))
});

export const router = t.router({
    app: appProcedures
});
