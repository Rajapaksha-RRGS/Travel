"use client";

import React, { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { SITES_DATA, KEKIRAWA_CENTER, KekirawaSite } from "@/data/kekirawaSites";

interface SpatialMapProps {
  selectedSiteId: string;
  onSelectSite: (id: string) => void;
  activePlanIds: string[];
}

// 3D Arc between center and a site
function TrajectoryArc({
  start,
  end,
  isSelected,
  isInPlan,
}: {
  start: [number, number, number];
  end: [number, number, number];
  isSelected: boolean;
  isInPlan: boolean;
}) {
  const lineObj = useMemo(() => {
    const vStart = new THREE.Vector3(...start);
    const vEnd = new THREE.Vector3(...end);
    const mid = new THREE.Vector3().addVectors(vStart, vEnd).multiplyScalar(0.5);
    const dist = vStart.distanceTo(vEnd);
    mid.y += Math.max(0.6, dist * 0.45); // Elevation curve

    const curve = new THREE.QuadraticBezierCurve3(vStart, mid, vEnd);
    const points = curve.getPoints(40);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const hexColor = isSelected ? "#F59E0B" : isInPlan ? "#38BDF8" : "#38BDF8";
    const opacityVal = isSelected ? 1.0 : isInPlan ? 0.85 : 0.25;

    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(hexColor),
      transparent: true,
      opacity: opacityVal,
      linewidth: isSelected ? 2.5 : 1.5,
    });

    return new THREE.Line(geometry, material);
  }, [start, end, isSelected, isInPlan]);

  return <primitive object={lineObj} />;
}

// 3D Waypoint Pin Component with native HTML annotation (no external fonts needed)
function WaypointNode({
  site,
  isSelected,
  isInPlan,
  onSelect,
}: {
  site: KekirawaSite;
  isSelected: boolean;
  isInPlan: boolean;
  onSelect: () => void;
}) {
  const pinRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (pinRef.current && (isSelected || hovered)) {
      pinRef.current.position.y = site.position3D[1] + Math.sin(state.clock.elapsedTime * 3) * 0.08;
    }
  });

  const nodeColor = isSelected ? "#F59E0B" : isInPlan ? "#38BDF8" : "#94A3B8";

  return (
    <group
      ref={pinRef}
      position={[site.position3D[0], site.position3D[1], site.position3D[2]]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Ground Projection Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -site.position3D[1] + 0.02, 0]}>
        <ringGeometry args={[0.08, 0.12, 24]} />
        <meshBasicMaterial
          color={nodeColor}
          transparent
          opacity={isSelected ? 0.9 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Vertical Pin Line */}
      <mesh position={[0, -site.position3D[1] / 2 + 0.15, 0]}>
        <cylinderGeometry args={[0.015, 0.015, site.position3D[1] + 0.3, 8]} />
        <meshBasicMaterial color={nodeColor} transparent opacity={0.6} />
      </mesh>

      {/* Floating Node Beacon */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[isSelected ? 0.12 : 0.09, 16, 16]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={isSelected ? 0.8 : hovered ? 0.5 : 0.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Pulsing Outer Halo if selected */}
      {isSelected && (
        <mesh position={[0, 0.3, 0]}>
          <ringGeometry args={[0.18, 0.24, 24]} />
          <meshBasicMaterial color="#F59E0B" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Native HTML Label (Crisp, High-Speed, Zero External Font Latency) */}
      <Html
        position={[0, 0.52, 0]}
        center
        distanceFactor={10}
        zIndexRange={[100, 0]}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`cursor-pointer px-2 py-0.5 rounded-[2px] border text-[11px] font-mono whitespace-nowrap transition-all select-none ${
            isSelected
              ? "bg-[#070A12] text-[#F59E0B] border-[#F59E0B] font-bold shadow-lg shadow-[#F59E0B]/20 scale-105"
              : isInPlan
              ? "bg-[#070A12]/90 text-[#38BDF8] border-[#38BDF8]/60"
              : "bg-[#070A12]/80 text-[#94A3B8] border-[#1E293B] hover:text-[#F1F5F9] hover:border-[#475569]"
          }`}
        >
          {site.name.split(" ")[0]} ({site.distanceKm}km)
        </div>
      </Html>
    </group>
  );
}

// Kekirawa Center Ground-Zero Beacon
function CenterTerminal() {
  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[0.15, 0.22, 32]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <octahedronGeometry args={[0.14]} />
        <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.7} />
      </mesh>
      <Html position={[0, 0.48, 0]} center distanceFactor={10} zIndexRange={[100, 0]}>
        <div className="pointer-events-none select-none px-2 py-0.5 rounded-[2px] bg-[#070A12]/95 border border-[#38BDF8]/60 text-[10px] font-mono text-[#38BDF8] font-bold whitespace-nowrap shadow-md">
          Kekirawa Junction [0.0km]
        </div>
      </Html>
    </group>
  );
}

// 25km Radar Cartographic Grid & Concentric Rings
function CartographicGrid() {
  const rings = [1.0, 1.8, 2.6, 3.4]; // 5km, 10km, 18km, 25km
  const ringLabels = ["5 km", "10 km", "18 km", "25 km Limit"];

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      {/* Base Grid Plane */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="#070A12" />
      </mesh>

      {/* Grid Lines */}
      <gridHelper
        args={[8, 32, "#1E293B", "#0F172A"]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0.005]}
      />

      {/* Concentric Distance Rings */}
      {rings.map((r, i) => (
        <group key={i}>
          <mesh position={[0, 0, 0.01]}>
            <ringGeometry args={[r - 0.015, r + 0.015, 64]} />
            <meshBasicMaterial
              color="#38BDF8"
              transparent
              opacity={i === rings.length - 1 ? 0.35 : 0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
          <Html position={[r + 0.12, 0, 0.02]} center distanceFactor={12}>
            <span className="text-[9px] font-mono text-[#64748B] select-none pointer-events-none whitespace-nowrap">
              {ringLabels[i]}
            </span>
          </Html>
        </group>
      ))}

      {/* Cardinal Axes Lines */}
      <mesh position={[0, 0, 0.015]}>
        <planeGeometry args={[7.2, 0.015]} />
        <meshBasicMaterial color="#1E293B" />
      </mesh>
      <mesh position={[0, 0, 0.015]}>
        <planeGeometry args={[0.015, 7.2]} />
        <meshBasicMaterial color="#1E293B" />
      </mesh>

      {/* Compass Directions via HTML Markers */}
      <Html position={[0, 3.8, 0.02]} center distanceFactor={12}>
        <span className="text-[11px] font-mono text-[#94A3B8] font-bold select-none pointer-events-none whitespace-nowrap bg-[#070A12]/90 px-1.5 py-0.5 rounded-[2px] border border-[#1E293B]">
          N [Anuradhapura]
        </span>
      </Html>
      <Html position={[3.8, 0, 0.02]} center distanceFactor={12}>
        <span className="text-[10px] font-mono text-[#64748B] select-none pointer-events-none whitespace-nowrap bg-[#070A12]/90 px-1.5 py-0.5 rounded-[2px] border border-[#1E293B]">
          E [Habarana]
        </span>
      </Html>
      <Html position={[0, -3.8, 0.02]} center distanceFactor={12}>
        <span className="text-[10px] font-mono text-[#64748B] select-none pointer-events-none whitespace-nowrap bg-[#070A12]/90 px-1.5 py-0.5 rounded-[2px] border border-[#1E293B]">
          S [Dambulla]
        </span>
      </Html>
      <Html position={[-3.8, 0, 0.02]} center distanceFactor={12}>
        <span className="text-[10px] font-mono text-[#64748B] select-none pointer-events-none whitespace-nowrap bg-[#070A12]/90 px-1.5 py-0.5 rounded-[2px] border border-[#1E293B]">
          W [Kalawewa]
        </span>
      </Html>
    </group>
  );
}

function Scene({
  selectedSiteId,
  onSelectSite,
  activePlanIds,
}: SpatialMapProps) {
  const activeSite = SITES_DATA.find((s) => s.id === selectedSiteId);

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 15, 10]} intensity={1.4} color="#FFFFFF" />
      <directionalLight position={[-10, 8, -10]} intensity={0.6} color="#38BDF8" />
      <pointLight position={[0, 4, 0]} intensity={1.5} color="#38BDF8" />

      {/* Center of Kekirawa */}
      <CenterTerminal />

      {/* Cartographic Coordinate Plane */}
      <CartographicGrid />

      {/* Heritage Site Waypoints */}
      {SITES_DATA.map((site) => (
        <WaypointNode
          key={site.id}
          site={site}
          isSelected={site.id === selectedSiteId}
          isInPlan={activePlanIds.includes(site.id)}
          onSelect={() => onSelectSite(site.id)}
        />
      ))}

      {/* Trajectory Arcs from Kekirawa Center */}
      {SITES_DATA.map((site) => (
        <TrajectoryArc
          key={site.id}
          start={KEKIRAWA_CENTER.position3D}
          end={site.position3D}
          isSelected={site.id === selectedSiteId}
          isInPlan={activePlanIds.includes(site.id)}
        />
      ))}

      <OrbitControls
        enableZoom={true}
        minDistance={3.5}
        maxDistance={12}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.3}
        rotateSpeed={0.5}
        target={activeSite ? [activeSite.position3D[0] * 0.4, 0, activeSite.position3D[2] * 0.4] : [0, 0, 0]}
      />
    </>
  );
}

export default function KekirawaSpatialMap({
  selectedSiteId,
  onSelectSite,
  activePlanIds,
}: SpatialMapProps) {
  const activeSite = SITES_DATA.find((s) => s.id === selectedSiteId) || SITES_DATA[0];

  return (
    <div className="relative w-full h-[520px] md:h-[640px] bg-[#070A12] border border-[#1E293B] rounded-[2px] overflow-hidden select-none">
      {/* Top Telemetry Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between pointer-events-none gap-2">
        <div className="flex items-center gap-2 bg-[#0B0F19]/90 border border-[#1E293B] px-3 py-1.5 rounded-[2px] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
          <span className="text-xs font-mono tracking-wider text-[#F1F5F9] uppercase">
            3D Spatial Grid: 25.0 km Circuit
          </span>
          <span className="text-[10px] font-mono text-[#64748B] hidden sm:inline">
            [8.033°N, 80.583°E]
          </span>
        </div>

        <div className="flex items-center gap-2 bg-[#0B0F19]/90 border border-[#1E293B] px-3 py-1.5 rounded-[2px] backdrop-blur-md">
          <span className="text-[11px] font-mono text-[#38BDF8]">
            Planned Nodes: {activePlanIds.length} / {SITES_DATA.length}
          </span>
        </div>
      </div>

      {/* 3D Canvas with Suspense Boundary */}
      <Canvas
        camera={{ position: [0, 5.8, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <Scene
            selectedSiteId={selectedSiteId}
            onSelectSite={onSelectSite}
            activePlanIds={activePlanIds}
          />
        </Suspense>
      </Canvas>

      {/* Active Node Quick HUD Card */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0B0F19]/95 border border-[#1E293B] p-3.5 rounded-[2px] backdrop-blur-md pointer-events-auto">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#D97706] bg-[#D97706]/10 px-1.5 py-0.5 rounded-[2px] border border-[#D97706]/30">
              Active Focus
            </span>
            <span className="text-sm font-semibold text-[#F1F5F9] font-serif">
              {activeSite.name}
            </span>
            <span className="text-xs font-mono text-[#94A3B8]">
              ({activeSite.sinhalaName})
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#94A3B8] font-mono mt-1">
            <span>Radial Dist: <strong className="text-[#38BDF8]">{activeSite.distanceKm} km</strong></span>
            <span>Est. Transit: <strong className="text-[#F1F5F9]">{activeSite.travelTimeMin} min</strong></span>
            <span>Optimal Light: <strong className="text-[#F59E0B]">{activeSite.recommendedTime}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => onSelectSite(activeSite.id)}
            className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 bg-[#1E293B] hover:bg-[#334155] text-[#F1F5F9] border border-[#475569] rounded-[2px] transition-colors"
          >
            Inspect Dossier
          </button>
        </div>
      </div>

      {/* Spatial Controls Instruction Overlay */}
      <div className="absolute top-14 left-3 z-10 pointer-events-none hidden md:block">
        <span className="text-[10px] font-mono text-[#64748B] bg-[#070A12]/80 px-2 py-1 rounded-[2px] border border-[#1E293B]">
          Drag to Orbit • Right-Click to Pan • Scroll to Zoom
        </span>
      </div>
    </div>
  );
}
