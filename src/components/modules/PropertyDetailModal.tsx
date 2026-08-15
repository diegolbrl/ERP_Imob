import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Property } from '../../types';
import {
  X,
  MapPin,
  Maximize2,
  BedDouble,
  Bath,
  Car,
  Key,
  ShieldCheck,
  User,
  Phone,
  Mail,
  FileText,
  Share2,
  Sparkles,
  CheckCircle2,
  Building,
  Check,
} from 'lucide-react';

export const PropertyDetailModal: React.FC = () => {
  const {
    selectedPropertyForDetail,
    setSelectedPropertyForDetail,
    togglePortalSync,
    getMatchingLeadsForProperty,
    setSelectedLeadForDetail,
    setActiveTab,
  } = useApp();

  const [showOwnerDetails, setShowOwnerDetails] = useState(false);
  const [activeTab, setActiveTabLocal] = useState<'info' | 'portals' | 'matching' | 'owner'>('info');

  if (!selectedPropertyForDetail) return null;
  const prop = selectedPropertyForDetail;
  const matchingLeads = getMatchingLeadsForProperty(prop);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2.5 py-1 rounded-lg">
              {prop.code}
            </span>
            <div>
              <h2 className="font-bold text-lg text-white line-clamp-1">{prop.title}</h2>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                {prop.address.street}, {prop.address.number} - {prop.address.neighborhood}, {prop.address.city}/{prop.address.state}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedPropertyForDetail(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 border-b border-slate-800 bg-slate-950/50">
          {[
            { id: 'info', label: 'Ficha Técnica & Fotos' },
            { id: 'portals', label: 'Multi-posting Portais', badge: Object.values(prop.portalSync).filter(Boolean).length },
            { id: 'matching', label: 'Match com Leads CRM', badge: matchingLeads.length },
            { id: 'owner', label: 'Proprietário & LGPD' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabLocal(tab.id as any)}
              className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-sky-500 text-sky-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: INFO & FOTOS */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Image Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2 h-64 rounded-xl overflow-hidden border border-slate-800">
                  <img src={prop.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-rows-2 gap-3 h-64">
                  {prop.images[1] ? (
                    <div className="rounded-xl overflow-hidden border border-slate-800">
                      <img src={prop.images[1]} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="bg-slate-950 rounded-xl flex items-center justify-center text-xs text-slate-500">Sem foto 2</div>
                  )}
                  {prop.images[2] ? (
                    <div className="rounded-xl overflow-hidden border border-slate-800">
                      <img src={prop.images[2]} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="bg-slate-950 rounded-xl flex items-center justify-center text-xs text-slate-500">Sem foto 3</div>
                  )}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Valor Venda</span>
                  <p className="text-base font-extrabold text-white">
                    {prop.price > 0 ? `R$ ${prop.price.toLocaleString('pt-BR')}` : 'Sob Consulta'}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Valor Locação</span>
                  <p className="text-base font-extrabold text-sky-400">
                    {prop.rentPrice ? `R$ ${prop.rentPrice.toLocaleString('pt-BR')}/mês` : 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Condomínio / IPTU</span>
                  <p className="text-xs font-semibold text-slate-300">
                    R$ {prop.condoFee || 0} / R$ {prop.iptu || 0}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Área Útil</span>
                  <p className="text-base font-extrabold text-emerald-400">{prop.area} m²</p>
                </div>
              </div>

              {/* Physical Attributes */}
              <div className="flex items-center gap-6 py-3 border-y border-slate-800 text-xs text-slate-300">
                <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-sky-400" /> {prop.bedrooms} Quarto(s)</span>
                <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-sky-400" /> {prop.bathrooms} Banheiro(s)</span>
                <span className="flex items-center gap-1.5"><Car className="w-4 h-4 text-sky-400" /> {prop.parkingSpots} Vaga(s)</span>
                {prop.isExclusive && (
                  <span className="flex items-center gap-1 text-amber-400 font-semibold bg-amber-500/10 px-2 py-1 rounded">
                    <Key className="w-3.5 h-3.5" /> Exclusividade até {prop.exclusivityEndDate}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-400 mb-2">Descrição Comercial</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 whitespace-pre-line">
                  {prop.description}
                </p>
              </div>

              {/* Features Tags */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-400 mb-2">Diferenciais e Infraestrutura</h4>
                <div className="flex flex-wrap gap-2">
                  {prop.features.map((feat) => (
                    <span key={feat} className="text-xs bg-slate-800 text-slate-200 px-3 py-1 rounded-lg border border-slate-700">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PORTAIS */}
          {activeTab === 'portals' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Selecione em quais portais imobiliários parceiros este anúncio deve ser publicado automaticamente via feed XML/JSON.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'zap', name: 'ZAP Imóveis', desc: 'Maior portal do grupo OLX' },
                  { key: 'vivareal', name: 'VivaReal', desc: 'Foco em locação e primeira moradia' },
                  { key: 'olx', name: 'OLX Brasil', desc: 'Alcance massivo nacional' },
                  { key: 'imovelweb', name: 'ImovelWeb', desc: 'Foco em imóveis de alto padrão' },
                ].map((portal) => {
                  const isSync = prop.portalSync[portal.key as keyof typeof prop.portalSync];
                  return (
                    <div
                      key={portal.key}
                      className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                        isSync ? 'bg-sky-950/30 border-sky-500/40' : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-sm text-white">{portal.name}</h4>
                        <p className="text-xs text-slate-400">{portal.desc}</p>
                        <span className={`inline-block text-[10px] font-semibold mt-2 ${isSync ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {isSync ? '● Anúncio Sincronizado' : '○ Pausado'}
                        </span>
                      </div>

                      <button
                        onClick={() => togglePortalSync(prop.id, portal.key as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isSync ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {isSync ? 'Ativo' : 'Ativar Portal'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: MATCHING WITH LEADS */}
          {activeTab === 'matching' && (
            <div className="space-y-4">
              <div className="p-4 bg-purple-950/30 border border-purple-800/40 rounded-xl flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-purple-200">Motor de IA de Cruzamento de Perfil</h4>
                  <p className="text-xs text-slate-300">
                    O algoritmo analisou o perfil dos leads cadastrados no CRM e encontrou {matchingLeads.length} compradores/inquilinos em potencial.
                  </p>
                </div>
              </div>

              {matchingLeads.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">Nenhum lead no CRM bateu 100% com o perfil de busca no momento.</p>
              ) : (
                <div className="space-y-3">
                  {matchingLeads.map((lead) => (
                    <div key={lead.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white">{lead.name}</h4>
                        <p className="text-xs text-slate-400">
                          Orçamento: R$ {lead.budgetMin.toLocaleString('pt-BR')} a R$ {lead.budgetMax.toLocaleString('pt-BR')}
                        </p>
                        <p className="text-[11px] text-purple-300 mt-1">
                          Corretor: {lead.assignedBroker} • Status: {lead.status}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedPropertyForDetail(null);
                          setSelectedLeadForDetail(lead);
                          setActiveTab('crm');
                        }}
                        className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
                      >
                        Abrir no CRM
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: OWNER DETAILS & LGPD */}
          {activeTab === 'owner' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Proteção de Dados do Proprietário (LGPD)</h4>
                      <p className="text-xs text-slate-400">Dados protegidos com acesso auditado</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowOwnerDetails(!showOwnerDetails)}
                    className="text-xs text-sky-400 hover:underline font-semibold"
                  >
                    {showOwnerDetails ? 'Ocultar Dados' : 'Revelar Dados Sensíveis'}
                  </button>
                </div>

                {showOwnerDetails ? (
                  <div className="space-y-2.5 pt-2 text-xs text-slate-200">
                    <p><strong className="text-slate-400">Nome Completo:</strong> {prop.owner.name}</p>
                    <p><strong className="text-slate-400">Telefone Direct:</strong> {prop.owner.phone}</p>
                    <p><strong className="text-slate-400">E-mail:</strong> {prop.owner.email}</p>
                    <p><strong className="text-slate-400">CPF/CNPJ:</strong> {prop.owner.document}</p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Clique em "Revelar Dados Sensíveis" para visualizar o contato do proprietário. Todas as visualizações são registradas em log de auditoria.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
