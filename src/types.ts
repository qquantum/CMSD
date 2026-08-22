export type UserRole = 'consumer' | 'manufacturer' | 'supplier' | 'recycler' | 'regulator';

export type DataMode = 'live' | 'downloaded';

export type SectionId = 
  | 'passport' 
  | '3d-studio'
  | 'explorer' 
  | 'materials' 
  | 'origin' 
  | 'rubber' 
  | 'supply-chain' 
  | 'manufacturing' 
  | 'carbon' 
  | 'performance' 
  | 'lifecycle' 
  | 'circularity' 
  | 'end-of-life' 
  | 'compliance'
  | 'code-studio';

export type ProvenanceLevel = 'VERIFIED' | 'SUPPLIER REPORTED' | 'CALCULATED' | 'ESTIMATED' | 'INDUSTRY AVERAGE' | 'DATA NOT AVAILABLE';

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface LiveTelemetryData {
  pressureBar: number;
  temperatureCelsius: number;
  remainingTreadDepthMm: number;
  odometerKm: number;
  totalTargetKm: number;
  rollingResistanceLiveKgTonne: number;
  vibrationAnomalyScore: number; // 0 to 10
  connectionStatus: 'ONLINE' | 'STREAMING' | 'RECONNECTING' | 'OFFLINE';
  gatewayNode: string;
  latencyMs: number;
  lastSyncTimestamp: string;
  merkleRootHash: string;
  batteryLevelPercent: number;
  rfidSignalStrengthDbm: number;
}

export interface DownloadedSnapshotMeta {
  isDownloaded: boolean;
  snapshotId: string;
  downloadDate: string;
  fileSizeBytes: number;
  format: 'W3C Verifiable Credential JSON-LD' | 'ESPR CIRPASS Bundle' | 'Encrypted Offline Archive';
  cryptographicSignature: string;
  sha256Checksum: string;
  signedBy: string;
  offlineVerificationStatus: 'VALID_OFFLINE' | 'TAMPER_PROOF_CONFIRMED' | 'EXPIRED';
  cachedAtLocal: string;
}

export interface DataProvenance {
  sourceOrg: string;
  sourceDoc: string;
  reportingYear: number;
  measurementDate: string;
  dataOwner: string;
  dataType: 'Primary' | 'Secondary';
  calculationMethod: string;
  verificationBody?: string;
  confidenceScore: number; // 0 - 100
  provenanceLevel: ProvenanceLevel;
  standard?: string; // e.g. ISO 14067, GHG Protocol
  notes?: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  chemicalName?: string;
  category: 'Rubber' | 'Reinforcement' | 'Fillers' | 'Chemicals' | 'Oils & Resins';
  massKg: number;
  percentage: number;
  originType: 'Virgin Fossil' | 'Virgin Bio-based' | 'Recycled Post-Consumer' | 'Recycled Pre-Consumer' | 'Renewable Bio';
  function: string;
  componentLocation: 'Tread' | 'Sidewall' | 'Belts' | 'Bead' | 'Inner Liner' | 'Carcass Ply' | 'Apex';
  supplierName: string;
  supplierCountry: string;
  supplierFacility: string;
  processingLocation: string;
  carbonIntensityKgCO2ePerKg: number;
  traceabilityLevel: 'Physical Segregation' | 'Mass Balance' | 'Book & Claim' | 'Estimated';
  certifications: string[];
  reachStatus: 'Compliant' | 'SVHC Free' | 'Authorised';
  provenance: DataProvenance;
}

export interface TireComponent {
  id: string;
  name: string;
  percentageOfMass: number;
  weightKg: number;
  purpose: string;
  keyMaterials: string[];
  recycledRenewablePercent: number;
  carbonContributionKgCO2e: number;
  mainSupplier: string;
  geographicOrigin: string;
  colorCode: string;
  technicalDescription: string;
}

export interface GeoOriginNode {
  id: string;
  country: string;
  isoCode: string;
  material: string;
  category: string;
  supplier: string;
  facility: string;
  tier: 1 | 2 | 3 | 4;
  type: 'Raw Material Origin' | 'Processing Facility' | 'Supplier' | 'Tire Factory' | 'Recycling Facility';
  coordinates: [number, number]; // [lat, lng]
  certifications: string[];
  carbonIntensity: string;
  riskLevel: RiskLevel;
  risks: {
    deforestation: RiskLevel;
    waterStress: RiskLevel;
    humanRights: RiskLevel;
    geopolitical: RiskLevel;
  };
  traceabilityStatus: 'Verified' | 'Supplier Reported' | 'Estimated';
  lastVerificationDate: string;
  annualVolumeTons: number;
  provenance: DataProvenance;
}

export interface RubberSupplyChainTier {
  level: number;
  title: string;
  entityName: string;
  location: string;
  role: string;
  auditor: string;
  eudrStatus: 'Compliant - GeoPolygons Verified' | 'Under Review' | 'Exempt';
  gpsnrCertified: boolean;
  deforestationRisk: RiskLevel;
  traceabilityConfidence: number;
  massBalanceOrPhysical: 'Physical Segregation' | 'Mass Balance' | 'Identity Preserved';
  smallholderCount?: number;
  forestMonitoringMethod: string;
  provenance: DataProvenance;
}

export interface SupplierNetworkNode {
  id: string;
  name: string;
  category: string;
  tier: 1 | 2;
  country: string;
  city: string;
  facilityType: string;
  materialsSupplied: string[];
  esgScore: number; // 0 - 100
  auditStatus: 'Passed - Valid' | 'Audit Pending' | 'Conditional';
  certifications: string[];
  carbonIntensityKgCO2e: number;
  riskLevel: RiskLevel;
  risks?: {
    deforestation?: string;
    waterStress?: string;
    humanRights?: string;
    geopolitical?: string;
  };
  traceabilityPercentage: number;
  contractsRenewed: string;
  lastAuditDate: string;
  provenance: DataProvenance;
}

export interface ManufacturingStage {
  step: number;
  name: string;
  description: string;
  facility: string;
  location: string;
  energySource: string;
  electricityKWh: number;
  renewableEnergyPercent: number;
  waterConsumptionLiters: number;
  wasteScrapRatePercent: number;
  scrapReinjectionPercent: number;
  emissionsKgCO2e: number;
  qcChecks: string[];
  status: 'Completed' | 'Optimal';
  provenance: DataProvenance;
}

export interface CarbonLCA {
  scope1KgCO2e: number;
  scope2KgCO2e: number;
  scope3UpstreamKgCO2e: number;
  scope3DownstreamUseKgCO2e: number;
  scope3EndOfLifeCreditKgCO2e: number;
  totalCradleToGraveKgCO2e: number;
  totalCradleToGateKgCO2e: number;
  per1000KmKgCO2e: number;
  materialBreakdown: {
    material: string;
    kgCO2e: number;
    percent: number;
  }[];
  stageBreakdown: {
    stage: string;
    kgCO2e: number;
    percent: number;
    color: string;
  }[];
  methodology: string;
  dataQualityRating: 'A - High Data Quality' | 'B - Moderate' | 'C - Average';
  provenance: DataProvenance;
}

export interface ProductPerformance {
  tireSize: string;
  loadIndex: string; // e.g. "91"
  speedRating: string; // e.g. "V"
  rollingResistanceClass: 'A' | 'B' | 'C' | 'D' | 'E';
  rollingResistanceCoefficient: number; // kg/tonne (e.g. 6.2 kg/t)
  wetGripClass: 'A' | 'B' | 'C' | 'D' | 'E';
  wetGripIndex: number; // e.g. 1.55
  externalNoiseDB: number; // e.g. 69 dB
  externalNoiseClass: 'A' | 'B' | 'C';
  totalTireWeightKg: number;
  expectedMileageKm: number;
  recommendedPressureBar: number;
  evOptimized: boolean;
  evFeatures: string[];
  vehicleFitment: string[];
  energyEfficiencyRating: 'Ultra High' | 'High' | 'Standard';
  provenance: DataProvenance;
}

export interface LifecycleEvent {
  id: string;
  date: string;
  stage: 'Material Sourcing' | 'Manufacturing' | 'Distribution' | 'Vehicle Installation' | 'Usage & Telemetry' | 'Maintenance' | 'Retreading / Second Life' | 'Collection' | 'Recycling & Pyrolysis';
  actor: string;
  location: string;
  description: string;
  impactMetrics: string;
  verifiedBy: string;
  provenance: DataProvenance;
}

export interface Circularity10RItem {
  rNumber: string;
  name: string;
  appliesToTire: boolean;
  priorityTier: 'High Value (Product Integrity)' | 'Medium Value (Component Re-use)' | 'Lower Value (Material/Energy)';
  implementationInPassport: string;
  savingsImpact: string;
  status: 'Active' | 'Optimized' | 'Conditional' | 'Not Recommended';
}

export interface EndOfLifeOption {
  optionNumber: number;
  name: string;
  technology: string;
  operator: string;
  facilityLocation: string;
  recoveredOutputs: {
    name: string;
    percentage: number;
    destination: string;
  }[];
  recoveryEfficiencyPercent: number;
  carbonAvoidanceKgCO2e: number;
  circularityTier: 'Closed Loop (Tire-to-Tire)' | 'Open Loop (Downcycling)' | 'Energy Recovery';
  maturityLevel: 'Commercial Scale' | 'High Growth' | 'Pilot';
  provenance: DataProvenance;
}

export interface ClosedLoopFlow {
  stage: string;
  inputTons: number;
  outputName: string;
  outputTons: number;
  reusedInNewTiresPercent: number;
  downcycledPercent: number;
  energyPercent: number;
  wastePercent: number;
}

export interface ComplianceStandard {
  id: string;
  title: string;
  authority: string;
  category: 'EU ESPR & DPP' | 'Deforestation (EUDR)' | 'Emissions (GHG / ISO)' | 'EPR & ELT' | 'Material Safety (REACH)';
  status: 'Compliant' | 'Partially Compliant' | 'Data Missing' | 'Not Applicable';
  evidenceDocument: string;
  auditDate: string;
  notes: string;
}

export interface TraceabilityScores {
  productCompleteness: number; // 0 - 100
  materialTraceability: number;
  supplierTraceability: number;
  carbonDataQuality: number;
  circularityDataQuality: number;
  endOfLifeTraceability: number;
  overallConfidenceScore: number;
}

export interface TirePassportData {
  passportId: string;
  serialNumber: string;
  gtin: string;
  epcRfid: string;
  productName: string;
  manufacturer: string;
  model: string;
  tireSize: string;
  category: string;
  manufacturingDate: string;
  manufacturingPlant: string;
  passportStatus: 'PASSPORT VERIFIED' | 'PENDING AUDIT' | 'REVOKED';
  lastUpdated: string;
  totalWeightKg: number;
  recycledContentPercent: number;
  renewableContentPercent: number;
  virginContentPercent: number;
  scores: TraceabilityScores;
  carbonLCA: CarbonLCA;
  performance: ProductPerformance;
  components: TireComponent[];
  materials: MaterialItem[];
  originNodes: GeoOriginNode[];
  rubberTraceability: RubberSupplyChainTier[];
  supplierNetwork: SupplierNetworkNode[];
  manufacturingStages: ManufacturingStage[];
  lifecycleTimeline: LifecycleEvent[];
  circularity10R: Circularity10RItem[];
  endOfLifeOptions: EndOfLifeOption[];
  closedLoopFlow: ClosedLoopFlow[];
  complianceList: ComplianceStandard[];
}
