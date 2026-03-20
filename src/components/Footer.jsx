import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowUp, Mail, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] text-white pt-32 pb-10 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00E5FF]/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Top Section: Huge CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase"
            >
              Let's build <br />
              <span className="text-[#00E5FF] italic">the future.</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="shrink-0"
          >
            <a 
              href="mailto:hello@jaimesedward.dev" 
              className="group relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-white text-black hover:bg-[#00E5FF] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#00E5FF] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
              <div className="relative z-10 flex flex-col items-center gap-2 group-hover:text-white transition-colors duration-300">
                <ArrowUpRight size={32} className="group-hover:rotate-45 transition-transform duration-500" />
                <span className="text-[10px] font-black tracking-widest uppercase">Get in touch</span>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/10 mb-16" />

        {/* Middle Section: Grid Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          
          {/* Col 1: Location & Time */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">Local Time & Location</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <MapPin size={16} className="text-[#00E5FF]" />
                <span className="text-sm font-medium tracking-wide">Manila, Philippines</span>
              </div>
              <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <Clock size={16} className="text-[#00E5FF]" />
                <span className="text-sm font-medium tracking-wide">{formattedTime} PHT</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">Navigation</h4>
            <ul className="space-y-3 flex flex-col">
              {['Home', 'Projects', 'About', 'Clients'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="group relative inline-flex items-center gap-2 text-xl font-medium tracking-tight hover:text-[#00E5FF] transition-colors"
                  >
                    {item}
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Socials */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">Socials</h4>
            <ul className="space-y-3 flex flex-col">
              {['Twitter / X', 'LinkedIn', 'GitHub', 'Behance'].map((platform) => (
                <li key={platform}>
                  <a 
                    href="#" 
                    className="group relative inline-flex items-center gap-2 text-xl font-medium tracking-tight hover:text-[#00E5FF] transition-colors"
                  >
                    {platform}
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter / Contact */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">Direct Contact</h4>
            <div className="space-y-4">
              <p className="text-sm text-white/60 leading-relaxed">
                Open for new opportunities. Feel free to reach out if you're looking for a developer, have a question, or simply want to connect.
              </p>
              <a href="mailto:hello@jaimesedward.dev" className="inline-flex items-center gap-3 text-sm font-black tracking-widest uppercase hover:text-[#00E5FF] transition-colors pb-1 border-b border-white/20 hover:border-[#00E5FF]">
                <Mail size={16} />
                hello@jaimesedward.dev
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} Jaimes Edward J. Cabante. All rights reserved.
          </p>
          
          <div className="flex items-center gap-8">
            <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] font-black text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
