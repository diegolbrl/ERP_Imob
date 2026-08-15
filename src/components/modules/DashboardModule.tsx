import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Building2,
  Users,
  DollarSign,
  Share2,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ChevronRight,
  Key,
  ShieldCheck,
} from 'lucide-react';

export const DashboardModule: React.FC = () => {
  const { properties, leads, contracts, setActiveTab, setSelectedPropertyForDetail, setSelectedLeadForDetail } = useApp();

  // Financial Calculations
  const totalVGV = properties.reduce((acc, p) => acc + (p.price || 0), 0);
  const totalRentVolume = properties.reduce((acc, p) => acc + (p.rentPrice || 0), 0);
  const activeContractsRevenue = contracts.reduce((acc, c) => acc + (c.monthlyRent * (c.adminFeePercentage / 100)), 0);

  const exclusiveCount = properties.filter((p) => p.isExclusive).length;
  const availableCount = properties.filter((p) => p.status === 'Disponível').length;

  const leadsInKanban = leads.length;
  const highIntentLeads = leads.filter((l) => l.status === 'Visita Agendada' || l.status === 'Proposta Recebida').length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 p-6 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-sky-500/20 text-sky-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-sky-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Antigravity AI Engine
              </span>
              <span className="text-slate-400 text-xs">Atualizado hoje às 23:38</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Painel de Controle Executivo ERP
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mt-1">
              Gestão integrada da carteira de imóveis, pipeline comercial CRM, sincronização com portais e extrato financeiro em tempo real.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('ai-suite')}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Usar Suite IA</span>
            </button>
            <button
              onClick={() => setActiveTab('crm')}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition-all"
            >
              <Users className="w-4 h-4 text-sky-400" />
              <span>Ver Funil CRM</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: VGV Total */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">VGV da Carteira</span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white mt-2">
            R$ {(totalVGV / 1000000).toFixed(2)}M
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.2% este mês</span>
            <span className="text-slate-500 ml-1">({properties.length} imóveis)</span>
          </div>
        </div>

        {/* Card 2: Receita de Taxa de Administração */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Receita Adm. Locação</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white mt-2">
            R$ {activeContractsRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} /mês
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{contracts.length} contratos vigentes</span>
          </div>
        </div>

        {/* Card 3: Imóveis em Exclusividade */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Imóveis Exclusivos</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Key className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white mt-2">
            {exclusiveCount} <span className="text-xs font-normal text-slate-400">/ {properties.length} totais</span>
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-400 font-medium">
            <span>{((exclusiveCount / (properties.length || 1)) * 100).toFixed(0)}% da carteira</span>
          </div>
        </div>

        {/* Card 4: Leads Alta Intenção */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Leads Quentes</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white mt-2">
            {highIntentLeads} <span className="text-xs font-normal text-slate-400">/ {leadsInKanban} no funil</span>
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-purple-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Em proposta ou visita</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Activity & Portal Multi-Posting Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Properties Quick List (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-100 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-sky-400" /> Imóveis Recentes na Carteira
                </h3>
                <p className="text-xs text-slate-400">Últimos imóveis cadastrados e sincronizados</p>
              </div>
              <button
                onClick={() => setActiveTab('properties')}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
              >
                Ver todos <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {properties.slice(0, 3).map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => setSelectedPropertyForDetail(prop)}
                  className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80 hover:border-sky-500/40 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-14 h-14 rounded-lg object-cover border border-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">
                          {prop.code}
                        </span>
                        <span className="text-xs text-slate-400">{prop.type}</span>
                        {prop.isExclusive && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-semibold border border-amber-500/30">
                            Exclusivo
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-xs text-slate-200 group-hover:text-sky-300 transition-colors line-clamp-1 mt-0.5">
                        {prop.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {prop.address.neighborhood}, {prop.address.city} • {prop.area}m² • {prop.bedrooms} dorms
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-extrabold text-sm text-white">
                      {prop.price > 0 ? `R$ ${(prop.price / 1000).toFixed(0)} mil` : `R$ ${prop.rentPrice}/mês`}
                    </p>
                    <span className="inline-block text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium mt-1">
                      {prop.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CRM Leads Quick Pipeline Overview */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" /> Status do Funil Comercial
                </h3>
                <p className="text-xs text-slate-400">Distribuição de contatos por etapa Kanban</p>
              </div>
              <button
                onClick={() => setActiveTab('crm')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                Abrir Kanban <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                { status: 'Novo Lead', color: 'border-blue-500/40 bg-blue-500/10 text-blue-400' },
                { status: 'Primeiro Atendimento', color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400' },
                { status: 'Visita Agendada', color: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
                { status: 'Proposta Recebida', color: 'border-purple-500/40 bg-purple-500/10 text-purple-400' },
                { status: 'Fechamento', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' },
              ].map((item) => {
                const count = leads.filter((l) => l.status === item.status).length;
                return (
                  <div key={item.status} className={`p-3 rounded-xl border ${item.color} text-center`}>
                    <p className="text-xl font-extrabold">{count}</p>
                    <p className="text-[10px] font-medium mt-1 truncate">{item.status}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Portal Integration & AI Assistant Widgets */}
        <div className="space-y-6">
          {/* Portal Integration Card */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
                <Share2 className="w-4 h-4 text-cyan-400" /> Multi-Posting Portais
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                Ativo
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Sincronização automática de carga única com portais imobiliários.
            </p>

            <div className="space-y-2.5">
              {[
                { name: 'ZAP Imóveis', active: true, count: properties.filter((p) => p.portalSync.zap).length },
                { name: 'VivaReal', active: true, count: properties.filter((p) => p.portalSync.vivareal).length },
                { name: 'OLX Brasil', active: true, count: properties.filter((p) => p.portalSync.olx).length },
                { name: 'ImovelWeb', active: true, count: properties.filter((p) => p.portalSync.imovelweb).length },
              ].map((portal) => (
                <div key={portal.name} className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold text-slate-200">{portal.name}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{portal.count} anúncios</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('portals')}
              className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 rounded-xl border border-slate-700 transition-all text-center"
            >
              Gerenciar Integrações e Feeds XML
            </button>
          </div>

          {/* AI Matching Widget */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-900 p-5 border border-purple-800/40">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <h3 className="font-bold text-purple-200 text-sm">Motor de Matching por IA</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Identificamos <strong className="text-white">3 cruzamentos perfeitos</strong> entre os novos imóveis e o perfil de orçamento de clientes ativos no CRM.
            </p>

            <button
              onClick={() => setActiveTab('ai-suite')}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold py-2.5 rounded-xl shadow-md shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Ver Sugestões do Motor de IA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
