import { STATS, WHY_ATTEND } from '../data/content';
import PageBanner from '../components/PageBanner';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';
import Ornament from '../components/Ornament';

export default function About() {
  return (
    <>
      <PageBanner eyebrow="About" title="A legacy of artistic excellence" subtitle="The flagship cultural festival of KL University" />
      <section className="section section--ivory">
        <div className="container split">
          <Reveal dir="left">
            <div className="jharokha jharokha--sm"><img src="/surabhi-logo-2027.jpg" alt="Surabhi 2027 logo" /></div>
          </Reveal>
          <Reveal dir="right">
            <p className="lead">
              Surabhi is the flagship cultural festival of KL University, organized by the Student Activity Centre (SAC). Driven
              by a strong student-led spirit, it is planned, organized and executed by dedicated student teams — fostering
              leadership, teamwork and innovation.
            </p>
            <p className="lead">
              This commitment to excellence has earned the fest a place in the <strong>Indian Book of Records</strong>.
            </p>
            <ul className="chips">
              <li>Open to UG, PG &amp; research scholars</li>
              <li>Students from any college in India</li>
              <li>International participants welcome</li>
              <li>Virtual participation available</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory section--tight">
        <Reveal className="container stamps stamps--row">
          {STATS.map((s) => (
            <div className="stamp stagger" key={s.label}>
              <span className="stamp__value">
                <CountUp value={s.value} />
              </span>
              <span className="stamp__label">{s.label}</span>
            </div>
          ))}
        </Reveal>
        <Ornament />
      </section>

      <section className="section section--ivory section--tight">
        <div className="container">
          <Reveal className="heading heading--center">
            <p className="eyebrow">Why Surabhi</p>
            <h2 className="section-title">Why attend</h2>
          </Reveal>
          <Reveal className="perks">
            {WHY_ATTEND.map((w) => (
              <div className="perk stagger" key={w.title}>
                <span className="perk__icon" aria-hidden="true">{w.icon}</span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
