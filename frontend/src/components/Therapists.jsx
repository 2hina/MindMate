import { useState, useEffect } from 'react';
import { getTherapists } from '../api/therapists';

export default function Therapists() {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    getTherapists()
      .then(setData)
      .catch(() => setError('Could not load therapists.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: '#718096', padding: '20px 0', textAlign: 'center' }}>Loading therapists...</div>;
  if (error)   return <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: '#e05050', padding: '20px 0' }}>{error}</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(215px,1fr))', gap: 14 }}>
      {data.map((t, i) => (
        <div key={t.id} style={{ background: `${t.card_color}28`, borderRadius: 18, padding: '20px 14px', border: `1.5px solid ${t.card_color}88`, animation: `fadeUp 0.4s ${i * 0.1}s both`, cursor: 'pointer', transition: 'all 0.25s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: t.card_color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 15, color: '#fff', marginBottom: 12, boxShadow: `0 4px 14px ${t.card_color}66`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {t.avatar_initials}
          </div>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 15, color: '#2d3748' }}>{t.name}</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: '#718096', marginBottom: 9 }}>{t.specialty}</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 9 }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, fontWeight: 800, color: '#e8a317' }}>★ {t.rating}</span>
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: '#718096' }}>{t.sessions} sessions</span>
          </div>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 20, background: t.available ? '#4a9e7f22' : '#e0505022', color: t.available ? '#4a9e7f' : '#e05050', display: 'inline-block', marginBottom: 12 }}>
            {t.available ? '● Available' : '● Busy'}
          </span>
          {t.available && (
            <button style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 13, background: t.card_color, color: '#fff', border: 'none', borderRadius: 50, padding: '9px 14px', cursor: 'pointer', width: '100%' }}>
              Book Session
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
