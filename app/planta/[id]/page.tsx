"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { getPlantById } from "@/lib/data";
import { useState } from "react";
import SideMenu from "@/components/SideMenu";

export default function PlantPage() {
  const { id } = useParams();
  const plantId = Array.isArray(id) ? id[0] : id;
  const plant = getPlantById(plantId || "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!plant) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen bg-background pb-10">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Top Green Area */}
      <div className="bg-brand rounded-b-[2.5rem] flex flex-col pt-4">
        {/* Header */}
        <header className="px-6 py-2 flex justify-between items-center text-white mb-6">
          <Link href="/" className="flex items-center">
            <h1 className="font-heading text-3xl tracking-tighter leading-none">
              GREEN
            </h1>
            <h2 className="text-brand-light font-heading text-2xl italic tracking-tight leading-none mt-1">
              Garden
            </h2>
          </Link>
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-8 h-8" />
          </button>
        </header>

        {/* Plant Intro Card */}
        <div className="px-6 pb-10">
          <div className="flex gap-4">
            {/* Image Box */}
            <div className="w-1/2 relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
              <Image
                src={plant.imageUrl}
                alt={plant.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Info */}
            <div className="w-1/2 text-white flex flex-col justify-center">
              <h2 className="font-heading text-3xl mb-4 leading-none tracking-wide text-gray-50">{plant.name}</h2>
              <div className="space-y-3 text-xs text-gray-200">
                <p>
                  <strong className="text-white block">Nome científico:</strong>
                  {plant.scientificName}
                </p>
                <p>
                  <strong className="text-white block">Família:</strong>
                  {plant.family}
                </p>
                <p>
                  <strong className="text-white block">Origem:</strong>
                  {plant.origin}
                </p>
                <p>
                  <strong className="text-white block">Bioma:</strong>
                  {plant.biome}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-6 py-8 space-y-10">
        
        {/* Características */}
        <section>
          <h3 className="font-heading text-brand text-2xl tracking-wide w-full mb-4 uppercase">
            Características
          </h3>
          <p className="text-sm text-gray-800 leading-relaxed font-sans">
            {plant.characteristics}
          </p>
        </section>

        {/* Importância Ecológica */}
        <section>
          <div className="flex gap-4 items-start">
            <div className="w-[40%] relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md flex-shrink-0">
               <Image
                 src={plant.thumbnailUrl}
                 alt={`Foto de ${plant.name}`}
                 fill
                 className="object-cover"
               />
            </div>
            <div className="w-[60%] flex flex-col">
              <h3 className="font-heading text-brand text-xl uppercase leading-tight mb-2">
                Importância Ecológica
              </h3>
              <div className="w-12 h-1 bg-brand-light mb-4 rounded-full"></div>
              <ul className="list-disc pl-4 text-xs text-gray-800 space-y-2 font-sans marker:text-black">
                {plant.ecologicalImportance.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Curiosidades */}
        <section>
          <h3 className="font-heading text-brand text-2xl tracking-wide mb-4 uppercase">
            Curiosidades
          </h3>
          <div className="bg-brand-light rounded-2xl p-6 text-white text-sm font-sans shadow-md">
            <ul className="list-disc pl-4 space-y-2 marker:text-white">
              {plant.curbsideNotes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

      </div>
    </main>
  );
}
