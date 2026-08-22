import React, { useState } from 'react';
import { TireComponent, DataProvenance } from '../../types';
import { Layers, ShieldCheck, MapPin, Truck, Leaf, Flame, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface TireExplorerSectionProps {
  components: TireComponent[];
  onOpenProvenance: (prov: DataProvenance) => void;
  onNavigateToMaterials: () => void;
}

export const TireExplorerSection: React.FC<TireExplorerSectionProps> = ({
  components,
  onOpenProvenance,
  onNavigateToMaterials,
}) => {
  const [selectedCompId, setSelectedCompId] = useState<string>(components[0].id);

  const selectedComponent = components.find((c) => c.id === selectedCompId) || components[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-verified">
              SECTION 02
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-tech tracking-wide uppercase">
              Interactive Tire Anatomy & Component Explorer
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9299] mt-1.5">
            Click any cross-section component to dissect its engineering formulation, origin, supplier, and carbon load.
          </p>
        </div>

        <button
          onClick={onNavigateToMaterials}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#151619] border border-[#2D2F33] hover:border-[#00F5FF] text-[#00F5FF] text-xs font-mono-code font-bold uppercase self-start sm:self-auto transition-colors"
        >
          <span>View Full Bill of Materials</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Interactive Stage: Cross Section SVG + Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center: Interactive SVG Cross Section */}
        <div className="lg:col-span-6 bg-[#151619] border border-[#2D2F33] rounded-lg p-6 flex flex-col items-center justify-between relative overflow-hidden shadow-xl">
          <div className="w-full flex items-center justify-between text-xs text-[#8E9299] mb-2">
            <span className="font-mono-code font-bold uppercase tracking-wider text-[#00F5FF]">
              RADIAL SECTION MATRIX (205/55 R16)
            </span>
            <span className="text-[10px] text-[#8E9299] font-mono-code">Click layer to inspect</span>
          </div>

          {/* Interactive Tire Cross-Section Diagram */}
          <div className="relative w-full max-w-sm aspect-square flex items-center justify-center my-4">
            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 400 400">
              {/* Background ambient ring */}
              <circle cx="200" cy="200" r="185" fill="none" stroke="#2D2F33" strokeWidth="1" strokeDasharray="4 4" />

              {/* 1. TREAD LAYER */}
              <path
                id="svg-tread"
                d="M 60 130 A 160 160 0 0 1 340 130 L 325 155 A 135 135 0 0 0 75 155 Z"
                fill={selectedCompId === 'comp-tread' ? '#00F5FF' : '#1A1C1F'}
                stroke={selectedCompId === 'comp-tread' ? '#FFFFFF' : '#2D2F33'}
                strokeWidth={selectedCompId === 'comp-tread' ? '3' : '1.5'}
                className="cursor-pointer transition-all hover:brightness-125"
                onClick={() => setSelectedCompId('comp-tread')}
              />

              {/* 2. STEEL BELTS (2 plies) */}
              <path
                id="svg-belts"
                d="M 80 157 A 132 132 0 0 1 320 157 L 315 170 A 120 120 0 0 0 85 170 Z"
                fill={selectedCompId === 'comp-belts' ? '#00FF41' : '#0B0C0E'}
                stroke={selectedCompId === 'comp-belts' ? '#FFFFFF' : '#2D2F33'}
                strokeWidth={selectedCompId === 'comp-belts' ? '3' : '1.5'}
                strokeDasharray="4 2"
                className="cursor-pointer transition-all hover:brightness-125"
                onClick={() => setSelectedCompId('comp-belts')}
              />

              {/* 3. CARCASS PLY & TEXTILE */}
              <path
                id="svg-carcass"
                d="M 50 250 C 45 190, 85 172, 200 172 C 315 172, 355 190, 350 250 L 340 250 C 344 198, 308 180, 200 180 C 92 180, 56 198, 60 250 Z"
                fill={selectedCompId === 'comp-carcass' ? '#8E9299' : '#151619'}
                stroke={selectedCompId === 'comp-carcass' ? '#FFFFFF' : '#2D2F33'}
                strokeWidth={selectedCompId === 'comp-carcass' ? '3' : '1.5'}
                className="cursor-pointer transition-all hover:brightness-125"
                onClick={() => setSelectedCompId('comp-carcass')}
              />

              {/* 4. SIDEWALLS (Left and Right) */}
              <path
                id="svg-sidewall-left"
                d="M 40 250 C 35 180, 70 145, 80 135 L 90 148 C 82 155, 52 185, 55 250 Z"
                fill={selectedCompId === 'comp-sidewall' ? '#00F5FF' : '#1A1C1F'}
                stroke={selectedCompId === 'comp-sidewall' ? '#FFFFFF' : '#2D2F33'}
                strokeWidth={selectedCompId === 'comp-sidewall' ? '3' : '1.5'}
                className="cursor-pointer transition-all hover:brightness-125"
                onClick={() => setSelectedCompId('comp-sidewall')}
              />
              <path
                id="svg-sidewall-right"
                d="M 360 250 C 365 180, 330 145, 320 135 L 310 148 C 318 155, 348 185, 345 250 Z"
                fill={selectedCompId === 'comp-sidewall' ? '#00F5FF' : '#1A1C1F'}
                stroke={selectedCompId === 'comp-sidewall' ? '#FFFFFF' : '#2D2F33'}
                strokeWidth={selectedCompId === 'comp-sidewall' ? '3' : '1.5'}
                className="cursor-pointer transition-all hover:brightness-125"
                onClick={() => setSelectedCompId('comp-sidewall')}
              />

              {/* 5. INNER LINER */}
              <path
                id="svg-innerliner"
                d="M 68 250 C 65 205, 96 186, 200 186 C 304 186, 335 205, 332 250 L 325 250 C 328 212, 298 193, 200 193 C 102 193, 72 212, 75 250 Z"
                fill={selectedCompId === 'comp-innerliner' ? '#00FF41' : '#0B0C0E'}
                stroke={selectedCompId === 'comp-innerliner' ? '#FFFFFF' : '#2D2F33'}
                strokeWidth={selectedCompId === 'comp-innerliner' ? '3' : '1.5'}
                className="cursor-pointer transition-all hover:brightness-125"
                onClick={() => setSelectedCompId('comp-innerliner')}
              />

              {/* 6. BEAD CORES & APEX (Left & Right) */}
              {/* Left Bead */}
              <circle
                id="svg-bead-left"
                cx="58"
                cy="265"
                r="14"
                fill={selectedCompId === 'comp-bead' ? '#00F5FF' : '#1A1C1F'}
                stroke={selectedCompId === 'comp-bead' ? '#FFFFFF' : '#2D2F33'}
                strokeWidth={selectedCompId === 'comp-bead' ? '3' : '1.5'}
                className="cursor-pointer transition-all hover:brightness-125"
                onClick={() => setSelectedCompId('comp-bead')}
              />
              {/* Right Bead */}
              <circle
                id="svg-bead-right"
                cx="342"
                cy="265"
                r="14"
                fill={selectedCompId === 'comp-bead' ? '#00F5FF' : '#1A1C1F'}
                stroke={selectedCompId === 'comp-bead' ? '#FFFFFF' : '#2D2F33'}
                strokeWidth={selectedCompId === 'comp-bead' ? '3' : '1.5'}
                className="cursor-pointer transition-all hover:brightness-125"
                onClick={() => setSelectedCompId('comp-bead')}
              />

              {/* Wheel Rim Outline */}
              <path
                d="M 58 280 L 140 280 L 150 320 L 250 320 L 260 280 L 342 280"
                fill="none"
                stroke="#2D2F33"
                strokeWidth="3"
              />

              {/* Center Hub & Axis */}
              <circle cx="200" cy="350" r="15" fill="#151619" stroke="#2D2F33" strokeWidth="2" />
              <text x="200" y="354" textAnchor="middle" fill="#8E9299" fontSize="10" fontFamily="JetBrains Mono">
                16" RIM
              </text>
            </svg>
          </div>

          {/* Quick Component selector pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 w-full pt-2">
            {components.map((comp) => {
              const isSelected = comp.id === selectedCompId;
              return (
                <button
                  key={comp.id}
                  id={`btn-select-comp-${comp.id}`}
                  onClick={() => setSelectedCompId(comp.id)}
                  className={`px-2.5 py-1 rounded text-xs font-mono-code font-bold uppercase transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]'
                      : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33]'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full bg-[#00F5FF]"
                  ></span>
                  <span>{comp.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Component Detailed Telemetry Card */}
        <div className="lg:col-span-6 bg-[#151619] border border-[#2D2F33] rounded-lg p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-[#00F5FF]"
                  ></span>
                  <h3 className="text-xl font-bold font-tech text-[#FFFFFF]">
                    {selectedComponent.name}
                  </h3>
                </div>
                <p className="text-xs text-[#8E9299] mt-1">{selectedComponent.technicalDescription}</p>
              </div>

              <div className="text-right">
                <span className="text-2xl font-extrabold font-mono-code text-[#00F5FF]">
                  {selectedComponent.percentageOfMass}%
                </span>
                <span className="text-xs text-[#8E9299] font-mono-code block">
                  {selectedComponent.weightKg} kg / 8.45 kg
                </span>
              </div>
            </div>

            {/* Purpose */}
            <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3.5 rounded">
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block mb-1 font-mono-code">
                Engineering Purpose & Dynamic Role
              </span>
              <p className="text-xs text-[#FFFFFF] leading-relaxed">
                {selectedComponent.purpose}
              </p>
            </div>

            {/* Key Materials formulation list */}
            <div>
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block mb-2 font-mono-code">
                Chemical & Material Ingredients ({selectedComponent.keyMaterials.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedComponent.keyMaterials.map((mat, i) => (
                  <span
                    key={i}
                    className="status-tag tag-supplier"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Supplier & Geographic Provenance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3 rounded">
                <span className="text-[10px] text-[#8E9299] uppercase font-mono-code flex items-center gap-1.5 mb-1 font-semibold">
                  <Truck className="w-3.5 h-3.5 text-[#00F5FF]" /> Primary Supplier
                </span>
                <span className="text-xs font-semibold text-[#FFFFFF]">
                  {selectedComponent.mainSupplier}
                </span>
              </div>

              <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3 rounded">
                <span className="text-[10px] text-[#8E9299] uppercase font-mono-code flex items-center gap-1.5 mb-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#00FF41]" /> Geographic Origin
                </span>
                <span className="text-xs font-semibold text-[#FFFFFF]">
                  {selectedComponent.geographicOrigin}
                </span>
              </div>
            </div>

            {/* Environmental & Carbon Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3 rounded">
                <span className="text-[10px] text-[#8E9299] uppercase font-mono-code flex items-center gap-1.5 mb-1 font-semibold">
                  <Leaf className="w-3.5 h-3.5 text-[#00FF41]" /> Circular Feedstocks
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold font-mono-code text-[#00FF41]">
                    {selectedComponent.recycledRenewablePercent}%
                  </span>
                  <span className="text-[10px] text-[#8E9299] font-mono-code">Recycled / Bio</span>
                </div>
              </div>

              <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3 rounded">
                <span className="text-[10px] text-[#8E9299] uppercase font-mono-code flex items-center gap-1.5 mb-1 font-semibold">
                  <Flame className="w-3.5 h-3.5 text-[#00F5FF]" /> Carbon Share
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold font-mono-code text-[#00F5FF]">
                    {selectedComponent.carbonContributionKgCO2e}
                  </span>
                  <span className="text-[10px] text-[#8E9299] font-mono-code">kg CO₂e</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#2D2F33] flex items-center justify-between text-xs">
            <span className="text-[#8E9299] flex items-center gap-1 font-mono-code text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00FF41]" /> ISO 14044 LCA Model Verified
            </span>
            <button
              onClick={onNavigateToMaterials}
              className="text-[#00F5FF] hover:underline font-mono-code font-bold text-xs uppercase flex items-center gap-1"
            >
              Examine Raw Material Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
