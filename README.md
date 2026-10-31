# CotizAPP

**CotizAPP** es una plataforma web **multi-empresa** donde un equipo de vendedores atiende las solicitudes de cotización que llegan por correo y genera la cotización en PDF.

El objetivo es reducir el tiempo entre que llega un pedido por correo y sale la cotización en PDF, sin que ninguna solicitud se pierda ni quede sin dueño.

## El problema

Los pedidos de cotización llegan por correo. Hoy alguien tiene que leerlos, decidir quién los atiende, consultar precios a proveedores, llenar una plantilla a mano y exportarla a PDF. Las solicitudes se pierden o se quedan sin dueño, y cada cotización toma mucho tiempo.

## La solución

![Flujo de una solicitud: los pasos 1 a 4 son automáticos y el vendedor actúa desde el paso 5](docs/img/flujo-solicitud.png)

**Lo hace el sistema solo (pasos 1 a 4):**

1. Llega un correo con el pedido del cliente a un buzón conectado.
2. Se registra el cliente (reconocido o nuevo) y se crea la **solicitud** `SOL-2026-0001`.
3. La solicitud se **asigna** al vendedor con menos solicitudes abiertas.
4. El vendedor recibe un **WhatsApp** con el link directo a la solicitud.

**Lo hace el vendedor en la plataforma (pasos 5 a 8):**

5. Abre la solicitud: correo original, adjuntos y cotizaciones previas del cliente.
6. Consulta a los **proveedores sugeridos** según la categoría de cada ítem.
7. Arma los ítems; la API calcula costo, margen e IGV.
8. Genera el **PDF** con número correlativo, que queda guardado en Supabase Storage.

## Qué cambió respecto al plan anterior

| Antes | Ahora |
|---|---|
| Un solo usuario | Varios vendedores por empresa, varias empresas |
| El usuario iniciaba la cotización | El sistema captura el correo y asigna al vendedor más libre |
| Aviso por Telegram | Aviso por WhatsApp con link directo a la solicitud |
| Formulario simple | Espacio de trabajo: historial del cliente, proveedores a consultar, ítems y PDF |
| Un servicio Python (FastAPI + Jinja2) | Monorepo: `apps/api` (FastAPI) + `apps/web` (Next.js), con Supabase |
| Sin login | Login obligatorio: cada vendedor ve lo suyo y cada empresa sus datos |

Se mantiene del plan anterior: cálculos hechos por el código, numeración correlativa, PDF desde plantilla HTML y la regla de que un PDF emitido no cambia.

## Stack

| Capa | Herramienta |
|---|---|
| Repositorio | Monorepo con pnpm + Turborepo (JavaScript) y uv (Python) |
| API | Python · FastAPI · SQLAlchemy · Pydantic |
| Web | Next.js 16 · TypeScript · Tailwind · shadcn/ui |
| Base de datos | PostgreSQL en Supabase, con Row Level Security (RLS) |
| Migraciones | Supabase CLI (SQL) |
| Login | Supabase Auth |
| Archivos (adjuntos y PDFs) | Supabase Storage |
| PDF | Jinja2 + WeasyPrint |
| Avisos | WhatsApp Cloud API (Meta) |
| Pruebas | pytest (API) · vitest (web) |
| CI | GitHub Actions: ruff, eslint, pytest, vitest |
| Despliegue (demo) | API en Railway · web en Vercel · datos en Supabase. Ver [docs/despliegue.md](docs/despliegue.md) |

## Alcance del MVP

- Captura de correos entrantes y creación automática de la solicitud.
- Asignación automática al vendedor con menos solicitudes abiertas.
- Aviso por WhatsApp al vendedor con link a la solicitud.
- Detalle de la solicitud: correo original, adjuntos y cotizaciones previas del cliente.
- Sugerencia de proveedores según la categoría de los ítems, y registro de sus respuestas.
- Armado de la cotización con cálculos automáticos (subtotal, IGV 18%, total, margen).
- PDF con la plantilla de la empresa y numeración correlativa por empresa.
- Login por email con roles `admin` y `seller`.

**Fuera del MVP:** enviar la cotización al cliente desde la plataforma (el vendedor descarga el PDF y lo envía él), enviar pedidos a proveedores por correo, IA para leer el correo y prellenar ítems, portal para clientes o proveedores, facturación y pagos.

## Próximos tickets

Los 10 primeros tickets llevan de un repo vacío a un flujo completo de demo en unos 4 sprints: correo de prueba → solicitud asignada → aviso por WhatsApp → cotización → PDF.

| ID | Ticket | Sprint | Depende de | Tamaño |
|---|---|---|---|---|
| COT-01 | Monorepo, CI, CLAUDE.md y skills base | 1 | — | M |
| COT-02 | Esquema base en Supabase con RLS y seed | 1 | 01 | M |
| COT-03 | Login y contexto de empresa | 1 | 01, 02 | M |
| COT-04 | Captura de correo → solicitud | 2 | 02 | L |
| COT-05 | Asignación automática al vendedor más libre | 2 | 04 | S |
| COT-07 | Bandeja y detalle de la solicitud | 2 | 03, 04 | M |
| COT-06 | Aviso por WhatsApp con link a la solicitud | 3 | 05 | M |
| COT-08 | Armado de cotización e historial del cliente | 3 | 07 | L |
| COT-09 | Proveedores: categorías, sugerencia y registro | 4 | 08 | M |
| COT-10 | Generación del PDF con numeración | 4 | 08 | M |

Tamaño: S = 1–2 días, M = 3–4 días, L = una semana. El detalle de cada ticket está en Linear.

Después de estos 10: conectar el proveedor real de correo, configuración de la empresa y su plantilla, lista y edición de clientes, estados ganada / perdida con métricas, e IA para prellenar ítems desde el correo.

## Organización del repositorio

Un solo repositorio con dos apps (`apps/api` y `apps/web`), las migraciones de Supabase en su propia carpeta, y las specs versionadas junto al código. El árbol de carpetas está en [docs/arquitectura.md](docs/arquitectura.md#estructura-de-carpetas).

## Documentación

- [Arquitectura y modelo de datos](docs/arquitectura.md)
- [Despliegue, costos y variables de entorno](docs/despliegue.md)
- [Metodología de trabajo y Spec Driven Development](docs/metodologia.md)
- [Reglas para asistentes de IA](AGENTS.md)
- [API](apps/api/README.md) · [Web](apps/web/README.md)

## Cómo empezar

### Requisitos

- [Node.js](https://nodejs.org) (versión LTS) y [pnpm](https://pnpm.io/installation)
- [Python 3.12](https://www.python.org/downloads/) y [uv](https://docs.astral.sh/uv/getting-started/installation/)
- Git

### Instalación

```bash
git clone https://github.com/Johguxo/cotizador-online.git
cd cotizador-online
pnpm install
```

`pnpm install` instala las dependencias de JavaScript de todo el monorepo. Las de Python se instalan solas la primera vez que corres `uv run`.

Copia las variables de entorno de la web (le dicen dónde está la API):

```bash
cp apps/web/.env.example apps/web/.env.local
```

### Levantar el proyecto

Hoy se necesitan **dos terminales**, porque `pnpm dev` todavía no levanta la API.

**Terminal 1 — API** (en el puerto 8010, el que espera la web):

```bash
cd apps/api
uv run uvicorn main:app --reload --port 8010
```

Abre http://localhost:8010/health. Debe responder `{"status": "ok"}`. La documentación interactiva de la API está en http://localhost:8010/docs.

**Terminal 2 — web:**

```bash
pnpm dev
```

Abre http://localhost:3000. Te lleva a `/login`; por ahora cualquier correo y contraseña te dejan entrar a `/dashboard`.

Las variables de entorno y el despliegue están en [docs/despliegue.md](docs/despliegue.md).
