import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const FRAME_COUNT = 151; // Matching the 151 frames found in /Images/

const HeroCanvas = () => {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Map scroll progress (0-1) to frame index (1-151)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);
  
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload Images
  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages = [];
      let loadedCount = 0;

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const n = String(i).padStart(3, '0');
        img.src = `/Images/ezgif-frame-${n}.jpg`; 
        
        img.onload = () => {
          loadedCount++;
          if (loadedCount === FRAME_COUNT) {
            setIsLoaded(true);
          }
        };
        // Handle error by showing a nice placeholder or single image
        img.onerror = () => {
          // If frames fail, we'll just use a single high-quality developer-theme image
          img.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070';
          loadedCount++;
          if (loadedCount === FRAME_COUNT) setIsLoaded(true);
        };
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };

    preloadImages();
  }, []);

  // Draw to Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const context = canvas.getContext('2d');
    
    // Smooth frame lerping
    const render = () => {
      const currentFrame = Math.floor(frameIndex.get());
      const img = images[currentFrame - 1] || images[0];
      
      if (img && img.complete) {
        // Handle responsive canvas sizing
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        context.scale(dpr, dpr);

        // Aspect ratio coverage (object-fit: cover)
        const canvasAspect = window.innerWidth / window.innerHeight;
        const imgAspect = img.width / img.height;
        let drawW, drawH, drawX, drawY;

        if (canvasAspect > imgAspect) {
          drawW = window.innerWidth;
          drawH = drawW / imgAspect;
          drawX = 0;
          drawY = (window.innerHeight - drawH) / 2;
        } else {
          drawH = window.innerHeight;
          drawW = drawH * imgAspect;
          drawX = (window.innerWidth - drawW) / 2;
          drawY = 0;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, drawX, drawY, drawW, drawH);
      }
    };

    const unsubscribe = frameIndex.onChange(render);
    render(); // Initial draw

    return () => unsubscribe();
  }, [images, frameIndex]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover opacity-60 pointer-events-none"
        style={{ width: '100vw', height: '100vh' }}
        role="img"
        aria-label="Interactive Developer Hero Sequence"
      />
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001827]/40 via-transparent to-[#001827]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-1000">
          <div className="w-16 h-16 border-4 border-white/5 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default HeroCanvas;
