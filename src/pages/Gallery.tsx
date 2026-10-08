import PageBanner from '../components/PageBanner';
import Reveal from '../components/Reveal';
import Mosaic from '../components/Mosaic';
import Coverflow from '../components/Coverflow';
import Ornament from '../components/Ornament';

export default function Gallery() {
  return (
    <>
      <PageBanner eyebrow="Gallery" title="Surabhi in frames" subtitle="Moments from last year’s stages, streets and finales" />
      <section className="section section--emerald section--gallery section--tight">
        <Coverflow />
      </section>
      <section className="section section--ivory section--tight">
        <div className="container">
          <Reveal className="heading heading--center">
            <p className="eyebrow">Surabhi 2026</p>
            <h2 className="section-title">Every moment</h2>
            <Ornament />
          </Reveal>
          <Mosaic />
        </div>
      </section>
    </>
  );
}
