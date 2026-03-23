import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Frame list ──────────────────────────────────────────────────────
const TOTAL_FRAMES = 151;
const FRAME_URLS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const n = String(i + 1).padStart(3, '0');
  return `/Images/ezgif-frame-${n}.jpg`;
});

// ─── Stars (generated once) ──────────────────────────────────────────
const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  top:  Math.random() * 95,
  left: Math.random() * 100,
  s:    Math.random() * 0.45 + 0.1,
  dur:  2 + Math.random() * 4,
  del:  Math.random() * 6,
}));

// ─── LoadingScreen ───────────────────────────────────────────────────
const LoadingScreen = ({ onLoadingComplete }) => {
  const canvasRef    = useRef(null);
  const bitmapsRef   = useRef([]);
  const targetRef    = useRef(0);
  const currentRef   = useRef(0);
  const lastDrawnRef = useRef(-1);
  const rafRef       = useRef(null);
  const touchYRef    = useRef(0);
  const atEndRef     = useRef(false);

  const [loadPct, setLoadPct] = useState(0);
  const [loaded,  setLoaded]  = useState(false);
  const [atEnd,   setAtEnd]   = useState(false);
  const [phase,   setPhase]   = useState('loading');

  // ── Size the canvas at the panel's CSS pixel size × DPR ─────────
  const resizeCanvas = () => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    // Use the element's layout size (set by CSS), not the window
    const rect = c.getBoundingClientRect();
    c.width  = Math.round(rect.width  * dpr);
    c.height = Math.round(rect.height * dpr);
    lastDrawnRef.current = -1;
  };

  // ── Draw ─────────────────────────────────────────────────────────
  const drawBitmap = (idx) => {
    const c  = canvasRef.current;
    const bm = bitmapsRef.current[idx];
    if (!c || !bm) return;
    const ctx = c.getContext('2d', { alpha: false });
    const cw = c.width, ch = c.height;
    const bw = bm.width, bh = bm.height;
    const scale = Math.max(cw / bw, ch / bh);
    const dw = bw * scale, dh = bh * scale;
    ctx.drawImage(bm, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  };

  // ── RAF loop ─────────────────────────────────────────────────────
  const loop = () => {
    currentRef.current += (targetRef.current - currentRef.current) * 0.12;
    const idx = Math.min(Math.round(currentRef.current), TOTAL_FRAMES - 1);
    if (idx !== lastDrawnRef.current) {
      drawBitmap(idx);
      lastDrawnRef.current = idx;
    }
    const isEnd = currentRef.current >= TOTAL_FRAMES - 2;
    if (isEnd !== atEndRef.current) {
      atEndRef.current = isEnd;
      setAtEnd(isEnd);
    }
    rafRef.current = requestAnimationFrame(loop);
  };

  // ── Preload with createImageBitmap ───────────────────────────────
  useEffect(() => {
    let resolved = 0;
    const bitmaps = new Array(TOTAL_FRAMES);
    FRAME_URLS.forEach((url, i) => {
      fetch(url)
        .then(r => r.blob())
        .then(b => createImageBitmap(b))
        .then(bm => {
          bitmaps[i] = bm;
          resolved++;
          setLoadPct(Math.round((resolved / TOTAL_FRAMES) * 100));
          if (resolved === TOTAL_FRAMES) {
            bitmapsRef.current = bitmaps;
            setLoaded(true);
            setPhase('ready');
          }
        })
        .catch(() => { resolved++; });
    });
  }, []);

  // ── Start loop when loaded ────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    resizeCanvas();
    drawBitmap(0);
    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener('resize', resizeCanvas);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [loaded]);

  // ── Wheel / Touch ─────────────────────────────────────────────────
  const handleWheel = (e) => {
    e.preventDefault();
    targetRef.current = Math.max(0, Math.min(
      targetRef.current + e.deltaY * 0.05, TOTAL_FRAMES - 1
    ));
  };
  const handleTouchStart = (e) => { touchYRef.current = e.touches[0].clientY; };
  const handleTouchMove  = (e) => {
    e.preventDefault();
    const dy = (touchYRef.current - e.touches[0].clientY) * 0.3;
    touchYRef.current = e.touches[0].clientY;
    targetRef.current = Math.max(0, Math.min(targetRef.current + dy, TOTAL_FRAMES - 1));
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c || !loaded) return;
    c.addEventListener('wheel',      handleWheel,      { passive: false });
    c.addEventListener('touchstart', handleTouchStart, { passive: true  });
    c.addEventListener('touchmove',  handleTouchMove,  { passive: false });
    return () => {
      c.removeEventListener('wheel',      handleWheel);
      c.removeEventListener('touchstart', handleTouchStart);
      c.removeEventListener('touchmove',  handleTouchMove);
    };
  }, [loaded]);

  const handleEnter = () => {
    setPhase('entering');
    cancelAnimationFrame(rafRef.current);
    setTimeout(() => onLoadingComplete(), 1100);
  };

  return (
    <AnimatePresence>
      {phase !== 'entering' && (
        <motion.div
          key="ls"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(20px)',
                  transition: { duration: 1.1, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at 50% 55%, #141824 0%, #0a0c14 45%, #050608 100%)',
            touchAction: 'none', userSelect: 'none',
          }}
        >
          {/* ── Stars ── */}
          <div className="absolute inset-0 pointer-events-none">
            {STARS.map(s => (
              <motion.div key={s.id}
                className="absolute rounded-full bg-white"
                style={{ top: `${s.top}%`, left: `${s.left}%`, width: 1.5, height: 1.5, opacity: s.s }}
                animate={{ opacity: [s.s * 0.2, s.s, s.s * 0.2] }}
                transition={{ duration: s.dur, repeat: Infinity, delay: s.del }} />
            ))}
          </div>

          {/* ── Atmospheric glow ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-10 inset-x-0 h-[40%]"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(50,70,130,0.2) 0%, transparent 70%)', filter: 'blur(55px)' }} />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
              style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,210,255,0.06) 0%, transparent 65%)', filter: 'blur(40px)' }} />
          </div>

          {/* ── Headline ── */}
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

          {/* ── Frame Panel (constrained, not full-screen) ── */}
          <div className="relative z-10" style={{ width: '90vw', maxWidth: 860 }}>

            {/* ── Loading placeholder ── */}
            {!loaded && (
              <div className="flex flex-col items-center justify-center gap-5 py-20">
                <p className="text-white/40 text-xs font-mono tracking-[0.35em] uppercase">Loading…</p>
                <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg,#00d2ff,#9D00FF)' }}
                    animate={{ width: `${loadPct}%` }}
                    transition={{ ease: 'linear', duration: 0.1 }} />
                </div>
                <p className="text-[10px] text-white/20 font-mono tracking-widest">{loadPct}%</p>
              </div>
            )}

            {/* ── Canvas — sized at the panel, not the screen ── */}
            <canvas
              ref={canvasRef}
              style={{
                display:      loaded ? 'block' : 'none',
                width:        '100%',
                // 16:9 aspect ratio for the panel
                aspectRatio:  '16 / 9',
                borderRadius: 16,
                // subtle border + shadow for premium feel
                boxShadow:    '0 0 0 1px rgba(255,255,255,0.07), 0 24px 80px rgba(0,0,0,0.7)',
              }}
            />

            {/* Overlay gradient at bottom of panel for text readability */}
            {loaded && (
              <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                style={{ borderRadius: '0 0 16px 16px',
                         background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }} />
            )}
          </div>

          {/* ── Vertical progress bar (right side) ── */}
          {loaded && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center gap-2">
              <div className="w-[1.5px] h-24 bg-white/10 rounded-full overflow-hidden">
                <div style={{
                  width: '100%', borderRadius: 999,
                  background: 'linear-gradient(to bottom,#00d2ff,#9D00FF)',
                  height: `${(targetRef.current / (TOTAL_FRAMES - 1)) * 100}%`,
                  transition: 'height 0.08s linear',
                }} />
              </div>
            </div>
          )}

          {/* ── Bottom pill + Enter button ── */}
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
                      <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.1, repeat: Infinity }}>↓</motion.span>
                      Scroll to explore
                      <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.1, repeat: Infinity, delay: 0.2 }}>↓</motion.span>
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
