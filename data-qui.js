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
