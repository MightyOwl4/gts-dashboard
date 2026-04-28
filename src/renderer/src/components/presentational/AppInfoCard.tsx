export interface AppInfoCardProps {
    name: string | null;
    version: string | null;
    platform: string | null;
    electronVersion: string | null;
    nodeVersion: string | null;
    isLoading: boolean;
    error: string | null;
}

export function AppInfoCard({
    name,
    version,
    platform,
    electronVersion,
    nodeVersion,
    isLoading,
    error
}: AppInfoCardProps) {
    return (
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg max-w-md">
            <h2 className="text-lg font-semibold mb-4">Runtime</h2>
            {isLoading && <p className="text-slate-400">Loading…</p>}
            {error && <p className="text-rose-400">Error: {error}</p>}
            {!isLoading && !error && name && (
                <dl className="grid grid-cols-2 gap-y-2 text-sm">
                    <dt className="text-slate-400">App</dt>
                    <dd>
                        {name} v{version}
                    </dd>
                    <dt className="text-slate-400">Platform</dt>
                    <dd>{platform}</dd>
                    <dt className="text-slate-400">Electron</dt>
                    <dd>{electronVersion}</dd>
                    <dt className="text-slate-400">Node</dt>
                    <dd>{nodeVersion}</dd>
                </dl>
            )}
        </section>
    );
}
