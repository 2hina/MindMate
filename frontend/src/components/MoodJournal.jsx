import { useState, useEffect } from 'react';
import { getMoods, createMood } from '../api/moods';

const MOODS = [
  { e: '😊', l: 'Happy' }, { e: '😌', l: 'Calm' },    { e: '😔', l: 'Sad' },
  { e: '😤', l: 'Anxious' }, { e: '🥰', l: 'Grateful' }, { e: '😴', l: 'Tired' },
  { e: '🤩', l: 'Excited' }, { e: '😡', l: 'Frustrated' },
];

export default function MoodJournal() {
  const [sel,     setSel]     = useState(null);
  const [note,    setNote]    = useState('');
  const [loading, setLoading] = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState('');
  const [history, setHistory] = useState([]);
  const [loadH,   setLoadH]   = useState(true);

  useEffect(() => {
    getMoods()
      .then(setHistory)
      .catch(() => setError('Could not load mood history.'))
      .finally(() => setLoadH(false));
  }, []);

  const save = async () => {
    if (!sel) return;
    setLoading(true); setError('');
    try {
      const entry = await createMood({ mood: sel.e, label: sel.l, note });
      setHistory(p => [{ ...entry, time_display: 'Just now' }, ...p]);
      setSaved(true);
      setTimeout(() => { setSaved(false); setSel(null); setNote(''); }, 2500);
    } catch {
      setError('Could not save mood. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Mood picker */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 18 }}>
        {MOODS.map(m => (
          <button key={m.l} onClick={() => setSel(m)} style={{ background: sel?.l === m.l ? 'linear-gradient(135deg,#a8e6cf,#88d8b0)' : 'rgba(255,255,255,0.62)', border: sel?.l === m.l ? '2px solid #4a9e7f' : '1.5px solid rgba(100,180,150,0.3)', borderRadius: 13, padding: '8px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", color: '#4a5568', transition: 'all 0.2s', transform: sel?.l === m.l ? 'scale(1.06)' : 'none' }}>
            <span style={{ fontSize: 19 }}>{m.e}</span>{m.l}
          </button>
        ))}
      </div>

      <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="How are you feeling today? (optional)" style={{ width: '100%', minHeight: 76, borderRadius: 13, border: '1.5px solid rgba(100,180,150,0.3)', padding: '12px 16px', fontSize: 14, fontFamily: "'Plus Jakarta Sans',sans-serif", resize: 'vertical', background: 'rgba(255,255,255,0.72)', color: '#4a5568', boxSizing: 'border-box', outline: 'none' }} />

      {error && <p style={{ color: '#e05050', fontSize: 13, marginTop: 6 }}>{error}</p>}

      <button onClick={save} disabled={!sel || loading} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 15, background: sel ? 'linear-gradient(135deg,#4a9e7f,#3a7bd5)' : 'rgba(180,180,180,0.4)', color: sel ? '#fff' : '#999', border: 'none', borderRadius: 50, padding: '13px 0', cursor: sel ? 'pointer' : 'default', width: '100%', marginTop: 12, opacity: sel ? 1 : 0.65 }}>
        {loading ? '💾 Saving...' : saved ? '✅ Mood logged!' : '💚 Log My Mood'}
      </button>

      {/* History */}
      <div style={{ marginTop: 20 }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 800, color: '#4a5568', marginBottom: 10 }}>📋 Recent Logs</p>
        {loadH ? (
          <div style={{ color: '#718096', fontSize: 13 }}>Loading...</div>
        ) : history.slice(0, 5).map((h, i) => (
          <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'rgba(255,255,255,0.55)', borderRadius: 12, marginBottom: 8, border: '1px solid rgba(100,200,150,0.2)', animation: `slideRight 0.35s ${i * 0.07}s both` }}>
            <span style={{ fontSize: 22 }}>{h.mood}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 13, color: '#2d3748' }}>{h.label}</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: '#718096' }}>{h.note || 'No note'} · {h.time_display}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
