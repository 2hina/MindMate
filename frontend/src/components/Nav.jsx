import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const links = [
  { label: 'Features',   id: 'Features'   },
  { label: 'Calm Zone',  id: 'CalmZone'   },
  { label: 'AI Chat',    id: 'AIChat'     },
  { label: 'Therapists', id: 'Therapists' },
];

export default function Nav() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [drop,     setDrop]     = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '0 5%', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.3s', ...(scrolled ? { background: 'rgba(255,255,255,0.58)', backdropFilter: 'blur(22px)', borderBottom: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 24px rgba(80,140,200,0.1)' } : {}) }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span style={{ fontSize: 24 }}>🌿</span>
        <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 21, fontWeight: 400, background: 'linear-gradient(135deg,#4a9e7f,#3a7bd5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MindMate</span>
      </div>

      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="nav-links">
        {links.map(l => (
          <button key={l.label} onClick={() => scroll(l.id)} style={{ background: 'none', border: 'none', padding: '8px 14px', borderRadius: 20, cursor: 'pointer', fontWeight: 600, fontSize: 14, fontFamily: "'Plus Jakarta Sans',sans-serif", color: '#4a5568', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#4a9e7f'}
            onMouseLeave={e => e.currentTarget.style.color = '#4a5568'}>
            {l.label}
          </button>
        ))}

        {/* User menu */}
        <div style={{ position: 'relative', marginLeft: 8 }}>
          <button onClick={() => setDrop(p => !p)} style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'linear-gradient(135deg,rgba(168,230,207,0.42),rgba(179,217,242,0.42))', border: '1.5px solid rgba(74,158,127,0.32)', borderRadius: 50, padding: '7px 16px 7px 8px', cursor: 'pointer' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#4a9e7f,#3a7bd5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {user?.name?.slice(0, 2).toUpperCase()}
            </div>
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: '#2d3748' }}>{user?.name?.split(' ')[0]}</span>
            <span style={{ fontSize: 10, color: '#718096', transition: 'transform 0.2s', transform: drop ? 'rotate(180deg)' : 'none' }}>▼</span>
          </button>

          {drop && (
            <div className="glass" style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, borderRadius: 18, padding: '8px', minWidth: 196, zIndex: 100, animation: 'fadeUp 0.2s ease' }}>
              <div style={{ padding: '12px 14px 10px', borderBottom: '1px solid rgba(100,200,150,0.15)', marginBottom: 6 }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 14, color: '#2d3748' }}>{user?.name}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: '#718096' }}>{user?.email}</div>
              </div>
              {[['👤', 'My Profile'], ['📊', 'Reports'], ['🎯', 'Goals'], ['⚙️', 'Settings']].map(([ic, lb]) => (
                <button key={lb} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'none', border: 'none', borderRadius: 12, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, color: '#4a5568', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(168,230,207,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  {ic} {lb}
                </button>
              ))}
              <div style={{ borderTop: '1px solid rgba(100,200,150,0.15)', marginTop: 6, paddingTop: 6 }}>
                <button onClick={() => { setDrop(false); logout(); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'none', border: 'none', borderRadius: 12, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, color: '#e05050', fontWeight: 700 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,80,80,0.09)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  🚪 Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
