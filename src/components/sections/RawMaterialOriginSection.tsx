import React, { useState } from 'react';
import { GeoOriginNode, DataProvenance } from '../../types';
import { Globe2, MapPin, ShieldAlert, CheckCircle2, AlertTriangle, Building2, Truck, Leaf, FileSearch, Factory, Recycle, Layers } from 'lucide-react';

interface RawMaterialOriginSectionProps {
  originNodes: GeoOriginNode[];
  onOpenProvenance: (prov: DataProvenance) => void;
}

export const RawMaterialOriginSection: React.FC<RawMaterialOriginSectionProps> = ({
  originNodes,
  onOpenProvenance,
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
        return '#00FF41'; // Green
      case 'Processing Facility':
        return '#00F5FF'; // Teal
      case 'Supplier':
        return '#8E9299'; // Dim grey
      case 'Tire Factory':
        return '#00F5FF'; // Teal
      case 'Recycling Facility':
        return '#00FF41'; // Green
      default:
        return '#8E9299';
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
            <span className="status-tag tag-verified">
              SECTION 04
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-tech tracking-wide uppercase">
              Global Supply Chain Geography & Raw Material Origin
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9299] mt-1.5">
            Geographic coordinates, environmental risk intelligence, and supply-chain tier mapping from extraction to tire assembly.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 bg-[#151619] border border-[#2D2F33] p-2 rounded text-[11px] font-mono-code uppercase">
          <span className="flex items-center gap-1 text-[#00FF41] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00FF41]"></span> Raw Origin
          </span>
          <span className="flex items-center gap-1 text-[#00F5FF] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00F5FF]"></span> Processing
          </span>
          <span className="flex items-center gap-1 text-[#FFFFFF] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00F5FF]"></span> Factory
          </span>
          <span className="flex items-center gap-1 text-[#00FF41] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00FF41]"></span> Recycler
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-[#151619] border border-[#2D2F33] p-2 rounded">
        <span className="text-xs text-[#8E9299] font-mono-code mr-2 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" /> Node Type:
        </span>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-2.5 py-1 rounded text-xs font-mono-code font-bold uppercase whitespace-nowrap transition-colors ${
              filterType === t
                ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]'
                : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive World Map & Country Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Custom Interactive SVG World Map */}
        <div className="lg:col-span-7 bg-[#151619] border border-[#2D2F33] rounded-lg p-6 flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[420px]">
          <div className="flex items-center justify-between text-xs text-[#8E9299] mb-2">
            <span className="font-mono-code font-bold uppercase tracking-wider text-[#00F5FF]">
              GLOBAL VALUE CHAIN MAP (REAL COORDINATES)
            </span>
            <span className="text-[10px] text-[#8E9299] font-mono-code">Click node marker to focus</span>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full aspect-[16/9] bg-[#0B0C0E] rounded border border-[#2D2F33] overflow-hidden flex items-center justify-center p-2">
            {/* World Map Outline SVG */}
            <svg className="w-full h-full text-neutral-800" viewBox="0 0 1000 500">
              {/* Lat/Long Grid Lines */}
              <defs>
                <pattern id="grid" width="100" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 50" fill="none" stroke="#2D2F33" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="1000" height="500" fill="url(#grid)" />

              {/* Simplified World Continents Path Outlines */}
              {/* North America */}
              <path
                d="M 150 100 Q 220 80 280 120 Q 260 200 200 240 Q 150 200 130 150 Z"
                fill="#151619"
                stroke="#2D2F33"
                strokeWidth="1"
              />
              {/* South America */}
              <path
                d="M 280 260 Q 340 300 320 400 Q 280 440 250 350 Z"
                fill="#151619"
                stroke="#2D2F33"
                strokeWidth="1"
              />
              {/* Europe */}
              <path
                d="M 460 110 Q 540 100 560 150 Q 520 200 470 180 Q 450 140 460 110 Z"
                fill="#1A1C1F"
                stroke="#2D2F33"
                strokeWidth="1"
              />
              {/* Africa */}
              <path
                d="M 460 200 Q 540 210 560 290 Q 520 390 480 340 Q 450 250 460 200 Z"
                fill="#151619"
                stroke="#2D2F33"
                strokeWidth="1"
              />
              {/* Asia */}
              <path
                d="M 580 100 Q 750 80 850 140 Q 820 260 740 280 Q 640 240 580 180 Z"
                fill="#181A1D"
                stroke="#2D2F33"
                strokeWidth="1"
              />
              {/* Southeast Asia & Indonesia */}
              <path
                d="M 740 280 Q 820 300 800 360 Q 750 350 730 300 Z"
                fill="#1A1C1F"
                stroke="#2D2F33"
                strokeWidth="1"
              />
              {/* Australia */}
              <path
                d="M 800 370 Q 880 380 860 440 Q 800 450 780 400 Z"
                fill="#151619"
                stroke="#2D2F33"
                strokeWidth="1"
              />

              {/* Geo Flow Curved Arcs to French Tire Factory (approx coordinate 470, 160) */}
              {/* Thailand to France */}
              <path
                d="M 760 280 Q 620 180 480 160"
                fill="none"
                stroke="#00FF41"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.8"
              />
              {/* Côte d'Ivoire to France */}
              <path
                d="M 470 260 Q 460 210 480 160"
                fill="none"
                stroke="#00FF41"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.8"
              />
              {/* Germany to France */}
              <path
                d="M 510 140 L 480 160"
                fill="none"
                stroke="#00F5FF"
                strokeWidth="1.5"
                strokeDasharray="3 2"
                opacity="0.9"
              />
              {/* Italy to France */}
              <path
                d="M 500 170 L 480 160"
                fill="none"
                stroke="#8E9299"
                strokeWidth="1.5"
                strokeDasharray="3 2"
                opacity="0.9"
              />
              {/* Recycler Lens to Factory */}
              <path
                d="M 485 145 L 480 160"
                fill="none"
                stroke="#00FF41"
                strokeWidth="2"
                opacity="0.9"
              />

              {/* Node Pins */}
              {originNodes.map((node) => {
                // Approximate coordinate mapping to SVG viewBox (1000 x 500)
                // lat: 90 -> -90 (0 -> 500), lng: -180 -> 180 (0 -> 1000)
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
                      r={isSelected ? '8' : '5'}
                      fill={color}
                      stroke="#0B0C0E"
                      strokeWidth="2"
                      className="transition-transform group-hover:scale-125"
                    />
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono"
                      className="pointer-events-none drop-shadow-md"
                    >
                      {node.country}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Node Selector Chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#2D2F33]">
            {originNodes.map((node) => {
              const isSelected = node.id === activeNode.id;
              const color = getNodeMarkerColor(node.type);
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`px-2.5 py-1 rounded text-xs font-mono-code font-bold uppercase flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]'
                      : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
                  <span>{node.country} ({node.category})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Geographic Node Detailed Intelligence Dossier */}
        <div className="lg:col-span-5 bg-[#151619] border border-[#2D2F33] rounded-lg p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-code text-[#00F5FF] font-bold uppercase tracking-wider">
                  TIER-{activeNode.tier} SUPPLY FACILITY
                </span>
                <span className="status-tag tag-verified">
                  {activeNode.type}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-2xl font-bold font-tech text-[#FFFFFF]">
                  {activeNode.country}
                </h3>
                <span className="text-xs font-mono-code text-[#8E9299]">
                  [{activeNode.isoCode}]
                </span>
              </div>
              <p className="text-xs text-[#8E9299] mt-0.5">
                {activeNode.material} • Supplied by <strong className="text-[#00F5FF]">{activeNode.supplier}</strong>
              </p>
            </div>

            {/* Facility Details */}
            <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3.5 rounded space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8E9299] flex items-center gap-1">
                  <Factory className="w-3.5 h-3.5 text-[#00F5FF]" /> Facility:
                </span>
                <span className="font-semibold text-[#FFFFFF]">{activeNode.facility}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#8E9299] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00FF41]" /> Coordinates:
                </span>
                <span className="font-mono-code text-[#FFFFFF]">
                  {activeNode.coordinates[0].toFixed(4)}° N, {activeNode.coordinates[1].toFixed(4)}° E
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#8E9299] flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-[#00FF41]" /> Carbon Intensity:
                </span>
                <span className="font-mono-code font-bold text-[#00F5FF]">
                  {activeNode.carbonIntensity}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#8E9299]">Traceability Status:</span>
                <span className="font-mono-code text-[#00FF41] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {activeNode.traceabilityStatus}
                </span>
              </div>
            </div>

            {/* 4-Pillar ESG Risk Matrix */}
            <div>
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block mb-2 font-mono-code">
                Environmental & Social Risk Assessment
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#0B0C0E] border border-[#2D2F33] p-2.5 rounded flex items-center justify-between">
                  <span className="text-[#8E9299]">Deforestation:</span>
                  <span className={`status-tag ${getRiskBadge(activeNode.risks.deforestation)}`}>
                    {activeNode.risks.deforestation}
                  </span>
                </div>

                <div className="bg-[#0B0C0E] border border-[#2D2F33] p-2.5 rounded flex items-center justify-between">
                  <span className="text-[#8E9299]">Water Stress:</span>
                  <span className={`status-tag ${getRiskBadge(activeNode.risks.waterStress)}`}>
                    {activeNode.risks.waterStress}
                  </span>
                </div>

                <div className="bg-[#0B0C0E] border border-[#2D2F33] p-2.5 rounded flex items-center justify-between">
                  <span className="text-[#8E9299]">Human Rights:</span>
                  <span className={`status-tag ${getRiskBadge(activeNode.risks.humanRights)}`}>
                    {activeNode.risks.humanRights}
                  </span>
                </div>

                <div className="bg-[#0B0C0E] border border-[#2D2F33] p-2.5 rounded flex items-center justify-between">
                  <span className="text-[#8E9299]">Geopolitical:</span>
                  <span className={`status-tag ${getRiskBadge(activeNode.risks.geopolitical)}`}>
                    {activeNode.risks.geopolitical}
                  </span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block mb-1.5 font-mono-code">
                Facility Certifications & Verification
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeNode.certifications.map((c, i) => (
                  <span
                    key={i}
                    className="status-tag tag-verified"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Provenance Button */}
          <div className="mt-5 pt-3 border-t border-[#2D2F33] flex items-center justify-between">
            <span className="text-xs text-[#8E9299] font-mono-code text-[11px]">
              Verified: {activeNode.lastVerificationDate}
            </span>
            <button
              onClick={() => onOpenProvenance(activeNode.provenance)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B0C0E] hover:bg-[#1A1C1F] border border-[#2D2F33] text-[#00F5FF] text-xs font-mono-code font-bold uppercase transition-colors"
            >
              <FileSearch className="w-3.5 h-3.5" />
              [SOURCE: {activeNode.provenance.sourceDoc}]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
