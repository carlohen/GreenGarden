"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MapPin, Menu, Search } from "lucide-react";
import { getBlockById, getPlantsByBlock } from "@/lib/data";
import { useState } from "react";
import SideMenu from "@/components/SideMenu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BlockPage() {
  const { id } = useParams();
  const blockId = Array.isArray(id) ? id[0] : id;
  const block = getBlockById(blockId || "");
  const blockPlants = getPlantsByBlock(blockId || "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!block) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="text-2xl font-heading text-brand">Setor não encontrado</h1>
        <Link href="/" className="mt-4 text-brand-light flex items-center gap-2">
          <ChevronLeft className="w-5 h-5" /> Voltar ao Início
        </Link>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-background overflow-hidden relative">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Premium Header Overlays */}
      <header className="absolute top-0 left-0 right-0 z-40 px-6 py-8 flex justify-between items-center pointer-events-none">
        <div className="flex gap-3 pointer-events-auto">
          <Link href="/" className="bg-white/90 backdrop-blur-md p-3 rounded-[1.25rem] shadow-xl border border-white/50 text-brand hover:scale-110 active:scale-95 transition-all">
            <ChevronLeft className="w-6 h-6" />
          </Link>
        </div>
        
        <div className="flex flex-col items-center pointer-events-auto">
          <Badge className="bg-brand/90 backdrop-blur-sm text-white border-none mb-2 px-4 py-1 text-[9px] tracking-[0.25em] font-heading uppercase font-black shadow-lg">
            LOCALIZAÇÃO EM TEMPO REAL
          </Badge>
          <div className="bg-white/90 backdrop-blur-md px-8 py-2 rounded-2xl shadow-xl border border-white/50 ring-1 ring-black/5">
            <h1 className="font-heading text-2xl text-brand tracking-tighter leading-none">{block.name}</h1>
          </div>
        </div>

        <button 
          onClick={() => setIsMenuOpen(true)}
          className="bg-white/90 backdrop-blur-md p-3 rounded-[1.25rem] shadow-xl border border-white/50 text-brand hover:scale-110 active:scale-95 transition-all pointer-events-auto"
        >
          <Menu className="w-7 h-7" />
        </button>
      </header>

      {/* High-Impact Map Component */}
      <div className="relative flex-1 bg-[#f8f9fa]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1500"
            alt="Campus Map"
            fill
            className="object-cover transition-transform duration-[1500ms] ease-out scale-[3]"
            style={{ 
              objectPosition: `${block.focusX}% ${block.focusY}%`
            }}
          />
          
          {/* Animated Map HUD */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10 pointer-events-none" />
          
          {/* Pulsing Pin - Centered because of object-position trick */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="relative">
              <div className="absolute inset-0 bg-brand rounded-full animate-ping opacity-40 scale-150" />
              <div className="relative bg-brand p-5 rounded-full shadow-[0_0_40px_rgba(45,90,39,0.5)] border-[5px] border-white ring-2 ring-brand/20">
                <MapPin className="w-10 h-10 text-white fill-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Flora Browser */}
      <section className="absolute bottom-10 left-0 right-0 z-40">
        <div className="px-6 mb-5 flex justify-between items-end">
          <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-[1.5rem] shadow-2xl border border-white/50 ring-1 ring-black/5">
            <h3 className="font-heading text-brand text-base tracking-tight leading-none mb-1.5 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-brand-light" /> ESPÉCIES LOCAIS
            </h3>
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.15em] leading-none">
              {blockPlants.length} plantas identificadas
            </span>
          </div>
          <Link href="/catalago">
            <Button className="bg-brand rounded-2xl shadow-xl h-12 px-6 hover:translate-y-[-2px] transition-all text-xs tracking-widest font-black uppercase ring-offset-2 ring-brand/20 hover:ring-2">
              <Search className="w-4 h-4 mr-2" /> Explorar Tudo
            </Button>
          </Link>
        </div>
        
        <div className="overflow-x-auto pb-6 scrollbar-hide">
          <div className="flex gap-5 px-6 min-w-max">
            {blockPlants.map((plant) => (
              <Link 
                key={plant.id} 
                href={`/planta/${plant.id}`}
                className="group w-44"
              >
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-[2rem] shadow-2xl border border-white/50 hover:bg-white transition-all hover:-translate-y-3 group-active:scale-95 duration-500 ring-1 ring-black/5">
                  <div className="relative aspect-square w-full rounded-[1.5rem] overflow-hidden mb-4 shadow-sm">
                    <Image
                      src={plant.thumbnailUrl}
                      alt={plant.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-brand/10 group-hover:bg-transparent transition-colors" />
                  </div>
                  <h4 className="font-heading text-brand text-base tracking-tight truncate leading-tight group-hover:text-brand-light transition-colors mb-0.5">{plant.name}</h4>
                  <p className="text-[10px] text-gray-400 font-heading italic truncate opacity-80 whitespace-nowrap overflow-hidden">{plant.scientificName}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Styles for scrollbar-hide */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}

import { Leaf } from "lucide-react";
