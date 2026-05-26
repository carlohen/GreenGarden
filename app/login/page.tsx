"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, KeyRound, User, Leaf, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { loginUser, saveAuth, getAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Redireciona se o usuário já estiver logado
  useEffect(() => {
    const auth = getAuth();
    if (auth.token) {
      router.push("/");
    }
  }, [router]);

  const handleMatriculaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permite apenas números no campo de matrícula
    const value = e.target.value.replace(/\D/g, "");
    setMatricula(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matricula || !senha) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (senha.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Faz a requisição de login integrada à API
      const token = await loginUser(matricula, senha);
      
      // Decodifica e salva as credenciais no localStorage
      saveAuth(token, matricula);
      
      setSuccess(true);
      
      // Pequeno delay para efeito visual premium de sucesso antes do redirecionamento
      setTimeout(() => {
        router.push("/");
        // Aguarda a navegação e atualiza a janela para recarregar o estado
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Não foi possível realizar o login. Verifique seus dados.");
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 overflow-hidden bg-background">
      {/* Background Decorativo com Efeitos de Gradientes Modernos */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-brand-light/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand/5 blur-3xl opacity-60" />
      </div>

      {/* Botão de Voltar para Home */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-foreground/80 hover:text-brand hover:bg-brand/5 border border-border/50 backdrop-blur-sm gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar ao Início
          </Button>
        </Link>
      </div>

      {/* Container Principal do Formulário */}
      <div className="w-full max-w-[420px] z-10 animate-fade-in-up">
        {/* Logo / Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-3 shadow-sm">
            <Leaf className="w-7 h-7 animate-bounce-slow" style={{ animationDuration: '3s' }} />
          </div>
          <h1 className="text-foreground font-heading text-4xl tracking-tighter leading-none">
            GREEN <span className="text-brand-light italic font-heading">Garden</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-sans font-medium">Universidade de Fortaleza</p>
        </div>

        {/* Card de Login Premium com Glassmorphism */}
        <Card className="border-border/60 bg-card/60 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand to-brand-light" />
          
          <CardHeader className="space-y-1.5 pt-8 pb-4">
            <CardTitle className="text-2xl font-heading tracking-tight text-foreground text-center">Acessar Conta</CardTitle>
            <CardDescription className="text-center font-sans text-xs text-muted-foreground">
              Insira suas credenciais acadêmicas ou de visitante
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pb-6 font-sans">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Alert de Sucesso */}
              {success && (
                <div className="flex items-center gap-3 bg-brand/10 border border-brand-light/20 text-brand rounded-2xl p-3.5 text-sm animate-fade-in-up">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-brand-light" />
                  <span className="font-medium">Login efetuado com sucesso! Redirecionando...</span>
                </div>
              )}

              {/* Alert de Erro */}
              {error && !success && (
                <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl p-3.5 text-sm animate-fade-in-up">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{error}</span>
                </div>
              )}

              {/* Input Matrícula */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground/80 uppercase tracking-wider pl-1">Matrícula</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <Input
                    type="text"
                    maxLength={10}
                    value={matricula}
                    onChange={handleMatriculaChange}
                    placeholder="Digite apenas números"
                    disabled={loading || success}
                    className="pl-11 bg-background/50 py-5 border-border/70 rounded-2xl focus-visible:ring-brand focus-visible:border-brand transition-all text-sm"
                    required
                  />
                </div>
              </div>

              {/* Input Senha */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Senha</label>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand transition-colors">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <Input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha (mín. 8 caracteres)"
                    disabled={loading || success}
                    className="pl-11 bg-background/50 py-5 border-border/70 rounded-2xl focus-visible:ring-brand focus-visible:border-brand transition-all text-sm"
                    required
                  />
                </div>
              </div>

              {/* Botão de Envio com Efeito Premium */}
              <Button
                type="submit"
                disabled={loading || success}
                className="w-full mt-2 py-6 rounded-2xl bg-brand hover:bg-brand-light text-white font-heading text-lg tracking-widest gap-2 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 relative overflow-hidden"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>CARREGANDO...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>ENTRAR</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="pt-4 pb-6 border-t border-border/40 bg-muted/20 flex flex-col items-center gap-3">
            <p className="text-xs text-muted-foreground text-center">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-brand hover:text-brand-light font-bold transition-colors">
                Cadastre-se aqui
              </Link>
            </p>
            <span className="text-[10px] text-muted-foreground text-center opacity-60">
              Greencode API v1.0.0 — Ambiente Seguro
            </span>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
