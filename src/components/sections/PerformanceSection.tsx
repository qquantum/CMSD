import React from 'react';
import { ProductPerformance, DataProvenance } from '../../types';
import { Gauge, Volume2, Droplets, Zap, ShieldCheck, FileSearch, Sparkles, CheckCircle2, Car, Compass } from 'lucide-react';

interface PerformanceSectionProps {
  performance: ProductPerformance;
  onOpenProvenance: (prov: DataProvenance) => void;
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({
  performance,
  onOpenProvenance,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-verified">
              SECTION 09
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-tech tracking-wide uppercase">
              Product Performance & Official EU Tyre Label
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9299] mt-1.5">
            Regulation (EU) 2020/740 Homologation metrics, EV battery efficiency dynamics, and acoustic damping.
          </p>
        </div>

        <button
          onClick={() => onOpenProvenance(performance.provenance)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#151619] hover:bg-[#1A1C1F] border border-[#2D2F33] text-[#00F5FF] text-xs font-mono-code font-bold uppercase self-start md:self-auto transition-colors"
        >
          <FileSearch className="w-3.5 h-3.5" />
          [SOURCE: EPREL REG #1488204]
        </button>
      </div>

      {/* Main Grid: EU Label Interactive Replica + EV Dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Official EU Tyre Label Interactive Replica */}
        <div className="lg:col-span-5 bg-[#151619] border border-[#2D2F33] rounded-lg p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D2F33] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[#00F5FF]/20 border border-[#00F5FF]/40 flex items-center justify-center text-[9px] text-[#00F5FF] font-bold font-mono-code">
                  EU
                </div>
                <span className="text-xs font-bold font-tech text-[#FFFFFF] tracking-wider uppercase">
                  EU TYRE LABEL 2020/740
                </span>
              </div>
              <span className="status-tag tag-green">CLASS A / CLASS A</span>
            </div>

            {/* 1. Rolling Resistance Rating */}
            <div className="bg-[#0B0C0E] p-4 rounded border border-[#2D2F33] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#8E9299] flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#00FF41]" /> Fuel & Energy Efficiency
                </span>
                <span className="text-base font-extrabold font-mono-code text-[#00FF41]">CLASS A</span>
              </div>

              {/* Tier Bars */}
              <div className="space-y-1 pt-1">
                {['A', 'B', 'C', 'D', 'E'].map((tier) => (
                  <div key={tier} className="flex items-center gap-2 text-[10px] font-mono-code">
                    <span className="w-4 text-[#8E9299]">{tier}</span>
                    <div
                      className={`h-3 rounded flex-1 transition-all ${
                        tier === 'A'
                          ? 'bg-[#00FF41] font-bold text-[#0B0C0E] px-2 flex items-center justify-between'
                          : tier === 'B' ? 'bg-[#00FF41]/20' : tier === 'C' ? 'bg-[#2D2F33]' : tier === 'D' ? 'bg-[#2D2F33]/60' : 'bg-[#2D2F33]/30'
                      }`}
                    >
                      {tier === 'A' && <span className="text-[9px] font-mono-code">6.1 kg/tonne (Ultra Low)</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Wet Grip Braking Rating */}
            <div className="bg-[#0B0C0E] p-4 rounded border border-[#2D2F33] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#8E9299] flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-[#00F5FF]" /> Wet Grip Safety Rating
                </span>
                <span className="text-base font-extrabold font-mono-code text-[#00F5FF]">CLASS A</span>
              </div>

              <div className="space-y-1 pt-1">
                {['A', 'B', 'C', 'D', 'E'].map((tier) => (
                  <div key={tier} className="flex items-center gap-2 text-[10px] font-mono-code">
                    <span className="w-4 text-[#8E9299]">{tier}</span>
                    <div
                      className={`h-3 rounded flex-1 ${
                        tier === 'A'
                          ? 'bg-[#00F5FF] font-bold text-[#0B0C0E] px-2 flex items-center justify-between'
                          : 'bg-[#0B0C0E] border border-[#2D2F33]'
                      }`}
                    >
                      {tier === 'A' && <span className="text-[9px] font-mono-code">Index 1.58 (Short Wet Stop)</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. External Noise Rating */}
            <div className="bg-[#0B0C0E] p-4 rounded border border-[#2D2F33] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-[#00F5FF]" />
                <div>
                  <span className="text-xs font-bold text-[#FFFFFF] block font-mono-code uppercase">External Rolling Noise</span>
                  <span className="text-[10px] text-[#8E9299] font-mono-code">Class A (Quiet Vehicle Category)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold font-mono-code text-[#00F5FF]">68 dB</span>
                <span className="text-[10px] text-[#8E9299] block font-mono-code">3 Soundwaves</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#2D2F33] text-[10px] font-mono-code text-[#8E9299] flex items-center justify-between uppercase">
            <span>ECE-R117 Drum Tested</span>
            <span>TÜV SÜD Certified</span>
          </div>
        </div>

        {/* Right: Electric Vehicle (EV) Performance & Engineering Telemetry */}
        <div className="lg:col-span-7 space-y-4">
          {/* EV Ready Feature Card */}
          <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded bg-[#0B0C0E] text-[#00F5FF] border border-[#2D2F33]">
                  <Car className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold font-tech text-[#FFFFFF] uppercase">
                    EV-Optimized Engineering Dynamics
                  </h3>
                  <span className="text-xs text-[#8E9299]">Tailored for Instant Electric Torque & Heavy Battery Curb Weights</span>
                </div>
              </div>
              <span className="status-tag tag-verified">
                EV READY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {performance.evFeatures.map((feat, i) => (
                <div key={i} className="p-3 bg-[#0B0C0E] rounded border border-[#2D2F33] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#00F5FF] font-mono-code">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF41] shrink-0" />
                    <span>FEATURE 0{i + 1}</span>
                  </div>
                  <p className="text-xs text-[#8E9299]">{feat}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mechanical Specs & Mileage Matrix */}
          <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold font-tech text-[#FFFFFF] uppercase">
              Mechanical Specifications & Proving Ground Assays
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-[#0B0C0E] p-3 rounded border border-[#2D2F33]">
                <span className="text-[#8E9299] block font-mono-code uppercase text-[10px]">Load Index</span>
                <span className="text-base font-bold font-mono-code text-[#FFFFFF] mt-0.5 block">{performance.loadIndex}</span>
              </div>

              <div className="bg-[#0B0C0E] p-3 rounded border border-[#2D2F33]">
                <span className="text-[#8E9299] block font-mono-code uppercase text-[10px]">Speed Rating</span>
                <span className="text-base font-bold font-mono-code text-[#FFFFFF] mt-0.5 block">{performance.speedRating}</span>
              </div>

              <div className="bg-[#0B0C0E] p-3 rounded border border-[#2D2F33]">
                <span className="text-[#8E9299] block font-mono-code uppercase text-[10px]">Expected Mileage</span>
                <span className="text-base font-bold font-mono-code text-[#00FF41] mt-0.5 block">{performance.expectedMileageKm.toLocaleString()} km</span>
              </div>

              <div className="bg-[#0B0C0E] p-3 rounded border border-[#2D2F33]">
                <span className="text-[#8E9299] block font-mono-code uppercase text-[10px]">Cold Pressure</span>
                <span className="text-base font-bold font-mono-code text-[#FFFFFF] mt-0.5 block">{performance.recommendedPressureBar} bar (36 psi)</span>
              </div>
            </div>

            {/* Vehicle Homologations */}
            <div>
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block mb-1.5 font-mono-code">
                Certified OEM Vehicle Platform Fitments
              </span>
              <div className="flex flex-wrap gap-1.5">
                {performance.vehicleFitment.map((veh, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded bg-[#0B0C0E] border border-[#2D2F33] text-[#8E9299] font-mono-code">
                    {veh}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
