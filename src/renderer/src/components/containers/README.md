# Container components

Thin wrappers that wire one hook (logic) to one presentational component (view).

A container should:

- Call exactly one container-level hook from `@renderer/hooks/` (it may also use trivial UI hooks like `useState` for purely local UI flags).
- Pass plain data + callback props down into a sibling under `@renderer/components/presentational/`.
- Render no markup of its own beyond the presentational child.

If a container starts growing JSX or styling, that JSX belongs in the presentational layer.
