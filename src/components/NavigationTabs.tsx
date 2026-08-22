import React from 'react';
import { 
  FileBadge2, 
  Layers, 
  FlaskConical, 
  Globe2, 
  Trees, 
  Network, 
  Factory, 
  Flame, 
  Gauge, 
  Activity, 
  Recycle, 
  RotateCcw, 
  ShieldCheck,
  Sparkles,
  FileCode2
} from 'lucide-react';
import { SectionId } from '../types';

interface NavigationTabsProps {
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeSection, onSelectSection }) => {
  const navItems: { id: SectionId; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string; highlight?: boolean }[] = [
    { id: 'passport', label: '1. PASSPORT', icon: FileBadge2, badge: 'MICHELIN' },
    { id: '3d-studio', label: '2. 3D TWIN & CINEMA', icon: Sparkles, badge: 'WEBGL 3D', highlight: true },
    { id: 'code-studio', label: '3. CODE STUDIO', icon: FileCode2, badge: 'FULL SOURCE', highlight: true },
    { id: 'explorer', label: '4. TIRE EXPLORER', icon: Layers },
    { id: 'materials', label: '5. MATERIALS (BOM)', icon: FlaskConical, badge: '8 ITEMS' },
    { id: 'origin', label: '6. ORIGIN MAP', icon: Globe2 },
    { id: 'rubber', label: '7. RUBBER TRACE', icon: Trees, badge: 'EUDR' },
    { id: 'supply-chain', label: '8. SUPPLIERS', icon: Network },
    { id: 'manufacturing', label: '9. MANUFACTURING', icon: Factory },
    { id: 'carbon', label: '10. CARBON & LCA', icon: Flame, badge: 'SCOPE 1-3' },
    { id: 'performance', label: '11. PERFORMANCE', icon: Gauge, badge: 'EU A/A' },
    { id: 'lifecycle', label: '12. LIFECYCLE', icon: Activity },
    { id: 'circularity', label: '13. CIRCULARITY (10R)', icon: Recycle, badge: '58.0%' },
    { id: 'end-of-life', label: '14. END OF LIFE', icon: RotateCcw },
    { id: 'compliance', label: '15. COMPLIANCE', icon: ShieldCheck, badge: '7 CERTS' },
  ];

  return (
    <nav className="w-full bg-[#0B0C0E] border-b border-[#2D2F33] sticky top-23 z-30 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onSelectSection(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded text-xs font-semibold whitespace-nowrap transition-all shrink-0 font-mono-code ${
                isActive
                  ? 'bg-[#151619] text-[#FFFFFF] border-b-2 border-b-[#00F5FF] border-t border-l border-r border-[#2D2F33] shadow-sm shadow-[#00F5FF]/5'
                  : item.highlight
                  ? 'text-[#00F5FF] hover:text-[#FFFFFF] hover:bg-[#151619]/60 border border-[#00F5FF]/20'
                  : 'text-[#8E9299] hover:text-[#FFFFFF] hover:bg-[#151619]/60 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00F5FF]' : item.highlight ? 'text-[#00F5FF]' : 'text-[#8E9299]'}`} />
              <span className="tracking-wide font-tech">{item.label}</span>
              {item.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono-code font-bold uppercase ${
                  isActive 
                    ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]/30' 
                    : item.highlight
                    ? 'bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/20'
                    : 'bg-[#151619] text-[#8E9299] border border-[#2D2F33]'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
