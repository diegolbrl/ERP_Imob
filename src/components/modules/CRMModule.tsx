import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStatus } from '../../types';
import {
  Users,
  Plus,
  MessageSquare,
  Calendar,
  DollarSign,
  CheckCircle2,
  Phone,
  Mail,
  UserCheck,
  Building,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const CRMModule: React.FC = () => {
  const { leads, updateLeadStatus, setSelectedLeadForDetail, brokers, addLead } = useApp();
  const [selectedBrokerFilter, setSelectedBrokerFilter] = useState<string>('Todos');
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);

  // New Lead form state
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadSource, setNewLeadSource] = useState<any>('Portais (ZAP/VivaReal)');
  const [newLeadBroker, setNewLeadBroker] = useState(brokers[0]?.name || '');
  const [newLeadBudgetMax, setNewLeadBudgetMax] = useState(1500000);

  const columns: { status: LeadStatus; label: string; color: string; badgeColor: string }[] = [
    { status: 'Novo Lead', label: '1. Novo Lead', color: 'border-blue-500/40 bg-blue-950/20', badgeColor: 'bg-blue-500/20 text-blue-300' },
    { status: 'Primeiro Atendimento', label: '2. 1º Atendimento', color: 'border-indigo-500/40 bg-indigo-950/20', badgeColor: 'bg-indigo-500/20 text-indigo-300' },
    { status: 'Visita Agendada', label: '3. Visita Agendada', color: 'border-amber-500/40 bg-amber-950/20', badgeColor: 'bg-amber-500/20 text-amber-300' },
    { status: 'Proposta Recebida', label: '4. Proposta Recebida', color: 'border-purple-500/40 bg-purple-950/20', badgeColor: 'bg-purple-500/20 text-purple-300' },
    { status: 'Fechamento', label: '5. Fechamento', color: 'border-emerald-500/40 bg-emerald-950/20', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
  ];

  const filteredLeads = leads.filter(
    (lead) => selectedBrokerFilter === 'Todos' || lead.assignedBroker === selectedBrokerFilter
  );

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadPhone) return;

    addLead({
      name: newLeadName,
      phone: newLeadPhone,
      email: newLeadEmail || 'lead@email.com',
      source: newLeadSource,
      status: 'Novo Lead',
      assignedBroker: newLeadBroker,
      budgetMin: 500000,
      budgetMax: Number(newLeadBudgetMax),
      preferredType: 'Apartamento',
      preferredNeighborhoods: ['Jardins', 'Itaim Bibi'],
      interestedPropertyIds: [],
      notes: 'Lead criado via formulário rápido do CRM.',
    });

    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadEmail('');
    setShowAddLeadModal(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" /> CRM Commercial Pipeline (Kanban)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ingestão multicanal de leads, funil de conversão visual e acompanhamento da equipe de vendas
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Broker Filter */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            <UserCheck className="w-4 h-4 text-slate-400" />
            <select
              value={selectedBrokerFilter}
              onChange={(e) => setSelectedBrokerFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none"
            >
              <option value="Todos">Todos os Corretores</option>
              {brokers.map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowAddLeadModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Lead</span>
          </button>
        </div>
      </div>

      {/* Broker Round Robin Fila Info Banner */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-200">Regra de Distribuição Ativa: Fila por Rodízio Automático</h4>
            <p className="text-[11px] text-slate-400">Próximo corretor a receber lead dos portais: <strong className="text-sky-400">Mariana Oliveira</strong></p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {brokers.map((b) => (
            <div key={b.id} className="flex items-center gap-2 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
              <img src={b.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
              <span className="text-slate-300 font-medium">{b.name.split(' ')[0]}</span>
              <span className="bg-slate-800 text-slate-400 text-[10px] px-1.5 py-0.5 rounded font-mono">{b.activeLeadsCount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* KANBAN BOARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colLeads = filteredLeads.filter((l) => l.status === col.status);
          return (
            <div
              key={col.status}
              className={`rounded-2xl border ${col.color} p-3.5 flex flex-col h-[650px] bg-slate-900/40 backdrop-blur-sm`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-800">
                <h3 className="font-bold text-xs text-slate-200 uppercase tracking-wide">
                  {col.label}
                </h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${col.badgeColor}`}>
                  {colLeads.length}
                </span>
              </div>

              {/* Lead Cards List */}
              <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                {colLeads.length === 0 ? (
                  <div className="h-32 border-2 border-dashed border-slate-800/60 rounded-xl flex items-center justify-center text-[11px] text-slate-600">
                    Nenhum lead nesta etapa
                  </div>
                ) : (
                  colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="glass-card p-4 rounded-xl border border-slate-800 hover:border-purple-500/50 transition-all duration-200 space-y-3 cursor-pointer group"
                      onClick={() => setSelectedLeadForDetail(lead)}
                    >
                      {/* Lead Top Bar */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold bg-slate-800 text-purple-300 px-2 py-0.5 rounded border border-slate-700">
                          {lead.source}
                        </span>
                        <span className="text-[10px] text-slate-500">{lead.createdAt}</span>
                      </div>

                      {/* Name & Contact */}
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                          {lead.name}
                        </h4>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-500" /> {lead.phone}
                        </p>
                      </div>

                      {/* Preferred Search Info */}
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-[11px] space-y-1">
                        <p className="text-slate-300 font-medium truncate">
                          Busca: {lead.preferredType} em {lead.preferredNeighborhoods.join(', ')}
                        </p>
                        <p className="text-emerald-400 font-extrabold font-mono">
                          Até R$ {(lead.budgetMax / 1000).toFixed(0)} mil
                        </p>
                      </div>

                      {/* Broker Assigned */}
                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                        <span className="truncate max-w-[120px]">👤 {lead.assignedBroker.split(' ')[0]}</span>

                        {/* Move Status Buttons */}
                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100" onClick={(e) => e.stopPropagation()}>
                          {col.status !== 'Fechamento' && (
                            <button
                              onClick={() => {
                                const currentIndex = columns.findIndex((c) => c.status === col.status);
                                if (currentIndex < columns.length - 1) {
                                  updateLeadStatus(lead.id, columns[currentIndex + 1].status);
                                }
                              }}
                              className="p-1 bg-slate-800 hover:bg-purple-600 text-slate-300 hover:text-white rounded-md transition-colors"
                              title="Avançar etapa no funil"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Quick Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-lg text-white">Cadastrar Novo Lead Comercial</h3>
            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="Ex: Dr. Paulo Roberto"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">WhatsApp / Telefone</label>
                <input
                  type="text"
                  required
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                  placeholder="(11) 99999-8888"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Origem do Lead</label>
                <select
                  value={newLeadSource}
                  onChange={(e) => setNewLeadSource(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Portais (ZAP/VivaReal)">Portais (ZAP/VivaReal)</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Site Próprio">Site Próprio</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Indicação">Indicação</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Corretor Responsável</label>
                <select
                  value={newLeadBroker}
                  onChange={(e) => setNewLeadBroker(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  {brokers.map((b) => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Orçamento Máximo (R$)</label>
                <input
                  type="number"
                  value={newLeadBudgetMax}
                  onChange={(e) => setNewLeadBudgetMax(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-3 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2 rounded-xl"
                >
                  Salvar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
