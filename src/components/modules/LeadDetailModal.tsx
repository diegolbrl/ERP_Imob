import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeadStatus } from '../../types';
import {
  X,
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  MessageSquare,
  Building2,
  Sparkles,
  Plus,
  Send,
  CheckCircle2,
} from 'lucide-react';

export const LeadDetailModal: React.FC = () => {
  const {
    selectedLeadForDetail,
    setSelectedLeadForDetail,
    updateLeadStatus,
    addLeadTimelineEvent,
    getMatchingPropertiesForLead,
    setSelectedPropertyForDetail,
    setActiveTab,
  } = useApp();

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDesc, setNewEventDesc] = useState('');
  const [eventType, setEventType] = useState<'message' | 'visit' | 'proposal' | 'call'>('call');

  if (!selectedLeadForDetail) return null;
  const lead = selectedLeadForDetail;
  const matchingProperties = getMatchingPropertiesForLead(lead);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle) return;

    addLeadTimelineEvent(lead.id, newEventTitle, newEventDesc, eventType);
    setNewEventTitle('');
    setNewEventDesc('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 font-bold flex items-center justify-center border border-purple-500/30 text-lg">
              {lead.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-white">{lead.name}</h2>
                <span className="text-xs bg-slate-800 text-purple-300 px-2.5 py-0.5 rounded font-semibold border border-slate-700">
                  {lead.source}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Corretor Responsável: <strong className="text-slate-200">{lead.assignedBroker}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedLeadForDetail(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Lead Info & Search Profile */}
          <div className="space-y-4">
            {/* Contact Details */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
              <h4 className="text-xs uppercase font-bold text-slate-400 border-b border-slate-800 pb-2">
                Contato & Atendimento
              </h4>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400" /> {lead.phone}
              </p>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400" /> {lead.email}
              </p>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-sky-400" /> Criado em: {lead.createdAt}
              </p>
            </div>

            {/* Status Selector */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs uppercase font-bold text-slate-400">Alterar Etapa no Funil</h4>
              <select
                value={lead.status}
                onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:border-purple-500 focus:outline-none"
              >
                <option value="Novo Lead">1. Novo Lead</option>
                <option value="Primeiro Atendimento">2. Primeiro Atendimento</option>
                <option value="Visita Agendada">3. Visita Agendada</option>
                <option value="Proposta Recebida">4. Proposta Recebida</option>
                <option value="Fechamento">5. Fechamento</option>
              </select>
            </div>

            {/* Search Preferences */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <h4 className="text-xs uppercase font-bold text-slate-400 border-b border-slate-800 pb-2">
                Perfil de Busca Desejado
              </h4>
              <p className="text-slate-300"><strong className="text-slate-400">Tipo:</strong> {lead.preferredType}</p>
              <p className="text-slate-300"><strong className="text-slate-400">Bairros:</strong> {lead.preferredNeighborhoods.join(', ')}</p>
              <p className="text-slate-300">
                <strong className="text-slate-400">Orçamento:</strong> R$ {lead.budgetMin.toLocaleString('pt-BR')} - R$ {lead.budgetMax.toLocaleString('pt-BR')}
              </p>
            </div>

            {/* AI Suggested Properties */}
            <div className="bg-purple-950/20 border border-purple-800/40 p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-xs text-purple-200">Imóveis Recomendados ({matchingProperties.length})</h4>
              </div>

              <div className="space-y-2">
                {matchingProperties.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedLeadForDetail(null);
                      setSelectedPropertyForDetail(p);
                      setActiveTab('properties');
                    }}
                    className="p-2 bg-slate-900 rounded-lg border border-slate-800 hover:border-purple-500/40 cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-mono text-sky-400 font-bold">{p.code}</span>
                      <p className="text-slate-200 line-clamp-1">{p.title}</p>
                    </div>
                    <span className="text-[10px] font-extrabold text-white">R$ {(p.price/1000).toFixed(0)}k</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Unified Timeline & Interactions (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-bold text-slate-400 border-b border-slate-800 pb-2">
              Linha do Tempo Unificada & Histórico de Interações
            </h4>

            {/* Add New Interaction Form */}
            <form onSubmit={handleAddEvent} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Registrar Nova Interação</span>
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
                  {[
                    { id: 'call', label: 'Ligação' },
                    { id: 'message', label: 'Mensagem' },
                    { id: 'visit', label: 'Visita' },
                    { id: 'proposal', label: 'Proposta' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setEventType(t.id as any)}
                      className={`px-2 py-0.5 text-[10px] rounded font-medium transition-all ${
                        eventType === t.id ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                required
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Título da interação (ex: Visita realizada no imóvel IMO-101)..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none"
              />

              <textarea
                value={newEventDesc}
                onChange={(e) => setNewEventDesc(e.target.value)}
                placeholder="Detalhes adicionais ou feedback do cliente..."
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md transition-all"
                >
                  <Send className="w-3.5 h-3.5" /> Registar no Histórico
                </button>
              </div>
            </form>

            {/* Timeline Stream */}
            <div className="space-y-3 relative pl-4 border-l-2 border-slate-800">
              {lead.timeline.map((evt) => (
                <div key={evt.id} className="relative group">
                  <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-slate-900"></div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200">{evt.title}</span>
                      <span className="text-[10px] font-mono text-slate-500">{evt.date}</span>
                    </div>
                    <p className="text-xs text-slate-400">{evt.description}</p>
                    <p className="text-[10px] text-purple-400 font-semibold pt-1">
                      Por: {evt.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
