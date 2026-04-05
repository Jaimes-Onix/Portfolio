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
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import projectsImg from '../assets/megamenu/projects.png';
import techImg from '../assets/megamenu/tech.png';
import servicesImg from '../assets/megamenu/services.png';

const MegaMenu = ({ category, onMouseLeave }) => {
  const content = {
    projects: {
      title: "Featured Ecosystems",
      image: projectsImg,
      items: [
        { name: "De-Commerce 3.0", desc: "Next-gen storefront with Web3 integration.", icon: <Globe className="w-5 h-5 text-[#00d2ff]" />, path: "/projects/de-commerce" },
        { name: "FinTrack Pro", desc: "Real-time analytics dashboard for fintech assets.", icon: <Zap className="w-5 h-5 text-yellow-400" />, path: "/projects/fintrack" },
        { name: "Orbit UI", desc: "Open-source motion design system for React.", icon: <Layout className="w-5 h-5 text-purple-400" />, path: "/projects/orbit-ui" },
        { name: "NeuroNet", desc: "AI-powered neural network visualization tool.", icon: <Cpu className="w-5 h-5 text-emerald-400" />, path: "/projects/neuronet" },
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
    }
  };

  const current = content[category];
  if (!current) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute top-[calc(100%+8px)] left-0 w-full md:w-[600px] lg:w-[800px] bg-[#0a0c10]/95 backdrop-blur-3xl border border-white/5 rounded-3xl p-8 shadow-2xl z-[150] origin-top"
      onMouseLeave={onMouseLeave}
    >
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
    </motion.div>
  );
};

export default MegaMenu;
