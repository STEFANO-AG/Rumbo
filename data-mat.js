// Banco de Matemática. Formato de pregunta:
// [dificultad 1-3, enunciado, [correcta, distractor1, distractor2, distractor3], solución, pista]
// La opción correcta se escribe primero; la app baraja las opciones al mostrarlas.
window.RUMBO_SUBJECTS = window.RUMBO_SUBJECTS || [];
window.RUMBO_SUBJECTS.push({
  id: 'mat', name: 'Matemática', short: 'MAT', color: 'mat', weight: 0.4,
  tags: ['EPN', 'USFQ'],
  desc: 'Habilitante en la EPN (vale 40%) y base de la Aptitud Matemática de la PAA en la USFQ.',
  topics: [
    {
      id: 'm1', title: 'Números reales y operaciones', tags: ['EPN', 'USFQ'], prereq: [], minutes: 40,
      objetivo: ['Operar enteros y fracciones respetando signos y jerarquía', 'Calcular valor absoluto', 'Convertir decimales a fracciones'],
      teoria: `<p><b>Jerarquía de operaciones:</b> primero paréntesis, luego potencias y raíces, después multiplicación y división (de izquierda a derecha) y al final suma y resta.</p>
<p><b>Ley de signos:</b> (+)(+) = +, (−)(−) = +, (+)(−) = −. En sumas, signos iguales se suman y signos distintos se restan y se conserva el signo del mayor.</p>
<p><b>Fracciones:</b> para sumar, iguala denominadores: a/b + c/d = (ad + bc)/bd. Para dividir, multiplica por el inverso: (a/b) ÷ (c/d) = (a/b)·(d/c).</p>
<p><b>Valor absoluto:</b> |x| es la distancia de x al cero, nunca es negativa: |−5| = 5.</p>`,
      ejemplo: `<p>Calcular 10 − 3·(4 − 6)²</p><ol><li>Paréntesis: 4 − 6 = −2</li><li>Potencia: (−2)² = 4</li><li>Multiplicación: 3·4 = 12</li><li>Resta: 10 − 12 = <b>−2</b></li></ol>`,
      errores: ['Sumar antes de multiplicar.', 'Escribir (−2)² = −4. El cuadrado de un negativo es positivo.', 'Sumar numeradores y denominadores: 1/2 + 1/3 ≠ 2/5.'],
      preguntas: [
        [1, 'Calcula: −3 + 5·(−2)', ['−13', '−4', '4', '13'], '5·(−2) = −10, luego −3 − 10 = −13.', 'Primero la multiplicación.'],
        [1, 'Calcula: 2/3 + 1/4', ['11/12', '3/7', '3/12', '2/12'], 'Denominador común 12: 8/12 + 3/12 = 11/12.', 'Busca el mínimo común múltiplo de 3 y 4.'],
        [2, 'Calcula: (3/4) ÷ (9/8)', ['2/3', '27/32', '3/2', '1/3'], '(3/4)·(8/9) = 24/36 = 2/3.', 'Dividir es multiplicar por el inverso.'],
        [2, 'Calcula: 12 − 2·(3 − 5)² ÷ 4', ['10', '25', '8', '1'], '(3−5)² = 4; 2·4 = 8; 8 ÷ 4 = 2; 12 − 2 = 10.', 'Paréntesis, potencia, luego multiplicación y división de izquierda a derecha.'],
        [1, 'Calcula: |−7| − |3 − 10|', ['0', '14', '−14', '10'], '|−7| = 7 y |3−10| = |−7| = 7. 7 − 7 = 0.', 'Resuelve lo de adentro de cada valor absoluto primero.'],
        [2, 'Expresa 0,25 + 1/5 como fracción', ['9/20', '2/9', '1/9', '3/10'], '0,25 = 1/4. 1/4 + 1/5 = 5/20 + 4/20 = 9/20.', 'Convierte 0,25 a fracción.'],
        [3, 'Calcula: [−2 − (−5)]·(−1/3) + 4', ['3', '5', '−3', '11/3'], '−2 + 5 = 3; 3·(−1/3) = −1; −1 + 4 = 3.', 'Restar un negativo es sumar.']
      ]
    },
    {
      id: 'm2', title: 'Potencias, raíces y notación científica', tags: ['EPN', 'USFQ'], prereq: ['m1'], minutes: 45,
      objetivo: ['Aplicar las leyes de exponentes', 'Interpretar exponentes negativos y fraccionarios', 'Simplificar radicales'],
      teoria: `<p><b>Leyes de exponentes:</b></p><ul>
<li>a<sup>m</sup>·a<sup>n</sup> = a<sup>m+n</sup></li><li>a<sup>m</sup> / a<sup>n</sup> = a<sup>m−n</sup></li>
<li>(a<sup>m</sup>)<sup>n</sup> = a<sup>m·n</sup></li><li>a<sup>0</sup> = 1 (a ≠ 0)</li>
<li>a<sup>−n</sup> = 1/a<sup>n</sup></li><li>a<sup>m/n</sup> = (ⁿ√a)<sup>m</sup></li></ul>
<p><b>Radicales:</b> √(a·b) = √a·√b. Para simplificar, busca factores que sean cuadrados perfectos: √50 = √(25·2) = 5√2.</p>
<p><b>Notación científica:</b> a × 10<sup>n</sup> con 1 ≤ a &lt; 10. Al multiplicar, se multiplican las mantisas y se suman los exponentes.</p>`,
      ejemplo: `<p>Simplificar (x<sup>2</sup>)<sup>3</sup>·x<sup>−4</sup></p><ol><li>(x<sup>2</sup>)<sup>3</sup> = x<sup>6</sup></li><li>x<sup>6</sup>·x<sup>−4</sup> = x<sup>6−4</sup> = <b>x<sup>2</sup></b></li></ol>`,
      errores: ['Multiplicar exponentes cuando las bases se multiplican (2³·2⁴ no es 2¹²).', 'Pensar que un exponente negativo hace el número negativo.', 'Escribir √(a + b) = √a + √b.'],
      preguntas: [
        [1, 'Simplifica: 2³ · 2⁴', ['2⁷', '2¹²', '4⁷', '4¹²'], 'Misma base: se suman exponentes, 3 + 4 = 7.', 'Producto de potencias de igual base.'],
        [1, 'Simplifica: (x³)² / x⁴', ['x²', 'x', 'x⁵', 'x¹⁰'], '(x³)² = x⁶; x⁶ / x⁴ = x².', 'Potencia de potencia: multiplica exponentes.'],
        [1, '¿Cuánto vale 5⁻²?', ['1/25', '−25', '−10', '1/10'], '5⁻² = 1/5² = 1/25.', 'Exponente negativo significa inverso.'],
        [2, 'Simplifica: √50', ['5√2', '25√2', '2√5', '10√5'], '50 = 25·2, √25 = 5, así que √50 = 5√2.', 'Busca un cuadrado perfecto que divida a 50.'],
        [2, '¿Cuánto vale 8^(2/3)?', ['4', '16/3', '12', '2'], '∛8 = 2 y 2² = 4.', 'Primero la raíz cúbica, luego el cuadrado.'],
        [2, 'Calcula: (3 × 10⁴)·(2 × 10⁻⁶)', ['6 × 10⁻²', '6 × 10⁻²⁴', '5 × 10⁻²', '6 × 10²'], '3·2 = 6 y 10⁴·10⁻⁶ = 10⁻².', 'Multiplica mantisas y suma exponentes.'],
        [3, 'Simplifica: (2a²b)³ / (4a⁴b²)', ['2a²b', '2a⁶b³', 'a²b/2', '8a²b'], '(2a²b)³ = 8a⁶b³. Dividido entre 4a⁴b²: 2a²b.', 'Eleva cada factor al cubo, incluido el 2.']
      ]
    },
    {
      id: 'm3', title: 'Expresiones algebraicas y factorización', tags: ['EPN', 'USFQ'], prereq: ['m1', 'm2'], minutes: 50,
      objetivo: ['Reducir términos semejantes', 'Usar productos notables', 'Factorizar diferencias de cuadrados y trinomios'],
      teoria: `<p><b>Productos notables:</b></p><ul>
<li>(a + b)² = a² + 2ab + b²</li><li>(a − b)² = a² − 2ab + b²</li><li>(a + b)(a − b) = a² − b²</li></ul>
<p><b>Factorizar</b> es el proceso inverso: escribir una expresión como producto.</p><ul>
<li>Factor común: 6x² + 9x = 3x(2x + 3)</li><li>Diferencia de cuadrados: x² − 9 = (x − 3)(x + 3)</li>
<li>Trinomio x² + bx + c: busca dos números que multiplicados den c y sumados den b.</li></ul>`,
      ejemplo: `<p>Factorizar x² − 5x + 6</p><ol><li>Buscamos dos números con producto 6 y suma −5.</li><li>Son −2 y −3.</li><li>Resultado: <b>(x − 2)(x − 3)</b>. Comprobación: x² − 3x − 2x + 6 ✓</li></ol>`,
      errores: ['Escribir (x + 3)² = x² + 9 (falta el término 2·3·x).', 'Olvidar distribuir el signo menos: −2(x − 4) = −2x + 8.', 'Simplificar términos que se suman: (x + 2)/2 no es x.'],
      preguntas: [
        [1, 'Desarrolla: (x + 3)²', ['x² + 6x + 9', 'x² + 9', 'x² + 3x + 9', 'x² + 6x + 6'], '(x+3)² = x² + 2·3·x + 9.', 'Cuadrado de un binomio: a² + 2ab + b².'],
        [1, 'Factoriza: x² − 9', ['(x − 3)(x + 3)', '(x − 3)²', '(x + 9)(x − 1)', 'x(x − 9)'], 'Diferencia de cuadrados: x² − 3².', '9 es 3².'],
        [2, 'Factoriza: x² − 5x + 6', ['(x − 2)(x − 3)', '(x + 2)(x + 3)', '(x − 1)(x − 6)', '(x + 1)(x − 6)'], '−2 · −3 = 6 y −2 + −3 = −5.', 'Dos números: producto 6, suma −5.'],
        [2, 'Reduce: 3(2x − 1) − 2(x − 4)', ['4x + 5', '4x − 11', '4x − 5', '8x + 5'], '6x − 3 − 2x + 8 = 4x + 5.', 'Cuidado: −2 por −4 da +8.'],
        [1, 'Desarrolla: (2a − b)(2a + b)', ['4a² − b²', '4a² + b²', '2a² − b²', '4a² − 4ab + b²'], 'Suma por diferencia: (2a)² − b².', 'Producto notable (a+b)(a−b).'],
        [2, 'Simplifica (x ≠ 2): (x² − 4)/(x − 2)', ['x + 2', 'x − 2', 'x', '2'], 'x² − 4 = (x − 2)(x + 2); se cancela (x − 2).', 'Factoriza el numerador.'],
        [3, 'Factoriza completamente: 2x³ − 18x', ['2x(x − 3)(x + 3)', '2x(x² − 9)', '2(x³ − 9x)', 'x(2x − 9)(x + 2)'], 'Factor común 2x: 2x(x² − 9) = 2x(x − 3)(x + 3).', 'Saca factor común y revisa si queda una diferencia de cuadrados.']
      ]
    },
    {
      id: 'm4', title: 'Ecuaciones lineales y sistemas', tags: ['EPN', 'USFQ'], prereq: ['m3'], minutes: 50,
      objetivo: ['Resolver ecuaciones de primer grado', 'Resolver sistemas 2×2', 'Plantear ecuaciones desde un problema'],
      teoria: `<p>Una <b>ecuación lineal</b> se resuelve aislando la variable: lo que suma pasa restando, lo que multiplica pasa dividiendo (haciendo lo mismo en ambos lados).</p>
<p><b>Sistemas 2×2:</b></p><ul><li><b>Sustitución:</b> despeja una variable y reemplázala en la otra ecuación.</li>
<li><b>Reducción:</b> suma o resta las ecuaciones para eliminar una variable.</li></ul>
<p>Siempre <b>comprueba</b> sustituyendo la solución en las ecuaciones originales.</p>`,
      ejemplo: `<p>Resolver x + y = 10 y x − y = 4</p><ol><li>Sumando: 2x = 14, x = 7</li><li>Reemplazando: 7 + y = 10, y = 3</li><li>Comprobación: 7 − 3 = 4 ✓. Solución <b>(7, 3)</b></li></ol>`,
      errores: ['Cambiar de lado un término sin cambiarle el signo.', 'Con fracciones, no multiplicar todos los términos por el denominador común.', 'No comprobar la solución.'],
      preguntas: [
        [1, 'Resuelve: 3x − 7 = 11', ['x = 6', 'x = 4/3', 'x = 18', 'x = 3'], '3x = 18, x = 6.', 'Suma 7 a ambos lados.'],
        [2, 'Resuelve: 2(x + 1) = 5x − 7', ['x = 3', 'x = −3', 'x = 5/3', 'x = 9/7'], '2x + 2 = 5x − 7 → 9 = 3x → x = 3.', 'Distribuye primero.'],
        [2, 'Resuelve: x/3 + x/2 = 10', ['x = 12', 'x = 2', 'x = 60', 'x = 6'], 'Multiplica por 6: 2x + 3x = 60, x = 12.', 'Multiplica toda la ecuación por 6.'],
        [1, 'Resuelve el sistema: x + y = 10; x − y = 4', ['(7, 3)', '(3, 7)', '(6, 4)', '(5, 5)'], 'Sumando: 2x = 14.', 'Suma las dos ecuaciones.'],
        [2, 'Resuelve el sistema: 2x + 3y = 12; x − y = 1', ['(3, 2)', '(2, 3)', '(4, 3)', '(0, 4)'], 'x = 1 + y; 2 + 2y + 3y = 12 → y = 2, x = 3.', 'Despeja x de la segunda.'],
        [1, 'Un número más su doble es 36. ¿Cuál es el número?', ['12', '18', '9', '24'], 'n + 2n = 36 → 3n = 36 → n = 12.', 'Plantea n + 2n.'],
        [3, 'En un corral hay gallinas y conejos: 20 cabezas y 56 patas. ¿Cuántos conejos hay?', ['8', '12', '10', '6'], 'g + c = 20 y 2g + 4c = 56. Restando 2 veces la primera: 2c = 16, c = 8.', 'Una ecuación para cabezas y otra para patas.']
      ]
    },
    {
      id: 'm5', title: 'Ecuaciones de segundo grado', tags: ['EPN', 'USFQ'], prereq: ['m3', 'm4'], minutes: 50,
      objetivo: ['Resolver cuadráticas por factorización y fórmula general', 'Usar el discriminante', 'Relacionar raíces y coeficientes'],
      teoria: `<p>Forma general: ax² + bx + c = 0, con a ≠ 0.</p>
<p><b>Fórmula general:</b> x = (−b ± √(b² − 4ac)) / 2a</p>
<p><b>Discriminante</b> Δ = b² − 4ac: si Δ &gt; 0 hay dos soluciones reales distintas; si Δ = 0, una solución doble; si Δ &lt; 0, no hay soluciones reales.</p>
<p><b>Suma y producto de raíces:</b> x₁ + x₂ = −b/a y x₁·x₂ = c/a.</p>`,
      ejemplo: `<p>Resolver x² + 2x − 15 = 0</p><ol><li>Factorizar: números con producto −15 y suma 2: 5 y −3.</li><li>(x + 5)(x − 3) = 0</li><li>Soluciones: <b>x = −5 o x = 3</b></li></ol>`,
      errores: ['Al resolver x² = 49, olvidar la raíz negativa.', 'Dividir entre x (se pierde la solución x = 0).', 'Equivocarse con el signo de −b en la fórmula.'],
      preguntas: [
        [1, 'Resuelve: x² − 5x + 6 = 0', ['x = 2 o x = 3', 'x = −2 o x = −3', 'x = 1 o x = 6', 'x = −1 o x = 6'], '(x − 2)(x − 3) = 0.', 'Factoriza el trinomio.'],
        [1, 'Resuelve: x² = 49', ['x = 7 o x = −7', 'x = 7', 'x = 24,5', 'x = −7'], 'Hay dos números cuyo cuadrado es 49.', 'No olvides la raíz negativa.'],
        [2, 'Resuelve: 2x² − 8x = 0', ['x = 0 o x = 4', 'x = 4', 'x = 0 o x = −4', 'x = 2 o x = −2'], '2x(x − 4) = 0.', 'Saca factor común, no dividas entre x.'],
        [2, 'Resuelve: x² + 2x − 15 = 0', ['x = −5 o x = 3', 'x = 5 o x = −3', 'x = −5 o x = −3', 'x = 15 o x = −1'], '(x + 5)(x − 3) = 0.', 'Producto −15, suma 2.'],
        [2, '¿Cuántas soluciones reales tiene x² + 4x + 5 = 0?', ['Ninguna', 'Dos distintas', 'Una doble', 'Infinitas'], 'Δ = 16 − 20 = −4 < 0.', 'Calcula el discriminante.'],
        [3, '¿Cuánto vale la suma de las raíces de 2x² − 6x + 1 = 0?', ['3', '−3', '1/2', '6'], 'x₁ + x₂ = −b/a = 6/2 = 3.', 'Usa −b/a.'],
        [3, 'El área de un rectángulo es 24 m² y su largo mide 2 m más que su ancho. ¿Cuánto mide el ancho?', ['4 m', '6 m', '3 m', '2 m'], 'x(x + 2) = 24 → x² + 2x − 24 = 0 → (x + 6)(x − 4) = 0. El ancho es 4 m (la medida negativa no sirve).', 'Plantea ancho·(ancho + 2) = 24.']
      ]
    },
    {
      id: 'm6', title: 'Inecuaciones y valor absoluto', tags: ['EPN'], prereq: ['m4', 'm5'], minutes: 45,
      objetivo: ['Resolver inecuaciones lineales', 'Resolver ecuaciones e inecuaciones con valor absoluto', 'Expresar soluciones como intervalos'],
      teoria: `<p>Las inecuaciones se resuelven como ecuaciones, con una regla extra: <b>al multiplicar o dividir por un número negativo, el sentido de la desigualdad se invierte</b>.</p>
<p><b>Valor absoluto</b> (con k &gt; 0):</p><ul><li>|x| = k ⇔ x = k o x = −k</li><li>|x| &lt; k ⇔ −k &lt; x &lt; k</li><li>|x| &gt; k ⇔ x &lt; −k o x &gt; k</li></ul>
<p><b>Cuadráticas:</b> encuentra las raíces y analiza el signo en cada intervalo.</p>`,
      ejemplo: `<p>Resolver |2x + 1| ≥ 3</p><ol><li>2x + 1 ≥ 3 → x ≥ 1</li><li>2x + 1 ≤ −3 → x ≤ −2</li><li>Solución: <b>x ≤ −2 o x ≥ 1</b></li></ol>`,
      errores: ['No invertir la desigualdad al dividir entre un negativo.', 'Resolver |x − 2| = 5 con una sola solución.', 'Confundir "y" con "o" en las soluciones de valor absoluto.'],
      preguntas: [
        [1, 'Resuelve: 2x − 3 > 5', ['x > 4', 'x > 1', 'x < 4', 'x > 8'], '2x > 8 → x > 4.', 'Suma 3 y divide entre 2.'],
        [2, 'Resuelve: −3x ≤ 12', ['x ≥ −4', 'x ≤ −4', 'x ≥ 4', 'x ≤ 4'], 'Al dividir entre −3 se invierte: x ≥ −4.', 'Dividir entre negativo invierte el signo.'],
        [1, 'Resuelve: |x − 2| = 5', ['x = 7 o x = −3', 'x = 7', 'x = 3 o x = −7', 'x = −3'], 'x − 2 = 5 o x − 2 = −5.', 'Hay dos casos.'],
        [2, 'Resuelve: |x| < 3', ['−3 < x < 3', 'x < 3', 'x < −3 o x > 3', 'x > −3'], 'La distancia al cero es menor que 3.', 'Piensa en distancia al cero.'],
        [3, 'Resuelve: |2x + 1| ≥ 3', ['x ≤ −2 o x ≥ 1', '−2 ≤ x ≤ 1', 'x ≥ 1', 'x ≤ −1 o x ≥ 2'], '2x + 1 ≥ 3 o 2x + 1 ≤ −3.', 'Mayor que: dos regiones separadas.'],
        [3, 'Resuelve: x² − 4 < 0', ['−2 < x < 2', 'x < 2', 'x < −2 o x > 2', 'x < 4'], 'Raíces ±2; la parábola es negativa entre ellas.', 'Encuentra las raíces y prueba un punto en cada intervalo.']
      ]
    },
    {
      id: 'm7', title: 'Geometría plana', tags: ['EPN', 'USFQ'], prereq: ['m1'], minutes: 55,
      objetivo: ['Usar relaciones entre ángulos y paralelas', 'Aplicar Pitágoras y semejanza', 'Calcular áreas y perímetros'],
      teoria: `<ul><li>Ángulos <b>complementarios</b> suman 90°; <b>suplementarios</b> suman 180°.</li>
<li>La suma de ángulos interiores de un triángulo es 180°.</li>
<li>Paralelas cortadas por una transversal: alternos internos y correspondientes son iguales; conjugados (del mismo lado) suman 180°.</li>
<li><b>Pitágoras:</b> en un triángulo rectángulo, c² = a² + b².</li>
<li><b>Semejanza:</b> triángulos semejantes tienen lados proporcionales.</li>
<li>Áreas: rectángulo b·h, triángulo b·h/2, círculo πr²; perímetro de la circunferencia 2πr.</li></ul>`,
      ejemplo: `<p>Un triángulo tiene catetos 6 y 8. Hipotenusa: c² = 36 + 64 = 100, <b>c = 10</b>. Área = 6·8/2 = <b>24</b>.</p>`,
      errores: ['Confundir complementarios con suplementarios.', 'Usar el diámetro en vez del radio en πr².', 'Emparejar lados que no se corresponden en triángulos semejantes.'],
      preguntas: [
        [1, '¿Cuál es el suplemento de un ángulo de 65°?', ['115°', '25°', '295°', '35°'], '180° − 65° = 115°.', 'Suplementarios suman 180°.'],
        [1, 'Dos ángulos de un triángulo miden 50° y 60°. ¿Cuánto mide el tercero?', ['70°', '80°', '90°', '250°'], '180 − 110 = 70.', 'Los ángulos suman 180°.'],
        [1, 'Los catetos de un triángulo rectángulo miden 6 y 8. ¿Cuánto mide la hipotenusa?', ['10', '14', '48', '7'], '√(36 + 64) = 10.', 'Pitágoras.'],
        [2, 'Dos triángulos son semejantes. Un lado de 4 cm corresponde a uno de 10 cm. ¿Qué lado corresponde a uno de 6 cm?', ['15 cm', '12 cm', '24 cm', '2,4 cm'], 'Razón 10/4 = 2,5; 6·2,5 = 15.', 'Encuentra la razón de semejanza.'],
        [1, '¿Cuál es el área de un círculo de radio 3?', ['9π', '6π', '3π', '36π'], 'πr² = 9π.', 'Área = πr².'],
        [2, 'Dos paralelas son cortadas por una transversal. Un ángulo conjugado interno mide 72°. ¿Cuánto mide el otro?', ['108°', '72°', '18°', '288°'], 'Los conjugados internos suman 180°.', 'Están del mismo lado de la transversal.'],
        [3, 'Un cuadrado tiene diagonal 6√2 cm. ¿Cuál es su área?', ['36 cm²', '72 cm²', '18 cm²', '12√2 cm²'], 'd = l√2 → l = 6; área = 36.', 'La diagonal de un cuadrado es lado·√2.']
      ]
    },
    {
      id: 'm8', title: 'Trigonometría', tags: ['EPN', 'USFQ'], prereq: ['m7', 'm2'], minutes: 60,
      objetivo: ['Usar seno, coseno y tangente en triángulos rectángulos', 'Aplicar identidades básicas', 'Usar las leyes de senos y cosenos'],
      teoria: `<p>En un triángulo rectángulo: <b>sen θ = opuesto/hipotenusa</b>, <b>cos θ = adyacente/hipotenusa</b>, <b>tan θ = opuesto/adyacente</b>.</p>
<p>Valores clave: sen 30° = 1/2, cos 60° = 1/2, sen 45° = cos 45° = √2/2, tan 45° = 1, sen 60° = cos 30° = √3/2.</p>
<p><b>Identidad fundamental:</b> sen²θ + cos²θ = 1. Además tan θ = sen θ / cos θ.</p>
<p><b>Radianes:</b> 180° = π rad.</p>
<p><b>Ley de senos:</b> a/sen A = b/sen B = c/sen C. <b>Ley de cosenos:</b> c² = a² + b² − 2ab·cos C.</p>`,
      ejemplo: `<p>Triángulo con a = 3, b = 5 y C = 60°. Hallar c.</p><ol><li>c² = 9 + 25 − 2·3·5·cos 60°</li><li>c² = 34 − 30·(1/2) = 19</li><li><b>c = √19</b></li></ol>`,
      errores: ['Confundir el cateto opuesto con el adyacente.', 'Usar la calculadora en radianes cuando el ángulo está en grados.', 'Usar Pitágoras en triángulos que no son rectángulos.'],
      preguntas: [
        [1, 'En un triángulo rectángulo, el cateto opuesto a θ mide 3 y la hipotenusa 5. ¿Cuánto vale sen θ?', ['3/5', '4/5', '3/4', '5/3'], 'sen = opuesto/hipotenusa.', 'SOH: seno = opuesto / hipotenusa.'],
        [1, '¿Cuánto vale cos 60°?', ['1/2', '√3/2', '√2/2', '1'], 'Valor notable.', 'Piensa en el triángulo equilátero partido a la mitad.'],
        [2, 'Si sen θ = 0,6 y θ está en el primer cuadrante, ¿cuánto vale cos θ?', ['0,8', '0,4', '0,36', '0,64'], 'cos²θ = 1 − 0,36 = 0,64 → cos θ = 0,8.', 'Usa sen² + cos² = 1.'],
        [1, '¿Cuánto vale tan 45°?', ['1', '√2/2', '0', '√3'], 'sen 45° = cos 45°.', 'tan = sen / cos.'],
        [2, 'Expresa 150° en radianes', ['5π/6', '3π/4', '5π/3', '2π/3'], '150·π/180 = 5π/6.', 'Multiplica por π/180.'],
        [3, 'En un triángulo, a = 8, A = 30° y B = 90°. ¿Cuánto mide b?', ['16', '4', '8√3', '4√3'], 'b = a·sen B/sen A = 8·1/(1/2) = 16.', 'Ley de senos.'],
        [3, 'En un triángulo, a = 3, b = 5 y C = 60°. ¿Cuánto mide c?', ['√19', '√34', '7', '4'], 'c² = 9 + 25 − 15 = 19.', 'Ley de cosenos.']
      ]
    },
    {
      id: 'm9', title: 'Rectas y circunferencias', tags: ['EPN'], prereq: ['m4', 'm7'], minutes: 55,
      objetivo: ['Calcular pendiente, distancia y punto medio', 'Escribir la ecuación de una recta', 'Identificar centro y radio de una circunferencia'],
      teoria: `<ul><li>Pendiente: m = (y₂ − y₁)/(x₂ − x₁)</li><li>Distancia: d = √((x₂ − x₁)² + (y₂ − y₁)²)</li>
<li>Punto medio: ((x₁ + x₂)/2, (y₁ + y₂)/2)</li><li>Recta punto-pendiente: y − y₁ = m(x − x₁)</li>
<li>Paralelas: misma pendiente. Perpendiculares: m₁·m₂ = −1.</li>
<li>Circunferencia: (x − h)² + (y − k)² = r², centro (h, k) y radio r. Si viene desarrollada, completa cuadrados.</li></ul>`,
      ejemplo: `<p>x² + y² − 4x + 6y − 3 = 0</p><ol><li>(x² − 4x + 4) + (y² + 6y + 9) = 3 + 4 + 9</li><li>(x − 2)² + (y + 3)² = 16</li><li>Centro <b>(2, −3)</b>, radio <b>4</b></li></ol>`,
      errores: ['Invertir la fórmula de pendiente (Δx/Δy).', 'Leer el centro con el signo equivocado: (x + 3) indica h = −3.', 'Olvidar sumar en ambos lados al completar cuadrados.'],
      preguntas: [
        [1, '¿Cuál es la pendiente de la recta que pasa por (1, 2) y (3, 8)?', ['3', '1/3', '6', '2'], '(8 − 2)/(3 − 1) = 3.', 'Δy / Δx.'],
        [1, '¿Cuál es la distancia entre (0, 0) y (3, 4)?', ['5', '7', '25', '1'], '√(9 + 16) = 5.', 'Pitágoras en el plano.'],
        [1, '¿Cuál es el punto medio entre (2, −4) y (6, 2)?', ['(4, −1)', '(8, −2)', '(2, 3)', '(4, −3)'], '((2+6)/2, (−4+2)/2).', 'Promedia coordenadas.'],
        [2, 'Ecuación de la recta con pendiente 2 que pasa por (1, 3):', ['y = 2x + 1', 'y = 2x + 3', 'y = 2x − 1', 'y = x + 2'], 'y − 3 = 2(x − 1) → y = 2x + 1.', 'Punto-pendiente.'],
        [2, '¿Qué pendiente tiene una recta perpendicular a y = −3x + 5?', ['1/3', '−3', '3', '−1/3'], 'm₁·m₂ = −1 → m₂ = 1/3.', 'Inverso y con signo contrario.'],
        [3, '¿Cuál es el centro y el radio de x² + y² − 4x + 6y − 3 = 0?', ['Centro (2, −3), r = 4', 'Centro (−2, 3), r = 4', 'Centro (2, −3), r = 16', 'Centro (4, −6), r = 3'], 'Completando cuadrados: (x − 2)² + (y + 3)² = 16.', 'Completa cuadrados en x y en y.']
      ]
    },
    {
      id: 'm10', title: 'Razones, proporciones y porcentajes', tags: ['USFQ', 'EPN'], prereq: ['m1'], minutes: 40,
      objetivo: ['Resolver reglas de tres directas e inversas', 'Calcular aumentos y descuentos', 'Interpretar escalas'],
      teoria: `<ul><li>x% de N = x·N/100.</li><li>Aumento del p%: multiplica por (1 + p/100). Descuento del p%: multiplica por (1 − p/100).</li>
<li>Porcentajes sucesivos se <b>multiplican</b>, no se suman.</li>
<li><b>Proporción directa:</b> si una magnitud crece, la otra crece igual (a/b = c/d).</li>
<li><b>Proporción inversa:</b> si una crece, la otra disminuye (a·b = c·d).</li>
<li>Repartir en razón a:b: divide el total en a + b partes iguales.</li></ul>`,
      ejemplo: `<p>Un precio sube 10% y luego baja 10%. Precio final = P·1,1·0,9 = 0,99P, o sea <b>baja 1%</b>, no queda igual.</p>`,
      errores: ['Sumar porcentajes sucesivos.', 'Usar regla de tres directa en una relación inversa (más obreros, menos días).', 'Olvidar convertir unidades en escalas.'],
      preguntas: [
        [1, '¿Cuánto es el 20% de 150?', ['30', '20', '7,5', '300'], '0,2·150 = 30.', 'Multiplica por 0,2.'],
        [1, 'Un artículo cuesta $80 y tiene 25% de descuento. ¿Cuál es el precio final?', ['$60', '$55', '$20', '$75'], '80·0,75 = 60.', 'Pagas el 75%.'],
        [2, 'Un precio sube 10% y luego baja 10%. Respecto al original:', ['Baja 1%', 'Queda igual', 'Sube 1%', 'Baja 10%'], '1,1·0,9 = 0,99.', 'Multiplica los factores.'],
        [2, '3 obreros hacen una obra en 12 días. ¿Cuántos días tardan 6 obreros al mismo ritmo?', ['6', '24', '9', '4'], 'Proporción inversa: 3·12 = 6·d → d = 6.', 'Más obreros, menos días.'],
        [1, 'Se reparten 40 caramelos en razón 2:3. ¿Cuántos recibe la parte mayor?', ['24', '16', '20', '30'], '40/5 = 8 por parte; 3·8 = 24.', 'Hay 5 partes en total.'],
        [2, 'En un mapa a escala 1:50 000, dos puntos están a 4 cm. ¿Qué distancia real hay?', ['2 km', '20 km', '200 m', '0,2 km'], '4·50 000 = 200 000 cm = 2 km.', '1 km = 100 000 cm.'],
        [3, 'Después de un aumento del 20%, un producto cuesta $36. ¿Cuánto costaba antes?', ['$30', '$28,80', '$43,20', '$32'], 'P·1,2 = 36 → P = 30.', 'No restes el 20% de 36.']
      ]
    }
  ]
});
