# api-client

Paquete que todavía no tiene código.

## Qué va a contener

Tipos de TypeScript generados automáticamente a partir del esquema OpenAPI que publica `apps/api` (FastAPI genera ese esquema solo, sin esfuerzo extra). `apps/web` va a importar estos tipos en vez de escribirlos a mano, para que si cambia un endpoint de la API, la web deje de compilar hasta que se adapte al cambio.

## Por qué está vacío por ahora

Generar tipos requiere que `apps/api` tenga al menos un endpoint real de negocio con su esquema de entrada/salida (Pydantic). Hoy `apps/api` solo tiene `GET /health`, así que no hay nada útil que generar todavía. Este paquete se llena en el ticket donde se cree el primer endpoint de negocio.
