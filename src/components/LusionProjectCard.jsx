import React, { useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const LusionProjectCard = ({ project, index, scrollYProgress, total }) => {
  // Define the entry, active, and exit points for each card based on its index
  const start = index / total;
  const end = (index + 1) / total;
  
  // Custom range for more fluid overlapping transitions
  // They start scaling up slightly before their "active" slot
  // and scale out slightly after.
  const scale = useTransform(
    scrollYProgress, 
    [start - 0.2, start, end, end + 0.2], 
    [0.7, 1, 1, 1.8]
  );
  
  const opacity = useTransform(
    scrollYProgress, 
    [start - 0.15, start, end - 0.1, end], 
    [0, 1, 1, 0]
  );

  const blur = useTransform(
    scrollYProgress,
    [start - 0.2, start, end, end + 0.2],
    ["10px", "0px", "0px", "20px"]
  );

  const translateZ = useTransform(
    scrollYProgress,
    [start - 0.2, start, end, end + 0.2],
    ["-200px", "0px", "0px", "400px"]
  );

  // Subtle title parralax
  const titleY = useTransform(
    scrollYProgress,
    [start, end],
    ["20%", "-20%"]
  );

  return (
    <motion.div 
      style={{ 
        scale, 
        opacity,
        filter: `blur(${blur})`,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        zIndex: total - index
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <motion.div 
        style={{ translateZ }}
        className="relative w-full h-full p-4 md:p-20 overflow-hidden pointer-events-auto"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-60 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center, transparent 0%, rgba(0,0,0,0.4) 100%)" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto pb-20 md:pb-32">
          <motion.div style={{ y: titleY }}>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 italic">Project_0{index + 1} // Build_2026</span>
              <div className="h-px w-20 bg-white/10" />
            </div>

            <h2 className="text-5xl md:text-7xl lg:text-[7vw] font-black tracking-tighter leading-[0.85] text-white uppercase italic mb-8 max-w-5xl">
              {project.title.split(' ')[0]}<br />
              {project.title.split(' ').slice(1).length > 0 && (
                <span className="text-[#00d2ff] mt-2 block">
                  {project.title.split(' ').slice(1).join(' ')}
                </span>
              )}
            </h2>

            <div className="flex flex-col md:flex-row items-end justify-between gap-12">
              <div className="max-w-xl">
                <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8 font-medium">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-full glass border-white/10 text-[9px] font-black uppercase tracking-widest text-white/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button className="group flex items-center gap-6 text-xl font-black italic text-white/30 hover:text-white transition-all">
                EXPLORE_DETAILS
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center group-hover:bg-[#00d2ff] group-hover:text-black transition-all group-hover:rotate-45 shadow-[0_0_20px_rgba(0,210,255,0.2)] border-white/10">
                   <ExternalLink size={24} />
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Technical Deco */}
        <div className="absolute top-10 right-10 flex flex-col items-end opacity-20 pointer-events-none">
           <div className="text-[8px] font-mono tracking-widest mb-2 italic">COORD: {40.7128 + index}.04 // {74.0060 + index}.99</div>
           <div className="w-32 h-[1px] bg-white/20" />
           <div className="h-32 w-[1px] bg-white/20" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LusionProjectCard;
