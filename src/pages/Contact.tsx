import { useState, type FormEvent } from 'react';
import { CONTACT, INSTAGRAM_URL } from '../data/content';
import PageBanner from '../components/PageBanner';
import Reveal from '../components/Reveal';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: connect to your backend / form service (e.g. Formspree, Google Forms)
    setSent(true);
  };

  return (
    <>
      <PageBanner eyebrow="Contact" title="Contact Surabhi" subtitle="Festival headquarters & helpdesk" />
      <section className="section section--ivory">
        <div className="container split split--top">
          <Reveal dir="left" className="contact__info">
            <h3>Campus</h3>
            <p>
              {CONTACT.addressLines.map((l) => (
                <span key={l}>
                  {l}
                  <br />
                </span>
              ))}
            </p>
            <h3>Email</h3>
            <p>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <h3>Phone</h3>
            <p>
              {CONTACT.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, '')}`}>
                  {p}
                  <br />
                </a>
              ))}
            </p>
            <h3>Social</h3>
            <p>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                Instagram @klsurabhi
              </a>
            </p>
          </Reveal>
          <Reveal dir="right">
            <form className="form" onSubmit={onSubmit}>
              <label>
                Full name *
                <input required name="name" />
              </label>
              <label>
                Email *
                <input required type="email" name="email" />
              </label>
              <label>
                Phone
                <input type="tel" name="phone" />
              </label>
              <label>
                Category *
                <select required name="category" defaultValue="">
                  <option value="" disabled>
                    Select category
                  </option>
                  <option>Event registration &amp; teams</option>
                  <option>Accommodation</option>
                  <option>Sponsorships</option>
                  <option>General inquiry</option>
                </select>
              </label>
              <label>
                Message *
                <textarea required name="message" rows={5} />
              </label>
              <button className="btn btn--marigold" type="submit">
                {sent ? 'Thank you! ✓' : 'Send message'}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
