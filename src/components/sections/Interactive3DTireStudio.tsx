import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Layers, 
  RotateCw, 
  Maximize2, 
  Sparkles, 
  Eye, 
  Sliders, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Play, 
  Pause, 
  RefreshCw,
  Box,
  Flame,
  Trees,
  Factory,
  Radio,
  FileCode2,
  CheckCircle2,
  Info
} from 'lucide-react';
import { DataProvenance } from '../../types';

interface Interactive3DTireStudioProps {
  onOpenProvenance?: (provenance: DataProvenance) => void;
  onNavigateToMaterials?: () => void;
  onNavigateToCodeStudio?: () => void;
}

interface StoryboardFrame {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  category: 'Structure' | 'Raw Material' | 'Manufacturing' | 'Circular EOL';
  description: string;
  technicalSpecs: { [key: string]: string };
  icon: any;
  color: string;
  explodeLevel: number;
  highlightLayer: string | null;
  mode: 'solid' | 'wireframe' | 'particles' | 'xray';
}

const STORYBOARD_FRAMES: StoryboardFrame[] = [
  {
    id: 1,
    title: 'Frame 1: Assembled High-Performance EV Tire',
    subtitle: 'Michelin e·Primacy™ / Apex-GT Aerodynamic Architecture',
    tag: 'ASSEMBLY',
    category: 'Structure',
    description: 'Fully cured, vulcanized Michelin e·Primacy™ EV tire with aerodynamic sidewall profile, low rolling resistance compound, and molded GS1 2D Data Matrix identifier.',
    technicalSpecs: {
      'Tire Dimension': '205/55 R16 91V',
      'Overall Diameter': '632 mm',
      'Section Width': '205 mm',
      'Total Mass': '8.45 kg',
      'Rolling Resistance': '6.1 kg/tonne (Class A)',
      'Cavity Damper': 'Polyurethane Acoustic Foam Ring'
    },
    icon: Box,
    color: '#00F5FF',
    explodeLevel: 0,
    highlightLayer: null,
    mode: 'solid'
  },
  {
    id: 2,
    title: 'Frame 2: Exploded Multi-Layer Architecture',
    subtitle: 'High-Torque EV Multi-Ply Layer Separation',
    tag: 'EXPLODED VIEW',
    category: 'Structure',
    description: 'Radial cross-section showing 7 engineered sub-components: ultra-low hysteresis bio-silica tread, dual high-tensile brass-coated steel belts, spiral cap ply, polyester carcass, inner liner, and bead core.',
    technicalSpecs: {
      'Tread Layer': '7.0 mm Bio-Silica & Functionalized SBR (3.25 kg)',
      'Crown Plies': 'Dual High-Tensile Brass Coated Steel Belts (1.18 kg)',
      'Cap Ply': 'Spiral Aramid / Nylon 6.6 Zero-Degree Reinforcement',
      'Carcass Matrix': '100% Recycled PET Cord Ply (0.58 kg)',
      'Inner Air Liner': 'Halobutyl Impermeable Air Retention Membrane (0.65 kg)'
    },
    icon: Layers,
    color: '#00F5FF',
    explodeLevel: 0.85,
    highlightLayer: 'Tread',
    mode: 'solid'
  },
  {
    id: 3,
    title: 'Frame 3: Macro Cross-Woven Steel Belts & Cord Matrix',
    subtitle: 'High-Tensile Electric-Arc Metallurgy (ArcelorMittal)',
    tag: 'MACRO METALLURGY',
    category: 'Structure',
    description: 'Microscopic inspection of the 2x0.30 high-tensile brass-coated steel filaments cross-woven at 22° opposing angles to provide torsional rigidity and resist instant electric vehicle torque.',
    technicalSpecs: {
      'Steel Cord Metallurgy': '92% Recycled Scrap Electric-Arc Furnace (EAF)',
      'Tensile Strength': '3,450 MPa High-Tensile Grade',
      'Cord Structure': '2+2x0.28 HT Brass-Coated Cable',
      'Adhesion Layer': 'Cobalt Stearate / Resorcinol Skim Compound',
      'Carbon Intensity': '0.98 kg CO₂e / kg Steel (72% reduction vs blast furnace)'
    },
    icon: Zap,
    color: '#38BDF8',
    explodeLevel: 0.6,
    highlightLayer: 'Steel Belts',
    mode: 'wireframe'
  },
  {
    id: 4,
    title: 'Frame 4: Dynamic 3D High-Speed Kinetic Simulation',
    subtitle: 'Centrifugal Expansion & Thermal Dissipation Under Heavy EV Load',
    tag: 'KINETICS',
    category: 'Structure',
    description: 'Dynamic kinetic finite element model (FEA) testing standing wave threshold at 240 km/h (Speed Symbol V). Low hysteresis compound minimizes thermal heat generation.',
    technicalSpecs: {
      'Speed Rating': 'V (240 km/h Continuous Homologation)',
      'Dynamic Growth at 200 km/h': '< 1.8% Radial Expansion',
      'Contact Patch Area': '168 cm² at 2.5 bar',
      'Operating Temperature Range': '-30°C to +85°C Peak Proving Ground',
      'Rolling Loss': '44.8 W at 80 km/h'
    },
    icon: RotateCw,
    color: '#00FF41',
    explodeLevel: 0.25,
    highlightLayer: null,
    mode: 'solid'
  },
  {
    id: 5,
    title: 'Frame 5: Hevea Brasiliensis Natural Rubber Latex Tapping',
    subtitle: 'EUDR Deforestation-Free Smallholder Agroforestry (GPSNR)',
    tag: 'RAW MATERIAL',
    category: 'Raw Material',
    description: 'Sustainable natural rubber harvested by smallholder farmers in Jambi (Indonesia) and San Pedro (Côte d’Ivoire). 100% audited via satellite Sentinel-2 polygon monitoring ensuring zero post-2020 deforestation.',
    technicalSpecs: {
      'Botanical Origin': 'Hevea Brasiliensis (Clone RRIM 600)',
      'Origin Coordinate': '1°35\'42"S, 103°36\'15"E (Jambi, Sumatra)',
      'EUDR Verification': 'Compliant (Article 9 Due Diligence Reference #EUDR-2026-ML-9982)',
      'GPSNR Traceability': 'Tier 4 Physical Segregation via Michelin RubberWay App',
      'Smallholder Farmers': '1,420 Registered Cooperatives with Fair Living Wage'
    },
    icon: Trees,
    color: '#00FF41',
    explodeLevel: 0.1,
    highlightLayer: 'Tread',
    mode: 'solid'
  },
  {
    id: 6,
    title: 'Frame 6: Zero-Emission Electric Arc Steel Mill Wire Drawing',
    subtitle: 'Low-Carbon Circular Reinforcement Rods (ArcelorMittal)',
    tag: 'METALLURGY',
    category: 'Manufacturing',
    description: 'Continuous induction hot-rolling and precision cold wire drawing in Ghent (Belgium), powered by 100% offshore wind power PPA to produce ultra-clean bead wire and cord filaments.',
    technicalSpecs: {
      'Furnace Technology': '100% Electric Arc Furnace (EAF) with Scrap Pre-heating',
      'Energy Source': '100% Belgian Offshore Wind PPA',
      'Wire Drawing Tolerance': '± 0.003 mm Outer Diameter',
      'Brass Coating Mass': '4.2 g / kg (Adhesion Promotion)',
      'Recycled Content': '92.4% Post-Consumer Steel Scrap'
    },
    icon: Flame,
    color: '#FFA500',
    explodeLevel: 0.45,
    highlightLayer: 'Steel Belts',
    mode: 'wireframe'
  },
  {
    id: 7,
    title: 'Frame 7: End-of-Life High-Torque Mechanical Shredder',
    subtitle: 'Automated ELT Pre-Processing & Clean Fraction Separation',
    tag: 'RECYCLING',
    category: 'Circular EOL',
    description: 'Retiree tire granulated at Aliapur certified facility. Dual-shaft rotary shears liberate 100% of steel bead wire and cord, separating crumb rubber (0.8–2.5 mm) for circular pyrolysis.',
    technicalSpecs: {
      'Throughput Rate': '8.5 Tonnes / Hour Heavy-Duty Shear',
      'Steel Recovery Efficiency': '99.4% Magnetic Cross-Belt Separation',
      'Textile Separation': 'Air Density Zig-Zag Elutriation (98.2% Purity)',
      'Crumb Rubber Granulometry': 'Mesh 20-40 (0.42 to 0.84 mm Clean Rubber)',
      'Dust Control': 'HEPA Filtration with 0% Environmental Particulate Release'
    },
    icon: Factory,
    color: '#FFA500',
    explodeLevel: 0.7,
    highlightLayer: 'Carcass',
    mode: 'xray'
  },
  {
    id: 8,
    title: 'Frame 8: Continuous Vacuum Devulcanization & rCB Disintegration',
    subtitle: 'Pyrowave & Enviro High-Purity Microwave Pyrolysis',
    tag: 'DEVULCANIZATION',
    category: 'Circular EOL',
    description: 'Crumb rubber undergoes microwave thermochemical cleaving of sulfur-sulfur crosslinks without degrading polymer backbones, recovering pristine devulcanized rubber and circular carbon black (rCB).',
    technicalSpecs: {
      'Pyrolysis Temperature': '450°C Oxygen-Free Nitrogen Blanket',
      'Recovered Carbon Black (rCB)': 'ASTM N330 Equivalent Grade (2.1 kg per tire)',
      'Pyrolysis Bio-Oil': 'Circular Hydrocarbon Condensate for Bio-SBR',
      'Carbon Avoidance': '-2.15 kg CO₂e per kg rCB vs virgin furnace black',
      'Reinjection Capacity': '100% Compatible with Michelin Tread Compounds'
    },
    icon: Sparkles,
    color: '#00F5FF',
    explodeLevel: 1.0,
    highlightLayer: null,
    mode: 'particles'
  },
  {
    id: 9,
    title: 'Frame 9: 100% Mass-Balance Closed-Loop Tire Regeneration',
    subtitle: 'From Used Tires to New Sustainable Michelin Passports',
    tag: 'CLOSED LOOP',
    category: 'Circular EOL',
    description: 'The circular loop is fully closed. Reclaimed rCB, recycled steel, and bio-circular polymers are reinjected into the Michelin Cataroux manufacturing line to craft the next generation of e·Primacy tires.',
    technicalSpecs: {
      'Overall Circularity Score': '88 / 100 (10R Framework Audited)',
      'Material Retention': '84.2% Closed Loop Tire-to-Tire Return',
      'Tire-to-Tire rCB Utilization': '100% Circular Feedstock in Tread Compound',
      'Net Life Cycle Avoidance': '-4.1 kg CO₂e / tire avoided burden',
      'Passport Lineage': 'Parent DPP #0048192 linked to Child DPP #0062491'
    },
    icon: RefreshCw,
    color: '#00FF41',
    explodeLevel: 0.15,
    highlightLayer: null,
    mode: 'solid'
  }
];

export const Interactive3DTireStudio: React.FC<Interactive3DTireStudioProps> = ({
  onOpenProvenance,
  onNavigateToMaterials,
  onNavigateToCodeStudio
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
  const [explodeSlider, setExplodeSlider] = useState<number>(0);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe' | 'particles' | 'xray'>('solid');
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'cyber' | 'furnace'>('cyber');
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [isPlayingTour, setIsPlayingTour] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const tireGroupRef = useRef<THREE.Group | null>(null);
  const layerMeshesRef = useRef<{ [name: string]: THREE.Mesh | THREE.Points }>({});
  const animationFrameIdRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const currentFrame = STORYBOARD_FRAMES[activeFrameIndex];

  // Auto tour player
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingTour) {
      timer = setInterval(() => {
        setActiveFrameIndex((prev) => {
          const next = (prev + 1) % STORYBOARD_FRAMES.length;
          applyFrameSettings(STORYBOARD_FRAMES[next]);
          return next;
        });
      }, 4500);
    }
    return () => clearInterval(timer);
  }, [isPlayingTour]);

  // Apply frame settings to 3D scene
  const applyFrameSettings = (frame: StoryboardFrame) => {
    setExplodeSlider(frame.explodeLevel);
    setRenderMode(frame.mode);
    setSelectedLayer(frame.highlightLayer);
  };

  const handleSelectFrame = (index: number) => {
    setActiveFrameIndex(index);
    applyFrameSettings(STORYBOARD_FRAMES[index]);
  };

  // Initialize Three.js 3D Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0c0e);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 5.2);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f5ff, 1.8);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00ff41, 1.2);
    dirLight2.position.set(-5, -4, -4);
    scene.add(dirLight2);

    const rimLight = new THREE.PointLight(0xffffff, 2.5, 20);
    rimLight.position.set(0, 4, 3);
    scene.add(rimLight);

    // Floor Grid
    const gridHelper = new THREE.GridHelper(10, 20, 0x00f5ff, 0x2d2f33);
    gridHelper.position.y = -1.8;
    scene.add(gridHelper);

    // Create Detailed 3D Tire Layer Group
    const tireGroup = new THREE.Group();
    tireGroupRef.current = tireGroup;
    scene.add(tireGroup);

    // Layer 1: Tread & Outer Rubber
    const treadGeo = new THREE.TorusGeometry(1.4, 0.45, 32, 64);
    const treadMat = new THREE.MeshStandardMaterial({
      color: 0x1a1c1f,
      roughness: 0.85,
      metalness: 0.1,
    });
    const treadMesh = new THREE.Mesh(treadGeo, treadMat);
    treadMesh.name = 'Tread';
    treadMesh.castShadow = true;
    tireGroup.add(treadMesh);
    layerMeshesRef.current['Tread'] = treadMesh;

    // Layer 2: Dual Steel Belts (Crown Plies)
    const steelGeo = new THREE.TorusGeometry(1.36, 0.38, 24, 64);
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x8e9299,
      roughness: 0.3,
      metalness: 0.85,
      wireframe: false,
    });
    const steelMesh = new THREE.Mesh(steelGeo, steelMat);
    steelMesh.name = 'Steel Belts';
    tireGroup.add(steelMesh);
    layerMeshesRef.current['Steel Belts'] = steelMesh;

    // Layer 3: Textile Carcass Body Ply (Recycled PET)
    const carcassGeo = new THREE.TorusGeometry(1.30, 0.32, 20, 48);
    const carcassMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.5,
      metalness: 0.2,
    });
    const carcassMesh = new THREE.Mesh(carcassGeo, carcassMat);
    carcassMesh.name = 'Carcass';
    tireGroup.add(carcassMesh);
    layerMeshesRef.current['Carcass'] = carcassMesh;

    // Layer 4: Inner Liner & Acoustic Foam Ring
    const innerGeo = new THREE.TorusGeometry(1.22, 0.24, 16, 48);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00f5ff,
      roughness: 0.9,
      metalness: 0.05,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.name = 'Inner Liner';
    tireGroup.add(innerMesh);
    layerMeshesRef.current['Inner Liner'] = innerMesh;

    // Layer 5: Bead Core & Apex Ring (Dual Left & Right)
    const beadGeo = new THREE.TorusGeometry(0.95, 0.08, 16, 32);
    const beadMat = new THREE.MeshStandardMaterial({
      color: 0xffa500,
      roughness: 0.2,
      metalness: 0.95,
    });
    const beadMesh = new THREE.Mesh(beadGeo, beadMat);
    beadMesh.name = 'Bead Core';
    tireGroup.add(beadMesh);
    layerMeshesRef.current['Bead Core'] = beadMesh;

    // Layer 6: rCB Disintegration Particles Cloud (For Devulcanization simulation)
    const particleCount = 2800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      const r = 1.35 + (Math.random() - 0.5) * 0.5;
      const tubeR = 0.4 + (Math.random() - 0.5) * 0.3;

      const x = (r + tubeR * Math.cos(v)) * Math.cos(u);
      const y = (r + tubeR * Math.cos(v)) * Math.sin(u);
      const z = tubeR * Math.sin(v);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      // Color cyan/white/green
      const c = Math.random();
      if (c > 0.6) {
        particleColors[i * 3] = 0.0;
        particleColors[i * 3 + 1] = 0.96;
        particleColors[i * 3 + 2] = 1.0;
      } else if (c > 0.3) {
        particleColors[i * 3] = 0.0;
        particleColors[i * 3 + 1] = 1.0;
        particleColors[i * 3 + 2] = 0.25;
      } else {
        particleColors[i * 3] = 0.8;
        particleColors[i * 3 + 1] = 0.85;
        particleColors[i * 3 + 2] = 0.9;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.0,
    });

    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    particlesMesh.name = 'Particles';
    tireGroup.add(particlesMesh);
    layerMeshesRef.current['Particles'] = particlesMesh;

    // Mouse Drag Rotation Handler
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !tireGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      tireGroupRef.current.rotation.y += deltaX * 0.01;
      tireGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (tireGroupRef.current && isAutoRotate && !isDraggingRef.current) {
        tireGroupRef.current.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update 3D layer explosion positions in real time
  useEffect(() => {
    const meshes = layerMeshesRef.current;
    if (!meshes) return;

    const tread = meshes['Tread'] as THREE.Mesh;
    const steel = meshes['Steel Belts'] as THREE.Mesh;
    const carcass = meshes['Carcass'] as THREE.Mesh;
    const inner = meshes['Inner Liner'] as THREE.Mesh;
    const bead = meshes['Bead Core'] as THREE.Mesh;
    const particles = meshes['Particles'] as THREE.Points;

    const factor = explodeSlider;

    if (tread) {
      tread.position.z = factor * 1.5;
      tread.scale.set(1 + factor * 0.2, 1 + factor * 0.2, 1 + factor * 0.2);
    }
    if (steel) {
      steel.position.z = factor * 0.8;
      steel.scale.set(1 + factor * 0.1, 1 + factor * 0.1, 1 + factor * 0.1);
    }
    if (carcass) {
      carcass.position.z = factor * 0.2;
    }
    if (inner) {
      inner.position.z = -factor * 0.6;
    }
    if (bead) {
      bead.position.z = -factor * 1.2;
      bead.scale.set(1 - factor * 0.1, 1 - factor * 0.1, 1 - factor * 0.1);
    }

    // Material mode updates
    Object.keys(meshes).forEach((key) => {
      const m = meshes[key];
      if (key === 'Particles') {
        const pMat = (m as THREE.Points).material as THREE.PointsMaterial;
        pMat.opacity = renderMode === 'particles' ? 0.95 : 0.0;
      } else if (m instanceof THREE.Mesh) {
        const mat = m.material as THREE.MeshStandardMaterial;
        if (renderMode === 'wireframe') {
          mat.wireframe = true;
          mat.opacity = 0.85;
          mat.transparent = true;
        } else if (renderMode === 'xray') {
          mat.wireframe = false;
          mat.opacity = 0.35;
          mat.transparent = true;
        } else if (renderMode === 'particles') {
          mat.wireframe = false;
          mat.opacity = 0.15;
          mat.transparent = true;
        } else {
          mat.wireframe = false;
          mat.opacity = selectedLayer && selectedLayer !== key ? 0.4 : 1.0;
          mat.transparent = !!(selectedLayer && selectedLayer !== key);
        }
      }
    });
  }, [explodeSlider, renderMode, selectedLayer]);

  // Lighting preset change
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    if (lightingPreset === 'cyber') {
      scene.background = new THREE.Color(0x0b0c0e);
    } else if (lightingPreset === 'studio') {
      scene.background = new THREE.Color(0x151619);
    } else if (lightingPreset === 'furnace') {
      scene.background = new THREE.Color(0x1a0f0a);
    }
  }, [lightingPreset]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Mode Control */}
      <div className="bg-[#151619] border border-[#2D2F33] p-5 rounded-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="status-tag tag-verified">
              3D WebGL DIGITAL TWIN & STORYBOARD CINEMA
            </span>
            <span className="status-tag tag-supplier">
              MICHELIN GROUP (CLERMONT-FERRAND)
            </span>
          </div>
          <h2 className="text-xl font-bold font-tech text-[#FFFFFF] uppercase">
            Michelin e·Primacy™ / Apex-GT 3D Exploded Layer Twin
          </h2>
          <p className="text-xs text-[#8E9299]">
            Interactive 3D geometry with finite-element multi-ply layer separation, macro cord metallurgy, and 9-stage circularity storyboard.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsPlayingTour(!isPlayingTour)}
            className={`px-3.5 py-1.5 rounded font-mono-code text-xs uppercase font-bold flex items-center gap-1.5 transition-all ${
              isPlayingTour
                ? 'bg-[#FFA500] text-[#0B0C0E]'
                : 'bg-[#151619] hover:bg-[#1A1C1F] text-[#00F5FF] border border-[#00F5FF]/40'
            }`}
          >
            {isPlayingTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlayingTour ? 'Pause Cinematic Tour' : 'Play 9-Frame Tour'}</span>
          </button>

          {onNavigateToCodeStudio && (
            <button
              onClick={onNavigateToCodeStudio}
              className="px-3.5 py-1.5 rounded bg-[#00F5FF] hover:bg-[#00F5FF]/80 text-[#0B0C0E] font-mono-code text-xs uppercase font-bold flex items-center gap-1.5 transition-all"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Recreate Code Studio</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 3D Stage & Storyboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 3D Interactive WebGL Stage (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#151619] border border-[#2D2F33] rounded-lg overflow-hidden flex flex-col relative">
            {/* Top 3D Viewport Controls Bar */}
            <div className="p-3 bg-[#0B0C0E] border-b border-[#2D2F33] flex items-center justify-between gap-2 flex-wrap text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-mono-code text-[11px] text-[#8E9299] uppercase">Render:</span>
                <div className="flex items-center gap-1 bg-[#151619] p-0.5 rounded border border-[#2D2F33]">
                  {(['solid', 'wireframe', 'xray', 'particles'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setRenderMode(m)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono-code uppercase transition-all ${
                        renderMode === m
                          ? 'bg-[#00F5FF] text-[#0B0C0E] font-bold'
                          : 'text-[#8E9299] hover:text-[#FFFFFF]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  className={`p-1.5 rounded border text-[11px] font-mono-code flex items-center gap-1 transition-colors ${
                    isAutoRotate
                      ? 'bg-[#00FF41]/20 text-[#00FF41] border-[#00FF41]/40'
                      : 'bg-[#151619] text-[#8E9299] border-[#2D2F33]'
                  }`}
                  title="Toggle Auto Rotation"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Spin</span>
                </button>

                <div className="flex items-center gap-1 bg-[#151619] p-0.5 rounded border border-[#2D2F33]">
                  {(['cyber', 'studio', 'furnace'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLightingPreset(l)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono-code uppercase transition-all ${
                        lightingPreset === l
                          ? 'bg-[#00F5FF]/20 text-[#00F5FF] border border-[#00F5FF]/30 font-bold'
                          : 'text-[#8E9299] hover:text-[#FFFFFF]'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3D WebGL Canvas Container */}
            <div 
              ref={mountRef} 
              className="w-full h-[440px] cursor-grab active:cursor-grabbing relative overflow-hidden bg-[#0B0C0E]"
            >
              {/* Overlay HUD Badges */}
              <div className="absolute top-3 left-3 pointer-events-none space-y-1.5">
                <div className="bg-[#151619]/90 border border-[#2D2F33] px-2.5 py-1 rounded backdrop-blur-sm">
                  <span className="text-[10px] font-mono-code text-[#00F5FF] font-bold block">
                    ACTIVE SCENE: {currentFrame.tag}
                  </span>
                  <span className="text-[9px] font-mono-code text-[#8E9299]">
                    Click & Drag to Rotate • Scroll to Zoom
                  </span>
                </div>
              </div>

              <div className="absolute bottom-3 right-3 pointer-events-none">
                <div className="bg-[#151619]/90 border border-[#2D2F33] px-2.5 py-1 rounded backdrop-blur-sm text-right">
                  <span className="text-[10px] font-mono-code text-[#00FF41] block">
                    GS1 RFID: 30342B5B0000456000048192
                  </span>
                  <span className="text-[9px] font-mono-code text-[#8E9299]">
                    Tire ID: urn:gdso:tire:id:03528701234567
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Explosion Controls */}
            <div className="p-4 bg-[#0B0C0E] border-t border-[#2D2F33] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#00F5FF]" />
                  <span className="font-mono-code font-bold text-[#FFFFFF] uppercase">
                    Exploded Layer Separation Distance:
                  </span>
                </div>
                <span className="font-mono-code text-[#00F5FF] font-bold">
                  {Math.round(explodeSlider * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodeSlider}
                  onChange={(e) => setExplodeSlider(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#151619] rounded-lg appearance-none cursor-pointer accent-[#00F5FF]"
                />
                <button
                  onClick={() => setExplodeSlider(explodeSlider > 0 ? 0 : 0.85)}
                  className="px-2.5 py-1 rounded bg-[#151619] hover:bg-[#1A1C1F] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33] text-[11px] font-mono-code whitespace-nowrap transition-colors"
                >
                  {explodeSlider > 0 ? 'COLLAPSE' : 'EXPLODE'}
                </button>
              </div>

              {/* Layer Selection Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono-code text-[#8E9299] uppercase mr-1">Layer Focus:</span>
                {['Tread', 'Steel Belts', 'Carcass', 'Inner Liner', 'Bead Core'].map((layer) => (
                  <button
                    key={layer}
                    onClick={() => setSelectedLayer(selectedLayer === layer ? null : layer)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono-code uppercase transition-all ${
                      selectedLayer === layer
                        ? 'bg-[#00F5FF] text-[#0B0C0E] font-bold'
                        : 'bg-[#151619] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33]'
                    }`}
                  >
                    {layer}
                  </button>
                ))}
                {selectedLayer && (
                  <button
                    onClick={() => setSelectedLayer(null)}
                    className="px-1.5 py-0.5 rounded bg-transparent text-[#FFA500] hover:underline text-[10px] font-mono-code"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Active Layer Material Composition Deep-Dive */}
          <div className="bg-[#151619] border border-[#2D2F33] p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00FF41]" />
                <h4 className="text-xs font-bold font-mono-code text-[#FFFFFF] uppercase">
                  Audited Material Technical Specification ({currentFrame.tag})
                </h4>
              </div>
              {onNavigateToMaterials && (
                <button
                  onClick={onNavigateToMaterials}
                  className="text-[11px] font-mono-code text-[#00F5FF] hover:underline uppercase"
                >
                  View Full 28-Material BOM →
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {Object.entries(currentFrame.technicalSpecs).map(([key, val], idx) => (
                <div key={idx} className="bg-[#0B0C0E] p-2.5 rounded border border-[#2D2F33]">
                  <span className="text-[10px] font-mono-code text-[#8E9299] block truncate uppercase">
                    {key}
                  </span>
                  <span className="text-xs font-bold font-mono-code text-[#FFFFFF] block mt-0.5 truncate">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interactive 9-Frame Storyboard Cinema (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#151619] border border-[#2D2F33] p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono-code text-[#00F5FF] uppercase">
                Circularity Storyboard Sequence
              </span>
              <span className="status-tag tag-verified">
                FRAME {activeFrameIndex + 1} OF 9
              </span>
            </div>

            {/* Current Active Storyboard Detail Card */}
            <div className="bg-[#0B0C0E] p-4 rounded border border-[#2D2F33] space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="status-tag tag-verified text-[10px]">
                    {currentFrame.category}
                  </span>
                  <h3 className="text-sm font-bold font-tech text-[#FFFFFF] uppercase mt-1.5">
                    {currentFrame.title}
                  </h3>
                  <p className="text-xs font-mono-code text-[#00F5FF] mt-0.5">
                    {currentFrame.subtitle}
                  </p>
                </div>
                <div className="p-2.5 rounded bg-[#151619] border border-[#2D2F33] text-[#00F5FF] shrink-0">
                  <currentFrame.icon className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs text-[#8E9299] leading-relaxed">
                {currentFrame.description}
              </p>
            </div>

            {/* 9-Frame Interactive Storyboard Selector Grid */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold font-mono-code text-[#8E9299] uppercase block">
                Select Lifecycle Stage:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {STORYBOARD_FRAMES.map((f, idx) => (
                  <button
                    key={f.id}
                    onClick={() => handleSelectFrame(idx)}
                    className={`p-2.5 rounded border text-left transition-all ${
                      idx === activeFrameIndex
                        ? 'bg-[#00F5FF]/15 border-[#00F5FF] text-[#00F5FF]'
                        : 'bg-[#0B0C0E] border-[#2D2F33] text-[#8E9299] hover:text-[#FFFFFF] hover:bg-[#151619]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono-code text-[10px] font-bold uppercase">
                        Frame {f.id}
                      </span>
                      <f.icon className="w-3.5 h-3.5 text-[#00F5FF]" />
                    </div>
                    <span className="text-[11px] font-bold font-tech text-[#FFFFFF] block truncate">
                      {f.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step Navigation Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-[#2D2F33]">
              <button
                onClick={() => handleSelectFrame(Math.max(0, activeFrameIndex - 1))}
                disabled={activeFrameIndex === 0}
                className="px-3 py-1.5 rounded bg-[#0B0C0E] border border-[#2D2F33] text-[#8E9299] hover:text-[#FFFFFF] disabled:opacity-40 font-mono-code text-xs uppercase"
              >
                ← Previous
              </button>

              <button
                onClick={() => handleSelectFrame(Math.min(STORYBOARD_FRAMES.length - 1, activeFrameIndex + 1))}
                disabled={activeFrameIndex === STORYBOARD_FRAMES.length - 1}
                className="px-3 py-1.5 rounded bg-[#00F5FF] hover:bg-[#00F5FF]/80 text-[#0B0C0E] font-bold font-mono-code text-xs uppercase"
              >
                Next Frame →
              </button>
            </div>
          </div>

          {/* Michelin R&D & Verification Certifications */}
          <div className="bg-[#151619] border border-[#2D2F33] p-4 rounded-lg space-y-2.5">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#00F5FF]" />
              <h4 className="text-xs font-bold font-mono-code text-[#FFFFFF] uppercase">
                Michelin Ladoux R&D Telemetry Validation
              </h4>
            </div>

            <div className="space-y-1.5 text-xs text-[#8E9299] font-mono-code">
              <div className="flex items-center justify-between p-2 bg-[#0B0C0E] rounded border border-[#2D2F33]">
                <span>EPREL Energy Verification:</span>
                <strong className="text-[#00FF41]">Class A (6.1 kg/t)</strong>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#0B0C0E] rounded border border-[#2D2F33]">
                <span>EUDR Satellite Compliance:</span>
                <strong className="text-[#00FF41]">100% Deforestation-Free</strong>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#0B0C0E] rounded border border-[#2D2F33]">
                <span>Circular Content Ratio:</span>
                <strong className="text-[#00F5FF]">58.0% Sustainable Materials</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
