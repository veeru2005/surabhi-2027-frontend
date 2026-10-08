import PageBanner from '../components/PageBanner';
import Reveal from '../components/Reveal';
import DayTabs from '../components/DayTabs';

export default function Schedule() {
  return (
    <>
      <PageBanner eyebrow="Schedule" title="Two days, one celebration" subtitle="Friday 12 & Saturday 13 March 2027" />
      <section className="section section--ivory">
        <Reveal className="container narrow-box">
          <DayTabs />
          <p className="note">Detailed timings will be announced closer to the fest.</p>
        </Reveal>
      </section>
    </>
  );
}
