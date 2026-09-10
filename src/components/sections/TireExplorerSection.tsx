import React, { useState } from 'react';
import { TireComponent, DataProvenance } from '../../types';
import { Layers, ShieldCheck, MapPin, Truck, Leaf, Flame, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { StageNavigationFooter } from '../StageNavigationFooter';

interface TireExplorerSectionProps {
  components: TireComponent[];
  onOpenProvenance: (prov: DataProvenance) => void;
  onNavigateToMaterials: () => void;
  onSelectSection?: (section: any) => void;
}

export const TireExplorerSection: React.FC<TireExplorerSectionProps> = ({
  components,
  onOpenProvenance,
  onNavigateToMaterials,
  onSelectSection,
}) => {
  const safeComponents = Array.isArray(components) && components.length > 0 ? components : [];
  const [selectedCompId, setSelectedCompId] = useState<string>(safeComponents[0]?.id || 'comp-tread');

  const selectedComponent =
    safeComponents.find((c) => c.id === selectedCompId) ||
    safeComponents[0] || {
      id: 'comp-tread',
      name: 'Tread Layer',
      percentageOfMass: 38.5,
      weightKg: 3.25,
      purpose: 'Provides direct contact with road, wet braking traction, wear resistance, and minimal rolling resistance.',
      keyMaterials: ['Natural Rubber TSR20', 'Bio-SSBR', 'Recovered Carbon Black (rCB)', 'Bio-derived Rice Husk Silica', 'Silane Coupling Agents'],
      recycledRenewablePercent: 54.2,
      carbonContributionKgCO2e: 7.42,
      mainSupplier: 'Siam Forestry Rubber Co. & GreenSilica SpA',
      geographicOrigin: 'Surat Thani (Thailand) & Novara (Italy)',
      colorCode: '#0ea5e9',
      technicalDescription: 'Dual-compound cap and base extrudate engineered with silica-rich micro-structure for maximum wet grip and low hysteresis dissipation.',
    };

  const materialsList = selectedComponent.keyMaterials || (selectedComponent as any).materials || [];
  const compMassShare = selectedComponent.percentageOfMass ?? (selectedComponent as any).weightPercent ?? 0;
  const compPurpose = selectedComponent.purpose || (selectedComponent as any).function || '';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-verified text-xs">
              SECTION 04 • ANATOMY EXPLORER
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Interactive Tire Anatomy & Component Explorer
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Click any cross-section component to dissect its engineering formulation, origin, supplier, and carbon load.
          </p>
        </div>

        <button
          onClick={onNavigateToMaterials}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-blue-700 text-xs font-mono-code font-bold uppercase self-start sm:self-auto transition-colors shadow-2xs"
        >
          <span>View Full Bill of Materials</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Interactive Stage: Cross Section SVG + Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center: Interactive SVG Cross Section */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-between relative overflow-hidden shadow-xs">
          <div className="w-full flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-mono-code font-bold uppercase tracking-wider text-blue-700">
              RADIAL SECTION MATRIX (205/55 R16)
            </span>
            <span className="text-xs text-slate-500 font-mono-code">Click layer to inspect</span>
          </div>

          {/* Interactive Tire Cross-Section Diagram */}
          <div className="relative w-full max-w-sm aspect-square flex items-center justify-center my-4">
            <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 400 400">
              {/* Background ambient ring */}
              <circle cx="200" cy="200" r="185" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* 1. TREAD LAYER */}
              <path
                id="svg-tread"
                d="M 60 130 A 160 160 0 0 1 340 130 L 325 155 A 135 135 0 0 0 75 155 Z"
                fill={selectedCompId === 'comp-tread' ? '#2563eb' : '#334155'}
                stroke={selectedCompId === 'comp-tread' ? '#1d4ed8' : '#cbd5e1'}
                strokeWidth={selectedCompId === 'comp-tread' ? '3' : '1.5'}
                className="cursor-pointer transition-all hover:brightness-110"
                onClick={() => setSelectedCompId('comp-tread')}
              />

              {/* 2. STEEL BELTS (2 plies) */}
              <path
                id="svg-belts"
                d="M 80 157 A 132 132 0 0 1 320 157 L 315 170 A 120 120 0 0 0 85 170 Z"
                fill={selectedCompId === 'comp-belts' ? '#059669' : '#64748b'}
                stroke={selectedCompId === 'comp-belts' ? '#047857' : '#cbd5e1'}
                strokeWidth={selectedCompId === 'comp-belts' ? '3' : '1.5'}
                strokeDasharray="4 2"
                className="cursor-pointer transition-all hover:brightness-110"
                onClick={() => setSelectedCompId('comp-belts')}
              />

              {/* 3. CARCASS PLY & TEXTILE */}
              <path
                id="svg-carcass"
                d="M 50 250 C 45 190, 85 172, 200 172 C 315 172, 355 190, 350 250 L 340 250 C 344 198, 308 180, 200 180 C 92 180, 56 198, 60 250 Z"
                fill={selectedCompId === 'comp-carcass' ? '#0284c7' : '#94a3b8'}
                stroke={selectedCompId === 'comp-carcass' ? '#0369a1' : '#cbd5e1'}
                strokeWidth={selectedCompId === 'comp-carcass' ? '3' : '1.5'}
                className="cursor-pointer transition-all hover:brightness-110"
                onClick={() => setSelectedCompId('comp-carcass')}
              />

              {/* 4. SIDEWALLS (Left and Right) */}
              <path
                id="svg-sidewall-left"
                d="M 40 250 C 35 180, 70 145, 80 135 L 90 148 C 82 155, 52 185, 55 250 Z"
                fill={selectedCompId === 'comp-sidewall' ? '#2563eb' : '#475569'}
                stroke={selectedCompId === 'comp-sidewall' ? '#1d4ed8' : '#cbd5e1'}
                strokeWidth={selectedCompId === 'comp-sidewall' ? '3' : '1.5'}
                className="cursor-pointer transition-all hover:brightness-110"
                onClick={() => setSelectedCompId('comp-sidewall')}
              />
              <path
                id="svg-sidewall-right"
                d="M 360 250 C 365 180, 330 145, 320 135 L 310 148 C 318 155, 348 185, 345 250 Z"
                fill={selectedCompId === 'comp-sidewall' ? '#2563eb' : '#475569'}
                stroke={selectedCompId === 'comp-sidewall' ? '#1d4ed8' : '#cbd5e1'}
                strokeWidth={selectedCompId === 'comp-sidewall' ? '3' : '1.5'}
                className="cursor-pointer transition-all hover:brightness-110"
                onClick={() => setSelectedCompId('comp-sidewall')}
              />

              {/* 5. INNER LINER */}
              <path
                id="svg-innerliner"
                d="M 68 250 C 65 205, 96 186, 200 186 C 304 186, 335 205, 332 250 L 325 250 C 328 212, 298 193, 200 193 C 102 193, 72 212, 75 250 Z"
                fill={selectedCompId === 'comp-innerliner' ? '#059669' : '#64748b'}
                stroke={selectedCompId === 'comp-innerliner' ? '#047857' : '#cbd5e1'}
                strokeWidth={selectedCompId === 'comp-innerliner' ? '3' : '1.5'}
                className="cursor-pointer transition-all hover:brightness-110"
                onClick={() => setSelectedCompId('comp-innerliner')}
              />

              {/* 6. BEAD CORES & APEX (Left & Right) */}
              <circle
                id="svg-bead-left"
                cx="58"
                cy="265"
                r="14"
                fill={selectedCompId === 'comp-bead' ? '#2563eb' : '#1e293b'}
                stroke={selectedCompId === 'comp-bead' ? '#1d4ed8' : '#cbd5e1'}
                strokeWidth={selectedCompId === 'comp-bead' ? '3' : '1.5'}
                className="cursor-pointer transition-all hover:brightness-110"
                onClick={() => setSelectedCompId('comp-bead')}
              />
              <circle
                id="svg-bead-right"
                cx="342"
                cy="265"
                r="14"
                fill={selectedCompId === 'comp-bead' ? '#2563eb' : '#1e293b'}
                stroke={selectedCompId === 'comp-bead' ? '#1d4ed8' : '#cbd5e1'}
                strokeWidth={selectedCompId === 'comp-bead' ? '3' : '1.5'}
                className="cursor-pointer transition-all hover:brightness-110"
                onClick={() => setSelectedCompId('comp-bead')}
              />

              {/* Indicator Dot on Active Layer */}
              <text x="200" y="380" textAnchor="middle" className="text-[12px] font-mono fill-slate-500">
                Active Selection: {selectedComponent.name}
              </text>
            </svg>
          </div>

          {/* Layer Selector Chips */}
          <div className="w-full flex flex-wrap gap-1.5 justify-center pt-2 border-t border-slate-100">
            {safeComponents.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setSelectedCompId(comp.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono-code transition-all ${
                  selectedCompId === comp.id
                    ? 'bg-blue-600 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {comp.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Component Detail Card */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono-code font-bold text-blue-700 uppercase">
                  {selectedComponent.id} • {compMassShare}% OF TIRE MASS
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedComponent.name}
                </h3>
              </div>
              <span className="status-tag tag-verified text-xs">
                {(selectedComponent.weightKg ?? 0).toFixed(2)} kg
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {compPurpose}
            </p>

            {selectedComponent.technicalDescription && (
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg text-xs text-blue-900 leading-relaxed font-mono-code">
                <span className="font-bold text-blue-700 block mb-1 uppercase tracking-wider text-[10px]">
                  Technical Formulation Architecture:
                </span>
                {selectedComponent.technicalDescription}
              </div>
            )}

            {/* Materials List */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 font-mono-code">
                Constituent Material Formulation
              </span>
              <div className="flex flex-wrap gap-1.5">
                {materialsList.map((mat: string, i: number) => (
                  <span
                    key={i}
                    className="status-tag tag-supplier text-xs"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Supplier & Geographic Provenance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
                <span className="text-[11px] text-slate-500 uppercase font-mono-code flex items-center gap-1.5 mb-1 font-semibold">
                  <Truck className="w-3.5 h-3.5 text-blue-600" /> Primary Supplier
                </span>
                <span className="text-xs font-semibold text-slate-900">
                  {selectedComponent.mainSupplier}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
                <span className="text-[11px] text-slate-500 uppercase font-mono-code flex items-center gap-1.5 mb-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Geographic Origin
                </span>
                <span className="text-xs font-semibold text-slate-900">
                  {selectedComponent.geographicOrigin}
                </span>
              </div>
            </div>

            {/* Environmental & Carbon Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
                <span className="text-[11px] text-slate-500 uppercase font-mono-code flex items-center gap-1.5 mb-1 font-semibold">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Circular Feedstocks
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold font-mono-code text-emerald-700">
                    {selectedComponent.recycledRenewablePercent}%
                  </span>
                  <span className="text-xs text-slate-500 font-mono-code">Recycled / Bio</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
                <span className="text-[11px] text-slate-500 uppercase font-mono-code flex items-center gap-1.5 mb-1 font-semibold">
                  <Flame className="w-3.5 h-3.5 text-blue-600" /> Carbon Share
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold font-mono-code text-blue-700">
                    {selectedComponent.carbonContributionKgCO2e}
                  </span>
                  <span className="text-xs text-slate-500 font-mono-code">kg CO₂e</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <button
              onClick={() =>
                onOpenProvenance({
                  recordHash: `0x7a8f${selectedComponent.id.replace(/[^a-zA-Z0-9]/g, '')}f8821e9c`,
                  blockchainNetwork: 'Polygon Enterprise Trace POS / CIRPASS Node',
                  blockNumber: 49817263,
                  timestampISO: '2026-08-14T09:30:00Z',
                  witnessCertId: `TUV-SUD-MICHELIN-BOM-2026-${selectedComponent.id.toUpperCase()}`,
                  auditorOrganization: 'TÜV SÜD Mobility Certification GmbH',
                  verificationMethod: 'ISO 14044 LCA Life Cycle Inventory Audit',
                  dataQualityConfidenceScore: 98.4,
                  digitalSignature: `SHA256:7f9b2c3a4e1d9082michelin-${selectedComponent.id}`,
                  immutableLedgerStatus: 'Committed & Finalized',
                })
              }
              className="text-slate-600 hover:text-emerald-700 flex items-center gap-1.5 font-mono-code text-xs transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Audit Provenance (ISO 14044 Verified)</span>
            </button>
            <button
              onClick={onNavigateToMaterials}
              className="text-blue-700 hover:underline font-mono-code font-bold text-xs uppercase flex items-center gap-1"
            >
              Examine Raw Material Details →
            </button>
          </div>
        </div>
      </div>

      {/* Stage Navigation Footer to Materials */}
      <StageNavigationFooter activeSection="explorer" onSelectSection={onSelectSection || (() => {})} />
    </div>
  );
};
