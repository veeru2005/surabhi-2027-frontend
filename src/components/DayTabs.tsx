import { useState } from 'react';
import { SCHEDULE } from '../data/content';

/** Two-day schedule as tabs, items laid along a dotted lamp path. */
export default function DayTabs() {
  const [d, setD] = useState(0);
  const day = SCHEDULE[d];
  return (
    <div className="days">
      <div className="days__tabs" role="tablist">
        {SCHEDULE.map((s, i) => (
          <button key={s.day} type="button" role="tab" aria-selected={d === i} className={d === i ? 'is-on' : ''} onClick={() => setD(i)}>
            <span className="days__num">{s.day}</span>
            <span className="days__date">{s.date}</span>
          </button>
        ))}
      </div>
      <ol className="days__path" key={d}>
        {day.items.map((item, i) => (
          <li key={item} style={{ animationDelay: `${i * 90}ms` }}>
            <span className="days__lamp" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}
