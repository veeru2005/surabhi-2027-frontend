import { GALLERY, GALLERY_PLACEHOLDERS } from '../data/gallery';

/* Two rows of tilted polaroids drifting in opposite directions. */
export default function FilmStrip() {
  const real = GALLERY.filter((g) => g.type === 'image');
  const cards = real.length
    ? real.map((g) => ({ key: g.src, node: <img src={g.src} alt="" loading="lazy" />, caption: g.caption, color: '' }))
    : GALLERY_PLACEHOLDERS.map((p) => ({ key: p.caption, node: <span className="polaroid__ph">{p.icon}</span>, caption: p.caption, color: p.color }));
  const half = Math.ceil(cards.length / 2);
  const rows = [cards.slice(0, half), cards.slice(half).length ? cards.slice(half) : cards.slice(0, half)];

  return (
    <div className="filmstrip" aria-hidden="true">
      {rows.map((row, r) => (
        <div className={`filmstrip__row ${r ? 'filmstrip__row--rev' : ''}`} key={r}>
          {[...row, ...row, ...row].map((c, i) => (
            <figure className="polaroid" key={`${c.key}-${i}`} style={{ ['--tilt' as string]: `${((i * 37) % 9) - 4}deg`, ['--c' as string]: c.color || 'transparent' }}>
              {c.node}
              <figcaption>{c.caption}</figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}
