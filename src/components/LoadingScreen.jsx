import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Stars (generated once) ──────────────────────────────────────────
const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  top:  Math.random() * 95,
  left: Math.random() * 100,
  s:    Math.random() * 0.45 + 0.1,
  dur:  2 + Math.random() * 4,
  del:  Math.random() * 6,
}));

const LoadingScreen = ({ onLoadingComplete }) => {
  const [loadPct, setLoadPct] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadPct(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setLoaded(true);
          setPhase('ready');
          setTimeout(() => setAtEnd(true), 1200); 
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    setPhase('entering');
    setTimeout(() => onLoadingComplete(), 1100);
  };

  return (
    <AnimatePresence>
      {phase !== 'entering' && (
        <motion.div
          key="ls"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.04, 
            filter: 'blur(20px)',
            transition: { duration: 1.1, ease: 'easeInOut' } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at 50% 55%, #141824 0%, #0a0c14 45%, #050608 100%)',
            touchAction: 'none', userSelect: 'none',
          }}
        >
          {/* Spline Viewer Background */}
          <div className="absolute inset-0 z-0">
            <spline-viewer 
              url="https://prod.spline.design/8gJ8cPssxpm3TFsD/scene.splinecode" 
              style={{ width: '100%', height: '100%' }}
              events-target="global"
            />
          </div>

          {/* Stars */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {STARS.map(s => (
              <motion.div key={s.id}
                className="absolute rounded-full bg-white"
                style={{ top: `${s.top}%`, left: `${s.left}%`, width: 1.5, height: 1.5, opacity: s.s }}
                animate={{ opacity: [s.s * 0.2, s.s, s.s * 0.2] }}
                transition={{ duration: s.dur, repeat: Infinity, delay: s.del }} />
            ))}
          </div>

          {/* Atmospheric glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            <div className="absolute -top-10 inset-x-0 h-[40%]"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(50,70,130,0.2) 0%, transparent 70%)', filter: 'blur(55px)' }} />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
              style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,210,255,0.06) 0%, transparent 65%)', filter: 'blur(40px)' }} />
          </div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 text-center px-6 mb-6 text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight tracking-tight pointer-events-none"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.8)' }}
          >
            The future of the web,{' '}
            <span style={{ color: 'rgba(255,255,255,0.42)' }}>powered by imagination.</span>
          </motion.h1>

          {/* Loading Overlay */}
          <div className="relative z-10" style={{ width: '90vw', maxWidth: 860 }}>
            {!loaded && (
              <div className="flex flex-col items-center justify-center gap-5 py-20">
                <p className="text-white/40 text-xs font-mono tracking-[0.35em] uppercase">Initializing Engine…</p>
                <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg,#00d2ff,#9D00FF)' }}
                    animate={{ width: `${loadPct}%` }}
                    transition={{ ease: 'linear', duration: 0.1 }} />
                </div>
                <p className="text-[10px] text-white/20 font-mono tracking-widest">{loadPct}%</p>
              </div>
            )}
          </div>

          {/* Footer UI + Enter Button */}
          {loaded && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 flex flex-col items-center gap-4 mt-6 px-6"
            >
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 999, padding: '13px 30px', textAlign: 'center', minWidth: 240,
              }}>
                <AnimatePresence mode="wait">
                  {!atEnd ? (
                    <motion.div key="hint"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-3 text-white/55 text-sm font-medium tracking-wide"
                    >
                      Syncing Neural Interface...
                    </motion.div>
                  ) : (
                    <motion.p key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-white/65 text-sm tracking-wide font-medium">
                      Full-Stack Developer · UI/UX · Creative Engineering
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {atEnd && (
                  <motion.button
                    key="btn"
                    initial={{ opacity: 0, y: 10, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    onClick={handleEnter}
                    className="group relative overflow-hidden cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 999, padding: '13px 44px',
                      color: 'white', fontSize: 12, fontWeight: 700,
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                    }}
                  >
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[999px]"
                      style={{ background: 'linear-gradient(135deg,rgba(0,210,255,0.18),rgba(157,0,255,0.18))' }} />
                    <span className="relative z-10 flex items-center gap-3">
                      Enter Portfolio
                      <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>→</motion.span>
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;




