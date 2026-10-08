/* Procedural canvas textures for the 3D intro: cultural icon tiles,
   a gold mandala, and a soft particle sprite. No external images needed. */

const GOLD_STOPS: [number, string][] = [
  [0, '#fff1c7'],
  [0.45, '#e3c88a'],
  [1, '#a8823e'],
];

function goldGradient(ctx: CanvasRenderingContext2D, s: number) {
  const g = ctx.createLinearGradient(0, 0, s, s);
  GOLD_STOPS.forEach(([o, c]) => g.addColorStop(o, c));
  return g;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

type IconDraw = (ctx: CanvasRenderingContext2D) => void;

/* Each icon is drawn in a 100×100 box centred at (50,50). */
const ICONS: Record<string, IconDraw> = {
  music: (c) => {
    c.beginPath();
    c.ellipse(30, 72, 11, 8, -0.4, 0, Math.PI * 2);
    c.ellipse(66, 64, 11, 8, -0.4, 0, Math.PI * 2);
    c.fill();
    c.fillRect(38, 22, 6, 50);
    c.fillRect(74, 14, 6, 50);
    c.beginPath();
    c.moveTo(38, 22);
    c.lineTo(80, 12);
    c.lineTo(80, 24);
    c.lineTo(38, 34);
    c.closePath();
    c.fill();
  },
  mask: (c) => {
    c.beginPath();
    c.moveTo(18, 22);
    c.quadraticCurveTo(50, 12, 82, 22);
    c.quadraticCurveTo(86, 70, 50, 88);
    c.quadraticCurveTo(14, 70, 18, 22);
    c.fill();
    c.globalCompositeOperation = 'destination-out';
    c.beginPath();
    c.ellipse(36, 42, 8, 5, 0.25, 0, Math.PI * 2);
    c.ellipse(64, 42, 8, 5, -0.25, 0, Math.PI * 2);
    c.fill();
    c.lineWidth = 5;
    c.beginPath();
    c.arc(50, 56, 16, 0.15 * Math.PI, 0.85 * Math.PI);
    c.stroke();
    c.globalCompositeOperation = 'source-over';
  },
  diya: (c) => {
    c.beginPath();
    c.moveTo(14, 58);
    c.quadraticCurveTo(50, 98, 86, 58);
    c.quadraticCurveTo(50, 70, 14, 58);
    c.fill();
    c.beginPath();
    c.moveTo(50, 14);
    c.bezierCurveTo(66, 34, 62, 54, 50, 56);
    c.bezierCurveTo(38, 54, 34, 34, 50, 14);
    c.fill();
  },
  palette: (c) => {
    c.beginPath();
    c.moveTo(50, 14);
    c.bezierCurveTo(86, 14, 92, 52, 76, 62);
    c.bezierCurveTo(66, 68, 70, 86, 50, 86);
    c.bezierCurveTo(22, 86, 10, 64, 12, 46);
    c.bezierCurveTo(14, 26, 30, 14, 50, 14);
    c.fill();
    c.globalCompositeOperation = 'destination-out';
    [
      [34, 34],
      [52, 28],
      [68, 38],
      [28, 54],
      [46, 68],
    ].forEach(([x, y]) => {
      c.beginPath();
      c.arc(x, y, 6, 0, Math.PI * 2);
      c.fill();
    });
    c.globalCompositeOperation = 'source-over';
  },
  reel: (c) => {
    c.beginPath();
    c.arc(50, 50, 36, 0, Math.PI * 2);
    c.fill();
    c.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      c.beginPath();
      c.arc(50 + Math.cos(a) * 21, 50 + Math.sin(a) * 21, 8, 0, Math.PI * 2);
      c.fill();
    }
    c.beginPath();
    c.arc(50, 50, 5, 0, Math.PI * 2);
    c.fill();
    c.globalCompositeOperation = 'source-over';
  },
  mic: (c) => {
    roundRect(c, 37, 12, 26, 46, 13);
    c.fill();
    c.lineWidth = 6;
    c.beginPath();
    c.arc(50, 44, 22, 0.05 * Math.PI, 0.95 * Math.PI);
    c.stroke();
    c.fillRect(47, 66, 6, 14);
    roundRect(c, 32, 80, 36, 7, 3);
    c.fill();
  },
  drum: (c) => {
    c.beginPath();
    c.moveTo(12, 34);
    c.quadraticCurveTo(50, 20, 88, 34);
    c.lineTo(88, 66);
    c.quadraticCurveTo(50, 80, 12, 66);
    c.closePath();
    c.fill();
    c.globalCompositeOperation = 'destination-out';
    c.lineWidth = 3;
    for (let i = 0; i < 5; i++) {
      const x = 22 + i * 14;
      c.beginPath();
      c.moveTo(x, 34);
      c.lineTo(x + 7, 66);
      c.moveTo(x + 7, 34);
      c.lineTo(x, 66);
      c.stroke();
    }
    c.globalCompositeOperation = 'source-over';
  },
  gamepad: (c) => {
    // controller body with two grips
    c.beginPath();
    c.moveTo(28, 32);
    c.lineTo(72, 32);
    c.bezierCurveTo(88, 32, 94, 50, 92, 66);
    c.bezierCurveTo(90, 80, 78, 82, 70, 72);
    c.lineTo(64, 64);
    c.lineTo(36, 64);
    c.lineTo(30, 72);
    c.bezierCurveTo(22, 82, 10, 80, 8, 66);
    c.bezierCurveTo(6, 50, 12, 32, 28, 32);
    c.closePath();
    c.fill();
    c.globalCompositeOperation = 'destination-out';
    // d-pad
    c.fillRect(22, 45, 16, 5);
    c.fillRect(27.5, 39.5, 5, 16);
    // buttons
    [
      [70, 42],
      [78, 49],
      [62, 49],
      [70, 56],
    ].forEach(([x, y]) => {
      c.beginPath();
      c.arc(x, y, 3.6, 0, Math.PI * 2);
      c.fill();
    });
    c.globalCompositeOperation = 'source-over';
  },
  lotus: (c) => {
    const petal = (rot: number, len: number, w: number) => {
      c.save();
      c.translate(50, 72);
      c.rotate(rot);
      c.beginPath();
      c.moveTo(0, 0);
      c.quadraticCurveTo(w, -len * 0.55, 0, -len);
      c.quadraticCurveTo(-w, -len * 0.55, 0, 0);
      c.fill();
      c.restore();
    };
    petal(0, 56, 16);
    petal(-0.62, 48, 14);
    petal(0.62, 48, 14);
    petal(-1.2, 38, 11);
    petal(1.2, 38, 11);
    c.fillRect(20, 76, 60, 5);
  },
};

export const ICON_NAMES = ['music', 'gamepad', ...Object.keys(ICONS).filter((k) => k !== 'music' && k !== 'gamepad')];

/** Emerald tile face with a gold double border and a gold icon. */
export function makeTileCanvas(name: string, size = 512) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const c = cv.getContext('2d')!;
  const bg = c.createRadialGradient(size * 0.35, size * 0.25, size * 0.05, size / 2, size / 2, size * 0.75);
  bg.addColorStop(0, '#1f7a5a');
  bg.addColorStop(0.6, '#0d4634');
  bg.addColorStop(1, '#062419');
  c.fillStyle = bg;
  c.fillRect(0, 0, size, size);

  c.strokeStyle = goldGradient(c, size);
  c.lineWidth = size * 0.018;
  roundRect(c, size * 0.07, size * 0.07, size * 0.86, size * 0.86, size * 0.12);
  c.stroke();
  c.lineWidth = size * 0.006;
  c.setLineDash([size * 0.012, size * 0.018]);
  roundRect(c, size * 0.11, size * 0.11, size * 0.78, size * 0.78, size * 0.09);
  c.stroke();
  c.setLineDash([]);

  // icon on its own layer so destination-out cuts only the icon
  const ic = document.createElement('canvas');
  ic.width = ic.height = size;
  const x = ic.getContext('2d')!;
  x.translate(size * 0.22, size * 0.22);
  x.scale((size * 0.56) / 100, (size * 0.56) / 100);
  x.fillStyle = goldGradient(x, 100);
  x.strokeStyle = x.fillStyle;
  x.lineCap = 'round';
  ICONS[name](x);

  c.shadowColor = 'rgba(255, 214, 140, 0.85)';
  c.shadowBlur = size * 0.05;
  c.drawImage(ic, 0, 0);
  c.shadowBlur = 0;
  return cv;
}

/** Transparent gold mandala used as a halo behind the emblem. */
export function makeMandalaCanvas(size = 1024) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const c = cv.getContext('2d')!;
  c.translate(size / 2, size / 2);
  c.strokeStyle = 'rgba(227, 200, 138, 0.9)';
  c.fillStyle = 'rgba(227, 200, 138, 0.9)';
  const R = size * 0.48;

  const ring = (r: number, w: number, dash?: number[]) => {
    c.lineWidth = w;
    c.setLineDash(dash ?? []);
    c.beginPath();
    c.arc(0, 0, r, 0, Math.PI * 2);
    c.stroke();
  };
  ring(R, 2);
  ring(R * 0.96, 1, [4, 10]);
  ring(R * 0.7, 1.5);
  ring(R * 0.66, 1, [2, 6]);
  c.setLineDash([]);

  // outer petals
  for (let i = 0; i < 32; i++) {
    c.save();
    c.rotate((i / 32) * Math.PI * 2);
    c.lineWidth = 1.6;
    c.beginPath();
    c.moveTo(0, -R * 0.72);
    c.quadraticCurveTo(R * 0.07, -R * 0.83, 0, -R * 0.94);
    c.quadraticCurveTo(-R * 0.07, -R * 0.83, 0, -R * 0.72);
    c.stroke();
    c.beginPath();
    c.arc(0, -R * 0.985, 3, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }
  // inner lattice
  for (let i = 0; i < 16; i++) {
    c.save();
    c.rotate((i / 16) * Math.PI * 2);
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(0, -R * 0.66);
    c.quadraticCurveTo(R * 0.2, -R * 0.5, 0, -R * 0.4);
    c.stroke();
    c.restore();
  }
  return cv;
}

/** Soft round glow sprite for particles. */
export function makeSpriteCanvas(size = 64) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const c = cv.getContext('2d')!;
  const g = c.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,245,210,1)');
  g.addColorStop(0.3, 'rgba(240,205,130,0.8)');
  g.addColorStop(1, 'rgba(240,205,130,0)');
  c.fillStyle = g;
  c.fillRect(0, 0, size, size);
  return cv;
}
