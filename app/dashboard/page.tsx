// app/dashboard/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Eye, Clock, BarChart3, Leaf, ChevronLeft, User } from "lucide-react";
import Link from "next/navigation"; // Ajustado para navegação interna
import { Button } from "@/components/ui/button";
import SideMenu from "@/components/SideMenu";

interface PlantaMetricas {
  id: number;
  nome: string;
  totalVisualizacoes: number;
  tempoMedioLeituraMinutos: number;
}

export default function DashboardMétricas() {
  const [plantas, setPlantas] = useState<PlantaMetricas[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
  fetch("https://greencodeapi-production.up.railway.app/api/plantas")
    .then((res) => res.json())
    .then((data) => {
      console.log("DADOS VINDOS DA API:", data); // <-- ADICIONE ISSO AQUI
      setPlantas(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Erro ao buscar métricas:", err);
      setLoading(false);
    });
}, []);
  const maxVisualizacoes = plantas.length 
    ? Math.max(...plantas.map(p => p.totalVisualizacoes || 0), 1) 
    : 1;

  const totalGeralVisualizacoes = plantas.reduce((acc, p) => acc + (p.totalVisualizacoes || 0), 0);
  const tempoMedioGeral = plantas.length 
    ? (plantas.reduce((acc, p) => acc + (p.tempoMedioLeituraMinutos || 0), 0) / plantas.length).toFixed(1)
    : "0";

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand/20 border-t-brand rounded-full animate-spin" />
          <span className="text-xs text-muted-foreground tracking-widest font-heading">CARREGANDO DADOS...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-background pb-12 font-sans relative">
      {/* Componente do Menu Lateral */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Background Decorativo idêntico ao padrão */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      {/* 👑 HEADER PADRONIZADO (IGUAL ÀS OUTRAS TELAS) */}
      <header className="bg-background/80 backdrop-blur-md px-6 py-4 flex justify-between items-center text-foreground border-b border-border/40 z-10 relative">
        <a href="/catalago" className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-muted transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground/80" />
        </a>
        <div className="flex flex-col items-center">
          <span className="text-brand-light font-heading text-[10px] uppercase tracking-widest leading-none">GREEN Garden</span>
          <h1 className="font-heading text-base tracking-tight leading-tight flex items-center gap-1.5 mt-0.5 text-brand uppercase">
            <BarChart3 className="w-4 h-4 text-brand-light" />
            Métricas
          </h1>
        </div>
        <button 
          onClick={() => setIsMenuOpen(true)} 
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-muted transition-colors outline-none"
        >
          <User className="w-5 h-5 text-foreground/80" />
        </button>
      </header>

      {/* Corpo do Painel */}
      <div className="px-6 py-8 flex-1 z-10 max-w-[800px] w-full mx-auto space-y-6">
        
        {/* Grid de Cards Resumo */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Acessos */}
          <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 sm:p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Acessos Totais</p>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading mt-1 text-foreground">{totalGeralVisualizacoes}</h3>
            </div>
            <div className="p-2.5 sm:p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Eye size={20} className="sm:w-6 sm:h-6" />
            </div>
          </div>

          {/* Card 2: Tempo Médio */}
          <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 sm:p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tempo Médio</p>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading mt-1 text-foreground">{tempoMedioGeral} min</h3>
            </div>
            <div className="p-2.5 sm:p-3 bg-blue-500/10 rounded-xl text-blue-500 shrink-0">
              <Clock size={20} className="sm:w-6 sm:h-6" />
            </div>
          </div>

          {/* Card 3: Espécies */}
          <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 sm:p-6 shadow-sm flex items-center justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Espécies</p>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading mt-1 text-foreground">{plantas.length}</h3>
            </div>
            <div className="p-2.5 sm:p-3 bg-amber-500/10 rounded-xl text-amber-500 shrink-0">
              <Leaf size={20} className="sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>

        {/* Tabela de Detalhes de Desempenho */}
        <div className="flex flex-col gap-2 pt-2">
          <h2 className="font-heading text-xl tracking-tight text-brand uppercase">Desempenho por Planta</h2>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border/40 bg-muted/20 flex justify-between items-center flex-wrap gap-2">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Lista Gerenciada</span>
            <span className="text-[10px] text-brand/60 font-medium uppercase tracking-wider block sm:hidden animate-pulse">
              ← Arraste para o lado →
            </span>
          </div>

          {/* CONTAINER DE TOQUE E ARRASTE HORIZONTAL */}
          <div className="w-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing select-none scrollbar-thin touch-pan-x">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-border/40 bg-muted/10 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 sm:px-6 py-3 w-16">ID</th>
                  <th className="px-4 sm:px-6 py-3">Planta</th>
                  <th className="px-4 sm:px-6 py-3 w-56">Popularidade (Acessos)</th>
                  <th className="px-4 sm:px-6 py-3 text-center w-44">Tempo de Leitura</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-xs sm:text-sm text-foreground">
                {plantas.map((planta) => {
                  const porcentagemPopularidade = Math.min(((planta.totalVisualizacoes || 0) / maxVisualizacoes) * 100, 100);

                  return (
                    <tr key={planta.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 sm:px-6 py-4 font-mono text-[11px] text-muted-foreground">#{planta.id}</td>
                      <td className="px-4 sm:px-6 py-4 font-medium font-heading max-w-[180px] truncate">
                        {planta.nome || "Planta Sem Nome"}
                      </td>
                      
                      {/* Popularidade com Mini Gráfico */}
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-foreground/90 w-8 shrink-0">{planta.totalVisualizacoes || 0}</span>
                          <div className="w-full bg-border/40 rounded-full h-1.5 overflow-hidden hidden sm:block">
                            <div 
                              className="bg-brand h-1.5 rounded-full transition-all duration-500" 
                              style={{ width: `${porcentagemPopularidade}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-center">
                        <span className="inline-flex items-center rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-medium text-brand whitespace-nowrap">
                          {(planta.tempoMedioLeituraMinutos || 0).toFixed(1)} min
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}