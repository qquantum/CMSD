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
    <nav className="w-full bg-white border-b border-slate-200 sticky top-23 z-30 overflow-x-auto no-scrollbar shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onSelectSection(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 font-mono-code ${
                isActive
                  ? 'bg-blue-50 text-blue-900 border border-blue-200 shadow-2xs font-bold'
                  : item.highlight
                  ? 'text-blue-700 hover:text-blue-950 hover:bg-blue-50/50 border border-blue-100 bg-blue-50/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : item.highlight ? 'text-blue-600' : 'text-slate-500'}`} />
              <span className="tracking-wide font-sans">{item.label}</span>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono-code font-bold uppercase ${
                  isActive 
                    ? 'bg-blue-200/80 text-blue-900' 
                    : item.highlight
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-slate-100 text-slate-600'
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
