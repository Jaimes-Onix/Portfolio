import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, MoreVertical, LayoutGrid } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ProjectGridCard from '../components/ProjectGridCard';

// Using existing assets
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
  },
  {
    id: 2,
    title: "Choo Choo World",
    image: luminaImg,
    tags: ["CONCEPT", "WEB", "GAME DESIGN", "3D"],
  },
  {
    id: 3,
    title: "Void Analytics",
    image: voidImg,
    tags: ["WEB", "DESIGN", "DEVELOPMENT", "3D"],
  },
  {
    id: 4,
    title: "Cyber Core",
    image: heroImg,
    tags: ["WEB", "DESIGN", "DEVELOPMENT", "3D"],
  },
  {
    id: 5,
    title: "Synthetic Human",
    image: synthHumanImg,
    tags: ["WEB", "DESIGN", "DEVELOPMENT", "3D"],
  },
  {
    id: 6,
    title: "DDD 2024",
    image: dddImg,
    tags: ["WEB", "DESIGN", "DEVELOPMENT", "3D"],
  },
  {
    id: 7,
    title: "Prism AI",
    image: prismImg,
    tags: ["WEB", "DESIGN", "DEVELOPMENT", "3D"],
  },
  {
    id: 8,
    title: "Solar Echo",
    image: solarImg,
    tags: ["CONCEPT", "3D ILLUSTRATION", "MOGRAPH"],
  },
  {
    id: 9,
    title: "Nebula Forge",
    image: birdImg,
    tags: ["SHADERS", "WEBGL", "3D", "DESIGN"],
  },
  {
    id: 10,
    title: "Titan OS",
    image: heroCharImg,
    tags: ["UI/UX", "PRODUCT", "SYSTEM", "DESIGN"],
  }
];

const Projects = () => {
  return (
    <PageTransition>
      <div className="bg-transparent text-white min-h-screen font-sans pt-32 pb-20 px-10 md:px-32 lg:px-48 xl:px-64 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectGridCard 
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Footer / Contact Section (Optional based on image) */}
        <footer className="py-20 text-center">
           <div className="w-full h-px bg-gray-200 mb-20" />
           <motion.h2 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-2xl font-medium text-gray-400 uppercase tracking-[0.2em]"
           >
             Ready to start a project?
           </motion.h2>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Projects;
