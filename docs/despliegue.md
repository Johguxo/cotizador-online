# Despliegue

CotizAPP corre en tres servicios: **Supabase** para los datos, **Railway** para la API y **Vercel** para la web. Esta configuración es para la **demo**; antes de tener clientes reales hay que revisar los puntos de [Antes de producción](#antes-de-producción).

## Dónde corre cada pieza

| Pieza | Servicio | Plan | Costo |
|---|---|---|---|
| Base de datos (PostgreSQL + RLS), login (Auth) y archivos (Storage) | Supabase | Free | $0 |
| API (`apps/api`, FastAPI) | Railway | Hobby | Dentro de los $5/mes |
| Web (`apps/web`, Next.js) | Vercel | Hobby | $0 |

¿Por qué así?

- **Supabase** trae el login, el almacenamiento de archivos y RLS ya resueltos. Construir el login a mano sería más código y más riesgo.
- **Railway** solo corre la API, así que el uso cabe en los $5 del plan.
- **Vercel** es de los creadores de Next.js: se conecta al repo sin configuración y crea un link de prueba por cada PR (*preview deployment*), útil para revisar y para la demo del viernes.

## Cómo se conectan

```
Vercel (apps/web) ──REST + JWT──► Railway (apps/api) ──► Supabase Postgres
       │                                  └────────────► Supabase Storage
       └──── login ─────────────────────────────────────► Supabase Auth
```

- La web y la API tienen **dominios distintos**. Por eso la API debe permitir el dominio de Vercel en su configuración de **CORS** (la regla del navegador que bloquea llamadas a otro dominio si este no las autoriza).
- **Región:** crear el proyecto de Supabase y el servicio de Railway en la **misma región** (por ejemplo, us-east). Si están lejos, cada consulta de la API a la base tarda más.
- **Conexión de la API a la base:** usar la cadena de conexión del **pooler** de Supabase (*Session pooler*), no la conexión directa. La conexión directa de Supabase es solo IPv6 y puede fallar desde Railway.

## Configuración en cada servicio

**Vercel**

- *Root Directory*: `apps/web`.
- Framework: Next.js (lo detecta solo).

**Railway**

- *Root Directory*: `apps/api`.
- Comando de inicio: `uv run uvicorn main:app --host 0.0.0.0 --port $PORT`. Railway define `PORT` solo.

## Variables de entorno

Las credenciales **nunca se suben a git**. Se cargan en el panel de cada servicio y, en local, en un archivo `.env` que está en `.gitignore`.

Variables previstas (cada una se confirma en el ticket que la empiece a usar):

| Variable | Dónde | Para qué |
|---|---|---|
| `DATABASE_URL` | API (Railway) | Conexión a Postgres de Supabase (cadena del pooler) |
| `SUPABASE_URL` | API (Railway) | Dirección del proyecto de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | API (Railway) | Llave del servidor para Storage. Es secreta: nunca va en la web |
| `CORS_ORIGINS` | API (Railway) | Dominios que pueden llamar a la API (`http://localhost:3000` y el de Vercel) |
| `NEXT_PUBLIC_API_URL` | Web (Vercel) | Dirección de la API en Railway |
| `NEXT_PUBLIC_SUPABASE_URL` | Web (Vercel) | Dirección del proyecto de Supabase, para el login |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Web (Vercel) | Llave pública de Supabase, para el login |

Las variables que empiezan con `NEXT_PUBLIC_` quedan visibles en el navegador. Nunca pongas una llave secreta con ese prefijo.

## Límites de los planes gratuitos

Cifras aproximadas; confirmarlas en la página de precios de cada servicio.

| Servicio | Límite | Qué significa para nosotros |
|---|---|---|
| Supabase Free | Se pausa tras ~7 días sin actividad | En desarrollo puede pasar; se reactiva desde el panel |
| Supabase Free | ~500 MB de base de datos, ~1 GB de Storage | Suficiente para la demo. Los PDFs y adjuntos van a Storage |
| Supabase Free | Sin backups automáticos | No guardar datos reales importantes en este plan |
| Railway Hobby | $5 de uso incluidos al mes | Si la API consume más, se cobra el exceso |
| Vercel Hobby | Solo uso no comercial | Sirve para la demo, no para producción con clientes |

## Antes de producción

- **Supabase:** pasar a Pro (~$25/mes) por los backups y para que no se pause.
- **Web:** pagar Vercel Pro (~$20/mes por persona) o mover `apps/web` a Railway.
- **Railway:** revisar el consumo real de la API.
