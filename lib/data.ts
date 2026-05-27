import { PLANT_PHOTOS, PLANT_PHOTO_FALLBACKS } from "@/lib/plant-photos";

export const TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function plantImage(id: string): string {
  return PLANT_PHOTOS[id] ?? PLANT_PHOTO_FALLBACKS[id] ?? TRANSPARENT_PIXEL;
}

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  family: string;
  origin: string;
  biome: string;
  thumbnailUrl: string;
  imageUrl: string;
  characteristics: string;
  ecologicalImportance: string[];
  curbsideNotes: string[];
  blocks: string[];
  lat?: number;
  lng?: number;
  // Care information
  care?: {
    water: "baixa" | "moderada" | "alta";
    sun: "pleno" | "meia-sombra" | "sombra";
    difficulty: "iniciante" | "intermediário" | "avançado";
    tips: string[];
  };
}

export interface Block {
  id: string;
  name: string;
  // Percentage focus for the map image
  focusX: number;
  focusY: number;
  lat: number;
  lng: number;
}

export const blocks: Block[] = [
  { id: "bloco-t", name: "BLOCO T", focusX: 73, focusY: 82, lat: -3.7683, lng: -38.4800 },
];

export const plants: Plant[] = [
  {
    id: "coqueiro",
    name: "Coqueiro",
    scientificName: "Cocos nucifera",
    family: "Arecaceae",
    origin: "Sudeste Asiático",
    biome: "Litorâneo",
    thumbnailUrl: plantImage("coqueiro"),
    imageUrl: plantImage("coqueiro"),
    characteristics: "Palmeira de tronco único, que pode atingir até 30 metros de altura. Possui folhas pinadas e frutos de casca fibrosa contendo água e polpa comestível.",
    ecologicalImportance: ["Fonte de alimento para diversas espécies.", "Ajuda a estabilizar o solo em áreas costeiras."],
    curbsideNotes: ["O coco leva de 6 a 12 meses para amadurecer.", "A água de coco é rica em eletrólitos."],
    blocks: ["bloco-t"],
    lat: -3.76884,
    lng: -38.48014,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "intermediário",
      tips: ["Regue regularmente durante a fase de crescimento.", "Mantenha o solo bem drenado.", "Limpe as folhas para evitar pragas."]
    }
  },
  {
    id: "casuarina",
    name: "Casuarina",
    scientificName: "Casuarina equisetifolia",
    family: "Casuarinaceae",
    origin: "Austrália e Sudeste Asiático",
    biome: "Litorâneo",
    thumbnailUrl: plantImage("casuarina"),
    imageUrl: plantImage("casuarina"),
    characteristics: "Árvore de grande porte que assemelha-se a um pinheiro, mas é uma angiosperma. Suas folhas são reduzidas a escamas minúsculas.",
    ecologicalImportance: ["Fixadora de nitrogênio no solo.", "Excelente quebra-vento em áreas litorâneas."],
    curbsideNotes: ["Podem sobreviver em solos muito salinos.", "A madeira é extremamente dura e pesada."],
    blocks: ["bloco-t"],
    lat: -3.7685,
    lng: -38.4802,
    care: {
      water: "baixa",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Extremamente resistente à seca.", "Tolera solos salinos.", "Não requer podas frequentes."]
    }
  },
  {
    id: "amendoeira-da-praia",
    name: "Amendoeira-da-praia",
    scientificName: "Terminalia catappa",
    family: "Combretaceae",
    origin: "Ásia Tropical",
    biome: "Litorâneo",
    thumbnailUrl: plantImage("amendoeira-da-praia"),
    imageUrl: plantImage("amendoeira-da-praia"),
    characteristics: "Árvore de copa larga e horizontalizada, com folhas grandes que ficam avermelhadas antes de cair.",
    ecologicalImportance: ["Oferece ampla sombra.", "Os frutos são dispersos pela água."],
    curbsideNotes: ["As amêndoas do fruto são comestíveis.", "É muito utilizada em arborização urbana costeira."],
    blocks: ["bloco-t"],
    lat: -3.7681,
    lng: -38.4805,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Gosta de solos profundos.", "As folhas caem no inverno, o que é natural.", "Fornece excelente sombra."]
    }
  },
  {
    id: "cajueiro",
    name: "Cajueiro",
    scientificName: "Anacardium occidentale",
    family: "Anacardiaceae",
    origin: "Nativo do Brasil",
    biome: "Caatinga e Cerrado",
    thumbnailUrl: plantImage("cajueiro"),
    imageUrl: plantImage("cajueiro"),
    characteristics: "Árvore de tronco tortuoso com madeira leve. O verdadeiro fruto é a castanha, enquanto o caju é um pseudofruto.",
    ecologicalImportance: ["Importante para a fauna local como fonte de alimento.", "Espécie pioneira em áreas de dunas."],
    curbsideNotes: ["O Brasil é um dos maiores produtores de castanha de caju.", "A produção de suco de caju é muito forte no Nordeste."],
    blocks: ["bloco-t"],
    lat: -3.76875,
    lng: -38.48030,
    care: {
      water: "baixa",
      sun: "pleno",
      difficulty: "intermediário",
      tips: ["Evite solos encharcados.", "Pode ser podado para controlar o tamanho.", "Produz melhor com adubação orgânica."]
    }
  },
  {
    id: "bromelia-porto-seguro",
    name: "Bromélia Porto Seguro",
    scientificName: "Aechmea blanchetiana",
    family: "Bromeliaceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: plantImage("bromelia-porto-seguro"),
    imageUrl: plantImage("bromelia-porto-seguro"),
    characteristics: "Planta herbácea com folhas coriáceas dispostas em roseta, de cor amarelada a alaranjada sob sol pleno.",
    ecologicalImportance: ["Acumula água no centro, servindo de habitat para pequenos animais.", "Atrai beija-flores para polinização."],
    curbsideNotes: ["Muito resistente ao sol direto.", "A inflorescência pode durar meses."],
    blocks: ["bloco-t"],
    lat: -3.76875,
    lng: -38.48030,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Mantenha água no centro da roseta.", "Folhas ficam mais alaranjadas sob sol forte.", "Ideal para jardins de baixa manutenção."]
    }
  },
  {
    id: "coromandel",
    name: "Coromandel",
    scientificName: "Asystasia gangetica",
    family: "Acanthaceae",
    origin: "África e Ásia",
    biome: "Tropical",
    thumbnailUrl: plantImage("coqueiro"),
    imageUrl: plantImage("coqueiro"),
    characteristics: "Planta de crescimento rápido, com flores tubulares em tons de branco ou violeta. Pode ser usada como forração.",
    ecologicalImportance: ["Importante para borboletas.", "Atrai abelhas melíferas."],
    curbsideNotes: ["Considerada invasora em algumas regiões.", "Floresce quase o ano todo."],
    blocks: ["bloco-t"],
    lat: -3.76875,
    lng: -38.48030,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Cresce muito rápido.", "Pode ser podada drasticamente.", "Atrai muitas borboletas."]
    }
  },
  {
    id: "lacre-comum",
    name: "Lacre comum",
    scientificName: "Ixora chinensis",
    family: "Rubiaceae",
    origin: "China e Malásia",
    biome: "Tropical",
    thumbnailUrl: plantImage("bloco-t"),
    imageUrl: plantImage("bloco-t"),
    characteristics: "Arbusto perene com inflorescências densas de cor laranja a vermelha. Muito apreciada no paisagismo tropical.",
    ecologicalImportance: ["Fonte de néctar para beija-flores.", "Atrai diversos insetos úteis."],
    curbsideNotes: ["Gosta de sol pleno.", "As flores atraem borboletas."],
    blocks: ["bloco-t"],
    lat: -3.76874,
    lng: -38.48030,
    care: {
      water: "alta",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Mantenha o solo sempre úmido.", "Adora calor e umidade.", "Floresce quase o ano todo."]
    }
  },
  {
    id: "paineira",
    name: "Paineira",
    scientificName: "Ceiba speciosa",
    family: "Malvaceae",
    origin: "Brasil e Argentina",
    biome: "Mata Atlântica e Cerrado",
    thumbnailUrl: plantImage("paineira"),
    imageUrl: plantImage("paineira"),
    characteristics: "Árvore de grande porte com tronco munido de aculeos (espinhos), famoso pela produção de 'paina'.",
    ecologicalImportance: ["O algodão da paina ajuda na dispersão de sementes.", "Flores são visitadas por morcegos e pássaros."],
    curbsideNotes: ["O tronco armazena água.", "Suas flores rosas são muito ornamentais."],
    blocks: ["bloco-t"],
    lat: -3.76866,
    lng: -38.48026,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "intermediário",
      tips: ["O tronco armazena água, evite excessos.", "Precisa de muito espaço.", "Perde as folhas antes da floração."]
    }
  },
  {
    id: "ipe-peroba",
    name: "Ipê Peroba",
    scientificName: "Handroanthus roseo-albus",
    family: "Bignoniaceae",
    origin: "Nativo do Brasil",
    biome: "Mata Atlântica e Cerrado",
    thumbnailUrl: plantImage("ipe-peroba"),
    imageUrl: plantImage("ipe-peroba"),
    characteristics: "Árvore de madeira nobre com floração branca intensa que ocorre logo após o Ipê Amarelo.",
    ecologicalImportance: ["Fonte de pólen para abelhas silvestres.", "Ajuda na regeneração de matas."],
    curbsideNotes: ["Altamente valorizada na marcenaria.", "Possui crescimento moderado."],
    blocks: ["bloco-t"],
    lat: -3.76866,
    lng: -38.48026,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "intermediário",
      tips: ["Prefere solos profundos e férteis.", "Mantenha a base limpa de gramíneas invasoras.", "Crescimento é mais lento nos primeiros anos."]
    }
  },
  {
    id: "pau-brasil",
    name: "Pau-Brasil",
    scientificName: "Paubrasilia echinata",
    family: "Fabaceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: plantImage("pau-brasil"),
    imageUrl: plantImage("pau-brasil"),
    characteristics: "Árvore histórica que deu nome ao Brasil, conhecida pela resina avermelhada extraída de seu tronco cor de brasa.",
    ecologicalImportance: ["Árvore símbolo nacional.", "Importante para biodiversidade da Mata Atlântica."],
    curbsideNotes: ["Ameaçada de extinção.", "A madeira é usada hoje para arcos de violino de luxo."],
    blocks: ["bloco-t"],
    care: {
      water: "moderada",
      sun: "meia-sombra",
      difficulty: "avançado",
      tips: ["Sensível a mudanças bruscas de ambiente.", "Requer solo rico em matéria orgânica.", "Proteja de ventos fortes quando jovem."]
    }
  },
  {
    id: "munguba",
    name: "Munguba",
    scientificName: "Pachira aquatica",
    family: "Malvaceae",
    origin: "Américas Central e do Sul",
    biome: "Amazônia",
    thumbnailUrl: plantImage("munguba"),
    imageUrl: plantImage("munguba"),
    characteristics: "Também conhecida como castanha-do-maranhão, tem folhas digitadas e flores grandes de estames brancos.",
    ecologicalImportance: ["As sementes são comestíveis por peixes em áreas alagadas.", "Importante para fauna de beira de rio."],
    curbsideNotes: ["Muito decorativa como 'Money Tree'.", "As sementes torradas lembram o gosto de cacau."],
    blocks: ["bloco-t"],
    lat: -3.76866,
    lng: -38.48026,
    care: {
      water: "alta",
      sun: "meia-sombra",
      difficulty: "intermediário",
      tips: ["Mantenha o solo sempre úmido, mas não encharcado.", "Pode ser cultivada em vasos grandes.", "Suas sementes são comestíveis quando torradas."]
    }
  },
  {
    id: "dracena-vermelha",
    name: "Dracena vermelha",
    scientificName: "Cordyline fruticosa",
    family: "Asparagaceae",
    origin: "Sudeste Asiático e Oceania",
    biome: "Tropical",
    thumbnailUrl: plantImage("dracena-vermelha"),
    imageUrl: plantImage("dracena-vermelha"),
    characteristics: "Planta arbustiva de folhas coloridas, variando do verde ao vermelho vibrante. Muito usada em jardins tropicais.",
    ecologicalImportance: ["Fornece abrigo para pequenos insetos.", "Planta ornamental resistente."],
    curbsideNotes: ["Considerada sagrada em algumas culturas da Polinésia.", "Muito fácil de propagar por estacas."],
    blocks: ["bloco-t"],
    lat: -3.76866,
    lng: -38.48026,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["As cores ficam mais vibrantes sob sol pleno.", "Fácil de propagar por estacas.", "Resistente a pragas comuns."]
    }
  },
  {
    id: "filodendro-ondulado",
    name: "Filodendro-ondulado",
    scientificName: "Philodendron undulatum",
    family: "Araceae",
    origin: "Nativo da América do Sul",
    biome: "Cerrado e Mata Atlântica",
    thumbnailUrl: plantImage("filodendro-ondulado"),
    imageUrl: plantImage("filodendro-ondulado"),
    characteristics: "Arbusto ou trepadeira com folhas grandes, coriáceas e com margens graciosamente onduladas.",
    ecologicalImportance: ["Ajuda a manter a umidade do microclima.", "Planta de sub-bosque que tolera sombra."],
    curbsideNotes: ["Pode ser cultivado em vasos grandes.", "Resiliente e de baixa manutenção."],
    blocks: ["bloco-t"],
    lat: -3.76866,
    lng: -38.48026,
    care: {
      water: "moderada",
      sun: "meia-sombra",
      difficulty: "iniciante",
      tips: ["Tolera bem ambientes internos iluminados.", "Mantenha o solo úmido no verão.", "Limpe as folhas para manter a saúde."]
    }
  },
  {
    id: "jacaranda-boca-de-sapo",
    name: "Jacarandá-boca-de-sapo",
    scientificName: "Jacaranda brasiliana",
    family: "Bignoniaceae",
    origin: "Nativo do Brasil",
    biome: "Cerrado",
    thumbnailUrl: plantImage("jacaranda-boca-de-sapo"),
    imageUrl: plantImage("jacaranda-boca-de-sapo"),
    characteristics: "Árvore de floração roxa-azulada. Recebe esse nome pelo formato característico de seus frutos lenhosos.",
    ecologicalImportance: ["Atrai polinizadores específicos na estação seca.", "Faz parte da rica flora do Cerrado."],
    curbsideNotes: ["Os frutos parecem bocas de sapo quando abertos.", "É menos comum que o Jacarandá Mimoso nas cidades."],
    blocks: ["bloco-t"],
    lat: -3.76866,
    lng: -38.48026,
    care: {
      water: "baixa",
      sun: "pleno",
      difficulty: "intermediário",
      tips: ["Muito resistente à seca após estabelecida.", "Prefere solos bem drenados.", "A floração ocorre no período seco."]
    }
  },
  {
    id: "philodendron-imbe",
    name: "Philodendro cara de cabala",
    scientificName: "Philodendron imbe",
    family: "Araceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: plantImage("philodendron-imbe"),
    imageUrl: plantImage("philodendron-imbe"),
    characteristics: "Planta trepadeira with folhas alongadas que lembram o rosto de um cavalo (ou 'cabala' no popular).",
    ecologicalImportance: ["Usa árvores como suporte sem ser parasita (epífita).", "Importante componente de matas úmidas."],
    curbsideNotes: ["Popular em decoração de interiores.", "Suas raízes aéreas buscam umidade."],
    blocks: ["bloco-t"],
    lat: -3.76866,
    lng: -38.48026,
    care: {
      water: "moderada",
      sun: "meia-sombra",
      difficulty: "iniciante",
      tips: ["Ideal para treliças ou troncos de árvores.", "Gosta de umidade ambiental alta.", "Evite sol direto nas horas mais quentes."]
    }
  },
  {
    id: "palmeira-fenix",
    name: "Palmeira fênix",
    scientificName: "Phoenix roebelenii",
    family: "Arecaceae",
    origin: "Laos e Vietnã",
    biome: "Tropical",
    thumbnailUrl: plantImage("palmeira-fenix"),
    imageUrl: plantImage("palmeira-fenix"),
    characteristics: "Pequena palmeira de crescimento lento, com tronco fino e folhas delicadas em arco.",
    ecologicalImportance: ["Produz pequenos frutos que atraem pássaros.", "Muito resistente em solos urbanos."],
    curbsideNotes: ["Também chamada de Palmeira Anã.", "Possui pequenos espinhos na base das folhas."],
    blocks: ["bloco-t"],
    lat: -3.76866,
    lng: -38.48026,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "intermediário",
      tips: ["Cuidado com os espinhos na base das folhas.", "Crescimento muito lento.", "Ideal para vasos em áreas externas."]
    }
  },
  {
    id: "eucalipto",
    name: "Eucalipto",
    scientificName: "Eucalyptus sp.",
    family: "Myrtaceae",
    origin: "Austrália",
    biome: "Temperado/Tropical",
    thumbnailUrl: plantImage("eucalipto"),
    imageUrl: plantImage("eucalipto"),
    characteristics: "Árvore de rápido crescimento com aroma característico e folhas ricas em óleos essenciais.",
    ecologicalImportance: ["Grande sequestrador de carbono.", "Utilizado em reflorestamentos industriais."],
    curbsideNotes: ["Existem mais de 700 espécies.", "Folhas são usadas em óleos medicinais."],
    blocks: ["bloco-t"],
    lat: -3.76866,
    lng: -38.48026,
    care: {
      water: "baixa",
      sun: "pleno",
      difficulty: "intermediário",
      tips: ["Necessita de muito espaço para crescer.", "Prefere solos profundos.", "Suporta geadas leves."]
    }
  },
  {
    id: "angico",
    name: "Angico",
    scientificName: "Anadenanthera colubrina",
    family: "Fabaceae",
    origin: "Nativo da América do Sul",
    biome: "Caatinga e Cerrado",
    thumbnailUrl: plantImage("angico"),
    imageUrl: plantImage("angico"),
    characteristics: "Árvore rústica de tronco rugoso com madeira de alta densidade. Muito comum no interior brasileiro.",
    ecologicalImportance: ["Árvore pioneira muito resistente.", "Sementes são alimento para fauna silvestre."],
    curbsideNotes: ["A casca é rica em tanino.", "Usada tradicionalmente para curumearia."],
    blocks: ["bloco-t"],
    lat: -3.76854,
    lng: -38.47979,
    care: {
      water: "baixa",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Extremamente rústico e resistente.", "Ideal para recuperação de solos degradados.", "Não requer adubação frequente."]
    }
  },
  {
    id: "palmeira-rabo-de-peixe",
    name: "Palmeira rabo de peixe",
    scientificName: "Caryota urens",
    family: "Arecaceae",
    origin: "Sul da Ásia",
    biome: "Tropical",
    thumbnailUrl: plantImage("palmeira-rabo-de-peixe"),
    imageUrl: plantImage("palmeira-rabo-de-peixe"),
    characteristics: "Palmeira exótica with folíolos que lembram a barbatana de um peixe. Muito imponente no paisagismo.",
    ecologicalImportance: ["Atrai morcegos e pássaros frugívoros.", "Habitat para diversos animais tropicais."],
    curbsideNotes: ["Morre após uma única e longa floração (monocárpica).", "Os frutos podem causar irritação na pele se manuseados."],
    blocks: ["bloco-t"],
    lat: -3.76854,
    lng: -38.47979,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "intermediário",
      tips: ["Os frutos podem ser irritantes ao toque.", "Forneça regas regulares durante a floração.", "Necessita de pleno sol para se desenvolver bem."]
    }
  },
  {
    id: "cassia-chuva-de-ouro",
    name: "Cássia chuva de ouro",
    scientificName: "Cassia fistula",
    family: "Fabaceae",
    origin: "Sudeste Asiático",
    biome: "Tropical",
    thumbnailUrl: plantImage("cassia-chuva-de-ouro"),
    imageUrl: plantImage("cassia-chuva-de-ouro"),
    characteristics: "Árvore de médio porte que se cobre de cachos pendentes de flores amarelas muiros vistosas.",
    ecologicalImportance: ["Atrai abelhas grandes e pássaros.", "Ajuda na melhoria da estética urbana."],
    curbsideNotes: ["As flores parecem lanternas amarelas.", "É a árvore símbolo da Tailândia."],
    blocks: ["bloco-t"],
    lat: -3.76854,
    lng: -38.47979,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Floresce no verão com cachos amarelos.", "Prefere solos ricos e bem drenados.", "Crescimento rápido e sombra leve."]
    }
  },
  {
    id: "espirradeira",
    name: "Espirradeira",
    scientificName: "Nerium oleander",
    family: "Apocynaceae",
    origin: "Região do Mediterrâneo",
    biome: "Mediterrâneo",
    thumbnailUrl: plantImage("espirradeira"),
    imageUrl: plantImage("espirradeira"),
    characteristics: "Arbusto de flores rosas, brancas ou vermelhas. Muito resistente à seca, porém extremamente tóxico se ingerido.",
    ecologicalImportance: ["Planta melífera.", "Atrai borboletas monarca."],
    curbsideNotes: ["Apenas para fins ornamentais, requer cuidado extremo.", "Suporta alta salinidade."],
    blocks: ["bloco-t"],
    lat: -3.76854,
    lng: -38.47979,
    care: {
      water: "baixa",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Atenção: todas as partes são tóxicas se ingeridas.", "Muito resistente à poluição urbana.", "Suporta bem o vento e a seca."]
    }
  },
  {
    id: "ipe-amarelo",
    name: "Ipê Amarelo",
    scientificName: "Tabebuia aurea",
    family: "Bignoniaceae",
    origin: "Brasil",
    biome: "Cerrado",
    thumbnailUrl: plantImage("ipe-amarelo"),
    imageUrl: plantImage("ipe-amarelo"),
    characteristics: "Árvore de beleza única, símbolo da caatinga e cerrado em sua floração seca e amarela.",
    ecologicalImportance: ["Polinização ativa por abelhas silvestres.", "Dispersão das sementes pelo vento (anemocoria)."],
    curbsideNotes: ["Floresce quando está sem nenhuma folha.", "Muito usada em praças e calçadas."],
    blocks: ["bloco-t"],
    lat: -3.76854,
    lng: -38.47979,
    care: {
      water: "baixa",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Perde as folhas antes de florescer no inverno.", "Resistente a solos pobres.", "Atrai muitas abelhas polinizadoras."]
    }
  },
  {
    id: "buganvilia",
    name: "Buganvília",
    scientificName: "Bougainvillea glabra",
    family: "Nyctaginaceae",
    origin: "Nativo do Brasil",
    biome: "Cerrado e Mata Atlântica",
    thumbnailUrl: plantImage("buganvilia"),
    imageUrl: plantImage("buganvilia"),
    characteristics: "Arbusto ou trepadeira de flores pequenas e brancas, protegidas por cores chamativas que são na verdade folhas modificadas (brácteas).",
    ecologicalImportance: ["Atrai insetos polinizadores.", "Proporciona cor intensa em áreas urbanas."],
    curbsideNotes: ["Também chamada de Primavera ou Três-Marias.", "Muito resistente ao calor intenso."],
    blocks: ["bloco-t"],
    lat: -3.76854,
    lng: -38.47979,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Pode ser podada como arbusto ou trepadeira.", "Cuidado com os espinhos nos galhos.", "As cores são na verdade folhas modificadas."]
    }
  },
  {
    id: "agave",
    name: "Agave",
    scientificName: "Agave americana",
    family: "Asparagaceae",
    origin: "México",
    biome: "Árido",
    thumbnailUrl: plantImage("agave"),
    imageUrl: plantImage("agave"),
    characteristics: "Planta suculenta de folhas longas e pontiagudas, forma uma roseta gigante que pode chegar a metros de diâmetro.",
    ecologicalImportance: ["Habitat para insetos especialistas.", "Resistente a incêndios natual."],
    curbsideNotes: ["Floresce apenas uma vez e depois morre.", "De algumas espécies se extrai fibras."],
    blocks: ["bloco-t"],
    lat: -3.76854,
    lng: -38.47979,
    care: {
      water: "baixa",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Suporta sol intenso e falta de água.", "As bordas das folhas podem ser cortantes.", "Floresce apenas uma vez após muitos anos."]
    }
  },
  {
    id: "palmeira-imperial",
    name: "Palmeira imperial",
    scientificName: "Roystonea oleracea",
    family: "Arecaceae",
    origin: "Américas Central e do Sul",
    biome: "Tropical",
    thumbnailUrl: plantImage("palmeira-imperial"),
    imageUrl: plantImage("palmeira-imperial"),
    characteristics: "Palmeira de troncos lisos e cilíndricos, majestosa, atingindo até 40 metros de altura.",
    ecologicalImportance: ["Importante para pássaros de grande porte.", "Símbolo de imponência no paisagismo histórico."],
    curbsideNotes: ["Introduzida no Brasil no Jardim Botânico do RJ em 1809.", "Muito usada em alamedas de entrada."],
    blocks: ["bloco-t"],
    lat: -3.76854,
    lng: -38.47979,
    care: {
      water: "alta",
      sun: "pleno",
      difficulty: "intermediário",
      tips: ["Requer solos profundos e muita água.", "Símbolo de imponência, necessita de espaço.", "Pode atingir grandes alturas."]
    }
  },
  {
    id: "wedelia",
    name: "Wedelia",
    scientificName: "Sphagneticola trilobata",
    family: "Asteraceae",
    origin: "Brasil e Américas",
    biome: "Restinga e Mata Atlântica",
    thumbnailUrl: plantImage("wedelia"),
    imageUrl: plantImage("wedelia"),
    characteristics: "Forração resistente com pequenas flores amarelas semelhantes a margaridas.",
    ecologicalImportance: ["Ajudam no controle da erosão do solo.", "Atraem pequenos polinizadores."],
    curbsideNotes: ["Cresce de forma muito agressiva.", "Suporta bem o pisoteio leve."],
    blocks: ["bloco-t"],
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Excelente para forração de solos.", "Cresce rapidamente e cobre áreas vazias.", "Suporta pisoteio leve."]
    }
  },
  {
    id: "alamanda",
    name: "Alamanda",
    scientificName: "Allamanda cathartica",
    family: "Apocynaceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: plantImage("alamanda"),
    imageUrl: plantImage("alamanda"),
    characteristics: "Trepadeira vigorosa de flores amarelas grandes em formato de trombeta.",
    ecologicalImportance: ["Atrai diversas borboletas.", "Excelente para cobrir cercas e muros."],
    curbsideNotes: ["Possui látex tóxico se manuseado sem luvas.", "Exige pleno sol para florescer bem."],
    blocks: ["bloco-t"],
    lat: -3.768828,
    lng: -38.48009,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Atenção: o látex branco é tóxico.", "Floresce intensamente sob sol pleno.", "Pode ser conduzida em cercas e muros."]
    }
  },
  {
    id: "macaubeira",
    name: "Macaubeira",
    scientificName: "Acrocomia aculeata",
    family: "Arecaceae",
    origin: "Américas",
    biome: "Cerrado",
    thumbnailUrl: plantImage("macaubeira"),
    imageUrl: plantImage("macaubeira"),
    characteristics: "Palmeira de tronco espinhoso com madeira e óleo de alta qualidade.",
    ecologicalImportance: ["Fruto amado por Araras e papagaios.", "Semente rica em óleo."],
    curbsideNotes: ["O coco da macaúba é comestível.", "Considerada o 'ouro do cerrado'."],
    blocks: ["bloco-t"],
    lat: -3.76854,
    lng: -38.47979,
    care: {
      water: "baixa",
      sun: "pleno",
      difficulty: "intermediário",
      tips: ["Muito resistente ao calor do Cerrado.", "O tronco é munido de espinhos fortes.", "Os frutos são ricos em óleo."]
    }
  },
  {
    id: "palmeira-havai",
    name: "Palmeira havaí",
    scientificName: "Veitchia merrillii",
    family: "Arecaceae",
    origin: "Filipinas",
    biome: "Tropical",
    thumbnailUrl: plantImage("palmeira-havai"),
    imageUrl: plantImage("palmeira-havai"),
    characteristics: "Palmeira de pequeno porte com frutinhos vermelhos em cachos pendentes.",
    ecologicalImportance: ["Pequenos pássaros comem os frutos.", "Ornamental e refinado."],
    curbsideNotes: ["Também chamada de Palmeira de Natal.", "Chega a 5-8 metros no máximo."],
    blocks: ["bloco-t"],
    lat: -3.76854,
    lng: -38.47979,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Os frutos vermelhos são muito ornamentais.", "Ideal para pequenos jardins ou vasos.", "Mantenha o solo fértil."]
    }
  },
  {
    id: "grama-esmeralda",
    name: "Grama esmeralda",
    scientificName: "Zoysia japonica",
    family: "Poaceae",
    origin: "Ásia",
    biome: "Temperado/Tropical",
    thumbnailUrl: plantImage("grama-esmeralda"),
    imageUrl: plantImage("grama-esmeralda"),
    characteristics: "Grama de folhas estreitas e cor verde intenso, forma um tapete denso.",
    ecologicalImportance: ["Retém nutrientes no solo.", "Ideal para conter encostas contra erosão."],
    curbsideNotes: ["A mais vendida do Brasil.", "Exige pouco corte comparado a outras."],
    blocks: ["bloco-t"],
    lat: -3.76854,
    lng: -38.47979,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Forma um tapete denso e macio.", "Necessita de sol pleno para não 'ralar'.", "Resistente ao pisoteio frequente."]
    }
  },
  {
    id: "grama-japonesa",
    name: "Grama japonesa",
    scientificName: "Zoysia tenuifolia",
    family: "Poaceae",
    origin: "Ásia e Oceania",
    biome: "Litorâneo/Tropical",
    thumbnailUrl: plantImage("grama-japonesa"),
    imageUrl: plantImage("grama-japonesa"),
    characteristics: "Grama de folhas finíssimas e macias, com crescimento irregular formando montinhos (bolas).",
    ecologicalImportance: ["Usa menos água e fertilizante.", "Estética de jardins zen japonês."],
    curbsideNotes: ["Também chamada de Grama Coreana.", "Muito macia ao toque (pisar descalço)."],
    blocks: ["bloco-t"],
    lat: -3.76854,
    lng: -38.47979,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Cresce formando montinhos naturais.", "Não requer cortes frequentes.", "Ideal para jardins de estilo japonês."]
    }
  },
  {
    id: "flamboia",
    name: "Flamboiã",
    scientificName: "Delonix regia",
    family: "Fabaceae",
    origin: "Madagáscar",
    biome: "Tropical",
    thumbnailUrl: plantImage("flamboia"),
    imageUrl: plantImage("flamboia"),
    characteristics: "Possui floração extraordinária em tons de vermelha e laranja intenso, com copa frondosa.",
    ecologicalImportance: ["Sombra densa.", "Polinização ativa."],
    curbsideNotes: ["Suas raízes superficiais requerem espaço.", "As flores caídas formam um tapete colorido."],
    blocks: ["bloco-t"],
    lat: -3.76854,
    lng: -38.47979,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "intermediário",
      tips: ["As raízes podem danificar calçadas, dê espaço.", "Floresce espetacularmente no verão.", "Perde as folhas antes da floração."]
    }
  },
  {
    id: "chicha-do-para",
    name: "Chichá do Pará",
    scientificName: "Sterculia apetala",
    family: "Malvaceae",
    origin: "Nativo da América Central e do Sul",
    biome: "Tropical",
    thumbnailUrl: plantImage("chicha-do-para"),
    imageUrl: plantImage("chicha-do-para"),
    characteristics: "Árvore de tronco reto e copa larga, produz frutos que contêm castanhas comestíveis.",
    ecologicalImportance: ["Fonte de gordura boa para fauna local.", "Semente dispersa naturally por aves."],
    curbsideNotes: ["O tronco reto é bom para construções navais simples.", "As castanhas lembram amendoim."],
    blocks: ["bloco-t"],
    lat: -3.76822,
    lng: -38.48016,
    care: {
      water: "alta",
      sun: "pleno",
      difficulty: "intermediário",
      tips: ["Gosta de solos úmidos de beira de rio.", "As castanhas são comestíveis e nutritivas.", "Árvore de grande porte, necessita de espaço."]
    }
  },
  {
    id: "pacavira",
    name: "Pacavira",
    scientificName: "Heliconia psittacorum",
    family: "Heliconiaceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: plantImage("pacavira"),
    imageUrl: plantImage("pacavira"),
    characteristics: "Planta herbácea with inflorescências que lembram bicos de papagaio, mantendo as cores por longo tempo.",
    ecologicalImportance: ["Polinização exclusiva por certos beija-flores.", "Satura as bordas das matas com cor."],
    curbsideNotes: ["Ideal para vasos e bordaduras.", "Também chamada de Heliconia-papagaio."],
    blocks: ["bloco-t"],
    lat: -3.76786,
    lng: -38.47991,
    care: {
      water: "alta",
      sun: "meia-sombra",
      difficulty: "iniciante",
      tips: ["Mantenha o solo sempre úmido.", "As flores duram muito tempo se bem cuidadas.", "Ideal para bordaduras de jardins úmidos."]
    }
  },
  {
    id: "sombreiro",
    name: "Sombreiro",
    scientificName: "Clitoria fairchildiana",
    family: "Fabaceae",
    origin: "Nativo do Brasil (Amazônia)",
    biome: "Amazônia",
    thumbnailUrl: plantImage("sombreiro"),
    imageUrl: plantImage("sombreiro"),
    characteristics: "Árvore de sombra muito densa, com flores de cor lilás e roxas em formato de borboleta.",
    ecologicalImportance: ["Atrai grandes abelhas polinizadoras.", "Espécie regeneradora de solos."],
    curbsideNotes: ["A copa é tão fechada que mal passa luz.", "Crescimento rápido."],
    blocks: ["bloco-t"],
    lat: -3.76822,
    lng: -38.48016,
    care: {
      water: "moderada",
      sun: "pleno",
      difficulty: "iniciante",
      tips: ["Excelente árvore para sombra densa.", "Crescimento rápido nos primeiros anos.", "Resistente a ventos fortes."]
    }
  },
  {
    id: "pinheiro",
    name: "Pinheiro",
    scientificName: "Pinus sp.",
    family: "Pinaceae",
    origin: "Hemisfério Norte",
    biome: "Temperado",
    thumbnailUrl: plantImage("pinheiro"),
    imageUrl: plantImage("pinheiro"),
    characteristics: "Possui folhas aciculares (agulhas) e sementes em cones (pinhas). Madeira leve e resinosa.",
    ecologicalImportance: ["Importante em áreas de clima frio.", "Seus cones protegem as sementes."],
    curbsideNotes: ["O pinhão é semente de outra árvore (Araucária).", "Gera acícula no solo, acidificando."],
    blocks: ["bloco-t"],
    lat: -3.76786,
    lng: -38.47991,
    care: {
      water: "baixa",
      sun: "pleno",
      difficulty: "intermediário",
      tips: ["As agulhas que caem acidificam o solo.", "Não tolera solos encharcados.", "Crescimento reto e vertical."]
    }
  },
  {
    id: "jiboia",
    name: "Jiboia",
    scientificName: "Epipremnum aureum",
    family: "Araceae",
    origin: "Ilhas Salomão",
    biome: "Tropical",
    thumbnailUrl: plantImage("jiboia"),
    imageUrl: plantImage("jiboia"),
    characteristics: "Planta trepadeira muito resistente, com folhas em formato de coração e variegação amarelada.",
    ecologicalImportance: ["Ajuda na purificação do ar.", "Cobertura vegetal em florestas tropicais."],
    curbsideNotes: ["Muito fácil de cuidar em ambientes internos.", "Pode tornar-se invasora em climas favoráveis."],
    blocks: ["bloco-t"],
    lat: -3.76786,
    lng: -38.47991,
    care: {
      water: "moderada",
      sun: "meia-sombra",
      difficulty: "iniciante",
      tips: ["Uma das plantas mais fáceis de cuidar.", "Pode ser cultivada na água.", "Limpe as folhas com um pano úmido para brilho."]
    }
  }
];

export function getPlantById(id: string): Plant | undefined {
  return plants.find(plant => plant.id === id);
}

export function searchPlants(query: string): Plant[] {
  const lowerQuery = query.toLowerCase();
  return plants.filter(plant =>
    plant.name.toLowerCase().includes(lowerQuery) ||
    plant.family.toLowerCase().includes(lowerQuery) ||
    plant.scientificName.toLowerCase().includes(lowerQuery) ||
    plant.characteristics.toLowerCase().includes(lowerQuery)
  );
}

export function getPlantsByBlock(blockId: string): Plant[] {
  return plants.filter(plant => plant.blocks.includes(blockId));
}

export function getBlockById(id: string): Block | undefined {
  return blocks.find(block => block.id === id);
}
