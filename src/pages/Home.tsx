import { Link } from 'react-router-dom';
import { REGISTER_URL, STATS, WHY_ATTEND } from '../data/content';
import Countdown from '../components/Countdown';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';
import Petals from '../components/Petals';
import Rasas from '../components/Rasas';
import EventGrid from '../components/EventGrid';
import DayTabs from '../components/DayTabs';
import Ornament from '../components/Ornament';
import FilmStrip from '../components/FilmStrip';
import Mosaic from '../components/Mosaic';
import { useFitText } from '../hooks/useFitText';
import { useParallax } from '../hooks/useParallax';

export default function Home() {
  const mandala = useParallax<HTMLDivElement>(0.25);
  const { titleRef, subRef } = useFitText();

  return (
    <>
      {/* 1. HERO — festival doorway: garland, arched window with the emblem */}
      <section className="hero">
        <div className="hero__mandala" ref={mandala} aria-hidden="true" />
        <Petals />
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="hero__kicker anim-rise">KL University · Student Activity Centre</p>
            <div className="hero__lockup">
              <h1 className="hero__title anim-rise anim-d1">
                <span className="hero__title-main" ref={titleRef}>
                  Surabhi
                </span>
              </h1>
              <p className="hero__sub anim-rise anim-d2" ref={subRef}>
                International Cultural Fest <span className="hero__yr">2027</span>
              </p>
            </div>
            <p className="hero__date anim-rise anim-d2">
              <span>12 – 13 March 2027</span>
              <span className="dot">✦</span>
              <span>Vaddeswaram, Andhra Pradesh</span>
            </p>
            <div className="anim-rise anim-d3">
              <Countdown />
            </div>
            <div className="btn-row anim-rise anim-d4">
              <a className="btn btn--marigold" href={REGISTER_URL} target="_blank" rel="noreferrer">
                Register now
              </a>
              <Link className="btn btn--line" to="/events">
                See the programme
              </Link>
            </div>
          </div>

          <div className="hero__window anim-window">
            <img className="hero__mandala-full" src="/surabhi-mandala.png" alt="" aria-hidden="true" />
            <div className="jharokha">
              <div className="jharokha__halo" aria-hidden="true" />
              <img src="/surabhi-logo-2027.jpg" alt="Surabhi 2027 – International Cultural Fest logo" />
            </div>
          </div>
        </div>
        <div className="scallop scallop--ivory" aria-hidden="true" />
      </section>

      {/* 2. KL SAC creative clubs — ivory section */}
      <section className="section section--ivory">
        <div className="container">
          <Reveal className="heading heading--center">
            <p className="eyebrow">KL SAC · ten creative clubs</p>
            <h2 className="section-title">Every art finds its stage</h2>
            <Ornament />
          </Reveal>
          <Reveal dir="zoom">
            <Rasas />
          </Reveal>
        </div>
      </section>

      {/* 3. STORY + STATS — ivory */}
      <section className="section section--ivory section--tight">
        <div className="container story">
          <Reveal dir="left" className="story__quote">
            <span className="story__mark" aria-hidden="true">
              ❝
            </span>
            <p>
              Planned, organised and run entirely by students, Surabhi turns the KL University campus into a two-day
              celebration of India’s art, music and theatre, and the world’s.
            </p>
            <Link to="/about" className="text-link">
              Read our story →
            </Link>
          </Reveal>
          <Reveal dir="right" className="stamps">
            {STATS.map((s) => (
              <div className="stamp stagger" key={s.label}>
                <span className="stamp__value">
                  <CountUp value={s.value} />
                </span>
                <span className="stamp__label">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 4. PROGRAMME — emerald */}
      <section className="section section--emerald section--scallop-top">
        <div className="container">
          <Reveal className="heading heading--split">
            <div>
              <p className="eyebrow">The programme</p>
              <h2 className="section-title">Pick your stage</h2>
            </div>
            <p className="lead">Nine competitions across performing, creative and competitive arts, with cash prizes for the top three in each.</p>
          </Reveal>
          <Reveal>
            <EventGrid />
          </Reveal>
        </div>
      </section>

      {/* 4b. GALLERY — last year in frames */}
      <section className="section section--emerald section--gallery">
        <div className="container">
          <Reveal className="heading heading--split">
            <div>
              <p className="eyebrow">Surabhi 2026</p>
              <h2 className="section-title">Last year, in frames</h2>
            </div>
            <Link to="/gallery" className="btn btn--line">
              Open the gallery
            </Link>
          </Reveal>
        </div>
        <FilmStrip />
        <div className="container gallery-teaser">
          <Reveal>
            <Mosaic limit={5} />
          </Reveal>
        </div>
      </section>

      {/* 5. TWO DAYS — ivory */}
      <section className="section section--ivory section--scallop-top-ivory">
        <div className="container days-wrap">
          <Reveal dir="left">
            <p className="eyebrow">Mark your calendar</p>
            <h2 className="section-title">Two days, one celebration</h2>
            <p className="lead">From the lighting of the lamp at the inauguration to the grand finale under the stars.</p>
            <Link to="/schedule" className="text-link">
              Full schedule →
            </Link>
          </Reveal>
          <Reveal dir="right">
            <DayTabs />
          </Reveal>
        </div>
      </section>

      {/* 6. WHY COME — ivory */}
      <section className="section section--ivory section--tight">
        <div className="container">
          <Reveal className="heading heading--center">
            <p className="eyebrow">Why be there</p>
            <h2 className="section-title">More than a competition</h2>
          </Reveal>
          <Reveal className="perks">
            {WHY_ATTEND.map((w) => (
              <div className="perk stagger" key={w.title}>
                <span className="perk__icon" aria-hidden="true">
                  {w.icon}
                </span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 7. INVITATION CTA */}
      <section className="invite">
        <Reveal dir="zoom" className="container">
          <div className="invite__card">
            <p className="eyebrow">You are invited</p>
            <h2>Be part of the celebration</h2>
            <p>12 – 13 March 2027 · KL University, Vaddeswaram</p>
            <div className="btn-row btn-row--center">
              <a className="btn btn--marigold" href={REGISTER_URL} target="_blank" rel="noreferrer">
                Register now
              </a>
              <Link className="btn btn--line" to="/contact">
                Partner with us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
