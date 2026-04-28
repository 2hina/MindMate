import { useState, useCallback } from 'react';

const ZEN_SYMS = ['🪨', '🌸', '🍃', '🌙', '⭐', '🌊', '🪷', '🌺'];
const ZEN_MSGS = ['Peace flows through you...', 'You are grounded...', 'Breathe and release...', 'This moment is enough...', 'You are enough...', 'All is calm...'];

function ZenButton({ sym }) {
  const [act, setAct] = useState(false);
  return (
    <button onClick={() => { setAct(true); setTimeout(() => setAct(false), 700); }}
      style={{ height: 62, borderRadius: 15, border: act ? '2px solid #4a9e7f' : '1.5px solid rgba(100,200,150,0.22)', cursor: 'pointer', fontSize: 25, display: 'flex', alignItems: 'center', justifyContent: 'center', background: act ? 'linear-gradient(135deg,#a8e6cf,#88d8b0)' : 'rgba(255,255,255,0.55)', transition: 'all 0.2s', transform: act ? 'scale(0.88)' : 'scale(1)' }}>
      {sym}
    </button>
  );
}

export default function CalmZone() {
  const [bState, setBState] = useState('ready');
  const [bLabel, setBLabel] = useState('Tap to begin');
  const [bRun,   setBRun]   = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [score,   setScore]   = useState(0);
  const [zenMsg,  setZenMsg]  = useState('');

  const startBreath = useCallback(async () => {
    if (bRun) return; setBRun(true);
    setBState('in');   setBLabel('Breathe In... 4s');  await new Promise(r => setTimeout(r, 4000));
    setBState('hold'); setBLabel('Hold... 4s');         await new Promise(r => setTimeout(r, 4000));
    setBState('out');  setBLabel('Breathe Out... 6s'); await new Promise(r => setTimeout(r, 6000));
    setBState('ready'); setBLabel('Tap to begin'); setBRun(false);
  }, [bRun]);

  const pop = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now(); const sz = 32 + Math.random() * 48;
    setBubbles(p => [...p, { id, x: e.clientX - rect.left, y: e.clientY - rect.top, sz }]);
    setScore(s => s + 1);
    setTimeout(() => setBubbles(p => p.filter(b => b.id !== id)), 650);
  };

  const bBg = bState === 'in' ? 'linear-gradient(135deg,#a8e6cf,#4a9e7f)' : bState === 'hold' ? 'linear-gradient(135deg,#b3d9f2,#3a7bd5)' : bState === 'out' ? 'linear-gradient(135deg,#d4b8f0,#7c5cbf)' : 'linear-gradient(135deg,rgba(168,230,207,0.7),rgba(136,216,176,0.7))';
  const bSc = (bState === 'in' || bState === 'hold') ? 'scale(1.65)' : 'scale(1)';

  return (
    <section id="CalmZone" style={{ padding: '90px 5%', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(30px,5vw,52px)', fontWeight: 400, color: '#2d3748', marginBottom: 12 }}>🌈 Stress Relief Zone</h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, color: '#718096' }}>Interactive tools to ease your mind right now</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(278px,1fr))', gap: 22, maxWidth: 980, margin: '0 auto' }}>
        {/* Breathing */}
        <div className="glass" style={{ padding: '36px 26px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: '#2d3748', marginBottom: 6, fontWeight: 400 }}>🫁 Guided Breathing</h3>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: '#718096', marginBottom: 28 }}>4–4–6 calming breath cycle</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 188, position: 'relative' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ position: 'absolute', width: 80 + i * 48, height: 80 + i * 48, borderRadius: '50%', border: `${4 - i}px solid`, borderColor: ['rgba(168,230,207,0.5)', 'rgba(168,230,207,0.25)', 'rgba(168,230,207,0.12)'][i - 1], transition: 'all 4s ease', transform: (bState === 'in' || bState === 'hold') ? `scale(${1 + i * 0.12})` : 'scale(1)' }} />
            ))}
            <div onClick={startBreath} style={{ width: 96, height: 96, borderRadius: '50%', background: bBg, cursor: bRun ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: `transform ${bState === 'in' ? '4s' : bState === 'out' ? '6s' : '0.3s'} ease,background 1.2s ease`, transform: bSc, boxShadow: '0 0 32px rgba(74,158,127,0.38)', animation: bRun ? 'none' : 'glow 2.2s infinite' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 800, color: '#fff', textAlign: 'center', padding: '0 10px', lineHeight: 1.4 }}>{bLabel}</span>
            </div>
          </div>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: '#718096', marginTop: 22 }}>{bRun ? 'Follow the circle gently...' : 'Click the glowing circle to start'}</p>
        </div>

        {/* Bubble Pop */}
        <div className="glass" style={{ padding: '26px', overflow: 'hidden' }}>
          <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: '#2d3748', marginBottom: 4, fontWeight: 400 }}>🫧 Pop Your Worries</h3>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: '#718096', marginBottom: 14 }}>Tap to pop stress! <b style={{ color: '#4a9e7f' }}>{score}</b> popped</p>
          <div onClick={pop} style={{ height: 206, background: 'linear-gradient(135deg,rgba(179,217,242,0.22),rgba(168,230,207,0.22))', borderRadius: 18, cursor: 'crosshair', position: 'relative', overflow: 'hidden', border: '1.5px dashed rgba(100,180,200,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: '#718096', userSelect: 'none', pointerEvents: 'none', opacity: bubbles.length ? 0 : 1 }}>Tap anywhere! 🫧</span>
            {bubbles.map(b => (
              <div key={b.id} style={{ position: 'absolute', left: b.x - b.sz / 2, top: b.y - b.sz / 2, width: b.sz, height: b.sz, borderRadius: '50%', background: `radial-gradient(circle at 30% 30%,rgba(255,255,255,0.85),${['#a8e6cf', '#b3d9f2', '#d4b8f0', '#ffd3b6'][Math.floor(Math.random() * 4)]}99)`, border: '1.5px solid rgba(255,255,255,0.7)', animation: 'ripple 0.65s ease-out forwards', pointerEvents: 'none' }} />
            ))}
          </div>
        </div>

        {/* Zen Garden */}
        <div className="glass" style={{ padding: '26px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: '#2d3748', marginBottom: 4, fontWeight: 400 }}>🪨 Zen Garden</h3>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: '#718096', marginBottom: 14 }}>Touch the stones to find stillness</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 9, marginBottom: 14 }} onClick={e => { setZenMsg(ZEN_MSGS[Math.floor(Math.random() * ZEN_MSGS.length)]); }}>
            {ZEN_SYMS.map((sym, i) => <ZenButton key={i} sym={sym} />)}
          </div>
          <div style={{ minHeight: 22 }}>
            {zenMsg && <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: '#4a9e7f', fontWeight: 800, animation: 'fadeUp 0.3s ease', margin: 0 }}>✨ {zenMsg}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
