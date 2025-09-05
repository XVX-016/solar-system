export interface PlanetData {
  name: string;
  position: [number, number, number];
  size: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  description: string;
  distance: string;
  composition: string;
  temperature: string;
  moons: number;
}

export interface CameraTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
}