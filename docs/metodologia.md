# Metodología de trabajo

Trabajamos en **sprints de una semana**. Cada sprint es un *cycle* en Linear.

## Herramientas

- **Linear:** los tickets (*issues*) y los sprints (*cycles*).
- **GitHub:** el código y los pull requests (PR).
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

Cada ticket es pequeño (1 a 3 días). Si crece más, se divide en dos.

## Flujo: un ticket = una rama = un PR

**Nadie hace push directo a `main`.** Todo entra por un PR revisado.

1. Toma un ticket del cycle en Linear y muévelo a **In Progress**.
2. Actualiza `main` y crea tu rama con el nombre que sugiere Linear:
   ```bash
   git checkout main
   git pull
   git checkout -b cot-12-tabla-customers
   ```
3. Programa en pasos pequeños y haz commits frecuentes.
4. Prueba en tu computadora que se cumplen todos los criterios de aceptación.
5. Sube la rama y abre un PR. Llena la plantilla del PR.
6. Tu compañero revisa primero; después el líder aprueba y hace merge.
7. Linear marca el ticket como **Done** automáticamente.

## Mensajes de commit

Empiezan con un prefijo que dice qué tipo de cambio es:

| Prefijo | Cuándo usarlo | Ejemplo |
|---|---|---|
| `feat` | Algo nuevo | `feat: agrega tabla customers` |
| `fix` | Una corrección | `fix: corrige redondeo del IGV` |
| `docs` | Documentación | `docs: explica cómo correr las pruebas` |
| `refactor` | Reordenar código sin cambiar lo que hace | `refactor: mueve cálculos a services` |
| `test` | Pruebas | `test: agrega pruebas de totales` |

## Definición de Hecho

Un ticket está terminado solo cuando:

- [ ] Funciona localmente y cumple todos los criterios de aceptación
- [ ] El PR tiene descripción y explicación del código
- [ ] Fue revisado y aprobado
- [ ] Está en `main` y desplegado en Railway
- [ ] Quien lo hizo puede explicarlo sin ayuda

## Aprender con IA

Usen la IA todo lo que quieran, pero **el código que entregan tienen que entenderlo**. Si no pueden explicarlo, no se aprueba.

- Pide explicaciones, no solo código: "¿por qué así?", "¿qué pasa si cambio esto?".
- Pide una cosa a la vez, pruébala y recién pasa a la siguiente.
- Lee cada línea antes de hacer commit.
- Cuando algo falle, lee el error primero e intenta entenderlo. Luego pásaselo a la IA junto con lo que crees que pasa.
- En la demo puede pedirse un cambio pequeño en vivo para comprobar que entienden su código.
