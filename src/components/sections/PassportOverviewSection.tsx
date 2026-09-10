import React from 'react';
import { TirePassportData, UserRole, DataProvenance } from '../../types';
import { 
  ShieldCheck, 
  Award, 
  Leaf, 
  Scale, 
  Flame, 
  Calendar, 
  MapPin, 
  QrCode, 
  CheckCircle2, 
  ExternalLink, 
  Info,
  Compass,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Building2,
  Lock,
  FileBadge2,
  Sparkles,
  Gauge
} from 'lucide-react';
import { TireAnatomyGraphic } from '../graphics/TireAnatomyGraphic';
import { EUTyreLabelGraphic } from '../graphics/EUTyreLabelGraphic';
import { CircularityLifecycleGraphic } from '../graphics/CircularityLifecycleGraphic';
import { TreadDepthGaugeGraphic } from '../graphics/TreadDepthGaugeGraphic';
import { W3CComplianceStampGraphic } from '../graphics/W3CComplianceStampGraphic';
import { StageNavigationFooter } from '../StageNavigationFooter';

interface PassportOverviewProps {
  tire: TirePassportData;
  role: UserRole;
  onOpenProvenance: (prov: DataProvenance) => void;
  onOpenTraceTour: () => void;
  onSelectSection: (section: any) => void;
}

export const PassportOverviewSection: React.FC<PassportOverviewProps> = ({
  tire,
  role,
  onOpenProvenance,
  onOpenTraceTour,
  onSelectSection,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Official Cryptographic W3C Compliance Stamp Graphic */}
      <W3CComplianceStampGraphic
        passportId={tire.passportId}
        gtin={tire.gtin}
        manufacturer={tire.manufacturer}
        onVerifyHash={() => onOpenProvenance(tire.performance.provenance)}
      />

      {/* Role Banner / Context Adaptor */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="status-tag tag-verified text-xs">
                VIEWING AS {role.toUpperCase()}
              </span>
              <span className="status-tag tag-supplier text-xs">
                ROLE PERSPECTIVE
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              {role === 'consumer' && 'Simplified transparency summary: sustainable materials, safety, EV range boost, and free end-of-life recycling dropoff.'}
              {role === 'manufacturer' && 'Complete industrial telemetry: Scope 1-3 carbon, BOM composition, plant energy sub-metering, and supplier risk indices.'}
              {role === 'supplier' && 'Material batch lot traceability, ISCC PLUS mass-balance ledger, and Tier-2 audit certifications.'}
              {role === 'recycler' && 'Casing retreadability criteria, pyrolysis yields (rCB, TPO, Steel), and devulcanization feedstock specs.'}
              {role === 'regulator' && 'EU ESPR conformity, EUDR GPS polygon audit trails, EPREL verification, and REACH chemical declarations.'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenTraceTour}
          className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-mono-code uppercase tracking-wider transition-all shadow-xs"
        >
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>Interactive Story</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Digital Identity Hero Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Product & Passport Identity */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="status-tag tag-verified text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                  PASSPORT ID: {tire.passportId}
                </span>
                <span className="status-tag tag-supplier text-xs">
                  GTIN: {tire.gtin}
                </span>
                <span className="status-tag tag-green text-xs">
                  EU ESPR COMPLIANT
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {tire.productName}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-900 font-semibold">
                  <Building2 className="w-4 h-4 text-blue-700" /> {tire.manufacturer}
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-mono-code text-blue-700 font-bold text-xs bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {tire.tireSize}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {tire.manufacturingPlant}
                </span>
              </div>
            </div>

            {/* Quick Specs Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                <span className="text-[11px] text-slate-500 uppercase font-mono-code block font-semibold">Total Mass</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold font-mono-code text-slate-900">{tire.totalWeightKg}</span>
                  <span className="text-xs text-slate-500 font-medium">kg</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-mono-code font-semibold block mt-0.5">EV Spec Aero</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                <span className="text-[11px] text-slate-500 uppercase font-mono-code block font-semibold">Circular Content</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold font-mono-code text-blue-700">
                    {(tire.recycledContentPercent + tire.renewableContentPercent).toFixed(1)}%
                  </span>
                </div>
                <span className="text-[11px] text-slate-600 font-mono-code block mt-0.5">28.4% Rec. + 22.1% Bio</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                <span className="text-[11px] text-slate-500 uppercase font-mono-code block font-semibold">PCF Cradle-to-Gate</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold font-mono-code text-slate-900">
                    {tire.carbonLCA.totalCradleToGateKgCO2e}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">kg CO₂e</span>
                </div>
                <span className="text-[11px] text-slate-600 font-mono-code block mt-0.5">ISO 14067 Scope</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                <span className="text-[11px] text-slate-500 uppercase font-mono-code block font-semibold">EU Tyre Label</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold font-mono-code text-emerald-700">A / A</span>
                  <span className="text-xs font-mono-code text-slate-500 font-bold">68 dB</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-mono-code font-semibold block mt-0.5">Top Wet Grip & Eff.</span>
              </div>
            </div>

            {/* Verifiable Provenance Pill & Source Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs text-slate-600">
                  Last verified on <strong className="text-slate-900">{tire.lastUpdated}</strong> by Bureau Veritas & UTAC
                </span>
              </div>

              <button
                onClick={() => onOpenProvenance(tire.performance.provenance)}
                className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900 font-mono-code font-semibold transition-colors"
              >
                [VERIFY: ECE-R117 Approval #E2-0219448]
              </button>
            </div>
          </div>

          {/* Right: Quick EU Energy Label Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <EUTyreLabelGraphic onOpenProvenance={() => onOpenProvenance(tire.performance.provenance)} />
          </div>
        </div>
      </div>

      {/* Graphic 1: Tire Anatomy Vector Cross Section */}
      <TireAnatomyGraphic />

      {/* Graphic 2: Complete Circular Lifecycle Pathway */}
      <CircularityLifecycleGraphic onSelectStage={(stageId) => {
        if (stageId === 'sourcing') onSelectSection('materials');
        else if (stageId === 'manufacturing') onSelectSection('manufacturing');
        else if (stageId === 'telemetry') onSelectSection('lifecycle');
        else if (stageId === 'retreading' || stageId === 'pyrolysis') onSelectSection('circularity');
      }} />

      {/* Graphic 3: Tread Depth & Wear Health Indicator */}
      <TreadDepthGaugeGraphic currentDepthMm={6.8} initialDepthMm={7.0} legalMinimumMm={1.6} />

      {/* 4 Core Pillars Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Passport Integrity Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="status-tag tag-verified text-xs">
              SCORE: 92.5/100
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900">Traceability Confidence</h3>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Covers 100% of Tier-1 and Tier-2 suppliers with satellite GPS polygon verification.
          </p>
          <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
            <span className="text-slate-500 font-mono-code text-xs">EUDR: 100% Valid</span>
            <button onClick={() => onSelectSection('rubber')} className="text-blue-700 font-mono-code font-bold hover:underline">
              Audit →
            </button>
          </div>
        </div>

        {/* 2. Circular Economy Ratio */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-emerald-300 transition-colors shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="status-tag tag-green text-xs">
              50.5% CIRCULAR
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900">Sustainable Feedstocks</h3>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            28.4% post-consumer recycled steel/rCB + 22.1% bio-silica & bio-rubber polymers.
          </p>
          <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
            <span className="text-slate-500 font-mono-code text-xs">Virgin: 49.5%</span>
            <button onClick={() => onSelectSection('circularity')} className="text-emerald-700 font-mono-code font-bold hover:underline">
              10R Wheel →
            </button>
          </div>
        </div>

        {/* 3. Product Carbon Footprint (PCF) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Flame className="w-5 h-5" />
            </div>
            <span className="status-tag tag-verified text-xs">
              20.3 KG CO₂E
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900">Cradle-to-Gate Carbon</h3>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Scope 1 & 2 plant emissions are 2.5 kg CO₂e thanks to 85% renewable electricity.
          </p>
          <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
            <span className="text-slate-500 font-mono-code text-xs">ISO 14067 Scope</span>
            <button onClick={() => onSelectSection('carbon')} className="text-blue-700 font-mono-code font-bold hover:underline">
              LCA Sankey →
            </button>
          </div>
        </div>

        {/* 4. Second Life & Retreadability */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-slate-50 text-slate-700 border border-slate-200">
              <RotateCcw className="w-5 h-5" />
            </div>
            <span className="status-tag tag-supplier text-xs">
              +45,000 KM
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900">Retread Second Life</h3>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            High-strength casing engineered for 1-2 cold retread cycles, saving 70% raw materials.
          </p>
          <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
            <span className="text-slate-500 font-mono-code text-xs">ECE-R108 Ready</span>
            <button onClick={() => onSelectSection('end-of-life')} className="text-blue-700 font-mono-code font-bold hover:underline">
              ELT Tree →
            </button>
          </div>
        </div>
      </div>

      {/* Stage Navigation Footer to Next Phase: 3D Twin & Anatomy */}
      <StageNavigationFooter activeSection="passport" onSelectSection={onSelectSection} />
    </div>
  );
};
