import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, ExternalLink, Github, Mail, Linkedin, Palette, Code, Layout } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import AboutMe from './pages/AboutMe';
import Companies from './pages/Companies';

import LoadingScreen from './components/LoadingScreen';
import PageLoader from './components/PageLoader';
import { AnimatePresence } from 'framer-motion';

// Helper for Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// -----------------------------------------------------------------------------
// THREE.JS BACKGROUND COMPONENT
// -----------------------------------------------------------------------------
const ThreeBackground = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create a "Star" Particle System (4-pointed stars)
    const starCount = 40;
    const stars = [];

    // Custom 4-pointed star geometry
    const createStarShape = (size) => {
      const shape = new THREE.Shape();
      const s = size;
      const inner = s * 0.15;
      
      shape.moveTo(0, s);
      shape.quadraticCurveTo(inner, inner, s, 0);
      shape.quadraticCurveTo(inner, -inner, 0, -s);
      shape.quadraticCurveTo(-inner, -inner, -s, 0);
      shape.quadraticCurveTo(-inner, inner, 0, s);
      
      return new THREE.ShapeGeometry(shape);
    };

    const starMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });

    for (let i = 0; i < starCount; i++) {
        const size = Math.random() * 2 + 0.5;
        const star = new THREE.Mesh(createStarShape(size), starMaterial.clone());
        
        star.position.set(
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 40
        );
        star.rotation.z = Math.random() * Math.PI;
        star.userData = {
            rotSpeed: (Math.random() - 0.5) * 0.01,
            floatSpeed: Math.random() * 0.005,
            initialY: star.position.y
        };
        scene.add(star);
        stars.push(star);
    }

    camera.position.z = 40;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      const scrollValue = smoothScroll.get();
      const time = Date.now() * 0.001;
      
      stars.forEach((star, i) => {
          star.rotation.z += star.userData.rotSpeed;
          // Subtle floating
          star.position.y = star.userData.initialY + Math.sin(time + i) * 1;
          
          // Pulsing opacity
          star.material.opacity = 0.3 + Math.sin(time * 2 + i) * 0.3;
      });
      
      // Reactive to scroll: camera moves through the space
      camera.position.z = 40 - scrollValue * 30;
      camera.rotation.y = scrollValue * 0.8;
      camera.position.y = -scrollValue * 10;
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 opacity-60 pointer-events-none" />;
};

// -----------------------------------------------------------------------------
// NAV COMPONENT
// -----------------------------------------------------------------------------
const Navbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About Me', path: '/about' },
    { name: 'Companies', path: '/companies' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 glass rounded-b-3xl mx-4 mt-4 max-w-7xl lg:mx-auto">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
            <div className="w-4 h-4 rounded-full bg-background" />
        </div>
        <div className="text-xl font-bold tracking-tighter">PORTFOLIO.</div>
      </Link>
      <div className="hidden md:flex gap-12 text-sm font-medium text-muted-foreground">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.path} 
            className={cn(
              "hover:text-white transition-colors uppercase tracking-widest text-[10px]",
              location.pathname === link.path && "text-white font-black"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button className="px-5 py-2 rounded-full border border-white/10 text-white text-xs font-bold hover:bg-white/5 transition-colors">
          Download CV
        </button>
        <button className="px-5 py-2 rounded-full bg-white text-black text-xs font-bold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Let's Talk
        </button>
      </div>
    </nav>
  );
};

// -----------------------------------------------------------------------------
// NAVIGATION WRAPPER (Handles route transitions)
// -----------------------------------------------------------------------------
const NavigationWrapper = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      // Wait for a bit to show the loader, then switch content
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
      }, 700); // Duration to show the loading animation
      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning && <PageLoader key="page-loader" />}
      </AnimatePresence>
      <div className={cn("transition-opacity duration-300", isTransitioning ? "opacity-0" : "opacity-100")}>
        {React.cloneElement(children, { location: displayLocation })}
      </div>
    </>
  );
};


// -----------------------------------------------------------------------------
// PROJECT CARD
// -----------------------------------------------------------------------------
const ProjectCard = ({ title, category, image, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl bg-secondary aspect-[4/5]"
    >
      {image && (
        <img 
          src={image} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-0 bg-primary/10 scale-110 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform">
        <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-widest">{category}</p>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <button className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity delay-100">
          View Project <ExternalLink size={16} />
        </button>
      </div>
    </motion.div>
  );
};

// -----------------------------------------------------------------------------
// MAIN APP COMPONENT
// -----------------------------------------------------------------------------
export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <Router>
      <div className="min-h-screen selection:bg-primary selection:text-white">
        <ThreeBackground />

        <Navbar />

        <NavigationWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/companies" element={<Companies />} />
          </Routes>
        </NavigationWrapper>

        {/* FINAL CTA / CONTACT (Always visible at bottom) */}
        <section id="contact" className="py-20 px-4 text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="max-w-6xl mx-auto glass rounded-[4rem] py-32 md:py-48 px-8 overflow-hidden relative border-white/5"
          >
            {/* Subtle light leak */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />

            <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter mb-12 text-white leading-none">LET'S BUILD<br />TOGETHER.</h2>
            <a href="mailto:hello@seo-ux.com" className="group text-2xl md:text-5xl font-bold tracking-tight text-neutral-400 hover:text-white transition-colors flex items-center justify-center gap-6">
              hello@designer.portfolio
              <div className="w-16 h-16 rounded-full glass flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all group-hover:rotate-45 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                   <ExternalLink size={24} />
              </div>
            </a>
            
            <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-neutral-500 text-[9px] uppercase tracking-[0.4em] font-black">
              <p>© 2026 UI/UX DESIGNER PORTFOLIO. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-12">
                 <a href="#" className="hover:text-white transition-colors">Behance</a>
                 <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                 <a href="#" className="hover:text-white transition-colors">Dribbble</a>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </Router>
  );
}
