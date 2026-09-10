import React, { useState } from 'react';
import { GeoOriginNode, DataProvenance } from '../../types';
import { Globe2, MapPin, ShieldAlert, CheckCircle2, AlertTriangle, Building2, Truck, Leaf, FileSearch, Factory, Recycle, Layers } from 'lucide-react';
import { StageNavigationFooter } from '../StageNavigationFooter';

interface RawMaterialOriginSectionProps {
  originNodes: GeoOriginNode[];
  onOpenProvenance: (prov: DataProvenance) => void;
  onSelectSection?: (section: any) => void;
}

export const RawMaterialOriginSection: React.FC<RawMaterialOriginSectionProps> = ({
  originNodes,
  onOpenProvenance,
  onSelectSection,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(originNodes[0].id);
  const [filterType, setFilterType] = useState<string>('All');

  const types = ['All', 'Raw Material Origin', 'Processing Facility', 'Supplier', 'Tire Factory', 'Recycling Facility'];

  const filteredNodes = originNodes.filter((node) => {
    return filterType === 'All' || node.type === filterType;
  });

  const activeNode = originNodes.find((n) => n.id === selectedNodeId) || filteredNodes[0] || originNodes[0];

  const getNodeMarkerColor = (type: string) => {
    switch (type) {
      case 'Raw Material Origin':
        return '#059669'; // Green
      case 'Processing Facility':
        return '#2563eb'; // Blue
      case 'Supplier':
        return '#64748b'; // Slate
      case 'Tire Factory':
        return '#1d4ed8'; // Dark Blue
      case 'Recycling Facility':
        return '#059669'; // Green
      default:
        return '#64748b';
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'tag-green';
      case 'Medium':
        return 'tag-verified';
      case 'High':
        return 'tag-supplier';
      default:
        return 'tag-supplier';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="status-tag tag-verified text-xs">
              SECTION 04 • GEOGRAPHY
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Global Supply Chain Geography & Raw Material Origin
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Geographic coordinates, environmental risk intelligence, and supply-chain tier mapping from extraction to tire assembly.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2.5 bg-white border border-slate-200 p-2.5 rounded-xl text-xs font-mono-code uppercase shadow-2xs">
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Raw Origin
          </span>
          <span className="flex items-center gap-1.5 text-blue-700 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Processing
          </span>
          <span className="flex items-center gap-1.5 text-indigo-700 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> Factory
          </span>
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Recycler
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-white border border-slate-200 p-2 rounded-xl shadow-2xs">
        <span className="text-xs text-slate-500 font-mono-code mr-2 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" /> Node Type:
        </span>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold uppercase whitespace-nowrap transition-colors ${
              filterType === t
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive World Map & Country Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Custom Interactive SVG World Map */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xs min-h-[420px]">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-mono-code font-bold uppercase tracking-wider text-blue-700">
              GLOBAL VALUE CHAIN MAP (REAL COORDINATES)
            </span>
            <span className="text-xs text-slate-500 font-mono-code">Click node marker to focus</span>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full aspect-[16/9] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center p-2">
            {/* World Map Outline SVG */}
            <svg className="w-full h-full text-neutral-800" viewBox="0 0 1000 500">
              {/* Lat/Long Grid Lines */}
              <defs>
                <pattern id="grid-light" width="100" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 50" fill="none" stroke="#e2e8f0" strokeWidth="0.75" />
                </pattern>
              </defs>
              <rect width="1000" height="500" fill="url(#grid-light)" />

              {/* Simplified World Continents Path Outlines */}
              {/* North America */}
              <path
                d="M 150 100 Q 220 80 280 120 Q 260 200 200 240 Q 150 200 130 150 Z"
                fill="#e2e8f0"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              {/* South America */}
              <path
                d="M 280 260 Q 340 300 320 400 Q 280 440 250 350 Z"
                fill="#e2e8f0"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              {/* Europe */}
              <path
                d="M 460 110 Q 540 100 560 150 Q 520 200 470 180 Q 450 140 460 110 Z"
                fill="#cbd5e1"
                stroke="#94a3b8"
                strokeWidth="1.5"
              />
              {/* Africa */}
              <path
                d="M 460 200 Q 540 210 560 290 Q 520 390 480 340 Q 450 250 460 200 Z"
                fill="#e2e8f0"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              {/* Asia */}
              <path
                d="M 580 100 Q 750 80 850 140 Q 820 260 740 280 Q 640 240 580 180 Z"
                fill="#e2e8f0"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              {/* Southeast Asia & Indonesia */}
              <path
                d="M 740 280 Q 820 300 800 360 Q 750 350 730 300 Z"
                fill="#cbd5e1"
                stroke="#94a3b8"
                strokeWidth="1.5"
              />
              {/* Australia */}
              <path
                d="M 800 370 Q 880 380 860 440 Q 800 450 780 400 Z"
                fill="#e2e8f0"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />

              {/* Geo Flow Curved Arcs to French Tire Factory (approx coordinate 470, 160) */}
              {/* Thailand to France */}
              <path
                d="M 760 280 Q 620 180 480 160"
                fill="none"
                stroke="#059669"
                strokeWidth="2"
                strokeDasharray="5 3"
                opacity="0.9"
              />
              {/* Côte d'Ivoire to France */}
              <path
                d="M 470 260 Q 460 210 480 160"
                fill="none"
                stroke="#059669"
                strokeWidth="2"
                strokeDasharray="5 3"
                opacity="0.9"
              />
              {/* Germany to France */}
              <path
                d="M 510 140 L 480 160"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                strokeDasharray="4 2"
                opacity="0.9"
              />
              {/* Italy to France */}
              <path
                d="M 500 170 L 480 160"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
                strokeDasharray="4 2"
                opacity="0.9"
              />
              {/* Recycler Lens to Factory */}
              <path
                d="M 485 145 L 480 160"
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                opacity="0.9"
              />

              {/* Node Pins */}
              {originNodes.map((node) => {
                const lat = node.coordinates[0];
                const lng = node.coordinates[1];
                const x = ((lng + 180) / 360) * 1000;
                const y = ((90 - lat) / 180) * 500;

                const isSelected = node.id === activeNode.id;
                const color = getNodeMarkerColor(node.type);

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedNodeId(node.id)}
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r="18"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        opacity="0.7"
                        className="animate-ping"
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? '9' : '6'}
                      fill={color}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="transition-transform group-hover:scale-125 shadow-md"
                    />
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      fill="#0f172a"
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="JetBrains Mono"
                      className="pointer-events-none drop-shadow-sm"
                    >
                      {node.country}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Node Selector Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            {originNodes.map((node) => {
              const isSelected = node.id === activeNode.id;
              const color = getNodeMarkerColor(node.type);
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold uppercase flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: isSelected ? '#ffffff' : color }}></span>
                  <span>{node.country} ({node.category})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Geographic Node Detailed Intelligence Dossier */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-xs space-y-4">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-blue-700 font-bold uppercase tracking-wider">
                  TIER-{activeNode.tier} SUPPLY FACILITY
                </span>
                <span className="status-tag tag-verified text-xs">
                  {activeNode.type}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-2xl font-bold text-slate-900">
                  {activeNode.country}
                </h3>
                <span className="text-xs font-mono-code text-slate-500 font-semibold">
                  [{activeNode.isoCode}]
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {activeNode.material} • Supplied by <strong className="text-blue-700 font-semibold">{activeNode.supplier}</strong>
              </p>
            </div>

            {/* Facility Details */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 flex items-center gap-1">
                  <Factory className="w-3.5 h-3.5 text-blue-600" /> Facility:
                </span>
                <span className="font-semibold text-slate-900">{activeNode.facility}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Coordinates:
                </span>
                <span className="font-mono-code text-slate-900 font-medium">
                  {activeNode.coordinates[0].toFixed(4)}° N, {activeNode.coordinates[1].toFixed(4)}° E
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Carbon Intensity:
                </span>
                <span className="font-mono-code font-bold text-blue-700">
                  {activeNode.carbonIntensity}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">Traceability Status:</span>
                <span className="font-mono-code text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {activeNode.traceabilityStatus}
                </span>
              </div>
            </div>

            {/* 4-Pillar ESG Risk Matrix */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 font-mono-code">
                Environmental & Social Risk Assessment
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">Deforestation:</span>
                  <span className={`status-tag ${getRiskBadge(activeNode.risks.deforestation)} text-xs`}>
                    {activeNode.risks.deforestation}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">Water Stress:</span>
                  <span className={`status-tag ${getRiskBadge(activeNode.risks.waterStress)} text-xs`}>
                    {activeNode.risks.waterStress}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">Human Rights:</span>
                  <span className={`status-tag ${getRiskBadge(activeNode.risks.humanRights)} text-xs`}>
                    {activeNode.risks.humanRights}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">Geopolitical:</span>
                  <span className={`status-tag ${getRiskBadge(activeNode.risks.geopolitical)} text-xs`}>
                    {activeNode.risks.geopolitical}
                  </span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 font-mono-code">
                Facility Certifications & Verification
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeNode.certifications.map((c, i) => (
                  <span
                    key={i}
                    className="status-tag tag-verified text-xs"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Provenance Button */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono-code">
              Verified: {activeNode.lastVerificationDate}
            </span>
            <button
              onClick={() => onOpenProvenance(activeNode.provenance)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono-code font-bold uppercase transition-colors shadow-2xs"
            >
              <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
              <span>SOURCE: {activeNode.provenance.sourceDoc}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stage Navigation Footer to Natural Rubber EUDR Traceability */}
      <StageNavigationFooter activeSection="origin" onSelectSection={onSelectSection || (() => {})} />
    </div>
  );
};
