import React, { useState } from 'react';
import { TirePassportData } from '../types';
import { X, QrCode, Copy, Check, Radio, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  tire: TirePassportData;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose, tire }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const gs1DigitalLink = `https://dpp.michelin.com/01/${tire.gtin}/21/${tire.serialNumber}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(gs1DigitalLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 shadow-2xs">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono-code text-blue-700 font-bold uppercase tracking-wider block">
                GS1 Digital Link & RFID Identifier
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Physical-to-Digital Data Carrier
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {/* QR Code Graphical Representation */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200">
              {/* SVG 2D Data Matrix / QR Visual */}
              <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                {/* Corner Finder Patterns */}
                <rect x="10" y="10" width="25" height="25" fill="#0f172a" rx="2" />
                <rect x="15" y="15" width="15" height="15" fill="white" />
                <rect x="18" y="18" width="9" height="9" fill="#0f172a" />

                <rect x="65" y="10" width="25" height="25" fill="#0f172a" rx="2" />
                <rect x="70" y="15" width="15" height="15" fill="white" />
                <rect x="73" y="18" width="9" height="9" fill="#0f172a" />

                <rect x="10" y="65" width="25" height="25" fill="#0f172a" rx="2" />
                <rect x="15" y="70" width="15" height="15" fill="white" />
                <rect x="18" y="73" width="9" height="9" fill="#0f172a" />

                {/* QR Matrix Grid Dots */}
                <rect x="42" y="12" width="6" height="6" fill="#0f172a" />
                <rect x="52" y="18" width="6" height="6" fill="#0f172a" />
                <rect x="40" y="26" width="6" height="6" fill="#0f172a" />
                <rect x="48" y="32" width="6" height="6" fill="#0f172a" />
                <rect x="12" y="44" width="6" height="6" fill="#0f172a" />
                <rect x="22" y="48" width="6" height="6" fill="#0f172a" />
                <rect x="34" y="44" width="6" height="6" fill="#0f172a" />
                <rect x="44" y="44" width="12" height="12" fill="#0f172a" />
                <rect x="62" y="44" width="6" height="6" fill="#0f172a" />
                <rect x="74" y="44" width="6" height="6" fill="#0f172a" />
                <rect x="84" y="48" width="6" height="6" fill="#0f172a" />
                <rect x="40" y="62" width="6" height="6" fill="#0f172a" />
                <rect x="52" y="68" width="6" height="6" fill="#0f172a" />
                <rect x="44" y="78" width="6" height="6" fill="#0f172a" />
                <rect x="64" y="64" width="6" height="6" fill="#0f172a" />
                <rect x="76" y="72" width="6" height="6" fill="#0f172a" />
                <rect x="68" y="82" width="14" height="6" fill="#0f172a" />
                <rect x="84" y="74" width="6" height="6" fill="#0f172a" />
              </svg>
            </div>

            <div className="text-center">
              <span className="text-xs font-mono-code font-bold text-slate-900 block">
                Molded Directly onto Michelin Outer Sidewall (Laser Etched)
              </span>
              <span className="text-xs text-slate-500">
                Scan with smartphone camera or industrial optical reader
              </span>
            </div>
          </div>

          {/* GS1 Digital Link URL Copy Box */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block font-mono-code">
              GS1 Digital Link URI
            </span>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-mono-code text-xs text-blue-700 truncate flex-1 font-semibold">
                {gs1DigitalLink}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors shadow-2xs"
                title="Copy URI"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Embedded RFID Chip Specs */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-900 font-mono-code text-xs">Embedded RAIN RFID Tag</span>
              </div>
              <span className="status-tag tag-green text-xs">
                ISO 20910:2019
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-mono-code pt-1">
              <div>
                <span>EPC Protocol:</span> <strong className="text-slate-900 block truncate">{tire.epcRfid}</strong>
              </div>
              <div>
                <span>Frequency:</span> <strong className="text-slate-900 block">860–960 MHz (UHF)</strong>
              </div>
              <div>
                <span>Embedment:</span> <strong className="text-slate-900 block">Vulcanized in Apex</strong>
              </div>
              <div>
                <span>Durability:</span> <strong className="text-slate-900 block">-40°C to +200°C</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono-code">
            Conforms to ISO/IEC 15418 & ESPR 2024
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold font-mono-code transition-colors uppercase text-xs shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
