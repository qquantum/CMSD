import React, { useState } from 'react';
import { TirePassportData, Circularity10RItem, LifecycleEvent, DataProvenance } from '../../types';
import { RefreshCw, Repeat, ShieldCheck, FileSearch, Sparkles, CheckCircle2, History, Wrench, Layers, Leaf, Flame, Activity, ArrowRight } from 'lucide-react';

interface CircularitySectionProps {
  tire: TirePassportData;
  onOpenProvenance: (prov: DataProvenance) => void;
}

export const CircularitySection: React.FC<CircularitySectionProps> = ({
  tire,
  onOpenProvenance,
}) => {
  const [selectedRNumber, setSelectedRNumber] = useState<string>('R7'); // R7 Remanufacture (Retreading) default
  const [activeTab, setActiveTab] = useState<'10r' | 'closedLoop' | 'lifecycle'>('10r');

  const activeRItem = tire.circularity10R.find((r) => r.rNumber === selectedRNumber) || tire.circularity10R[0];

  const totalCircularity = tire.recycledContentPercent + tire.renewableContentPercent;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-verified">
              SECTION 10 & 11
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-tech tracking-wide uppercase">
              Circularity, 10R Framework & Lifecycle Traceability
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9299] mt-1.5">
            Complete cascade from proactive maintenance and multi-life retreading (R7) to chemical devulcanization and closed-loop pyrolysis recovery.
          </p>
        </div>

        {/* Global Circularity KPI Pill */}
        <div className="flex items-center gap-4 bg-[#151619] border border-[#2D2F33] px-3.5 py-2 rounded">
          <div>
            <span className="text-[10px] text-[#8E9299] block font-mono-code uppercase">Circularity Rate</span>
            <span className="text-sm font-mono-code font-bold text-[#00FF41]">
              {totalCircularity.toFixed(1)}% (Bio + Recycled)
            </span>
          </div>
          <div className="h-6 w-px bg-[#2D2F33]"></div>
          <div>
            <span className="text-[10px] text-[#8E9299] block font-mono-code uppercase">Recyclability Yield</span>
            <span className="text-sm font-mono-code font-bold text-[#00F5FF]">
              96.5% Closed Loop
            </span>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-[#151619] border border-[#2D2F33] p-1 rounded w-fit">
        <button
          onClick={() => setActiveTab('10r')}
          className={`px-3 py-1.5 rounded text-xs font-mono-code font-bold uppercase transition-all ${
            activeTab === '10r'
              ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]'
              : 'text-[#8E9299] hover:text-[#FFFFFF] border border-transparent'
          }`}
        >
          10R CIRCULARITY HIERARCHY ({tire.circularity10R.length})
        </button>

        <button
          onClick={() => setActiveTab('closedLoop')}
          className={`px-3 py-1.5 rounded text-xs font-mono-code font-bold uppercase transition-all ${
            activeTab === 'closedLoop'
              ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]'
              : 'text-[#8E9299] hover:text-[#FFFFFF] border border-transparent'
          }`}
        >
          CLOSED-LOOP MASS BALANCE
        </button>

        <button
          onClick={() => setActiveTab('lifecycle')}
          className={`px-3 py-1.5 rounded text-xs font-mono-code font-bold uppercase transition-all ${
            activeTab === 'lifecycle'
              ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]'
              : 'text-[#8E9299] hover:text-[#FFFFFF] border border-transparent'
          }`}
        >
          IN-SERVICE LOG ({tire.lifecycleTimeline.length})
        </button>
      </div>

      {activeTab === '10r' && (
        /* 10R Interactive Stepper Hierarchy */
        <div className="space-y-6">
          <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-tech text-[#FFFFFF] flex items-center gap-2 uppercase">
                  <RefreshCw className="w-5 h-5 text-[#00F5FF]" />
                  The 10R Circularity Cascade (R0 Refuse to R10 Recover)
                </h3>
                <p className="text-xs text-[#8E9299] mt-0.5">
                  Ranked from highest value retention to raw thermal recovery. Click any stage to inspect engineering implementation.
                </p>
              </div>

              <span className="status-tag tag-verified">
                SELECTED: {activeRItem.rNumber} {activeRItem.name}
              </span>
            </div>

            {/* 10R Button Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {tire.circularity10R.map((item) => {
                const isSelected = item.rNumber === selectedRNumber;
                return (
                  <button
                    key={item.rNumber}
                    id={`ten-r-btn-${item.rNumber.toLowerCase()}`}
                    onClick={() => setSelectedRNumber(item.rNumber)}
                    className={`p-2.5 rounded text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]'
                        : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-mono-code font-bold text-[#00F5FF]">
                        {item.rNumber}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-mono-code ${
                          item.status === 'Active' || item.status === 'Optimized'
                            ? 'bg-[#00FF41]/20 text-[#00FF41] border border-[#00FF41]/30'
                            : 'bg-[#0B0C0E] text-[#8E9299] border border-[#2D2F33]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <span className="text-xs font-bold font-tech mt-2 line-clamp-1 text-[#FFFFFF]">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-[#8E9299] mt-1 line-clamp-1 font-mono-code">
                      {item.priorityTier.split('(')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected 10R Detailed Card */}
            <div className="bg-[#0B0C0E] border border-[#2D2F33] p-5 rounded flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono-code font-bold text-[#00F5FF]">
                    {activeRItem.rNumber} • {activeRItem.name} Strategy
                  </span>
                  <span className="status-tag tag-green">
                    {activeRItem.priorityTier}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#FFFFFF] max-w-3xl leading-relaxed mt-1">
                  {activeRItem.implementationInPassport}
                </p>
              </div>

              <div className="shrink-0 bg-[#151619] p-3 rounded border border-[#2D2F33] text-right">
                <span className="text-[10px] text-[#8E9299] block uppercase font-mono-code">LCA Impact</span>
                <span className="text-xs font-mono-code font-bold text-[#00FF41]">{activeRItem.savingsImpact}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'closedLoop' && (
        /* Tire-to-Tire Closed Loop Mass Balance */
        <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-6 shadow-xl space-y-5">
          <div>
            <h3 className="text-lg font-bold font-tech text-[#FFFFFF] flex items-center gap-2 uppercase">
              <Sparkles className="w-5 h-5 text-[#00F5FF]" />
              Tire-to-Tire Circular Mass Flow & Downcycling Elimination
            </h3>
            <p className="text-xs text-[#8E9299] mt-0.5">
              Material balance tracking 10,000 tons of end-of-life tires into primary recovered secondary raw materials (rCB, TPO, Devulc, Steel).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tire.closedLoopFlow.map((flow, idx) => (
              <div key={idx} className="p-4 bg-[#0B0C0E] rounded border border-[#2D2F33] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold font-tech text-[#FFFFFF]">{flow.outputName}</span>
                  <span className="text-xs font-mono-code text-[#00F5FF] font-bold">{flow.outputTons} tons/yr</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[#8E9299]">
                    <span>Re-used in New Tires (Tire-to-Tire):</span>
                    <strong className="text-[#00FF41] font-mono-code">{flow.reusedInNewTiresPercent}%</strong>
                  </div>
                  <div className="w-full bg-[#151619] rounded h-1.5 overflow-hidden border border-[#2D2F33]">
                    <div className="bg-[#00FF41] h-full rounded" style={{ width: `${flow.reusedInNewTiresPercent}%` }}></div>
                  </div>

                  <div className="flex items-center justify-between text-[#8E9299] pt-1">
                    <span>Downcycled (Asphalt/Pavements):</span>
                    <span className="text-[#FFFFFF] font-mono-code">{flow.downcycledPercent}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[#8E9299]">
                    <span>Energy Recovery / Waste:</span>
                    <span className="text-[#8E9299] font-mono-code">{flow.energyPercent}% / {flow.wastePercent}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'lifecycle' && (
        /* In-Service Telemetry and Maintenance History */
        <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-tech text-[#FFFFFF] flex items-center gap-2 uppercase">
              <Activity className="w-5 h-5 text-[#00F5FF]" />
              Cryptographic In-Service & Maintenance Timeline
            </h3>
            <span className="status-tag tag-verified">
              RFID SERIAL: {tire.epcRfid}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {tire.lifecycleTimeline.map((evt) => (
              <div key={evt.id} className="p-4 bg-[#0B0C0E] rounded border border-[#2D2F33] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#FFFFFF] font-tech">{evt.stage}</span>
                    <span className="status-tag tag-supplier">
                      {evt.actor}
                    </span>
                  </div>
                  <p className="text-[#8E9299]">{evt.description}</p>
                  <span className="text-[11px] text-[#8E9299] block font-mono-code">{evt.location} • Verified by: <strong className="text-[#FFFFFF]">{evt.verifiedBy}</strong></span>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono-code text-[#8E9299] block">{evt.date}</span>
                  <span className="text-[11px] font-mono-code text-[#00FF41] font-bold mt-0.5 block">{evt.impactMetrics}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
