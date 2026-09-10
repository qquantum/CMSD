import React from 'react';
import { ProductPerformance, DataProvenance } from '../../types';
import { Gauge, Volume2, Droplets, Zap, ShieldCheck, FileSearch, Sparkles, CheckCircle2, Car, Compass } from 'lucide-react';
import { EUTyreLabelGraphic } from '../graphics/EUTyreLabelGraphic';
import { StageNavigationFooter } from '../StageNavigationFooter';

interface PerformanceSectionProps {
  performance: ProductPerformance;
  onOpenProvenance: (prov: DataProvenance) => void;
  onSelectSection?: (section: any) => void;
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({
  performance,
  onOpenProvenance,
  onSelectSection,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-verified text-xs">
              SECTION 06 • HOMOLOGATION
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Product Performance & Official EU Tyre Label
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Regulation (EU) 2020/740 Homologation metrics, EV battery efficiency dynamics, and acoustic damping.
          </p>
        </div>

        <button
          onClick={() => onOpenProvenance(performance.provenance)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono-code font-bold uppercase self-start md:self-auto transition-colors shadow-xs"
        >
          <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
          <span>EPREL REG #1488204</span>
        </button>
      </div>

      {/* Main Grid: EU Label Interactive Replica + EV Dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Official EU Tyre Label Interactive Replica */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-xs space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-100 border border-blue-200 flex items-center justify-center text-[10px] text-blue-800 font-bold font-mono-code">
                  EU
                </div>
                <span className="text-xs font-bold text-slate-900 tracking-wider uppercase">
                  EU TYRE LABEL 2020/740
                </span>
              </div>
              <span className="status-tag tag-green text-xs font-bold">CLASS A / CLASS A</span>
            </div>

            {/* Embedded Visual EU Tyre Label SVG graphic */}
            <div className="flex justify-center p-2 bg-slate-50 rounded-xl border border-slate-200">
              <EUTyreLabelGraphic rollingResistance="A" wetGrip="A" noiseDb={68} noiseClass="A" />
            </div>

            {/* 3. External Noise Rating Details */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-200 text-blue-700">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block uppercase">External Rolling Noise</span>
                  <span className="text-xs text-slate-500 font-mono-code">Class A (Ultra-Quiet EV Standard)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold font-mono-code text-blue-700">68 dB</span>
                <span className="text-xs text-slate-500 block font-mono-code">1 Soundwave</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs font-mono-code text-slate-500 flex items-center justify-between uppercase">
            <span>ECE-R117 Drum Tested</span>
            <span className="text-emerald-700 font-bold">TÜV SÜD Certified</span>
          </div>
        </div>

        {/* Right: Electric Vehicle (EV) Performance & Engineering Telemetry */}
        <div className="lg:col-span-7 space-y-4">
          {/* EV Ready Feature Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                  <Car className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    EV-Optimized Engineering Dynamics
                  </h3>
                  <span className="text-xs text-slate-500">Tailored for Instant Electric Torque & Heavy Battery Curb Weights</span>
                </div>
              </div>
              <span className="status-tag tag-verified text-xs">
                EV READY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {performance.evFeatures.map((feat, i) => (
                <div key={i} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 font-mono-code">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>FEATURE 0{i + 1}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mechanical Specs & Mileage Matrix */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Mechanical Specifications & Proving Ground Assays
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block font-mono-code uppercase text-[10px] font-semibold">Load Index</span>
                <span className="text-lg font-bold font-mono-code text-slate-900 mt-0.5 block">{performance.loadIndex}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block font-mono-code uppercase text-[10px] font-semibold">Speed Rating</span>
                <span className="text-lg font-bold font-mono-code text-slate-900 mt-0.5 block">{performance.speedRating}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block font-mono-code uppercase text-[10px] font-semibold">Expected Mileage</span>
                <span className="text-lg font-bold font-mono-code text-emerald-700 mt-0.5 block">{performance.expectedMileageKm.toLocaleString()} km</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block font-mono-code uppercase text-[10px] font-semibold">Cold Pressure</span>
                <span className="text-lg font-bold font-mono-code text-slate-900 mt-0.5 block">{performance.recommendedPressureBar} bar</span>
              </div>
            </div>

            {/* Vehicle Homologations */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 font-mono-code">
                Certified OEM Vehicle Platform Fitments
              </span>
              <div className="flex flex-wrap gap-2">
                {performance.vehicleFitment.map((veh, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-mono-code font-semibold">
                    {veh}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Navigation Footer to Next Phase: Fleet IoT & In-Service Life */}
      <StageNavigationFooter activeSection="performance" onSelectSection={onSelectSection || (() => {})} />
    </div>
  );
};
