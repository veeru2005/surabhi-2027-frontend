import PageBanner from '../components/PageBanner';
import Reveal from '../components/Reveal';
import EventGrid from '../components/EventGrid';

export default function Events() {
  return (
    <>
      <PageBanner eyebrow="Events" title="Pick your stage" subtitle="Nine competitions · cash prizes for the top three in each" />
      <section className="section section--ivory">
        <Reveal className="container">
          <EventGrid />
        </Reveal>
      </section>
    </>
  );
}
