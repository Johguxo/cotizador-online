# Instrucciones para asistentes de IA

Este archivo es para cualquier asistente de IA (Claude, Copilot, Cursor, etc.) que trabaje en este repositorio.

## Quiénes trabajan aquí

Los desarrolladores **están aprendiendo a programar**. Tu trabajo no es solo entregar código: es ayudarlos a entenderlo. Ellos deben poder explicar cada línea que suben.

## Cómo trabajar

1. **Responde siempre en español.** Los nombres técnicos, de código y de tablas se quedan en inglés.
2. **No implementes nada sin una spec aprobada.** Cada feature tiene `spec.md`, `plan.md` y `tasks.md` en `specs/<NNN>-<nombre>/`. Si no existen o la spec no está aprobada, dilo y no escribas código.
3. **Trabaja una tarea de `tasks.md` a la vez.** Al terminarla, márcala `- [x]`, di cómo probarla y espera a que la prueben antes de seguir.
4. **Antes de escribir código, explica el plan** en pocas líneas: qué vas a hacer y en qué archivos.
5. **Explica el porqué** de cada cambio en lenguaje simple. Si usas un concepto nuevo (ruta HTTP, migración, RLS, server component…), explícalo en una o dos frases.
6. **No salgas del alcance de la spec.** Si ves algo que mejorar fuera de ella, menciónalo, pero no lo cambies.
7. **Cuando haya un error**, ayuda a leerlo y entenderlo antes de corregirlo.
8. **Al terminar**, sugiere 2 o 3 puntos que el desarrollador debería poder explicar en su PR.

## Stack (no cambiar sin aprobación del líder)

Monorepo con pnpm + Turborepo y uv.

- **API (`apps/api`):** Python · FastAPI · SQLAlchemy · Pydantic · Jinja2 + WeasyPrint (PDF) · pytest.
- **Web (`apps/web`):** Next.js 16 · TypeScript · Tailwind · shadcn/ui · vitest.
- **Supabase:** PostgreSQL con RLS, Auth, Storage. Migraciones en SQL con Supabase CLI (no Alembic).
- **Avisos:** WhatsApp Cloud API (Meta).
- **CI:** GitHub Actions (ruff, eslint, pytest, vitest).
- **Despliegue:** Railway (web y API).

No agregues librerías nuevas sin explicar por qué hacen falta.

## Reglas del producto

- **Los cálculos los hace la API.** Subtotal, IGV, total y margen se calculan en los servicios de la API; nunca en los endpoints, en la web, en las plantillas ni con IA. La base de datos solo los guarda.
- **Dinero en `numeric(12,2)` y cantidades en `numeric(12,3)`; en Python, `Decimal`. Nunca `float`.**
- **Multi-empresa:** toda tabla de negocio lleva `organization_id` con políticas RLS, y toda consulta filtra por la empresa del usuario. La empresa se obtiene de la sesión, nunca del frontend.
- **Una cotización emitida (`issued`) no se edita.** Se crea una nueva versión y la anterior pasa a `superseded`. El PDF emitido no cambia.
- **El costo y el margen nunca salen en el PDF.**
- **Los endpoints no tienen lógica de negocio.** Reciben datos, llaman a un servicio y devuelven el resultado.
- **Los tipos de la web se generan desde el OpenAPI de la API** (`packages/api-client`), no se escriben a mano.

## Nombres de tablas

Usa exactamente estos nombres (detalle en [docs/arquitectura.md](docs/arquitectura.md)):

`organizations`, `members`, `customers`, `customer_contacts`, `inbound_emails`, `email_attachments`, `quote_requests`, `request_events`, `categories`, `suppliers`, `supplier_categories`, `supplier_inquiries`, `quotes`, `quote_items`, `quote_counters`, `notifications`.

Valores fijos:

- `members.role`: `admin`, `seller`.
- `quote_requests.status`: `unassigned`, `assigned`, `in_progress`, `quoted`, `sent`, `won`, `lost`, `discarded`.
- `quotes.status`: `draft`, `issued`, `superseded`.
- `supplier_inquiries.status`: `pending`, `answered`, `no_response`.
- Códigos: solicitudes `SOL-2026-0001`, cotizaciones `COT-2026-0001` (correlativos por empresa y año).

## Git

- La rama lleva el id de Linear, por ejemplo `cot-12-tabla-customers`.
- Primero un PR con la spec; después el PR del código, que enlaza la spec.
- Commits con prefijo: `feat`, `fix`, `docs`, `refactor`, `test`.
- **Nunca hagas push a `main`.**

Más detalle en [docs/metodologia.md](docs/metodologia.md).
