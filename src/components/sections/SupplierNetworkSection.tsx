import React, { useState } from 'react';
import { SupplierNetworkNode, DataProvenance } from '../../types';
import { Network, ShieldCheck, Building2, MapPin, Award, FileSearch, Filter, Flame, CheckCircle2, AlertTriangle, Users } from 'lucide-react';
import { StageNavigationFooter } from '../StageNavigationFooter';

interface SupplierNetworkSectionProps {
  suppliers: SupplierNetworkNode[];
  onOpenProvenance: (prov: DataProvenance) => void;
  onSelectSection?: (section: any) => void;
}

export const SupplierNetworkSection: React.FC<SupplierNetworkSectionProps> = ({
  suppliers,
  onOpenProvenance,
  onSelectSection,
}) => {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>(suppliers[0].id);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterRisk, setFilterRisk] = useState<string>('All');

  const categories = ['All', 'Natural Rubber', 'Synthetic Polymers', 'Bio-Fillers', 'Steel Reinforcement', 'Recovered Carbon Black', 'Textile Reinforcement'];
  const risks = ['All', 'Low', 'Medium', 'High'];

  const filteredSuppliers = suppliers.filter((s) => {
    const matchCat = filterCategory === 'All' || s.category === filterCategory;
    const matchRisk = filterRisk === 'All' || s.riskLevel === filterRisk;
    return matchCat && matchRisk;
  });

  const activeSupplier = suppliers.find((s) => s.id === selectedSupplierId) || filteredSuppliers[0] || suppliers[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-verified text-xs">
              SECTION 06 • VALUE CHAIN
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Tier-1 & Tier-2 Supplier Network & ESG Scorecard
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Interactive supplier ecosystem graph connected to the central Michelin manufacturing hub with audited ESG metrics.
          </p>
        </div>

        {/* Aggregate Supplier Confidence Pill */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs">
          <div>
            <span className="text-[11px] text-slate-500 block font-mono-code uppercase font-semibold">Audited Tier-1 Coverage</span>
            <span className="text-xs font-mono-code font-bold text-emerald-700">100% PASSED VALID AUDIT</span>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs text-slate-500 font-mono-code mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold uppercase whitespace-nowrap transition-colors ${
                filterCategory === c
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500 font-mono-code mr-1">Risk:</span>
          {risks.map((r) => (
            <button
              key={r}
              onClick={() => setFilterRisk(r)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold uppercase transition-colors ${
                filterRisk === r
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Network Graph Visualizer & Supplier Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Dynamic Node Visualizer Graph */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xs min-h-[420px]">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-mono-code font-bold uppercase tracking-wider text-blue-700">
              INTERACTIVE TOPOLOGY HUB
            </span>
            <span className="text-xs text-slate-500 font-mono-code">Click any supplier node</span>
          </div>

          {/* SVG Radial Topology Graph */}
          <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center p-2">
            <svg className="w-full h-full" viewBox="0 0 500 500">
              {/* Radial orbits */}
              <circle cx="250" cy="250" r="180" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="250" cy="250" r="110" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Connecting Lines to Central Hub */}
              {suppliers.map((s, i) => {
                const angle = (i / suppliers.length) * 2 * Math.PI - Math.PI / 2;
                const radius = 180;
                const nodeX = 250 + radius * Math.cos(angle);
                const nodeY = 250 + radius * Math.sin(angle);
                const isSelected = s.id === activeSupplier.id;

                return (
                  <line
                    key={`line-${s.id}`}
                    x1="250"
                    y1="250"
                    x2={nodeX}
                    y2={nodeY}
                    stroke={isSelected ? '#2563eb' : '#cbd5e1'}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                    strokeDasharray={isSelected ? 'none' : '4 3'}
                  />
                );
              })}

              {/* Central Node: Tire Manufacturer */}
              <circle cx="250" cy="250" r="44" fill="#0f172a" stroke="#2563eb" strokeWidth="3" className="shadow-lg" />
              <circle cx="250" cy="250" r="50" fill="none" stroke="#2563eb" strokeWidth="1.5" opacity="0.4" className="animate-pulse" />
              <text x="250" y="246" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="Plus Jakarta Sans">
                MICHELIN
              </text>
              <text x="250" y="260" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">
                FRANCE PLANT
              </text>

              {/* Outer Nodes */}
              {suppliers.map((s, i) => {
                const angle = (i / suppliers.length) * 2 * Math.PI - Math.PI / 2;
                const radius = 180;
                const nodeX = 250 + radius * Math.cos(angle);
                const nodeY = 250 + radius * Math.sin(angle);
                const isSelected = s.id === activeSupplier.id;

                return (
                  <g
                    key={s.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedSupplierId(s.id)}
                  >
                    {isSelected && (
                      <circle
                        cx={nodeX}
                        cy={nodeY}
                        r="26"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                        className="animate-ping"
                        opacity="0.6"
                      />
                    )}
                    <circle
                      cx={nodeX}
                      cy={nodeY}
                      r={isSelected ? '22' : '17'}
                      fill={isSelected ? '#eff6ff' : '#ffffff'}
                      stroke={isSelected ? '#2563eb' : '#94a3b8'}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      className="transition-transform group-hover:scale-110 shadow-sm"
                    />
                    <text
                      x={nodeX}
                      y={nodeY + 4}
                      textAnchor="middle"
                      fill={isSelected ? '#1d4ed8' : '#334155'}
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono"
                      className="pointer-events-none"
                    >
                      {s.tier}
                    </text>
                    <text
                      x={nodeX}
                      y={nodeY + (nodeY > 250 ? 34 : -24)}
                      textAnchor="middle"
                      fill="#0f172a"
                      fontSize="10"
                      fontWeight="600"
                      fontFamily="Plus Jakarta Sans"
                      className="pointer-events-none drop-shadow-sm"
                    >
                      {(s.name || '').split(' ')[0] || ''}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick List Selector */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-100">
            {filteredSuppliers.map((s) => {
              const isSelected = s.id === activeSupplier.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSupplierId(s.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold uppercase transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Supplier Dossier */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-xs space-y-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-blue-700 font-bold uppercase tracking-wider">
                  TIER {activeSupplier.tier} • {activeSupplier.category}
                </span>
                <span className="status-tag tag-green text-xs">
                  {activeSupplier.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {activeSupplier.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1 font-mono-code">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {activeSupplier.city}, {activeSupplier.country} • {activeSupplier.facilityType}
              </p>
            </div>

            {/* ESG & Traceability Metric Tiles */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-500 uppercase font-mono-code block font-semibold">ESG Rating</span>
                <span className="text-lg font-extrabold font-mono-code text-emerald-700 mt-0.5 block">
                  {activeSupplier.esgScore}/100
                </span>
                <span className="text-[10px] text-slate-500 font-mono-code">EcoVadis Gold</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-500 uppercase font-mono-code block font-semibold">Traceability</span>
                <span className="text-lg font-extrabold font-mono-code text-blue-700 mt-0.5 block">
                  {activeSupplier.traceabilityPercentage}%
                </span>
                <span className="text-[10px] text-slate-500 font-mono-code">Batch Level</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-500 uppercase font-mono-code block font-semibold">Risk Level</span>
                <span className="text-lg font-extrabold font-mono-code text-emerald-700 mt-0.5 block">
                  {activeSupplier.riskLevel}
                </span>
                <span className="text-[10px] text-slate-500 font-mono-code">Monitored</span>
              </div>
            </div>

            {/* Materials Supplied */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono-code">
                Supplied Feedstocks & Intermediate Products
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeSupplier.materialsSupplied.map((m, i) => (
                  <span
                    key={i}
                    className="status-tag tag-verified text-xs"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <div className="pt-2 flex items-center justify-between text-xs text-slate-600 border-t border-slate-200 font-mono-code">
                <span>Carbon Intensity: <strong className="text-blue-700">{activeSupplier.carbonIntensityKgCO2e} kg CO₂e/kg</strong></span>
                <span>Contract: <strong className="text-slate-900">{activeSupplier.contractsRenewed}</strong></span>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 font-mono-code">
                Audited Standards & Certifications
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeSupplier.certifications.map((c, i) => (
                  <span
                    key={i}
                    className="status-tag tag-green text-xs flex items-center gap-1"
                  >
                    <Award className="w-3 h-3 text-emerald-600" /> {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Provenance Button */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono-code">
              Last Audit: {activeSupplier.lastAuditDate}
            </span>
            <button
              onClick={() => onOpenProvenance(activeSupplier.provenance)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono-code font-bold uppercase transition-colors shadow-2xs"
            >
              <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
              <span>SOURCE: {activeSupplier.provenance.sourceDoc}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stage Navigation Footer to Eco-Manufacturing */}
      <StageNavigationFooter activeSection="supply-chain" onSelectSection={onSelectSection || (() => {})} />
    </div>
  );
};
