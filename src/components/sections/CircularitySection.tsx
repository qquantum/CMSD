import React, { useState } from 'react';
import { TirePassportData, Circularity10RItem, LifecycleEvent, DataProvenance } from '../../types';
import { RefreshCw, Repeat, ShieldCheck, FileSearch, Sparkles, CheckCircle2, History, Wrench, Layers, Leaf, Flame, Activity, ArrowRight } from 'lucide-react';
import { CircularityLifecycleGraphic } from '../graphics/CircularityLifecycleGraphic';
import { StageNavigationFooter } from '../StageNavigationFooter';

interface CircularitySectionProps {
  tire: TirePassportData;
  onOpenProvenance: (prov: DataProvenance) => void;
  onSelectSection?: (section: any) => void;
}

export const CircularitySection: React.FC<CircularitySectionProps> = ({
  tire,
  onOpenProvenance,
  onSelectSection,
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
            <span className="status-tag tag-verified text-xs">
              SECTION 08 • CIRCULARITY
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Circularity, 10R Framework & Lifecycle Traceability
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Complete cascade from proactive maintenance and multi-life retreading (R7) to chemical devulcanization and closed-loop pyrolysis recovery.
          </p>
        </div>

        {/* Global Circularity KPI Pill */}
        <div className="flex items-center gap-4 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs">
          <div>
            <span className="text-[11px] text-slate-500 block font-mono-code uppercase font-semibold">Circularity Rate</span>
            <span className="text-sm font-mono-code font-bold text-emerald-700">
              {totalCircularity.toFixed(1)}% (Bio + Recycled)
            </span>
          </div>
          <div className="h-7 w-px bg-slate-200"></div>
          <div>
            <span className="text-[11px] text-slate-500 block font-mono-code uppercase font-semibold">Recyclability Yield</span>
            <span className="text-sm font-mono-code font-bold text-blue-700">
              96.5% Closed Loop
            </span>
          </div>
        </div>
      </div>

      {/* Visual Circularity Lifecycle Graphic */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-2">
          Closed-Loop Material Flow & Multi-Life Cascade
        </h3>
        <CircularityLifecycleGraphic
          renewablePercent={tire.renewableContentPercent}
          recycledPercent={tire.recycledContentPercent}
          retreadCount={tire.retreadCount || 2}
        />
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-xl w-fit shadow-xs">
        <button
          onClick={() => setActiveTab('10r')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-code font-bold uppercase transition-all ${
            activeTab === '10r'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          10R CIRCULARITY HIERARCHY ({tire.circularity10R.length})
        </button>

        <button
          onClick={() => setActiveTab('closedLoop')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-code font-bold uppercase transition-all ${
            activeTab === 'closedLoop'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          CLOSED-LOOP MASS BALANCE
        </button>

        <button
          onClick={() => setActiveTab('lifecycle')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-code font-bold uppercase transition-all ${
            activeTab === 'lifecycle'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          IN-SERVICE LOG ({tire.lifecycleTimeline.length})
        </button>
      </div>

      {activeTab === '10r' && (
        /* 10R Interactive Stepper Hierarchy */
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                  The 10R Circularity Cascade (R0 Refuse to R10 Recover)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ranked from highest value retention to raw thermal recovery. Click any stage to inspect engineering implementation.
                </p>
              </div>

              <span className="status-tag tag-verified text-xs">
                SELECTED: {activeRItem.rNumber} {activeRItem.name}
              </span>
            </div>

            {/* 10R Button Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {tire.circularity10R.map((item) => {
                const isSelected = item.rNumber === selectedRNumber;
                return (
                  <button
                    key={item.rNumber}
                    id={`ten-r-btn-${item.rNumber.toLowerCase()}`}
                    onClick={() => setSelectedRNumber(item.rNumber)}
                    className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-50/80 text-blue-900 border border-blue-400 shadow-2xs ring-1 ring-blue-300'
                        : 'bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-mono-code font-bold text-blue-700">
                        {item.rNumber}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono-code font-semibold ${
                          item.status === 'Active' || item.status === 'Optimized'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <span className="text-xs font-bold mt-2 line-clamp-1 text-slate-900">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1 line-clamp-1 font-mono-code">
                      {(item.priorityTier || '').split('(')[0]?.trim() || ''}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected 10R Detailed Card */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono-code font-bold text-blue-700">
                    {activeRItem.rNumber} • {activeRItem.name} Strategy
                  </span>
                  <span className="status-tag tag-green text-xs">
                    {activeRItem.priorityTier}
                  </span>
                </div>
                <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
                  {activeRItem.implementationInPassport}
                </p>
              </div>

              <div className="shrink-0 bg-white p-3.5 rounded-lg border border-slate-200 text-right shadow-2xs">
                <span className="text-[10px] text-slate-500 block uppercase font-mono-code font-semibold">LCA Impact</span>
                <span className="text-xs font-mono-code font-bold text-emerald-700">{activeRItem.savingsImpact}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'closedLoop' && (
        /* Tire-to-Tire Closed Loop Mass Balance */
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Tire-to-Tire Circular Mass Flow & Downcycling Elimination
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Material balance tracking 10,000 tons of end-of-life tires into primary recovered secondary raw materials (rCB, TPO, Devulc, Steel).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tire.closedLoopFlow.map((flow, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{flow.outputName}</span>
                  <span className="text-xs font-mono-code text-blue-700 font-bold">{flow.outputTons} tons/yr</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Re-used in New Tires (Tire-to-Tire):</span>
                    <strong className="text-emerald-700 font-mono-code font-bold">{flow.reusedInNewTiresPercent}%</strong>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${flow.reusedInNewTiresPercent}%` }}></div>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 pt-1">
                    <span>Downcycled (Asphalt/Pavements):</span>
                    <span className="text-slate-800 font-mono-code">{flow.downcycledPercent}%</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Energy Recovery / Waste:</span>
                    <span className="text-slate-500 font-mono-code">{flow.energyPercent}% / {flow.wastePercent}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'lifecycle' && (
        /* In-Service Telemetry and Maintenance History */
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Cryptographic In-Service & Maintenance Timeline
            </h3>
            <span className="status-tag tag-verified text-xs">
              RFID SERIAL: {tire.epcRfid}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {tire.lifecycleTimeline.map((evt) => (
              <div key={evt.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{evt.stage}</span>
                    <span className="status-tag tag-supplier text-xs">
                      {evt.actor}
                    </span>
                  </div>
                  <p className="text-slate-600">{evt.description}</p>
                  <span className="text-xs text-slate-500 block font-mono-code">{evt.location} • Verified by: <strong className="text-slate-900">{evt.verifiedBy}</strong></span>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono-code text-slate-500 block">{evt.date}</span>
                  <span className="text-xs font-mono-code text-emerald-700 font-bold mt-0.5 block">{evt.impactMetrics}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stage Navigation Footer to Next Phase: Audit & Compliance */}
      <StageNavigationFooter activeSection="circularity" onSelectSection={onSelectSection || (() => {})} />
    </div>
  );
};
