
import React from 'react';

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Inteligência Artificial para Advogados
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
            Crie sua Landing Page <br />
            <span className="text-indigo-900">Profissional em Segundos.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Tenha uma presença digital validada, ética e otimizada para o Google. Grátis para criar e visualizar, pague apenas quando decidir colocar no ar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onStart}
              className="px-8 py-4 bg-indigo-900 text-white rounded-xl font-bold text-lg hover:bg-indigo-800 transition-all shadow-xl shadow-indigo-900/30 flex items-center justify-center gap-2"
            >
              Criar minha página grátis
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <a href="#como-funciona" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:border-indigo-600 hover:text-indigo-600 transition-all">
              Ver demonstração
            </a>
          </div>
          
          <div className="mt-20 relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-indigo-500 blur-[100px] opacity-10 rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80" 
              alt="Advocacia Dashboard" 
              className="relative rounded-2xl shadow-2xl border border-white/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
