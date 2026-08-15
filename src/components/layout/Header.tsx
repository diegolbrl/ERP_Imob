import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Plus, Bell, Sparkles, Building2 } from 'lucide-react';

export const Header: React.FC = () => {
  const { setIsNewPropertyModalOpen, properties, leads } = useApp();

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <div className="relative w-96">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar por código, bairro, cliente ou corretor..."
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
        />
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Quick Add Property Button */}
        <button
          onClick={() => setIsNewPropertyModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-md shadow-sky-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Imóvel</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full ring-2 ring-slate-900"></span>
          </button>
        </div>

        <div className="h-6 w-[1px] bg-slate-800"></div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Usuário"
            className="w-8 h-8 rounded-full border border-sky-500/40 object-cover"
          />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-200">Mirela Santos</p>
            <p className="text-[10px] text-slate-400">Diretora de Operações</p>
          </div>
        </div>
      </div>
    </header>
  );
};
