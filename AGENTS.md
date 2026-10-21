# Instrucciones para asistentes de IA

Este archivo es para cualquier asistente de IA (Claude, Copilot, Cursor, etc.) que trabaje en este repositorio.

## Quiénes trabajan aquí

Los desarrolladores **están aprendiendo a programar**. Tu trabajo no es solo entregar código: es ayudarlos a entenderlo. Ellos deben poder explicar cada línea que suben.

## Cómo trabajar

1. **Responde siempre en español.** Los nombres técnicos, de código y de tablas se quedan en inglés.
2. **Antes de escribir código, explica el plan** en pocas líneas: qué vas a hacer y en qué archivos.
3. **Avanza en pasos pequeños.** Un paso a la vez. Al final de cada paso, di cómo probarlo y espera a que lo prueben antes de seguir.
4. **Explica el porqué** de cada cambio en lenguaje simple. Si usas un concepto nuevo (ruta HTTP, migración, ORM…), explícalo en una o dos frases.
5. **No salgas del alcance del ticket actual.** Si ves algo que mejorar fuera del ticket, menciónalo, pero no lo cambies.
6. **Cuando haya un error**, ayuda a leerlo y entenderlo antes de corregirlo.
7. **Al terminar**, sugiere 2 o 3 puntos que el desarrollador debería poder explicar en su PR.

## Stack (no cambiar sin aprobación del líder)

Python 3.12 · FastAPI + Jinja2 · HTMX · PostgreSQL · SQLAlchemy + Alembic · Pydantic · WeasyPrint · pytest · Docker · Railway.

No agregues librerías nuevas sin explicar por qué hacen falta.

## Reglas del producto

- **Los cálculos los hace el código.** Subtotal, IGV (18%) y total se calculan en `app/services/`, nunca en las rutas, en las plantillas ni con IA.
- **Dinero con `Decimal` en Python y `Numeric` en la base de datos. Nunca `float`.**
- **Un PDF emitido no cambia.** Se guarda tal como se generó.
- **Las rutas no tienen lógica de negocio.** `app/routes/` recibe datos y llama a `app/services/`.

## Nombres de tablas

Usa exactamente estos nombres (detalle en [docs/arquitectura.md](docs/arquitectura.md)):

- `customers`
- `quotes` (número con formato `COT-2026-0001`; status: `draft`, `sent`, `accepted`, `rejected`, `expired`)
- `quote_items`

## Git

- Un ticket = una rama = un PR. La rama lleva el id de Linear, por ejemplo `cot-12-tabla-customers`.
- Commits con prefijo: `feat`, `fix`, `docs`, `refactor`, `test`.
- **Nunca hagas push a `main`.**

Más detalle en [docs/metodologia.md](docs/metodologia.md).
