# Tareas: Estructura del monorepo (COT-01)

- [x] 1. Crear `pnpm-workspace.yaml` y `package.json` raíz con workspaces `apps/*`, `packages/*`.
- [x] 2. Crear `turbo.json` básico en la raíz.
- [x] 3. Inicializar `apps/api` con `uv init`, agregar `fastapi` + `uvicorn[standard]`, crear endpoint `GET /health`.
- [x] 4. Inicializar `apps/web` con `create-next-app` (TypeScript + Tailwind + App Router), configurar `shadcn/ui`.
- [x] 5. Crear `packages/api-client/README.md` (carpeta vacía, solo documentación de su propósito futuro).
- [x] 6. Crear carpeta de migraciones de Supabase con `README.md` explicando la convención.
- [x] 7. Actualizar `docs/arquitectura.md`: quitar "Pendiente (COT-01)", reflejar estructura real.
- [x] 8. Probar que `apps/api` levanta y responde `/health`.
- [x] 9. Probar que `apps/web` levanta con `pnpm dev`.
