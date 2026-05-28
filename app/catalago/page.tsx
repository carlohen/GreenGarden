"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, ChevronLeft } from "lucide-react";
import { plants, type Plant } from "@/lib/data";
import SideMenu from "@/components/SideMenu";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPlants, loadPlantsCache, getMergedPlants } from "@/lib/plants";

export default function CatalogSearch() {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allPlants, setAllPlants] = useState<Plant[]>([]);

  useEffect(() => {
    async function loadDynamicPlants() {
      const cached = loadPlantsCache();
      if (cached && cached.length > 0) {
        setAllPlants(getMergedPlants(cached));
      }
      
      try {
        const apiPlants = await getPlants();
        if (apiPlants && apiPlants.length > 0) {
          setAllPlants(getMergedPlants(apiPlants));
        }
      } catch (err) {
        console.error("Erro ao buscar plantas da API:", err);
      }
    }
    loadDynamicPlants();
  }, []);

  const results = allPlants.filter(plant => {
    const lowerQuery = query.toLowerCase();
    return (
      plant.name.toLowerCase().includes(lowerQuery) ||
      plant.scientificName.toLowerCase().includes(lowerQuery) ||
      plant.family.toLowerCase().includes(lowerQuery) ||
      plant.characteristics.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <main className="flex flex-col min-h-screen bg-background pb-10">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Header */}
      <header className="bg-brand px-6 py-4 flex justify-between items-center text-white shadow-md rounded-b-2xl">
        <Link href="/" className="flex items-center gap-2">
          <ChevronLeft className="w-6 h-6 outline-none" />
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-brand-light font-heading text-[10px] uppercase tracking-widest leading-none">GREEN Garden</span>
          <h1 className="font-heading text-xl tracking-tight leading-tight">Catálogo</h1>
        </div>
        <button onClick={() => setIsMenuOpen(true)} className="outline-none">
          <Menu className="w-7 h-7" />
        </button>
      </header>

      {/* Search Input */}
      <div className="px-6 py-6 font-sans">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-light w-5 h-5 transition-colors group-focus-within:text-brand" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Flor, árvore ou localização..."
            className="w-full bg-card rounded-full py-6 pl-12 pr-4 shadow-sm border-border/50 focus-visible:ring-brand focus-visible:border-brand transition-all text-base"
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="px-6 flex-1">
        <div className="flex justify-between items-end mb-6">
          <h3 className="font-heading text-2xl text-brand tracking-tight">
            {query ? "Resultados" : "Espécies"}
          </h3>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {results.length} plantas encontradas
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {results.map((plant) => (
            <Link
              href={`/planta/${plant.id}`}
              key={plant.id}
              className="group"
            >
              <Card className="border-none shadow-none bg-transparent overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <Image
                      src={plant.thumbnailUrl}
                      alt={plant.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-[10px] font-bold">Ver detalhes →</span>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <h4 className="font-heading text-lg text-brand leading-none truncate group-hover:text-brand-light transition-colors">{plant.name}</h4>
                    <Badge variant="outline" className="text-[9px] h-4 font-normal text-brand-light border-brand-light/20 bg-brand-light/5">
                      {plant.scientificName}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {results.length === 0 && (
          <div className="text-center py-20 bg-muted/50 rounded-3xl border-2 border-dashed border-border mt-4">
            <Search className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
            <p className="text-gray-400 text-sm font-sans italic">
              Nenhuma planta encontrada para sua busca.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
