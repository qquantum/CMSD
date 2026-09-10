import React, { useState } from 'react';
import { MaterialItem, DataProvenance } from '../../types';
import { FlaskConical, Filter, ShieldCheck, MapPin, Truck, Leaf, Award, FileSearch, Sparkles, ExternalLink } from 'lucide-react';
import { StageNavigationFooter } from '../StageNavigationFooter';

interface MaterialCompositionSectionProps {
  materials: MaterialItem[];
  onOpenProvenance: (prov: DataProvenance) => void;
  onSelectSection?: (section: any) => void;
}

export const MaterialCompositionSection: React.FC<MaterialCompositionSectionProps> = ({
  materials,
  onOpenProvenance,
  onSelectSection,
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
            <span className="status-tag tag-verified text-xs">
              SECTION 03 • BOM
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Material Composition & Chemical Transparency
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Complete Bill of Materials (BOM) with CAS chemical designations, mass-balance certificates, and REACH compliance.
          </p>
        </div>

        {/* Global Summary Pill */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-xs">
          <div className="text-right">
            <span className="text-[11px] text-slate-500 font-mono-code uppercase block font-semibold">BOM Verification</span>
            <span className="text-xs font-mono-code font-bold text-emerald-700">100% Mass Accounted</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-mono-code font-bold text-xs">
            8.45kg
          </div>
        </div>
      </div>

      {/* Filter Bars */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs text-slate-500 font-mono-code mr-1 flex items-center gap-1 font-semibold">
            <Filter className="w-3.5 h-3.5 text-slate-400" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-cat-${cat.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono-code font-semibold uppercase whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Feedstock Type Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs text-slate-500 font-mono-code mr-1 font-semibold">Origin:</span>
          {feedstocks.map((feed) => (
            <button
              key={feed}
              id={`filter-feed-${feed.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedFeedstock(feed)}
              className={`px-3 py-1 rounded-lg text-xs font-mono-code font-semibold uppercase whitespace-nowrap transition-colors ${
                selectedFeedstock === feed
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
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
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/60 border-blue-500 shadow-xs ring-1 ring-blue-400/50'
                    : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {mat.name}
                      </span>
                      <span className={`status-tag ${getOriginBadge(mat.originType)} text-[11px]`}>
                        {mat.originType}
                      </span>
                      <span className="status-tag tag-supplier text-[11px]">
                        {mat.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 italic">
                      {mat.chemicalName || mat.function}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-blue-600" /> {mat.supplierName} ({mat.supplierCountry})
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="font-mono-code text-blue-700 font-medium">
                        {mat.carbonIntensityKgCO2ePerKg} kg CO₂e/kg
                      </span>
                    </div>
                  </div>

                  {/* Mass & Percentage Pill */}
                  <div className="text-right shrink-0">
                    <div className="text-xl font-bold font-mono-code text-blue-700">
                      {mat.percentage}%
                    </div>
                    <span className="text-xs font-mono-code text-slate-500 font-medium">
                      {mat.massKg.toFixed(2)} kg
                    </span>
                  </div>
                </div>

                {/* Progress bar visual for mass contribution */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden border border-slate-200">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${mat.percentage * 3.5}%` }}
                  ></div>
                </div>
              </div>
            );
          })}

          {filteredMaterials.length === 0 && (
            <div className="p-8 text-center bg-white border border-slate-200 rounded-xl text-slate-500 font-mono-code text-xs shadow-xs">
              No materials match the selected filters.
            </div>
          )}
        </div>

        {/* Right: Selected Material Detailed Dossier */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-xs space-y-4">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-code text-blue-700 font-bold uppercase tracking-wider">
                  MATERIAL DOSSIER
                </span>
                <span className={`status-tag ${getOriginBadge(activeMaterial.originType)} text-xs`}>
                  {activeMaterial.originType}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {activeMaterial.name}
              </h3>
              <p className="text-xs text-slate-500 font-mono-code mt-0.5">
                CAS / Formula: {activeMaterial.chemicalName || 'Confidential Polymeric Blend'}
              </p>
            </div>

            {/* Function & Role in Tire */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono-code">
                Technical Purpose & Dynamic Function
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">
                {activeMaterial.function}
              </p>
              <div className="pt-2.5 flex items-center justify-between text-xs text-slate-600 border-t border-slate-200">
                <span>Location: <strong className="text-slate-900">{activeMaterial.componentLocation} Layer</strong></span>
                <span>REACH: <strong className="text-emerald-700 font-semibold">{activeMaterial.reachStatus}</strong></span>
              </div>
            </div>

            {/* Sourcing & Chain of Custody */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono-code">
                Supply Chain & Traceability Standard
              </span>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg space-y-2 text-xs">
                <div className="flex items-start justify-between">
                  <span className="text-slate-500">Supplier:</span>
                  <span className="font-semibold text-slate-900 text-right">{activeMaterial.supplierName}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-slate-500">Facility:</span>
                  <span className="text-slate-700 text-right">{activeMaterial.supplierFacility}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-slate-500">Processing Location:</span>
                  <span className="text-slate-700 text-right">{activeMaterial.processingLocation}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-slate-500">Traceability Model:</span>
                  <span className="font-mono-code text-blue-700 font-semibold text-right">
                    {activeMaterial.traceabilityLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Certifications Badges */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 font-mono-code">
                Audited Standards & Certifications
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeMaterial.certifications.map((cert, i) => (
                  <span
                    key={i}
                    className="status-tag tag-green text-xs"
                  >
                    <Award className="w-3.5 h-3.5" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Carbon & Environmental Profile */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-mono-code block font-semibold">Carbon Intensity (EPD)</span>
                <span className="text-xl font-bold font-mono-code text-blue-700">
                  {activeMaterial.carbonIntensityKgCO2ePerKg} kg CO₂e / kg
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 uppercase font-mono-code block font-semibold">Total Material Load</span>
                <span className="text-xl font-bold font-mono-code text-slate-900">
                  {(activeMaterial.massKg * activeMaterial.carbonIntensityKgCO2ePerKg).toFixed(2)} kg CO₂e
                </span>
              </div>
            </div>
          </div>

          {/* Provenance Trigger Button */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono-code">Primary verified record</span>
            <button
              id={`btn-provenance-${activeMaterial.id}`}
              onClick={() => onOpenProvenance(activeMaterial.provenance)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono-code font-bold uppercase transition-colors shadow-xs"
            >
              <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
              <span>SOURCE: {activeMaterial.provenance.sourceOrg}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stage Navigation Footer to Next Phase: Origin Map & Traceability */}
      <StageNavigationFooter activeSection="materials" onSelectSection={onSelectSection || (() => {})} />
    </div>
  );
};
