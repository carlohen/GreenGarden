import type { Plant } from "@/lib/data";
import { plants } from "@/lib/data";
import { PLANT_PHOTOS } from "@/lib/plant-photos";
import type { PlantaRequestDTO } from "@/lib/plants";

/** Monta texto de cuidados para a API Greencode a partir do objeto care do catálogo. */
export function formatCareForApi(plant: Plant): string {
  if (!plant.care) return "";

  const { water, sun, difficulty, tips } = plant.care;
  const tipsText = tips.length > 0 ? ` Dicas: ${tips.join(" ")}` : "";

  return `Rega: ${water}. Exposição solar: ${sun}. Nível de manutenção: ${difficulty}.${tipsText}`;
}

/**
 * Converte uma planta do catálogo estático para o formato da Greencode API.
 * @param siteOrigin Ex.: https://seu-dominio.vercel.app — necessário para URLs em /fotos_plantas
 */
export function plantToApiDto(plant: Plant, siteOrigin = ""): PlantaRequestDTO {
  const localPath = PLANT_PHOTOS[plant.id];
  let urlImagem = plant.imageUrl;

  if (localPath && siteOrigin) {
    urlImagem = `${siteOrigin.replace(/\/$/, "")}${localPath}`;
  } else if (localPath) {
    urlImagem = localPath;
  }

  return {
    nomeComum: plant.name,
    nomeCientifico: plant.scientificName,
    urlImagem,
    caracteristicas: plant.characteristics,
    cuidados: formatCareForApi(plant),
    latitude: plant.lat,
    longitude: plant.lng,
  };
}

export function getAllPlantsForApi(siteOrigin = ""): PlantaRequestDTO[] {
  return plants.map((p) => plantToApiDto(p, siteOrigin));
}
