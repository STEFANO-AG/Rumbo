// Banco PAA · Razonamiento Matemático (ruta USFQ).
// Escrito el 27-11-2026 siguiendo la estructura de la Guía de Estudio de la Prueba de
// Aptitud publicada por la USFQ y la guía de la nueva PAA de College Board:
// selección múltiple con CINCO opciones y ejercicios de comparación cuantitativa con
// cuatro opciones fijas. No son preguntas oficiales copiadas.
//
// Formato igual a los demás bancos. Las preguntas de comparación llevan un sexto
// elemento { fixed: true, ans: n }: las opciones NO se barajan y n es la correcta (0 = A).
window.RUMBO_SUBJECTS = window.RUMBO_SUBJECTS || [];
(function () {
  const PAA = { src: 'Estilo guía PAA (USFQ / College Board)' };
  const CMP = ['La cantidad de la columna A es mayor', 'La cantidad de la columna B es mayor', 'Las dos cantidades son iguales', 'No se puede determinar con la información dada'];
  const cmp = (d, a, b, ans, s, h) => [d, 'Compara. Columna A: ' + a + ' · Columna B: ' + b, CMP, s, h, { fixed: true, ans, src: PAA.src }];

  window.RUMBO_SUBJECTS.push({
    id: 'paa', name: 'PAA Matemático', short: 'PAA', color: 'paa', weight: 0.2,
    tags: ['USFQ'],
    desc: 'Razonamiento Matemático de la Prueba de Aptitud Académica (40% del puntaje de admisión USFQ, junto con la parte verbal).',
    why: 'La PAA es el 40% de tu puntaje de admisión en la USFQ',
    topics: [
      {
        id: 'p1', title: 'Aritmética y porcentajes (PAA)', tags: ['USFQ'], prereq: ['m1', 'm10'], minutes: 35,
        objetivo: ['Resolver problemas de porcentajes y divisibilidad sin calculadora', 'Elegir el camino más corto'],
        teoria: `<p>La PAA no mide fórmulas difíciles: mide si <b>razonas rápido</b> con aritmética de colegio. Tienes poco más de un minuto por pregunta.</p>
<ul><li><b>Divisibilidad:</b> entre 3 o 9 si la suma de cifras lo es; entre 4 si las dos últimas cifras lo son; entre 5 si termina en 0 o 5. Para 36 = 4·9 se necesitan ambas.</li>
<li><b>"El a% de X es el b% de Y"</b>: escribe 0,a·X = 0,b·Y y despeja la razón.</li>
<li><b>Promedios:</b> suma = promedio × cantidad. Es la clave de casi todos los problemas de promedio.</li></ul>`,
        ejemplo: `<p>El promedio de 5 números es 12. Si se quita uno, el promedio de los otros 4 es 10. ¿Qué número se quitó?</p><ol><li>Suma de los 5: 60</li><li>Suma de los 4: 40</li><li>Se quitó <b>20</b></li></ol>`,
        errores: ['Promediar promedios en vez de trabajar con sumas.', 'Calcular el descuento sobre el precio final en lugar del original.', 'Hacer la cuenta larga cuando una propiedad la acorta.'],
        preguntas: [
          [2, 'El 40% de A es igual al 80% de B. ¿Qué porcentaje de A es B?', ['50%', '200%', '32%', '40%', '80%'], '0,4A = 0,8B → B = 0,5A, o sea el 50% de A.', 'Despeja B en función de A.', PAA],
          [2, '¿Cuál de estos números es divisible entre 36?', ['7524', '7254', '6426', '4518', '9342'], '36 = 4·9. 7524: las dos últimas cifras (24) son divisibles entre 4 y la suma de cifras es 18. Las demás fallan en la prueba del 4.', 'Usa las reglas del 4 y del 9.', PAA],
          [2, 'Tres cuadernos iguales cuestan $7,50 con impuesto incluido. El impuesto de cada cuaderno es $0,30. ¿Cuánto cuesta un cuaderno sin impuesto?', ['$2,20', '$2,50', '$2,80', '$7,20', '$2,40'], 'Cada uno cuesta 7,50/3 = 2,50 con impuesto; sin impuesto: 2,50 − 0,30 = 2,20.', 'Primero el precio de uno con impuesto.', PAA],
          [2, 'El promedio de 5 números es 12. Si se quita uno, el promedio de los otros es 10. ¿Qué número se quitó?', ['20', '2', '12', '10', '22'], '5·12 = 60 y 4·10 = 40. 60 − 40 = 20.', 'Trabaja con las sumas.', PAA],
          [1, 'Un artículo baja de $50 a $40. ¿Qué porcentaje de descuento se aplicó?', ['20%', '25%', '10%', '80%', '40%'], 'Bajó 10 sobre 50: 10/50 = 20%.', 'El porcentaje se calcula sobre el precio original.', PAA],
          [3, 'En un curso hay 40 estudiantes y la razón hombres:mujeres es 3:5. ¿Cuántos hombres más deben entrar para que haya igual número de hombres y mujeres?', ['10', '15', '25', '5', '8'], 'Hombres = 15, mujeres = 25. Faltan 10 hombres.', 'Reparte 40 en 8 partes.', PAA]
        ]
      },
      {
        id: 'p2', title: 'Álgebra y funciones (PAA)', tags: ['USFQ'], prereq: ['m3', 'm4'], minutes: 40,
        objetivo: ['Usar expresiones algebraicas sin despejar todo', 'Evaluar funciones', 'Trabajar con potencias y razones'],
        teoria: `<p>Muchas preguntas de álgebra de la PAA se resuelven <b>sin encontrar cada variable</b>. Si te dan 2a + b = 5 y te piden 4a + 2b, basta notar que 4a + 2b = 2(2a + b) = 10.</p>
<ul><li>Para ecuaciones con potencias, escribe todo con la misma base: 32 = 2⁵.</li>
<li>Razones encadenadas: a/c = (a/b)·(b/c).</li>
<li>Problemas con letras (D km en T horas): reemplaza por números fáciles para comprobar la opción.</li></ul>`,
        ejemplo: `<p>Si 4·4·4 = 2·2·P, ¿cuánto vale P?</p><ol><li>4·4·4 = 64 y 2·2 = 4</li><li>4P = 64 → <b>P = 16</b></li></ol>`,
        errores: ['Despejar cada variable cuando la expresión pedida ya es un múltiplo de la dada.', 'Confundir 2^(x+1) con 2^x + 1.', 'Invertir una razón.'],
        preguntas: [
          [1, 'Si 3x − y = 7, ¿cuánto vale 6x − 2y + 1?', ['15', '14', '8', '13', '21'], '6x − 2y = 2(3x − y) = 14; más 1 = 15.', 'No despejes: busca un múltiplo de 3x − y.', PAA],
          [2, 'Si 4·4·4 = 2·2·P, ¿cuánto vale P?', ['16', '8', '32', '4', '64'], '64 = 4P → P = 16.', 'Calcula cada lado.', PAA],
          [2, 'Un tren recorre D km en T horas. A la misma velocidad, ¿cuántas horas tarda en recorrer 3D km?', ['3T', 'T/3', '3D/T', 'D/(3T)', '4T'], 'Triple de distancia a la misma velocidad: triple de tiempo.', 'Prueba con D = 100 y T = 2.', PAA],
          [1, 'Si f(x) = x² − 3x, ¿cuánto vale f(−2)?', ['10', '−2', '−10', '2', '4'], '(−2)² − 3(−2) = 4 + 6 = 10.', 'Cuidado con los signos.', PAA],
          [2, 'Si a/b = 3/4 y b/c = 2/5, ¿cuánto vale a/c?', ['3/10', '15/8', '8/15', '5/6', '1/2'], 'a/c = (a/b)(b/c) = 6/20 = 3/10.', 'Multiplica las razones.', PAA],
          [2, 'Si 2^(x+1) = 32, ¿cuánto vale x?', ['4', '5', '16', '3', '31'], '32 = 2⁵ → x + 1 = 5 → x = 4.', 'Escribe 32 como potencia de 2.', PAA],
          [3, 'Si x es entero y 2 < 3x − 4 < 11, ¿cuántos valores puede tomar x?', ['2', '3', '4', '1', '5'], '6 < 3x < 15 → 2 < x < 5: x = 3 o 4.', 'Resuelve la doble desigualdad.', PAA]
        ]
      },
      {
        id: 'p3', title: 'Geometría (PAA)', tags: ['USFQ'], prereq: ['m7'], minutes: 35,
        objetivo: ['Calcular áreas y ángulos con figuras combinadas', 'Usar razones de ángulos en triángulos'],
        teoria: `<ul><li>Áreas sombreadas: área total menos la parte que no está sombreada.</li>
<li>Si los ángulos de un triángulo están en razón a:b:c, cada parte vale 180/(a + b + c).</li>
<li>Una recta que corta los ejes en (p, 0) y (0, q) forma con ellos un triángulo de área p·q/2.</li>
<li>Círculo inscrito en un cuadrado de lado L: su radio es L/2.</li></ul>`,
        ejemplo: `<p>Círculo inscrito en un cuadrado de lado 6. Área fuera del círculo: 36 − π·3² = <b>36 − 9π</b>.</p>`,
        errores: ['Usar el lado del cuadrado como radio del círculo inscrito.', 'Olvidar dividir entre 2 el área del triángulo.'],
        preguntas: [
          [2, 'Un rectángulo tiene perímetro 30 y su largo es el doble del ancho. ¿Cuál es su área?', ['50', '30', '45', '60', '25'], '2(2a + a) = 30 → a = 5, largo 10. Área 50.', 'Plantea el perímetro con el ancho a.', PAA],
          [2, 'Un círculo está inscrito en un cuadrado de lado 6. ¿Cuál es el área del cuadrado que queda fuera del círculo?', ['36 − 9π', '36 − 36π', '9π', '36 − 6π', '12 − 3π'], 'Radio 3: 36 − 9π.', 'El diámetro del círculo es el lado del cuadrado.', PAA],
          [1, 'Los ángulos de un triángulo están en razón 2:3:4. ¿Cuánto mide el mayor?', ['80°', '60°', '40°', '90°', '100°'], '180/9 = 20; 4·20 = 80°.', 'Divide 180° en 9 partes.', PAA],
          [2, 'Una recta pasa por (0, 2) y (4, 0). ¿Qué área tiene el triángulo que forma con los ejes?', ['4', '8', '6', '2', '16'], 'Catetos 4 y 2: área 4·2/2 = 4.', 'Es un triángulo rectángulo con catetos sobre los ejes.', PAA]
        ]
      },
      {
        id: 'p4', title: 'Probabilidad y estadística (PAA)', tags: ['USFQ'], prereq: ['m10'], minutes: 35,
        objetivo: ['Calcular probabilidades simples', 'Contar casos', 'Comparar media, mediana y moda'],
        teoria: `<ul><li><b>Probabilidad</b> = casos favorables / casos posibles.</li>
<li>Dos dados: 36 resultados posibles.</li>
<li><b>Principio de multiplicación:</b> si hay a formas de hacer una cosa y b de hacer otra, hay a·b formas de hacer ambas.</li>
<li><b>Media</b> = suma/cantidad. <b>Mediana</b> = el valor del centro de la lista ordenada. <b>Moda</b> = el valor más repetido. Un valor muy grande sube la media pero no la mediana.</li></ul>`,
        ejemplo: `<p>¿Probabilidad de que dos dados sumen 7? Casos: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 de 36 = <b>1/6</b>.</p>`,
        errores: ['Contar (3,4) y (4,3) como el mismo caso.', 'Calcular la mediana sin ordenar los datos.'],
        preguntas: [
          [1, 'En una bolsa hay 4 bolas rojas, 6 azules y 2 verdes. ¿Probabilidad de sacar una que NO sea azul?', ['1/2', '1/3', '1/6', '2/3', '1/4'], 'No azules: 6 de 12 = 1/2.', 'Cuenta rojas + verdes.', PAA],
          [2, 'Se lanzan dos dados. ¿Cuál es la probabilidad de que sumen 7?', ['1/6', '1/12', '7/36', '1/36', '1/3'], '6 casos favorables de 36.', 'Haz la lista de pares que suman 7.', PAA],
          [2, '¿Cuántos números de tres cifras distintas se pueden formar con los dígitos 1, 2, 3 y 4?', ['24', '64', '12', '4', '81'], '4·3·2 = 24.', 'Cifras distintas: no se repiten.', PAA],
          [2, 'Para los datos 3, 5, 5, 6, 11, ¿qué afirmación es correcta?', ['La media es mayor que la mediana', 'La mediana es mayor que la media', 'La moda es mayor que la media', 'Las tres medidas son iguales', 'La media es menor que la moda'], 'Media = 30/5 = 6; mediana = 5; moda = 5.', 'Calcula las tres.', PAA]
        ]
      },
      {
        id: 'p5', title: 'Comparación cuantitativa (PAA)', tags: ['USFQ'], prereq: ['m1', 'm2'], minutes: 30,
        objetivo: ['Decidir qué cantidad es mayor sin calcular todo', 'Detectar cuándo falta información'],
        teoria: `<p>En estos ejercicios se comparan dos cantidades (columna A y columna B). Las cuatro opciones son siempre las mismas: <b>A mayor</b>, <b>B mayor</b>, <b>iguales</b> o <b>no se puede determinar</b>.</p>
<ul><li>Si hay una variable, prueba varios valores: positivos, negativos, 0, fracciones entre 0 y 1. Si el resultado cambia, la respuesta es "no se puede determinar".</li>
<li>Muchas veces basta estimar: π ≈ 3,14.</li></ul>`,
        ejemplo: `<p>Columna A: x². Columna B: x, con x &gt; 0. Si x = 2, A es mayor; si x = 0,5, B es mayor. Respuesta: <b>no se puede determinar</b>.</p>`,
        errores: ['Probar un solo valor de la variable.', 'Olvidar que un número entre 0 y 1 se hace más pequeño al elevarlo al cuadrado.'],
        preguntas: [
          cmp(1, '(0,3)²', '0,3', 1, '(0,3)² = 0,09, que es menor que 0,3.', 'Elevar al cuadrado un número entre 0 y 1 lo achica.'),
          cmp(2, 'x², con x > 0', 'x, con x > 0', 3, 'Con x = 2 gana A; con x = 0,5 gana B.', 'Prueba un valor mayor que 1 y otro menor que 1.'),
          cmp(1, '25% de 80', '80% de 25', 2, 'Ambas son 20.', 'Calcula las dos.'),
          cmp(1, '(−2)³', '(−3)²', 1, '(−2)³ = −8 y (−3)² = 9.', 'Una potencia impar de un negativo es negativa.'),
          cmp(2, 'Suma de los ángulos interiores de un pentágono', '500°', 0, '(5 − 2)·180 = 540°.', '(n − 2)·180°.'),
          cmp(2, 'x, si 3x + 2 = 17', '5', 2, '3x = 15 → x = 5.', 'Resuelve la ecuación.'),
          cmp(3, 'Área de un círculo de radio 2', 'Área de un cuadrado de lado 3,5', 0, '4π ≈ 12,57 y 3,5² = 12,25.', 'Usa π ≈ 3,14.'),
          cmp(1, 'n + 1', 'n − 1', 0, 'Para cualquier n, n + 1 es 2 unidades mayor.', 'Resta las dos columnas.')
        ]
      }
    ]
  });
})();

// ---------------------------------------------------------------------------
// ENTREGA 1 (28-11-2026): razonamiento lógico-matemático y problemas clásicos.
// Estas preguntas tienen DATOS QUE CAMBIAN: en vez de un arreglo, son un objeto con
// una función gen(R) que inventa los números y calcula la respuesta. R.int(a, b) da un
// entero al azar entre a y b; R.pick(lista) elige un elemento. La primera opción que
// devuelve gen es la correcta (la app las baraja). Si gen devuelve null, la app vuelve
// a intentar con otros números.
// "tipo" es el nombre que aparece en el registro de errores.
// ---------------------------------------------------------------------------
(function () {
  const paa = window.RUMBO_SUBJECTS.find(x => x.id === 'paa');
  if (!paa) return;
  const OFI = 'Tipo frecuente · guía oficial EPN 2025-B';
  const CLA = 'Tipo frecuente en exámenes de ingreso';
  const NEW = 'Creado para Rumbo';

  paa.topics.push({
    id: 'p6', title: 'Razonamiento lógico-matemático', tags: ['USFQ', 'EPN'], prereq: ['m1'], minutes: 45,
    objetivo: ['Encontrar la regla de una serie numérica', 'Descubrir el patrón de una tabla', 'Aplicar operaciones definidas con símbolos nuevos'],
    teoria: `<p>Estas preguntas miden si descubres <b>reglas</b>, no si recuerdas fórmulas.</p>
<ul><li><b>Series:</b> calcula las diferencias entre términos seguidos. Si son iguales, es aritmética. Si no, mira si las diferencias forman su propia serie, o si cada término se multiplica por el mismo número (geométrica).</li>
<li><b>Tablas con patrón:</b> prueba la regla más simple con la primera fila (suma, resta, producto, doble de uno menos el otro) y comprueba con la segunda fila antes de usarla.</li>
<li><b>Operaciones definidas</b> (a ★ b = ...): solo reemplaza. Si hay paréntesis, resuelve primero la operación de adentro.</li></ul>`,
    ejemplo: `<p>Serie: 3, 5, 9, 15, 23, ?</p><ol><li>Diferencias: 2, 4, 6, 8</li><li>La siguiente diferencia es 10</li><li>Respuesta: 23 + 10 = <b>33</b></li></ol>`,
    errores: ['Suponer que toda serie es aritmética sin revisar las diferencias.', 'Comprobar la regla de la tabla con una sola fila.', 'Cambiar el orden de a y b en una operación definida.'],
    preguntas: [
      { d: 1, src: NEW, tipo: 'Serie aritmética', gen: R => {
        const a = R.int(2, 40), d = R.int(3, 12) * R.pick([1, 1, -1]);
        const t = [0, 1, 2, 3, 4].map(i => a + i * d), ans = a + 5 * d;
        return ['¿Qué número sigue? ' + t.join(', ') + ', ?', [ans, ans + d, ans - 1, ans + 1, t[4] - d].map(String),
          'Cada término ' + (d > 0 ? 'suma ' + d : 'resta ' + (-d)) + ': ' + t[4] + (d > 0 ? ' + ' + d : ' − ' + (-d)) + ' = ' + ans + '.', 'Calcula la diferencia entre dos términos seguidos.'];
      } },
      { d: 2, src: NEW, tipo: 'Serie geométrica', gen: R => {
        const a = R.int(1, 5), r = R.int(2, 4);
        const t = [0, 1, 2, 3].map(i => a * Math.pow(r, i)), ans = a * Math.pow(r, 4);
        return ['¿Qué número sigue? ' + t.join(', ') + ', ?', [ans, t[3] + (t[3] - t[2]), ans + r, ans - a, t[3] * (r + 1)].map(String),
          'Cada término se multiplica por ' + r + ': ' + t[3] + ' · ' + r + ' = ' + ans + '.', 'Divide un término entre el anterior.'];
      } },
      { d: 3, src: NEW, tipo: 'Serie con diferencias crecientes', gen: R => {
        const a = R.int(1, 20), k = R.int(1, 5), s = R.int(1, 3);
        const t = [a]; for (let i = 0; i < 4; i++) t.push(t[i] + k + i * s);
        const ans = t[4] + k + 4 * s;
        return ['¿Qué número sigue? ' + t.join(', ') + ', ?', [ans, t[4] + k + 3 * s, ans + s, ans + 1, t[4] + 2 * (k + 3 * s)].map(String),
          'Las diferencias son ' + [k, k + s, k + 2 * s, k + 3 * s].join(', ') + '; la siguiente es ' + (k + 4 * s) + '. ' + t[4] + ' + ' + (k + 4 * s) + ' = ' + ans + '.', 'Escribe las diferencias entre términos: forman otra serie.'];
      } },
      { d: 2, src: OFI, tipo: 'Operación definida', gen: R => {
        const m = R.int(2, 5), n = R.int(2, 5), x = R.int(2, 9), y = R.int(1, 9);
        const ans = m * x - n * y;
        return ['Se define a ★ b = ' + m + 'a − ' + n + 'b. ¿Cuánto vale ' + x + ' ★ ' + y + '?', [ans, m * y - n * x, m * x + n * y, ans + 1, ans - 1].map(String),
          m + '·' + x + ' − ' + n + '·' + y + ' = ' + (m * x) + ' − ' + (n * y) + ' = ' + ans + '.', 'Reemplaza a = ' + x + ' y b = ' + y + '; no cambies el orden.'];
      } },
      { d: 3, src: OFI, tipo: 'Operación definida anidada', gen: R => {
        const x = R.int(1, 6), y = R.int(1, 6), z = R.int(1, 5);
        const op = (a, b) => a * a - b;
        const inner = op(x, y), ans = op(inner, z);
        if (Math.abs(inner) > 30) return null;
        return ['Se define a ◆ b = a² − b. ¿Cuánto vale (' + x + ' ◆ ' + y + ') ◆ ' + z + '?', [ans, op(x, op(y, z)), inner - z, inner * inner, ans + 1].map(String),
          'Primero ' + x + ' ◆ ' + y + ' = ' + (x * x) + ' − ' + y + ' = ' + inner + '. Luego ' + inner + ' ◆ ' + z + ' = ' + (inner * inner) + ' − ' + z + ' = ' + ans + '.', 'Resuelve primero el paréntesis.'];
      } },
      { d: 2, src: OFI, tipo: 'Tabla con patrón', gen: R => {
        const rules = [
          { f: (a, b) => a - b, name: 'el tercero es el primero menos el segundo', inv: (a, c) => a - c },
          { f: (a, b) => a + b, name: 'el tercero es la suma de los dos primeros', inv: (a, c) => c - a },
          { f: (a, b) => 2 * a - b, name: 'el tercero es el doble del primero menos el segundo', inv: (a, c) => 2 * a - c }
        ];
        const r = R.pick(rules);
        const rows = [0, 1].map(() => { const a = R.int(6, 20), b = R.int(1, a - 1); return [a, b, r.f(a, b)]; });
        const a = R.int(6, 20), x = R.int(1, a - 1), c = r.f(a, x);
        if (r.inv(a, c) !== x) return null;
        return ['En cada fila, el tercer número se obtiene de los dos primeros con la misma regla. Fila 1: ' + rows[0].join(', ') + ' · Fila 2: ' + rows[1].join(', ') + ' · Fila 3: ' + a + ', X, ' + c + '. ¿Cuánto vale X?',
          [x, a + c, c, x + 1, Math.abs(a - 2 * c) || x + 2].map(String),
          'La regla es: ' + r.name + '. Con ' + a + ' y ' + c + ', X = ' + x + '.', 'Prueba suma, resta y "doble menos" con la fila 1 y comprueba con la fila 2.'];
      } }
    ]
  });

  paa.topics.push({
    id: 'p7', title: 'Problemas clásicos de examen', tags: ['USFQ', 'EPN'], prereq: ['m4', 'm10'], minutes: 50,
    objetivo: ['Resolver los tipos de problema verbal que más se repiten en exámenes de ingreso', 'Plantear la ecuación a partir del enunciado'],
    teoria: `<p>Algunos problemas aparecen una y otra vez con otros números. Si reconoces el tipo, ya sabes el planteamiento:</p><ul>
<li><b>Edades:</b> usa una variable para la edad de hoy; "dentro de n años" suma n a <b>ambas</b> edades.</li>
<li><b>Gallinas y conejos:</b> una ecuación para cabezas y otra para patas.</li>
<li><b>Trabajo conjunto:</b> suma lo que hace cada uno en 1 hora: 1/a + 1/b = 1/t.</li>
<li><b>Porcentajes sucesivos:</b> multiplica los factores, no sumes los porcentajes.</li>
<li><b>Promedios:</b> trabaja con la suma = promedio × cantidad.</li></ul>`,
    ejemplo: `<p>Un caño llena un tanque en 3 h y otro en 6 h. Juntos: 1/3 + 1/6 = 1/2 del tanque por hora, así que tardan <b>2 horas</b>.</p>`,
    errores: ['Sumar n años solo a una de las edades.', 'Promediar los tiempos en trabajo conjunto.', 'Sumar porcentajes sucesivos.'],
    preguntas: [
      { d: 3, src: CLA, tipo: 'Problema de edades', gen: R => {
        const k = R.int(3, 5), m = R.int(2, k - 1), c = R.int(4, 15);
        const n = c * (k - m) / (m - 1);
        if (!Number.isInteger(n) || n < 2 || n > 30) return null;
        const p = k * c;
        return ['Un padre tiene ' + k + ' veces la edad de su hijo. Dentro de ' + n + ' años tendrá ' + (m === 2 ? 'el doble' : m + ' veces la edad') + ' de su hijo. ¿Cuántos años tiene hoy el hijo?',
          [c, p, c + n, c * 2, c + 1].map(String),
          k + 'h + ' + n + ' = ' + m + '(h + ' + n + ') → h = ' + c + '. Comprobación: el padre tiene ' + p + '; dentro de ' + n + ' años, ' + (p + n) + ' y ' + (c + n) + '.', 'Suma ' + n + ' años a las dos edades.'];
      } },
      { d: 2, src: CLA, tipo: 'Gallinas y conejos', gen: R => {
        const g = R.int(5, 30), c = R.int(3, 25), H = g + c, P = 2 * g + 4 * c;
        return ['En una granja hay gallinas y conejos. En total hay ' + H + ' cabezas y ' + P + ' patas. ¿Cuántos conejos hay?',
          [c, g, c + 2, Math.max(1, c - 2), Math.round(P / 4)].map(String),
          'Si todos fueran gallinas habría ' + (2 * H) + ' patas; sobran ' + (P - 2 * H) + ', y cada conejo aporta 2 patas más: ' + (P - 2 * H) + ' / 2 = ' + c + '.', 'Plantea g + c = ' + H + ' y 2g + 4c = ' + P + '.'];
      } },
      { d: 2, src: CLA, tipo: 'Trabajo conjunto', gen: R => {
        const [a, b] = R.pick([[3, 6], [4, 12], [6, 12], [10, 15], [12, 24], [20, 30], [2, 6], [6, 3], [5, 20], [8, 24]]);
        const t = a * b / (a + b);
        return ['Un caño llena un tanque en ' + a + ' horas y otro lo llena en ' + b + ' horas. Si se abren los dos a la vez, ¿en cuántas horas se llena?',
          [t, (a + b) / 2, a + b, Math.abs(b - a), Math.min(a, b) / 2 === t ? Math.min(a, b) - 1 : Math.min(a, b) / 2].map(v => R.num(v) + ' h'),
          '1/' + a + ' + 1/' + b + ' = 1/' + R.num(t) + ' del tanque por hora; juntos tardan ' + R.num(t) + ' h.', 'Suma lo que llena cada caño en 1 hora.'];
      } },
      { d: 2, src: CLA, tipo: 'Porcentajes sucesivos', gen: R => {
        const P = R.pick([80, 100, 120, 200, 250, 400, 500]), x = R.pick([10, 20, 25, 50]), y = R.pick([10, 20, 25, 40]);
        const f = P * (1 + x / 100) * (1 - y / 100);
        return ['Un producto cuesta $' + P + '. Su precio sube ' + x + '% y luego baja ' + y + '%. ¿Cuál es el precio final?',
          [f, P * (1 + (x - y) / 100), P, P * (1 - y / 100), P * (1 + x / 100)].map(v => '$' + R.num(v, 2)),
          P + ' · ' + R.num(1 + x / 100) + ' · ' + R.num(1 - y / 100) + ' = ' + R.num(f, 2) + '.', 'Multiplica por (1 + ' + x + '/100) y luego por (1 − ' + y + '/100).'];
      } },
      { d: 2, src: CLA, tipo: 'Promedio con un dato quitado', gen: R => {
        const n = R.int(4, 8), A = R.int(8, 20), B = A + R.int(-4, 4);
        const out = n * A - (n - 1) * B;
        if (out <= 0 || B === A) return null;
        return ['El promedio de ' + n + ' números es ' + A + '. Si se quita uno de ellos, el promedio de los demás es ' + B + '. ¿Qué número se quitó?',
          [out, A - B, n * A, (n - 1) * B, Math.abs(A - B) * n].map(String),
          'Suma de los ' + n + ': ' + (n * A) + '. Suma de los ' + (n - 1) + ': ' + ((n - 1) * B) + '. Se quitó ' + (n * A) + ' − ' + ((n - 1) * B) + ' = ' + out + '.', 'Trabaja con las sumas, no con los promedios.'];
      } },
      { d: 3, src: OFI, tipo: 'Fracción de un total', gen: R => {
        const [p, q] = R.pick([[2, 5], [3, 5], [1, 4], [3, 4], [2, 7], [3, 8], [5, 8], [1, 3], [2, 3]]);
        const k = R.int(2, 12), total = q * k * R.pick([1, 2, 5]), rest = total - total * p / q;
        return ['De un rollo de tela se vende ' + p + '/' + q + ' y quedan ' + rest + ' metros. ¿Cuántos metros tenía el rollo?',
          [total, rest * q / p, rest + p, rest * p / q, rest * q].map(v => R.num(v, 1) + ' m'),
          'Queda ' + (q - p) + '/' + q + ' del rollo: (' + (q - p) + '/' + q + ')·L = ' + rest + ' → L = ' + total + ' m.', '¿Qué fracción del rollo queda?'];
      } }
    ]
  });
})();
