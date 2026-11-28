# Entrega 1 · Verbal, Lenguaje y lógica (28-11-2026)

## Qué subir a tu repositorio
En tu repositorio los archivos están sueltos (sin carpetas), así que súbelos todos
en la página principal con Add file > Upload files:

- `app.js` (reemplaza): soporta lecturas y ejercicios con datos que cambian.
- `style.css` (reemplaza): estilos de las lecturas y color de Verbal y Lenguaje.
- `data-paa.js` (reemplaza): agrega 2 temas con datos que cambian.
- `data-len.js` (NUEVO): la materia Verbal y Lenguaje.

`data-mat.js`, `data-fis.js` y `data-qui.js` no cambian.

## El cambio que haces tú en index.html
Copia la línea de `data-paa.js`, pégala debajo y cambia `paa` por `len`.
El orden final debe ser: data-mat, data-fis, data-qui, data-paa, data-len y al final app.

## Qué cambió
- Nueva materia **Verbal y Lenguaje** (49 preguntas, 6 temas): comprensión lectora con
  3 lecturas originales, completar oraciones, analogías, razonamiento lógico-verbal y
  falacias, puntuación y concordancia, y párrafo, conectores y redacción.
  Cubre el temario oficial de Lenguaje EPN 2026 y la parte verbal de la PAA.
- **Ejercicios con datos que cambian:** cada vez que aparecen, los números son otros y la
  app calcula la respuesta. En PAA Matemático hay 2 temas nuevos de este tipo:
  - Razonamiento lógico-matemático: series aritméticas, geométricas y de diferencias,
    operaciones definidas y tablas con patrón.
  - Problemas clásicos de examen: edades, gallinas y conejos, trabajo conjunto,
    porcentajes sucesivos, promedios y fracción de un total.
- Cada pregunta indica su origen: "Creado para Rumbo", "Tipo frecuente · guía oficial
  EPN 2025-B" o "Tipo frecuente en exámenes de ingreso".
- El **simulacro EPN** ahora tiene las 4 áreas: Lenguaje se agregó con 20 preguntas en
  40 minutos, así que la estimación es sobre 1000.
- Nuevo **simulacro PAA verbal**: 30 preguntas en 35 minutos.
- En total hay 302 preguntas (antes 241), y 12 de ellas generan números nuevos cada vez.

## Cómo funciona "datos que cambian" (para que lo entiendas en el código)
En `data-paa.js`, al final, cada pregunta de este tipo es un objeto con una función
`gen(R)`. `R.int(a, b)` da un número entero al azar entre a y b. La función arma el
enunciado con esos números y calcula la respuesta. En `app.js`, la función `inst()`
llama a `gen` con una "semilla": con la misma semilla salen los mismos números, y por
eso un simulacro se ve igual si recargas la página.
