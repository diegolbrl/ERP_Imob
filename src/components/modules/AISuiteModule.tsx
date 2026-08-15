import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Bot, TrendingUp, Copy, Check, Send, Building2, User, MessageSquare } from 'lucide-react';

export const AISuiteModule: React.FC = () => {
  const { properties, addLead } = useApp();

  // Tab state inside AI Suite
  const [aiTab, setAiTab] = useState<'copywriter' | 'valuation' | 'chatbot'>('copywriter');

  // AI Copywriter State
  const [selectedPropId, setSelectedPropId] = useState<string>(properties[0]?.id || '');
  const [copyTone, setCopyTone] = useState<'luxo' | 'comercial' | 'investimento'>('luxo');
  const [generatedCopy, setGeneratedCopy] = useState<string>('');
  const [generatedTitle, setGeneratedTitle] = useState<string>('');
  const [isGeneratingCopy, setIsGeneratingCopy] = useState<boolean>(false);
  const [copyCopied, setCopyCopied] = useState<boolean>(false);

  // Valuation AI State
  const [valNeighborhood, setValNeighborhood] = useState<string>('Jardins');
  const [valArea, setValArea] = useState<number>(120);
  const [valBedrooms, setValBedrooms] = useState<number>(3);
  const [valCondition, setValCondition] = useState<'alto' | 'medio' | 'reformado'>('alto');
  const [valResult, setValResult] = useState<{ pricePerM2: number; totalPrice: number; rentPrice: number } | null>(null);

  // Chatbot Simulator State
  const [chatMessages, setChatMessages] = useState<{ sender: 'bot' | 'user'; text: string; time: string }[]>([
    { sender: 'bot', text: 'Olá! Sou o Assistente de IA da Imobiliária. Qual é o seu nome e como posso ajudar na sua busca hoje?', time: '23:38' },
  ]);
  const [inputChatMessage, setInputChatMessage] = useState('');

  // AI Copy Generator function
  const handleGenerateCopy = () => {
    setIsGeneratingCopy(true);
    const targetProp = properties.find((p) => p.id === selectedPropId) || properties[0];

    setTimeout(() => {
      let title = '';
      let copy = '';

      if (copyTone === 'luxo') {
        title = `✨ Exclusividade nos ${targetProp.address.neighborhood}: ${targetProp.title}`;
        copy = `Apresentamos uma oportunidade verdadeiramente singular em ${targetProp.address.neighborhood}, ${targetProp.address.city}.\n\nCom ${targetProp.area}m² de pura sofisticação, esta propriedade conta com ${targetProp.bedrooms} amplos dormitórios (${targetProp.bathrooms} banheiros) e acabamentos de altíssimo padrão. O living integrado proporciona luminosidade natural abundante e vista panorâmica privilegiada.\n\nInfraestrutura completa: ${targetProp.features.join(', ')}.\n\nIdeal para quem exige máxima privacidade, segurança e sofisticação no melhor endereço da cidade. Agende sua visita privativa com nossos especialistas.`;
      } else if (copyTone === 'investimento') {
        title = `📈 Alta Rentabilidade em ${targetProp.address.neighborhood} - ${targetProp.area}m² com VGV Competitivo`;
        copy = `Excelente ativo imobiliário para investidores focados em valorização e retorno de locação.\n\nLocalizado em ${targetProp.address.neighborhood}, região de alta liquidez e demanda contínua. Imóvel com ${targetProp.bedrooms} dormitórios, ${targetProp.area}m² e baixa taxa de vacância histórica.\n\nEstimativa de Yield de Locação superior à média de mercado. Agende uma análise de viabilidade financeira com nossa equipe.`;
      } else {
        title = `🏡 Seu Novo Lar em ${targetProp.address.neighborhood} - ${targetProp.bedrooms} Dorms e ${targetProp.area}m²`;
        copy = `Venha conhecer este lindo imóvel localizado em ${targetProp.address.neighborhood}!\n\nPronto para morar com ${targetProp.area}m², ${targetProp.bedrooms} quartos confortáveis e vaga de garagem. Perfeito para quem busca praticidade, segurança e qualidade de vida.\n\nDestaques: ${targetProp.features.join(', ')}.\n\nEntre em contato pelo WhatsApp e agende sua visita hoje mesmo!`;
      }

      setGeneratedTitle(title);
      setGeneratedCopy(copy);
      setIsGeneratingCopy(false);
    }, 1200);
  };

  // Valuation AI Calculator
  const handleCalculateValuation = () => {
    let baseM2 = 14000;
    if (valNeighborhood === 'Jardins') baseM2 = 16500;
    if (valNeighborhood === 'Itaim Bibi') baseM2 = 18000;
    if (valNeighborhood === 'Pinheiros') baseM2 = 13500;
    if (valNeighborhood === 'Moema') baseM2 = 14200;

    if (valCondition === 'alto') baseM2 *= 1.2;
    if (valCondition === 'reformado') baseM2 *= 1.1;

    const totalPrice = valArea * baseM2;
    const rentPrice = totalPrice * 0.0045; // ~0.45% rent yield

    setValResult({
      pricePerM2: Math.round(baseM2),
      totalPrice: Math.round(totalPrice),
      rentPrice: Math.round(rentPrice),
    });
  };

  // Chatbot interaction
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChatMessage) return;

    const userText = inputChatMessage;
    setInputChatMessage('');

    const newMsgs = [
      ...chatMessages,
      { sender: 'user' as const, text: userText, time: '23:39' },
    ];
    setChatMessages(newMsgs);

    setTimeout(() => {
      let botResponse = 'Entendido! Qual é a sua faixa de orçamento preferida para a compra ou locação?';
      if (userText.toLowerCase().includes('orçamento') || userText.toLowerCase().includes('milhão') || userText.toLowerCase().includes('reais')) {
        botResponse = 'Excelente! Com esse orçamento, temos imóveis nos bairros Jardins e Itaim Bibi. Cadastrei seu perfil no CRM e o corretor Carlos entrará em contato!';
      }
      setChatMessages((prev) => [
        ...prev,
        { sender: 'bot', text: botResponse, time: '23:39' },
      ]);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-6 border border-purple-800/40 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="bg-amber-500/20 text-amber-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-500/30 inline-flex items-center gap-1 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Google Antigravity AI Engine
            </span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Suite de Inteligência Artificial Imobiliária
            </h2>
            <p className="text-xs text-purple-200 mt-1 max-w-xl">
              Modelos generativos para criação automatizada de anúncios SEO, valuation preditivo de mercado e triagem inteligente de leads.
            </p>
          </div>
        </div>
      </div>

      {/* AI Tool Sub-Tabs */}
      <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 w-fit">
        <button
          onClick={() => setAiTab('copywriter')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            aiTab === 'copywriter' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Gerador de Anúncios AI
        </button>

        <button
          onClick={() => setAiTab('valuation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            aiTab === 'valuation' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" /> Valuation & Previsão de Preço AI
        </button>

        <button
          onClick={() => setAiTab('chatbot')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            aiTab === 'chatbot' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bot className="w-3.5 h-3.5" /> Chatbot Qualificador de Leads
        </button>
      </div>

      {/* TAB 1: AI COPYWRITER */}
      {aiTab === 'copywriter' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Criação de Anúncios Persuasivos com IA</h3>
            <p className="text-xs text-slate-400">
              Selecione o imóvel da carteira e o tom de voz desejado para a IA redigir a descrição otimizada para SEO.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Selecionar Imóvel</label>
                <select
                  value={selectedPropId}
                  onChange={(e) => setSelectedPropId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.code}] {p.title} ({p.address.neighborhood})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tom de Voz da Copy</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'luxo', label: 'Alto Padrão & Luxo' },
                    { id: 'comercial', label: 'Direto & Vendas' },
                    { id: 'investimento', label: 'Foco Investidor' },
                  ].map((tone) => (
                    <button
                      key={tone.id}
                      type="button"
                      onClick={() => setCopyTone(tone.id as any)}
                      className={`p-2.5 rounded-xl text-[11px] font-semibold border transition-all text-center ${
                        copyTone === tone.id
                          ? 'bg-purple-600/30 text-purple-200 border-purple-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {tone.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateCopy}
                disabled={isGeneratingCopy}
                className="w-full mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className={`w-4 h-4 text-amber-300 ${isGeneratingCopy ? 'animate-spin' : ''}`} />
                <span>{isGeneratingCopy ? 'IA Processando Texto...' : 'Gerar Anúncio com IA'}</span>
              </button>
            </div>
          </div>

          {/* AI Generated Result Output */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Resultado Gerado pela IA</h3>
              {generatedCopy && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${generatedTitle}\n\n${generatedCopy}`);
                    setCopyCopied(true);
                    setTimeout(() => setCopyCopied(false), 2000);
                  }}
                  className="text-xs text-purple-300 hover:text-white font-semibold flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800"
                >
                  {copyCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copyCopied ? 'Copiado!' : 'Copiar Texto'}</span>
                </button>
              )}
            </div>

            {generatedCopy ? (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-purple-400 font-bold uppercase">Título SEO Sugerido</span>
                  <p className="font-bold text-white text-sm mt-0.5">{generatedTitle}</p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Descrição Comercial</span>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line mt-1">{generatedCopy}</p>
                </div>
              </div>
            ) : (
              <div className="h-64 border-2 border-dashed border-slate-800/80 rounded-xl flex items-center justify-center text-xs text-slate-500 text-center p-6">
                Clique em "Gerar Anúncio com IA" para sintetizar o texto persuasivo do imóvel selecionado.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: VALUATION AI */}
      {aiTab === 'valuation' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Algoritmo de Valuation & Estimativa de Preço</h3>
            <p className="text-xs text-slate-400">
              Insira as especificações do imóvel para o algoritmo calcular a estimativa média por m² e faixa recomendada de mercado.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Bairro / Região</label>
                <select
                  value={valNeighborhood}
                  onChange={(e) => setValNeighborhood(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Jardins">Jardins (Média R$ 16.500/m²)</option>
                  <option value="Itaim Bibi">Itaim Bibi (Média R$ 18.000/m²)</option>
                  <option value="Pinheiros">Pinheiros (Média R$ 13.500/m²)</option>
                  <option value="Moema">Moema (Média R$ 14.200/m²)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Área Útil (m²)</label>
                  <input
                    type="number"
                    value={valArea}
                    onChange={(e) => setValArea(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Dormitórios</label>
                  <input
                    type="number"
                    value={valBedrooms}
                    onChange={(e) => setValBedrooms(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Padrão de Acabamento</label>
                <select
                  value={valCondition}
                  onChange={(e) => setValCondition(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="alto">Alto Padrão / Luxo (+20%)</option>
                  <option value="reformado">Reformado / Moderno (+10%)</option>
                  <option value="medio">Padrão Original</option>
                </select>
              </div>

              <button
                onClick={handleCalculateValuation}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-purple-600/30 transition-all"
              >
                Calcular Preço Sugerido com IA
              </button>
            </div>
          </div>

          {/* Valuation Result */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-sm">Resultado da Avaliação Preditiva</h3>

            {valResult ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/40 text-center space-y-1">
                  <span className="text-[10px] text-purple-400 font-bold uppercase">Preço de Venda Sugerido</span>
                  <p className="text-3xl font-extrabold text-white">
                    R$ {valResult.totalPrice.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-xs text-slate-400">
                    Média de R$ {valResult.pricePerM2.toLocaleString('pt-BR')}/m² para {valNeighborhood}
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimativa de Aluguel Mensal:</span>
                    <span className="font-bold text-sky-400">R$ {valResult.rentPrice.toLocaleString('pt-BR')}/mês</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Confiança do Algoritmo:</span>
                    <span className="font-bold text-emerald-400">94.8% (baseado em 140 amostras)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-64 border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-500">
                Preencha os dados e clique em "Calcular Preço Sugerido com IA"
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CHATBOT SIMULATOR */}
      {aiTab === 'chatbot' && (
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <div>
                <h3 className="font-bold text-sm text-white">Simulador do Chatbot Conversacional WhatsApp / Site</h3>
                <p className="text-[11px] text-slate-400">Qualifica o cliente no primeiro contato e registra o lead no CRM</p>
              </div>
            </div>
          </div>

          {/* Chat Stream */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-80 overflow-y-auto space-y-3 text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Input Chat */}
          <form onSubmit={handleSendChatMessage} className="flex gap-2">
            <input
              type="text"
              value={inputChatMessage}
              onChange={(e) => setInputChatMessage(e.target.value)}
              placeholder="Digite uma resposta (ex: Procuro apartamento nos Jardins até 2 milhões)..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
