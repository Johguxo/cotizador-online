# Arquitectura

El Cotizador es **una sola aplicación web en Python**, en un solo repositorio, desplegada en Railway junto a su base de datos PostgreSQL.

## Idea principal

Toda la lógica vive en un solo lugar: el **servicio de cotizaciones**. La web (y más adelante el bot) son solo **entradas**: reciben datos y se los pasan al servicio.

```
  Formulario web ──┐
                   │
  Bot Telegram ────┼──►  Servicio de cotizaciones  ──►  PostgreSQL
  (etapa 3)        │     - calcula totales             (clientes, cotizaciones)
                   │     - asigna el número
  Correos Gmail ───┘     - genera el PDF          ──►  Archivo PDF
  (etapa 4)
```

¿Por qué así? Si mañana agregamos el bot, no hay que volver a escribir los cálculos ni el PDF. El bot llama al mismo servicio que usa la web.

## Reglas del producto

- **Los cálculos los hace el código.** Subtotal, IGV (18%) y total se calculan siempre en el servicio, nunca a mano ni con IA.
- **El dinero usa `Decimal`, nunca `float`.** En Python se usa `Decimal`; en la base de datos, `Numeric`. Con `float` aparecen errores como `149.99999`.
- **Un PDF emitido no cambia.** Se guarda el archivo tal como se generó. Si después cambia la plantilla o los datos del cliente, el PDF antiguo sigue igual.

## Estructura de carpetas planeada

```
cotizador/
├── app/
│   ├── main.py          # arranque de FastAPI
│   ├── config.py        # lee las variables de entorno
│   ├── db.py            # conexión a la base de datos
│   ├── models.py        # tablas (SQLAlchemy)
│   ├── schemas.py       # validación de datos (Pydantic)
│   ├── services/        # lógica: cálculos, numeración, PDF
│   └── routes/          # páginas: clientes, cotizaciones
├── templates/           # HTML de las páginas y del PDF (Jinja2)
├── static/              # CSS, logo
├── migrations/          # migraciones (Alembic)
├── storage/             # PDFs generados (no se sube a git)
├── tests/               # pruebas (pytest)
├── Dockerfile
└── README.md
```

Regla simple: **`routes/` no calcula nada.** Recibe el formulario, llama a `services/` y muestra el resultado.

## Modelo de datos

Tres tablas en la etapa 1, con nombres en inglés:

- Un **cliente** (`customers`) tiene muchas **cotizaciones** (`quotes`).
- Una **cotización** tiene muchos **ítems** (`quote_items`).

```
customers 1 ──── * quotes 1 ──── * quote_items
```

Los tipos son una guía para COT-1.

### `customers`

| Campo | Tipo sugerido | Nota |
|---|---|---|
| id | Integer, PK | |
| tax_id | String(11), único | RUC del cliente |
| name | String | Razón social |
| contact_name | String, opcional | Persona de contacto |
| email | String, opcional | |
| phone | String, opcional | |
| address | String, opcional | |
| created_at | DateTime | Se llena solo al crear |
| updated_at | DateTime | Se actualiza solo al editar |

### `quotes`

| Campo | Tipo sugerido | Nota |
|---|---|---|
| id | Integer, PK | |
| number | String, único | Formato `COT-2026-0001`, correlativo y automático |
| issue_date | Date | Fecha de emisión |
| customer_id | Integer, FK → customers.id | |
| currency | String(3) | `PEN` o `USD` |
| includes_tax | Boolean | Si los precios ya incluyen IGV |
| payment_terms | String, opcional | Forma de pago |
| delivery_time | String, opcional | Plazo de entrega |
| validity_days | Integer | Días de validez de la oferta |
| notes | Text, opcional | |
| subtotal | Numeric(12, 2) | Lo calcula el código |
| tax | Numeric(12, 2) | IGV 18%, lo calcula el código |
| total | Numeric(12, 2) | Lo calcula el código |
| status | String | `draft`, `sent`, `accepted`, `rejected`, `expired` |
| pdf_path | String, opcional | Ruta del PDF emitido |
| created_at | DateTime | |
| updated_at | DateTime | |

En la etapa 1, toda cotización pasa a `sent` al generar su PDF.

### `quote_items`

| Campo | Tipo sugerido | Nota |
|---|---|---|
| id | Integer, PK | |
| quote_id | Integer, FK → quotes.id | |
| position | Integer | Orden de la línea en el PDF (1, 2, 3…) |
| description | Text | |
| quantity | Numeric(12, 3) | Permite cantidades como 2.5 |
| unit | String | Unidad: `und`, `kg`, `m`… |
| unit_price | Numeric(12, 2) | |
| line_total | Numeric(12, 2) | `quantity × unit_price`, lo calcula el código |

### Etapa 2 (todavía no se crea)

`products`: id, name, unit, default_price, aliases. Es el catálogo con precios habituales.
