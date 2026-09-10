import React from 'react';
import { Gauge, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface TreadDepthGaugeGraphicProps {
  currentDepthMm: number; // e.g. 6.8
  initialDepthMm?: number; // e.g. 7.0
  legalMinimumMm?: number; // 1.6
}

export const TreadDepthGaugeGraphic: React.FC<TreadDepthGaugeGraphicProps> = ({
  currentDepthMm = 6.8,
  initialDepthMm = 7.0,
  legalMinimumMm = 1.6
}) => {
  const percentageRemaining = Math.max(
    0,
    Math.min(100, Math.round(((currentDepthMm - legalMinimumMm) / (initialDepthMm - legalMinimumMm)) * 100))
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 border border-blue-200 rounded-md text-blue-700">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Tread Depth & Wear Health Indicator
            </h4>
            <span className="text-xs text-slate-500">
              Molded Groove Depth Sensor / Fleet Optical Measurement
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-baseline gap-1 justify-end">
            <span className="text-xl font-bold font-mono-code text-slate-900">
              {currentDepthMm.toFixed(1)}
            </span>
            <span className="text-xs font-mono-code text-slate-500">/ {initialDepthMm.toFixed(1)} mm</span>
          </div>
          <span className="text-[11px] font-mono-code font-bold text-emerald-700">
            {percentageRemaining}% Usable Life
          </span>
        </div>
      </div>

      {/* Visual Tread Ruler Gauge Graphic */}
      <div className="mt-4 space-y-2">
        {/* Progress Track with color zones */}
        <div className="relative h-6 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex">
          {/* Zone 1: Critical (0 to 1.6 mm) */}
          <div 
            style={{ width: `${(1.6 / 7.0) * 100}%` }}
            className="h-full bg-red-500/80 flex items-center justify-center text-[9px] font-bold text-white font-mono-code"
            title="Below 1.6 mm: Illegal in EU"
          >
            ILLEGAL
          </div>

          {/* Zone 2: Caution (1.6 to 3.0 mm) */}
          <div 
            style={{ width: `${((3.0 - 1.6) / 7.0) * 100}%` }}
            className="h-full bg-amber-400 flex items-center justify-center text-[9px] font-bold text-slate-900 font-mono-code"
            title="1.6 - 3.0 mm: Wet Aquaplaning Risk"
          >
            WARNING
          </div>

          {/* Zone 3: Good (3.0 to 5.0 mm) */}
          <div 
            style={{ width: `${((5.0 - 3.0) / 7.0) * 100}%` }}
            className="h-full bg-emerald-400 flex items-center justify-center text-[9px] font-bold text-emerald-950 font-mono-code"
            title="3.0 - 5.0 mm: Safe Usable Depth"
          >
            GOOD
          </div>

          {/* Zone 4: Optimal (5.0 to 7.0 mm) */}
          <div 
            style={{ width: `${((7.0 - 5.0) / 7.0) * 100}%` }}
            className="h-full bg-emerald-600 flex items-center justify-center text-[9px] font-bold text-white font-mono-code"
            title="5.0 - 7.0 mm: New / Nominal Condition"
          >
            OPTIMAL
          </div>

          {/* Current Depth Needle Marker */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-slate-900 shadow-md transition-all duration-500"
            style={{ left: `calc(${(currentDepthMm / initialDepthMm) * 100}% - 2px)` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-slate-900 rotate-45"></div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-slate-900 rotate-45"></div>
          </div>
        </div>

        {/* Ruler Ticks */}
        <div className="flex justify-between text-[10px] font-mono-code text-slate-500 px-0.5">
          <span>0.0 mm</span>
          <span className="text-red-700 font-bold">1.6 mm (Legal Min)</span>
          <span>3.0 mm</span>
          <span>5.0 mm</span>
          <span className="text-emerald-700 font-bold">7.0 mm (New)</span>
        </div>
      </div>

      {/* Status Interpretation Note */}
      <div className="mt-3 flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200">
        <span className="flex items-center gap-1.5 text-slate-700 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Nominal tread wear pattern. Uniform 6.8 mm across all 4 circumferential ribs.
        </span>
        <span className="font-mono-code font-bold text-slate-900">
          Est. Life: ~62,500 km
        </span>
      </div>
    </div>
  );
};
