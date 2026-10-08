import { useState } from 'react';
import { RASAS } from '../data/content';

/** Rounded panels, one per KL SAC creative club. Hover (desktop) or tap opens one. */
export default function Rasas() {
  // all closed until the cursor (or a tap) opens one
  const [active, setActive] = useState(-1);
  return (
    <div className="rasas" role="list" onMouseLeave={() => setActive(-1)}>
      {RASAS.map((r, i) => (
        <button
          type="button"
          role="listitem"
          key={r.name}
          className={`rasa ${active === i ? 'is-active' : ''}`}
          style={{ ['--c' as string]: r.color }}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onClick={() => setActive((a) => (a === i && !window.matchMedia('(hover: hover)').matches ? -1 : i))}
          aria-expanded={active === i}
        >
          <span className="rasa__icon" aria-hidden="true">
            {r.icon}
          </span>
          <span className="rasa__name">{r.name}</span>
          <span className="rasa__native">{r.native}</span>
          <span className="rasa__text">{r.text}</span>
        </button>
      ))}
    </div>
  );
}
