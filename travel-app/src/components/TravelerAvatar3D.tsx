"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 3D Procedural Stylized Explorer/Traveler Boy
function TravelerBoy({ isWaving, onWave }: { isWaving: boolean; onWave: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  // Materials
  const skinMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#f7cfad", roughness: 0.6 }),
    []
  );
  const hairMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#3a2414", roughness: 0.8 }),
    []
  );
  const hatMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#8a9a5b", roughness: 0.7 }), // Olive safari hat
    []
  );
  const bandMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#543d2b", roughness: 0.6 }),
    []
  );
  const shirtMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#e8ede0", roughness: 0.7 }),
    []
  );
  const vestMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#c29b63", roughness: 0.7 }), // Khaki vest
    []
  );
  const backpackMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#b8532d", roughness: 0.7 }), // Terracotta backpack
    []
  );
  const strapMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#422817", roughness: 0.6 }),
    []
  );
  const glassMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1c2421", roughness: 0.2, metalness: 0.8 }),
    []
  );
  const goldMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#e5b869", roughness: 0.3, metalness: 0.9 }),
    []
  );

  // Animation Loop (Cursor Tracking & Idle Motion)
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Gentle breathing / body bob
    if (groupRef.current) {
      groupRef.current.position.y = -1.2 + Math.sin(t * 1.8) * 0.04;
    }

    // Head smoothly tracks user mouse cursor on the page
    if (headRef.current) {
      const targetRotY = state.pointer.x * 0.45;
      const targetRotX = -state.pointer.y * 0.35 + 0.1; // slight upward tilt looking up at content
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.08);
    }

    // Arm waving animation when clicked
    if (rightArmRef.current) {
      if (isWaving) {
        rightArmRef.current.rotation.z = Math.sin(t * 12) * 0.4 - 1.2;
        rightArmRef.current.rotation.x = -0.3;
      } else {
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.2, 0.1);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.1);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]} onClick={onWave} scale={[1.35, 1.35, 1.35]}>
      {/* ----------------- HEAD GROUP ----------------- */}
      <group ref={headRef} position={[0, 1.35, 0]}>
        {/* Head Sphere */}
        <mesh material={skinMat} position={[0, 0, 0]}>
          <sphereGeometry args={[0.42, 32, 32]} />
        </mesh>

        {/* Hair Bangs */}
        <mesh material={hairMat} position={[0, 0.18, 0.32]} rotation={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.43, 0.45, 0.22, 16]} />
        </mesh>

        {/* Ears */}
        <mesh material={skinMat} position={[-0.43, 0, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
        </mesh>
        <mesh material={skinMat} position={[0.43, 0, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
        </mesh>

        {/* Explorer Sunglasses / Goggles */}
        <group position={[0, 0.08, 0.36]}>
          <mesh material={glassMat} position={[-0.15, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.04, 24]} />
          </mesh>
          <mesh material={glassMat} position={[0.15, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.04, 24]} />
          </mesh>
          {/* Bridge */}
          <mesh material={goldMat} position={[0, 0, 0.01]}>
            <boxGeometry args={[0.08, 0.02, 0.02]} />
          </mesh>
        </group>

        {/* Cheerful Smile */}
        <mesh material={hairMat} position={[0, -0.16, 0.38]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.08, 0.018, 8, 16, Math.PI * 0.7]} />
        </mesh>

        {/* Cute Rosy Cheeks */}
        <mesh position={[-0.24, -0.1, 0.34]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#ff9e9e" transparent opacity={0.6} />
        </mesh>
        <mesh position={[0.24, -0.1, 0.34]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#ff9e9e" transparent opacity={0.6} />
        </mesh>

        {/* Safari Explorer Hat */}
        <group position={[0, 0.32, -0.02]} rotation={[-0.08, 0, 0]}>
          {/* Wide Brim */}
          <mesh material={hatMat} position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.7, 0.72, 0.04, 32]} />
          </mesh>
          {/* Hat Crown */}
          <mesh material={hatMat} position={[0, 0.14, 0]}>
            <cylinderGeometry args={[0.42, 0.47, 0.32, 32]} />
          </mesh>
          {/* Hat Leather Band */}
          <mesh material={bandMat} position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.475, 0.48, 0.07, 32]} />
          </mesh>
          {/* Gold Explorer Compass Badge */}
          <mesh material={goldMat} position={[0, 0.03, 0.475]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
          </mesh>
        </group>
      </group>

      {/* ----------------- BODY / TORSO ----------------- */}
      <group position={[0, 0.55, 0]}>
        {/* Shirt Base */}
        <mesh material={shirtMat}>
          <cylinderGeometry args={[0.34, 0.38, 0.75, 24]} />
        </mesh>

        {/* Khaki Explorer Vest */}
        <mesh material={vestMat} position={[0, -0.02, 0.02]}>
          <cylinderGeometry args={[0.36, 0.4, 0.72, 24, 1, false, Math.PI * 0.2, Math.PI * 1.6]} />
        </mesh>

        {/* Vest Pockets */}
        <mesh material={vestMat} position={[-0.18, -0.12, 0.36]}>
          <boxGeometry args={[0.12, 0.12, 0.04]} />
        </mesh>
        <mesh material={vestMat} position={[0.18, -0.12, 0.36]}>
          <boxGeometry args={[0.12, 0.12, 0.04]} />
        </mesh>

        {/* Neck Scarf (Bandana) */}
        <mesh position={[0, 0.34, 0.16]} rotation={[0.4, 0, 0]}>
          <torusGeometry args={[0.2, 0.05, 8, 24]} />
          <meshStandardMaterial color="#d94b34" roughness={0.7} />
        </mesh>

        {/* Big Adventure Backpack on Back */}
        <group position={[0, 0.05, -0.42]}>
          <mesh material={backpackMat}>
            <boxGeometry args={[0.55, 0.65, 0.32]} />
          </mesh>
          {/* Top Flap */}
          <mesh material={strapMat} position={[0, 0.28, 0.02]}>
            <boxGeometry args={[0.57, 0.12, 0.34]} />
          </mesh>
          {/* Bedroll / Sleeping Mat strapped underneath */}
          <mesh position={[0, -0.38, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.58, 20]} />
            <meshStandardMaterial color="#4f6d7a" roughness={0.8} />
          </mesh>
        </group>

        {/* Backpack Straps */}
        <mesh material={strapMat} position={[-0.2, 0.05, 0.24]}>
          <boxGeometry args={[0.06, 0.62, 0.08]} />
        </mesh>
        <mesh material={strapMat} position={[0.2, 0.05, 0.24]}>
          <boxGeometry args={[0.06, 0.62, 0.08]} />
        </mesh>
      </group>

      {/* ----------------- ARMS ----------------- */}
      {/* Left Arm (Holding brass binoculars) */}
      <group position={[-0.45, 0.8, 0.05]}>
        <mesh material={shirtMat} position={[-0.04, -0.22, 0.08]} rotation={[0.3, 0, -0.2]}>
          <cylinderGeometry args={[0.1, 0.09, 0.45, 16]} />
        </mesh>
        {/* Forearm angled up */}
        <mesh material={skinMat} position={[-0.02, -0.38, 0.22]} rotation={[-0.6, 0, 0.2]}>
          <cylinderGeometry args={[0.08, 0.075, 0.35, 16]} />
        </mesh>
        {/* Binoculars */}
        <group position={[0.04, -0.45, 0.35]} rotation={[0.4, 0.3, 0]}>
          <mesh material={goldMat} position={[-0.05, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.04, 0.16, 16]} />
          </mesh>
          <mesh material={goldMat} position={[0.05, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.04, 0.16, 16]} />
          </mesh>
          <mesh material={strapMat} position={[0, 0, 0]}>
            <boxGeometry args={[0.06, 0.03, 0.03]} />
          </mesh>
        </group>
      </group>

      {/* Right Arm (Waving or resting) */}
      <group ref={rightArmRef} position={[0.45, 0.8, 0.05]}>
        <mesh material={shirtMat} position={[0.04, -0.2, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.1, 0.09, 0.45, 16]} />
        </mesh>
        <mesh material={skinMat} position={[0.06, -0.44, 0]}>
          <cylinderGeometry args={[0.08, 0.075, 0.35, 16]} />
        </mesh>
        {/* Hand */}
        <mesh material={skinMat} position={[0.06, -0.62, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

export default function TravelerAvatar3D() {
  const [isWaving, setIsWaving] = useState(false);
  const [speechBubble, setSpeechBubble] = useState<string>("Hi! I'm Leo, your Sri Lanka guide! 👋");

  const handleInteract = () => {
    setIsWaving(true);
    const greetings = [
      "Ask me anything about Sigiriya, Aukana & Habarana! 🦁",
      "Ready to explore the 5th-century wonders with me? 🐘",
      "Look at that! Sri Lanka has so many ancient secrets! ✨",
      "I follow where you look — let's explore together! 🧭",
    ];
    const nextGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setSpeechBubble(nextGreeting);

    setTimeout(() => {
      setIsWaving(false);
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md h-[460px] sm:h-[520px] flex items-center justify-center select-none">
      {/* Interactive Speech Bubble above the avatar */}
      <div
        onClick={handleInteract}
        className="absolute top-4 z-20 cursor-pointer bg-white/95 text-[#1E232A] px-4 py-2.5 rounded-2xl shadow-xl border border-[#D5CFC5] text-xs sm:text-sm font-medium transition-all transform hover:scale-105 active:scale-95 animate-fade-in"
      >
        <span className="leading-snug">{speechBubble}</span>
        <span className="block text-[10px] text-[#738276] font-semibold uppercase mt-0.5">
          Click me to wave!
        </span>
        {/* Down arrow triangle */}
        <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white" />
      </div>

      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={1.6} color="#FFF8ED" />
        <directionalLight position={[-5, 4, -3]} intensity={0.6} color="#86D097" />
        <pointLight position={[0, 2, 2]} intensity={0.8} color="#FFD180" />

        <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.25}>
          <TravelerBoy isWaving={isWaving} onWave={handleInteract} />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.8}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>

      {/* Subtle Ground Shadow & Glow */}
      <div className="absolute bottom-4 w-40 h-8 bg-black/20 rounded-full blur-md -z-10" />
    </div>
  );
}
