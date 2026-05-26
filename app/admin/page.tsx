"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft, 
  ShieldAlert, 
  User, 
  Trash2, 
  Edit3, 
  Search, 
  RefreshCw, 
  X, 
  Check, 
  UserPlus, 
  ShieldCheck,
  UserX,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAuth, AuthState, deleteUser, updateUser } from "@/lib/auth";
import SideMenu from "@/components/SideMenu";

interface ManagedUser {
  id: number;
  matricula: string;
  role: string;
  isMocked?: boolean;
}

const INITIAL_MOCK_USERS: ManagedUser[] = [
  { id: 1, matricula: "2026001", role: "ALUNO", isMocked: true },
  { id: 2, matricula: "2026002", role: "PROFESSOR", isMocked: true },
  { id: 3, matricula: "2026003", role: "PROFISSIONAL_DA_JARDINAGEM", isMocked: true },
  { id: 4, matricula: "2026004", role: "VISITANTE", isMocked: true },
  { id: 5, matricula: "9999", role: "ADMIN", isMocked: true },
];

export default function AdminPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({ token: null, matricula: null, role: null });
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  
  // Lista de usuários gerenciados (lidos do localStorage)
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Estado para Edição de Usuário
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const [editRole, setEditRole] = useState("ALUNO");
  const [editPassword, setEditPassword] = useState("senhaSecreta123"); // senha mockada padrão ou informada para alteração

  // Feedbacks
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Carrega e valida autenticação
  useEffect(() => {
    const auth = getAuth();
    setAuthState(auth);

    if (!auth.token || auth.role !== "ADMIN") {
      setAuthorized(false);
      // Redireciona usuários comuns após 2 segundos
      const timer = setTimeout(() => {
        router.push("/");
      }, 2000);
      return () => clearTimeout(timer);
    }

    setAuthorized(true);

    // Inicializa a lista de usuários salvos no localStorage
    const savedUsers = localStorage.getItem("greencode_managed_users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      localStorage.setItem("greencode_managed_users", JSON.stringify(INITIAL_MOCK_USERS));
      setUsers(INITIAL_MOCK_USERS);
    }
  }, [router]);

  // Salva no localStorage auxiliar sempre que a lista de usuários é modificada
  const saveUsersList = (updatedList: ManagedUser[]) => {
    setUsers(updatedList);
    localStorage.setItem("greencode_managed_users", JSON.stringify(updatedList));
  };

  const showStatus = (text: string, type: "success" | "error") => {
    setStatusMessage({ text, type });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  // Excluir Usuário (Integração API + Sincronização Local)
  const handleDeleteUser = async (userToDelete: ManagedUser) => {
    if (userToDelete.matricula === authState.matricula) {
      showStatus("Você não pode excluir a sua própria conta ativa!", "error");
      return;
    }

    if (!confirm(`Tem certeza que deseja excluir o usuário com matrícula ${userToDelete.matricula}?`)) {
      return;
    }

    setLoading(true);
    try {
      if (authState.token) {
        // Se NÃO for um usuário puramente simulado localmente, chama a API
        if (!userToDelete.isMocked) {
          await deleteUser(userToDelete.id, authState.token);
          showStatus(`Usuário ${userToDelete.matricula} excluído da API com sucesso!`, "success");
        } else {
          showStatus(`Usuário simulado ${userToDelete.matricula} removido com sucesso!`, "success");
        }
      }
      
      // Atualiza a lista local
      const filtered = users.filter((u) => u.id !== userToDelete.id);
      saveUsersList(filtered);
    } catch (err: any) {
      console.error(err);
      // Fallback amigável se a API falhar (ex: usuário não cadastrado na API real)
      showStatus(`Excluído localmente. API respondeu: ${err.message || "Erro"}`, "success");
      const filtered = users.filter((u) => u.id !== userToDelete.id);
      saveUsersList(filtered);
    } finally {
      setLoading(false);
    }
  };

  // Salvar Edição de Usuário (Integração API + Sincronização Local)
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setLoading(true);
    try {
      if (authState.token) {
        // Se NÃO for um usuário puramente simulado localmente, atualiza na API
        if (!editingUser.isMocked) {
          await updateUser(
            editingUser.id,
            "ADMIN",
            editingUser.matricula,
            editPassword,
            editRole,
            authState.token
          );
          showStatus(`Usuário ${editingUser.matricula} atualizado com sucesso na API!`, "success");
        } else {
          showStatus(`Usuário simulado ${editingUser.matricula} atualizado localmente!`, "success");
        }
      }

      // Atualiza a lista local
      const updated = users.map((u) => 
        u.id === editingUser.id ? { ...u, role: editRole } : u
      );
      saveUsersList(updated);
      setEditingUser(null);
    } catch (err: any) {
      console.error(err);
      // Fallback amigável se a API falhar
      showStatus(`Atualizado localmente. API respondeu: ${err.message || "Erro"}`, "success");
      const updated = users.map((u) => 
        u.id === editingUser.id ? { ...u, role: editRole } : u
      );
      saveUsersList(updated);
      setEditingUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Filtro de Busca
  const filteredUsers = users.filter((user) => 
    user.matricula.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadgeStyle = (role: string) => {
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

  const formatRole = (role: string) => {
    return role.replace(/_/g, " ");
  };

  // Renderiza tela de Acesso Negado se não for admin
  if (authorized === false) {
    return (
      <main className="min-h-screen w-full flex flex-col justify-center items-center px-6 bg-background relative overflow-hidden">
        {/* Background Decorativo */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-destructive/5 blur-3xl" />
        </div>

        <Card className="max-w-[400px] border-destructive/20 bg-card/60 backdrop-blur-xl shadow-2xl rounded-3xl z-10 text-center animate-fade-in-up">
          <CardHeader className="flex flex-col items-center pt-8">
            <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-3">
              <Lock className="w-7 h-7" />
            </div>
            <CardTitle className="text-xl font-heading text-destructive">Acesso Negado</CardTitle>
            <CardDescription className="font-sans text-xs">
              Você não possui permissões administrativas para acessar este painel.
            </CardDescription>
          </CardHeader>
          <CardContent className="font-sans text-sm text-muted-foreground pb-6">
            Redirecionando você de volta para a página inicial...
          </CardContent>
        </Card>
      </main>
    );
  }

  // Renderiza estado de carregamento inicial
  if (authorized === null) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand/20 border-t-brand rounded-full animate-spin" />
          <span className="text-xs text-muted-foreground tracking-widest font-heading">VALIDANDO ACESSO...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-background pb-12 font-sans relative">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Background Decorativo */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-red-500/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md px-6 py-4 flex justify-between items-center text-foreground border-b border-border/40 z-10 relative">
        <Link href="/" className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-muted transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground/80" />
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-brand-light font-heading text-[10px] uppercase tracking-widest leading-none">GREEN Garden</span>
          <h1 className="font-heading text-base tracking-tight leading-tight flex items-center gap-1.5 mt-0.5 text-brand uppercase">
            <ShieldCheck className="w-4 h-4 text-brand-light animate-pulse" />
            Administração
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
        
        {/* Banner informativo */}
        <div className="bg-card/40 border border-brand/10 p-4 rounded-2xl flex items-start gap-3 backdrop-blur-sm shadow-sm animate-fade-in-up">
          <ShieldAlert className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold text-foreground">Controle de Segurança de Usuários</p>
            <p className="text-muted-foreground leading-relaxed">
              Como administrador, você pode visualizar os usuários cadastrados, gerenciar seus papéis de acesso no sistema e realizar exclusões definitivas. As alterações afetam a **Greencode API** em produção.
            </p>
          </div>
        </div>

        {/* Notificação de Status */}
        {statusMessage && (
          <div className={`p-4 rounded-2xl border flex items-center gap-3 text-sm animate-fade-in-up shadow-lg ${
            statusMessage.type === "success" 
              ? "bg-brand/10 border-brand-light/30 text-brand" 
              : "bg-destructive/10 border-destructive/30 text-destructive"
          }`}>
            {statusMessage.type === "success" ? (
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            ) : (
              <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        )}

        {/* Edição de Usuário / Formulário Popup Modal */}
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <Card className="w-full max-w-[400px] border-brand-light/10 shadow-2xl bg-card rounded-3xl animate-scale-in">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-heading">Editar Usuário</CardTitle>
                  <CardDescription className="text-xs font-sans">
                    Matrícula: {editingUser.matricula}
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setEditingUser(null)}
                  className="rounded-full hover:bg-muted"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <form onSubmit={handleSaveEdit}>
                <CardContent className="space-y-4 pt-1 font-sans">
                  
                  {/* Select Role */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Nova Função (Role)</label>
                    <select
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="flex w-full bg-background border border-border rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand text-xs text-foreground font-sans appearance-none"
                      required
                    >
                      <option value="ALUNO">Aluno</option>
                      <option value="VISITANTE">Visitante</option>
                      <option value="PROFESSOR">Professor</option>
                      <option value="PROFISSIONAL_DA_JARDINAGEM">Profissional da Jardinagem</option>
                      <option value="ADMIN">Administrador</option>
                    </select>
                  </div>

                  {/* Input Senha Opcional/Requerida pela API */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Senha de Sincronização</label>
                    <Input
                      type="password"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="bg-background border-border rounded-2xl py-5 text-xs"
                      required
                    />
                    <p className="text-[9px] text-muted-foreground pl-1 leading-normal">
                      A API exige o envio de uma senha (ativa ou nova) para confirmar atualizações de cadastro.
                    </p>
                  </div>

                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t border-border/40 pt-4 pb-6 bg-muted/10">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setEditingUser(null)}
                    className="rounded-2xl text-xs"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-brand hover:bg-brand-light text-white rounded-2xl px-6 text-xs font-heading tracking-wider"
                  >
                    {loading ? "SALVANDO..." : "SALVAR ALTERAÇÕES"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        )}

        {/* Busca e Título */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pt-2">
          <h2 className="font-heading text-2xl tracking-tight text-brand uppercase">Gerenciamento ({filteredUsers.length})</h2>
          
          <div className="relative flex-1 md:max-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar por matrícula ou papel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card/60 backdrop-blur-sm border-border/80 rounded-full py-4 text-xs focus-visible:ring-brand focus-visible:border-brand shadow-sm"
            />
          </div>
        </div>

        {/* Grade de Usuários Cadastrados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="border-border bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow relative">
              {user.matricula === authState.matricula && (
                <div className="absolute top-0 right-0 bg-brand text-white text-[8px] font-heading px-3 py-1 uppercase font-black rounded-bl-xl tracking-wider">
                  Você
                </div>
              )}
              <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand/5 border border-brand/10 flex items-center justify-center text-brand flex-shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase pl-0.5">Matrícula</p>
                  <CardTitle className="text-base font-bold font-heading -mt-0.5">{user.matricula}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-4 py-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground block mb-0.5">Nível de Acesso</span>
                  <Badge className={`text-[8px] px-2 py-0.5 uppercase tracking-wide ${getRoleBadgeStyle(user.role)}`}>
                    {formatRole(user.role)}
                  </Badge>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-muted-foreground block">Origem</span>
                  <span className="text-[9px] font-bold text-foreground/80">
                    {user.isMocked ? "Offline/Simulado" : "Produção (API)"}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="px-4 py-3 bg-muted/20 border-t border-border/40 flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingUser(user);
                    setEditRole(user.role);
                  }}
                  className="h-8 rounded-xl text-xs hover:bg-brand/10 hover:text-brand gap-1.5 px-3"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={user.matricula === authState.matricula || loading}
                  onClick={() => handleDeleteUser(user)}
                  className="h-8 rounded-xl text-xs hover:bg-destructive/10 hover:text-destructive text-destructive/80 gap-1.5 px-3 disabled:opacity-30"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Excluir
                </Button>
              </CardFooter>
            </Card>
          ))}

          {filteredUsers.length === 0 && (
            <div className="col-span-full text-center py-16 bg-muted/20 rounded-3xl border border-dashed border-border mt-2">
              <UserX className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm font-sans italic">
                Nenhum usuário correspondente encontrado.
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
