import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroTextOverlays = () => {
  const { scrollYProgress } = useScroll();

  // Animations grouped by scroll zones
  // Zone 1: 0 - 0.25 (Intro)
  // Zone 2: 0.25 - 0.5 (Details)
  // Zone 3: 0.5 - 0.75 (CTA)
  // Zone 4: 0.75 - 1.0 (Outro/Transition)

  // Top Left: Name / Brand
  const tlOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [1, 1, 0.5, 0]);
  const tlY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  // Top Right: Subheadline
  const trOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const trX = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [40, 0, 0, 40]);

  // Bottom Left: Microcopy / Values
  const blOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  const blY = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [40, 0, 0, 40]);

  // Bottom Right: CTA
  const brOpacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const brScale = useTransform(scrollYProgress, [0.75, 0.85], [0.8, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 mix-blend-difference">
      <div className="relative w-full h-full max-w-7xl mx-auto px-8 py-16">
        
        {/* TOP LEFT: Brand/Name */}
        <motion.div 
          style={{ opacity: tlOpacity, y: tlY }}
          className="absolute top-16 left-8 md:top-24 md:left-12"
        >
          <div className="flex flex-col">
            <span className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-black mb-2">Architecting The Web</span>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none italic uppercase">
              JAIMES<br />EDWARD<span className="text-[#00d2ff]">.</span>
            </h2>
          </div>
        </motion.div>

        {/* TOP RIGHT: Role/Details */}
        <motion.div 
          style={{ opacity: trOpacity, x: trX }}
          className="absolute top-16 right-8 md:top-24 md:right-12 text-right max-w-xs"
        >
          <div className="glass px-6 py-4 rounded-2xl border-white/5">
            <h3 className="text-white text-lg md:text-xl font-bold mb-2 uppercase tracking-tight">Full-Stack Developer</h3>
            <p className="text-white/50 text-[11px] leading-relaxed tracking-wide font-medium">
              Hybrid-electric performance · AI-driven architectures · Immersive digital craft.
            </p>
          </div>
        </motion.div>

        {/* BOTTOM LEFT: Microcopy */}
        <motion.div 
          style={{ opacity: blOpacity, y: blY }}
          className="absolute bottom-16 left-8 md:bottom-24 md:left-12 max-w-sm"
        >
          <div className="flex flex-col gap-4">
            <div className="w-12 h-1 bg-[#00d2ff] rounded-full" />
            <p className="text-white font-black text-2xl md:text-4xl tracking-tighter leading-[0.9] uppercase italic">
              "Building Software That<br />Feels Like Magic."
            </p>
            <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] max-w-[240px]">
              Available for high-stakes digital transformations and creative engineering.
            </p>
          </div>
        </motion.div>

        {/* BOTTOM RIGHT: CTA */}
        <motion.div 
          style={{ opacity: brOpacity, scale: brScale }}
          className="absolute bottom-16 right-8 md:bottom-24 md:right-12 flex flex-col items-end gap-6 pointer-events-auto"
        >
          <div className="text-right">
             <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Mission Directive</span>
             <h4 className="text-white text-xl md:text-3xl font-black italic uppercase tracking-tighter leading-none">Enter The Ecosystem</h4>
          </div>
          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 rounded-full bg-white text-black font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-4 transition-all hover:bg-[#00d2ff]"
          >
            Explore Projects
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroTextOverlays;
