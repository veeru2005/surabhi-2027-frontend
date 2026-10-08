import { useEffect, useState } from 'react';
import { FEST_START } from '../data/content';

function diff() {
  const ms = Math.max(0, FEST_START.getTime() - Date.now());
  return {
    Days: Math.floor(ms / 86_400_000),
    Hours: Math.floor((ms / 3_600_000) % 24),
    Minutes: Math.floor((ms / 60_000) % 60),
    Seconds: Math.floor((ms / 1000) % 60),
  };
}

export default function Countdown() {
  const [t, setT] = useState(diff);
  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown" role="timer" aria-label="Countdown to Surabhi 2027">
      {Object.entries(t).map(([label, value]) => (
        <div className="countdown__box" key={label}>
          <span className="countdown__num">{String(value).padStart(2, '0')}</span>
          <span className="countdown__label">{label}</span>
        </div>
      ))}
    </div>
  );
}
