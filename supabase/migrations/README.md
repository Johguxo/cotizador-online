# Migraciones de Supabase

Carpeta vacía por ahora. Aquí van a vivir los archivos SQL de las migraciones de la base de datos, generados y aplicados con la **Supabase CLI** — no con Alembic.

## Por qué SQL directo y no Alembic

Las políticas de **Row Level Security (RLS)** son SQL puro y necesitan vivir junto a la definición de las tablas que protegen. Los modelos de SQLAlchemy en `apps/api` solo reflejan esas tablas para que la API pueda leer/escribir en ellas — no son dueños del esquema.

## Cómo se va a usar (cuando haya conexión real a Supabase)

```bash
supabase migration new nombre_de_la_migracion   # crea un archivo .sql vacío con timestamp
supabase db push                                 # aplica las migraciones pendientes
```

## Por qué está vacío por ahora

Conectar esto a un proyecto real de Supabase requiere credenciales que todavía no existen (fuera de alcance de COT-01). Las primeras migraciones (tabla `organizations`, `members`, etc.) se agregan en los tickets donde se necesiten esas tablas.
