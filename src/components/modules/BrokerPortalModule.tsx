import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, UserCheck, CheckCircle2, Clock, Phone, MapPin, DollarSign, TrendingUp } from 'lucide-react';

export const BrokerPortalModule: React.FC = () => {
  const { brokers, leads, properties } = useApp();
  const [selectedBroker, setSelectedBroker] = useState(brokers[0]);

  const agenda = [
    { time: '09:00', type: 'Visita', leadName: 'Dr. Gabriel Martins', propertyCode: 'IMO-101', address: 'Alameda Gabriel Monteiro da Silva, 1240 - Jardins' },
    { type: 'Telefonema', time: '11:30', leadName: 'Vanessa Ramos', propertyCode: 'IMO-104', address: 'Aluguel Studio Pinheiros' },
    { type: 'Reunião', time: '14:30', leadName: 'Camila & Thiago Barreto', propertyCode: 'IMO-102', address: 'Apresentação de Proposta Cobertura Itaim' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={selectedBroker.avatar} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-sky-500" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{selectedBroker.name}</h2>
              <span className="bg-sky-500/20 text-sky-400 text-xs font-mono font-bold px-2.5 py-0.5 rounded border border-sky-500/30">
                {selectedBroker.creci}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Taxa de Comissão: <strong className="text-emerald-400">{selectedBroker.commissionRate}%</strong> do honorário imobiliário
            </p>
          </div>
        </div>

        {/* Broker Selector */}
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400">Alternar Corretor:</span>
          <select
            value={selectedBroker.id}
            onChange={(e) => {
              const b = brokers.find((br) => br.id === e.target.value);
              if (b) setSelectedBroker(b);
            }}
            className="bg-transparent text-xs font-bold text-white focus:outline-none"
          >
            {brokers.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Performance KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase font-semibold">Leads Ativos na Carteira</span>
          <p className="text-2xl font-extrabold text-white mt-1">{selectedBroker.currentLeadCount} Leads</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase font-semibold">Fechamentos Concluídos</span>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1">{selectedBroker.totalDealsClosed} Vendas / Locações</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase font-semibold">Comissões Estimadas</span>
          <p className="text-2xl font-extrabold text-sky-400 mt-1">R$ 28.500,00</p>
        </div>
      </div>

      {/* Daily Agenda Stream */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sky-400" /> Agenda de Compromissos Hoje
          </h3>
          <span className="text-xs font-mono text-slate-400">13 de Agosto de 2026</span>
        </div>

        <div className="space-y-3">
          {agenda.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex flex-col items-center justify-center font-mono font-bold text-sky-400 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.time}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{item.leadName}</span>
                    <span className="text-[10px] bg-slate-800 text-sky-300 px-2 py-0.5 rounded">
                      {item.type} • {item.propertyCode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{item.address}</p>
                </div>
              </div>

              <button className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all">
                Iniciar Atendimento
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
