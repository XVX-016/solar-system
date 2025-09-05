import React, { useState } from 'react';
import SolarSystem from './components/SolarSystem';
import HUDOverlay from './components/HUDOverlay';
import { planetsData } from './data/planets';
import { PlanetData, CameraTarget } from './types/solar-system';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [cameraTarget, setCameraTarget] = useState<CameraTarget | null>(null);

  const handlePlanetSelect = (planet: PlanetData) => {
    setSelectedPlanet(planet);
    
    // Calculate camera position for selected planet
    const distance = planet.size * 8;
    setCameraTarget({
      position: [
        planet.position[0] + distance,
        planet.size * 4,
        planet.position[2] + distance
      ],
      lookAt: planet.position
    });
  };

  const handleResetView = () => {
    setSelectedPlanet(null);
    setCameraTarget({
      position: [0, 50, 100],
      lookAt: [0, 0, 0]
    });
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <SolarSystem
        selectedPlanet={selectedPlanet}
        onPlanetSelect={handlePlanetSelect}
        cameraTarget={cameraTarget}
      />
      
      <HUDOverlay
        selectedPlanet={selectedPlanet}
        onPlanetSelect={handlePlanetSelect}
        planets={planetsData}
        onResetView={handleResetView}
      />
    </div>
  );
}

export default App;