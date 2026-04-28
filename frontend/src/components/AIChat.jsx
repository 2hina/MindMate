import { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../api/chat';

const SUGGESTIONS = ['I\'m feeling anxious 😟', 'Help me relax 🌿', 'I had a great day! ✨', 'I feel lonely 💙'];

export default function AIChat({ mini = false }) {
  const [msgs,    setMsgs]    = useState([{ role: 'ai', text: 'Hi! I\'m MindMate 🌿 I\'m here to listen without judgment. How are you feeling today?' }]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const botRef = useRef();

  useEffect(() => { botRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const um = { role: 'user', text: input };
    setMsgs(p => [...p, um]); setInput(''); setLoading(true); setError('');
    try {
      const { reply } = await sendMessage(um.text);
      setMsgs(p => [...p, { role: 'ai', text: reply }]);
    } catch {
      setError('Could not reach the AI. Please try again.');
      setMsgs(p => p.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: mini ? 340 : 460 }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 2px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', animation: 'slideRight 0.3s ease' }}>
            {m.role === 'ai' && (
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#a8e6cf,#88d8b0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0, marginRight: 8, alignSelf: 'flex-end' }}>🌿</div>
            )}
            <div style={{ maxWidth: '76%', padding: '11px 16px', borderRadius: m.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px', background: m.role === 'user' ? 'linear-gradient(135deg,#4a9e7f,#3a7bd5)' : 'rgba(255,255,255,0.82)', color: m.role === 'user' ? '#fff' : '#4a5568', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, lineHeight: 1.55, border: m.role === 'ai' ? '1px solid rgba(100,200,150,0.2)' : 'none' }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#a8e6cf,#88d8b0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🌿</div>
            <div style={{ background: 'rgba(255,255,255,0.82)', borderRadius: '20px 20px 20px 4px', padding: '14px 18px', border: '1px solid rgba(100,200,150,0.2)' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#4a9e7f', margin: '0 2px', animation: `typing 1.2s ${i * 0.2}s ease-in-out infinite` }} />)}
            </div>
          </div>
        )}
        {error && <p style={{ color: '#e05050', fontSize: 13, textAlign: 'center' }}>{error}</p>}
        <div ref={botRef} />
      </div>

      {!mini && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => setInput(s)} style={{ background: 'rgba(168,230,207,0.32)', border: '1px solid rgba(74,158,127,0.3)', borderRadius: 20, padding: '6px 14px', fontSize: 12, cursor: 'pointer', color: '#4a5568', fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{s}</button>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Share how you're feeling..." style={{ flex: 1, borderRadius: 50, border: '1.5px solid rgba(100,200,150,0.35)', padding: '12px 20px', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, background: 'rgba(255,255,255,0.72)', color: '#4a5568', outline: 'none' }} />
        <button onClick={send} disabled={loading} style={{ background: 'linear-gradient(135deg,#4a9e7f,#3a7bd5)', border: 'none', borderRadius: 50, padding: '12px 22px', fontSize: 20, cursor: 'pointer', color: '#fff' }}>→</button>
      </div>
    </div>
  );
}
