# Presentational components

**Hard rule:** files in this folder must contain only presentational React components.

- Pure JSX + Tailwind CSS classes.
- Props-in only — receive data and callbacks; never fetch, mutate, or reach for IPC.
- No `useState`, `useEffect`, `useQuery`, or any custom hooks here. (`useId` for accessibility ids is the only allowed exception.)
- No imports from `@renderer/lib/*`, `@renderer/hooks/*`, `@trpc/*`, `electron`, `node:*`.

This boundary exists so contributors who only know HTML/Tailwind can safely edit and add components here without touching application logic. If you find yourself wanting state or data, write a hook in `@renderer/hooks/` and a wrapper in `@renderer/components/containers/` that composes the two.
