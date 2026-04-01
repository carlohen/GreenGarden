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
}

export interface Block {
  id: string;
  name: string;
  // Percentage focus for the map image
  focusX: number;
  focusY: number;
}

export const blocks: Block[] = [
  { id: "bloco-a", name: "Bloco A", focusX: 90, focusY: 30 },
  { id: "bloco-b", name: "Bloco B", focusX: 90, focusY: 40 },
  { id: "bloco-c", name: "Bloco C", focusX: 85, focusY: 55 },
  { id: "bloco-d", name: "Bloco D", focusX: 80, focusY: 45 },
  { id: "bloco-t", name: "Bloco T", focusX: 73, focusY: 82 }, // Bottom right area
  { id: "bloco-m", name: "Bloco M", focusX: 58, focusY: 60 },
  { id: "reitoria", name: "Reitoria", focusX: 88, focusY: 65 },
  { id: "biblioteca", name: "Biblioteca", focusX: 78, focusY: 65 },
];

export const plants: Plant[] = [
  {
    id: "coqueiro",
    name: "Coqueiro",
    scientificName: "Cocos nucifera",
    family: "Arecaceae",
    origin: "Sudeste Asiático",
    biome: "Litorâneo",
    thumbnailUrl: "https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&q=80&w=800",
    characteristics: "Palmeira de tronco único, que pode atingir até 30 metros de altura. Possui folhas pinadas e frutos de casca fibrosa contendo água e polpa comestível.",
    ecologicalImportance: ["Fonte de alimento para diversas espécies.", "Ajuda a estabilizar o solo em áreas costeiras."],
    curbsideNotes: ["O coco leva de 6 a 12 meses para amadurecer.", "A água de coco é rica em eletrólitos."],
    blocks: ["bloco-t", "bloco-a"]
  },
  {
    id: "casuarina",
    name: "Casuarina",
    scientificName: "Casuarina equisetifolia",
    family: "Casuarinaceae",
    origin: "Austrália e Sudeste Asiático",
    biome: "Litorâneo",
    thumbnailUrl: "https://images.unsplash.com/photo-1621343750172-132cfbcba287?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1621343750172-132cfbcba287?auto=format&fit=crop&q=80&w=800",
    characteristics: "Árvore de grande porte que assemelha-se a um pinheiro, mas é uma angiosperma. Suas folhas são reduzidas a escamas minúsculas.",
    ecologicalImportance: ["Fixadora de nitrogênio no solo.", "Excelente quebra-vento em áreas litorâneas."],
    curbsideNotes: ["Podem sobreviver em solos muito salinos.", "A madeira é extremamente dura e pesada."],
    blocks: ["bloco-b", "bloco-c"]
  },
  {
    id: "amendoeira-da-praia",
    name: "Amendoeira-da-praia",
    scientificName: "Terminalia catappa",
    family: "Combretaceae",
    origin: "Ásia Tropical",
    biome: "Litorâneo",
    thumbnailUrl: "https://images.unsplash.com/photo-1598335624134-4067969850da?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1598335624134-4067969850da?auto=format&fit=crop&q=80&w=800",
    characteristics: "Árvore de copa larga e horizontalizada, com folhas grandes que ficam avermelhadas antes de cair.",
    ecologicalImportance: ["Oferece ampla sombra.", "Os frutos são dispersos pela água."],
    curbsideNotes: ["As amêndoas do fruto são comestíveis.", "É muito utilizada em arborização urbana costeira."],
    blocks: ["bloco-t", "bloco-d"]
  },
  {
    id: "cajueiro",
    name: "Cajueiro",
    scientificName: "Anacardium occidentale",
    family: "Anacardiaceae",
    origin: "Nativo do Brasil",
    biome: "Caatinga e Cerrado",
    thumbnailUrl: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=800",
    characteristics: "Árvore de tronco tortuoso com madeira leve. O verdadeiro fruto é a castanha, enquanto o caju é um pseudofruto.",
    ecologicalImportance: ["Importante para a fauna local como fonte de alimento.", "Espécie pioneira em áreas de dunas."],
    curbsideNotes: ["O Brasil é um dos maiores produtores de castanha de caju.", "A produção de suco de caju é muito forte no Nordeste."],
    blocks: ["bloco-t", "bloco-a"]
  },
  {
    id: "bromelia-porto-seguro",
    name: "Bromélia Porto Seguro",
    scientificName: "Aechmea blanchetiana",
    family: "Bromeliaceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: "https://images.unsplash.com/photo-1652199042294-0ea80c102a90?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1652199042294-0ea80c102a90?auto=format&fit=crop&q=80&w=800",
    characteristics: "Planta herbácea com folhas coriáceas dispostas em roseta, de cor amarelada a alaranjada sob sol pleno.",
    ecologicalImportance: ["Acumula água no centro, servindo de habitat para pequenos animais.", "Atrai beija-flores para polinização."],
    curbsideNotes: ["Muito resistente ao sol direto.", "A inflorescência pode durar meses."],
    blocks: ["bloco-t", "bloco-m"]
  },
  {
    id: "coromandel",
    name: "Coromandel",
    scientificName: "Asystasia gangetica",
    family: "Acanthaceae",
    origin: "África e Ásia",
    biome: "Tropical",
    thumbnailUrl: "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&q=80&w=800",
    characteristics: "Planta de crescimento rápido, com flores tubulares em tons de branco ou violeta. Pode ser usada como forração.",
    ecologicalImportance: ["Importante para borboletas.", "Atrai abelhas melíferas."],
    curbsideNotes: ["Considerada invasora em algumas regiões.", "Floresce quase o ano todo."],
    blocks: ["bloco-c", "bloco-d"]
  },
  {
    id: "lacre-comum",
    name: "Lacre comum",
    scientificName: "Ixora chinensis",
    family: "Rubiaceae",
    origin: "China e Malásia",
    biome: "Tropical",
    thumbnailUrl: "https://images.unsplash.com/photo-1596200234479-7973c1d48d0a?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1596200234479-7973c1d48d0a?auto=format&fit=crop&q=80&w=800",
    characteristics: "Arbusto perene com inflorescências densas de cor laranja a vermelha. Muito apreciada no paisagismo tropical.",
    ecologicalImportance: ["Fonte de néctar para beija-flores.", "Atrai diversos insetos úteis."],
    curbsideNotes: ["Gosta de sol pleno.", "As flores atraem borboletas."],
    blocks: ["bloco-t", "bloco-a"]
  },
  {
    id: "paineira",
    name: "Paineira",
    scientificName: "Ceiba speciosa",
    family: "Malvaceae",
    origin: "Brasil e Argentina",
    biome: "Mata Atlântica e Cerrado",
    thumbnailUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    characteristics: "Árvore de grande porte com tronco munido de aculeos (espinhos), famoso pela produção de 'paina'.",
    ecologicalImportance: ["O algodão da paina ajuda na dispersão de sementes.", "Flores são visitadas por morcegos e pássaros."],
    curbsideNotes: ["O tronco armazena água.", "Suas flores rosas são muito ornamentais."],
    blocks: ["bloco-m", "bloco-b"]
  },
  {
    id: "ipe-peroba",
    name: "Ipê Peroba",
    scientificName: "Handroanthus roseo-albus",
    family: "Bignoniaceae",
    origin: "Nativo do Brasil",
    biome: "Mata Atlântica e Cerrado",
    thumbnailUrl: "https://images.unsplash.com/photo-1623869032537-814bfb9f6764?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1623869032537-814bfb9f6764?auto=format&fit=crop&q=80&w=800",
    characteristics: "Árvore de madeira nobre com floração branca intensa que ocorre logo após o Ipê Amarelo.",
    ecologicalImportance: ["Fonte de pólen para abelhas silvestres.", "Ajuda na regeneração de matas."],
    curbsideNotes: ["Altamente valorizada na marcenaria.", "Possui crescimento moderado."],
    blocks: ["bloco-t", "reitoria"]
  },
  {
    id: "pau-brasil",
    name: "Pau-Brasil",
    scientificName: "Paubrasilia echinata",
    family: "Fabaceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    characteristics: "Árvore histórica que deu nome ao Brasil, conhecida pela resina avermelhada extraída de seu tronco cor de brasa.",
    ecologicalImportance: ["Árvore símbolo nacional.", "Importante para biodiversidade da Mata Atlântica."],
    curbsideNotes: ["Ameaçada de extinção.", "A madeira é usada hoje para arcos de violino de luxo."],
    blocks: ["bloco-a", "reitoria"]
  },
  {
    id: "munguba",
    name: "Munguba",
    scientificName: "Pachira aquatica",
    family: "Malvaceae",
    origin: "Américas Central e do Sul",
    biome: "Amazônia",
    thumbnailUrl: "https://images.unsplash.com/photo-1584589255677-446700c2f829?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1584589255677-446700c2f829?auto=format&fit=crop&q=80&w=800",
    characteristics: "Também conhecida como castanha-do-maranhão, tem folhas digitadas e flores grandes de estames brancos.",
    ecologicalImportance: ["As sementes são comestíveis por peixes em áreas alagadas.", "Importante para fauna de beira de rio."],
    curbsideNotes: ["Muito decorativa como 'Money Tree'.", "As sementes torradas lembram o gosto de cacau."],
    blocks: ["bloco-t", "bloco-m"]
  },
  {
    id: "dracena-vermelha",
    name: "Dracena vermelha",
    scientificName: "Cordyline fruticosa",
    family: "Asparagaceae",
    origin: "Sudeste Asiático e Oceania",
    biome: "Tropical",
    thumbnailUrl: "https://images.unsplash.com/photo-1599385553641-7925e0116812?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1599385553641-7925e0116812?auto=format&fit=crop&q=80&w=800",
    characteristics: "Planta arbustiva de folhas coloridas, variando do verde ao vermelho vibrante. Muito usada em jardins tropicais.",
    ecologicalImportance: ["Fornece abrigo para pequenos insetos.", "Planta ornamental resistente."],
    curbsideNotes: ["Considerada sagrada em algumas culturas da Polinésia.", "Muito fácil de propagar por estacas."],
    blocks: ["bloco-b", "bloco-c"]
  },
  {
    id: "filodendro-ondulado",
    name: "Filodendro-ondulado",
    scientificName: "Philodendron undulatum",
    family: "Araceae",
    origin: "Nativo da América do Sul",
    biome: "Cerrado e Mata Atlântica",
    thumbnailUrl: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&q=80&w=800",
    characteristics: "Arbusto ou trepadeira com folhas grandes, coriáceas e com margens graciosamente onduladas.",
    ecologicalImportance: ["Ajuda a manter a umidade do microclima.", "Planta de sub-bosque que tolera sombra."],
    curbsideNotes: ["Pode ser cultivado em vasos grandes.", "Resiliente e de baixa manutenção."],
    blocks: ["bloco-t", "biblioteca"]
  },
  {
    id: "jacaranda-boca-de-sapo",
    name: "Jacarandá-boca-de-sapo",
    scientificName: "Jacaranda brasiliana",
    family: "Bignoniaceae",
    origin: "Nativo do Brasil",
    biome: "Cerrado",
    thumbnailUrl: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&q=80&w=800",
    characteristics: "Árvore de floração roxa-azulada. Recebe esse nome pelo formato característico de seus frutos lenhosos.",
    ecologicalImportance: ["Atrai polinizadores específicos na estação seca.", "Faz parte da rica flora do Cerrado."],
    curbsideNotes: ["Os frutos parecem bocas de sapo quando abertos.", "É menos comum que o Jacarandá Mimoso nas cidades."],
    blocks: ["reitoria", "bloco-a"]
  },
  {
    id: "philodendron-imbe",
    name: "Philodendro cara de cabala",
    scientificName: "Philodendron imbe",
    family: "Araceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800",
    characteristics: "Planta trepadeira com folhas alongadas que lembram o rosto de um cavalo (ou 'cabala' no popular).",
    ecologicalImportance: ["Usa árvores como suporte sem ser parasita (epífita).", "Importante componente de matas úmidas."],
    curbsideNotes: ["Popular em decoração de interiores.", "Suas raízes aéreas buscam umidade."],
    blocks: ["bloco-t", "bloco-m"]
  },
  {
    id: "palmeira-fenix",
    name: "Palmeira fênix",
    scientificName: "Phoenix roebelenii",
    family: "Arecaceae",
    origin: "Laos e Vietnã",
    biome: "Tropical",
    thumbnailUrl: "https://images.unsplash.com/photo-1596200234479-7973c1d48d0a?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1596200234479-7973c1d48d0a?auto=format&fit=crop&q=80&w=800",
    characteristics: "Pequena palmeira de crescimento lento, com tronco fino e folhas delicadas em arco.",
    ecologicalImportance: ["Produz pequenos frutos que atraem pássaros.", "Muito resistente em solos urbanos."],
    curbsideNotes: ["Também chamada de Palmeira Anã.", "Possui pequenos espinhos na base das folhas."],
    blocks: ["bloco-t", "bloco-m"]
  },
  {
    id: "eucalipto",
    name: "Eucalipto",
    scientificName: "Eucalyptus sp.",
    family: "Myrtaceae",
    origin: "Austrália",
    biome: "Temperado/Tropical",
    thumbnailUrl: "https://images.unsplash.com/photo-1616766436660-3134685ffcb7?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1616766436660-3134685ffcb7?auto=format&fit=crop&q=80&w=800",
    characteristics: "Árvore de rápido crescimento com aroma característico e folhas ricas em óleos essenciais.",
    ecologicalImportance: ["Grande sequestrador de carbono.", "Utilizado em reflorestamentos industriais."],
    curbsideNotes: ["Existem mais de 700 espécies.", "Folhas são usadas em óleos medicinais."],
    blocks: ["bloco-d", "bloco-b"]
  },
  {
    id: "angico",
    name: "Angico",
    scientificName: "Anadenanthera colubrina",
    family: "Fabaceae",
    origin: "Nativo da América do Sul",
    biome: "Caatinga e Cerrado",
    thumbnailUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    characteristics: "Árvore rústica de tronco rugoso com madeira de alta densidade. Muito comum no interior brasileiro.",
    ecologicalImportance: ["Árvore pioneira muito resistente.", "Sementes são alimento para fauna silvestre."],
    curbsideNotes: ["A casca é rica em tanino.", "Usada tradicionalmente para curumearia."],
    blocks: ["bloco-c", "bloco-a"]
  },
  {
    id: "palmeira-rabo-de-peixe",
    name: "Palmeira rabo de peixe",
    scientificName: "Caryota urens",
    family: "Arecaceae",
    origin: "Sul da Ásia",
    biome: "Tropical",
    thumbnailUrl: "https://images.unsplash.com/photo-1534958617551-7efd68378546?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1534958617551-7efd68378546?auto=format&fit=crop&q=80&w=800",
    characteristics: "Palmeira exótica com folíolos que lembram a barbatana de um peixe. Muito imponente no paisagismo.",
    ecologicalImportance: ["Atrai morcegos e pássaros frugívoros.", "Habitat para diversos animais tropicais."],
    curbsideNotes: ["Morre após uma única e longa floração (monocárpica).", "Os frutos podem causar irritação na pele se manuseados."],
    blocks: ["bloco-t", "bloco-b"]
  },
  {
    id: "cassia-chuva-de-ouro",
    name: "Cássia chuva de ouro",
    scientificName: "Cassia fistula",
    family: "Fabaceae",
    origin: "Sudeste Asiático",
    biome: "Tropical",
    thumbnailUrl: "https://images.unsplash.com/photo-1698774738596-fdd28b5774ad?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1698774738596-fdd28b5774ad?auto=format&fit=crop&q=80&w=800",
    characteristics: "Árvore de médio porte que se cobre de cachos pendentes de flores amarelas muiros vistosas.",
    ecologicalImportance: ["Atrai abelhas grandes e pássaros.", "Ajuda na melhoria da estética urbana."],
    curbsideNotes: ["As flores parecem lanternas amarelas.", "É a árvore símbolo da Tailândia."],
    blocks: ["bloco-t", "reitoria"]
  },
  {
    id: "espirradeira",
    name: "Espirradeira",
    scientificName: "Nerium oleander",
    family: "Apocynaceae",
    origin: "Região do Mediterrâneo",
    biome: "Mediterrâneo",
    thumbnailUrl: "https://images.unsplash.com/photo-1596200234479-7973c1d48d0a?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1596200234479-7973c1d48d0a?auto=format&fit=crop&q=80&w=800",
    characteristics: "Arbusto de flores rosas, brancas ou vermelhas. Muito resistente à seca, porém extremamente tóxico se ingerido.",
    ecologicalImportance: ["Planta melífera.", "Atrai borboletas monarca."],
    curbsideNotes: ["Apenas para fins ornamentais, requer cuidado extremo.", "Suporta alta salinidade."],
    blocks: ["bloco-d", "bloco-c"]
  },
  {
    id: "ipe-amarelo",
    name: "Ipê Amarelo",
    scientificName: "Tabebuia aurea",
    family: "Bignoniaceae",
    origin: "Brasil",
    biome: "Cerrado",
    thumbnailUrl: "https://images.unsplash.com/photo-1698774738596-fdd28b5774ad?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1623869032537-814bfb9f6764?auto=format&fit=crop&q=80&w=800",
    characteristics: "Árvore de beleza única, símbolo da caatinga e cerrado em sua floração seca e amarela.",
    ecologicalImportance: ["Polinização ativa por abelhas silvestres.", "Dispersão das sementes pelo vento (anemocoria)."],
    curbsideNotes: ["Floresce quando está sem nenhuma folha.", "Muito usada em praças e calçadas."],
    blocks: ["bloco-t", "bloco-a"]
  },
  {
    id: "buganvilia",
    name: "Buganvília",
    scientificName: "Bougainvillea glabra",
    family: "Nyctaginaceae",
    origin: "Nativo do Brasil",
    biome: "Cerrado e Mata Atlântica",
    thumbnailUrl: "https://images.unsplash.com/photo-1558223616-560dd436814d?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1558223616-560dd436814d?auto=format&fit=crop&q=80&w=800",
    characteristics: "Arbusto ou trepadeira de flores pequenas e brancas, protegidas por cores chamativas que são na verdade folhas modificadas (brácteas).",
    ecologicalImportance: ["Atrai insetos polinizadores.", "Proporciona cor intensa em áreas urbanas."],
    curbsideNotes: ["Também chamada de Primavera ou Três-Marias.", "Muito resistente ao calor intenso."],
    blocks: ["bloco-t", "bloco-m"]
  },
  {
    id: "agave",
    name: "Agave",
    scientificName: "Agave americana",
    family: "Asparagaceae",
    origin: "México",
    biome: "Árido",
    thumbnailUrl: "https://images.unsplash.com/photo-1453904300305-64906f343469?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1453904300305-64906f343469?auto=format&fit=crop&q=80&w=800",
    characteristics: "Planta suculenta de folhas longas e pontiagudas, forma uma roseta gigante que pode chegar a metros de diâmetro.",
    ecologicalImportance: ["Habitat para insetos especialistas.", "Resistente a incêndios natual."],
    curbsideNotes: ["Floresce apenas uma vez e depois morre.", "De algumas espécies se extrai fibras."],
    blocks: ["bloco-c", "bloco-d"]
  },
  {
    id: "palmeira-imperial",
    name: "Palmeira imperial",
    scientificName: "Roystonea oleracea",
    family: "Arecaceae",
    origin: "Américas Central e do Sul",
    biome: "Tropical",
    thumbnailUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800",
    characteristics: "Palmeira de troncos lisos e cilíndricos, majestosa, atingindo até 40 metros de altura.",
    ecologicalImportance: ["Importante para pássaros de grande porte.", "Símbolo de imponência no paisagismo histórico."],
    curbsideNotes: ["Introduzida no Brasil no Jardim Botânico do RJ em 1809.", "Muito usada em alamedas de entrada."],
    blocks: ["reitoria", "bloco-b"]
  },
  {
    id: "wedelia",
    name: "Wedelia",
    scientificName: "Sphagneticola trilobata",
    family: "Asteraceae",
    origin: "Brasil e Américas",
    biome: "Restinga e Mata Atlântica",
    thumbnailUrl: "https://images.unsplash.com/photo-1621343750172-132cfbcba287?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1621343750172-132cfbcba287?auto=format&fit=crop&q=80&w=800",
    characteristics: "Forração resistente com pequenas flores amarelas semelhantes a margaridas.",
    ecologicalImportance: ["Ajudam no controle da erosão do solo.", "Atraem pequenos polinizadores."],
    curbsideNotes: ["Cresce de forma muito agressiva.", "Suporta bem o pisoteio leve."],
    blocks: ["bloco-t", "bloco-a"]
  },
  {
    id: "alamanda",
    name: "Alamanda",
    scientificName: "Allamanda cathartica",
    family: "Apocynaceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&q=80&w=800",
    characteristics: "Trepadeira vigorosa de flores amarelas grandes em formato de trombeta.",
    ecologicalImportance: ["Atrai diversas borboletas.", "Excelente para cobrir cercas e muros."],
    curbsideNotes: ["Possui látex tóxico se manuseado sem luvas.", "Exige pleno sol para florescer bem."],
    blocks: ["bloco-t", "bloco-m"]
  },
  {
    id: "macaubeira",
    name: "Macaubeira",
    scientificName: "Acrocomia aculeata",
    family: "Arecaceae",
    origin: "Américas",
    biome: "Cerrado",
    thumbnailUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800",
    characteristics: "Palmeira de tronco espinhoso com madeira e óleo de alta qualidade.",
    ecologicalImportance: ["Fruto amado por Araras e papagaios.", "Semente rica em óleo."],
    curbsideNotes: ["O coco da macaúba é comestível.", "Considerada o 'ouro do cerrado'."],
    blocks: ["bloco-a", "bloco-c"]
  },
  {
    id: "palmeira-havai",
    name: "Palmeira havaí",
    scientificName: "Veitchia merrillii",
    family: "Arecaceae",
    origin: "Filipinas",
    biome: "Tropical",
    thumbnailUrl: "https://images.unsplash.com/photo-1596200234479-7973c1d48d0a?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1596200234479-7973c1d48d0a?auto=format&fit=crop&q=80&w=800",
    characteristics: "Palmeira de pequeno porte com frutinhos vermelhos em cachos pendentes.",
    ecologicalImportance: ["Pequenos pássaros comem os frutos.", "Ornamental e refinado."],
    curbsideNotes: ["Também chamada de Palmeira de Natal.", "Chega a 5-8 metros no máximo."],
    blocks: ["bloco-t", "bloco-m"]
  },
  {
    id: "grama-esmeralda",
    name: "Grama esmeralda",
    scientificName: "Zoysia japonica",
    family: "Poaceae",
    origin: "Ásia",
    biome: "Temperado/Tropical",
    thumbnailUrl: "https://images.unsplash.com/photo-1589923188900-85dae5233153?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1589923188900-85dae5233153?auto=format&fit=crop&q=80&w=800",
    characteristics: "Grama de folhas estreitas e cor verde intenso, forma um tapete denso.",
    ecologicalImportance: ["Retém nutrientes no solo.", "Ideal para conter encostas contra erosão."],
    curbsideNotes: ["A mais vendida do Brasil.", "Exige pouco corte comparado a outras."],
    blocks: ["bloco-t", "bloco-a"]
  },
  {
    id: "grama-japonesa",
    name: "Grama japonesa",
    scientificName: "Zoysia tenuifolia",
    family: "Poaceae",
    origin: "Ásia e Oceania",
    biome: "Litorâneo/Tropical",
    thumbnailUrl: "https://images.unsplash.com/photo-1533460004989-cef59285091c?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1533460004989-cef59285091c?auto=format&fit=crop&q=80&w=800",
    characteristics: "Grama de folhas finíssimas e macias, com crescimento irregular formando montinhos (bolas).",
    ecologicalImportance: ["Usa menos água e fertilizante.", "Estética de jardins zen japonês."],
    curbsideNotes: ["Também chamada de Grama Coreana.", "Muito macia ao toque (pisar descalço)."],
    blocks: ["bloco-m", "bloco-b"]
  },
  {
    id: "flamboia",
    name: "Flamboiã",
    scientificName: "Delonix regia",
    family: "Fabaceae",
    origin: "Madagáscar",
    biome: "Tropical",
    thumbnailUrl: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&q=80&w=800",
    characteristics: "Possui floração extraordinária em tons de vermelha e laranja intenso, com copa frondosa.",
    ecologicalImportance: ["Sombra densa.", "Polinização ativa."],
    curbsideNotes: ["Suas raízes superficiais requerem espaço.", "As flores caídas formam um tapete colorido."],
    blocks: ["bloco-t", "bloco-m"]
  },
  {
    id: "chicha-do-para",
    name: "Chichá do Pará",
    scientificName: "Sterculia apetala",
    family: "Malvaceae",
    origin: "Nativo da América Central e do Sul",
    biome: "Tropical",
    thumbnailUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    characteristics: "Árvore de tronco reto e copa larga, produz frutos que contêm castanhas comestíveis.",
    ecologicalImportance: ["Fonte de gordura boa para fauna local.", "Semente dispersa naturally por aves."],
    curbsideNotes: ["O tronco reto é bom para construções navais simples.", "As castanhas lembram amendoim."],
    blocks: ["bloco-c", "bloco-b"]
  },
  {
    id: "pacavira",
    name: "Pacavira",
    scientificName: "Heliconia psittacorum",
    family: "Heliconiaceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: "https://images.unsplash.com/photo-1521124403178-02ba2c729519?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1521124403178-02ba2c729519?auto=format&fit=crop&q=80&w=800",
    characteristics: "Planta herbácea com inflorescências que lembram bicos de papagaio, mantendo as cores por longo tempo.",
    ecologicalImportance: ["Polinização exclusiva por certos beija-flores.", "Satura as bordas das matas com cor."],
    curbsideNotes: ["Ideal para vasos e bordaduras.", "Também chamada de Heliconia-papagaio."],
    blocks: ["bloco-t", "bloco-m"]
  },
  {
    id: "sombreiro",
    name: "Sombreiro",
    scientificName: "Clitoria fairchildiana",
    family: "Fabaceae",
    origin: "Nativo do Brasil (Amazônia)",
    biome: "Amazônia",
    thumbnailUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    characteristics: "Árvore de sombra muito densa, com flores de cor lilás e roxas em formato de borboleta.",
    ecologicalImportance: ["Atrai grandes abelhas polinizadoras.", "Espécie regeneradora de solos."],
    curbsideNotes: ["A copa é tão fechada que mal passa luz.", "Crescimento rápido."],
    blocks: ["bloco-t", "bloco-d"]
  },
  {
    id: "pinheiro",
    name: "Pinheiro",
    scientificName: "Pinus sp.",
    family: "Pinaceae",
    origin: "Hemisfério Norte",
    biome: "Temperado",
    thumbnailUrl: "https://images.unsplash.com/photo-1543391032-15637213bb1b?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1543391032-15637213bb1b?auto=format&fit=crop&q=80&w=800",
    characteristics: "Possui folhas aciculares (agulhas) e sementes em cones (pinhas). Madeira leve e resinosa.",
    ecologicalImportance: ["Importante em áreas de clima frio.", "Seus cones protegem as sementes."],
    curbsideNotes: ["O pinhão é semente de outra árvore (Araucária).", "Gera acícula no solo, acidificando."],
    blocks: ["bloco-b", "bloco-d"]
  },
  {
    id: "jiboia",
    name: "Jiboia",
    scientificName: "Epipremnum aureum",
    family: "Araceae",
    origin: "Ilhas Salomão",
    biome: "Tropical",
    thumbnailUrl: "https://images.unsplash.com/photo-1596708689451-9e569aba7976?auto=format&fit=crop&q=80&w=200",
    imageUrl: "https://images.unsplash.com/photo-1596708689451-9e569aba7976?auto=format&fit=crop&q=80&w=800",
    characteristics: "Planta trepadeira muito resistente, com folhas em formato de coração e variegação amarelada.",
    ecologicalImportance: ["Ajuda na purificação do ar.", "Cobertura vegetal em florestas tropicais."],
    curbsideNotes: ["Muito fácil de cuidar em ambientes internos.", "Pode tornar-se invasora em climas favoráveis."],
    blocks: ["bloco-t", "biblioteca"]
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
