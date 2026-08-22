import React from 'react';
import { DataProvenance } from '../types';
import { X, ShieldCheck, FileText, CheckCircle2, AlertCircle, Building2, Calendar, Award, Database, Cpu } from 'lucide-react';

interface ProvenanceModalProps {
  provenance: DataProvenance | null;
  onClose: () => void;
}

export const ProvenanceModal: React.FC<ProvenanceModalProps> = ({ provenance, onClose }) => {
  if (!provenance) return null;

  const getBadgeClass = (level: string) => {
    switch (level) {
      case 'VERIFIED':
        return 'tag-verified';
      case 'SUPPLIER REPORTED':
        return 'tag-supplier';
      case 'CALCULATED':
        return 'bg-[#00F5FF]/10 text-[#00F5FF] border-[#00F5FF]/30';
      case 'ESTIMATED':
        return 'bg-[#FFA500]/10 text-[#FFA500] border-[#FFA500]/30';
      case 'INDUSTRY AVERAGE':
        return 'bg-[#151619] text-[#8E9299] border-[#2D2F33]';
      default:
        return 'bg-[#151619] text-[#8E9299] border-[#2D2F33]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0C0E]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="provenance-modal-card"
        className="bg-[#151619] border border-[#2D2F33] rounded-lg w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2D2F33] bg-[#0B0C0E]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#151619] border border-[#2D2F33] text-[#00F5FF]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#FFFFFF] font-tech tracking-wide uppercase">Data Provenance & Audit Trail</h3>
                <span className={`status-tag ${getBadgeClass(provenance.provenanceLevel)}`}>
                  {provenance.provenanceLevel}
                </span>
              </div>
              <p className="text-xs text-[#8E9299]">Verifiable primary telemetry & regulatory compliance evidence</p>
            </div>
          </div>
          <button
            id="close-provenance-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded text-[#8E9299] hover:text-[#FFFFFF] hover:bg-[#151619] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#8E9299]">
          {/* Confidence & Integrity Score */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3.5 rounded">
              <span className="text-xs text-[#8E9299] font-mono-code block mb-1 flex items-center gap-1.5 uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF41]" /> Confidence Score
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#00FF41] font-mono-code">{provenance.confidenceScore}%</span>
                <span className="text-xs text-[#8E9299]">Tier A Quality</span>
              </div>
            </div>
            <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3.5 rounded">
              <span className="text-xs text-[#8E9299] font-mono-code block mb-1 flex items-center gap-1.5 uppercase">
                <Database className="w-3.5 h-3.5 text-[#00F5FF]" /> Data Classification
              </span>
              <div className="text-sm font-semibold text-[#FFFFFF] font-mono-code">
                {provenance.dataType} Source
              </div>
              <span className="text-[11px] text-[#8E9299] block mt-0.5">
                {provenance.dataType === 'Primary' ? 'Direct sensor ledger' : 'Calibrated benchmark'}
              </span>
            </div>
            <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3.5 rounded">
              <span className="text-xs text-[#8E9299] font-mono-code block mb-1 flex items-center gap-1.5 uppercase">
                <Calendar className="w-3.5 h-3.5 text-[#FFA500]" /> Vintage
              </span>
              <div className="text-sm font-semibold text-[#FFFFFF] font-mono-code">
                {provenance.reportingYear} ({provenance.measurementDate})
              </div>
              <span className="text-[11px] text-[#8E9299] block mt-0.5">Active period validity</span>
            </div>
          </div>

          {/* Source Document & Organization */}
          <div className="bg-[#0B0C0E] border border-[#2D2F33] rounded p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-[#00F5FF] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[#8E9299] font-mono-code uppercase block">Originating Organization / Entity</span>
                <span className="text-sm font-semibold text-[#FFFFFF] font-mono-code">{provenance.sourceOrg}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-4 h-4 text-[#00F5FF] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[#8E9299] font-mono-code uppercase block">Source Document / Registry Citation</span>
                <span className="text-sm font-mono-code text-[#00F5FF] font-medium">{provenance.sourceDoc}</span>
              </div>
            </div>

            {provenance.verificationBody && (
              <div className="flex items-start gap-3">
                <Award className="w-4 h-4 text-[#FFA500] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#8E9299] font-mono-code uppercase block">Third-Party Independent Auditor</span>
                  <span className="text-sm text-[#FFFFFF] font-semibold font-mono-code">{provenance.verificationBody}</span>
                </div>
              </div>
            )}

            {provenance.standard && (
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#00FF41] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#8E9299] font-mono-code uppercase block">Standard & Technical Protocol</span>
                  <span className="status-tag tag-green inline-block mt-0.5">
                    {provenance.standard}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Methodology & Data Calculation */}
          <div className="bg-[#0B0C0E] border border-[#2D2F33] rounded p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FFFFFF] font-mono-code uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-[#00F5FF]" /> Calculation Methodology & Chain of Custody
            </div>
            <p className="text-xs leading-relaxed text-[#8E9299] bg-[#151619] p-3 rounded border border-[#2D2F33] font-mono-code">
              {provenance.calculationMethod}
            </p>
          </div>

          {/* Data Owner & System Notice */}
          <div className="flex items-center justify-between text-xs text-[#8E9299] font-mono-code border-t border-[#2D2F33] pt-3">
            <span>Data Owner: <strong className="text-[#FFFFFF]">{provenance.dataOwner}</strong></span>
            <span className="text-[#00FF41]">Tamper-Resistant SHA-256 Ledger Verified</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#2D2F33] bg-[#0B0C0E] flex items-center justify-between">
          <div className="text-[11px] text-[#8E9299] font-mono-code flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#FFA500]" />
            Compliant with EU ESPR Digital Product Passport Article 9
          </div>
          <button
            id="dismiss-provenance-btn"
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#151619] hover:bg-[#1A1C1F] text-[#FFFFFF] border border-[#2D2F33] text-xs font-mono-code uppercase font-semibold transition-colors"
          >
            Close Provenance
          </button>
        </div>
      </div>
    </div>
  );
};
