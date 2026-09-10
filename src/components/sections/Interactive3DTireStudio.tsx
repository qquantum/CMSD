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
  Info,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { DataProvenance } from '../../types';
import { StageNavigationFooter } from '../StageNavigationFooter';

interface Interactive3DTireStudioProps {
  onOpenProvenance?: (provenance: DataProvenance) => void;
  onNavigateToMaterials?: () => void;
  onNavigateToCodeStudio?: () => void;
  onSelectSection?: (section: any) => void;
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
    color: '#0284C7',
    explodeLevel: 0,
    highlightLayer: null,
    mode: 'solid'
  },
  {
    id: 2,
    title: 'Frame 2: Tread Micro-Structure & Siping Matrix',
    subtitle: 'Ultra-Low Rolling Resistance Bio-Silica Matrix',
    tag: 'TREAD',
    category: 'Structure',
    description: 'Functionalized synthetic SBR infused with rice husk bio-silica, d-limonene plasticizers, and high-dispersion recovered carbon black delivering 6.1 kg/tonne rolling resistance.',
    technicalSpecs: {
      'Tread Compound': 'Bio-Silica Functionalized SBR/BR',
      'Initial Depth': '7.0 mm (Wear TWI at 1.6 mm)',
      'Bio-Silica Origin': 'Rice Husk Ash (ISCC PLUS certified)',
      'Grip Index': '1.58 (EU Grade A Wet Grip)',
      'Sipe Technology': 'Self-Regenerating Tear-Drop Sipes'
    },
    icon: Layers,
    color: '#059669',
    explodeLevel: 0.35,
    highlightLayer: 'Tread',
    mode: 'solid'
  },
  {
    id: 3,
    title: 'Frame 3: Crown Reinforcement Belts',
    subtitle: 'Dual High-Tensile Recycled Steel Cord Plies',
    tag: 'BELTS',
    category: 'Structure',
    description: 'Two crossing high-tensile steel cord belts laid at ±22° crown angles, providing lateral rigidity, cornering stability, and EV instantaneous torque resistance.',
    technicalSpecs: {
      'Steel Recycled Content': '92.4% EAF Scrap Infeed',
      'Cord Construction': '3x0.22 + 9x0.20 High Tensile Steel',
      'Plies Orientation': 'Dual ±22° Crossing Angle',
      'Coating': 'Brass-Plated Micro-Filament Matrix',
      'Tensile Strength': '3,450 MPa'
    },
    icon: Cpu,
    color: '#D97706',
    explodeLevel: 0.65,
    highlightLayer: 'Steel Belts',
    mode: 'solid'
  },
  {
    id: 4,
    title: 'Frame 4: Recycled Textile Carcass Skeleton',
    subtitle: 'Post-Consumer rPET Cords (Equivalent 28 Plastic Bottles)',
    tag: 'CARCASS',
    category: 'Structure',
    description: 'Radial body ply carcass made from chemically recycled PET beverage bottles, retaining air pressure and absorbing high dynamic EV curb impacts.',
    technicalSpecs: {
      'Carcass Material': 'Chemically Recycled rPET Filament',
      'Bottles Reclaimed': '28 Post-Consumer Bottles / Tire',
      'Cord Denier': '1,440 dtex Dual Ply',
      'Working Pressure': '2.5 bar (Tested to 9.2 bar burst)',
      'Fatigue Life': '120,000 km Equivalent Dynamic'
    },
    icon: Eye,
    color: '#2563EB',
    explodeLevel: 0.75,
    highlightLayer: 'Carcass',
    mode: 'wireframe'
  },
  {
    id: 5,
    title: 'Frame 5: Acoustic Cavity Damper & Inner Liner',
    subtitle: 'Acoustic PU Foam Ring & Halobutyl Air Barrier',
    tag: 'ACOUSTIC',
    category: 'Structure',
    description: 'Gas-impermeable halobutyl inner liner bonded to an open-cell acoustic polyurethane foam ring that deadens EV cavity resonance frequencies by -3.2 dB.',
    technicalSpecs: {
      'Noise Reduction': '-3.2 dB Internal Cabin Damping',
      'Liner Polymer': 'Chlorobutyl & Reclaimed Devulcanized Rubber',
      'Permeability': '< 0.05 ml/m²·day (ISO 2556)',
      'Acoustic Ring': 'Open-Cell Recyclable Polyurethane Foam'
    },
    icon: Sparkles,
    color: '#7C3AED',
    explodeLevel: 0.85,
    highlightLayer: 'Inner Liner',
    mode: 'solid'
  },
  {
    id: 6,
    title: 'Frame 6: Bead Core & EV High-Torque Anchor',
    subtitle: 'Reinforced Bead Bundle & Stiffener Apex',
    tag: 'BEAD CORE',
    category: 'Structure',
    description: 'Wound high-tensile brass-coated steel bead ring ensuring airtight wheel seating and zero bead slip under instant EV electric motor acceleration torque.',
    technicalSpecs: {
      'Wire Tensile': '3,600 MPa Wind Induction Drawn',
      'Apex Formulation': 'Hard Natural Rubber & Phenolic Resin',
      'Rim Diameter': '16.0 inches (Alloy Wheel Spec)',
      'Bead Slip Margin': '> 450 Nm Static Torque Hold'
    },
    icon: Box,
    color: '#DC2626',
    explodeLevel: 0.95,
    highlightLayer: 'Bead Core',
    mode: 'solid'
  },
  {
    id: 7,
    title: 'Frame 7: Renewable Feedstock Origin & EUDR Forest',
    subtitle: 'FSC-Certified Hevea Natural Rubber from Surat Thani',
    tag: 'FARM ORIGIN',
    category: 'Raw Material',
    description: '100% deforestation-free natural rubber tapped by certified smallholders in Surat Thani, Thailand. Monitored via Sentinel-2 satellite GPS polygon geofencing.',
    technicalSpecs: {
      'GPS Polygon': '9.1382° N, 99.3217° E (Surat Thani)',
      'Deforestation Cutoff': 'December 31, 2020 (EUDR 2023/1115)',
      'Certification': 'FSC-C012345 Chain of Custody',
      'Fair-Trade Wage': 'Fair Rubber Association 100% Certified'
    },
    icon: Trees,
    color: '#059669',
    explodeLevel: 0.45,
    highlightLayer: null,
    mode: 'solid'
  },
  {
    id: 8,
    title: 'Frame 8: Cataroux Eco-Plant Vulcanization',
    subtitle: 'Electric Induction Presses & 100% Renewable Electricity',
    tag: 'MANUFACTURING',
    category: 'Manufacturing',
    description: 'Cured at Michelin Cataroux Eco-Plant in Clermont-Ferrand with electric nitrogen curing presses, reducing factory Scope 1 emissions to just 1.65 kg CO₂e.',
    technicalSpecs: {
      'Plant Site': 'Clermont-Ferrand Cataroux Eco-Site (France)',
      'Energy Source': '100% Wind & Solar PPA Grid',
      'Curing Tech': 'Clean Electric Induction & Nitrogen Dome',
      'Landfill Waste': 'Zero Industrial Landfill (ISO 14001)'
    },
    icon: Factory,
    color: '#0284C7',
    explodeLevel: 0.2,
    highlightLayer: null,
    mode: 'solid'
  },
  {
    id: 9,
    title: 'Frame 9: Circular Pyrolysis & Molecular Regeneration',
    subtitle: 'Microwave Devulcanization & Recovered Carbon Black (rCB)',
    tag: 'CIRCULAR REBIRTH',
    category: 'Circular EOL',
    description: 'End-of-life tire shredded and thermochemically broken down into ASTM N330 recovered Carbon Black and circular pyrolysis oil, completing the 100% circular loop.',
    technicalSpecs: {
      'rCB Yield': '32.5% of Tire Infeed by Mass',
      'Steel Recovery': '100% bead and belt steel magnetic reclamation',
      'CO₂ Avoidance': '-2.15 kg CO₂e / kg rCB vs Virgin N330',
      'Closed Loop': 'Direct Infeed to Next Generation Michelin Tires'
    },
    icon: RefreshCw,
    color: '#0D9488',
    explodeLevel: 1.0,
    highlightLayer: null,
    mode: 'particles'
  }
];

export const Interactive3DTireStudio: React.FC<Interactive3DTireStudioProps> = ({
  onOpenProvenance,
  onNavigateToMaterials,
  onNavigateToCodeStudio,
  onSelectSection,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const tireGroupRef = useRef<THREE.Group | null>(null);
  const layerMeshesRef = useRef<{ [key: string]: THREE.Object3D }>({});
  const animationFrameIdRef = useRef<number | null>(null);

  // Studio Interactive State
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
  const [isPlayingTour, setIsPlayingTour] = useState<boolean>(false);
  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe' | 'particles' | 'xray'>('solid');
  const [explodeSlider, setExplodeSlider] = useState<number>(0);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'technical' | 'thermal'>('studio');
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  const currentFrame = STORYBOARD_FRAMES[activeFrameIndex];

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF8FAFC);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.0);
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

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0284c7, 0.8);
    dirLight2.position.set(-5, -4, -4);
    scene.add(dirLight2);

    const rimLight = new THREE.PointLight(0xffffff, 1.8, 20);
    rimLight.position.set(0, 4, 3);
    scene.add(rimLight);

    // Light Floor Grid
    const gridHelper = new THREE.GridHelper(10, 20, 0x94A3B8, 0xE2E8F0);
    gridHelper.position.y = -1.8;
    scene.add(gridHelper);

    // Create Detailed 3D Tire Layer Group
    const tireGroup = new THREE.Group();
    tireGroupRef.current = tireGroup;
    scene.add(tireGroup);

    // Layer 1: Tread & Outer Rubber (Rich charcoal tire rubber)
    const treadGeo = new THREE.TorusGeometry(1.4, 0.45, 32, 64);
    const treadMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
      metalness: 0.15,
    });
    const treadMesh = new THREE.Mesh(treadGeo, treadMat);
    treadMesh.name = 'Tread';
    treadMesh.castShadow = true;
    tireGroup.add(treadMesh);
    layerMeshesRef.current['Tread'] = treadMesh;

    // Layer 2: Dual Steel Belts (Crown Plies - Golden brass)
    const steelGeo = new THREE.TorusGeometry(1.36, 0.38, 24, 64);
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.35,
      metalness: 0.85,
      wireframe: false,
    });
    const steelMesh = new THREE.Mesh(steelGeo, steelMat);
    steelMesh.name = 'Steel Belts';
    tireGroup.add(steelMesh);
    layerMeshesRef.current['Steel Belts'] = steelMesh;

    // Layer 3: Textile Carcass Body Ply (Recycled PET - Michelin Blue)
    const carcassGeo = new THREE.TorusGeometry(1.30, 0.32, 20, 48);
    const carcassMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.5,
      metalness: 0.25,
    });
    const carcassMesh = new THREE.Mesh(carcassGeo, carcassMat);
    carcassMesh.name = 'Carcass';
    tireGroup.add(carcassMesh);
    layerMeshesRef.current['Carcass'] = carcassMesh;

    // Layer 4: Inner Liner & Acoustic Foam Ring (Teal)
    const innerGeo = new THREE.TorusGeometry(1.22, 0.24, 16, 48);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      roughness: 0.7,
      metalness: 0.1,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.name = 'Inner Liner';
    tireGroup.add(innerMesh);
    layerMeshesRef.current['Inner Liner'] = innerMesh;

    // Layer 5: Bead Core & Apex Ring (Ruby Crimson)
    const beadGeo = new THREE.TorusGeometry(0.95, 0.08, 16, 32);
    const beadMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.25,
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

      const c = Math.random();
      if (c > 0.6) {
        particleColors[i * 3] = 0.01;
        particleColors[i * 3 + 1] = 0.52;
        particleColors[i * 3 + 2] = 0.78;
      } else if (c > 0.3) {
        particleColors[i * 3] = 0.02;
        particleColors[i * 3 + 1] = 0.59;
        particleColors[i * 3 + 2] = 0.41;
      } else {
        particleColors[i * 3] = 0.12;
        particleColors[i * 3 + 1] = 0.16;
        particleColors[i * 3 + 2] = 0.23;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.0,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    particles.name = 'Particles';
    tireGroup.add(particles);
    layerMeshesRef.current['Particles'] = particles;

    // Mouse Drag Rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const dom = renderer.domElement;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !tireGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      tireGroupRef.current.rotation.y += deltaX * 0.01;
      tireGroupRef.current.rotation.x += deltaY * 0.01;

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 460;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (tireGroupRef.current && isAutoRotate && !isDragging) {
        tireGroupRef.current.rotation.y += delta * 0.35;
        tireGroupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.15;
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

    if (lightingPreset === 'studio') {
      scene.background = new THREE.Color(0xF8FAFC);
    } else if (lightingPreset === 'technical') {
      scene.background = new THREE.Color(0xEFF6FF);
    } else if (lightingPreset === 'thermal') {
      scene.background = new THREE.Color(0xFEF3C7);
    }
  }, [lightingPreset]);

  // Storyboard Auto Tour
  useEffect(() => {
    if (!isPlayingTour) return;

    const interval = setInterval(() => {
      setActiveFrameIndex((prev) => {
        const next = (prev + 1) % STORYBOARD_FRAMES.length;
        applyFrame(STORYBOARD_FRAMES[next]);
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlayingTour]);

  const applyFrame = (frame: StoryboardFrame) => {
    setExplodeSlider(frame.explodeLevel);
    setSelectedLayer(frame.highlightLayer);
    setRenderMode(frame.mode);
  };

  const handleSelectFrame = (index: number) => {
    setActiveFrameIndex(index);
    applyFrame(STORYBOARD_FRAMES[index]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Mode Control */}
      <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="status-tag tag-verified text-xs">
              3D WebGL DIGITAL TWIN & STORYBOARD CINEMA
            </span>
            <span className="status-tag tag-supplier text-xs">
              MICHELIN GROUP (CLERMONT-FERRAND)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Michelin e·Primacy™ / Apex-GT 3D Exploded Layer Twin
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Interactive 3D geometry with multi-ply layer separation, macro cord metallurgy, and 9-stage circularity storyboard.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsPlayingTour(!isPlayingTour)}
            className={`px-4 py-2 rounded-lg font-mono-code text-xs uppercase font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              isPlayingTour
                ? 'bg-amber-600 text-white'
                : 'bg-white hover:bg-slate-50 text-blue-700 border border-blue-200'
            }`}
          >
            {isPlayingTour ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlayingTour ? 'Pause Cinematic Tour' : 'Play 9-Frame Tour'}</span>
          </button>

          {onNavigateToCodeStudio && (
            <button
              onClick={onNavigateToCodeStudio}
              className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-mono-code text-xs uppercase font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <FileCode2 className="w-4 h-4" />
              <span>Recreate Code Studio</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 3D Stage & Storyboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 3D Interactive WebGL Stage (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col relative shadow-xs">
            {/* Top 3D Viewport Controls Bar */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono-code text-xs text-slate-500 uppercase font-semibold">Render:</span>
                <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
                  {(['solid', 'wireframe', 'xray', 'particles'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setRenderMode(m)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono-code uppercase font-semibold transition-all ${
                        renderMode === m
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
                  className={`px-2.5 py-1 rounded-lg border text-xs font-mono-code flex items-center gap-1.5 transition-colors font-semibold ${
                    isAutoRotate
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                  title="Toggle Auto Rotation"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} />
                  <span>Spin</span>
                </button>

                <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
                  {(['studio', 'technical', 'thermal'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLightingPreset(l)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono-code uppercase font-semibold transition-all ${
                        lightingPreset === l
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
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
              className="w-full h-[440px] cursor-grab active:cursor-grabbing relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100"
            >
              {/* Overlay HUD Badges */}
              <div className="absolute top-3 left-3 pointer-events-none space-y-1.5">
                <div className="bg-white/90 border border-slate-200 px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-xs">
                  <span className="text-xs font-mono-code text-blue-900 font-bold block">
                    ACTIVE SCENE: {currentFrame.tag}
                  </span>
                  <span className="text-[11px] font-mono-code text-slate-500">
                    Click & Drag to Rotate • Scroll to Zoom
                  </span>
                </div>
              </div>

              <div className="absolute bottom-3 right-3 pointer-events-none">
                <div className="bg-white/90 border border-slate-200 px-3 py-1.5 rounded-lg backdrop-blur-sm text-right shadow-xs">
                  <span className="text-xs font-mono-code text-emerald-800 font-bold block">
                    GS1 RFID: 30342B5B0000456000048192
                  </span>
                  <span className="text-[11px] font-mono-code text-slate-500">
                    Tire ID: urn:gdso:tire:id:03528701234567
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Explosion Controls */}
            <div className="p-4 bg-white border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-700" />
                  <span className="font-mono-code font-bold text-slate-900 uppercase">
                    Exploded Layer Separation Distance:
                  </span>
                </div>
                <span className="font-mono-code text-blue-700 font-bold text-sm">
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
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <button
                  onClick={() => setExplodeSlider(explodeSlider > 0 ? 0 : 0.85)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-mono-code font-bold whitespace-nowrap transition-colors"
                >
                  {explodeSlider > 0 ? 'COLLAPSE' : 'EXPLODE'}
                </button>
              </div>

              {/* Layer Selection Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-mono-code text-slate-500 uppercase font-semibold mr-1">Layer Focus:</span>
                {['Tread', 'Steel Belts', 'Carcass', 'Inner Liner', 'Bead Core'].map((layer) => (
                  <button
                    key={layer}
                    onClick={() => setSelectedLayer(selectedLayer === layer ? null : layer)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono-code uppercase font-semibold transition-all ${
                      selectedLayer === layer
                        ? 'bg-blue-700 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {layer}
                  </button>
                ))}
                {selectedLayer && (
                  <button
                    onClick={() => setSelectedLayer(null)}
                    className="px-2 py-1 rounded text-amber-700 hover:underline text-xs font-mono-code font-bold"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Active Layer Material Composition Deep-Dive */}
          <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold font-mono-code text-slate-900 uppercase">
                  Audited Material Technical Specification ({currentFrame.tag})
                </h4>
              </div>
              {onNavigateToMaterials && (
                <button
                  onClick={onNavigateToMaterials}
                  className="text-xs font-mono-code text-blue-700 hover:underline font-bold uppercase flex items-center gap-1"
                >
                  View Full BOM →
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {Object.entries(currentFrame.technicalSpecs).map(([key, val], idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[11px] font-mono-code text-slate-500 block truncate uppercase font-semibold">
                    {key}
                  </span>
                  <span className="text-xs font-bold font-mono-code text-slate-900 block mt-0.5 truncate">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interactive 9-Frame Storyboard Cinema (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono-code text-blue-900 uppercase">
                Circularity Storyboard Sequence
              </span>
              <span className="status-tag tag-verified text-xs">
                FRAME {activeFrameIndex + 1} OF 9
              </span>
            </div>

            {/* Current Active Storyboard Detail Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="status-tag tag-verified text-[11px]">
                    {currentFrame.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 uppercase mt-1.5">
                    {currentFrame.title}
                  </h3>
                  <p className="text-xs font-mono-code text-blue-800 mt-0.5 font-semibold">
                    {currentFrame.subtitle}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 shrink-0">
                  <currentFrame.icon className="w-5 h-5" />
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {currentFrame.description}
              </p>
            </div>

            {/* 9-Frame Interactive Storyboard Selector Grid */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold font-mono-code text-slate-500 uppercase block">
                Select Lifecycle Stage:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {STORYBOARD_FRAMES.map((f, idx) => (
                  <button
                    key={f.id}
                    onClick={() => handleSelectFrame(idx)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      idx === activeFrameIndex
                        ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono-code text-[11px] font-bold uppercase">
                        Frame {f.id}
                      </span>
                      <f.icon className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {f.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step Navigation Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => handleSelectFrame(Math.max(0, activeFrameIndex - 1))}
                disabled={activeFrameIndex === 0}
                className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 font-mono-code text-xs uppercase font-bold transition-colors"
              >
                ← Previous
              </button>

              <button
                onClick={() => handleSelectFrame(Math.min(STORYBOARD_FRAMES.length - 1, activeFrameIndex + 1))}
                disabled={activeFrameIndex === STORYBOARD_FRAMES.length - 1}
                className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold font-mono-code text-xs uppercase transition-colors shadow-2xs"
              >
                Next Frame →
              </button>
            </div>
          </div>

          {/* Michelin R&D & Verification Certifications */}
          <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold font-mono-code text-slate-900 uppercase">
                Michelin Ladoux R&D Telemetry Validation
              </h4>
            </div>

            <div className="space-y-2 text-xs text-slate-600 font-mono-code">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span>EPREL Energy Verification:</span>
                <strong className="text-emerald-700 font-bold">Class A (6.1 kg/t)</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span>EUDR Satellite Compliance:</span>
                <strong className="text-emerald-700 font-bold">100% Deforestation-Free</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span>Circular Content Ratio:</span>
                <strong className="text-blue-700 font-bold">58.0% Sustainable Materials</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Navigation Footer to Next Phase: Materials (BOM) */}
      <StageNavigationFooter activeSection="3d-studio" onSelectSection={onSelectSection || (() => {})} />
    </div>
  );
};
