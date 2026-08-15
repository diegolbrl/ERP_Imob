import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building as BuildingIcon, Plus, MapPin, Layers, Home, DollarSign, CheckCircle2 } from 'lucide-react';

export const BuildingsModule: React.FC = () => {
  const { buildings, properties, addBuilding } = useApp();
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('São Paulo');
  const [floorsCount, setFloorsCount] = useState(15);
  const [unitsCount, setUnitsCount] = useState(60);
  const [defaultCondoFee, setDefaultCondoFee] = useState(850);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !neighborhood) return;

    addBuilding({
      name,
      address: {
        street: street || 'Av. Paulista',
        number: '1000',
        neighborhood,
        city,
        state: 'SP',
        zipCode: '01310-100',
      },
      floorsCount: Number(floorsCount),
      unitsCount: Number(unitsCount),
      defaultCondoFee: Number(defaultCondoFee),
      amenities: ['Portaria 24h', 'Academia', 'Piscina', 'Garagem'],
      associatedPropertyIds: [],
      totalRevenueProjected: Number(unitsCount) * Number(defaultCondoFee),
    });

    setName('');
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BuildingIcon className="w-6 h-6 text-sky-400" /> Condomínios & Edifícios
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Gestão de empreendimentos residenciais e comerciais, controle de unidades e previsão de receita de condomínio
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-sky-600/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Edifício</span>
        </button>
      </div>

      {/* Grid of Buildings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {buildings.map((bldg) => {
          const linkedProperties = properties.filter((p) => p.buildingId === bldg.id);
          return (
            <div
              key={bldg.id}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-sky-500/40 transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg text-white">{bldg.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    {bldg.address.street}, {bldg.address.number} - {bldg.address.neighborhood}, {bldg.address.city}
                  </p>
                </div>

                <span className="bg-sky-500/10 text-sky-400 text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-sky-500/20">
                  {bldg.unitsCount} Unidades
                </span>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Andares</span>
                  <p className="font-bold text-white mt-0.5">{bldg.floorsCount} pavimentos</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Condomínio Média</span>
                  <p className="font-bold text-emerald-400 mt-0.5">R$ {bldg.defaultCondoFee}/mês</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Unidades Gestão</span>
                  <p className="font-bold text-sky-300 mt-0.5">{linkedProperties.length} imóveis</p>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Infraestrutura do Edifício</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {bldg.amenities.map((item) => (
                    <span key={item} className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-lg border border-slate-700">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Linked Properties */}
              {linkedProperties.length > 0 && (
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Unidades Cadastradas na Carteira:</span>
                  <div className="space-y-1.5 mt-1.5">
                    {linkedProperties.map((p) => (
                      <div key={p.id} className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-sky-400">{p.code} - {p.title}</span>
                        <span className="text-white font-semibold">R$ {p.price > 0 ? p.price.toLocaleString('pt-BR') : `${p.rentPrice}/mês`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal Novo Edifício */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-lg text-white">Cadastrar Condomínio / Edifício</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Nome do Edifício</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Condomínio Grand Tower Pinheiros"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Bairro</label>
                <input
                  type="text"
                  required
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Ex: Pinheiros"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">Total Andares</label>
                  <input
                    type="number"
                    value={floorsCount}
                    onChange={(e) => setFloorsCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Total Unidades</label>
                  <input
                    type="number"
                    value={unitsCount}
                    onChange={(e) => setUnitsCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Taxa de Condomínio Padrão (R$)</label>
                <input
                  type="number"
                  value={defaultCondoFee}
                  onChange={(e) => setDefaultCondoFee(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Salvar Edifício
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
