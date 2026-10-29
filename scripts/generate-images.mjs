// Generates original vector jewellery artwork into public/images.
// Run: node scripts/generate-images.mjs
// These are stand-ins so the site works offline. Replace the paths in
// src/data/products.js and src/data/categories.js with real showroom photography.
import { mkdirSync, writeFileSync } from 'node:fs'

const OUT = new URL('../public/images/', import.meta.url).pathname
mkdirSync(OUT + 'products', { recursive: true })
mkdirSync(OUT + 'categories', { recursive: true })

const r = (n) => Math.round(n * 10) / 10
const bez = (p0, p1, p2, p3, t) => {
  const u = 1 - t
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ]
}
const bezAngle = (p0, p1, p2, p3, t) => {
  const a = bez(p0, p1, p2, p3, Math.max(0, t - 0.01))
  const b = bez(p0, p1, p2, p3, Math.min(1, t + 0.01))
  return (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI
}

const GOLD = 'url(#gold)'
const EDGE = 'rgba(110,80,30,.45)'
const HI = '#FBF1D2'
const RUBY = '#A63D40'

const gem = (x, y, rad, c = RUBY) =>
  `<circle cx="${r(x)}" cy="${r(y)}" r="${rad + 4}" fill="${GOLD}" stroke="${EDGE}" stroke-width="1.2"/>` +
  `<circle cx="${r(x)}" cy="${r(y)}" r="${rad}" fill="${c}"/>` +
  `<circle cx="${r(x - rad * 0.3)}" cy="${r(y - rad * 0.3)}" r="${r(rad * 0.28)}" fill="#fff" fill-opacity=".55"/>`
const bead = (x, y, rad) =>
  `<circle cx="${r(x)}" cy="${r(y)}" r="${rad}" fill="${GOLD}" stroke="${EDGE}" stroke-width="1"/>` +
  `<circle cx="${r(x - rad * 0.3)}" cy="${r(y - rad * 0.3)}" r="${r(rad * 0.3)}" fill="${HI}" fill-opacity=".8"/>`
const pearl = (x, y, rad) =>
  `<circle cx="${r(x)}" cy="${r(y)}" r="${rad}" fill="#FFF8EA" stroke="#B39A62" stroke-width="1.6"/>` +
  `<circle cx="${r(x - rad * 0.3)}" cy="${r(y - rad * 0.3)}" r="${r(rad * 0.28)}" fill="#fff"/>`
const disc = (x, y, rad, stone = true) =>
  `<circle cx="${r(x)}" cy="${r(y)}" r="${rad}" fill="${GOLD}" stroke="${EDGE}" stroke-width="1.2"/>` +
  `<circle cx="${r(x)}" cy="${r(y)}" r="${r(rad * 0.72)}" fill="none" stroke="${HI}" stroke-opacity=".7" stroke-width="1.5"/>` +
  (stone ? `<circle cx="${r(x)}" cy="${r(y)}" r="${r(rad * 0.38)}" fill="${RUBY}"/><circle cx="${r(x - rad * 0.1)}" cy="${r(y - rad * 0.1)}" r="${r(rad * 0.1)}" fill="#fff" fill-opacity=".5"/>` : '')

const strand = (d, w = 9) =>
  `<path d="${d}" fill="none" stroke="${GOLD}" stroke-width="${w}" stroke-linecap="round"/>` +
  `<path d="${d}" fill="none" stroke="${HI}" stroke-opacity=".7" stroke-width="${r(w * 0.3)}" stroke-linecap="round" stroke-dasharray="1 ${w + 3}"/>`

const drop = (x, y, s = 1, stone = true) => {
  // teardrop pendant with its top at (x, y)
  const p = `M${x} ${y} C ${x - 62 * s} ${y + 56 * s}, ${x - 62 * s} ${y + 140 * s}, ${x} ${y + 190 * s} C ${x + 62 * s} ${y + 140 * s}, ${x + 62 * s} ${y + 56 * s}, ${x} ${y} Z`
  return (
    `<path d="${p}" fill="${GOLD}" stroke="${EDGE}" stroke-width="1.4"/>` +
    `<path d="${p}" fill="none" stroke="${HI}" stroke-opacity=".65" stroke-width="2" transform="translate(${x} ${y + 95 * s}) scale(.8) translate(${-x} ${-(y + 95 * s)})"/>` +
    (stone ? gem(x, y + 100 * s, 22 * s) : '') +
    bead(x, y - 6 * s, 9 * s)
  )
}

const flower = (x, y, rad, petals = 8, stone = true) => {
  let out = ''
  for (let i = 0; i < petals; i++) {
    const a = (360 / petals) * i
    out += `<ellipse cx="${x}" cy="${r(y - rad * 0.95)}" rx="${r(rad * 0.42)}" ry="${r(rad * 0.82)}" fill="${GOLD}" stroke="${EDGE}" stroke-width="1.2" transform="rotate(${a} ${x} ${y})"/>`
    out += `<ellipse cx="${x}" cy="${r(y - rad * 0.95)}" rx="${r(rad * 0.2)}" ry="${r(rad * 0.52)}" fill="none" stroke="${HI}" stroke-opacity=".7" stroke-width="1.5" transform="rotate(${a} ${x} ${y})"/>`
  }
  out += `<circle cx="${x}" cy="${y}" r="${r(rad * 0.55)}" fill="${GOLD}" stroke="${EDGE}" stroke-width="1.4"/>`
  if (stone) out += gem(x, y, rad * 0.32)
  return out
}

const jhumkaOne = (x) => {
  let o = ''
  o += `<circle cx="${x}" cy="300" r="42" fill="${GOLD}" stroke="${EDGE}" stroke-width="1.4"/>`
  o += `<circle cx="${x}" cy="300" r="30" fill="none" stroke="${HI}" stroke-opacity=".8" stroke-width="2" stroke-dasharray="2 6"/>`
  o += gem(x, 300, 13)
  o += bead(x, 360, 13)
  const bell = `M${x - 98} 520 C ${x - 98} 400, ${x - 48} 372, ${x} 372 C ${x + 48} 372, ${x + 98} 400, ${x + 98} 520 Z`
  o += `<path d="${bell}" fill="${GOLD}" stroke="${EDGE}" stroke-width="1.4"/>`
  for (const k of [0.8, 0.6, 0.4]) {
    o += `<path d="M${x - 98 * k} 505 C ${x - 90 * k} 420, ${x - 40 * k} 396, ${x} 396 C ${x + 40 * k} 396, ${x + 90 * k} 420, ${x + 98 * k} 505" fill="none" stroke="${HI}" stroke-opacity=".55" stroke-width="2"/>`
  }
  for (let i = -4; i <= 4; i++) {
    o += bead(x + i * 22, 524, 12)
    o += `<line x1="${x + i * 22}" y1="536" x2="${x + i * 22}" y2="552" stroke="${GOLD}" stroke-width="3"/>`
    o += pearl(x + i * 22, 562, 8)
  }
  o += gem(x, 470, 12)
  return o
}

// ----- Pieces (each drawn around the 800 x 1000 canvas centre) -----
const pieces = {
  necklace() {
    const A = [[150, 250], [190, 720], [610, 720], [650, 250]]
    const B = [[215, 250], [250, 580], [550, 580], [585, 250]]
    let out = strand(`M150 250 C 190 720, 610 720, 650 250`, 10) + strand(`M215 250 C 250 580, 550 580, 585 250`, 7)
    for (const t of [0.2, 0.32, 0.44, 0.56, 0.68, 0.8]) {
      const [x, y] = bez(...A, t)
      out += t === 0.44 || t === 0.56 ? bead(x, y + 4, 12) : disc(x, y + 4, 22)
    }
    for (const t of [0.3, 0.7]) {
      const [x, y] = bez(...B, t)
      out += bead(x, y, 10)
    }
    const [cx, cy] = bez(...A, 0.5)
    out += drop(cx, cy + 4, 1.1)
    return out
  },
  jhumka() {
    return jhumkaOne(235) + jhumkaOne(565)
  },
  bangles() {
    let out = ''
    const ys = [720, 620, 520, 420, 320]
    ys.forEach((y, i) => {
      out += `<ellipse cx="400" cy="${y}" rx="240" ry="66" fill="none" stroke="${GOLD}" stroke-width="26"/>`
      out += `<ellipse cx="400" cy="${y - 6}" rx="240" ry="66" fill="none" stroke="${HI}" stroke-opacity=".6" stroke-width="4"/>`
      out += `<ellipse cx="400" cy="${y}" rx="240" ry="66" fill="none" stroke="#7A5E2A" stroke-opacity=".38" stroke-width="10" stroke-dasharray="${i % 2 ? '3 15' : '14 10'}"/>`
      out += `<ellipse cx="400" cy="${y}" rx="253" ry="76" fill="none" stroke="${EDGE}" stroke-width="1"/>`
    })
    return out
  },
  chain(links = 38, w = 6) {
    const P = [[110, 280], [180, 780], [620, 780], [690, 280]]
    let out = ''
    for (let i = 0; i <= links; i++) {
      const t = i / links
      const [x, y] = bez(...P, t)
      const a = bezAngle(...P, t)
      out += `<ellipse cx="${r(x)}" cy="${r(y)}" rx="22" ry="12" fill="none" stroke="${GOLD}" stroke-width="${w}" transform="rotate(${r(a + (i % 2 ? 90 : 0))} ${r(x)} ${r(y)})"/>`
      out += `<ellipse cx="${r(x)}" cy="${r(y)}" rx="22" ry="12" fill="none" stroke="${HI}" stroke-opacity=".5" stroke-width="1.5" transform="rotate(${r(a + (i % 2 ? 90 : 0))} ${r(x)} ${r(y)})"/>`
    }
    out += bead(110, 280, 14) + bead(690, 280, 14)
    return out
  },
  ropechain() {
    const P = [[110, 280], [180, 780], [620, 780], [690, 280]]
    let out = strand(`M110 280 C 180 780, 620 780, 690 280`, 22)
    for (let i = 0; i <= 60; i++) {
      const t = i / 60
      const [x, y] = bez(...P, t)
      const a = bezAngle(...P, t) + 60
      out += `<line x1="${r(x - 10)}" y1="${r(y)}" x2="${r(x + 10)}" y2="${r(y)}" stroke="#7A5E2A" stroke-opacity=".5" stroke-width="3" transform="rotate(${r(a)} ${r(x)} ${r(y)})"/>`
    }
    out += bead(110, 280, 15) + bead(690, 280, 15)
    return out
  },
  pendant() {
    let out = strand(`M240 90 C 280 330, 380 380, 400 400`, 7) + strand(`M560 90 C 520 330, 420 380, 400 400`, 7)
    out += bead(400, 400, 14)
    out += `<rect x="391" y="404" width="18" height="40" rx="8" fill="${GOLD}" stroke="${EDGE}" stroke-width="1.2"/>`
    out += flower(400, 560, 120, 8)
    for (let i = 0; i < 8; i++) {
      const a = ((i * 45 + 22.5) * Math.PI) / 180
      out += pearl(400 + Math.cos(a) * 150, 560 + Math.sin(a) * 150, 8)
    }
    return out
  },
  haram() {
    const A = [[210, 130], [170, 1010], [630, 1010], [590, 130]]
    let out = strand(`M250 130 C 225 700, 575 700, 550 130`, 6)
    out += strand(`M210 130 C 170 1010, 630 1010, 590 130`, 10)
    for (const t of [0.12, 0.24, 0.36, 0.5, 0.64, 0.76, 0.88]) {
      const [x, y] = bez(...A, t)
      out += t === 0.5 ? disc(x, y, 30) : t % 0.24 < 0.02 ? bead(x, y, 11) : disc(x, y, 22)
    }
    const [cx, cy] = bez(...A, 0.5)
    out += drop(cx, cy + 26, 0.85)
    return out
  },
  ring() {
    let out = `<circle cx="400" cy="640" r="178" fill="none" stroke="${GOLD}" stroke-width="40"/>`
    out += `<circle cx="400" cy="640" r="178" fill="none" stroke="${HI}" stroke-opacity=".6" stroke-width="5" transform="translate(-6 -6)"/>`
    out += `<circle cx="400" cy="640" r="198" fill="none" stroke="${EDGE}" stroke-width="1.2"/>`
    out += `<rect x="372" y="440" width="56" height="60" rx="14" fill="${GOLD}" stroke="${EDGE}" stroke-width="1.2"/>`
    out += flower(400, 380, 78, 8)
    return out
  },
  bracelet() {
    let out = ''
    const n = 30
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2
      const x = 400 + Math.cos(a) * 250
      const y = 500 + Math.sin(a) * 175
      const rot = (Math.atan2(Math.cos(a) * 175, -Math.sin(a) * 250) * 180) / Math.PI
      out += `<g transform="translate(${r(x)} ${r(y)}) rotate(${r(rot)})"><rect x="-27" y="-17" width="54" height="34" rx="12" fill="${GOLD}" stroke="${EDGE}" stroke-width="1.2"/><rect x="-18" y="-8" width="36" height="16" rx="7" fill="none" stroke="${HI}" stroke-opacity=".75" stroke-width="2"/></g>`
    }
    out += disc(400, 325, 36, true)
    return out
  },
  studs() {
    return flower(225, 450, 82, 8) + flower(575, 450, 82, 8) +
      [225, 575].map((x) => pearl(x, 585, 17)).join('')
  },
  kada() {
    let out = `<ellipse cx="400" cy="520" rx="270" ry="210" fill="none" stroke="${GOLD}" stroke-width="64"/>`
    out += `<ellipse cx="400" cy="520" rx="270" ry="210" fill="none" stroke="${HI}" stroke-opacity=".55" stroke-width="6" transform="translate(-8 -8)"/>`
    out += `<ellipse cx="400" cy="520" rx="270" ry="210" fill="none" stroke="#7A5E2A" stroke-opacity=".35" stroke-width="40" stroke-dasharray="2 22"/>`
    out += `<ellipse cx="400" cy="520" rx="302" ry="242" fill="none" stroke="${EDGE}" stroke-width="1.2"/>`
    for (const a of [90, 135, 45]) {
      const x = 400 + Math.cos((a * Math.PI) / 180) * 270 * (a === 90 ? 0 : 1)
      void x
    }
    out += disc(400, 310, 34) + disc(400, 730, 34, false)
    return out
  },
  bridal() {
    let out = ''
    // maang tikka
    out += strand(`M400 40 L400 150`, 6) + bead(400, 80, 9) + bead(400, 115, 9) + drop(400, 150, 0.5)
    // layered necklace
    const A = [[170, 320], [190, 800], [610, 800], [630, 320]]
    out += strand(`M170 320 C 190 800, 610 800, 630 320`, 12)
    out += strand(`M225 320 C 245 640, 555 640, 575 320`, 8)
    for (const t of [0.14, 0.26, 0.38, 0.5, 0.62, 0.74, 0.86]) {
      const [x, y] = bez(...A, t)
      out += t === 0.5 ? disc(x, y + 8, 34) : disc(x, y + 6, 24)
    }
    const [cx, cy] = bez(...A, 0.5)
    out += drop(cx, cy + 36, 0.9)
    // earrings
    out += `<g transform="translate(85 330) scale(.5) translate(0 -300)">${jhumkaOne(0)}</g>`
    out += `<g transform="translate(715 330) scale(.5) translate(0 -300)">${jhumkaOne(0)}</g>`
    return out
  },
}

// ----- Frame / variants -----
const BGS = [
  ['#FFFDF8', '#F2E7D3'],
  ['#F9F2E8', '#E9D9BE'],
  ['#FFF9EE', '#EEDFC4'],
]

const svg = (inner, { bg = 0, rot = 0, scale = 1, cx = 400, cy = 500, ring = true, w = 800, h = 1000 } = {}) => {
  const [c1, c2] = BGS[bg % BGS.length]
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs>
<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#F3E4BA"/><stop offset=".32" stop-color="#CDAE6A"/><stop offset=".68" stop-color="#9C7C3E"/><stop offset="1" stop-color="#DCC48C"/>
</linearGradient>
<radialGradient id="bg" cx=".3" cy=".25" r="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
<radialGradient id="shadow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#514034" stop-opacity=".18"/><stop offset="1" stop-color="#514034" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
${ring ? `<circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) * 0.42}" fill="none" stroke="#B99A5B" stroke-opacity=".2" stroke-width="2"/><circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) * 0.47}" fill="none" stroke="#B99A5B" stroke-opacity=".14" stroke-width="1.5" stroke-dasharray="2 10"/>` : ''}
<ellipse cx="${w / 2}" cy="${h * 0.9}" rx="${w * 0.34}" ry="22" fill="url(#shadow)"/>
<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${scale}) translate(-400 -500)">${inner}</g>
</svg>
`
}

const write = (file, content) => writeFileSync(OUT + file, content)

const product = (slug, art, bg) => {
  const inner = art()
  write(`products/${slug}-1.svg`, svg(inner, { bg }))
  write(`products/${slug}-2.svg`, svg(inner, { bg: bg + 1, rot: -7, scale: 0.92 }))
  write(`products/${slug}-3.svg`, svg(inner, { bg: bg + 2, scale: 1.55, cy: 470, ring: false }))
}

product('traditional-gold-necklace', pieces.necklace, 0)
product('antique-gold-jhumkas', pieces.jhumka, 1)
product('classic-gold-bangles', pieces.bangles, 2)
product('everyday-gold-chain', () => pieces.chain(40, 6), 0)
product('floral-gold-pendant', pieces.pendant, 1)
product('gold-haram', pieces.haram, 2)
product('elegant-gold-ring', pieces.ring, 0)
product('contemporary-gold-bracelet', pieces.bracelet, 1)
product('gold-stud-earrings', pieces.studs, 2)
product('bridal-gold-choker-set', pieces.bridal, 0)
product('gold-rope-chain', pieces.ropechain, 1)
product('antique-gold-kada', pieces.kada, 2)

// Category images (distinct compositions from the product shots)
write('categories/necklaces.svg', svg(pieces.necklace(), { bg: 1, scale: 1.18, cy: 470 }))
write('categories/earrings.svg', svg(pieces.jhumka(), { bg: 2, scale: 1.2, cy: 450 }))
write('categories/bangles.svg', svg(pieces.bangles(), { bg: 0, rot: 5, scale: 1.05 }))
write('categories/chains.svg', svg(pieces.chain(40, 6), { bg: 2, rot: -4, scale: 1.1, cy: 430 }))
write('categories/rings.svg', svg(pieces.ring(), { bg: 1, scale: 1.2, cy: 520 }))
write('categories/bridal.svg', svg(pieces.bridal(), { bg: 0, scale: 0.98 }))

// Editorial images
write('hero.svg', svg(pieces.bridal(), { bg: 0, scale: 1.0 }))
write('bridal-editorial.svg', svg(pieces.bridal(), { bg: 1, rot: 3, scale: 1.04, w: 800, h: 1000 }))
write(
  'story.svg',
  svg(
    `<g transform="translate(0 -120) scale(.9) translate(40 60)">${pieces.pendant()}</g><g transform="translate(0 470) scale(.55) translate(330 0)">${pieces.bangles()}</g>`,
    { bg: 2, ring: true },
  ),
)
write('placeholder.svg', svg(`<g opacity=".9">${pieces.pendant()}</g>`, { bg: 0, scale: 0.7 }))

console.log('Generated artwork in public/images')
