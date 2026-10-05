"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

// Sample coordinates (lat, lon) for travel destinations
const DESTINATIONS = [
  { name: "Colombo (Sri Lanka)", lat: 6.9271, lon: 79.8612, color: "#10b981" },
  { name: "Paris (France)", lat: 48.8566, lon: 2.3522, color: "#f59e0b" },
  { name: "Tokyo (Japan)", lat: 35.6762, lon: 139.6503, color: "#ef4444" },
  { name: "New York (USA)", lat: 40.7128, lon: -74.006, color: "#3b82f6" },
  { name: "Sydney (Australia)", lat: -33.8688, lon: 151.2093, color: "#ec4899" },
  { name: "Dubai (UAE)", lat: 25.2048, lon: 55.2708, color: "#eab308" },
];

// Utility: convert lat/lon to 3D Cartesian coordinates on sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Curved flight path between two points
function FlightArc({ start, end, radius }: { start: THREE.Vector3; end: THREE.Vector3; radius: number }) {
  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    // Push the mid point outwards based on distance
    mid.normalize().multiplyScalar(radius + distance * 0.25);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end, radius]);

  const points = useMemo(() => curve.getPoints(50), [curve]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#38bdf8", transparent: true, opacity: 0.6, linewidth: 2 }))} />
  );
}

function Globe() {
  const globeRef = useRef<THREE.Group>(null);
  const radius = 2;

  // Gentle auto-rotation
  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
  });

  const destinationVectors = useMemo(() => {
    return DESTINATIONS.map((d) => ({
      ...d,
      position: latLonToVector3(d.lat, d.lon, radius),
    }));
  }, [radius]);

  // Arcs from Colombo (origin) to other destinations
  const colomboPos = destinationVectors[0].position;

  return (
    <group ref={globeRef}>
      {/* Base Globe Sphere */}
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.7}
          metalness={0.1}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe Grid Layer */}
      <mesh>
        <sphereGeometry args={[radius * 1.002, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Outer Atmosphere Glow */}
      <mesh>
        <sphereGeometry args={[radius * 1.15, 32, 32]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Destination Markers */}
      {destinationVectors.map((dest, i) => (
        <group key={i} position={dest.position}>
          <mesh>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color={dest.color} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.05, 0.08, 16]} />
            <meshBasicMaterial color={dest.color} side={THREE.DoubleSide} transparent opacity={0.7} />
          </mesh>
        </group>
      ))}

      {/* Flight Paths from Colombo to other destinations */}
      {destinationVectors.slice(1).map((dest, i) => (
        <FlightArc key={i} start={colomboPos} end={dest.position} radius={radius} />
      ))}
    </group>
  );
}

export default function TravelGlobe() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Interactive 3D Globe (Three.js)
        </span>
        <h3 className="text-white font-semibold text-lg mt-2">Explore Destinations</h3>
        <p className="text-slate-400 text-xs">Drag to rotate • Scroll to zoom</p>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#38bdf8" />
        <pointLight position={[0, 5, 0]} intensity={1} color="#38bdf8" />

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <Globe />
        </Float>

        <OrbitControls
          enableZoom={true}
          minDistance={3.2}
          maxDistance={8}
          enablePan={false}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
