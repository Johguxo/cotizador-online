# Cotizador

Web para generar cotizaciones en PDF a partir de un formulario. Guarda los clientes y las cotizaciones en una base de datos.

hvcgcgfcgfc

## El problema

Hoy los pedidos de cotización llegan por correo. Para cada uno hay que llenar una plantilla a mano, exportarla a PDF y anotarla en un Excel. Eso toma mucho tiempo.

## La solución

Una web donde:

1. Se elige el cliente, buscándolo por RUC o por nombre.
2. Se agregan los productos con cantidad, unidad y precio.
3. Con un clic se genera el PDF de la cotización.

Todas las cotizaciones quedan listadas en la misma web, con su PDF para descargar.

## Stack

| Capa | Herramienta |
|---|---|
| Lenguaje | Python 3.12 |
| Web | FastAPI + Jinja2 |
| Interactividad | HTMX |
| Base de datos | PostgreSQL |
| Acceso a datos | SQLAlchemy + Alembic |
| Validación | Pydantic |
| PDF | WeasyPrint |
| Pruebas | pytest |
| Despliegue | Docker + Railway |

## Etapas

| Etapa | Qué incluye |
|---|---|
| **1. Web + base de datos** (actual) | Clientes, formulario de cotización, PDF, listado. Sin login y sin IA. |
| 2. Mejoras | Catálogo de productos, estados de cotización, duplicar, exportar a Excel. |
| 3. Telegram + IA | Un bot donde se escribe el pedido; la IA (Claude Haiku) llena un borrador. |
| 4. Correos | Leer pedidos desde Gmail y responder con el PDF adjunto. |

Las etapas 3 y 4 no cambian lo construido antes: solo son otra forma de llenar los mismos datos.

## Organización del repositorio

```
cotizador/
├── app/              # código de la aplicación (se crea en COT-1)
├── templates/        # HTML de las páginas y del PDF
├── static/           # CSS, logo
├── migrations/       # migraciones de Alembic
├── tests/            # pruebas
├── docs/             # documentación del proyecto
├── AGENTS.md         # instrucciones para asistentes de IA
└── README.md
```

El detalle de cada carpeta está en [docs/arquitectura.md](docs/arquitectura.md).

## Documentación

- [Arquitectura y modelo de datos](docs/arquitectura.md)
- [Metodología de trabajo](docs/metodologia.md)
- [Reglas para asistentes de IA](AGENTS.md)

## Cómo empezar

Pendiente (COT-1).
