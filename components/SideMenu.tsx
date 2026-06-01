"use client";

import { X, LogIn, LogOut, User, ShieldCheck, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAuth, logoutUser, AuthState } from "@/lib/auth";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: "INÍCIO", href: "/" },
  { name: "CATÁLOGO", href: "/catalago" },
  { name: "BLOCO T", href: "/bloco/bloco-t" },
];

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    matricula: null,
    role: null,
  });

  useEffect(() => {
    if (isOpen) {
      setAuthState(getAuth());
    }
  }, [isOpen]);

  const handleLogout = () => {
    logoutUser();
    setAuthState({ token: null, matricula: null, role: null });
    onClose();
    window.location.reload();
  };

  const getRoleBadgeStyle = (role: string | null) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-500 hover:bg-red-600 text-white border-none";
      case "PROFESSOR":
        return "bg-blue-500 hover:bg-blue-600 text-white border-none";
      case "PROFISSIONAL_DA_JARDINAGEM":
        return "bg-emerald-500 hover:bg-emerald-600 text-white border-none";
      case "ALUNO":
        return "bg-brand text-white border-none";
      default:
        return "bg-muted text-muted-foreground border-none";
    }
  };

  const formatRole = (role: string | null) => {
    if (!role) return "";
    return role.replace(/_/g, " ");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[300px] sm:w-[400px] border-l-brand/20 bg-background/95 backdrop-blur-md flex flex-col p-0 pt-12"
      >
        <div className="w-full flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center px-6 pb-6 scrollbar-thin">
          
          <SheetHeader className="mb-6 w-full shrink-0">
            <SheetTitle className="text-brand dark:text-brand-light font-heading text-2xl tracking-[0.2em] text-center">
              MENU
            </SheetTitle>
          </SheetHeader>

          {/* Seção de Perfil do Usuário */}
          <div className="w-full mb-8 shrink-0">
            {authState.token ? (
              <div className="bg-card/50 rounded-2xl p-4 border border-brand-light/10 shadow-sm flex flex-col items-center gap-3">
                {/* 🌟 Ajustado o ícone de usuário para se destacar no escuro */}
                <div className="w-12 h-12 rounded-full bg-brand/10 dark:bg-brand/20 border border-brand/20 flex items-center justify-center text-brand dark:text-brand-light">
                  <User className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Matrícula</p>
                  <p className="font-heading text-lg font-bold text-foreground -mt-0.5">{authState.matricula}</p>
                  {authState.role && (
                    <Badge className={`mt-1.5 text-[9px] px-2 py-0.5 tracking-wider uppercase ${getRoleBadgeStyle(authState.role)}`}>
                      {formatRole(authState.role)}
                    </Badge>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="w-full mt-2 text-destructive hover:bg-destructive/10 hover:text-destructive gap-2 text-xs"
                >
                  <LogOut className="w-4 h-4" />
                  SAIR
                </Button>
              </div>
            ) : (
              <Link href="/login" onClick={onClose} className="block w-full">
                <Button className="w-full py-6 rounded-2xl bg-brand hover:bg-brand-light text-white font-heading tracking-widest gap-2 shadow-md hover:shadow-lg transition-all duration-300">
                  <LogIn className="w-4 h-4" />
                  ENTRAR / LOGIN
                </Button>
              </Link>
            )}
          </div>

          {/* Links de Navegação */}
          <nav className="flex flex-col gap-6 items-center w-full my-4 shrink-0">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="text-brand dark:text-foreground font-heading text-xl tracking-[0.15em] hover:text-brand-light dark:hover:text-brand transition-all hover:scale-110 active:scale-95"
              >
                {item.name}
              </Link>
            ))}

            {/* Links exclusivos para Administradores */}
            {authState.role === "ADMIN" && (
              <>
                <div className="w-10 h-0.5 bg-border/40 my-1" />
                
                {/* 📊 DASHBOARD LINK */}
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="text-brand dark:text-foreground font-heading text-xl tracking-[0.15em] hover:text-brand-light dark:hover:text-brand transition-all hover:scale-110 active:scale-95 flex items-center gap-2 mt-1"
                >
                  {/* ✨ Alterado para text-emerald-500 para brilhar no claro/escuro */}
                  <BarChart3 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 animate-pulse" />
                  DASHBOARD
                </Link>

                {/* USUÁRIOS ADMIN */}
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="text-brand dark:text-foreground font-heading text-xl tracking-[0.15em] hover:text-brand-light dark:hover:text-brand transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
                >
                  {/* ✨ Adicionado dark:text-brand-light para garantir visibilidade */}
                  <ShieldCheck className="w-5 h-5 text-brand-light dark:text-brand" />
                  USUÁRIOS ADMIN
                </Link>

                {/* PLANTAS ADMIN */}
                <Link
                  href="/admin/plantas"
                  onClick={onClose}
                  className="text-brand dark:text-foreground font-heading text-xl tracking-[0.15em] hover:text-brand-light dark:hover:text-brand transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5 text-brand-light dark:text-brand" />
                  PLANTAS ADMIN
                </Link>
              </>
            )}
          </nav>

          <div className="flex-1 min-h-[40px]" />

          <div className="mb-6 shrink-0">
            <ModeToggle />
          </div>

          {/* Brand footer */}
          <div className="shrink-0 flex flex-col items-center opacity-30 pb-4">
            <span className="text-brand dark:text-foreground text-xs font-heading font-black tracking-tighter">GREEN</span>
            <span className="text-brand-light text-[10px] font-heading italic -mt-1 font-bold">Garden</span>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}