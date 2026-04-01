"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, ChevronLeft } from "lucide-react";
import { searchPlants, plants } from "@/lib/data";
import SideMenu from "@/components/SideMenu";

export default function CatalogSearch() {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const results = query ? searchPlants(query) : plants;

  return (
    <main className="flex flex-col min-h-screen bg-background pb-10">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Header */}
      <header className="bg-brand px-6 py-4 flex justify-between items-center text-white shadow-md">
        <Link href="/" className="flex items-center gap-2">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center">
          <h1 className="font-heading text-2xl tracking-tighter leading-none">
            GREEN
          </h1>
          <h2 className="text-brand-light font-heading text-xl italic tracking-tight leading-none mt-1">
            Garden
          </h2>
        </div>
        <button onClick={() => setIsMenuOpen(true)}>
          <Menu className="w-7 h-7" />
        </button>
      </header>

      {/* Search Input */}
      <div className="px-6 py-6 font-sans">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquise por flor, planta ou localização"
            className="w-full bg-white rounded-full py-4 pl-12 pr-4 shadow-sm text-sm outline-none border border-gray-100 focus:border-brand-light transition-colors"
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="px-6 flex-1">
        <h3 className="font-heading text-xl text-gray-800 mb-4">
          {query ? `Resultados para "${query}"` : "Nosso Catálogo"}
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {results.map((plant) => (
            <Link
              href={`/planta/${plant.id}`}
              key={plant.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={plant.thumbnailUrl}
                  alt={plant.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-brand text-sm truncate">{plant.name}</h4>
                <p className="text-xs text-brand-light truncate">{plant.scientificName}</p>
              </div>
            </Link>
          ))}
        </div>
        
        {results.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-sm font-sans">
            Nenhuma planta encontrada.
          </div>
        )}
      </div>
    </main>
  );
}
