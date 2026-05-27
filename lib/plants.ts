import { isMockAuthToken } from "@/lib/auth";

const API_BASE_URL = "https://greencodeapi-production.up.railway.app";
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

async function parseApiError(response: Response, defaultMessage: string): Promise<string> {
  let errorMessage = defaultMessage;

  try {
    const text = (await response.text()).trim();
    if (text) {
      try {
        const parsed = JSON.parse(text);
        errorMessage = parsed.message || parsed.error || text;
      } catch {
        errorMessage = text.replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    // mantém mensagem padrão
  }

  if (response.status === 401) {
    return "Sessão expirada ou credenciais inválidas. Faça login novamente.";
  }
  if (response.status === 403) {
    return "Acesso negado. Use uma conta ADMIN cadastrada na API Greencode (o login de teste 9999 não grava no servidor).";
  }
  if (response.status === 413) {
    return "Imagem muito grande. O limite é 5 MB.";
  }
  if (response.status === 415) {
    return "Formato de imagem não suportado. Use JPG, PNG ou WebP.";
  }

  return errorMessage;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Não foi possível ler o arquivo de imagem."));
    reader.readAsDataURL(file);
  });
}

export interface PlantaResponseDTO {
  id: number;
  nomeComum: string;
  nomeCientifico: string;
  urlImagem?: string;
  caracteristicas?: string;
  cuidados?: string;
  latitude?: number;
  longitude?: number;
  tempoMedioLeituraMinutos?: number;
}

export interface PlantaRequestDTO {
  nomeComum: string;
  nomeCientifico: string;
  urlImagem?: string;
  caracteristicas?: string;
  cuidados?: string;
  latitude?: number;
  longitude?: number;
}

function createLocalPlant(plantData: PlantaRequestDTO, id?: number): PlantaResponseDTO {
  return {
    id: id ?? Math.floor(Math.random() * 100000) + 1000,
    ...plantData,
    tempoMedioLeituraMinutos: 0,
  };
}

/** Modo desenvolvimento: login 9999 / admin123 (sem chamadas à API). */
export function isLocalApiMode(token: string | null | undefined): boolean {
  return isMockAuthToken(token);
}

/**
 * Obtém todas as plantas cadastradas na API
 */
export async function getPlants(): Promise<PlantaResponseDTO[]> {
  const response = await fetch(`${API_BASE_URL}/api/plantas`, {
    method: "GET",
    headers: {
      "Accept": "*/*"
    },
    // Desabilita cache para carregar sempre dados novos do painel
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Erro ao listar plantas da API.");
  }

  return response.json();
}

/**
 * Cadastra uma nova planta na API (Apenas Admin)
 */
export async function createPlant(plantData: PlantaRequestDTO, token: string): Promise<PlantaResponseDTO> {
  if (isMockAuthToken(token)) {
    return createLocalPlant(plantData);
  }

  const response = await fetch(`${API_BASE_URL}/api/plantas`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(plantData),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response, "Erro ao cadastrar planta."));
  }

  return response.json();
}

/**
 * Atualiza os dados de uma planta existente na API (Apenas Admin)
 */
export async function updatePlant(id: number, plantData: PlantaRequestDTO, token: string): Promise<PlantaResponseDTO> {
  if (isMockAuthToken(token)) {
    return createLocalPlant(plantData, id);
  }

  const response = await fetch(`${API_BASE_URL}/api/plantas/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(plantData),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response, "Erro ao atualizar planta."));
  }

  return response.json();
}

/**
 * Deleta uma planta na API (Apenas Admin)
 */
export async function deletePlant(id: number, token: string): Promise<boolean> {
  if (isMockAuthToken(token)) {
    return true;
  }

  const response = await fetch(`${API_BASE_URL}/api/plantas/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response, "Erro ao excluir planta."));
  }

  return true;
}

/**
 * Realiza o upload de imagem de planta e retorna a URL pública (Apenas Admin)
 */
export async function uploadPlantImage(file: File, token: string): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Selecione um arquivo de imagem válido (JPG, PNG ou WebP).");
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Imagem muito grande. O limite é 5 MB.");
  }

  // Login de desenvolvimento (9999) — a API rejeita o token fictício com 403
  if (isMockAuthToken(token)) {
    return fileToDataUrl(file);
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/uploads/imagem`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response, "Erro ao fazer upload da imagem."));
  }

  // A API retorna a URL pública da imagem como String pura no corpo da resposta
  const imageUrl = (await response.text()).trim().replace(/^["']|["']$/g, "");
  if (!imageUrl) {
    throw new Error("A API não retornou a URL da imagem.");
  }

  return imageUrl;
}

/** @deprecated Use isLocalApiMode */
export function isLocalImageUpload(token: string): boolean {
  return isLocalApiMode(token);
}

const PLANTS_CACHE_KEY = "greencode_managed_plants_cache";

export function persistPlantsCache(plants: PlantaResponseDTO[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PLANTS_CACHE_KEY, JSON.stringify(plants));
}

export function loadPlantsCache(): PlantaResponseDTO[] | null {
  if (typeof window === "undefined") return null;
  const cached = localStorage.getItem(PLANTS_CACHE_KEY);
  if (!cached) return null;
  try {
    return JSON.parse(cached) as PlantaResponseDTO[];
  } catch {
    return null;
  }
}
