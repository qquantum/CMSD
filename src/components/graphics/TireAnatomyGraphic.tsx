import React, { useState } from 'react';
import { Layers, CheckCircle2, ShieldCheck, Sparkles, Info, RefreshCw } from 'lucide-react';

export interface TireLayerInfo {
  id: string;
  name: string;
  role: string;
  thickness: string;
  weightFraction: string;
  sustainableShare: string;
  recycledMaterial: string;
  color: string;
  fillColor: string;
  description: string;
}

const TIRE_LAYERS: TireLayerInfo[] = [
  {
    id: 'tread',
    name: '1. Tread Cap Compound',
    role: 'Contact patch, grip, rolling resistance, water drainage',
    thickness: '7.0 mm',
    weightFraction: '38.5% (3.25 kg)',
    sustainableShare: '62.0% Bio-circular',
    recycledMaterial: 'Rice husk bio-silica, d-limonene resin, recovered carbon black (rCB)',
    color: '#0284C7',
    fillColor: '#E0F2FE',
    description: 'Ultra-low hysteresis compound formulated with functionalized synthetic SBR, micro-dispersed rice husk silica, and sunflower oil plasticizers to maximize EV range.'
  },
  {
    id: 'cap-ply',
    name: '2. Spiral Cap Ply (Zero-Degree Band)',
    role: 'Centrifugal restraint, high-speed stability & profile control',
    thickness: '0.8 mm',
    weightFraction: '4.2% (0.35 kg)',
    sustainableShare: '50.0% Recycled',
    recycledMaterial: 'Enka bio-based Polyamide 6.6 & recycled Aramid filaments',
    color: '#7C3AED',
    fillColor: '#EDE9FE',
    description: 'Continuous spiral-wound aramid/nylon cord array that prevents high-speed tire growth and maintains even footprint pressure during hard EV torque acceleration.'
  },
  {
    id: 'steel-belts',
    name: '3. Dual Steel Belts (Crown Plies)',
    role: 'Rigidity, puncture resistance & steering response',
    thickness: '1.4 mm (Dual 22° plies)',
    weightFraction: '14.0% (1.18 kg)',
    sustainableShare: '92.4% Recycled scrap',
    recycledMaterial: 'EAF electric arc steel scrap, brass-plated micro-cords',
    color: '#D97706',
    fillColor: '#FEF3C7',
    description: 'Two opposing high-tensile steel cord layers angled at ±22° delivering lateral stiffness, steering precision, and high penetration protection against road debris.'
  },
  {
    id: 'carcass',
    name: '4. Radial Carcass Ply (Body Ply)',
    role: 'Internal pressure containment & structural skeleton',
    thickness: '1.1 mm',
    weightFraction: '9.8% (0.83 kg)',
    sustainableShare: '88.5% Circular',
    recycledMaterial: 'Recycled post-consumer polyethylene terephthalate (rPET) cords',
    color: '#2563EB',
    fillColor: '#DBEAFE',
    description: 'Radial carcass cords running 90° bead-to-bead made from chemically recycled PET plastic bottles, absorbing road shocks and sustaining 2.5 bar inflation pressure.'
  },
  {
    id: 'inner-liner',
    name: '5. Halobutyl Air Inner Liner',
    role: 'Gas impermeability & acoustic cabin damping',
    thickness: '1.2 mm',
    weightFraction: '11.2% (0.95 kg)',
    sustainableShare: '42.0% Reclaimed',
    recycledMaterial: 'Devulcanized halobutyl rubber & polyurethane acoustic foam',
    color: '#059669',
    fillColor: '#D1FAE5',
    description: 'Ultra-dense halobutyl synthetic rubber membrane acting as an internal tube, bonded to an integrated acoustic polyurethane foam ring to silence EV resonance.'
  },
  {
    id: 'apex',
    name: '6. Sidewall & Rubber Apex Stiffener',
    role: 'Torque transmission, curb scuff protection & flex fatigue',
    thickness: '2.5 mm',
    weightFraction: '15.6% (1.32 kg)',
    sustainableShare: '54.0% Sustainable',
    recycledMaterial: 'FSC-certified natural rubber & end-of-life tire crumb rubber',
    color: '#0D9488',
    fillColor: '#CCFBF1',
    description: 'High-hardness triangular rubber wedge directly seated above the bead core, engineered to handle instantaneous EV electric motor torque without bead rotation.'
  },
  {
    id: 'bead-core',
    name: '7. High-Tensile Steel Bead Core',
    role: 'Mechanical rim anchoring & air seal clamping',
    thickness: '12.0 mm ring bundle',
    weightFraction: '6.7% (0.57 kg)',
    sustainableShare: '94.0% Recycled steel',
    recycledMaterial: 'Circular bead wire drawn with 100% wind power induction',
    color: '#DC2626',
    fillColor: '#FEE2E2',
    description: 'Continuous bundle of high-tensile brass-coated steel wires holding the tire securely anchored to the 16-inch alloy wheel rim under heavy cornering loads.'
  }
];

export const TireAnatomyGraphic: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('tread');
  const activeLayer = TIRE_LAYERS.find(l => l.id === selectedLayerId) || TIRE_LAYERS[0];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-blue">STRUCTURAL ANATOMY</span>
            <span className="status-tag tag-green">58% SUSTAINABLE BOM</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Radial Tire Cross-Section Architecture
          </h3>
          <p className="text-sm text-slate-500">
            Interactive micro-layer cross-section of the Michelin e·Primacy™ / Apex-GT. Click any layer to inspect technical formulation and recycling path.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono-code font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded border border-slate-200">
            Dimension: 205/55 R16 91V
          </span>
        </div>
      </div>

      {/* Main Interactive Diagram Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* Left / Top: SVG Technical Vector Illustration */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono-code text-slate-500 mb-3">
            <span>FIGURE 1.2: CROSS-SECTION PROFILE</span>
            <span className="text-blue-600 font-semibold">CLICK LAYER TO INSPECT</span>
          </div>

          <div className="w-full flex justify-center py-2">
            <svg
              viewBox="0 0 680 340"
              className="w-full max-w-[600px] h-auto drop-shadow-sm select-none"
            >
              <defs>
                <linearGradient id="treadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>
                <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="rimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#64748B" />
                </linearGradient>
                <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0284C7" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Rim representation */}
              <path
                d="M 170 300 L 230 260 L 235 240 L 250 240 L 255 260 L 425 260 L 430 240 L 445 240 L 450 260 L 510 300 Z"
                fill="url(#rimGrad)"
                stroke="#475569"
                strokeWidth="1.5"
                opacity="0.85"
              />
              <text x="340" y="290" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600">
                16-INCH ALLOY WHEEL RIM
              </text>

              {/* Layer 5: Inner Liner (Teal/Green) */}
              <path
                id="svg-inner-liner"
                d="M 235 235 C 210 180, 220 90, 270 55 C 310 40, 370 40, 410 55 C 460 90, 470 180, 445 235 L 435 235 C 455 175, 445 95, 405 65 C 370 50, 310 50, 275 65 C 235 95, 225 175, 245 235 Z"
                fill={selectedLayerId === 'inner-liner' ? '#059669' : '#10B981'}
                stroke="#047857"
                strokeWidth={selectedLayerId === 'inner-liner' ? '3' : '1'}
                filter={selectedLayerId === 'inner-liner' ? 'url(#glowEffect)' : undefined}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => setSelectedLayerId('inner-liner')}
              />

              {/* Layer 4: Carcass Body Ply (Blue) */}
              <path
                id="svg-carcass"
                d="M 230 238 C 205 175, 215 80, 265 48 C 305 32, 375 32, 415 48 C 465 80, 475 175, 450 238 L 442 238 C 462 170, 450 85, 410 52 C 370 38, 310 38, 270 52 C 230 85, 218 170, 238 238 Z"
                fill={selectedLayerId === 'carcass' ? '#1D4ED8' : '#3B82F6'}
                stroke="#1E40AF"
                strokeWidth={selectedLayerId === 'carcass' ? '3' : '1'}
                filter={selectedLayerId === 'carcass' ? 'url(#glowEffect)' : undefined}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => setSelectedLayerId('carcass')}
              />

              {/* Layer 3: Dual Steel Belts (Amber/Gold) */}
              <path
                id="svg-steel-belts"
                d="M 270 42 C 305 28, 375 28, 410 42 L 406 48 C 372 34, 308 34, 274 48 Z"
                fill="url(#steelGrad)"
                stroke="#B45309"
                strokeWidth={selectedLayerId === 'steel-belts' ? '3' : '1.5'}
                filter={selectedLayerId === 'steel-belts' ? 'url(#glowEffect)' : undefined}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => setSelectedLayerId('steel-belts')}
              />

              {/* Layer 2: Cap Ply / Zero Degree Band (Purple) */}
              <path
                id="svg-cap-ply"
                d="M 272 38 C 306 24, 374 24, 408 38 L 406 42 C 372 28, 308 28, 274 42 Z"
                fill={selectedLayerId === 'cap-ply' ? '#6D28D9' : '#8B5CF6'}
                stroke="#5B21B6"
                strokeWidth={selectedLayerId === 'cap-ply' ? '2.5' : '1'}
                filter={selectedLayerId === 'cap-ply' ? 'url(#glowEffect)' : undefined}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => setSelectedLayerId('cap-ply')}
              />

              {/* Layer 1: Outer Tread Rubber (Dark Slate / Charcoal with Sipes) */}
              <path
                id="svg-tread"
                d="M 265 42 C 300 20, 380 20, 415 42 L 418 32 C 375 12, 305 12, 262 32 Z"
                fill={selectedLayerId === 'tread' ? '#0284C7' : 'url(#treadGrad)'}
                stroke="#0F172A"
                strokeWidth={selectedLayerId === 'tread' ? '3' : '1.5'}
                filter={selectedLayerId === 'tread' ? 'url(#glowEffect)' : undefined}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => setSelectedLayerId('tread')}
              />

              {/* Tread Sipes & Grooves (Decorative grooves) */}
              <rect x="305" y="16" width="5" height="18" fill="#F8FAFC" rx="1" />
              <rect x="338" y="14" width="5" height="18" fill="#F8FAFC" rx="1" />
              <rect x="370" y="16" width="5" height="18" fill="#F8FAFC" rx="1" />

              {/* Sidewall Outer Rubber (Left & Right) */}
              <path
                d="M 262 32 C 215 75, 195 165, 230 240 L 222 242 C 185 160, 208 70, 265 42 Z"
                fill="#1E293B"
                opacity="0.8"
              />
              <path
                d="M 418 32 C 465 75, 485 165, 450 240 L 458 242 C 495 160, 472 70, 415 42 Z"
                fill="#1E293B"
                opacity="0.8"
              />

              {/* Layer 6: Apex Rubber Stiffeners (Teal) */}
              <path
                id="svg-apex-left"
                d="M 230 220 L 244 238 L 224 238 Z"
                fill={selectedLayerId === 'apex' ? '#0F766E' : '#14B8A6'}
                stroke="#0D9488"
                strokeWidth="1"
                className="cursor-pointer"
                onClick={() => setSelectedLayerId('apex')}
              />
              <path
                id="svg-apex-right"
                d="M 450 220 L 456 238 L 436 238 Z"
                fill={selectedLayerId === 'apex' ? '#0F766E' : '#14B8A6'}
                stroke="#0D9488"
                strokeWidth="1"
                className="cursor-pointer"
                onClick={() => setSelectedLayerId('apex')}
              />

              {/* Layer 7: Steel Bead Core Bundle (Red/Crimson) */}
              <circle
                id="svg-bead-left"
                cx="234"
                cy="242"
                r="7"
                fill={selectedLayerId === 'bead-core' ? '#B91C1C' : '#EF4444'}
                stroke="#991B1B"
                strokeWidth={selectedLayerId === 'bead-core' ? '2.5' : '1'}
                className="cursor-pointer"
                onClick={() => setSelectedLayerId('bead-core')}
              />
              <circle
                id="svg-bead-right"
                cx="446"
                cy="242"
                r="7"
                fill={selectedLayerId === 'bead-core' ? '#B91C1C' : '#EF4444'}
                stroke="#991B1B"
                strokeWidth={selectedLayerId === 'bead-core' ? '2.5' : '1'}
                className="cursor-pointer"
                onClick={() => setSelectedLayerId('bead-core')}
              />

              {/* Callout Pointer Lines */}
              <line x1="340" y1="12" x2="340" y2="0" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="340" cy="0" r="3" fill="#0284C7" />
              <text x="340" y="-8" textAnchor="middle" fill="#0284C7" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">
                1. TREAD CAP
              </text>

              <line x1="412" y1="40" x2="520" y2="35" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="520" cy="35" r="3" fill="#D97706" />
              <text x="525" y="38" textAnchor="start" fill="#D97706" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">
                3. STEEL BELTS
              </text>

              <line x1="460" y1="120" x2="530" y2="120" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="530" cy="120" r="3" fill="#2563EB" />
              <text x="535" y="123" textAnchor="start" fill="#2563EB" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">
                4. CARCASS PLY
              </text>

              <line x1="446" y1="242" x2="530" y2="242" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="530" cy="242" r="3" fill="#DC2626" />
              <text x="535" y="245" textAnchor="start" fill="#DC2626" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">
                7. BEAD CORE
              </text>

              <line x1="220" y1="120" x2="140" y2="120" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="140" cy="120" r="3" fill="#059669" />
              <text x="135" y="123" textAnchor="end" fill="#059669" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">
                5. INNER LINER
              </text>
            </svg>
          </div>

          {/* Quick Select Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3 border-t border-slate-200">
            {TIRE_LAYERS.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setSelectedLayerId(layer.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  selectedLayerId === layer.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {layer.name.includes('.') ? (layer.name.split('.')[1] || '').trim() : layer.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right / Bottom: Selected Layer Deep Dive Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span
              className="text-xs font-bold font-mono-code uppercase px-2.5 py-1 rounded-md"
              style={{ backgroundColor: activeLayer.fillColor, color: activeLayer.color }}
            >
              SELECTED LAYER SPECS
            </span>
            <span className="text-xs font-mono-code text-slate-500 font-semibold">
              Thickness: {activeLayer.thickness}
            </span>
          </div>

          <div>
            <h4 className="text-lg font-bold text-slate-900">
              {activeLayer.name}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Primary Role: {activeLayer.role}
            </p>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
            {activeLayer.description}
          </p>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[11px] uppercase font-semibold">
                Mass Weight
              </span>
              <span className="font-bold text-slate-900 font-mono-code text-sm">
                {activeLayer.weightFraction}
              </span>
            </div>

            <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
              <span className="text-emerald-700 block text-[11px] uppercase font-semibold">
                Sustainable Share
              </span>
              <span className="font-bold text-emerald-800 font-mono-code text-sm">
                {activeLayer.sustainableShare}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Bio-Circular & Recycled Infeed:</span>
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              {activeLayer.recycledMaterial}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> ISO 14067 LCA Audited
            </span>
            <span className="flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 text-blue-600" /> 100% Retreadable
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
