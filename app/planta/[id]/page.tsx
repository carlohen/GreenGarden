"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Info, Leaf, MapPin, Menu, Share2, Map as MapIcon, Droplets, Sun, Gauge, Sparkles } from "lucide-react";
import { getPlantById, type Plant } from "@/lib/data";
import { useState, useEffect } from "react";
import SideMenu from "@/components/SideMenu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { getPlants, loadPlantsCache, getMergedPlants } from "@/lib/plants";
// Importa as funções de métricas
import { incrementViews, registerPlantReading } from "@/lib/metrics";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-muted animate-pulse rounded-3xl" />
});

export default function PlantPage() {
  const { id } = useParams();
  const plantId = Array.isArray(id) ? id[0] : id;
  const [plant, setPlant] = useState<Plant | undefined>(undefined);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);

  // Carregamento dos dados da planta
  useEffect(() => {
    async function loadDynamicPlant() {
      const cached = loadPlantsCache();
      if (cached && cached.length > 0) {
        const merged = getMergedPlants(cached);
        const found = merged.find(p => p.id === plantId);
        if (found) {
          setPlant(found);
        }
      }
      
      try {
        const apiPlants = await getPlants();
        if (apiPlants && apiPlants.length > 0) {
          const merged = getMergedPlants(apiPlants);
          const found = merged.find(p => p.id === plantId);
          if (found) {
            setPlant(found);
          }
        }
      } catch (err) {
        console.error("Erro ao buscar plantas da API:", err);
      }
    }
    loadDynamicPlant();
  }, [plantId]);

  // Hook isolado para controle e envio das Métricas
  useEffect(() => {
    if (!plantId) return;

    // 1. Incrementa a visualização assim que o usuário entra na tela
    incrementViews(plantId);

    // Captura o momento exato em que a leitura começou
    const horaInicio = new Date().toISOString();
    
    // ID Mockado enquanto seu sistema de autenticação/sessão não está pronto
    const mockUsuarioId = 1; 

    // 2. Cleanup Function: Executa quando o componente é desmontado (usuário muda de página)
    return () => {
      const horaFim = new Date().toISOString();
      registerPlantReading(plantId, mockUsuarioId, horaInicio, horaFim);
    };
  }, [plantId]);

  const handleShare = async () => {
    const shareData = {
      title: `Green Garden - ${plant?.name}`,
      text: `Conheça a planta ${plant?.name} (${plant?.scientificName}) no Green Garden da UNIFOR!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareFeedback(true);
        setTimeout(() => setShareFeedback(false), 2000);
      }
    } catch (err) {
      console.error("Erro ao compartilhar:", err);
    }
  };

  if (!plant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h1 className="text-2xl font-heading text-brand">Planta não encontrada</h1>
        <Link href="/" className="mt-4 text-brand-light flex items-center gap-2">
          <ChevronLeft className="w-5 h-5" /> Voltar ao Início
        </Link>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Header with Image Background */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <Image
          src={plant.imageUrl}
          alt={plant.name}
          fill
          unoptimized
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Navigation */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
          <Link
            href="/catalago"
            className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors border border-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex gap-2 relative">
            <button
              onClick={handleShare}
              className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors border border-white/10"
            >
              <Share2 className="w-5 h-5" />
            </button>
            {shareFeedback && (
              <div className="absolute -bottom-10 right-0 bg-brand text-white text-[10px] px-3 py-1 rounded-full shadow-lg font-bold animate-fade-in-up">
                Link copiado!
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors border border-white/10"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Title Content Overlay */}
        <div className="absolute bottom-10 left-6 right-6 z-20">
          <Badge className="bg-brand-light text-white border-none mb-3 px-3 py-0.5 text-[10px] tracking-[0.2em] font-heading uppercase font-bold">
            {plant.family}
          </Badge>
          <h1 className="text-5xl font-heading text-white tracking-tight leading-none mb-2 drop-shadow-lg">
            {plant.name}
          </h1>
          <p className="text-brand-light font-heading italic text-xl opacity-95 tracking-tight drop-shadow-md">
            {plant.scientificName}
          </p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="flex-1 bg-background -mt-8 rounded-t-[2.5rem] relative z-30 px-6 pt-10 pb-12 shadow-2xl overflow-visible">
        {/* Action Pills */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="flex items-center gap-3 p-4 bg-card/80 rounded-2xl border border-border/50">
            <div className="bg-brand/10 p-2 rounded-xl">
              <MapPin className="w-5 h-5 text-brand" />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest block mb-0.5">Origem</span>
              <p className="text-sm font-sans text-brand font-semibold leading-tight">{plant.origin}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-card/80 rounded-2xl border border-border/50">
            <div className="bg-brand/10 p-2 rounded-xl">
              <Leaf className="w-5 h-5 text-brand" />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest block mb-0.5">Bioma</span>
              <p className="text-sm font-sans text-brand font-semibold leading-tight">{plant.biome}</p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white shadow-lg shadow-brand/20">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-2xl text-brand tracking-tight">Características</h3>
          </div>
          <p className="text-foreground/80 font-sans leading-relaxed text-base">
            {plant.characteristics}
          </p>
        </section>

        {/* Care Section */}
        {plant.care && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center text-white shadow-lg shadow-brand-light/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-2xl text-brand tracking-tight">Cuidados Essenciais</h3>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="flex flex-col items-center gap-2 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <Droplets className="w-6 h-6 text-blue-500" />
                <span className="text-[10px] text-blue-400 uppercase font-black tracking-widest">Água</span>
                <p className="text-xs font-bold text-blue-700 capitalize">{plant.care.water}</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50">
                <Sun className="w-6 h-6 text-orange-500" />
                <span className="text-[10px] text-orange-400 uppercase font-black tracking-widest">Luz</span>
                <p className="text-xs font-bold text-orange-700 capitalize">{plant.care.sun}</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                <Gauge className="w-6 h-6 text-emerald-500" />
                <span className="text-[10px] text-emerald-400 uppercase font-black tracking-widest">Nível</span>
                <p className="text-xs font-bold text-emerald-700 capitalize">{plant.care.difficulty}</p>
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-3xl border border-border/50">
              <h4 className="text-xs font-black text-brand-light uppercase tracking-[0.2em] mb-4">Dicas de Cultivo</h4>
              <ul className="space-y-3">
                {plant.care.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-brand">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-foreground/70 font-medium leading-tight">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Ecological Importance */}
        <section className="mb-10 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="font-heading text-2xl text-brand tracking-tight mb-5">Por que ela é importante?</h3>
            <div className="space-y-4">
              {plant.ecologicalImportance.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="w-2 h-2 rounded-full bg-brand-light mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-sm text-foreground/80 font-sans leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curiosities / Tips Card */}
        <div className="bg-brand shadow-[0_20px_50px_rgba(45,90,39,0.15)] p-8 rounded-[2rem] mb-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />
          <h3 className="font-heading text-xl mb-4 italic opacity-90 underline decoration-brand-light decoration-2 underline-offset-4">Você sabia?</h3>
          <ul className="space-y-3">
            {plant.curbsideNotes.map((note, idx) => (
              <li key={idx} className="text-sm font-sans font-medium leading-relaxed flex gap-2">
                <span className="text-brand-light">★</span> {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Location Map Pins */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em]">Onde encontrar</span>
            <div className="h-px bg-border flex-1 ml-4" />
          </div>
          <div className="flex flex-wrap gap-2">
            {plant.blocks.map(blockId => (
              <Link key={blockId} href={`/bloco/${blockId}`}>
                <Button variant="outline" className="rounded-xl border-brand/10 text-brand-light hover:bg-brand hover:text-white capitalize transition-all font-heading text-xs tracking-wider h-10 px-4">
                  <MapPin className="w-3.5 h-3.5 mr-2" /> {blockId.replace('-', ' ')}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Interactive Location Map */}
        {(plant.lat && plant.lng) && (
          <section className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-brand/10 p-2 rounded-xl">
                <MapIcon className="w-6 h-6 text-brand" />
              </div>
              <h3 className="font-heading text-2xl text-brand tracking-tight">Localização Exata</h3>
            </div>

            <div className="h-64 w-full rounded-[2.5rem] overflow-hidden shadow-xl border border-border/50 relative">
              <Map lat={plant.lat} lng={plant.lng} zoom={18} />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none rounded-[2.5rem]" />
            </div>
            <p className="mt-4 text-[10px] text-muted-foreground font-sans uppercase tracking-[0.1em] text-center">
              Coordenadas: {plant.lat.toFixed(6)}, {plant.lng.toFixed(6)}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}