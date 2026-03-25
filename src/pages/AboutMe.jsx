import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { X, Database, Shield, Layout, Palette, Code, Terminal, Zap, Layers, Globe, Cpu } from 'lucide-react';

const BASE_TECH_ITEMS = [
  { 
    id: 1, 
    name: "Supabase", 
    color: "#3ECF8E", 
    subtitle: "The Open Source Firebase Alternative",
    icon: <Shield />,
    features: [
      { title: "DATABASE", desc: "PostgreSQL under hood", icon: <Database size={14} /> },
      { title: "AUTH", desc: "User Management", icon: <Shield size={14} /> },
      { title: "REALTIME", desc: "Listen to db changes", icon: <Zap size={14} /> },
      { title: "STORAGE", desc: "Secure file serving", icon: <Layers size={14} /> }
    ]
  },
  { 
    id: 2, 
    name: "Javascript", 
    color: "#F7DF1E", 
    subtitle: "The Language of the Web",
    icon: <Code />,
    features: [
      { title: "DYNAMIC", desc: "Interactive UI/UX", icon: <Zap size={14} /> },
      { title: "FULL-STACK", desc: "Client & Server side", icon: <Layers size={14} /> },
      { title: "ECOSYSTEM", desc: "Massive community", icon: <Database size={14} /> },
      { title: "VERSATILE", desc: "Web, Mobile, Desktop", icon: <Layout size={14} /> }
    ]
  },
  { 
    id: 3, 
    name: "Docker", 
    color: "#2496ED", 
    subtitle: "Empowering App Development",
    icon: <Layers />,
    features: [
      { title: "CONTAINERS", desc: "Isolated environments", icon: <Layers size={14} /> },
      { title: "PORTABLE", desc: "Run anywhere", icon: <Globe size={14} /> },
      { title: "SCALABLE", desc: "Easy orchestration", icon: <Zap size={14} /> },
      { title: "EFFICIENT", desc: "Lightweight vs VMs", icon: <Cpu size={14} /> }
    ]
  },
  { 
    id: 4, 
    name: "TypeScript", 
    color: "#3178C6", 
    subtitle: "JavaScript with Syntax for Types",
    icon: <Code />,
    features: [
      { title: "TYPE SAFETY", desc: "Catch errors early", icon: <Shield size={14} /> },
      { title: "TOOLING", desc: "Great IDE support", icon: <Terminal size={14} /> },
      { title: "READABLE", desc: "Self-documenting code", icon: <Layout size={14} /> },
      { title: "SCALABLE", desc: "For large codebases", icon: <Layers size={14} /> }
    ]
  },
  { 
    id: 5, 
    name: "Tailwind", 
    color: "#38B2AC", 
    subtitle: "Utility-First CSS Framework",
    icon: <Palette />,
    features: [
      { title: "FAST STYLING", desc: "Build designs quickly", icon: <Zap size={14} /> },
      { title: "RESPONSIVE", desc: "Mobile-first approach", icon: <Layout size={14} /> },
      { title: "CUSTOMIZABLE", desc: "Design system ready", icon: <Palette size={14} /> },
      { title: "OPTIMIZED", desc: "Tiny production builds", icon: <Zap size={14} /> }
    ]
  },
];

const TECH_ITEMS = [
  ...BASE_TECH_ITEMS, 
  ...BASE_TECH_ITEMS.map(i => ({ ...i, id: i.id + 5 }))
];

const SPEC_NODES = [
  { id: 'optics', label: 'PIXEL_PERFECT_VISION', top: '25%', left: '45%' },
  { id: 'core', label: 'FULL_STACK_ARCH_V2', top: '50%', left: '55%' },
  { id: 'logic', label: 'CLEAN_CODE_SUBSYS', top: '70%', left: '40%' },
];

const PortraitHUD = () => {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <div className="relative group/hud">
      <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative z-10 border border-white/10 shadow-3xl bg-[#0a0a0a]">
        <img 
          src="/src/assets/about_portrait.png" 
          alt="Portrait" 
          className="w-full h-full object-cover opacity-80 group-hover/hud:opacity-100 transition-opacity duration-1000"
        />
        
        {/* Scanning Line */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-white/20 z-20 pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        />

        {/* Blueprint Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      </div>

      {/* Hotspots */}
      {SPEC_NODES.map((node) => (
        <div 
          key={node.id}
          className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 cursor-crosshair"
          style={{ top: node.top, left: node.left }}
          onMouseEnter={() => setActiveNode(node.id)}
          onMouseLeave={() => setActiveNode(null)}
        >
          <div className="relative flex items-center justify-center">
            <motion.div 
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-4 h-4 rounded-full border border-white/40 bg-white/10"
            />
            <div className="absolute w-8 h-8 rounded-full border border-white/10 scale-150 animate-pulse" />
            
            <AnimatePresence>
              {activeNode === node.id && (
                <motion.div 
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 40, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  className="absolute left-0 whitespace-nowrap glass px-4 py-2 rounded-lg border-white/20 text-[10px] font-mono text-white tracking-[0.2em] shadow-2xl z-50 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 italic">#</span> {node.label}
                  </div>
                  <div className="absolute left-[-40px] top-1/2 w-10 h-[1px] bg-white/20" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}

      {/* Corner Brackets */}
      <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-white/20 rounded-tl-2xl pointer-events-none" />
      <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-white/20 rounded-br-2xl pointer-events-none" />
      <div className="absolute -inset-4 bg-white/[0.02] rounded-[3.5rem] blur-3xl -z-10" />
    </div>
  );
};

const TechCard = ({ item, isExpanded = false }) => {
  return (
    <div 
      className={`w-full h-full rounded-3xl p-px relative group transition-transform duration-500 hover:scale-[1.02] ${isExpanded ? '' : 'cursor-pointer'}`}
    >
      {/* Glowing Border Edge */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${item.color}, transparent, ${item.color})` }}
      />
      {/* Glowing Border Glow */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-40 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${item.color}40, transparent, ${item.color}40)` }}
      />

      {/* Inner Card Content */}
      <div className={`relative w-full h-full bg-[#0a0a0a]/90 backdrop-blur-md rounded-[23px] flex flex-col justify-between border border-white/10 overflow-hidden ${isExpanded ? 'p-10' : 'p-6'}`}>
        {/* Background Glow inside card */}
        <div className={`absolute -top-20 -right-20 rounded-full pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity ${isExpanded ? 'w-80 h-80' : 'w-40 h-40'}`} style={{ background: `radial-gradient(circle, ${item.color} 0%, transparent 70%)` }} />
        <div className={`absolute -bottom-20 -left-20 rounded-full pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity ${isExpanded ? 'w-80 h-80' : 'w-40 h-40'}`} style={{ background: `radial-gradient(circle, ${item.color} 0%, transparent 70%)` }} />

        {/* Header */}
        <div className="text-center z-10 pt-4">
          <div className="flex justify-center mb-6 transition-transform group-hover:scale-110 duration-500" style={{ color: item.color, filter: `drop-shadow(0 0 15px ${item.color})` }}>
            {React.cloneElement(item.icon, { size: isExpanded ? 80 : 48, strokeWidth: 1.5 })}
          </div>
          <h3 className={`${isExpanded ? 'text-4xl' : 'text-2xl'} font-black uppercase tracking-widest mb-2`} style={{ color: item.color, textShadow: `0 0 20px ${item.color}80` }}>
            {item.name}
          </h3>
          <p className={`${isExpanded ? 'text-sm' : 'text-[10px]'} text-white/60 tracking-[0.2em] uppercase font-bold`}>
            {item.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-2 gap-4 mt-8 z-10 pb-4 ${isExpanded ? 'gap-6 mt-12' : ''}`}>
          {item.features.map((feature, idx) => (
            <div key={idx} className={`glass rounded-xl border-white/5 bg-white/[0.02] group-hover:bg-white/[0.05] transition-colors flex flex-col items-center text-center ${isExpanded ? 'p-6 gap-4' : 'p-3 gap-2'}`}>
              <div style={{ color: item.color }} className={`opacity-70 group-hover:opacity-100 ${isExpanded ? 'scale-150 mb-2' : ''}`}>
                 {feature.icon}
              </div>
              <div>
                <div className={`${isExpanded ? 'text-sm' : 'text-[8px]'} font-bold text-white uppercase tracking-wider mb-1 leading-none`}>{feature.title}</div>
                <div className={`${isExpanded ? 'text-xs' : 'text-[7px]'} text-white/40 leading-tight`}>{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Light Sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out" />
      </div>
    </div>
  );
};

const ThreeDSlider = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="py-20 mb-20 relative overflow-hidden bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold uppercase tracking-[0.3em] bg-white/5 text-muted-foreground rounded-md border border-white/10">
            TECH ECOSYSTEM
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            TOOLS OF THE <span className="text-gradient">TRADE.</span>
          </h2>
        </div>

        <div className="banner">
          <div className="slider is-active" style={{ '--quantity': TECH_ITEMS.length }}>
            {TECH_ITEMS.map((item, index) => (
              <motion.div 
                key={item.id} 
                className="item" 
                style={{ '--position': index + 1 }}
                onClick={() => setSelectedItem({ ...item, index })}
              >
                <TechCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-2xl cursor-zoom-out"
          >
            <motion.div
              layoutId={`card-${selectedItem.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[350px] md:w-[500px] h-[500px] md:h-[700px] max-h-[90vh] rounded-3xl overflow-hidden cursor-default"
            >
              <TechCard item={selectedItem} isExpanded={true} />
              
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 p-4 rounded-full bg-black/50 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 group z-50 backdrop-blur-md"
              >
                <X size={28} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


const AboutMe = () => {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen bg-transparent">
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background Drafting Lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:100px_100px]" />
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_0%,transparent_100%)" />
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Portrait HUD (6 cols) */}
            <div className="lg:col-span-6">
              <PortraitHUD />
            </div>

            {/* Right Column: Spec Content (6 cols) */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.4em] bg-white text-black rounded-sm">
                    SYST_UNIT: JE.V5
                  </div>
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] font-mono text-white/20">LOC: 121.229 // 14.341</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.85] text-white">
                  PRODUCT<br />
                  <span className="text-gradient">SPECIFICATION.</span>
                </h1>
                
                <div className="space-y-8 mb-16">
                  <div className="relative p-8 glass border-white/5 bg-white/[0.01] rounded-3xl overflow-hidden group/spec">
                     <div className="absolute top-0 left-0 w-1 h-full bg-white/20 scale-y-0 group-hover/spec:scale-y-100 transition-transform origin-top duration-700" />
                     <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-4">Core_Competency_Index</h3>
                     <p className="text-xl text-white/90 leading-relaxed font-medium">
                        Focused on building high-performance digital ecosystems that bridge the gap between complex engineering and human-centric design.
                     </p>
                  </div>
                </div>

                {/* Technical Parameters Grid */}
                <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                  {[
                    { label: 'Latency_Optim', value: '0.04s', desc: 'Avg response time' },
                    { label: 'Visual_Precision', value: '100%', desc: 'Pixel-perfect rendering' },
                    { label: 'Uptime_Dev', value: '99.9%', desc: 'System availability' },
                    { label: 'Build_Ver', value: '2026.03', desc: 'Latest core update' }
                  ].map((param, i) => (
                    <div key={i} className="bg-[#0a0a0a] p-8 hover:bg-white/[0.02] transition-colors">
                      <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-3">{param.label}</div>
                      <div className="text-3xl font-black text-white mb-1 tracking-tighter">{param.value}</div>
                      <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">{param.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-16 flex items-center justify-between">
                  <button className="px-12 py-6 rounded-sm bg-white text-black font-black text-xs uppercase tracking-[0.4em] flex items-center gap-4 hover:bg-neutral-200 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] group">
                    INITIATE PROJECT 
                    <span className="group-hover:translate-x-2 transition-transform">_&gt;&gt;</span>
                  </button>
                  <div className="hidden sm:block text-right">
                    <div className="text-[10px] font-mono text-white/20 mb-1 leading-none uppercase tracking-widest italic">Serial: 4402-991-JAIMES</div>
                    <div className="text-[10px] font-mono text-white/20 leading-none uppercase tracking-widest">Auth_Status: VERIFIED</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <ThreeDSlider />
      </div>
    </PageTransition>
  );
};

export default AboutMe;
