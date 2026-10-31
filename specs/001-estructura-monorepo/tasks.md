# Tareas: Estructura del monorepo (COT-01)

- [ ] 1. Crear `pnpm-workspace.yaml` y `package.json` raíz con workspaces `apps/*`, `packages/*`.
- [ ] 2. Crear `turbo.json` básico en la raíz.
- [ ] 3. Inicializar `apps/api` con `uv init`, agregar `fastapi` + `uvicorn[standard]`, crear endpoint `GET /health`.
- [ ] 4. Inicializar `apps/web` con `create-next-app` (TypeScript + Tailwind + App Router), configurar `shadcn/ui`.
- [ ] 5. Crear `packages/api-client/README.md` (carpeta vacía, solo documentación de su propósito futuro).
- [ ] 6. Crear carpeta de migraciones de Supabase con `README.md` explicando la convención.
- [ ] 7. Actualizar `docs/arquitectura.md`: quitar "Pendiente (COT-01)", reflejar estructura real.
- [ ] 8. Probar que `apps/api` levanta y responde `/health`.
- [ ] 9. Probar que `apps/web` levanta con `pnpm dev`.
