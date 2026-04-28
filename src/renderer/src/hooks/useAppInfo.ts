import { trpc } from '../lib/trpc';

export interface AppInfoView {
    name: string;
    version: string;
    platform: string;
    electron: string;
    node: string;
}

export interface UseAppInfoResult {
    data: AppInfoView | null;
    isLoading: boolean;
    error: string | null;
}

export function useAppInfo(): UseAppInfoResult {
    const query = trpc.app.info.useQuery();
    return {
        data: query.data ?? null,
        isLoading: query.isLoading,
        error: query.error ? query.error.message : null
    };
}
