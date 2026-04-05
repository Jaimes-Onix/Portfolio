import React, { useEffect, useRef, useState, useMemo } from 'react';
import { 
  Routes, 
  Route, 
  Link, 
  useLocation,
  NavLink
} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  VolumeX 
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import AboutMe from './pages/AboutMe';
import Companies from './pages/Companies';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';
import MegaMenu from './components/MegaMenu';

// Helper for Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// -----------------------------------------------------------------------------
// HELPER COMPONENTS
// -----------------------------------------------------------------------------
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/bg-video.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
    </div>
  );
};

// -----------------------------------------------------------------------------
// NAV COMPONENT
// -----------------------------------------------------------------------------
const Navbar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Autoplay logic (browser might block initially until user interaction)
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
          // Fade in
          let vol = 0;
          const fade = setInterval(() => {
            if (vol < 0.3) {
              vol += 0.05;
              audio.volume = vol;
            } else {
              clearInterval(fade);
            }
          }, 100);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Fade out
      let vol = audio.volume;
      const fade = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.05;
          audio.volume = vol;
        } else {
          audio.pause();
          setIsPlaying(false);
          clearInterval(fade);
        }
      }, 50);
    } else {
      audio.play();
      setIsPlaying(true);
      // Fade in
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 0.3) {
          vol += 0.05;
          audio.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 50);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', category: 'home' },
    { name: 'Projectes', path: '/projects', category: 'projects' },
    { name: 'About', path: '/about', category: 'about' },
    { name: 'Contact Us', path: '#contact' },
    { name: 'Clients and collaborators', path: '/clients' }
  ];

  const [activeMenu, setActiveMenu] = useState(null);
  const timerRef = useRef(null);

  const handleMouseEnter = (category) => {
    if (!category) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveMenu(category);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
        setActiveMenu(null);
    }, 150);
  };

  return (
    <>
      {/* Background Blur Overlay when menu is active */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[140] bg-black/40 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <nav 
        className={cn(
            "fixed top-0 left-0 right-0 z-[150] flex items-center justify-between px-8 py-4 border-b transition-all duration-500",
            activeMenu ? "bg-[#0a0c10]/95 border-white/10" : "bg-black/20 border-white/5 backdrop-blur-xl"
        )}
        onMouseLeave={handleMouseLeave}
      >
        <audio ref={audioRef} src="/audio/ambient.mp3" loop />
        
        {/* Left: Logo */}
        <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-4 h-4 rounded-full bg-black" />
                </div>
                <div className="text-xl font-black tracking-tighter text-white">JAIMES.EDWARD</div>
            </Link>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 h-full">
            {navLinks.map((link) => (
                <div 
                    key={link.name} 
                    className="relative py-2"
                    onMouseEnter={() => handleMouseEnter(link.category)}
                >
                    <NavLink 
                        to={link.path} 
                        className={({ isActive }) => cn(
                        "text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-1",
                        isActive ? "text-white" : "text-white/40 hover:text-white"
                        )}
                    >
                        {link.name}
                        {link.category && <motion.span animate={{ rotate: activeMenu === link.category ? 180 : 0 }}>▾</motion.span>}
                    </NavLink>
                </div>
            ))}

            {/* MegaMenu Portal */}
            <AnimatePresence>
                {activeMenu && (
                    <MegaMenu category={activeMenu} onMouseLeave={handleMouseLeave} />
                )}
            </AnimatePresence>
        </div>

        <div className="flex items-center gap-6">
            {/* Modern Music Toggle */}
            <button 
                onClick={toggleMusic}
                className={cn(
                    "relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                    isPlaying ? "bg-[#00d2ff]/20 text-[#00d2ff] shadow-[0_0_20px_rgba(0,210,255,0.4)]" : "bg-white/5 text-white/40"
                )}
                aria-label={isPlaying ? "Pause Music" : "Play Music"}
            >
                {isPlaying ? (
                    <div className="flex items-end gap-[2px] h-3">
                    {[1, 2, 3, 4].map(i => (
                        <motion.div 
                        key={i}
                        animate={{ height: ["40%", "100%", "40%"] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-[2px] bg-current rounded-full"
                        />
                    ))}
                    </div>
                ) : (
                    <VolumeX size={16} />
                )}
            </button>

            <Link to="/about" className="hidden sm:block px-6 py-2.5 rounded-xl bg-white text-black text-[9px] font-black uppercase tracking-widest hover:bg-[#00d2ff] transition-all hover:scale-105 active:scale-95">
                Join Mission
            </Link>
        </div>
      </nav>
    </>
  );
};



// -----------------------------------------------------------------------------
// MAIN APP COMPONENT
// -----------------------------------------------------------------------------
export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  if (loading) {
    return <LoadingScreen onLoadingComplete={() => setLoading(false)} />;
  }

  const isProjectsPage = location.pathname.startsWith('/projects');

  return (
    <div className="bg-black/20 text-white selection:bg-[#00d2ff] selection:text-black scroll-smooth min-h-screen flex flex-col">
      <ScrollToTop />
      <VideoBackground />
      <Navbar />

      <main className="relative flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/clients" element={<Companies />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
