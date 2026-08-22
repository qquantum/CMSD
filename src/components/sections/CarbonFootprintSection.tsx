import React, { useState } from 'react';
import { CarbonLCA, DataProvenance } from '../../types';
import { Flame, ShieldCheck, FileSearch, ArrowRight, Info, Scale, TrendingDown, Layers, Zap } from 'lucide-react';

interface CarbonFootprintSectionProps {
  carbonLCA: CarbonLCA;
  onOpenProvenance: (prov: DataProvenance) => void;
}

export const CarbonFootprintSection: React.FC<CarbonFootprintSectionProps> = ({
  carbonLCA,
  onOpenProvenance,
}) => {
  const [activeScopeTab, setActiveScopeTab] = useState<'pcf' | 'scopes' | 'materials'>('pcf');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-verified">
              SECTION 08
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-tech tracking-wide uppercase">
              Product Carbon Footprint (PCF) & Cradle-to-Grave LCA
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9299] mt-1.5">
            Compliant with ISO 14067 & GHG Protocol Product Standard. Verified by Bureau Veritas.
          </p>
        </div>

        {/* High-Level PCF Summary Badge */}
        <div className="flex items-center gap-4 bg-[#151619] border border-[#2D2F33] px-3.5 py-2 rounded">
          <div>
            <span className="text-[10px] text-[#8E9299] block font-mono-code uppercase">Cradle-to-Gate (Factory Out)</span>
            <span className="text-sm font-mono-code font-bold text-[#00F5FF]">
              {carbonLCA.totalCradleToGateKgCO2e} kg CO₂e / tire
            </span>
          </div>
          <div className="h-6 w-px bg-[#2D2F33]"></div>
          <div>
            <span className="text-[10px] text-[#8E9299] block font-mono-code uppercase">Cradle-to-Grave (65,000 km)</span>
            <span className="text-sm font-mono-code font-bold text-[#00FF41]">
              {carbonLCA.totalCradleToGraveKgCO2e} kg CO₂e
            </span>
          </div>
        </div>
      </div>

      {/* Scope vs PCF vs Corporate Distinction Guide */}
      <div className="bg-[#151619] border border-[#2D2F33] p-4 rounded flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#8E9299]">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-[#0B0C0E] text-[#00F5FF] shrink-0 mt-0.5 border border-[#2D2F33]">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-[#FFFFFF] block mb-0.5 font-mono-code uppercase text-[11px]">Corporate vs. Product Level Boundary Distinction</strong>
            <span className="text-[#8E9299]">
              This passport measures the <strong className="text-[#00F5FF]">Product Carbon Footprint (PCF)</strong> of this specific tire serial. Cradle-to-gate covers 100% of material extraction + supplier transport + plant assembly. Use-phase represents electricity consumed by vehicle propulsion to overcome rolling resistance.
            </span>
          </div>
        </div>

        <button
          onClick={() => onOpenProvenance(carbonLCA.provenance)}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B0C0E] hover:bg-[#1A1C1F] border border-[#2D2F33] text-[#00F5FF] font-mono-code font-bold text-xs uppercase transition-colors"
        >
          <FileSearch className="w-3.5 h-3.5" />
          [SOURCE: LCA Report #LCA-AC-2026-X1]
        </button>
      </div>

      {/* 3 Scope Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Scope 1 */}
        <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono-code text-[#00F5FF] font-bold uppercase tracking-wider">
              SCOPE 1 DIRECT
            </span>
            <span className="status-tag tag-verified">
              Direct Fuel & Heat
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono-code text-[#00F5FF]">
              {carbonLCA.scope1KgCO2e}
            </span>
            <span className="text-xs text-[#8E9299] font-mono-code">kg CO₂e / tire</span>
          </div>
          <p className="text-xs text-[#8E9299] leading-snug">
            Direct combustion from factory backup steam boilers and on-site natural gas heating platens.
          </p>
        </div>

        {/* Scope 2 */}
        <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono-code text-[#00FF41] font-bold uppercase tracking-wider">
              SCOPE 2 INDIRECT
            </span>
            <span className="status-tag tag-green">
              Market Electricity
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono-code text-[#00FF41]">
              {carbonLCA.scope2KgCO2e}
            </span>
            <span className="text-xs text-[#8E9299] font-mono-code">kg CO₂e / tire</span>
          </div>
          <p className="text-xs text-[#8E9299] leading-snug">
            Purchased grid electricity (85% covered by French solar/wind Corporate PPAs with Guarantees of Origin).
          </p>
        </div>

        {/* Scope 3 Upstream */}
        <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono-code text-[#8E9299] font-bold uppercase tracking-wider">
              SCOPE 3 UPSTREAM
            </span>
            <span className="status-tag tag-supplier">
              Raw Materials & Supply
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono-code text-[#FFFFFF]">
              {carbonLCA.scope3UpstreamKgCO2e}
            </span>
            <span className="text-xs text-[#8E9299] font-mono-code">kg CO₂e / tire</span>
          </div>
          <p className="text-xs text-[#8E9299] leading-snug">
            Purchased feedstocks (natural rubber, bio-SSBR, steel cords, bio-silica) and Tier-1 to Tier-3 logistics.
          </p>
        </div>
      </div>

      {/* Interactive Lifecycle Sankey-Style Flow Diagram */}
      <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-tech text-[#FFFFFF] uppercase">
              Lifecycle Stage Carbon Flow (Cradle-to-Grave)
            </h3>
            <p className="text-xs text-[#8E9299]">
              Progressive flow of greenhouse gas emissions across all 6 lifecycle stages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code text-[#8E9299]">
              Data Quality: <strong className="text-[#00FF41]">{carbonLCA.dataQualityRating}</strong>
            </span>
          </div>
        </div>

        {/* Visual Flow Diagram */}
        <div className="space-y-4">
          {carbonLCA.stageBreakdown.map((stage, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F5FF]"></span>
                  <span className="font-semibold text-[#FFFFFF] font-mono-code text-xs">{stage.stage}</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono-code font-bold text-[#FFFFFF]">
                    {stage.kgCO2e > 0 ? `+${stage.kgCO2e}` : stage.kgCO2e} kg CO₂e
                  </span>
                  <span className="font-mono-code text-[#8E9299] w-12 text-right">
                    {stage.percent}%
                  </span>
                </div>
              </div>

              <div className="w-full bg-[#0B0C0E] rounded h-2 overflow-hidden flex border border-[#2D2F33]">
                <div
                  className="h-full rounded transition-all bg-[#00F5FF]"
                  style={{
                    width: `${Math.max(Math.abs(stage.percent), 2)}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* End-of-Life Avoided Burden Credit Note */}
        <div className="p-3.5 rounded bg-[#0B0C0E] border border-[#00FF41]/30 flex items-center justify-between text-xs text-[#00FF41]">
          <div className="flex items-center gap-2 font-mono-code">
            <TrendingDown className="w-4 h-4 text-[#00FF41]" />
            <span>End-of-Life Pyrolysis & Steel Recycling Credit:</span>
          </div>
          <span className="font-mono-code font-bold text-[#00FF41]">
            {carbonLCA.scope3EndOfLifeCreditKgCO2e} kg CO₂e Avoided Burden
          </span>
        </div>
      </div>

      {/* Material-by-Material Carbon Breakdown Matrix */}
      <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-6 shadow-xl space-y-4">
        <h3 className="text-lg font-bold font-tech text-[#FFFFFF] uppercase">
          Raw Material Sourcing Carbon Intensity Matrix
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {carbonLCA.materialBreakdown.map((mat, i) => (
            <div key={i} className="p-3 bg-[#0B0C0E] rounded border border-[#2D2F33] flex items-center justify-between text-xs">
              <span className="text-[#8E9299] font-medium font-mono-code">{mat.material}</span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono-code font-bold text-[#00F5FF]">{mat.kgCO2e} kg CO₂e</span>
                <span className="text-[10px] text-[#8E9299] font-mono-code">({mat.percent}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
