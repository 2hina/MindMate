import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import FrontPage from './pages/FrontPage';
import AppPage   from './pages/AppPage';

function AppShell() {
  const { user, loading } = useAuth();
  const [transitioning, setTransitioning]   = useState(false);
  const [showApp,       setShowApp]          = useState(false);
  const [prevUser,      setPrevUser]         = useState(null);

  // Detect user change and animate transition
  useEffect(() => {
    if (loading) return;
    if (user && !prevUser) {
      // Logged in → fade to app
      setTransitioning(true);
      setTimeout(() => { setShowApp(true); setTransitioning(false); window.scrollTo({ top: 0 }); }, 550);
    } else if (!user && prevUser) {
      // Logged out → fade to front page
      setTransitioning(true);
      setTimeout(() => { setShowApp(false); setTransitioning(false); window.scrollTo({ top: 0 }); }, 450);
    }
    setPrevUser(user);
  }, [user, loading]); // eslint-disable-line

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#0d1f1a,#0e1827,#160e2b)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 18 }}>🌿</div>
          <div style={{ width: 36, height: 36, border: '3px solid rgba(255,255,255,0.2)', borderTopColor: '#a8e6cf', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
          <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ opacity: transitioning ? 0 : 1, transition: 'opacity 0.45s ease', minHeight: '100vh' }}>
      {showApp ? <AppPage /> : <FrontPage />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
