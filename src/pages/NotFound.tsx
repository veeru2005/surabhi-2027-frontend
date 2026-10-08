import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

export default function NotFound() {
  return (
    <>
      <PageBanner eyebrow="404" title="This stage is empty" subtitle="The page you’re looking for doesn’t exist." />
      <section className="section section--ivory center">
        <Link to="/" className="btn btn--marigold">
          Back to home
        </Link>
      </section>
    </>
  );
}
