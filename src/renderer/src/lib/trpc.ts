import { createTRPCReact } from '@trpc/react-query';
import { ipcLink } from 'electron-trpc/renderer';
import type { AppRouter } from '@shared/trpc-router';

export const trpc = createTRPCReact<AppRouter>();

export function createTrpcClient() {
    return trpc.createClient({
        links: [ipcLink()]
    });
}
