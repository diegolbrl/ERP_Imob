import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeaseContract } from '../../types';
import {
  DollarSign,
  TrendingUp,
  FileCheck2,
  Calendar,
  Percent,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSignature,
  ArrowRight,
  ShieldCheck,
  Calculator,
} from 'lucide-react';

export const FinancialModule: React.FC = () => {
  const { contracts } = useApp();

  // Financial Split Calculator state
  const [calcRent, setCalcRent] = useState<number>(5000);
  const [calcAdminRate, setCalcAdminRate] = useState<number>(10); // 10%
  const [calcCondo, setCalcCondo] = useState<number>(650);
  const [calcIptu, setCalcIptu] = useState<number>(220);

  // Calculations
  const calcAdminFee = calcRent * (calcAdminRate / 100);
  const calcOwnerPayout = calcRent - calcAdminFee;
  const totalTenantPayment = calcRent + calcCondo + calcIptu;

  // Portfolio Totals
  const totalGrossRent = contracts.reduce((acc, c) => acc + c.monthlyRent, 0);
  const totalAdminRevenue = contracts.reduce((acc, c) => acc + (c.monthlyRent * (c.adminFeePercentage / 100)), 0);
  const totalOwnerPayout = totalGrossRent - totalAdminRevenue;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-400" /> Gestão de Locação & Financeiro (Split ERP)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Administração de contratos, repasse automático para proprietários, reajustes por IGP-M/IPCA e assinaturas digitais
          </p>
        </div>
      </div>

      {/* Top Financial KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* KPI 1: Gross Rent Volume */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Volume Faturado Bruto</span>
          <p className="text-2xl font-extrabold text-white mt-2">
            R$ {totalGrossRent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-400 mt-1">Total arrecadado dos inquilinos/mês</p>
        </div>

        {/* KPI 2: Admin Fee Revenue */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/10">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Receita Imobiliária (Taxa Adm)</span>
          <p className="text-2xl font-extrabold text-emerald-400 mt-2">
            R$ {totalAdminRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-300 mt-1">Comissão retida automaticamente no split</p>
        </div>

        {/* KPI 3: Owner Payout Volume */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Repasse Líquido Proprietários</span>
          <p className="text-2xl font-extrabold text-sky-400 mt-2">
            R$ {totalOwnerPayout.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-400 mt-1">Transferido via Pix/TED automático</p>
        </div>
      </div>

      {/* Interactive Split Breakdown Calculator & Active Contracts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Active Contracts List & Split Breakdown (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-400" /> Contratos de Locação Vigentes
              </h3>
              <p className="text-xs text-slate-400">Status de repasse e assinatura eletrônica</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {contracts.length} Contratos
            </span>
          </div>

          {/* Contracts Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">Nº Contrato</th>
                  <th className="p-3">Inquilino / Proprietário</th>
                  <th className="p-3">Aluguel Bruto</th>
                  <th className="p-3">Split Adm</th>
                  <th className="p-3">Repasse Líquido</th>
                  <th className="p-3">Reajuste</th>
                  <th className="p-3">Assinatura</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {contracts.map((ctr) => {
                  const adminVal = ctr.monthlyRent * (ctr.adminFeePercentage / 100);
                  const ownerVal = ctr.monthlyRent - adminVal;

                  return (
                    <tr key={ctr.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-sky-400">
                        {ctr.contractNumber}
                      </td>
                      <td className="p-3">
                        <p className="font-semibold text-white">{ctr.tenantName}</p>
                        <p className="text-[10px] text-slate-400">Prop: {ctr.ownerName}</p>
                      </td>
                      <td className="p-3 font-bold text-white">
                        R$ {ctr.monthlyRent.toLocaleString('pt-BR')}
                      </td>
                      <td className="p-3 font-semibold text-emerald-400">
                        {ctr.adminFeePercentage}% (R$ {adminVal})
                      </td>
                      <td className="p-3 font-bold text-sky-300">
                        R$ {ownerVal.toLocaleString('pt-BR')}
                      </td>
                      <td className="p-3">
                        <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono text-[10px]">
                          {ctr.adjustmentIndex}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> {ctr.signatureStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Interactive Split Calculator Card */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Calculator className="w-4 h-4 text-sky-400" /> Simulador de Split de Aluguel
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Calcule instantaneamente a divisão financeira da taxa de administração e repasse ao proprietário.
            </p>
          </div>

          {/* Controls */}
          <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Valor do Aluguel (R$)</label>
              <input
                type="number"
                value={calcRent}
                onChange={(e) => setCalcRent(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Taxa Imobiliária (%)</label>
                <input
                  type="number"
                  value={calcAdminRate}
                  onChange={(e) => setCalcAdminRate(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Condomínio (R$)</label>
                <input
                  type="number"
                  value={calcCondo}
                  onChange={(e) => setCalcCondo(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>
            </div>
          </div>

          {/* Breakdown Result Visual */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-sky-500/30 space-y-3">
            <h4 className="text-xs uppercase font-bold text-sky-400 flex items-center justify-between">
              <span>Resultado do Split</span>
              <span className="font-mono text-slate-300">Total Boleto: R$ {totalTenantPayment.toLocaleString('pt-BR')}</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Aluguel Bruto Recebido:</span>
                <span className="font-bold text-white">R$ {calcRent.toLocaleString('pt-BR')}</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                <span className="text-emerald-400 font-semibold">Taxa Adm Imobiliária ({calcAdminRate}%):</span>
                <span className="font-bold text-emerald-400">(-) R$ {calcAdminFee.toLocaleString('pt-BR')}</span>
              </div>

              <div className="flex justify-between items-center py-1.5">
                <span className="text-sky-300 font-bold">Repasse Líquido Proprietário:</span>
                <span className="font-extrabold text-sky-300 text-sm">R$ {calcOwnerPayout.toLocaleString('pt-BR')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
