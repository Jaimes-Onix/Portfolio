import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, 
  Palette, 
  Code, 
  Database, 
  Globe, 
  Terminal, 
  Layers, 
  Zap, 
  Shield, 
  Cpu 
} from 'lucide-react';

const TECH_ITEMS = [
  { name: "React", icon: <Layout className="text-blue-400" /> },
  { name: "Next.js", icon: <Globe className="text-white" /> },
  { name: "Node.js", icon: <Terminal className="text-green-500" /> },
  { name: "TypeScript", icon: <Code className="text-blue-600" /> },
  { name: "PostgreSQL", icon: <Database className="text-blue-300" /> },
  { name: "Supabase", icon: <Shield className="text-emerald-500" /> },
  { name: "Tailwind", icon: <Palette className="text-cyan-400" /> },
  { name: "Docker", icon: <Layers className="text-blue-500" /> },
  { name: "Figma", icon: <Cpu className="text-purple-500" /> },
  { name: "Git", icon: <Code className="text-orange-600" /> },
];

const ThreeDSlider = () => {
  return (
    <section className="py-20 mb-20 relative overflow-hidden bg-[#060606]">
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
          <div className="slider" style={{ '--quantity': TECH_ITEMS.length }}>
            {TECH_ITEMS.map((item, index) => (
              <div 
                key={index} 
                className="item" 
                style={{ '--position': index + 1 }}
              >
                <div className="item-card glass group">
                  <div className="icon-wrapper transform group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(item.icon, { size: 40 })}
                  </div>
                  <span className="text-white/80 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const AboutMe = () => {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Decorative Background Patterns */}
        <div className="absolute top-20 right-0 w-96 h-96 opacity-5 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full text-white">
             <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
             <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
             <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Portrait */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative z-10 border border-white/10 shadow-3xl bg-white/2 backdrop-blur-lg">
                 <img 
                   src="/src/assets/about_portrait.png" 
                   alt="Portrait" 
                   className="w-full h-full object-cover"
                 />
              </div>
              <div className="absolute -inset-4 bg-white/5 rounded-[3.5rem] blur-2xl -z-10" />
            </motion.div>

            {/* Right Column: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold uppercase tracking-[0.3em] bg-white/5 text-muted-foreground rounded-md border border-white/10">
                ABOUT ME
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight text-white">
                PASSIONATE ABOUT <span className="text-gradient">DIGITAL CRAFT</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
                 I am a UI/UX designer with a deep passion for creating interfaces that bridge the gap between human intuition and machine complexity. With a focus on performance and visual excellence, I help brands build digital products that resonate.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-xl">
                 With over 5 years of experience, I've worked across diverse industries, from healthcare AI to creative studio ecosystems. My approach combines technical precision with a keen eye for modern aesthetics.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {[
                  { value: '280+', label: 'Google Review' },
                  { value: '15+', label: 'Years Experience' },
                  { value: '49+', label: 'Award Winning' }
                ].map((stat, i) => (
                  <div key={i} className="glass p-6 rounded-2xl border-white/5">
                    <div className="text-3xl font-black mb-1 text-white">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button className="px-10 py-5 rounded-full bg-white text-black font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_rgba(255,255,255,0.15)] group">
                WORK WITH ME
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <ThreeDSlider />
    </div>
  );
};

export default AboutMe;
