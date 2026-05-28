import { useState, useEffect } from 'react';

/* ── Floating particle component ─────────────────────────── */
const Particle = ({ style }) => (
  <div className="auth-particle" style={style} />
);

/* ── Animated SVG constellation lines ───────────────────── */
const ConstellationLines = () => (
  <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.18 }}>
    <line x1="15%" y1="20%" x2="40%" y2="45%" stroke="#a78bfa" strokeWidth="0.8" />
    <line x1="40%" y1="45%" x2="70%" y2="25%" stroke="#a78bfa" strokeWidth="0.8" />
    <line x1="70%" y1="25%" x2="85%" y2="60%" stroke="#60a5fa" strokeWidth="0.8" />
    <line x1="85%" y1="60%" x2="55%" y2="80%" stroke="#60a5fa" strokeWidth="0.8" />
    <line x1="55%" y1="80%" x2="20%" y2="70%" stroke="#a78bfa" strokeWidth="0.8" />
    <line x1="20%" y1="70%" x2="40%" y2="45%" stroke="#a78bfa" strokeWidth="0.8" />
    <circle cx="40%" cy="45%" r="2.5" fill="#a78bfa" />
    <circle cx="70%" cy="25%" r="2"   fill="#60a5fa" />
    <circle cx="85%" cy="60%" r="2"   fill="#60a5fa" />
    <circle cx="55%" cy="80%" r="2.5" fill="#a78bfa" />
    <circle cx="20%" cy="70%" r="2"   fill="#a78bfa" />
    <circle cx="15%" cy="20%" r="3"   fill="#c4b5fd" />
  </svg>
);

/* ── Features listed on left hero panel ─────────────────── */
const HERO_FEATURES = [
  { icon: 'rocket_launch',  label: 'Track every application in one place' },
  { icon: 'view_kanban',    label: 'Visual drag-and-drop pipeline board'   },
  { icon: 'analytics',      label: 'Real-time insights & career analytics' },
  { icon: 'notifications',  label: 'Never miss a deadline or follow-up'    },
];

/* ── Pre-generated stable particle configurations at file scope (avoids Math.random inside component render/useMemo) ── */
const STATIC_PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id:       i,
  left:     `${Math.random() * 100}%`,
  top:      `${Math.random() * 100}%`,
  size:     `${2 + Math.random() * 3}px`,
  delay:    `${Math.random() * 6}s`,
  duration: `${5 + Math.random() * 8}s`,
  opacity:  0.2 + Math.random() * 0.5,
}));

/* ── Main Auth Component ─────────────────────────────────── */
const Auth = ({ onAuthSuccess, isDark, setIsDark }) => {
  const [isLogin,   setIsLogin]   = useState(true);
  const [formData,  setFormData]  = useState({ name: '', email: '', password: '' });
  const [showPass,  setShowPass]  = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [focused,   setFocused]   = useState('');
  const particles = STATIC_PARTICLES;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  /* Toggle between Sign-In / Sign-Up with flip animation */
  const toggleMode = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setIsLogin(v => !v);
      setFormData({ name: '', email: '', password: '' });
      setFocused('');
      setAnimating(false);
    }, 320);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess();
    }, 1400);
  };

  return (
    <div
      id="auth-page"
      className={`auth-root ${mounted ? 'auth-root--visible' : ''}`}
    >
      {/* ── Theme Switcher Button ──────────────────────────── */}
      {setIsDark && (
        <button
          type="button"
          onClick={() => setIsDark(!isDark)}
          className="fixed top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center border border-slate-200/25 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:scale-105 active:scale-95 transition-all duration-300 z-50 cursor-pointer shadow-lg hover:border-violet-500/50"
          title="Toggle theme"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      )}

      {/* ── Floating particles ───────────────────────────── */}
      {particles.map(p => (
        <Particle key={p.id} style={{
          left:            p.left,
          top:             p.top,
          width:           p.size,
          height:          p.size,
          opacity:         p.opacity,
          animationDelay:  p.delay,
          animationDuration: p.duration,
        }} />
      ))}

      {/* ── Big background orbs ──────────────────────────── */}
      <div className="auth-orb auth-orb--violet" />
      <div className="auth-orb auth-orb--blue"   />
      <div className="auth-orb auth-orb--cyan"   />

      {/* ═══════════════════════════════════════════════════
          SPLIT LAYOUT  |  hero panel  +  form panel
          ═══════════════════════════════════════════════════ */}
      <div className="auth-card">

        {/* ── LEFT HERO PANEL (hidden on mobile) ────────── */}
        <div className="auth-hero">
          <ConstellationLines />

          {/* Spinning ring decorations */}
          <div className="auth-ring auth-ring--1" />
          <div className="auth-ring auth-ring--2" />

          <div className="auth-hero__content">
            {/* Logo mark */}
            <div className="auth-logo-wrap">
              <img
                src="/logo.png"
                alt="InternFlow Logo"
                style={{ width: 52, height: 52, objectFit: 'contain' }}
              />
              <div className="auth-logo-glow" />
            </div>

            <h1 className="auth-hero__title">
              Your Career,<br />
              <span className="gradient-text">Piloted.</span>
            </h1>
            <p className="auth-hero__sub">
              InternFlow helps you land your dream internship with an intelligent, beautifully organised tracking dashboard.
            </p>

            {/* Feature list */}
            <ul className="auth-features">
              {HERO_FEATURES.map((f, i) => (
                <li key={f.icon} className="auth-feature-item" style={{ animationDelay: `${0.6 + i * 0.12}s` }}>
                  <span className="auth-feature-icon material-symbols-outlined">{f.icon}</span>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>

            {/* Decorative stat chips */}
            <div className="auth-stats">
              <div className="auth-stat-chip">
                <span className="auth-stat-chip__num">10k+</span>
                <span className="auth-stat-chip__label">Students</span>
              </div>
              <div className="auth-stat-chip">
                <span className="auth-stat-chip__num">98%</span>
                <span className="auth-stat-chip__label">Success Rate</span>
              </div>
              <div className="auth-stat-chip">
                <span className="auth-stat-chip__num">4.9★</span>
                <span className="auth-stat-chip__label">Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT FORM PANEL ──────────────────────────── */}
        <div className="auth-form-panel">
          {/* Mode toggle tabs */}
          <div className="auth-tabs">
            <button
              type="button"
              onClick={() => { if (!isLogin) toggleMode(); }}
              className={`auth-tab ${isLogin ? 'auth-tab--active' : ''}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { if (isLogin) toggleMode(); }}
              className={`auth-tab ${!isLogin ? 'auth-tab--active' : ''}`}
            >
              Sign Up
            </button>
            {/* sliding pill indicator */}
            <div className={`auth-tab-pill ${isLogin ? 'auth-tab-pill--left' : 'auth-tab-pill--right'}`} />
          </div>

          {/* Form wrapper with flip animation */}
          <div className={`auth-form-wrap ${animating ? 'auth-form-wrap--exit' : 'auth-form-wrap--enter'}`}>
            <div className="auth-form-header">
              <h2 className="auth-form-title">
                {isLogin ? 'Welcome back 👋' : 'Create account 🚀'}
              </h2>
              <p className="auth-form-sub">
                {isLogin
                  ? 'Sign in to continue to your dashboard'
                  : 'Join thousands of students tracking smarter'}
              </p>
              {/* Inline mode toggle */}
              <p className="auth-inline-toggle">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                {' '}
                <button type="button" onClick={toggleMode} className="auth-inline-toggle__btn">
                  {isLogin ? 'Sign up free →' : '← Sign in'}
                </button>
              </p>
            </div>

            {/* Social sign-in row */}
            <div className="auth-social-row">
              <button type="button" className="auth-social-btn" title="Continue with Google">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              <button type="button" className="auth-social-btn" title="Continue with GitHub">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                Continue with GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="auth-divider">
              <span className="auth-divider__line" />
              <span className="auth-divider__text">or continue with email</span>
              <span className="auth-divider__line" />
            </div>

            {/* Email / password form */}
            <form onSubmit={handleSubmit} className="auth-inputs">
              {!isLogin && (
                <div className={`auth-field ${focused === 'name' ? 'auth-field--focused' : ''}`}>
                  <label className="auth-field__label">Full Name</label>
                  <div className="auth-field__wrap">
                    <span className="material-symbols-outlined auth-field__icon">person</span>
                    <input
                      id="auth-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused('')}
                      placeholder="John Doe"
                      required={!isLogin}
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              <div className={`auth-field ${focused === 'email' ? 'auth-field--focused' : ''}`}>
                <label className="auth-field__label">Email Address</label>
                <div className="auth-field__wrap">
                  <span className="material-symbols-outlined auth-field__icon">mail</span>
                  <input
                    id="auth-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className={`auth-field ${focused === 'password' ? 'auth-field--focused' : ''}`}>
                <div className="auth-field__labelrow">
                  <label className="auth-field__label">Password</label>
                  {isLogin && (
                    <a href="#" className="auth-forgot">Forgot password?</a>
                  )}
                </div>
                <div className="auth-field__wrap">
                  <span className="material-symbols-outlined auth-field__icon">lock</span>
                  <input
                    id="auth-password"
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused('')}
                    placeholder={isLogin ? '••••••••' : 'Min. 8 characters'}
                    required
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                  />
                  <button
                    type="button"
                    className="auth-field__eye"
                    onClick={() => setShowPass(v => !v)}
                    tabIndex={-1}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                      {showPass ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {/* Password strength bar (only on signup) */}
                {!isLogin && formData.password.length > 0 && (
                  <div className="auth-strength">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={`strength-${i}`}
                        className="auth-strength__bar"
                        style={{
                          background: i < Math.min(Math.ceil(formData.password.length / 3), 4)
                            ? formData.password.length < 6  ? '#f43f5e'
                            : formData.password.length < 10 ? '#f59e0b'
                            : '#10b981'
                            : undefined
                        }}
                      />
                    ))}
                    <span className="auth-strength__label">
                      {formData.password.length < 6  ? 'Weak'
                       : formData.password.length < 10 ? 'Fair'
                       : 'Strong'}
                    </span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                id="auth-submit"
                disabled={isLoading}
                className="auth-cta-btn"
              >
                {isLoading ? (
                  <span className="auth-spinner" />
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In to Dashboard' : 'Create my Account'}</span>
                    <span className="material-symbols-outlined auth-cta-arrow">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer toggle */}
            <p className="auth-form-footer">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button type="button" onClick={toggleMode} className="auth-toggle-link">
                {isLogin ? 'Sign up free' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
