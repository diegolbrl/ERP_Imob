import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Building, Key, Bot, ShieldCheck, Check } from 'lucide-react';

export const SettingsModule: React.FC = () => {
  const { appSettings, updateAppSettings } = useApp();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [tradeName, setTradeName] = useState(appSettings.companyProfile.tradeName);
  const [cnpj, setCnpj] = useState(appSettings.companyProfile.cnpj);
  const [creciJuridico, setCreciJuridico] = useState(appSettings.companyProfile.creciJuridico);
  const [whatsappApiKey, setWhatsappApiKey] = useState(appSettings.apiCredentials.whatsappApiKey || '');
  const [clicksignToken, setClicksignToken] = useState(appSettings.apiCredentials.clicksignAccessToken || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAppSettings({
      companyProfile: {
        ...appSettings.companyProfile,
        tradeName,
        cnpj,
        creciJuridico,
      },
      apiCredentials: {
        ...appSettings.apiCredentials,
        whatsappApiKey,
        clicksignAccessToken: clicksignToken,
      },
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-slate-400" /> Configurações da Plataforma ERP
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Parâmetros corporativos, credenciais de APIs e regras de automação
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Company Profile */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2 border-b border-slate-800 pb-2">
            <Building className="w-4 h-4 text-sky-400" /> Dados Institucionais da Imobiliária
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Nome Fantasia</label>
              <input
                type="text"
                value={tradeName}
                onChange={(e) => setTradeName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">CNPJ</label>
              <input
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">CRECI Jurídico</label>
              <input
                type="text"
                value={creciJuridico}
                onChange={(e) => setCreciJuridico(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: API Credentials */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2 border-b border-slate-800 pb-2">
            <Key className="w-4 h-4 text-purple-400" /> Integções & Credenciais de APIs
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Chave de API WhatsApp Bot (Z-API / Evolution)</label>
              <input
                type="password"
                value={whatsappApiKey}
                onChange={(e) => setWhatsappApiKey(e.target.value)}
                placeholder="wa_live_sec_..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Token Clicksign (Assinatura Digital)</label>
              <input
                type="password"
                value={clicksignToken}
                onChange={(e) => setClicksignToken(e.target.value)}
                placeholder="cs_token_..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Automations */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2 border-b border-slate-800 pb-2">
            <Bot className="w-4 h-4 text-emerald-400" /> Automações de Sistema
          </h3>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <p className="font-bold text-white">Cruzamento Automático de Perfil (Matching IA)</p>
                <p className="text-slate-400">Notifica o corretor quando um novo imóvel atende aos critérios do lead.</p>
              </div>
              <span className="text-emerald-400 font-bold">Ativo</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <p className="font-bold text-white">Disparo do Boleto/Pix via WhatsApp</p>
                <p className="text-slate-400">Envia o código de pagamento automaticamente 5 dias antes do vencimento.</p>
              </div>
              <span className="text-emerald-400 font-bold">Ativo</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3">
          {savedSuccess && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <Check className="w-4 h-4" /> Configurações salvas!
            </span>
          )}
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-sky-600/30 transition-all"
          >
            Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
};
