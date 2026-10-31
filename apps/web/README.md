# Web de CotizAPP (`apps/web`)

Interfaz de CotizAPP en **Next.js 16** (App Router) con TypeScript, Tailwind y shadcn/ui. Muestra las pantallas y maneja el login; todo lo demás se lo pide a la API. Se despliega en **Vercel**.

## Levantar en local

Desde la raíz del repositorio:

```bash
pnpm install
pnpm dev
```

Abre http://localhost:3000. La página se actualiza sola al guardar un archivo.

Usa siempre **pnpm** (no npm, yarn ni bun): el monorepo depende de él.

## Pantallas actuales

| Ruta | Qué muestra |
|---|---|
| `/` | Redirige a `/login` |
| `/login` | Formulario de login (prototipo, todavía sin conexión a Supabase Auth) |

## Componentes de UI

Los componentes de `components/ui/` vienen de [shadcn/ui](https://ui.shadcn.com): se copian al repo en vez de instalarse como librería, así que se pueden leer y modificar. Para agregar uno:

```bash
cd apps/web
pnpm dlx shadcn@latest add nombre-del-componente
```

## Reglas

- La web no calcula totales ni aplica reglas de negocio: solo muestra lo que devuelve la API.
- Los tipos de la API se generan desde su OpenAPI (`packages/api-client`), no se escriben a mano.
- Nunca pongas una llave secreta en una variable `NEXT_PUBLIC_`: esas quedan visibles en el navegador.

Despliegue y variables de entorno en [docs/despliegue.md](../../docs/despliegue.md).
