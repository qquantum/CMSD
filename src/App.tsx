/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole, SectionId, DataProvenance, DataMode } from './types';
import { mockTirePassportData, initialLiveTelemetry, initialDownloadedSnapshot } from './data/mockTireData';

// Top-level Navigation, Status HUD, Stepper and Modals
import { Navbar } from './components/Navbar';
import { NavigationTabs } from './components/NavigationTabs';
import { DataModeHUD } from './components/DataModeHUD';
import { PassportFlowStepper } from './components/PassportFlowStepper';
import { ProvenanceModal } from './components/ProvenanceModal';
import { ComparisonModal } from './components/ComparisonModal';
import { QrCodeModal } from './components/QrCodeModal';
import { ExportModal } from './components/ExportModal';
import { TraceTourModal } from './components/TraceTourModal';

// Section Views
import { PassportOverviewSection } from './components/sections/PassportOverviewSection';
import { Interactive3DTireStudio } from './components/sections/Interactive3DTireStudio';
import { CodeStudioSection } from './components/sections/CodeStudioSection';
import { TireExplorerSection } from './components/sections/TireExplorerSection';
import { MaterialCompositionSection } from './components/sections/MaterialCompositionSection';
import { RawMaterialOriginSection } from './components/sections/RawMaterialOriginSection';
import { NaturalRubberTraceabilitySection } from './components/sections/NaturalRubberTraceabilitySection';
import { SupplierNetworkSection } from './components/sections/SupplierNetworkSection';
import { ManufacturingSection } from './components/sections/ManufacturingSection';
import { CarbonFootprintSection } from './components/sections/CarbonFootprintSection';
import { PerformanceSection } from './components/sections/PerformanceSection';
import { CircularitySection } from './components/sections/CircularitySection';
import { EndOfLifeSection } from './components/sections/EndOfLifeSection';
import { VerificationComplianceSection } from './components/sections/VerificationComplianceSection';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('regulator');
  const [activeSection, setActiveSection] = useState<SectionId>('passport');
  const [dataMode, setDataMode] = useState<DataMode>('live');
  const [provenanceData, setProvenanceData] = useState<DataProvenance | null>(null);
  
  // Modals state
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isTraceTourOpen, setIsTraceTourOpen] = useState<boolean>(false);

  const tireData = mockTirePassportData;

  const handleSearchPassport = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('3d') || q.includes('cinema') || q.includes('story') || q.includes('twin')) {
      setActiveSection('3d-studio');
    } else if (q.includes('code') || q.includes('schema') || q.includes('ts') || q.includes('api') || q.includes('json')) {
      setActiveSection('code-studio');
    } else if (q.includes('mat') || q.includes('rubber') || q.includes('silica') || q.includes('sbr') || q.includes('steel')) {
      setActiveSection('materials');
    } else if (q.includes('origin') || q.includes('map') || q.includes('geo') || q.includes('thailand') || q.includes('france')) {
      setActiveSection('origin');
    } else if (q.includes('eudr') || q.includes('deforest') || q.includes('hevea') || q.includes('gps')) {
      setActiveSection('rubber');
    } else if (q.includes('supp') || q.includes('plant') || q.includes('vendor') || q.includes('tier')) {
      setActiveSection('supply-chain');
    } else if (q.includes('manu') || q.includes('cure') || q.includes('clermont') || q.includes('vulcan')) {
      setActiveSection('manufacturing');
    } else if (q.includes('carb') || q.includes('co2') || q.includes('lca') || q.includes('scope') || q.includes('pcf')) {
      setActiveSection('carbon');
    } else if (q.includes('perf') || q.includes('label') || q.includes('ev') || q.includes('grip') || q.includes('noise')) {
      setActiveSection('performance');
    } else if (q.includes('circ') || q.includes('10r') || q.includes('retread') || q.includes('reuse')) {
      setActiveSection('circularity');
    } else if (q.includes('life') || q.includes('elt') || q.includes('pyro') || q.includes('recycle')) {
      setActiveSection('end-of-life');
    } else if (q.includes('comp') || q.includes('audit') || q.includes('espr') || q.includes('reach') || q.includes('eprel')) {
      setActiveSection('compliance');
    } else if (q.includes('explor') || q.includes('tread') || q.includes('bead') || q.includes('belt')) {
      setActiveSection('explorer');
    } else {
      setActiveSection('passport');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900 font-sans antialiased">
      {/* Top Main Brand & Role Bar */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        activeTire={tireData}
        onOpenTraceModal={() => setIsTraceTourOpen(true)}
        onOpenCompareModal={() => setIsComparisonOpen(true)}
        onOpenExportModal={() => setIsExportOpen(true)}
        onOpenQrModal={() => setIsQrOpen(true)}
        onSearchPassport={handleSearchPassport}
        onOpen3DStudio={() => setActiveSection('3d-studio')}
        onOpenCodeStudio={() => setActiveSection('code-studio')}
      />

      {/* Sticky Section Tabs Bar */}
      <NavigationTabs
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Live Stream / Offline Downloaded Data HUD Header */}
        <DataModeHUD
          dataMode={dataMode}
          onToggleDataMode={setDataMode}
          liveTelemetry={initialLiveTelemetry}
          downloadedSnapshot={initialDownloadedSnapshot}
        />

        {/* Full Lifecycle Flow Stepper Navigator */}
        <PassportFlowStepper
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        {/* 1. Passport Overview */}
        {activeSection === 'passport' && (
          <PassportOverviewSection
            tire={tireData}
            role={currentRole}
            onOpenProvenance={setProvenanceData}
            onOpenTraceTour={() => setIsTraceTourOpen(true)}
            onSelectSection={setActiveSection}
          />
        )}

        {/* 2. Interactive 3D WebGL Digital Twin & Storyboard Cinema */}
        {activeSection === '3d-studio' && (
          <Interactive3DTireStudio
            onOpenProvenance={setProvenanceData}
            onNavigateToMaterials={() => setActiveSection('materials')}
            onNavigateToCodeStudio={() => setActiveSection('code-studio')}
            onSelectSection={setActiveSection}
          />
        )}

        {/* 3. Developer Code Studio & Implementation Blueprint */}
        {activeSection === 'code-studio' && (
          <CodeStudioSection
            onNavigateTo3DStudio={() => setActiveSection('3d-studio')}
            onSelectSection={setActiveSection}
          />
        )}

        {/* 4. Interactive Tire Explorer */}
        {activeSection === 'explorer' && (
          <TireExplorerSection
            components={tireData.components}
            onOpenProvenance={setProvenanceData}
            onNavigateToMaterials={() => setActiveSection('materials')}
            onSelectSection={setActiveSection}
          />
        )}

        {/* 5. Material Composition & BOM */}
        {activeSection === 'materials' && (
          <MaterialCompositionSection
            materials={tireData.materials}
            onOpenProvenance={setProvenanceData}
            onSelectSection={setActiveSection}
          />
        )}

        {/* 6. Geographic Origin Map */}
        {activeSection === 'origin' && (
          <RawMaterialOriginSection
            originNodes={tireData.originNodes}
            onOpenProvenance={setProvenanceData}
            onSelectSection={setActiveSection}
          />
        )}

        {/* 7. Natural Rubber EUDR Traceability */}
        {activeSection === 'rubber' && (
          <NaturalRubberTraceabilitySection
            tiers={tireData.rubberTraceability}
            onOpenProvenance={setProvenanceData}
            onSelectSection={setActiveSection}
          />
        )}

        {/* 8. Supplier Network */}
        {activeSection === 'supply-chain' && (
          <SupplierNetworkSection
            suppliers={tireData.supplierNetwork}
            onOpenProvenance={setProvenanceData}
            onSelectSection={setActiveSection}
          />
        )}

        {/* 9. Eco-Manufacturing Telemetry */}
        {activeSection === 'manufacturing' && (
          <ManufacturingSection
            stages={tireData.manufacturingStages}
            onOpenProvenance={setProvenanceData}
            onSelectSection={setActiveSection}
          />
        )}

        {/* 10. Product Carbon Footprint (PCF) & Scope 1-3 LCA */}
        {activeSection === 'carbon' && (
          <CarbonFootprintSection
            carbonLCA={tireData.carbonLCA}
            onOpenProvenance={setProvenanceData}
            onSelectSection={setActiveSection}
          />
        )}

        {/* 11. Homologation Performance & EU Label */}
        {activeSection === 'performance' && (
          <PerformanceSection
            performance={tireData.performance}
            onOpenProvenance={setProvenanceData}
            onSelectSection={setActiveSection}
          />
        )}

        {/* 12. In-Service Lifecycle & 13. Circularity 10R */}
        {(activeSection === 'circularity' || activeSection === 'lifecycle') && (
          <CircularitySection
            tire={tireData}
            onOpenProvenance={setProvenanceData}
            onSelectSection={setActiveSection}
          />
        )}

        {/* 14. End of Life & Pyrolysis */}
        {activeSection === 'end-of-life' && (
          <EndOfLifeSection
            options={tireData.endOfLifeOptions}
            onOpenProvenance={setProvenanceData}
            onSelectSection={setActiveSection}
          />
        )}

        {/* 15. Regulatory Compliance & Trust Audit */}
        {activeSection === 'compliance' && (
          <VerificationComplianceSection
            complianceList={tireData.complianceList}
            scores={tireData.scores}
            onOpenProvenance={setProvenanceData}
            onExportAuditReport={() => setIsExportOpen(true)}
            onSelectSection={setActiveSection}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-5 px-4 sm:px-8 mt-12 text-xs text-slate-500 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-900 tracking-tight">MICHELIN DIGITAL PRODUCT PASSPORT (DPP)</span>
            <span className="text-slate-300">•</span>
            <span className="font-mono-code text-blue-700 font-semibold">EU ESPR (2024/1781) / CIRPASS / ISO 14067</span>
            <span className="text-slate-300">•</span>
            <span className="status-tag tag-verified text-xs">System Status: Operational</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono-code text-slate-500 text-xs">
            <span>Auditor: <strong className="text-slate-900">TÜV SÜD Mobility Node</strong></span>
            <span>Last Sync: <strong className="text-emerald-700 font-bold">2026-08-22 GMT</strong></span>
          </div>
        </div>
      </footer>

      {/* Reusable Data Provenance Audit Modal */}
      <ProvenanceModal
        provenance={provenanceData}
        onClose={() => setProvenanceData(null)}
      />

      {/* Benchmark Tire Comparison Modal */}
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        currentTire={tireData}
      />

      {/* QR Code & GS1 Identifier Modal */}
      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        tire={tireData}
      />

      {/* DPP Interoperability Export Modal (JSON / CSV / Report) */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        tire={tireData}
      />

      {/* Trace My Tire 10-Step Interactive Story Tour Modal */}
      <TraceTourModal
        isOpen={isTraceTourOpen}
        onClose={() => setIsTraceTourOpen(false)}
        tire={tireData}
        onNavigateToSection={setActiveSection}
      />
    </div>
  );
}
