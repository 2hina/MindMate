const COLS = [
  { title: 'Features',  links: ['Mood Journal', 'Stress Check', 'AI Companion', 'Find Therapists'] },
  { title: 'Support',   links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'] },
  { title: 'Company',   links: ['About Us', 'Blog', 'Careers', 'Press Kit'] },
];

export default function Footer() {
  return (
    <footer style={{ position: 'relative', zIndex: 1, padding: '48px 5% 32px', borderTop: '1px solid rgba(100,200,150,0.2)', background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(12px)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 30, marginBottom: 38 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 22 }}>🌿</span>
              <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, fontWeight: 400, background: 'linear-gradient(135deg,#4a9e7f,#3a7bd5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MindMate</span>
            </div>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: '#718096', lineHeight: 1.7 }}>A calm digital space for your mental wellness journey.</p>
          </div>
          {COLS.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 12, color: '#2d3748', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.6px' }}>{col.title}</div>
              {col.links.map(l => (
                <div key={l} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: '#718096', marginBottom: 10, cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#4a9e7f'}
                  onMouseLeave={e => e.target.style.color = '#718096'}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(100,200,150,0.15)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: '#718096', margin: 0 }}>© 2025 MindMate · Built with care for mental wellness 🌿</p>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: '#718096', margin: 0 }}>Made with 💚 for a calmer world</p>
        </div>
      </div>
    </footer>
  );
}
