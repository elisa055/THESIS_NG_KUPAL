/* =============================================
   Editor.js — Page Editor (Colors + Font Style)
   ============================================= */
(function () {

  const $ = id => document.getElementById(id);
  const $$ = s => [...document.querySelectorAll(s)];

  /* ── COLOR STATE ────────────────────────────── */
  const V = {
    cNB: '#808080', cNT: '#ffffff',
    cPG: '#ffffff',
    cCD: '#ffffff',
    cTX: '#333333', cMT: '#777777',
    cAC: '#cfcfcf', cAT: '#333333',
    cBD: '#cfcfcf',
  };

  /* ── FONT STATE ─────────────────────────────── */
  const F = {
    family: "'Montserrat',sans-serif",
    size:   '14',
    weight: '400',
    style:  'normal',
  };

  /* ── DYNAMIC STYLE TAG ──────────────────────── */
  const sty = document.createElement('style');
  sty.id = 'ed-dyn';
  document.head.appendChild(sty);

  /* ── APPLY STYLES ───────────────────────────── */
  function apply() {
    sty.textContent = `
      body {
        background-color: ${V.cPG} !important;
        font-family: ${F.family} !important;
        font-size: ${F.size}px !important;
        font-weight: ${F.weight} !important;
        font-style: ${F.style} !important;
        color: ${V.cTX} !important;
      }
      .header, .navbar {
        background-color: ${V.cNB} !important;
      }
      .header *, .navbar * {
        color: ${V.cNT} !important;
        font-family: ${F.family} !important;
        font-weight: ${F.weight} !important;
        font-style: ${F.style} !important;
      }
      .header-center a, .navcenter a, .logout, .logout a {
        color: ${V.cNT} !important;
      }
      .main-content, .page, .dashboard {
        background-color: ${V.cPG} !important;
      }
      .visit-card, .card, .info-card, .table-card, .legend-box, .map-card {
        background-color: ${V.cCD} !important;
        border-color: ${V.cBD} !important;
      }
      .title, .subtitle, .subtitle2, .label, .field,
      .section-title, .store-name, .store-sub, .visit-date {
        color: ${V.cMT} !important;
        font-family: ${F.family} !important;
      }
      .done-btn, .view-btn, .edit-btn, .tab, button {
        background-color: ${V.cAC} !important;
        color: ${V.cAT} !important;
        border-color: ${V.cBD} !important;
        font-family: ${F.family} !important;
        font-weight: ${F.weight} !important;
      }
      h1, h2, h3, h4 {
        color: ${V.cTX} !important;
        font-family: ${F.family} !important;
        font-weight: ${F.weight} !important;
        font-style: ${F.style} !important;
      }
      input, select, label, p, span, a {
        font-family: ${F.family} !important;
        font-size: ${F.size}px !important;
        font-style: ${F.style} !important;
      }
      hr { border-top-color: ${V.cBD} !important; }
    `;
  }

  /* ── COLOR PRESETS ──────────────────────────── */
  const presets = [
    { title:'Default', nb:'#808080',nt:'#fff',pg:'#ffffff',cd:'#ffffff',tx:'#333',mt:'#777',ac:'#cfcfcf',at:'#333',bd:'#cfcfcf', style:'background:linear-gradient(135deg,#808080 50%,#fff 50%)' },
    { title:'Maroon',  nb:'#6b0f12',nt:'#fff',pg:'#f5f0f0',cd:'#fdf7f7',tx:'#2a1a1a',mt:'#7a3a3a',ac:'#6b0f12',at:'#fff',bd:'#e8cece', style:'background:linear-gradient(135deg,#6b0f12 50%,#f5f0f0 50%)' },
    { title:'Navy',    nb:'#1a3a6b',nt:'#fff',pg:'#eef2f8',cd:'#f4f7fc',tx:'#1a2a3a',mt:'#3a5a8a',ac:'#1a3a6b',at:'#fff',bd:'#c5d4e8', style:'background:linear-gradient(135deg,#1a3a6b 50%,#eef2f8 50%)' },
    { title:'Forest',  nb:'#1a5c2e',nt:'#fff',pg:'#eef6f0',cd:'#f4fbf6',tx:'#1a2a1e',mt:'#3a6a4a',ac:'#1a5c2e',at:'#fff',bd:'#b5d8c0', style:'background:linear-gradient(135deg,#1a5c2e 50%,#eef6f0 50%)' },
    { title:'Dark',    nb:'#1e1e2e',nt:'#e0e0f0',pg:'#111827',cd:'#1e293b',tx:'#e0e8f0',mt:'#94a3b8',ac:'#38bdf8',at:'#0f172a',bd:'#334155', style:'background:linear-gradient(135deg,#1e1e2e 50%,#1e293b 50%);outline:1px solid #555' },
    { title:'Golden',  nb:'#8a6400',nt:'#fff',pg:'#fdf8ec',cd:'#fffdf5',tx:'#3a2e00',mt:'#6a5200',ac:'#8a6400',at:'#fff',bd:'#e8d898', style:'background:linear-gradient(135deg,#8a6400 50%,#fdf8ec 50%)' },
    { title:'Rose',    nb:'#9d174d',nt:'#fff',pg:'#fdf2f8',cd:'#fff',tx:'#3d0a24',mt:'#9d174d',ac:'#9d174d',at:'#fff',bd:'#f0abcf', style:'background:linear-gradient(135deg,#9d174d 50%,#fdf2f8 50%)' },
    { title:'Slate',   nb:'#334155',nt:'#f1f5f9',pg:'#f8fafc',cd:'#fff',tx:'#1e293b',mt:'#475569',ac:'#334155',at:'#fff',bd:'#cbd5e1', style:'background:linear-gradient(135deg,#334155 50%,#f8fafc 50%)' },
  ];

  /* ── BUILD SIDEBAR ──────────────────────────── */
  function buildSidebar() {

    const presetsHTML = presets.map(p => `
      <div class="pt" title="${p.title}"
        data-nb="${p.nb}" data-nt="${p.nt}" data-pg="${p.pg}" data-cd="${p.cd}"
        data-tx="${p.tx}" data-mt="${p.mt}" data-ac="${p.ac}" data-at="${p.at}" data-bd="${p.bd}"
        style="${p.style}"></div>
    `).join('');

    const colorsHTML = `
      <div class="sg"><em>Navbar BG</em>      <div class="cr"><input type="color" id="cNB" value="${V.cNB}"><span class="chx" id="cNBx">${V.cNB}</span></div></div>
      <div class="sg"><em>Navbar Text</em>    <div class="cr"><input type="color" id="cNT" value="${V.cNT}"><span class="chx" id="cNTx">${V.cNT}</span></div></div>
      <div class="sg"><em>Page BG</em>        <div class="cr"><input type="color" id="cPG" value="${V.cPG}"><span class="chx" id="cPGx">${V.cPG}</span></div></div>
      <div class="sg"><em>Card / Surface</em> <div class="cr"><input type="color" id="cCD" value="${V.cCD}"><span class="chx" id="cCDx">${V.cCD}</span></div></div>
      <div class="sg"><em>Body Text</em>      <div class="cr"><input type="color" id="cTX" value="${V.cTX}"><span class="chx" id="cTXx">${V.cTX}</span></div></div>
      <div class="sg"><em>Muted Text</em>     <div class="cr"><input type="color" id="cMT" value="${V.cMT}"><span class="chx" id="cMTx">${V.cMT}</span></div></div>
      <div class="sg"><em>Button BG</em>      <div class="cr"><input type="color" id="cAC" value="${V.cAC}"><span class="chx" id="cACx">${V.cAC}</span></div></div>
      <div class="sg"><em>Button Text</em>    <div class="cr"><input type="color" id="cAT" value="${V.cAT}"><span class="chx" id="cATx">${V.cAT}</span></div></div>
      <div class="sg"><em>Border</em>         <div class="cr"><input type="color" id="cBD" value="${V.cBD}"><span class="chx" id="cBDx">${V.cBD}</span></div></div>
      <div class="lsep"></div>
      <div class="sg"><em>Quick Presets</em>  <div class="pts">${presetsHTML}</div></div>
    `;

    const fontsHTML = `
      <div class="sg"><em>Font Family</em>
        <select id="fFamily" class="sc">
          <option value="'Montserrat',sans-serif" selected>Montserrat</option>
          <option value="Arial,sans-serif">Arial</option>
          <option value="'Poppins',sans-serif">Poppins</option>
          <option value="'Inter',sans-serif">Inter</option>
          <option value="'Raleway',sans-serif">Raleway</option>
          <option value="'Nunito',sans-serif">Nunito</option>
          <option value="'DM Sans',sans-serif">DM Sans</option>
          <option value="Georgia,serif">Georgia</option>
        </select>
      </div>
      <div class="sg"><em>Font Size</em>
        <div class="rr">
          <input type="range" id="fSize" min="12" max="22" value="14" step="1">
          <span class="rv" id="fSizeV">14px</span>
        </div>
      </div>
      <div class="sg"><em>Font Weight</em>
        <select id="fWeight" class="sc">
          <option value="300">Light (300)</option>
          <option value="400" selected>Regular (400)</option>
          <option value="500">Medium (500)</option>
          <option value="600">SemiBold (600)</option>
          <option value="700">Bold (700)</option>
        </select>
      </div>
      <div class="sg"><em>Font Style</em>
        <select id="fStyle" class="sc">
          <option value="normal" selected>Normal</option>
          <option value="italic">Italic</option>
        </select>
      </div>
    `;

    const aside = document.createElement('aside');
    aside.id = 'ed-sb';
    aside.className = 'off';
    aside.innerHTML = `
      <div id="sbDrag">
        <div class="sb-title">
          <span class="sb-title-dot"></span>
          PAGE EDITOR
        </div>
        <button id="bClose">✕</button>
      </div>
      <div class="sb-nav">
        <button class="sn a" data-t="c">Colors</button>
        <button class="sn"   data-t="f">Font</button>
      </div>
      <div class="sp a" id="t-c">${colorsHTML}</div>
      <div class="sp"   id="t-f">${fontsHTML}</div>
    `;
    document.body.appendChild(aside);

    const fab = document.createElement('button');
    fab.id = 'ed-fab';
    fab.title = 'Open Page Editor';
    fab.textContent = '✦';
    document.body.appendChild(fab);

    const toastEl = document.createElement('div');
    toastEl.id = 'ed-toast';
    document.body.appendChild(toastEl);
  }

  /* ── TOAST ──────────────────────────────────── */
  function toast(msg) {
    const t = $('ed-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('on');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('on'), 2400);
  }

  /* ── GOOGLE FONT ───────────────────────── */
  function loadFont(family) {
    const name = family.replace(/['"]/g, '').split(',')[0].trim();
    const systemFonts = ['Arial', 'Georgia', 'Times New Roman', 'Courier New'];
    if (systemFonts.includes(name)) return;
    const id = 'gf-' + name.replace(/\s/g, '-');
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@300;400;500;600;700&display=swap`;
    document.head.appendChild(link);
  }

  /* ── BIND EVENTS ────────────────────────────── */
  function bindEvents() {
    const sb  = $('ed-sb');
    const fab = $('ed-fab');

    /* FAB toggle */
    fab.addEventListener('click', () => {
      const hidden = sb.classList.contains('off');
      if (hidden) { sb.style.left = ''; sb.style.top = ''; sb.style.right = '14px'; }
      sb.classList.toggle('off');
    });
    $('bClose').addEventListener('click', () => sb.classList.add('off'));

    /* Drag */
    const handle = $('sbDrag');
    let drag = false, sx = 0, sy = 0, ox = 0, oy = 0;
    handle.addEventListener('pointerdown', e => {
      if (e.target.id === 'bClose') return;
      drag = true; handle.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY;
      const r = sb.getBoundingClientRect(); ox = r.left; oy = r.top;
      sb.style.right = 'auto'; sb.style.left = ox + 'px'; sb.style.top = oy + 'px';
      sb.style.transition = 'none';
    });
    handle.addEventListener('pointermove', e => {
      if (!drag) return;
      sb.style.left = Math.max(0, Math.min(window.innerWidth  - sb.offsetWidth,  ox + e.clientX - sx)) + 'px';
      sb.style.top  = Math.max(0, Math.min(window.innerHeight - sb.offsetHeight, oy + e.clientY - sy)) + 'px';
    });
    handle.addEventListener('pointerup',     () => { drag = false; sb.style.transition = ''; });
    handle.addEventListener('pointercancel', () => { drag = false; sb.style.transition = ''; });

    /* Tabs */
    $$('.sn').forEach(t => {
      t.addEventListener('click', () => {
        $$('.sn').forEach(x => x.classList.remove('a'));
        $$('.sp').forEach(x => x.classList.remove('a'));
        t.classList.add('a');
        $('t-' + t.dataset.t).classList.add('a');
      });
    });

    /* Color pickers */
    Object.keys(V).forEach(k => {
      const el = $(k); if (!el) return;
      el.addEventListener('input', () => {
        V[k] = el.value;
        const hx = $(k + 'x'); if (hx) hx.textContent = el.value;
        apply();
      });
    });

    /* Presets */
    $$('.pt').forEach(p => {
      p.addEventListener('click', () => {
        const d = p.dataset;
        V.cNB = d.nb; V.cNT = d.nt; V.cPG = d.pg; V.cCD = d.cd;
        V.cTX = d.tx; V.cMT = d.mt; V.cAC = d.ac; V.cAT = d.at; V.cBD = d.bd;
        Object.keys(V).forEach(k => {
          const el = $(k); if (el) el.value = V[k];
          const hx = $(k + 'x'); if (hx) hx.textContent = V[k];
        });
        apply();
        toast('✓ ' + (p.title || 'Preset') + ' applied!');
      });
    });

    /* Font family */
    $('fFamily').addEventListener('change', () => {
      F.family = $('fFamily').value;
      loadFont(F.family);
      apply();
    });

    /* Font size */
    $('fSize').addEventListener('input', () => {
      F.size = $('fSize').value;
      $('fSizeV').textContent = F.size + 'px';
      apply();
    });

    /* Font weight */
    $('fWeight').addEventListener('change', () => {
      F.weight = $('fWeight').value;
      apply();
    });

    /* Font style */
    $('fStyle').addEventListener('change', () => {
      F.style = $('fStyle').value;
      apply();
    });
  }

  /* ── INIT ───────────────────────────────────── */
  buildSidebar();
  bindEvents();
  apply();

})();
