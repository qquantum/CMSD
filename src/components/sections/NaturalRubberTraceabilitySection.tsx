import React, { useState } from 'react';
import { RubberSupplyChainTier, DataProvenance } from '../../types';
import { Trees, ShieldCheck, MapPin, CheckCircle2, AlertCircle, ArrowDown, Building2, Users, FileSearch, Satellite } from 'lucide-react';
import { StageNavigationFooter } from '../StageNavigationFooter';

interface NaturalRubberTraceabilitySectionProps {
  tiers: RubberSupplyChainTier[];
  onOpenProvenance: (prov: DataProvenance) => void;
  onSelectSection?: (section: any) => void;
}

export const NaturalRubberTraceabilitySection: React.FC<NaturalRubberTraceabilitySectionProps> = ({
  tiers,
  onOpenProvenance,
  onSelectSection,
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
            <span className="status-tag tag-verified text-xs">
              SECTION 04 • EUDR
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Natural Rubber Traceability (EUDR & GPSNR Forest-to-Factory)
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            End-to-end chain of custody from 1,420 smallholder Hevea agroforestry parcels to the Clermont tire vulcanization press.
          </p>
        </div>

        {/* EUDR Compliance Status */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono-code font-bold uppercase shadow-2xs">
          <Satellite className="w-4 h-4 text-emerald-700" />
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
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-500 shadow-xs ring-1 ring-blue-400/50'
                      : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-lg mt-0.5 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {tier.level === 4 ? <Trees className="w-5 h-5 text-emerald-500" /> : <Building2 className="w-5 h-5" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono-code font-bold text-blue-700">
                            TIER {tier.level}
                          </span>
                          <span className={`status-tag ${getCustodyBadge(tier.massBalanceOrPhysical)} text-[11px]`}>
                            {tier.massBalanceOrPhysical}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                          {tier.title}
                        </h4>
                        <p className="text-xs text-slate-600 font-medium">
                          {tier.entityName}
                        </p>
                        <span className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-mono-code">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {tier.location}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold font-mono-code text-emerald-700">
                        {tier.traceabilityConfidence}%
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono-code block">Confidence</span>
                    </div>
                  </div>
                </div>

                {idx < tiers.length - 1 && (
                  <div className="flex justify-center my-0.5">
                    <ArrowDown className="w-4 h-4 text-blue-400" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right: Selected Tier Deep-Dive Dossier */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-xs space-y-4">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-code text-blue-700 font-bold uppercase tracking-wider">
                  TIER {activeTier.level} CHAIN OF CUSTODY AUDIT
                </span>
                <span className={`status-tag ${getCustodyBadge(activeTier.massBalanceOrPhysical)} text-xs`}>
                  {activeTier.massBalanceOrPhysical}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {activeTier.title}
              </h3>
              <p className="text-sm font-semibold text-blue-800">
                {activeTier.entityName}
              </p>
            </div>

            {/* Role & Operations Description */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono-code">
                Operational Scope & Transformation
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">
                {activeTier.role}
              </p>
              <div className="pt-2.5 flex items-center justify-between text-xs text-slate-600 border-t border-slate-200">
                <span>Auditor: <strong className="text-slate-900">{activeTier.auditor}</strong></span>
                <span>GPSNR: <strong className="text-emerald-700 font-semibold">{activeTier.gpsnrCertified ? 'Certified Member' : 'Under Review'}</strong></span>
              </div>
            </div>

            {/* Smallholder Geolocation Polygon Intelligence */}
            {activeTier.smallholderCount && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5 font-mono-code">
                    <Satellite className="w-4 h-4 text-emerald-700" />
                    EUDR Satellite Deforestation Monitoring
                  </span>
                  <span className="text-xs font-mono-code text-emerald-800 font-bold">
                    {activeTier.smallholderCount} Geotagged Farms
                  </span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed mt-1">
                  Every smallholder parcel boundary is registered with GPS polygons. Sentinel-2 satellite optical imagery audits confirm 0.00% tree cover loss after the EUDR cut-off date of December 31, 2020.
                </p>
              </div>
            )}

            {/* Traceability Protocol & Verification Details */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-2 text-xs">
              <div className="flex items-start justify-between">
                <span className="text-slate-500">Forest Monitoring:</span>
                <span className="text-slate-900 font-mono-code text-right max-w-xs font-medium">{activeTier.forestMonitoringMethod}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">EUDR Regulation Status:</span>
                <span className="text-emerald-700 font-bold">{activeTier.eudrStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Deforestation Risk Level:</span>
                <span className="status-tag tag-green text-xs">
                  {activeTier.deforestationRisk} Risk
                </span>
              </div>
            </div>
          </div>

          {/* Provenance Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono-code">
              Traceability Index: {activeTier.traceabilityConfidence}%
            </span>
            <button
              onClick={() => onOpenProvenance(activeTier.provenance)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono-code font-bold uppercase transition-colors shadow-xs"
            >
              <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
              <span>SOURCE: {activeTier.provenance.sourceDoc}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stage Navigation Footer to Next Phase: Manufacturing & PCF */}
      <StageNavigationFooter activeSection="rubber" onSelectSection={onSelectSection || (() => {})} />
    </div>
  );
};
