import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Client } from '../../types';
import { Contact, Plus, ShieldCheck, CreditCard, DollarSign, UserCheck, Search } from 'lucide-react';

export const ClientsModule: React.FC = () => {
  const { clients, addClient } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [clientTypeFilter, setClientTypeFilter] = useState<string>('Todos');
  const [showModal, setShowModal] = useState(false);

  // New Client Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [clientType, setClientType] = useState<'Proprietário' | 'Inquilino' | 'Comprador' | 'Investidor'>('Proprietário');
  const [pixKey, setPixKey] = useState('');

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.documentNumber.includes(searchTerm);
    const matchesType = clientTypeFilter === 'Todos' || c.clientType === clientTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addClient({
      name,
      email: email || 'cliente@email.com',
      phone,
      documentType: 'CPF',
      documentNumber: documentNumber || '000.000.000-00',
      clientType,
      status: 'Ativo',
      financialInfo: {
        declaredIncome: 25000,
        profession: 'Profissional Liberal',
        bankAccount: {
          bankCode: '341',
          bankName: 'Itaú Unibanco',
          agency: '0001',
          accountNumber: '12345-6',
          accountType: 'Corrente',
          pixKey: pixKey || email || phone,
        },
      },
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
            <Contact className="w-6 h-6 text-sky-400" /> Gestão de Clientes & Payouts Pix
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Cadastro unificado de proprietários, inquilinos e investidores com dados bancários para repasse de aluguéis
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-sky-600/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Cliente</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar cliente por nome, e-mail ou CPF/CNPJ..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl w-full md:w-auto">
          {['Todos', 'Proprietário', 'Inquilino', 'Comprador'].map((t) => (
            <button
              key={t}
              onClick={() => setClientTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                clientTypeFilter === t ? 'bg-slate-800 text-sky-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
            <tr>
              <th className="p-4">Cliente / Contato</th>
              <th className="p-4">Tipo</th>
              <th className="p-4">CPF / CNPJ</th>
              <th className="p-4">Profissão / Renda</th>
              <th className="p-4">Dados Bancários / Pix (Split)</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredClients.map((cli) => (
              <tr key={cli.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-white text-sm">{cli.name}</p>
                  <p className="text-[11px] text-slate-400">{cli.phone} • {cli.email}</p>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    cli.clientType === 'Proprietário' ? 'bg-amber-500/20 text-amber-300' :
                    cli.clientType === 'Inquilino' ? 'bg-sky-500/20 text-sky-300' : 'bg-purple-500/20 text-purple-300'
                  }`}>
                    {cli.clientType}
                  </span>
                </td>
                <td className="p-4 font-mono">{cli.documentNumber}</td>
                <td className="p-4">
                  <p className="font-semibold text-slate-200">{cli.financialInfo?.profession || 'Não informado'}</p>
                  <p className="text-[10px] text-emerald-400 font-mono">
                    R$ {cli.financialInfo?.declaredIncome.toLocaleString('pt-BR') || 0}/mês
                  </p>
                </td>
                <td className="p-4">
                  {cli.financialInfo?.bankAccount ? (
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-200 flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5 text-sky-400" />
                        {cli.financialInfo.bankAccount.bankName} (Ag {cli.financialInfo.bankAccount.agency})
                      </p>
                      <p className="text-[10px] font-mono text-emerald-400">
                        Pix: {cli.financialInfo.bankAccount.pixKey || 'Não cadastrada'}
                      </p>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-500">Sem dados bancários</span>
                  )}
                </td>
                <td className="p-4">
                  <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                    {cli.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Novo Cliente */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-lg text-white">Cadastrar Novo Cliente</h3>
            <form onSubmit={handleCreateClient} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Fernando de Souza"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">Telefone Direct</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 98888-7777"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">CPF / CNPJ</label>
                  <input
                    type="text"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="123.456.789-00"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Perfil do Cliente</label>
                <select
                  value={clientType}
                  onChange={(e) => setClientType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Proprietário">Proprietário</option>
                  <option value="Inquilino">Inquilino</option>
                  <option value="Comprador">Comprador</option>
                  <option value="Investidor">Investidor</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Chave Pix para Repasses</label>
                <input
                  type="text"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  placeholder="Chave Pix (E-mail, CPF, Celular)..."
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
                  Salvar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
