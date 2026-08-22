import React, { useState } from 'react';
import { RubberSupplyChainTier, DataProvenance } from '../../types';
import { Trees, ShieldCheck, MapPin, CheckCircle2, AlertCircle, ArrowDown, Building2, Users, FileSearch, Satellite } from 'lucide-react';

interface NaturalRubberTraceabilitySectionProps {
  tiers: RubberSupplyChainTier[];
  onOpenProvenance: (prov: DataProvenance) => void;
}

export const NaturalRubberTraceabilitySection: React.FC<NaturalRubberTraceabilitySectionProps> = ({
  tiers,
  onOpenProvenance,
}) => {
  const [activeLevel, setActiveLevel] = useState<number>(4); // Default to farm/smallholder level

  const activeTier = tiers.find((t) => t.level === activeLevel) || tiers[0];

  const getCustodyBadge = (mode: string) => {
    switch (mode) {
      case 'Physical Segregation':
        return 'tag-green';
      case 'Identity Preserved':
        return 'tag-verified';
      case 'Mass Balance':
        return 'tag-verified';
      default:
        return 'tag-supplier';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-verified">
              SECTION 05
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-tech tracking-wide uppercase">
              Natural Rubber Traceability (EUDR & GPSNR Forest-to-Factory)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9299] mt-1.5">
            End-to-end chain of custody from 1,420 smallholder Hevea agroforestry parcels to the Clermont tire vulcanization press.
          </p>
        </div>

        {/* EUDR Compliance Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#151619] border border-[#00FF41]/40 text-[#00FF41] text-xs font-mono-code font-bold uppercase">
          <Satellite className="w-4 h-4 text-[#00FF41]" />
          <span>EUDR POLYGONS: 100% VERIFIED</span>
        </div>
      </div>

      {/* Main Chain of Custody Visual Flow (Tier 1 -> Tier 2 -> Tier 3 -> Tier 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive 4-Tier Waterfall Flow */}
        <div className="lg:col-span-6 space-y-3">
          {tiers.map((tier, idx) => {
            const isSelected = tier.level === activeTier.level;
            return (
              <React.Fragment key={tier.level}>
                <div
                  id={`rubber-tier-card-${tier.level}`}
                  onClick={() => setActiveLevel(tier.level)}
                  className={`p-4 rounded border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1A1C1F] border-[#00F5FF] shadow-lg shadow-[#00F5FF]/5'
                      : 'bg-[#151619] border-[#2D2F33] hover:bg-[#1A1C1F] hover:border-[#3D4046]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded mt-0.5 ${isSelected ? 'bg-[#00F5FF]/15 text-[#00F5FF]' : 'bg-[#0B0C0E] text-[#8E9299]'}`}>
                        {tier.level === 4 ? <Trees className="w-5 h-5 text-[#00FF41]" /> : <Building2 className="w-5 h-5" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono-code font-bold text-[#00F5FF]">
                            TIER {tier.level}
                          </span>
                          <span className={`status-tag ${getCustodyBadge(tier.massBalanceOrPhysical)}`}>
                            {tier.massBalanceOrPhysical}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#FFFFFF] font-tech mt-0.5">
                          {tier.title}
                        </h4>
                        <p className="text-xs text-[#8E9299] font-medium">
                          {tier.entityName}
                        </p>
                        <span className="text-[11px] text-[#8E9299] flex items-center gap-1 mt-1 font-mono-code">
                          <MapPin className="w-3 h-3 text-[#00FF41]" /> {tier.location}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold font-mono-code text-[#00FF41]">
                        {tier.traceabilityConfidence}%
                      </span>
                      <span className="text-[10px] text-[#8E9299] font-mono-code block">Confidence</span>
                    </div>
                  </div>
                </div>

                {idx < tiers.length - 1 && (
                  <div className="flex justify-center my-0.5">
                    <ArrowDown className="w-4 h-4 text-[#00F5FF]/40" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right: Selected Tier Deep-Dive Dossier */}
        <div className="lg:col-span-6 bg-[#151619] border border-[#2D2F33] rounded-lg p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-code text-[#00F5FF] font-bold uppercase tracking-wider">
                  TIER {activeTier.level} CHAIN OF CUSTODY AUDIT
                </span>
                <span className={`status-tag ${getCustodyBadge(activeTier.massBalanceOrPhysical)}`}>
                  {activeTier.massBalanceOrPhysical}
                </span>
              </div>
              <h3 className="text-xl font-bold font-tech text-[#FFFFFF] mt-1">
                {activeTier.title}
              </h3>
              <p className="text-sm font-semibold text-[#00F5FF]">
                {activeTier.entityName}
              </p>
            </div>

            {/* Role & Operations Description */}
            <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3.5 rounded space-y-1">
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block font-mono-code">
                Operational Scope & Transformation
              </span>
              <p className="text-xs text-[#FFFFFF] leading-relaxed">
                {activeTier.role}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-[#8E9299] border-t border-[#2D2F33]">
                <span>Auditor: <strong className="text-[#FFFFFF]">{activeTier.auditor}</strong></span>
                <span>GPSNR: <strong className="text-[#00FF41]">{activeTier.gpsnrCertified ? 'Certified Member' : 'Under Review'}</strong></span>
              </div>
            </div>

            {/* Smallholder Geolocation Polygon Intelligence (Specifically when Tier 4 or 3 is selected) */}
            {activeTier.smallholderCount && (
              <div className="bg-[#0B0C0E] border border-[#00FF41]/30 p-3.5 rounded space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#00FF41] uppercase tracking-wider flex items-center gap-1.5 font-mono-code">
                    <Satellite className="w-4 h-4 text-[#00FF41]" />
                    EUDR Satellite Deforestation Monitoring
                  </span>
                  <span className="text-xs font-mono-code text-[#00FF41] font-bold">
                    {activeTier.smallholderCount} Geotagged Farms
                  </span>
                </div>
                <p className="text-xs text-[#8E9299] leading-relaxed">
                  Every smallholder parcel boundary is registered with GPS polygons. Sentinel-2 satellite optical imagery audits confirm 0.00% tree cover loss after the EUDR cut-off date of December 31, 2020.
                </p>
              </div>
            )}

            {/* Traceability Protocol & Verification Details */}
            <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3.5 rounded space-y-1.5 text-xs">
              <div className="flex items-start justify-between">
                <span className="text-[#8E9299]">Forest Monitoring:</span>
                <span className="text-[#FFFFFF] font-mono-code text-right max-w-xs">{activeTier.forestMonitoringMethod}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8E9299]">EUDR Regulation Status:</span>
                <span className="text-[#00FF41] font-bold">{activeTier.eudrStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8E9299]">Deforestation Risk Level:</span>
                <span className="status-tag tag-green">
                  {activeTier.deforestationRisk} Risk
                </span>
              </div>
            </div>
          </div>

          {/* Provenance Footer */}
          <div className="mt-5 pt-3 border-t border-[#2D2F33] flex items-center justify-between">
            <span className="text-xs text-[#8E9299] font-mono-code text-[11px]">
              Traceability Index: {activeTier.traceabilityConfidence}%
            </span>
            <button
              onClick={() => onOpenProvenance(activeTier.provenance)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B0C0E] hover:bg-[#1A1C1F] border border-[#2D2F33] text-[#00F5FF] text-xs font-mono-code font-bold uppercase transition-colors"
            >
              <FileSearch className="w-3.5 h-3.5" />
              [SOURCE: {activeTier.provenance.sourceDoc}]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
