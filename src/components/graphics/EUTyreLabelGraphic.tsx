import React from 'react';
import { Volume2, Award, QrCode, ExternalLink, CheckCircle2, Snowflake } from 'lucide-react';

interface EUTyreLabelGraphicProps {
  onOpenProvenance?: () => void;
}

export const EUTyreLabelGraphic: React.FC<EUTyreLabelGraphicProps> = ({ onOpenProvenance }) => {
  return (
    <div className="bg-white border-2 border-slate-300 rounded-xl p-5 sm:p-6 shadow-sm max-w-[420px] mx-auto select-none">
      {/* European Commission Official Energy Banner */}
      <div className="bg-[#003399] text-white p-3 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* EU Flag Icon */}
          <div className="w-8 h-5 bg-[#003399] border border-yellow-400 flex items-center justify-center relative overflow-hidden rounded-xs">
            <span className="text-[9px] text-yellow-400 font-bold">★★★★</span>
          </div>
          <div>
            <span className="text-xs font-black tracking-widest text-white uppercase block">
              ENERGY
            </span>
            <span className="text-[9px] text-slate-200 block font-mono-code">
              EU REGULATION 2020/740
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono-code font-bold text-yellow-400 block">
            EPREL #1488204
          </span>
          <span className="text-[9px] text-slate-200 block">
            Official Homologation
          </span>
        </div>
      </div>

      {/* Tire Brand & Dimension Header */}
      <div className="bg-slate-50 border-x border-b border-slate-200 p-3 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-900 block uppercase tracking-wide">
            MICHELIN
          </span>
          <span className="text-sm font-extrabold text-blue-900 block font-tech">
            e·Primacy™ / Apex-GT
          </span>
          <span className="text-xs font-mono-code text-slate-600 block mt-0.5">
            205/55 R16 91V • EV Optimized
          </span>
        </div>

        <div className="w-14 h-14 bg-white border border-slate-300 rounded p-1 flex flex-col items-center justify-center shrink-0">
          <QrCode className="w-8 h-8 text-slate-800" />
          <span className="text-[7px] font-mono-code text-slate-500 mt-0.5">EPREL QR</span>
        </div>
      </div>

      {/* Main Dual Metric Scales: Fuel Efficiency (Rolling Resistance) & Wet Grip */}
      <div className="grid grid-cols-2 gap-3 p-4 bg-white border-x border-slate-200">
        {/* Metric 1: Rolling Resistance (Fuel Economy) */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 uppercase border-b border-slate-100 pb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Fuel / Rolling (RRC)</span>
          </div>

          <div className="space-y-1 text-xs font-bold font-mono-code">
            {/* Grade A - Highlighted with arrow */}
            <div className="flex items-center justify-between">
              <div className="w-16 bg-[#009640] text-white px-2 py-0.5 rounded-l text-center">
                A
              </div>
              <div className="flex items-center gap-1">
                <span className="text-black text-sm">◀</span>
                <span className="px-1.5 py-0.5 bg-black text-white rounded text-[10px] font-bold">
                  A
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-20 bg-[#50B848] text-white px-2 py-0.5 rounded-l text-center opacity-40">
                B
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-24 bg-[#FFED00] text-slate-900 px-2 py-0.5 rounded-l text-center opacity-40">
                C
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-28 bg-[#FBBA00] text-slate-900 px-2 py-0.5 rounded-l text-center opacity-40">
                D
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-32 bg-[#E30613] text-white px-2 py-0.5 rounded-l text-center opacity-40">
                E
              </div>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-slate-500 font-mono-code">
            RRC: <strong className="text-emerald-700">6.1 kg/tonne</strong> (Top Tier EV Efficiency)
          </div>
        </div>

        {/* Metric 2: Wet Grip (Braking Performance) */}
        <div className="space-y-1.5 border-l border-slate-200 pl-3">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 uppercase border-b border-slate-100 pb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span>Wet Braking Grip</span>
          </div>

          <div className="space-y-1 text-xs font-bold font-mono-code">
            {/* Grade A - Highlighted with arrow */}
            <div className="flex items-center justify-between">
              <div className="w-16 bg-[#0055A5] text-white px-2 py-0.5 rounded-l text-center">
                A
              </div>
              <div className="flex items-center gap-1">
                <span className="text-black text-sm">◀</span>
                <span className="px-1.5 py-0.5 bg-black text-white rounded text-[10px] font-bold">
                  A
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-20 bg-[#2980B9] text-white px-2 py-0.5 rounded-l text-center opacity-40">
                B
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-24 bg-[#5DADE2] text-slate-900 px-2 py-0.5 rounded-l text-center opacity-40">
                C
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-28 bg-[#85C1E9] text-slate-900 px-2 py-0.5 rounded-l text-center opacity-40">
                D
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-32 bg-[#AED6F1] text-slate-900 px-2 py-0.5 rounded-l text-center opacity-40">
                E
              </div>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-slate-500 font-mono-code">
            Index: <strong className="text-blue-700">1.58 G</strong> (Shorted stopping distance)
          </div>
        </div>
      </div>

      {/* Bottom Section: External Noise & Snow Grip Certification */}
      <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-b-lg items-center">
        {/* External Rolling Noise */}
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-white border border-slate-300 rounded text-slate-700">
            <Volume2 className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold font-mono-code text-slate-900">68</span>
              <span className="text-[10px] font-mono-code text-slate-500">dB</span>
              <span className="ml-1 px-1.5 py-0.2 bg-slate-900 text-white rounded text-[9px] font-bold">
                CLASS A
              </span>
            </div>
            <span className="text-[9px] text-slate-500 block">
              Ultra-Quiet EV Spec
            </span>
          </div>
        </div>

        {/* 3PMSF Snow Grip Certified */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="p-1.5 bg-blue-50 border border-blue-200 rounded text-blue-700">
            <Snowflake className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              3PMSF
            </span>
            <span className="text-[9px] text-slate-500 block">
              Severe Snow Certified
            </span>
          </div>
        </div>
      </div>

      {/* Verification Footer Link */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5" /> TÜV SÜD Type Approval E2-0219448
        </span>
        {onOpenProvenance && (
          <button
            onClick={onOpenProvenance}
            className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 text-[11px]"
          >
            Audit Trail <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
