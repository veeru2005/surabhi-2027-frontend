export default function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span className="line" />
      <svg viewBox="0 0 64 32" width="64" height="32">
        <path d="M32 4c8 0 14 6 14 12s-6 12-14 12c4-3 6-7 6-12s-2-9-6-12z" fill="currentColor" />
        <path d="M32 28c-8 0-14-6-14-12S24 4 32 4c-4 3-6 7-6 12s2 9 6 12z" fill="currentColor" opacity=".55" />
      </svg>
      <span className="line" />
    </div>
  );
}
