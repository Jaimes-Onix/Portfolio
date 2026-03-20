import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import ParticleName3D from './ParticleName3D';

const FULL_NAME = "Jaimes Edward J. Cabante";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  
  // States for Particle Text
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [isNameDone, setIsNameDone] = useState(false);

  // Trigger the text collapse after the text is fully revealed and read (+3s wait)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCollapsing(true);
    }, 4000); // 4 seconds before explosion
    return () => clearTimeout(timer);
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
          setTimeout(() => setIsExiting(true), 1500); // Wait for collapse to finish
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isExiting, onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#050505] flex items-center justify-center pointer-events-auto">
      
      {/* 3D Background & Particle Name */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={isExiting ? { scale: 3, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <fog attach="fog" args={['#050505', 5, 40]} />
          <ParticleName3D 
             text={FULL_NAME} 
             isCollapsing={isCollapsing} 
             onCollapseComplete={() => setIsNameDone(true)} 
          />
        </Canvas>
      </motion.div>

      <AnimatePresence>
        {!isExiting && (
          <motion.div
            key="loading-content"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.1,
              filter: "blur(20px)",
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            className="w-full max-w-2xl px-8 flex flex-col items-center justify-center relative z-10 h-full pointer-events-none"
          >
            <motion.div
              key="loading-inner"
              initial={{ opacity: 0 }}
              animate={isGlitching ? {
                  x: [0, -5, 5, -2, 2, 0],
                  y: [0, 2, -2, 1, -1, 0],
                  filter: ['none', 'hue-rotate(90deg) blur(2px)', 'none'],
                  transition: { duration: 0.2, repeat: Infinity }
              } : { opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
              className="text-center px-4 flex flex-col items-center w-full h-full justify-center pt-32" 
            >
              {/* The PT-32 pushes the subtitle down below the dead center where the 3D text is */}
              
              {!isNameDone ? (
                <>
                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }} // Appears after particles form
                    className="text-sm md:text-xl text-neutral-500 uppercase tracking-[0.6em] font-black mt-20 mb-8"
                  >
                    Full stack developer
                  </motion.p>
                </>
              ) : (
                <div className="h-24 md:h-32 flex items-center justify-center mb-12 mt-20">
                  <div className="loader-wrapper opacity-50">
                      <div className="loader-circle border-t-[#00E5FF]"></div>
                      <div className="loader-circle border-r-[#00E5FF]"></div>
                      <div className="loader-circle border-b-[#00E5FF]"></div>
                  </div>
                </div>
              )}

              {/* Progress bar */}
              <div className="w-64 md:w-[400px] h-[3px] bg-white/5 rounded-full mx-auto overflow-hidden relative mt-auto mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="absolute inset-y-0 left-0 bg-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.8)]"
                />
              </div>

              <p className="mb-12 text-[10px] text-[#00E5FF] font-black tracking-widest uppercase opacity-70">
                Synchronizing Particles... {Math.round(progress)}%
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingScreen;

