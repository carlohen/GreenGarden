"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Info, Leaf, MapPin, Menu, Share2 } from "lucide-react";
import { getPlantById } from "@/lib/data";
import { useState } from "react";
import SideMenu from "@/components/SideMenu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PlantPage() {
  const { id } = useParams();
  const plantId = Array.isArray(id) ? id[0] : id;
  const plant = getPlantById(plantId || "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          className="object-cover"
          priority
        />
        {/* Modern Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Top Navigation */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
          <Link 
            href="/catalago" 
            className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors border border-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex gap-2">
            <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors border border-white/10">
              <Share2 className="w-5 h-5" />
            </button>
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
      <div className="flex-1 bg-white -mt-8 rounded-t-[2.5rem] relative z-30 px-6 pt-10 pb-12 shadow-2xl overflow-visible">
        {/* Action Pills */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="flex items-center gap-3 p-4 bg-gray-50/80 rounded-2xl border border-gray-100/50">
            <div className="bg-brand/10 p-2 rounded-xl">
              <MapPin className="w-5 h-5 text-brand" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block mb-0.5">Origem</span>
              <p className="text-sm font-sans text-brand font-semibold leading-tight">{plant.origin}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50/80 rounded-2xl border border-gray-100/50">
            <div className="bg-brand/10 p-2 rounded-xl">
              <Leaf className="w-5 h-5 text-brand" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block mb-0.5">Bioma</span>
              <p className="text-sm font-sans text-brand font-semibold leading-tight">{plant.biome}</p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-2xl text-brand tracking-tight">Características</h3>
          </div>
          <p className="text-gray-600 font-sans leading-relaxed text-base">
            {plant.characteristics}
          </p>
        </section>

        {/* Ecological Importance with Image Hook */}
        <section className="mb-10 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="font-heading text-2xl text-brand tracking-tight mb-5">Por que ela é importante?</h3>
            <div className="space-y-4">
              {plant.ecologicalImportance.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="w-2 h-2 rounded-full bg-brand-light mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-sm text-gray-700 font-sans leading-snug">{item}</p>
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
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em]">Onde encontrar</span>
            <div className="h-px bg-gray-100 flex-1 ml-4" />
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
      </div>
    </main>
  );
}
