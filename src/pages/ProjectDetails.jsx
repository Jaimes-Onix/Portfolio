import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

// Re-using the same data source
import neuroFlowImg from '../assets/neuroflow.png';
import luminaImg from '../assets/lumina.png';
import voidImg from '../assets/void.png';
import heroImg from '../assets/hero.png';
import heroCharImg from '../assets/hero_character.png';
import birdImg from '../assets/bird.png';
import synthHumanImg from '../assets/synthetic_human.png';
import dddImg from '../assets/ddd2024.png';
import prismImg from '../assets/prism_ai.png';
import solarImg from '../assets/solar_echo.png';

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Spaace - NFT Marketplace",
    image: neuroFlowImg,
    tags: ["WEB", "DESIGN", "DEVELOPMENT", "3D", "WEB3"],
    description: "A comprehensive digital ecosystem for the next generation of digital assets. We worked closely with the Spaace team to create a minimalist yet powerful interface that simplifies the NFT trading experience while maintaining a premium aesthetic.",
    year: "2024",
    services: ["UI/UX Design", "3D Modeling", "React Development"],
    url: "https://spaace.io",
    next: { id: 2, title: "Choo Choo World" }
  },
  {
    id: 2,
    title: "Choo Choo World",
    image: luminaImg,
    tags: ["CONCEPT", "WEB", "GAME DESIGN", "3D"],
    description: "An whimsical exploration of 3D game design on the web. Choo Choo World is an interactive experience that invites users to build and explore their own miniature railway universe.",
    year: "2023",
    services: ["Game Design", "WebGL", "Interactive Storytelling"],
    url: "https://choochootrain.com",
    next: { id: 3, title: "Void Analytics" }
  },
  {
    id: 3,
    title: "Void Analytics",
    image: voidImg,
    tags: ["WEB", "DESIGN", "DEVELOPMENT", "3D"],
    description: "Deep data visualization for the modern era. Void Analytics transforms complex datasets into immersive 3D landscapes of information, allowing for intuitive pattern recognition.",
    year: "2024",
    services: ["Data Vis", "System Architecture", "3D UI"],
    url: "#",
    next: { id: 4, title: "Cyber Core" }
  },
  {
    id: 4,
    title: "Cyber Core",
    image: heroImg,
    tags: ["WEB", "DESIGN", "DEVELOPMENT", "3D"],
    description: "The heartbeat of decentralized systems. Cyber Core is a high-performance infrastructure dashboard designed for real-time monitoring of complex node networks.",
    year: "2024",
    services: ["Infrastructure Design", "Real-time Monitoring", "Brand Identity"],
    url: "#",
    next: { id: 5, title: "Synthetic Human" }
  },
  {
    id: 5,
    title: "Synthetic Human",
    image: synthHumanImg,
    tags: ["WEB", "DESIGN", "DEVELOPMENT", "3D"],
    description: "Exploring the boundaries of digital identity. This project investigates the intersection of AI-driven personality and high-fidelity 3D human simulation.",
    year: "2024",
    services: ["AI Integration", "3D Character Support", "Digital Humanities"],
    url: "#",
    next: { id: 6, title: "DDD 2024" }
  },
  {
    id: 6,
    title: "DDD 2024",
    image: dddImg,
    tags: ["WEB", "DESIGN", "DEVELOPMENT", "3D"],
    description: "Digital Design Days 2024 identity and conference platform. A forward-thinking visual system built on the concept of 'Breaking Boundaries' in the creative industry.",
    year: "2024",
    services: ["Event Identity", "Web Platform", "Interactive Motion"],
    url: "#",
    next: { id: 7, title: "Prism AI" }
  },
  {
    id: 7,
    title: "Prism AI",
    image: prismImg,
    tags: ["WEB", "DESIGN", "DEVELOPMENT", "3D"],
    description: "Refracting possibilities. Prism AI is a generative engine that utilizes geometric optics metaphors to visualize the decision-making processes of neural networks.",
    year: "2024",
    services: ["Algorithm Viz", "Creative Coding", "Experimentation"],
    url: "#",
    next: { id: 8, title: "Solar Echo" }
  },
  {
    id: 8,
    title: "Solar Echo",
    image: solarImg,
    tags: ["CONCEPT", "3D ILLUSTRATION", "MOGRAPH"],
    description: "Capturing the resonance of celestial bodies. Solar Echo is an audio-visual journey through our solar system, where each planet's resonance affects the visual output.",
    year: "2024",
    services: ["Audio-Visual Perf", "Solar Physics Data", "Generative Art"],
    url: "#",
    next: { id: 9, title: "Nebula Forge" }
  },
  {
    id: 9,
    title: "Nebula Forge",
    image: birdImg,
    tags: ["SHADERS", "WEBGL", "3D", "DESIGN"],
    description: "Constructing cosmic wonders. Nebula Forge provides creators with advanced shader-based tools to generate procedurally accurate cosmic phenomena for digital media.",
    year: "2024",
    services: ["Shader Development", "Tool Design", "VFX"],
    url: "#",
    next: { id: 10, title: "Titan OS" }
  },
  {
    id: 10,
    title: "Titan OS",
    image: heroCharImg,
    tags: ["UI/UX", "PRODUCT", "SYSTEM", "DESIGN"],
    description: "The next evolution of desktop computing. Titan OS reimagines the operating system as a unified, spatial environment optimized for productivity and creativity.",
    year: "2024",
    services: ["OS Design", "Spatial Computing", "System Iconography"],
    url: "#",
    next: { id: 1, title: "Spaace - NFT Marketplace" }
  }
];

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const project = PROJECTS_DATA.find(p => p.id === parseInt(id)) || PROJECTS_DATA[0];

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the horizontal translation
  // We have 5 sections of content: Hero, 3 Squares, 1 Layer, 2 Squares, Footer
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-[#0B0C0E] text-white font-sans selection:bg-[#00E5FF] selection:text-black min-h-screen">
      {/* Navigation / Back Button */}
      <nav className="fixed top-0 left-0 w-full z-50 px-10 py-12 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => navigate('/projects')}
          className="group flex items-center gap-3 text-white pointer-events-auto"
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-[11px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Back to Projects</span>
        </button>
      </nav>

      {/* Main Container providing vertical scroll space */}
      <div ref={targetRef} className="relative h-[500vh]">
        {/* Sticky Wrapper - Viewport Size */}
        <div className="sticky top-0 h-screen overflow-hidden bg-[#0B0C0E]">
          {/* Horizontal Track */}
          <motion.div style={{ x }} className="flex h-full w-[500vw]">
            
            {/* SECTION 1: HERO (Title & Image) */}
            <section className="relative w-screen h-full flex flex-col md:flex-row items-center px-10 md:px-20 pt-20">
              <div className="w-full md:w-2/5 pr-10 md:pr-20 z-10 flex flex-col justify-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl md:text-7xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.95] mb-8"
                >
                  {project.title}
                </motion.h1>
                <motion.p
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 0.6 }}
                   transition={{ delay: 0.8, duration: 1 }}
                   className="text-lg md:text-xl max-w-md leading-relaxed"
                >
                  {project.description}
                </motion.p>
                
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 1, duration: 0.8 }}
                   className="mt-12"
                >
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all group pointer-events-auto"
                  >
                    <span className="text-xs font-bold tracking-widest uppercase">Launch Project</span>
                    <ExternalLink size={16} />
                  </a>
                </motion.div>
              </div>

              <div className="w-full md:w-3/5 h-[50vh] md:h-[75vh] relative mt-10 md:mt-0">
                <motion.div
                  layoutId={`project-image-${project.id}`}
                  transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
                  className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl"
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                </motion.div>
              </div>
            </section>

            {/* SECTION 2: 3 SQUARES GALLERY */}
            <section className="relative w-screen h-full flex items-center justify-center p-10 md:p-20 gap-8">
              <div className="w-1/3 h-[50vh] md:h-[65vh] rounded-3xl overflow-hidden glass shadow-2xl transition-all duration-700 hover:scale-105">
                 <img src={project.image} alt="Detail" className="w-full h-full object-cover scale-150 object-left-top mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
              </div>
              <div className="w-1/3 h-[50vh] md:h-[65vh] rounded-3xl overflow-hidden glass shadow-2xl transition-all duration-700 hover:scale-105 translate-y-12">
                 <img src={project.image} alt="Detail" className="w-full h-full object-cover scale-150 object-center mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
              </div>
              <div className="w-1/3 h-[50vh] md:h-[65vh] rounded-3xl overflow-hidden glass shadow-2xl transition-all duration-700 hover:scale-105 -translate-y-12">
                 <img src={project.image} alt="Detail" className="w-full h-full object-cover scale-150 object-right-bottom mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
              </div>
            </section>

            {/* SECTION 3: 1 WHOLE LAYER */}
            <section className="relative w-screen h-full p-10 py-20 flex items-center justify-center">
               <div className="w-full h-[80vh] rounded-[3rem] overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
                  <img src={project.image} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out mix-blend-luminosity group-hover:mix-blend-normal" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-1000 flex items-center justify-center">
                     <h2 className="text-7xl md:text-[12vw] font-black text-white/20 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform scale-90 group-hover:scale-100 mix-blend-overlay">
                        {project.title.split(' ')[0]}
                     </h2>
                  </div>
               </div>
            </section>

            {/* SECTION 4: 2 SQUARES GALLERY */}
            <section className="relative w-screen h-full flex items-center justify-center p-10 md:p-20 gap-12">
              <div className="w-1/2 h-[70vh] rounded-[3rem] overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 shadow-xl group">
                <img src={project.image} className="w-full h-full object-cover object-bottom scale-110 group-hover:scale-100 transition-transform duration-1000" />
                <div className="absolute bottom-10 left-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <h3 className="text-2xl font-bold tracking-widest uppercase mb-2 text-[#00E5FF]">UX Methodology</h3>
                   <p className="max-w-md text-sm text-white/70">Seamless integration of form and function through rigorous usability testing.</p>
                </div>
              </div>
              <div className="w-1/2 h-[70vh] rounded-[3rem] overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 shadow-xl mt-24 group">
                <img src={project.image} className="w-full h-full object-cover object-top scale-110 group-hover:scale-100 transition-transform duration-1000" />
                <div className="absolute bottom-10 left-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <h3 className="text-2xl font-bold tracking-widest uppercase mb-2 text-[#00E5FF]">Technical Stack</h3>
                   <p className="max-w-md text-sm text-white/70">Engineered with cutting-edge front-end technologies for ultimate performance.</p>
                </div>
              </div>
            </section>

            {/* SECTION 5: FOOTER IN THE SIDE */}
            <section className="relative w-screen h-full overflow-y-auto">
               <Footer />
            </section>

          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px white;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;
