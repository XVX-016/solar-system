import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { PlanetData } from '../types/solar-system';

interface PlanetProps {
  data: PlanetData;
  onClick: (planet: PlanetData) => void;
  isSelected: boolean;
}

export default function Planet({ data, onClick, isSelected }: PlanetProps) {
  const meshRef = useRef<Mesh>(null);
  const orbitRef = useRef<Mesh>(null);

  const time = useRef(0);

  // Create orbit path visualization
  const orbitPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      points.push([
        Math.cos(angle) * data.orbitRadius,
        0,
        Math.sin(angle) * data.orbitRadius
      ]);
    }
    return points;
  }, [data.orbitRadius]);

  useFrame((state, delta) => {
    if (meshRef.current && orbitRef.current) {
      time.current += delta;
      
      // Planet rotation
      meshRef.current.rotation.y += data.rotationSpeed;
      
      // Orbital motion (except for Sun)
      if (data.orbitRadius > 0) {
        const angle = time.current * data.orbitSpeed;
        meshRef.current.position.x = Math.cos(angle) * data.orbitRadius;
        meshRef.current.position.z = Math.sin(angle) * data.orbitRadius;
      }
    }
  });

  return (
    <group>
      {/* Orbit path */}
      {data.orbitRadius > 0 && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={orbitPoints.length}
              array={new Float32Array(orbitPoints.flat())}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color="#ffffff" 
            opacity={0.1} 
            transparent 
          />
        </line>
      )}
      
      {/* Planet */}
      <mesh
        ref={meshRef}
        position={data.position}
        onClick={() => onClick(data)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.name === 'Sun' ? data.color : '#000000'}
          emissiveIntensity={data.name === 'Sun' ? 0.3 : 0}
        />
        
        {/* Selection ring */}
        {isSelected && (
          <mesh>
            <ringGeometry args={[data.size * 1.2, data.size * 1.3, 32]} />
            <meshBasicMaterial 
              color="#00ff88" 
              side={2} 
              transparent 
              opacity={0.8}
            />
          </mesh>
        )}
      </mesh>
    </group>
  );
}