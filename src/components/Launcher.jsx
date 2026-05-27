import { useEffect } from 'react';

function Launcher() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.hash = '#/dashboard';
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-slate-950 h-screen w-screen flex flex-col items-center justify-center m-0 overflow-hidden text-slate-100 relative">
      {/* Dynamic Keyframes Injection */}
      <style>{`
        @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.5; }
            100% { transform: scale(1.5); opacity: 0; }
        }
        
        .animate-pulse-ring {
            animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }

        .glass-panel-launcher {
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        @keyframes loadingBar {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        
        .animate-loading-bar {
            animation: loadingBar 0.8s ease-out forwards;
        }
      `}</style>

      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="glass-panel-launcher p-10 rounded-3xl flex flex-col items-center justify-center shadow-2xl relative z-10 w-80">
        {/* Logo Container with Pulse */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-xl bg-violet-500 animate-pulse-ring"></div>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/40 relative z-10">
            <svg className="w-8 h-8 text-white translate-x-px translate-y-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-2 tracking-tight">InternFlow</h1>
        
        {/* Loading Bar */}
        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-4 overflow-hidden relative">
          <div className="bg-gradient-to-r from-violet-500 to-blue-500 h-1.5 rounded-full absolute left-0 top-0 w-1/2 animate-loading-bar"></div>
        </div>
        <p className="text-slate-400 mt-4 text-xs font-semibold tracking-wider uppercase">Initializing Workspace...</p>
      </div>
    </div>
  );
}

export default Launcher;
