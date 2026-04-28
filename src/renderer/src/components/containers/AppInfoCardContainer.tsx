import { useAppInfo } from '@renderer/hooks/useAppInfo';
import { AppInfoCard } from '@renderer/components/presentational/AppInfoCard';

export function AppInfoCardContainer() {
    const { data, isLoading, error } = useAppInfo();
    return (
        <AppInfoCard
            name={data?.name ?? null}
            version={data?.version ?? null}
            platform={data?.platform ?? null}
            electronVersion={data?.electron ?? null}
            nodeVersion={data?.node ?? null}
            isLoading={isLoading}
            error={error}
        />
    );
}
