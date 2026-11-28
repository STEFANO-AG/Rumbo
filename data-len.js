// Banco de Verbal y Lenguaje (rutas EPN y USFQ). Entrega 1, 28-11-2026.
// Sirve para Lenguaje de la EPN (temario oficial 2026: comunicación, pensamiento lógico,
// comprensión de textos, lectura crítica, párrafo, argumentación, falacias, puntuación y
// concordancia) y para Razonamiento Verbal y Redacción de la PAA (guía de la USFQ:
// completar oraciones, lectura crítica, analogías, corrección de oraciones).
//
// Todas las lecturas y preguntas son originales, escritas para Rumbo.
// Formato igual a los demás bancos. Las preguntas de lectura llevan { lectura: 'id' }
// en el sexto elemento, y el texto está en "lecturas" del mismo tema.
// Las preguntas estilo PAA tienen 5 opciones; las estilo EPN, 4.
window.RUMBO_SUBJECTS = window.RUMBO_SUBJECTS || [];
(function () {
  const EPN = { src: 'Temario oficial EPN 2026 · Lenguaje' };
  const PAA = { src: 'Estilo guía PAA (USFQ / College Board)' };
  const L = (id, src) => ({ lectura: id, src: src || 'Lectura crítica (EPN y PAA)' });

  window.RUMBO_SUBJECTS.push({
    id: 'len', name: 'Verbal y Lenguaje', short: 'LEN', color: 'len', weight: 0.2,
    tags: ['EPN', 'USFQ'],
    desc: 'Lenguaje de la EPN (vale 20%) y Razonamiento Verbal y Redacción de la PAA (la mitad de tu nota PAA en la USFQ).',
    why: 'Lenguaje vale 20% en la EPN y lo verbal es la mitad de la PAA',
    topics: [
      {
        id: 'v1', title: 'Comprensión lectora y lectura crítica', tags: ['EPN', 'USFQ'], prereq: [], minutes: 50,
        objetivo: ['Identificar la idea principal y el propósito de un texto', 'Hacer inferencias justificadas', 'Interpretar palabras según el contexto'],
        teoria: `<p>Casi todas las preguntas de lectura son de uno de estos tipos:</p><ul>
<li><b>Idea principal:</b> lo que el texto completo quiere decir. Desconfía de las opciones que solo resumen un párrafo o que exageran.</li>
<li><b>Dato explícito:</b> la respuesta está escrita en el texto, quizá con otras palabras.</li>
<li><b>Inferencia:</b> algo que no se dice, pero que se deduce con seguridad de lo que sí se dice. Si necesitas inventar información, no es una inferencia válida.</li>
<li><b>Propósito y tono:</b> para qué escribió el autor (informar, convencer, criticar, narrar) y con qué actitud.</li>
<li><b>Vocabulario en contexto:</b> qué significa una palabra en esa oración, no en el diccionario en general.</li></ul>
<p><b>Método:</b> lee primero la pregunta, luego el texto buscando la parte que la responde, y elimina opciones que el texto contradice, que son demasiado amplias o que dicen "siempre" o "nunca" sin apoyo.</p>`,
        ejemplo: `<p>Texto: "Aunque la ciudad tiene más buses que hace diez años, el tiempo promedio de viaje aumentó."</p>
<p>¿Qué se puede <b>inferir</b>? Que tener más buses <b>no bastó</b> para reducir el tiempo de viaje. No se puede inferir que los buses sean la causa del aumento: el texto no lo dice.</p>`,
        errores: ['Elegir una opción verdadera en la vida real pero que el texto no menciona.', 'Confundir un detalle con la idea principal.', 'Aceptar opciones con palabras absolutas (siempre, nunca, todos) sin apoyo en el texto.'],
        lecturas: {
          L1: { titulo: 'El sueño y la memoria', texto: `Durante mucho tiempo se pensó que dormir era simplemente un estado de descanso en el que el cerebro se "apagaba". Hoy sabemos que no es así. Mientras dormimos, el cerebro repasa lo que vivimos durante el día y decide qué conservar. Diversos experimentos muestran que las personas que duermen después de aprender una lista de palabras la recuerdan mejor que quienes permanecen despiertas el mismo número de horas.

Esto no significa que basta con dormir para aprender. El sueño consolida lo que se estudió con atención; no puede fijar lo que nunca se comprendió. Por eso, quien pasa la noche en vela antes de un examen hace un mal negocio: gana unas horas de lectura, pero pierde el proceso que convierte esa lectura en recuerdo duradero.

La conclusión práctica es modesta, pero sólida: estudiar en sesiones repartidas a lo largo de varios días, con noches de sueño entre ellas, rinde más que concentrar todo el esfuerzo en una sola jornada.` },
          L2: { titulo: 'Los páramos, fábricas de agua', texto: `Los páramos son ecosistemas de alta montaña que se extienden por encima de los 3000 metros en los Andes del norte. A simple vista parecen pajonales fríos y poco productivos, pero cumplen una función decisiva: sus suelos, ricos en materia orgánica, funcionan como una esponja que absorbe la lluvia y la neblina y la libera lentamente durante meses. Gran parte del agua que consumen ciudades como Quito proviene de estas zonas.

Cuando un páramo se quema, se ara para sembrar o se reemplaza por plantaciones de pinos, el suelo pierde esa capacidad. El agua ya no se guarda: corre rápidamente cuesta abajo en la temporada de lluvias y falta en la temporada seca. El daño, además, es lento de reparar, porque esos suelos tardaron miles de años en formarse.

Por eso, proteger el páramo no es un lujo de ambientalistas, sino una inversión directa en el abastecimiento de agua de millones de personas.` },
          L3: { titulo: '¿Calculadora en clase?', texto: `Cada cierto tiempo vuelve la discusión sobre si los estudiantes deben usar calculadora en clase de matemáticas. Quienes se oponen afirman que la máquina vuelve perezosa la mente. Quienes la defienden responden que nadie pide hoy dividir números de diez cifras a mano.

Ambos bandos tienen parte de razón, pero discuten sobre la herramienta cuando deberían discutir sobre el momento. Un estudiante que todavía no entiende qué significa multiplicar no gana nada pulsando teclas: obtiene un número que no sabe interpretar. En cambio, quien ya domina el procedimiento puede usar la calculadora para dedicar su tiempo a lo verdaderamente difícil: plantear el problema y juzgar si el resultado tiene sentido.

La pregunta correcta, entonces, no es "¿calculadora sí o no?", sino "¿calculadora para qué y cuándo?".` }
        },
        preguntas: [
          [2, '¿Cuál es la idea principal del texto?', ['El sueño ayuda a consolidar lo aprendido, por lo que conviene repartir el estudio en varios días', 'Durante el sueño el cerebro se apaga y descansa', 'Basta con dormir bien para aprender cualquier tema', 'Las listas de palabras son la mejor forma de estudiar'], 'El texto explica que el sueño consolida lo estudiado y concluye que conviene estudiar repartido en varios días.', 'Busca la conclusión del último párrafo.', L('L1')],
          [2, 'Según el texto, ¿por qué es un "mal negocio" no dormir antes de un examen?', ['Porque se pierde el proceso que convierte lo leído en recuerdo duradero', 'Porque se lee más lento de noche', 'Porque el examen se vuelve más difícil', 'Porque dormir reemplaza la necesidad de estudiar'], 'El segundo párrafo lo dice: se ganan horas de lectura, pero se pierde la consolidación.', 'Está escrito en el segundo párrafo.', L('L1')],
          [3, '¿Cuál afirmación contradice lo que dice el texto?', ['Dormir permite recordar temas que nunca se entendieron', 'El cerebro trabaja mientras dormimos', 'Estudiar repartido rinde más que estudiar todo en un día', 'Los experimentos comparan a quienes duermen con quienes no'], 'El texto dice que el sueño "no puede fijar lo que nunca se comprendió".', 'Busca la opción que el texto niega expresamente.', L('L1')],
          [2, 'En el texto, la palabra "consolida" significa:', ['Afianza o vuelve estable', 'Olvida', 'Compara', 'Reduce'], 'El sueño vuelve estable, duradero, lo estudiado.', 'Reemplaza la palabra en la oración y mira cuál conserva el sentido.', L('L1')],
          [2, 'Según el texto, ¿por qué se dice que los páramos son "fábricas de agua"?', ['Porque sus suelos guardan el agua de lluvia y neblina y la liberan lentamente', 'Porque producen lluvia por sí mismos', 'Porque en ellos hay grandes lagos', 'Porque allí se construyen represas'], 'El primer párrafo describe los suelos como una esponja que absorbe y libera agua.', 'Busca la comparación con una esponja.', L('L2')],
          [3, '¿Qué se puede inferir del segundo párrafo?', ['Dañar un páramo puede causar escasez de agua en la temporada seca', 'Los pinos son la mejor forma de proteger el páramo', 'Los páramos se recuperan en pocos años', 'La temporada de lluvias desaparece si se quema un páramo'], 'Si el suelo ya no guarda agua, falta en la temporada seca. Las otras opciones contradicen el texto o no se apoyan en él.', 'Relaciona "pierde esa capacidad" con lo que pasa en la temporada seca.', L('L2')],
          [2, '¿Cuál es el propósito principal del autor?', ['Convencer de que proteger el páramo es necesario para el abastecimiento de agua', 'Describir la flora de los Andes', 'Narrar la historia de Quito', 'Criticar a los ambientalistas'], 'La última oración resume la tesis: protegerlo es una inversión en agua.', 'Mira la última oración.', L('L2')],
          [3, 'Según el autor, ¿cuál es el error de ambos bandos en la discusión?', ['Discuten sobre la herramienta en lugar de sobre el momento en que conviene usarla', 'Ninguno conoce las calculadoras modernas', 'Ambos quieren prohibir la calculadora', 'Ninguno tiene razón en nada'], 'El autor dice que "discuten sobre la herramienta cuando deberían discutir sobre el momento".', 'Lee la primera oración del segundo párrafo.', L('L3')],
          [3, '¿Con cuál afirmación estaría de acuerdo el autor?', ['Primero hay que entender el procedimiento y luego usar la calculadora', 'La calculadora debe prohibirse siempre', 'La calculadora debe usarse desde el primer día', 'Plantear un problema es más fácil que calcular'], 'Según el autor, quien ya domina el procedimiento puede usarla para lo difícil.', 'El autor no está ni a favor ni en contra en todos los casos.', L('L3')],
          [2, '¿Cuál es el tono del texto?', ['Reflexivo y conciliador', 'Indignado y agresivo', 'Humorístico', 'Triste'], 'El autor reconoce razón en ambos bandos y propone una mejor pregunta.', '¿Ataca a alguien o busca un punto medio?', L('L3')]
        ]
      },
      {
        id: 'v2', title: 'Completar oraciones', tags: ['USFQ', 'EPN'], prereq: [], minutes: 35,
        objetivo: ['Elegir palabras que completan una oración con coherencia', 'Reconocer pistas de contraste, causa y continuidad'],
        teoria: `<p>Antes de mirar las opciones, busca las <b>pistas</b> de la oración:</p><ul>
<li><b>Contraste</b> (aunque, pero, sin embargo, a pesar de): los espacios tienen sentidos opuestos.</li>
<li><b>Continuidad o causa</b> (y, además, por eso, porque, ya que): los espacios van en la misma dirección.</li>
<li>Con <b>dos espacios</b>, la opción correcta debe funcionar en ambos. Basta que una palabra falle para descartarla.</li></ul>
<p>Truco: completa la oración con tus propias palabras y luego busca la opción más parecida.</p>`,
        ejemplo: `<p>"Aunque el equipo era ______, logró ______ al campeón."</p><p>"Aunque" indica contraste: el equipo era débil y aun así logró algo positivo. Respuesta: <b>modesto … vencer</b>.</p>`,
        errores: ['Elegir una palabra que suena bien sin revisar el conector.', 'Revisar solo el primer espacio.'],
        preguntas: [
          [1, 'Aunque el equipo era ______, logró ______ al campeón del torneo.', ['modesto … vencer', 'poderoso … vencer', 'modesto … aplaudir', 'débil … perder ante', 'famoso … felicitar'], '"Aunque" exige contraste: un equipo modesto que, sin embargo, vence.', 'Busca la oposición que marca "aunque".', PAA],
          [2, 'La investigadora fue muy ______: revisó cada dato tres veces antes de publicar.', ['meticulosa', 'descuidada', 'impaciente', 'generosa', 'optimista'], 'Revisar tres veces muestra cuidado extremo: meticulosa.', 'Los dos puntos anuncian una explicación.', PAA],
          [2, 'El acuerdo, lejos de ______ el conflicto, lo ______ aún más.', ['resolver … agravó', 'resolver … calmó', 'iniciar … terminó', 'agravar … empeoró', 'ignorar … resolvió'], '"Lejos de" indica que pasó lo contrario de lo esperado: en vez de resolver, agravó.', '"Lejos de" anuncia un resultado opuesto.', PAA],
          [2, 'Sus explicaciones eran tan ______ que hasta los temas más difíciles parecían sencillos.', ['claras', 'confusas', 'breves', 'largas', 'antiguas'], 'Si los temas parecían sencillos, las explicaciones eran claras.', '"Tan... que" muestra causa y consecuencia.', PAA],
          [3, 'El escritor era conocido por su estilo ______: decía en una línea lo que otros decían en una página.', ['conciso', 'redundante', 'ambiguo', 'florido', 'improvisado'], 'Decir mucho en pocas palabras es ser conciso.', 'Los dos puntos explican el adjetivo.', PAA],
          [2, 'La medida fue ______ por los vecinos, que se reunieron en la plaza para expresar su ______.', ['rechazada … descontento', 'aplaudida … descontento', 'rechazada … alegría', 'ignorada … apoyo', 'aprobada … protesta'], 'Si expresan descontento, la medida fue rechazada. Ambas palabras deben coincidir.', 'Las dos palabras van en la misma dirección.', PAA],
          [3, 'Pese a su apariencia ______, el anciano demostró una ______ sorprendente al subir la montaña.', ['frágil … resistencia', 'robusta … resistencia', 'frágil … debilidad', 'cansada … lentitud', 'juvenil … agilidad'], '"Pese a" marca contraste: parecía frágil, pero mostró resistencia.', 'Busca contraste entre apariencia y hecho.', PAA],
          [1, 'Como no había estudiado, su respuesta fue ______ y no convenció al profesor.', ['vaga', 'precisa', 'brillante', 'exhaustiva', 'rigurosa'], 'Sin estudiar, la respuesta fue imprecisa: vaga.', '"Como" indica causa.', PAA]
        ]
      },
      {
        id: 'v3', title: 'Analogías', tags: ['USFQ'], prereq: [], minutes: 30,
        objetivo: ['Identificar la relación entre dos palabras', 'Encontrar otro par con la misma relación'],
        teoria: `<p>Una analogía tiene la forma <b>A es a B como C es a D</b>. Lo importante no es el tema de las palabras, sino la <b>relación</b> entre ellas.</p>
<p><b>Método:</b> escribe una oración que una A con B ("un pincel es la herramienta del pintor") y prueba esa misma oración con cada opción.</p>
<p>Relaciones frecuentes: herramienta-oficio, parte-todo, causa-efecto, sinónimos, antónimos, grado (tibio-caliente), producto-productor, lugar-actividad.</p>`,
        ejemplo: `<p>PINCEL : PINTOR :: ?</p><p>Oración: "el pincel es la herramienta del pintor". La opción <b>bisturí : cirujano</b> cumple la misma oración.</p>`,
        errores: ['Elegir un par del mismo tema pero con otra relación.', 'Invertir el orden de la relación (pintor : pincel no es lo mismo).'],
        preguntas: [
          [1, 'PINCEL : PINTOR :: ?', ['bisturí : cirujano', 'cuadro : museo', 'color : arcoíris', 'libro : lector', 'escenario : actor'], 'Herramienta : persona que la usa en su oficio.', 'El pincel es la herramienta del pintor.', PAA],
          [1, 'PÁGINA : LIBRO :: ?', ['ladrillo : muro', 'lápiz : papel', 'agua : río', 'mesa : silla', 'tinta : pluma'], 'Parte : todo formado por muchas de esas partes.', 'Muchas páginas forman un libro.', PAA],
          [2, 'SEQUÍA : HAMBRUNA :: ?', ['incendio : ceniza', 'lluvia : nube', 'médico : enfermedad', 'frío : invierno', 'semilla : sembrar'], 'Causa : efecto. El incendio produce ceniza.', '¿Cuál es la consecuencia de la primera?', PAA],
          [2, 'TIBIO : HIRVIENTE :: ?', ['llovizna : aguacero', 'frío : calor', 'grande : pequeño', 'agua : vapor', 'sol : luna'], 'Mismo fenómeno en grado menor : grado extremo.', 'Es una relación de intensidad.', PAA],
          [2, 'ABEJA : MIEL :: ?', ['vaca : leche', 'perro : hueso', 'pez : agua', 'pájaro : nido', 'gato : ratón'], 'Animal : producto que produce.', 'La abeja produce miel.', PAA],
          [3, 'GENEROSO : TACAÑO :: ?', ['valiente : cobarde', 'alto : grande', 'rápido : veloz', 'feliz : contento', 'triste : llorar'], 'Antónimos (cualidades opuestas).', 'Son opuestos.', PAA],
          [3, 'BIBLIOTECA : LEER :: ?', ['gimnasio : entrenar', 'cocina : cuchillo', 'escuela : maestro', 'hospital : enfermedad', 'cine : pantalla'], 'Lugar : actividad que se realiza allí.', 'En la biblioteca se lee.', PAA],
          [3, 'IMPRUDENCIA : ACCIDENTE :: ?', ['negligencia : error', 'cuidado : peligro', 'estudio : examen', 'silencio : ruido', 'viaje : maleta'], 'Una conducta : la consecuencia negativa que suele provocar.', 'La imprudencia causa accidentes.', PAA]
        ]
      },
      {
        id: 'v4', title: 'Razonamiento lógico-verbal y falacias', tags: ['EPN', 'USFQ'], prereq: [], minutes: 50,
        objetivo: ['Distinguir premisas de conclusiones', 'Evaluar si una conclusión se sigue de las premisas', 'Reconocer falacias frecuentes', 'Identificar supuestos no dichos'],
        teoria: `<p>Un <b>argumento</b> tiene premisas (razones) y una conclusión. Es <b>válido</b> si la conclusión se sigue necesariamente de las premisas.</p>
<ul><li>"Todos los A son B" y "x es A" ⇒ "x es B" (válido).</li>
<li>"Todos los A son B" y "x es B" ⇏ "x es A" (error común: afirmar el consecuente).</li>
<li>"Si P, entonces Q" y "no Q" ⇒ "no P" (válido).</li></ul>
<p><b>Falacias frecuentes:</b></p><ul>
<li><b>Ad hominem:</b> atacar a la persona en lugar de su argumento.</li>
<li><b>Generalización apresurada:</b> sacar una regla de muy pocos casos.</li>
<li><b>Falso dilema:</b> presentar solo dos opciones cuando hay más.</li>
<li><b>Apelación a la mayoría:</b> "es verdad porque todos lo creen".</li>
<li><b>Causa falsa:</b> "pasó después, entonces fue por eso".</li>
<li><b>Hombre de paja:</b> deformar el argumento del otro para atacarlo fácilmente.</li></ul>
<p>Un <b>supuesto</b> es una premisa que el argumento necesita pero no dice.</p>`,
        ejemplo: `<p>"Todos los ingenieros saben matemáticas. Ana sabe matemáticas. Por lo tanto, Ana es ingeniera."</p><p><b>No es válido:</b> saber matemáticas no es exclusivo de los ingenieros. Es el error de afirmar el consecuente.</p>`,
        errores: ['Aceptar una conclusión porque es verdadera en la vida real, aunque no se siga de las premisas.', 'Confundir "todos los A son B" con "todos los B son A".'],
        preguntas: [
          [1, '"Todos los mamíferos tienen pulmones. Las ballenas son mamíferos." ¿Qué se concluye con certeza?', ['Las ballenas tienen pulmones', 'Todos los animales con pulmones son mamíferos', 'Las ballenas viven en el agua', 'Algunos mamíferos no tienen pulmones'], 'Si todos los mamíferos tienen pulmones y la ballena es mamífero, la ballena tiene pulmones.', 'Aplica la regla general al caso.', EPN],
          [2, '"Todos los estudiantes de la EPN dieron un examen. Luis dio un examen. Por lo tanto, Luis es estudiante de la EPN." Este razonamiento es:', ['Inválido, porque otras personas también dan exámenes', 'Válido, porque las premisas son verdaderas', 'Válido, porque Luis dio un examen', 'Inválido, porque Luis no existe'], 'Es la falacia de afirmar el consecuente: dar un examen no es exclusivo de la EPN.', '¿Solo los estudiantes de la EPN dan exámenes?', EPN],
          [2, '"No le creas a Pedro sobre el cambio climático: ni siquiera terminó el colegio." ¿Qué falacia es?', ['Ad hominem', 'Falso dilema', 'Generalización apresurada', 'Causa falsa'], 'Ataca a la persona y no a sus argumentos.', '¿Se discute el argumento o a la persona?', EPN],
          [2, '"O apruebas todas las materias con 10, o eres un fracasado." ¿Qué falacia es?', ['Falso dilema', 'Ad hominem', 'Apelación a la mayoría', 'Hombre de paja'], 'Solo presenta dos opciones extremas cuando hay muchas más.', '¿Hay solo dos posibilidades?', EPN],
          [2, '"Conocí a dos quiteños impuntuales; todos los quiteños son impuntuales." ¿Qué falacia es?', ['Generalización apresurada', 'Causa falsa', 'Ad hominem', 'Falso dilema'], 'Saca una regla general de solo dos casos.', '¿Cuántos casos se usaron?', EPN],
          [3, '"Desde que uso esta pulsera, saco mejores notas; la pulsera me hace más inteligente." ¿Qué falacia es?', ['Causa falsa', 'Apelación a la mayoría', 'Falso dilema', 'Hombre de paja'], 'Que algo ocurra después no prueba que sea su causa.', '¿El orden en el tiempo prueba la causa?', EPN],
          [3, '"Si llueve, la calle se moja. La calle no está mojada." ¿Qué se concluye con certeza?', ['No llovió', 'Llovió', 'La calle se secó', 'No se puede concluir nada'], 'Si P implica Q y no ocurre Q, entonces no ocurrió P.', 'Si hubiera llovido, ¿cómo estaría la calle?', EPN],
          [3, '"Debemos usar el bus porque es más barato que el taxi." ¿Qué supuesto necesita este argumento?', ['Que el precio es el criterio más importante para decidir', 'Que el bus es más rápido', 'Que el taxi es peligroso', 'Que no existen otros medios de transporte'], 'La conclusión solo se sostiene si lo que más importa es el precio.', '¿Qué hay que aceptar, sin que se diga, para que la conclusión tenga sentido?', EPN]
        ]
      },
      {
        id: 'v5', title: 'Puntuación y concordancia', tags: ['EPN', 'USFQ'], prereq: [], minutes: 45,
        objetivo: ['Usar correctamente coma, punto y coma y dos puntos', 'Detectar errores de concordancia entre sujeto y verbo y entre sustantivo y adjetivo'],
        teoria: `<ul><li><b>Coma:</b> separa elementos de una enumeración, encierra aclaraciones (incisos), va después de conectores como "sin embargo," y antes de "pero". <b>Nunca</b> separa el sujeto de su verbo: ✗ "Los estudiantes de la mañana, llegaron tarde".</li>
<li><b>Punto y coma:</b> separa oraciones relacionadas o elementos de una lista que ya llevan comas.</li>
<li><b>Dos puntos:</b> anuncian una enumeración, una explicación o una cita.</li>
<li><b>Concordancia:</b> el verbo concuerda en número con el núcleo del sujeto, no con la palabra más cercana. "El grupo de estudiantes <b>llegó</b>" (el núcleo es "grupo"). Los adjetivos concuerdan en género y número con el sustantivo.</li></ul>`,
        ejemplo: `<p>✗ "La lista de ejercicios están en la mesa."</p><p>El núcleo del sujeto es "lista" (singular), no "ejercicios". ✓ "La lista de ejercicios <b>está</b> en la mesa."</p>`,
        errores: ['Poner coma entre el sujeto y el verbo.', 'Hacer concordar el verbo con la palabra más cercana y no con el núcleo.', 'Usar coma en lugar de punto entre dos oraciones completas.'],
        preguntas: [
          [1, '¿Cuál oración está correctamente puntuada?', ['Compré pan, leche, huevos y queso.', 'Compré, pan leche huevos y queso.', 'Compré pan leche, huevos, y, queso.', 'Compré: pan, leche huevos y, queso.'], 'En una enumeración se separan los elementos con comas y el último se une con "y".', 'Revisa la enumeración.', EPN],
          [2, '¿Cuál oración tiene un error de puntuación?', ['Los estudiantes del último curso, aprobaron el examen.', 'Sin embargo, nadie llegó a tiempo.', 'Quito, la capital, está en los Andes.', 'Estudié mucho, pero no aprobé.'], 'No se pone coma entre el sujeto ("Los estudiantes del último curso") y el verbo ("aprobaron").', 'Busca una coma que separe sujeto y verbo.', EPN],
          [2, 'Elige la forma correcta: "El grupo de turistas ______ al museo."', ['llegó', 'llegaron', 'llegamos', 'llegaste'], 'El núcleo del sujeto es "grupo", singular.', '¿Quién llegó: el grupo o los turistas?', EPN],
          [2, '¿Cuál oración tiene un error de concordancia?', ['La mayoría de las respuestas estaban correcta.', 'Las respuestas estaban correctas.', 'Ninguna respuesta estaba correcta.', 'Cada respuesta estaba revisada.'], '"Respuestas" es plural: debe decir "correctas".', 'Revisa adjetivo y sustantivo.', EPN],
          [3, '¿En cuál oración están bien usados los dos puntos?', ['Necesitas tres cosas: paciencia, práctica y descanso.', 'Mi hermano: estudia ingeniería.', 'Necesitas: paciencia, práctica y descanso.', 'Dijo que: vendría mañana.'], 'Los dos puntos anuncian la enumeración después de una oración completa. No van entre un verbo y su complemento.', 'Los dos puntos no deben cortar el verbo de lo que sigue.', EPN],
          [3, '¿Cuál oración usa correctamente el punto y coma?', ['Unos llegaron en bus; otros, a pie.', 'Unos llegaron; en bus otros a pie.', 'Unos; llegaron en bus, otros a pie.', 'Unos llegaron en bus otros; a pie.'], 'Separa dos oraciones relacionadas. La coma de "otros," reemplaza al verbo que se omite.', 'El punto y coma separa dos partes con sentido completo.', EPN],
          [2, 'Elige la forma correcta: "Ni el profesor ni los alumnos ______ la respuesta."', ['sabían', 'sabía', 'sabíamos', 'sabías'], 'Con sujetos unidos por "ni... ni" que incluyen un plural, el verbo va en plural.', 'Hay dos sujetos.', EPN],
          [3, '¿Cuál oración es correcta?', ['Hubo muchos problemas en el examen.', 'Hubieron muchos problemas en el examen.', 'Habían muchos problemas en el examen.', 'Hubieran muchos problemas en el examen ayer.'], '"Haber" como existencia es impersonal y va siempre en singular: hubo, había.', '"Haber" para decir que algo existe no tiene plural.', EPN]
        ]
      },
      {
        id: 'v6', title: 'Párrafo, conectores y redacción', tags: ['EPN', 'USFQ'], prereq: ['v5'], minutes: 45,
        objetivo: ['Elegir el conector adecuado según la relación entre ideas', 'Ordenar oraciones para formar un párrafo', 'Mejorar oraciones confusas o redundantes'],
        teoria: `<p>Un párrafo tiene una <b>oración principal</b> (la idea central) y <b>oraciones secundarias</b> que la explican, dan ejemplos o la apoyan.</p>
<p><b>Conectores según su función:</b></p><ul>
<li>Adición: además, también, asimismo.</li><li>Contraste: sin embargo, no obstante, en cambio, pero.</li>
<li>Causa: porque, ya que, puesto que.</li><li>Consecuencia: por lo tanto, por eso, en consecuencia.</li>
<li>Ejemplo: por ejemplo, es decir.</li><li>Conclusión: en conclusión, en síntesis.</li></ul>
<p>En las preguntas de <b>redacción</b> (PAA), la mejor versión es la que dice lo mismo de forma clara, breve y gramaticalmente correcta. Desconfía de las opciones más largas o repetitivas.</p>`,
        ejemplo: `<p>"Estudió todo el semestre; ______, aprobó con buena nota." La relación es de consecuencia: <b>por lo tanto</b>.</p>`,
        errores: ['Usar "sin embargo" cuando no hay contraste.', 'Preferir la oración más larga creyendo que es más formal.', 'Repetir la misma idea con otras palabras (redundancia).'],
        preguntas: [
          [1, 'Elige el conector: "Estudió todo el semestre; ______, aprobó con buena nota."', ['por lo tanto', 'sin embargo', 'en cambio', 'aunque'], 'Aprobar es consecuencia de estudiar.', '¿Es contraste o consecuencia?', EPN],
          [1, 'Elige el conector: "Quería ir a la fiesta; ______, tenía que estudiar."', ['sin embargo', 'por eso', 'además', 'es decir'], 'Hay oposición entre querer ir y tener que estudiar.', '¿Las ideas se oponen?', EPN],
          [2, 'Elige el conector: "El páramo almacena agua; ______, regula los caudales de los ríos."', ['además', 'sin embargo', 'en cambio', 'no obstante'], 'Se agrega otra función del páramo, en la misma dirección.', 'La segunda idea suma información.', EPN],
          [3, 'Ordena para formar un párrafo: (1) Por eso, conviene estudiar en sesiones cortas. (2) La atención disminuye después de unos 40 minutos. (3) Así, el cerebro descansa y retiene mejor.', ['2, 1, 3', '1, 2, 3', '3, 2, 1', '2, 3, 1'], 'Primero el hecho (2), luego la consecuencia con "Por eso" (1) y al final el beneficio con "Así" (3).', 'Los conectores "Por eso" y "Así" no pueden ir primero.', EPN],
          [2, '¿Cuál es la mejor versión de la oración? "Subió arriba al tercer piso para ver el paisaje que se veía."', ['Subió al tercer piso para ver el paisaje.', 'Subió arriba al tercer piso para ver el paisaje.', 'Subió al tercer piso para ver el paisaje que se veía desde arriba.', 'Arriba subió al piso tercero para ver lo que se veía.', 'Subió hacia arriba para ver el paisaje del tercer piso.'], '"Subir arriba" y "el paisaje que se veía" son redundantes.', 'Elimina las palabras que repiten la idea.', PAA],
          [3, '¿Cuál es la mejor versión? "Los resultados, los cuales fueron analizados por el equipo, ellos mostraron una mejora."', ['Los resultados que analizó el equipo mostraron una mejora.', 'Los resultados, los cuales fueron analizados por el equipo, mostraron ellos una mejora.', 'Los resultados ellos mostraron una mejora, analizados por el equipo.', 'El equipo, los resultados que analizó, ellos mostraron una mejora.', 'Los resultados los cuales el equipo los analizó mostraron una mejora.'], 'Sobra el pronombre "ellos", que repite el sujeto, y la versión directa es más clara.', 'Busca la versión más clara y sin pronombres repetidos.', PAA],
          [2, '¿Cuál oración debería ser la oración principal de un párrafo que habla de horarios, descansos y técnicas de repaso?', ['Organizar bien el estudio mejora el rendimiento.', 'El descanso dura diez minutos.', 'Uso tarjetas para repasar.', 'Estudio a las ocho de la mañana.'], 'Es la única idea general que abarca horarios, descansos y técnicas.', 'La oración principal es la más general.', EPN]
        ]
      }
    ]
  });
})();
