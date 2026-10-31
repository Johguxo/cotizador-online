# Spec: Estructura del monorepo (COT-01)

## Problema

`docs/arquitectura.md` y `AGENTS.md` ya definen el stack objetivo: un monorepo con dos apps (`apps/api` en FastAPI, `apps/web` en Next.js) gestionado con pnpm + Turborepo y uv. Hoy ninguna de esas carpetas existe — el repo solo tiene documentación, `.env`, y los docs de arquitectura/metodología. `docs/arquitectura.md` dice literalmente "Estructura de carpetas: Pendiente (COT-01)".

## Objetivo

Crear el esqueleto vacío del monorepo descrito en la documentación, sin lógica de negocio, para que los tickets siguientes (tablas, endpoints, pantallas) tengan una estructura ya acordada donde trabajar.

## Alcance (este ticket)

- Raíz del monorepo con `pnpm-workspace.yaml` apuntando a `apps/*` y `packages/*`, y `turbo.json` básico.
- `apps/api`: proyecto Python inicializado con `uv`, con `fastapi` + `uvicorn` instalados y un único endpoint `GET /health` que confirma que el servidor levanta.
- `apps/web`: proyecto Next.js 16 (App Router, TypeScript, Tailwind) inicializado con `create-next-app`, con `shadcn/ui` configurado, mostrando la página de bienvenida por defecto.
- `packages/api-client`: carpeta con un `README.md` explicando su propósito futuro (quedará vacía de código hasta que exista un OpenAPI real que generar).
- Carpeta de migraciones de Supabase con `README.md` explicando la convención (SQL vía Supabase CLI, no Alembic) — sin conexión real a Supabase todavía.
- Actualizar `docs/arquitectura.md`: quitar "Pendiente (COT-01)" y reflejar la estructura real creada.

## Fuera de alcance (tickets aparte)

- Lógica de negocio real (tablas, autenticación, endpoints de negocio).
- Conexión real a un proyecto Supabase (requiere credenciales que no existen aún).
- CI/CD (GitHub Actions).
- Despliegue a Railway.
- `.claude/skills/` (se crea cuando haya contenido real que documentar ahí).

## Preguntas abiertas

- Versión de Node a fijar (`.nvmrc`) — se propone la LTS vigente.
- Nombre del paquete raíz en `package.json` — por acordar.

## Cómo se prueba

- `cd apps/api && uv run uvicorn main:app --reload` levanta y `GET /health` responde `200 {"status": "ok"}`.
- `cd apps/web && pnpm dev` levanta Next.js en `localhost:3000` con la página de bienvenida.
- `pnpm install` en la raíz resuelve ambos workspaces sin error.
