# Hooks

All renderer-side logic lives here:

- IPC calls via `trpc.*.useQuery / useMutation`
- Derived state, side effects, validation
- Any code that touches the Electron bridge

Hooks expose a stable view-model (plain data + callbacks). Presentational components consume that view-model via container wrappers — they must remain decoupled from the trpc client and electron entirely.
