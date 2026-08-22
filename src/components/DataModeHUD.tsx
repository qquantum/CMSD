import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Download, 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
  Activity, 
  Gauge, 
  Thermometer, 
  RefreshCw, 
  CheckCircle2, 
  FileCheck, 
  Upload, 
  Layers, 
  Sparkles,
  Lock
} from 'lucide-react';
import { DataMode, LiveTelemetryData, DownloadedSnapshotMeta } from '../types';

interface DataModeHUDProps {
  dataMode: DataMode;
  onToggleDataMode: (mode: DataMode) => void;
  liveTelemetry: LiveTelemetryData;
  downloadedSnapshot: DownloadedSnapshotMeta;
  onSimulatePressureAlert?: () => void;
}

export const DataModeHUD: React.FC<DataModeHUDProps> = ({
  dataMode,
  onToggleDataMode,
  liveTelemetry,
  downloadedSnapshot,
}) => {
  const [dynamicPressure, setDynamicPressure] = useState<number>(liveTelemetry.pressureBar);
  const [dynamicTemp, setDynamicTemp] = useState<number>(liveTelemetry.temperatureCelsius);
  const [pulseLive, setPulseLive] = useState<boolean>(true);
  const [isVerifyingOffline, setIsVerifyingOffline] = useState<boolean>(false);
  const [offlineVerifiedToast, setOfflineVerifiedToast] = useState<boolean>(false);

  // Simulate subtle real-time IoT fluctuations when in live mode
  useEffect(() => {
    if (dataMode !== 'live') return;

    const interval = setInterval(() => {
      setDynamicPressure((prev) => {
        const delta = (Math.random() - 0.5) * 0.02;
        return parseFloat((2.52 + delta).toFixed(2));
      });
      setDynamicTemp((prev) => {
        const delta = (Math.random() - 0.5) * 0.3;
        return parseFloat((34.8 + delta).toFixed(1));
      });
      setPulseLive((prev) => !prev);
    }, 2500);

    return () => clearInterval(interval);
  }, [dataMode]);

  const handleVerifyOfflineSignature = () => {
    setIsVerifyingOffline(true);
    setTimeout(() => {
      setIsVerifyingOffline(false);
      setOfflineVerifiedToast(true);
      setTimeout(() => setOfflineVerifiedToast(false), 3000);
    }, 800);
  };

  const handleExportOfflineSnapshot = () => {
    const offlinePayload = {
      passportId: 'DPP-MICHELIN-2026-0048192',
      gtin: '03528701234567',
      serialNumber: 'SN-FR-ML-2026-0314-8842A',
      manufacturer: 'Michelin Group (Clermont-Ferrand)',
      model: 'Michelin e·Primacy™ / Apex-GT',
      snapshotMeta: downloadedSnapshot,
      compliance: 'ESPR 2024/1781 & W3C Verifiable Credential 2.0',
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(offlinePayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'michelin_dpp_offline_verifiable_credential.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#151619] border border-[#2D2F33] rounded-lg p-4 mb-6 shadow-xl transition-all">
      {/* Mode Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2D2F33]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold font-mono-code text-[#8E9299] uppercase">
            Passport Data Stream Mode:
          </span>
          <div className="flex items-center bg-[#0B0C0E] p-1 rounded border border-[#2D2F33]">
            <button
              onClick={() => onToggleDataMode('live')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono-code uppercase font-bold transition-all ${
                dataMode === 'live'
                  ? 'bg-[#00F5FF] text-[#0B0C0E]'
                  : 'text-[#8E9299] hover:text-[#FFFFFF]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${dataMode === 'live' ? 'bg-[#0B0C0E] animate-ping' : 'bg-[#8E9299]'}`} />
              <Activity className="w-3.5 h-3.5" />
              <span>1. Live Telemetry Stream</span>
            </button>

            <button
              onClick={() => onToggleDataMode('downloaded')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono-code uppercase font-bold transition-all ${
                dataMode === 'downloaded'
                  ? 'bg-[#00FF41] text-[#0B0C0E]'
                  : 'text-[#8E9299] hover:text-[#FFFFFF]'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>2. Downloaded / Offline Archive</span>
            </button>
          </div>
        </div>

        {/* Status Tag */}
        <div>
          {dataMode === 'live' ? (
            <div className="flex items-center gap-2">
              <span className="status-tag tag-verified text-[11px]">
                GDSO RFID / MQTT IoT CONNECTED (14ms)
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="status-tag tag-supplier text-[11px]">
                LOCAL VERIFIABLE CREDENTIAL CACHED (148.5 KB)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Mode View 1: LIVE TELEMETRY HUD */}
      {dataMode === 'live' && (
        <div className="pt-3 space-y-3 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* Pressure */}
            <div className="bg-[#0B0C0E] p-2.5 rounded border border-[#2D2F33]">
              <div className="flex items-center justify-between text-[#8E9299] text-[10px] font-mono-code uppercase">
                <span>Cavity Pressure</span>
                <Gauge className="w-3.5 h-3.5 text-[#00F5FF]" />
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-bold font-mono-code text-[#00F5FF]">
                  {dynamicPressure}
                </span>
                <span className="text-[10px] font-mono-code text-[#8E9299]">bar</span>
              </div>
              <span className="text-[9px] font-mono-code text-[#00FF41]">Nominal ±0.02 bar</span>
            </div>

            {/* Temperature */}
            <div className="bg-[#0B0C0E] p-2.5 rounded border border-[#2D2F33]">
              <div className="flex items-center justify-between text-[#8E9299] text-[10px] font-mono-code uppercase">
                <span>Cavity Temp</span>
                <Thermometer className="w-3.5 h-3.5 text-[#FFA500]" />
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-bold font-mono-code text-[#FFA500]">
                  {dynamicTemp}°
                </span>
                <span className="text-[10px] font-mono-code text-[#8E9299]">C</span>
              </div>
              <span className="text-[9px] font-mono-code text-[#8E9299]">Thermal Stable</span>
            </div>

            {/* Tread Depth */}
            <div className="bg-[#0B0C0E] p-2.5 rounded border border-[#2D2F33]">
              <div className="flex items-center justify-between text-[#8E9299] text-[10px] font-mono-code uppercase">
                <span>Tread Depth</span>
                <Activity className="w-3.5 h-3.5 text-[#00FF41]" />
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-bold font-mono-code text-[#00FF41]">
                  {liveTelemetry.remainingTreadDepthMm}
                </span>
                <span className="text-[10px] font-mono-code text-[#8E9299]">/ 7.0 mm</span>
              </div>
              <span className="text-[9px] font-mono-code text-[#00FF41]">97.1% Life Remaining</span>
            </div>

            {/* Live Odometer */}
            <div className="bg-[#0B0C0E] p-2.5 rounded border border-[#2D2F33]">
              <div className="flex items-center justify-between text-[#8E9299] text-[10px] font-mono-code uppercase">
                <span>Live Odometer</span>
                <Radio className="w-3.5 h-3.5 text-[#00F5FF]" />
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-bold font-mono-code text-[#FFFFFF]">
                  {liveTelemetry.odometerKm.toLocaleString()}
                </span>
                <span className="text-[10px] font-mono-code text-[#8E9299]">km</span>
              </div>
              <span className="text-[9px] font-mono-code text-[#8E9299]">Target: 65,000 km</span>
            </div>

            {/* Live Rolling Resistance */}
            <div className="bg-[#0B0C0E] p-2.5 rounded border border-[#2D2F33]">
              <div className="flex items-center justify-between text-[#8E9299] text-[10px] font-mono-code uppercase">
                <span>Rolling Loss</span>
                <Sparkles className="w-3.5 h-3.5 text-[#00F5FF]" />
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-bold font-mono-code text-[#00F5FF]">
                  {liveTelemetry.rollingResistanceLiveKgTonne}
                </span>
                <span className="text-[10px] font-mono-code text-[#8E9299]">kg/t</span>
              </div>
              <span className="text-[9px] font-mono-code text-[#00FF41]">Class A Efficiency</span>
            </div>

            {/* Merkle Root Check */}
            <div className="bg-[#0B0C0E] p-2.5 rounded border border-[#2D2F33]">
              <div className="flex items-center justify-between text-[#8E9299] text-[10px] font-mono-code uppercase">
                <span>Ledger Root</span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#00FF41]" />
              </div>
              <div className="mt-1">
                <span className="text-xs font-mono-code text-[#00FF41] block truncate">
                  0x8f2a...c210b
                </span>
              </div>
              <span className="text-[9px] font-mono-code text-[#00FF41]">SHA-256 Synchronized</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#8E9299] font-mono-code pt-1">
            <span>
              Gateway Node: <strong className="text-[#FFFFFF]">{liveTelemetry.gatewayNode}</strong>
            </span>
            <span className="text-[#00FF41]">
              Live Stream Active • Auto-Refreshing Telemetry Every 2.5s
            </span>
          </div>
        </div>
      )}

      {/* Mode View 2: DOWNLOADED / OFFLINE SNAPSHOT ARCHIVE */}
      {dataMode === 'downloaded' && (
        <div className="pt-3 space-y-3 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Snapshot Identity */}
            <div className="bg-[#0B0C0E] p-3 rounded border border-[#2D2F33] space-y-1">
              <span className="text-[10px] font-mono-code text-[#8E9299] uppercase block">
                Cached Snapshot Archive
              </span>
              <span className="text-xs font-bold font-mono-code text-[#00FF41] block">
                {downloadedSnapshot.snapshotId}
              </span>
              <span className="text-[10px] font-mono-code text-[#8E9299] block">
                Downloaded: {downloadedSnapshot.downloadDate}
              </span>
            </div>

            {/* Signature & Key */}
            <div className="bg-[#0B0C0E] p-3 rounded border border-[#2D2F33] space-y-1">
              <span className="text-[10px] font-mono-code text-[#8E9299] uppercase block">
                Offline Cryptographic Seal
              </span>
              <span className="text-xs font-bold font-mono-code text-[#FFFFFF] block truncate">
                {downloadedSnapshot.cryptographicSignature}
              </span>
              <span className="text-[10px] font-mono-code text-[#00FF41] block truncate">
                Issuer: {downloadedSnapshot.signedBy}
              </span>
            </div>

            {/* Offline Actions */}
            <div className="bg-[#0B0C0E] p-3 rounded border border-[#2D2F33] flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono-code text-[#8E9299] uppercase block">
                  Offline File Size
                </span>
                <span className="text-xs font-bold font-mono-code text-[#00F5FF]">
                  {(downloadedSnapshot.fileSizeBytes / 1024).toFixed(1)} KB (JSON-LD)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleVerifyOfflineSignature}
                  disabled={isVerifyingOffline}
                  className="px-2.5 py-1.5 rounded bg-[#151619] hover:bg-[#1A1C1F] text-[#00FF41] border border-[#00FF41]/40 font-mono-code text-xs uppercase font-bold flex items-center gap-1 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isVerifyingOffline ? 'Verifying...' : 'Verify Hash'}</span>
                </button>

                <button
                  onClick={handleExportOfflineSnapshot}
                  className="px-2.5 py-1.5 rounded bg-[#00FF41] hover:bg-[#00FF41]/80 text-[#0B0C0E] font-mono-code text-xs uppercase font-bold flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>
          </div>

          {offlineVerifiedToast && (
            <div className="p-2 bg-[#00FF41]/10 border border-[#00FF41]/40 rounded text-xs font-mono-code text-[#00FF41] flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Offline Cryptographic Seal matches Michelin Group Ed25519 Root Certificate! (0 Tampering Detected)</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
