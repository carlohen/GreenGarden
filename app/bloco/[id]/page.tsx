"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Menu, ChevronLeft } from "lucide-react";
import { getPlantsByBlock, getBlockById } from "@/lib/data";
import { useState } from "react";
import SideMenu from "@/components/SideMenu";

export default function BlocoPage() {
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const blockId = Array.isArray(id) ? id[0] : id;
  const plants = getPlantsByBlock(blockId || "");
  const blockData = getBlockById(blockId || "");
  
  const blockTitle = blockData?.name || "Bloco";

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Header */}
      <header className="bg-brand-green p-6 pt-12 rounded-b-[40px] relative overflow-hidden">
        <div className="flex justify-between items-center relative z-10">
          <Link href="/" className="text-white">
            <ChevronLeft className="w-8 h-8" />
          </Link>
          
          <div className="flex flex-col items-center">
            <span className="text-brand-light font-heading text-xl uppercase tracking-widest leading-tight">
              GREENGarden
            </span>
            <h1 className="text-white font-heading text-4xl tracking-tight leading-none mt-1">
              {blockTitle}
            </h1>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="text-white">
            <Menu className="w-8 h-8" />
          </button>
        </div>

        {/* Map Image with Zoom Focus */}
        <div className="mt-8 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-gray-100">
          <Image
            src="/campus-map.png"
            alt={`Mapa do ${blockTitle}`}
            fill
            className="object-cover transition-all duration-700"
            style={{ 
              objectPosition: blockData ? `${blockData.focusX}% ${blockData.focusY}%` : "center",
              transform: blockData ? "scale(2.5)" : "scale(1)"
            }}
          />
          {/* Legend overlay */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-brand shadow-sm">
            Foco: {blockTitle}
          </div>
        </div>
      </header>

      {/* Plants Section */}
      <section className="p-6">
        <h2 className="font-heading text-brand text-xl tracking-wide mb-6 uppercase border-b-2 border-brand-light/30 pb-2 inline-block">
          Plantas presentes nesse bloco
        </h2>

        <div className="grid grid-cols-2 gap-6 pb-12">
          {plants.map((plant) => (
            <Link 
              href={`/planta/${plant.id}`} 
              key={plant.id}
              className="flex flex-col"
            >
              <div className="aspect-square rounded-2xl overflow-hidden relative shadow-md mb-3 group">
                <Image
                  src={plant.thumbnailUrl}
                  alt={plant.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-sm font-semibold text-gray-800 text-center">
                {plant.name}
              </span>
            </Link>
          ))}
          
          {plants.length === 0 && (
            <div className="col-span-2 py-10 text-center text-gray-500 italic">
              Nenhuma planta catalogada para este bloco ainda.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
