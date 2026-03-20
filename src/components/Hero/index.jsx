import React from 'react';
import HeroCanvas from './HeroCanvas';
import HeroTextOverlays from './HeroTextOverlays';
import '../../styles/hero.css';

const Hero = () => {
  return (
    <div id="home" className="relative h-[400vh] bg-[#001827]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroCanvas />
        <HeroTextOverlays />
        
        {/* Persistent Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20 z-30">
           <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white">Scroll</span>
           <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
