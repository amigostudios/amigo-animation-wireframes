/* The four specialty icons from option B (line/line.js icon()), ported to the tile version 11-27 at Austin's request
   ("I like their animations"). Commercials = frame corners + a light, UI = a toggle, 3D = a turning wireframe cube,
   Packages = three keyframes on a line. Lines draw on when the parent gets the class "in"; loops run while it has it.
   AmIcon(key, size) returns an <svg>; AmIcons.mount(root) fills every [data-ic] inside root. */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function icon(key, S) {
    const k = S / 64, n = v => +(v * k).toFixed(2), P = s => s.replace(/-?\d+(\.\d+)?/g, m => n(+m));
    let g = '';
    if (key === 'commercials') g = `<path class="s ln b1" pathLength="1" d="${P('M8 25V16H17')}"/><path class="s ln b2" pathLength="1" style="--d:.1s" d="${P('M47 16H56V25')}"/><path class="s ln b3" pathLength="1" style="--d:.2s" d="${P('M8 39V48H17')}"/><path class="s ln b4" pathLength="1" style="--d:.3s" d="${P('M47 48H56V39')}"/><circle class="lt pop" cx="${n(39)}" cy="${n(29)}" r="${Math.max(3.4, n(3.2))}"/>`;
    else if (key === 'ui') g = `<rect class="s ln" pathLength="1" x="${n(8)}" y="${n(21)}" width="${n(48)}" height="${n(22)}" rx="${n(11)}"/><circle class="f knob" style="--kx:${n(26)}px" cx="${n(19)}" cy="${n(32)}" r="${n(5.5)}"/>`;
    else if (key === '3d') {
      const V = [-1, 1].flatMap(x => [-1, 1].flatMap(y => [-1, 1].map(z => [x, y, z]))), E = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
      const tl = -.5, h = 12.5, cube = th => { const Q = V.map(([x, y, z]) => { const X = x * Math.cos(th) + z * Math.sin(th), Z = -x * Math.sin(th) + z * Math.cos(th), Y = y * Math.cos(tl) - Z * Math.sin(tl); return [n(32 + X * h), n(33 + Y * h)] }); return E.map(([a, b]) => `M${Q[a][0]} ${Q[a][1]}L${Q[b][0]} ${Q[b][1]}`).join('') };
      const ease = u => u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2, fr = []; for (let i = 0; i <= 30; i++) { const u = i / 30, m = u < .55 ? ease(u / .55) : 1; fr.push(cube(Math.PI / 6 + m * Math.PI / 2)) }
      g = `<path class="s ln cube" pathLength="1" d="${fr[0]}">${RM ? '' : `<animate attributeName="d" dur="3.6s" repeatCount="indefinite" values="${fr.join(';')}"/>`}</path>`;
    }
    else g = `<path class="s dim ln" pathLength="1" d="${P('M5 32H59')}"/><path class="f k1" d="${P('M14 25.5L20.5 32L14 38.5L7.5 32Z')}"/><path class="f k2" d="${P('M26.5 26H37.5L26.5 38H37.5Z')}"/><path class="f k3" d="${P('M44.5 26.5H55.5V37.5H44.5Z')}"/>`;
    return `<svg class="ic" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" aria-hidden="true">${g}</svg>`;
  }
  window.AmIcon = icon;
  window.AmIcons = { mount(root = document) { root.querySelectorAll('[data-ic]').forEach(e => { e.innerHTML = icon(e.dataset.ic, +e.dataset.s || 64) }) } };
})();
