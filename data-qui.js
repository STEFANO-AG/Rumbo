// Banco de Química (temario EPN). Mismo formato que data-mat.js.
window.RUMBO_SUBJECTS = window.RUMBO_SUBJECTS || [];
window.RUMBO_SUBJECTS.push({
  id: 'qui', name: 'Química', short: 'QUÍ', color: 'qui', weight: 0.2,
  tags: ['EPN'],
  desc: 'Química general según el temario de admisión EPN (vale 20%).',
  topics: [
    {
      id: 'q1', title: 'Materia, cambios y unidades', tags: ['EPN'], prereq: ['m1'], minutes: 40,
      objetivo: ['Clasificar la materia', 'Distinguir cambios físicos y químicos', 'Convertir unidades y calcular densidad'],
      teoria: `<p><b>Sustancias puras:</b> elementos (un tipo de átomo: O₂, Fe) y compuestos (elementos combinados en proporción fija: H₂O, NaCl).</p>
<p><b>Mezclas:</b> homogéneas (una sola fase: agua salada, aire, bronce) y heterogéneas (se distinguen las partes: granito, agua con aceite).</p>
<p><b>Cambio físico:</b> no cambia la sustancia (fusión, evaporación, disolver azúcar). <b>Cambio químico:</b> se forman sustancias nuevas (oxidación, combustión).</p>
<p><b>Densidad:</b> ρ = m/V. <b>Temperatura:</b> K = °C + 273.</p>`,
      ejemplo: `<p>Un objeto de 20 g ocupa 4 cm³. Densidad = 20/4 = <b>5 g/cm³</b>.</p>`,
      errores: ['Pensar que disolver sal es un cambio químico.', 'Clasificar el aire como compuesto (es mezcla).', 'Olvidar sumar 273 al pasar a kelvin.'],
      preguntas: [
        [1, '¿Cuál es una mezcla homogénea?', ['Agua salada', 'Granito', 'Arena con agua', 'Agua con aceite'], 'Tiene una sola fase visible.', 'Busca la que se ve uniforme.'],
        [1, '¿Cuál es un cambio químico?', ['La oxidación del hierro', 'La fusión del hielo', 'Disolver azúcar en agua', 'La evaporación del alcohol'], 'Se forma una sustancia nueva (óxido).', '¿En cuál aparece una sustancia nueva?'],
        [1, '¿Cuántos gramos son 2,5 kg?', ['2500 g', '250 g', '25 g', '0,0025 g'], '2,5·1000 = 2500.', '1 kg = 1000 g.'],
        [1, 'Un objeto de 20 g ocupa 4 cm³. ¿Cuál es su densidad?', ['5 g/cm³', '80 g/cm³', '0,2 g/cm³', '24 g/cm³'], 'ρ = 20/4.', 'ρ = m/V.'],
        [2, '¿Cuál de estas sustancias es un compuesto?', ['H₂O', 'Aire', 'O₂', 'Bronce'], 'El agua une H y O en proporción fija. O₂ es elemento; aire y bronce son mezclas.', 'Un compuesto tiene dos o más elementos combinados químicamente.'],
        [1, 'Expresa 25 °C en kelvin', ['298 K', '248 K', '25 K', '77 K'], '25 + 273 = 298.', 'K = °C + 273.']
      ]
    },
    {
      id: 'q2', title: 'Estructura atómica y configuración electrónica', tags: ['EPN'], prereq: ['q1'], minutes: 55,
      objetivo: ['Calcular protones, neutrones y electrones de átomos e iones', 'Escribir configuraciones electrónicas', 'Identificar electrones de valencia'],
      teoria: `<ul><li><b>Z</b> (número atómico) = protones. <b>A</b> (número másico) = protones + neutrones. Neutrones = A − Z.</li>
<li>Átomo neutro: electrones = Z. Catión X<sup>n+</sup>: perdió n electrones. Anión X<sup>n−</sup>: ganó n electrones.</li>
<li><b>Isótopos:</b> mismo Z, distinto número de neutrones.</li>
<li><b>Orden de llenado:</b> 1s 2s 2p 3s 3p 4s 3d 4p... (s admite 2 electrones, p admite 6, d admite 10).</li>
<li><b>Electrones de valencia:</b> los del último nivel.</li></ul>`,
      ejemplo: `<p>Cloro, Z = 17: 1s² 2s² 2p⁶ 3s² 3p⁵. Último nivel (3): 2 + 5 = <b>7 electrones de valencia</b>.</p>`,
      errores: ['Restar electrones en un anión en vez de sumarlos.', 'Pensar que los isótopos tienen distinto número de protones.', 'Llenar 3d antes que 4s.'],
      preguntas: [
        [1, 'El sodio tiene Z = 11 y A = 23. ¿Cuántos neutrones tiene?', ['12', '11', '23', '34'], '23 − 11 = 12.', 'Neutrones = A − Z.'],
        [2, '¿Cuántos electrones tiene el ion Cl⁻ (Z = 17)?', ['18', '17', '16', '35'], 'Ganó un electrón: 17 + 1.', 'Un anión gana electrones.'],
        [1, 'Los isótopos de un elemento se diferencian en su número de:', ['Neutrones', 'Protones', 'Electrones en el átomo neutro', 'Número atómico'], 'Mismo Z, distinto A.', 'El número de protones define al elemento.'],
        [2, '¿Cuál es la configuración electrónica del oxígeno (Z = 8)?', ['1s² 2s² 2p⁴', '1s² 2s² 2p⁶', '1s² 2p⁶', '1s² 2s⁴ 2p²'], '2 + 2 + 4 = 8.', 'El orbital s admite como máximo 2 electrones.'],
        [2, '¿Cuántos electrones tiene el ion Mg²⁺ (Z = 12)?', ['10', '12', '14', '2'], 'Perdió 2: 12 − 2 = 10.', 'Un catión pierde electrones.'],
        [3, '¿Cuántos electrones de valencia tiene el cloro (Z = 17)?', ['7', '5', '17', '1'], '3s² 3p⁵ → 7.', 'Escribe la configuración y mira el último nivel.']
      ]
    },
    {
      id: 'q3', title: 'Tabla periódica y propiedades periódicas', tags: ['EPN'], prereq: ['q2'], minutes: 45,
      objetivo: ['Ubicar elementos por su configuración', 'Predecir tendencias de radio, electronegatividad y energía de ionización'],
      teoria: `<p>Los <b>períodos</b> (filas) indican el nivel de energía más alto; los <b>grupos</b> (columnas) agrupan elementos con la misma valencia.</p>
<ul><li>Grupo 1: metales alcalinos. Grupo 2: alcalinotérreos. Grupo 17: halógenos. Grupo 18: gases nobles.</li>
<li><b>Radio atómico:</b> disminuye de izquierda a derecha y aumenta hacia abajo.</li>
<li><b>Electronegatividad y energía de ionización:</b> aumentan de izquierda a derecha y disminuyen hacia abajo. El flúor es el más electronegativo.</li></ul>`,
      ejemplo: `<p>Configuración terminada en 3p⁵: nivel 3 → <b>período 3</b>; 2 + 5 = 7 electrones de valencia → <b>grupo 17</b> (halógeno: cloro).</p>`,
      errores: ['Pensar que el radio crece hacia la derecha porque hay más electrones.', 'Confundir período con grupo.', 'Creer que los gases nobles son muy reactivos.'],
      preguntas: [
        [1, '¿Cuál es el elemento más electronegativo?', ['Flúor', 'Sodio', 'Oxígeno', 'Cesio'], 'El flúor está arriba a la derecha (sin gases nobles).', 'Arriba a la derecha.'],
        [2, 'En un período, de izquierda a derecha, el radio atómico:', ['Disminuye', 'Aumenta', 'No cambia', 'Primero aumenta y luego disminuye'], 'Más protones atraen más a los electrones del mismo nivel.', 'Aumenta la carga nuclear.'],
        [1, 'Los elementos del grupo 1 (excepto H) se llaman:', ['Metales alcalinos', 'Halógenos', 'Gases nobles', 'Alcalinotérreos'], 'Li, Na, K...', 'Na y K están en este grupo.'],
        [1, '¿Cuál de estos es un gas noble?', ['Argón', 'Nitrógeno', 'Cloro', 'Hidrógeno'], 'El argón está en el grupo 18.', 'Grupo 18.'],
        [2, 'En un grupo, de arriba hacia abajo, la energía de ionización:', ['Disminuye', 'Aumenta', 'No cambia', 'Es cero'], 'Los electrones están más lejos del núcleo y cuesta menos quitarlos.', 'Más niveles, electrones más lejanos.'],
        [3, 'Un elemento termina su configuración en 3p⁵. ¿Dónde está?', ['Período 3, grupo 17', 'Período 5, grupo 3', 'Período 3, grupo 15', 'Período 2, grupo 17'], 'Nivel 3 y 7 electrones de valencia.', 'El número del nivel es el período.']
      ]
    },
    {
      id: 'q4', title: 'Nomenclatura inorgánica', tags: ['EPN'], prereq: ['q3'], minutes: 60,
      objetivo: ['Nombrar óxidos, hidróxidos, ácidos y sales', 'Calcular números de oxidación'],
      teoria: `<ul><li><b>Óxidos:</b> elemento + oxígeno. Fe₂O₃: óxido de hierro (III) (stock) u óxido férrico (tradicional). CO₂: dióxido de carbono (sistemática).</li>
<li><b>Hidróxidos:</b> metal + OH. NaOH: hidróxido de sodio.</li>
<li><b>Ácidos oxácidos:</b> H + no metal + O. H₂SO₄: ácido sulfúrico; HNO₃: ácido nítrico.</li>
<li><b>Sales:</b> el sufijo cambia: -hídrico → -uro (HCl → NaCl, cloruro de sodio); -ico → -ato (HNO₃ → KNO₃, nitrato de potasio); -oso → -ito.</li>
<li><b>Números de oxidación:</b> O = −2, H = +1, y la suma en un compuesto neutro es 0.</li></ul>`,
      ejemplo: `<p>Número de oxidación del S en H₂SO₄: 2(+1) + x + 4(−2) = 0 → x = <b>+6</b>.</p>`,
      errores: ['Confundir sulfato (SO₄²⁻) con sulfito (SO₃²⁻).', 'Olvidar el número romano del metal con varias valencias.', 'No multiplicar el número de oxidación por los subíndices.'],
      preguntas: [
        [1, '¿Cómo se llama NaCl?', ['Cloruro de sodio', 'Clorato de sodio', 'Hipoclorito de sodio', 'Sodio clorhídrico'], 'Sal binaria derivada del ácido clorhídrico: -uro.', 'De -hídrico se pasa a -uro.'],
        [1, '¿Cómo se llama H₂SO₄?', ['Ácido sulfúrico', 'Ácido sulfuroso', 'Ácido sulfhídrico', 'Sulfato de hidrógeno (II)'], 'Oxácido del azufre con valencia +6.', 'Tiene 4 oxígenos.'],
        [2, '¿Cómo se llama Fe₂O₃?', ['Óxido de hierro (III)', 'Óxido de hierro (II)', 'Trióxido de hierro', 'Hidróxido férrico'], '2x + 3(−2) = 0 → x = +3.', 'Calcula el número de oxidación del hierro.'],
        [1, '¿Cómo se llama NaOH?', ['Hidróxido de sodio', 'Óxido de sodio', 'Hidruro de sodio', 'Ácido de sodio'], 'Metal + OH.', 'OH es el grupo hidroxilo.'],
        [2, '¿Cómo se llama KNO₃?', ['Nitrato de potasio', 'Nitrito de potasio', 'Nitruro de potasio', 'Ácido nítrico de potasio'], 'Deriva del ácido nítrico (-ico → -ato).', 'HNO₃ es ácido nítrico.'],
        [3, '¿Cuál es el número de oxidación del azufre en H₂SO₄?', ['+6', '+4', '−2', '+2'], '2(+1) + x + 4(−2) = 0 → x = +6.', 'La suma de números de oxidación es cero.']
      ]
    },
    {
      id: 'q5', title: 'Enlace químico y geometría molecular', tags: ['EPN'], prereq: ['q3'], minutes: 55,
      objetivo: ['Distinguir enlaces iónico y covalente', 'Dibujar estructuras de Lewis', 'Predecir geometría y fuerzas intermoleculares'],
      teoria: `<ul><li><b>Iónico:</b> metal + no metal, transferencia de electrones (NaCl).</li>
<li><b>Covalente:</b> entre no metales, se comparten electrones. Es <b>polar</b> si hay diferencia de electronegatividad (H₂O) y <b>apolar</b> si no (O₂).</li>
<li><b>Lewis:</b> se representan los electrones de valencia buscando completar el octeto.</li>
<li><b>Geometría (VSEPR):</b> 4 pares enlazantes → tetraédrica (CH₄); 2 enlaces sin pares libres → lineal (CO₂); 2 enlaces + 2 pares libres → angular (H₂O); 3 enlaces + 1 par libre → piramidal (NH₃).</li>
<li><b>Fuerzas intermoleculares:</b> puentes de hidrógeno (H unido a F, O o N) &gt; dipolo-dipolo &gt; fuerzas de London.</li></ul>`,
      ejemplo: `<p>NH₃: el N tiene 5 electrones de valencia, usa 3 en enlaces con H y le queda <b>1 par libre</b> → geometría piramidal.</p>`,
      errores: ['Pensar que H₂O es lineal (los pares libres la doblan).', 'Llamar iónico a cualquier enlace polar.', 'Confundir enlace (dentro de la molécula) con fuerza intermolecular (entre moléculas).'],
      preguntas: [
        [1, '¿Qué tipo de enlace tiene el NaCl?', ['Iónico', 'Covalente apolar', 'Covalente polar', 'Metálico'], 'Metal + no metal.', 'Na es metal y Cl no metal.'],
        [2, '¿Qué tipo de enlace hay entre O e H en el agua?', ['Covalente polar', 'Iónico', 'Covalente apolar', 'Metálico'], 'No metales con distinta electronegatividad.', 'Comparten electrones, pero no por igual.'],
        [1, '¿Qué geometría tiene el CH₄?', ['Tetraédrica', 'Lineal', 'Plana cuadrada', 'Angular'], '4 pares enlazantes.', 'Cuatro enlaces y ningún par libre.'],
        [2, '¿Qué geometría tiene el CO₂?', ['Lineal', 'Angular', 'Tetraédrica', 'Piramidal'], 'Dos dobles enlaces sin pares libres en el C.', 'O=C=O.'],
        [2, '¿Qué geometría tiene el H₂O?', ['Angular', 'Lineal', 'Tetraédrica', 'Plana trigonal'], '2 enlaces + 2 pares libres.', 'El oxígeno tiene dos pares libres.'],
        [2, '¿Cuál es la fuerza intermolecular más importante en el agua líquida?', ['Puentes de hidrógeno', 'Fuerzas de London', 'Enlace iónico', 'Enlace metálico'], 'H unido a O.', 'H unido a F, O o N.'],
        [3, '¿Cuántos pares de electrones libres tiene el N en el NH₃?', ['1', '0', '2', '3'], '5 de valencia − 3 usados en enlaces = 2 electrones = 1 par.', 'El N tiene 5 electrones de valencia.']
      ]
    },
    {
      id: 'q6', title: 'Mol, reacciones y estequiometría', tags: ['EPN'], prereq: ['q4', 'm10'], minutes: 60,
      objetivo: ['Calcular masa molar y moles', 'Balancear ecuaciones', 'Hacer cálculos estequiométricos con reactivo limitante', 'Obtener fórmulas empíricas'],
      teoria: `<ul><li><b>Mol:</b> 6,022 × 10²³ partículas (número de Avogadro).</li>
<li><b>Masa molar:</b> suma de masas atómicas (H = 1, C = 12, O = 16, Ca = 40). n = m / M.</li>
<li><b>Balancear:</b> el mismo número de átomos de cada elemento a cada lado; solo se cambian coeficientes, nunca subíndices.</li>
<li><b>Reactivo limitante:</b> el que se acaba primero según la proporción de la ecuación; determina cuánto producto se forma.</li>
<li><b>Fórmula empírica:</b> la proporción más simple de átomos (C₆H₁₂O₆ → CH₂O).</li></ul>`,
      ejemplo: `<p>2H₂ + O₂ → 2H₂O, con 4 mol de H₂ y 3 mol de O₂.</p><ol><li>4 mol H₂ necesitan 2 mol O₂ (hay 3, sobra 1).</li><li>El <b>limitante es H₂</b>.</li><li>Se forman 4 mol de H₂O.</li></ol>`,
      errores: ['Cambiar subíndices para balancear (H₂O → H₂O₂).', 'Elegir como limitante el reactivo con menos moles sin mirar la proporción.', 'Olvidar multiplicar la masa atómica por el subíndice.'],
      preguntas: [
        [1, '¿Cuál es la masa molar del H₂O? (H = 1, O = 16)', ['18 g/mol', '17 g/mol', '10 g/mol', '34 g/mol'], '2·1 + 16 = 18.', 'Suma las masas de todos los átomos.'],
        [2, '¿Cuántos moles hay en 88 g de CO₂? (C = 12, O = 16)', ['2 mol', '0,5 mol', '88 mol', '4 mol'], 'M = 44 g/mol; 88/44 = 2.', 'n = m / M.'],
        [1, '¿Cuántas moléculas hay en 1 mol de cualquier sustancia?', ['6,022 × 10²³', '6,022 × 10⁻²³', '1000', '22,4'], 'Número de Avogadro.', 'Constante de Avogadro.'],
        [2, 'Balancea: _H₂ + _O₂ → _H₂O', ['2, 1, 2', '1, 1, 1', '2, 2, 2', '1, 2, 1'], '4 H y 2 O a cada lado.', 'Empieza igualando los oxígenos.'],
        [2, '¿Cuántos gramos hay en 0,5 mol de CaCO₃? (M = 100 g/mol)', ['50 g', '200 g', '0,005 g', '100 g'], 'm = 0,5·100 = 50 g.', 'm = n·M.'],
        [3, 'En 2H₂ + O₂ → 2H₂O se mezclan 4 mol de H₂ y 3 mol de O₂. ¿Cuál es el reactivo limitante?', ['H₂', 'O₂', 'Ninguno', 'H₂O'], '4 mol H₂ requieren solo 2 mol O₂; sobra O₂.', 'Compara con la proporción 2:1.'],
        [2, '¿Cuál es la fórmula empírica de la glucosa, C₆H₁₂O₆?', ['CH₂O', 'C₂H₄O₂', 'CHO', 'C₆H₁₂O₆'], 'Dividiendo entre 6: CH₂O.', 'Divide todos los subíndices entre su máximo común divisor.']
      ]
    }
  ]
});

// ---------------------------------------------------------------------------
// NIVEL EXAMEN (agregado el 27-11-2026)
// Escritas siguiendo el temario oficial EPN 2026 y el tipo de preguntas de la guía
// oficial EPN 2025-B (unidades del SI, tabla periódica, estados de la materia, mezclas).
// ---------------------------------------------------------------------------
(function () {
  const EPN = { src: 'Estilo guía oficial EPN' };
  const add = {
    q1: [
      [1, '¿Cuál es una magnitud fundamental del Sistema Internacional?', ['Intensidad luminosa', 'Velocidad', 'Fuerza', 'Volumen'], 'Las 7 fundamentales son longitud, masa, tiempo, corriente eléctrica, temperatura, cantidad de sustancia e intensidad luminosa.', 'Las otras se obtienen combinando fundamentales.', EPN],
      [2, 'Convierte 0,05 toneladas a kilogramos', ['50 kg', '500 kg', '5 kg', '0,5 kg'], '1 t = 1000 kg; 0,05·1000 = 50 kg.', '1 tonelada = 1000 kg.', EPN],
      [3, 'Convierte una densidad de 3,2 g/cm³ a kg/m³', ['3200 kg/m³', '0,0032 kg/m³', '320 kg/m³', '32 000 kg/m³'], '3,2 g/cm³ · (1 kg/1000 g) · (10⁶ cm³/1 m³) = 3200 kg/m³.', '1 m³ = 1 000 000 cm³.', EPN],
      [1, 'Una mezcla heterogénea se caracteriza por:', ['Formar más de una fase', 'Tener composición fija', 'Ser un compuesto', 'Tener una sola fase'], 'En una mezcla heterogénea se distinguen sus partes (fases).', 'Piensa en agua con aceite.', EPN]
    ],
    q2: [
      [2, '¿Cuántos electrones desapareados tiene el nitrógeno (Z = 7)?', ['3', '1', '5', '0'], '1s² 2s² 2p³: los 3 electrones p ocupan orbitales distintos (regla de Hund).', 'Usa la regla de Hund en los orbitales 2p.', EPN],
      [3, 'El ion X²⁻ tiene 18 electrones y 16 neutrones. ¿Cuál es su número másico?', ['32', '34', '36', '18'], 'Ganó 2 electrones: Z = 16. A = 16 + 16 = 32.', 'Primero encuentra Z.', EPN],
      [3, '¿Cuál es la configuración del ion Fe²⁺ (Z = 26)?', ['[Ar] 3d⁶', '[Ar] 4s² 3d⁴', '[Ar] 4s² 3d⁶', '[Ar] 3d⁸'], 'Fe: [Ar] 4s² 3d⁶. Los metales de transición pierden primero los electrones 4s.', 'Se pierden primero los electrones del nivel más externo (4s).', EPN]
    ],
    q3: [
      [2, 'Ordena de menor a mayor radio atómico: Na, Mg, K', ['Mg < Na < K', 'K < Na < Mg', 'Na < Mg < K', 'Mg < K < Na'], 'En el período 3, Mg es menor que Na; K, un período abajo, es el mayor.', 'El radio baja hacia la derecha y sube hacia abajo.', EPN],
      [3, 'Un elemento tiene la configuración [Ar] 4s² 3d⁵. ¿Cuál es?', ['Manganeso', 'Hierro', 'Cromo', 'Vanadio'], '18 + 2 + 5 = 25 electrones: Z = 25, manganeso.', 'Suma los electrones para obtener Z.', EPN]
    ],
    q4: [
      [2, '¿Cuál es la fórmula del sulfato de aluminio?', ['Al₂(SO₄)₃', 'Al(SO₄)₃', 'Al₃(SO₄)₂', 'Al₂(SO₃)₃'], 'Al³⁺ y SO₄²⁻: se cruzan las cargas → Al₂(SO₄)₃.', 'Cruza las cargas de los iones.', EPN],
      [2, '¿Cómo se llama HClO?', ['Ácido hipocloroso', 'Ácido clórico', 'Ácido clorhídrico', 'Ácido perclórico'], 'El cloro actúa con +1, la menor valencia: hipo- -oso.', 'Calcula el número de oxidación del cloro.', EPN],
      [3, '¿Cuál es el número de oxidación del Mn en KMnO₄?', ['+7', '+6', '+4', '+2'], '+1 + x + 4(−2) = 0 → x = +7.', 'La suma debe dar cero.', EPN],
      [2, '¿Cómo se llama NaHCO₃?', ['Hidrogenocarbonato de sodio (bicarbonato de sodio)', 'Carbonato de sodio', 'Hidróxido de sodio y carbono', 'Carburo de sodio'], 'Es una sal ácida (cuaternaria) del ácido carbónico.', 'Tiene un H que queda del ácido.', EPN]
    ],
    q5: [
      [2, '¿Qué par de elementos forma el enlace más iónico?', ['K y F', 'C y O', 'N y H', 'Cl y Cl'], 'La mayor diferencia de electronegatividad está entre K (muy baja) y F (la más alta).', 'Busca la mayor diferencia de electronegatividad.', EPN],
      [3, '¿Cuál molécula es apolar aunque sus enlaces son polares?', ['CO₂', 'H₂O', 'NH₃', 'HCl'], 'El CO₂ es lineal y sus dos dipolos se anulan.', 'Mira la geometría de la molécula.', EPN],
      [2, '¿Cuál sustancia tiene el punto de ebullición más alto?', ['H₂O', 'H₂S', 'CH₄', 'O₂'], 'El agua forma puentes de hidrógeno.', '¿Cuál forma puentes de hidrógeno?', EPN],
      [2, '¿Qué geometría tiene el BF₃?', ['Trigonal plana', 'Piramidal', 'Tetraédrica', 'Angular'], 'El boro tiene 3 pares enlazantes y ningún par libre.', 'Cuenta pares enlazantes y libres del boro.', EPN]
    ],
    q6: [
      [3, 'Un compuesto tiene 40% de C, 6,7% de H y 53,3% de O. ¿Cuál es su fórmula empírica?', ['CH₂O', 'CHO', 'C₂H₄O', 'CH₄O'], 'En 100 g: C 40/12 = 3,33; H 6,7/1 = 6,7; O 53,3/16 = 3,33. Dividiendo entre 3,33: 1 : 2 : 1.', 'Pasa los porcentajes a moles y divide entre el menor.', EPN],
      [2, '¿Cuántos gramos de CO₂ se forman al quemar 16 g de CH₄? (CH₄ + 2O₂ → CO₂ + 2H₂O)', ['44 g', '16 g', '22 g', '88 g'], '16 g de CH₄ = 1 mol, que da 1 mol de CO₂ = 44 g.', 'Pasa a moles y usa la proporción 1:1.', EPN],
      [3, 'N₂ + 3H₂ → 2NH₃. Con 28 g de N₂ y 9 g de H₂, ¿cuántos gramos de NH₃ se forman?', ['34 g', '51 g', '37 g', '17 g'], '1 mol de N₂ necesita 3 mol de H₂ (hay 4,5): el limitante es N₂. Se forman 2 mol de NH₃ = 34 g.', 'Encuentra el reactivo limitante.', EPN],
      [3, '¿Cuántos átomos de oxígeno hay en 0,5 mol de H₂SO₄?', ['1,204 × 10²⁴', '3,011 × 10²³', '6,022 × 10²³', '2,408 × 10²⁴'], '0,5 mol · 4 = 2 mol de O = 2·6,022 × 10²³.', 'Cada molécula tiene 4 átomos de oxígeno.', EPN]
    ]
  };
  const s = window.RUMBO_SUBJECTS.find(x => x.id === 'qui');
  Object.keys(add).forEach(id => s.topics.find(t => t.id === id).preguntas.push(...add[id]));
})();
