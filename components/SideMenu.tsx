"use client";

import { X, LogIn, LogOut, User, ShieldCheck } from "lucide-react";
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

  // Atualiza o estado de autenticação sempre que o menu é aberto
  useEffect(() => {
    if (isOpen) {
      setAuthState(getAuth());
    }
  }, [isOpen]);

  const handleLogout = () => {
    logoutUser();
    setAuthState({ token: null, matricula: null, role: null });
    onClose();
    // Recarrega a página para atualizar todos os componentes com o novo estado deslogado
    window.location.reload();
  };

  // Função para retornar uma cor amigável para cada role
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
      <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-brand/20 bg-background/95 backdrop-blur-md flex flex-col items-center pt-16">
        <SheetHeader className="mb-6 w-full">
          <SheetTitle className="text-brand font-heading text-2xl tracking-[0.2em] text-center">
            MENU
          </SheetTitle>
        </SheetHeader>

        {/* Seção de Perfil do Usuário */}
        <div className="w-full px-4 mb-8">
          {authState.token ? (
            <div className="bg-card/50 rounded-2xl p-4 border border-brand-light/10 shadow-sm flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
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
        <nav className="flex flex-col gap-6 items-center w-full my-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="text-brand font-heading text-xl tracking-[0.15em] hover:text-brand-light transition-all hover:scale-110 active:scale-95"
            >
              {item.name}
            </Link>
          ))}

          {/* Links exclusivos para Administradores */}
          {authState.role === "ADMIN" && (
            <>
              <div className="w-10 h-0.5 bg-border/40 my-1" />
              <Link
                href="/admin"
                onClick={onClose}
                className="text-brand font-heading text-xl tracking-[0.15em] hover:text-brand-light transition-all hover:scale-110 active:scale-95 flex items-center gap-2 mt-1"
              >
                <ShieldCheck className="w-5 h-5 text-brand-light animate-pulse" />
                USUÁRIOS ADMIN
              </Link>
              <Link
                href="/admin/plantas"
                onClick={onClose}
                className="text-brand font-heading text-xl tracking-[0.15em] hover:text-brand-light transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
              >
                <ShieldCheck className="w-5 h-5 text-brand-light animate-pulse" />
                PLANTAS ADMIN
              </Link>
            </>
          )}
        </nav>

        <div className="flex-1" />

        <div className="mb-6">
          <ModeToggle />
        </div>

        {/* Brand footer inside sheet */}
        <div className="bottom-6 flex flex-col items-center opacity-30">
          <span className="text-brand text-xs font-heading font-black tracking-tighter">GREEN</span>
          <span className="text-brand-light text-[10px] font-heading italic -mt-1 font-bold">Garden</span>
        </div>
      </SheetContent>
    </Sheet>
  );
}

