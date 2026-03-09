/* =============================================
   editor.js — Universal Page Editor
   Works on ALL pages. Auto-detects page type
   and shows relevant editing controls.
   ============================================= */
(function () {

  /* ── UTILS ─────────────────────────────────── */
  const $ = id => document.getElementById(id);
  const $$ = s => [...document.querySelectorAll(s)];
  const set = (id, v) => { const e = $(id); if (e) e.textContent = v; };

  /* ── DETECT PAGE ────────────────────────────── */
  const PAGE = (() => {
    const p = location.pathname.toLowerCase();
    if (p.includes('register'))    return 'register';
    if (p.includes('dashboard'))   return 'dashboard';
    if (p.includes('map'))         return 'map';
    if (p.includes('report'))      return 'report';
    if (p.includes('dpo') || p === '/' || p.endsWith('.html') && document.title.toLowerCase().includes('privacy'))
      return 'dpo';
    return 'generic';
  })();

  /* ── PAGE LABELS ────────────────────────────── */
  const PAGE_NAMES = {
    register: 'Register', dashboard: 'Dashboard',
    map: 'Map View', report: 'Report Logs', dpo: 'DPO', generic: 'Page'
  };

  /* ── SHARED COLOR STATE ─────────────────────── */
  const V = {
    // Navbar
    cNB: '#8f8f8f', cNT: '#ffffff',
    // Page background
    cPG: '#efefef',
    // Card / surface
    cCD: '#e5e5e5',
    // Text
    cTX: '#333333', cMT: '#777777',
    // Accent / button
    cAC: '#666666', cAT: '#ffffff',
    // Border
    cBD: '#cccccc',
    // Font
    fFont: 'Arial,sans-serif', fSz: '14',
  };

  /* ── REGISTER-SPECIFIC STATE ────────────────── */
  const VR = {
    cH: '#808080', cHT: '#ffffff', cFB: '#ffffff',
    cIB: '#f9f9f9', cLB: '#666666', cBT: '#666666', cBTT: '#ffffff',
    fFont: "'Montserrat',sans-serif", fSz: '14', tSz: '24', fWt: '500',
    sIR: '4', sBR: '4', sFW: '800', sFP: '20', sFG: '20', sIP: '12',
  };

  /* ── DYNAMIC STYLE TAG ──────────────────────── */
  const sty = document.createElement('style');
  sty.id = 'ed-dyn';
  document.head.appendChild(sty);

  /* ── APPLY STYLES ───────────────────────────── */
  function apply() {
    if (PAGE === 'register') {
      sty.textContent = `
        body{background-color:${V.cPG}!important;font-family:${VR.fFont}!important;font-size:${VR.fSz}px!important;color:${V.cTX}!important;}
        .container{background-color:${VR.cFB}!important;}
        .header{background-color:${VR.cH}!important;color:${VR.cHT}!important;}
        .header-left h1,.header-left p,.header-right h2,.header-right p,.logout{color:${VR.cHT}!important;}
        .form-container{background-color:${VR.cFB}!important;color:${V.cTX}!important;max-width:${VR.sFW}px!important;}
        .form-container h2{font-size:${VR.tSz}px!important;}
        .subtitle{color:${VR.cLB}!important;}
        .form-group label,legend{color:${VR.cLB}!important;font-weight:${VR.fWt}!important;}
        .form-group input,.form-group select{background-color:${VR.cIB}!important;border-color:${V.cBD}!important;color:${V.cTX}!important;border-radius:${VR.sIR}px!important;padding:${VR.sIP}px!important;font-family:${VR.fFont}!important;}
        .form-group input:focus,.form-group select:focus{border-color:${VR.cLB}!important;background-color:${VR.cFB}!important;}
        .pin-location-btn{background-color:${VR.cBT}!important;color:${VR.cBTT}!important;border-radius:${VR.sBR}px!important;}
        .btn-register{background-color:${VR.cBT}!important;color:${VR.cBTT}!important;border-color:${VR.cBT}!important;border-radius:${VR.sBR}px!important;}
        .btn-cancel{border-radius:${VR.sBR}px!important;}
        .radio-label,.checkbox-label{color:${VR.cLB}!important;}
        .consent-section{border-top-color:${V.cBD}!important;}
        .main-content{padding:30px ${VR.sFP}px!important;}
        .form-row{gap:${VR.sFG}px!important;margin-bottom:${VR.sFG}px!important;}
      `;
    } else {
      sty.textContent = `
        body{background-color:${V.cPG}!important;font-family:${V.fFont}!important;font-size:${V.fSz}px!important;color:${V.cTX}!important;}
        .navbar,.header{background-color:${V.cNB}!important;}
        .navbar *,.header *{color:${V.cNT}!important;}
        .navcenter a,.header-center a,.logout,.logout a{color:${V.cNT}!important;}
        .page{background-color:${V.cPG}!important;}
        .dashboard{background-color:${V.cPG}!important;}
        .card,.info-card,.table-card,.legend,.map-card{background-color:${V.cCD}!important;border-color:${V.cBD}!important;}
        .label,.field,.financial-title,.section-title,.store-name,.store-sub,.zone,.admin-name,.admin-email,.title,.subtitle{color:${V.cMT}!important;}
        .view-btn,.edit-btn,.tab{background-color:${V.cAC}!important;color:${V.cAT}!important;border-color:${V.cBD}!important;}
        hr{border-top-color:${V.cBD}!important;}
        .pill{background-color:${V.cCD}!important;}
        .tabs{background-color:${V.cCD}!important;}
        h1,h2,h3,h4{color:${V.cTX}!important;}
      `;
    }
  }

  /* ── APPLY REGISTER LABELS ──────────────────── */
  function applyLabels() {
    if (PAGE !== 'register') return;
    set('fTitle', $('lTi') ? $('lTi').value : '');
    set('fSub',   $('lSu') ? $('lSu').value : '');
    set('fBrgy',  $('lBr') ? $('lBr').value : '');
    set('fPort',  $('lPo') ? $('lPo').value : '');
    const legs = $$('fieldset legend');
    if (legs[0] && $('lS1')) legs[0].textContent = $('lS1').value;
    if (legs[1] && $('lS2')) legs[1].textContent = $('lS2').value;
    ['fLB','fLO','fLBT','fLRT','fLA','fLC','fLSc','fBReg','fBCan','fBPin'].forEach(id => {
      const inp = $('l' + id.slice(1));
      if (inp) set(id, inp.value);
    });
  }

  /* ── BUILD SIDEBAR HTML ─────────────────────── */
  function buildSidebar() {

    // Shared color presets
    const presets = [
      { title:'Default',  h:'#8f8f8f',ht:'#fff',pg:'#efefef',cd:'#e5e5e5',tx:'#333',mt:'#777',ac:'#666',at:'#fff',bd:'#ccc',nb:'#8f8f8f',nt:'#fff', style:'background:linear-gradient(135deg,#8f8f8f 50%,#efefef 50%)' },
      { title:'Maroon',   h:'#6b0f12',ht:'#fff',pg:'#f5f0f0',cd:'#fdf7f7',tx:'#2a1a1a',mt:'#7a3a3a',ac:'#6b0f12',at:'#fff',bd:'#e8cece',nb:'#6b0f12',nt:'#fff', style:'background:linear-gradient(135deg,#6b0f12 50%,#f5f0f0 50%)' },
      { title:'Navy',     h:'#1a3a6b',ht:'#fff',pg:'#eef2f8',cd:'#f4f7fc',tx:'#1a2a3a',mt:'#3a5a8a',ac:'#1a3a6b',at:'#fff',bd:'#c5d4e8',nb:'#1a3a6b',nt:'#fff', style:'background:linear-gradient(135deg,#1a3a6b 50%,#eef2f8 50%)' },
      { title:'Forest',   h:'#1a5c2e',ht:'#fff',pg:'#eef6f0',cd:'#f4fbf6',tx:'#1a2a1e',mt:'#3a6a4a',ac:'#1a5c2e',at:'#fff',bd:'#b5d8c0',nb:'#1a5c2e',nt:'#fff', style:'background:linear-gradient(135deg,#1a5c2e 50%,#eef6f0 50%)' },
      { title:'Dark',     h:'#1e1e2e',ht:'#e0e0f0',pg:'#111827',cd:'#1e293b',tx:'#e0e8f0',mt:'#94a3b8',ac:'#38bdf8',at:'#0f172a',bd:'#334155',nb:'#1e1e2e',nt:'#e0e0f0', style:'background:linear-gradient(135deg,#1e1e2e 50%,#1e293b 50%);outline:1px solid #555' },
      { title:'Golden',   h:'#8a6400',ht:'#fff',pg:'#fdf8ec',cd:'#fffdf5',tx:'#3a2e00',mt:'#6a5200',ac:'#8a6400',at:'#fff',bd:'#e8d898',nb:'#8a6400',nt:'#fff', style:'background:linear-gradient(135deg,#8a6400 50%,#fdf8ec 50%)' },
      { title:'Rose',     h:'#9d174d',ht:'#fff',pg:'#fdf2f8',cd:'#fff',tx:'#3d0a24',mt:'#9d174d',ac:'#9d174d',at:'#fff',bd:'#f0abcf',nb:'#9d174d',nt:'#fff', style:'background:linear-gradient(135deg,#9d174d 50%,#fdf2f8 50%)' },
      { title:'Slate',    h:'#334155',ht:'#f1f5f9',pg:'#f8fafc',cd:'#fff',tx:'#1e293b',mt:'#475569',ac:'#334155',at:'#fff',bd:'#cbd5e1',nb:'#334155',nt:'#f1f5f9', style:'background:linear-gradient(135deg,#334155 50%,#f8fafc 50%)' },
    ];

    const presetsHTML = presets.map(p =>
      `<div class="pt" title="${p.title}"
        data-h="${p.h}" data-ht="${p.ht}" data-pg="${p.pg}" data-cd="${p.cd}"
        data-tx="${p.tx}" data-mt="${p.mt}" data-ac="${p.ac}" data-at="${p.at}"
        data-bd="${p.bd}" data-nb="${p.nb}" data-nt="${p.nt}"
        style="${p.style}"></div>`
    ).join('');

    // Shared colors tab (all pages)
    const colorsTab = `
      <div class="sg"><em>Navbar</em>       <div class="cr"><input type="color" id="cNB" value="${V.cNB}"><span class="chx" id="cNBx">${V.cNB}</span></div></div>
      <div class="sg"><em>Navbar Text</em>  <div class="cr"><input type="color" id="cNT" value="${V.cNT}"><span class="chx" id="cNTx">${V.cNT}</span></div></div>
      <div class="sg"><em>Page BG</em>      <div class="cr"><input type="color" id="cPG" value="${V.cPG}"><span class="chx" id="cPGx">${V.cPG}</span></div></div>
      <div class="sg"><em>Card / Surface</em><div class="cr"><input type="color" id="cCD" value="${V.cCD}"><span class="chx" id="cCDx">${V.cCD}</span></div></div>
      <div class="sg"><em>Body Text</em>    <div class="cr"><input type="color" id="cTX" value="${V.cTX}"><span class="chx" id="cTXx">${V.cTX}</span></div></div>
      <div class="sg"><em>Muted Text</em>   <div class="cr"><input type="color" id="cMT" value="${V.cMT}"><span class="chx" id="cMTx">${V.cMT}</span></div></div>
      <div class="sg"><em>Accent / Btn</em> <div class="cr"><input type="color" id="cAC" value="${V.cAC}"><span class="chx" id="cACx">${V.cAC}</span></div></div>
      <div class="sg"><em>Accent Text</em>  <div class="cr"><input type="color" id="cAT" value="${V.cAT}"><span class="chx" id="cATx">${V.cAT}</span></div></div>
      <div class="sg"><em>Border</em>       <div class="cr"><input type="color" id="cBD" value="${V.cBD}"><span class="chx" id="cBDx">${V.cBD}</span></div></div>
      <div class="lsep"></div>
      <div class="sg"><em>Quick Presets</em><div class="pts">${presetsHTML}</div></div>
    `;

    // Register-specific extra colors
    const regColorsExtra = PAGE === 'register' ? `
      <div class="lsep"></div>
      <div class="sg"><em>Form Header BG</em>  <div class="cr"><input type="color" id="cH"   value="${VR.cH}"><span class="chx" id="cHx">${VR.cH}</span></div></div>
      <div class="sg"><em>Form Header Text</em><div class="cr"><input type="color" id="cHT"  value="${VR.cHT}"><span class="chx" id="cHTx">${VR.cHT}</span></div></div>
      <div class="sg"><em>Form BG</em>         <div class="cr"><input type="color" id="cFB"  value="${VR.cFB}"><span class="chx" id="cFBx">${VR.cFB}</span></div></div>
      <div class="sg"><em>Input BG</em>        <div class="cr"><input type="color" id="cIB"  value="${VR.cIB}"><span class="chx" id="cIBx">${VR.cIB}</span></div></div>
      <div class="sg"><em>Label Color</em>     <div class="cr"><input type="color" id="cLB"  value="${VR.cLB}"><span class="chx" id="cLBx">${VR.cLB}</span></div></div>
      <div class="sg"><em>Button Color</em>    <div class="cr"><input type="color" id="cBT"  value="${VR.cBT}"><span class="chx" id="cBTx">${VR.cBT}</span></div></div>
      <div class="sg"><em>Button Text</em>     <div class="cr"><input type="color" id="cBTT" value="${VR.cBTT}"><span class="chx" id="cBTTx">${VR.cBTT}</span></div></div>
    ` : '';

    // Fonts tab
    const fontsTab = `
      <div class="sg"><em>Font Family</em>
        <select id="edFont" class="sc">
          <option value="Arial,sans-serif" ${V.fFont==='Arial,sans-serif'?'selected':''}>Arial (Default)</option>
          <option value="'Montserrat',sans-serif">Montserrat</option>
          <option value="'DM Sans',sans-serif">DM Sans</option>
          <option value="'Poppins',sans-serif">Poppins</option>
          <option value="'Raleway',sans-serif">Raleway</option>
          <option value="'Nunito',sans-serif">Nunito</option>
          <option value="'Inter',sans-serif">Inter</option>
          <option value="Georgia,serif">Georgia</option>
        </select>
      </div>
      <div class="sg"><em>Base Font Size</em>
        <div class="rr"><input type="range" id="edFSz" min="12" max="20" value="14" step="1"><span class="rv" id="edFSzV">14px</span></div>
      </div>
      ${PAGE === 'register' ? `
      <div class="sg"><em>Title Size</em>
        <div class="rr"><input type="range" id="tSz" min="16" max="40" value="24" step="1"><span class="rv" id="tSzV">24px</span></div>
      </div>
      <div class="sg"><em>Label Weight</em>
        <select id="fWt" class="sc">
          <option value="400">Regular</option>
          <option value="500" selected>Medium</option>
          <option value="600">SemiBold</option>
          <option value="700">Bold</option>
        </select>
      </div>` : ''}
    `;

    // Labels tab — page-specific
    const labelsTab = buildLabelsTab();

    // Spacing tab
    const spacingTab = PAGE === 'register' ? `
      <div class="sg"><em>Input Radius</em>
        <div class="rr"><input type="range" id="sIR" min="0" max="20" value="4" step="1"><span class="rv" id="sIRV">4px</span></div>
      </div>
      <div class="sg"><em>Button Radius</em>
        <div class="rr"><input type="range" id="sBR" min="0" max="40" value="4" step="1"><span class="rv" id="sBRV">4px</span></div>
      </div>
      <div class="sg"><em>Form Max Width</em>
        <div class="rr"><input type="range" id="sFW" min="400" max="1200" value="800" step="20"><span class="rv" id="sFWV">800px</span></div>
      </div>
      <div class="sg"><em>Content Padding</em>
        <div class="rr"><input type="range" id="sFP" min="0" max="80" value="20" step="4"><span class="rv" id="sFPV">20px</span></div>
      </div>
      <div class="sg"><em>Field Gap</em>
        <div class="rr"><input type="range" id="sFG" min="8" max="40" value="20" step="2"><span class="rv" id="sFGV">20px</span></div>
      </div>
      <div class="sg"><em>Input Padding</em>
        <div class="rr"><input type="range" id="sIP" min="6" max="24" value="12" step="1"><span class="rv" id="sIPV">12px</span></div>
      </div>
    ` : `
      <div class="sg"><em>Page Padding</em>
        <div class="rr"><input type="range" id="edPad" min="10" max="100" value="40" step="4"><span class="rv" id="edPadV">40px</span></div>
      </div>
      <div class="sg"><em>Card Radius</em>
        <div class="rr"><input type="range" id="edRad" min="0" max="24" value="12" step="2"><span class="rv" id="edRadV">12px</span></div>
      </div>
      <div class="sg"><em>Nav Padding</em>
        <div class="rr"><input type="range" id="edNavP" min="8" max="40" value="16" step="2"><span class="rv" id="edNavPV">16px</span></div>
      </div>
    `;

    // Build full sidebar
    const aside = document.createElement('aside');
    aside.id = 'ed-sb';
    aside.className = 'off';
    aside.innerHTML = `
      <div id="sbDrag">
        <div class="sb-title">
          <span class="sb-title-dot"></span>
          PAGE EDITOR
          <span class="sb-page-badge">${PAGE_NAMES[PAGE]}</span>
        </div>
        <button id="bClose">✕</button>
      </div>
      <div class="sb-nav">
        <button class="sn a" data-t="c">Colors</button>
        <button class="sn"   data-t="f">Fonts</button>
        <button class="sn"   data-t="l">Labels</button>
        <button class="sn"   data-t="s">Spacing</button>
      </div>
      <div class="sp a" id="t-c">${colorsTab}${regColorsExtra}</div>
      <div class="sp"   id="t-f">${fontsTab}</div>
      <div class="sp"   id="t-l">${labelsTab}</div>
      <div class="sp"   id="t-s">${spacingTab}</div>
    `;
    document.body.appendChild(aside);

    // FAB
    const fab = document.createElement('button');
    fab.id = 'ed-fab';
    fab.title = 'Open Page Editor';
    fab.textContent = '✦';
    document.body.appendChild(fab);

    // Toast
    const toast = document.createElement('div');
    toast.id = 'ed-toast';
    document.body.appendChild(toast);
  }

  /* ── BUILD LABELS TAB ───────────────────────── */
  function buildLabelsTab() {
    if (PAGE === 'register') {
      return `
        <div class="sg"><em>Form Title</em>         <input type="text" class="sc" id="lTi"  value="Register Business"></div>
        <div class="sg"><em>Subtitle</em>            <input type="text" class="sc" id="lSu"  value="Fill up business details and payment information"></div>
        <div class="sg"><em>Barangay Name</em>       <input type="text" class="sc" id="lBr"  value="Barangay Pembo"></div>
        <div class="sg"><em>Portal Label</em>        <input type="text" class="sc" id="lPo"  value="Business Owner Portal"></div>
        <div class="lsep"></div>
        <div class="sg"><em>Section 1 Title</em>     <input type="text" class="sc" id="lS1"  value="Business Information"></div>
        <div class="sg"><em>Section 2 Title</em>     <input type="text" class="sc" id="lS2"  value="Financial Information"></div>
        <div class="lsep"></div>
        <div class="sg"><em>Business Name Label</em> <input type="text" class="sc" id="lLB"  value="Business Name"></div>
        <div class="sg"><em>Owner Name Label</em>    <input type="text" class="sc" id="lLO"  value="Owner Name"></div>
        <div class="sg"><em>Business Type Label</em> <input type="text" class="sc" id="lLBT" value="Business Type"></div>
        <div class="sg"><em>Reg. Type Label</em>     <input type="text" class="sc" id="lLRT" value="Registration Type"></div>
        <div class="sg"><em>Address Label</em>       <input type="text" class="sc" id="lLA"  value="Address"></div>
        <div class="sg"><em>Contact Label</em>       <input type="text" class="sc" id="lLC"  value="Contact Number"></div>
        <div class="sg"><em>Schedule Label</em>      <input type="text" class="sc" id="lLSc" value="Pick a schedule"></div>
        <div class="lsep"></div>
        <div class="sg"><em>Register Button</em>     <input type="text" class="sc" id="lBR"  value="Register"></div>
        <div class="sg"><em>Cancel Button</em>       <input type="text" class="sc" id="lBC"  value="Cancel"></div>
        <div class="sg"><em>Pin Location Button</em> <input type="text" class="sc" id="lBP"  value="Pin Your Location"></div>
      `;
    }
    if (PAGE === 'dashboard') {
      return `
        <div class="sg"><em>Page Title</em>    <input type="text" class="sc" id="lDT" value="Business Dashboard" oninput="document.title=this.value"></div>
        <div class="sg"><em>Barangay</em>      <input type="text" class="sc" id="lDB" value="Barangay Pembo" oninput="setAll('.title',this.value)"></div>
        <div class="sg"><em>Back Button</em>   <input type="text" class="sc" id="lDBk" value="← Back to Dashboard" oninput="setAll('.back',this.value)"></div>
        <div class="lsep"></div>
        <div class="sg"><em>Status Label</em>  <input type="text" class="sc" id="lDS1" value="Status" oninput="setNth('.label',0,this.value)"></div>
        <div class="sg"><em>Payment Label</em> <input type="text" class="sc" id="lDS2" value="Payment Status" oninput="setNth('.label',1,this.value)"></div>
        <div class="sg"><em>Renewal Label</em> <input type="text" class="sc" id="lDS3" value="Next Renewal Date" oninput="setNth('.label',2,this.value)"></div>
        <div class="lsep"></div>
        <div class="sg"><em>Edit Button</em>   <input type="text" class="sc" id="lDEB" value="Edit" oninput="setAll('.edit-btn',this.value)"></div>
      `;
    }
    if (PAGE === 'map') {
      return `
        <div class="sg"><em>Page Title</em>    <input type="text" class="sc" id="lMT" value="Barangay Pembo Business Location Map" oninput="setAll('h2',this.value)"></div>
        <div class="sg"><em>Subtitle</em>      <input type="text" class="sc" id="lMS" value="View all Registered Map" oninput="setAll('.subtitle2',this.value)"></div>
        <div class="sg"><em>Map Footer</em>    <input type="text" class="sc" id="lMF" value="Scroll to zoom · Click pins to select" oninput="setAll('.map-footer',this.value)"></div>
        <div class="lsep"></div>
        <div class="sg"><em>Legend Title</em>  <input type="text" class="sc" id="lMLT" value="Legend" oninput="setAll('.legend h4',this.value)"></div>
        <div class="sg"><em>Search Placeholder</em><input type="text" class="sc" id="lMSP" value="Search Business Name" oninput="setAttr('.search-box input','placeholder',this.value)"></div>
      `;
    }
    if (PAGE === 'report') {
      return `
        <div class="sg"><em>Page Title</em>         <input type="text" class="sc" id="lRT" value="Report Logs" oninput="setNth('.section-title',0,this.value)"></div>
        <div class="sg"><em>Pending Title</em>       <input type="text" class="sc" id="lRP" value="Pending Visits" oninput="setNth('.section-title',1,this.value)"></div>
        <div class="lsep"></div>
        <div class="sg"><em>Store Name</em>          <input type="text" class="sc" id="lRS" value="Baby's Store" oninput="setNth('.store-name',0,this.value)"></div>
        <div class="sg"><em>Owner Name</em>          <input type="text" class="sc" id="lRO" value="Aling Bebang" oninput="setNth('.store-sub',0,this.value)"></div>
      `;
    }
    if (PAGE === 'dpo') {
      return `
        <div class="sg"><em>Barangay Name</em> <input type="text" class="sc" id="lDPOB" value="Barangay Pembo" oninput="setAll('.title',this.value)"></div>
        <div class="sg"><em>Role Subtitle</em> <input type="text" class="sc" id="lDPOS" value="Data Privacy Officer" oninput="setAll('.subtitle',this.value)"></div>
        <div class="lsep"></div>
        <div class="sg"><em>Section Title</em> <input type="text" class="sc" id="lDPOT" value="Business Types" oninput="setAll('.types-box h2',this.value)"></div>
        <div class="sg"><em>Search Placeholder</em><input type="text" class="sc" id="lDPOSP" value="Search Business Name" oninput="setAttr('.search-box input','placeholder',this.value)"></div>
      `;
    }
    return `<div class="sg"><em>No editable labels on this page.</em></div>`;
  }

  /* ── LABEL HELPERS ──────────────────────────── */
  window.setAll  = (sel, val) => $$(sel).forEach(el => el.textContent = val);
  window.setNth  = (sel, n, val) => { const els = $$(sel); if (els[n]) els[n].textContent = val; };
  window.setAttr = (sel, attr, val) => $$(sel).forEach(el => el.setAttribute(attr, val));

  /* ── BIND EVENTS (after sidebar is injected) ── */
  function bindEvents() {
    const sb     = $('ed-sb');
    const fab    = $('ed-fab');
    const bClose = $('bClose');

    /* FAB open/close */
    fab.addEventListener('click', () => {
      const hidden = sb.classList.contains('off');
      if (hidden) { sb.style.left = ''; sb.style.top = ''; sb.style.right = '14px'; }
      sb.classList.toggle('off');
    });
    bClose.addEventListener('click', () => sb.classList.add('off'));

    /* Drag */
    const h = $('sbDrag');
    let drag = false, sx = 0, sy = 0, ox = 0, oy = 0;
    h.addEventListener('pointerdown', e => {
      if (e.target.id === 'bClose') return;
      drag = true; h.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY;
      const r = sb.getBoundingClientRect(); ox = r.left; oy = r.top;
      sb.style.right = 'auto'; sb.style.left = ox + 'px'; sb.style.top = oy + 'px';
      sb.style.transition = 'none';
    });
    h.addEventListener('pointermove', e => {
      if (!drag) return;
      sb.style.left = Math.max(0, Math.min(window.innerWidth  - sb.offsetWidth,  ox + e.clientX - sx)) + 'px';
      sb.style.top  = Math.max(0, Math.min(window.innerHeight - sb.offsetHeight, oy + e.clientY - sy)) + 'px';
    });
    h.addEventListener('pointerup',     () => { drag = false; sb.style.transition = ''; });
    h.addEventListener('pointercancel', () => { drag = false; sb.style.transition = ''; });

    /* Tabs */
    $$('.sn').forEach(t => {
      t.addEventListener('click', () => {
        $$('.sn').forEach(x => x.classList.remove('a'));
        $$('.sp').forEach(x => x.classList.remove('a'));
        t.classList.add('a');
        const panel = $('t-' + t.dataset.t);
        if (panel) panel.classList.add('a');
      });
    });

    /* Shared color pickers */
    [['cNB','cNBx'],['cNT','cNTx'],['cPG','cPGx'],['cCD','cCDx'],
     ['cTX','cTXx'],['cMT','cMTx'],['cAC','cACx'],['cAT','cATx'],['cBD','cBDx']].forEach(([k,hx]) => {
      const el = $(k); if (!el) return;
      el.addEventListener('input', () => {
        V[k] = el.value;
        const hxEl = $(hx); if (hxEl) hxEl.textContent = el.value;
        apply();
      });
    });

    /* Register-specific color pickers */
    if (PAGE === 'register') {
      ['cH','cHT','cFB','cIB','cLB','cBT','cBTT'].forEach(k => {
        const el = $(k); if (!el) return;
        el.addEventListener('input', () => {
          VR[k] = el.value;
          const hxEl = $(k + 'x'); if (hxEl) hxEl.textContent = el.value;
          apply();
        });
      });
      /* Register sliders */
      [['tSz','tSzV'],['sIR','sIRV'],['sBR','sBRV'],['sFW','sFWV'],['sFP','sFPV'],['sFG','sFGV'],['sIP','sIPV']].forEach(([k,v]) => {
        const el = $(k); if (!el) return;
        el.addEventListener('input', () => {
          VR[k] = el.value;
          const rv = $(v); if (rv) rv.textContent = el.value + 'px';
          apply();
        });
      });
      /* Register font weight */
      const fWt = $('fWt');
      if (fWt) fWt.addEventListener('change', () => { VR.fWt = fWt.value; apply(); });
      /* Register labels */
      ['lTi','lSu','lBr','lPo','lS1','lS2','lLB','lLO','lLBT','lLRT','lLA','lLC','lLSc','lBR','lBC','lBP'].forEach(k => {
        const el = $(k); if (!el) return;
        el.addEventListener('input', applyLabels);
      });
    }

    /* General spacing */
    [['edPad','edPadV'],['edRad','edRadV'],['edNavP','edNavPV']].forEach(([k,v]) => {
      const el = $(k); if (!el) return;
      el.addEventListener('input', () => {
        const rv = $(v); if (rv) rv.textContent = el.value + 'px';
        if (k === 'edPad') {
          $$('.page,.dashboard,.main-content').forEach(e => e.style.setProperty('padding', el.value + 'px', 'important'));
        }
        if (k === 'edRad') {
          $$('.card,.info-card,.table-card,.map-card,.legend,.chart-box,.visit-card,.legend-box').forEach(e => e.style.setProperty('border-radius', el.value + 'px', 'important'));
        }
        if (k === 'edNavP') {
          $$('.navbar,.header').forEach(e => e.style.setProperty('padding', el.value + 'px 40px', 'important'));
        }
      });
    });

    /* Font */
    const edFont = $('edFont');
    if (edFont) edFont.addEventListener('change', () => { V.fFont = edFont.value; apply(); });
    const edFSz = $('edFSz');
    if (edFSz) edFSz.addEventListener('input', () => {
      V.fSz = edFSz.value;
      const rv = $('edFSzV'); if (rv) rv.textContent = edFSz.value + 'px';
      apply();
    });

    /* Presets */
    $$('.pt').forEach(p => {
      p.addEventListener('click', () => {
        const d = p.dataset;
        V.cNB = d.nb; V.cNT = d.nt; V.cPG = d.pg; V.cCD = d.cd;
        V.cTX = d.tx; V.cMT = d.mt; V.cAC = d.ac; V.cAT = d.at; V.cBD = d.bd;
        [['cNB','cNBx'],['cNT','cNTx'],['cPG','cPGx'],['cCD','cCDx'],
         ['cTX','cTXx'],['cMT','cMTx'],['cAC','cACx'],['cAT','cATx'],['cBD','cBDx']].forEach(([k,hx]) => {
          const el = $(k); if (el) el.value = V[k];
          const hxEl = $(hx); if (hxEl) hxEl.textContent = V[k];
        });
        if (PAGE === 'register') {
          VR.cH = d.h; VR.cHT = d.ht;
          const elH = $('cH'); if (elH) { elH.value = d.h; const hx=$('cHx'); if(hx) hx.textContent=d.h; }
          const elHT = $('cHT'); if (elHT) { elHT.value = d.ht; const hx=$('cHTx'); if(hx) hx.textContent=d.ht; }
        }
        apply();
        toast('✓ ' + (p.title || 'Preset') + ' applied!');
      });
    });
  }

  /* ── TOAST ──────────────────────────────────── */
  function toast(msg, err) {
    const t = $('ed-toast');
    if (!t) return;
    t.textContent = msg;
    t.className = err ? 'err' : '';
    t.classList.add('on');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('on'), 2400);
  }

  /* ── INIT ───────────────────────────────────── */
  buildSidebar();
  bindEvents();
  apply();
  if (PAGE === 'register') applyLabels();

})();
