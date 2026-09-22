// lib/sector-heroes.ts
// ─────────────────────────────────────────────────────────────────────────────
// Unique editorial SVG illustration for every sector.
// Rules:
//   • 1200×320 viewBox, width="100%"
//   • Sector name + "· India 2026" embedded as text inside the SVG
//   • #F3EFE5 parchment bg — matches home page exactly
//   • Accent color per sector, #1A1208 ink, #C8C2B4 muted lines
//   • Newspaper/editorial illustration style — abstract, geometric, typographic
//   • NO external fonts inside SVG — uses Georgia/serif fallback
//   • bgColor passed out so hero wrapper can tint its background
// ─────────────────────────────────────────────────────────────────────────────

export interface SectorHero {
  svg: string
  bgColor: string
}

// ── Shared helpers ────────────────────────────────────────────────────────────
const label = (sector: string, color: string) => `
  <text x="600" y="275" text-anchor="middle"
    font-family="Georgia,'Playfair Display',serif" font-size="18" font-weight="700"
    letter-spacing="2" fill="${color}" opacity="0.9">${sector} · India 2026</text>
  <line x1="420" y1="283" x2="780" y2="283" stroke="${color}" stroke-width="1" opacity="0.35"/>
`

const dots = (color: string) => {
  let d = ""
  for (let x = 40; x < 1200; x += 60) {
    for (let y = 20; y < 320; y += 60) {
      d += `<circle cx="${x}" cy="${y}" r="1.5" fill="${color}" opacity="0.18"/>`
    }
  }
  return d
}

// ── SECTOR MAP ────────────────────────────────────────────────────────────────
const HEROES: Record<string, SectorHero> = {

  // ── AI / ML ──────────────────────────────────────────────────────────────
  "ai-ml": {
    bgColor: "#EEF3FC",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#EEF3FC"/>
      ${dots("#2563EB")}
      <!-- Neural net nodes -->
      ${[80,160,240].map(y=>`<circle cx="180" cy="${y}" r="18" fill="none" stroke="#2563EB" stroke-width="1.5" opacity="0.5"/>`).join("")}
      ${[60,140,220,300].map(y=>`<circle cx="380" cy="${y}" r="18" fill="none" stroke="#2563EB" stroke-width="1.5" opacity="0.6"/>`).join("")}
      <circle cx="580" cy="100" r="26" fill="#2563EB" opacity="0.85"/>
      <circle cx="580" cy="220" r="26" fill="#1D4ED8" opacity="0.75"/>
      ${[60,140,220,300].map(y=>`<circle cx="780" cy="${y}" r="18" fill="none" stroke="#2563EB" stroke-width="1.5" opacity="0.6"/>`).join("")}
      <circle cx="980" cy="160" r="32" fill="#1A1208" opacity="0.9"/>
      <text x="980" y="165" text-anchor="middle" font-family="Georgia,serif" font-size="11" font-weight="700" fill="#fff" letter-spacing="1">AI</text>
      <!-- Connections layer 1→2 -->
      ${[80,160,240].flatMap(y1=>[60,140,220,300].map(y2=>`<line x1="198" y1="${y1}" x2="362" y2="${y2}" stroke="#2563EB" stroke-width="0.6" opacity="0.2"/>`)).join("")}
      <!-- Connections layer 2→3 -->
      ${[60,140,220,300].flatMap(y1=>[100,220].map(y2=>`<line x1="398" y1="${y1}" x2="554" y2="${y2}" stroke="#2563EB" stroke-width="${y1===140||y1===220?"1.8":"0.7"}" opacity="${y1===140||y1===220?"0.7":"0.2"}"/>`)).join("")}
      <!-- Connections layer 3→4 -->
      ${[100,220].flatMap(y1=>[60,140,220,300].map(y2=>`<line x1="606" y1="${y1}" x2="762" y2="${y2}" stroke="#2563EB" stroke-width="${y1===100&&(y2===140||y2===220)?"1.8":"0.7"}" opacity="${y1===100&&(y2===140||y2===220)?"0.65":"0.2"}"/>`)).join("")}
      <!-- Connections layer 4→5 -->
      ${[60,140,220,300].map(y1=>`<line x1="798" y1="${y1}" x2="948" y2="160" stroke="#2563EB" stroke-width="${y1===140||y1===220?"2":"0.8"}" opacity="${y1===140||y1===220?"0.7":"0.25"}"/>`).join("")}
      <!-- Decorative gauge right -->
      <circle cx="1110" cy="160" r="90" fill="none" stroke="#2563EB" stroke-width="0.8" opacity="0.2"/>
      <circle cx="1110" cy="160" r="65" fill="none" stroke="#2563EB" stroke-width="0.5" opacity="0.15"/>
      <circle cx="1110" cy="160" r="8" fill="#F97316" opacity="0.7"/>
      ${Array.from({length:24},(_,i)=>{const a=i*15*Math.PI/180;const r1=72,r2=80;return `<line x1="${1110+r1*Math.cos(a)}" y1="${160+r1*Math.sin(a)}" x2="${1110+r2*Math.cos(a)}" y2="${160+r2*Math.sin(a)}" stroke="#2563EB" stroke-width="0.8" opacity="0.3"/>`}).join("")}
      ${label("Artificial Intelligence","#2563EB")}
    </svg>`
  },

  // ── FINTECH ───────────────────────────────────────────────────────────────
  "fintech": {
    bgColor: "#EDFAF4",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#EDFAF4"/>
      ${dots("#059669")}
      <!-- Rising bar chart -->
      ${[
        {x:120,h:60,o:"0.3"},{x:180,h:100,o:"0.4"},{x:240,h:80,o:"0.35"},
        {x:300,h:140,o:"0.5"},{x:360,h:110,o:"0.45"},{x:420,h:180,o:"0.65"},
        {x:480,h:160,o:"0.6"},{x:540,h:210,o:"0.75"},{x:600,h:195,o:"0.7"},
        {x:660,h:230,o:"0.8"},{x:720,h:215,o:"0.78"}
      ].map(b=>`<rect x="${b.x}" y="${260-parseInt(b.h.toString())}" width="42" height="${b.h}" fill="#059669" opacity="${b.o}" rx="2"/>`).join("")}
      <!-- Trend line over bars -->
      <polyline points="141,245 201,230 261,215 321,185 381,170 441,135 501,115 561,90 621,75 681,62 741,52" fill="none" stroke="#059669" stroke-width="2.5" opacity="0.9"/>
      ${["141,245","201,230","261,215","321,185","381,170","441,135","501,115","561,90","621,75","681,62","741,52"].map(p=>`<circle cx="${p.split(",")[0]}" cy="${p.split(",")[1]}" r="4" fill="#059669" opacity="0.8"/>`).join("")}
      <!-- Baseline -->
      <line x1="100" y1="261" x2="780" y2="261" stroke="#1A1208" stroke-width="1" opacity="0.25"/>
      <!-- Rupee symbol -->
      <text x="920" y="185" text-anchor="middle" font-family="Georgia,serif" font-size="120" font-weight="900" fill="#059669" opacity="0.08">₹</text>
      <text x="920" y="185" text-anchor="middle" font-family="Georgia,serif" font-size="120" font-weight="900" fill="none" stroke="#059669" stroke-width="1" opacity="0.18">₹</text>
      <!-- UPI grid suggestion -->
      ${[850,900,950,1000,1050,1100].map(x=>[80,130,180,230].map(y=>`<rect x="${x}" y="${y}" width="32" height="32" rx="4" fill="none" stroke="#059669" stroke-width="0.7" opacity="0.2"/>`).join("")).join("")}
      <rect x="950" y="130" width="32" height="32" rx="4" fill="#059669" opacity="0.12"/>
      <rect x="1000" y="180" width="32" height="32" rx="4" fill="#059669" opacity="0.18"/>
      ${label("FinTech","#059669")}
    </svg>`
  },

  // ── EDTECH ────────────────────────────────────────────────────────────────
  "edtech": {
    bgColor: "#FFFBF0",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#FFFBF0"/>
      ${dots("#D97706")}
      <!-- Open book left -->
      <path d="M80 240 Q200 80 320 240" fill="#D97706" opacity="0.06" stroke="#D97706" stroke-width="1" />
      <path d="M320 240 Q440 80 560 240" fill="#D97706" opacity="0.06" stroke="#D97706" stroke-width="1"/>
      <line x1="320" y1="90" x2="320" y2="250" stroke="#D97706" stroke-width="1.5" opacity="0.35"/>
      <!-- Text lines on left page -->
      ${[130,150,170,190,210,230].map(y=>`<line x1="110" y1="${y}" x2="300" y2="${y}" stroke="#D97706" stroke-width="${y===130?"2":"1"}" opacity="${y===130?"0.5":"0.22"}"/>`).join("")}
      <!-- Text lines on right page -->
      ${[130,150,170,190,210,230].map(y=>`<line x1="340" y1="${y}" x2="530" y2="${y}" stroke="#D97706" stroke-width="${y===130?"2":"1"}" opacity="${y===130?"0.5":"0.22"}"/>`).join("")}
      <!-- Mortar board cap -->
      <polygon points="700,100 820,155 700,210 580,155" fill="#D97706" opacity="0.15" stroke="#D97706" stroke-width="1.2"/>
      <rect x="695" y="200" width="10" height="35" fill="#D97706" opacity="0.4"/>
      <circle cx="700" cy="235" r="6" fill="#D97706" opacity="0.5"/>
      <circle cx="700" cy="100" r="8" fill="#D97706" opacity="0.6"/>
      <!-- Graduation cap tassel -->
      <line x1="820" y1="155" x2="850" y2="200" stroke="#D97706" stroke-width="1.5" opacity="0.5"/>
      <circle cx="850" cy="206" r="5" fill="#D97706" opacity="0.5"/>
      <!-- Knowledge network right -->
      ${[
        {x:950,y:100},{x:1050,y:80},{x:1100,y:160},{x:1050,y:240},{x:950,y:250},{x:870,y:180}
      ].map((n,i,arr)=>`
        <circle cx="${n.x}" cy="${n.y}" r="16" fill="none" stroke="#D97706" stroke-width="1.2" opacity="0.5"/>
        ${arr.map((m,j)=>i<j?`<line x1="${n.x}" y1="${n.y}" x2="${m.x}" y2="${m.y}" stroke="#D97706" stroke-width="0.6" opacity="0.18"/>`:"").join("")}
      `).join("")}
      ${label("EdTech","#D97706")}
    </svg>`
  },

  // ── HEALTHTECH ────────────────────────────────────────────────────────────
  "healthtech": {
    bgColor: "#FEF2F2",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#FEF2F2"/>
      ${dots("#DC2626")}
      <!-- ECG / heartbeat line -->
      <polyline points="60,160 200,160 240,160 260,80 280,240 300,100 320,220 340,160 500,160 540,160 570,60 600,260 630,100 660,200 690,160 900,160" fill="none" stroke="#DC2626" stroke-width="2.5" opacity="0.75"/>
      <!-- Cross symbol -->
      <rect x="960" y="100" width="16" height="120" rx="4" fill="#DC2626" opacity="0.18"/>
      <rect x="920" y="140" width="96" height="16" rx="4" fill="#DC2626" opacity="0.18"/>
      <rect x="960" y="100" width="16" height="120" rx="4" fill="none" stroke="#DC2626" stroke-width="1.5" opacity="0.5"/>
      <rect x="920" y="140" width="96" height="16" rx="4" fill="none" stroke="#DC2626" stroke-width="1.5" opacity="0.5"/>
      <!-- DNA spiral suggestion -->
      ${Array.from({length:12},(_,i)=>{
        const y=70+i*16; const off=Math.sin(i*0.8)*28;
        return `<ellipse cx="${1100+off}" cy="${y}" rx="18" ry="6" fill="none" stroke="#DC2626" stroke-width="1" opacity="0.3"/>
                <line x1="${1082}" y1="${y}" x2="${1118}" y2="${y}" stroke="#DC2626" stroke-width="0.6" opacity="0.15"/>`
      }).join("")}
      <!-- Pulse circles -->
      <circle cx="600" cy="160" r="20" fill="#DC2626" opacity="0.08"/>
      <circle cx="600" cy="160" r="38" fill="none" stroke="#DC2626" stroke-width="0.8" opacity="0.12"/>
      <circle cx="600" cy="160" r="55" fill="none" stroke="#DC2626" stroke-width="0.5" opacity="0.08"/>
      ${label("HealthTech","#DC2626")}
    </svg>`
  },

  // ── SAAS ─────────────────────────────────────────────────────────────────
  "saas": {
    bgColor: "#F5F3FF",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#F5F3FF"/>
      ${dots("#7C3AED")}
      <!-- Cloud shape -->
      <ellipse cx="350" cy="170" rx="160" ry="80" fill="#7C3AED" opacity="0.06" stroke="#7C3AED" stroke-width="1.2" stroke-dasharray="6 4"/>
      <ellipse cx="270" cy="165" rx="80" ry="55" fill="#7C3AED" opacity="0.04"/>
      <ellipse cx="430" cy="155" rx="90" ry="60" fill="#7C3AED" opacity="0.04"/>
      <!-- API endpoints -->
      ${[
        {x:140,y:100},{x:140,y:170},{x:140,y:240},
      ].map(n=>`
        <rect x="${n.x-30}" y="${n.y-12}" width="60" height="24" rx="4" fill="none" stroke="#7C3AED" stroke-width="1" opacity="0.5"/>
        <line x1="${n.x+30}" y1="${n.y}" x2="200" y2="${n.y}" stroke="#7C3AED" stroke-width="1" opacity="0.3" stroke-dasharray="4 3"/>
        <line x1="200" y1="${n.y}" x2="200" y2="170" stroke="#7C3AED" stroke-width="0.8" opacity="0.2"/>
        <line x1="200" y1="170" x2="240" y2="170" stroke="#7C3AED" stroke-width="0.8" opacity="0.2"/>
      `).join("")}
      <!-- Server stack right -->
      ${[80,120,160,200].map(y=>`
        <rect x="560" y="${y}" width="180" height="30" rx="4" fill="#7C3AED" opacity="0.07" stroke="#7C3AED" stroke-width="1" stroke-dasharray="none"/>
        <circle cx="580" cy="${y+15}" r="4" fill="#7C3AED" opacity="0.4"/>
        <circle cx="596" cy="${y+15}" r="4" fill="#7C3AED" opacity="0.25"/>
        <line x1="620" y1="${y+9}" x2="720" y2="${y+9}" stroke="#7C3AED" stroke-width="0.7" opacity="0.2"/>
        <line x1="620" y1="${y+15}" x2="680" y2="${y+15}" stroke="#7C3AED" stroke-width="0.7" opacity="0.2"/>
        <line x1="620" y1="${y+21}" x2="700" y2="${y+21}" stroke="#7C3AED" stroke-width="0.7" opacity="0.2"/>
      `).join("")}
      <!-- Connection lines to clients -->
      ${[80,160,240].map(cy=>`<line x1="740" y1="145" x2="840" y2="${cy}" stroke="#7C3AED" stroke-width="1" opacity="0.25" stroke-dasharray="5 4"/>`).join("")}
      ${[80,160,240].map((cy,i)=>`<rect x="840" y="${cy-18}" width="48" height="36" rx="6" fill="#7C3AED" opacity="${0.08+i*0.03}" stroke="#7C3AED" stroke-width="1"/>`).join("")}
      <!-- Big hexagon bg -->
      <polygon points="1000,60 1060,95 1060,165 1000,200 940,165 940,95" fill="none" stroke="#7C3AED" stroke-width="1" opacity="0.2"/>
      <polygon points="1000,85 1040,108 1040,155 1000,178 960,155 960,108" fill="#7C3AED" opacity="0.05"/>
      <text x="1000" y="136" text-anchor="middle" font-family="Georgia,serif" font-size="13" font-weight="700" fill="#7C3AED" opacity="0.6" letter-spacing="1">SaaS</text>
      ${label("SaaS","#7C3AED")}
    </svg>`
  },

  // ── ECOMMERCE ────────────────────────────────────────────────────────────
  "ecommerce": {
    bgColor: "#FFF7F0",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#FFF7F0"/>
      ${dots("#EA580C")}
      <!-- Cart outline -->
      <path d="M80,80 L140,80 L190,210 L420,210 L460,120 L170,120" fill="none" stroke="#EA580C" stroke-width="2" opacity="0.5"/>
      <circle cx="220" cy="240" r="18" fill="none" stroke="#EA580C" stroke-width="1.8" opacity="0.6"/>
      <circle cx="370" cy="240" r="18" fill="none" stroke="#EA580C" stroke-width="1.8" opacity="0.6"/>
      <!-- Cart items -->
      ${[190,250,310].map(x=>`<rect x="${x}" y="130" width="50" height="68" rx="3" fill="#EA580C" opacity="0.08" stroke="#EA580C" stroke-width="0.8"/>`).join("")}
      <!-- India map suggestion — dots -->
      ${[
        {x:620,y:100},{x:660,y:130},{x:700,y:160},{x:680,y:200},{x:650,y:230},{x:620,y:200},{x:590,y:170},{x:600,y:140},
        {x:630,y:120},{x:670,y:110},{x:710,y:140},{x:720,y:180},{x:700,y:220},{x:670,y:240},{x:640,y:240}
      ].map(p=>`<circle cx="${p.x}" cy="${p.y}" r="4" fill="#EA580C" opacity="0.22"/>`).join("")}
      <!-- Delivery path from map -->
      <path d="M680,170 Q800,120 900,150" fill="none" stroke="#EA580C" stroke-width="1.5" stroke-dasharray="8 5" opacity="0.4"/>
      <circle cx="900" cy="150" r="10" fill="#EA580C" opacity="0.25"/>
      <!-- Package boxes right -->
      ${[
        {x:960,y:80,s:60},{x:1040,y:100,s:48},{x:1000,y:150,s:55},{x:960,y:200,s:50},{x:1050,y:185,s:45}
      ].map(b=>`
        <rect x="${b.x}" y="${b.y}" width="${b.s}" height="${b.s}" rx="4" fill="#EA580C" opacity="0.07" stroke="#EA580C" stroke-width="0.9"/>
        <line x1="${b.x}" y1="${b.y+b.s/2}" x2="${b.x+b.s}" y2="${b.y+b.s/2}" stroke="#EA580C" stroke-width="0.6" opacity="0.3"/>
      `).join("")}
      ${label("E-Commerce","#EA580C")}
    </svg>`
  },

  // ── AGRITECH ─────────────────────────────────────────────────────────────
  "agritech": {
    bgColor: "#F0FDF4",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#F0FDF4"/>
      ${dots("#16A34A")}
      <!-- Field rows -->
      ${Array.from({length:8},(_,i)=>{
        const y=80+i*22;
        return `<path d="M80,${y} Q300,${y-10} 500,${y}" fill="none" stroke="#16A34A" stroke-width="${i%3===0?"1.8":"0.8"}" opacity="${i%3===0?"0.45":"0.2"}"/>`
      }).join("")}
      <!-- Crop symbols -->
      ${[120,180,240,300,360,420,460].map((x,i)=>`
        <line x1="${x}" y1="240" x2="${x}" y2="200" stroke="#16A34A" stroke-width="1.2" opacity="0.5"/>
        <ellipse cx="${x}" cy="195" rx="8" ry="14" fill="#16A34A" opacity="${0.3+i*0.04}" transform="rotate(-15 ${x} 195)"/>
      `).join("")}
      <!-- Sun -->
      <circle cx="600" cy="100" r="35" fill="none" stroke="#16A34A" stroke-width="1.5" opacity="0.3"/>
      <circle cx="600" cy="100" r="20" fill="#16A34A" opacity="0.12"/>
      ${Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;return `<line x1="${600+28*Math.cos(a)}" y1="${100+28*Math.sin(a)}" x2="${600+40*Math.cos(a)}" y2="${100+40*Math.sin(a)}" stroke="#16A34A" stroke-width="1.2" opacity="0.4"/>`}).join("")}
      <!-- Rain drops -->
      ${[680,720,760,800,840].map((x,i)=>`<line x1="${x}" y1="${60+i*8}" x2="${x-6}" y2="${80+i*8}" stroke="#16A34A" stroke-width="1.2" opacity="0.3"/>`).join("")}
      <!-- Drone / satellite right -->
      <rect x="920" y="110" width="80" height="40" rx="6" fill="none" stroke="#16A34A" stroke-width="1.5" opacity="0.45"/>
      <line x1="880" y1="130" x2="920" y2="130" stroke="#16A34A" stroke-width="1" opacity="0.3"/>
      <line x1="1000" y1="130" x2="1040" y2="130" stroke="#16A34A" stroke-width="1" opacity="0.3"/>
      <circle cx="870" cy="130" r="8" fill="none" stroke="#16A34A" stroke-width="1" opacity="0.4"/>
      <circle cx="1050" cy="130" r="8" fill="none" stroke="#16A34A" stroke-width="1" opacity="0.4"/>
      <!-- Signal waves from drone -->
      ${[1,2,3].map(i=>`<path d="M960,160 Q960,${160+i*20} ${960+i*25},${165+i*18}" fill="none" stroke="#16A34A" stroke-width="0.8" opacity="${0.4-i*0.1}"/>`).join("")}
      <path d="M920,240 Q960,200 1000,240" fill="#16A34A" opacity="0.1" stroke="#16A34A" stroke-width="0.8"/>
      ${label("AgriTech","#16A34A")}
    </svg>`
  },

  // ── CLIMATE TECH ─────────────────────────────────────────────────────────
  "climate-tech": {
    bgColor: "#F0FDFA",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#F0FDFA"/>
      ${dots("#0D9488")}
      <!-- Wind turbine left -->
      <line x1="160" y1="260" x2="160" y2="80" stroke="#0D9488" stroke-width="2.5" opacity="0.5"/>
      <circle cx="160" cy="110" r="8" fill="#0D9488" opacity="0.6"/>
      <!-- 3 blades -->
      <path d="M160,110 L140,60 L155,108 Z" fill="#0D9488" opacity="0.4"/>
      <path d="M160,110 L195,150 L162,112 Z" fill="#0D9488" opacity="0.3"/>
      <path d="M160,110 L125,150 L158,112 Z" fill="#0D9488" opacity="0.35"/>
      <!-- Second turbine -->
      <line x1="290" y1="260" x2="290" y2="100" stroke="#0D9488" stroke-width="2" opacity="0.4"/>
      <circle cx="290" cy="128" r="7" fill="#0D9488" opacity="0.5"/>
      <path d="M290,128 L270,84 L285,126 Z" fill="#0D9488" opacity="0.3"/>
      <path d="M290,128 L320,162 L292,130 Z" fill="#0D9488" opacity="0.25"/>
      <path d="M290,128 L260,165 L288,130 Z" fill="#0D9488" opacity="0.28"/>
      <!-- Solar panels centre -->
      ${Array.from({length:4},(_,row)=>Array.from({length:6},(_,col)=>`
        <rect x="${480+col*38}" y="${100+row*35}" width="30" height="26" rx="2" fill="#0D9488" opacity="${0.06+row*0.03}" stroke="#0D9488" stroke-width="0.8"/>
        <line x1="${480+col*38+15}" y1="${100+row*35}" x2="${480+col*38+15}" y2="${126+row*35}" stroke="#0D9488" stroke-width="0.5" opacity="0.3"/>
        <line x1="${480+col*38}" y1="${113+row*35}" x2="${510+col*38}" y2="${113+row*35}" stroke="#0D9488" stroke-width="0.5" opacity="0.3"/>
      `).join("")).join("")}
      <!-- CO2 molecule right -->
      <circle cx="900" cy="160" r="28" fill="none" stroke="#0D9488" stroke-width="1.5" opacity="0.4"/>
      <circle cx="850" cy="160" r="20" fill="#0D9488" opacity="0.08" stroke="#0D9488" stroke-width="1"/>
      <circle cx="950" cy="160" r="20" fill="#0D9488" opacity="0.08" stroke="#0D9488" stroke-width="1"/>
      <text x="900" y="165" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#0D9488" opacity="0.6">CO₂</text>
      <!-- Strike-through CO2 -->
      <line x1="860" y1="120" x2="980" y2="200" stroke="#0D9488" stroke-width="2.5" opacity="0.35"/>
      <!-- Leaf curve -->
      <path d="M1050,80 Q1120,130 1080,220 Q1020,170 1050,80" fill="#0D9488" opacity="0.1" stroke="#0D9488" stroke-width="1.2"/>
      <path d="M1050,80 Q1065,140 1080,220" fill="none" stroke="#0D9488" stroke-width="0.8" opacity="0.4"/>
      ${label("Climate Tech","#0D9488")}
    </svg>`
  },

  // ── LOGISTICS ────────────────────────────────────────────────────────────
  "logistics": {
    bgColor: "#FFF8F3",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#FFF8F3"/>
      ${dots("#92400E")}
      <!-- India map dots - key cities -->
      ${[
        {x:320,y:140,city:"DEL"},{x:380,y:180,city:"LKW"},{x:450,y:200,city:"PAT"},
        {x:360,y:240,city:"MUM"},{x:480,y:250,city:"HYD"},{x:520,y:280,city:"BLR"},
        {x:560,y:240,city:"CHE"},{x:420,y:170,city:"KOL"},{x:340,y:180,city:"JAI"},
        {x:300,y:200,city:"AHM"}
      ].map(c=>`
        <circle cx="${c.x}" cy="${c.y}" r="6" fill="#92400E" opacity="0.35"/>
        <circle cx="${c.x}" cy="${c.y}" r="12" fill="none" stroke="#92400E" stroke-width="0.7" opacity="0.2"/>
      `).join("")}
      <!-- Route lines between cities -->
      <polyline points="320,140 360,240 480,250 520,280 560,240" fill="none" stroke="#92400E" stroke-width="1.5" opacity="0.3" stroke-dasharray="6 4"/>
      <polyline points="320,140 380,180 450,200 420,170 380,180" fill="none" stroke="#92400E" stroke-width="1" opacity="0.2" stroke-dasharray="4 3"/>
      <!-- Truck silhouette right -->
      <rect x="720" y="160" width="120" height="70" rx="4" fill="none" stroke="#92400E" stroke-width="2" opacity="0.55"/>
      <rect x="840" y="175" width="65" height="55" rx="4" fill="none" stroke="#92400E" stroke-width="2" opacity="0.55"/>
      <circle cx="755" cy="240" r="18" fill="none" stroke="#92400E" stroke-width="2" opacity="0.55"/>
      <circle cx="755" cy="240" r="8" fill="#92400E" opacity="0.25"/>
      <circle cx="875" cy="240" r="18" fill="none" stroke="#92400E" stroke-width="2" opacity="0.55"/>
      <circle cx="875" cy="240" r="8" fill="#92400E" opacity="0.25"/>
      <!-- Road -->
      <line x1="60" y1="268" x2="720" y2="268" stroke="#92400E" stroke-width="1" opacity="0.2"/>
      <line x1="60" y1="275" x2="720" y2="275" stroke="#92400E" stroke-width="0.5" opacity="0.1"/>
      ${[120,200,280,360,440,520,600].map(x=>`<line x1="${x}" y1="268" x2="${x+30}" y2="268" stroke="#92400E" stroke-width="2" opacity="0.2"/>`).join("")}
      <!-- Route packages right side -->
      ${[
        {x:980,y:100},{x:1040,y:130},{x:1000,y:180},{x:1060,y:200},{x:990,y:240}
      ].map(b=>`
        <rect x="${b.x}" y="${b.y}" width="40" height="40" rx="3" fill="#92400E" opacity="0.07" stroke="#92400E" stroke-width="0.9"/>
        <line x1="${b.x}" y1="${b.y+20}" x2="${b.x+40}" y2="${b.y+20}" stroke="#92400E" stroke-width="0.5" opacity="0.3"/>
        <line x1="${b.x+20}" y1="${b.y}" x2="${b.x+20}" y2="${b.y+40}" stroke="#92400E" stroke-width="0.5" opacity="0.3"/>
      `).join("")}
      <polyline points="980,120 1060,150 1040,220 980,260" fill="none" stroke="#92400E" stroke-width="1" stroke-dasharray="5 4" opacity="0.3"/>
      ${label("Logistics","#92400E")}
    </svg>`
  },

  // ── MOBILITY ─────────────────────────────────────────────────────────────
  "mobility": {
    bgColor: "#EFF6FF",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#EFF6FF"/>
      ${dots("#0369A1")}
      <!-- Road perspective -->
      <path d="M100,280 L580,180 L580,280 Z" fill="#0369A1" opacity="0.04"/>
      <path d="M100,280 L580,180 L1100,280 Z" fill="#0369A1" opacity="0.03"/>
      <line x1="100" y1="280" x2="1100" y2="280" stroke="#0369A1" stroke-width="1.5" opacity="0.2"/>
      ${[200,300,400,500,600,700,800,900].map(x=>`<line x1="${x}" y1="245" x2="${x+40}" y2="255" stroke="#0369A1" stroke-width="1" opacity="0.15"/>`).join("")}
      <!-- Bike (Rapido-style) -->
      <circle cx="260" cy="228" r="28" fill="none" stroke="#0369A1" stroke-width="2" opacity="0.6"/>
      <circle cx="340" cy="228" r="28" fill="none" stroke="#0369A1" stroke-width="2" opacity="0.6"/>
      <path d="M288,228 L300,185 L340,200 L340,228" fill="none" stroke="#0369A1" stroke-width="2" opacity="0.6"/>
      <path d="M300,185 L320,178 L332,185" fill="none" stroke="#0369A1" stroke-width="1.5" opacity="0.5"/>
      <circle cx="300" cy="182" r="8" fill="#0369A1" opacity="0.15"/>
      <!-- Car -->
      <path d="M480,235 Q500,200 560,195 Q620,195 640,210 L660,235 Z" fill="none" stroke="#0369A1" stroke-width="2" opacity="0.5"/>
      <rect x="480" y="220" width="180" height="25" rx="4" fill="#0369A1" opacity="0.08"/>
      <circle cx="510" cy="252" r="14" fill="none" stroke="#0369A1" stroke-width="1.8" opacity="0.55"/>
      <circle cx="630" cy="252" r="14" fill="none" stroke="#0369A1" stroke-width="1.8" opacity="0.55"/>
      <!-- Auto rickshaw -->
      <path d="M760,235 Q770,205 800,200 L840,200 L855,220 L855,235 Z" fill="none" stroke="#0369A1" stroke-width="1.8" opacity="0.5"/>
      <circle cx="785" cy="248" r="13" fill="none" stroke="#0369A1" stroke-width="1.5" opacity="0.5"/>
      <circle cx="845" cy="248" r="13" fill="none" stroke="#0369A1" stroke-width="1.5" opacity="0.5"/>
      <!-- Speed lines -->
      ${[130,145,160,170].map((y,i)=>`<line x1="60" y1="${y}" x2="${80+i*20}" y2="${y}" stroke="#0369A1" stroke-width="1.2" opacity="${0.4-i*0.07}"/>`).join("")}
      <!-- GPS pins network -->
      ${[
        {x:980,y:100},{x:1060,y:130},{x:1020,y:200},{x:1090,y:230},{x:950,y:220}
      ].map(p=>`
        <circle cx="${p.x}" cy="${p.y}" r="7" fill="#0369A1" opacity="0.25"/>
        <circle cx="${p.x}" cy="${p.y}" r="14" fill="none" stroke="#0369A1" stroke-width="0.7" opacity="0.2"/>
      `).join("")}
      <polyline points="980,100 1060,130 1020,200 1090,230" fill="none" stroke="#0369A1" stroke-width="1" stroke-dasharray="5 4" opacity="0.3"/>
      <polyline points="980,100 950,220 1020,200" fill="none" stroke="#0369A1" stroke-width="1" stroke-dasharray="5 4" opacity="0.2"/>
      ${label("Mobility","#0369A1")}
    </svg>`
  },

  // ── WEB3 ─────────────────────────────────────────────────────────────────
  "web3": {
    bgColor: "#F5F3FF",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#F5F3FF"/>
      ${dots("#6D28D9")}
      <!-- Blockchain chain -->
      ${[80,200,320,440,560,680].map((x,i)=>`
        <rect x="${x}" y="130" width="80" height="60" rx="6" fill="${i%2===0?"#6D28D9":"#4C1D95"}" opacity="${0.08+i*0.02}" stroke="#6D28D9" stroke-width="1.2"/>
        <text x="${x+40}" y="165" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6D28D9" opacity="0.5" font-weight="700">#${String(i+1).padStart(4,"0")}</text>
        ${i>0?`<line x1="${x}" y1="160" x2="${x-40}" y2="160" stroke="#6D28D9" stroke-width="2" opacity="0.4"/>`:""}
        ${i>0?`<line x1="${x-20}" y1="150" x2="${x-20}" y2="170" stroke="#6D28D9" stroke-width="1.5" opacity="0.3"/>`:""}
      `).join("")}
      <!-- Hash symbol -->
      <text x="900" y="190" text-anchor="middle" font-family="Georgia,serif" font-size="100" font-weight="900" fill="#6D28D9" opacity="0.07">#</text>
      <!-- Crypto network nodes right -->
      ${[
        {x:830,y:90},{x:900,y:130},{x:970,y:90},{x:1040,y:130},{x:1110,y:90},
        {x:865,y:200},{x:935,y:240},{x:1005,y:200},{x:1075,y:240}
      ].map((n,i,arr)=>`
        <circle cx="${n.x}" cy="${n.y}" r="12" fill="#6D28D9" opacity="${0.1+i*0.02}" stroke="#6D28D9" stroke-width="1"/>
        ${arr.slice(i+1).map(m=>`<line x1="${n.x}" y1="${n.y}" x2="${m.x}" y2="${m.y}" stroke="#6D28D9" stroke-width="0.6" opacity="0.12"/>`).join("")}
      `).join("")}
      ${label("Web3","#6D28D9")}
    </svg>`
  },

  // ── BIOTECH ──────────────────────────────────────────────────────────────
  "biotech": {
    bgColor: "#FDF2F8",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#FDF2F8"/>
      ${dots("#BE185D")}
      <!-- DNA double helix -->
      ${Array.from({length:20},(_,i)=>{
        const y=50+i*12; const s=Math.sin(i*0.5); const c=Math.cos(i*0.5);
        const x1=120+s*50; const x2=280-s*50;
        return `
          <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#BE185D" stroke-width="0.8" opacity="0.25"/>
          <circle cx="${x1}" cy="${y}" r="${i%4===0?6:4}" fill="${i%4===0?"#BE185D":"none"}" stroke="#BE185D" stroke-width="1.2" opacity="${i%4===0?"0.5":"0.4"}"/>
          <circle cx="${x2}" cy="${y}" r="${i%4===0?6:4}" fill="${i%4===0?"#9D174D":"none"}" stroke="#BE185D" stroke-width="1.2" opacity="${i%4===0?"0.5":"0.4"}"/>
        `
      }).join("")}
      <!-- Molecule diagram centre -->
      <circle cx="600" cy="130" r="24" fill="#BE185D" opacity="0.15" stroke="#BE185D" stroke-width="1.5"/>
      ${[
        {x:520,y:90},{x:680,y:90},{x:680,y:200},{x:520,y:200},{x:600,y:220}
      ].map(n=>`
        <circle cx="${n.x}" cy="${n.y}" r="16" fill="#BE185D" opacity="0.08" stroke="#BE185D" stroke-width="1"/>
        <line x1="600" y1="130" x2="${n.x}" y2="${n.y}" stroke="#BE185D" stroke-width="1.5" opacity="0.3"/>
      `).join("")}
      <!-- Lab flask right -->
      <path d="M900,80 L900,160 Q870,200 850,240 L980,240 Q960,200 930,160 L930,80 Z" fill="none" stroke="#BE185D" stroke-width="1.8" opacity="0.45"/>
      <line x1="890" y1="80" x2="940" y2="80" stroke="#BE185D" stroke-width="2" opacity="0.5"/>
      <ellipse cx="915" cy="230" rx="55" ry="12" fill="#BE185D" opacity="0.07"/>
      <!-- Bubbles in flask -->
      ${[{cx:900,cy:220,r:8},{cx:920,cy:200,r:6},{cx:905,cy:185,r:5},{cx:918,cy:175,r:4}].map(b=>`
        <circle cx="${b.cx}" cy="${b.cy}" r="${b.r}" fill="#BE185D" opacity="0.2"/>
      `).join("")}
      <!-- Test tubes top right -->
      ${[1040,1070,1100].map((x,i)=>`
        <rect x="${x}" y="${80+i*10}" width="18" height="60" rx="9" fill="none" stroke="#BE185D" stroke-width="1.2" opacity="0.45"/>
        <rect x="${x}" y="${100+i*10+30}" width="18" height="30" rx="9" fill="#BE185D" opacity="${0.1+i*0.05}"/>
      `).join("")}
      ${label("BioTech","#BE185D")}
    </svg>`
  },

  // ── DEEPTECH ─────────────────────────────────────────────────────────────
  "deeptech": {
    bgColor: "#EFF6FF",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#EFF6FF"/>
      ${dots("#1D4ED8")}
      <!-- Atom model -->
      <circle cx="280" cy="160" r="12" fill="#1D4ED8" opacity="0.7"/>
      <ellipse cx="280" cy="160" rx="120" ry="50" fill="none" stroke="#1D4ED8" stroke-width="1.5" opacity="0.4"/>
      <ellipse cx="280" cy="160" rx="120" ry="50" fill="none" stroke="#1D4ED8" stroke-width="1.5" opacity="0.4" transform="rotate(60 280 160)"/>
      <ellipse cx="280" cy="160" rx="120" ry="50" fill="none" stroke="#1D4ED8" stroke-width="1.5" opacity="0.4" transform="rotate(120 280 160)"/>
      <!-- Orbiting electrons -->
      <circle cx="400" cy="160" r="7" fill="#1D4ED8" opacity="0.5"/>
      <circle cx="210" cy="125" r="7" fill="#1D4ED8" opacity="0.5"/>
      <circle cx="210" cy="195" r="7" fill="#1D4ED8" opacity="0.5"/>
      <!-- Circuit board traces centre -->
      ${[
        "M520,100 L580,100 L580,160","M580,160 L640,160 L640,100 L700,100",
        "M520,220 L580,220 L580,160","M700,100 L700,220 L640,220 L580,220",
        "M580,100 L580,80","M640,160 L660,160","M640,220 L640,240"
      ].map(d=>`<path d="${d}" fill="none" stroke="#1D4ED8" stroke-width="1.5" opacity="0.4"/>`).join("")}
      ${[
        {x:520,y:100},{x:580,y:100},{x:580,y:160},{x:640,y:160},{x:640,y:100},{x:700,y:100},
        {x:520,y:220},{x:580,y:220},{x:700,y:220},{x:640,y:220}
      ].map(n=>`<rect x="${n.x-5}" y="${n.y-5}" width="10" height="10" fill="#1D4ED8" opacity="0.25"/>`).join("")}
      <!-- Chip -->
      <rect x="595" y="145" width="30" height="30" fill="#1D4ED8" opacity="0.12" stroke="#1D4ED8" stroke-width="1"/>
      <!-- Quantum rings right -->
      ${[1,2,3,4].map(i=>`<circle cx="960" cy="160" r="${i*35}" fill="none" stroke="#1D4ED8" stroke-width="${4-i*0.7}" opacity="${0.25-i*0.04}"/>`).join("")}
      <circle cx="960" cy="160" r="10" fill="#1D4ED8" opacity="0.5"/>
      <!-- Satellite dishes -->
      <path d="M1060,200 Q1090,160 1120,200" fill="none" stroke="#1D4ED8" stroke-width="1.5" opacity="0.4"/>
      <path d="M1060,200 Q1090,130 1120,200" fill="none" stroke="#1D4ED8" stroke-width="1" opacity="0.25"/>
      <line x1="1090" y1="200" x2="1090" y2="240" stroke="#1D4ED8" stroke-width="1.5" opacity="0.4"/>
      <line x1="1080" y1="240" x2="1100" y2="240" stroke="#1D4ED8" stroke-width="2" opacity="0.5"/>
      ${label("Deep Tech","#1D4ED8")}
    </svg>`
  },

  // ── SPACETECH ────────────────────────────────────────────────────────────
  "spacetech": {
    bgColor: "#F0F0FF",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#F0F0FF"/>
      <!-- Stars -->
      ${Array.from({length:80},()=>{const x=Math.random()*1200,y=Math.random()*300;return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(Math.random()*1.5+0.5).toFixed(1)}" fill="#7C3AED" opacity="${(Math.random()*0.4+0.1).toFixed(2)}"/>`}).join("")}
      <!-- Orbit rings -->
      <ellipse cx="400" cy="160" rx="280" ry="100" fill="none" stroke="#7C3AED" stroke-width="0.8" opacity="0.2"/>
      <ellipse cx="400" cy="160" rx="200" ry="72" fill="none" stroke="#7C3AED" stroke-width="0.8" opacity="0.15"/>
      <!-- Earth -->
      <circle cx="400" cy="160" r="40" fill="#7C3AED" opacity="0.12" stroke="#7C3AED" stroke-width="1.5"/>
      <circle cx="400" cy="160" r="40" fill="none" stroke="#7C3AED" stroke-width="1.5" opacity="0.4"/>
      <!-- Continents suggestion -->
      <path d="M385,145 Q395,138 408,143 Q415,155 405,163 Q393,167 385,160 Z" fill="#7C3AED" opacity="0.25"/>
      <path d="M365,160 Q372,155 378,160 Q376,170 368,170 Z" fill="#7C3AED" opacity="0.2"/>
      <!-- Satellite on orbit -->
      <rect x="656" y="95" width="20" height="14" rx="2" fill="#7C3AED" opacity="0.5" stroke="#7C3AED" stroke-width="1"/>
      <line x1="646" y1="102" x2="656" y2="102" stroke="#7C3AED" stroke-width="2" opacity="0.6"/>
      <line x1="676" y1="102" x2="686" y2="102" stroke="#7C3AED" stroke-width="2" opacity="0.6"/>
      <!-- Rocket right -->
      <path d="M900,240 Q900,120 950,80 Q1000,120 1000,240 Z" fill="none" stroke="#7C3AED" stroke-width="2" opacity="0.5"/>
      <path d="M900,240 Q900,120 950,80" fill="#7C3AED" opacity="0.06"/>
      <ellipse cx="950" cy="88" rx="15" ry="20" fill="#7C3AED" opacity="0.3"/>
      <!-- Fins -->
      <path d="M900,200 L870,240 L900,230 Z" fill="#7C3AED" opacity="0.25"/>
      <path d="M1000,200 L1030,240 L1000,230 Z" fill="#7C3AED" opacity="0.25"/>
      <!-- Exhaust -->
      ${[935,950,965].map((x,i)=>`<path d="M${x},240 Q${x},${260+i*8} ${x+5-i*5},${280+i*10}" fill="none" stroke="#F97316" stroke-width="${1.5-i*0.3}" opacity="${0.6-i*0.15}"/>`).join("")}
      <!-- Signal waves from satellite -->
      <path d="M666,102 Q700,80 730,102" fill="none" stroke="#7C3AED" stroke-width="0.8" opacity="0.35" stroke-dasharray="4 3"/>
      <path d="M666,102 Q700,65 730,102" fill="none" stroke="#7C3AED" stroke-width="0.6" opacity="0.2" stroke-dasharray="4 3"/>
      ${label("Space Tech","#7C3AED")}
    </svg>`
  },

  // ── GAMING ───────────────────────────────────────────────────────────────
  "gaming": {
    bgColor: "#FFFBEB",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#FFFBEB"/>
      ${dots("#B45309")}
      <!-- Controller outline -->
      <path d="M120,140 Q100,110 130,95 Q200,80 260,95 Q290,110 300,140 Q310,200 280,220 Q220,240 180,220 Q150,200 120,140 Z" fill="none" stroke="#B45309" stroke-width="2" opacity="0.5"/>
      <!-- D-pad -->
      <rect x="148" y="152" width="14" height="40" rx="2" fill="#B45309" opacity="0.3"/>
      <rect x="135" y="165" width="40" height="14" rx="2" fill="#B45309" opacity="0.3"/>
      <!-- Buttons -->
      <circle cx="245" cy="155" r="8" fill="#B45309" opacity="0.3"/>
      <circle cx="265" cy="170" r="8" fill="#B45309" opacity="0.25"/>
      <circle cx="245" cy="185" r="8" fill="#B45309" opacity="0.2"/>
      <circle cx="225" cy="170" r="8" fill="#B45309" opacity="0.28"/>
      <!-- Pixel grid centre -->
      ${Array.from({length:6},(_,row)=>Array.from({length:10},(_,col)=>`
        <rect x="${440+col*28}" y="${80+row*28}" width="22" height="22" rx="2" fill="#B45309" opacity="${Math.random()>0.5?(Math.random()*0.2+0.05).toFixed(2):"0.02"}" stroke="#B45309" stroke-width="0.4"/>
      `).join("")).join("")}
      <!-- Joystick right -->
      <circle cx="920" cy="200" r="45" fill="none" stroke="#B45309" stroke-width="1.8" opacity="0.35"/>
      <circle cx="920" cy="200" r="30" fill="#B45309" opacity="0.06"/>
      <circle cx="930" cy="190" r="15" fill="#B45309" opacity="0.25" stroke="#B45309" stroke-width="1.2"/>
      <line x1="920" y1="200" x2="930" y2="190" stroke="#B45309" stroke-width="2.5" opacity="0.5"/>
      <!-- Score display top right -->
      <rect x="1020" y="80" width="140" height="90" rx="6" fill="none" stroke="#B45309" stroke-width="1.5" opacity="0.4"/>
      <text x="1090" y="120" text-anchor="middle" font-family="Georgia,serif" font-size="10" font-weight="700" fill="#B45309" opacity="0.4" letter-spacing="2">SCORE</text>
      <text x="1090" y="148" text-anchor="middle" font-family="Georgia,serif" font-size="18" font-weight="900" fill="#B45309" opacity="0.5">99,999</text>
      <!-- Stars/collectibles -->
      ${[850,870,890,910,930].map((x,i)=>`<polygon points="${x},70 ${x+6},83 ${x+14},83 ${x+8},92 ${x+11},105 ${x},98 ${x-11},105 ${x-8},92 ${x-14},83 ${x-6},83" fill="#B45309" opacity="${0.1+i*0.05}" stroke="#B45309" stroke-width="0.7"/>`).join("")}
      ${label("Gaming","#B45309")}
    </svg>`
  },

  // ── D2C ──────────────────────────────────────────────────────────────────
  "d2c": {
    bgColor: "#FFF7ED",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#FFF7ED"/>
      ${dots("#EA580C")}
      <!-- Brand funnel -->
      <path d="M100,80 L420,80 L350,200 L170,200 Z" fill="#EA580C" opacity="0.06" stroke="#EA580C" stroke-width="1.2"/>
      <path d="M170,200 L350,200 L320,260 L200,260 Z" fill="#EA580C" opacity="0.1" stroke="#EA580C" stroke-width="1.2"/>
      <!-- Labels on funnel -->
      <text x="260" y="128" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#EA580C" opacity="0.5" letter-spacing="2">AWARENESS</text>
      <text x="260" y="185" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#EA580C" opacity="0.55" letter-spacing="2">CONSIDER</text>
      <text x="260" y="245" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#EA580C" opacity="0.6" letter-spacing="2">PURCHASE</text>
      <!-- Consumer-brand connection lines -->
      ${[100,140,180,220,260].map(y=>`<line x1="440" y1="${y}" x2="580" y2="160" stroke="#EA580C" stroke-width="0.8" opacity="0.18" stroke-dasharray="5 4"/>`).join("")}
      ${[100,140,180,220,260].map(y=>`<circle cx="440" cy="${y}" r="5" fill="#EA580C" opacity="0.2"/>`).join("")}
      <!-- Brand circle -->
      <circle cx="620" cy="160" r="42" fill="#EA580C" opacity="0.1" stroke="#EA580C" stroke-width="2"/>
      <text x="620" y="155" text-anchor="middle" font-family="Georgia,serif" font-size="11" font-weight="700" fill="#EA580C" opacity="0.6" letter-spacing="1">D2C</text>
      <text x="620" y="172" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#EA580C" opacity="0.45" letter-spacing="1">BRAND</text>
      <!-- Products grid right -->
      ${[
        {x:760,y:80},{x:840,y:80},{x:920,y:80},{x:1000,y:80},
        {x:760,y:160},{x:840,y:160},{x:920,y:160},{x:1000,y:160},
        {x:800,y:235},{x:880,y:235},{x:960,y:235}
      ].map(p=>`
        <rect x="${p.x}" y="${p.y}" width="55" height="55" rx="6" fill="#EA580C" opacity="0.06" stroke="#EA580C" stroke-width="0.8"/>
        <line x1="${p.x+10}" y1="${p.y+28}" x2="${p.x+45}" y2="${p.y+28}" stroke="#EA580C" stroke-width="0.6" opacity="0.3"/>
        <circle cx="${p.x+27}" cy="${p.y+18}" r="8" fill="#EA580C" opacity="0.12"/>
      `).join("")}
      ${label("D2C","#EA580C")}
    </svg>`
  },

  // ── CREATOR ECONOMY ──────────────────────────────────────────────────────
  "creator-economy": {
    bgColor: "#FDF4FF",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#FDF4FF"/>
      ${dots("#C026D3")}
      <!-- Play button / video -->
      <rect x="80" y="90" width="260" height="160" rx="8" fill="none" stroke="#C026D3" stroke-width="1.5" opacity="0.4"/>
      <polygon points="175,130 175,210 255,170" fill="#C026D3" opacity="0.2"/>
      <polygon points="175,130 175,210 255,170" fill="none" stroke="#C026D3" stroke-width="1.5" opacity="0.6"/>
      <!-- Progress bar -->
      <rect x="100" y="225" width="220" height="4" rx="2" fill="#C026D3" opacity="0.12"/>
      <rect x="100" y="225" width="140" height="4" rx="2" fill="#C026D3" opacity="0.4"/>
      <circle cx="240" cy="227" r="5" fill="#C026D3" opacity="0.6"/>
      <!-- Follower rings -->
      ${[400,460,520,580,640].map((x,i)=>`
        <circle cx="${x}" cy="160" r="28" fill="none" stroke="#C026D3" stroke-width="1.2" opacity="${0.2+i*0.05}"/>
        <circle cx="${x}" cy="135" r="14" fill="#C026D3" opacity="${0.1+i*0.04}"/>
        <path d="M${x-18},175 Q${x},195 ${x+18},175" fill="none" stroke="#C026D3" stroke-width="1" opacity="${0.3+i*0.05}"/>
      `).join("")}
      <!-- Growth graph right -->
      <polyline points="750,240 800,220 850,190 900,160 950,120 1000,80 1050,55" fill="none" stroke="#C026D3" stroke-width="2.5" opacity="0.6"/>
      ${[750,800,850,900,950,1000,1050].map((x,i)=>{const y=[240,220,190,160,120,80,55][i];return `<circle cx="${x}" cy="${y}" r="5" fill="#C026D3" opacity="0.6"/>`}).join("")}
      <line x1="740" y1="250" x2="1060" y2="250" stroke="#C026D3" stroke-width="1" opacity="0.2"/>
      <!-- Subscribe badge -->
      <rect x="870" y="55" width="110" height="32" rx="16" fill="#C026D3" opacity="0.18" stroke="#C026D3" stroke-width="1"/>
      <text x="925" y="75" text-anchor="middle" font-family="Georgia,serif" font-size="10" font-weight="700" fill="#C026D3" opacity="0.6" letter-spacing="1">SUBSCRIBE</text>
      ${label("Creator Economy","#C026D3")}
    </svg>`
  },

  // ── ROBOTICS ─────────────────────────────────────────────────────────────
  "robotics": {
    bgColor: "#EFF6FF",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#EFF6FF"/>
      ${dots("#1D4ED8")}
      <!-- Robot head -->
      <rect x="200" y="80" width="120" height="100" rx="8" fill="none" stroke="#1D4ED8" stroke-width="2" opacity="0.5"/>
      <circle cx="228" cy="118" r="14" fill="#1D4ED8" opacity="0.2" stroke="#1D4ED8" stroke-width="1.5"/>
      <circle cx="292" cy="118" r="14" fill="#1D4ED8" opacity="0.2" stroke="#1D4ED8" stroke-width="1.5"/>
      <circle cx="228" cy="118" r="6" fill="#1D4ED8" opacity="0.5"/>
      <circle cx="292" cy="118" r="6" fill="#1D4ED8" opacity="0.5"/>
      <rect x="225" y="148" width="70" height="12" rx="4" fill="#1D4ED8" opacity="0.15"/>
      <!-- Antenna -->
      <line x1="260" y1="80" x2="260" y2="55" stroke="#1D4ED8" stroke-width="1.5" opacity="0.5"/>
      <circle cx="260" cy="50" r="6" fill="#1D4ED8" opacity="0.5"/>
      <!-- Robot body -->
      <rect x="215" y="185" width="90" height="70" rx="4" fill="none" stroke="#1D4ED8" stroke-width="1.5" opacity="0.4"/>
      <!-- Robot arms -->
      <line x1="215" y1="200" x2="160" y2="220" stroke="#1D4ED8" stroke-width="2" opacity="0.4"/>
      <line x1="160" y1="220" x2="140" y2="250" stroke="#1D4ED8" stroke-width="2" opacity="0.4"/>
      <circle cx="140" cy="255" r="8" fill="none" stroke="#1D4ED8" stroke-width="1.5" opacity="0.5"/>
      <line x1="305" y1="200" x2="360" y2="220" stroke="#1D4ED8" stroke-width="2" opacity="0.4"/>
      <line x1="360" y1="220" x2="380" y2="250" stroke="#1D4ED8" stroke-width="2" opacity="0.4"/>
      <circle cx="380" cy="255" r="8" fill="none" stroke="#1D4ED8" stroke-width="1.5" opacity="0.5"/>
      <!-- Robot legs -->
      <line x1="235" y1="255" x2="225" y2="290" stroke="#1D4ED8" stroke-width="2" opacity="0.4"/>
      <line x1="285" y1="255" x2="295" y2="290" stroke="#1D4ED8" stroke-width="2" opacity="0.4"/>
      <!-- Gear mechanism right -->
      ${[
        {cx:650,cy:160,r:60},{cx:770,cy:120,r:40},{cx:770,cy:200,r:40},{cx:870,cy:160,r:50}
      ].map((g,i)=>`
        <circle cx="${g.cx}" cy="${g.cy}" r="${g.r}" fill="none" stroke="#1D4ED8" stroke-width="1.5" opacity="${0.3+i*0.05}"/>
        ${Array.from({length:Math.floor(g.r/8)},(_,j)=>{const a=j*(360/Math.floor(g.r/8))*Math.PI/180;return `<line x1="${g.cx+(g.r-4)*Math.cos(a)}" y1="${g.cy+(g.r-4)*Math.sin(a)}" x2="${g.cx+(g.r+6)*Math.cos(a)}" y2="${g.cy+(g.r+6)*Math.sin(a)}" stroke="#1D4ED8" stroke-width="2.5" opacity="0.4"/>`}).join("")}
        <circle cx="${g.cx}" cy="${g.cy}" r="${g.r*0.35}" fill="#1D4ED8" opacity="0.08"/>
      `).join("")}
      <!-- Schematic lines right -->
      ${[
        "M950,80 L1050,80 L1050,140","M1050,140 L1100,140","M950,80 L950,160 L1000,160",
        "M1000,160 L1000,220","M1050,140 L1050,200 L980,200"
      ].map(d=>`<path d="${d}" fill="none" stroke="#1D4ED8" stroke-width="1.2" opacity="0.35"/>`).join("")}
      ${[{x:950,y:80},{x:1050,y:80},{x:1050,y:140},{x:1100,y:140},{x:1000,y:160},{x:1050,y:200}].map(n=>`<rect x="${n.x-5}" y="${n.y-5}" width="10" height="10" fill="#1D4ED8" opacity="0.3"/>`).join("")}
      ${label("Robotics","#1D4ED8")}
    </svg>`
  },

  // ── DEFAULT fallback ──────────────────────────────────────────────────────
  "default": {
    bgColor: "#F3EFE5",
    svg: `<svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
      <rect width="1200" height="320" fill="#F3EFE5"/>
      ${dots("#B45309")}
      <!-- Grid pattern -->
      ${Array.from({length:12},(_,col)=>Array.from({length:4},(_,row)=>`
        <rect x="${80+col*90}" y="${60+row*55}" width="70" height="40" rx="4" fill="#B45309" opacity="${0.04+Math.random()*0.06}" stroke="#B45309" stroke-width="0.6"/>
      `).join("")).join("")}
      <!-- Rising line -->
      <polyline points="80,280 180,250 280,220 400,200 520,175 640,155 760,130 880,110 1000,85 1120,65" fill="none" stroke="#B45309" stroke-width="2.5" opacity="0.4"/>
      ${[80,280,400,640,880,1120].map((x,i)=>{const y=[280,250,200,155,110,65][i];return x?`<circle cx="${x}" cy="${y}" r="5" fill="#B45309" opacity="0.4"/>`:""}).join("")}
    </svg>`
  },
}

// Normalise slug → hero
export function getSectorHero(slug: string): SectorHero {
  const key = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-")
  return HEROES[key] ?? HEROES["default"]
}
