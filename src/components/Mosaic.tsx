import { useCallback, useState } from 'react';
import { GALLERY, GALLERY_PLACEHOLDERS } from '../data/gallery';
import Lightbox from './Lightbox';

/* Bento mosaic: a big feature tile, a wide tile and three small ones, mirrored on the next block,
   that interlock instead of plain rows. Hover tilts a tile toward the cursor. */
const SHAPES = ['feature', 'wide', 'small', 'small', 'small', 'small', 'small', 'small', 'feature', 'wide'];

const tilt = (e: React.PointerEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -6}deg`);
  el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 6}deg`);
};
const untilt = (e: React.PointerEvent<HTMLElement>) => {
  e.currentTarget.style.setProperty('--rx', '0deg');
  e.currentTarget.style.setProperty('--ry', '0deg');
};

export default function Mosaic({ limit }: { limit?: number }) {
  const [open, setOpen] = useState(-1);
  const close = useCallback(() => setOpen(-1), []);
  const items = limit ? GALLERY.slice(0, limit) : GALLERY;

  if (!GALLERY.length) {
    const ph = limit ? GALLERY_PLACEHOLDERS.slice(0, limit) : GALLERY_PLACEHOLDERS;
    return (
      <div className="mosaic">
        {ph.map((p, i) => (
          <div key={p.caption} className={`mosaic__tile mosaic__tile--${SHAPES[i % SHAPES.length]} mosaic__tile--ph`} style={{ ['--c' as string]: p.color }} onPointerMove={tilt} onPointerLeave={untilt}>
            <span className="mosaic__ph-icon" aria-hidden="true">
              {p.icon}
            </span>
            <span className="mosaic__cap">{p.caption}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mosaic">
        {items.map((it, i) => (
          <button type="button" key={it.src} className={`mosaic__tile mosaic__tile--${SHAPES[i % SHAPES.length]}`} onClick={() => setOpen(i)} onPointerMove={tilt} onPointerLeave={untilt} aria-label={`Open ${it.caption}`}>
            {it.type === 'video' ? <video src={it.src} muted loop autoPlay playsInline preload="metadata" /> : <img src={it.src} alt={it.caption} loading="lazy" />}
            {it.type === 'video' && (
              <span className="mosaic__play" aria-hidden="true">
                ▶
              </span>
            )}
            <span className="mosaic__cap">{it.caption}</span>
          </button>
        ))}
      </div>
      {open >= 0 && <Lightbox items={items} index={open} onClose={close} onMove={setOpen} />}
    </>
  );
}
