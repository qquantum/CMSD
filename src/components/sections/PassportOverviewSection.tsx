import React from 'react';
import { TirePassportData, UserRole, DataProvenance } from '../../types';
import { 
  ShieldCheck, 
  Award, 
  Leaf, 
  Scale, 
  Flame, 
  Calendar, 
  MapPin, 
  QrCode, 
  CheckCircle2, 
  ExternalLink, 
  Info,
  Compass,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Building2
} from 'lucide-react';

interface PassportOverviewProps {
  tire: TirePassportData;
  role: UserRole;
  onOpenProvenance: (prov: DataProvenance) => void;
  onOpenTraceTour: () => void;
  onSelectSection: (section: any) => void;
}

export const PassportOverviewSection: React.FC<PassportOverviewProps> = ({
  tire,
  role,
  onOpenProvenance,
  onOpenTraceTour,
  onSelectSection,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Role Banner / Context Adaptor */}
      <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded bg-[#00F5FF]/10 border border-[#00F5FF]/30 text-[#00F5FF] shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="status-tag tag-verified">
                VIEWING AS {role.toUpperCase()}
              </span>
              <span className="status-tag tag-supplier">
                ROLE PERSPECTIVE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#8E9299] mt-1.5 leading-relaxed">
              {role === 'consumer' && 'Simplified transparency summary: sustainable materials, safety, EV range boost, and free end-of-life recycling dropoff.'}
              {role === 'manufacturer' && 'Complete industrial telemetry: Scope 1-3 carbon, BOM composition, plant energy sub-metering, and supplier risk indices.'}
              {role === 'supplier' && 'Material batch lot traceability, ISCC PLUS mass-balance ledger, and Tier-2 audit certifications.'}
              {role === 'recycler' && 'Casing retreadability criteria, pyrolysis yields (rCB, TPO, Steel), and devulcanization feedstock specs.'}
              {role === 'regulator' && 'EU ESPR conformity, EUDR GPS polygon audit trails, EPREL verification, and REACH chemical declarations.'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenTraceTour}
          className="shrink-0 flex items-center gap-2 px-4 py-2 rounded bg-[#0B0C0E] hover:bg-[#1A1C1F] border border-[#2D2F33] text-[#00F5FF] text-xs font-bold font-mono-code uppercase tracking-wider transition-all shadow-sm"
        >
          <Compass className="w-4 h-4 text-[#00F5FF]" />
          <span>Interactive Story</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Digital Identity Hero Card */}
      <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Product & Passport Identity */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="status-tag tag-verified">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse"></span>
                  PASSPORT ID: {tire.passportId}
                </span>
                <span className="status-tag tag-supplier">
                  GTIN: {tire.gtin}
                </span>
                <span className="status-tag tag-green">
                  EU ESPR COMPLIANT
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight font-tech">
                {tire.productName}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#8E9299]">
                <span className="flex items-center gap-1 text-[#FFFFFF] font-medium">
                  <Building2 className="w-3.5 h-3.5 text-[#00F5FF]" /> {tire.manufacturer}
                </span>
                <span className="text-[#2D2F33]">•</span>
                <span className="font-mono-code text-[#00F5FF] font-bold text-xs bg-[#0B0C0E] px-2 py-0.5 rounded border border-[#2D2F33]">
                  {tire.tireSize}
                </span>
                <span className="text-[#2D2F33]">•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8E9299]" /> {tire.manufacturingPlant}
                </span>
              </div>
            </div>

            {/* Quick Specs Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#0B0C0E] border border-[#2D2F33] rounded p-3.5">
                <span className="text-[10px] text-[#8E9299] uppercase font-mono-code block font-semibold">Total Mass</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold font-mono-code text-[#FFFFFF]">{tire.totalWeightKg}</span>
                  <span className="text-xs text-[#8E9299]">kg</span>
                </div>
                <span className="text-[10px] text-[#00FF41] font-mono-code">EV Spec Aero</span>
              </div>

              <div className="bg-[#0B0C0E] border border-[#2D2F33] rounded p-3.5">
                <span className="text-[10px] text-[#8E9299] uppercase font-mono-code block font-semibold">Circular Content</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold font-mono-code text-[#00F5FF]">
                    {(tire.recycledContentPercent + tire.renewableContentPercent).toFixed(1)}%
                  </span>
                </div>
                <span className="text-[10px] text-[#8E9299] font-mono-code">28.4% Rec. + 22.1% Bio</span>
              </div>

              <div className="bg-[#0B0C0E] border border-[#2D2F33] rounded p-3.5">
                <span className="text-[10px] text-[#8E9299] uppercase font-mono-code block font-semibold">PCF Cradle-to-Gate</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold font-mono-code text-[#00F5FF]">
                    {tire.carbonLCA.totalCradleToGateKgCO2e}
                  </span>
                  <span className="text-[10px] text-[#8E9299]">kg CO₂e</span>
                </div>
                <span className="text-[10px] text-[#8E9299] font-mono-code">ISO 14067 Scope</span>
              </div>

              <div className="bg-[#0B0C0E] border border-[#2D2F33] rounded p-3.5">
                <span className="text-[10px] text-[#8E9299] uppercase font-mono-code block font-semibold">EU Tyre Label</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold font-mono-code text-[#00FF41]">A / A</span>
                  <span className="text-xs font-mono-code text-[#8E9299]">68 dB</span>
                </div>
                <span className="text-[10px] text-[#00FF41] font-mono-code">Top Wet Grip & Eff.</span>
              </div>
            </div>

            {/* Verifiable Provenance Pill & Source Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#2D2F33]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00FF41]"></div>
                <span className="text-xs text-[#8E9299]">
                  Last verified on <strong className="text-[#FFFFFF]">{tire.lastUpdated}</strong> by Bureau Veritas
                </span>
              </div>

              <button
                onClick={() => onOpenProvenance(tire.performance.provenance)}
                className="flex items-center gap-1 text-xs text-[#00F5FF] hover:underline font-mono-code font-semibold"
              >
                [VERIFY: ECE-R117 Approval #E2-0219448]
              </button>
            </div>
          </div>

          {/* Right: Interactive 3D/Vector Tire Visualization & QR Code Preview */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 bg-[#0B0C0E] rounded-lg border border-[#2D2F33] relative">
            {/* Vector Cross-Section Highlight Simulation */}
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Outer Tread */}
              <svg className="w-full h-full text-neutral-800" viewBox="0 0 200 200">
                {/* Tread outer ring with sipes */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="#2D2F33" strokeWidth="18" />
                <circle cx="100" cy="100" r="90" fill="none" stroke="#00F5FF" strokeWidth="18" strokeDasharray="12 4" opacity="0.85" />
                {/* Steel Belt layer */}
                <circle cx="100" cy="100" r="78" fill="none" stroke="#8E9299" strokeWidth="4" strokeDasharray="3 2" />
                {/* Carcass ply layer */}
                <circle cx="100" cy="100" r="72" fill="none" stroke="#3D4046" strokeWidth="3" />
                {/* Innerliner */}
                <circle cx="100" cy="100" r="66" fill="none" stroke="#00FF41" strokeWidth="3" />
                {/* Wheel Rim / Hub */}
                <circle cx="100" cy="100" r="50" fill="#151619" stroke="#2D2F33" strokeWidth="2" />
                <circle cx="100" cy="100" r="30" fill="#0B0C0E" stroke="#2D2F33" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="8" fill="#00F5FF" />
                
                {/* Dynamic radar sweep effect */}
                <line x1="100" y1="100" x2="100" y2="10" stroke="#00F5FF" strokeWidth="1.5" opacity="0.7" className="radar-sweep origin-center" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[9px] font-mono-code text-[#00F5FF] font-bold uppercase tracking-wider">E-Performance</span>
                <span className="text-sm font-tech font-bold text-[#FFFFFF]">X1 205/55 R16</span>
                <span className="text-[9px] text-[#8E9299] font-mono-code">Acoustic PU Cavity</span>
              </div>
            </div>

            {/* Quick interactive trigger to Explorer */}
            <div className="mt-4 flex items-center justify-between w-full pt-3 border-t border-[#2D2F33] text-xs">
              <span className="text-[#8E9299] font-mono-code text-[11px]">6 Modular Layers Tagged</span>
              <button
                onClick={() => onSelectSection('explorer')}
                className="text-[#00F5FF] hover:underline font-bold font-mono-code text-xs uppercase flex items-center gap-1"
              >
                Inspect Anatomy <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Passport Integrity Score */}
        <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-5 hover:border-[#00F5FF]/60 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded bg-[#00F5FF]/10 text-[#00F5FF]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="status-tag tag-verified">
              SCORE: 92.5/100
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#FFFFFF] font-tech">Traceability Confidence</h3>
          <p className="text-xs text-[#8E9299] mt-1.5 leading-relaxed">
            Covers 100% of Tier-1 and Tier-2 suppliers with satellite GPS polygon verification.
          </p>
          <div className="mt-3 flex items-center justify-between text-xs pt-2.5 border-t border-[#2D2F33]">
            <span className="text-[#8E9299] font-mono-code text-[11px]">EUDR: 100% Valid</span>
            <button onClick={() => onSelectSection('rubber')} className="text-[#00F5FF] font-mono-code font-bold hover:underline">
              Audit →
            </button>
          </div>
        </div>

        {/* 2. Circular Economy Ratio */}
        <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-5 hover:border-[#00FF41]/60 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded bg-[#00FF41]/10 text-[#00FF41]">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="status-tag tag-green">
              50.5% CIRCULAR
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#FFFFFF] font-tech">Sustainable Feedstocks</h3>
          <p className="text-xs text-[#8E9299] mt-1.5 leading-relaxed">
            28.4% post-consumer recycled steel/rCB + 22.1% bio-silica & bio-rubber polymers.
          </p>
          <div className="mt-3 flex items-center justify-between text-xs pt-2.5 border-t border-[#2D2F33]">
            <span className="text-[#8E9299] font-mono-code text-[11px]">Virgin: 49.5%</span>
            <button onClick={() => onSelectSection('circularity')} className="text-[#00FF41] font-mono-code font-bold hover:underline">
              10R Wheel →
            </button>
          </div>
        </div>

        {/* 3. Product Carbon Footprint (PCF) */}
        <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-5 hover:border-[#00F5FF]/60 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded bg-[#00F5FF]/10 text-[#00F5FF]">
              <Flame className="w-5 h-5" />
            </div>
            <span className="status-tag tag-verified">
              20.3 KG CO₂E
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#FFFFFF] font-tech">Cradle-to-Gate Carbon</h3>
          <p className="text-xs text-[#8E9299] mt-1.5 leading-relaxed">
            Scope 1 & 2 plant emissions are 2.5 kg CO₂e thanks to 85% renewable electricity.
          </p>
          <div className="mt-3 flex items-center justify-between text-xs pt-2.5 border-t border-[#2D2F33]">
            <span className="text-[#8E9299] font-mono-code text-[11px]">ISO 14067 Scope</span>
            <button onClick={() => onSelectSection('carbon')} className="text-[#00F5FF] font-mono-code font-bold hover:underline">
              LCA Sankey →
            </button>
          </div>
        </div>

        {/* 4. Second Life & Retreadability */}
        <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-5 hover:border-[#00F5FF]/60 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded bg-[#151619] text-[#8E9299] border border-[#2D2F33]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <span className="status-tag tag-supplier">
              +45,000 KM
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#FFFFFF] font-tech">Retread Second Life</h3>
          <p className="text-xs text-[#8E9299] mt-1.5 leading-relaxed">
            High-strength casing engineered for 1-2 cold retread cycles, saving 70% raw materials.
          </p>
          <div className="mt-3 flex items-center justify-between text-xs pt-2.5 border-t border-[#2D2F33]">
            <span className="text-[#8E9299] font-mono-code text-[11px]">ECE-R108 Ready</span>
            <button onClick={() => onSelectSection('end-of-life')} className="text-[#00F5FF] font-mono-code font-bold hover:underline">
              ELT Tree →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
