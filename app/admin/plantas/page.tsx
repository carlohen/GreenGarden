"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft, 
  ShieldCheck, 
  User, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Upload, 
  X, 
  Check, 
  AlertCircle, 
  Leaf, 
  MapPin, 
  Info,
  Lock,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAuth, AuthState } from "@/lib/auth";
import { 
  getPlants, 
  createPlant, 
  updatePlant, 
  deletePlant, 
  uploadPlantImage,
  isLocalApiMode,
  persistPlantsCache,
  loadPlantsCache,
  PlantaResponseDTO,
} from "@/lib/plants";
import SideMenu from "@/components/SideMenu";
import Image from "next/image";

export default function AdminPlantasPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({ token: null, matricula: null, role: null });
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  // Lista de plantas carregadas
  const [plants, setPlants] = useState<PlantaResponseDTO[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(true);

  // Estados para Criação/Edição de Planta
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<PlantaResponseDTO | null>(null);

  // Form Fields
  const [nomeComum, setNomeComum] = useState("");
  const [nomeCientifico, setNomeCientifico] = useState("");
  const [urlImagem, setUrlImagem] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [cuidados, setCuidados] = useState("");
  const [latitude, setLatitude] = useState<number>(-3.7683);
  const [longitude, setLongitude] = useState<number>(-38.4800);

  // Imagem Uploading State
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Feedbacks
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [importing, setImporting] = useState(false);

  // Validação de acesso e carregamento inicial das plantas
  useEffect(() => {
    const auth = getAuth();
    setAuthState(auth);

    if (!auth.token || auth.role !== "ADMIN") {
      setAuthorized(false);
      const timer = setTimeout(() => {
        router.push("/");
      }, 2000);
      return () => clearTimeout(timer);
    }

    setAuthorized(true);
    fetchPlantsData();
  }, [router]);

  // Busca as plantas da API
  const fetchPlantsData = async () => {
    setApiLoading(true);
    const auth = getAuth();
    const cached = loadPlantsCache();

    if (isLocalApiMode(auth.token)) {
      setPlants(cached ?? []);
      setApiLoading(false);
      return;
    }

    try {
      const data = await getPlants();
      setPlants(data.length > 0 ? data : (cached ?? []));
      if (data.length > 0) {
        persistPlantsCache(data);
      }
    } catch (err: any) {
      console.error("Erro ao carregar plantas da API, usando cache local se disponível:", err);
      if (cached) {
        setPlants(cached);
      }
    } finally {
      setApiLoading(false);
    }
  };

  const showStatus = (text: string, type: "success" | "error") => {
    setStatusMessage({ text, type });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4500);
  };

  // Upload do arquivo de imagem selecionado direto na API
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setUploadingImage(true);
    
    try {
      if (authState.token) {
        const uploadedUrl = await uploadPlantImage(file, authState.token);
        setUrlImagem(uploadedUrl);
        if (isLocalApiMode(authState.token)) {
          showStatus(
            "Imagem carregada localmente (login de teste 9999). Cadastre-se na API para enviar ao servidor.",
            "success"
          );
        } else {
          showStatus("Upload de imagem concluído com sucesso!", "success");
        }
      }
    } catch (err: any) {
      console.error(err);
      showStatus(`Falha no upload da imagem: ${err.message || "Erro"}`, "error");
    } finally {
      setUploadingImage(false);
    }
  };

  // Abre formulário para criação (Nova Planta)
  const handleOpenCreateForm = () => {
    setSelectedPlant(null);
    setNomeComum("");
    setNomeCientifico("");
    setUrlImagem("");
    setCaracteristicas("");
    setCuidados("");
    setLatitude(-3.7683);
    setLongitude(-38.4800);
    setImageFile(null);
    setIsFormOpen(true);
  };

  // Abre formulário para edição
  const handleOpenEditForm = (plant: PlantaResponseDTO) => {
    setSelectedPlant(plant);
    setNomeComum(plant.nomeComum);
    setNomeCientifico(plant.nomeCientifico);
    setUrlImagem(plant.urlImagem || "");
    setCaracteristicas(plant.caracteristicas || "");
    setCuidados(plant.cuidados || "");
    setLatitude(plant.latitude || -3.7683);
    setLongitude(plant.longitude || -38.4800);
    setImageFile(null);
    setIsFormOpen(true);
  };

  // Salvar Planta (Criar ou Atualizar)
  const handleSavePlant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeComum || !nomeCientifico) {
      showStatus("Nome Comum e Nome Científico são obrigatórios.", "error");
      return;
    }

    setLoading(true);

    const plantPayload = {
      nomeComum,
      nomeCientifico,
      urlImagem: urlImagem || "https://greencodeapi-production.up.railway.app/uploads/placeholder.png",
      caracteristicas,
      cuidados,
      latitude,
      longitude
    };

    try {
      if (!authState.token) {
        showStatus("Faça login para salvar plantas.", "error");
        return;
      }

      let savedPlant: PlantaResponseDTO;

      if (selectedPlant) {
        savedPlant = await updatePlant(selectedPlant.id, plantPayload, authState.token);
      } else {
        savedPlant = await createPlant(plantPayload, authState.token);
      }

      const updatedList = selectedPlant
        ? plants.map((p) => (p.id === selectedPlant.id ? savedPlant : p))
        : [savedPlant, ...plants];

      if (isLocalApiMode(authState.token)) {
        setPlants(updatedList);
        persistPlantsCache(updatedList);
        showStatus(
          `Planta "${savedPlant.nomeComum}" salva localmente (modo desenvolvimento 9999).`,
          "success"
        );
      } else {
        showStatus(
          selectedPlant
            ? `Planta "${savedPlant.nomeComum}" atualizada com sucesso!`
            : `Planta "${savedPlant.nomeComum}" cadastrada com sucesso!`,
          "success"
        );
        await fetchPlantsData();
      }

      setIsFormOpen(false);
    } catch (err: any) {
      console.error(err);
      showStatus(err.message || "Erro ao salvar planta.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Excluir Planta
  const handleDeletePlant = async (plant: PlantaResponseDTO) => {
    if (!confirm(`Deseja excluir permanentemente a planta "${plant.nomeComum}"?`)) {
      return;
    }

    setLoading(true);
    try {
      if (!authState.token) {
        showStatus("Faça login para excluir plantas.", "error");
        return;
      }

      await deletePlant(plant.id, authState.token);

      const filtered = plants.filter((p) => p.id !== plant.id);

      if (isLocalApiMode(authState.token)) {
        setPlants(filtered);
        persistPlantsCache(filtered);
        showStatus(`Planta "${plant.nomeComum}" removida localmente.`, "success");
      } else {
        showStatus(`Planta "${plant.nomeComum}" excluída com sucesso!`, "success");
        await fetchPlantsData();
      }
    } catch (err: any) {
      console.error(err);
      showStatus(err.message || "Erro ao excluir planta.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Importar plantas estáticas do catálogo para a API
  const handleImportStaticPlants = async () => {
    if (!authState.token) {
      showStatus("Faça login para importar plantas.", "error");
      return;
    }

    if (!confirm("Deseja importar todas as plantas estáticas do catálogo (lib/data.ts) para o banco de dados?")) {
      return;
    }

    setImporting(true);
    showStatus("Iniciando importação das plantas...", "success");

    try {
      const { getAllPlantsForApi } = await import("@/lib/catalog-api");
      const staticDtos = getAllPlantsForApi(window.location.origin);
      
      let importedCount = 0;
      let skippedCount = 0;

      for (const dto of staticDtos) {
        // Evita duplicar se o nome científico for igual
        const exists = plants.some(
          (p) => p.nomeCientifico.toLowerCase() === dto.nomeCientifico.toLowerCase()
        );

        if (exists) {
          skippedCount++;
          continue;
        }

        await createPlant(dto, authState.token);
        importedCount++;
      }

      showStatus(
        `Importação concluída! ${importedCount} novas plantas importadas, ${skippedCount} já existiam no banco.`,
        "success"
      );
      await fetchPlantsData();
    } catch (err: any) {
      console.error(err);
      showStatus(`Erro ao importar plantas: ${err.message || err}`, "error");
    } finally {
      setImporting(false);
    }
  };

  // Filtro de Busca
  const filteredPlants = plants.filter((plant) => 
    plant.nomeComum.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.nomeCientifico.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Renderiza tela de Acesso Negado se não for admin
  if (authorized === false) {
    return (
      <main className="min-h-screen w-full flex flex-col justify-center items-center px-6 bg-background relative overflow-hidden">
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

  // Renderiza estado de carregamento inicial do acesso
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
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-light/5 blur-3xl" />
      </div>

      {/* Header Glassmorphism */}
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
        
        {/* Seletor Segmentado de Seções (Usuários vs Plantas) */}
        <div className="flex bg-muted/60 p-1.5 rounded-2xl w-full max-w-[320px] mx-auto border border-border/30 backdrop-blur-sm shadow-inner">
          <Link href="/admin" className="flex-1">
            <button className="w-full py-2.5 rounded-xl font-heading text-[10px] uppercase tracking-widest transition-all text-muted-foreground hover:text-foreground">
              Usuários
            </button>
          </Link>
          <button className="flex-1 py-2.5 rounded-xl font-heading text-[10px] uppercase tracking-widest bg-white dark:bg-card text-brand font-bold shadow-sm border border-border/10">
            Plantas
          </button>
        </div>

        {/* Notificação de Status */}
        {statusMessage && (
          <div className={`p-4 rounded-2xl border flex items-center gap-3 text-sm animate-fade-in-up shadow-lg ${
            statusMessage.type === "success" 
              ? "bg-brand/10 border-brand-light/30 text-brand" 
              : "bg-destructive/10 border-destructive/30 text-destructive"
          }`}>
            <Info className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        )}

        {/* Modal de Formulário (Nova / Editar Planta) */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
            <Card className="w-full max-w-[500px] my-8 border-brand-light/10 shadow-2xl bg-card rounded-3xl overflow-hidden max-h-[90vh] flex flex-col animate-scale-in">
              <CardHeader className="pb-3 border-b border-border/35 flex-shrink-0 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-heading">
                    {selectedPlant ? "Editar Planta" : "Nova Planta"}
                  </CardTitle>
                  <CardDescription className="text-xs font-sans">
                    Insira os dados científicos e cuidados ecológicos
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-full hover:bg-muted"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              
              <form onSubmit={handleSavePlant} className="overflow-y-auto flex-1 flex flex-col">
                <CardContent className="space-y-4 pt-4 pb-6 font-sans">
                  
                  {/* Grid Nome Comum e Nome Científico */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Nome Comum</label>
                      <Input
                        type="text"
                        placeholder="Ex: Ipê Amarelo"
                        value={nomeComum}
                        onChange={(e) => setNomeComum(e.target.value)}
                        className="bg-background border-border rounded-2xl py-5 text-xs focus-visible:ring-brand focus-visible:border-brand"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Nome Científico</label>
                      <Input
                        type="text"
                        placeholder="Ex: Tabebuia aurea"
                        value={nomeCientifico}
                        onChange={(e) => setNomeCientifico(e.target.value)}
                        className="bg-background border-border rounded-2xl py-5 text-xs focus-visible:ring-brand focus-visible:border-brand italic"
                        required
                      />
                    </div>
                  </div>

                  {/* Upload de Imagem Premium */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Imagem da Planta</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 relative group">
                        <Input
                          type="text"
                          placeholder="URL da Imagem da Planta"
                          value={urlImagem}
                          onChange={(e) => setUrlImagem(e.target.value)}
                          className="bg-background border-border rounded-2xl py-5 text-xs"
                        />
                      </div>
                      
                      {/* Botão de Upload Customizado */}
                      <label className="flex-shrink-0 flex items-center justify-center gap-2 border border-brand/20 bg-brand/5 hover:bg-brand/10 text-brand rounded-2xl px-4 py-3 cursor-pointer text-xs font-bold transition-all shadow-sm">
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Carregando...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Enviar Foto
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                    </div>
                    
                    {/* Preview da Imagem */}
                    {urlImagem && (
                      <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-border/50 bg-muted/20 flex items-center justify-center">
                        <img 
                          src={urlImagem} 
                          alt="Plant preview" 
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://images.unsplash.com/photo-1520412099521-622d23ee5b3e?w=500&auto=format&fit=crop";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Características */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Características Físicas</label>
                    <textarea
                      placeholder="Descreva as principais características físicas da planta..."
                      value={caracteristicas}
                      onChange={(e) => setCaracteristicas(e.target.value)}
                      rows={3}
                      className="flex w-full bg-background border border-border rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand text-xs text-foreground font-sans resize-none"
                    />
                  </div>

                  {/* Cuidados */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Cuidados & Cultivo</label>
                    <textarea
                      placeholder="Ex: Regar moderadamente 2 vezes por semana, cultivar sob sol pleno..."
                      value={cuidados}
                      onChange={(e) => setCuidados(e.target.value)}
                      rows={3}
                      className="flex w-full bg-background border border-border rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand text-xs text-foreground font-sans resize-none"
                    />
                  </div>

                  {/* Coordenadas GPS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand" />
                        Latitude
                      </label>
                      <Input
                        type="number"
                        step="any"
                        value={latitude}
                        onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
                        className="bg-background border-border rounded-2xl py-5 text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand" />
                        Longitude
                      </label>
                      <Input
                        type="number"
                        step="any"
                        value={longitude}
                        onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)}
                        className="bg-background border-border rounded-2xl py-5 text-xs"
                      />
                    </div>
                  </div>

                </CardContent>
                <CardFooter className="flex-shrink-0 flex justify-end gap-2 border-t border-border/40 pt-4 pb-6 bg-muted/10">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setIsFormOpen(false)}
                    className="rounded-2xl text-xs"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading || uploadingImage}
                    className="bg-brand hover:bg-brand-light text-white rounded-2xl px-6 text-xs font-heading tracking-wider gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        SALVANDO...
                      </>
                    ) : (
                      "SALVAR PLANTA"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        )}

        {/* Título e Botão de Ação */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pt-2">
          <div>
            <h2 className="font-heading text-2xl tracking-tight text-brand uppercase">Plantas ({filteredPlants.length})</h2>
            <p className="text-[10px] text-muted-foreground font-sans">Cadastre espécies e mapeie suas coordenadas GPS no campus</p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleOpenCreateForm}
              className="bg-brand hover:bg-brand-light text-white rounded-2xl text-xs font-heading tracking-wider px-5 py-5 gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              NOVA PLANTA
            </Button>
          </div>
        </div>

        {/* Campo de Pesquisa */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar plantas pelo nome comum ou científico..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 bg-card/60 backdrop-blur-sm border-border/80 rounded-2xl py-6 text-xs focus-visible:ring-brand focus-visible:border-brand shadow-sm"
          />
        </div>

        {/* Indicador de Carregamento da API */}
        {apiLoading ? (
          <div className="py-20 flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-brand" />
            <span className="text-xs font-sans italic">Carregando plantas do sistema...</span>
          </div>
        ) : (
          /* Grade de Cards de Plantas */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPlants.map((plant) => (
              <Card key={plant.id} className="border-border bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-md transition-all relative flex flex-col">
                
                {/* Imagem de Topo */}
                <div className="relative w-full h-36 bg-muted/20 border-b border-border/30 overflow-hidden flex items-center justify-center">
                  <img 
                    src={plant.urlImagem || "https://greencodeapi-production.up.railway.app/uploads/placeholder.png"} 
                    alt={plant.nomeComum} 
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://images.unsplash.com/photo-1520412099521-622d23ee5b3e?w=500&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="text-[8px] bg-background/80 backdrop-blur-sm border-none shadow-sm px-2 py-0.5">
                      ID: {plant.id}
                    </Badge>
                  </div>
                </div>

                {/* Info Text */}
                <CardHeader className="p-4 pb-2 flex-1">
                  <div className="space-y-0.5">
                    <CardTitle className="text-lg font-bold font-heading text-foreground">{plant.nomeComum}</CardTitle>
                    <CardDescription className="text-xs font-sans italic text-brand-light leading-none">
                      {plant.nomeCientifico}
                    </CardDescription>
                  </div>
                  
                  {plant.caracteristicas && (
                    <p className="text-xs text-muted-foreground font-sans line-clamp-2 mt-3 leading-relaxed">
                      {plant.caracteristicas}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="px-4 py-2 flex flex-col gap-1.5 border-t border-border/20 bg-muted/5">
                  <div className="flex justify-between text-[10px] text-muted-foreground font-sans">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand" />
                      Lat: {plant.latitude ? plant.latitude.toFixed(5) : "Sem Lat"}
                    </span>
                    <span>
                      Lng: {plant.longitude ? plant.longitude.toFixed(5) : "Sem Lng"}
                    </span>
                  </div>
                </CardContent>

                {/* Footer Buttons */}
                <CardFooter className="px-4 py-3 bg-muted/20 border-t border-border/40 flex justify-end gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenEditForm(plant)}
                    className="h-8 rounded-xl text-xs hover:bg-brand/10 hover:text-brand gap-1.5 px-3"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={loading}
                    onClick={() => handleDeletePlant(plant)}
                    className="h-8 rounded-xl text-xs hover:bg-destructive/10 hover:text-destructive text-destructive/80 gap-1.5 px-3"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Excluir
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {filteredPlants.length === 0 && (
              <div className="col-span-full text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border mt-2">
                <Leaf className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2 animate-bounce-slow" />
                <p className="text-muted-foreground text-sm font-sans italic">
                  Nenhuma planta correspondente encontrada no catálogo.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
