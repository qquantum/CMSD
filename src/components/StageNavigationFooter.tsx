import React from 'react';
import { SectionId } from '../types';
import { FLOW_STAGES } from './PassportFlowStepper';
import { ArrowLeft, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

interface StageNavigationFooterProps {
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
}

const ALL_SECTIONS_NAV: { id: SectionId; label: string }[] = [
  { id: 'passport', label: '1. Passport Overview' },
  { id: '3d-studio', label: '2. 3D Twin & Cinema' },
  { id: 'code-studio', label: '3. Code Studio' },
  { id: 'explorer', label: '4. Tire Anatomy Explorer' },
  { id: 'materials', label: '5. Materials & BOM' },
  { id: 'origin', label: '6. Raw Material Origins' },
  { id: 'rubber', label: '7. Rubber & EUDR Trace' },
  { id: 'supply-chain', label: '8. Supplier Network' },
  { id: 'manufacturing', label: '9. Clean Manufacturing' },
  { id: 'carbon', label: '10. Product Carbon Footprint' },
  { id: 'performance', label: '11. Homologation Performance' },
  { id: 'lifecycle', label: '12. In-Service Fleet IoT' },
  { id: 'circularity', label: '13. Circularity 10R' },
  { id: 'end-of-life', label: '14. End of Life & Pyrolysis' },
  { id: 'compliance', label: '15. Verification & Compliance' },
];

export const StageNavigationFooter: React.FC<StageNavigationFooterProps> = ({
  activeSection,
  onSelectSection
}) => {
  const currentIndex = ALL_SECTIONS_NAV.findIndex(s => s.id === activeSection);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const prevStage = safeIndex > 0 ? ALL_SECTIONS_NAV[safeIndex - 1] : null;
  const nextStage = safeIndex < ALL_SECTIONS_NAV.length - 1 ? ALL_SECTIONS_NAV[safeIndex + 1] : null;

  return (
    <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
      {/* Previous Button */}
      {prevStage ? (
        <button
          onClick={() => onSelectSection(prevStage.id)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block font-mono-code uppercase">PREVIOUS STAGE</span>
            <span className="text-slate-900 block font-semibold">{prevStage.label}</span>
          </div>
        </button>
      ) : (
        <div className="hidden sm:block"></div>
      )}

      {/* Center Stage Counter */}
      <div className="flex items-center gap-2 text-xs font-mono-code text-slate-500">
        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
        <span>STAGE {safeIndex + 1} OF {ALL_SECTIONS_NAV.length}</span>
      </div>

      {/* Next Button */}
      {nextStage ? (
        <button
          onClick={() => onSelectSection(nextStage.id)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-sm"
        >
          <div className="text-right">
            <span className="text-[10px] text-blue-200 block font-mono-code uppercase">NEXT STAGE</span>
            <span className="text-white block font-semibold">{nextStage.label}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-blue-200" />
        </button>
      ) : (
        <button
          onClick={() => onSelectSection('passport')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-100" />
          <span>Passport Fully Verified (Return to Top)</span>
        </button>
      )}
    </div>
  );
};
