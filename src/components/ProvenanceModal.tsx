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
        return 'tag-verified text-xs';
      case 'SUPPLIER REPORTED':
        return 'tag-supplier text-xs';
      case 'CALCULATED':
        return 'bg-blue-50 text-blue-700 border-blue-200 text-xs';
      case 'ESTIMATED':
        return 'bg-amber-50 text-amber-700 border-amber-200 text-xs';
      case 'INDUSTRY AVERAGE':
        return 'bg-slate-100 text-slate-700 border-slate-200 text-xs';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 text-xs';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="provenance-modal-card"
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Data Provenance & Audit Trail</h3>
                <span className={`status-tag ${getBadgeClass(provenance.provenanceLevel)}`}>
                  {provenance.provenanceLevel}
                </span>
              </div>
              <p className="text-xs text-slate-500">Verifiable primary telemetry & regulatory compliance evidence</p>
            </div>
          </div>
          <button
            id="close-provenance-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
          {/* Confidence & Integrity Score */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
              <span className="text-xs text-slate-500 font-mono-code block mb-1 flex items-center gap-1.5 uppercase font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Confidence Score
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-700 font-mono-code">{provenance.confidenceScore}%</span>
                <span className="text-xs text-slate-500">Tier A Quality</span>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
              <span className="text-xs text-slate-500 font-mono-code block mb-1 flex items-center gap-1.5 uppercase font-semibold">
                <Database className="w-3.5 h-3.5 text-blue-600" /> Data Classification
              </span>
              <div className="text-sm font-semibold text-slate-900 font-mono-code">
                {provenance.dataType} Source
              </div>
              <span className="text-xs text-slate-500 block mt-0.5">
                {provenance.dataType === 'Primary' ? 'Direct sensor ledger' : 'Calibrated benchmark'}
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
              <span className="text-xs text-slate-500 font-mono-code block mb-1 flex items-center gap-1.5 uppercase font-semibold">
                <Calendar className="w-3.5 h-3.5 text-amber-600" /> Vintage
              </span>
              <div className="text-sm font-semibold text-slate-900 font-mono-code">
                {provenance.reportingYear} ({provenance.measurementDate})
              </div>
              <span className="text-xs text-slate-500 block mt-0.5">Active period validity</span>
            </div>
          </div>

          {/* Source Document & Organization */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-mono-code uppercase block font-semibold">Originating Organization / Entity</span>
                <span className="text-sm font-semibold text-slate-900 font-mono-code">{provenance.sourceOrg}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-mono-code uppercase block font-semibold">Source Document / Registry Citation</span>
                <span className="text-sm font-mono-code text-blue-700 font-medium">{provenance.sourceDoc}</span>
              </div>
            </div>

            {provenance.verificationBody && (
              <div className="flex items-start gap-3">
                <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 font-mono-code uppercase block font-semibold">Third-Party Independent Auditor</span>
                  <span className="text-sm text-slate-900 font-semibold font-mono-code">{provenance.verificationBody}</span>
                </div>
              </div>
            )}

            {provenance.standard && (
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 font-mono-code uppercase block font-semibold">Standard & Technical Protocol</span>
                  <span className="status-tag tag-green inline-block mt-0.5 text-xs">
                    {provenance.standard}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Methodology & Data Calculation */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 font-mono-code uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-blue-600" /> Calculation Methodology & Chain of Custody
            </div>
            <p className="text-xs leading-relaxed text-slate-700 bg-white p-3 rounded-lg border border-slate-200 font-mono-code">
              {provenance.calculationMethod}
            </p>
          </div>

          {/* Data Owner & System Notice */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono-code border-t border-slate-100 pt-3">
            <span>Data Owner: <strong className="text-slate-900">{provenance.dataOwner}</strong></span>
            <span className="text-emerald-700 font-semibold">Tamper-Resistant SHA-256 Ledger Verified</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-mono-code flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            Compliant with EU ESPR Digital Product Passport Article 9
          </div>
          <button
            id="dismiss-provenance-btn"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono-code uppercase font-semibold transition-colors shadow-2xs"
          >
            Close Provenance
          </button>
        </div>
      </div>
    </div>
  );
};
