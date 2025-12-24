
import React, { useEffect } from 'react';
import { GeneratedPage, LawyerData, ColorTheme } from '../types';

interface PreviewDisplayProps {
  page: GeneratedPage;
  lawyer: LawyerData;
  onActivate: () => void;
  onBack: () => void;
}

const THEME_CONFIGS: Record<ColorTheme, { primary: string; secondary: string; accent: string; bg: string; text: string }> = {
  classic: {
    primary: '#172554', // Navy
    secondary: '#ca8a04', // Gold
    accent: '#1e3a8a',
    bg: '#f8fafc',
    text: '#0f172a'
  },
  modern: {
    primary: '#064e3b', // Deep Green
    secondary: '#10b981', // Emerald
    accent: '#065f46',
    bg: '#f0fdf4',
    text: '#064e3b'
  },
  premium: {
    primary: '#000000', // Black
    secondary: '#64748b', // Slate
    accent: '#334155',
    bg: '#ffffff',
    text: '#000000'
  },
  human: {
    primary: '#7c2d12', // Terracotta
    secondary: '#fb923c', // Orange
    accent: '#9a3412',
    bg: '#fff7ed',
    text: '#431407'
  },
  corporate: {
    primary: '#1e3a8a', // Corporate Blue
    secondary: '#60a5fa', // Bright Blue
    accent: '#1e40af',
    bg: '#eff6ff',
    text: '#172554'
  }
};

export const PreviewDisplay: React.FC<PreviewDisplayProps> = ({ page, lawyer, onActivate, onBack }) => {
  const whatsappLink = `https://wa.me/${lawyer.whatsapp.replace(/\D/g, '')}`;
  const theme = THEME_CONFIGS[lawyer.theme];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPublicImage = (keyword: string, width = 1200, height = 800) => {
    const cleanKeyword = encodeURIComponent(keyword.toLowerCase());
    return `https://images.unsplash.com/featured/${width}x${height}/?law,office,legal,${cleanKeyword}&auto=format&fit=crop&q=80`;
  };

  return (
    <div className="min-h-screen bg-white" style={{ 
      ['--primary' as any]: theme.primary,
      ['--secondary' as any]: theme.secondary,
      ['--accent' as any]: theme.accent,
      ['--bg-custom' as any]: theme.bg,
      ['--text-custom' as any]: theme.text
    }}>
      <style>{`
        .theme-primary-bg { background-color: var(--primary); }
        .theme-primary-text { color: var(--primary); }
        .theme-primary-border { border-color: var(--primary); }
        .theme-secondary-bg { background-color: var(--secondary); }
        .theme-secondary-text { color: var(--secondary); }
        .theme-secondary-border { border-color: var(--secondary); }
        .theme-accent-bg { background-color: var(--accent); }
        .theme-bg-custom { background-color: var(--bg-custom); }
        .theme-text-custom { color: var(--text-custom); }
      `}</style>

      {/* Editor Floating Header */}
      <div className="sticky top-0 z-[100] bg-slate-900 border-b border-white/10 px-4 md:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></span>
            <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-widest whitespace-nowrap">Visual {lawyer.theme.toUpperCase()} Ativo</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-white/10"></div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase tracking-tighter">Status</span>
            <span className="text-xs text-white font-medium truncate max-w-[150px]">Pronto para Publicar</span>
          </div>
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <button onClick={onBack} className="flex-1 sm:flex-none text-[10px] font-bold text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-white/5 transition-all border border-white/5">
            Mudar Tema
          </button>
          <button 
            onClick={onActivate}
            className="flex-1 sm:flex-none theme-secondary-bg text-white px-6 py-2 rounded-lg text-[10px] font-bold transition shadow-xl transform active:scale-95 flex items-center justify-center gap-2"
          >
            Ativar este Site
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </div>

      <div className="relative font-sans theme-text-custom selection:bg-indigo-50 overflow-x-hidden">
        
        {/* Navigation Header */}
        <header className="absolute top-0 w-full z-50 border-b border-slate-900/5 bg-white/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 md:h-24 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold serif theme-text-custom leading-none truncate max-w-[180px] sm:max-w-none uppercase tracking-tighter">{lawyer.name}</span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-500 mt-1 font-bold">
                {lawyer.oab ? `Inscrição OAB ${lawyer.oab}` : 'Advocacia de Excelência'}
              </span>
            </div>
            <nav className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
              <a href="#perfil" className="hover:theme-secondary-text transition">O Escritório</a>
              <a href="#atuacao" className="hover:theme-secondary-text transition">Atuação</a>
              <a href="#diferenciais" className="hover:theme-secondary-text transition">Diferenciais</a>
            </nav>
            <a href={whatsappLink} className="theme-primary-bg text-white px-4 md:px-6 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition shadow-lg shrink-0">
              Contato
            </a>
          </div>
        </header>

        <main>
          {/* HERO SECTION */}
          <section className="relative min-h-[90vh] flex items-center pt-20 md:pt-24 overflow-hidden">
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full theme-bg-custom z-0 opacity-50"></div>
            <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
              <div className="py-12 text-center lg:text-left">
                <div className="inline-block px-3 py-1 theme-bg-custom theme-secondary-text text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-sm mb-6 border theme-secondary-border">
                  {lawyer.specialty} em {lawyer.city}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold serif theme-text-custom mb-6 md:mb-8 leading-[1.2] md:leading-[1.1]">
                  {page.hero.h1}
                </h1>
                <p className="text-base md:text-xl text-slate-600 mb-8 md:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light px-4 lg:px-0">
                  {page.hero.subheadline}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href={whatsappLink} className="px-8 md:px-10 py-4 md:py-5 theme-primary-bg text-white rounded-none font-bold text-xs md:text-sm text-center hover:opacity-90 transition-all shadow-2xl flex items-center justify-center gap-3 group">
                    {page.hero.cta}
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="absolute -top-10 -right-10 w-64 h-64 theme-bg-custom rounded-full blur-3xl opacity-50"></div>
                <div className="relative z-10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-slate-100">
                  <img 
                    src={page.heroImageUrl || getPublicImage(page.heroImageKeyword, 1200, 1600)} 
                    alt={`Escritório ${lawyer.name}`} 
                    className="w-full h-[500px] xl:h-[650px] object-cover hover:scale-105 transition-all duration-1000"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* AUTHORITY SECTION */}
          <section id="perfil" className="py-20 md:py-32 bg-white relative">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
                <div className="md:col-span-5 md:sticky md:top-32 text-center md:text-left">
                  <h2 className="text-[10px] md:text-[11px] font-bold theme-secondary-text uppercase tracking-[0.4em] mb-4">A Instituição</h2>
                  <h3 className="text-3xl md:text-4xl font-bold serif theme-text-custom mb-6 leading-tight uppercase tracking-tight">
                    {page.authority.title}
                  </h3>
                  <div className="w-16 md:w-20 h-1 theme-primary-bg mx-auto md:mx-0"></div>
                </div>
                <div className="md:col-span-7 mt-8 md:mt-0">
                  <div className="relative mb-12 p-8 md:p-12 theme-bg-custom border-l-4 theme-primary-border">
                    <p className="text-xl md:text-2xl font-light italic serif text-slate-700 leading-relaxed text-center md:text-left relative z-10">
                      "{page.authority.missionStatement}"
                    </p>
                    <div className="absolute top-4 right-8 text-slate-200 text-8xl serif select-none opacity-50 font-bold">”</div>
                  </div>
                  <div className="text-base md:text-lg text-slate-600 leading-relaxed space-y-6">
                    {page.authority.text.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PRACTICE AREAS */}
          <section id="atuacao" className="py-20 md:py-32 theme-bg-custom/30">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-20 gap-6 text-center md:text-left">
                <div className="max-w-2xl">
                  <h2 className="text-[10px] md:text-[11px] font-bold theme-secondary-text uppercase tracking-[0.4em] mb-4">Expertise Jurídica</h2>
                  <h3 className="text-3xl md:text-5xl font-bold serif theme-text-custom uppercase tracking-tighter">{page.practiceAreas.title}</h3>
                </div>
                <div className="h-px bg-slate-200 flex-grow mx-8 hidden xl:block"></div>
                <a href={whatsappLink} className="theme-primary-text font-bold uppercase tracking-widest text-[10px] border-b-2 theme-primary-border pb-2 hover:opacity-70 transition whitespace-nowrap">
                  Análise de Caso
                </a>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {page.practiceAreas.areas.map((area, i) => (
                  <article key={i} className="bg-white group overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 rounded-sm">
                    <div className="h-56 overflow-hidden relative bg-slate-100">
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all duration-700 z-10"></div>
                      <img 
                        src={area.generatedImageUrl || getPublicImage(area.imageKeyword, 800, 600)} 
                        alt={area.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                      />
                    </div>
                    <div className="p-8 md:p-10">
                      <h4 className="text-xl md:text-2xl font-bold serif theme-text-custom mb-4 uppercase tracking-tighter group-hover:theme-secondary-text transition-colors">{area.name}</h4>
                      <p className="text-slate-500 leading-relaxed text-sm font-light">
                        {area.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* LOCAL SEO SECTION */}
          <section className="py-24 md:py-32 theme-primary-bg text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <img src={getPublicImage(`${lawyer.city} landscape`, 1920, 1080)} alt={lawyer.city} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
            
            <div className="max-w-4xl mx-auto px-6 relative z-10">
              <h2 className="text-[9px] md:text-[11px] font-bold theme-secondary-text uppercase tracking-[0.4em] mb-12">{page.localSeoSection.title}</h2>
              <div className="text-2xl md:text-5xl font-light leading-tight serif mb-12 px-2">
                {page.localSeoSection.content}
              </div>
              <a href={whatsappLink} className="inline-block px-10 md:px-14 py-4 md:py-5 bg-white theme-primary-text font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-slate-100 transition shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]">
                Agendar Consulta em {lawyer.city}
              </a>
            </div>
          </section>

          {/* DIFFERENTIATORS */}
          <section id="diferenciais" className="py-20 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
                <div className="order-2 lg:order-1 space-y-8 md:space-y-12 text-center lg:text-left">
                  <h2 className="text-3xl md:text-5xl font-bold serif theme-text-custom leading-tight uppercase tracking-tighter">
                    {page.differentiators.title}
                  </h2>
                  <div className="grid gap-10">
                    {page.differentiators.items.map((item, i) => (
                      <div key={i} className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-center sm:text-left group">
                        <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 theme-bg-custom flex items-center justify-center theme-primary-text font-bold text-lg serif border theme-primary-border group-hover:theme-primary-bg group-hover:text-white transition-all duration-500">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="text-lg md:text-xl font-bold theme-text-custom mb-2 uppercase tracking-tight">{item.title}</h4>
                          <p className="text-slate-500 leading-relaxed text-sm font-light">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="order-1 lg:order-2 theme-bg-custom p-10 md:p-20 border theme-primary-border/10 text-center sm:text-left relative">
                  <div className="absolute top-0 right-0 w-32 h-32 theme-secondary-bg opacity-10 rounded-bl-full"></div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] theme-secondary-text mb-8">Atendimento Presencial</div>
                  <address className="not-italic text-2xl md:text-3xl serif theme-text-custom mb-10 leading-snug">
                    {page.footer.address}
                  </address>
                  <p className="text-slate-500 text-sm mb-12 leading-relaxed max-w-sm mx-auto sm:mx-0 font-light">
                    Sua segurança jurídica começa com um atendimento humano e especializado. Agende sua visita ou reunião digital.
                  </p>
                  <a href={whatsappLink} className="block w-full py-5 border-2 theme-primary-border theme-primary-text text-center font-bold uppercase tracking-widest text-[10px] md:text-xs hover:theme-primary-bg hover:text-white transition duration-500">
                    Solicitar Localização
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="theme-primary-bg text-white pt-20 md:pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-20 md:mb-32">
              <div className="col-span-1 text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold serif text-white mb-6 uppercase tracking-tighter">{lawyer.name}</div>
              </div>
              <div className="col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-300">
                   <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] theme-secondary-text mb-6">Nota Ética OAB</h5>
                      <p className="text-[10px] leading-relaxed uppercase tracking-wider font-light">
                        {page.footer.disclaimer} • Portal em conformidade com o Provimento 205/2021 do CFOAB.
                      </p>
                   </div>
                   <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] theme-secondary-text mb-6">Contatos Oficiais</h5>
                      <div className="space-y-4 text-xs font-light">
                         <p className="flex items-center gap-3"><span className="text-white font-bold text-[9px] uppercase tracking-widest">Email:</span> {lawyer.email}</p>
                         <p className="flex items-center gap-3"><span className="text-white font-bold text-[9px] uppercase tracking-widest">Fone:</span> {lawyer.whatsapp}</p>
                         <p className="flex items-center gap-3"><span className="text-white font-bold text-[9px] uppercase tracking-widest">Sede:</span> {lawyer.city} - {lawyer.state}</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} {lawyer.name} • Visual {lawyer.theme.toUpperCase()}
              </div>
            </div>
          </div>
        </footer>

        <script type="application/ld+json">
          {page.seo.schema}
        </script>
      </div>

      <a 
        href={whatsappLink}
        className="fixed bottom-8 right-8 z-[110] group"
      >
        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-25"></div>
        <div className="relative w-16 h-16 md:w-20 md:h-20 bg-emerald-600 text-white flex items-center justify-center shadow-[0_20px_50px_rgba(16,185,129,0.4)] hover:bg-emerald-500 transition-all hover:scale-110 active:scale-90 border-4 border-white/20">
          <svg className="w-8 h-8 md:w-10 md:h-10 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.893-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.414 0 6.556-5.333 11.891-11.893 11.891-2.01 0-3.987-.512-5.741-1.488l-6.252 1.595zm6.745-3.141l.363.216c1.448.86 3.12 1.314 4.831 1.314 5.224 0 9.474-4.25 9.474-9.475 0-2.532-1.002-4.921-2.822-6.741-1.821-1.82-4.209-2.824-6.742-2.824-5.225 0-9.475 4.25-9.475 9.475 0 1.777.493 3.513 1.427 5.034l.235.385-1.107 4.047 4.144-1.056z"/></svg>
        </div>
      </a>
    </div>
  );
};
