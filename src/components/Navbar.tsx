import React, { useState } from 'react';
import { UserRole, TirePassportData } from '../types';
import { 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Download, 
  Search, 
  UserCheck, 
  Factory, 
  Truck, 
  Recycle, 
  Scale, 
  QrCode,
  Compass,
  Info,
  FileCode2,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  activeTire: TirePassportData;
  onOpenTraceModal: () => void;
  onOpenCompareModal: () => void;
  onOpenExportModal: () => void;
  onOpenQrModal: () => void;
  onSearchPassport: (query: string) => void;
  onOpen3DStudio?: () => void;
  onOpenCodeStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  activeTire,
  onOpenTraceModal,
  onOpenCompareModal,
  onOpenExportModal,
  onOpenQrModal,
  onSearchPassport,
  onOpen3DStudio,
  onOpenCodeStudio,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roles: { role: UserRole; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    { role: 'consumer', label: 'Consumer', icon: UserCheck, desc: 'Simple, visual summary: materials, safety, carbon, EV range, maintenance & recycling' },
    { role: 'manufacturer', label: 'Manufacturer', icon: Factory, desc: 'Full engineering telemetry: Scope 1/2/3, raw material bills, plant energy, supplier risk' },
    { role: 'supplier', label: 'Supplier', icon: Truck, desc: 'Chain-of-custody, batch lot traceability, ESG ratings, ISCC PLUS certificates' },
    { role: 'recycler', label: 'Recycler', icon: Recycle, desc: 'Casing retreadability, pyrolysis yield, devulcanization mass balance, rCB output' },
    { role: 'regulator', label: 'Regulator / Auditor', icon: Scale, desc: 'EU ESPR conformity, EUDR GPS polygon audit, EPREL verification, REACH compliance' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchPassport(searchQuery.trim());
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-2xs">
      {/* Top Demo Data & Regulatory Strip */}
      <div className="w-full bg-slate-50 border-b border-slate-200 px-4 py-1.5 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <span className="status-tag tag-verified text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            MICHELIN GROUP DPP • OFFICIAL REGISTER
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:inline text-slate-600 font-medium">
            EU ESPR (2024/1781) • EPREL #1488204 • ISO 14067 LCA Audited
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono-code text-xs">
          <span className="text-slate-500 flex items-center gap-1.5">
            <span>PASSPORT ID:</span> 
            <strong className="text-blue-800 font-bold">{activeTire.passportId}</strong>
          </span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:inline text-slate-500">
            Plant: <strong className="text-slate-800 font-medium">Clermont-Ferrand (FR)</strong>
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[#003087] text-white font-black shadow-xs">
            <div className="w-5 h-5 border-3 border-white rounded-full"></div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-[#003087] uppercase">
                MICHELIN<span className="text-blue-600 font-bold">·DPP</span>
              </span>
              <span className="status-tag tag-verified">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Passport Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono-code hidden sm:block">
              {activeTire.productName} • {activeTire.tireSize}
            </p>
          </div>
        </div>

        {/* Center Search Input */}
        <div className="hidden lg:flex flex-1 max-w-xs xl:max-w-sm">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="passport-quick-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search serial, VIN, GTIN, or plant..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors font-mono-code"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            )}
          </form>
        </div>

        {/* Actions & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* 3D Studio Shortcut */}
          {onOpen3DStudio && (
            <button
              onClick={onOpen3DStudio}
              title="Launch 3D WebGL Exploded Twin & Storyboard"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold font-mono-code uppercase transition-all shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">3D Twin</span>
            </button>
          )}

          {/* Code Studio Shortcut */}
          {onOpenCodeStudio && (
            <button
              onClick={onOpenCodeStudio}
              title="View & Copy Recreation Source Code"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold font-mono-code uppercase transition-colors shadow-2xs"
            >
              <FileCode2 className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden md:inline">Code</span>
            </button>
          )}

          {/* Signature Feature: Trace My Tire */}
          <button
            id="trace-my-tire-btn"
            onClick={onOpenTraceModal}
            className="relative group flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wide shadow-sm transition-all active:scale-95"
          >
            <Compass className="w-4 h-4 text-blue-100 group-hover:rotate-45 transition-transform duration-300" />
            <span>TRACE</span>
            <span className="hidden md:inline-block px-1.5 py-0.2 rounded bg-white/20 text-[10px] font-mono-code font-bold">
              10-STEP
            </span>
          </button>

          {/* Compare Button */}
          <button
            id="open-compare-btn"
            onClick={onOpenCompareModal}
            title="Compare with Conventional & Prototype Tires"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors shadow-2xs"
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Compare</span>
          </button>

          {/* QR Code Trigger */}
          <button
            id="open-qr-btn"
            onClick={onOpenQrModal}
            title="View DPP QR / Data Matrix Identifier"
            className="p-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors shadow-2xs"
          >
            <QrCode className="w-4 h-4 text-slate-700" />
          </button>

          {/* Export Button */}
          <button
            id="open-export-btn"
            onClick={onOpenExportModal}
            title="Export Passport as JSON, CSV or PDF"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold font-mono-code uppercase transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">Export</span>
          </button>

          {/* Role Switcher Menu */}
          <div className="relative">
            <button
              id="role-switcher-toggle"
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold transition-all shadow-2xs"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="capitalize font-bold">{currentRole}</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider hidden sm:inline">Role</span>
            </button>

            {showRoleMenu && (
              <div 
                id="role-dropdown-menu"
                className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-3 py-2 border-b border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono-code">
                    Select Perspective Role
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">Adapts disclosure depth & technical indicators</p>
                </div>
                <div className="space-y-1 mt-1">
                  {roles.map((item) => {
                    const Icon = item.icon;
                    const isSelected = currentRole === item.role;
                    return (
                      <button
                        key={item.role}
                        onClick={() => {
                          onSelectRole(item.role);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-colors ${
                          isSelected 
                            ? 'bg-blue-50 border border-blue-200 text-blue-900' 
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className={`p-2 rounded-md mt-0.5 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{item.label}</span>
                            {isSelected && <span className="text-[10px] font-mono-code text-blue-700 uppercase font-bold">Active</span>}
                          </div>
                          <p className="text-xs text-slate-500 leading-snug mt-0.5">{item.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
