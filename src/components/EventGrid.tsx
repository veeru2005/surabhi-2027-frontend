import { useState } from 'react';
import { EVENTS, EVENT_GROUPS, REGISTER_URL } from '../data/content';

/** Filterable programme of events with arched tiles. */
export default function EventGrid({ limit }: { limit?: number }) {
  const [group, setGroup] = useState<(typeof EVENT_GROUPS)[number]>('All');
  const list = EVENTS.filter((e) => group === 'All' || e.group === group).slice(0, limit ?? EVENTS.length);
  return (
    <div className="programme">
      <div className="chips-filter" role="tablist" aria-label="Filter events">
        {EVENT_GROUPS.map((g) => (
          <button key={g} type="button" role="tab" aria-selected={group === g} className={group === g ? 'is-on' : ''} onClick={() => setGroup(g)}>
            {g}
          </button>
        ))}
      </div>
      <div className="programme__grid" key={group}>
        {list.map((e, i) => (
          <a className="ticket" href={REGISTER_URL} target="_blank" rel="noreferrer" key={e.name} style={{ animationDelay: `${i * 70}ms` }}>
            <span className="ticket__arch" aria-hidden="true">
              <span>{e.icon}</span>
            </span>
            <span className="ticket__group">{e.group}</span>
            <h3 className="ticket__name">{e.name}</h3>
            <p className="ticket__cat">{e.category}</p>
            <p className="ticket__blurb">{e.blurb}</p>
            <span className="ticket__cta">Register ↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
