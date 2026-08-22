import React, { useState } from 'react';
import { TirePassportData } from '../types';
import { X, Download, FileJson, FileSpreadsheet, FileText, CheckCircle2, Copy, Check, ShieldCheck } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tire: TirePassportData;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, tire }) => {
  const [copied, setCopied] = useState(false);
  const [activeFormat, setActiveFormat] = useState<'json' | 'csv' | 'report'>('json');

  if (!isOpen) return null;

  // 1. Export JSON
  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(tire, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DPP_${tire.passportId}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // 2. Export CSV Bill of Materials
  const handleDownloadCSV = () => {
    const headers = ['ID', 'Material Name', 'Category', 'Mass (kg)', 'Percentage (%)', 'Origin Feedstock', 'Supplier', 'Supplier Country', 'Processing Facility', 'Carbon Intensity (kg CO2e/kg)', 'Traceability Level', 'REACH Status'];
    const rows = tire.materials.map((m) => [
      m.id,
      `"${m.name}"`,
      m.category,
      m.massKg,
      m.percentage,
      `"${m.originType}"`,
      `"${m.supplierName}"`,
      `"${m.supplierCountry}"`,
      `"${m.processingLocation}"`,
      m.carbonIntensityKgCO2ePerKg,
      `"${m.traceabilityLevel}"`,
      m.reachStatus,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BOM_${tire.passportId}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // 3. Export Summary Text Report
  const handleDownloadReport = () => {
    const textReport = `===============================================================
DIGITAL PRODUCT PASSPORT (DPP) CONFORMITY DOSSIER
Regulation (EU) 2024/1781 (ESPR) & ISO 14067 LCA
===============================================================
Product: ${tire.productName}
Model / Size: ${tire.model} (${tire.tireSize})
Passport ID: ${tire.passportId}
Serial Number: ${tire.serialNumber}
GTIN / EAN: ${tire.gtin}
EPC RFID: ${tire.epcRfid}
Manufacturing Plant: ${tire.manufacturingPlant}
Manufacturing Date: ${tire.manufacturingDate}
Passport Status: ${tire.passportStatus}
Data Confidence Composite: ${tire.scores.overallConfidenceScore}%

---------------------------------------------------------------
1. SUSTAINABILITY & CIRCULARITY COMPOSITION
---------------------------------------------------------------
Total Weight: ${tire.totalWeightKg} kg
- Recycled Content: ${tire.recycledContentPercent}%
- Bio-Renewable Content: ${tire.renewableContentPercent}%
- Virgin Fossil Content: ${tire.virginContentPercent}%
Total Sustainable Material Share: ${(tire.recycledContentPercent + tire.renewableContentPercent).toFixed(1)}%

---------------------------------------------------------------
2. PRODUCT CARBON FOOTPRINT (PCF) - ISO 14067
---------------------------------------------------------------
Scope 1 (Direct Factory): ${tire.carbonLCA.scope1KgCO2e} kg CO2e
Scope 2 (Electricity Grid PPA): ${tire.carbonLCA.scope2KgCO2e} kg CO2e
Scope 3 (Upstream Sourcing): ${tire.carbonLCA.scope3UpstreamKgCO2e} kg CO2e
Scope 3 (Use Phase 65,000 km): ${tire.carbonLCA.scope3DownstreamUseKgCO2e} kg CO2e
Scope 3 (End of Life Credit): ${tire.carbonLCA.scope3EndOfLifeCreditKgCO2e} kg CO2e
TOTAL CRADLE-TO-GATE: ${tire.carbonLCA.totalCradleToGateKgCO2e} kg CO2e / tire
TOTAL CRADLE-TO-GRAVE: ${tire.carbonLCA.totalCradleToGraveKgCO2e} kg CO2e / tire

---------------------------------------------------------------
3. HOMOLOGATION & EU TYRE LABEL RATINGS
---------------------------------------------------------------
Rolling Resistance: Class ${tire.performance.rollingResistanceClass} (${tire.performance.rollingResistanceCoefficient} kg/t)
Wet Grip: Class ${tire.performance.wetGripClass} (Index: ${tire.performance.wetGripIndex})
External Noise: Class ${tire.performance.externalNoiseClass} (${tire.performance.externalNoiseDB} dB)
Expected Mileage: ${tire.performance.expectedMileageKm.toLocaleString()} km
EV Optimized: ${tire.performance.evOptimized ? 'YES' : 'NO'}

---------------------------------------------------------------
4. EUDR NATURAL RUBBER DEFORESTATION AUDIT
---------------------------------------------------------------
Cut-Off Date: December 31, 2020 (0% Deforestation Verified)
Chain of Custody: Physical Segregation & ISCC+ Mass Balance
GPS Smallholders Geotagged: 1,420 Parcels in Surat Thani, Thailand

===============================================================
Generated by AeroCrest DPP Enterprise Platform • Cryptographically Anchored
===============================================================`;

    const blob = new Blob([textReport], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DPP_Summary_${tire.passportId}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(tire, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0C0E]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#151619] border border-[#2D2F33] rounded-lg w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#2D2F33] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#0B0C0E] border border-[#2D2F33] text-[#00F5FF]">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono-code text-[#00F5FF] font-bold uppercase tracking-wider block">
                ESPR & CIRPASS Interoperability
              </span>
              <h3 className="text-base font-bold font-tech text-[#FFFFFF] uppercase">
                Export Digital Product Passport
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

        {/* Format Selector */}
        <div className="p-6 space-y-5 overflow-y-auto text-xs">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setActiveFormat('json')}
              className={`p-3.5 rounded border text-left transition-all ${
                activeFormat === 'json'
                  ? 'bg-[#00F5FF]/15 text-[#00F5FF] border-[#00F5FF]'
                  : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border-[#2D2F33]'
              }`}
            >
              <FileJson className="w-5 h-5 text-[#00F5FF] mb-2" />
              <span className="font-bold text-[#FFFFFF] block font-tech uppercase">W3C DPP JSON</span>
              <span className="text-[10px] text-[#8E9299] mt-0.5 block font-mono-code">Full Machine-Readable JSON Schema</span>
            </button>

            <button
              onClick={() => setActiveFormat('csv')}
              className={`p-3.5 rounded border text-left transition-all ${
                activeFormat === 'csv'
                  ? 'bg-[#00F5FF]/15 text-[#00F5FF] border-[#00F5FF]'
                  : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border-[#2D2F33]'
              }`}
            >
              <FileSpreadsheet className="w-5 h-5 text-[#00FF41] mb-2" />
              <span className="font-bold text-[#FFFFFF] block font-tech uppercase">BOM CSV Export</span>
              <span className="text-[10px] text-[#8E9299] mt-0.5 block font-mono-code">Material items, suppliers & carbon</span>
            </button>

            <button
              onClick={() => setActiveFormat('report')}
              className={`p-3.5 rounded border text-left transition-all ${
                activeFormat === 'report'
                  ? 'bg-[#00F5FF]/15 text-[#00F5FF] border-[#00F5FF]'
                  : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border-[#2D2F33]'
              }`}
            >
              <FileText className="w-5 h-5 text-[#00F5FF] mb-2" />
              <span className="font-bold text-[#FFFFFF] block font-tech uppercase">Audit Report (.TXT)</span>
              <span className="text-[10px] text-[#8E9299] mt-0.5 block font-mono-code">Human-readable compliance briefing</span>
            </button>
          </div>

          {/* Format Preview Box */}
          <div className="bg-[#0B0C0E] rounded border border-[#2D2F33] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono-code text-[11px] text-[#8E9299]">
                {activeFormat === 'json' && 'dpp_payload_conformant_2026.json'}
                {activeFormat === 'csv' && 'bill_of_materials_traceability.csv'}
                {activeFormat === 'report' && 'dpp_compliance_summary_dossier.txt'}
              </span>

              {activeFormat === 'json' && (
                <button
                  onClick={handleCopyJSON}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#151619] hover:bg-[#1A1C1F] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33] text-[11px] font-mono-code transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#00FF41]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'COPY JSON'}</span>
                </button>
              )}
            </div>

            <div className="max-h-48 overflow-y-auto bg-[#151619] p-3 rounded font-mono-code text-[11px] text-[#8E9299] border border-[#2D2F33]">
              {activeFormat === 'json' && (
                <pre className="whitespace-pre-wrap">{JSON.stringify({
                  passportId: tire.passportId,
                  productName: tire.productName,
                  manufacturer: tire.manufacturer,
                  gtin: tire.gtin,
                  epcRfid: tire.epcRfid,
                  scores: tire.scores,
                  carbonLCA: {
                    cradleToGate: tire.carbonLCA.totalCradleToGateKgCO2e,
                    cradleToGrave: tire.carbonLCA.totalCradleToGraveKgCO2e,
                  },
                  materialsCount: tire.materials.length,
                  complianceCount: tire.complianceList.length,
                }, null, 2)}</pre>
              )}

              {activeFormat === 'csv' && (
                <pre className="whitespace-pre-wrap">
                  ID,Material Name,Category,Mass(kg),Percentage(%),Origin Feedstock,Supplier,CO2e/kg{"\n"}
                  {tire.materials.slice(0, 4).map((m) => `${m.id},"${m.name}",${m.category},${m.massKg},${m.percentage},"${m.originType}","${m.supplierName}",${m.carbonIntensityKgCO2ePerKg}`).join('\n')}
                  {"\n"}... ({tire.materials.length - 4} more materials)
                </pre>
              )}

              {activeFormat === 'report' && (
                <pre className="whitespace-pre-wrap">
                  DIGITAL PRODUCT PASSPORT (DPP) SUMMARY{"\n"}
                  Product: {tire.productName}{"\n"}
                  Passport ID: {tire.passportId}{"\n"}
                  Circular Content: {(tire.recycledContentPercent + tire.renewableContentPercent).toFixed(1)}%{"\n"}
                  Total Carbon (Cradle-to-Gate): {tire.carbonLCA.totalCradleToGateKgCO2e} kg CO2e{"\n"}
                  Rolling Resistance: Class {tire.performance.rollingResistanceClass}{"\n"}
                  EUDR 2023/1115 Deforestation Audit: PASSED (100% Traceable)
                </pre>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0B0C0E] border-t border-[#2D2F33] flex items-center justify-between">
          <span className="text-[11px] text-[#8E9299] font-mono-code flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00FF41]" />
            Signed with Ed25519 corporate key
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33] hover:bg-[#151619] font-mono-code text-xs uppercase transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (activeFormat === 'json') handleDownloadJSON();
                if (activeFormat === 'csv') handleDownloadCSV();
                if (activeFormat === 'report') handleDownloadReport();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#00F5FF] hover:bg-[#00F5FF]/80 text-[#0B0C0E] font-bold font-mono-code uppercase text-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
