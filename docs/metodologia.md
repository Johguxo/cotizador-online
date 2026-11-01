# Metodología de trabajo

Trabajamos en **sprints de una semana**. Cada sprint es un *cycle* en Linear. Cada feature se construye con **Spec Driven Development**: primero se acuerda qué se construye y cómo se valida, y recién después se escribe código.

## Herramientas

- **Linear:** los tickets (*issues*) y los sprints (*cycles*).
- **GitHub:** el código y los pull requests (PR).
- **GitHub Actions:** el CI. En cada PR corre lint (ruff, eslint) y pruebas (pytest, vitest).
- **Claude Code:** las skills del proyecto (ver más abajo).
- **WhatsApp:** dudas rápidas y el check-in de mitad de semana.

Linear y GitHub están conectados. Si la rama lleva el id del ticket, el ticket se mueve solo:

- Al abrir el PR → **In Review**.
- Al hacer merge → **Done**.

## Ceremonias de la semana

| Cuándo | Reunión | Duración | Qué se hace |
|---|---|---|---|
| Lunes | Planificación | 30 min | Se presentan los tickets, cada uno elige los suyos y se aclaran dudas |
| Miércoles | Check-in | 15 min o WhatsApp | Qué hice, qué haré, en qué estoy trabado |
| Viernes | Demo | 30 min | Cada uno muestra funcionando lo que terminó |
| Viernes | Retro | 15 min | Qué salió bien y qué mejorar |

## Estados de un ticket

```
Backlog → Todo → In Progress → In Review → Done
```

Tamaño de un ticket: **S** = 1–2 días, **M** = 3–4 días, **L** = una semana. Si crece más, se divide.

## Spec Driven Development

**Ningún código se escribe sin una spec aprobada.** Una *spec* es un documento corto que dice qué se va a construir y cómo sabremos que funciona. Revisar una spec es mucho más barato que revisar código ya escrito.

Cada feature tiene tres archivos en `specs/<NNN>-<nombre>/`:

| Archivo | Responde | Contenido | Quién aprueba |
|---|---|---|---|
| `spec.md` | Qué y por qué | Problema, historias de usuario, criterios de aceptación en formato Dado / Cuando / Entonces, fuera de alcance, preguntas abiertas | Líder |
| `plan.md` | Cómo | Tablas y migraciones, endpoints (método, ruta, request, response), pantallas y componentes, servicios, riesgos | Líder o par |
| `tasks.md` | En qué orden | Tareas de 1 a 3 horas, cada una con su prueba; se marcan `- [x]` al completarse | El autor la mantiene |

### Skills del proyecto

Las *skills* son instrucciones guardadas en `.claude/skills/` que le dicen a la IA cómo hacer una tarea según las reglas del proyecto. Se usan escribiendo `/<nombre>` en Claude Code.

| Skill | Para qué |
|---|---|
| `write-spec` | Crea `spec.md` desde un ticket con la plantilla del proyecto y pregunta si falta información |
| `plan-feature` | Lee `spec.md` y el código, y escribe `plan.md` y `tasks.md` |
| `implement-task` | Toma la siguiente tarea de `tasks.md`, la implementa con su test y actualiza el checklist |
| `api-endpoint` | Convenciones FastAPI: router + schema + service + test, siempre filtrando por `organization_id` |
| `supabase-migration` | Crea una migración SQL con índices y políticas RLS desde la plantilla |
| `web-page` | Convenciones Next.js: server components, cliente de API tipado, shadcn/ui, estados de carga y error |
| `review-pr` | Revisa el diff contra `spec.md`, `CLAUDE.md` y la Definición de Hecho |

Las skills se crean en COT-01 (las tres primeras) y en los tickets siguientes.

## Ramas: `main`, `develop` y una rama por ticket

| Rama | Para qué | Quién la actualiza |
|---|---|---|
| `main` | Versión estable, la que se despliega | Solo el líder, con un PR desde `develop` |
| `develop` | Integra todo el desarrollo del día a día | PRs de las ramas de ticket |
| `cot-XX-...` | Un ticket | Quien toma el ticket |

```
cot-12-tabla-customers ──PR──► develop ──PR (cuando está estable)──► main
```

¿Por qué así? `develop` permite juntar y probar varios tickets antes de que lleguen a `main`. Así `main` siempre tiene una versión que funciona.

**Nadie hace push directo a `main` ni a `develop`.** Todo entra por un PR revisado.

## Flujo de un ticket: primero la spec, después el código

1. Toma un ticket del cycle en Linear y muévelo a **In Progress**.
2. Actualiza `develop` y crea tu rama con el nombre que sugiere Linear:
   ```bash
   git checkout develop
   git pull
   git checkout -b cot-12-tabla-customers
   ```
3. Ejecuta `/write-spec COT-12`, completa `spec.md` y abre un **PR solo con la spec** hacia `develop`.
4. El líder revisa y aprueba la spec.
5. Ejecuta `/plan-feature` para generar `plan.md` y `tasks.md`.
6. Ejecuta `/implement-task` **una tarea a la vez**: lee el código, pruébalo y haz commit antes de pasar a la siguiente.
7. Abre el **PR del código** hacia `develop`, enlazando la spec, y llena la plantilla. Antes de pedir revisión, ejecuta `/review-pr`.
8. Tu compañero revisa primero; después el líder aprueba y hace merge a `develop`. Linear marca el ticket como **Done**.
9. Cuando `develop` está estable, el líder abre un PR de `develop` a `main`. El merge a `main` despliega automáticamente (API en Railway, web en Vercel).

## Mensajes de commit

Empiezan con un prefijo que dice qué tipo de cambio es:

| Prefijo | Cuándo usarlo | Ejemplo |
|---|---|---|
| `feat` | Algo nuevo | `feat: agrega tabla customers` |
| `fix` | Una corrección | `fix: corrige redondeo del IGV` |
| `docs` | Documentación o specs | `docs: agrega spec de captura de correo` |
| `refactor` | Reordenar código sin cambiar lo que hace | `refactor: mueve cálculos a services` |
| `test` | Pruebas | `test: agrega pruebas de totales` |

## Definición de Hecho

Un ticket está terminado solo cuando:

- [ ] Tiene su `spec.md` aprobada y todas las tareas de `tasks.md` marcadas
- [ ] Funciona localmente y cumple todos los criterios de aceptación de la spec
- [ ] El CI está en verde (lint y pruebas)
- [ ] El PR tiene descripción y explicación del código
- [ ] Fue revisado y aprobado
- [ ] Está mergeado en `develop`
- [ ] Quien lo hizo puede explicarlo sin ayuda

## Aprender con IA

Usen la IA todo lo que quieran, pero **el código que entregan tienen que entenderlo**. Si no pueden explicarlo, no se aprueba.

- Pide explicaciones, no solo código: "¿por qué así?", "¿qué pasa si cambio esto?".
- Pide una cosa a la vez, pruébala y recién pasa a la siguiente. Por eso `tasks.md` divide el trabajo en tareas pequeñas.
- Lee cada línea antes de hacer commit.
- Cuando algo falle, lee el error primero e intenta entenderlo. Luego pásaselo a la IA junto con lo que crees que pasa.
- En la demo puede pedirse un cambio pequeño en vivo para comprobar que entienden su código.
