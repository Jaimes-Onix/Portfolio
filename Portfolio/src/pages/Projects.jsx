import React from 'react';
import { motion } from 'framer-motion';
import { Palette, ExternalLink } from 'lucide-react';
import ElectricBorder from '../components/ElectricBorder';

import neuroFlowImg from '../assets/neuroflow.png';
import luminaImg from '../assets/lumina.png';
import voidImg from '../assets/void.png';

const Projects = () => {
  return (
    <div className="pt-32 pb-40 px-4 max-w-7xl mx-auto">
      <div className="mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10 rounded-full glass text-muted-foreground">
          <Palette size={12} /> My Work
        </div>
        <h1 className="text-5xl md:text-[6vw] font-bold tracking-tighter mb-4 leading-none text-white">
          Digital Solutions That<br />Drive Engagement
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          A selection of projects where I've blended high-end aesthetics with functional user experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Main Project Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-8 group"
        >
          <ElectricBorder
            color="#ffffff"
            speed={0.8}
            chaos={0.12}
            borderRadius={48}
          >
            <div className="glass rounded-[3rem] overflow-hidden min-h-[500px] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              <img src={neuroFlowImg} alt="NeuroFlow" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              
              <div className="absolute bottom-0 left-0 p-12 z-20">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Mobile Application</p>
                  <h3 className="text-4xl font-bold text-white mb-6">NeuroFlow AI</h3>
                  <button className="flex items-center gap-2 px-6 py-3 glass rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all">
                    View Case Study <ExternalLink size={14} />
                  </button>
              </div>
            </div>
          </ElectricBorder>
        </motion.div>

        {/* Stats Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-4"
        >
          <ElectricBorder
            color="#ffffff"
            speed={0.5}
            chaos={0.08}
            borderRadius={48}
          >
            <div className="glass rounded-[3rem] p-10 flex flex-col justify-between bg-zinc-900/50 min-h-[500px]">
              <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Core Principles</h3>
                  <p className="text-sm text-muted-foreground">Focusing on clarity, balance, and intentional interaction.</p>
              </div>
              
              <div className="space-y-6">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-xs uppercase tracking-widest font-bold opacity-30">User-Centric</span>
                      <span className="text-xs font-bold">100%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-xs uppercase tracking-widest font-bold opacity-30">Pixel Perfect</span>
                      <span className="text-xs font-bold">Always</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-xs uppercase tracking-widest font-bold opacity-30">Performance</span>
                      <span className="text-xs font-bold">Fast</span>
                  </div>
              </div>
            </div>
          </ElectricBorder>
        </motion.div>

        {/* Secondary Project 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-6 group"
        >
          <ElectricBorder
            color="#ffffff"
            speed={0.8}
            chaos={0.12}
            borderRadius={48}
          >
            <div className="glass rounded-[3rem] h-[350px] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img src={luminaImg} alt="Lumina" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h4 className="text-2xl font-bold text-white">Lumina Studio</h4>
              </div>
            </div>
          </ElectricBorder>
        </motion.div>

        {/* Secondary Project 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-6 group"
        >
          <ElectricBorder
            color="#ffffff"
            speed={0.8}
            chaos={0.12}
            borderRadius={48}
          >
            <div className="glass rounded-[3rem] h-[350px] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img src={voidImg} alt="Void" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h4 className="text-2xl font-bold text-white">Void Analytics</h4>
              </div>
            </div>
          </ElectricBorder>
        </motion.div>
      </div>
      
      {/* EXTRA CONTENT FOR PROJECTS PAGE */}
      <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-12 glass rounded-[3rem] border-white/5">
              <h3 className="text-3xl font-bold mb-6">Full-Stack Capability</h3>
              <p className="text-muted-foreground leading-relaxed">
                  Beyond visuals, I build robust frontend architectures using modern tools like React, Three.js, and Framer Motion for seamless interactivity.
              </p>
          </div>
          <div className="p-12 glass rounded-[3rem] border-white/5">
              <h3 className="text-3xl font-bold mb-6">User Research</h3>
              <p className="text-muted-foreground leading-relaxed">
                  I believe in data-driven design. My process includes user testing and feedback loops to ensure every decision solves a real problem.
              </p>
          </div>
      </div>
    </div>
  );
};

export default Projects;
