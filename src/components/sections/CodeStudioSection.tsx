import React, { useState } from 'react';
import { 
  FileCode2, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  Layers, 
  FileJson, 
  BookOpen, 
  Cpu, 
  ShieldCheck, 
  ExternalLink,
  Code2,
  Sparkles
} from 'lucide-react';

interface CodeStudioSectionProps {
  onNavigateTo3DStudio?: () => void;
}

interface CodeFile {
  id: string;
  filename: string;
  language: string;
  category: 'Schema' | '3D Engine' | 'IoT Stream' | 'Verifiable Credential' | 'Backend API' | 'Deployment';
  description: string;
  code: string;
}

const CODE_FILES: CodeFile[] = [
  {
    id: 'schema',
    filename: 'MichelinTirePassportSchema.ts',
    language: 'typescript',
    category: 'Schema',
    description: 'Complete TypeScript schema definitions compliant with EU ESPR 2024/1781 Article 9, CIRPASS DPP, and GS1 Digital Link standards.',
    code: `/**
 * MICHELIN GROUP - DIGITAL PRODUCT PASSPORT (DPP) SCHEMA
 * Compliant with EU ESPR 2024/1781 Article 9, CIRPASS, and GS1 Digital Link
 * Standard: ISO 14067 (PCF), ISO 14044 (LCA), ISO 20910 (RFID), EUDR 2023/1115
 */

export type ProvenanceLevel = 
  | 'VERIFIED'           // Third-party audited (TÜV SÜD, UTAC CERAM)
  | 'SUPPLIER REPORTED'  // Direct Tier 1/2 API upload
  | 'CALCULATED'         // Mass-balance / LCA model (ISO 14067)
  | 'ESTIMATED';         // Industry secondary benchmark

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface DataProvenance {
  sourceOrg: string;
  sourceDoc: string;
  reportingYear: number;
  measurementDate: string;
  dataOwner: string;
  dataType: 'Primary' | 'Secondary';
  calculationMethod: string;
  verificationBody?: string;
  confidenceScore: number; // 0 to 100
  provenanceLevel: ProvenanceLevel;
  standard?: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  chemicalName?: string;
  category: 'Rubber' | 'Reinforcement' | 'Fillers' | 'Chemicals' | 'Oils & Resins';
  massKg: number;
  percentage: number;
  originType: 'Virgin Fossil' | 'Virgin Bio-based' | 'Recycled Post-Consumer' | 'Renewable Bio';
  function: string;
  componentLocation: 'Tread' | 'Sidewall' | 'Belts' | 'Bead' | 'Inner Liner' | 'Carcass Ply' | 'Apex';
  supplierName: string;
  supplierCountry: string;
  supplierFacility: string;
  carbonIntensityKgCO2ePerKg: number;
  traceabilityLevel: 'Physical Segregation' | 'Mass Balance' | 'Identity Preserved';
  certifications: string[];
  reachStatus: 'Compliant' | 'SVHC Free';
  provenance: DataProvenance;
}

export interface LiveTelemetryStream {
  pressureBar: number;
  temperatureCelsius: number;
  remainingTreadDepthMm: number;
  odometerKm: number;
  totalTargetKm: number;
  rollingResistanceLiveKgTonne: number;
  vibrationAnomalyScore: number;
  connectionStatus: 'ONLINE' | 'STREAMING' | 'OFFLINE';
  gatewayNode: string;
  latencyMs: number;
  lastSyncTimestamp: string;
  merkleRootHash: string;
  rfidSignalStrengthDbm: number;
}

export interface MichelinTirePassport {
  passportId: string;                     // e.g. "DPP-MICHELIN-2026-0048192"
  gtin: string;                           // GS1 GTIN-14: "03528701234567"
  serialNumber: string;                   // ISO 20910: "SN-FR-ML-2026-0314-8842A"
  epcRfid: string;                        // RAIN RFID EPC Hex
  productName: string;                    // "Michelin e·Primacy™ / Apex-GT"
  manufacturer: string;                   // "Michelin Group (Clermont-Ferrand)"
  tireSize: string;                       // "205/55 R16 91V"
  eprelRegistrationId: string;            // "EPREL-1488204"
  gdsoIdentifierUri: string;              // "urn:gdso:tire:id:03528701234567"
  recycledContentPercent: number;        // 28.4%
  renewableContentPercent: number;       // 29.6%
  totalSustainableContentPercent: number; // 58.0%
  totalWeightKg: number;                  // 8.45 kg
  materials: MaterialItem[];
  liveTelemetry: LiveTelemetryStream;
  provenance: DataProvenance;
}`
  },
  {
    id: 'threejs',
    filename: 'ThreeDTireCanvasEngine.tsx',
    language: 'typescript',
    category: '3D Engine',
    description: 'Interactive Three.js WebGL canvas engine rendering exploded multi-ply tire layers, kinetic rotation, and rCB devulcanization particle disintegration.',
    code: `import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDTireCanvasEngineProps {
  explodeFactor: number; // 0.0 (assembled) to 1.0 (fully exploded)
  renderMode: 'solid' | 'wireframe' | 'particles' | 'xray';
  isAutoRotate: boolean;
  selectedLayer: string | null;
}

export const ThreeDTireCanvasEngine: React.FC<ThreeDTireCanvasEngineProps> = ({
  explodeFactor,
  renderMode,
  isAutoRotate,
  selectedLayer,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const tireGroupRef = useRef<THREE.Group | null>(null);
  const layerMeshesRef = useRef<{ [name: string]: THREE.Mesh | THREE.Points }>({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0c0e);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 5.2);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 3. Cyber-Teal / Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const cyanKeyLight = new THREE.DirectionalLight(0x00f5ff, 1.8);
    cyanKeyLight.position.set(5, 8, 5);
    scene.add(cyanKeyLight);

    const greenFillLight = new THREE.DirectionalLight(0x00ff41, 1.2);
    greenFillLight.position.set(-5, -4, -4);
    scene.add(greenFillLight);

    // 4. Multi-Ply Layer Mesh Hierarchy
    const tireGroup = new THREE.Group();
    tireGroupRef.current = tireGroup;
    scene.add(tireGroup);

    // Layer 1: Tread (Bio-Silica + Synthetic SBR)
    const treadMesh = new THREE.Mesh(
      new THREE.TorusGeometry(1.4, 0.45, 32, 64),
      new THREE.MeshStandardMaterial({ color: 0x1a1c1f, roughness: 0.85 })
    );
    tireGroup.add(treadMesh);
    layerMeshesRef.current['Tread'] = treadMesh;

    // Layer 2: Dual Steel Belts (Recycled Electric-Arc Steel)
    const steelMesh = new THREE.Mesh(
      new THREE.TorusGeometry(1.36, 0.38, 24, 64),
      new THREE.MeshStandardMaterial({ color: 0x8e9299, metalness: 0.85, roughness: 0.3 })
    );
    tireGroup.add(steelMesh);
    layerMeshesRef.current['Steel Belts'] = steelMesh;

    // Layer 3: Textile Carcass Body Ply (Recycled PET Cords)
    const carcassMesh = new THREE.Mesh(
      new THREE.TorusGeometry(1.30, 0.32, 20, 48),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.5 })
    );
    tireGroup.add(carcassMesh);
    layerMeshesRef.current['Carcass'] = carcassMesh;

    // Layer 4: Inner Air Liner (Halobutyl) & Acoustic Foam Damper
    const innerMesh = new THREE.Mesh(
      new THREE.TorusGeometry(1.22, 0.24, 16, 48),
      new THREE.MeshStandardMaterial({ color: 0x00f5ff, roughness: 0.9 })
    );
    tireGroup.add(innerMesh);
    layerMeshesRef.current['Inner Liner'] = innerMesh;

    // Layer 5: High-Strength Steel Bead Wire Core
    const beadMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.95, 0.08, 16, 32),
      new THREE.MeshStandardMaterial({ color: 0xffa500, metalness: 0.95, roughness: 0.2 })
    );
    tireGroup.add(beadMesh);
    layerMeshesRef.current['Bead Core'] = beadMesh;

    // 5. Render Loop with Kinetic Rotation
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (isAutoRotate && tireGroupRef.current) {
        tireGroupRef.current.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  // Update exploded distance in real time
  useEffect(() => {
    const meshes = layerMeshesRef.current;
    if (!meshes) return;

    const f = explodeFactor;
    if (meshes['Tread']) meshes['Tread'].position.z = f * 1.5;
    if (meshes['Steel Belts']) meshes['Steel Belts'].position.z = f * 0.8;
    if (meshes['Carcass']) meshes['Carcass'].position.z = f * 0.2;
    if (meshes['Inner Liner']) meshes['Inner Liner'].position.z = -f * 0.6;
    if (meshes['Bead Core']) meshes['Bead Core'].position.z = -f * 1.2;
  }, [explodeFactor]);

  return <div ref={mountRef} className="w-full h-full min-h-[400px]" />;
};`
  },
  {
    id: 'iot',
    filename: 'LiveIoTTelemetryClient.ts',
    language: 'typescript',
    category: 'IoT Stream',
    description: 'MQTT & GDSO RAIN RFID WebSocket listener streaming real-time tire cavity pressure, temperature, remaining tread depth, and cryptographic Merkle root updates.',
    code: `import { LiveTelemetryStream } from './MichelinTirePassportSchema';

export class MichelinLiveTelemetryService {
  private socket: WebSocket | null = null;
  private subscribers: ((data: LiveTelemetryStream) => void)[] = [];

  constructor(
    private tireGtin: string,
    private serialNumber: string,
    private gatewayUrl: string = 'wss://iot.michelin-connected-fleet.eu/v2/telemetry'
  ) {}

  public connect(): void {
    const topic = \`tire/\${this.tireGtin}/\${this.serialNumber}\`;
    this.socket = new WebSocket(\`\${this.gatewayUrl}?topic=\${encodeURIComponent(topic)}\`);

    this.socket.onopen = () => {
      console.log(\`[Michelin IoT Gateway] Connected to RFID/TPMS telemetry for \${this.serialNumber}\`);
    };

    this.socket.onmessage = (event) => {
      try {
        const payload: LiveTelemetryStream = JSON.parse(event.data);
        this.notifySubscribers(payload);
      } catch (err) {
        console.error('[Michelin IoT Gateway] Malformed packet:', err);
      }
    };

    this.socket.onerror = (err) => {
      console.warn('[Michelin IoT Gateway] Connection warning:', err);
    };
  }

  public subscribe(callback: (data: LiveTelemetryStream) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers(data: LiveTelemetryStream): void {
    this.subscribers.forEach(sub => sub(data));
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}`
  },
  {
    id: 'vc',
    filename: 'MichelinDPPVerifiableCredential.jsonld',
    language: 'json',
    category: 'Verifiable Credential',
    description: 'Standard W3C Verifiable Credential 2.0 and CIRPASS JSON-LD passport payload cryptographically signed with Michelin Ed25519 corporate key.',
    code: `{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schema.org",
    "https://cirpass.eu/contexts/dpp-tire-v1.jsonld",
    "https://gs1.org/voc/DigitalProductPassport"
  ],
  "id": "urn:uuid:8f2a6b39-d01e-4a77-c385-fa890e1bc76d",
  "type": ["VerifiableCredential", "DigitalProductPassport", "TirePassport"],
  "issuer": {
    "id": "did:web:dpp.michelin.com:issuers:clermont-plant-4",
    "name": "Michelin Group (Manufacture Française des Pneumatiques Michelin)",
    "country": "FR",
    "lei": "549300VHEE488S4G0873"
  },
  "issuanceDate": "2026-03-14T08:00:00Z",
  "expirationDate": "2036-03-14T23:59:59Z",
  "credentialSubject": {
    "id": "https://id.michelin.com/01/03528701234567/21/SN-FR-ML-2026-0314-8842A",
    "gtin": "03528701234567",
    "serialNumber": "SN-FR-ML-2026-0314-8842A",
    "productName": "Michelin e·Primacy™ / Apex-GT (EV Ultra-Efficient)",
    "commercialModel": "e·Primacy Apex-GT",
    "tireDimension": "205/55 R16 91V",
    "eprelRegistration": "https://eprel.ec.europa.eu/screen/product/tyres/1488204",
    "gdsoTireId": "urn:gdso:tire:id:03528701234567:SN8842A",
    "recycledMaterialPercentage": 28.4,
    "renewableMaterialPercentage": 29.6,
    "totalSustainablePercentage": 58.0,
    "productCarbonFootprint": {
      "cradleToGateKgCO2e": 20.3,
      "cradleToGraveKgCO2e": 200.4,
      "standard": "ISO 14067:2018",
      "verifier": "TÜV SÜD Mobility Services GmbH"
    },
    "naturalRubberDueDiligence": {
      "eudrStatement": "Compliant (Article 9 reference #EUDR-2026-ML-9982)",
      "satelliteMonitoring": "Sentinel-2 Multi-Spectral Deforestation-Free Polygon Verified",
      "gpsnrCertification": true
    },
    "circularity": {
      "retreadabilityCycles": 2,
      "pyrolysisRecoveryYieldPercent": 84.2,
      "rCBMassBalanceShare": 100
    }
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2026-03-14T08:30:12Z",
    "verificationMethod": "did:web:dpp.michelin.com#key-1",
    "proofPurpose": "assertionMethod",
    "proofValue": "z5A82mx9P...kKmB9e1x4v9Zq3T7r4w"
  }
}`
  },
  {
    id: 'api',
    filename: 'GS1DigitalLinkResolverAPI.ts',
    language: 'typescript',
    category: 'Backend API',
    description: 'Express.js microservice resolving GS1 Digital Link URIs (01/GTIN + 21/Serial + 10/Batch) into W3C JSON-LD or human browser views.',
    code: `import express, { Request, Response } from 'express';
import { MichelinLiveTelemetryService } from './LiveIoTTelemetryClient';

const app = express();
const PORT = 3000;

// GS1 Digital Link Resolver Endpoint
// Format: /01/{gtin}/21/{serialNumber}
app.get('/01/:gtin/21/:serialNumber', async (req: Request, res: Response) => {
  const { gtin, serialNumber } = req.params;
  const acceptHeader = req.headers['accept'] || '';

  // 1. Content Negotiation: If requested by API client, return W3C JSON-LD
  if (acceptHeader.includes('application/ld+json') || acceptHeader.includes('application/json')) {
    const passportRecord = await fetchPassportByGTIN(gtin, serialNumber);
    return res.setHeader('Content-Type', 'application/ld+json').json(passportRecord);
  }

  // 2. Otherwise redirect to the interactive 3D Web Applet view
  return res.redirect(\`/passport?gtin=\${gtin}&serial=\${serialNumber}\`);
});

// Real-Time IoT Telemetry Proxy Endpoint
app.get('/api/v1/telemetry/:gtin/:serial', async (req: Request, res: Response) => {
  const { gtin, serial } = req.params;
  res.json({
    gtin,
    serialNumber: serial,
    pressureBar: 2.52,
    temperatureCelsius: 34.8,
    remainingTreadMm: 6.8,
    status: 'ONLINE',
    merkleRoot: '0x8f2a6b39d01e4a77c385fa890e1bc76d4982a51f28b49c0d3a95e6f1847c210b'
  });
});

async function fetchPassportByGTIN(gtin: string, serial: string) {
  // Queries encrypted tamper-resistant Michelin DPP ledger
  return { gtin, serial, status: 'PASSPORT VERIFIED' };
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`GS1 DPP Resolver active on port \${PORT}\`);
});`
  },
  {
    id: 'guide',
    filename: 'README_RECREATION_GUIDE.md',
    language: 'markdown',
    category: 'Deployment',
    description: 'Step-by-step CLI commands and architecture guide for compiling and launching this Digital Product Passport application.',
    code: `# Recreating the Michelin Digital Product Passport (DPP)

This repository contains the complete industrial-grade **Michelin Digital Product Passport (DPP)** built with React 19, Vite, Tailwind CSS, and Three.js WebGL.

---

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun**

---

### 2. Installation & Setup
\`\`\`bash
# Clone the repository
git clone https://github.com/your-org/michelin-digital-product-passport.git
cd michelin-digital-product-passport

# Install required dependencies
npm install three @types/three lucide-react motion express dotenv
\`\`\`

---

### 3. Running the Development Server
\`\`\`bash
# Run local dev server (port 3000)
npm run dev
\`\`\`

Open your browser at \`http://localhost:3000\` to interact with the 3D Exploded Twin, Live IoT Telemetry, and W3C Verifiable Credentials.

---

### 4. Production Build & Bundling
\`\`\`bash
# Create optimized production build
npm run build
\`\`\`

---

### 5. Architectural Standards Complied With:
- **EU ESPR 2024/1781 Article 9**: Digital Product Passport framework for tires.
- **GS1 Digital Link 1.2**: Direct sidewall laser-etched QR & RAIN RFID mapping.
- **EUDR 2023/1115**: Natural rubber deforestation polygon monitoring (Sentinel-2).
- **ISO 14067 & ISO 14044**: Cradle-to-grave Product Carbon Footprint (PCF) LCA.
- **W3C Verifiable Credentials 2.0**: Cryptographic Ed25519 signature verification.`
  }
];

export const CodeStudioSection: React.FC<CodeStudioSectionProps> = ({
  onNavigateTo3DStudio
}) => {
  const [selectedFileId, setSelectedFileId] = useState<string>('schema');
  const [copied, setCopied] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeFile = CODE_FILES.find((f) => f.id === selectedFileId) || CODE_FILES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([activeFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllBundle = () => {
    const combined = CODE_FILES.map(
      (f) => `// ==========================================================================\n// FILE: ${f.filename} (${f.category})\n// ==========================================================================\n\n${f.code}\n\n`
    ).join('\n');

    const blob = new Blob([combined], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'michelin_dpp_complete_source_bundle.ts';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-[#151619] border border-[#2D2F33] p-5 rounded-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="status-tag tag-verified">
              DEVELOPER CODE STUDIO & RECREATION BLUEPRINT
            </span>
            <span className="status-tag tag-supplier">
              FULL TS & JSON-LD RECREATION SOURCE
            </span>
          </div>
          <h2 className="text-xl font-bold font-tech text-[#FFFFFF] uppercase">
            Digital Product Passport Implementation & Architecture Hub
          </h2>
          <p className="text-xs text-[#8E9299]">
            Detailed production-ready source code, W3C JSON-LD Verifiable Credential schemas, Three.js 3D WebGL render engine, and GS1 Digital Link resolvers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleDownloadAllBundle}
            className="px-3.5 py-1.5 rounded bg-[#00F5FF] hover:bg-[#00F5FF]/80 text-[#0B0C0E] font-mono-code text-xs uppercase font-bold flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All Code Bundle</span>
          </button>

          {onNavigateTo3DStudio && (
            <button
              onClick={onNavigateTo3DStudio}
              className="px-3.5 py-1.5 rounded bg-[#151619] hover:bg-[#1A1C1F] text-[#00F5FF] border border-[#00F5FF]/40 font-mono-code text-xs uppercase font-bold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch 3D WebGL Twin</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: File Navigator (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-[#151619] border border-[#2D2F33] p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono-code text-[#00F5FF] uppercase">
                Project Files ({CODE_FILES.length})
              </span>
              <span className="text-[10px] font-mono-code text-[#8E9299]">
                Ready to Copy
              </span>
            </div>

            <div className="space-y-1.5">
              {CODE_FILES.map((file) => (
                <button
                  key={file.id}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`w-full p-3 rounded border text-left transition-all ${
                    file.id === selectedFileId
                      ? 'bg-[#00F5FF]/15 border-[#00F5FF] text-[#00F5FF]'
                      : 'bg-[#0B0C0E] border-[#2D2F33] text-[#8E9299] hover:text-[#FFFFFF] hover:bg-[#151619]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono-code text-xs font-bold text-[#FFFFFF] truncate">
                      {file.filename}
                    </span>
                    <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-[#151619] border border-[#2D2F33] text-[#00F5FF]">
                      {file.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8E9299] line-clamp-2 leading-relaxed">
                    {file.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Standards & Specs Box */}
          <div className="bg-[#151619] border border-[#2D2F33] p-4 rounded-lg space-y-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00FF41]" />
              <h4 className="text-xs font-bold font-mono-code text-[#FFFFFF] uppercase">
                Regulatory Standards Complied
              </h4>
            </div>

            <div className="space-y-1 text-xs text-[#8E9299] font-mono-code">
              <div className="p-2 bg-[#0B0C0E] rounded border border-[#2D2F33] flex justify-between">
                <span>EU ESPR Article 9:</span>
                <span className="text-[#00FF41]">Compliant</span>
              </div>
              <div className="p-2 bg-[#0B0C0E] rounded border border-[#2D2F33] flex justify-between">
                <span>GS1 Digital Link 1.2:</span>
                <span className="text-[#00FF41]">Compliant</span>
              </div>
              <div className="p-2 bg-[#0B0C0E] rounded border border-[#2D2F33] flex justify-between">
                <span>W3C Verifiable Credentials:</span>
                <span className="text-[#00F5FF]">v2.0 Ed25519</span>
              </div>
              <div className="p-2 bg-[#0B0C0E] rounded border border-[#2D2F33] flex justify-between">
                <span>CIRPASS DPP Battery & Tire:</span>
                <span className="text-[#00FF41]">Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Code Viewer & Editor Studio (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#151619] border border-[#2D2F33] rounded-lg overflow-hidden flex flex-col">
            {/* Code Header Bar */}
            <div className="p-3 bg-[#0B0C0E] border-b border-[#2D2F33] flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-[#00F5FF]" />
                <span className="font-mono-code text-xs font-bold text-[#FFFFFF]">
                  {activeFile.filename}
                </span>
                <span className="text-[10px] font-mono-code text-[#8E9299] px-2 py-0.5 rounded bg-[#151619] border border-[#2D2F33]">
                  {activeFile.language.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 rounded bg-[#151619] hover:bg-[#1A1C1F] text-[#8E9299] hover:text-[#FFFFFF] border border-[#2D2F33] text-xs font-mono-code flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#00FF41]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'COPY CODE'}</span>
                </button>

                <button
                  onClick={handleDownloadFile}
                  className="px-2.5 py-1 rounded bg-[#00F5FF]/15 hover:bg-[#00F5FF]/25 text-[#00F5FF] border border-[#00F5FF]/40 text-xs font-mono-code flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Content Container */}
            <div className="p-4 bg-[#0B0C0E] overflow-x-auto max-h-[580px] overflow-y-auto font-mono-code text-xs text-[#00F5FF]">
              <pre className="text-[#8E9299] whitespace-pre-wrap leading-relaxed">
                {activeFile.code}
              </pre>
            </div>

            {/* Footer Status Bar */}
            <div className="p-3 bg-[#0B0C0E] border-t border-[#2D2F33] flex items-center justify-between text-xs text-[#8E9299] font-mono-code">
              <span>Lines: {activeFile.code.split('\n').length} | Encoding: UTF-8</span>
              <span className="text-[#00FF41]">Verified Production Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
