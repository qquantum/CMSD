import React, { useState } from 'react';
import { 
  RotateCcw, 
  Trees, 
  Factory, 
  Truck, 
  Radio, 
  Recycle, 
  Flame, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface CircularityLifecycleGraphicProps {
  onSelectStage?: (stageId: string) => void;
}

const LIFECYCLE_STAGES = [
  {
    id: 'sourcing',
    num: 1,
    title: 'Sustainable Sourcing',
    subtitle: '58% Bio-circular Raw Feedstock',
    icon: Trees,
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    details: 'EUDR GPS polygon verified FSC natural rubber from Surat Thani (Thailand), micro-dispersed rice husk bio-silica, and 92.4% recycled electric arc furnace steel.',
    metric: '58.0% Sustainable'
  },
  {
    id: 'manufacturing',
    num: 2,
    title: 'Eco-Plant Manufacturing',
    subtitle: 'Clermont-Ferrand Cataroux Site',
    icon: Factory,
    color: '#0284C7',
    bgColor: '#F0F9FF',
    borderColor: '#BAE6FD',
    details: 'Electric nitrogen curing presses, 100% renewable wind & solar electricity PPA, zero industrial landfill waste, and sub-metered induction vulcanization.',
    metric: '2.50 kg CO₂e / tire'
  },
  {
    id: 'oem',
    num: 3,
    title: 'OEM EV Integration',
    subtitle: 'First-Fit Factory Assembly',
    icon: Truck,
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    details: 'Integrated onto premium electric vehicle architectures (Tesla, Renault, VW) with Michelin Acoustic PU foam ring damping high-frequency EV cabin noise.',
    metric: '65,000 km target'
  },
  {
    id: 'telemetry',
    num: 4,
    title: 'In-Service Fleet IoT',
    subtitle: 'GDSO RFID & Live TPMS Stream',
    icon: Radio,
    color: '#D97706',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    details: 'Molded GDSO passive RFID tag #30342B5B communicates with smart fleet telematics, measuring dynamic tire pressure, thermal spikes, and tread wear gradient.',
    metric: 'Live 2.52 bar / 6.8 mm'
  },
  {
    id: 'retreading',
    num: 5,
    title: 'Michelin Remix® Retreading',
    subtitle: 'Multi-Life Casing Re-Use',
    icon: RotateCcw,
    color: '#0D9488',
    bgColor: '#F0FDFA',
    borderColor: '#99F6E4',
    details: 'Non-destructive shearography casing inspection followed by high-precision cold retreading, saving 70% of raw materials and doubling casing lifespan.',
    metric: '+60,000 km 2nd Life'
  },
  {
    id: 'granulation',
    num: 6,
    title: 'Clean ELT Shredding',
    subtitle: 'Mechanical Fractionation',
    icon: Recycle,
    color: '#EA580C',
    bgColor: '#FFF7ED',
    borderColor: '#FFEDD5',
    details: 'Aliapur certified facility granulates the retiree casing, magnetically reclaiming 100% of steel bead wire and separating crumb rubber down to 0.4 mm.',
    metric: '99.4% Steel Recovery'
  },
  {
    id: 'pyrolysis',
    num: 7,
    title: 'Closed-Loop Pyrolysis',
    subtitle: 'Recovered Carbon Black (rCB)',
    icon: Sparkles,
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    details: 'Oxygen-free thermochemical microwave depolymerization yields ASTM N330 recovered Carbon Black (rCB) and circular oil reinjected directly into Michelin factories.',
    metric: '-2.15 kg CO₂e / kg rCB'
  }
];

export const CircularityLifecycleGraphic: React.FC<CircularityLifecycleGraphicProps> = ({ onSelectStage }) => {
  const [activeStageId, setActiveStageId] = useState<string>('sourcing');
  const activeStage = LIFECYCLE_STAGES.find(s => s.id === activeStageId) || LIFECYCLE_STAGES[0];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-green">10R CIRCULAR ECONOMY</span>
            <span className="status-tag tag-blue">CLOSED-LOOP REGENERATION</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Complete Circular Lifecycle Pathway
          </h3>
          <p className="text-sm text-slate-500">
            Trace the tire from sustainable agriculture through smart manufacturing, in-service IoT monitoring, multi-life retreading, and molecular circular rebirth.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 text-xs font-mono-code font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
          <RotateCcw className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '8s' }} />
          <span>88/100 Circularity Index</span>
        </div>
      </div>

      {/* Horizontal Flow Pipeline Diagram */}
      <div className="mt-6 overflow-x-auto pb-4">
        <div className="min-w-[780px] flex items-center justify-between relative px-2">
          {/* Connecting Track Line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-slate-200 z-0 rounded-full"></div>
          <div 
            className="absolute top-1/2 left-6 -translate-y-1/2 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-teal-500 z-0 rounded-full transition-all duration-300"
            style={{ 
              width: `${((LIFECYCLE_STAGES.findIndex(s => s.id === activeStageId)) / (LIFECYCLE_STAGES.length - 1)) * 96}%` 
            }}
          ></div>

          {LIFECYCLE_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStageId === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStageId(stage.id);
                  if (onSelectStage) onSelectStage(stage.id);
                }}
                className="group relative z-10 flex flex-col items-center text-center cursor-pointer transition-transform duration-150 active:scale-95"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all shadow-sm ${
                    isSelected
                      ? 'scale-115 ring-4 ring-blue-100'
                      : 'hover:scale-105 bg-white'
                  }`}
                  style={{
                    backgroundColor: isSelected ? stage.color : '#FFFFFF',
                    borderColor: stage.color,
                    color: isSelected ? '#FFFFFF' : stage.color,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="mt-2.5 max-w-[95px]">
                  <span className="text-[10px] font-mono-code font-bold block text-slate-400">
                    STAGE {stage.num}
                  </span>
                  <span className={`text-xs font-bold leading-tight block truncate ${
                    isSelected ? 'text-slate-900' : 'text-slate-600'
                  }`}>
                    {stage.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep Dive Detail Box */}
      <div 
        className="mt-4 p-5 rounded-xl border transition-all"
        style={{ backgroundColor: activeStage.bgColor, borderColor: activeStage.borderColor }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span 
                className="text-xs font-mono-code font-bold px-2 py-0.5 rounded text-white"
                style={{ backgroundColor: activeStage.color }}
              >
                STAGE {activeStage.num} OF 7
              </span>
              <h4 className="text-base font-bold text-slate-900">
                {activeStage.title} — {activeStage.subtitle}
              </h4>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed pt-1">
              {activeStage.details}
            </p>
          </div>

          <div className="shrink-0 bg-white/90 border border-slate-200/80 p-3 rounded-lg text-center shadow-2xs">
            <span className="text-[11px] font-mono-code text-slate-500 uppercase font-semibold block">
              Key Indicator
            </span>
            <span 
              className="text-base font-extrabold font-mono-code block mt-0.5"
              style={{ color: activeStage.color }}
            >
              {activeStage.metric}
            </span>
          </div>
        </div>

        {/* Closed Loop Visual Indicator Banner */}
        {activeStage.id === 'pyrolysis' && (
          <div className="mt-4 pt-3 border-t border-emerald-200 flex items-center justify-between text-xs text-emerald-800 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              100% of Recovered Carbon Black is reinjected into Stage 1 (Sustainable Sourcing) for the next generation of Michelin e·Primacy tires!
            </span>
            <span className="font-bold text-emerald-900 font-mono-code">
              CLOSED LOOP CONFIRMED
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
