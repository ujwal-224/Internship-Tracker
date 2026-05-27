import React, { useState } from 'react';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network request and auth check
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess();
    }, 1200);
  };

  return (
    <div className="flex-1 w-full h-screen flex items-center justify-center bg-slate-50/50 dark:bg-slate-950/50 relative overflow-hidden page-fade-in">
      {/* Background Decorative Orbs */}
      <div className="absolute top-[20%] left-[20%] w-64 h-64 bg-violet-500/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[20%] right-[20%] w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="glass-card w-full max-w-md p-8 relative z-10 mx-4" style={{ borderRadius: '24px' }}>
        
        {/* Header Section */}
        <div className="text-center mb-8 stagger-children">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/30">
            <span className="material-symbols-outlined text-white text-3xl">rocket_launch</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {isLogin ? 'Enter your details to access your dashboard.' : 'Start tracking your applications seamlessly.'}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 stagger-children">
          
          {!isLogin && (
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">person</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required={!isLogin}
                className="input-field w-full pl-11 pr-4 py-3 text-sm font-medium"
              />
            </div>
          )}

          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">mail</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="input-field w-full pl-11 pr-4 py-3 text-sm font-medium"
            />
          </div>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="input-field w-full pl-11 pr-4 py-3 text-sm font-medium"
            />
          </div>

          {isLogin && (
            <div className="flex justify-end mt-[-8px]">
              <a href="#" className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-3.5 mt-2 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
              <>
                <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 stagger-children">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={toggleMode}
            className="font-semibold text-violet-600 dark:text-violet-400 hover:underline"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
