import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Share2, CheckCircle2, RefreshCw, FileCode, ExternalLink, Copy, Check, ShieldAlert } from 'lucide-react';

export const PortalsModule: React.FC = () => {
  const { properties, togglePortalSync } = useApp();
  const [selectedPortal, setSelectedPortal] = useState<'zap' | 'vivareal' | 'olx' | 'imovelweb'>('zap');
  const [copiedFeed, setCopiedFeed] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  const portalInfo = {
    zap: { name: 'ZAP Imóveis', color: 'border-orange-500/40 bg-orange-950/20 text-orange-400', feedUrl: 'https://api.imobsystem.com.br/v1/feeds/zap-imoveis.xml' },
    vivareal: { name: 'VivaReal', color: 'border-blue-500/40 bg-blue-950/20 text-blue-400', feedUrl: 'https://api.imobsystem.com.br/v1/feeds/vivareal.xml' },
    olx: { name: 'OLX Brasil', color: 'border-purple-500/40 bg-purple-950/20 text-purple-400', feedUrl: 'https://api.imobsystem.com.br/v1/feeds/olx-brasil.json' },
    imovelweb: { name: 'ImovelWeb', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400', feedUrl: 'https://api.imobsystem.com.br/v1/feeds/imovelweb.xml' },
  };

  const activePortalProperties = properties.filter((p) => p.portalSync[selectedPortal]);

  // Generate XML Payload Simulation
  const generateXmlPreview = () => {
    const activeProps = properties.filter((p) => p.portalSync[selectedPortal]);
    return `<?xml version="1.0" encoding="UTF-8"?>
<CargaTargetPortal timestamp="${new Date().toISOString()}">
  <Header>
    <Provider>ImobSystem ERP SaaS</Provider>
    <TotalListings>${activeProps.length}</TotalListings>
  </Header>
  <Imoveis>
${activeProps.map((p) => `    <Imovel>
      <Codigo>${p.code}</Codigo>
      <Titulo><![CDATA[${p.title}]]></Titulo>
      <Tipo>${p.type}</Tipo>
      <PrecoVenda>${p.price}</PrecoVenda>
      <PrecoLocacao>${p.rentPrice || 0}</PrecoLocacao>
      <AreaUtil>${p.area}</AreaUtil>
      <Bairro>${p.address.neighborhood}</Bairro>
      <Cidade>${p.address.city}</Cidade>
      <Exclusividade>${p.isExclusive ? 'Sim' : 'Nao'}</Exclusividade>
      <FotosCount>${p.images.length}</FotosCount>
    </Imovel>`).join('\n')}
  </Imoveis>
</CargaTargetPortal>`;
  };

  const handleCopyFeed = () => {
    navigator.clipboard.writeText(portalInfo[selectedPortal].feedUrl);
    setCopiedFeed(true);
    setTimeout(() => setCopiedFeed(false), 2000);
  };

  const handleSyncAll = () => {
    setIsSyncingAll(true);
    setTimeout(() => setIsSyncingAll(false), 1500);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Share2 className="w-6 h-6 text-cyan-400" /> Multi-Posting & Portais Imobiliários
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Integração por Carga Única via XML/JSON com sincronização automatizada para portais contratados
          </p>
        </div>

        <button
          onClick={handleSyncAll}
          disabled={isSyncingAll}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all"
        >
          <RefreshCw className={`w-4 h-4 text-cyan-400 ${isSyncingAll ? 'animate-spin' : ''}`} />
          <span>{isSyncingAll ? 'Forçando Sincronização...' : 'Forçar Carga Completa'}</span>
        </button>
      </div>

      {/* Portal Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(portalInfo) as (keyof typeof portalInfo)[]).map((key) => {
          const info = portalInfo[key];
          const count = properties.filter((p) => p.portalSync[key]).length;
          const isSelected = selectedPortal === key;

          return (
            <div
              key={key}
              onClick={() => setSelectedPortal(key)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? `${info.color} ring-2 ring-cyan-500/50 shadow-xl`
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-white">{info.name}</h3>
                <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                  Status 200 OK
                </span>
              </div>

              <p className="text-2xl font-extrabold text-white mt-3">
                {count} <span className="text-xs font-normal text-slate-400">/ {properties.length} imóveis</span>
              </p>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-xs">
                <span className="text-slate-400">Última carga: Hoje 22:45</span>
                <span className="text-cyan-400 font-semibold">Ver Feed →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Detail & XML Feed Payload Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Properties Status List for Selected Portal (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-base">
                Gerenciar Anúncios no {portalInfo[selectedPortal].name}
              </h3>
              <p className="text-xs text-slate-400">
                Alterne a chave para publicar ou pausar individualmente cada imóvel neste portal
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg">
              {activePortalProperties.length} Ativos
            </span>
          </div>

          <div className="space-y-3">
            {properties.map((prop) => {
              const isSync = prop.portalSync[selectedPortal];
              return (
                <div
                  key={prop.id}
                  className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img src={prop.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-sky-400">{prop.code}</span>
                        <span className="text-xs text-slate-400">• {prop.address.neighborhood}</span>
                      </div>
                      <h4 className="font-semibold text-xs text-white line-clamp-1">{prop.title}</h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium ${isSync ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {isSync ? 'Publicado' : 'Pausado'}
                    </span>
                    <button
                      onClick={() => togglePortalSync(prop.id, selectedPortal)}
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                        isSync ? 'bg-cyan-600' : 'bg-slate-800'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          isSync ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: XML Feed Link & Payload Viewer */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" /> Link do Feed XML Automatizado
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Cole esta URL no painel do parceiro ({portalInfo[selectedPortal].name}) para sincronização em tempo real.
            </p>
          </div>

          {/* Feed URL Copy Bar */}
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono text-slate-300 truncate max-w-[200px]">
              {portalInfo[selectedPortal].feedUrl}
            </span>
            <button
              onClick={handleCopyFeed}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg transition-colors flex items-center gap-1 font-semibold"
            >
              {copiedFeed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFeed ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>

          {/* XML Payload Output Box */}
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Estrutura do Feed (Preview)</span>
            <pre className="mt-2 bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-300 overflow-x-auto h-80">
              {generateXmlPreview()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
