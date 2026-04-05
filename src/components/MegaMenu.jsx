import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Layers, 
  Smartphone, 
  Zap, 
  Layout, 
  Cpu, 
  Cloud, 
  Globe, 
  Database, 
  FileCode, 
  ArrowRight,
  Monitor,
  PenTool,
  Box,
  FileText,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import projectsImg from '../assets/megamenu/projects.png';
import techImg from '../assets/megamenu/tech.png';
import servicesImg from '../assets/megamenu/services.png';

// Project Images
import neuroFlowImg from '../assets/neuroflow.png';
import luminaImg from '../assets/lumina.png';
import voidImg from '../assets/void.png';
import heroImg from '../assets/hero.png';
import synthHumanImg from '../assets/synthetic_human.png';
import dddImg from '../assets/ddd2024.png';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ProjectCard = ({ item, isTall }) => (
    <Link 
        to={item.path} 
        className={cn(
            "group relative overflow-hidden rounded-2xl flex flex-col justify-end p-6 border border-white/5 hover:border-white/20 transition-all duration-500 shadow-2xl",
            isTall ? "h-[450px]" : "h-[215px]"
        )}
    >
        <img 
            src={item.image} 
            alt={item.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        {/* Dark Overlay - Always Visible for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 transition-opacity" />

        <div className="relative z-10">
            <div className="text-[14px] font-black text-white mb-1.5 drop-shadow-md uppercase tracking-tight group-hover:text-[#00d2ff] transition-colors">
                {item.name}
            </div>
            <p className="text-[11px] font-medium text-white/70 leading-relaxed max-w-[240px]">
                {item.desc}
            </p>
        </div>
    </Link>
);

const MegaMenu = ({ category, onMouseLeave }) => {
  const content = {
    home: {
      title: "My Profile",
      items: [
        { name: "Full-Stack Development", desc: "Building robust architectures & APIs", icon: <Code2 className="w-5 h-5" />, path: "/about" },
        { name: "UI/UX Design", desc: "Crafting intuitive digital experiences", icon: <PenTool className="w-5 h-5" />, path: "/about" },
        { name: "3D Experiences", desc: "Interactive web environments", icon: <Box className="w-5 h-5" />, path: "/projects" },
        { name: "My Resume/CV", desc: "View my professional history", icon: <FileText className="w-5 h-5" />, path: "/about" },
        { name: "Contact Me", desc: "Let's build something together", icon: <Mail className="w-5 h-5" />, path: "#contact" },
      ],
      featured: [
        { name: "Integrates with all your tools", desc: "Built with React, WebGL, Node and seamless data connections to streamline your workflow", image: voidImg, path: "/about" },
        { name: "Live demo", desc: "Try out all my interactive modules & UI widgets in a live demo environment", image: synthHumanImg, path: "/projects" }
      ]
    },
    projects: {
      title: "Featured Ecosystems",
      image: projectsImg,
      items: [
        { name: "Spaace - NFT Marketplace", desc: "Next-gen storefront with Web3 integration and decentralized assets.", path: "/projects/1", image: neuroFlowImg },
        { name: "Choo Choo World", desc: "Immersive 3D environment and game design experience.", path: "/projects/2", image: luminaImg },
        { name: "Void Analytics", desc: "Real-time data visualization dashboard for complex systems.", path: "/projects/3", image: voidImg },
        { name: "Cyber Core", desc: "High-performance architecture for next-gen digital platforms.", path: "/projects/4", image: heroImg },
        { name: "Synthetic Human", desc: "Deep AI visualization and interactive neural network tools.", path: "/projects/5", image: synthHumanImg },
        { name: "DDD 2024", desc: "Unified design systems for global digital ecosystems.", path: "/projects/6", image: dddImg },
      ]
    },
    technologies: {
      title: "Core Infrastructure",
      image: techImg,
      groups: [
        {
          label: "Frontend",
          items: ["React & Next.js", "Three.js & WebGL", "TailwindCSS", "Framer Motion"]
        },
        {
          label: "Backend & Clouds",
          items: ["Node.js & Express", "AWS / Docker", "Supabase & Postgres", "GraphQL"]
        }
      ]
    },
    services: {
      title: "What I Can Build",
      image: servicesImg,
      items: [
        { name: "Web Application Development", desc: "Scalable, high-performance web apps built from the ground up.", icon: <Code2 className="w-5 h-5" /> },
        { name: "UI/UX & Motion Design", desc: "Immersive experiences focusing on interaction and visual storytelling.", icon: <Layers className="w-5 h-5" /> },
        { name: "Architecture & Consulting", desc: "Strategic planning and technical architecture for complex systems.", icon: <Cloud className="w-5 h-5" /> },
        { name: "Mobile App Development", desc: "Native-feeling mobile experiences using React Native/Expo.", icon: <Smartphone className="w-5 h-5" /> },
      ]
    },
    about: {
      title: "Skills & Solutions",
      image: techImg,
      groups: [
        {
          label: "Frontend",
          items: ["React & Next.js", "Three.js & WebGL", "TailwindCSS", "Framer Motion"]
        },
        {
          label: "Backend & Clouds",
          items: ["Node.js & Express", "AWS / Docker", "Supabase & Postgres", "GraphQL"]
        }
      ],
      items: [
        { name: "Web & UI UX design", desc: "Digital experiences focusing on interaction and visual storytelling.", icon: <Layers className="w-5 h-5" /> },
        { name: "Full-Stack Development", desc: "Scalable, high-performance web apps built from the ground up.", icon: <Code2 className="w-5 h-5" /> },
      ]
    }
  };

  const current = content[category] || content['about']; // Fallback for 'About' link
  if (!current) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[#12141a] border border-[#2a2f3a] rounded-[1.5rem] shadow-2xl z-[150] origin-top",
        category === 'projects' ? "w-[90vw] lg:w-[1240px] p-8" : category === 'home' ? "w-[90vw] lg:w-[1100px] p-5" : "w-[90vw] md:w-[700px] lg:w-[900px] p-8"
      )}
      onMouseLeave={onMouseLeave}
    >
      {category === 'projects' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
            {/* Focal Column 1 */}
            <ProjectCard item={current.items[0]} isTall={true} />
            {/* Focal Column 2 */}
            <ProjectCard item={current.items[1]} isTall={true} />
            {/* Grid Column 3 */}
            <div className="flex flex-col gap-4">
                <ProjectCard item={current.items[2]} isTall={false} />
                <ProjectCard item={current.items[3]} isTall={false} />
            </div>
        </div>
      ) : category === 'home' ? (
        <div className="flex gap-4 w-full h-[400px]">
             {/* Left Column - List */}
             <div className="flex flex-col gap-1 w-[320px] shrink-0 h-full justify-between py-2">
                {current.items.map((item, id) => (
                  <Link 
                      key={id} 
                      to={item.path} 
                      className="group flex gap-4 p-3 rounded-xl hover:bg-[#1f222b] transition-colors items-center w-full cursor-pointer"
                  >
                      <div className="w-11 h-11 rounded-[10px] bg-[#222631] text-[#9ca3af] flex items-center justify-center shrink-0 group-hover:text-white transition-colors">
                          {item.icon}
                      </div>
                      <div className="flex flex-col justify-center">
                          <div className="text-[14px] font-semibold text-white mb-0.5">
                              {item.name}
                          </div>
                          <p className="text-[12px] text-[#9ca3af] leading-tight">
                              {item.desc}
                          </p>
                      </div>
                  </Link>
                ))}
             </div>
             
             {/* Middle Column */}
             <div className="flex-1 rounded-[1.25rem] overflow-hidden relative group cursor-pointer border border-[#2a2f3a] bg-[#16181d]">
               <img src={current.featured[0].image} alt="Integrates" className="absolute top-0 left-0 w-full h-full object-cover opacity-80" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#16181d] via-[#16181d]/50 to-transparent" />
               <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col justify-end">
                  <h4 className="text-[16px] font-bold text-white mb-2">{current.featured[0].name}</h4>
                  <p className="text-[13px] text-[#9ca3af] leading-relaxed max-w-[90%]">{current.featured[0].desc}</p>
               </div>
             </div>
             
             {/* Right Column */}
             <div className="flex-1 rounded-[1.25rem] overflow-hidden relative group cursor-pointer border border-[#2a2f3a] bg-[#16181d]">
               <img src={current.featured[1].image} alt="Demo" className="absolute top-0 left-0 w-full h-[60%] object-cover object-top opacity-80" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#16181d] via-[#16181d] to-transparent h-full" />
               <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col justify-end h-full">
                  <h4 className="text-[16px] font-bold text-white mb-2">{current.featured[1].name}</h4>
                  <p className="text-[13px] text-[#9ca3af] leading-relaxed max-w-[90%]">{current.featured[1].desc}</p>
               </div>
             </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column */}
            <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-white/30">{current.title}</h3>
            </div>

            <div className="flex flex-col gap-2">
                {current.items && current.items.map((item, id) => (
                <Link 
                    key={id} 
                    to={item.path || "#"} 
                    className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/5"
                >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                    </div>
                    <div>
                    <div className="text-sm font-semibold text-white mb-0.5 flex items-center gap-2">
                        {item.name}
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[11px] text-white/40 leading-relaxed max-w-[200px]">{item.desc}</p>
                    </div>
                </Link>
                ))}

                {current.groups && (
                <div className="grid grid-cols-2 gap-8 p-2">
                    {current.groups.map((group, gid) => (
                    <div key={gid} className="flex flex-col gap-4">
                        <h4 className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{group.label}</h4>
                        <div className="flex flex-col gap-3">
                        {group.items.map((item, iid) => (
                            <div key={iid} className="text-xs font-medium text-white/60 hover:text-[#00d2ff] cursor-default flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-[#00d2ff]/40" />
                            {item}
                            </div>
                        ))}
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
            </div>

            {/* Right Column (Visual/Promo) */}
            <div className="hidden md:flex flex-col rounded-2xl border border-white/10 overflow-hidden relative group/promo min-h-[300px] justify-end p-8 shadow-2xl">
            <img 
                src={current.image} 
                alt={current.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/promo:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/60 to-transparent opacity-90" />
            
            <div className="relative z-10">
                <div className="text-[9px] font-black uppercase tracking-[0.4em] text-[#00d2ff] mb-3 p-1 px-2 bg-black/40 backdrop-blur-md rounded w-fit border border-white/10">Insight</div>
                <h4 className="text-xl font-bold text-white leading-tight mb-4 drop-shadow-2xl">"Code is temporary, Architecture is forever."</h4>
                
                <Link to="/about" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white hover:text-[#00d2ff] transition-colors p-3 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:bg-white/10">
                Read My Philosophy <ArrowRight className="w-3 h-3" />
                </Link>
            </div>

            <div className="absolute top-4 right-4 text-[8px] font-mono text-white/20 uppercase tracking-widest">
                {category}_node_v.01
            </div>
            </div>

        </div>
      )}
    </motion.div>
  );
};

export default MegaMenu;
