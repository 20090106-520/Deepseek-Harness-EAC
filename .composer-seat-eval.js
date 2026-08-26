(() => {
  const clean = (s) => (s == null ? '' : String(s));
  const seat = Array.from(document.querySelectorAll('*')).find((el) => el.classList && el.classList.contains('wSkVaW_composerSeat'));
  if (!seat) return 'NO_SEAT';
  const out = { innerHeight: window.innerHeight };
  const sr = seat.getBoundingClientRect();
  out.seat = { top: +sr.top.toFixed(1), bottom: +sr.bottom.toFixed(1), h: +sr.height.toFixed(1), w: +sr.width.toFixed(1), position: getComputedStyle(seat).position, paddingBottom: getComputedStyle(seat).paddingBottom, minHeight: getComputedStyle(seat).minHeight };
  // 直接子元素
  out.children = Array.from(seat.children).map((ch) => {
    const c = ch.getBoundingClientRect();
    const cs = getComputedStyle(ch);
    return { tag: ch.tagName, cls: clean(ch.className).slice(0, 48), top: +c.top.toFixed(1), bottom: +c.bottom.toFixed(1), h: +c.height.toFixed(1), display: cs.display, minHeight: cs.minHeight, paddingBottom: cs.paddingBottom, text: clean(ch.textContent).trim().slice(0, 14) };
  });
  // 所有含 placeholder「发消息」的 textarea 的 rect 与距 seat bottom 的距离
  out.inputs = Array.from(document.querySelectorAll('textarea')).map((t) => {
    const c = t.getBoundingClientRect();
    return { ph: clean(t.getAttribute('placeholder')).slice(0, 20), bottom: +c.bottom.toFixed(1), seatBottomGap: +(sr.bottom - c.bottom).toFixed(1) };
  });
  // seat 内部可见且有高度的元素中，位于输入框下方(其 top > 输入框bottom)的清单
  const ta = Array.from(document.querySelectorAll('textarea')).find((t) => (clean(t.getAttribute('placeholder'))).includes('发消息'));
  if (ta) {
    const tBottom = ta.getBoundingClientRect().bottom;
    out.underInput = Array.from(seat.querySelectorAll('*'))
      .map((el) => { const c = el.getBoundingClientRect(); return { tag: el.tagName, cls: clean(el.className).slice(0, 40), top: +c.top.toFixed(1), bottom: +c.bottom.toFixed(1), h: +c.height.toFixed(1), text: clean(el.textContent).trim().slice(0, 12) }; })
      .filter((o) => o.h > 4 && o.top > tBottom && o.top < sr.bottom)
      .sort((a, b) => a.top - b.top)
      .slice(0, 20);
  }
  return JSON.stringify(out, null, 1);
})()