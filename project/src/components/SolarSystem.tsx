import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { gsap } from 'gsap';
import Planet from './Planet';
import { planetsData } from '../data/planets';
import { PlanetData, CameraTarget } from '../types/solar-system';

interface SolarSystemProps {
  selectedPlanet: PlanetData | null;
  onPlanetSelect: (planet: PlanetData) => void;
  cameraTarget: CameraTarget | null;
}

function CameraController({ target }: { target: CameraTarget | null }) {
  const cameraRef = useRef<any>();

  useEffect(() => {
    if (target && cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        duration: 2,
        x: target.position[0],
        y: target.position[1],
        z: target.position[2],
        ease: "power2.inOut",
      });
    }
  }, [target]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 50, 100]}
      fov={60}
    />
  );
}

export default function SolarSystem({ selectedPlanet, onPlanetSelect, cameraTarget }: SolarSystemProps) {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <CameraController target={cameraTarget} />
        
        {/* Lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
        <pointLight position={[0, 0, 0]} intensity={1} color="#ffd700" distance={200} />
        
        {/* Background */}
        <Stars radius={400} depth={60} count={5000} factor={4} saturation={0} fade />
        
        {/* Planets */}
        {planetsData.map((planet) => (
          <Planet
            key={planet.name}
            data={planet}
            onClick={onPlanetSelect}
            isSelected={selectedPlanet?.name === planet.name}
          />
        ))}
        
        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.8}
          rotateSpeed={0.4}
          minDistance={10}
          maxDistance={300}
        />
      </Canvas>
    </div>
  );
}