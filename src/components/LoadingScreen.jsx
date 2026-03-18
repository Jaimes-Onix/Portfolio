import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// Predefined polygon shards for a more "shattered" look
const SHARD_POLYGONS = [
  "polygon(0% 0%, 25% 0%, 15% 30%, 0% 15%)",
  "polygon(25% 0%, 50% 0%, 60% 25%, 35% 35%, 15% 30%)",
  "polygon(50% 0%, 80% 0%, 85% 20%, 60% 25%)",
  "polygon(80% 0%, 100% 0%, 100% 20%, 85% 20%)",
  "polygon(0% 15%, 15% 30%, 10% 50%, 0% 45%)",
  "polygon(10% 50%, 35% 35%, 45% 60%, 20% 70%)",
  "polygon(35% 35%, 60% 25%, 70% 50%, 45% 60%)",
  "polygon(60% 25%, 85% 20%, 100% 20%, 100% 45%, 70% 50%)",
  "polygon(0% 45%, 10% 50%, 20% 70%, 0% 80%)",
  "polygon(20% 70%, 45% 60%, 55% 85%, 30% 95%)",
  "polygon(45% 60%, 70% 50%, 80% 75%, 55% 85%)",
  "polygon(70% 50%, 100% 45%, 100% 70%, 80% 75%)",
  "polygon(0% 80%, 20% 70%, 30% 95%, 0% 100%)",
  "polygon(30% 95%, 55% 85%, 65% 100%, 0% 100%)",
  "polygon(55% 85%, 80% 75%, 90% 100%, 65% 100%)",
  "polygon(80% 75%, 100% 70%, 100% 100%, 90% 100%)",
];

const FULL_NAME = "Jaimes Edward J. Cabante";
const TYPE_SPEED   = 85;    // base ms per character (typing)
const ERASE_SPEED  = 38;    // base ms per character (erasing)
const PAUSE_AFTER_TYPE = 1100; // ms to hold before erasing

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isShattering, setIsShattering] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isNameDone, setIsNameDone] = useState(false);

  // Typewriter state
  const [displayedText, setDisplayedText] = useState('');
  const typeStateRef = useRef({ phase: 'typing', charIndex: 0 });
  const lastTickRef   = useRef(null);
  const rafRef        = useRef(null);

  // Smooth typewriter via requestAnimationFrame
  useEffect(() => {
    // Natural per-character delay variance (±20ms) for a real-typing feel
    const variance = () => (Math.random() - 0.5) * 40;

    const getDelay = () => {
      const { phase } = typeStateRef.current;
      if (phase === 'typing')   return TYPE_SPEED  + variance();
      if (phase === 'erasing')  return ERASE_SPEED + variance();
      if (phase === 'pausing')  return PAUSE_AFTER_TYPE;
      return 0;
    };

    const tick = (timestamp) => {
      if (!lastTickRef.current) lastTickRef.current = timestamp;
      const elapsed = timestamp - lastTickRef.current;
      const delay   = getDelay();

      if (elapsed < delay) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      lastTickRef.current = timestamp;
      const state = typeStateRef.current;

      if (state.phase === 'typing') {
        if (state.charIndex < FULL_NAME.length) {
          state.charIndex += 1;
          setDisplayedText(FULL_NAME.slice(0, state.charIndex));
          rafRef.current = requestAnimationFrame(tick);
        } else {
          state.phase = 'pausing';
          lastTickRef.current = null;
          rafRef.current = requestAnimationFrame(tick);
        }
      } else if (state.phase === 'pausing') {
        state.phase = 'erasing';
        lastTickRef.current = null;
        rafRef.current = requestAnimationFrame(tick);
      } else if (state.phase === 'erasing') {
        if (state.charIndex > 0) {
          state.charIndex -= 1;
          setDisplayedText(FULL_NAME.slice(0, state.charIndex));
          rafRef.current = requestAnimationFrame(tick);
        } else {
          state.phase = 'done';
          setIsNameDone(true);
        }
      }
    };

    // Small initial delay before starting
    const startTimer = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, 400);

    return () => {
      clearTimeout(startTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Progress bar — 5 seconds
  useEffect(() => {
    const duration = 5000;
    const intervalTime = 50;
    const increment = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsGlitching(true);
          setTimeout(() => setIsShattering(true), 800);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isShattering) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isShattering, onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-black flex items-center justify-center pointer-events-auto">
      <AnimatePresence>
        {!isShattering ? (
          <motion.div
            key="loading-content"
            initial={{ opacity: 0 }}
            animate={isGlitching ? {
                x: [0, -5, 5, -2, 2, 0],
                y: [0, 2, -2, 1, -1, 0],
                filter: ['none', 'hue-rotate(90deg) blur(2px)', 'none'],
                transition: { duration: 0.2, repeat: Infinity }
            } : { opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            className="text-center px-4 flex flex-col items-center"
          >
            {!isNameDone ? (
              <>
                {/* Typewriter name */}
                <div className="h-16 md:h-20 flex items-center justify-center mb-2">
                  <motion.h1
                    className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-tight whitespace-nowrap"
                  >
                    {displayedText}
                  </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm md:text-xl text-neutral-500 uppercase tracking-[0.6em] font-black mb-16"
                >
                  Full stack developer
                </motion.p>
              </>
            ) : (
              <div className="h-24 md:h-32 flex items-center justify-center mb-12">
                <div className="loader-wrapper">
                    <div className="loader-circle"></div>
                    <div className="loader-circle"></div>
                    <div className="loader-circle"></div>
                    <div className="loader-shadow"></div>
                    <div className="loader-shadow"></div>
                    <div className="loader-shadow"></div>
                </div>
              </div>
            )}

            {/* Progress bar */}
            <div className="w-64 md:w-[400px] h-[3px] bg-white/5 rounded-full mx-auto overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute inset-y-0 left-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
              />
            </div>

            <p className="mt-6 text-[10px] text-neutral-600 font-black tracking-widest uppercase">
              Synchronizing Systems... {Math.round(progress)}%
            </p>
          </motion.div>
        ) : (
          <div className="absolute inset-0 pointer-events-none">
            {SHARD_POLYGONS.map((polygon, i) => (
              <motion.div
                key={i}
                initial={{
                  clipPath: polygon,
                  opacity: 1
                }}
                animate={{
                  y: 1200,
                  x: (Math.random() - 0.5) * 600,
                  rotate: (Math.random() - 0.5) * 360,
                  rotateX: (Math.random() - 0.5) * 360,
                  rotateY: (Math.random() - 0.5) * 360,
                  opacity: 0
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.33, 1, 0.68, 1],
                  delay: Math.random() * 0.4
                }}
                className="absolute inset-0 bg-black border border-white/10"
                style={{
                    zIndex: 100 - i,
                    boxShadow: 'inset 0 0 100px rgba(255,255,255,0.05)'
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingScreen;
