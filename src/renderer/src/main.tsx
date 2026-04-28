import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './App';
import { trpc, createTrpcClient } from './lib/trpc';
import './styles.css';

function Root() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() => createTrpcClient());

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </trpc.Provider>
    );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found');

createRoot(rootElement).render(
    <StrictMode>
        <Root />
    </StrictMode>
);
