import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Layout } from 'lucide-react';

const Companies = () => {
  return (
    <PageTransition>
      <div className="pt-32 pb-40 px-4 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10 rounded-full glass text-muted-foreground">
            <Layout size={12} /> Companies
        </div>
        <h1 className="text-5xl md:text-[5vw] font-bold tracking-tighter mb-12 text-white">
            Brands I've Helped<br />Shape & Scale
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mb-20">
            Collaborating with global industry leaders and innovative startups to solve complex design challenges.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-3xl glass text-left group hover:bg-white/5 transition-all">
                <div className="h-12 w-32 bg-white/10 rounded-lg mb-8" />
                <h4 className="text-xl font-bold mb-2">Lead UI Designer</h4>
                <p className="text-sm text-muted-foreground mb-6">Designed the core design system for the next generation of creative tools.</p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 glass rounded-full text-[8px] font-black uppercase tracking-widest">SaaS</span>
                    <span className="px-3 py-1 glass rounded-full text-[8px] font-black uppercase tracking-widest">Design System</span>
                </div>
            </div>
            <div className="p-10 rounded-3xl glass text-left group hover:bg-white/5 transition-all">
                <div className="h-12 w-32 bg-white/10 rounded-lg mb-8" />
                <h4 className="text-xl font-bold mb-2">UX Consultant</h4>
                <p className="text-sm text-muted-foreground mb-6">Optimized user flow for the world's most popular search engine mobile app.</p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 glass rounded-full text-[8px] font-black uppercase tracking-widest">Mobile UX</span>
                    <span className="px-3 py-1 glass rounded-full text-[8px] font-black uppercase tracking-widest">Research</span>
                </div>
            </div>
            <div className="p-10 rounded-3xl glass text-left group hover:bg-white/5 transition-all">
                <div className="h-12 w-32 bg-white/10 rounded-lg mb-8" />
                <h4 className="text-xl font-bold mb-2">Visual Designer</h4>
                <p className="text-sm text-muted-foreground mb-6">Crafted unique identities and high-fidelity interfaces for innovative startups.</p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 glass rounded-full text-[8px] font-black uppercase tracking-widest">Branding</span>
                    <span className="px-3 py-1 glass rounded-full text-[8px] font-black uppercase tracking-widest">Web Design</span>
                </div>
            </div>
        </div>

        <div className="mt-40">
            <h2 className="text-4xl font-bold mb-12">Partnerships</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['ADOBE', 'GOOGLE', 'META', 'FRAMER', 'FIGMA', 'REPLICATE', 'NIKE', 'APPLE'].map((brand, i) => (
                    <motion.div 
                        key={brand}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.3 }}
                        className="py-12 glass rounded-2xl flex items-center justify-center font-black tracking-tighter italic text-xl"
                    >
                        {brand}
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Companies;
