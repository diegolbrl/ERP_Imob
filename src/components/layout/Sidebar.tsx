import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Building2,
  Users,
  Share2,
  DollarSign,
  Globe,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Building,
  ClipboardCheck,
  Wrench,
  UserCheck,
  Calendar,
  Settings,
  Contact,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    properties,
    leads,
    contracts,
    buildings,
    inspections,
    clients,
    maintenanceRequests,
  } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard ERP', icon: LayoutDashboard },
    { id: 'properties', label: 'Carteira de Imóveis', icon: Building2, badge: properties.length },
    { id: 'crm', label: 'CRM & Funil', icon: Users, badge: leads.length },
    { id: 'buildings', label: 'Condomínios / Edifícios', icon: Building, badge: buildings.length },
    { id: 'inspections', label: 'Vistorias Digitais', icon: ClipboardCheck, badge: inspections.length },
    { id: 'portals', label: 'Portais & Feeds', icon: Share2 },
    { id: 'financial', label: 'Locação & Split ERP', icon: DollarSign, badge: contracts.length },
    { id: 'clients', label: 'Clientes & Payouts Pix', icon: Contact, badge: clients.length },
    { id: 'tenant-portal', label: 'Portal Inquilino & Chamados', icon: Wrench, badge: maintenanceRequests.length },
    { id: 'broker-portal', label: 'Portal Corretor & Agenda', icon: Calendar },
    { id: 'whitelabel', label: 'Site do Cliente', icon: Globe },
    { id: 'ai-suite', label: 'Antigravity AI Suite', icon: Sparkles, highlight: true },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white font-bold text-lg">
          <Building className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-extrabold text-base text-white tracking-tight flex items-center gap-1">
            ImobSystem <span className="text-[10px] bg-sky-500/20 text-sky-400 px-1.5 py-0.5 rounded font-mono border border-sky-500/30">ERP</span>
          </h1>
          <p className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> SaaS B2B Pro
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-2.5 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
          Módulos Operacionais
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 group ${
                isActive
                  ? item.highlight
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 font-semibold'
                    : 'bg-sky-600 text-white shadow-lg shadow-sky-600/20 font-semibold'
                  : item.highlight
                  ? 'text-purple-300 hover:bg-purple-950/40 hover:text-purple-200 border border-purple-800/40'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 transition-transform duration-150 group-hover:scale-105 ${
                    isActive
                      ? 'text-white'
                      : item.highlight
                      ? 'text-purple-400'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className="truncate max-w-[130px]">{item.label}</span>
              </div>
              <div className="flex items-center gap-1">
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.highlight && !isActive && (
                  <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                )}
                <ChevronRight
                  className={`w-3 h-3 transition-transform duration-150 ${
                    isActive ? 'opacity-100 translate-x-0.5' : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-2.5 m-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sky-400 text-[10px]">
              AI
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-slate-200 truncate">Google Antigravity</p>
            <p className="text-[9px] text-slate-400 truncate">Agente de IA Ativo</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
