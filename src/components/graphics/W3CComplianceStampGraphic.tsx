import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, FileBadge2, ExternalLink } from 'lucide-react';

interface W3CComplianceStampGraphicProps {
  passportId?: string;
  gtin?: string;
  manufacturer?: string;
  onVerifyHash?: () => void;
}

export const W3CComplianceStampGraphic: React.FC<W3CComplianceStampGraphicProps> = ({
  passportId = 'DPP-MICHELIN-2026-X8842',
  gtin = '03528701234567',
  manufacturer = 'Michelin Group (Manufacture Française des Pneumatiques Michelin)',
  onVerifyHash
}) => {
  const issuerDisplay = (manufacturer || 'Michelin Group').split('(')[0]?.trim() || 'Michelin Group';

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-emerald-500/40 rounded-xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
      {/* Background Watermark Seal */}
      <div className="absolute -right-8 -bottom-8 opacity-5 text-emerald-900 pointer-events-none select-none">
        <ShieldCheck className="w-48 h-48" />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Seal & Header */}
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
            <FileBadge2 className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="status-tag tag-green text-[10px]">
                <CheckCircle2 className="w-3 h-3" /> OFFICIAL EU ESPR PASSPORT
              </span>
              <span className="status-tag tag-verified text-[10px]">
                W3C VC 2.0 VALID
              </span>
            </div>

            <h4 className="text-base font-bold text-slate-900 mt-1">
              Cryptographically Sealed Digital Passport
            </h4>
            <p className="text-xs text-slate-500 mt-0.5 font-mono-code">
              ID: {passportId} • GTIN: {gtin}
            </p>
          </div>
        </div>

        {/* Right Seal Data & Verification Action */}
        <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-mono-code text-slate-400 uppercase font-semibold block">
              Ed25519 Root Signature
            </span>
            <span className="text-xs font-mono-code font-bold text-slate-800 block truncate max-w-[220px]">
              0x4b9a7c...f8821e9c
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 sm:justify-end">
              <Lock className="w-3 h-3" /> Issuer: {issuerDisplay}
            </span>
          </div>

          {onVerifyHash && (
            <button
              onClick={onVerifyHash}
              className="mt-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold font-mono-code flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify Signature</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
