# Plan: Estructura del monorepo (COT-01)

## Pasos

1. Crear `pnpm-workspace.yaml` y `package.json` raíz con workspaces `apps/*` y `packages/*`.
2. Crear `turbo.json` básico en la raíz (tareas `dev` y `build` por workspace).
3. Inicializar `apps/api` con `uv init`, agregar `fastapi` + `uvicorn[standard]`, crear `main.py` con `GET /health`.
4. Inicializar `apps/web` con `create-next-app` (TypeScript + Tailwind + App Router), configurar `shadcn/ui`.
5. Crear `packages/api-client/README.md` (carpeta vacía, solo documentación de su propósito futuro).
6. Crear carpeta de migraciones de Supabase con `README.md` explicando la convención.
7. Actualizar `docs/arquitectura.md`: quitar "Pendiente (COT-01)", documentar la estructura real.
8. Probar que `apps/api` levanta y responde `/health`.
9. Probar que `apps/web` levanta con `pnpm dev`.

## Decisiones técnicas

- `apps/api` se gestiona con `uv` (ya usado en el proyecto de práctica `hello-fastapi`, consistente con `AGENTS.md`).
- `apps/web` usa Next.js 16 con App Router (no Pages Router) y TypeScript estricto.
- No se agrega configuración avanzada de ESLint/Prettier/Ruff en este ticket — queda para un ticket de "tooling" si hace falta más adelante.
- `packages/api-client` queda sin código generado todavía: generar tipos desde un OpenAPI requiere que `apps/api` tenga endpoints reales primero.

## Riesgos

- Mezclar gestores de paquetes (pnpm en la raíz para JS, uv dentro de `apps/api` para Python) es normal en monorepos híbridos, pero hay que dejarlo documentado para que no genere confusión al clonar el repo por primera vez.
