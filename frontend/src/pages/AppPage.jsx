import { useState } from 'react';
import Background    from '../components/Background';
import Nav           from '../components/Nav';
import Hero          from '../components/Hero';
import MoodJournal   from '../components/MoodJournal';
import StressCheck   from '../components/StressCheck';
import AIChat        from '../components/AIChat';
import Therapists    from '../components/Therapists';
import CalmZone      from '../components/CalmZone';
import Footer        from '../components/Footer';

export default function AppPage() {
  const [activeFeature, setActiveFeature] = useState('Mood');

  const tabs = [
    { id: 'Mood',       icon: '🌿', label: 'Mood Journal',    col: '#a8e6cf' },
    { id: 'Stress',     icon: '🧘', label: 'Stress Check',    col: '#b3d9f2' },
    { id: 'Chat',       icon: '💬', label: 'AI Companion',    col: '#d4b8f0' },
    { id: 'Therapists', icon: '🤝', label: 'Find Therapists', col: '#ffd3b6' },
  ];

  const renderFeature = () => {
    switch (activeFeature) {
      case 'Mood':       return <MoodJournal />;
      case 'Stress':     return <StressCheck />;
      case 'Chat':       return <AIChat mini />;
      case 'Therapists': return <Therapists />;
      default:           return null;
    }
  };

  const activeTab = tabs.find(t => t.id === activeFeature);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", minHeight: '100vh', overflowX: 'hidden' }} className="anim-enterApp">
      <Background />
      <Nav />

      {/* Hero */}
      <Hero />

      {/* Features Section */}
      <section id="Features" style={{ padding: '90px 5%', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(30px,5vw,52px)', fontWeight: 400, color: '#2d3748', marginBottom: 12 }}>
            Everything You Need
          </h2>
          <p style={{ fontSize: 18, color: '#718096', maxWidth: 480, margin: '0 auto' }}>
            Thoughtfully designed tools for your mental wellness every day
          </p>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Tab buttons */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 26, flexWrap: 'wrap', justifyContent: 'center' }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveFeature(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 50, border: activeFeature === t.id ? `2px solid ${t.col}` : '1.5px solid rgba(255,255,255,0.65)', cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: "'Plus Jakarta Sans',sans-serif", transition: 'all 0.25s', background: activeFeature === t.id ? t.col : 'rgba(255,255,255,0.55)', color: '#4a5568', boxShadow: activeFeature === t.id ? `0 4px 20px ${t.col}88` : 'none', transform: activeFeature === t.id ? 'scale(1.04)' : 'none', backdropFilter: 'blur(10px)' }}>
                <span style={{ fontSize: 17 }}>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>

          {/* Active feature card */}
          <div className="glass" style={{ padding: '34px 28px', animation: 'fadeUp 0.35s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
              <span style={{ fontSize: 30 }}>{activeTab.icon}</span>
              <div>
                <h3 style={{ fontFamily: "'DM Serif Display',serif", fontWeight: 400, fontSize: 22, color: '#2d3748', margin: 0 }}>{activeTab.label}</h3>
                <p style={{ fontSize: 13, color: '#718096', margin: 0 }}>Personalized just for you</p>
              </div>
            </div>
            {renderFeature()}
          </div>
        </div>
      </section>

      <CalmZone />

      {/* Full AI Chat Section */}
      <section id="AIChat" style={{ padding: '90px 5%', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(30px,5vw,52px)', fontWeight: 400, color: '#2d3748', marginBottom: 12 }}>💬 AI Companion</h2>
          <p style={{ fontSize: 18, color: '#718096', maxWidth: 500, margin: '0 auto' }}>A compassionate AI that listens without judgment, whenever you need</p>
        </div>
        <div style={{ maxWidth: 680, margin: '0 auto' }} className="glass">
          <div style={{ padding: '32px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22, paddingBottom: 18, borderBottom: '1px solid rgba(100,200,150,0.2)' }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg,#a8e6cf,#3a7bd5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, animation: 'glow 2s infinite' }}>🌿</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 17, color: '#2d3748' }}>MindMate AI</div>
                <div style={{ fontSize: 12, color: '#4a9e7f', fontWeight: 700 }}>● Always here for you</div>
              </div>
            </div>
            <AIChat />
          </div>
        </div>
      </section>

      {/* Therapists Section */}
      <section id="Therapists" style={{ padding: '90px 5%', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(30px,5vw,52px)', fontWeight: 400, color: '#2d3748', marginBottom: 12 }}>🤝 Find Your Therapist</h2>
          <p style={{ fontSize: 18, color: '#718096' }}>Connect with licensed professionals who genuinely care</p>
        </div>
        <div style={{ maxWidth: 980, margin: '0 auto' }} className="glass">
          <div style={{ padding: '36px 28px' }}>
            <Therapists />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
