import { useState } from 'react';
import { register, login } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import Background from '../components/Background';

const C = {
  g1: '#4a9e7f', g2: '#3a7bd5',
  mint: '#a8e6cf', light: 'rgba(255,255,255,0.65)',
};

export default function FrontPage() {
  const { login: setUser } = useAuth();
  const [screen, setScreen] = useState('landing'); // landing | login | signup
  const [form,   setForm]   = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [err,     setErr]     = useState('');
  const [shaking, setShaking] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPw,  setShowPw]  = useState(false);

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErr(''); };
  const isLogin = screen === 'login';

  const shake = (msg) => {
    setErr(msg); setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  const submit = async () => {
    setErr('');
    if (!isLogin) {
      if (!form.name.trim())               return shake('Please enter your full name.');
      if (!form.email.includes('@'))        return shake('Please enter a valid email.');
      if (form.password.length < 6)         return shake('Password needs at least 6 characters.');
      if (form.password !== form.confirm)   return shake("Passwords don't match.");
    }
    if (!form.email || !form.password) return shake('Please fill in all fields.');
    setLoading(true);
    try {
      const user = isLogin
        ? await login({ email: form.email, password: form.password })
        : await register({ name: form.name, email: form.email, password: form.password });
      setSuccess(true);
      setTimeout(() => setUser(user), 1300);
    } catch (e) {
      setLoading(false);
      shake(e.response?.data?.detail || e.message || 'Something went wrong.');
    }
  };

  const pwStrength = (() => {
    const p = form.password; if (!p) return 0;
    let s = 1;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    return s;
  })();
  const strCol = ['', '#e05050', '#e8a317', '#4a9e7f', '#22c55e'][pwStrength];

  const inp = (extra = {}) => ({
    width: '100%', padding: '13px 18px', borderRadius: 14, fontSize: 15,
    border: '1.5px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.14)',
    color: '#fff', outline: 'none', boxSizing: 'border-box',
    fontFamily: "'Plus Jakarta Sans',sans-serif", transition: 'border-color 0.2s', ...extra,
  });

  /* ── Landing ─────────────────────────────────────── */
  if (screen === 'landing') return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Background dark />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ animation: 'fadeUp 0.9s ease both' }}>
          <div style={{ width: 76, height: 76, borderRadius: 24, background: 'linear-gradient(135deg,#a8e6cf,#4a9e7f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, boxShadow: '0 8px 32px rgba(74,158,127,0.45)', animation: 'glow 2.5s ease-in-out infinite', margin: '0 auto 28px' }}>🌿</div>
          <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(54px,9vw,102px)', fontWeight: 400, color: '#fff', marginBottom: 14, letterSpacing: '-1px' }}>MindMate</h1>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(15px,2vw,20px)', color: 'rgba(255,255,255,0.68)', maxWidth: 500, margin: '0 auto 28px', lineHeight: 1.7 }}>
            Your personal sanctuary for mental wellness — mood tracking, stress relief, AI companionship, and real therapist connections.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 44 }}>
            {['🌿 Mood Journal', '🧘 Stress Check', '💬 AI Companion', '🤝 Therapists', '🌈 Calm Zone'].map((f, i) => (
              <span key={f} style={{ padding: '8px 18px', borderRadius: 50, background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.82)', fontSize: 13, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", animation: `fadeUp 0.6s ${0.1 + i * 0.09}s ease both`, opacity: 0, animationFillMode: 'forwards' }}>{f}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setScreen('signup')} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 17, padding: '17px 44px', borderRadius: 50, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#4a9e7f,#3a7bd5)', color: '#fff', boxShadow: '0 6px 28px rgba(74,158,127,0.45)', transition: 'all 0.25s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              🌱 Create Free Account
            </button>
            <button onClick={() => setScreen('login')} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 17, padding: '17px 44px', borderRadius: 50, border: '1.5px solid rgba(255,255,255,0.4)', cursor: 'pointer', background: 'rgba(255,255,255,0.12)', color: '#fff', transition: 'all 0.25s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}>
              Sign In →
            </button>
          </div>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginTop: 58, animation: 'fadeUp 0.8s 0.4s ease both', opacity: 0, animationFillMode: 'forwards' }}>
            {[['12k+', 'Active Users'], ['98%', 'Feel Better'], ['500+', 'Daily Sessions'], ['4.9★', 'Rating']].map(([n, l]) => (
              <div key={l} style={{ padding: '16px 22px', borderRadius: 18, textAlign: 'center', background: 'rgba(255,255,255,0.11)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: '#fff' }}>{n}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 3, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* ── Auth Form ────────────────────────────────────── */
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Background dark />
      <div className="auth-split" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

        {/* Left branding panel */}
        <div className="auth-left" style={{ padding: '60px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', animation: 'slideRight 0.6s ease' }}>
          <div>
            <button onClick={() => { setScreen('landing'); setErr(''); setForm({ name: '', email: '', password: '', confirm: '' }); }} style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 50, padding: '8px 18px', cursor: 'pointer', color: 'rgba(255,255,255,0.78)', fontSize: 13, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, marginBottom: 52 }}>← Back</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <div style={{ width: 52, height: 52, borderRadius: 18, background: 'linear-gradient(135deg,#a8e6cf,#4a9e7f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, animation: 'glow 2.5s infinite' }}>🌿</div>
              <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: '#fff', fontWeight: 400 }}>MindMate</span>
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(30px,4vw,52px)', color: '#fff', lineHeight: 1.15, marginBottom: 16, fontWeight: 400 }}>
              {isLogin ? <>Welcome<br /><em>back 🌿</em></> : <>Begin your<br /><em>wellness journey</em></>}
            </h2>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 340 }}>
              {isLogin ? 'We kept your peaceful space warm. Sign in and continue where you left off.' : 'Thousands have found calm and clarity here. Your journey starts with a single step.'}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[['🌿','Track your mood daily','Reflect and grow'],['🧘','Analyze stress levels','Get personalized tips'],['💬','Chat with AI companion','24/7 support'],['🤝','Connect with therapists','Real professional care']].map(([ic, title, sub], i) => (
              <div key={title} style={{ display: 'flex', gap: 14, alignItems: 'center', animation: `fadeUp 0.5s ${i * 0.1}s ease both`, opacity: 0, animationFillMode: 'forwards' }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.13)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: '1px solid rgba(255,255,255,0.18)' }}>{ic}</div>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: '#fff' }}>{title}</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form panel */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 52px 40px 24px' }}>
          <div style={{ width: '100%', maxWidth: 440, background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(28px)', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 32, padding: '42px 38px', boxShadow: '0 20px 60px rgba(0,0,0,0.25)', animation: shaking ? 'shake 0.5s ease' : 'slideLeft 0.5s ease' }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '28px 0', animation: 'popIn 0.5s ease' }}>
                <div style={{ fontSize: 72, marginBottom: 20, animation: 'heartbeat 1.2s ease infinite' }}>🎉</div>
                <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 30, color: '#fff', marginBottom: 10 }}>{isLogin ? 'Welcome back!' : "You're in!"}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>Preparing your peaceful space... 🌿</div>
                <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 34, height: 34, border: '3px solid rgba(255,255,255,0.25)', borderTopColor: '#a8e6cf', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                </div>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 26 }}>
                  <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: '#fff', marginBottom: 6, fontWeight: 400 }}>{isLogin ? 'Sign in' : 'Create account'}</h3>
                  <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.48)' }}>{isLogin ? 'Enter your credentials to continue' : "Fill in the details — it's free"}</p>
                </div>

                {/* Social buttons */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                  {[['🌐', 'Google'], ['🍎', 'Apple']].map(([ic, lb]) => (
                    <button key={lb} style={{ flex: 1, padding: '11px 0', borderRadius: 13, border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.09)', cursor: 'pointer', color: 'rgba(255,255,255,0.82)', fontSize: 13, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700 }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}>
                      {ic} {lb}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.14)' }} />
                  <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.38)', fontWeight: 700, letterSpacing: '0.5px' }}>OR CONTINUE WITH EMAIL</span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.14)' }} />
                </div>

                {err && (
                  <div style={{ background: 'rgba(220,60,60,0.14)', border: '1px solid rgba(220,60,60,0.38)', borderRadius: 12, padding: '11px 16px', marginBottom: 16, fontSize: 13, color: '#ffaaaa', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600 }}>
                    ⚠ {err}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                  {!isLogin && (
                    <div>
                      <label style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', display: 'block', marginBottom: 6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Full Name</label>
                      <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Alex Chen" style={inp()}
                        onFocus={e => e.target.style.borderColor = 'rgba(168,230,207,0.7)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.35)'}
                      />
                    </div>
                  )}
                  <div>
                    <label style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', display: 'block', marginBottom: 6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Email</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" style={inp()}
                      onFocus={e => e.target.style.borderColor = 'rgba(168,230,207,0.7)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.35)'}
                      onKeyDown={e => e.key === 'Enter' && submit()}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', display: 'block', marginBottom: 6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                      <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)} placeholder={isLogin ? 'Your password' : 'At least 6 characters'} style={inp({ paddingRight: 46 })}
                        onFocus={e => e.target.style.borderColor = 'rgba(168,230,207,0.7)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.35)'}
                        onKeyDown={e => e.key === 'Enter' && submit()}
                      />
                      <button onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, color: 'rgba(255,255,255,0.45)' }}>{showPw ? '🙈' : '👁'}</button>
                    </div>
                    {!isLogin && form.password && (
                      <div style={{ marginTop: 7 }}>
                        <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                          {[1, 2, 3, 4].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, background: i <= pwStrength ? strCol : 'rgba(255,255,255,0.14)', transition: 'all 0.3s' }} />)}
                        </div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.42)' }}>{['', 'Weak', 'Fair', 'Good', 'Strong'][pwStrength]} password</div>
                      </div>
                    )}
                  </div>
                  {!isLogin && (
                    <div>
                      <label style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', display: 'block', marginBottom: 6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Confirm Password</label>
                      <input type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)} placeholder="Repeat your password"
                        style={inp({ borderColor: form.confirm && form.confirm !== form.password ? 'rgba(220,80,80,0.55)' : form.confirm ? 'rgba(168,230,207,0.55)' : 'rgba(255,255,255,0.35)' })}
                        onKeyDown={e => e.key === 'Enter' && submit()}
                      />
                      {form.confirm && form.confirm === form.password && <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: '#a8e6cf', marginTop: 5, fontWeight: 700 }}>✓ Passwords match</div>}
                    </div>
                  )}
                </div>

                {isLogin && <div style={{ textAlign: 'right', marginTop: 8 }}><span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: 'rgba(168,230,207,0.85)', cursor: 'pointer', fontWeight: 700 }}>Forgot password?</span></div>}

                <button onClick={submit} disabled={loading} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 16, width: '100%', marginTop: 22, padding: '15px', borderRadius: 50, border: 'none', cursor: loading ? 'default' : 'pointer', background: loading ? 'rgba(255,255,255,0.16)' : 'linear-gradient(135deg,#4a9e7f,#3a7bd5)', color: '#fff', boxShadow: loading ? 'none' : '0 4px 22px rgba(74,158,127,0.4)', opacity: loading ? 0.75 : 1, transition: 'all 0.25s' }}>
                  {loading
                    ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}><span style={{ width: 17, height: 17, border: '2.5px solid rgba(255,255,255,0.28)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />Just a moment...</span>
                    : isLogin ? '🌿 Sign In to MindMate' : '🌱 Create My Account'}
                </button>

                {!isLogin && <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.34)', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>By signing up you agree to our <span style={{ color: 'rgba(168,230,207,0.7)', cursor: 'pointer' }}>Terms</span> & <span style={{ color: 'rgba(168,230,207,0.7)', cursor: 'pointer' }}>Privacy Policy</span></p>}

                <div style={{ textAlign: 'center', marginTop: 18, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.43)' }}>
                  {isLogin ? 'New to MindMate? ' : 'Already have an account? '}
                  <span onClick={() => { setScreen(isLogin ? 'signup' : 'login'); setErr(''); setForm({ name: '', email: '', password: '', confirm: '' }); }} style={{ color: 'rgba(168,230,207,0.9)', fontWeight: 800, cursor: 'pointer' }}>
                    {isLogin ? 'Sign up free →' : 'Sign in →'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
