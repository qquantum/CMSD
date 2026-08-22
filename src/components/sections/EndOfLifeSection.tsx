import React, { useState } from 'react';
import { EndOfLifeOption, DataProvenance } from '../../types';
import { Recycle, ShieldAlert, Sparkles, Building2, Flame, CheckCircle2, FileSearch, ArrowRight, ShieldCheck, AlertTriangle, Cpu, Wrench } from 'lucide-react';

interface EndOfLifeSectionProps {
  options: EndOfLifeOption[];
  onOpenProvenance: (prov: DataProvenance) => void;
}

export const EndOfLifeSection: React.FC<EndOfLifeSectionProps> = ({
  options,
  onOpenProvenance,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<number>(options[0].optionNumber);

  const activeOption = options.find((o) => o.optionNumber === selectedOptionId) || options[0];

  const disassemblySteps = [
    {
      title: 'Phase 1: Automated Casing Scanning & Shearography',
      desc: 'Non-destructive ultrasonic and laser shearography scanning detects internal belt separations or cord damage to classify casing for Retreading (Grade A) vs Pyrolysis (Grade B/C).',
    },
    {
      title: 'Phase 2: Bead Wire De-beading & Magnetic Extraction',
      desc: 'Dual-hook hydraulic puller extracts high-tensile steel bead bundles intact, eliminating high-wear shredder blade friction and preparing 100% pure steel wire for induction smelting.',
    },
    {
      title: 'Phase 3: Multi-Stage Ambient & Cryogenic Granulation',
      desc: 'Slow-speed rotary shear tears rubber into 20mm chips, followed by cryogenic nitrogen cooling (-196°C) for micronized rubber powder (80 mesh) extraction.',
    },
    {
      title: 'Phase 4: Oxygen-Free Vacuum Pyrolysis Recovery',
      desc: 'Granulate is fed into a 550°C continuous rotary kiln, condensing gas fractions into high-grade Tire Pyrolysis Oil (TPO) and milled Recovered Carbon Black (rCB).',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-verified">
              SECTION 12
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-tech tracking-wide uppercase">
              End-of-Life (ELT) Disassembly & Pyrolysis Recovery Pathways
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9299] mt-1.5">
            End-of-Life Tyre (ELT) directive compliance, bead de-wiring protocols, continuous vacuum pyrolysis guidelines, and certified recovery facilities.
          </p>
        </div>

        {/* Global Diversion KPI */}
        <div className="flex items-center gap-3 bg-[#151619] border border-[#2D2F33] px-3.5 py-2 rounded">
          <div className="text-right">
            <span className="text-[10px] text-[#8E9299] block font-mono-code uppercase">Landfill Diversion Rate</span>
            <span className="text-xs font-mono-code font-bold text-[#00FF41]">100% Zero-Landfill Verified</span>
          </div>
          <div className="w-7 h-7 rounded bg-[#0B0C0E] border border-[#2D2F33] flex items-center justify-center text-[#00FF41]">
            <Recycle className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Disassembly Protocol & 4 Certified Treatment Pathways */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Step-by-Step ELT Disassembly Protocol */}
        <div className="lg:col-span-6 bg-[#151619] border border-[#2D2F33] rounded-lg p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-tech text-[#FFFFFF] flex items-center gap-2 uppercase">
                <Wrench className="w-5 h-5 text-[#00F5FF]" />
                Industrial Disassembly & Separation Sequence
              </h3>
              <span className="status-tag tag-supplier">
                EU WFD 2008/98/EC
              </span>
            </div>

            <div className="space-y-3">
              {disassemblySteps.map((step, idx) => (
                <div key={idx} className="p-3.5 bg-[#0B0C0E] rounded border border-[#2D2F33] flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#151619] border border-[#2D2F33] flex items-center justify-center text-[#00F5FF] font-mono-code font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#FFFFFF] block font-mono-code">{step.title}</span>
                    <span className="text-xs text-[#8E9299] mt-1 block leading-relaxed">
                      {step.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Hazardous Clearance */}
            <div className="bg-[#0B0C0E] border border-[#00FF41]/30 p-4 rounded space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00FF41] font-mono-code uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Toxic Residues or Halogen Volatiles</span>
              </div>
              <p className="text-xs text-[#8E9299]">
                The vulcanized formulation is 100% free of SVHC and chlorinated additives, allowing 100% mass processing in continuous pyrolysis kilns without toxic acid scrubbing hazards.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Certified Recycling Pathways */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-tech text-[#FFFFFF] flex items-center gap-2 uppercase">
                <Building2 className="w-4 h-4 text-[#00FF41]" />
                Certified Industrial Treatment Options ({options.length})
              </h3>
              <span className="text-[10px] font-mono-code text-[#00F5FF] font-bold uppercase">
                Select Option
              </span>
            </div>

            {/* Option Pills */}
            <div className="grid grid-cols-2 gap-2">
              {options.map((opt) => {
                const isSelected = opt.optionNumber === activeOption.optionNumber;
                return (
                  <button
                    key={opt.optionNumber}
                    onClick={() => setSelectedOptionId(opt.optionNumber)}
                    className={`p-3 rounded text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]'
                        : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-mono-code font-bold text-[#00F5FF]">
                        PATHWAY 0{opt.optionNumber}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#151619] text-[#8E9299] font-mono-code border border-[#2D2F33]">
                        {opt.recoveryEfficiencyPercent}% Eff.
                      </span>
                    </div>
                    <span className="text-xs font-bold font-tech mt-1 line-clamp-1 text-[#FFFFFF]">
                      {opt.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Option Dossier Card */}
            <div className="bg-[#0B0C0E] p-4 rounded border border-[#2D2F33] space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-[#FFFFFF] font-tech block">{activeOption.name}</span>
                  <span className="text-[11px] text-[#00F5FF] font-mono-code">{activeOption.operator} ({activeOption.facilityLocation})</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold font-mono-code text-[#00FF41]">-{activeOption.carbonAvoidanceKgCO2e} kg CO₂e</span>
                  <span className="text-[10px] text-[#8E9299] block font-mono-code">Avoided Burden</span>
                </div>
              </div>

              <p className="text-[#8E9299] leading-relaxed">
                {activeOption.technology}
              </p>

              {/* Recovered Output Fractions */}
              <div className="space-y-1.5 pt-2 border-t border-[#2D2F33]">
                <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block font-mono-code">
                  Recovered Material Fractions & Application
                </span>
                {activeOption.recoveredOutputs.map((out, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-[#151619] border border-[#2D2F33]">
                    <span className="text-[#FFFFFF] font-mono-code text-xs">{out.name}</span>
                    <div className="flex items-baseline gap-2 font-mono-code text-xs">
                      <span className="text-[#00F5FF] font-bold">{out.percentage}%</span>
                      <span className="text-[10px] text-[#8E9299]">→ {out.destination}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Provenance Button */}
              <div className="pt-2 border-t border-[#2D2F33] flex items-center justify-between">
                <span className="text-[11px] text-[#8E9299] font-mono-code">Maturity: <strong className="text-[#FFFFFF]">{activeOption.maturityLevel}</strong></span>
                <button
                  onClick={() => onOpenProvenance(activeOption.provenance)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#151619] hover:bg-[#1A1C1F] text-[#00F5FF] border border-[#2D2F33] font-mono-code text-[11px] font-bold uppercase transition-colors"
                >
                  <FileSearch className="w-3 h-3" />
                  [SOURCE: {activeOption.provenance.sourceDoc}]
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
