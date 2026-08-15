import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PropertyInspection, InspectionItemCondition } from '../../types';
import { ClipboardCheck, Plus, CheckCircle2, AlertTriangle, FileText, Camera, ShieldCheck, X } from 'lucide-react';

export const InspectionsModule: React.FC = () => {
  const { inspections, properties, addInspection } = useApp();
  const [selectedInspection, setSelectedInspection] = useState<PropertyInspection | null>(inspections[0] || null);
  const [showModal, setShowModal] = useState(false);

  const [propId, setPropId] = useState(properties[0]?.id || '');
  const [type, setType] = useState<'Entrada' | 'Saída' | 'Periódica'>('Entrada');
  const [inspectorName, setInspectorName] = useState('Carlos Eduardo Silva');

  const handleCreateInspection = (e: React.FormEvent) => {
    e.preventDefault();
    const targetProp = properties.find((p) => p.id === propId) || properties[0];

    addInspection({
      propertyId: targetProp.id,
      propertyTitle: targetProp.title,
      propertyCode: targetProp.code,
      inspectorName,
      inspectionDate: new Date().toISOString().split('T')[0],
      type,
      status: 'Aprovada',
      items: [
        {
          id: `item-${Date.now()}-1`,
          room: 'Sala Principal',
          itemName: 'Pintura e Rodapés',
          condition: 'Excelente',
          notes: 'Pintura nova sem riscos.',
          photoUrls: [],
        },
        {
          id: `item-${Date.now()}-2`,
          room: 'Cozinha',
          itemName: 'Armários e Torneiras',
          condition: 'Bom',
          notes: 'Funcionando sem gotejamento.',
          photoUrls: [],
        },
      ],
      generalObservations: 'Imóvel em perfeitas condições para início da locação.',
    });

    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <ClipboardCheck className="w-6 h-6 text-emerald-400" /> Vistorias Digitais de Imóveis
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Relatórios fotográficos de entrada, saída e auditorias periódicas com assinatura eletrônica
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Vistoria</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inspections List (1 Col) */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase text-slate-400">Laudos Registrados ({inspections.length})</h3>
          {inspections.map((insp) => {
            const isSelected = selectedInspection?.id === insp.id;
            return (
              <div
                key={insp.id}
                onClick={() => setSelectedInspection(insp)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500/50 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                    {insp.propertyCode}
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
                    {insp.type} • {insp.status}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-white line-clamp-1">{insp.propertyTitle}</h4>
                <p className="text-xs text-slate-400">Vistoriador: {insp.inspectorName}</p>
                <p className="text-[10px] text-slate-500 font-mono">Data: {insp.inspectionDate}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Inspection Detailed Viewer (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 space-y-6">
          {selectedInspection ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    Vistoria de {selectedInspection.type}
                  </span>
                  <h3 className="font-bold text-lg text-white mt-0.5">{selectedInspection.propertyTitle}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs bg-slate-950 text-slate-300 px-3 py-1 rounded-xl border border-slate-800">
                    ✍️ Assinado por Inquilino & Proprietário
                  </span>
                </div>
              </div>

              {/* General info */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="text-slate-300"><strong className="text-slate-400">Observações Gerais:</strong> {selectedInspection.generalObservations}</p>
                <p className="text-slate-400">Data de realização: {selectedInspection.inspectionDate} • Vistoriador: {selectedInspection.inspectorName}</p>
              </div>

              {/* Room items checklist */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold text-slate-400">Checklist de Cômodos e Itens Vistoriados</h4>
                {selectedInspection.items.map((item) => (
                  <div key={item.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">{item.room}:</span>
                        <span className="text-xs text-slate-300">{item.itemName}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.condition === 'Excelente' ? 'bg-emerald-500/20 text-emerald-400' :
                        item.condition === 'Bom' ? 'bg-sky-500/20 text-sky-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {item.condition}
                      </span>
                    </div>

                    {item.notes && <p className="text-xs text-slate-400 italic">"{item.notes}"</p>}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center text-xs text-slate-500">
              Selecione uma vistoria na lista para visualizar o laudo fotográfico.
            </div>
          )}
        </div>
      </div>

      {/* Modal Nova Vistoria */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-lg text-white">Nova Vistoria Digital</h3>
            <form onSubmit={handleCreateInspection} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Imóvel</label>
                <select
                  value={propId}
                  onChange={(e) => setPropId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>[{p.code}] {p.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Tipo de Vistoria</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Entrada">Vistoria de Entrada</option>
                  <option value="Saída">Vistoria de Saída</option>
                  <option value="Periódica">Vistoria Periódica</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Nome do Vistoriador</label>
                <input
                  type="text"
                  value={inspectorName}
                  onChange={(e) => setInspectorName(e.target.value)}
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
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Gerar Laudo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
