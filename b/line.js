/* Amigo Animation, option B: one line, one light. Shared by index.html and specialty.html.
   Geometry is ported from the approved style frames (engine/frames_n.py: stem, fan, palm). All SVG is built 1:1 in px so the
   line weight never scales and stroke-dash drawing stays exact. */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const NS = 'http://www.w3.org/2000/svg';
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const COARSE = matchMedia('(pointer: coarse)').matches;
document.documentElement.classList.add('js');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeIO = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = t => 1 - Math.pow(1 - t, 3), easeOut5 = t => 1 - Math.pow(1 - t, 5);
const back = t => { const c = 1.70158, u = t - 1; return 1 + (c + 1) * u * u * u + c * u * u };
const el = (n, a = {}, p) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e };
const D = pts => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('');
const circ = (c, r, a0, a1, n = 40) => Array.from({ length: n + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)] });
const px = (name) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;
const phone = () => innerWidth <= 860;
const ARROW = '<svg width="20" height="12" viewBox="0 0 20 12" aria-hidden="true"><path d="M1 6h17M13 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const LOGO = {"OUTER": "M 104.929688 52.386719 C 105.949219 24.644531 86.003906 -0.75 57 0 C 37.886719 0.148438 15.671875 8.15625 7.105469 27.964844 C -7.171875 56.234375 6.359375 99.738281 42.167969 99.871094 L 42.183594 99.933594 C 50.785156 100.207031 61.042969 100.59375 68.25 98.625 C 84.703125 95.164062 96.996094 82.898438 102.304688 67.441406 C 103.472656 62.441406 104.78125 57.582031 104.929688 52.386719 ", "L": "M 48.941406 46.355469 C 49.628906 36.613281 47.664062 29.878906 49.207031 20.226562 C 49.863281 16.113281 57.125 16.105469 56.621094 21.113281 C 56.59375 29.839844 57.066406 37.328125 56.847656 45.871094 C 57 58.933594 53.65625 56.5625 67.542969 56.460938 C 71.457031 55.777344 74.859375 52.9375 74.964844 48.628906 C 75.042969 42.898438 74.960938 35.328125 75.609375 29.339844 C 78.789062 24.015625 81.609375 28.488281 81.761719 32.480469 C 81.261719 52.726562 83.546875 65.0625 58.4375 63.609375 C 56.078125 63.796875 57.183594 63.824219 56.699219 65.441406 C 56.992188 73.757812 56.816406 82.003906 56.957031 91.1875 C 56.558594 95.191406 56.683594 94.503906 53.332031 94.847656 C 52.890625 94.628906 48.910156 95.410156 49.167969 93.851562 C 46.761719 69.664062 55.144531 79.886719 32.65625 72.960938 C 32.441406 72.554688 32.507812 73.191406 32.40625 72.875 C 27.128906 71.75 25.332031 68.277344 24.753906 63.03125 C 24.632812 58.046875 22.796875 42.175781 25.214844 39.742188 C 37.367188 32.152344 24.996094 65.257812 34.707031 66.585938 C 38.179688 68.449219 42.847656 68.625 47.070312 68.832031 C 48.773438 69.097656 48.933594 68.699219 48.828125 67.246094 C 49.371094 60.644531 48.777344 53.066406 48.941406 46.355469 ", "R": "M 61.632812 51.039062 C 61.398438 50.71875 61.347656 50.378906 61.34375 49.929688 C 61.265625 40.59375 61.40625 30.863281 61.703125 21.214844 C 61.023438 8.894531 44.046875 10.328125 43.875 21.730469 C 44.136719 34.957031 43.890625 48.609375 44.085938 62.03125 C 44.144531 63.132812 43.984375 63.507812 42.652344 63.347656 C 40.597656 62.460938 35.671875 64.191406 35.757812 60.308594 C 33.777344 52.132812 41.011719 34.527344 28.191406 33.621094 C 20.371094 32.558594 17.707031 41.757812 19.042969 48.285156 C 19.320312 54.9375 18.171875 61.921875 21.109375 68.164062 C 23.511719 76.796875 34.410156 78.375 41.753906 80.316406 C 42.023438 80.339844 42.394531 80.582031 42.789062 80.566406 C 44.402344 80.859375 44.003906 81.421875 44.183594 82.894531 C 44.285156 86.226562 44.074219 89.316406 44.40625 93.03125 C 44.699219 94.03125 43.480469 94.570312 42.664062 94.585938 C -2.746094 93.785156 -4.453125 22.453125 34.40625 9.558594 C 107.597656 -16.574219 121.703125 85.023438 63.582031 94.214844 C 60.042969 95.007812 62.644531 73.714844 61.710938 70.765625 C 61.710938 68.949219 61.292969 68.484375 64.121094 68.3125 C 86.835938 67.953125 87.277344 48.972656 86.421875 30.933594 C 86.398438 23.449219 76.4375 18.425781 71.851562 25.410156 C 69.382812 30.800781 70.769531 38.640625 70.296875 44.492188 C 70.160156 51.699219 68.019531 51.320312 62.53125 51.277344 C 62.15625 51.273438 62.039062 51.105469 61.632812 51.039062 "};
const logoSvg = z => `<svg width="${z}" height="${Math.round(z * .953)}" viewBox="0 0 106 101" aria-hidden="true"><path fill="#F3E9DA" d="${LOGO.OUTER}"/><path fill="#BA6441" d="${LOGO.L}"/><path fill="#BA6441" d="${LOGO.R}"/></svg>`;
const WORK = { airport: ['Holiday Spot', 'San Diego Airport'], zebra_inventory: ['Workcloud Inventory Visibility', 'Zebra'], zebra_timekeeping: ['Workcloud Timekeeping', 'Zebra'], zebra_scheduling: ['Workcloud Scheduling', 'Zebra'], jiffy_hook: ['Hook to Wormhole', 'Jiffy Learning'], jiffy_starborn: ['Star Born', 'Jiffy Learning'] };
const DOORS = { commercials: ['Commercials', 'See commercials'], ui: ['UI and explainers', 'See UI work'], '3d': ['3D', 'See 3D work'], packages: ['Packages', 'See packages'] };
const SPEC_WORK = { commercials: ['airport', 'zebra_scheduling', 'jiffy_hook', 'zebra_inventory', 'jiffy_starborn', 'zebra_timekeeping', 0, 0], ui: ['zebra_inventory', 'zebra_timekeeping', 'zebra_scheduling', 'jiffy_hook', 'jiffy_starborn', 0, 0, 0], '3d': ['airport', 0, 0, 0, 0, 0, 0, 0], packages: ['airport', 'zebra_inventory', 'jiffy_hook', 'jiffy_starborn', 0, 0, 0, 0] };
const CLIENTS = ['jeep', 'harley', 'zebra', 'adobe', 'hp', 'general', 'reef', 'skatelite', 'sdairport', 'google', 'toyota', 'yeti', 'apple', 'cocacola', 'patagonia', 'rivian', 'sonos', 'microsoft'];

/* ---------- builders ---------- */
function icon(key, S) {
  const k = S / 64, n = v => +(v * k).toFixed(2), P = s => s.replace(/-?\d+(\.\d+)?/g, m => n(+m));
  let g = '';
  if (key === 'commercials') g = `<path class="s ln b1" pathLength="1" d="${P('M8 25V16H17')}"/><path class="s ln b2" pathLength="1" style="--d:.1s" d="${P('M47 16H56V25')}"/><path class="s ln b3" pathLength="1" style="--d:.2s" d="${P('M8 39V48H17')}"/><path class="s ln b4" pathLength="1" style="--d:.3s" d="${P('M47 48H56V39')}"/><circle class="lt pop" cx="${n(39)}" cy="${n(29)}" r="${Math.max(3.4, n(3.2))}"/>`;
  else if (key === 'ui') g = `<rect class="s ln" pathLength="1" x="${n(8)}" y="${n(21)}" width="${n(48)}" height="${n(22)}" rx="${n(11)}"/><circle class="f knob mv" style="--kx:${n(26)}px" cx="${n(19)}" cy="${n(32)}" r="${n(5.5)}"/>`;
  else if (key === '3d') g = `<circle class="s ln" pathLength="1" cx="${n(32)}" cy="${n(32)}" r="${n(22)}"/><ellipse class="s eq" cx="${n(32)}" cy="${n(32)}" rx="${n(22)}" ry="${n(8)}"/>`;
  else g = `<path class="s dim ln" pathLength="1" d="${P('M5 32H59')}"/><path class="f tw k1" d="${P('M14 25.5L20.5 32L14 38.5L7.5 32Z')}"/><path class="f tw k2" d="${P('M26.5 26H37.5L26.5 38H37.5Z')}"/><path class="f tw k3" d="${P('M44.5 26.5H55.5V37.5H44.5Z')}"/>`;
  return `<svg class="art ic" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" aria-hidden="true">${g}</svg>`;
}
function door(key, href) {
  const d = DOORS[key];
  return `<a class="door" data-in href="${href}">${icon(key, phone() ? 56 : 92)}<span><strong>${d[0]}</strong><small>[One line]</small></span><em>${d[1]} ${ARROW}</em></a>`;
}
function piece(key, cls) {
  const w = WORK[key];
  return `<a class="piece ${cls}" data-in href="#work"${w ? ` data-clip="${key}"` : ''}><span class="fr">${w ? `<img src="assets/clips/${key}.jpg" alt="" loading="lazy"><video muted loop playsinline preload="none"></video>` : '<span class="slot">[Piece]</span>'}<svg class="ol" aria-hidden="true"><rect class="${w ? 'ln' : 'dot'}"${w ? ' pathLength="1"' : ''}/></svg><span class="ck"><i></i><i></i><i></i><i></i></span></span><span class="lab"><i class="kf"></i><b>${w ? w[0] : '[Piece]'}</b><span>${w ? w[1] : '[Credit]'}</span></span></a>`;
}
function branches() {
  const L = px('--lane'), r = Math.min(14, L * .42);
  $$('.hd').forEach(h => {
    let s = $('.br', h); if (!s) { s = el('svg', { class: 'art br', 'aria-hidden': 'true' }); h.prepend(s); h.setAttribute('data-in', '') }
    h.style.setProperty('--br', r + 'px'); s.setAttribute('viewBox', `0 0 ${L} 32`);
    s.innerHTML = `<path class="s ln" pathLength="1" style="--t:.7s" d="M0 0A${r} ${r} 0 0 0 ${r} ${r}H${L - 15}"/><circle class="f pop" style="--d:.55s" cx="${L - 10}" cy="${r}" r="3"/>`;
  });
}
function fit() {
  $$('.ol').forEach(s => { const w = s.clientWidth, h = s.clientHeight, r = s.firstElementChild; r.setAttribute('x', 1); r.setAttribute('y', 1); r.setAttribute('width', Math.max(0, w - 2)); r.setAttribute('height', Math.max(0, h - 2)) });
  $$('.ring svg').forEach(s => { const w = s.clientWidth; s.setAttribute('viewBox', `0 0 ${w} ${w}`); const c = s.firstElementChild; c.setAttribute('cx', w / 2); c.setAttribute('cy', w / 2); c.setAttribute('r', w / 2 - 1.5) });
  $$('.steps svg.tl').forEach(s => { const w = s.clientWidth, cols = $$('div', s.parentNode), o = s.getBoundingClientRect().left; s.innerHTML = `<path class="s dim ln" pathLength="1" style="--t:1.6s" d="M0 6H${w}"/>` + cols.map((c, i) => { const x = c.getBoundingClientRect().left - o + 6; return `<path class="f pop" style="--d:${.3 + i * .35}s" d="M${x} 0l6 6-6 6-6-6z"/>` }).join('') });
}

/* ---------- hero: the line comes in along the ground, the word stands up on it, it turns, climbs and branches ---------- */
let H = null;
function letters(x, y, h) {
  // MOTION, built only from straight strokes and one circle size, standing on the line
  const out = [], gap = .36 * h; let cx = x;
  const add = (w, strokes) => { out.push({ cx: cx + w / 2, strokes: strokes.map(s => s.map(p => [cx + p[0] * h, y - p[1] * h])) }); cx += w + gap };
  const O = () => { out.push({ cx: cx + h / 2, strokes: [circ([cx + h / 2, y - h / 2], h / 2, 90, 450, 72)] }); cx += h + gap };
  add(.98 * h, [[[0, 0], [0, 1], [.49, 0], [.98, 1], [.98, 0]]]); O();
  add(.74 * h, [[[.37, 0], [.37, 1]], [[0, 1], [.74, 1]]]); add(0, [[[0, 0], [0, 1]]]); O();
  add(.74 * h, [[[0, 0], [0, 1], [.74, 0], [.74, 1]]]);
  return out;
}
function farPalm(bx, gy, PH) {
  const R = PH * .207, fil = PH * .104, lean = PH * .063, hh = PH - fil, Rt = (hh * hh + lean * lean) / (2 * lean), ang = Math.asin(hh / Rt) * 180 / Math.PI;
  const up = circ([bx - Rt, gy - fil], Rt, 0, -ang, 40), top = up[up.length - 1], tl = -ang * Math.PI / 180;
  let out = `<path d="M${(bx - PH * .62).toFixed(1)} ${gy}H${(bx + PH * .5).toFixed(1)}"/><path d="${D([[bx - fil, gy], ...circ([bx - fil, gy - fil], fil, 90, 0, 16).slice(1), ...up.slice(1)])}"/>`;
  for (const [a0, t] of [[18, 142], [50, 110], [84, 76]]) for (const sg of [1, -1]) {
    const pts = []; for (let i = 0; i <= 36; i++) { const q = (a0 + t * i / 36) * Math.PI / 180, a = a0 * Math.PI / 180, x = sg * R * (Math.cos(a) - Math.cos(q)), y = R * (Math.sin(a) - Math.sin(q)); pts.push([top[0] + x * Math.cos(tl) - y * Math.sin(tl), top[1] + x * Math.sin(tl) + y * Math.cos(tl)]) }
    out += `<path d="${D(pts)}"/>`;
  }
  return out;
}
let TOP = 'curve', WORD = 'line';
const FONTS = { script: 'Sacramento', brush: 'Yellowtail' };
// fits the script word to the room it has: returns font size, the height of its tall letters and where its baseline sits in the line box
function scriptFit(avail, maxFs) {
  const c = document.createElement('canvas').getContext('2d'); c.font = `100px "${FONTS[WORD]}", cursive`; const m = c.measureText('Motion');
  const fs = Math.min(avail / (m.width + 6) * 100, maxFs), A = (m.fontBoundingBoxAscent || 90) * fs / 100, Dn = (m.fontBoundingBoxDescent || 35) * fs / 100;
  return { fs, cap: (m.actualBoundingBoxAscent || 70) * fs / 100, base: (fs - (A + Dn)) / 2 + A, w: m.width * fs / 100 };
}
function hero(play) {
  const st = $('#stage'); if (!st) return;
  const svg = $('svg', st), light = $('.light', st), sub = $('.sub', st), reel = $('.reel', st);
  const W = st.clientWidth, ph = W < 700, gx = px('--gx'), x0 = gx + px('--lane'), V = TOP;
  // the hero fills the first screen: reel top left, the word under it on the line, one drawing on the right.
  // zone = the box the drawing gets: from xs (where it leaves the ground) to the right edge, from yTop down to the ground gy
  let Hh, gy, h, wy, rw, ry, rx = x0, xs, yTop, wAv, PH, R, fil, lean, bx, k, SF = null; const SC = WORD !== 'line', sc = $('.script', st);
  const palmDims = hgt => { PH = hgt; R = PH * .207; fil = PH * .104; lean = PH * .063 };
  if (!ph) {
    Hh = Math.round(clamp(innerHeight, 600, 960)); gy = Hh - 132; yTop = 100;
    if (V === 'palm') { palmDims(Math.min(640, (gy - 96) / 1.16)); bx = Math.min(W * .875, W - 1.8 * R - 8); wAv = bx - lean - 1.75 * R - 70 - x0 }
    else if (V === 'wave') { k = Math.min((gy - yTop - 10) / 605, W * .4 / 1046); xs = W - 70 - 1046 * k; wAv = xs - 50 - x0 }
    else if (V === 'sun') { R = Math.min(132, (gy - yTop) * .27); xs = W * .8; wAv = xs - R - 90 - x0 } else { xs = W * .64; wAv = xs - 56 - x0 }
    h = clamp(wAv / 6.26, 34, 128); wy = gy; if (SC) { SF = scriptFit(wAv, 300); h = SF.cap }
    const BIG = V !== 'wave' && !SC; if (BIG) h = clamp(W * .05, 40, 76);
    const hAv = gy - h - 40 - 104; rw = Math.max(260, Math.min(wAv, hAv * 16 / 9)); ry = gy - h - 40 - rw * 9 / 16;
    if (BIG) { const top = 92, hA = gy - h - 34 - top; rw = Math.max(260, Math.min(W - 2 * x0 - 200, hA * 16 / 9)); rx = (W - rw) / 2; ry = top + (hA - rw * 9 / 16) / 2; const mg = W - rx - rw; if (V === 'sun') { R = Math.min(84, mg * .36); xs = rx + rw + mg / 2 } else xs = rx + rw + Math.min(40, mg * .2) }
  } else {
    rw = W - x0 - 16; ry = 84; yTop = ry + rw * 9 / 16 + 30; gy = yTop + 232;
    if (V === 'palm') { palmDims((gy - yTop) / 1.16); bx = W * .64 } else if (V === 'wave') { k = Math.min(206 / 605, W * .7 / 1046); xs = W - 26 - 1046 * k } else if (V === 'sun') { R = 62; xs = W * .64 } else xs = W * .3;
    h = Math.min(64, (W - x0 - 18) / 6.26); if (SC) { SF = scriptFit(W - x0 - 22, 150); h = SF.cap } wy = gy + 52 + h; Hh = Math.round(wy + 104);
  }
  if (reel) { reel.style.left = rx + 'px'; reel.style.top = ry + 'px'; reel.style.width = rw + 'px' }
  st.classList.add('lit');
  st.style.height = Hh + 'px'; svg.setAttribute('viewBox', `0 0 ${W} ${Hh}`); st.style.setProperty('--hw', (ph ? 2 : clamp(W / 560, 2.2, 2.8)) + 'px');
  st.closest('[data-g]').style.setProperty('--tt', gy + 'px');
  sub.style.left = (ph ? x0 : rx) + 'px'; sub.style.top = (ph ? wy + 20 : gy + 26) + (SC ? SF.fs * (WORD === 'brush' ? .13 : .05) : 0) + 'px';
  const wEnd = x0 + 6.26 * h;
  let stem, fr = [], fan = null, tilt = 0, far = '', extra = '', sunMk = '', guides = [], end, tips = false;
  st.dataset.top = V;
  if (V === 'palm') {
    // stem (frames_n.stem): in along the ground, a quarter turn, up on an arc that bows left by `lean`
    const hh = PH - fil, Rt = (hh * hh + lean * lean) / (2 * lean), ang = Math.asin(hh / Rt) * 180 / Math.PI;
    const up = circ([bx - Rt, gy - fil], Rt, 0, -ang, 70), top = up[up.length - 1]; tilt = -ang * Math.PI / 180;
    stem = [[-20, gy], [bx - fil, gy], ...circ([bx - fil, gy - fil], fil, 90, 0, 28).slice(1), ...up.slice(1)];
    // crown (frames_n.fan): six arcs of one circle, all leaving one point
    fan = tl => { const out = [];
      for (const [a0, t] of [[18, 142], [50, 110], [84, 76]]) for (const sg of [1, -1]) {
        const pts = []; for (let i = 0; i <= 72; i++) { const q = (a0 + t * i / 72) * Math.PI / 180, a = a0 * Math.PI / 180; const x = sg * R * (Math.cos(a) - Math.cos(q)), y = R * (Math.sin(a) - Math.sin(q)); pts.push([top[0] + x * Math.cos(tl) - y * Math.sin(tl), top[1] + x * Math.sin(tl) + y * Math.cos(tl)]) }
        out.push(pts);
      } return out };
    fr = fan(tilt); guides = fr; end = top; tips = true;
    far = ph ? `<g class="far fa">${farPalm(W * .2, gy - 30, PH * .46)}</g>` : `<g class="far fb">${farPalm(bx + (W - bx) * .56, gy - 78, PH * .25)}</g><g class="far fa">${farPalm((wEnd + bx) / 2 - 6, gy - 46, PH * .4)}</g>`;
  } else if (V === 'wave') {
    // the wave (frames_n.wave): along the water, up the back, over the top to a sharp lip; then back round the hollow and out flat.
    // Two circles. Here the hollow sits on the same level as the water behind, so the line it stands on stays one shelf edge
    const Ys = 640.6, rf = 150, c1 = [784, 495], R2 = 200, c2 = [1040, Ys - R2], aT = -25, T = [c2[0] + R2 * Math.cos(aT * Math.PI / 180), c2[1] + R2 * Math.sin(aT * Math.PI / 180)];
    const R1 = Math.hypot(T[0] - c1[0], T[1] - c1[1]), fx = c1[0] - Math.sqrt((R1 + rf) ** 2 - (Ys - rf - c1[1]) ** 2), fc = [fx, Ys - rf];
    const a1 = Math.atan2(c1[1] - fc[1], c1[0] - fc[0]) * 180 / Math.PI, aTT = Math.atan2(T[1] - c1[1], T[0] - c1[0]) * 180 / Math.PI, aL = Math.asin((Ys - c1[1]) / R1) * 180 / Math.PI;
    const tf = pts => pts.map(q => [xs + (q[0] - fx) * k, gy + (q[1] - Ys) * k]);
    stem = [[-20, gy], ...tf([[fx, Ys], ...circ(fc, rf, 90, a1, 40).slice(1), ...circ(c1, R1, a1 - 180, aTT, 160).slice(1)])];
    fr = [[...tf(circ(c2, R2, aT, aT - 245, 160)), [W + 20, gy]]]; guides = fr; end = tf([T])[0];
    extra = `<path class="dots" d="${D(tf(circ(c1, R1, aTT + 3, aL, 50)))}"/>` + [-58, -30, -4, 22, 50].map(a => { const r = a * Math.PI / 180, c = Math.cos(r), n = Math.sin(r); return `<path class="tick" d="M${(end[0] + 15 * c).toFixed(1)} ${(end[1] + 15 * n).toFixed(1)}L${(end[0] + 27 * c).toFixed(1)} ${(end[1] + 27 * n).toFixed(1)}"/>` }).join('');
  } else if (V === 'sun') {
    // the sun (style frame N7): the line runs straight through as the horizon, the light comes up over the shelf edge
    stem = [[-20, gy], [W + 20, gy]]; end = [xs, gy];
    sunMk = `<defs><clipPath id="sunc"><rect x="0" y="-400" width="${W}" height="${gy + 400}"/></clipPath></defs><g class="sung"><g clip-path="url(#sunc)"><circle class="sunf" cx="${xs}" cy="${gy + R + 6}" r="${R}"/></g></g>`;
    extra = [[20, .62, .9], [40, .38, .6], [60, .16, .35]].map(([dy, hw, o]) => `<path class="tick" style="opacity:${o}" d="M${xs - R * hw} ${gy + dy}H${xs + R * hw}"/>`).join('');
  } else {
    // the ease curve (style frame Q1): the line leaves the ground at one keyframe and eases up to the next. Handles are the true control points
    const P0 = [xs, gy], P3 = [W - (ph ? 34 : Math.max(30, Math.min(84, (W - xs) * .3))), yTop + (ph ? 26 : 56)], dx = P3[0] - P0[0], c1 = [P0[0] + dx * .62, P0[1]], c2 = [P3[0] - dx * .62, P3[1]], bz = [];
    for (let i = 0; i <= 90; i++) { const t = i / 90, m = 1 - t; bz.push([m * m * m * P0[0] + 3 * m * m * t * c1[0] + 3 * m * t * t * c2[0] + t * t * t * P3[0], m * m * m * P0[1] + 3 * m * m * t * c1[1] + 3 * m * t * t * c2[1] + t * t * t * P3[1]]) }
    stem = [[-20, gy], ...bz]; end = P3; guides = [[P3, [W + 20, P3[1]]]];
    const dia = q => `<path class="kd" d="M${q[0]} ${q[1] - 7}l7 7-7 7-7-7z"/>`;
    extra = `<path class="dots" d="M${P3[0] + 16} ${P3[1]}H${W + 20}"/><path class="hbar" d="M${P0[0]} ${P0[1]}L${c1[0]} ${c1[1]}"/><path class="hbar" d="M${P3[0]} ${P3[1]}L${c2[0]} ${c2[1]}"/><circle class="hdot" cx="${c1[0]}" cy="${c1[1]}" r="4"/><circle class="hdot" cx="${c2[0]}" cy="${c2[1]}" r="4"/>${dia(P0)}`;
  }
  svg.innerHTML = far + sunMk + `<g class="xtra">${extra}</g>`;
  st.style.setProperty('--cx', end[0] + 'px'); st.style.setProperty('--cy', end[1] + 'px');
  const guide = el('g', {}, svg); el('path', { class: 'guide', d: D(stem) }, guide); if (V !== 'curve') guides.forEach(f => el('path', { class: 'guide', d: D(f) }, guide));
  const mk = pts => { const q = el('path', { class: 'h', d: D(pts) }, svg); q._len = q.getTotalLength(); return q };
  const S = { W, ph, gx, gy, light, guide, reel, xtra: $('.xtra', svg), stem: mk(stem), fr: fr.map(mk), tips: tips ? fr.map(f => el('circle', { class: 'f', cx: f[72][0], cy: f[72][1], r: 0 }, svg)) : [], ride: tips, node: el('circle', { class: 'f', cx: gx, cy: gy, r: 0 }, svg) };
  S.sun = $('.sunf', svg); S.sunR = R;
  S.let = SC ? [] : letters(ph ? x0 : rx, wy, h).map(l => ({ cx: l.cx, t0: null, p: l.strokes.map(mk) }));
  if (sc) { sc.hidden = !SC; if (SC) { sc.style.fontFamily = `"${FONTS[WORD]}", cursive`; sc.style.fontSize = SF.fs + 'px'; sc.style.left = x0 + 'px'; sc.style.top = (wy - SF.base + (WORD === 'brush' ? SF.fs * .02 : SF.fs * .035)) + 'px'; S.sc = sc; S.scX = x0; S.scW = SF.w } } S.fan = fan; S.tilt = tilt; S.box = [wy - h, wy, h]; S.st = st;
  S.Ts = ph ? 1.8 : 2.5; S.tF = .3 + S.Ts - .14; S.tL = S.tF + .7; S.end = (ph ? S.tL + 5 * .08 + .9 : S.tF + 2.1);
  if (H && H.raf) cancelAnimationFrame(H.raf);
  H = S;
  if (play && !RM) { const t0 = performance.now(); const step = now => { const t = (now - t0) / 1000; frame(S, t); if (t < S.end) S.raf = requestAnimationFrame(step); else S.live = true }; frame(S, 0); S.raf = requestAnimationFrame(step) }
  else { frame(S, 99); S.live = !RM }
}
function dash(p, u) { if (u <= 0) { p.style.visibility = 'hidden'; return } p.style.visibility = ''; if (u >= 1) { p.style.strokeDasharray = 'none'; return } p.style.strokeDasharray = p._len + ' ' + (p._len + 20); p.style.strokeDashoffset = p._len * (1 - u) }
function frame(S, t) {
  const all = t > 90, s = easeIO(clamp((t - .3) / S.Ts)), d = s * S.stem._len;
  dash(S.stem, s);
  S.node.setAttribute('r', all ? 3.6 : d >= S.gx + 20 ? 3.6 * back(clamp((t - (S.tn ??= t)) / .4)) : 0);
  S.let.forEach((l, i) => {
    if (l.t0 == null && (S.ph ? t >= S.tL + i * .08 : d >= l.cx + 20)) l.t0 = t;
    const u = all ? 1 : l.t0 == null ? 0 : clamp((t - l.t0) / .75);
    l.p.forEach((p, j) => dash(p, easeOut5(clamp(u * 1.3 - j * .3))));
  });
  let pos = S.stem.getPointAtLength(d);
  S.fr.forEach((p, i) => { const u = easeOut5(clamp((t - S.tF - i * .06) / 1.1)); dash(p, u); if (!i && S.ride && t >= S.tF) pos = p.getPointAtLength(u * p._len); if (S.tips[i]) S.tips[i].setAttribute('r', i ? 4 * (all ? 1 : back(clamp((t - S.tF - i * .06 - .7) / .45))) : 0) });
  S.xtra.style.opacity = all ? 1 : clamp((t - S.tF - .2) / .7);
  if (S.sun) S.sun.setAttribute('cy', (S.gy + (S.sunR + 6) * (all ? 0 : 1 - easeOut5(clamp((t - 1.3) / 2.2)))).toFixed(1));
  const v = clamp((t - S.tF - 1) / .7), pulse = all ? 1 : 1 + .55 * Math.sin(Math.PI * v) * (1 - v);
  S.light.style.transform = `translate(${pos.x.toFixed(1)}px,${pos.y.toFixed(1)}px) scale(${pulse.toFixed(3)})`;
  S.light.style.opacity = t < .3 ? 0 : 1;
  S.guide.style.opacity = all ? 0 : 1 - clamp((t - S.tF - .5) / .6);
  if (S.sc) S.sc.style.setProperty('--wv', all ? 1 : S.ph ? easeIO(clamp((t - S.tL) / 1.3)).toFixed(3) : clamp((d - S.scX - 20) / S.scW).toFixed(3));
  if (S.reel) S.reel.style.setProperty('--rv', all ? 1 : easeIO(clamp((t - .55) / 1.5)).toFixed(3));
}

/* after the drawing: the crown leans toward the cursor and breathes; a letter redraws itself when the cursor crosses it */
function live() {
  const st = $('#stage'); if (!st || RM || COARSE) return;
  let mx = .5, my = -1, a = 0, v = 0, on = true, px0 = -1, pxs = 0, pys = 0;
  st.addEventListener('pointermove', e => { const r = st.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width; px0 = e.clientX - r.left; my = e.clientY - r.top });
  st.addEventListener('pointerleave', () => { mx = .5; my = -1 });
  new IntersectionObserver(es => { on = es[0].isIntersecting }).observe(st);
  const loop = now => {
    requestAnimationFrame(loop); const S = H; if (!on || !S || !S.live) return;
    const t = now / 1000, goal = (mx - .5) * .16 + Math.sin(t * .9) * .022; v += (goal - a) * .035; v *= .88; a += v;
    pxs += ((mx - .5) - pxs) * .06; pys += ((my < 0 ? 0 : my / st.clientHeight - .5) - pys) * .06; st.style.setProperty('--mx', pxs.toFixed(4)); st.style.setProperty('--my', pys.toFixed(4));
    if (S.fan) S.fan(S.tilt + a).forEach((pts, i) => { S.fr[i].setAttribute('d', D(pts)); if (i) { S.tips[i].setAttribute('cx', pts[72][0]); S.tips[i].setAttribute('cy', pts[72][1]) } else S.light.style.transform = `translate(${pts[72][0].toFixed(1)}px,${pts[72][1].toFixed(1)}px)` });
    S.let.forEach(l => {
      if (l.re == null && my > S.box[0] - 10 && my < S.box[1] + 10 && Math.abs(px0 - l.cx) < S.box[2] * .42 && !(l.cool > now)) l.re = now;
      if (l.re != null) { const u = (now - l.re) / 850; l.p.forEach((p, j) => dash(p, easeIO(clamp(u * 1.25 - j * .25)))); if (u >= 1) { l.re = null; l.cool = now + 900 } }
    });
  };
  requestAnimationFrame(loop);
}

/* ---------- the wake: a field of straight lines; the board cuts through and leaves ripples (style frame T1) ---------- */
let WAKE = null;
const boardPts = (L, wd = .25, tail = .24, pw = .6) => { const a = L / 2, b = L * wd / 2, up = [], dn = []; for (let i = 0; i <= 40; i++) { const x = -a + L * i / 40, f = Math.pow(Math.max(0, 1 - (x / a) * (x / a)), pw), hw = (x < 0 ? tail + (1 - tail) * f : f) * b; up.push([x, -hw]); dn.unshift([x, hw]) } return up.concat(dn) };
function wake() {
  const cv = $('#wake'); if (!cv) return;
  const sec = cv.closest('section'), ctx = cv.getContext('2d'), BP = boardPts(58), BP2 = boardPts(70, .34);
  let W = 0, Hc = 0, dpr = 1, col = '#fff', bg = '#000', paper = false, hist = [], bits = [], lastT = 0, ph = 0, trail = [], bx = null, by = 0, ex = 0, ey = 0, ang = -.5, ptr = null, ptrT = 0, on = false;
  const size = () => { dpr = Math.min(2, devicePixelRatio || 1); W = cv.clientWidth; Hc = cv.clientHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(Hc * dpr); const cs = getComputedStyle(sec); col = cs.color; bg = cs.backgroundColor; paper = sec.dataset.ground === 'paper' || sec.dataset.ground === 'tan'; if (RM) draw(0) };
  sec.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); ptr = [clamp(e.clientX - r.left, W * .12, W - 20), clamp(e.clientY - r.top, 20, Hc - 20)]; ptrT = performance.now() });
  sec.addEventListener('pointerleave', () => { ptr = null });
  new IntersectionObserver(es => { on = es[0].isIntersecting }).observe(cv);
  const poly = (P, x, y, a) => { const c = Math.cos(a), s = Math.sin(a); ctx.beginPath(); P.forEach((p, i) => { const X = x + p[0] * c - p[1] * s, Y = y + p[0] * s + p[1] * c; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y) }); ctx.closePath() };
  function draw(t) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, Hc);
    const SG = 27, C = 38, N = trail.length, cx = new Float32Array(N * 2), cy = new Float32Array(N * 2), am = new Float32Array(N * 2);
    for (let k = 0; k < N; k++) { const p = trail[k], a = t - p.t, A = 5.2 * Math.exp(-a * .8) * Math.min(1, a * 5); for (let sg = 0; sg < 2; sg++) { const d = (sg ? 1 : -1) * (10 + a * C); cx[k * 2 + sg] = p.x + p.nx * d; cy[k * 2 + sg] = p.y + p.ny * d; am[k * 2 + sg] = A } }
    ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.globalAlpha = .62;
    for (let y = 18; y < Hc; y += 36) {
      ctx.beginPath();
      for (let x = -4; x <= W + 8; x += 7) { let dy = 0; for (let k = 0; k < N * 2; k++) { const v = y - cy[k]; if (v > 80 || v < -80) continue; const u = x - cx[k]; if (u > 80 || u < -80) continue; const q = (u * u + v * v) / (SG * SG); dy -= am[k] * (1 - q) * Math.exp(-q / 2) } x < 0 ? ctx.moveTo(x, y + dy) : ctx.lineTo(x, y + dy) }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    if (hist.length > 2) { ctx.strokeStyle = '#FCFAF5'; ctx.lineWidth = 2.4; for (let i = 1; i < hist.length; i++) { const u = i / hist.length; ctx.globalAlpha = u * u * .9; ctx.beginPath(); ctx.moveTo(hist[i - 1][0], hist[i - 1][1]); ctx.lineTo(hist[i][0], hist[i][1]); ctx.stroke() } }
    ctx.fillStyle = '#FCFAF5'; bits.forEach(q => { const u = q.t / q.life; ctx.globalAlpha = 1 - u * u; ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, 6.3); ctx.fill() });
    ctx.globalAlpha = 1;
    if (bx != null) { poly(BP2, bx, by, ang); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = '#000'; ctx.fill(); ctx.globalCompositeOperation = 'source-over'; poly(BP, bx, by, ang); ctx.fillStyle = '#FCFAF5'; ctx.fill(); if (paper) { ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke() } }
  }
  const loop = now => {
    requestAnimationFrame(loop); if (!on || !W) return;
    const t = now / 1000, live = ptr && now - ptrT < 3500, dt = Math.min(.05, t - lastT || .016); lastT = t;
    if (bx == null) { bx = ex = W * .6; by = ey = Hc * .5 }
    let turn = 0, sp = 0;
    if (live) {                                           // follows the cursor
      const ox = bx, oy = by; bx += (ptr[0] - bx) * .032; by += (ptr[1] - by) * .032; const vx = bx - ox, vy = by - oy; sp = Math.hypot(vx, vy);
      if (sp > .25) { let d = Math.atan2(vy, vx) - ang; d = Math.atan2(Math.sin(d), Math.cos(d)); ang += d * .07; if (Math.abs(d) > .3 && sp > .7) turn = d }
    } else {                                              // surfs by itself: long carving arcs that snap into cutbacks, one after another
      const T = 3.3 + .7 * Math.sin(t * .13); ph += dt * 6.2832 / T;
      const sn = Math.sin(ph), carve = Math.tanh(2.6 * sn), snap = Math.pow(Math.abs(sn), 6) * Math.sign(sn);   // carve = the arc, snap = the hard part of the turn at its peak
      let om = 1.25 * carve + 2.3 * snap;
      const dx = W * .56 - bx, dy = Hc * .5 - by, far = Math.max(0, Math.hypot(dx / (W * .33), dy / (Hc * .36)) - 1);
      if (far > 0) { let e = Math.atan2(dy, dx) - ang; e = Math.atan2(Math.sin(e), Math.cos(e)); om += Math.min(3.5, far * 5) * e }   // near an edge it leans back toward open water
      ang += om * dt; const v = (W < 500 ? 105 : 165) * (1 - .34 * Math.abs(snap)) * (1 + .12 * Math.cos(ph * 2));              // slows into the snap, drives out of it
      bx += Math.cos(ang) * v * dt; by += Math.sin(ang) * v * dt; sp = v * dt; if (Math.abs(om) > 2.1) turn = om;
    }
    if (turn && bits.length < 70) { const sd = -Math.sign(turn), c = Math.cos(ang), n = Math.sin(ang), v0 = 40 + sp * 26; for (let i = 0; i < 2; i++) { const r = Math.random(); bits.push({ x: bx - c * 28, y: by - n * 28, vx: (-n * sd * (.5 + r) - c * .4) * v0, vy: (c * sd * (.5 + r) - n * .4) * v0, r: .9 + r * 1.4, t: 0, life: .5 + r * .5 }) } }
    bits = bits.filter(q => { q.t += dt; const kk = Math.pow(.05, dt); q.vx *= kk; q.vy *= kk; q.x += q.vx * dt; q.y += q.vy * dt; return q.t < q.life });
    hist.push([bx - Math.cos(ang) * 30, by - Math.sin(ang) * 30]); if (hist.length > 64) hist.shift();
    if (Math.hypot(bx - ex, by - ey) > 13) { ex = bx; ey = by; trail.push({ x: bx - Math.cos(ang) * 26, y: by - Math.sin(ang) * 26, nx: -Math.sin(ang), ny: Math.cos(ang), t }) }
    while (trail.length && t - trail[0].t > 4.6) trail.shift();
    draw(t);
  };
  WAKE = { size }; size();
  if (!RM) requestAnimationFrame(loop); else { bx = W * .7; by = Hc * .45; draw(0) }
}

/* ---------- the close: the line turns into the horizon and the light comes up as the sun ---------- */
function horizon() {
  const sec = $('#start'), svg = $('#hz'); if (!svg) return;
  const W = sec.clientWidth, ph = phone(), gx = px('--gx'), hy = ph ? 120 : 170, r = ph ? 10 : 16, R = ph ? 34 : 50, sx = W * (ph ? .7 : .74), k = R / 50;
  svg.setAttribute('viewBox', `0 0 ${W} ${hy + 80}`); svg.style.height = hy + 80 + 'px';
  HZ = { hy, r }; sec.style.setProperty('--sr', R + 10 + 'px'); $('.inner', sec).style.paddingTop = hy + (ph ? 84 : 120) + 'px';
  const bird = (x, y, s) => `<g class="bird" style="--bd:${(x % 7 / 10).toFixed(1)}s"><path class="s ln" pathLength="1" style="--d:1.9s;--t:.8s" d="M${x - 46 * s} ${y - 2 * s}Q${x - 23 * s} ${y - 20 * s} ${x} ${y}Q${x + 23 * s} ${y - 20 * s} ${x + 46 * s} ${y - 2 * s}"/></g>`;
  svg.innerHTML = `<defs><clipPath id="hzc"><rect x="0" y="-200" width="${W}" height="${hy + 200}"/></clipPath></defs>
  <g clip-path="url(#hzc)"><circle class="sun" cx="${sx}" cy="${hy}" r="${R}"/></g>
  <path class="s ln" pathLength="1" style="--t:1.5s" d="M${gx} ${hy - r}A${r} ${r} 0 0 0 ${gx + r} ${hy}H${W + 6}"/>
  ${[[16, 34, 1], [32, 20, .62], [48, 9, .36]].map(([dy, hw, o], i) => `<path class="s ln refl" pathLength="1" style="--d:${1.5 + i * .16}s;--t:.6s;--ro:${o};--rd:${i * .45}s" d="M${sx - hw * k} ${hy + dy * k}H${sx + hw * k}"/>`).join('')}
  ${bird(sx - 3.4 * R, hy - 1.35 * R, .62 * k)}${bird(sx - 5 * R, hy - 2.15 * R, .42 * k)}`;
  const halo = $('.halo', sec); halo.style.left = sx + 'px'; halo.style.top = hy + 'px';
}

/* ---------- the way: one line winds down the page; the white board rides it as you scroll (style frames R1-R3) ---------- */
let WAY = null, HZ = null, END = null, cur = 0, tgt = 0, wraf = 0, PARTS = [], sraf = 0, pAng = null, pL = 0, sT = 0;
function way() {
  const page = $('.page'), secs = $$('.page [data-g]'); if (!secs.length) return;
  let svg = $('#way'); if (!svg) { svg = el('svg', { id: 'way', class: 'art', 'aria-hidden': 'true' }); page.appendChild(svg) }
  const W = page.clientWidth, Hp = page.offsetHeight, gx = px('--gx'), xr = W - (phone() ? 9 : 26), X = s => s.dataset.side === 'r' ? xr : gx;
  svg.setAttribute('width', W); svg.setAttribute('height', Hp); svg.setAttribute('viewBox', `0 0 ${W} ${Hp}`);
  let x = X(secs[0]), d = `M${x} ${secs[0].offsetTop + (parseFloat(secs[0].style.getPropertyValue('--tt')) || 0)}`; const hs = [];
  for (let i = 1; i < secs.length; i++) {
    const a = secs[i - 1], b = secs[i], nx = X(b); if (nx === x) continue;
    const sa = $('.sec', a) || a; sa.style.paddingBottom = (phone() ? 150 : 270) + 'px'; b.classList.add('xin');
    const pb = parseFloat(getComputedStyle(sa).paddingBottom) || 0, pt = parseFloat(getComputedStyle($('.sec', b) || b).paddingTop) || 0;
    let y1 = b.offsetTop + (b.id === 'start' || b.classList.contains('endcap') ? 30 : Math.min(Math.max(pt - 26, 14), 60)), y0 = a.offsetTop + a.offsetHeight - pb + 34;
    const k = (y1 - y0) * .9; d += `L${x} ${y0}C${x} ${y0 + k} ${nx} ${y1 - k} ${nx} ${y1}`; hs.push([x, y0, x, y0 + k], [nx, y1, nx, y1 - k]); x = nx;
  }
  const last = secs[secs.length - 1]; let yEnd, tail = '';
  if (HZ) { yEnd = last.offsetTop + HZ.hy - HZ.r; tail = `A${HZ.r} ${HZ.r} 0 0 0 ${x + HZ.r} ${yEnd + HZ.r}H${x + HZ.r + (phone() ? 96 : 190)}` }
  else yEnd = END != null ? last.offsetTop + END : last.offsetTop + last.offsetHeight;
  const main = d + `L${x} ${yEnd}`, full = main + tail;
  const marks = hs.map(h => `<path class="hb" d="M${h[0]} ${h[1]}L${h[2]} ${h[3]}"/><circle class="hk" cx="${h[2]}" cy="${h[3]}" r="3"/><path class="f" d="M${h[0]} ${h[1] - 6}l6 6-6 6-6-6z"/>`).join('');
  svg.innerHTML = '<defs>' + ['black', 'night', 'sea', 'terra', 'tan', 'paper'].map(g => `<clipPath id="wc-${g}">${secs.filter(s => s.dataset.ground === g).map(s => `<rect x="-40" y="${s.offsetTop}" width="${W + 80}" height="${s.offsetHeight}"/>`).join('')}</clipPath>`).join('') + '</defs>'
    + ['black', 'night', 'sea', 'terra', 'tan', 'paper'].map(g => `<g data-ground="${g}" clip-path="url(#wc-${g})"><path class="dots" d="${full}"/>${marks}<path class="s sol" d="${full}"/></g>`).join('');
  const m = el('path', { d: main }), f = $('.sol', svg), lenMain = m.getTotalLength(), len = f.getTotalLength(), step = 3, ys = [];
  for (let l = 0; l <= lenMain; l += step) ys.push(f.getPointAtLength(l).y);
  let rider = $('#rider'), spr = $('#spray');
  if (!rider) { rider = document.createElement('div'); rider.id = 'rider'; rider.dataset.ground = 'black'; rider.innerHTML = `<svg class="art" width="52" height="16" viewBox="-26 -8 52 16" aria-hidden="true"><path class="f bd" d="${D(boardPts(46))}Z"/></svg>`; page.appendChild(rider) }
  if (!spr) { spr = el('svg', { id: 'spray', class: 'art', width: 1, height: 1, 'aria-hidden': 'true' }); spr.dataset.ground = 'black'; page.appendChild(spr) }
  spr.innerHTML = '';
  WAY = { secs, f, sols: $$('.sol', svg), rider, spray: spr, lenMain, len, step, ys, y0: ys[0], yEnd }; PARTS = [];
  $$('.sol', svg).forEach(p => p.style.background = 'none'); $$('#way g').forEach(g => g.style.background = 'none');
}
function tick() {
  if (!WAY) return;
  const max = document.documentElement.scrollHeight - innerHeight, p = max > 0 ? clamp(scrollY / max) : 0, y = scrollY + innerHeight * (.36 + .46 * p), w = WAY;
  if (y <= w.y0) tgt = 0;
  else if (y >= w.yEnd) tgt = Math.min(w.len, w.lenMain + (y - w.yEnd) * 1.4);
  else { let a = 0, b = w.ys.length - 1; while (b - a > 1) { const c = (a + b) >> 1; w.ys[c] < y ? a = c : b = c } const r = (y - w.ys[a]) / Math.max(.001, w.ys[b] - w.ys[a]); tgt = (a + clamp(r)) * w.step }
  // phones: the board tracks the scroll directly (the eased glide read as lag on touch scrolling)
  if (RM || COARSE) { cur = tgt; if (!wraf) wraf = requestAnimationFrame(() => { wraf = 0; paint() }) } else if (!wraf) wraf = requestAnimationFrame(glide);
}
function glide() { wraf = 0; cur += (tgt - cur) * .13; if (Math.abs(tgt - cur) < .4) cur = tgt; paint(); if (cur !== tgt) wraf = requestAnimationFrame(glide) }
function spray(now) {
  const dt = Math.min(.05, (now - sT) / 1000); sT = now;
  PARTS = PARTS.filter(p => { p.t += dt; if (p.t >= p.life || !p.c.isConnected) { if (p.c.parentNode) p.c.parentNode.removeChild(p.c); return false } const k = Math.pow(.04, dt); p.vx *= k; p.vy = p.vy * k + 90 * dt; p.x += p.vx * dt; p.y += p.vy * dt; const u = p.t / p.life; p.c.setAttribute('cx', p.x.toFixed(1)); p.c.setAttribute('cy', p.y.toFixed(1)); p.c.style.opacity = (1 - u * u).toFixed(2); return true });
  sraf = PARTS.length ? requestAnimationFrame(spray) : 0;
}
function paint() {
  const w = WAY, L = clamp(cur, 0, w.len), a = w.f.getPointAtLength(Math.max(0, L - 2)), b = w.f.getPointAtLength(Math.min(w.len, L + 2)), pt = w.f.getPointAtLength(L);
  const drawn = Math.max(0, L - 30);
  const ink = () => w.sols.forEach(p => { if (drawn <= 0) { p.style.visibility = 'hidden' } else { p.style.visibility = ''; p.style.strokeDasharray = drawn + ' ' + (w.len + 60) } });
  if (COARSE) { clearTimeout(w.inkT); w.inkT = setTimeout(ink, 140) } else ink();
  w.rider.style.transform = `translate3d(${pt.x.toFixed(1)}px,${pt.y.toFixed(1)}px,0) rotate(${(Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI).toFixed(1)}deg)`;
  let g = 'black'; w.secs.forEach(s => { if (pt.y >= s.offsetTop) g = s.dataset.ground }); w.rider.dataset.ground = g; w.spray.dataset.ground = g;
  // spray: when the board turns hard, dots fly off the tail on the outside of the turn
  const hd = Math.atan2(b.y - a.y, b.x - a.x), dL = L - pL; let dA = pAng == null ? 0 : hd - pAng; dA = Math.atan2(Math.sin(dA), Math.cos(dA)); pAng = hd; pL = L;
  if (!RM && Math.abs(dA) > .028 && Math.abs(dL) > 2.5 && L < w.lenMain - 4) {
    const dir = Math.sign(dL), fx = Math.cos(hd) * dir, fy = Math.sin(hd) * dir, sd = -Math.sign(dA) * dir, ox = -fy * sd, oy = fx * sd, n = Math.min(4, Math.ceil(Math.abs(dA) * 22)), sp = Math.min(190, 50 + Math.abs(dL) * 7);
    for (let i = 0; i < n && PARTS.length < 70; i++) { const q = Math.random(), r = Math.random(), c = el('circle', { r: (.9 + r * 1.5).toFixed(2) }, w.spray); PARTS.push({ c, x: pt.x - fx * (14 + q * 10) + ox * 3, y: pt.y - fy * (14 + q * 10) + oy * 3, vx: ox * sp * (.45 + r * .8) - fx * sp * (.1 + q * .35), vy: oy * sp * (.45 + r * .8) - fy * sp * (.1 + q * .35), t: 0, life: .45 + q * .55 }) }
    if (!sraf) { sT = performance.now(); sraf = requestAnimationFrame(spray) }
  }
  const hz = $('#start'); if (hz && L >= w.lenMain - 2) hz.classList.add('risen');
}

/* ---------- specialty page ---------- */
function specialty() {
  const root = $('#spec'); if (!root) return;
  const key = DOORS[location.hash.slice(1)] ? location.hash.slice(1) : 'commercials', d = DOORS[key];
  document.title = d[0] + ' · Amigo Animation B';
  root.innerHTML = `
  <header data-g="black" data-g2="black"><div class="bar inner"><a class="name" href="index.html">Amigo Animation</a><nav><a href="index.html#work">Work</a><a href="index.html#doors">What we make</a><a href="index.html#about">Team</a><a class="go" href="index.html#start">Start a project</a></nav></div>
    <div class="inner"><div class="col shero in"><div><h1>${d[0]}</h1><p>[One line]</p></div><div class="big">${icon(key, Math.round(Math.min(260, innerWidth * .52)))}</div></div></div></header>
  <section data-g="black" data-g2="tan"><div class="inner sec"><div class="col"><h2 class="hd">What you get</h2><div class="c3">${[0, 1, 2].map(() => '<div>[Deliverable]<p>[One line]</p></div>').join('')}</div></div></div></section>
  <section data-g="night" data-side="r" id="work"><div class="inner sec"><div class="col"><h2 class="hd">Work<small>Placeholders until the pieces are picked</small></h2><div class="work">${SPEC_WORK[key].map((k, i) => piece(k, i < 2 ? 'w6' : 'w4')).join('')}</div></div></div></section>
  <section data-g="terra" data-g2="night" data-side="r"><div class="inner sec"><div class="col"><h2 class="hd">How it goes</h2><div class="steps" data-in><svg class="art tl" aria-hidden="true"></svg>${['Concept', 'Storyboard and style frames', 'Animation and delivery'].map(s => `<div>${s}<p>[One line]</p></div>`).join('')}</div></div></div></section>
  <section data-g="tan" data-g2="black"><div class="inner sec"><div class="col"><h2 class="hd">Other specialties</h2><div class="doors">${Object.keys(DOORS).filter(k => k !== key).map(k => door(k, 'specialty.html#' + k)).join('')}</div></div></div></section>
  <section data-g="paper" data-g2="black" class="endcap"><div class="inner sec"><div class="col cta"><h2 class="hd">Have one of these in mind?</h2><a class="btn" href="index.html#start">Start a project ${ARROW}</a><footer style="align-self:stretch"><span>Amigo Productions, Oceanside CA</span><span>[Links and social]</span></footer></div></div></section>`;
  $('header', root).style.setProperty('--tt', '92px');
  scrollTo(0, 0);
}

/* ---------- grounds (review switch) ---------- */
function ground(m) {
  $$('.page [data-g]').forEach(s => s.dataset.ground = m === 'journey' ? s.dataset.g : m === 'dusk' ? (s.dataset.g2 || s.dataset.g) : m);
  $$('.grounds button[data-m]').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === m)); document.body.dataset.mode = m;
  document.body.style.background = getComputedStyle($('.page [data-g]')).backgroundColor;
  try { localStorage.setItem('amigo-b-ground2', m) } catch (e) { }
  if (WAKE) WAKE.size();
  if (WAY) { way(); tick() }
}

/* ---------- wiring ---------- */
function glows() {
  if (RM) return; let sec = null, tx = 0, ty = 0, raf = 0;
  const run = () => { raf = 0; if (!sec) return; const c = sec._g || (sec._g = [tx, ty]); c[0] += (tx - c[0]) * .08; c[1] += (ty - c[1]) * .08; sec.style.setProperty('--bx', c[0].toFixed(1) + '%'); sec.style.setProperty('--by', c[1].toFixed(1) + '%'); if (Math.abs(tx - c[0]) + Math.abs(ty - c[1]) > .15) raf = requestAnimationFrame(run) };
  addEventListener('pointermove', e => { const s = e.target.closest && e.target.closest('.page [data-g]'); if (!s) return; const r = s.getBoundingClientRect(); sec = s; tx = (e.clientX - r.left) / r.width * 100; ty = (e.clientY - r.top) / r.height * 100; if (!raf) raf = requestAnimationFrame(run) }, { passive: true });
}
function wire() {
  const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('[data-in]').forEach(e => { if (!e._o) { e._o = 1; obs.observe(e) } });
  $$('.piece[data-clip]').forEach(a => {
    if (a._w) return; a._w = 1; const v = $('video', a);
    const go = on => { if (on) { if (!v.src) v.src = `assets/clips/${a.dataset.clip}.mp4`; v.play().then(() => a.classList.add('playing')).catch(() => { }) } else { v.pause(); a.classList.remove('playing') } };
    a.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') go(true) }); a.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') go(false) });
    a.addEventListener('click', e => { e.preventDefault(); if (!matchMedia('(hover:hover)').matches) go(!a.classList.contains('playing')) });
  });
  $$('.piece:not([data-clip])').forEach(a => a.addEventListener('click', e => e.preventDefault()));
}
function endcap() { const cap = $('.endcap'); if (!cap) return; const h = $('.hd', cap), r = parseFloat(h.style.getPropertyValue('--br')) || 14; END = h.offsetTop + .6 * parseFloat(getComputedStyle(h).fontSize) - r }
function layout(play) { branches(); hero(play); horizon(); endcap(); fit(); way(); tick() }
function init() {
  const cl = $('#clients'); if (cl && window.AM_LOGOS) cl.innerHTML = CLIENTS.map(k => { const l = AM_LOGOS[k]; if (!l) return ''; const w = Math.round((phone() ? 40 : 50) * Math.pow(l.w / l.h, .62)); return `<span title="${l.name}"><svg role="img" aria-label="${l.name}" width="${w}" height="${Math.round(w * l.h / l.w)}" viewBox="0 0 ${l.w} ${l.h}"><path transform="${l.t}" d="${l.d}"/></svg></span>` }).join('');
  $$('[data-work]').forEach(w => w.innerHTML = w.dataset.work.split(',').map(s => { const [k, c] = s.split(':'); return piece(k, c) }).join(''));
  $$('[data-doors]').forEach(w => w.innerHTML = w.dataset.doors.split(',').map(k => door(k, 'specialty.html#' + k)).join(''));
  specialty();
  $$('.bar .name').forEach(a => { a.innerHTML = logoSvg(phone() ? 40 : 46) + '<span class="sr">Amigo Animation, home</span>'; a.setAttribute('aria-label', 'Amigo Animation, home') });
  let m = 'dusk'; try { m = localStorage.getItem('amigo-b-ground2') || m } catch (e) { }
  $$('.grounds button[data-m]').forEach(b => b.addEventListener('click', () => ground(b.dataset.m)));
  try { TOP = localStorage.getItem('amigo-b-top') || TOP } catch (e) { } if (!['curve', 'wave', 'sun'].includes(TOP)) TOP = 'curve';
  const setTop = (v, go) => { TOP = v; $$('.grounds button[data-v]').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === v)); try { localStorage.setItem('amigo-b-top', v) } catch (e) { } if (go) { scrollTo(0, 0); hero(true); way(); tick() } };
  $$('.grounds button[data-v]').forEach(b => b.addEventListener('click', () => setTop(b.dataset.v, true))); setTop(TOP, false);
  try { WORD = localStorage.getItem('amigo-b-word') || WORD } catch (e) { } WORD = 'line'; // Austin picked Line 11-25; script code kept for reference
  const setWord = (v, go) => { WORD = v; $$('.grounds button[data-w]').forEach(b => b.setAttribute('aria-pressed', b.dataset.w === v)); try { localStorage.setItem('amigo-b-word', v) } catch (e) { } if (go) { const run = () => { scrollTo(0, 0); hero(true); way(); tick() }; v !== 'line' && document.fonts && document.fonts.load ? document.fonts.load(`100px "${FONTS[v]}"`, 'Motion').then(run, run) : run() } };
  $$('.grounds button[data-w]').forEach(b => b.addEventListener('click', () => setWord(b.dataset.w, true))); setWord(WORD, false);
  const ob = $('.optbtn'); if (ob) ob.addEventListener('click', () => { const on = document.body.classList.toggle('opts'); ob.setAttribute('aria-expanded', on); ob.textContent = on ? 'Close' : 'Options' });
  let PH0 = 'studio'; try { PH0 = localStorage.getItem('amigo-b-photo') || PH0 } catch (e) { }
  const setPhoto = v => { const w = $('.wall'); if (w) { w.dataset.p = v; w.style.backgroundImage = v === 'off' ? 'none' : `url(assets/${v}.jpg)` } $$('.grounds button[data-p]').forEach(b => b.setAttribute('aria-pressed', b.dataset.p === v)); try { localStorage.setItem('amigo-b-photo', v) } catch (e) { } };
  $$('.grounds button[data-p]').forEach(b => b.addEventListener('click', () => setPhoto(b.dataset.p))); setPhoto(PH0);
  ground(m); wake(); layout(true); wire(); live(); glows();
  const reel = $('.reel'); if (reel) {
    const v = $('video', reel); v.muted = true;
    new IntersectionObserver(es => { if (es[0].isIntersecting) v.play().catch(() => { }); else if (v.muted) v.pause() }, { threshold: .2 }).observe(reel);
    const go = () => { if (reel.classList.contains('on')) return; reel.classList.add('on'); v.muted = false; v.currentTime = 0; v.controls = true; v.play().catch(() => { v.muted = true; v.play().catch(() => { }) }) };
    reel.addEventListener('click', go); reel.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go() } });
  }
  const rp = $('.replay'); if (rp) rp.addEventListener('click', () => hero(true));
  const fm = $('#fm'); if (fm) fm.addEventListener('submit', e => { e.preventDefault(); fm.hidden = true; $('#thanks').hidden = false });
  let rt, lw = innerWidth, lh = innerHeight; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (innerWidth !== lw || (innerWidth >= 700 && Math.abs(innerHeight - lh) > 60)) { lw = innerWidth; lh = innerHeight; layout(false) } else { way(); tick() } }, 160) });
  let q = false; addEventListener('scroll', () => { if (!q) { q = true; requestAnimationFrame(() => { q = false; tick() }) } }, { passive: true });
  addEventListener('load', () => { fit(); way(); tick() });
  addEventListener('hashchange', () => { if ($('#spec')) { specialty(); ground(document.querySelector('.grounds button[data-m][aria-pressed="true"]').dataset.m); layout(false); wire() } });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (WORD !== 'line') { const go = () => layout(false); document.fonts.load(`100px "${FONTS[WORD]}"`, 'Motion').then(go, go) } else { fit(); way(); tick() } });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
