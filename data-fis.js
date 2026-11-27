// Banco de Física (temario EPN). Mismo formato que data-mat.js.
window.RUMBO_SUBJECTS = window.RUMBO_SUBJECTS || [];
window.RUMBO_SUBJECTS.push({
  id: 'fis', name: 'Física', short: 'FÍS', color: 'fis', weight: 0.2,
  tags: ['EPN'],
  desc: 'Mecánica newtoniana según el temario de admisión EPN (vale 20%).',
  topics: [
    {
      id: 'f1', title: 'Unidades y vectores', tags: ['EPN'], prereq: ['m2', 'm8'], minutes: 45,
      objetivo: ['Convertir unidades del SI', 'Distinguir escalares de vectores', 'Descomponer y sumar vectores'],
      teoria: `<p><b>Escalares</b> tienen solo magnitud (masa, tiempo, energía). <b>Vectores</b> tienen magnitud y dirección (desplazamiento, velocidad, aceleración, fuerza).</p>
<p><b>Conversiones útiles:</b> 1 km/h = 1000 m / 3600 s, así que para pasar de km/h a m/s se divide entre 3,6.</p>
<p><b>Componentes:</b> un vector de magnitud V a un ángulo θ del eje x tiene Vx = V·cos θ y Vy = V·sen θ.</p>
<p><b>Magnitud:</b> |V| = √(Vx² + Vy²). Vectores en la misma línea se suman o restan directamente; vectores perpendiculares se combinan con Pitágoras.</p>`,
      ejemplo: `<p>Una fuerza de 10 N forma 30° con la horizontal.</p><ol><li>Fx = 10·cos 30° ≈ 8,66 N</li><li>Fy = 10·sen 30° = <b>5 N</b></li></ol>`,
      errores: ['Multiplicar por 3,6 en lugar de dividir al pasar de km/h a m/s.', 'Sumar magnitudes de vectores perpendiculares directamente (6 + 8 ≠ 10).', 'Usar seno para la componente x cuando el ángulo se mide desde el eje x.'],
      preguntas: [
        [1, 'Convierte 72 km/h a m/s', ['20 m/s', '259,2 m/s', '7,2 m/s', '2 m/s'], '72 / 3,6 = 20.', 'Divide entre 3,6.'],
        [1, '¿Cuál de estas magnitudes es vectorial?', ['Velocidad', 'Masa', 'Tiempo', 'Energía'], 'La velocidad tiene dirección.', '¿Cuál necesita una dirección para describirse?'],
        [1, '¿Cuál es la magnitud del vector (3, 4)?', ['5', '7', '12', '1'], '√(9 + 16) = 5.', 'Pitágoras.'],
        [2, 'Dos fuerzas perpendiculares de 6 N y 8 N actúan sobre un cuerpo. ¿Cuál es la resultante?', ['10 N', '14 N', '2 N', '48 N'], '√(36 + 64) = 10 N.', 'Son perpendiculares.'],
        [1, 'Dos fuerzas de 5 N y 3 N actúan en la misma línea y en sentidos opuestos. ¿Resultante?', ['2 N', '8 N', '15 N', '√34 N'], '5 − 3 = 2 N.', 'Sentidos opuestos se restan.'],
        [2, 'Un vector de 10 unidades forma 30° con el eje x. ¿Cuál es su componente en y?', ['5', '8,66', '10', '3'], 'Vy = 10·sen 30° = 5.', 'Vy = V·sen θ.']
      ]
    },
    {
      id: 'f2', title: 'Movimiento rectilíneo y caída libre', tags: ['EPN'], prereq: ['f1', 'm4'], minutes: 60,
      objetivo: ['Distinguir distancia de desplazamiento', 'Resolver problemas de MRU y MRUV', 'Analizar caída libre y lanzamiento vertical'],
      teoria: `<p><b>MRU</b> (velocidad constante): d = v·t.</p>
<p><b>MRUV</b> (aceleración constante):</p><ul><li>v = v₀ + a·t</li><li>d = v₀·t + ½·a·t²</li><li>v² = v₀² + 2·a·d</li></ul>
<p><b>Caída libre:</b> es un MRUV con a = g ≈ 9,8 m/s² hacia abajo (en ejercicios se usa a veces g = 10 m/s²). En el punto más alto de un lanzamiento vertical, v = 0.</p>
<p><b>Distancia</b> es todo el camino recorrido (escalar). <b>Desplazamiento</b> es el vector del punto inicial al final.</p>`,
      ejemplo: `<p>Se lanza una piedra hacia arriba a 30 m/s (g = 10 m/s²).</p><ol><li>Tiempo de subida: 0 = 30 − 10t → t = 3 s</li><li>Altura máxima: h = 30·3 − ½·10·9 = <b>45 m</b></li></ol>`,
      errores: ['Olvidar que al frenar la aceleración es negativa.', 'Usar d = v·t cuando la velocidad cambia.', 'Pensar que en el punto más alto la aceleración es cero (lo que vale cero es la velocidad).'],
      preguntas: [
        [1, 'Un ciclista recorre 90 m en 15 s con velocidad constante. ¿Cuál es su rapidez?', ['6 m/s', '1350 m/s', '0,17 m/s', '75 m/s'], 'v = 90/15 = 6 m/s.', 'v = d/t.'],
        [1, 'Un auto parte del reposo con a = 2 m/s². ¿Qué velocidad tiene a los 5 s?', ['10 m/s', '25 m/s', '7 m/s', '2,5 m/s'], 'v = 0 + 2·5 = 10 m/s.', 'v = v₀ + a·t.'],
        [2, 'El mismo auto (reposo, a = 2 m/s²): ¿qué distancia recorre en 5 s?', ['25 m', '10 m', '50 m', '5 m'], 'd = ½·2·25 = 25 m.', 'd = v₀t + ½at².'],
        [2, 'Un auto a 20 m/s frena y se detiene en 4 s. ¿Cuál es su aceleración?', ['−5 m/s²', '5 m/s²', '−80 m/s²', '−0,2 m/s²'], 'a = (0 − 20)/4 = −5 m/s².', 'a = Δv / t.'],
        [2, 'Se deja caer un objeto desde el reposo (g = 10 m/s²). ¿Cuánto cae en 2 s?', ['20 m', '10 m', '40 m', '5 m'], 'h = ½·10·4 = 20 m.', 'h = ½gt².'],
        [3, 'Se lanza una piedra hacia arriba a 30 m/s (g = 10 m/s²). ¿Cuál es la altura máxima?', ['45 m', '90 m', '30 m', '15 m'], 'v² = v₀² − 2gh → h = 900/20 = 45 m.', 'En el punto más alto v = 0.'],
        [2, 'Una persona camina 3 m al este y luego 4 m al norte. ¿Cuál es la magnitud de su desplazamiento?', ['5 m', '7 m', '1 m', '12 m'], '√(9 + 16) = 5 m. La distancia recorrida sería 7 m.', 'Desplazamiento: del inicio al final en línea recta.']
      ]
    },
    {
      id: 'f3', title: 'Proyectiles y movimiento circular', tags: ['EPN'], prereq: ['f2'], minutes: 55,
      objetivo: ['Separar el movimiento de un proyectil en horizontal y vertical', 'Calcular tiempo de vuelo y alcance', 'Usar período, frecuencia y aceleración centrípeta'],
      teoria: `<p><b>Proyectil</b> (sin aire): el movimiento horizontal es MRU (vx constante) y el vertical es caída libre. Ambos comparten el mismo tiempo.</p>
<p>Lanzamiento horizontal desde altura h: t = √(2h/g); alcance x = vx·t.</p>
<p>En el punto más alto de un tiro oblicuo, la velocidad vertical es 0, pero la horizontal sigue.</p>
<p><b>Movimiento circular uniforme:</b> período T (tiempo de una vuelta), frecuencia f = 1/T, v = 2πr/T, aceleración centrípeta a = v²/r dirigida al centro.</p>`,
      ejemplo: `<p>Una pelota rueda de una mesa de 20 m de alto a 5 m/s (g = 10).</p><ol><li>t = √(2·20/10) = 2 s</li><li>Alcance = 5·2 = <b>10 m</b></li></ol>`,
      errores: ['Pensar que la velocidad horizontal disminuye durante el vuelo.', 'Creer que en el punto más alto la velocidad total es cero.', 'Confundir período con frecuencia.'],
      preguntas: [
        [1, 'Sin resistencia del aire, la velocidad horizontal de un proyectil:', ['Permanece constante', 'Aumenta', 'Disminuye', 'Es cero en el punto más alto'], 'En horizontal no actúa ninguna fuerza.', 'La gravedad solo actúa en vertical.'],
        [2, 'Se lanza una pelota horizontalmente desde 20 m de altura (g = 10 m/s²). ¿Cuánto tarda en caer?', ['2 s', '4 s', '1 s', '√2 s'], 't = √(2·20/10) = 2 s.', 'La caída vertical es como caída libre.'],
        [2, 'La pelota anterior sale a 5 m/s. ¿A qué distancia horizontal cae?', ['10 m', '5 m', '20 m', '2,5 m'], 'x = 5·2 = 10 m.', 'x = vx·t.'],
        [1, 'En el punto más alto de un tiro oblicuo, la componente vertical de la velocidad es:', ['Cero', 'Máxima', 'Igual a la horizontal', 'Igual a g'], 'Deja de subir y empieza a bajar.', 'Piensa en el instante en que deja de subir.'],
        [2, 'Un objeto gira a 4 m/s en un círculo de radio 2 m. ¿Cuál es su aceleración centrípeta?', ['8 m/s²', '2 m/s²', '16 m/s²', '32 m/s²'], 'a = v²/r = 16/2 = 8.', 'a = v²/r.'],
        [1, 'Una rueda tarda 2 s en dar una vuelta. ¿Cuál es su frecuencia?', ['0,5 Hz', '2 Hz', '4 Hz', '1 Hz'], 'f = 1/T = 1/2.', 'f = 1/T.']
      ]
    },
    {
      id: 'f4', title: 'Leyes de Newton, rozamiento y gravitación', tags: ['EPN'], prereq: ['f1', 'f2'], minutes: 60,
      objetivo: ['Aplicar las tres leyes de Newton', 'Dibujar diagramas de cuerpo libre', 'Calcular fricción y peso', 'Usar la ley de gravitación'],
      teoria: `<ol><li><b>Inercia:</b> si la fuerza neta es cero, el cuerpo sigue en reposo o con velocidad constante.</li>
<li><b>Segunda ley:</b> F<sub>neta</sub> = m·a.</li><li><b>Acción y reacción:</b> fuerzas iguales y opuestas, sobre cuerpos distintos.</li></ol>
<p><b>Peso:</b> P = m·g. <b>Normal</b> en superficie horizontal sin otras fuerzas verticales: N = m·g.</p>
<p><b>Rozamiento cinético:</b> f = μ·N, opuesto al movimiento.</p>
<p><b>Gravitación:</b> F = G·m₁·m₂ / d². Si la distancia se duplica, la fuerza queda en 1/4.</p>`,
      ejemplo: `<p>Empujas con 50 N un bloque de 10 kg; μ = 0,2; g = 10.</p><ol><li>N = 100 N, f = 0,2·100 = 20 N</li><li>F<sub>neta</sub> = 50 − 20 = 30 N</li><li>a = 30/10 = <b>3 m/s²</b></li></ol>`,
      errores: ['Usar la fuerza aplicada en lugar de la fuerza neta en F = ma.', 'Pensar que un cuerpo en movimiento necesita una fuerza neta para seguir moviéndose.', 'Creer que acción y reacción se anulan (actúan sobre cuerpos distintos).'],
      preguntas: [
        [1, '¿Qué fuerza neta se necesita para acelerar 10 kg a 3 m/s²?', ['30 N', '3,3 N', '13 N', '0,3 N'], 'F = 10·3 = 30 N.', 'F = m·a.'],
        [1, 'Si la fuerza neta sobre un cuerpo en movimiento es cero, el cuerpo:', ['Sigue con velocidad constante', 'Se detiene de inmediato', 'Acelera', 'Frena poco a poco'], 'Primera ley de Newton.', 'Ley de inercia.'],
        [1, '¿Cuánto pesa una masa de 5 kg (g = 9,8 m/s²)?', ['49 N', '5 N', '0,51 N', '14,8 N'], 'P = 5·9,8 = 49 N.', 'P = m·g.'],
        [2, 'Un bloque de 10 kg se desliza sobre un piso horizontal con μ = 0,2 (g = 10). ¿Cuál es la fricción?', ['20 N', '2 N', '50 N', '200 N'], 'f = 0,2·100 = 20 N.', 'f = μ·N y N = m·g.'],
        [3, 'Empujas con 50 N un bloque de 10 kg con fricción de 20 N. ¿Cuál es su aceleración?', ['3 m/s²', '5 m/s²', '7 m/s²', '2 m/s²'], '(50 − 20)/10 = 3.', 'Calcula primero la fuerza neta.'],
        [1, 'Empujas una pared con 100 N. La pared te empuja con:', ['100 N en sentido opuesto', '0 N', '100 N en tu mismo sentido', 'Menos de 100 N'], 'Tercera ley.', 'Acción y reacción.'],
        [2, 'Si la distancia entre dos masas se duplica, la fuerza gravitatoria entre ellas:', ['Se reduce a 1/4', 'Se reduce a 1/2', 'Se duplica', 'No cambia'], 'F ∝ 1/d²: 1/2² = 1/4.', 'La distancia está al cuadrado.']
      ]
    },
    {
      id: 'f5', title: 'Trabajo, energía y potencia', tags: ['EPN'], prereq: ['f4'], minutes: 55,
      objetivo: ['Calcular trabajo de una fuerza', 'Usar energía cinética y potencial', 'Aplicar conservación de la energía mecánica', 'Calcular potencia'],
      teoria: `<ul><li><b>Trabajo:</b> W = F·d·cos θ (θ entre fuerza y desplazamiento). Si la fuerza es perpendicular, W = 0.</li>
<li><b>Energía cinética:</b> Ec = ½·m·v²</li><li><b>Energía potencial gravitatoria:</b> Ep = m·g·h</li>
<li><b>Conservación</b> (sin fricción): Ec + Ep se mantiene constante. Al caer desde h desde el reposo: v = √(2gh).</li>
<li><b>Potencia:</b> P = W/t, en vatios (W = J/s).</li></ul>`,
      ejemplo: `<p>Se suelta una pelota desde 5 m (g = 10).</p><ol><li>m·g·h = ½·m·v²</li><li>v² = 2·10·5 = 100</li><li><b>v = 10 m/s</b> (no depende de la masa)</li></ol>`,
      errores: ['Olvidar elevar al cuadrado la velocidad en Ec.', 'Pensar que cargar una maleta caminando en horizontal hace trabajo (la fuerza es vertical).', 'Confundir energía (J) con potencia (W).'],
      preguntas: [
        [1, 'Una fuerza de 20 N mueve un objeto 5 m en su misma dirección. ¿Qué trabajo realiza?', ['100 J', '4 J', '25 J', '0 J'], 'W = 20·5 = 100 J.', 'W = F·d.'],
        [1, '¿Cuál es la energía cinética de 2 kg a 3 m/s?', ['9 J', '6 J', '18 J', '3 J'], '½·2·9 = 9 J.', 'Ec = ½mv².'],
        [1, '¿Cuál es la energía potencial de 3 kg a 10 m de altura (g = 10)?', ['300 J', '30 J', '13 J', '150 J'], '3·10·10 = 300 J.', 'Ep = mgh.'],
        [2, 'Se suelta un objeto desde 5 m (g = 10, sin aire). ¿Con qué rapidez llega al suelo?', ['10 m/s', '50 m/s', '5 m/s', '100 m/s'], 'v = √(2·10·5) = 10 m/s.', 'Conservación de energía.'],
        [1, 'Un motor hace 600 J de trabajo en 3 s. ¿Cuál es su potencia?', ['200 W', '1800 W', '600 W', '0,005 W'], 'P = 600/3 = 200 W.', 'P = W/t.'],
        [2, 'Una fuerza perpendicular al desplazamiento realiza un trabajo:', ['Nulo', 'Máximo', 'Negativo', 'Igual a F·d'], 'cos 90° = 0.', 'Mira el ángulo entre fuerza y desplazamiento.']
      ]
    },
    {
      id: 'f6', title: 'Momento lineal e impulso', tags: ['EPN'], prereq: ['f4'], minutes: 45,
      objetivo: ['Calcular cantidad de movimiento e impulso', 'Aplicar conservación del momento en choques y retrocesos'],
      teoria: `<ul><li><b>Cantidad de movimiento:</b> p = m·v (vector, en kg·m/s).</li>
<li><b>Impulso:</b> I = F·Δt = Δp.</li>
<li><b>Conservación:</b> si no hay fuerzas externas netas, la suma de momentos antes = después.</li>
<li><b>Choque perfectamente inelástico:</b> los cuerpos quedan unidos: m₁v₁ + m₂v₂ = (m₁ + m₂)·v.</li></ul>`,
      ejemplo: `<p>Un carrito de 2 kg a 6 m/s choca con otro de 1 kg en reposo y quedan unidos.</p><ol><li>Antes: 2·6 + 0 = 12 kg·m/s</li><li>Después: 3·v = 12</li><li><b>v = 4 m/s</b></li></ol>`,
      errores: ['Ignorar el signo (dirección) de las velocidades.', 'Sumar velocidades en lugar de momentos.', 'Confundir impulso con fuerza.'],
      preguntas: [
        [1, '¿Cuál es la cantidad de movimiento de 4 kg a 5 m/s?', ['20 kg·m/s', '9 kg·m/s', '50 kg·m/s', '0,8 kg·m/s'], 'p = 4·5 = 20.', 'p = m·v.'],
        [1, 'Una fuerza de 50 N actúa durante 0,2 s. ¿Qué impulso produce?', ['10 N·s', '250 N·s', '50,2 N·s', '0,004 N·s'], 'I = 50·0,2 = 10.', 'I = F·Δt.'],
        [2, 'Un carrito de 2 kg a 6 m/s choca con uno de 1 kg en reposo y quedan unidos. ¿Velocidad final?', ['4 m/s', '6 m/s', '3 m/s', '2 m/s'], '12 = 3·v → v = 4.', 'Conserva el momento total.'],
        [3, 'Un rifle de 4 kg dispara una bala de 0,01 kg a 400 m/s. ¿Con qué rapidez retrocede el rifle?', ['1 m/s', '4 m/s', '0,1 m/s', '10 m/s'], '0 = 0,01·400 − 4·v → v = 1 m/s.', 'Momento total inicial es cero.'],
        [1, 'El impulso que recibe un cuerpo es igual al cambio de su:', ['Cantidad de movimiento', 'Energía cinética', 'Masa', 'Aceleración'], 'I = Δp.', 'Teorema impulso-momento.']
      ]
    }
  ]
});
