import React, { useState } from 'react';
import { CarbonLCA, DataProvenance } from '../../types';
import { Flame, ShieldCheck, FileSearch, ArrowRight, Info, Scale, TrendingDown, Layers, Zap } from 'lucide-react';
import { StageNavigationFooter } from '../StageNavigationFooter';

interface CarbonFootprintSectionProps {
  carbonLCA: CarbonLCA;
  onOpenProvenance: (prov: DataProvenance) => void;
  onSelectSection?: (section: any) => void;
}

export const CarbonFootprintSection: React.FC<CarbonFootprintSectionProps> = ({
  carbonLCA,
  onOpenProvenance,
  onSelectSection,
}) => {
  const [activeScopeTab, setActiveScopeTab] = useState<'pcf' | 'scopes' | 'materials'>('pcf');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-verified text-xs">
              SECTION 07 • LCA EMISSIONS
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Product Carbon Footprint (PCF) & Cradle-to-Grave LCA
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Compliant with ISO 14067 & GHG Protocol Product Standard. Verified by Bureau Veritas.
          </p>
        </div>

        {/* High-Level PCF Summary Badge */}
        <div className="flex items-center gap-4 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs">
          <div>
            <span className="text-[11px] text-slate-500 block font-mono-code uppercase font-semibold">Cradle-to-Gate (Factory Out)</span>
            <span className="text-sm font-mono-code font-bold text-blue-700">
              {carbonLCA.totalCradleToGateKgCO2e} kg CO₂e / tire
            </span>
          </div>
          <div className="h-7 w-px bg-slate-200"></div>
          <div>
            <span className="text-[11px] text-slate-500 block font-mono-code uppercase font-semibold">Cradle-to-Grave (65,000 km)</span>
            <span className="text-sm font-mono-code font-bold text-emerald-700">
              {carbonLCA.totalCradleToGraveKgCO2e} kg CO₂e
            </span>
          </div>
        </div>
      </div>

      {/* Scope vs PCF vs Corporate Distinction Guide */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-600 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-700 shrink-0 mt-0.5 border border-blue-200">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-slate-900 block mb-0.5 font-mono-code uppercase text-xs">Corporate vs. Product Level Boundary Distinction</strong>
            <span className="text-slate-600 leading-relaxed">
              This passport measures the <strong className="text-blue-700">Product Carbon Footprint (PCF)</strong> of this specific tire serial. Cradle-to-gate covers 100% of material extraction + supplier transport + plant assembly. Use-phase represents electricity consumed by vehicle propulsion to overcome rolling resistance.
            </span>
          </div>
        </div>

        <button
          onClick={() => onOpenProvenance(carbonLCA.provenance)}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-mono-code font-bold text-xs uppercase transition-colors shadow-2xs"
        >
          <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
          <span>LCA Report #LCA-AC-2026-X1</span>
        </button>
      </div>

      {/* 3 Scope Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Scope 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-blue-700 font-bold uppercase tracking-wider">
              SCOPE 1 DIRECT
            </span>
            <span className="status-tag tag-verified text-xs">
              Direct Fuel & Heat
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono-code text-blue-700">
              {carbonLCA.scope1KgCO2e}
            </span>
            <span className="text-xs text-slate-500 font-mono-code">kg CO₂e / tire</span>
          </div>
          <p className="text-xs text-slate-600 leading-snug">
            Direct combustion from factory backup steam boilers and on-site natural gas heating platens.
          </p>
        </div>

        {/* Scope 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-emerald-700 font-bold uppercase tracking-wider">
              SCOPE 2 INDIRECT
            </span>
            <span className="status-tag tag-green text-xs">
              Market Electricity
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono-code text-emerald-700">
              {carbonLCA.scope2KgCO2e}
            </span>
            <span className="text-xs text-slate-500 font-mono-code">kg CO₂e / tire</span>
          </div>
          <p className="text-xs text-slate-600 leading-snug">
            Purchased grid electricity (85% covered by French solar/wind Corporate PPAs with Guarantees of Origin).
          </p>
        </div>

        {/* Scope 3 Upstream */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-slate-600 font-bold uppercase tracking-wider">
              SCOPE 3 UPSTREAM
            </span>
            <span className="status-tag tag-supplier text-xs">
              Raw Materials & Supply
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono-code text-slate-900">
              {carbonLCA.scope3UpstreamKgCO2e}
            </span>
            <span className="text-xs text-slate-500 font-mono-code">kg CO₂e / tire</span>
          </div>
          <p className="text-xs text-slate-600 leading-snug">
            Purchased feedstocks (natural rubber, bio-SSBR, steel cords, bio-silica) and Tier-1 to Tier-3 logistics.
          </p>
        </div>
      </div>

      {/* Interactive Lifecycle Sankey-Style Flow Diagram */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Lifecycle Stage Carbon Flow (Cradle-to-Grave)
            </h3>
            <p className="text-xs text-slate-500">
              Progressive flow of greenhouse gas emissions across all 6 lifecycle stages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code text-slate-500">
              Data Quality: <strong className="text-emerald-700 font-bold">{carbonLCA.dataQualityRating}</strong>
            </span>
          </div>
        </div>

        {/* Visual Flow Diagram */}
        <div className="space-y-4">
          {carbonLCA.stageBreakdown.map((stage, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span className="font-semibold text-slate-800 font-mono-code text-xs">{stage.stage}</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono-code font-bold text-slate-900">
                    {stage.kgCO2e > 0 ? `+${stage.kgCO2e}` : stage.kgCO2e} kg CO₂e
                  </span>
                  <span className="font-mono-code text-slate-500 w-12 text-right">
                    {stage.percent}%
                  </span>
                </div>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex border border-slate-200">
                <div
                  className="h-full rounded-full transition-all bg-blue-600"
                  style={{
                    width: `${Math.max(Math.abs(stage.percent), 2)}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* End-of-Life Avoided Burden Credit Note */}
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2 font-mono-code">
            <TrendingDown className="w-4 h-4 text-emerald-700" />
            <span className="font-semibold">End-of-Life Pyrolysis & Steel Recycling Credit:</span>
          </div>
          <span className="font-mono-code font-bold text-emerald-800">
            {carbonLCA.scope3EndOfLifeCreditKgCO2e} kg CO₂e Avoided Burden
          </span>
        </div>
      </div>

      {/* Material-by-Material Carbon Breakdown Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Raw Material Sourcing Carbon Intensity Matrix
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {carbonLCA.materialBreakdown.map((mat, i) => (
            <div key={i} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-700 font-medium font-mono-code">{mat.material}</span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono-code font-bold text-blue-700">{mat.kgCO2e} kg CO₂e</span>
                <span className="text-xs text-slate-500 font-mono-code">({mat.percent}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Navigation Footer to Circularity & 10R */}
      <StageNavigationFooter activeSection="carbon" onSelectSection={onSelectSection || (() => {})} />
    </div>
  );
};
