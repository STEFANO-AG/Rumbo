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
