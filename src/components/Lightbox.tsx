import { useEffect } from 'react';
import type { GalleryItem } from '../data/gallery';

export default function Lightbox({ items, index, onClose, onMove }: { items: GalleryItem[]; index: number; onClose: () => void; onMove: (i: number) => void }) {
  const item = items[index];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onMove((index - 1 + items.length) % items.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, items.length, onClose, onMove]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.caption} onClick={onClose}>
      <button className="lightbox__close" aria-label="Close" onClick={onClose}>
        ✕
      </button>
      <button className="lightbox__nav lightbox__nav--prev" aria-label="Previous" onClick={(e) => (e.stopPropagation(), onMove((index - 1 + items.length) % items.length))}>
        ‹
      </button>
      <figure className="lightbox__figure" key={item.src} onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? <video src={item.src} controls autoPlay playsInline /> : <img src={item.src} alt={item.caption} />}
        <figcaption>
          {item.caption}
          <span>
            {index + 1} / {items.length}
          </span>
        </figcaption>
      </figure>
      <button className="lightbox__nav lightbox__nav--next" aria-label="Next" onClick={(e) => (e.stopPropagation(), onMove((index + 1) % items.length))}>
        ›
      </button>
    </div>
  );
}
