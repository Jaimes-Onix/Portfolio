import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { 
  ChevronDown, Code, Layout, Database, Terminal, Cpu, 
  Shield, Zap, Layers, Globe, Palette, Copy, Check, GlobeIcon 
} from 'lucide-react';


import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const TECH_STACK = [
  { name: "React", icon: <Layout />, color: "#61DAFB" },
  { name: "Next.js", icon: <Globe />, color: "#FFFFFF" },
  { name: "TypeScript", icon: <Code />, color: "#3178C6" },
  { name: "Tailwind CSS", icon: <Palette />, color: "#38B2AC" },
  { name: "Framer Motion", icon: <Zap />, color: "#0055FF" },
  { name: "Node.js", icon: <Terminal />, color: "#339933" },
  { name: "PostgreSQL", icon: <Database />, color: "#336791" },
  { name: "Supabase", icon: <Shield />, color: "#3ECF8E" },
];

const MARQUEE_TECH = [
  { name: "React", icon: <Layout /> },
  { name: "Next.js", icon: <Globe /> },
  { name: "Node.js", icon: <Terminal /> },
  { name: "TypeScript", icon: <Code /> },
  { name: "Tailwind", icon: <Palette /> },
  { name: "PostgreSQL", icon: <Database /> },
  { name: "Python", icon: <Terminal /> },
  { name: "Docker", icon: <Layers /> },
  { name: "Supabase", icon: <Shield /> },
  { name: "Framer", icon: <Zap /> },
];

const BentoCard = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5 }}
    className={cn("glass rounded-3xl border-white/5 overflow-hidden p-6 relative group", className)}
  >
    {children}
  </motion.div>
);

const CodeCard = () => (
  <BentoCard className="col-span-full md:col-span-12 lg:col-span-7 row-span-2 bg-[#0d0d0d] flex flex-col justify-between min-h-[400px]">
    <div className="flex gap-1.5 mb-6">
      <div className="w-3 h-3 rounded-full bg-red-500/20 dot-red" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/20 dot-yellow" />
      <div className="w-3 h-3 rounded-full bg-green-500/20 dot-green" />
    </div>
    <div className="flex-1 font-mono text-xs md:text-sm leading-relaxed overflow-hidden">
      <div className="flex gap-4 mb-1">
        <span className="text-white/20 select-none w-4">1</span>
        <span className="text-purple-400">using</span> <span className="text-white">AutoMapper;</span>
      </div>
      <div className="flex gap-4 mb-1">
        <span className="text-white/20 select-none w-4">2</span>
        <span className="text-purple-400">using</span> <span className="text-white">Contracts;</span>
      </div>
      <div className="flex gap-4 mb-1">
        <span className="text-white/20 select-none w-4">3</span>
        <span className="text-purple-400">namespace</span> <span className="text-white">Service;</span>
      </div>
      <div className="flex gap-4 mb-1">
        <span className="text-white/20 select-none w-4">4</span>
      </div>
      <div className="flex gap-4 mb-1">
        <span className="text-white/20 select-none w-4">5</span>
        <span className="text-blue-400">public sealed class</span> <span className="text-yellow-400">ServiceManager</span>
      </div>
      <div className="flex gap-4 mb-1 pl-4">
        <span className="text-white/20 select-none w-4">6</span>
        <span className="text-blue-400">private readonly</span> <span className="text-white">ICompanyService _companyService;</span>
      </div>
      <div className="flex gap-4 mb-1 pl-4">
        <span className="text-white/20 select-none w-4">7</span>
        <span className="text-white">_companyService = </span> <span className="text-blue-400">new</span> <span className="text-yellow-400">CompanyService</span><span className="text-white">();</span>
      </div>
      {/* Decorative gradient overlay for that "fade out" effect */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
    </div>
    <div className="mt-8 z-10">
      <h3 className="text-xl font-bold text-white mb-2">Hi, I'm Jaimes Edward</h3>
      <p className="text-muted-foreground text-sm max-w-md">Over the years, I developed my frontend and backend dev skills to deliver dynamic and responsive software and web applications.</p>
    </div>
  </BentoCard>
);

const FloatingTagsCard = () => (
  <BentoCard className="col-span-full md:col-span-6 lg:col-span-5 aspect-square lg:aspect-auto flex items-center justify-center overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent">
    <div className="relative w-full h-full">
      <div className="absolute inset-0 flex items-center justify-center opacity-10 font-black text-4xl md:text-6xl text-white select-none whitespace-nowrap">CODE IS CRAFT</div>
      {[
        { text: "SOLID", top: "10%", left: "20%", rotate: -15 },
        { text: ".NET", top: "40%", left: "10%", rotate: 10 },
        { text: "SRP", top: "20%", left: "60%", rotate: 5 },
        { text: "Design Patterns", top: "70%", left: "40%", rotate: -5 },
        { text: "Clean Code", top: "50%", left: "70%", rotate: 15 },
      ].map((tag, i) => (
        <motion.div
           key={i}
           animate={{
             y: [0, -10, 0],
             x: [0, 5, 0]
           }}
           transition={{
             duration: 4 + i,
             repeat: Infinity,
             ease: "easeInOut"
           }}
           className="absolute px-4 py-2 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60 shadow-xl"
           style={{ top: tag.top, left: tag.left, rotate: `${tag.rotate}deg` }}
        >
          {tag.text}
        </motion.div>
      ))}
    </div>
  </BentoCard>
);

const GlobeCard = () => (
  <BentoCard className="col-span-full md:col-span-6 lg:col-span-5 h-[300px] flex flex-col justify-between">
    <div>
      <h3 className="text-lg font-bold text-white mb-1">Time Zone</h3>
      <p className="text-muted-foreground text-xs">I'm based in Earth (usually), and open to remote work worldwide.</p>
    </div>
    <div className="relative flex-1 flex items-center justify-center overflow-hidden group/globe">
      <div className="w-48 h-48 rounded-full relative flex items-center justify-center">
        {/* Planet Atmosphere Glow */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl group-hover/globe:bg-blue-400/30 transition-colors duration-700" />
        
        {/* The Planet Surface */}
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
           className="w-24 h-24 rounded-full relative overflow-hidden shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.8),0_0_20px_rgba(56,189,248,0.3)] bg-gradient-to-tr from-blue-900 via-blue-600 to-cyan-300"
        >
           {/* Planet texture lines/clouds */}
           <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, white 4px, white 8px)" }} />
           <div className="absolute -top-4 -left-4 w-12 h-12 bg-white/20 rounded-full blur-md" />
           <div className="absolute bottom-2 right-2 w-16 h-8 bg-black/40 rounded-full blur-md" />
        </motion.div>

        {/* Orbit Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-white/10 rounded-full opacity-50"
          style={{ transform: "rotateX(75deg)" }}
        />

        {/* Pulsing Moon/Satellite */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute top-2 left-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />
        </motion.div>
      </div>
    </div>
  </BentoCard>
);

const EmailCard = () => {
  const [copied, setCopied] = React.useState(false);
  const email = "hello@jaimesedward.dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <BentoCard className="col-span-full md:col-span-5 lg:col-span-4 bg-primary/10 flex flex-col items-center justify-center text-center gap-6 min-h-[300px]">
      <h3 className="text-2xl font-black text-white leading-tight">Do you want to start a project together?</h3>
      <button 
        onClick={handleCopy}
        className="px-6 py-3 rounded-2xl glass border-white/10 flex items-center gap-2 hover:bg-white/5 transition-all active:scale-95 group/email"
      >
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-white/80">
          {copied ? "Email Copied!" : "Copy Email Address"}
        </span>
      </button>
    </BentoCard>
  );
};

const ArchitectureCard = ({ icon, title, desc, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative h-[260px] md:h-[300px] w-full rounded-[2rem] glass border-white/10 p-6 cursor-default group overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent shadow-2xl"
    >
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
      
      {/* Background Index */}
      <span className="absolute -bottom-6 -right-6 text-[10vw] md:text-[6vw] font-black text-white/[0.02] select-none leading-none tracking-tighter transition-transform group-hover:scale-110 duration-1000">
        0{index + 1}
      </span>

      {/* Content wrapper for depth */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl glass border border-white/20 flex items-center justify-center text-white relative shadow-inner group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all">
              <div className="absolute inset-0 bg-white/5 blur-xl group-hover:opacity-100 opacity-0 transition-opacity" />
              {React.cloneElement(icon, { size: 22, className: "relative z-10" })}
            </div>
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-lg bg-white/5 border border-white/10">
               <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
               <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.2em]">Live</span>
            </div>
          </div>
          
          <h4 className="text-xl font-black text-white mb-2 tracking-tighter uppercase drop-shadow-sm group-hover:translate-x-1 transition-transform">{title}</h4>
          <p className="text-muted-foreground text-xs leading-relaxed max-w-[180px]">
            {desc}
          </p>
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between opacity-30">
           <div className="flex gap-1.5">
              {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-white/40 rounded-full" />)}
           </div>
           <span className="text-[6px] font-mono text-white/50 uppercase tracking-[0.4em]">system_v.02</span>
        </div>
      </div>
    </motion.div>
  );
};

const TechOrbitCard = () => (
  <BentoCard className="col-span-full md:col-span-12 lg:col-span-8 flex flex-col md:flex-row items-center justify-between gap-8 h-auto md:h-[300px]">
    <div className="max-w-xs text-center md:text-left">
      <h3 className="text-2xl font-black text-white mb-4">Tech Stack</h3>
      <p className="text-muted-foreground text-sm">I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable applications.</p>
    </div>
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
      {/* Orbits */}
      <div className="absolute w-full h-full rounded-full border border-white/10 scale-50" />
      <div className="absolute w-full h-full rounded-full border border-white/10" />
      
      {/* Orbiting Icons */}
      {TECH_STACK.slice(0, 8).map((tech, i) => {
        const angle = (i * 360) / 8;
        return (
          <motion.div
            key={i}
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              style={{ rotate: -angle }}
               className="w-10 h-10 rounded-xl glass border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:scale-110 transition-all pointer-events-auto"
               initial={{ x: 120, rotate: angle }}
            >
              <div className="absolute inset-0 blur-xl opacity-20 transition-opacity group-hover:opacity-40" style={{ backgroundColor: tech.color }} />
              <div style={{ color: tech.color }} className="relative z-10 transition-transform group-hover:scale-110 drop-shadow-[0_0_8px_currentColor]">
                {React.cloneElement(tech.icon, { size: 20 })}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
      <div className="w-16 h-16 rounded-full glass border-white/20 flex items-center justify-center relative z-10">
        <Zap className="text-primary" size={32} />
      </div>
    </div>
  </BentoCard>
);

const Home = () => {
  return (
    <PageTransition>
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
            <a href="#projects" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-black font-extrabold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
              Explore My Work
            </a>
            <a href="#about" className="w-full sm:w-auto px-10 py-5 rounded-2xl border border-white/10 glass font-bold hover:bg-white/5 transition-all hover:scale-105 active:scale-95">
              Read My Story
            </a>
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
          <div className="flex items-center gap-16 whitespace-nowrap animate-marquee px-4 w-max">
             {[...MARQUEE_TECH, ...MARQUEE_TECH].map((tech, i) => (
                <div key={i} className="flex items-center gap-4 opacity-20 hover:opacity-100 transition-all cursor-default group">
                   <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      {React.cloneElement(tech.icon, { size: 14 })}
                   </div>
                   <span className="text-xl font-black tracking-tighter text-white uppercase">{tech.name}</span>
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
      <section className="py-32 px-4 relative overflow-hidden bg-[#0a0a0a]">
        {/* Background Blueprint Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_0%,#000_100%)" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black uppercase tracking-[0.4em] bg-white/5 text-muted-foreground rounded-md border border-white/10">
                Core Systems
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white">
                ARCHITECTURE<br />
                <span className="text-gradient">& STRATEGY.</span>
              </h2>
            </div>
            <div className="h-0.5 w-full md:w-32 bg-white/10 mb-6 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Layers />, title: 'Scalable Systems', desc: 'Modular frontend architectures built for infinite growth and adaptability.' },
              { icon: <Zap />, title: 'High Perf', desc: 'Extreme optimization for core web vitals and ultra-low latency response.' },
              { icon: <Shield />, title: 'Secure Design', desc: 'Deep-level encryption and secure data orchestration as a standard.' },
              { icon: <Globe />, title: 'Modern Core', desc: 'Distributed API strategies and real-time synchronization pipelines.' }
            ].map((skill, index) => (
              <ArchitectureCard 
                key={index}
                index={index}
                icon={skill.icon}
                title={skill.title}
                desc={skill.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BENTO GRID TECH STACK */}
      <section className="py-24 px-4 relative overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.01] rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold uppercase tracking-[0.3em] bg-white/5 text-muted-foreground rounded-md border border-white/10"
            >
              MY TOOLKIT
            </motion.div>
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white"
            >
              CRAFTING WITH <span className="text-gradient">MODERN TECH.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
            <CodeCard />
            <FloatingTagsCard />
            <GlobeCard />
            <EmailCard />
            <TechOrbitCard />
          </div>
        </div>
      </section>
      </div>
    </PageTransition>
  );
};

export default Home;
