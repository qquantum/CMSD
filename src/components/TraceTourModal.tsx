import React, { useState } from 'react';
import { TirePassportData, SectionId } from '../types';
import { X, ArrowRight, ArrowLeft, Compass, Trees, Factory, Truck, Flame, RotateCcw, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';

interface TraceTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  tire: TirePassportData;
  onNavigateToSection: (section: SectionId) => void;
}

export const TraceTourModal: React.FC<TraceTourModalProps> = ({
  isOpen,
  onClose,
  tire,
  onNavigateToSection,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const tourSteps = [
    {
      step: 1,
      title: 'Step 1: Sustainable Agroforestry Origin',
      location: 'Surat Thani, Southern Thailand (8°52\'48"N, 99°18\'36"E)',
      sectionId: 'rubber' as SectionId,
      icon: Trees,
      tag: 'Raw Materials & EUDR',
      desc: 'Latex is hand-tapped from 1,420 GPS-geotagged smallholder rubber trees. High-resolution Copernicus Sentinel-2 satellite imagery confirms zero deforestation occurred after the December 31, 2020 EUDR cut-off date.',
      metric: '100% Segregated Chain of Custody',
    },
    {
      step: 2,
      title: 'Step 2: Circular Monomers & Bio-Silica',
      location: 'Ravenna (Italy) & Novara (Italy)',
      sectionId: 'materials' as SectionId,
      icon: Factory,
      tag: 'Chemical Feedstocks',
      desc: 'Synthetic Solution SBR is synthesized from ISCC PLUS mass-balanced bio-circular waste oils. Precipitated silica is refined from rice husk agricultural ash rather than virgin quartz sand, reducing filler carbon intensity by 65%.',
      metric: '50.5% Total Sustainable Materials',
    },
    {
      step: 3,
      title: 'Step 3: Low-Carbon Steel & Recycled Cords',
      location: 'Duisburg (Germany) & Arnhem (Netherlands)',
      sectionId: 'materials' as SectionId,
      icon: Factory,
      tag: 'Reinforcement Matrix',
      desc: 'High-tensile steel belts are drawn from 100% scrap melted in electric-arc furnaces powered by wind energy. Carcass plies utilize post-consumer recycled PET bottles mechanically spun into ultra-strong tire cord fabric.',
      metric: '-52% Embodied Cord Carbon',
    },
    {
      step: 4,
      title: 'Step 4: Clean Factory Manufacturing',
      location: 'Clermont Eco-Plant #4, France',
      sectionId: 'manufacturing' as SectionId,
      icon: Factory,
      tag: 'Eco-Production',
      desc: 'Materials are compounded and shaped in precision automated building drums. Electric vulcanization presses powered by on-site solar PPAs and recovered steam cure the tire in 14.5 minutes with zero factory landfill waste.',
      metric: '2.50 kg CO₂e Total Factory Footprint',
    },
    {
      step: 5,
      title: 'Step 5: Physical-to-Digital Identity Molded',
      location: 'Clermont Finishing Line',
      sectionId: 'passport' as SectionId,
      icon: Compass,
      tag: 'DPP Digital Identity',
      desc: 'A RAIN RFID chip is vulcanized inside the bead apex, and an ISO/IEC 15418 2D Data Matrix and human-readable serial (SN-FR-2026-0314-8842A) are laser-etched onto the outer sidewall, generating the immutable Digital Product Passport.',
      metric: 'GS1 Digital Link URI Anchored',
    },
    {
      step: 6,
      title: 'Step 6: Green Logistics & OEM Vehicle Fitment',
      location: 'Distribution to EV Assembly',
      sectionId: 'lifecycle' as SectionId,
      icon: Truck,
      tag: 'Electric Mobility',
      desc: 'Shipped via electric freight rail to vehicle assembly lines for factory installation on premium electric vehicles. Acoustic foam inner rings dampen interior cabin resonance by -3.2 dB.',
      metric: 'EV Ultra-Efficient Class A/A',
    },
    {
      step: 7,
      title: 'Step 7: In-Service Usage & Range Optimization',
      location: 'European Road Fleet (65,000 km)',
      sectionId: 'performance' as SectionId,
      icon: Flame,
      tag: 'In-Service LCA',
      desc: 'Ultra-low rolling resistance compound (6.1 kg/tonne) conserves 280 kWh of EV battery electricity over 65,000 km compared to conventional Class C tires, reducing downstream driving emissions.',
      metric: '+8.5% Electric Driving Range',
    },
    {
      step: 8,
      title: 'Step 8: RFID Maintenance & Wear Telemetry',
      location: 'Authorized Tire Service Hubs',
      sectionId: 'lifecycle' as SectionId,
      icon: RotateCcw,
      tag: 'Proactive Care',
      desc: 'Fleet service scanners read the embedded RFID during seasonal rotations, logging real-time tread depth (5.8 mm remaining at 32,000 km) directly into the cryptographically verifiable digital service record.',
      metric: 'Real-Time Maintenance Logged',
    },
    {
      step: 9,
      title: 'Step 9: First-Life Collection & Retreading (R7)',
      location: 'Mulhouse EcoTread Facility, France',
      sectionId: 'circularity' as SectionId,
      icon: RotateCcw,
      tag: 'Second Life (10R)',
      desc: 'Laser shearography qualifies the heavy-duty casing for high-grade retreading. Applying a pre-cured EV tread strip grants a full second life (+45,000 km) and saves 14.2 kg CO₂e compared to manufacturing a new tire.',
      metric: 'Grade A+ Multi-Retread Casing',
    },
    {
      step: 10,
      title: 'Step 10: Closed-Loop Pyrolysis & Recovery',
      location: 'Lens & Dillingen Continuous Pyrolysis Hubs',
      sectionId: 'end-of-life' as SectionId,
      icon: ShieldCheck,
      tag: 'Closed Loop Circularity',
      desc: 'At true end-of-life, continuous 550°C vacuum pyrolysis breaks the tire into high-grade Recovered Carbon Black (rCB) and Tire Pyrolysis Oil (TPO) to manufacture new tires in a closed-loop circle.',
      metric: '96.5% Closed-Loop Material Yield',
    },
  ];

  const current = tourSteps[currentStep];
  const StepIcon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0C0E]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#151619] border border-[#2D2F33] rounded-lg w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#2D2F33] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#0B0C0E] border border-[#2D2F33] text-[#00F5FF]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-code text-[#00F5FF] font-bold uppercase tracking-wider">
                  Interactive Trace Journey
                </span>
                <span className="status-tag tag-verified">
                  STEP {currentStep + 1} OF {tourSteps.length}
                </span>
              </div>
              <h3 className="text-base font-bold font-tech text-[#FFFFFF] uppercase mt-0.5">
                Trace My Tire: From Forest Smallholders to Circular Pyrolysis
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#8E9299] hover:text-[#FFFFFF] hover:bg-[#0B0C0E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Progress Bar */}
          <div className="w-full bg-[#0B0C0E] h-1.5 rounded overflow-hidden border border-[#2D2F33]">
            <div
              className="bg-[#00F5FF] h-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
            ></div>
          </div>

          {/* Active Card Details */}
          <div className="bg-[#0B0C0E] rounded border border-[#2D2F33] p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="status-tag tag-verified">
                  {current.tag}
                </span>
                <h4 className="text-xl font-bold font-tech text-[#FFFFFF] mt-2">
                  {current.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-[#8E9299] pt-1 font-mono-code">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{current.location}</span>
                </div>
              </div>

              <div className="p-3 rounded bg-[#151619] border border-[#2D2F33] text-[#00F5FF] shrink-0">
                <StepIcon className="w-8 h-8" />
              </div>
            </div>

            <p className="text-sm text-[#8E9299] leading-relaxed pt-2">
              {current.desc}
            </p>

            <div className="p-3 rounded bg-[#151619] border border-[#2D2F33] flex items-center justify-between text-xs">
              <span className="text-[#8E9299] font-mono-code">Audited Milestone Verification:</span>
              <strong className="text-[#00FF41] font-mono-code">{current.metric}</strong>
            </div>
          </div>

          {/* Quick Jump Step Dots */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
            {tourSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`w-7 h-7 rounded text-xs font-mono-code font-bold transition-all ${
                  idx === currentStep
                    ? 'bg-[#00F5FF] text-[#0B0C0E]'
                    : idx < currentStep
                    ? 'bg-[#00FF41]/20 text-[#00FF41] border border-[#00FF41]/40'
                    : 'bg-[#0B0C0E] text-[#8E9299] border border-[#2D2F33]'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-[#0B0C0E] border-t border-[#2D2F33] flex items-center justify-between">
          <button
            onClick={() => {
              onNavigateToSection(current.sectionId);
              onClose();
            }}
            className="text-xs font-mono-code text-[#00F5FF] hover:underline flex items-center gap-1.5 uppercase"
          >
            <span>Jump directly to Section Detail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="px-3.5 py-1.5 rounded bg-[#151619] border border-[#2D2F33] text-[#8E9299] hover:text-[#FFFFFF] disabled:opacity-40 text-xs font-mono-code uppercase font-bold transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {currentStep < tourSteps.length - 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(tourSteps.length - 1, prev + 1))}
                className="px-4 py-1.5 rounded bg-[#00F5FF] hover:bg-[#00F5FF]/80 text-[#0B0C0E] font-bold text-xs font-mono-code uppercase transition-colors flex items-center gap-1"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded bg-[#00FF41] hover:bg-[#00FF41]/80 text-[#0B0C0E] font-bold text-xs font-mono-code uppercase transition-colors flex items-center gap-1"
              >
                <span>Finish Tour</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
