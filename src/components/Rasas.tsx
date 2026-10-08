import { useState } from 'react';
import { RASAS } from '../data/content';

/** Five arched panels, one per art form. Hover (desktop) or tap opens one. */
export default function Rasas() {
  const [active, setActive] = useState(0);
  return (
    <div className="rasas" role="list">
      {RASAS.map((r, i) => (
        <button
          type="button"
          role="listitem"
          key={r.name}
          className={`rasa ${active === i ? 'is-active' : ''}`}
          style={{ ['--c' as string]: r.color }}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onClick={() => setActive(i)}
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
