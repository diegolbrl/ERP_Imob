import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PropertyType, PropertyPurpose, PropertyStatus } from '../../types';
import { X, Building2, Plus, Sparkles } from 'lucide-react';

export const NewPropertyModal: React.FC = () => {
  const { isNewPropertyModalOpen, setIsNewPropertyModalOpen, addProperty } = useApp();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<PropertyType>('Apartamento');
  const [purpose, setPurpose] = useState<PropertyPurpose>('Venda');
  const [status, setStatus] = useState<PropertyStatus>('Disponível');
  const [price, setPrice] = useState<number>(0);
  const [rentPrice, setRentPrice] = useState<number>(0);
  const [area, setArea] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [parkingSpots, setParkingSpots] = useState<number>(1);
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('São Paulo');
  const [state, setState] = useState('SP');
  const [description, setDescription] = useState('');
  const [isExclusive, setIsExclusive] = useState(true);

  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');

  if (!isNewPropertyModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !neighborhood || !city) return;

    addProperty({
      title,
      type,
      purpose,
      status,
      price: Number(price),
      rentPrice: Number(rentPrice),
      area: Number(area),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      parkingSpots: Number(parkingSpots),
      address: {
        street,
        number,
        neighborhood,
        city,
        state,
        zipCode: '01000-000',
      },
      features: ['Portaria 24h', 'Varanda', 'Garagem'],
      description: description || 'Excelente imóvel em localização privilegiada.',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      ],
      isExclusive,
      exclusivityEndDate: '2027-01-01',
      owner: {
        name: ownerName || 'Proprietário Não Informado',
        phone: ownerPhone || '(11) 90000-0000',
        email: ownerEmail || 'proprietario@email.com',
        document: '000.000.000-00',
      },
      portalSync: {
        zap: true,
        vivareal: true,
        olx: true,
        imovelweb: false,
      },
    });

    setIsNewPropertyModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-400" />
            <h2 className="font-bold text-lg text-white">Cadastrar Novo Imóvel</h2>
          </div>
          <button
            onClick={() => setIsNewPropertyModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold text-slate-400 border-b border-slate-800 pb-1">
              1. Dados do Anúncio
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Título Comercial</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Cobertura Duplex Reformada nos Jardins"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tipo de Imóvel</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as PropertyType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="Apartamento">Apartamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Cobertura">Cobertura</option>
                  <option value="Terreno">Terreno</option>
                  <option value="Comercial">Comercial</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Finalidade</label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as PropertyPurpose)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="Venda">Venda</option>
                  <option value="Locação">Locação</option>
                  <option value="Venda e Locação">Venda e Locação</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="Disponível">Disponível</option>
                  <option value="Reservado">Reservado</option>
                  <option value="Suspenso">Suspenso</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Values & Specs */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold text-slate-400 border-b border-slate-800 pb-1">
              2. Valoração e Especificações Físicas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Valor Venda (R$)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Aluguel Mensal (R$)</label>
                <input
                  type="number"
                  value={rentPrice}
                  onChange={(e) => setRentPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Área Útil (m²)</label>
                <input
                  type="number"
                  required
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Dormitórios</label>
                <input
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Address */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold text-slate-400 border-b border-slate-800 pb-1">
              3. Localização
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Bairro</label>
                <input
                  type="text"
                  required
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Ex: Itaim Bibi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cidade</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Estado</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Owner */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold text-slate-400 border-b border-slate-800 pb-1">
              4. Dados do Proprietário (LGPD)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Proprietário</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Ex: Fernando de Souza"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Telefone Direct</label>
                <input
                  type="text"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  placeholder="(11) 98888-7777"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail</label>
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  placeholder="proprietario@email.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsNewPropertyModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-sky-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Salvar e Sincronizar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
