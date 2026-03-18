import React from 'react';
import { motion } from 'framer-motion';

const PageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-black flex items-center justify-center pointer-events-auto"
    >
      <div className="loader-wrapper translate-y-[-20%] scale-75 md:scale-100">
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
          <div className="loader-shadow"></div>
          <div className="loader-shadow"></div>
          <div className="loader-shadow"></div>
      </div>
    </motion.div>
  );
};

export default PageLoader;
