import React, { useState } from 'react';
import { ManufacturingStage, DataProvenance } from '../../types';
import { Factory, Zap, Droplets, Trash2, Flame, ShieldCheck, CheckCircle2, FileSearch, ArrowRight, Play, Cpu } from 'lucide-react';
import { StageNavigationFooter } from '../StageNavigationFooter';

interface ManufacturingSectionProps {
  stages: ManufacturingStage[];
  onOpenProvenance: (prov: DataProvenance) => void;
  onSelectSection?: (section: any) => void;
}

export const ManufacturingSection: React.FC<ManufacturingSectionProps> = ({
  stages,
  onOpenProvenance,
  onSelectSection,
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
            <span className="status-tag tag-verified text-xs">
              SECTION 05 • ECO-MANUFACTURING
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Eco-Manufacturing Process & Clean Factory Journey
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Telemetry from Clermont Eco-Plant #4 (ISO 50001 Energy Management, 85% renewable electricity grid).
          </p>
        </div>

        {/* Global Plant Footprint Card */}
        <div className="flex items-center gap-4 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs">
          <div>
            <span className="text-[11px] text-slate-500 block font-mono-code uppercase font-semibold">Total Power per Tire</span>
            <span className="text-xs font-mono-code font-bold text-blue-700">{totalKWh.toFixed(2)} kWh (85% Ren.)</span>
          </div>
          <div className="h-7 w-px bg-slate-200"></div>
          <div>
            <span className="text-[11px] text-slate-500 block font-mono-code uppercase font-semibold">Scope 1 & 2 Plant LCA</span>
            <span className="text-xs font-mono-code font-bold text-emerald-700">{totalEmissions.toFixed(2)} kg CO₂e</span>
          </div>
        </div>
      </div>

      {/* Step Navigator Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-white border border-slate-200 p-2.5 rounded-xl shadow-xs">
        {stages.map((stage) => {
          const isSelected = stage.step === activeStep;
          return (
            <button
              key={stage.step}
              id={`mfg-step-btn-${stage.step}`}
              onClick={() => setActiveStep(stage.step)}
              className={`p-3 rounded-lg text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-mono-code font-bold uppercase ${isSelected ? 'text-blue-100' : 'text-blue-700'}`}>
                  STEP 0{stage.step}
                </span>
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-300' : 'bg-emerald-500'}`}></span>
              </div>
              <span className={`text-xs font-bold mt-1.5 line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {(stage.name || '').split(' ')[0] || ''} {(stage.name || '').split(' ')[1] || ''}
              </span>
            </button>
          );
        })}
      </div>

      {/* Step Deep-Dive Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Step Process Visual & Specs */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-xs space-y-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-code text-blue-700 font-bold uppercase tracking-wider">
                  STAGE 0{currentStage.step} OF 06 • FACTORY LINE TELEMETRY
                </span>
                <span className="status-tag tag-green text-xs">
                  {currentStage.status}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {currentStage.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-mono-code">
                <Factory className="w-3.5 h-3.5 text-blue-600" />
                {currentStage.facility} • {currentStage.location}
              </p>
            </div>

            {/* Description */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 font-mono-code">
                Industrial Operation & Automation Sequence
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">
                {currentStage.description}
              </p>
            </div>

            {/* Quality Control Protocol & Verification */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 font-mono-code">
                Automated Inline Quality Control Gates ({currentStage.qcChecks.length})
              </span>
              <div className="space-y-2">
                {currentStage.qcChecks.map((check, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono-code text-xs">{check}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono-code">Sub-metered energy sensors</span>
            <button
              onClick={() => onOpenProvenance(currentStage.provenance)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono-code font-bold uppercase transition-colors shadow-xs"
            >
              <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
              <span>SOURCE: {currentStage.provenance.sourceDoc}</span>
            </button>
          </div>
        </div>

        {/* Right: Energy, Water, Waste & Carbon KPIs */}
        <div className="lg:col-span-5 space-y-4">
          {/* Energy Mix Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-mono-code">
                <Zap className="w-4 h-4 text-amber-500" /> Electricity & Thermal Power
              </span>
              <span className="status-tag tag-green text-xs">
                {currentStage.renewableEnergyPercent}% Renewable
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex items-baseline justify-between">
              <span className="text-xs text-slate-600 font-medium">Power Consumed:</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono-code text-blue-700">
                  {currentStage.electricityKWh}
                </span>
                <span className="text-xs text-slate-500 font-mono-code">kWh / tire</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-mono-code">
              Source: {currentStage.energySource}
            </p>
          </div>

          {/* Water & Scrap Reinjection Card */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono-code uppercase font-semibold">
                <Droplets className="w-3.5 h-3.5 text-blue-600" /> Water Consumed
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold font-mono-code text-blue-700">
                  {currentStage.waterConsumptionLiters}
                </span>
                <span className="text-xs text-slate-500 font-mono-code">L</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono-code block">Closed-loop chiller</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono-code uppercase font-semibold">
                <Trash2 className="w-3.5 h-3.5 text-emerald-600" /> Scrap Recycled
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold font-mono-code text-emerald-700">
                  {currentStage.scrapReinjectionPercent}%
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono-code block">0.4% total scrap rate</span>
            </div>
          </div>

          {/* Direct Stage Emissions Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-mono-code">
                <Flame className="w-4 h-4 text-slate-400" /> Process Emissions
              </span>
              <span className="text-xs font-mono-code text-slate-500">ISO 14067</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex items-baseline justify-between">
              <span className="text-xs text-slate-600 font-medium">Stage Carbon Impact:</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono-code text-slate-900">
                  {currentStage.emissionsKgCO2e}
                </span>
                <span className="text-xs text-slate-500 font-mono-code">kg CO₂e</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Navigation Footer to Next Phase: Homologation & Performance */}
      <StageNavigationFooter activeSection="manufacturing" onSelectSection={onSelectSection || (() => {})} />
    </div>
  );
};
