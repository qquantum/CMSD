import React from 'react';
import { X, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Scale, Leaf, Flame, Zap } from 'lucide-react';
import { TirePassportData } from '../types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTire: TirePassportData;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  currentTire,
}) => {
  if (!isOpen) return null;

  const comparisonRows = [
    {
      metric: 'Recycled & Bio-Renewable Content',
      current: `${(currentTire.recycledContentPercent + currentTire.renewableContentPercent).toFixed(1)}%`,
      baseline: '14.5%',
      delta: '+36.0% Circular Materials',
      winner: 'current',
    },
    {
      metric: 'Cradle-to-Gate Carbon (PCF)',
      current: `${currentTire.carbonLCA.totalCradleToGateKgCO2e} kg CO₂e`,
      baseline: '38.9 kg CO₂e',
      delta: '-39.8% Embodied Carbon',
      winner: 'current',
    },
    {
      metric: 'Rolling Resistance (Fuel / EV Range)',
      current: `${currentTire.performance.rollingResistanceCoefficient} kg/t (Class A)`,
      baseline: '8.8 kg/t (Class C)',
      delta: '-30.7% Less Drag (+7% EV Range)',
      winner: 'current',
    },
    {
      metric: 'EUDR Deforestation Traceability',
      current: '100% Geotagged (0% Deforest)',
      baseline: '35% (Non-segregated)',
      delta: 'Full GPS Farm-Level Compliance',
      winner: 'current',
    },
    {
      metric: 'Retreading Casing Rating',
      current: 'Grade A+ (2 Retread Cycles)',
      baseline: 'Grade C (Single-Use Only)',
      delta: '130,000 km Extended Lifespan',
      winner: 'current',
    },
    {
      metric: 'External Rolling Noise',
      current: '68 dB (Class A)',
      baseline: '72 dB (Class B)',
      delta: '-4 dB Acoustic Noise Reduction',
      winner: 'current',
    },
    {
      metric: 'Hazardous Chemical Additives (SVHC)',
      current: '0.00% SVHC (Bio-Resins)',
      baseline: 'Legacy Aromatic Processing Oils',
      delta: 'REACH Annex XVII Exceeded',
      winner: 'current',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0C0E]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#151619] border border-[#2D2F33] rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#2D2F33] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#0B0C0E] border border-[#2D2F33] text-[#00F5FF]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code text-[#00F5FF] font-bold uppercase tracking-wider">
                  Benchmark Analysis
                </span>
                <span className="status-tag tag-verified">
                  ISO 14044 Dual LCA
                </span>
              </div>
              <h3 className="text-lg font-bold font-tech text-[#FFFFFF] uppercase mt-0.5">
                AeroCrest E-Performance X1 vs. 2020 Industry Baseline Tire
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#8E9299] hover:text-[#FFFFFF] hover:bg-[#0B0C0E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Comparison Table */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-12 gap-2 text-xs font-bold font-mono-code text-[#8E9299] uppercase tracking-wider pb-2 border-b border-[#2D2F33]">
            <div className="col-span-5">Performance & Sustainability Dimension</div>
            <div className="col-span-3 text-[#00F5FF]">E-Performance X1 (DPP Active)</div>
            <div className="col-span-4 text-[#8E9299]">Conventional Baseline Tire (2020)</div>
          </div>

          <div className="space-y-2">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-2 p-3 bg-[#0B0C0E] rounded border border-[#2D2F33] items-center text-xs"
              >
                <div className="col-span-5 font-medium text-[#FFFFFF] font-mono-code">
                  {row.metric}
                </div>

                <div className="col-span-3 font-mono-code font-bold text-[#00F5FF] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF41] shrink-0" />
                  <span>{row.current}</span>
                </div>

                <div className="col-span-4 font-mono-code text-[#8E9299] flex flex-col justify-center">
                  <span className="text-[#FFFFFF]">{row.baseline}</span>
                  <span className="text-[10px] text-[#00FF41] font-bold mt-0.5">{row.delta}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Environmental Net Impact Summary */}
          <div className="p-4 rounded bg-[#0B0C0E] border border-[#00F5FF]/30 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-[#FFFFFF] block font-mono-code uppercase">Fleet Level Net Sustainability Savings</span>
              <span className="text-[#8E9299]">Across a 4-tire passenger set over 65,000 km</span>
            </div>
            <div className="text-right font-mono-code">
              <span className="text-base font-bold text-[#00FF41] block">-142 kg CO₂e Total Savings</span>
              <span className="text-[10px] text-[#8E9299]">+280 kWh EV electricity conserved</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0B0C0E] border-t border-[#2D2F33] flex items-center justify-between text-xs">
          <span className="text-[#8E9299] font-mono-code">Model: 205/55 R16 94V XL</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#00F5FF] hover:bg-[#00F5FF]/80 text-[#0B0C0E] font-bold font-mono-code uppercase text-xs transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
