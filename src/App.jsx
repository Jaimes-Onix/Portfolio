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
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Clients', path: '/clients' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-5 border-b border-white/5 backdrop-blur-xl bg-black/20 mx-4 mt-4 max-w-7xl lg:mx-auto rounded-3xl">
      <audio ref={audioRef} src="/audio/ambient.mp3" loop />
      
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
            <div className="w-4 h-4 rounded-full bg-black" />
        </div>
        <div className="text-xl font-black tracking-tighter text-white">JAIMES.EDWARD</div>
      </Link>

      <div className="hidden md:flex gap-10">
        {navLinks.map((link) => (
          <NavLink 
            key={link.name} 
            to={link.path} 
            className={({ isActive }) => cn(
              "text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:translate-y-[-1px]",
              isActive ? "text-white" : "text-white/40 hover:text-white"
            )}
          >
            {link.name}
          </NavLink>
        ))}
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
          
          {isPlaying && (
            <motion.div 
              layoutId="glow"
              className="absolute inset-0 rounded-full bg-[#00d2ff]/20 blur-md -z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </button>

        <Link to="/about" className="hidden sm:block px-6 py-2.5 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#00d2ff] transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95">
          Join Mission
        </Link>
      </div>
    </nav>
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
