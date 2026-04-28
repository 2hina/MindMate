import { useAuth } from '../context/AuthContext';

export default function Hero() {
  const { user } = useAuth();

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '110px 5% 60px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ animation: 'fadeUp 0.8s ease both' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(168,230,207,0.35)', borderRadius: 50, padding: '8px 20px', marginBottom: 28, border: '1px solid rgba(74,158,127,0.3)', backdropFilter: 'blur(8px)' }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: '#4a9e7f' }}>
            ✨ Welcome back, {user?.name?.split(' ')[0]}! Your space is ready 🌿
          </span>
        </div>

        <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(44px,8vw,90px)', fontWeight: 400, lineHeight: 1.05, marginBottom: 18, color: '#2d3748', letterSpacing: '-1px' }}>
          MindMate{' '}
          <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#4a9e7f 0%,#3a7bd5 50%,#7c5cbf 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto', animation: 'shimmer 4s linear infinite' }}>🌿</span>
        </h1>

        <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(18px,3vw,34px)', fontWeight: 500, color: '#4a5568', marginBottom: 16, lineHeight: 1.4 }}>
          Your AI Mental Wellness Companion
        </h2>

        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(15px,1.8vw,19px)', color: '#718096', maxWidth: 560, margin: '0 auto 44px', lineHeight: 1.8 }}>
          A calming sanctuary where mindfulness meets intelligence. Track moods, ease stress, chat with your AI companion, and connect with real therapists.
        </p>

        <button onClick={() => document.getElementById('Features')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 18, padding: '16px 42px', borderRadius: 50, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#4a9e7f,#3a7bd5)', color: '#fff', boxShadow: '0 6px 28px rgba(74,158,127,0.4)', transition: 'all 0.25s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
          🌿 Open My Dashboard
        </button>
      </div>

      <div style={{ display: 'flex', gap: 26, marginTop: 66, flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 0.8s 0.3s ease both', opacity: 0, animationFillMode: 'forwards' }}>
        {[['12k+', 'Active Users'], ['98%', 'Feel Better'], ['500+', 'Daily Sessions'], ['4.9★', 'Rating']].map(([n, l]) => (
          <div key={l} className="glass" style={{ borderRadius: 18, padding: '18px 26px', textAlign: 'center', minWidth: 100 }}>
            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 23, color: '#2d3748', fontWeight: 400 }}>{n}</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: '#718096', marginTop: 3, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
