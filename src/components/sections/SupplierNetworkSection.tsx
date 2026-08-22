import React, { useState } from 'react';
import { SupplierNetworkNode, DataProvenance } from '../../types';
import { Network, ShieldCheck, Building2, MapPin, Award, FileSearch, Filter, Flame, CheckCircle2, AlertTriangle, Users } from 'lucide-react';

interface SupplierNetworkSectionProps {
  suppliers: SupplierNetworkNode[];
  onOpenProvenance: (prov: DataProvenance) => void;
}

export const SupplierNetworkSection: React.FC<SupplierNetworkSectionProps> = ({
  suppliers,
  onOpenProvenance,
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
            <span className="status-tag tag-verified">
              SECTION 06
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-tech tracking-wide uppercase">
              Tier-1 & Tier-2 Supplier Network & ESG Scorecard
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9299] mt-1.5">
            Interactive supplier ecosystem graph connected to the central AeroCrest manufacturing hub with audited ESG metrics.
          </p>
        </div>

        {/* Aggregate Supplier Confidence Pill */}
        <div className="flex items-center gap-3 bg-[#151619] border border-[#2D2F33] px-3.5 py-2 rounded">
          <div>
            <span className="text-[10px] text-[#8E9299] block font-mono-code uppercase">Audited Tier-1 Coverage</span>
            <span className="text-xs font-mono-code font-bold text-[#00FF41]">100% PASSED VALID AUDIT</span>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#151619] border border-[#2D2F33] p-2.5 rounded">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs text-[#8E9299] font-mono-code mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              className={`px-2.5 py-1 rounded text-xs font-mono-code font-bold uppercase whitespace-nowrap transition-colors ${
                filterCategory === c
                  ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]'
                  : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[#8E9299] font-mono-code mr-1">Risk:</span>
          {risks.map((r) => (
            <button
              key={r}
              onClick={() => setFilterRisk(r)}
              className={`px-2 py-1 rounded text-xs font-mono-code font-bold uppercase transition-colors ${
                filterRisk === r
                  ? 'bg-[#00FF41]/15 text-[#00FF41] border border-[#00FF41]'
                  : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33]'
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
        <div className="lg:col-span-7 bg-[#151619] border border-[#2D2F33] rounded-lg p-6 flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[420px]">
          <div className="flex items-center justify-between text-xs text-[#8E9299] mb-2">
            <span className="font-mono-code font-bold uppercase tracking-wider text-[#00F5FF]">
              INTERACTIVE TOPOLOGY HUB
            </span>
            <span className="text-[10px] text-[#8E9299] font-mono-code">Click any supplier node</span>
          </div>

          {/* SVG Radial Topology Graph */}
          <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center p-2">
            <svg className="w-full h-full" viewBox="0 0 500 500">
              {/* Radial orbits */}
              <circle cx="250" cy="250" r="180" fill="none" stroke="#2D2F33" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="250" cy="250" r="110" fill="none" stroke="#2D2F33" strokeWidth="1" strokeDasharray="3 3" />

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
                    stroke={isSelected ? '#00F5FF' : '#2D2F33'}
                    strokeWidth={isSelected ? '2' : '1'}
                    strokeDasharray={isSelected ? 'none' : '3 2'}
                  />
                );
              })}

              {/* Central Node: Tire Manufacturer */}
              <circle cx="250" cy="250" r="42" fill="#0B0C0E" stroke="#00F5FF" strokeWidth="2" />
              <circle cx="250" cy="250" r="48" fill="none" stroke="#00F5FF" strokeWidth="1" opacity="0.3" className="animate-pulse" />
              <text x="250" y="246" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="Chakra Petch">
                AEROCREST
              </text>
              <text x="250" y="258" textAnchor="middle" fill="#8E9299" fontSize="8" fontFamily="JetBrains Mono">
                PLANT #4 (FR)
              </text>

              {/* Outer Supplier Nodes */}
              {suppliers.map((s, i) => {
                const angle = (i / suppliers.length) * 2 * Math.PI - Math.PI / 2;
                const radius = 180;
                const nodeX = 250 + radius * Math.cos(angle);
                const nodeY = 250 + radius * Math.sin(angle);
                const isSelected = s.id === activeSupplier.id;

                return (
                  <g
                    key={`node-${s.id}`}
                    className="cursor-pointer group"
                    onClick={() => setSelectedSupplierId(s.id)}
                  >
                    {isSelected && (
                      <circle
                        cx={nodeX}
                        cy={nodeY}
                        r="28"
                        fill="none"
                        stroke="#00F5FF"
                        strokeWidth="2"
                        className="animate-ping"
                      />
                    )}
                    <circle
                      cx={nodeX}
                      cy={nodeY}
                      r={isSelected ? '20' : '16'}
                      fill={isSelected ? '#151619' : '#0B0C0E'}
                      stroke={isSelected ? '#00F5FF' : '#2D2F33'}
                      strokeWidth="2"
                      className="transition-all group-hover:scale-110"
                    />
                    <text
                      x={nodeX}
                      y={nodeY + 4}
                      textAnchor="middle"
                      fill={isSelected ? '#00F5FF' : '#FFFFFF'}
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono"
                      className="pointer-events-none"
                    >
                      {s.esgScore}
                    </text>
                    <text
                      x={nodeX}
                      y={nodeY + 32}
                      textAnchor="middle"
                      fill="#8E9299"
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                      className="pointer-events-none"
                    >
                      {s.country}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#2D2F33]">
            {filteredSuppliers.map((s) => {
              const isSelected = s.id === activeSupplier.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSupplierId(s.id)}
                  className={`px-2.5 py-1 rounded text-xs font-mono-code font-bold uppercase transition-all ${
                    isSelected
                      ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]'
                      : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33]'
                  }`}
                >
                  {s.name} ({s.country})
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Supplier Dossier */}
        <div className="lg:col-span-5 bg-[#151619] border border-[#2D2F33] rounded-lg p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-code text-[#00F5FF] font-bold uppercase tracking-wider">
                  TIER-{activeSupplier.tier} VERIFIED PARTNER
                </span>
                <span className="status-tag tag-green">
                  {activeSupplier.auditStatus}
                </span>
              </div>
              <h3 className="text-xl font-bold font-tech text-[#FFFFFF] mt-1">
                {activeSupplier.name}
              </h3>
              <p className="text-xs text-[#8E9299] mt-0.5 flex items-center gap-1 font-mono-code">
                <MapPin className="w-3.5 h-3.5 text-[#00FF41]" />
                {activeSupplier.city}, {activeSupplier.country} • {activeSupplier.facilityType}
              </p>
            </div>

            {/* ESG & Traceability Metric Tiles */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#0B0C0E] border border-[#2D2F33] p-2.5 rounded text-center">
                <span className="text-[10px] text-[#8E9299] uppercase font-mono-code block">ESG Rating</span>
                <span className="text-lg font-extrabold font-mono-code text-[#00FF41] mt-0.5 block">
                  {activeSupplier.esgScore}/100
                </span>
                <span className="text-[9px] text-[#8E9299] font-mono-code">EcoVadis Gold</span>
              </div>

              <div className="bg-[#0B0C0E] border border-[#2D2F33] p-2.5 rounded text-center">
                <span className="text-[10px] text-[#8E9299] uppercase font-mono-code block">Traceability</span>
                <span className="text-lg font-extrabold font-mono-code text-[#00F5FF] mt-0.5 block">
                  {activeSupplier.traceabilityPercentage}%
                </span>
                <span className="text-[9px] text-[#8E9299] font-mono-code">Batch Level</span>
              </div>

              <div className="bg-[#0B0C0E] border border-[#2D2F33] p-2.5 rounded text-center">
                <span className="text-[10px] text-[#8E9299] uppercase font-mono-code block">Risk Level</span>
                <span className="text-lg font-extrabold font-mono-code text-[#00FF41] mt-0.5 block">
                  {activeSupplier.riskLevel}
                </span>
                <span className="text-[9px] text-[#8E9299] font-mono-code">Monitored</span>
              </div>
            </div>

            {/* Materials Supplied */}
            <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3.5 rounded space-y-1.5">
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block font-mono-code">
                Supplied Feedstocks & Intermediate Products
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeSupplier.materialsSupplied.map((m, i) => (
                  <span
                    key={i}
                    className="status-tag tag-verified"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <div className="pt-2 flex items-center justify-between text-xs text-[#8E9299] border-t border-[#2D2F33] font-mono-code text-[11px]">
                <span>Carbon Intensity: <strong className="text-[#00F5FF]">{activeSupplier.carbonIntensityKgCO2e} kg CO₂e/kg</strong></span>
                <span>Contract: <strong className="text-[#FFFFFF]">{activeSupplier.contractsRenewed}</strong></span>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block mb-1.5 font-mono-code">
                Audited Standards & Certifications
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeSupplier.certifications.map((c, i) => (
                  <span
                    key={i}
                    className="status-tag tag-green flex items-center gap-1"
                  >
                    <Award className="w-3 h-3 text-[#00FF41]" /> {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Provenance Button */}
          <div className="mt-5 pt-3 border-t border-[#2D2F33] flex items-center justify-between">
            <span className="text-xs text-[#8E9299] font-mono-code text-[11px]">
              Last Audit: {activeSupplier.lastAuditDate}
            </span>
            <button
              onClick={() => onOpenProvenance(activeSupplier.provenance)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B0C0E] hover:bg-[#1A1C1F] border border-[#2D2F33] text-[#00F5FF] text-xs font-mono-code font-bold uppercase transition-colors"
            >
              <FileSearch className="w-3.5 h-3.5" />
              [SOURCE: {activeSupplier.provenance.sourceDoc}]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
