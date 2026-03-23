import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectGridCard = ({ project, index }) => {
  const navigate = useNavigate();

  const handleProjectClick = () => {
    navigate(`/projects/${project.id}`);
  };

  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.211, 0.443, 0.28, 0.9] }
    }
  };

  const arrowVariants = {
    initial: { width: 0, opacity: 0, marginRight: 0 },
    hover: { 
      width: "auto", 
      opacity: 1, 
      marginRight: 12,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const titleVariants = {
    initial: { x: 0 },
    hover: { 
      x: 8,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: false, amount: 0.2 }}
      onClick={handleProjectClick}
      className="group cursor-pointer mb-8"
    >
      {/* Image Container with Shared Layout ID */}
      <div className="uiverse-card relative aspect-[16/10] w-full rounded-[2rem] mb-6 z-10">
        <motion.div 
          layoutId={`project-image-${project.id}`}
          transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="relative w-full h-full border-transparent overflow-hidden rounded-[2rem] bg-black shadow-sm"
        >
          <motion.img
            src={project.image}
            alt={project.title}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Metadata */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-2 mb-2"
      >
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400">
          {(project.tags || []).join(' • ')}
        </span>
      </motion.div>

      {/* Title - with Arrow and Hover Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center"
      >
        <motion.div
          variants={arrowVariants}
          className="overflow-hidden flex items-center"
        >
          <MoveRight size={32} className="text-white group-hover:text-[#00d2ff] transition-colors" />
        </motion.div>

        <motion.h3 
          variants={titleVariants}
          className="text-3xl md:text-4xl font-medium tracking-tight text-white transition-colors group-hover:text-[#00d2ff]"
        >
          {project.title}
        </motion.h3>
      </motion.div>
    </motion.div>
  );
};
export default ProjectGridCard;
