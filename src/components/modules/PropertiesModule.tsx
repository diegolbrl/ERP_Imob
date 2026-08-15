import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Property, PropertyType, PropertyPurpose } from '../../types';
import {
  Building2,
  Search,
  Filter,
  Plus,
  Grid,
  List,
  Key,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Users,
  Share2,
  Trash2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const PropertiesModule: React.FC = () => {
  const {
    properties,
    setSelectedPropertyForDetail,
    setIsNewPropertyModalOpen,
    deleteProperty,
    getMatchingLeadsForProperty,
    setActiveTab,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('Todos');
  const [exclusiveOnly, setExclusiveOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const propertyTypes: (PropertyType | 'Todos')[] = [
    'Todos',
    'Apartamento',
    'Casa',
    'Cobertura',
    'Terreno',
    'Comercial',
  ];

  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.address.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.address.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'Todos' || prop.type === selectedType;
    const matchesPurpose =
      selectedPurpose === 'Todos' || prop.purpose.includes(selectedPurpose);
    const matchesExclusive = !exclusiveOnly || prop.isExclusive;

    return matchesSearch && matchesType && matchesPurpose && matchesExclusive;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header & Main Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-sky-400" /> Carteira de Imóveis
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Gestão técnica, controle de exclusividade e distribuição de portais ({filteredProperties.length} de {properties.length} imóveis)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode toggle */}
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Visualização em Grade"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'table' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Visualização em Tabela"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsNewPropertyModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-sky-600/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Imóvel</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Text Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por código, título, bairro ou cidade..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-all"
            />
          </div>

          {/* Purpose Filter */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl">
            {['Todos', 'Venda', 'Locação'].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPurpose(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedPurpose === p ? 'bg-slate-800 text-sky-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Exclusivity Toggle */}
          <button
            onClick={() => setExclusiveOnly(!exclusiveOnly)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
              exclusiveOnly
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Apenas Exclusivos</span>
          </button>
        </div>

        {/* Type Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-2">
            <Filter className="w-3 h-3" /> Tipo:
          </span>
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedType === type
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((prop) => {
            const matchingLeads = getMatchingLeadsForProperty(prop);
            return (
              <div
                key={prop.id}
                className="glass-panel rounded-2xl border border-slate-800 overflow-hidden hover:border-sky-500/40 transition-all duration-300 group flex flex-col"
              >
                {/* Property Image Header */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-slate-950/80 backdrop-blur-md text-sky-400 font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                      {prop.code}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {prop.isExclusive && (
                        <span className="bg-amber-500/90 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                          <Key className="w-3 h-3" /> Exclusivo
                        </span>
                      )}
                      <span className="bg-emerald-500/90 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full">
                        {prop.status}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xs font-medium text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      {prop.address.neighborhood}, {prop.address.city}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => setSelectedPropertyForDetail(prop)}
                      className="font-bold text-slate-100 text-sm hover:text-sky-400 cursor-pointer transition-colors line-clamp-2"
                    >
                      {prop.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {prop.description}
                    </p>
                  </div>

                  {/* Property Features Icons */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800 text-center text-xs text-slate-300">
                    <div className="flex items-center justify-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{prop.area} m²</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5 text-slate-400" />
                      <span>{prop.bedrooms} dorms</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-slate-400" />
                      <span>{prop.bathrooms} banhs</span>
                    </div>
                  </div>

                  {/* Price & Portal Sync status */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Valor</p>
                      <p className="text-lg font-extrabold text-white">
                        {prop.price > 0
                          ? `R$ ${prop.price.toLocaleString('pt-BR')}`
                          : `R$ ${prop.rentPrice?.toLocaleString('pt-BR')}/mês`}
                      </p>
                    </div>

                    {/* Matching Leads Badge */}
                    {matchingLeads.length > 0 && (
                      <div className="bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs px-2.5 py-1 rounded-xl flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span className="font-semibold">{matchingLeads.length} leads no perfil</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedPropertyForDetail(prop)}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs py-2 rounded-xl border border-slate-700 transition-all text-center"
                    >
                      Ver Detalhes Técs.
                    </button>

                    <button
                      onClick={() => deleteProperty(prop.id)}
                      className="p-2 bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 rounded-xl border border-slate-800 transition-all"
                      title="Excluir imóvel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Código / Imóvel</th>
                <th className="p-4">Tipo & Finalidade</th>
                <th className="p-4">Localização</th>
                <th className="p-4">Área / Dorms</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProperties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={prop.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <span className="font-mono text-sky-400 font-bold">{prop.code}</span>
                        <p className="font-semibold text-white line-clamp-1">{prop.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-200">{prop.type}</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{prop.purpose}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-slate-200">{prop.address.neighborhood}</p>
                    <p className="text-[10px] text-slate-400">{prop.address.city} - {prop.address.state}</p>
                  </td>
                  <td className="p-4 font-mono">
                    {prop.area}m² • {prop.bedrooms} dorms
                  </td>
                  <td className="p-4 font-extrabold text-white">
                    {prop.price > 0 ? `R$ ${prop.price.toLocaleString('pt-BR')}` : `R$ ${prop.rentPrice}/mês`}
                  </td>
                  <td className="p-4">
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                      {prop.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedPropertyForDetail(prop)}
                      className="text-sky-400 hover:text-sky-300 font-semibold text-xs"
                    >
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
