import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Code, Layout, Database, Terminal, Cpu, Shield, Zap, Layers, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="pt-20">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-[120px]" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10 rounded-full glass text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Available for new opportunities
          </div>
          <h1 className="text-[12vw] md:text-[8vw] font-black tracking-tighter mb-4 leading-[0.9] text-white">
            MAKING<br />DIGITAL REAL
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-2xl text-muted-foreground leading-relaxed balance mb-12">
            I build high-end digital experiences that combine technical precision with visual excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/projects" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-black font-extrabold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
              Explore My Work
            </Link>
            <Link to="/about" className="w-full sm:w-auto px-10 py-5 rounded-2xl border border-white/10 glass font-bold hover:bg-white/5 transition-all hover:scale-105 active:scale-95">
              Read My Story
            </Link>
          </div>
        </motion.div>

        <div className="mt-32 w-full max-w-7xl mx-auto flex flex-col items-center gap-12">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">CRAFTING FOR THE BEST</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-20 grayscale invert">
                <span className="text-2xl font-black italic tracking-tighter">NIKE</span>
                <span className="text-2xl font-black italic tracking-tighter">APPLE</span>
                <span className="text-2xl font-black italic tracking-tighter">TESLA</span>
                <span className="text-2xl font-black italic tracking-tighter">SONY</span>
            </div>
        </div>
      </section>

      {/* THEMED ABOUT SECTION (2ND LAYER) */}
      <section className="relative py-24 px-4 overflow-hidden bg-background">
        {/* Scrolling Logo Bar */}
        <div className="absolute top-0 left-0 right-0 py-6 bg-black/40 backdrop-blur-md border-b border-white/5 overflow-hidden">
          <div className="flex items-center justify-around gap-12 whitespace-nowrap animate-marquee px-4">
             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="flex items-center gap-12 shrink-0">
                  <div className="flex items-center gap-2 opacity-20 hover:opacity-100 transition-opacity grayscale invert">
                     <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white" />
                     </div>
                     <span className="text-xl font-black tracking-tighter text-white">logoipsum</span>
                  </div>
                </div>
             ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 relative">
          {/* Decorative Background Patterns */}
          <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full text-white">
               <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
               <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
               <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-5 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full text-white">
               <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
               <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Portrait */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative z-10 border border-white/10 shadow-3xl bg-white/2 backdrop-blur-lg">
                 <img 
                   src="/src/assets/about_portrait.png" 
                   alt="Portrait" 
                   className="w-full h-full object-cover"
                 />
              </div>
              {/* Floating pattern behind image */}
              <div className="absolute -inset-4 bg-white/5 rounded-[3.5rem] blur-2xl -z-10" />
            </motion.div>

            {/* Right Column: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold uppercase tracking-[0.3em] bg-white/5 text-muted-foreground rounded-md border border-white/10">
                ABOUT US
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 leading-tight text-white">
                I AM AVAILABLE FOR <span className="text-gradient">UI UX DESIGN</span> PROJECT
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-xl">
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
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
                GET IN TOUCH 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE SECTION */}
      <section className="py-24 px-4 bg-white/2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">ARCHITECTURE & STRATEGY.</h2>
            <div className="h-1 w-20 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Layers />, title: 'Scalable Systems', desc: 'Modular frontend architectures built for growth.' },
              { icon: <Zap />, title: 'Performance', desc: 'Optimization for core web vitals and fast interaction.' },
              { icon: <Shield />, title: 'Secure Design', desc: 'Robust data handling and authentication flows.' },
              { icon: <Globe />, title: 'Modern APIs', desc: 'RESTful and Real-time integration strategies.' }
            ].map((skill, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 border border-white/5 rounded-3xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{skill.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
