import { useRef } from 'react';

const BLOBS = [
  { w: 560, h: 560, top: '-18%', left: '-12%', col: 'rgba(168,230,207,0.38)', a: 'blobMorph 20s ease-in-out infinite' },
  { w: 480, h: 480, top: '18%', right: '-14%', col: 'rgba(179,217,242,0.32)', a: 'blobMorph2 24s ease-in-out infinite' },
  { w: 400, h: 400, bottom: '-12%', left: '22%', col: 'rgba(212,184,240,0.26)', a: 'blobMorph 22s ease-in-out infinite reverse' },
  { w: 260, h: 260, top: '52%', left: '4%', col: 'rgba(255,211,182,0.22)', a: 'blobMorph2 28s ease-in-out infinite reverse' },
];

const DARK_BLOBS = BLOBS.map(b => ({
  ...b,
  col: b.col.replace('168,230,207', '74,158,127').replace('179,217,242', '58,123,213').replace('212,184,240', '124,92,191').replace('255,211,182', '255,180,100').replace(/0\.\d+\)/, m => `${parseFloat(m) * 0.5})`),
}));

export default function Background({ dark = false }) {
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * 92, y: Math.random() * 92,
      size: 8 + Math.random() * 14,
      delay: Math.random() * 7, dur: 6 + Math.random() * 8,
      s: ['🌿', '✨', '🍃', '⭐', '🌸', '💧'][i % 6],
    }))
  ).current;

  const blobs = dark ? DARK_BLOBS : BLOBS;
  const bg = dark
    ? 'linear-gradient(135deg,#0d1f1a 0%,#0e1827 45%,#160e2b 80%,#1a1210 100%)'
    : 'linear-gradient(135deg,#e8f8f0 0%,#dbeeff 42%,#ede8ff 76%,#fff5ee 100%)';

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, background: bg }} />
      {blobs.map((b, i) => (
        <div key={i} style={{ position: 'absolute', width: b.w, height: b.h, top: b.top, left: b.left, right: b.right, bottom: b.bottom, background: b.col, borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%', animation: b.a, filter: 'blur(1px)' }} />
      ))}
      {particles.map((p, i) => (
        <span key={i} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size, animation: `floatUp ${p.dur}s ease-in-out ${p.delay}s infinite`, opacity: dark ? 0.22 : 0.38, userSelect: 'none' }}>{p.s}</span>
      ))}
    </div>
  );
}
