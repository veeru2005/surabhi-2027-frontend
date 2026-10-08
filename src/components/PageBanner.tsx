import { Link } from 'react-router-dom';

/** Inner-page banner: garland on top, arched title plate, breadcrumb. */
export default function PageBanner({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <header className="banner">
      <div className="banner__mandala" aria-hidden="true" />
      <div className="container banner__inner">
        <nav className="banner__crumbs anim-rise" aria-label="Breadcrumb">
          <Link to="/">Home</Link> <span>✦</span> {eyebrow}
        </nav>
        <h1 className="banner__title anim-rise anim-d1">{title}</h1>
        {subtitle && <p className="banner__sub anim-rise anim-d2">{subtitle}</p>}
      </div>
      <div className="scallop scallop--ivory" aria-hidden="true" />
    </header>
  );
}
