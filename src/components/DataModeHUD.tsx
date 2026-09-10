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
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 mb-6 shadow-xs transition-all">
      {/* Mode Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold font-mono-code text-slate-500 uppercase tracking-wider">
            DATA RECEPTION STREAM:
          </span>
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => onToggleDataMode('live')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono-code uppercase font-bold transition-all ${
                dataMode === 'live'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${dataMode === 'live' ? 'bg-emerald-300 animate-ping' : 'bg-slate-400'}`} />
              <Activity className="w-3.5 h-3.5" />
              <span>1. Live Telemetry Stream</span>
            </button>

            <button
              onClick={() => onToggleDataMode('downloaded')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono-code uppercase font-bold transition-all ${
                dataMode === 'downloaded'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>2. Downloaded / Offline VC</span>
            </button>
          </div>
        </div>

        {/* Status Tag */}
        <div>
          {dataMode === 'live' ? (
            <div className="flex items-center gap-2">
              <span className="status-tag tag-verified text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                GDSO RFID / MQTT IoT CONNECTED (14ms)
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="status-tag tag-blue text-xs">
                <Lock className="w-3 h-3 text-blue-600" />
                OFFLINE VERIFIABLE CREDENTIAL CACHED (148.5 KB)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Mode View 1: LIVE TELEMETRY HUD */}
      {dataMode === 'live' && (
        <div className="pt-3 space-y-3 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Pressure */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-slate-500 text-[11px] font-mono-code uppercase font-semibold">
                <span>Cavity Pressure</span>
                <Gauge className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-xl font-bold font-mono-code text-slate-900">
                  {dynamicPressure}
                </span>
                <span className="text-xs font-mono-code text-slate-500 font-semibold">bar</span>
              </div>
              <span className="text-[11px] font-mono-code font-bold text-emerald-700 block mt-0.5">
                Nominal ±0.02 bar
              </span>
            </div>

            {/* Temperature */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-slate-500 text-[11px] font-mono-code uppercase font-semibold">
                <span>Cavity Temp</span>
                <Thermometer className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-xl font-bold font-mono-code text-amber-700">
                  {dynamicTemp}°
                </span>
                <span className="text-xs font-mono-code text-slate-500 font-semibold">C</span>
              </div>
              <span className="text-[11px] font-mono-code text-slate-600 block mt-0.5 font-medium">
                Thermal Stable
              </span>
            </div>

            {/* Tread Depth */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-slate-500 text-[11px] font-mono-code uppercase font-semibold">
                <span>Tread Depth</span>
                <Activity className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-xl font-bold font-mono-code text-emerald-700">
                  {liveTelemetry.remainingTreadDepthMm}
                </span>
                <span className="text-xs font-mono-code text-slate-500 font-semibold">/ 7.0 mm</span>
              </div>
              <span className="text-[11px] font-mono-code font-bold text-emerald-700 block mt-0.5">
                97.1% Life Remaining
              </span>
            </div>

            {/* Live Odometer */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-slate-500 text-[11px] font-mono-code uppercase font-semibold">
                <span>Live Odometer</span>
                <Radio className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-xl font-bold font-mono-code text-slate-900">
                  {liveTelemetry.odometerKm.toLocaleString()}
                </span>
                <span className="text-xs font-mono-code text-slate-500 font-semibold">km</span>
              </div>
              <span className="text-[11px] font-mono-code text-slate-600 block mt-0.5 font-medium">
                Target: 65,000 km
              </span>
            </div>

            {/* Live Rolling Resistance */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-slate-500 text-[11px] font-mono-code uppercase font-semibold">
                <span>Rolling Loss</span>
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-xl font-bold font-mono-code text-blue-700">
                  {liveTelemetry.rollingResistanceLiveKgTonne}
                </span>
                <span className="text-xs font-mono-code text-slate-500 font-semibold">kg/t</span>
              </div>
              <span className="text-[11px] font-mono-code font-bold text-emerald-700 block mt-0.5">
                Class A Efficiency
              </span>
            </div>

            {/* Merkle Root Check */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-slate-500 text-[11px] font-mono-code uppercase font-semibold">
                <span>Ledger Root</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-1.5">
                <span className="text-sm font-mono-code font-bold text-emerald-800 block truncate">
                  0x8f2a...c210b
                </span>
              </div>
              <span className="text-[11px] font-mono-code text-slate-600 block mt-0.5 font-medium">
                SHA-256 Synchronized
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 font-mono-code pt-1">
            <span>
              Gateway Node: <strong className="text-slate-800">{liveTelemetry.gatewayNode}</strong>
            </span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Live Stream Active • Telemetry Auto-Refreshes Every 2.5s
            </span>
          </div>
        </div>
      )}

      {/* Mode View 2: DOWNLOADED / OFFLINE SNAPSHOT ARCHIVE */}
      {dataMode === 'downloaded' && (
        <div className="pt-3 space-y-3 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Snapshot Identity */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[11px] font-mono-code text-slate-500 uppercase font-semibold block">
                Cached Snapshot Archive
              </span>
              <span className="text-sm font-bold font-mono-code text-slate-900 block">
                {downloadedSnapshot.snapshotId}
              </span>
              <span className="text-xs font-mono-code text-slate-600 block">
                Downloaded: {downloadedSnapshot.downloadDate}
              </span>
            </div>

            {/* Signature & Key */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[11px] font-mono-code text-slate-500 uppercase font-semibold block">
                Offline Cryptographic Seal
              </span>
              <span className="text-xs font-bold font-mono-code text-slate-800 block truncate">
                {downloadedSnapshot.cryptographicSignature}
              </span>
              <span className="text-xs font-mono-code font-bold text-emerald-700 block truncate">
                Issuer: {downloadedSnapshot.signedBy}
              </span>
            </div>

            {/* Offline Actions */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-mono-code text-slate-500 uppercase font-semibold block">
                  Offline File Size
                </span>
                <span className="text-sm font-bold font-mono-code text-blue-700">
                  {(downloadedSnapshot.fileSizeBytes / 1024).toFixed(1)} KB (JSON-LD)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleVerifyOfflineSignature}
                  disabled={isVerifyingOffline}
                  className="px-3 py-1.5 rounded-md bg-white hover:bg-slate-100 text-emerald-700 border border-emerald-300 font-mono-code text-xs uppercase font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isVerifyingOffline ? 'Verifying...' : 'Verify Hash'}</span>
                </button>

                <button
                  onClick={handleExportOfflineSnapshot}
                  className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-mono-code text-xs uppercase font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>
          </div>

          {offlineVerifiedToast && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-mono-code text-emerald-800 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Offline Cryptographic Seal matches Michelin Group Ed25519 Root Certificate! (0 Tampering Detected)</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
