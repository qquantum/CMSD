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
  FileCode2
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
    <header className="sticky top-0 z-40 w-full bg-[#0B0C0E] border-b border-[#2D2F33]">
      {/* Top Demo Data & Regulatory Strip */}
      <div className="w-full bg-[#0B0C0E] border-b border-[#2D2F33] px-4 py-1 flex items-center justify-between text-[11px] text-[#8E9299]">
        <div className="flex items-center gap-3">
          <span className="status-tag tag-verified text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse"></span>
            MICHELIN GROUP DPP ENTERPRISE v2.4
          </span>
          <span className="hidden sm:inline text-[#2D2F33]">|</span>
          <span className="hidden sm:inline text-[#8E9299]">
            EU ESPR DPP Registry (2024/1781) • EPREL #1488204 • ISO 14067 EPD
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono-code text-[11px]">
          <span className="text-[#8E9299] flex items-center gap-1">
            <span className="text-[#8E9299]">PASSPORT ID:</span> 
            <strong className="text-[#00F5FF]">{activeTire.passportId}</strong>
          </span>
          <span className="hidden md:inline text-[#2D2F33]">|</span>
          <span className="hidden md:inline text-[#8E9299]">
            Plant: <strong className="text-[#FFFFFF]">Clermont-Ferrand (FR)</strong>
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-sm bg-white text-black font-black">
            <div className="w-5 h-5 border-4 border-black rounded-full"></div>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00FF41] ring-2 ring-[#0B0C0E]"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-tech text-base sm:text-lg font-bold tracking-tight text-white uppercase">
                MICHELIN<span className="text-[#00F5FF] font-light">·DPP</span>
              </span>
              <span className="status-tag tag-verified">
                <ShieldCheck className="w-3 h-3" />
                Passport Verified
              </span>
            </div>
            <p className="text-[11px] text-[#8E9299] font-mono-code hidden sm:block">
              {activeTire.productName} • {activeTire.tireSize}
            </p>
          </div>
        </div>

        {/* Center Search Input */}
        <div className="hidden lg:flex flex-1 max-w-xs xl:max-w-sm">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9299]" />
            <input
              id="passport-quick-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search serial, VIN, GTIN, or plant..."
              className="w-full pl-9 pr-8 py-1.5 bg-[#151619] border border-[#2D2F33] rounded text-xs text-[#FFFFFF] placeholder-[#8E9299] focus:outline-none focus:border-[#00F5FF] transition-colors font-mono-code"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#8E9299] hover:text-[#FFFFFF]"
              >
                ✕
              </button>
            )}
          </form>
        </div>

        {/* Actions & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 3D Studio Shortcut */}
          {onOpen3DStudio && (
            <button
              onClick={onOpen3DStudio}
              title="Launch 3D WebGL Exploded Twin & Storyboard"
              className="flex items-center gap-1.5 px-3 py-2 rounded bg-[#00F5FF]/10 hover:bg-[#00F5FF]/20 border border-[#00F5FF]/40 text-[#00F5FF] text-xs font-bold font-mono-code uppercase transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D Twin</span>
            </button>
          )}

          {/* Code Studio Shortcut */}
          {onOpenCodeStudio && (
            <button
              onClick={onOpenCodeStudio}
              title="View & Copy Recreation Source Code"
              className="flex items-center gap-1.5 px-2.5 py-2 rounded bg-[#151619] border border-[#2D2F33] hover:border-[#3D4046] text-[#8E9299] hover:text-[#FFFFFF] text-xs font-bold font-mono-code uppercase transition-colors"
            >
              <FileCode2 className="w-3.5 h-3.5 text-[#00FF41]" />
              <span className="hidden md:inline">Code</span>
            </button>
          )}

          {/* Signature Feature: Trace My Tire */}
          <button
            id="trace-my-tire-btn"
            onClick={onOpenTraceModal}
            className="relative group flex items-center gap-2 px-3 sm:px-4 py-2 rounded bg-[#00F5FF] hover:bg-[#38f7ff] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#00F5FF]/10 transition-all active:scale-95"
          >
            <Compass className="w-4 h-4 text-black group-hover:rotate-45 transition-transform duration-300" />
            <span>TRACE</span>
            <span className="hidden md:inline-block px-1.5 py-0.2 rounded bg-black/15 text-[9px] font-mono-code font-bold">
              10-STEP
            </span>
          </button>

          {/* Compare Button */}
          <button
            id="open-compare-btn"
            onClick={onOpenCompareModal}
            title="Compare with Conventional & Prototype Tires"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded bg-[#151619] border border-[#2D2F33] hover:border-[#3D4046] text-[#FFFFFF] text-xs font-semibold transition-colors"
          >
            <Layers className="w-4 h-4 text-[#00F5FF]" />
            <span className="hidden sm:inline">Compare</span>
          </button>

          {/* QR Code Trigger */}
          <button
            id="open-qr-btn"
            onClick={onOpenQrModal}
            title="View DPP QR / Data Matrix Identifier"
            className="p-2 rounded bg-[#151619] border border-[#2D2F33] hover:border-[#3D4046] text-[#00F5FF] hover:text-[#FFFFFF] transition-colors"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {/* Export Button */}
          <button
            id="open-export-btn"
            onClick={onOpenExportModal}
            title="Export Passport as JSON, CSV or PDF"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded bg-[#151619] border border-[#2D2F33] hover:border-[#3D4046] text-[#8E9299] hover:text-[#FFFFFF] text-xs font-bold font-mono-code uppercase transition-colors"
          >
            <Download className="w-4 h-4 text-[#00FF41]" />
            <span className="hidden md:inline">Export</span>
          </button>

          {/* Role Switcher Menu */}
          <div className="relative">
            <button
              id="role-switcher-toggle"
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded bg-[#151619] border border-[#2D2F33] hover:border-[#00F5FF]/60 text-[#FFFFFF] text-xs font-semibold transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-[#00FF41]"></div>
              <span className="capitalize">{currentRole}</span>
              <span className="text-[10px] text-[#8E9299] uppercase tracking-wider hidden sm:inline">Role</span>
            </button>

            {showRoleMenu && (
              <div 
                id="role-dropdown-menu"
                className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#151619] border border-[#2D2F33] rounded-lg shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-3 py-2 border-b border-[#2D2F33]">
                  <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider font-mono-code">
                    Select Perspective Role
                  </span>
                  <p className="text-[11px] text-[#8E9299]">Adapts disclosure depth & technical indicators</p>
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
                        className={`w-full flex items-start gap-3 p-2.5 rounded text-left transition-colors ${
                          isSelected 
                            ? 'bg-[#00F5FF]/10 border border-[#00F5FF]/40 text-[#00F5FF]' 
                            : 'hover:bg-[#1A1C1F] text-[#8E9299] hover:text-[#FFFFFF]'
                        }`}
                      >
                        <div className={`p-2 rounded mt-0.5 ${isSelected ? 'bg-[#00F5FF]/20 text-[#00F5FF]' : 'bg-[#0B0C0E] text-[#8E9299]'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-tech tracking-wide">{item.label}</span>
                            {isSelected && <span className="text-[9px] font-mono-code text-[#00F5FF] uppercase font-bold">Active</span>}
                          </div>
                          <p className="text-[11px] text-[#8E9299] leading-snug mt-0.5">{item.desc}</p>
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
