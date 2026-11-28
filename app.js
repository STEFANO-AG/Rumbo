/* Rumbo · app local sin servidor.
 * Todo el progreso se guarda en el navegador (localStorage) y se puede exportar a un archivo JSON.
 * Estructura: datos/índices · almacenamiento · motor de dominio · repasos · exámenes · vistas · router.
 */
(function () {
  'use strict';

  // ---------- Configuración institucional (versionada, editable en Ajustes) ----------
  const VERIFIED = '27-11-2026';
  const DEFAULT_EPN = {
    id: 'epn-2026b', name: 'Simulacro EPN (formato 2026-B)', cycle: '2026-B',
    sections: [
      { subj: 'mat', count: 30, minutes: 90, weight: 400 },
      { subj: 'fis', count: 20, minutes: 40, weight: 200 },
      { subj: 'qui', count: 20, minutes: 40, weight: 200 }
    ],
    habilitanteMin: null // la EPN define el mínimo por carrera; no lo inventamos
  };
  const REVIEW_DAYS = [1, 3, 7, 14, 30];
  const ERROR_CATS = {
    desconocimiento: 'No sabía el tema', conceptual: 'Error de concepto', calculo: 'Error de cálculo',
    lectura: 'Leí mal el enunciado', tiempo: 'Me faltó tiempo', azar: 'Adiviné', examen: 'Fallada en simulacro'
  };
  const DAY = 86400000;

  // ---------- Índices del contenido ----------
  const SUBJECTS = window.RUMBO_SUBJECTS || [];
  const SUBJ = {}, TOPIC = {}, Q = {};
  SUBJECTS.forEach(s => {
    SUBJ[s.id] = s;
    s.topics.forEach(t => {
      t.subj = s.id; TOPIC[t.id] = t; t.qids = [];
      t.preguntas.forEach((p, i) => {
        const id = t.id + '-' + (i + 1);
        const meta = p[5] || {};
        // c = índice de la opción correcta. Por convención es la primera (0), salvo en
        // preguntas de orden fijo (comparación cuantitativa), donde lo indica meta.ans.
        Q[id] = { id, subj: s.id, topic: t.id, d: p[0], q: p[1], o: p[2], s: p[3], h: p[4], c: meta.fixed ? meta.ans : 0, fixed: !!meta.fixed, src: meta.src || '' };
        t.qids.push(id);
      });
    });
  });

  // ---------- Almacenamiento ----------
  const KEY = 'rumbo.v1';
  function blank() {
    return {
      version: 1, created: Date.now(),
      profile: { name: '', theme: 'light' },
      attempts: [], lessons: {}, errors: {}, exams: [], active: null,
      settings: { epn: JSON.parse(JSON.stringify(DEFAULT_EPN)) }
    };
  }
  let S;
  function load() {
    try { S = JSON.parse(localStorage.getItem(KEY)) || blank(); } catch (e) { S = blank(); }
    const b = blank();
    for (const k in b) if (S[k] === undefined) S[k] = b[k];
    if (!S.settings.epn) S.settings.epn = b.settings.epn;
  }
  let storageOk = true;
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); storageOk = true; }
    catch (e) { storageOk = false; console.error(e); }
  }

  // ---------- Utilidades ----------
  const $ = sel => document.querySelector(sel);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pct = x => Math.round(x * 100) + '%';
  const startOfDay = t => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const fmtDate = t => new Date(t).toLocaleDateString('es-EC', { day: 'numeric', month: 'short' });
  const fmtDateTime = t => new Date(t).toLocaleString('es-EC', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const LETTERS = 'ABCDE';
  // Orden de las opciones en pantalla: barajado, salvo en preguntas de orden fijo.
  const orderFor = q => q.fixed ? q.o.map((_, i) => i) : shuffle(q.o.map((_, i) => i));
  function relDay(t) {
    const d = Math.round((startOfDay(t) - startOfDay(Date.now())) / DAY);
    if (d <= 0) return 'hoy'; if (d === 1) return 'mañana'; return 'en ' + d + ' días';
  }

  // ---------- Motor de dominio ----------
  // Nivel 0–5 según intentos independientes (sin pista ni solución vista) más recientes.
  function mastery(topicId) {
    const all = S.attempts.filter(a => a.topic === topicId);
    const indep = all.filter(a => !a.help);
    const last = indep.slice(-10);
    const n = last.length, ok = last.filter(a => a.ok).length;
    const acc = n ? ok / n : 0;
    let level = 0;
    if (all.length) level = 1;
    if (n >= 3 && acc >= 0.5) level = 2;
    if (n >= 4 && acc >= 0.7) level = 3;
    if (n >= 5 && acc >= 0.85) level = 4;
    if (n >= 8 && acc >= 0.95 && last.some(a => a.ok && Q[a.qid] && Q[a.qid].d === 3)) level = 5;
    const recent = all.slice(-10);
    const provisional = level >= 3 && recent.filter(a => a.help).length / recent.length > 0.4;
    const lastT = indep.length ? indep[indep.length - 1].ts : 0;
    const stale = level >= 3 && lastT && Date.now() - lastT > 21 * DAY;
    let status = 'No iniciado';
    if (S.lessons[topicId]) status = 'Aprendido';
    if (all.length) status = 'Practicado';
    if (level >= 4) status = 'Dominado';
    return { level, acc, n, total: all.length, provisional, stale, status };
  }
  function subjectMastery(sid) {
    const ts = SUBJ[sid].topics.map(t => mastery(t.id));
    const avg = ts.reduce((a, m) => a + m.level, 0) / ts.length;
    return { avg, dominated: ts.filter(m => m.level >= 4).length, started: ts.filter(m => m.total).length, count: ts.length };
  }
  function weakPrereqs(topicId) {
    return (TOPIC[topicId].prereq || []).filter(p => TOPIC[p] && mastery(p).level < 2);
  }

  // ---------- Registro de intentos y Error Log ----------
  function record(qid, ok, opts) {
    const q = Q[qid];
    S.attempts.push({ qid, topic: q.topic, subj: q.subj, ok, ts: Date.now(), mode: opts.mode, help: !!opts.help, ms: opts.ms || 0 });
    const mode = opts.mode;
    const origin = opts.origin || qid; // en repasos, la entrada de error original
    if (mode === 'review') {
      const e = S.errors[origin];
      if (e) {
        e.reviews = (e.reviews || 0) + 1; e.last = Date.now();
        if (ok && !opts.help) {
          e.box = Math.min(e.box + 1, REVIEW_DAYS.length);
          if (e.box >= REVIEW_DAYS.length) { e.status = 'resuelto'; e.due = null; }
          else { e.status = 'repasado'; e.due = startOfDay(Date.now()) + REVIEW_DAYS[e.box] * DAY; }
        } else {
          e.box = 0; e.status = 'pendiente'; e.due = startOfDay(Date.now()) + DAY;
        }
      }
    } else if (!ok) {
      const e = S.errors[qid];
      if (e) {
        e.count++; e.box = 0; e.last = Date.now(); e.due = startOfDay(Date.now()) + DAY;
        e.status = e.status === 'resuelto' ? 'reabierto' : 'pendiente';
        if (opts.cat) e.cat = opts.cat;
      } else {
        S.errors[qid] = { qid, topic: q.topic, subj: q.subj, cat: opts.cat || (mode === 'exam' || mode === 'diag' ? 'examen' : ''), box: 0, count: 1, created: Date.now(), last: Date.now(), due: startOfDay(Date.now()) + DAY, status: 'pendiente', reviews: 0 };
      }
    }
    save();
  }
  function dueErrors() {
    const now = Date.now();
    return Object.values(S.errors).filter(e => e.status !== 'resuelto' && e.due != null && e.due <= now);
  }
  // Problema equivalente: otra pregunta del mismo tema y dificultad; si no hay, la original.
  function equivalentOf(qid) {
    const q = Q[qid], t = TOPIC[q.topic];
    const same = t.qids.filter(id => id !== qid && Q[id].d === q.d);
    const any = t.qids.filter(id => id !== qid);
    const e = S.errors[qid];
    if ((e && e.reviews % 2 === 1) || !any.length) return qid; // alterna con el original
    const pool = same.length ? same : any;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // ---------- Recomendación ("siguiente misión") ----------
  function recommendations() {
    const today = startOfDay(Date.now());
    const todayBySubj = {};
    S.attempts.forEach(a => { if (a.ts >= today) todayBySubj[a.subj] = (todayBySubj[a.subj] || 0) + 1; });
    const cands = SUBJECTS.map(s => {
      const t = s.topics.find(t => mastery(t.id).level < 4) || null;
      if (!t) return null;
      const m = mastery(t.id);
      let score = s.weight * (1 - m.level / 5);
      if (todayBySubj[s.id] >= 10) score *= 0.5;
      const why = [];
      if (s.why) why.push(s.why);
      else if (s.id === 'mat') why.push('Matemática vale 40% en la EPN, es habilitante y es la base de la PAA');
      else why.push(s.name + ' vale 20% en la EPN');
      why.push(m.total ? 'vas en nivel ' + m.level + ' de 5 en este tema' : 'es el siguiente tema que no has empezado');
      const wp = weakPrereqs(t.id);
      if (wp.length) why.push('ojo: conviene reforzar antes ' + wp.map(p => TOPIC[p].title).join(', '));
      return { topic: t, m, score, why: why.join('; ') + '.' };
    }).filter(Boolean).sort((a, b) => b.score - a.score);
    return cands;
  }

  // ---------- Router ----------
  const routes = {};
  let cleanup = null;
  function go(hash) { location.hash = hash; }
  function render() {
    if (cleanup) { cleanup(); cleanup = null; }
    const parts = (location.hash.replace(/^#\/?/, '') || 'hoy').split('/');
    const view = routes[parts[0]] || routes.hoy;
    if (!S.profile.name && parts[0] !== 'bienvenida') { routes.bienvenida(); renderNav('bienvenida'); return; }
    if (S.active && parts[0] !== 'examen' && parts[0] !== 'bienvenida') { /* examen pendiente: se avisa en Hoy */ }
    view.apply(null, parts.slice(1));
    renderNav(parts[0]);
    $('#sidebar').classList.remove('open');
    window.scrollTo(0, 0);
  }
  function renderNav(cur) {
    const due = dueErrors().length;
    const items = [
      ['hoy', '☀', 'Hoy'], ['materias', '📚', 'Materias'], ['repasos', '↻', 'Repasos', due],
      ['simulacros', '⏱', 'Simulacros'], ['errores', '✎', 'Registro de errores'], ['progreso', '📈', 'Progreso'],
      ['universidades', '🎓', 'Universidades'], ['ajustes', '⚙', 'Ajustes']
    ];
    const map = { materia: 'materias', tema: 'materias', practica: 'materias', examen: 'simulacros', resultado: 'simulacros', repaso: 'repasos' };
    const active = map[cur] || cur;
    $('#nav').innerHTML = items.map(([id, ico, label, n]) =>
      `<li><a href="#/${id}" class="${active === id ? 'active' : ''}"${active === id ? ' aria-current="page"' : ''}><span class="ico" aria-hidden="true">${ico}</span>${label}${n ? `<span class="badge">${n}</span>` : ''}</a></li>`).join('');
  }
  const app = () => $('#app');
  function setView(html) { app().innerHTML = (storageOk ? '' : '<div class="notice">No se pudo guardar el progreso en este navegador. Exporta una copia en Ajustes.</div>') + html; }

  // ---------- Vistas ----------
  routes.bienvenida = function () {
    setView(`
      <div class="card hero" style="max-width:680px">
        <h1>Bienvenido a Rumbo</h1>
        <p class="muted">Tu preuniversitario personal para la USFQ y la Escuela Politécnica Nacional. Funciona sin internet y tu progreso se guarda en este navegador.</p>
        <p>Empezaremos por Matemática, Física y Química. Primero un diagnóstico corto por materia para saber desde dónde partir; después, cada día te propongo qué estudiar y por qué.</p>
      </div>
      <div class="card" style="max-width:680px;margin-top:16px">
        <label for="nm">¿Cómo te llamas?</label>
        <div class="row" style="margin-top:8px"><input type="text" id="nm" maxlength="40" placeholder="Tu nombre" autocomplete="given-name"><button class="btn primary" id="go">Empezar</button></div>
        <p class="small muted" style="margin-top:14px">Consejo: guarda una copia de seguridad cada semana desde Ajustes, porque si borras los datos del navegador se pierde el progreso.</p>
      </div>`);
    const f = () => { const v = $('#nm').value.trim(); if (!v) { $('#nm').focus(); return; } S.profile.name = v; save(); go('#/hoy'); render(); };
    $('#go').onclick = f; $('#nm').onkeydown = e => { if (e.key === 'Enter') f(); };
    $('#nm').focus();
  };

  routes.hoy = function () {
    const due = dueErrors();
    const recs = recommendations();
    const today = startOfDay(Date.now());
    const todayAtt = S.attempts.filter(a => a.ts >= today);
    const diagDone = SUBJECTS.filter(s => S.exams.some(e => e.kind === 'diag' && e.subj === s.id && e.finished));
    const diagPending = SUBJECTS.filter(s => !diagDone.includes(s));
    const hour = new Date().getHours();
    const hi = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';
    const main = recs[0];
    let html = `<h1>${hi}, ${esc(S.profile.name)}</h1>
      <p class="sub">${new Date().toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long' })} · Hoy llevas ${todayAtt.length} ejercicios${todayAtt.length ? ' con ' + pct(todayAtt.filter(a => a.ok).length / todayAtt.length) + ' de aciertos' : ''}.</p>`;
    if (S.active) html += `<div class="notice">Tienes un ${esc(S.active.name)} sin terminar. <a href="#/examen">Continuar</a></div>`;
    if (diagPending.length) {
      html += `<div class="card hero"><h3>Empieza con el diagnóstico</h3>
        <p class="muted">Sin tiempo límite y sin ayuda: sirve para saber tu punto de partida real, no es una nota. Puedes hacerlo por materia, en días distintos. Si no sabes una pregunta, déjala en blanco en vez de adivinar.</p>
        <div class="row">${diagPending.map(s => `<button class="btn light" data-diag="${s.id}">Diagnóstico de ${s.name} (${s.topics.length * 2} preguntas)</button>`).join('')}</div></div>`;
    }
    html += `<h2>Tu plan de hoy</h2><div class="grid g2">`;
    if (due.length) html += `<div class="card stripe"><span class="tag">1 · Repasos</span><h3 style="margin-top:8px">Tienes ${due.length} repaso${due.length > 1 ? 's' : ''} pendiente${due.length > 1 ? 's' : ''}</h3><p class="muted small">Problemas equivalentes a los que fallaste. Repasar a tiempo es lo que evita olvidar.</p><button class="btn primary" onclick="location.hash='#/repaso'">Repasar ahora</button></div>`;
    recs.slice(0, 2).forEach((r, i) => {
      const t = r.topic, s = SUBJ[t.subj];
      const next = S.lessons[t.id] ? '#/practica/' + t.id : '#/tema/' + t.id;
      html += `<div class="card stripe ${s.color}"><span class="tag ${s.color}">${i === 0 ? 'Misión principal' : 'Misión secundaria'} · ${s.name}</span>
        <h3 style="margin-top:8px">${esc(t.title)}</h3><p class="muted small">≈ ${t.minutes} min · ${r.why}</p>
        <button class="btn ${i === 0 ? 'primary' : ''}" onclick="location.hash='${next}'">${S.lessons[t.id] ? 'Practicar' : 'Ver la lección'}</button></div>`;
    });
    if (!recs.length) html += `<div class="card"><h3>¡Dominaste todos los temas cargados!</h3><p class="muted">Haz un simulacro completo para comprobarlo bajo tiempo real.</p></div>`;
    html += `</div>`;
    html += `<h2>Cómo vas</h2><div class="grid g3">` + SUBJECTS.map(s => {
      const m = subjectMastery(s.id);
      return `<div class="card link" onclick="location.hash='#/materia/${s.id}'"><span class="tag ${s.color}">${s.name}</span>
        <div class="row" style="margin:10px 0 6px"><span class="big">${m.dominated}</span><span class="muted small">de ${m.count} temas dominados</span></div>
        <div class="bar ${s.color}"><i style="width:${(m.avg / 5) * 100}%"></i></div><p class="small muted" style="margin:6px 0 0">Nivel medio ${m.avg.toFixed(1)} / 5</p></div>`;
    }).join('') + `</div>`;
    if (main) html += `<p class="small muted" style="margin-top:24px">La misión se elige por el peso de la materia en el examen y por tu nivel actual. Matemática va primero porque en la EPN es habilitante.</p>`;
    setView(html);
    app().querySelectorAll('[data-diag]').forEach(b => b.onclick = () => startDiagnostic(b.dataset.diag));
  };

  routes.materias = function () {
    setView(`<h1>Materias</h1><p class="sub">Elige una materia para ver sus temas, lecciones y tu nivel en cada uno.</p>
      <div class="grid g3">${SUBJECTS.map(s => {
        const m = subjectMastery(s.id);
        return `<div class="card link stripe ${s.color}" onclick="location.hash='#/materia/${s.id}'"><span class="tag ${s.color}">${s.tags.join(' · ')}</span><h3 style="margin-top:8px">${s.name}</h3><p class="small muted">${s.desc}</p>
          <div class="bar ${s.color}"><i style="width:${(m.avg / 5) * 100}%"></i></div><p class="small muted">${m.started} de ${m.count} temas empezados · ${m.dominated} dominados</p></div>`;
      }).join('')}
      <div class="card" style="opacity:.75"><span class="tag">Próximamente</span><h3 style="margin-top:8px">Lenguaje y Aptitud Verbal</h3><p class="small muted">Lenguaje (20% en la EPN) y la parte verbal de la PAA de la USFQ. Se agregarán en la siguiente fase.</p></div>
      </div>`);
  };

  function dots(level) { let h = '<span class="dots" aria-label="Nivel ' + level + ' de 5">'; for (let i = 1; i <= 5; i++) h += `<b class="${i <= level ? 'on' : ''}"></b>`; return h + '</span>'; }

  routes.materia = function (sid) {
    const s = SUBJ[sid]; if (!s) return go('#/materias');
    setView(`<p class="small"><a href="#/materias">← Materias</a></p><h1>${s.name}</h1><p class="sub">${s.desc}</p>
      <div class="row" style="margin-bottom:16px"><button class="btn" id="mini">Mini simulacro de ${s.name}</button></div>
      <div class="card" style="padding:0">${s.topics.map((t, i) => {
        const m = mastery(t.id);
        const wp = weakPrereqs(t.id);
        return `<div class="topic" tabindex="0" role="link" data-t="${t.id}"><span class="muted" style="width:22px">${i + 1}</span>
          <div class="t"><b>${esc(t.title)}</b><div class="status ${m.level >= 4 ? 'dom' : ''}">${m.status}${m.provisional ? ' · dominio provisional (mucha ayuda)' : ''}${m.stale ? ' · hace tiempo que no lo practicas' : ''}${wp.length ? ' · conviene reforzar prerrequisitos' : ''}</div></div>
          ${t.tags.map(x => `<span class="tag">${x}</span>`).join(' ')} ${dots(m.level)}</div>`;
      }).join('')}</div>
      <p class="small muted" style="margin-top:14px">Nivel 0–5: se calcula con tus últimos 10 intentos sin ayuda. 2 = resuelves ejercicios rutinarios; 3 = variedad sin ayuda (70%+); 4 = dominado (85%+ en al menos 5 intentos); 5 = consistente incluso en los difíciles.</p>`);
    app().querySelectorAll('[data-t]').forEach(el => { el.onclick = () => go('#/tema/' + el.dataset.t); el.onkeydown = e => { if (e.key === 'Enter') go('#/tema/' + el.dataset.t); }; });
    $('#mini').onclick = () => startMini(sid);
  };

  routes.tema = function (tid) {
    const t = TOPIC[tid]; if (!t) return go('#/materias');
    const s = SUBJ[t.subj], m = mastery(tid), wp = weakPrereqs(tid);
    setView(`<p class="small"><a href="#/materia/${s.id}">← ${s.name}</a></p>
      <span class="tag ${s.color}">${s.name}</span> ${t.tags.map(x => `<span class="tag">${x}</span>`).join(' ')}
      <h1 style="margin-top:8px">${esc(t.title)}</h1><p class="sub">≈ ${t.minutes} min · ${m.status} · nivel ${m.level}/5</p>
      ${wp.length ? `<div class="notice">Este tema usa ${wp.map(p => `<a href="#/tema/${p}">${esc(TOPIC[p].title)}</a>`).join(', ')}, donde todavía tienes nivel bajo. Puedes seguir, pero te conviene reforzarlo.</div>` : ''}
      <div class="grid" style="grid-template-columns:minmax(0,1fr)">
        <div class="card lesson"><h3>Al terminar podrás</h3><ul>${t.objetivo.map(o => `<li>${esc(o)}</li>`).join('')}</ul></div>
        <div class="card lesson"><h3>Explicación</h3>${t.teoria}</div>
        <div class="card lesson"><h3>Ejemplo resuelto</h3><div class="box">${t.ejemplo}</div></div>
        <div class="card lesson"><h3>Errores frecuentes</h3><ul>${t.errores.map(o => `<li>${esc(o)}</li>`).join('')}</ul></div>
      </div>
      <div class="row" style="margin-top:20px"><button class="btn primary" id="prac">Practicar ${Math.min(5, t.qids.length)} ejercicios</button><span class="muted small">Con corrección inmediata y pistas.</span></div>`);
    $('#prac').onclick = () => { S.lessons[tid] = S.lessons[tid] || Date.now(); save(); go('#/practica/' + tid); };
  };

  // ---------- Práctica con feedback inmediato ----------
  function questionCard(q, order, state) {
    // state: {sel, checked, help, showHint}
    const opts = order.map((oi, i) => {
      let cls = '';
      if (state.checked) { if (oi === q.c) cls = 'ok'; else if (state.sel === oi) cls = 'bad'; }
      else if (state.sel === oi) cls = 'sel';
      return `<button class="opt ${cls}" data-o="${oi}" ${state.checked ? 'disabled' : ''}><span class="l">${LETTERS[i]}</span><span>${esc(q.o[oi])}</span></button>`;
    }).join('');
    return `<p class="q">${esc(q.q)}</p><div class="opts">${opts}</div>`;
  }

  function runPractice(qids, opts) {
    // opts: {title, back, mode, origins, onDone}
    if (cleanup) { cleanup(); cleanup = null; }
    let i = 0, results = [], finished = false;
    let st, order, t0;
    function setup() { st = { sel: null, checked: false, help: false, showHint: false, cat: '' }; order = orderFor(Q[qids[i]]); t0 = Date.now(); }
    setup();
    function draw() {
      const q = Q[qids[i]], s = SUBJ[q.subj];
      let fb = '';
      if (st.checked) {
        const ok = st.sel === q.c;
        fb = `<div class="feedback ${ok ? 'ok' : 'bad'}"><b>${ok ? '¡Correcto!' : st.sel === -1 ? 'Está bien no saber: así aprendes.' : 'No es correcta.'}</b> ${esc(q.s)}
          ${!ok ? `<div style="margin-top:10px" class="small"><b>¿Qué pasó?</b> (opcional, ayuda a tu registro de errores)</div><div class="chips">${['desconocimiento', 'conceptual', 'calculo', 'lectura', 'azar'].map(c => `<button class="chip ${st.cat === c ? 'on' : ''}" data-cat="${c}">${ERROR_CATS[c]}</button>`).join('')}</div>` : ''}</div>`;
      }
      setView(`<p class="small"><a href="${opts.back}">← Salir</a></p>
        <div class="row"><span class="tag ${s.color}">${s.name}</span><span class="muted small">${esc(opts.title)} · ${i + 1} de ${qids.length}</span>
        ${opts.mode === 'review' ? '<span class="tag">Problema equivalente a uno que fallaste</span>' : ''}${q.src ? `<span class="tag">${esc(q.src)}</span>` : ''}<span class="spacer"></span>${dots(Q[qids[i]].d)}</div>
        <div class="bar" style="margin:12px 0 20px"><i style="width:${(i / qids.length) * 100}%"></i></div>
        <div class="card">${questionCard(q, order, st)}
          ${st.showHint && !st.checked ? `<div class="notice info"><b>Pista:</b> ${esc(q.h)}</div>` : ''}
          ${fb}
          <div class="row" style="margin-top:18px">
            ${!st.checked ? `<button class="btn primary" id="chk" ${st.sel == null ? 'disabled' : ''}>Comprobar</button>
              <button class="btn" id="hint" ${st.showHint ? 'disabled' : ''}>Pista</button><button class="btn" id="idk">No sé</button>`
          : `<button class="btn primary" id="next">${i + 1 < qids.length ? 'Siguiente' : 'Ver resumen'}</button>`}
          </div>
          ${!st.checked ? '<p class="small muted" style="margin:10px 0 0">Usar la pista está bien, pero ese ejercicio no cuenta para tu nivel de dominio.</p>' : ''}
        </div>`);
      app().querySelectorAll('.opt').forEach(b => b.onclick = () => { st.sel = +b.dataset.o; draw(); });
      const on = (id, f) => { const el = $('#' + id); if (el) el.onclick = f; };
      on('chk', () => check(st.sel));
      on('idk', () => { st.sel = -1; st.cat = 'desconocimiento'; check(-1); });
      on('hint', () => { st.showHint = true; st.help = true; draw(); });
      on('next', next);
      app().querySelectorAll('[data-cat]').forEach(b => b.onclick = () => {
        st.cat = b.dataset.cat;
        const key = opts.mode === 'review' ? opts.origins[i] : qids[i];
        if (S.errors[key]) { S.errors[key].cat = st.cat; save(); }
        draw();
      });
    }
    function check(sel) {
      st.checked = true;
      const ok = sel === Q[qids[i]].c;
      results.push({ qid: qids[i], ok, help: st.help });
      record(qids[i], ok, { mode: opts.mode, help: st.help, ms: Date.now() - t0, cat: st.cat, origin: opts.origins ? opts.origins[i] : null });
      draw();
    }
    function next() {
      i++;
      if (i < qids.length) { setup(); draw(); }
      else { finished = true; document.removeEventListener('keydown', key); opts.onDone(results); }
    }
    draw();
    function key(e) {
      if (finished || e.target.tagName === 'INPUT') return;
      const k = e.key.toUpperCase();
      if (!st.checked && LETTERS.slice(0, order.length).includes(k)) { st.sel = order[LETTERS.indexOf(k)]; draw(); }
      else if (e.key === 'Enter') { if (e.target.tagName === 'BUTTON') return; if (!st.checked && st.sel != null) check(st.sel); else if (st.checked) next(); }
    }
    document.addEventListener('keydown', key);
    cleanup = () => document.removeEventListener('keydown', key);
  }

  routes.practica = function (tid) {
    const t = TOPIC[tid]; if (!t) return go('#/materias');
    const before = mastery(tid).level;
    // Prioriza preguntas no acertadas sin ayuda; luego por dificultad.
    const solved = new Set(S.attempts.filter(a => a.topic === tid && a.ok && !a.help).map(a => a.qid));
    const pool = shuffle(t.qids).sort((a, b) => (solved.has(a) - solved.has(b)) || (Q[a].d - Q[b].d));
    const qids = pool.slice(0, Math.min(5, pool.length)).sort((a, b) => Q[a].d - Q[b].d);
    runPractice(qids, {
      title: t.title, back: '#/tema/' + tid, mode: 'practice',
      onDone: res => {
        const after = mastery(tid);
        const ok = res.filter(r => r.ok).length;
        setView(`<h1>Resumen: ${esc(t.title)}</h1><p class="sub">${ok} de ${res.length} correctas${res.some(r => r.help) ? ' (algunas con pista)' : ''}.</p>
          <div class="card"><div class="row"><div><div class="muted small">Nivel del tema</div><div class="big">${before} → ${after.level}</div></div><span class="spacer"></span>${dots(after.level)}</div>
          <p class="muted small">${after.level >= 4 ? 'Tema dominado. Lo volverás a ver en repasos para comprobar que no se olvide.' : after.n < 5 ? 'Aún hay pocos intentos sin ayuda para medir bien tu dominio; practica otra ronda.' : 'Sigue practicando: el dominio se alcanza con 85% sin ayuda.'}</p>
          ${res.some(r => !r.ok) ? '<p class="small">Los ejercicios que fallaste se guardaron en tu registro de errores y aparecerán como repaso mañana.</p>' : ''}</div>
          <div class="row" style="margin-top:16px"><button class="btn primary" onclick="location.hash='#/hoy'">Volver a Hoy</button><button class="btn" id="again">Otra ronda</button><a class="btn" href="#/tema/${tid}">Repasar la lección</a></div>`);
        $('#again').onclick = () => routes.practica(tid);
      }
    });
  };

  routes.repasos = function () {
    const due = dueErrors();
    const upcoming = Object.values(S.errors).filter(e => e.status !== 'resuelto' && e.due > Date.now()).sort((a, b) => a.due - b.due);
    setView(`<h1>Repasos</h1><p class="sub">Repetición espaciada: cada error vuelve a los 1, 3, 7, 14 y 30 días si lo vas acertando. Si fallas, vuelve a empezar.</p>
      <div class="card hero"><h3>${due.length ? `${due.length} repaso${due.length > 1 ? 's' : ''} para hoy` : 'No tienes repasos pendientes hoy'}</h3>
      <p class="muted">${due.length ? 'Cada repaso es un problema equivalente al que fallaste, no el mismo enunciado.' : upcoming.length ? 'El próximo es ' + relDay(upcoming[0].due) + '.' : 'Cuando falles un ejercicio, aparecerá aquí al día siguiente.'}</p>
      ${due.length ? '<button class="btn light" onclick="location.hash=\'#/repaso\'">Empezar</button>' : ''}</div>
      ${upcoming.length ? `<h2>Próximos</h2><div class="card"><table><tr><th>Tema</th><th>Cuándo</th><th>Paso</th></tr>${upcoming.slice(0, 15).map(e => `<tr><td>${esc(TOPIC[e.topic].title)}</td><td>${relDay(e.due)}</td><td>${e.box + 1} de ${REVIEW_DAYS.length}</td></tr>`).join('')}</table></div>` : ''}`);
  };

  routes.repaso = function (only) {
    let items = only ? [S.errors[only]].filter(Boolean) : dueErrors().sort((a, b) => a.due - b.due).slice(0, 10);
    if (!items.length) return go('#/repasos');
    const origins = items.map(e => e.qid);
    const qids = origins.map(equivalentOf);
    runPractice(qids, {
      title: 'Repaso', back: '#/repasos', mode: 'review', origins,
      onDone: res => {
        const ok = res.filter(r => r.ok).length;
        setView(`<h1>Repaso terminado</h1><p class="sub">${ok} de ${res.length} correctas. Los aciertos se programan más lejos; los fallos vuelven mañana.</p>
          <div class="row"><button class="btn primary" onclick="location.hash='#/hoy'">Volver a Hoy</button><a class="btn" href="#/errores">Ver registro de errores</a></div>`);
      }
    });
  };

  routes.errores = function (filter) {
    filter = filter || 'abiertos';
    const all = Object.values(S.errors).sort((a, b) => b.last - a.last);
    const list = all.filter(e => filter === 'todos' ? true : filter === 'resueltos' ? e.status === 'resuelto' : e.status !== 'resuelto');
    const byCat = {};
    all.filter(e => e.status !== 'resuelto').forEach(e => { const c = e.cat || 'sin'; byCat[c] = (byCat[c] || 0) + 1; });
    const byTopic = {};
    all.filter(e => e.status !== 'resuelto').forEach(e => { byTopic[e.topic] = (byTopic[e.topic] || 0) + e.count; });
    const topT = Object.entries(byTopic).sort((a, b) => b[1] - a[1]).slice(0, 3);
    setView(`<h1>Registro de errores</h1><p class="sub">Cada error es una pista de qué reforzar. No es una lista de fracasos: cuando lo repasas bien varias veces, se marca como resuelto.</p>
      ${all.length ? `<div class="grid g2" style="margin-bottom:16px">
        <div class="card"><h3>Dónde más fallas</h3>${topT.length ? topT.map(([t, n]) => `<p style="margin:6px 0"><a href="#/tema/${t}">${esc(TOPIC[t].title)}</a> <span class="muted small">· ${n} fallo${n > 1 ? 's' : ''}</span></p>`).join('') : '<p class="muted">Nada abierto.</p>'}</div>
        <div class="card"><h3>Por qué fallas</h3>${Object.keys(byCat).length ? Object.entries(byCat).map(([c, n]) => `<p style="margin:6px 0">${c === 'sin' ? 'Sin clasificar' : ERROR_CATS[c]} <span class="muted small">· ${n}</span></p>`).join('') : '<p class="muted">Nada abierto.</p>'}</div></div>` : ''}
      <div class="row" style="margin-bottom:12px">${['abiertos', 'resueltos', 'todos'].map(f => `<a class="btn small ${filter === f ? 'primary' : ''}" href="#/errores/${f}">${f[0].toUpperCase() + f.slice(1)}</a>`).join('')}</div>
      ${list.length ? `<div class="card" style="padding:0">${list.map(e => {
        const q = Q[e.qid], s = SUBJ[e.subj];
        return `<div class="topic" style="cursor:default"><div class="t"><span class="tag ${s.color}">${s.name}</span> <span class="small muted">${esc(TOPIC[e.topic].title)}</span>
          <div style="margin-top:4px">${esc(q.q)}</div>
          <div class="small muted">Respuesta correcta: <b>${esc(q.o[q.c])}</b> · ${e.cat ? ERROR_CATS[e.cat] : 'sin clasificar'} · fallada ${e.count} ${e.count > 1 ? 'veces' : 'vez'} · ${e.status}${e.due ? ' · repaso ' + relDay(e.due) : ''}</div></div>
          <button class="btn small" data-r="${e.qid}">Practicar</button></div>`;
      }).join('')}</div>` : `<div class="card empty">${all.length ? 'No hay errores en este filtro.' : 'Todavía no hay errores registrados. Aparecerán cuando practiques.'}</div>`}`);
    app().querySelectorAll('[data-r]').forEach(b => b.onclick = () => go('#/repaso/' + b.dataset.r));
  };

  // ---------- Exámenes: diagnóstico, mini simulacro y simulacro EPN ----------
  function pickQuestions(sid, count, exclude) {
    const s = SUBJ[sid];
    const byTopic = s.topics.map(t => shuffle(t.qids.filter(id => !exclude || !exclude.has(id))));
    const out = [];
    let k = 0;
    while (out.length < count && byTopic.some(a => a.length)) {
      const a = byTopic[k % byTopic.length];
      if (a.length) out.push(a.pop());
      k++;
    }
    return out;
  }
  function makeSection(sid, count, minutes, weight, qids) {
    qids = qids || pickQuestions(sid, count);
    const order = {}; qids.forEach(id => order[id] = orderFor(Q[id]));
    return { subj: sid, qids, order, answers: {}, marked: {}, minutes, weight, requested: count, startedAt: null, endsAt: null, submitted: false };
  }
  function startExam(ex) {
    if (S.active && !confirm('Tienes otro examen sin terminar. ¿Descartarlo y empezar este?')) return go('#/examen');
    S.active = Object.assign({ id: 'ex' + Date.now(), started: Date.now(), cur: 0, idx: 0 }, ex);
    save(); go('#/examen');
  }
  function startDiagnostic(sid) {
    const s = SUBJ[sid];
    const qids = [];
    s.topics.forEach(t => { const byD = t.qids.slice().sort((a, b) => Q[a].d - Q[b].d); qids.push(byD[0], byD[Math.min(byD.length - 1, 3)]); });
    startExam({ kind: 'diag', subj: sid, name: 'Diagnóstico de ' + s.name, sections: [makeSection(sid, qids.length, null, null, shuffle(qids))] });
  }
  function startMini(sid) {
    startExam({ kind: 'mini', subj: sid, name: 'Mini simulacro de ' + SUBJ[sid].name, sections: [makeSection(sid, 10, 25, null)] });
  }
  // Parte de Razonamiento Matemático de la PAA según la guía publicada por la USFQ.
  function startPAA() {
    startExam({ kind: 'paa', subj: 'paa', name: 'Simulacro PAA · Razonamiento Matemático', sections: [makeSection('paa', 25, 30, null)] });
  }
  function startEPN() {
    const bp = S.settings.epn;
    startExam({ kind: 'epn', name: bp.name, cycle: bp.cycle, habilitanteMin: bp.habilitanteMin, sections: bp.sections.filter(x => SUBJ[x.subj] && x.count > 0).map(x => makeSection(x.subj, x.count, x.minutes, x.weight)) });
  }

  routes.simulacros = function () {
    const bp = S.settings.epn;
    const hist = S.exams.filter(e => e.finished).slice().reverse();
    setView(`<h1>Simulacros</h1><p class="sub">Modo examen: sin pistas ni respuestas hasta entregar. Tus respuestas se guardan solas aunque cierres el navegador.</p>
      <div class="grid g2">
        <div class="card stripe"><span class="tag">EPN · ciclo ${esc(bp.cycle)}</span><h3 style="margin-top:8px">${esc(bp.name)}</h3>
          <p class="small muted">${bp.sections.map(x => `${SUBJ[x.subj].name}: ${x.count} preguntas en ${x.minutes} min`).join(' · ')}. Matemática va primero y es habilitante. Lenguaje se agregará en la próxima fase.</p>
          <p class="small muted">Los tiempos vienen de los lineamientos 2026-B y puedes cambiarlos en Ajustes. Con el banco actual algunas secciones pueden tener menos preguntas que las pedidas.</p>
          <button class="btn primary" id="epn">Empezar simulacro EPN</button></div>
        <div class="card stripe"><span class="tag">USFQ · PAA</span><h3 style="margin-top:8px">Simulacro PAA</h3>
          ${SUBJ.paa ? `<p class="small muted">Razonamiento Matemático con el formato de la guía de la USFQ: 25 preguntas en 30 minutos, cinco opciones por pregunta y ejercicios de comparación. La parte verbal se agregará después. Para el formato oficial, usa también el simulador del Portal de Admisiones.</p>
          <button class="btn primary" id="paa">Empezar simulacro PAA matemático</button>`
          : `<p class="small muted">Falta el archivo js/data-paa.js en index.html.</p><button class="btn" disabled>No disponible</button>`}</div>
        <div class="card"><h3>Mini simulacros por materia</h3><p class="small muted">10 preguntas en 25 minutos.</p><div class="row">${SUBJECTS.map(s => `<button class="btn small" data-mini="${s.id}">${s.name}</button>`).join('')}</div></div>
        <div class="card"><h3>Diagnósticos</h3><p class="small muted">Sin tiempo. Puedes repetirlos para medir tu avance.</p><div class="row">${SUBJECTS.map(s => `<button class="btn small" data-diag="${s.id}">${s.name}</button>`).join('')}</div></div>
      </div>
      <h2>Historial</h2>${hist.length ? `<div class="card"><table><tr><th>Fecha</th><th>Prueba</th><th>Resultado</th><th></th></tr>${hist.map(e => `<tr><td>${fmtDateTime(e.finished)}</td><td>${esc(e.name)}</td><td>${e.summary}</td><td><a href="#/resultado/${e.id}">Ver</a></td></tr>`).join('')}</table></div>` : '<div class="card empty">Aún no has hecho ningún simulacro ni diagnóstico.</div>'}`);
    $('#epn').onclick = startEPN;
    if ($('#paa')) $('#paa').onclick = startPAA;
    app().querySelectorAll('[data-mini]').forEach(b => b.onclick = () => startMini(b.dataset.mini));
    app().querySelectorAll('[data-diag]').forEach(b => b.onclick = () => startDiagnostic(b.dataset.diag));
  };

  routes.examen = function () {
    const ex = S.active;
    if (!ex) return go('#/simulacros');
    let timer = null;
    function sec() { return ex.sections[ex.cur]; }
    function ensureStarted() {
      const s = sec();
      if (!s.startedAt) { s.startedAt = Date.now(); if (s.minutes) s.endsAt = s.startedAt + s.minutes * 60000; save(); }
    }
    function remaining() { const s = sec(); return s.endsAt ? Math.max(0, s.endsAt - Date.now()) : null; }
    function fmt(ms) { const t = Math.ceil(ms / 1000); const h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), s2 = t % 60; return (h ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(s2).padStart(2, '0'); }
    function intro() {
      const s = sec(), subj = SUBJ[s.subj];
      setView(`<h1>${esc(ex.name)}</h1><p class="sub">Sección ${ex.cur + 1} de ${ex.sections.length}</p>
        <div class="card"><span class="tag ${subj.color}">${subj.name}</span><h3 style="margin-top:8px">${s.qids.length} preguntas${s.minutes ? ' · ' + s.minutes + ' minutos' : ' · sin límite de tiempo'}</h3>
        ${s.qids.length < s.requested ? `<p class="small muted">El formato pide ${s.requested}; el banco actual tiene ${s.qids.length} disponibles para esta sección.</p>` : ''}
        <ul class="small">${ex.kind === 'paa' ? '<li>La mayoría de preguntas tienen 5 opciones; las de comparación tienen 4 opciones fijas. Solo una es correcta.</li>' : '<li>Cada pregunta tiene 4 opciones y una sola correcta. Una incorrecta no resta puntos.</li>'}
        <li>Puedes marcar preguntas para revisarlas y moverte libremente dentro de la sección.</li>
        ${s.minutes ? '<li>Al acabarse el tiempo, la sección se entrega sola.</li>' : '<li>Si no sabes una, déjala en blanco: el diagnóstico la registra como "sin evidencia".</li>'}
        ${ex.kind === 'epn' && ex.cur === 0 ? '<li>Matemática es habilitante: en la EPN real, solo quien alcanza el mínimo de su carrera rinde las demás áreas.</li>' : ''}</ul>
        <div class="row"><button class="btn primary" id="begin">Empezar sección</button><button class="btn danger" id="quit">Abandonar examen</button></div></div>`);
      $('#begin').onclick = () => { ensureStarted(); ex.idx = 0; save(); draw(); };
      $('#quit').onclick = abandon;
    }
    function abandon() { if (confirm('¿Abandonar? Se perderán las respuestas de este examen.')) { S.active = null; save(); go('#/simulacros'); } }
    function draw() {
      const s = sec(), subj = SUBJ[s.subj], qid = s.qids[ex.idx], q = Q[qid];
      const order = s.order[qid];
      const answered = Object.keys(s.answers).length;
      const opts = order.map((oi, i) => `<button class="opt ${s.answers[qid] === oi ? 'sel' : ''}" data-o="${oi}"><span class="l">${LETTERS[i]}</span><span>${esc(q.o[oi])}</span></button>`).join('');
      setView(`<div class="exam-top"><div class="row"><span class="tag ${subj.color}">${subj.name}</span><b>${esc(ex.name)}</b><span class="spacer"></span>
          <span class="muted small">${answered}/${s.qids.length} contestadas</span>${s.endsAt ? `<span class="timer" id="tm">${fmt(remaining())}</span>` : ''}</div>
          <div class="qnav">${s.qids.map((id, i) => `<button data-i="${i}" class="${s.answers[id] != null ? 'ans' : ''} ${s.marked[id] ? 'mk' : ''} ${i === ex.idx ? 'cur' : ''}" aria-label="Pregunta ${i + 1}">${i + 1}</button>`).join('')}</div></div>
        <div class="card"><p class="muted small">Pregunta ${ex.idx + 1} de ${s.qids.length}</p><p class="q">${esc(q.q)}</p><div class="opts">${opts}</div>
          <div class="row" style="margin-top:18px"><button class="btn" id="prev" ${ex.idx === 0 ? 'disabled' : ''}>← Anterior</button>
          <button class="btn" id="mark">${s.marked[qid] ? 'Quitar marca' : 'Marcar para revisar'}</button>
          ${s.answers[qid] != null ? '<button class="btn" id="clr">Borrar respuesta</button>' : ''}
          <span class="spacer"></span>${ex.idx + 1 < s.qids.length ? '<button class="btn primary" id="nxt">Siguiente →</button>' : ''}</div></div>
        <div class="row" style="margin-top:16px"><button class="btn primary" id="sub">Entregar sección</button><button class="btn danger small" id="quit">Abandonar</button></div>`);
      app().querySelectorAll('.opt').forEach(b => b.onclick = () => { s.answers[qid] = +b.dataset.o; save(); draw(); });
      app().querySelectorAll('[data-i]').forEach(b => b.onclick = () => { ex.idx = +b.dataset.i; save(); draw(); });
      const on = (id, f) => { const el = $('#' + id); if (el) el.onclick = f; };
      on('prev', () => { ex.idx--; save(); draw(); });
      on('nxt', () => { ex.idx++; save(); draw(); });
      on('mark', () => { if (s.marked[qid]) delete s.marked[qid]; else s.marked[qid] = 1; save(); draw(); });
      on('clr', () => { delete s.answers[qid]; save(); draw(); });
      on('sub', () => {
        const left = s.qids.length - Object.keys(s.answers).length, mk = Object.keys(s.marked).length;
        if (confirm(`¿Entregar la sección?${left ? `\nTe faltan ${left} sin contestar.` : ''}${mk ? `\nTienes ${mk} marcadas para revisar.` : ''}`)) submitSection();
      });
      on('quit', abandon);
    }
    function submitSection() {
      const s = sec();
      s.submitted = true; s.submittedAt = Date.now();
      s.raw = s.qids.filter(id => s.answers[id] === Q[id].c).length;
      save();
      if (ex.kind === 'epn' && ex.cur === 0 && ex.habilitanteMin != null && s.raw < ex.habilitanteMin) return finish(true);
      if (ex.cur + 1 < ex.sections.length) { ex.cur++; ex.idx = 0; save(); intro(); }
      else finish(false);
    }
    function finish(stopped) {
      if (timer) clearInterval(timer);
      // Registrar intentos (sin ayuda) y errores. Las preguntas en blanco del diagnóstico no cuentan como intento.
      ex.sections.forEach(s => {
        if (!s.submitted) return;
        s.qids.forEach(id => {
          const a = s.answers[id];
          if (a == null && ex.kind === 'diag') return;
          record(id, a === Q[id].c, { mode: ex.kind === 'diag' ? 'diag' : 'exam', help: false });
        });
      });
      const done = ex.sections.filter(s => s.submitted);
      let summary;
      if (ex.kind === 'epn') {
        const est = done.reduce((a, s) => a + (s.qids.length ? s.raw / s.qids.length * s.weight : 0), 0);
        summary = done.map(s => `${SUBJ[s.subj].short} ${s.raw}/${s.qids.length}`).join(' · ') + ` · estimación ${Math.round(est)}/${ex.sections.reduce((a, s) => a + s.weight, 0)}`;
        ex.estimate = Math.round(est);
      } else summary = done.map(s => `${s.raw}/${s.qids.length}`).join(' · ');
      ex.summary = summary; ex.finished = Date.now(); ex.stoppedByHabilitante = stopped;
      S.exams.push(ex); S.active = null; save();
      go('#/resultado/' + ex.id);
    }
    function tick() {
      const el = $('#tm'); const r = remaining();
      if (r == null) return;
      if (el) { el.textContent = fmt(r); el.classList.toggle('low', r < 5 * 60000); }
      if (r <= 0) { alertTimeUp(); }
    }
    function alertTimeUp() { clearInterval(timer); timer = null; submitSection(); if (S.active) timer = setInterval(tick, 1000); }
    if (sec().startedAt) {
      if (remaining() === 0) { submitSection(); } else draw();
    } else intro();
    timer = setInterval(tick, 1000);
    cleanup = () => { if (timer) clearInterval(timer); };
  };

  routes.resultado = function (id) {
    const ex = S.exams.find(e => e.id === id); if (!ex) return go('#/simulacros');
    const done = ex.sections.filter(s => s.submitted);
    const topicStats = {};
    done.forEach(s => s.qids.forEach(q => { const t = Q[q].topic; topicStats[t] = topicStats[t] || { ok: 0, n: 0, blank: 0 }; topicStats[t].n++; if (s.answers[q] === Q[q].c) topicStats[t].ok++; if (s.answers[q] == null) topicStats[t].blank++; }));
    const weakest = Object.entries(topicStats).filter(([, v]) => v.ok / v.n < 0.6).sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n);
    let head = '';
    if (ex.kind === 'epn') {
      const max = ex.sections.reduce((a, s) => a + s.weight, 0);
      head = `<div class="card hero"><div class="muted small">Estimación de práctica Rumbo (no es un puntaje oficial)</div><div class="big">${ex.estimate} / ${max}</div>
        <p class="muted small">Se calcula como (aciertos / preguntas) × peso de cada área. La EPN real incluye Lenguaje y define el mínimo habilitante de Matemática por carrera.</p></div>`;
      if (ex.stoppedByHabilitante) head += `<div class="notice">No alcanzaste el mínimo de Matemática que configuraste (${ex.habilitanteMin}), así que el simulacro terminó ahí, como en la EPN.</div>`;
    } else if (ex.kind === 'diag') {
      head = `<div class="card hero"><h3>Tu punto de partida en ${SUBJ[ex.subj].name}</h3><p class="muted">Esto no es una nota. Con pocas preguntas por tema, es una primera señal; tu nivel se irá precisando con la práctica.</p></div>`;
    }
    setView(`<p class="small"><a href="#/simulacros">← Simulacros</a></p><h1>${esc(ex.name)}</h1><p class="sub">${fmtDateTime(ex.finished)}</p>${head}
      <h2>Por sección</h2><div class="grid g3">${done.map(s => `<div class="card"><span class="tag ${SUBJ[s.subj].color}">${SUBJ[s.subj].name}</span><div class="big" style="margin-top:8px">${s.raw}/${s.qids.length}</div>
        <p class="small muted">${s.qids.length - Object.keys(s.answers).length} en blanco${s.minutes ? ' · ' + Math.round((s.submittedAt - s.startedAt) / 60000) + ' de ' + s.minutes + ' min' : ''}</p></div>`).join('')}</div>
      <h2>Por tema</h2><div class="card"><table><tr><th>Tema</th><th>Aciertos</th><th>En blanco</th><th></th></tr>${Object.entries(topicStats).map(([t, v]) => `<tr><td>${esc(TOPIC[t].title)}</td><td>${v.ok}/${v.n}</td><td>${v.blank}</td><td><a href="#/tema/${t}">Estudiar</a></td></tr>`).join('')}</table></div>
      ${weakest.length ? `<h2>Plan de recuperación</h2><div class="card"><ol>${weakest.slice(0, 4).map(([t]) => `<li><a href="#/tema/${t}">${esc(TOPIC[t].title)}</a>: repasa la lección y haz una ronda de práctica.</li>`).join('')}</ol><p class="small muted">Las preguntas falladas ya están en tu registro de errores para repasarlas desde mañana.</p></div>` : ''}
      <h2>Revisión de respuestas</h2><div class="card" style="padding:0">${done.map(s => s.qids.map((id, i) => {
        const q = Q[id], a = s.answers[id], ok = a === q.c;
        return `<div class="topic" style="cursor:default;align-items:flex-start"><span class="tag ${ok ? '' : ''}" style="background:${ok ? 'var(--okbg)' : 'var(--badbg)'};color:${ok ? 'var(--ok)' : 'var(--bad)'}">${ok ? '✓' : a == null ? '—' : '✗'}</span>
          <div class="t"><div>${esc(q.q)}</div><div class="small muted">${a != null && !ok ? 'Tu respuesta: ' + esc(q.o[a]) + ' · ' : ''}Correcta: <b>${esc(q.o[q.c])}</b></div><div class="small">${esc(q.s)}</div></div></div>`;
      }).join('')).join('')}</div>`);
  };

  routes.progreso = function () {
    const total = S.attempts.length, ok = S.attempts.filter(a => a.ok).length;
    const days = new Set(S.attempts.map(a => startOfDay(a.ts))).size;
    const week = S.attempts.filter(a => a.ts >= Date.now() - 7 * DAY);
    const epn = S.exams.filter(e => e.kind === 'epn' && e.finished);
    setView(`<h1>Progreso</h1><p class="sub">Tu avance medido con evidencia: intentos, aciertos sin ayuda y retención. Ninguna cifra aquí es una probabilidad de admisión.</p>
      <div class="grid g3">
        <div class="card"><div class="muted small">Ejercicios resueltos</div><div class="big">${total}</div><p class="small muted">${total ? pct(ok / total) + ' de aciertos' : 'Aún sin datos'}</p></div>
        <div class="card"><div class="muted small">Últimos 7 días</div><div class="big">${week.length}</div><p class="small muted">${week.length ? pct(week.filter(a => a.ok).length / week.length) + ' de aciertos' : 'Sin práctica esta semana'}</p></div>
        <div class="card"><div class="muted small">Días que estudiaste</div><div class="big">${days}</div><p class="small muted">${Object.values(S.errors).filter(e => e.status === 'resuelto').length} errores resueltos</p></div>
      </div>
      <h2>Ruta EPN</h2><div class="card">${SUBJECTS.filter(s => s.tags.includes('EPN')).map(s => { const m = subjectMastery(s.id); return `<div style="margin:10px 0"><div class="row"><b>${s.name}</b><span class="spacer"></span><span class="small muted">nivel ${m.avg.toFixed(1)}/5 · ${m.dominated}/${m.count} dominados</span></div><div class="bar ${s.color}"><i style="width:${m.avg / 5 * 100}%"></i></div></div>`; }).join('')}
        <div style="margin:10px 0;opacity:.6"><div class="row"><b>Lenguaje</b><span class="spacer"></span><span class="small muted">próximamente</span></div><div class="bar"><i style="width:0"></i></div></div>
        ${epn.length ? `<p class="small">Último simulacro EPN: <b>${epn[epn.length - 1].estimate}</b> (estimación de práctica, ${fmtDate(epn[epn.length - 1].finished)}).${epn.length > 1 ? ' Anterior: ' + epn[epn.length - 2].estimate + '.' : ''}</p>` : '<p class="small muted">Haz un simulacro EPN para ver tu estimación de práctica.</p>'}</div>
      <h2>Ruta USFQ (PAA)</h2><div class="card">${SUBJ.paa ? (() => { const m = subjectMastery('paa'); return `<div style="margin:10px 0"><div class="row"><b>PAA Matemático</b><span class="spacer"></span><span class="small muted">nivel ${m.avg.toFixed(1)}/5 · ${m.dominated}/${m.count} dominados</span></div><div class="bar paa"><i style="width:${m.avg / 5 * 100}%"></i></div></div>`; })() : ''}<p class="small">La Aptitud Matemática de la PAA se apoya en los mismos temas de Matemática (nivel medio ${subjectMastery('mat').avg.toFixed(1)}/5). La Aptitud Verbal y la Redacción se agregarán en la próxima fase. Rumbo no convierte tus porcentajes a la escala de 2400 porque no hay un modelo de equivalencia validado.</p></div>
      <h2>Detalle por tema</h2><div class="card"><table><tr><th>Tema</th><th>Estado</th><th>Nivel</th><th>Aciertos (sin ayuda)</th></tr>${SUBJECTS.map(s => s.topics.map(t => { const m = mastery(t.id); return `<tr><td><span class="tag ${s.color}">${s.short}</span> <a href="#/tema/${t.id}">${esc(t.title)}</a></td><td>${m.status}${m.provisional ? ' (provisional)' : ''}</td><td>${dots(m.level)}</td><td>${m.n ? pct(m.acc) + ' en ' + m.n : '—'}</td></tr>`; }).join('')).join('')}</table>
      <p class="small muted">Cómo se calcula: se miran tus últimos 10 intentos sin pista. Nivel 2 = 50%+ en 3 intentos; 3 = 70%+ en 4; 4 (dominado) = 85%+ en 5; 5 = 95%+ en 8 incluyendo difíciles. "Provisional" significa que más del 40% de tus intentos recientes fueron con ayuda.</p></div>`);
  };

  routes.universidades = function () {
    setView(`<h1>Universidades</h1><p class="sub">Datos oficiales consultados el ${VERIFIED}. Las reglas cambian cada ciclo: confírmalas en las páginas oficiales antes de postular.</p>
      <div class="grid g2">
        <div class="card"><span class="tag">USFQ</span><h3 style="margin-top:8px">Universidad San Francisco de Quito</h3><ul class="small">
          <li>Puntaje de admisión: 60% promedio de 1.º y 2.º de bachillerato (o nota de grado) + 40% PAA de College Board.</li>
          <li>PAA: Aptitud Verbal (máx. 1200) + Aptitud Matemática (máx. 1200) = 2400. Incluye un examen de ubicación de inglés que no afecta la admisión.</li>
          <li>Mínimo publicado para ingresar: 1650. Para solicitar asistencia financiera se publica un mínimo de 1900.</li>
          <li>Según la <a href="https://www.usfq.edu.ec/sites/default/files/inline-files/Guia_de_Estudio_de_la_Pueba_de_Aptitud.pdf" target="_blank" rel="noopener">Guía de Estudio de la PAA publicada por la USFQ</a>: Razonamiento Verbal (2 partes de 30 preguntas, 35 min cada una), Razonamiento Matemático (2 partes de 25 preguntas, 30 y 35 min) y Redacción Indirecta (30 preguntas, 30 min). Preguntas de 5 opciones, comparaciones y algunas de respuesta abierta. Esa guía usa la escala 200–800 por sección, mientras la página de admisiones habla de 1200 por componente: confirma la versión vigente en el Portal.</li>
          <li>El Portal de Admisiones ofrece guía de estudios, prueba de práctica y simulador oficiales. Úsalos, son la mejor referencia del formato.</li></ul>
          <a href="https://www.usfq.edu.ec/es/admisiones/admisiones-pregrado/admisiones-pregrado-estudiantes-nacionales" target="_blank" rel="noopener">Página oficial de admisiones USFQ</a></div>
        <div class="card"><span class="tag">EPN</span><h3 style="margin-top:8px">Escuela Politécnica Nacional</h3><ul class="small">
          <li>Áreas para Ingeniería, Ciencias y Tecnología: Matemática, Física, Química y Lenguaje, con preguntas de opción múltiple (4 opciones, una correcta; la incorrecta no resta).</li>
          <li>Puntaje sobre 1000. Según los lineamientos 2026-B: Matemática 30 preguntas (40%), Física, Química y Lenguaje 20 cada una (20% cada una).</li>
          <li>Matemática se rinde primero y es habilitante: solo quien alcanza el mínimo de su carrera continúa. La EPN publica ese mínimo; Rumbo no lo inventa.</li>
          <li>Ojo: los lineamientos indican 90 min para Matemática y 40 min para las demás, pero la guía de estudio 2026 dice "hasta 60 minutos" por examen. Ajusta los tiempos en Ajustes cuando salga la guía de tu ciclo.</li></ul>
          <a href="https://www.epn.edu.ec/wp-content/uploads/2026/05/guia_estudio_2026.pdf" target="_blank" rel="noopener">Guía de estudio EPN 2026 (PDF)</a></div>
      </div>
      <div class="notice info" style="margin-top:16px">Estos enlaces necesitan internet; el resto de Rumbo funciona sin conexión.</div>`);
  };

  routes.ajustes = function () {
    const bp = S.settings.epn;
    setView(`<h1>Ajustes</h1><p class="sub">Tu perfil, el formato de los simulacros y las copias de seguridad.</p>
      <div class="grid g2">
        <div class="card"><h3>Perfil</h3><label for="nm">Nombre</label><div class="row" style="margin:6px 0 14px"><input type="text" id="nm" maxlength="40" value="${esc(S.profile.name)}"><button class="btn" id="svn">Guardar</button></div>
          <label>Tema visual</label><div class="row" style="margin-top:6px"><button class="btn small ${S.profile.theme !== 'dark' ? 'primary' : ''}" data-th="light">Claro</button><button class="btn small ${S.profile.theme === 'dark' ? 'primary' : ''}" data-th="dark">Oscuro</button></div></div>
        <div class="card"><h3>Copia de seguridad</h3><p class="small muted">Tu progreso vive en este navegador. Descarga una copia cada semana y guárdala en una memoria USB o en tu correo.</p>
          <div class="row"><button class="btn primary" id="exp">Descargar copia</button><label class="btn" for="imp" style="font-weight:600">Restaurar copia</label><input type="file" id="imp" accept=".json,application/json" style="display:none"></div>
          <p class="small muted" id="impmsg"></p></div>
      </div>
      <h2>Formato del simulacro EPN</h2><div class="card"><p class="small muted">Valores del ciclo ${esc(bp.cycle)}. Cámbialos cuando la EPN publique los lineamientos de tu ciclo.</p>
        <div class="row" style="margin-bottom:10px"><label for="cy">Ciclo</label><input type="text" id="cy" value="${esc(bp.cycle)}" style="width:120px"></div>
        <table><tr><th>Área</th><th>Preguntas</th><th>Minutos</th><th>Peso (puntos)</th></tr>${bp.sections.map((x, i) => `<tr><td>${SUBJ[x.subj].name}</td><td><input type="number" min="0" max="60" data-f="count" data-i="${i}" value="${x.count}"></td><td><input type="number" min="1" max="300" data-f="minutes" data-i="${i}" value="${x.minutes}"></td><td><input type="number" min="0" max="1000" data-f="weight" data-i="${i}" value="${x.weight}"></td></tr>`).join('')}</table>
        <div class="row" style="margin-top:12px"><label for="hab">Mínimo habilitante de Matemática (aciertos)</label><input type="number" id="hab" min="0" max="60" value="${bp.habilitanteMin == null ? '' : bp.habilitanteMin}" placeholder="—"><span class="small muted">Déjalo vacío si aún no conoces el oficial de tu carrera.</span></div>
        <div class="row" style="margin-top:14px"><button class="btn primary" id="svbp">Guardar formato</button><button class="btn" id="rsbp">Restaurar 2026-B</button><span class="small muted" id="bpmsg"></span></div></div>
      <h2>Zona de peligro</h2><div class="card"><p class="small muted">Borra todo tu progreso de este navegador. Descarga una copia antes.</p><button class="btn danger" id="wipe">Borrar todo mi progreso</button></div>`);
    $('#svn').onclick = () => { const v = $('#nm').value.trim(); if (v) { S.profile.name = v; save(); routes.ajustes(); } };
    app().querySelectorAll('[data-th]').forEach(b => b.onclick = () => { S.profile.theme = b.dataset.th; applyTheme(); save(); routes.ajustes(); });
    $('#exp').onclick = () => {
      const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = 'rumbo-copia-' + new Date().toISOString().slice(0, 10) + '.json'; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    $('#imp').onchange = e => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const d = JSON.parse(r.result);
          if (!d || d.version !== 1 || !Array.isArray(d.attempts)) throw new Error('formato');
          if (!confirm('Esto reemplaza tu progreso actual por el de la copia. ¿Continuar?')) return;
          localStorage.setItem(KEY, JSON.stringify(d)); load(); applyTheme(); render();
        } catch (err) { $('#impmsg').textContent = 'Ese archivo no es una copia válida de Rumbo.'; }
      };
      r.readAsText(f);
    };
    $('#svbp').onclick = () => {
      app().querySelectorAll('[data-f]').forEach(inp => { const v = parseInt(inp.value, 10); if (!isNaN(v) && v >= 0) bp.sections[+inp.dataset.i][inp.dataset.f] = v; });
      bp.cycle = $('#cy').value.trim() || bp.cycle;
      bp.name = 'Simulacro EPN (formato ' + bp.cycle + ')';
      const h = $('#hab').value.trim(); bp.habilitanteMin = h === '' ? null : Math.max(0, parseInt(h, 10) || 0);
      save(); $('#bpmsg').textContent = 'Guardado.';
    };
    $('#rsbp').onclick = () => { S.settings.epn = JSON.parse(JSON.stringify(DEFAULT_EPN)); save(); routes.ajustes(); };
    $('#wipe').onclick = () => { if (confirm('¿Seguro? Se borrará todo tu progreso de este navegador.') && confirm('Última confirmación: ¿borrar todo?')) { localStorage.removeItem(KEY); load(); applyTheme(); go('#/hoy'); render(); } };
  };

  // ---------- Arranque ----------
  function applyTheme() { document.documentElement.dataset.theme = S.profile.theme === 'dark' ? 'dark' : 'light'; }
  load(); applyTheme();
  try { localStorage.setItem('rumbo.test', '1'); localStorage.removeItem('rumbo.test'); } catch (e) { storageOk = false; }
  $('#menuBtn').onclick = () => $('#sidebar').classList.toggle('open');
  window.addEventListener('hashchange', render);
  render();

  // Expuesto solo para pruebas automáticas.
  window.__rumbo = { mastery, Q, TOPIC, get S() { return S; }, recommendations, dueErrors };
})();
