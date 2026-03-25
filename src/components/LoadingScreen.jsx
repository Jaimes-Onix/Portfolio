import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [showContent, setShowContent] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Show UI content after a short delay to allow Spline to initialize
    const timer = setTimeout(() => setShowContent(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => onLoadingComplete(), 1100);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05, 
            filter: 'blur(20px)',
            transition: { duration: 1.1, ease: 'easeInOut' } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between py-16 md:py-24 overflow-hidden bg-black"
        >
          {/* Spline Viewer Background */}
          <div className="absolute inset-0 z-0">
            <spline-viewer 
              url="https://prod.spline.design/8gJ8cPssxpm3TFsD/scene.splinecode" 
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Top Text Overlay */}
          <div className="relative z-10 px-6 text-center">
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none">
                    Hi! Welcome to my <span className="text-gradient">Portfolio</span>
                  </h1>
                  <p className="mt-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/40">
                    Creative Developer · UI Designer · Technical Artist
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Button Overlay */}
          <div className="relative z-10 px-6">
            <AnimatePresence>
              {showContent && (
                <motion.button
                  key="enter-btn"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                  onClick={handleEnter}
                  className="group relative px-10 py-4 rounded-full bg-white text-black font-black tracking-[0.2em] uppercase text-[10px] hover:bg-neutral-200 transition-all active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.15)]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Enter Portfolio
                    <motion.span 
                      animate={{ x: [0, 5, 0] }} 
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;



