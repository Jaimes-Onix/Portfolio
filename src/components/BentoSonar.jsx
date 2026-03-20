import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './BentoSonar.css';

const SCATTERED_ICONS = [
    { id: 1, icon: "fas fa-shield-halved", color: "#00f2ff", position: { top: "10%", left: "10%" }, delay: 0.1 },
    { id: 2, icon: "fas fa-bolt", color: "#ffae00", position: { top: "20%", right: "12%" }, delay: 0.3 },
    { id: 3, icon: "fas fa-code", color: "#00ff88", position: { bottom: "15%", left: "15%" }, delay: 0.5 },
    { id: 4, icon: "fas fa-layer-group", color: "#bd00ff", position: { bottom: "10%", right: "10%" }, delay: 0.7 },
];

const BentoSonar = () => {
    // Mouse Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
    
    const rotateX = useTransform(springY, [-150, 150], [15, -15]);
    const rotateY = useTransform(springX, [-150, 150], [-15, 15]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const moveX = e.clientX - (rect.left + rect.width / 2);
        const moveY = e.clientY - (rect.top + rect.height / 2);
        mouseX.set(moveX);
        mouseY.set(moveY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <div 
            className="bento-sonar-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="sonar-bg-mesh"></div>
            
            {/* Scattered Icons */}
            <div className="bento-scattered-icons">
                {SCATTERED_ICONS.map((item) => (
                    <motion.div
                        key={item.id}
                        className="bento-icon-stack"
                        style={{ ...item.position }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: item.delay, duration: 0.8 }}
                    >
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`bento-icon-shard ${i === 2 ? 'glow' : ''}`}
                                style={{
                                    transform: `translateZ(${i * 8}px)`,
                                    opacity: 0.2 + (i * 0.3),
                                    zIndex: i
                                }}
                                animate={{
                                    x: [0, (i + 1) * 1.5, 0],
                                    y: [0, (i + 1) * -1.5, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.2
                                }}
                            >
                                {i === 2 && <i className={item.icon} style={{ color: item.color }}></i>}
                            </motion.div>
                        ))}
                    </motion.div>
                ))}
            </div>

            {/* Central Sonar */}
            <motion.div 
                className="bento-sonar-wrapper"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
                <div className="bento-sonar-ring"></div>
                <div className="bento-sonar-ring"></div>
                <div className="bento-sonar-ring"></div>
                
                <motion.div 
                    className="bento-sonar-center"
                    style={{ transform: "translateZ(20px)" }}
                    animate={{ 
                        boxShadow: ["0 0 15px rgba(255,255,255,0.05)", "0 0 30px rgba(255,255,255,0.15)", "0 0 15px rgba(255,255,255,0.05)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <i className="fas fa-bolt bento-sonar-icon"></i>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default BentoSonar;
