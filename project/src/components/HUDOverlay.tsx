import React from 'react';
import { Rocket, Globe, Thermometer, Users, MapPin, Zap } from 'lucide-react';
import { PlanetData } from '../types/solar-system';

interface HUDOverlayProps {
  selectedPlanet: PlanetData | null;
  onPlanetSelect: (planet: PlanetData) => void;
  planets: PlanetData[];
  onResetView: () => void;
}

export default function HUDOverlay({ 
  selectedPlanet, 
  onPlanetSelect, 
  planets, 
  onResetView 
}: HUDOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top Status Bar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
        <div className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4 text-cyan-400 font-mono">
          <div className="flex items-center gap-2 mb-2">
            <Rocket className="w-5 h-5" />
            <span className="text-lg font-bold">SOLAR SYSTEM COMMAND</span>
          </div>
          <div className="text-sm space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Mission Status: ACTIVE</span>
            </div>
            <div>Date: {new Date().toISOString().split('T')[0]}</div>
          </div>
        </div>

        <button
          onClick={onResetView}
          className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-3 text-cyan-400 font-mono hover:bg-cyan-500/20 transition-colors"
        >
          <Globe className="w-5 h-5" />
        </button>
      </div>

      {/* Planet Selection Panel */}
      <div className="absolute top-4 right-4 w-80 max-h-96 overflow-y-auto pointer-events-auto">
        <div className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4">
          <h3 className="text-cyan-400 font-mono font-bold mb-3">CELESTIAL BODIES</h3>
          <div className="space-y-2">
            {planets.map((planet) => (
              <button
                key={planet.name}
                onClick={() => onPlanetSelect(planet)}
                className={`w-full text-left p-2 rounded border transition-all duration-200 ${
                  selectedPlanet?.name === planet.name
                    ? 'bg-cyan-500/30 border-cyan-400 text-cyan-300'
                    : 'bg-black/20 border-gray-600 text-gray-300 hover:bg-gray-700/30 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: planet.color }}
                  />
                  <span className="font-mono text-sm">{planet.name.toUpperCase()}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Planet Details Panel */}
      {selectedPlanet && (
        <div className="absolute bottom-4 left-4 w-96 pointer-events-auto">
          <div className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-6 text-cyan-400 font-mono">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: selectedPlanet.color }}
              />
              <h2 className="text-xl font-bold">{selectedPlanet.name.toUpperCase()}</h2>
            </div>
            
            <p className="text-cyan-300 text-sm mb-4 leading-relaxed">
              {selectedPlanet.description}
            </p>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-gray-300">Distance:</span>
                <span className="text-cyan-300">{selectedPlanet.distance}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                <span className="text-gray-300">Temperature:</span>
                <span className="text-cyan-300">{selectedPlanet.temperature}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="text-gray-300">Composition:</span>
                <span className="text-cyan-300">{selectedPlanet.composition}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-gray-300">Moons:</span>
                <span className="text-cyan-300">{selectedPlanet.moons}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Instructions */}
      <div className="absolute bottom-4 right-4 pointer-events-auto">
        <div className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4 text-cyan-400 font-mono text-sm">
          <h4 className="font-bold mb-2">NAVIGATION</h4>
          <div className="space-y-1 text-xs">
            <div>• Click planets to focus</div>
            <div>• Drag to orbit</div>
            <div>• Scroll to zoom</div>
            <div>• Right-click + drag to pan</div>
          </div>
        </div>
      </div>
    </div>
  );
}