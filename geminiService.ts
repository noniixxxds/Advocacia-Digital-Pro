
import { GoogleGenAI, Type } from "@google/genai";
import { LawyerData, GeneratedPage } from "./types";

/**
 * Generic function to generate high-quality legal-themed images
 */
export async function generateLegalImage(prompt: string): Promise<string | undefined> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const enhancedPrompt = `
    High-end professional photography for a law firm. 
    Subject: ${prompt}. 
    Style: Architectural photography, cinematic lighting, shallow depth of field, minimalist and luxury aesthetic. 
    Colors: Deep tones, high contrast, elegant materials. 
    No people faces, focusing on atmosphere, objects, or office environments. 
    Ultra-realistic, 8k resolution.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: enhancedPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
  } catch (error) {
    console.error("Image generation error:", error);
  }
  return undefined;
}

export async function generateHeroImage(data: LawyerData): Promise<string | undefined> {
  const prompt = `A modern and luxurious law office in ${data.city} with a ${data.theme} aesthetic. Professional, calm, and high-status.`;
  return generateLegalImage(prompt);
}

export async function generateLegalLandingPage(data: LawyerData): Promise<GeneratedPage> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Atue como Arquiteto de SEO e Copywriter Jurídico Sênior (padrão OAB).
    Crie uma landing page premium para:
    Advogado: ${data.name} | OAB: ${data.oab || 'N/A'}
    Especialidade: ${data.specialty}
    Localização: ${data.city} - ${data.state}
    Diferenciais: ${data.differential}
    Tom de Voz: Baseado no tema visual '${data.theme}' (ex: se classic=formal/solene, se human=acolhedor/claro, se modern=direto/inovador).

    DIRETRIZES:
    1. SEO LOCAL: Foque em "Advogado em ${data.city}".
    2. ÉTICA OAB: Linguagem sóbria e informativa, sem mercantilização.
    3. IMAGENS: Para cada área de atuação, forneça uma 'imageKeyword' em inglês que combine com o tema '${data.theme}'.

    Retorne APENAS o JSON conforme o schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            heroImageKeyword: { type: Type.STRING },
            seo: {
              type: Type.OBJECT,
              properties: {
                metaTitle: { type: Type.STRING },
                metaDescription: { type: Type.STRING },
                keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                schema: { type: Type.STRING },
              },
              required: ["metaTitle", "metaDescription", "schema"],
            },
            hero: {
              type: Type.OBJECT,
              properties: {
                h1: { type: Type.STRING },
                subheadline: { type: Type.STRING },
                cta: { type: Type.STRING },
              },
              required: ["h1", "subheadline", "cta"],
            },
            authority: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                text: { type: Type.STRING },
                missionStatement: { type: Type.STRING },
              },
              required: ["title", "text", "missionStatement"],
            },
            practiceAreas: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                areas: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      description: { type: Type.STRING },
                      slug: { type: Type.STRING },
                      imageKeyword: { type: Type.STRING },
                    },
                  },
                },
              },
              required: ["title", "areas"],
            },
            localSeoSection: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                content: { type: Type.STRING },
              },
              required: ["title", "content"],
            },
            differentiators: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                items: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                    },
                  },
                },
              },
              required: ["title", "items"],
            },
            footer: {
              type: Type.OBJECT,
              properties: {
                disclaimer: { type: Type.STRING },
                address: { type: Type.STRING },
              },
              required: ["disclaimer", "address"],
            },
          },
          required: ["heroImageKeyword", "seo", "hero", "authority", "practiceAreas", "localSeoSection", "differentiators", "footer"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("Resposta vazia da IA.");
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : text;
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Erro na geração do conteúdo:", error);
    throw error;
  }
}
