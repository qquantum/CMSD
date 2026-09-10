import React from 'react';
import { SectionId } from '../types';
import { 
  FileBadge2, 
  Sparkles, 
  Layers, 
  FlaskConical, 
  Globe2, 
  Trees, 
  Factory, 
  Flame, 
  Gauge, 
  Activity, 
  Recycle, 
  RotateCcw, 
  ShieldCheck,
  FileCode2,
  ChevronRight,
  CheckCircle2,
  Compass
} from 'lucide-react';

export interface FlowStage {
  id: SectionId;
  stepNumber: number;
  label: string;
  shortLabel: string;
  phase: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const FLOW_STAGES: FlowStage[] = [
  { 
    id: 'passport', 
    stepNumber: 1, 
    label: '1. Identity & Overview', 
    shortLabel: 'Identity',
    phase: 'Digital Identity',
    badge: 'PASSPORT', 
    icon: FileBadge2 
  },
  { 
    id: '3d-studio', 
    stepNumber: 2, 
    label: '2. 3D Twin & Anatomy', 
    shortLabel: '3D Twin',
    phase: 'Physical Twin',
    badge: 'WEBGL 3D', 
    icon: Sparkles 
  },
  { 
    id: 'materials', 
    stepNumber: 3, 
    label: '3. Materials (BOM)', 
    shortLabel: 'Materials',
    phase: 'Formulation',
    badge: '58% SUSTAINABLE', 
    icon: FlaskConical 
  },
  { 
    id: 'rubber', 
    stepNumber: 4, 
    label: '4. Rubber & EUDR Origin', 
    shortLabel: 'EUDR Trace',
    phase: 'Supply Chain',
    badge: 'ZERO DEFOREST', 
    icon: Trees 
  },
  { 
    id: 'manufacturing', 
    stepNumber: 5, 
    label: '5. Manufacturing & PCF', 
    shortLabel: 'Factory & Carbon',
    phase: 'Production',
    badge: 'ISO 14067', 
    icon: Factory 
  },
  { 
    id: 'performance', 
    stepNumber: 6, 
    label: '6. Homologation & EU Label', 
    shortLabel: 'EU Label',
    phase: 'Certification',
    badge: 'EU GRADE A/A', 
    icon: Gauge 
  },
  { 
    id: 'lifecycle', 
    stepNumber: 7, 
    label: '7. In-Service Fleet IoT', 
    shortLabel: 'Fleet IoT',
    phase: 'Use Phase',
    badge: 'LIVE TPMS', 
    icon: Activity 
  },
  { 
    id: 'circularity', 
    stepNumber: 8, 
    label: '8. Circularity & EOL', 
    shortLabel: 'Circularity',
    phase: 'Closed Loop',
    badge: '10R RECOVERY', 
    icon: Recycle 
  },
  { 
    id: 'compliance', 
    stepNumber: 9, 
    label: '9. Regulatory & Code', 
    shortLabel: 'Compliance',
    phase: 'Audit & Schema',
    badge: 'W3C VC 2.0', 
    icon: ShieldCheck 
  }
];

interface PassportFlowStepperProps {
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  onOpenTraceTour?: () => void;
}

export const PassportFlowStepper: React.FC<PassportFlowStepperProps> = ({
  activeSection,
  onSelectSection,
  onOpenTraceTour
}) => {
  const currentStageIndex = FLOW_STAGES.findIndex(s => s.id === activeSection);
  const currentStageNumber = currentStageIndex >= 0 ? currentStageIndex + 1 : 1;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 mb-6 shadow-xs select-none">
      {/* Flow Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono-code uppercase tracking-wider text-blue-800">
                LIFECYCLE PASSPORT FLOW:
              </span>
              <span className="text-xs font-mono-code font-bold px-2 py-0.5 bg-blue-100/80 text-blue-900 rounded">
                PHASE {currentStageNumber} OF 9
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Follow the end-to-end journey of the Michelin e·Primacy tire through all required regulatory lifecycle milestones.
            </p>
          </div>
        </div>

        {onOpenTraceTour && (
          <button
            onClick={onOpenTraceTour}
            className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-wide transition-all shadow-2xs"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Guided Tour (10-Step)</span>
          </button>
        )}
      </div>

      {/* Progress Bar Track */}
      <div className="mt-4 pt-1">
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentStageNumber / FLOW_STAGES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Stepper Horizontal Scrollable Pipeline */}
      <div className="mt-4 overflow-x-auto pb-1 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-[860px]">
          {FLOW_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = stage.id === activeSection;
            const isCompleted = currentStageIndex > idx;

            return (
              <button
                key={stage.id}
                onClick={() => onSelectSection(stage.id)}
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 border text-left ${
                  isActive
                    ? 'bg-blue-50/80 border-blue-300 text-blue-900 shadow-2xs ring-2 ring-blue-500/20'
                    : isCompleted
                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs shrink-0 font-mono-code font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    stage.stepNumber
                  )}
                </div>

                <div>
                  <span className={`block font-bold text-xs leading-tight ${
                    isActive ? 'text-blue-950' : 'text-slate-800'
                  }`}>
                    {stage.shortLabel}
                  </span>
                  <span className="text-[10px] font-mono-code text-slate-400 block uppercase">
                    {stage.badge}
                  </span>
                </div>

                {idx < FLOW_STAGES.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-slate-300 ml-1 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
