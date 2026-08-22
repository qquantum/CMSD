import React, { useState } from 'react';
import { ComplianceStandard, TraceabilityScores, DataProvenance } from '../../types';
import { ShieldCheck, FileCheck, CheckCircle2, Award, Download, FileSearch, Lock, Database, FileText, ExternalLink, Sparkles, Activity } from 'lucide-react';

interface VerificationComplianceSectionProps {
  complianceList: ComplianceStandard[];
  scores: TraceabilityScores;
  onOpenProvenance: (prov: DataProvenance) => void;
  onExportAuditReport: () => void;
}

export const VerificationComplianceSection: React.FC<VerificationComplianceSectionProps> = ({
  complianceList,
  scores,
  onOpenProvenance,
  onExportAuditReport,
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
      actor: 'AeroCrest Certification Node #1',
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
            <span className="status-tag tag-verified">
              SECTION 13 & 14
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-tech tracking-wide uppercase">
              Regulatory Compliance & Cryptographic Trust Audit
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9299] mt-1.5">
            Official conformity assessments for ESPR, EUDR, EPREL, REACH, and CSDDD with third-party auditor signatures.
          </p>
        </div>

        <button
          onClick={onExportAuditReport}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#00F5FF]/10 hover:bg-[#00F5FF]/20 border border-[#00F5FF]/40 text-[#00F5FF] text-xs font-mono-code font-bold self-start md:self-auto transition-colors uppercase"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Regulatory Dossier (.JSON)</span>
        </button>
      </div>

      {/* Trust Badges Ribbon */}
      <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-5 shadow-xl space-y-3">
        <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block font-mono-code">
          Audited Trust & Verification Marks ({trustBadges.length})
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="p-3 bg-[#0B0C0E] rounded border border-[#2D2F33] flex flex-col justify-between space-y-2 hover:border-[#00F5FF]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="p-1 rounded bg-[#151619] text-[#00F5FF]">
                  <Award className="w-3.5 h-3.5" />
                </span>
                <span className="w-2 h-2 rounded-full bg-[#00FF41]"></span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#FFFFFF] font-tech block leading-tight">
                  {badge.title}
                </span>
                <span className="text-[9px] text-[#8E9299] font-mono-code mt-0.5 block">
                  {badge.standard}
                </span>
                <span className="text-[9px] text-[#00F5FF] font-mono-code block mt-1">
                  By {badge.auditor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6-Dimension Data Quality Scorecard */}
      <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-tech text-[#FFFFFF] flex items-center gap-2 uppercase">
            <Activity className="w-4 h-4 text-[#00F5FF]" />
            Digital Product Passport Data Completeness & Integrity Matrix
          </h3>
          <span className="status-tag tag-green">
            COMPOSITE INDEX: {scores.overallConfidenceScore}%
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 bg-[#0B0C0E] rounded border border-[#2D2F33] space-y-1">
            <span className="text-[10px] text-[#8E9299] block font-mono-code uppercase">BOM Completeness</span>
            <span className="text-xl font-bold font-mono-code text-[#00F5FF]">{scores.productCompleteness}%</span>
          </div>

          <div className="p-3 bg-[#0B0C0E] rounded border border-[#2D2F33] space-y-1">
            <span className="text-[10px] text-[#8E9299] block font-mono-code uppercase">Materials Trace</span>
            <span className="text-xl font-bold font-mono-code text-[#00FF41]">{scores.materialTraceability}%</span>
          </div>

          <div className="p-3 bg-[#0B0C0E] rounded border border-[#2D2F33] space-y-1">
            <span className="text-[10px] text-[#8E9299] block font-mono-code uppercase">Suppliers Audited</span>
            <span className="text-xl font-bold font-mono-code text-[#00F5FF]">{scores.supplierTraceability}%</span>
          </div>

          <div className="p-3 bg-[#0B0C0E] rounded border border-[#2D2F33] space-y-1">
            <span className="text-[10px] text-[#8E9299] block font-mono-code uppercase">Carbon Data (EPD)</span>
            <span className="text-xl font-bold font-mono-code text-amber-400">{scores.carbonDataQuality}%</span>
          </div>

          <div className="p-3 bg-[#0B0C0E] rounded border border-[#2D2F33] space-y-1">
            <span className="text-[10px] text-[#8E9299] block font-mono-code uppercase">Circularity 10R</span>
            <span className="text-xl font-bold font-mono-code text-[#00FF41]">{scores.circularityDataQuality}%</span>
          </div>

          <div className="p-3 bg-[#0B0C0E] rounded border border-[#2D2F33] space-y-1">
            <span className="text-[10px] text-[#8E9299] block font-mono-code uppercase">End-of-Life Index</span>
            <span className="text-xl font-bold font-mono-code text-[#00F5FF]">{scores.endOfLifeTraceability}%</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-[#151619] border border-[#2D2F33] p-1.5 rounded">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded text-xs font-mono-code font-bold uppercase whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]'
                : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33]'
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
                className={`p-4 rounded border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#151619] border-[#00F5FF] shadow-lg ring-1 ring-[#00F5FF]/30'
                    : 'bg-[#0B0C0E] border-[#2D2F33] hover:bg-[#151619] hover:border-[#8E9299]/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono-code font-bold text-[#00F5FF]">
                        {item.authority}
                      </span>
                      <span className="status-tag tag-green">
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#FFFFFF] font-tech mt-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#8E9299] mt-0.5 line-clamp-1">
                      {item.notes}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Standard Details */}
        <div className="lg:col-span-6 bg-[#151619] border border-[#2D2F33] rounded-lg p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-[#00F5FF] font-bold uppercase tracking-wider">
                  {activeStandard.category}
                </span>
                <span className="status-tag tag-green">
                  {activeStandard.status}
                </span>
              </div>
              <h3 className="text-xl font-bold font-tech text-[#FFFFFF] mt-1">
                {activeStandard.title}
              </h3>
              <p className="text-xs text-[#8E9299] mt-0.5 font-mono-code">Enforced by: <strong className="text-[#FFFFFF]">{activeStandard.authority}</strong></p>
            </div>

            <div className="bg-[#0B0C0E] border border-[#2D2F33] p-4 rounded space-y-1">
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block font-mono-code">
                Official Compliance Evidence & Audit Record
              </span>
              <p className="text-xs text-[#FFFFFF] leading-relaxed">
                {activeStandard.notes}
              </p>
            </div>

            <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3.5 rounded space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8E9299]">Evidence Certificate:</span>
                <span className="font-mono-code text-[#00F5FF]">{activeStandard.evidenceDocument}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8E9299]">Audit Timestamp:</span>
                <span className="font-mono-code text-[#00FF41]">{activeStandard.auditDate}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#2D2F33] flex items-center justify-between text-xs text-[#8E9299]">
            <span className="font-mono-code text-[11px]">Verified and cryptographically hashed</span>
            <span className="font-mono-code text-[#00FF41] font-bold">STATUS: VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Cryptographic Ledger History */}
      <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#00F5FF]" />
            <div>
              <h3 className="text-lg font-bold font-tech text-[#FFFFFF] uppercase">
                EBSI / Gaia-X Distributed DPP Ledger History
              </h3>
              <p className="text-xs text-[#8E9299]">
                Each passport lifecycle event is cryptographically hashed with SHA-256 and signed with Ed25519 corporate keys.
              </p>
            </div>
          </div>
          <span className="status-tag tag-green">
            MERKLE ROOT VALIDATED
          </span>
        </div>

        <div className="space-y-2.5 pt-2">
          {cryptographicLedger.map((log, idx) => (
            <div key={idx} className="p-3.5 bg-[#0B0C0E] rounded border border-[#2D2F33] text-xs space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#FFFFFF] font-tech">{log.action}</span>
                  <span className="status-tag tag-supplier">
                    By {log.actor} ({log.role})
                  </span>
                </div>
                <span className="font-mono-code text-[#8E9299] text-[11px]">{log.timestamp}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1 border-t border-[#2D2F33] text-[11px] font-mono-code">
                <span className="text-[#8E9299] truncate">
                  HASH: <strong className="text-[#00F5FF] font-normal">{log.sha256Hash}</strong>
                </span>
                <span className="text-[#8E9299]">
                  STATUS: <strong className="text-[#00FF41] font-normal">{log.verificationStatus}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
