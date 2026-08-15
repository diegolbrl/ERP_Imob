import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Property } from '../../types';
import {
  Globe,
  Search,
  MapPin,
  Building2,
  Phone,
  Mail,
  Send,
  BedDouble,
  Bath,
  Maximize2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const WhitelabelSiteModule: React.FC = () => {
  const { properties, addLead } = useApp();

  const [searchPurpose, setSearchPurpose] = useState<'Venda' | 'Locação'>('Venda');
  const [searchNeighborhood, setSearchNeighborhood] = useState('');
  const [selectedPropertyModal, setSelectedPropertyModal] = useState<Property | null>(null);

  // Lead capture form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [leadCreatedSuccess, setLeadCreatedSuccess] = useState(false);

  const displayedProperties = properties.filter((p) => {
    const matchesPurpose = searchPurpose === 'Venda' ? p.price > 0 : !!p.rentPrice;
    const matchesLocation =
      !searchNeighborhood ||
      p.address.neighborhood.toLowerCase().includes(searchNeighborhood.toLowerCase()) ||
      p.address.city.toLowerCase().includes(searchNeighborhood.toLowerCase());

    return matchesPurpose && matchesLocation;
  });

  const handlePublicLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    addLead({
      name: clientName,
      phone: clientPhone,
      email: 'contato.site@cliente.com',
      source: 'Site Próprio',
      status: 'Novo Lead',
      assignedBroker: 'Mariana Oliveira',
      budgetMin: selectedPropertyModal?.price || selectedPropertyModal?.rentPrice || 500000,
      budgetMax: (selectedPropertyModal?.price || selectedPropertyModal?.rentPrice || 500000) * 1.15,
      preferredType: selectedPropertyModal?.type || 'Apartamento',
      preferredNeighborhoods: [selectedPropertyModal?.address.neighborhood || 'Jardins'],
      interestedPropertyIds: selectedPropertyModal ? [selectedPropertyModal.id] : [],
      notes: `Mensagem enviada via formulário do site sobre o imóvel ${selectedPropertyModal?.code}: "${clientMessage}"`,
    });

    setLeadCreatedSuccess(true);
    setTimeout(() => {
      setLeadCreatedSuccess(false);
      setSelectedPropertyModal(null);
      setClientName('');
      setClientPhone('');
      setClientMessage('');
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Whitelabel Header Banner */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-white">Preview do Site Whitelabel (Portal Público)</h2>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                SEO Otimizado & SSL Ativo
              </span>
            </div>
            <p className="text-xs text-slate-400">
              URL da Imobiliária: <strong className="text-sky-400">https://www.imobiliariapremium.com.br</strong>
            </p>
          </div>
        </div>

        <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          ⚡ Captação Direta para o CRM Ativada
        </span>
      </div>

      {/* Embedded Website Container Mock */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        {/* Browser Top Bar Mock */}
        <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <div className="flex-1 max-w-xl mx-auto bg-slate-900 rounded-lg px-3 py-1 text-center font-mono text-[11px] text-slate-400 border border-slate-800">
            https://www.imobiliariapremium.com.br/buscar
          </div>
        </div>

        {/* WEBSITE BODY */}
        <div className="bg-slate-950 text-slate-100 min-h-[600px]">
          {/* Website Hero Header */}
          <div className="relative py-16 px-6 bg-gradient-to-b from-sky-950/40 via-slate-950 to-slate-950 text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 px-3 py-1 rounded-full text-xs font-semibold border border-sky-500/20">
              <Building2 className="w-3.5 h-3.5" /> Encontre o Imóvel dos Seus Sonhos
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
              Sua Nova História Começa Aqui.
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Os melhores imóveis de alto padrão e oportunidades exclusivas em São Paulo.
            </p>

            {/* Public Search Box Widget */}
            <div className="max-w-3xl mx-auto bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-2xl space-y-3">
              {/* Purpose Switch Tabs */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setSearchPurpose('Venda')}
                  className={`px-5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    searchPurpose === 'Venda' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Comprar
                </button>
                <button
                  onClick={() => setSearchPurpose('Locação')}
                  className={`px-5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    searchPurpose === 'Locação' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Alugar
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchNeighborhood}
                    onChange={(e) => setSearchNeighborhood(e.target.value)}
                    placeholder="Digite o bairro ou cidade..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button className="bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30">
                  <Search className="w-4 h-4" /> Buscar Imóveis
                </button>
              </div>
            </div>
          </div>

          {/* Properties Showcase Grid */}
          <div className="p-6 max-w-6xl mx-auto space-y-6">
            <h3 className="font-bold text-xl text-white">Destaques Exclusivos</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayedProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-sky-500/50 transition-all group"
                >
                  <div className="relative h-48 bg-slate-950">
                    <img src={prop.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-3 right-3 bg-sky-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                      {prop.code}
                    </span>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-xs text-sky-400 font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {prop.address.neighborhood}, {prop.address.city}
                    </p>
                    <h4 className="font-bold text-sm text-white line-clamp-1">{prop.title}</h4>

                    <div className="flex items-center gap-4 text-xs text-slate-400 py-2 border-y border-slate-800">
                      <span>{prop.area}m²</span>
                      <span>{prop.bedrooms} dorms</span>
                      <span>{prop.bathrooms} banhs</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <p className="text-lg font-extrabold text-white">
                        {prop.price > 0 ? `R$ ${prop.price.toLocaleString('pt-BR')}` : `R$ ${prop.rentPrice}/mês`}
                      </p>
                      <button
                        onClick={() => setSelectedPropertyModal(prop)}
                        className="bg-slate-800 hover:bg-sky-600 text-slate-200 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
                      >
                        Agendar Visita
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Public Lead Capture Modal */}
      {selectedPropertyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-lg text-white">Agendar Visita ou Enviar Proposta</h3>
            <p className="text-xs text-slate-400">
              Interesse no imóvel <strong className="text-sky-400">{selectedPropertyModal.code}</strong> - {selectedPropertyModal.title}
            </p>

            {leadCreatedSuccess ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-300">Solicitação Enviada com Sucesso!</h4>
                <p className="text-xs text-slate-300">
                  Um corretor especializado entrará em contato em instantes via WhatsApp. (Lead cadastrado no CRM).
                </p>
              </div>
            ) : (
              <form onSubmit={handlePublicLeadSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Seu Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Seu WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="(11) 98888-7777"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Mensagem (Opcional)</label>
                  <textarea
                    value={clientMessage}
                    onChange={(e) => setClientMessage(e.target.value)}
                    placeholder="Gostaria de agendar uma visita para este Sábado às 14h..."
                    rows={3}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPropertyModal(null)}
                    className="px-3 py-2 rounded-xl text-slate-400 hover:text-white"
                  >
                    Fechar
                  </button>
                  <button
                    type="submit"
                    className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded-xl"
                  >
                    Enviar Solicitação
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
