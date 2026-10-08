import { useCallback, useEffect, useRef, useState } from 'react';
import { GALLERY, GALLERY_PLACEHOLDERS } from '../data/gallery';
import Lightbox from './Lightbox';

/* 3D coverflow: one big centre frame, neighbours turned away on either side.
   Auto-advances, pauses on hover, swipe or arrow keys to move, tap the centre to open. */
export default function Coverflow() {
  const real = GALLERY.length > 0;
  const count = real ? GALLERY.length : GALLERY_PLACEHOLDERS.length;
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(-1);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const go = useCallback((n: number) => setIdx(((n % count) + count) % count), [count]);
  const close = useCallback(() => setOpen(-1), []);

  useEffect(() => {
    if (paused || open >= 0) return;
    const id = setInterval(() => go(idx + 1), 3800);
    return () => clearInterval(id);
  }, [idx, paused, open, go]);

  const offset = (i: number) => {
    let d = i - idx;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  return (
    <div
      className="coverflow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(idx + 1);
        if (e.key === 'ArrowLeft') go(idx - 1);
      }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Surabhi 2026 gallery"
    >
      <div className="coverflow__stage">
        {Array.from({ length: count }, (_, i) => {
          const d = offset(i);
          const a = Math.abs(d);
          const style = {
            ['--d' as string]: d,
            ['--a' as string]: a,
            zIndex: 20 - a,
            opacity: a > 2 ? 0 : 1,
            pointerEvents: a > 2 ? 'none' : 'auto',
          } as React.CSSProperties;
          const onClick = () => (d === 0 ? real && setOpen(i) : go(i));
          if (real) {
            const it = GALLERY[i];
            return (
              <button type="button" key={it.src} className={`coverflow__card ${d === 0 ? 'is-center' : ''}`} style={style} onClick={onClick} aria-label={it.caption}>
                {it.type === 'video' ? <video src={it.src} muted loop autoPlay playsInline preload="metadata" /> : <img src={it.src} alt={it.caption} loading="lazy" draggable={false} />}
                <span className="coverflow__cap">{it.caption}</span>
              </button>
            );
          }
          const p = GALLERY_PLACEHOLDERS[i];
          return (
            <button type="button" key={p.caption} className={`coverflow__card coverflow__card--ph ${d === 0 ? 'is-center' : ''}`} style={{ ...style, ['--c' as string]: p.color }} onClick={onClick} aria-label={p.caption}>
              <span className="coverflow__ph" aria-hidden="true">
                {p.icon}
              </span>
              <span className="coverflow__cap">{p.caption}</span>
            </button>
          );
        })}
      </div>
      <div className="coverflow__controls">
        <button type="button" className="coverflow__arrow" aria-label="Previous" onClick={() => go(idx - 1)}>
          ‹
        </button>
        <div className="coverflow__dots">
          {Array.from({ length: count }, (_, i) => (
            <button type="button" key={i} className={i === idx ? 'is-on' : ''} aria-label={`Go to ${i + 1}`} onClick={() => go(i)} />
          ))}
        </div>
        <button type="button" className="coverflow__arrow" aria-label="Next" onClick={() => go(idx + 1)}>
          ›
        </button>
      </div>
      {open >= 0 && <Lightbox items={GALLERY} index={open} onClose={close} onMove={setOpen} />}
    </div>
  );
}
