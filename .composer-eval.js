(() => {
  const out = {};
  const clean = (s) => (s == null ? '' : String(s));
  // 1) 聊天根 root 及向上 12 层祖先
  const root = Array.from(document.querySelectorAll('*')).find((el) => el.classList && el.classList.contains('wSkVaW_root'));
  if (root) {
    const r = root.getBoundingClientRect();
    out.root = { tag: root.tagName, cls: clean(root.className).slice(0, 80), phase: root.getAttribute('data-phase'), rect: { top: r.top, bottom: r.bottom, height: r.height } };
    const chain = [];
    let e = root;
    for (let i = 0; i < 12 && e; i++) {
      const c = e.getBoundingClientRect();
      const cs = getComputedStyle(e);
      chain.push({ d: i, tag: e.tagName, cls: clean(e.className).slice(0, 55), top: +c.top.toFixed(1), bottom: +c.bottom.toFixed(1), h: +c.height.toFixed(1), position: cs.position, height: cs.height, boxSizing: cs.boxSizing, overflowY: cs.overflowY });
      e = e.parentElement;
    }
    out.chain = chain;
  }
  // 2) 底部带 [560,679] 内的宽元素
  out.band = Array.from(document.querySelectorAll('*'))
    .map((el) => { const c = el.getBoundingClientRect(); return { t: el.tagName, cls: clean(el.className).slice(0, 32), top: +c.top.toFixed(1), bottom: +c.bottom.toFixed(1), left: +c.left.toFixed(1), right: +c.right.toFixed(1), w: +c.width.toFixed(1), h: +c.height.toFixed(1), pos: getComputedStyle(el).position, z: getComputedStyle(el).zIndex, text: clean(el.textContent).trim().slice(0, 16) }; })
    .filter((o) => o.w > 200 && o.top >= 555 && o.top <= 679)
    .sort((a, b) => a.top - b.top)
    .slice(0, 30);
  // 3) fixed/sticky 元素
  out.docked = Array.from(document.querySelectorAll('*'))
    .filter((el) => { const p = getComputedStyle(el).position; return p === 'fixed' || p === 'sticky'; })
    .map((el) => { const c = el.getBoundingClientRect(); return { cls: clean(el.className).slice(0, 40), pos: getComputedStyle(el).position, top: +c.top.toFixed(1), bottom: +c.bottom.toFixed(1), w: +c.width.toFixed(1) }; })
    .slice(0, 30);
  out.innerHeight = window.innerHeight;
  return JSON.stringify(out, null, 1);
})()