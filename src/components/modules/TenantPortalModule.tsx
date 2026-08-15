import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MaintenanceRequest } from '../../types';
import { Wrench, Copy, Check, FileText, AlertCircle, Plus, Calendar, Clock, DollarSign, ShieldCheck } from 'lucide-react';

export const TenantPortalModule: React.FC = () => {
  const { maintenanceRequests, billingTransactions, contracts, addMaintenanceRequest } = useApp();
  const [copiedPix, setCopiedPix] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Hidráulica' | 'Elétrica' | 'Pintura' | 'Estrutural' | 'Outros'>('Hidráulica');

  const currentTx = billingTransactions[0];
  const activeContract = contracts[0];

  const handleCopyPix = () => {
    if (currentTx?.pixCopyPaste) {
      navigator.clipboard.writeText(currentTx.pixCopyPaste);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2000);
    }
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addMaintenanceRequest({
      contractId: activeContract?.id || 'ctr-501',
      propertyTitle: activeContract?.propertyTitle || 'Studio Moderno em Pinheiros',
      tenantName: activeContract?.tenantName || 'Lucas Ferreira da Silva',
      title,
      description,
      category,
      status: 'Aberto',
    });

    setTitle('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="bg-sky-500/20 text-sky-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-sky-500/30">
            Área Exclusiva do Inquilino
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            Portal do Inquilino & Chamados de Manutenção
          </h2>
          <p className="text-xs text-slate-400">
            Imóvel Atual: <strong className="text-white">{activeContract?.propertyTitle}</strong> (Contrato {activeContract?.contractNumber})
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.02]"
        >
          <Wrench className="w-4 h-4" />
          <span>Abrir Chamado de Reparo</span>
        </button>
      </div>

      {/* Main Grid: Payment Invoice & Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Payment Card (1 Col) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm">Fatura de Aluguel Atual</h3>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              currentTx?.status === 'Pago' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
            }`}>
              {currentTx?.status}
            </span>
          </div>

          {currentTx && (
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Valor Total a Pagar</span>
                <p className="text-3xl font-extrabold text-white">
                  R$ {currentTx.amount.toLocaleString('pt-BR')}
                </p>
                <p className="text-xs text-slate-400">Vencimento: {currentTx.dueDate}</p>
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Aluguel:</span>
                  <span>R$ 4.200,00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Condomínio:</span>
                  <span>R$ 580,00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">IPTU:</span>
                  <span>R$ 220,00</span>
                </div>
              </div>

              {/* Pix Copia e Cola */}
              <div className="pt-2">
                <span className="text-[10px] text-emerald-400 font-bold uppercase">Pagar via Pix Instantâneo</span>
                <button
                  onClick={handleCopyPix}
                  className="w-full mt-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPix ? 'Chave Pix Copiada!' : 'Copiar Pix Copia e Cola'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Maintenance Requests List (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Wrench className="w-4 h-4 text-purple-400" /> Histórico de Chamados de Manutenção
              </h3>
              <p className="text-xs text-slate-400">Acompanhamento de reparos hidráulicos, elétricos e estruturais</p>
            </div>
            <span className="text-xs font-bold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full">
              {maintenanceRequests.length} Soluções
            </span>
          </div>

          <div className="space-y-3">
            {maintenanceRequests.map((req) => (
              <div key={req.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{req.title}</span>
                    <span className="text-[10px] bg-slate-800 text-purple-300 px-2 py-0.5 rounded border border-slate-700">
                      {req.category}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    req.status === 'Concluído' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-300'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <p className="text-xs text-slate-400">{req.description}</p>

                {req.assignedProvider && (
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                    <span>👨‍🔧 Técnico: <strong className="text-white">{req.assignedProvider.name}</strong> ({req.assignedProvider.phone})</span>
                    <span className="text-emerald-400 font-mono">Agendado: {req.assignedProvider.scheduledDate}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Novo Chamado */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-lg text-white">Abrir Chamado de Manutenção</h3>
            <form onSubmit={handleCreateRequest} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Título do Problema</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Vazamento sob a pia da cozinha"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Hidráulica">Hidráulica</option>
                  <option value="Elétrica">Elétrica</option>
                  <option value="Pintura">Pintura</option>
                  <option value="Estrutural">Estrutural</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Descrição Detalhada</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva quando o problema começou..."
                  rows={3}
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
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Enviar Chamado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
