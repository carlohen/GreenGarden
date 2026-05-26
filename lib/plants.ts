const API_BASE_URL = "https://greencodeapi-production.up.railway.app";

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
  const response = await fetch(`${API_BASE_URL}/api/plantas`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "*/*"
    },
    body: JSON.stringify(plantData)
  });

  if (!response.ok) {
    let errorMessage = "Erro ao cadastrar planta.";
    try {
      const text = await response.text();
      if (text) errorMessage = text;
    } catch {}
    throw new Error(errorMessage);
  }

  return response.json();
}

/**
 * Atualiza os dados de uma planta existente na API (Apenas Admin)
 */
export async function updatePlant(id: number, plantData: PlantaRequestDTO, token: string): Promise<PlantaResponseDTO> {
  const response = await fetch(`${API_BASE_URL}/api/plantas/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "*/*"
    },
    body: JSON.stringify(plantData)
  });

  if (!response.ok) {
    let errorMessage = "Erro ao atualizar planta.";
    try {
      const text = await response.text();
      if (text) errorMessage = text;
    } catch {}
    throw new Error(errorMessage);
  }

  return response.json();
}

/**
 * Deleta uma planta na API (Apenas Admin)
 */
export async function deletePlant(id: number, token: string): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}/api/plantas/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "*/*"
    }
  });

  if (!response.ok) {
    let errorMessage = "Erro ao excluir planta.";
    try {
      const text = await response.text();
      if (text) errorMessage = text;
    } catch {}
    throw new Error(errorMessage);
  }

  return true;
}

/**
 * Realiza o upload de imagem de planta e retorna a URL pública (Apenas Admin)
 */
export async function uploadPlantImage(file: File, token: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/uploads/imagem`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "*/*"
    },
    body: formData
  });

  if (!response.ok) {
    let errorMessage = "Erro ao fazer upload da imagem.";
    try {
      const text = await response.text();
      if (text) errorMessage = text;
    } catch {}
    throw new Error(errorMessage);
  }

  // A API retorna a URL pública da imagem como String pura no corpo da resposta
  const imageUrl = await response.text();
  return imageUrl;
}
