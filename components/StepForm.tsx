
import React, { useState } from 'react';
import { LawyerData, ColorTheme } from '../types';

interface StepFormProps {
  onGenerate: (data: LawyerData) => void;
  onCancel: () => void;
}

const THEMES: { id: ColorTheme; name: string; desc: string; colors: string[] }[] = [
  { id: 'classic', name: 'Tradição Clássica', desc: 'Autoridade e seriedade', colors: ['#172554', '#ca8a04', '#f8fafc'] },
  { id: 'modern', name: 'Modern Legal', desc: 'Inovação e crescimento', colors: ['#064e3b', '#10b981', '#f0fdf4'] },
  { id: 'premium', name: 'Exclusivo & Luxo', desc: 'Sofisticação máxima', colors: ['#000000', '#94a3b8', '#ffffff'] },
  { id: 'human', name: 'Humanista', desc: 'Empatia e acolhimento', colors: ['#7c2d12', '#fb923c', '#fff7ed'] },
  { id: 'corporate', name: 'Corporativo', desc: 'Segurança empresarial', colors: ['#1e3a8a', '#60a5fa', '#eff6ff'] },
];

export const StepForm: React.FC<StepFormProps> = ({ onGenerate, onCancel }) => {
  const [data, setData] = useState<LawyerData>({
    name: '',
    specialty: '',
    city: '',
    state: '',
    differential: '',
    whatsapp: '',
    email: '',
    oab: '',
    theme: 'classic',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 md:py-16 px-4">
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-12 border border-slate-100">
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-indigo-600 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4">
            <span className="w-6 md:w-8 h-px bg-indigo-600"></span>
            Configuração do Escritório
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 serif">Dados da Autoridade</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Preencha os detalhes para que nossa IA personalize sua presença digital.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b pb-2 border-slate-100">1. Identidade Visual</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setData(prev => ({ ...prev, theme: t.id }))}
                  className={`relative p-4 rounded-xl border-2 transition-all text-left group ${
                    data.theme === t.id ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex gap-1 mb-3">
                    {t.colors.map((c, i) => (
                      <div key={i} className="w-full h-2 rounded-full" style={{ backgroundColor: c }}></div>
                    ))}
                  </div>
                  <div className="text-[10px] font-bold text-slate-900 uppercase mb-1">{t.name}</div>
                  <div className="text-[8px] text-slate-400 font-medium leading-tight">{t.desc}</div>
                  {data.theme === t.id && (
                    <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full p-1 shadow-lg">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b pb-2 border-slate-100">2. Informações Gerais</h3>
            
            <div className="space-y-2">
              <label className="block text-[10px] md:text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                Nome Completo ou Nome do Escritório
              </label>
              <input
                required
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Ex: Dr. Marcelo Cavalcante ou Cavalcante Associados"
                className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-900 focus:ring-0 transition-all outline-none bg-slate-50/30 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] md:text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                  Número OAB (Opcional)
                </label>
                <input
                  type="text"
                  name="oab"
                  value={data.oab}
                  onChange={handleChange}
                  placeholder="Ex: 123.456"
                  className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-900 focus:ring-0 transition-all outline-none bg-slate-50/30 text-slate-800"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] md:text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                  Especialidade Principal
                </label>
                <input
                  required
                  type="text"
                  name="specialty"
                  value={data.specialty}
                  onChange={handleChange}
                  placeholder="Ex: Direito Civil e Contratos"
                  className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-900 focus:ring-0 transition-all outline-none bg-slate-50/30 text-slate-800"
                />
              </div>

              <div className="md:col-span-1 grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="block text-[10px] md:text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                    Cidade
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={data.city}
                    onChange={handleChange}
                    placeholder="Ex: São Paulo"
                    className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-900 focus:ring-0 transition-all outline-none bg-slate-50/30 text-slate-800"
                  />
                </div>
                <div className="col-span-1 space-y-2">
                  <label className="block text-[10px] md:text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                    UF
                  </label>
                  <input
                    required
                    maxLength={2}
                    type="text"
                    name="state"
                    value={data.state}
                    onChange={handleChange}
                    placeholder="SP"
                    className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-900 focus:ring-0 transition-all outline-none bg-slate-50/30 text-slate-800 uppercase text-center"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-[10px] md:text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                  Diferenciais do Atendimento
                </label>
                <textarea
                  name="differential"
                  value={data.differential}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Ex: Atendimento exclusivo em domicílio, especialista em tribunais superiores..."
                  className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-900 focus:ring-0 transition-all outline-none bg-slate-50/30 text-slate-800 resize-none"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] md:text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                  WhatsApp Profissional
                </label>
                <input
                  required
                  type="tel"
                  name="whatsapp"
                  value={data.whatsapp}
                  onChange={handleChange}
                  placeholder="Ex: 11999999999"
                  className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-900 focus:ring-0 transition-all outline-none bg-slate-50/30 text-slate-800"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] md:text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                  E-mail Profissional
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Ex: contato@escritorio.com.br"
                  className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-900 focus:ring-0 transition-all outline-none bg-slate-50/30 text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="flex-[2] order-1 md:order-2 px-8 py-4.5 bg-indigo-900 text-white rounded-xl font-bold text-sm md:text-base hover:bg-black transition-all shadow-xl shadow-indigo-900/20 flex items-center justify-center gap-3 active:scale-95"
            >
              Gerar Landing Page SEO
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-[1] order-2 md:order-1 px-8 py-4.5 bg-slate-50 text-slate-400 rounded-xl font-bold text-sm hover:bg-slate-100 hover:text-slate-600 transition active:scale-95"
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
