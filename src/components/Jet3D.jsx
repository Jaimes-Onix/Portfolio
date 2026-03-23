import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Helper sub-components for geometry pieces
function Body() {
  return (
    <mesh castShadow>
      {/* Main fuselage */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.25, 3.6, 16]} />
        <meshStandardMaterial color="#c8cedd" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 0, 2.05]}>
        <coneGeometry args={[0.18, 0.8, 16]} />
        <meshStandardMaterial color="#d4d8e8" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Tail taper */}
      <mesh position={[0, 0.05, -1.85]}>
        <coneGeometry args={[0.14, 0.6, 16]} />
        <meshStandardMaterial color="#c0c4d4" metalness={0.85} roughness={0.2} />
      </mesh>
    </mesh>
  );
}

function Wings() {
  return (
    <group>
      {/* Main wing – left */}
      <mesh position={[-1.35, -0.04, 0.2]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[2.4, 0.045, 0.7]} />
        <meshStandardMaterial color="#b8bccf" metalness={0.88} roughness={0.18} />
      </mesh>
      {/* Main wing – right */}
      <mesh position={[1.35, -0.04, 0.2]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[2.4, 0.045, 0.7]} />
        <meshStandardMaterial color="#b8bccf" metalness={0.88} roughness={0.18} />
      </mesh>
      {/* Wing tip – left */}
      <mesh position={[-2.44, 0.12, 0.2]} rotation={[0, 0, -0.32]}>
        <boxGeometry args={[0.38, 0.04, 0.5]} />
        <meshStandardMaterial color="#a0a4b8" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Wing tip – right */}
      <mesh position={[2.44, 0.12, 0.2]} rotation={[0, 0, 0.32]}>
        <boxGeometry args={[0.38, 0.04, 0.5]} />
        <meshStandardMaterial color="#a0a4b8" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

function Tail() {
  return (
    <group>
      {/* Vertical stabiliser */}
      <mesh position={[0, 0.38, -1.6]}>
        <boxGeometry args={[0.045, 0.7, 0.55]} />
        <meshStandardMaterial color="#b0b4c8" metalness={0.88} roughness={0.18} />
      </mesh>
      {/* Horizontal stabiliser – left */}
      <mesh position={[-0.6, 0.1, -1.7]}>
        <boxGeometry args={[1.1, 0.04, 0.4]} />
        <meshStandardMaterial color="#b0b4c8" metalness={0.88} roughness={0.18} />
      </mesh>
      {/* Horizontal stabiliser – right */}
      <mesh position={[0.6, 0.1, -1.7]}>
        <boxGeometry args={[1.1, 0.04, 0.4]} />
        <meshStandardMaterial color="#b0b4c8" metalness={0.88} roughness={0.18} />
      </mesh>
    </group>
  );
}

function Engines() {
  const mat = <meshStandardMaterial color="#888ca0" metalness={0.92} roughness={0.12} />;
  return (
    <group>
      {/* Left engine */}
      <mesh position={[-1.05, -0.18, 0.55]}>
        <cylinderGeometry args={[0.1, 0.13, 0.55, 12]} />
        {mat}
      </mesh>
      {/* Right engine */}
      <mesh position={[1.05, -0.18, 0.55]}>
        <cylinderGeometry args={[0.1, 0.13, 0.55, 12]} />
        {mat}
      </mesh>
      {/* Engine intake glow left */}
      <mesh position={[-1.05, -0.18, 0.84]}>
        <circleGeometry args={[0.09, 12]} />
        <meshStandardMaterial color="#3a7bd5" emissive="#3a7bd5" emissiveIntensity={1.2} />
      </mesh>
      {/* Engine intake glow right */}
      <mesh position={[1.05, -0.18, 0.84]}>
        <circleGeometry args={[0.09, 12]} />
        <meshStandardMaterial color="#3a7bd5" emissive="#3a7bd5" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function ExhaustTrail() {
  // Elongated cone behind tail = contrail suggestion
  return (
    <group>
      <mesh position={[0, 0, -2.6]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.08, 2.0, 8]} />
        <meshStandardMaterial color="white" transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, 0, -3.8]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.14, 2.4, 8]} />
        <meshStandardMaterial color="white" transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

const Jet3D = () => {
  const groupRef = useRef();
  const t = useRef(0);

  useFrame((state, delta) => {
    t.current += delta;
    if (!groupRef.current) return;
    // Gentle float
    groupRef.current.position.y = Math.sin(t.current * 0.6) * 0.12;
    // Slow roll / banking
    groupRef.current.rotation.z = Math.sin(t.current * 0.35) * 0.06;
    // Nose pitch
    groupRef.current.rotation.x = Math.sin(t.current * 0.45 + 1) * 0.035;
    // Slow yaw drift
    groupRef.current.rotation.y = -Math.PI / 2 + Math.sin(t.current * 0.22) * 0.08;
  });

  return (
    // Rotate so nose points toward camera (Z → screen)
    <group ref={groupRef} rotation={[0, -Math.PI / 2, 0]} scale={0.82}>
      <Body />
      <Wings />
      <Tail />
      <Engines />
      <ExhaustTrail />
    </group>
  );
};

export default Jet3D;
