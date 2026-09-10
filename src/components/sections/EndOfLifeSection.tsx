import React, { useState } from 'react';
import { EndOfLifeOption, DataProvenance } from '../../types';
import { Recycle, ShieldAlert, Sparkles, Building2, Flame, CheckCircle2, FileSearch, ArrowRight, ShieldCheck, AlertTriangle, Cpu, Wrench } from 'lucide-react';
import { StageNavigationFooter } from '../StageNavigationFooter';

interface EndOfLifeSectionProps {
  options: EndOfLifeOption[];
  onOpenProvenance: (prov: DataProvenance) => void;
  onSelectSection?: (section: any) => void;
}

export const EndOfLifeSection: React.FC<EndOfLifeSectionProps> = ({
  options,
  onOpenProvenance,
  onSelectSection,
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
            <span className="status-tag tag-verified text-xs">
              SECTION 12 • END OF LIFE
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              End-of-Life (ELT) Disassembly & Pyrolysis Recovery Pathways
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            End-of-Life Tyre (ELT) directive compliance, bead de-wiring protocols, continuous vacuum pyrolysis guidelines, and certified recovery facilities.
          </p>
        </div>

        {/* Global Diversion KPI */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs">
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block font-mono-code uppercase font-semibold">Landfill Diversion Rate</span>
            <span className="text-xs font-mono-code font-bold text-emerald-700">100% Zero-Landfill Verified</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Recycle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Grid: Disassembly Protocol & 4 Certified Treatment Pathways */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Step-by-Step ELT Disassembly Protocol */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-xs space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-600" />
                Industrial Disassembly & Separation Sequence
              </h3>
              <span className="status-tag tag-supplier text-xs">
                EU WFD 2008/98/EC
              </span>
            </div>

            <div className="space-y-3">
              {disassemblySteps.map((step, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-800 font-mono-code font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block font-mono-code">{step.title}</span>
                    <span className="text-xs text-slate-600 mt-1 block leading-relaxed">
                      {step.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Hazardous Clearance */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 font-mono-code uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Zero Toxic Residues or Halogen Volatiles</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed mt-1">
                The vulcanized formulation is 100% free of SVHC and chlorinated additives, allowing 100% mass processing in continuous pyrolysis kilns without toxic acid scrubbing hazards.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Certified Recycling Pathways */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                Certified Industrial Treatment Options ({options.length})
              </h3>
              <span className="text-xs font-mono-code text-blue-700 font-bold uppercase">
                Select Option
              </span>
            </div>

            {/* Option Pills */}
            <div className="grid grid-cols-2 gap-2.5">
              {options.map((opt) => {
                const isSelected = opt.optionNumber === activeOption.optionNumber;
                return (
                  <button
                    key={opt.optionNumber}
                    onClick={() => setSelectedOptionId(opt.optionNumber)}
                    className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-50/80 text-blue-900 border border-blue-400 shadow-2xs ring-1 ring-blue-300'
                        : 'bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-mono-code font-bold text-blue-700">
                        PATHWAY 0{opt.optionNumber}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-600 font-mono-code border border-slate-200 font-semibold">
                        {opt.recoveryEfficiencyPercent}% Eff.
                      </span>
                    </div>
                    <span className="text-xs font-bold mt-1.5 line-clamp-1 text-slate-900">
                      {opt.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Option Dossier Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">{activeOption.name}</span>
                  <span className="text-xs text-blue-700 font-mono-code">{activeOption.operator} ({activeOption.facilityLocation})</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold font-mono-code text-emerald-700">-{activeOption.carbonAvoidanceKgCO2e} kg CO₂e</span>
                  <span className="text-[10px] text-slate-500 block font-mono-code">Avoided Burden</span>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                {activeOption.technology}
              </p>

              {/* Recovered Output Fractions */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono-code">
                  Recovered Material Fractions & Application
                </span>
                {activeOption.recoveredOutputs.map((out, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                    <span className="text-slate-800 font-mono-code text-xs font-medium">{out.name}</span>
                    <div className="flex items-baseline gap-2 font-mono-code text-xs">
                      <span className="text-blue-700 font-bold">{out.percentage}%</span>
                      <span className="text-xs text-slate-500">→ {out.destination}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Provenance Button */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono-code">Maturity: <strong className="text-slate-900">{activeOption.maturityLevel}</strong></span>
                <button
                  onClick={() => onOpenProvenance(activeOption.provenance)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-mono-code text-xs font-bold uppercase transition-colors shadow-2xs"
                >
                  <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SOURCE: {activeOption.provenance.sourceDoc}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Navigation Footer to Next Phase: Audit & Compliance */}
      <StageNavigationFooter activeSection="eol" onSelectSection={onSelectSection || (() => {})} />
    </div>
  );
};
