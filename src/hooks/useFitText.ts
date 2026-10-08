import { useLayoutEffect, useRef } from 'react';

/** Stretches the subtitle's letter-spacing so it is exactly as wide as the title. */
export function useFitText() {
  const titleRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const t = titleRef.current;
    const s = subRef.current;
    if (!t || !s) return;
    const fit = () => {
      s.style.letterSpacing = '0px';
      s.style.marginRight = '0px';
      const chars = (s.textContent ?? '').trim().length;
      const free = t.getBoundingClientRect().width - s.scrollWidth;
      const ls = Math.max(0, free / Math.max(1, chars - 1));
      s.style.letterSpacing = `${ls}px`;
      s.style.marginRight = `${-ls}px`; // the last letter's trailing space
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(t);
    return () => ro.disconnect();
  }, []);

  return { titleRef, subRef };
}
