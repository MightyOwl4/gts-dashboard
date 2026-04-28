import { AppInfoCardContainer } from './components/containers/AppInfoCardContainer';

export function App() {
    return (
        <main className="min-h-screen p-8 flex flex-col gap-6">
            <header>
                <h1 className="text-3xl font-bold">GTS Dashboard</h1>
                <p className="text-slate-400">Gate to Stars modlist companion</p>
            </header>
            <AppInfoCardContainer />
        </main>
    );
}
