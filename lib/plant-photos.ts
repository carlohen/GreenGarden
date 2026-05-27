/**
 * Fotos do campus em public/fotos_plantas — associadas por id da planta em lib/data.ts
 */
export const PLANT_PHOTOS: Record<string, string> = {
  coqueiro: "/fotos_plantas/12_Coqueiro_Cocos_nucifera.png",
  "amendoeira-da-praia": "/fotos_plantas/09_Amendoeira_da_praia_Terminalia_catappa.png",
  "bromelia-porto-seguro": "/fotos_plantas/31_Bromelia_porto_seguro_Aechmea_blanchetiana.png",
  "dracena-vermelha": "/fotos_plantas/15_Dracena_vermelha_Cordyline_fruticosa.png",
  "filodendro-ondulado": "/fotos_plantas/20_Filodendro_ondulado_Philodendron_undulatum.png",
  "philodendron-imbe": "/fotos_plantas/22_Philodendro_cara_de_cabala_Philodendron_imbe.png",
  "palmeira-fenix": "/fotos_plantas/26_Palmeira_fenix_Phoenix_roebelenii.png",
  eucalipto: "/fotos_plantas/18_Eucalipto_Eucalyptus.png",
  angico: "/fotos_plantas/24_Angico_Anadenanthera_colubrina.png",
  "cassia-chuva-de-ouro": "/fotos_plantas/17_Cassia_chuva_de_ouro_Cassia_fistula.png",
  agave: "/fotos_plantas/13_Agave_Agave_americana.png",
  "palmeira-imperial": "/fotos_plantas/27_Palmeira_imperial_Roystonea_oleracea.png",
  wedelia: "/fotos_plantas/08_Wedelia_Sphagneticola_trilobata.png",
  alamanda: "/fotos_plantas/05_Alamanda_Allamanda_cathartica.png",
  "palmeira-havai": "/fotos_plantas/07_Palmeira_havai_Veitchia_merrillii.png",
  "grama-esmeralda": "/fotos_plantas/06_Grama_esmeralda_Zoysia_japonica.png",
  "grama-japonesa": "/fotos_plantas/06_Grama_esmeralda_Zoysia_japonica.png",
  pacavira: "/fotos_plantas/03_Pacavira_Heliconia_psittacorum.png",
  sombreiro: "/fotos_plantas/04_Sombreiro_Clitoria_fairchildiana.png",
  pinheiro: "/fotos_plantas/02_Pinheiro_Pinus_sp.png",
  jiboia: "/fotos_plantas/30_Jiboia_Epipremnum_aureum.png",
};

/** URLs externas quando ainda não há foto no campus em public/fotos_plantas */
export const PLANT_PHOTO_FALLBACKS: Record<string, string> = {
  casuarina: "https://www.fresnogardening.org/PlantMaster/Photos/1351a.jpg",
  cajueiro:
    "https://ars.els-cdn.com/content/image/3-s2.0-B9780128031384000125-f12-01-9780128031384.jpg",
};

export function getPlantPhotoUrl(plantId: string): string | undefined {
  return PLANT_PHOTOS[plantId] ?? PLANT_PHOTO_FALLBACKS[plantId];
}
