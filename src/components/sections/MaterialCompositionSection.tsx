import React, { useState } from 'react';
import { MaterialItem, DataProvenance } from '../../types';
import { FlaskConical, Filter, ShieldCheck, MapPin, Truck, Leaf, Award, FileSearch, Sparkles, ExternalLink } from 'lucide-react';

interface MaterialCompositionSectionProps {
  materials: MaterialItem[];
  onOpenProvenance: (prov: DataProvenance) => void;
}

export const MaterialCompositionSection: React.FC<MaterialCompositionSectionProps> = ({
  materials,
  onOpenProvenance,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFeedstock, setSelectedFeedstock] = useState<string>('All');
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(materials[0].id);

  const categories = ['All', 'Rubber', 'Reinforcement', 'Fillers', 'Chemicals'];
  const feedstocks = ['All', 'Renewable Bio', 'Recycled Post-Consumer', 'Recycled Pre-Consumer', 'Virgin Fossil'];

  const filteredMaterials = materials.filter((mat) => {
    const matchCat = selectedCategory === 'All' || mat.category === selectedCategory;
    const matchFeed = selectedFeedstock === 'All' || mat.originType === selectedFeedstock;
    return matchCat && matchFeed;
  });

  const activeMaterial = materials.find((m) => m.id === selectedMaterialId) || filteredMaterials[0] || materials[0];

  // Feedstock badge colors
  const getOriginBadge = (origin: string) => {
    switch (origin) {
      case 'Renewable Bio':
        return 'tag-green';
      case 'Recycled Post-Consumer':
        return 'tag-verified';
      case 'Recycled Pre-Consumer':
        return 'tag-verified';
      case 'Virgin Fossil':
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
              SECTION 03
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-tech tracking-wide uppercase">
              Material Composition & Chemical Transparency
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9299] mt-1.5">
            Complete Bill of Materials (BOM) with CAS chemical designations, mass-balance certificates, and REACH compliance.
          </p>
        </div>

        {/* Global Summary Pill */}
        <div className="flex items-center gap-3 bg-[#151619] border border-[#2D2F33] px-4 py-2 rounded">
          <div className="text-right">
            <span className="text-[10px] text-[#8E9299] font-mono-code uppercase block font-medium">BOM Verification</span>
            <span className="text-xs font-mono-code font-bold text-[#00FF41]">100% Mass Accounted</span>
          </div>
          <div className="w-9 h-9 rounded bg-[#00F5FF]/10 border border-[#00F5FF]/30 flex items-center justify-center text-[#00F5FF] font-mono-code font-bold text-xs">
            8.45kg
          </div>
        </div>
      </div>

      {/* Filter Bars */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#151619] border border-[#2D2F33] p-3 rounded">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs text-[#8E9299] font-mono-code mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-cat-${cat.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded text-xs font-mono-code font-bold uppercase whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]'
                  : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Feedstock Type Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs text-[#8E9299] font-mono-code mr-1">Origin:</span>
          {feedstocks.map((feed) => (
            <button
              key={feed}
              id={`filter-feed-${feed.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedFeedstock(feed)}
              className={`px-2.5 py-1 rounded text-xs font-mono-code font-bold uppercase whitespace-nowrap transition-colors ${
                selectedFeedstock === feed
                  ? 'bg-[#00FF41]/15 text-[#00FF41] border border-[#00FF41]'
                  : 'bg-[#0B0C0E] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33]'
              }`}
            >
              {feed}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Visual Matrix + Selected Material Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Material Cards List / Grid */}
        <div className="lg:col-span-7 space-y-3">
          {filteredMaterials.map((mat) => {
            const isSelected = mat.id === activeMaterial.id;
            return (
              <div
                key={mat.id}
                id={`material-card-${mat.id}`}
                onClick={() => setSelectedMaterialId(mat.id)}
                className={`p-4 rounded border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1A1C1F] border-[#00F5FF] shadow-lg shadow-[#00F5FF]/5'
                    : 'bg-[#151619] border-[#2D2F33] hover:bg-[#1A1C1F] hover:border-[#3D4046]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-[#FFFFFF] font-tech">
                        {mat.name}
                      </span>
                      <span className={`status-tag ${getOriginBadge(mat.originType)}`}>
                        {mat.originType}
                      </span>
                      <span className="status-tag tag-supplier">
                        {mat.category}
                      </span>
                    </div>

                    <p className="text-xs text-[#8E9299] italic">
                      {mat.chemicalName || mat.function}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#8E9299] pt-1">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3 h-3 text-[#00F5FF]" /> {mat.supplierName} ({mat.supplierCountry})
                      </span>
                      <span className="text-[#2D2F33]">•</span>
                      <span className="font-mono-code text-[#00F5FF]">
                        {mat.carbonIntensityKgCO2ePerKg} kg CO₂e/kg
                      </span>
                    </div>
                  </div>

                  {/* Mass & Percentage Pill */}
                  <div className="text-right shrink-0">
                    <div className="text-lg font-bold font-mono-code text-[#00F5FF]">
                      {mat.percentage}%
                    </div>
                    <span className="text-xs font-mono-code text-[#8E9299]">
                      {mat.massKg.toFixed(2)} kg
                    </span>
                  </div>
                </div>

                {/* Progress bar visual for mass contribution */}
                <div className="w-full bg-[#0B0C0E] rounded-full h-1 mt-3 overflow-hidden border border-[#2D2F33]">
                  <div
                    className="bg-[#00F5FF] h-full"
                    style={{ width: `${mat.percentage * 3.5}%` }}
                  ></div>
                </div>
              </div>
            );
          })}

          {filteredMaterials.length === 0 && (
            <div className="p-8 text-center bg-[#151619] border border-[#2D2F33] rounded text-[#8E9299] font-mono-code text-xs">
              No materials match the selected filters.
            </div>
          )}
        </div>

        {/* Right: Selected Material Detailed Dossier */}
        <div className="lg:col-span-5 bg-[#151619] border border-[#2D2F33] rounded-lg p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-code text-[#00F5FF] font-bold uppercase tracking-wider">
                  MATERIAL DOSSIER
                </span>
                <span className={`status-tag ${getOriginBadge(activeMaterial.originType)}`}>
                  {activeMaterial.originType}
                </span>
              </div>
              <h3 className="text-xl font-bold font-tech text-[#FFFFFF] mt-1">
                {activeMaterial.name}
              </h3>
              <p className="text-xs text-[#8E9299] font-mono-code mt-0.5">
                CAS / Formula: {activeMaterial.chemicalName || 'Confidential Polymeric Blend'}
              </p>
            </div>

            {/* Function & Role in Tire */}
            <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3.5 rounded space-y-1">
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block font-mono-code">
                Technical Purpose & Dynamic Function
              </span>
              <p className="text-xs text-[#FFFFFF] leading-relaxed">
                {activeMaterial.function}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-[#8E9299] border-t border-[#2D2F33]">
                <span>Location: <strong className="text-[#FFFFFF]">{activeMaterial.componentLocation} Layer</strong></span>
                <span>REACH: <strong className="text-[#00FF41]">{activeMaterial.reachStatus}</strong></span>
              </div>
            </div>

            {/* Sourcing & Chain of Custody */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block font-mono-code">
                Supply Chain & Traceability Standard
              </span>

              <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3 rounded space-y-1.5 text-xs">
                <div className="flex items-start justify-between">
                  <span className="text-[#8E9299]">Supplier:</span>
                  <span className="font-semibold text-[#FFFFFF] text-right">{activeMaterial.supplierName}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[#8E9299]">Facility:</span>
                  <span className="text-[#8E9299] text-right">{activeMaterial.supplierFacility}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[#8E9299]">Processing Location:</span>
                  <span className="text-[#8E9299] text-right">{activeMaterial.processingLocation}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[#8E9299]">Traceability Model:</span>
                  <span className="font-mono-code text-[#00F5FF] font-semibold text-right">
                    {activeMaterial.traceabilityLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Certifications Badges */}
            <div>
              <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block mb-1.5 font-mono-code">
                Audited Standards & Certifications
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeMaterial.certifications.map((cert, i) => (
                  <span
                    key={i}
                    className="status-tag tag-green"
                  >
                    <Award className="w-3 h-3" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Carbon & Environmental Profile */}
            <div className="bg-[#0B0C0E] border border-[#2D2F33] p-3.5 rounded flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8E9299] uppercase font-mono-code block">Carbon Intensity (EPD)</span>
                <span className="text-lg font-bold font-mono-code text-[#00F5FF]">
                  {activeMaterial.carbonIntensityKgCO2ePerKg} kg CO₂e / kg
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#8E9299] uppercase font-mono-code block">Total Material Load</span>
                <span className="text-lg font-bold font-mono-code text-[#FFFFFF]">
                  {(activeMaterial.massKg * activeMaterial.carbonIntensityKgCO2ePerKg).toFixed(2)} kg CO₂e
                </span>
              </div>
            </div>
          </div>

          {/* Provenance Trigger Button */}
          <div className="mt-5 pt-3 border-t border-[#2D2F33] flex items-center justify-between">
            <span className="text-xs text-[#8E9299] font-mono-code text-[11px]">Primary verified record</span>
            <button
              id={`btn-provenance-${activeMaterial.id}`}
              onClick={() => onOpenProvenance(activeMaterial.provenance)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B0C0E] hover:bg-[#1A1C1F] border border-[#2D2F33] text-[#00F5FF] text-xs font-mono-code font-bold uppercase transition-colors"
            >
              <FileSearch className="w-3.5 h-3.5" />
              [SOURCE: {activeMaterial.provenance.sourceOrg}]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
