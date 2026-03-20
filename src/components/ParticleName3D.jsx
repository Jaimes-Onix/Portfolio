import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleName3D({ text, isCollapsing, onCollapseComplete }) {
  const pointsRef = useRef();
  const stateRef = useRef({ phase: 'forming', collapsedFired: false });

  // Generate target positions from an offscreen 2D canvas
  const { positions, targets, velocities, colors, count } = useMemo(() => {
    const canvas = document.createElement('canvas');
    // High resolution canvas to sample points from
    const width = 1200;
    const height = 200;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    ctx.font = `900 68px "Outfit", system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText(text, width / 2, height / 2);
    
    // Check if on mobile (rough estimate) to increase line breaks if needed, 
    // but the canvas is virtual so it's mainly about scaling down later.
    
    const imgData = ctx.getImageData(0, 0, width, height).data;
    const targetsArr = [];
    const colorsArr = [];
    
    // Sample densely
    const gap = 3; 
    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        const i = (y * width + x) * 4;
        if (imgData[i + 3] > 128) {
          // Centered target positions, scaled down for 3D world space
          // A multiplier of 0.013 means 1200 width -> ~15.6 units wide
          const tx = (x - width / 2) * 0.013;
          const ty = -(y - height / 2) * 0.013;
          const tz = 0;
          targetsArr.push(tx, ty, tz);
          
          if (Math.random() > 0.8) {
              colorsArr.push(1, 1, 1); // White
          } else {
              colorsArr.push(0, 0.9, 1); // Cyan
          }
        }
      }
    }
    
    const ptCount = targetsArr.length / 3;
    const positionsArr = new Float32Array(ptCount * 3);
    const velocitiesArr = new Float32Array(ptCount * 3);
    
    for (let i = 0; i < ptCount; i++) {
       // Start positions: widely scattered in 3D around the camera/scene
       positionsArr[i*3] = (Math.random() - 0.5) * 60;
       positionsArr[i*3 + 1] = (Math.random() - 0.5) * 60;
       positionsArr[i*3 + 2] = (Math.random() - 0.5) * 60 + -30;
       
       velocitiesArr[i*3] = 0;
       velocitiesArr[i*3 + 1] = 0;
       velocitiesArr[i*3 + 2] = 0;
    }
    
    return {
       positions: positionsArr,
       targets: new Float32Array(targetsArr),
       velocities: velocitiesArr,
       colors: new Float32Array(colorsArr),
       count: ptCount
    };
  }, [text]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const posAttribute = pointsRef.current.geometry.attributes.position;
    const posArray = posAttribute.array;
    const time = state.clock.elapsedTime;
    
    if (isCollapsing) {
       if (stateRef.current.phase !== 'collapsing') {
          stateRef.current.phase = 'collapsing';
          // Initialize explosive velocities
          for(let i=0; i<count; i++) {
             velocities[i*3] = (Math.random() - 0.5) * 15;
             velocities[i*3 + 1] = (Math.random() - 0.5) * 15 + 8; // strong upward burst
             velocities[i*3 + 2] = (Math.random() - 0.5) * 15 + Math.random() * 5; // push towards camera slightly
          }
       }
       
       let active = 0;
       for(let i=0; i<count; i++) {
          velocities[i*3 + 1] -= 25 * delta; // gravity
          
          posArray[i*3] += velocities[i*3] * delta;
          posArray[i*3 + 1] += velocities[i*3 + 1] * delta;
          posArray[i*3 + 2] += velocities[i*3 + 2] * delta;
          
          if (posArray[i*3 + 1] > -30) active++;
       }
       
       if (active === 0 && !stateRef.current.collapsedFired) {
          stateRef.current.collapsedFired = true;
          if (onCollapseComplete) onCollapseComplete();
       }
       
    } else {
       // Forming phase: lerp positions to target rapidly at first, then settle
       // Add some sine wave wobble for a "living" floating effect
       for(let i=0; i<count; i++) {
          const tx = targets[i*3];
          const ty = targets[i*3 + 1] + Math.sin(time * 3 + tx) * 0.05;
          const tz = targets[i*3 + 2] + Math.cos(time * 3 + ty) * 0.05;
          
          // Exponential ease towards target
          posArray[i*3] += (tx - posArray[i*3]) * delta * 4;
          posArray[i*3 + 1] += (ty - posArray[i*3 + 1]) * delta * 4;
          posArray[i*3 + 2] += (tz - posArray[i*3 + 2]) * delta * 4;
       }
    }
    
    // Gently rotate the entire text point cloud for a 3D feeling
    if (!isCollapsing) {
      pointsRef.current.rotation.y = Math.sin(time * 0.5) * 0.15;
      pointsRef.current.rotation.x = Math.cos(time * 0.5) * 0.05;
    }
    
    posAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
