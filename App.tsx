
import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { StepForm } from './components/StepForm';
import { PreviewDisplay } from './components/PreviewDisplay';
import { LawyerData, GeneratedPage, AppStep } from './types';
import { generateLegalLandingPage, generateHeroImage, generateLegalImage } from './geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');
  const [lawyerData, setLawyerData] = useState<LawyerData | null>(null);
  const [generatedPage, setGeneratedPage] = useState<GeneratedPage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);

  const loadingSteps = [
    "Analisando perfil estratégico...",
    "Estruturando clusters de SEO local...",
    "Redigindo conteúdo ético (Padrão OAB)...",
    "Gerando Hero Image com IA...",
    "Criando artes para cada área de atuação...",
    "Finalizando arquitetura de conversão..."
  ];

  useEffect(() => {
    let timer: number;
    let stepInterval: number;

    if (step === 'generating') {
      setActiveStepIndex(0);
      setTimeLeft(40);

      timer = window.setInterval(() => {
        setTimeLeft((prev) => (prev > 1 ? prev - 1 : 1));
      }, 1000);

      stepInterval = window.setInterval(() => {
        setActiveStepIndex((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 6000);
    }

    return () => {
      clearInterval(timer);
      clearInterval(stepInterval);
    };
  }, [step, loadingSteps.length]);

  const handleStart = () => {
    setError(null);
    setStep('form');
  };
  
  const handleGenerate = async (data: LawyerData) => {
    setLawyerData(data);
    setStep('generating');
    setError(null);
    
    // Gera um ID único para esta sessão de criação
    const newId = `ADP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setSessionId(newId);

    const timeoutId = setTimeout(() => {
      if (step === 'generating') {
        setError("A geração expirou. Tente novamente ou verifique sua internet.");
        setStep('form');
      }
    }, 180000);

    try {
      const page = await generateLegalLandingPage(data);
      const heroImageUrlPromise = generateHeroImage(data);
      const areaImagesPromises = page.practiceAreas.areas.map(area => 
        generateLegalImage(`Concept for ${area.name}: ${area.description}. Abstract legal objects.`)
      );

      const [heroImageUrl, ...areaImages] = await Promise.all([
        heroImageUrlPromise,
        ...areaImagesPromises
      ]);

      const finalPage: GeneratedPage = {
        ...page,
        heroImageUrl: heroImageUrl || undefined,
        practiceAreas: {
          ...page.practiceAreas,
          areas: page.practiceAreas.areas.map((area, idx) => ({
            ...area,
            generatedImageUrl: areaImages[idx]
          }))
        }
      };

      clearTimeout(timeoutId);
      setGeneratedPage(finalPage);
      
      setActiveStepIndex(loadingSteps.length); 
      setTimeout(() => setStep('preview'), 800);
      
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error(err);
      setError("Erro técnico ao gerar o site. Por favor, revise os dados e tente novamente.");
      setStep('form');
    }
  };

  const handleActivate = () => {
    if (!lawyerData || !generatedPage) return;
    
    const phoneNumber = "5511953828817";
    const siteUrl = `https://advocaciadigital.pro/site/${sessionId}`;
    
    const baseMessage = `🚀 *SOLICITAÇÃO DE ATIVAÇÃO - SITE PRONTO*

Olá! Acabei de gerar minha landing page profissional e quero colocá-la no ar agora.

🔗 *Link do Site Criado:* ${siteUrl}
🆔 *ID do Projeto:* ${sessionId}

--- *Dados do Profissional* ---
👤 *Nome:* ${lawyerData.name}
⚖️ *Especialidade:* ${lawyerData.specialty}
📍 *Cidade:* ${lawyerData.city}/${lawyerData.state}
📧 *E-mail:* ${lawyerData.email}
📱 *WhatsApp:* ${lawyerData.whatsapp}

--- *Configurações SEO* ---
🏷️ *Título:* ${generatedPage.seo.metaTitle}
📝 *Meta Descrição:* ${generatedPage.seo.metaDescription}

Por favor, procedam com a ativação do meu domínio e setup do Google Search Central.`;

    const finalMessage = encodeURIComponent(baseMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${finalMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {step === 'landing' && (
        <>
          <Navigation onStart={handleStart} />
          <HeroSection onStart={handleStart} />
          
          <section id="como-funciona" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-20">
                <h2 className="text-4xl font-bold text-slate-900 mb-4 serif">Excelência Digital Jurídica</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Design premium com as melhores práticas de SEO do Google Search Central.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-16">
                {[
                  { step: "01", title: "Intake Estratégico", desc: "Coletamos seus dados para definir os clusters de palavras-chave." },
                  { step: "02", title: "Arquitetura SEO", desc: "Nossa IA gera o conteúdo com Schema Markup e semântica HTML5." },
                  { step: "03", title: "Autoridade Local", desc: "Sua landing page preparada para dominar as buscas locais." }
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="text-5xl font-bold text-slate-100 group-hover:text-indigo-50 transition mb-6 serif">{item.step}</div>
                    <h3 className="text-xl font-bold mb-4 text-slate-900 uppercase tracking-widest">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="precos" className="py-24 bg-slate-950 text-white">
             <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                  <div className="max-w-xl text-center lg:text-left">
                    <h2 className="text-5xl font-bold mb-8 serif">Investimento em Autoridade</h2>
                    <p className="text-slate-400 text-lg mb-10">Crie agora. Pague apenas na ativação do domínio final e setup de indexação Google.</p>
                    <button onClick={handleStart} className="bg-white text-black px-12 py-5 font-bold uppercase tracking-widest text-xs hover:bg-slate-200 transition">
                      Iniciar Geração Gratuita
                    </button>
                  </div>
                  <div className="bg-white/5 p-12 border border-white/10 rounded-sm w-full lg:w-96 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 block mb-4">Taxa de Ativação</span>
                    <div className="text-6xl font-bold mb-4 serif">R$ 497</div>
                    <p className="text-slate-500 text-sm">Setup técnico completo + <br/>Indexação Google inclusa</p>
                  </div>
                </div>
             </div>
          </section>

          <footer className="py-12 bg-white border-t border-slate-100 text-center">
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">&copy; {new Date().getFullYear()} Advocacia Digital Pro</p>
          </footer>
        </>
      )}

      {step === 'form' && (
        <StepForm onGenerate={handleGenerate} onCancel={() => setStep('landing')} />
      )}

      {step === 'generating' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
          <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-2xl border border-slate-100 max-w-lg w-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1.5 bg-indigo-900 transition-all duration-1000 ease-out" style={{ width: `${((activeStepIndex + 1) / loadingSteps.length) * 100}%` }}></div>

            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-50 rounded-full mb-6 relative">
                 <div className="absolute inset-0 border-4 border-indigo-900/10 rounded-full"></div>
                 <div className="absolute inset-0 border-t-4 border-indigo-900 rounded-full animate-spin"></div>
                 <span className="text-indigo-900 font-bold text-xl serif">{timeLeft}s</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 serif tracking-tight">Criando sua Autoridade Digital</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Tempo estimado restante</p>
            </div>

            <div className="space-y-6">
              {loadingSteps.map((text, i) => {
                const isCompleted = i < activeStepIndex;
                const isActive = i === activeStepIndex;
                
                return (
                  <div key={i} className={`flex items-center gap-4 transition-all duration-500 ${isCompleted ? 'opacity-100' : isActive ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                      isCompleted ? 'bg-indigo-900 border-indigo-900' : isActive ? 'border-indigo-900' : 'border-slate-200'
                    }`}>
                      {isCompleted ? (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      ) : isActive ? (
                        <div className="w-1.5 h-1.5 bg-indigo-900 rounded-full animate-ping"></div>
                      ) : null}
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${isActive ? 'text-indigo-900' : 'text-slate-500'}`}>
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-50 text-center">
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.1em]">
                Gerando Imagens com IA & Otimização SEO
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 'preview' && lawyerData && generatedPage && (
        <PreviewDisplay 
          lawyer={lawyerData} 
          page={generatedPage} 
          onActivate={handleActivate}
          onBack={() => setStep('form')}
        />
      )}

      {error && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] w-full max-w-md px-4">
          <div className="bg-red-600 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4">
            <span className="text-sm font-medium">{error}</span>
            <button onClick={() => setError(null)} className="text-white hover:text-red-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
