import React, { useState } from 'react';
import { ManufacturingStage, DataProvenance } from '../../types';
import { Factory, Zap, Droplets, Trash2, Flame, ShieldCheck, CheckCircle2, FileSearch, ArrowRight, Play, Cpu } from 'lucide-react';

interface ManufacturingSectionProps {
  stages: ManufacturingStage[];
  onOpenProvenance: (prov: DataProvenance) => void;
}

export const ManufacturingSection: React.FC<ManufacturingSectionProps> = ({
  stages,
  onOpenProvenance,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const currentStage = stages.find((s) => s.step === activeStep) || stages[0];

  const totalKWh = stages.reduce((acc, s) => acc + s.electricityKWh, 0);
  const totalEmissions = stages.reduce((acc, s) => acc + s.emissionsKgCO2e, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-verified">
              SECTION 07
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-tech tracking-wide uppercase">
              Eco-Manufacturing Process & Clean Factory Journey
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9299] mt-1.5">
            Telemetry from Clermont Eco-Plant #4 (ISO 50001 Energy Management, 85% renewable electricity grid).
          </p>
        </div>

        {/* Global Plant Footprint Card */}
        <div className="flex items-center gap-4 bg-[#151619] border border-[#2D2F33] px-3.5 py-2 rounded">
          <div>
            <span className="text-[10px] text-[#8E9299] block font-mono-code uppercase">Total Power per Tire</span>
            <span className="text-xs font-mono-code font-bold text-[#00F5FF]">{totalKWh.toFixed(2)} kWh (85% Ren.)</span>
          </div>
          <div className="h-6 w-px bg-[#2D2F33]"></div>
          <div>
            <span className="text-[10px] text-[#8E9299] block font-mono-code uppercase">Scope 1 & 2 Plant LCA</span>
            <span className="text-xs font-mono-code font-bold text-[#00FF41]">{totalEmissions.toFixed(2)} kg CO₂e</span>
          </div>
        </div>
      </div>

      {/* Step Navigator Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-[#151619] border border-[#2D2F33] p-2 rounded">
        {stages.map((stage) => {
          const isSelected = stage.step === activeStep;
          return (
            <button
              key={stage.step}
              id={`mfg-step-btn-${stage.step}`}
              onClick={() => setActiveStep(stage.step)}
              className={`p-2.5 rounded text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]'
                  : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono-code font-bold uppercase text-[#00F5FF]">
                  STEP 0{stage.step}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]"></span>
              </div>
              <span className="text-xs font-bold font-tech mt-1 line-clamp-1 text-[#FFFFFF]">
                {stage.name.split(' ')[0]} {stage.name.split(' ')[1] || ''}
              </span>
            </button>
          );
        })}
      </div>

      {/* Step Deep-Dive Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Animated Step Process Visual & Specs */}
        <div className="lg:col-span-7 bg-[#151619] border border-[#2D2F33] rounded-lg p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-code text-[#00F5FF] font-bold uppercase tracking-wider">
                  STAGE 0{currentStage.step} OF 06 • FACTORY LINE TELEMETRY
                </span>
                <span className="status-tag tag-green">
                  {currentStage.status}
                </span>
              </div>
              <h3 className="text-2xl font-bold font-tech text-[#FFFFFF] mt-1">
                {currentStage.name}
              </h3>
              <p className="text-xs text-[#8E9299] mt-0.5 flex items-center gap-1.5 font-mono-code">
                <Factory className="w-3.5 h-3.5 text-[#00F5FF]" />
                {currentStage.facility} • {currentStage.location}
              </p>
            </div>

            {/* Description */}
            <div className="bg-[#0B0C0E] border border-[#2D2F33] p-4 rounded">
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block mb-1 font-mono-code">
                Industrial Operation & Automation Sequence
              </span>
              <p className="text-xs sm:text-sm text-[#FFFFFF] leading-relaxed">
                {currentStage.description}
              </p>
            </div>

            {/* Quality Control Protocol & Verification */}
            <div>
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block mb-2 font-mono-code">
                Automated Inline Quality Control Gates ({currentStage.qcChecks.length})
              </span>
              <div className="space-y-1.5">
                {currentStage.qcChecks.map((check, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded bg-[#0B0C0E] border border-[#2D2F33] text-xs text-[#FFFFFF]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00FF41] shrink-0" />
                    <span className="font-mono-code text-xs">{check}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#2D2F33] flex items-center justify-between">
            <span className="text-xs text-[#8E9299] font-mono-code text-[11px]">Sub-metered energy sensors</span>
            <button
              onClick={() => onOpenProvenance(currentStage.provenance)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B0C0E] hover:bg-[#1A1C1F] border border-[#2D2F33] text-[#00F5FF] text-xs font-mono-code font-bold uppercase transition-colors"
            >
              <FileSearch className="w-3.5 h-3.5" />
              [SOURCE: {currentStage.provenance.sourceDoc}]
            </button>
          </div>
        </div>

        {/* Right: Energy, Water, Waste & Carbon KPIs */}
        <div className="lg:col-span-5 space-y-4">
          {/* Energy Mix Card */}
          <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider flex items-center gap-1.5 font-mono-code">
                <Zap className="w-4 h-4 text-[#00F5FF]" /> Electricity & Thermal Power
              </span>
              <span className="status-tag tag-green">
                {currentStage.renewableEnergyPercent}% Renewable
              </span>
            </div>

            <div className="bg-[#0B0C0E] p-3 rounded border border-[#2D2F33] flex items-baseline justify-between">
              <span className="text-xs text-[#8E9299]">Power Consumed:</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono-code text-[#00F5FF]">
                  {currentStage.electricityKWh}
                </span>
                <span className="text-xs text-[#8E9299] font-mono-code">kWh / tire</span>
              </div>
            </div>

            <p className="text-[11px] text-[#8E9299] font-mono-code">
              Source: {currentStage.energySource}
            </p>
          </div>

          {/* Water & Scrap Reinjection Card */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-4 shadow-xl space-y-2">
              <span className="text-[10px] text-[#8E9299] flex items-center gap-1 font-mono-code uppercase">
                <Droplets className="w-3.5 h-3.5 text-[#00F5FF]" /> Water Consumed
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold font-mono-code text-[#00F5FF]">
                  {currentStage.waterConsumptionLiters}
                </span>
                <span className="text-xs text-[#8E9299] font-mono-code">L</span>
              </div>
              <span className="text-[10px] text-[#8E9299] font-mono-code block">Closed-loop chiller</span>
            </div>

            <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-4 shadow-xl space-y-2">
              <span className="text-[10px] text-[#8E9299] flex items-center gap-1 font-mono-code uppercase">
                <Trash2 className="w-3.5 h-3.5 text-[#00FF41]" /> Scrap Recycled
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold font-mono-code text-[#00FF41]">
                  {currentStage.scrapReinjectionPercent}%
                </span>
              </div>
              <span className="text-[10px] text-[#8E9299] font-mono-code block">0.4% total scrap rate</span>
            </div>
          </div>

          {/* Direct Stage Emissions Card */}
          <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-5 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider flex items-center gap-1.5 font-mono-code">
                <Flame className="w-4 h-4 text-[#8E9299]" /> Process Emissions
              </span>
              <span className="text-[10px] font-mono-code text-[#8E9299]">ISO 14067</span>
            </div>

            <div className="bg-[#0B0C0E] p-3 rounded border border-[#2D2F33] flex items-baseline justify-between">
              <span className="text-xs text-[#8E9299]">Stage Carbon Impact:</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono-code text-[#FFFFFF]">
                  {currentStage.emissionsKgCO2e}
                </span>
                <span className="text-xs text-[#8E9299] font-mono-code">kg CO₂e</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
