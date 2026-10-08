import { Link } from 'react-router-dom';
import { CONTACT, INSTAGRAM_URL, NAV_LINKS, REGISTER_URL } from '../data/content';
import { useReveal } from '../hooks/useReveal';

export default function Footer() {
  const ref = useReveal<HTMLElement>(0.05);
  return (
    <footer className="footer reveal-footer" ref={ref}>
      <div className="scallop scallop--emerald-up" aria-hidden="true" />
      <div className="footer__rangoli" aria-hidden="true" />
      <div className="container footer__grid">
        <div className="footer__col stagger">
          <img className="footer__logo" src="/surabhi-logo-2027.jpg" alt="Surabhi 2027 logo" />
          <p className="footer__tag">Where every culture finds its stage. Two days of music, dance, art, drama and fashion at KL University.</p>
        </div>
        <div className="footer__col stagger">
          <h4>Navigate</h4>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>› {l.label}</Link>
              </li>
            ))}
            <li>
              <a href={REGISTER_URL} target="_blank" rel="noreferrer">
                › Register
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__col stagger">
          <h4>Venue</h4>
          <p>
            {CONTACT.addressLines.map((l) => (
              <span key={l}>
                {l}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div className="footer__col stagger">
          <h4>Follow</h4>
          <a className="footer__social" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path fill="currentColor" d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 2c-2.7 0-3 0-4.1.1C4.3 2.3 2.3 4.3 2.1 7.9 2 9 2 9.3 2 12s0 3 .1 4.1c.2 3.6 2.2 5.6 5.8 5.8 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c3.6-.2 5.6-2.2 5.8-5.8.1-1.1.1-1.4.1-4.1s0-3-.1-4.1c-.2-3.6-2.2-5.6-5.8-5.8C15 2 14.7 2 12 2z" />
            </svg>
            @klsurabhi
          </a>
          <p className="footer__org">Organized by {CONTACT.organizer}</p>
          <button className="footer__top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            ↑ Back to top
          </button>
        </div>
      </div>
      <p className="footer__copy">© Surabhi 2027 · International Cultural Fest · KL University</p>
    </footer>
  );
}
