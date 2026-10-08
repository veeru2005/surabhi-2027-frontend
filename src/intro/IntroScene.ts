import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { PAISLEY_LEFT, PAISLEY_RIGHT, PAISLEY_RIGHT_HOLE } from '../data/paisley';
import { ICON_NAMES, makeMandalaCanvas, makeSpriteCanvas, makeTileCanvas } from './textures';

/* ------------------------------------------------------------------
   Timeline (seconds)
   0.0 – 1.6   cultural icon tiles fly in from the dark
   1.6 – 2.6   tiles orbit as a constellation
   2.6 – 3.4   tiles spiral into the centre and burst into gold sparks
   3.1 – 4.7   the two paisleys of the logo swirl in and lock together
   4.8 – 5.8   SURABHI wordmark rises under the emblem
   6.6 – 7.4   camera pushes through the emblem (exit)
   ------------------------------------------------------------------ */
export const T = {
  converge: 2.6,
  burst: 3.35,
  paisleyStart: 3.1,
  lock: 4.7,
  word: 4.9,
  exit: 6.6,
  end: 7.4,
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInCubic = (x: number) => x * x * x;
const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOutBack = (x: number) => {
  const c1 = 1.4;
  return 1 + (c1 + 1) * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

const EMBLEM_SCALE = 5;
const CENTER = { x: 0.5, y: 0.624 }; // centre of both paisleys in normalised logo coords
const EMBLEM_Y = 0.5;

interface Burst {
  points: THREE.Points;
  velocities: Float32Array;
  start: number;
  life: number;
}

export class IntroScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  private baseZ = 11;
  private ringScale = 1;
  private ringStretch = 1;
  private mandalaBase = 1;
  private mandalaY = EMBLEM_Y;
  private tiles: THREE.Mesh[] = [];
  private emblem = new THREE.Group();
  private left!: THREE.Mesh;
  private right!: THREE.Mesh;
  private mandala!: THREE.Mesh;
  private wordmark!: THREE.Mesh;
  private dust!: THREE.Points;
  private bursts: Burst[] = [];
  private flashLight = new THREE.PointLight('#ffd998', 0, 30, 1.5);
  private rimA = new THREE.PointLight('#e9a03a', 30, 30, 1.6);
  private rimB = new THREE.PointLight('#5fd3a6', 18, 30, 1.6);
  private disposables: { dispose: () => void }[] = [];
  readonly ready: Promise<void>;

  constructor(private canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = env;
    this.disposables.push(env, pmrem);

    this.scene.add(new THREE.AmbientLight('#cfe9dc', 0.35));
    const key = new THREE.DirectionalLight('#fff1d6', 2.2);
    key.position.set(3, 4, 7);
    this.scene.add(key, this.flashLight, this.rimA, this.rimB);
    this.flashLight.position.set(0, EMBLEM_Y, 2.5);

    this.buildDust();
    this.buildTiles();
    this.ready = this.buildEmblem();
    this.buildBursts();
    this.resize();
  }

  /* ---------------- builders ---------------- */

  private track<T extends { dispose: () => void }>(o: T): T {
    this.disposables.push(o);
    return o;
  }

  private spriteTex() {
    const t = this.track(new THREE.CanvasTexture(makeSpriteCanvas()));
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }

  private buildDust() {
    const n = 700;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 34;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = -Math.random() * 22 + 2;
    }
    const g = this.track(new THREE.BufferGeometry());
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = this.track(
      new THREE.PointsMaterial({ size: 0.09, map: this.spriteTex(), transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, color: '#f3d58f' }),
    );
    this.dust = new THREE.Points(g, m);
    this.scene.add(this.dust);
  }

  private buildTiles() {
    const geo = this.track(new RoundedBoxGeometry(1.15, 1.15, 0.3, 4, 0.14));
    const side = this.track(
      new THREE.MeshPhysicalMaterial({ color: '#0f4f3a', metalness: 0.35, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.2 }),
    );
    ICON_NAMES.forEach((name) => {
      const tex = this.track(new THREE.CanvasTexture(makeTileCanvas(name)));
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      const face = this.track(
        new THREE.MeshPhysicalMaterial({
          map: tex,
          emissiveMap: tex,
          emissive: new THREE.Color('#ffffff'),
          emissiveIntensity: 0.28,
          roughness: 0.3,
          metalness: 0.1,
          clearcoat: 1,
          clearcoatRoughness: 0.3,
        }),
      );
      // BoxGeometry groups: +x, -x, +y, -y, +z (front), -z (back)
      const mesh = new THREE.Mesh(geo, [side, side, side, side, face, side]);
      mesh.scale.setScalar(0.0001);
      this.tiles.push(mesh);
      this.scene.add(mesh);
    });
  }

  private paisleyGeometry(pts: [number, number][], hole?: [number, number][]) {
    const shape = new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y)));
    if (hole) shape.holes.push(new THREE.Path(hole.map(([x, y]) => new THREE.Vector2(x, y))));
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.006,
      bevelSegments: 4,
      curveSegments: 6,
    });
    // caps keep UVs = normalised logo coords, so the logo texture lands exactly
    g.translate(-CENTER.x, -CENTER.y, -0.025);
    g.scale(EMBLEM_SCALE, EMBLEM_SCALE, EMBLEM_SCALE);
    g.computeVertexNormals();
    return this.track(g);
  }

  private async buildEmblem() {
    const loader = new THREE.TextureLoader();
    const [logo, word] = await Promise.all([
      loader.loadAsync('/surabhi-logo-2027.jpg'),
      loader.loadAsync('/surabhi-wordmark.png'),
    ]);
    [logo, word].forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      this.track(t);
    });

    const gold = this.track(new THREE.MeshStandardMaterial({ color: '#d4ad62', metalness: 1, roughness: 0.22, envMapIntensity: 1.4 }));
    const leftFace = this.track(new THREE.MeshStandardMaterial({ map: logo, roughness: 0.5, metalness: 0.0, emissiveMap: logo, emissive: '#ffffff', emissiveIntensity: 0.04 }));
    const rightFace = this.track(new THREE.MeshStandardMaterial({ map: logo, roughness: 0.35, metalness: 0.35, emissiveMap: logo, emissive: '#ffffff', emissiveIntensity: 0.02, envMapIntensity: 0.9 }));

    // ExtrudeGeometry groups: 0 = caps, 1 = sides
    this.left = new THREE.Mesh(this.paisleyGeometry(PAISLEY_LEFT), [leftFace, gold]);
    this.right = new THREE.Mesh(this.paisleyGeometry(PAISLEY_RIGHT, PAISLEY_RIGHT_HOLE), [rightFace, gold]);
    this.left.visible = this.right.visible = false;
    this.emblem.add(this.left, this.right);
    this.emblem.position.y = EMBLEM_Y;
    this.scene.add(this.emblem);

    const mTex = this.track(new THREE.CanvasTexture(makeMandalaCanvas()));
    mTex.colorSpace = THREE.SRGBColorSpace;
    this.mandala = new THREE.Mesh(
      this.track(new THREE.PlaneGeometry(6.4, 6.4)),
      this.track(new THREE.MeshBasicMaterial({ map: mTex, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending })),
    );
    this.mandala.position.set(0, this.mandalaY, -1.2);
    this.scene.add(this.mandala);

    const ratio = 595 / 173;
    this.wordmark = new THREE.Mesh(
      this.track(new THREE.PlaneGeometry(3.5, 3.5 / ratio)),
      this.track(new THREE.MeshBasicMaterial({ map: word, transparent: true, opacity: 0, color: '#f6e7c1', depthWrite: false })),
    );
    this.wordmark.position.set(0, -1.65, 0.2);
    this.scene.add(this.wordmark);
  }

  private makeBurst(n: number, start: number, speed: [number, number], life: number, flat = false): Burst {
    const pos = new Float32Array(n * 3);
    const vel = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const v = new THREE.Vector3().randomDirection();
      if (flat) v.z *= 0.25;
      v.multiplyScalar(speed[0] + Math.random() * (speed[1] - speed[0]));
      vel.set([v.x, v.y, v.z], i * 3);
    }
    const g = this.track(new THREE.BufferGeometry());
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = this.track(
      new THREE.PointsMaterial({ size: 0.11, map: this.spriteTex(), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, color: '#ffd98a' }),
    );
    const points = new THREE.Points(g, m);
    points.position.y = EMBLEM_Y;
    this.scene.add(points);
    return { points, velocities: vel, start, life };
  }

  private buildBursts() {
    this.bursts.push(this.makeBurst(520, T.burst, [2, 7], 1.6));
    this.bursts.push(this.makeBurst(380, T.lock, [1.5, 5], 1.8, true));
  }

  /* ---------------- frame ---------------- */

  resize() {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    const aspect = w / h;
    this.camera.aspect = aspect;
    const visH = 2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)); // per unit distance
    // keep the emblem + wordmark (≈4.2 wide, ≈4.4 tall) comfortably in frame
    this.baseZ = Math.max(11, 4.4 / (visH * aspect), 5.6 / visH);
    const visibleWidth = visH * this.baseZ * aspect;
    this.ringScale = Math.min(1, visibleWidth / 10);
    // phones in portrait: stretch the tile ring into a tall oval so the centre stays clear for the word
    this.ringStretch = aspect < 0.8 ? Math.min(2.1, 0.78 / aspect) : 1;
    // desktop/landscape: drop the halo a little so it clears the 'KL University presents' line (phones unchanged)
    this.mandalaBase = aspect < 0.8 ? 1 : 0.9;
    this.mandalaY = aspect < 0.8 ? EMBLEM_Y : EMBLEM_Y - 0.45;
    if (this.mandala) this.mandala.position.y = this.mandalaY;
    this.camera.updateProjectionMatrix();
  }

  update(t: number) {
    /* camera */
    const exit = easeInCubic(clamp01((t - T.exit) / (T.end - T.exit)));
    this.camera.position.set(Math.sin(t * 0.35) * 0.35 * (1 - exit), 0.15 + Math.cos(t * 0.3) * 0.15, this.baseZ * (1 - exit * 0.82));
    this.camera.lookAt(0, EMBLEM_Y * exit + 0.1, 0);

    /* dust */
    const dp = this.dust.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < dp.count; i++) {
      let y = dp.getY(i) + 0.006;
      if (y > 11) y = -11;
      dp.setY(i, y);
    }
    dp.needsUpdate = true;
    this.dust.rotation.y = t * 0.02;

    /* rim lights orbit */
    this.rimA.position.set(Math.cos(t * 0.6) * 6, 2.5, Math.sin(t * 0.6) * 4 - 1);
    this.rimB.position.set(Math.cos(t * 0.6 + Math.PI) * 6, -2, Math.sin(t * 0.6 + Math.PI) * 4 - 1);

    /* tiles */
    const n = this.tiles.length;
    const conv = easeInCubic(clamp01((t - T.converge) / (T.burst - T.converge)));
    const R = (this.ringScale < 0.6 ? 2.9 : 3.3) * this.ringScale;
    this.tiles.forEach((m, i) => {
      if (t > T.burst + 0.05) {
        m.visible = false;
        return;
      }
      const e = easeOutCubic(clamp01((t - i * 0.13) / 1.1));
      const a = (i / n) * Math.PI * 2 + t * 0.28 + conv * 4;
      const r = R * (1 - conv);
      const ringX = Math.cos(a) * r * 1.15;
      const ringY = Math.sin(a) * r * 0.78 * this.ringStretch + EMBLEM_Y * conv + Math.sin(t * 1.4 + i) * 0.12 * (1 - conv);
      const ringZ = Math.sin(a * 2) * 0.7 * (1 - conv);
      m.position.set(THREE.MathUtils.lerp(ringX * 3, ringX, e), THREE.MathUtils.lerp(ringY * 3, ringY, e), THREE.MathUtils.lerp(-20, ringZ, e));
      m.rotation.set(Math.sin(t * 0.8 + i) * 0.35, Math.cos(t * 0.7 + i) * 0.5 + (1 - e) * 3, Math.sin(t * 0.5 + i) * 0.15 + conv * 3);
      m.scale.setScalar(Math.max(0.0001, e * (1 - conv) * this.ringScale ** 0.5));
    });

    /* bursts */
    this.bursts.forEach((b) => {
      const dt = t - b.start;
      const mat = b.points.material as THREE.PointsMaterial;
      if (dt < 0 || dt > b.life) {
        mat.opacity = 0;
        return;
      }
      const f = (1 - Math.exp(-dt * 2.4)) * 1.1;
      const p = b.points.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < p.count; i++) {
        p.setXYZ(i, b.velocities[i * 3] * f, b.velocities[i * 3 + 1] * f - dt * dt * 0.4, b.velocities[i * 3 + 2] * f);
      }
      p.needsUpdate = true;
      mat.opacity = Math.pow(1 - dt / b.life, 1.5);
    });

    /* flash light at burst + lock */
    const flash = Math.max(Math.exp(-Math.pow((t - T.burst) / 0.12, 2)), Math.exp(-Math.pow((t - T.lock) / 0.15, 2)));
    this.flashLight.intensity = flash * 160;

    /* paisleys */
    if (this.left && this.right) {
      const s = easeInOutCubic(clamp01((t - T.paisleyStart) / (T.lock - T.paisleyStart)));
      const vis = t > T.paisleyStart;
      this.left.visible = this.right.visible = vis;
      const ang = (1 - s) * Math.PI * 1.6;
      const r = (1 - s) * 5.2 * Math.max(0.7, this.ringScale);
      const ox = Math.cos(ang) * r;
      const oy = Math.sin(ang) * r * 0.55;
      const z = -(1 - s) * 4;
      this.left.position.set(-ox, -oy, z);
      this.right.position.set(ox, oy, z);
      this.left.rotation.set(0, -(1 - s) * Math.PI * 2, (1 - s) * 0.9);
      this.right.rotation.set(0, (1 - s) * Math.PI * 2, -(1 - s) * 0.9);
      const sc = 0.35 + 0.65 * s;
      this.left.scale.setScalar(sc);
      this.right.scale.setScalar(sc);

      // after the lock: a gentle breathing sway + a tiny "thud"
      const after = Math.max(0, t - T.lock);
      const thud = after > 0 ? 1 + Math.sin(Math.min(after, 0.35) / 0.35 * Math.PI) * 0.05 : 1;
      this.emblem.scale.setScalar(thud);
      this.emblem.rotation.y = after > 0 ? Math.sin(after * 1.3) * 0.16 * Math.min(1, after) : 0;
      this.emblem.rotation.x = after > 0 ? Math.sin(after * 0.9) * 0.05 : 0;

      const halo = clamp01((t - (T.lock - 0.2)) / 0.9);
      (this.mandala.material as THREE.MeshBasicMaterial).opacity = halo * 0.32 * (1 - exit);
      this.mandala.rotation.z = t * 0.1;
      this.mandala.scale.setScalar((0.75 + easeOutBack(halo) * 0.25) * this.mandalaBase);

      const w = easeOutCubic(clamp01((t - T.word) / 0.9));
      (this.wordmark.material as THREE.MeshBasicMaterial).opacity = w * (1 - exit);
      this.wordmark.position.y = -1.95 + w * 0.3;
      this.wordmark.scale.setScalar(0.92 + w * 0.08);
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposables.forEach((d) => d.dispose());
    this.renderer.dispose();
  }
}
