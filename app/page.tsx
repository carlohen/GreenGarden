"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { plants } from "@/lib/data";
import { useState } from "react";
import SideMenu from "@/components/SideMenu";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="flex flex-col min-h-screen bg-background pb-10">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Hero Section */}
      <section className="relative w-full h-80 flex flex-col justify-center items-center">
        {/* Background Image Map */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000"
            alt="Campus Greenery"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        {/* Header Icons / Menu */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <Menu className="w-8 h-8 text-white" />
          </button>
        </div>

        {/* Logo */}
        <div className="z-10 flex flex-col items-center mt-[-20px]">
          <h1 className="text-white font-heading text-6xl tracking-tighter leading-none">
            GREEN
          </h1>
          <h2 className="text-brand-light font-heading text-5xl italic tracking-tight leading-none -mt-2">
            Garden
          </h2>
        </div>

        {/* Search Bar - Overlapping bottom of hero */}
        <div className="absolute -bottom-6 w-full px-6 z-20">
          <Link href="/catalago" className="block w-full">
            <div className="bg-white rounded-full flex items-center px-4 py-3 shadow-lg">
              <Search className="text-brand w-6 h-6 mr-3" />
              <div className="text-gray-400 flex-1 outline-none font-sans text-sm">
                Pesquise por flor, planta ou localização
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Categories / Quick Links */}
      <section className="mt-12 px-6 flex justify-between gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {plants.map((plant) => (
          <Link
            href={`/planta/${plant.id}`}
            key={plant.id}
            className="flex flex-col items-center min-w-[70px] flex-shrink-0"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mb-2 relative border-2 border-transparent hover:border-brand transition-colors shadow-sm">
              <Image
                src={plant.thumbnailUrl}
                alt={plant.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs text-center text-gray-800 font-medium leading-tight max-w-[70px]">
              {plant.name}
            </span>
          </Link>
        ))}
      </section>

      {/* Dividir Line */}
      <div className="px-6 my-6">
        <div className="w-16 h-1.5 bg-brand-light rounded-full"></div>
      </div>

      {/* About Section */}
      <section className="px-6">
        <h3 className="font-heading text-brand text-2xl tracking-wide mb-4 uppercase">
          O que é o Green Garden?
        </h3>
        
        <div className="text-sm text-gray-700 leading-relaxed font-sans space-y-4">
          <p>
            <strong>Green Garden</strong> é um projeto dedicado à valorização e{' '}
            <strong>catalogação da flora presente na Universidade de Fortaleza</strong>. Desenvolvida
            com o objetivo de transformar o espaço verde em <strong>fonte ativa de conhecimento</strong>,
            a iniciativa integra tecnologia e sustentabilidade para aproximar a comunidade
            acadêmica do patrimônio natural que a cerca.
          </p>

          <p>
            A plataforma reúne informações detalhadas sobre as espécies vegetais do campus,
            incluindo nome científico, origem, características e importância ecológica. Com o
            uso de <strong>QR Codes</strong> instalados próximos às plantas, estudantes, professores e visitantes
            podem acessar rapidamente o conteúdo digital e <strong>aprofundar seu conhecimento
            de forma prática e acessível</strong>.
          </p>

          <p>
            Mais do que um catálogo, o projeto promove <strong>educação ambiental, incentivo à
            preservação e conscientização sobre biodiversidade</strong>, fortalecendo a
            responsabilidade socioambiental da universidade e transformando o campus em um
            verdadeiro laboratório vivo a céu aberto.
          </p>
        </div>
      </section>
    </main>
  );
}
