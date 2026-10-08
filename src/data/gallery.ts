/* Gallery media is read straight from src/assets/gallery at build time.
   Drop files in that folder; nothing else to edit. */
const files = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,mp4,webm,MP4,WEBM}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export type GalleryItem = { src: string; type: 'image' | 'video'; caption: string };

const caption = (path: string) => {
  const base = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  const words = base.replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ').trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : 'Surabhi 2026';
};

export const GALLERY: GalleryItem[] = Object.keys(files)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((path) => ({
    src: files[path],
    type: /\.(mp4|webm)$/i.test(path) ? 'video' : 'image',
    caption: caption(path),
  }));

/* Shown until real photos are added, so the layout never looks empty. */
export const GALLERY_PLACEHOLDERS = [
  { icon: '🪔', caption: 'Inauguration', color: '#e98a2b' },
  { icon: '💃', caption: 'Nrithya finals', color: '#d6336c' },
  { icon: '🎶', caption: 'Raaga night', color: '#7048e8' },
  { icon: '🎮', caption: 'Kurukshetra eSports', color: '#2f9e44' },
  { icon: '👗', caption: 'Vastranaut runway', color: '#c92a2a' },
  { icon: '🎨', caption: 'Live painting', color: '#1c7ed6' },
  { icon: '📷', caption: 'Through the lens', color: '#0c8599' },
  { icon: '🎬', caption: 'Cine Carnival', color: '#a5652b' },
  { icon: '✨', caption: 'Grand finale', color: '#d9480f' },
  { icon: '🧵', caption: 'Handicrafts stall', color: '#5c940d' },
];
