
import React from 'react';

interface NavigationProps {
  onStart: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onStart }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="text-xl font-bold text-slate-900 serif">Advocacia Digital <span className="text-indigo-600">Pro</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#como-funciona" className="text-slate-600 hover:text-indigo-600 transition">Como Funciona</a>
            <a href="#precos" className="text-slate-600 hover:text-indigo-600 transition">Preços</a>
            <button 
              onClick={onStart}
              className="bg-indigo-900 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-800 transition shadow-lg shadow-indigo-900/20"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
