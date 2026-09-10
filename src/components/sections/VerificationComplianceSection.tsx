import React, { useState } from 'react';
import { ComplianceStandard, TraceabilityScores, DataProvenance } from '../../types';
import { ShieldCheck, FileCheck, CheckCircle2, Award, Download, FileSearch, Lock, Database, FileText, ExternalLink, Sparkles, Activity } from 'lucide-react';
import { W3CComplianceStampGraphic } from '../graphics/W3CComplianceStampGraphic';
import { StageNavigationFooter } from '../StageNavigationFooter';

interface VerificationComplianceSectionProps {
  complianceList: ComplianceStandard[];
  scores: TraceabilityScores;
  onOpenProvenance: (prov: DataProvenance) => void;
  onExportAuditReport: () => void;
  onSelectSection?: (section: any) => void;
}

export const VerificationComplianceSection: React.FC<VerificationComplianceSectionProps> = ({
  complianceList,
  scores,
  onOpenProvenance,
  onExportAuditReport,
  onSelectSection,
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(complianceList[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'EU ESPR & DPP', 'Deforestation (EUDR)', 'Emissions (GHG / ISO)', 'EPR & ELT', 'Material Safety (REACH)'];

  const filteredList = complianceList.filter((c) => selectedCategory === 'All' || c.category === selectedCategory);
  const activeStandard = complianceList.find((c) => c.id === selectedStandardId) || filteredList[0] || complianceList[0];

  const trustBadges = [
    { title: 'EU DPP ESPR Compliant', standard: 'Regulation (EU) 2024/1781', auditor: 'DEKRA Audits' },
    { title: '100% Deforestation Free', standard: 'EUDR 2023/1115 Cut-off 2020', auditor: 'Earthworm Foundation' },
    { title: 'ISO 14067 LCA Certified', standard: 'ISO 14040/14044/14067', auditor: 'Bureau Veritas' },
    { title: 'Mass Balance & ISCC Plus', standard: 'ISCC+ Certificate 2026', auditor: 'DNV Business Assurance' },
    { title: 'SVHC Free & REACH Verified', standard: 'Regulation (EC) 1907/2006', auditor: 'SGS Hong Kong / Paris' },
    { title: 'Zero Landfill Manufacturing', standard: 'UL 2799 Platinum Tier', auditor: 'UL Solutions' },
  ];

  const cryptographicLedger = [
    {
      action: 'Initial Passport Minting & Merkle Root Anchored',
      actor: 'Michelin Certification Node #1',
      role: 'Manufacturer',
      timestamp: '2026-03-14T08:30:00Z',
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      verificationStatus: 'VALIDATED ON GAIA-X TRUST LEDGER',
    },
    {
      action: 'EUDR Satellite Forest Polygon Batch Audit Attached',
      actor: 'Earthworm / Satelligence Node',
      role: 'Third-Party Auditor',
      timestamp: '2026-03-15T10:14:22Z',
      sha256Hash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      verificationStatus: 'POLYGONS COPIED TO EU TRACES HUB',
    },
    {
      action: 'ISO 14067 Product Carbon Footprint LCA Attestation Signed',
      actor: 'Bureau Veritas LCA Certification Team',
      role: 'Auditor',
      timestamp: '2026-03-16T14:45:09Z',
      sha256Hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
      verificationStatus: 'SIGNATURE RECOGNIZED BY EBSI',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-verified text-xs">
              SECTION 09 • COMPLIANCE
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Regulatory Compliance & Cryptographic Trust Audit
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Official conformity assessments for ESPR, EUDR, EPREL, REACH, and CSDDD with third-party auditor signatures.
          </p>
        </div>

        <button
          onClick={onExportAuditReport}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-mono-code font-bold self-start md:self-auto transition-colors uppercase shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Export Regulatory Dossier (.JSON)</span>
        </button>
      </div>

      {/* Top Banner with W3C Compliance Graphic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono-code">
            Audited Trust & Verification Marks ({trustBadges.length})
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-2 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="p-1 rounded-md bg-white text-blue-700 border border-slate-200">
                    <Award className="w-3.5 h-3.5" />
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    {badge.title}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono-code mt-0.5 block">
                    {badge.standard}
                  </span>
                  <span className="text-[10px] text-blue-700 font-mono-code block mt-1 font-semibold">
                    By {badge.auditor}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center">
          <W3CComplianceStampGraphic
            passportId="DPP-MICHELIN-2026-X8842"
            gtin="03528701234567"
            manufacturer="Michelin Group (Manufacture Française des Pneumatiques Michelin)"
            onVerifyHash={() => onOpenProvenance(activeStandard.provenance)}
          />
        </div>
      </div>

      {/* 6-Dimension Data Quality Scorecard */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            Digital Product Passport Data Completeness & Integrity Matrix
          </h3>
          <span className="status-tag tag-green text-xs">
            COMPOSITE INDEX: {scores.overallConfidenceScore}%
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 block font-mono-code uppercase font-semibold">BOM Completeness</span>
            <span className="text-xl font-bold font-mono-code text-blue-700">{scores.productCompleteness}%</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 block font-mono-code uppercase font-semibold">Materials Trace</span>
            <span className="text-xl font-bold font-mono-code text-emerald-700">{scores.materialTraceability}%</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 block font-mono-code uppercase font-semibold">Suppliers Audited</span>
            <span className="text-xl font-bold font-mono-code text-blue-700">{scores.supplierTraceability}%</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 block font-mono-code uppercase font-semibold">Carbon Data (EPD)</span>
            <span className="text-xl font-bold font-mono-code text-amber-600">{scores.carbonDataQuality}%</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 block font-mono-code uppercase font-semibold">Circularity 10R</span>
            <span className="text-xl font-bold font-mono-code text-emerald-700">{scores.circularityDataQuality}%</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 block font-mono-code uppercase font-semibold">End-of-Life Index</span>
            <span className="text-xl font-bold font-mono-code text-blue-700">{scores.endOfLifeTraceability}%</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-white border border-slate-200 p-2 rounded-xl shadow-2xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold uppercase whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Regulatory Standards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Standard Cards */}
        <div className="lg:col-span-6 space-y-2.5">
          {filteredList.map((item) => {
            const isSelected = item.id === activeStandard.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedStandardId(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 shadow-xs ring-1 ring-blue-400'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono-code font-bold text-blue-700">
                        {item.authority}
                      </span>
                      <span className="status-tag tag-green text-xs">
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {item.notes}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Standard Details */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-xs space-y-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-blue-700 font-bold uppercase tracking-wider">
                  {activeStandard.category}
                </span>
                <span className="status-tag tag-green text-xs">
                  {activeStandard.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {activeStandard.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-mono-code">Enforced by: <strong className="text-slate-900">{activeStandard.authority}</strong></p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono-code">
                Official Compliance Evidence & Audit Record
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">
                {activeStandard.notes}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Evidence Certificate:</span>
                <span className="font-mono-code text-blue-700 font-semibold">{activeStandard.evidenceDocument}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Audit Timestamp:</span>
                <span className="font-mono-code text-emerald-700 font-semibold">{activeStandard.auditDate}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono-code text-xs">Verified and cryptographically hashed</span>
            <span className="font-mono-code text-emerald-700 font-bold">STATUS: VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Cryptographic Ledger History */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                EBSI / Gaia-X Distributed DPP Ledger History
              </h3>
              <p className="text-xs text-slate-500">
                Each passport lifecycle event is cryptographically hashed with SHA-256 and signed with Ed25519 corporate keys.
              </p>
            </div>
          </div>
          <span className="status-tag tag-green text-xs">
            MERKLE ROOT VALIDATED
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {cryptographicLedger.map((log, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{log.action}</span>
                  <span className="status-tag tag-supplier text-xs">
                    By {log.actor} ({log.role})
                  </span>
                </div>
                <span className="font-mono-code text-slate-500 text-xs">{log.timestamp}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-2 border-t border-slate-200 text-xs font-mono-code">
                <span className="text-slate-500 truncate">
                  HASH: <strong className="text-blue-700 font-normal">{log.sha256Hash}</strong>
                </span>
                <span className="text-slate-500">
                  STATUS: <strong className="text-emerald-700 font-semibold">{log.verificationStatus}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Navigation Footer */}
      <StageNavigationFooter activeSection="compliance" onSelectSection={onSelectSection || (() => {})} />
    </div>
  );
};
