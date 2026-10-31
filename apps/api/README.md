# API de CotizAPP (`apps/api`)

API en **FastAPI** con toda la lógica de negocio: solicitudes, asignación, cálculos y PDF. La web solo la llama. Se despliega en **Railway**.

## Requisitos

- Python 3.12 (fijado en `.python-version`)
- [uv](https://docs.astral.sh/uv/getting-started/installation/): instala Python, crea el entorno virtual y maneja las dependencias.

## Levantar en local

```bash
cd apps/api
uv run uvicorn main:app --reload
```

- `uv run` crea el entorno virtual e instala las dependencias de `pyproject.toml` la primera vez.
- `--reload` reinicia el servidor cada vez que guardas un archivo.

Luego abre:

- http://localhost:8000/health → debe responder `{"status": "ok"}`.
- http://localhost:8000/docs → documentación interactiva que FastAPI genera sola. Desde ahí puedes probar cada endpoint.

## Agregar una dependencia

```bash
uv add nombre-del-paquete
```

Actualiza `pyproject.toml` y `uv.lock`; sube ambos archivos. Antes de agregar una librería, explica en el PR por qué hace falta (ver [AGENTS.md](../../AGENTS.md)).

## Endpoints actuales

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/health` | Confirma que el servidor está levantado |

## Reglas

- Los endpoints no tienen lógica de negocio: reciben datos, llaman a un servicio y devuelven el resultado.
- Los cálculos de dinero usan `Decimal`, nunca `float`.
- Toda consulta filtra por la empresa del usuario (`organization_id`), que se obtiene de la sesión.

Más detalle en [docs/arquitectura.md](../../docs/arquitectura.md). Despliegue y variables de entorno en [docs/despliegue.md](../../docs/despliegue.md).
