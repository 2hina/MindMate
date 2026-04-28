// ─── StressCheck.jsx ─────────────────────────────────────────────────────────
import { useState } from 'react';
import { analyzeStress } from '../api/stress';

export function StressCheck() {
  const [text,    setText]    = useState('');
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true); setResult(null); setError('');
    try {
      const r = await analyzeStress(text);
      setResult(r);
    } catch {
      setError('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const lc = result?.level === 'Low' ? '#4a9e7f' : result?.level === 'Moderate' ? '#e8a317' : '#e05252';

  return (
    <div>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Describe how you've been feeling... e.g. 'I've been overwhelmed with work and feeling anxious about everything lately'" style={{ width: '100%', minHeight: 96, borderRadius: 13, border: '1.5px solid rgba(58,123,213,0.25)', padding: '12px 16px', fontSize: 14, fontFamily: "'Plus Jakarta Sans',sans-serif", resize: 'vertical', background: 'rgba(255,255,255,0.72)', color: '#4a5568', boxSizing: 'border-box', outline: 'none' }} />
      {error && <p style={{ color: '#e05050', fontSize: 13, marginTop: 6 }}>{error}</p>}
      <button onClick={analyze} disabled={!text.trim() || loading} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 15, background: 'linear-gradient(135deg,#3a7bd5,#7c5cbf)', color: '#fff', border: 'none', borderRadius: 50, padding: '13px 0', cursor: text.trim() ? 'pointer' : 'default', width: '100%', marginTop: 12, opacity: text.trim() ? 1 : 0.65 }}>
        {loading ? '🔬 Analyzing...' : '🧠 Analyze My Stress Level'}
      </button>
      {result && (
        <div style={{ marginTop: 20, animation: 'fadeUp 0.5s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <div style={{ flex: 1, height: 11, background: 'rgba(200,220,240,0.4)', borderRadius: 50, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${result.score}%`, background: `linear-gradient(90deg,#4a9e7f,${lc})`, borderRadius: 50, transition: 'width 1.2s ease' }} />
            </div>
            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: lc }}>{result.score}%</div>
          </div>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", background: lc + '22', color: lc, borderRadius: 20, padding: '6px 18px', fontWeight: 800, fontSize: 13, display: 'inline-block', marginBottom: 14 }}>{result.level} Stress</span>
          {result.tips.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: '#4a5568' }}>
              <span style={{ color: '#4a9e7f', flexShrink: 0 }}>✓</span>{t}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StressCheck;
