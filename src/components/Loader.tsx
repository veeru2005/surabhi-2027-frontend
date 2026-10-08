import { useEffect, useRef, useState } from 'react';
import type { IntroScene as IntroSceneType } from '../intro/IntroScene';

/* Cinematic 3D preloader ("Surabhi: The Cultural Odyssey").
   Real-time WebGL: cultural icon tiles → gold burst → the two logo
   paisleys swirl and lock → wordmark → camera pushes through.
   Falls back to a simple fade if WebGL is unavailable. */

const WORDS = ['Music', 'Dance', 'Gaming', 'Art', 'Fashion', 'Film'];
const WORD_START = 0.4;
const WORD_STEP = 0.42;

export default function Loader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let disposed = false;
    let scene: IntroSceneType | null = null;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      document.body.style.overflow = '';
      onDone();
    };
    // a tap or key press goes straight to the home page
    skipRef.current = () => {
      disposed = true;
      cancelAnimationFrame(raf);
      finish();
    };

    const run = async () => {
      let T = { exit: 3.0, end: 3.6, lock: 99, burst: 99 };
      try {
        const mod = await import('../intro/IntroScene');
        if (disposed || !canvasRef.current) return;
        scene = new mod.IntroScene(canvasRef.current);
        T = mod.T;
        // wait for the logo textures, but never longer than 2.5 s
        await Promise.race([scene.ready, new Promise((r) => setTimeout(r, 2500))]);
      } catch {
        setFallback(true);
        scene = null;
      }
      if (disposed) return;

      const onResize = () => scene?.resize();
      window.addEventListener('resize', onResize);

      // Dev helper: ?introT=4.2 freezes the intro at that second (for design review)
      const freeze = import.meta.env.DEV || new URLSearchParams(location.search).has('introT') ? Number(new URLSearchParams(location.search).get('introT') ?? NaN) : NaN;
      const start = performance.now();
      let wordIdx = -1;

      const frame = (now: number) => {
        const elapsed = Math.max(0, (now - start) / 1000);
        let t = reduced ? T.exit - 0.6 + Math.min(elapsed, 1.4) : elapsed;

        if (!Number.isNaN(freeze)) t = freeze;
        scene?.update(t);


        // cultural words during the tile constellation
        const wi = Math.floor((t - WORD_START) / WORD_STEP);
        const el = wordRef.current;
        if (el && wi !== wordIdx && wi >= 0 && wi < WORDS.length) {
          wordIdx = wi;
          el.textContent = WORDS[wi];
          el.classList.remove('is-in');
          void el.offsetWidth; // restart CSS animation
          el.classList.add('is-in');
        }
        const root = rootRef.current;
        if (root) {
          root.dataset.phase = t < 3.0 ? 'tiles' : t < T.exit ? 'emblem' : 'exit';
          const exit = Math.min(1, Math.max(0, (t - T.exit) / (T.end - T.exit)));
          root.style.setProperty('--exit', exit.toFixed(3));
        }
        if (flashRef.current) {
          const f = Math.max(Math.exp(-Math.pow((t - T.burst) / 0.14, 2)) * 0.45, Math.exp(-Math.pow((t - T.lock) / 0.18, 2)) * 0.6);
          flashRef.current.style.opacity = f.toFixed(3);
        }

        if (t >= T.end && Number.isNaN(freeze)) {
          window.removeEventListener('resize', onResize);
          finish();
          return;
        }
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };
    run();
    const onKey = () => skipRef.current();
    window.addEventListener('keydown', onKey);

    return () => {
      disposed = true;
      window.removeEventListener('keydown', onKey);
      cancelAnimationFrame(raf);
      scene?.dispose();
      document.body.style.overflow = '';
    };
  }, [onDone]);

  return (
    <div className={`intro3d ${fallback ? 'intro3d--fallback' : ''}`} ref={rootRef} data-phase="tiles" role="button" tabIndex={0} aria-label="Surabhi 2027 intro. Tap or press any key to enter" onPointerDown={() => skipRef.current()}>
      <div className="intro3d__bg" />
      <div className="intro3d__rays" />
      <canvas ref={canvasRef} className="intro3d__canvas" />
      {fallback && <img className="intro3d__fallback-logo" src="/surabhi-logo-2027.jpg" alt="" />}
      <div className="intro3d__vignette" />
      <div className="intro3d__flash" ref={flashRef} />

      <p className="intro3d__kicker">KL University presents</p>

      <div className="intro3d__word" ref={wordRef} aria-hidden="true" />

    </div>
  );
}
