export const TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

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
    thumbnailUrl: "https://www12.senado.leg.br/audiolivros/RS/flora-do-senado/especies/imagem/cocos-nucifera-01.jpg",
    imageUrl: "https://www12.senado.leg.br/audiolivros/RS/flora-do-senado/especies/imagem/cocos-nucifera-01.jpg",
    characteristics: "Palmeira de tronco único, que pode atingir até 30 metros de altura. Possui folhas pinadas e frutos de casca fibrosa contendo água e polpa comestível.",
    ecologicalImportance: ["Fonte de alimento para diversas espécies.", "Ajuda a estabilizar o solo em áreas costeiras."],
    curbsideNotes: ["O coco leva de 6 a 12 meses para amadurecer.", "A água de coco é rica em eletrólitos."],
    blocks: ["bloco-t"],
    lat: -3.76884,
    lng: -38.48014
  },
  {
    id: "casuarina",
    name: "Casuarina",
    scientificName: "Casuarina equisetifolia",
    family: "Casuarinaceae",
    origin: "Austrália e Sudeste Asiático",
    biome: "Litorâneo",
    thumbnailUrl: "https://www.fresnogardening.org/PlantMaster/Photos/1351a.jpg",
    imageUrl: "https://www.fresnogardening.org/PlantMaster/Photos/1351a.jpg",
    characteristics: "Árvore de grande porte que assemelha-se a um pinheiro, mas é uma angiosperma. Suas folhas são reduzidas a escamas minúsculas.",
    ecologicalImportance: ["Fixadora de nitrogênio no solo.", "Excelente quebra-vento em áreas litorâneas."],
    curbsideNotes: ["Podem sobreviver em solos muito salinos.", "A madeira é extremamente dura e pesada."],
    blocks: ["bloco-t"],
    lat: -3.7685,
    lng: -38.4802
  },
  {
    id: "amendoeira-da-praia",
    name: "Amendoeira-da-praia",
    scientificName: "Terminalia catappa",
    family: "Combretaceae",
    origin: "Ásia Tropical",
    biome: "Litorâneo",
    thumbnailUrl: "https://images.squarespace-cdn.com/content/v1/5bacb83e809d8e12a0e172eb/1544096435735-CP54WD3XN6W8DV9PNXZI/T.cattapa.jpg",
    imageUrl: "https://images.squarespace-cdn.com/content/v1/5bacb83e809d8e12a0e172eb/1544096435735-CP54WD3XN6W8DV9PNXZI/T.cattapa.jpg",
    characteristics: "Árvore de copa larga e horizontalizada, com folhas grandes que ficam avermelhadas antes de cair.",
    ecologicalImportance: ["Oferece ampla sombra.", "Os frutos são dispersos pela água."],
    curbsideNotes: ["As amêndoas do fruto são comestíveis.", "É muito utilizada em arborização urbana costeira."],
    blocks: ["bloco-t"],
    lat: -3.7681,
    lng: -38.4805
  },
  {
    id: "cajueiro",
    name: "Cajueiro",
    scientificName: "Anacardium occidentale",
    family: "Anacardiaceae",
    origin: "Nativo do Brasil",
    biome: "Caatinga e Cerrado",
    thumbnailUrl: "https://ars.els-cdn.com/content/image/3-s2.0-B9780128031384000125-f12-01-9780128031384.jpg",
    imageUrl: "https://ars.els-cdn.com/content/image/3-s2.0-B9780128031384000125-f12-01-9780128031384.jpg",
    characteristics: "Árvore de tronco tortuoso com madeira leve. O verdadeiro fruto é a castanha, enquanto o caju é um pseudofruto.",
    ecologicalImportance: ["Importante para a fauna local como fonte de alimento.", "Espécie pioneira em áreas de dunas."],
    curbsideNotes: ["O Brasil é um dos maiores produtores de castanha de caju.", "A produção de suco de caju é muito forte no Nordeste."],
    blocks: ["bloco-t"]
  },
  {
    id: "bromelia-porto-seguro",
    name: "Bromélia Porto Seguro",
    scientificName: "Aechmea blanchetiana",
    family: "Bromeliaceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: "https://levypreserve.org/wp-content/uploads/2024/05/Aechmea-blanchetiana-whole-plant-scaled.jpg",
    imageUrl: "https://levypreserve.org/wp-content/uploads/2024/05/Aechmea-blanchetiana-whole-plant-scaled.jpg",
    characteristics: "Planta herbácea com folhas coriáceas dispostas em roseta, de cor amarelada a alaranjada sob sol pleno.",
    ecologicalImportance: ["Acumula água no centro, servindo de habitat para pequenos animais.", "Atrai beija-flores para polinização."],
    curbsideNotes: ["Muito resistente ao sol direto.", "A inflorescência pode durar meses."],
    blocks: ["bloco-t"]
  },
  {
    id: "coromandel",
    name: "Coromandel",
    scientificName: "Asystasia gangetica",
    family: "Acanthaceae",
    origin: "África e Ásia",
    biome: "Tropical",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Planta de crescimento rápido, com flores tubulares em tons de branco ou violeta. Pode ser usada como forração.",
    ecologicalImportance: ["Importante para borboletas.", "Atrai abelhas melíferas."],
    curbsideNotes: ["Considerada invasora em algumas regiões.", "Floresce quase o ano todo."],
    blocks: ["bloco-t"]
  },
  {
    id: "lacre-comum",
    name: "Lacre comum",
    scientificName: "Ixora chinensis",
    family: "Rubiaceae",
    origin: "China e Malásia",
    biome: "Tropical",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Arbusto perene com inflorescências densas de cor laranja a vermelha. Muito apreciada no paisagismo tropical.",
    ecologicalImportance: ["Fonte de néctar para beija-flores.", "Atrai diversos insetos úteis."],
    curbsideNotes: ["Gosta de sol pleno.", "As flores atraem borboletas."],
    blocks: ["bloco-t"]
  },
  {
    id: "paineira",
    name: "Paineira",
    scientificName: "Ceiba speciosa",
    family: "Malvaceae",
    origin: "Brasil e Argentina",
    biome: "Mata Atlântica e Cerrado",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Árvore de grande porte com tronco munido de aculeos (espinhos), famoso pela produção de 'paina'.",
    ecologicalImportance: ["O algodão da paina ajuda na dispersão de sementes.", "Flores são visitadas por morcegos e pássaros."],
    curbsideNotes: ["O tronco armazena água.", "Suas flores rosas são muito ornamentais."],
    blocks: ["bloco-t"]
  },
  {
    id: "ipe-peroba",
    name: "Ipê Peroba",
    scientificName: "Handroanthus roseo-albus",
    family: "Bignoniaceae",
    origin: "Nativo do Brasil",
    biome: "Mata Atlântica e Cerrado",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Árvore de madeira nobre com floração branca intensa que ocorre logo após o Ipê Amarelo.",
    ecologicalImportance: ["Fonte de pólen para abelhas silvestres.", "Ajuda na regeneração de matas."],
    curbsideNotes: ["Altamente valorizada na marcenaria.", "Possui crescimento moderado."],
    blocks: ["bloco-t"]
  },
  {
    id: "pau-brasil",
    name: "Pau-Brasil",
    scientificName: "Paubrasilia echinata",
    family: "Fabaceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Árvore histórica que deu nome ao Brasil, conhecida pela resina avermelhada extraída de seu tronco cor de brasa.",
    ecologicalImportance: ["Árvore símbolo nacional.", "Importante para biodiversidade da Mata Atlântica."],
    curbsideNotes: ["Ameaçada de extinção.", "A madeira é usada hoje para arcos de violino de luxo."],
    blocks: ["bloco-t"]
  },
  {
    id: "munguba",
    name: "Munguba",
    scientificName: "Pachira aquatica",
    family: "Malvaceae",
    origin: "Américas Central e do Sul",
    biome: "Amazônia",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Também conhecida como castanha-do-maranhão, tem folhas digitadas e flores grandes de estames brancos.",
    ecologicalImportance: ["As sementes são comestíveis por peixes em áreas alagadas.", "Importante para fauna de beira de rio."],
    curbsideNotes: ["Muito decorativa como 'Money Tree'.", "As sementes torradas lembram o gosto de cacau."],
    blocks: ["bloco-t"]
  },
  {
    id: "dracena-vermelha",
    name: "Dracena vermelha",
    scientificName: "Cordyline fruticosa",
    family: "Asparagaceae",
    origin: "Sudeste Asiático e Oceania",
    biome: "Tropical",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Planta arbustiva de folhas coloridas, variando do verde ao vermelho vibrante. Muito usada em jardins tropicais.",
    ecologicalImportance: ["Fornece abrigo para pequenos insetos.", "Planta ornamental resistente."],
    curbsideNotes: ["Considerada sagrada em algumas culturas da Polinésia.", "Muito fácil de propagar por estacas."],
    blocks: ["bloco-t"]
  },
  {
    id: "filodendro-ondulado",
    name: "Filodendro-ondulado",
    scientificName: "Philodendron undulatum",
    family: "Araceae",
    origin: "Nativo da América do Sul",
    biome: "Cerrado e Mata Atlântica",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Arbusto ou trepadeira com folhas grandes, coriáceas e com margens graciosamente onduladas.",
    ecologicalImportance: ["Ajuda a manter a umidade do microclima.", "Planta de sub-bosque que tolera sombra."],
    curbsideNotes: ["Pode ser cultivado em vasos grandes.", "Resiliente e de baixa manutenção."],
    blocks: ["bloco-t"]
  },
  {
    id: "jacaranda-boca-de-sapo",
    name: "Jacarandá-boca-de-sapo",
    scientificName: "Jacaranda brasiliana",
    family: "Bignoniaceae",
    origin: "Nativo do Brasil",
    biome: "Cerrado",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Árvore de floração roxa-azulada. Recebe esse nome pelo formato característico de seus frutos lenhosos.",
    ecologicalImportance: ["Atrai polinizadores específicos na estação seca.", "Faz parte da rica flora do Cerrado."],
    curbsideNotes: ["Os frutos parecem bocas de sapo quando abertos.", "É menos comum que o Jacarandá Mimoso nas cidades."],
    blocks: ["bloco-t"]
  },
  {
    id: "philodendron-imbe",
    name: "Philodendro cara de cabala",
    scientificName: "Philodendron imbe",
    family: "Araceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Planta trepadeira com folhas alongadas que lembram o rosto de um cavalo (ou 'cabala' no popular).",
    ecologicalImportance: ["Usa árvores como suporte sem ser parasita (epífita).", "Importante componente de matas úmidas."],
    curbsideNotes: ["Popular em decoração de interiores.", "Suas raízes aéreas buscam umidade."],
    blocks: ["bloco-t"]
  },
  {
    id: "palmeira-fenix",
    name: "Palmeira fênix",
    scientificName: "Phoenix roebelenii",
    family: "Arecaceae",
    origin: "Laos e Vietnã",
    biome: "Tropical",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Pequena palmeira de crescimento lento, com tronco fino e folhas delicadas em arco.",
    ecologicalImportance: ["Produz pequenos frutos que atraem pássaros.", "Muito resistente em solos urbanos."],
    curbsideNotes: ["Também chamada de Palmeira Anã.", "Possui pequenos espinhos na base das folhas."],
    blocks: ["bloco-t"]
  },
  {
    id: "eucalipto",
    name: "Eucalipto",
    scientificName: "Eucalyptus sp.",
    family: "Myrtaceae",
    origin: "Austrália",
    biome: "Temperado/Tropical",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Árvore de rápido crescimento com aroma característico e folhas ricas em óleos essenciais.",
    ecologicalImportance: ["Grande sequestrador de carbono.", "Utilizado em reflorestamentos industriais."],
    curbsideNotes: ["Existem mais de 700 espécies.", "Folhas são usadas em óleos medicinais."],
    blocks: ["bloco-t"]
  },
  {
    id: "angico",
    name: "Angico",
    scientificName: "Anadenanthera colubrina",
    family: "Fabaceae",
    origin: "Nativo da América do Sul",
    biome: "Caatinga e Cerrado",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Árvore rústica de tronco rugoso com madeira de alta densidade. Muito comum no interior brasileiro.",
    ecologicalImportance: ["Árvore pioneira muito resistente.", "Sementes são alimento para fauna silvestre."],
    curbsideNotes: ["A casca é rica em tanino.", "Usada tradicionalmente para curumearia."],
    blocks: ["bloco-t"]
  },
  {
    id: "palmeira-rabo-de-peixe",
    name: "Palmeira rabo de peixe",
    scientificName: "Caryota urens",
    family: "Arecaceae",
    origin: "Sul da Ásia",
    biome: "Tropical",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Palmeira exótica com folíolos que lembram a barbatana de um peixe. Muito imponente no paisagismo.",
    ecologicalImportance: ["Atrai morcegos e pássaros frugívoros.", "Habitat para diversos animais tropicais."],
    curbsideNotes: ["Morre após uma única e longa floração (monocárpica).", "Os frutos podem causar irritação na pele se manuseados."],
    blocks: ["bloco-t"]
  },
  {
    id: "cassia-chuva-de-ouro",
    name: "Cássia chuva de ouro",
    scientificName: "Cassia fistula",
    family: "Fabaceae",
    origin: "Sudeste Asiático",
    biome: "Tropical",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Árvore de médio porte que se cobre de cachos pendentes de flores amarelas muiros vistosas.",
    ecologicalImportance: ["Atrai abelhas grandes e pássaros.", "Ajuda na melhoria da estética urbana."],
    curbsideNotes: ["As flores parecem lanternas amarelas.", "É a árvore símbolo da Tailândia."],
    blocks: ["bloco-t"]
  },
  {
    id: "espirradeira",
    name: "Espirradeira",
    scientificName: "Nerium oleander",
    family: "Apocynaceae",
    origin: "Região do Mediterrâneo",
    biome: "Mediterrâneo",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Arbusto de flores rosas, brancas ou vermelhas. Muito resistente à seca, porém extremamente tóxico se ingerido.",
    ecologicalImportance: ["Planta melífera.", "Atrai borboletas monarca."],
    curbsideNotes: ["Apenas para fins ornamentais, requer cuidado extremo.", "Suporta alta salinidade."],
    blocks: ["bloco-t"]
  },
  {
    id: "ipe-amarelo",
    name: "Ipê Amarelo",
    scientificName: "Tabebuia aurea",
    family: "Bignoniaceae",
    origin: "Brasil",
    biome: "Cerrado",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Árvore de beleza única, símbolo da caatinga e cerrado em sua floração seca e amarela.",
    ecologicalImportance: ["Polinização ativa por abelhas silvestres.", "Dispersão das sementes pelo vento (anemocoria)."],
    curbsideNotes: ["Floresce quando está sem nenhuma folha.", "Muito usada em praças e calçadas."],
    blocks: ["bloco-t"]
  },
  {
    id: "buganvilia",
    name: "Buganvília",
    scientificName: "Bougainvillea glabra",
    family: "Nyctaginaceae",
    origin: "Nativo do Brasil",
    biome: "Cerrado e Mata Atlântica",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Arbusto ou trepadeira de flores pequenas e brancas, protegidas por cores chamativas que são na verdade folhas modificadas (brácteas).",
    ecologicalImportance: ["Atrai insetos polinizadores.", "Proporciona cor intensa em áreas urbanas."],
    curbsideNotes: ["Também chamada de Primavera ou Três-Marias.", "Muito resistente ao calor intenso."],
    blocks: ["bloco-t"]
  },
  {
    id: "agave",
    name: "Agave",
    scientificName: "Agave americana",
    family: "Asparagaceae",
    origin: "México",
    biome: "Árido",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Planta suculenta de folhas longas e pontiagudas, forma uma roseta gigante que pode chegar a metros de diâmetro.",
    ecologicalImportance: ["Habitat para insetos especialistas.", "Resistente a incêndios natual."],
    curbsideNotes: ["Floresce apenas uma vez e depois morre.", "De algumas espécies se extrai fibras."],
    blocks: ["bloco-t"]
  },
  {
    id: "palmeira-imperial",
    name: "Palmeira imperial",
    scientificName: "Roystonea oleracea",
    family: "Arecaceae",
    origin: "Américas Central e do Sul",
    biome: "Tropical",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Palmeira de troncos lisos e cilíndricos, majestosa, atingindo até 40 metros de altura.",
    ecologicalImportance: ["Importante para pássaros de grande porte.", "Símbolo de imponência no paisagismo histórico."],
    curbsideNotes: ["Introduzida no Brasil no Jardim Botânico do RJ em 1809.", "Muito usada em alamedas de entrada."],
    blocks: ["bloco-t"]
  },
  {
    id: "wedelia",
    name: "Wedelia",
    scientificName: "Sphagneticola trilobata",
    family: "Asteraceae",
    origin: "Brasil e Américas",
    biome: "Restinga e Mata Atlântica",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Forração resistente com pequenas flores amarelas semelhantes a margaridas.",
    ecologicalImportance: ["Ajudam no controle da erosão do solo.", "Atraem pequenos polinizadores."],
    curbsideNotes: ["Cresce de forma muito agressiva.", "Suporta bem o pisoteio leve."],
    blocks: ["bloco-t"]
  },
  {
    id: "alamanda",
    name: "Alamanda",
    scientificName: "Allamanda cathartica",
    family: "Apocynaceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Trepadeira vigorosa de flores amarelas grandes em formato de trombeta.",
    ecologicalImportance: ["Atrai diversas borboletas.", "Excelente para cobrir cercas e muros."],
    curbsideNotes: ["Possui látex tóxico se manuseado sem luvas.", "Exige pleno sol para florescer bem."],
    blocks: ["bloco-t"]
  },
  {
    id: "macaubeira",
    name: "Macaubeira",
    scientificName: "Acrocomia aculeata",
    family: "Arecaceae",
    origin: "Américas",
    biome: "Cerrado",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Palmeira de tronco espinhoso com madeira e óleo de alta qualidade.",
    ecologicalImportance: ["Fruto amado por Araras e papagaios.", "Semente rica em óleo."],
    curbsideNotes: ["O coco da macaúba é comestível.", "Considerada o 'ouro do cerrado'."],
    blocks: ["bloco-t"]
  },
  {
    id: "palmeira-havai",
    name: "Palmeira havaí",
    scientificName: "Veitchia merrillii",
    family: "Arecaceae",
    origin: "Filipinas",
    biome: "Tropical",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Palmeira de pequeno porte com frutinhos vermelhos em cachos pendentes.",
    ecologicalImportance: ["Pequenos pássaros comem os frutos.", "Ornamental e refinado."],
    curbsideNotes: ["Também chamada de Palmeira de Natal.", "Chega a 5-8 metros no máximo."],
    blocks: ["bloco-t"]
  },
  {
    id: "grama-esmeralda",
    name: "Grama esmeralda",
    scientificName: "Zoysia japonica",
    family: "Poaceae",
    origin: "Ásia",
    biome: "Temperado/Tropical",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Grama de folhas estreitas e cor verde intenso, forma um tapete denso.",
    ecologicalImportance: ["Retém nutrientes no solo.", "Ideal para conter encostas contra erosão."],
    curbsideNotes: ["A mais vendida do Brasil.", "Exige pouco corte comparado a outras."],
    blocks: ["bloco-t"]
  },
  {
    id: "grama-japonesa",
    name: "Grama japonesa",
    scientificName: "Zoysia tenuifolia",
    family: "Poaceae",
    origin: "Ásia e Oceania",
    biome: "Litorâneo/Tropical",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Grama de folhas finíssimas e macias, com crescimento irregular formando montinhos (bolas).",
    ecologicalImportance: ["Usa menos água e fertilizante.", "Estética de jardins zen japonês."],
    curbsideNotes: ["Também chamada de Grama Coreana.", "Muito macia ao toque (pisar descalço)."],
    blocks: ["bloco-t"]
  },
  {
    id: "flamboia",
    name: "Flamboiã",
    scientificName: "Delonix regia",
    family: "Fabaceae",
    origin: "Madagáscar",
    biome: "Tropical",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Possui floração extraordinária em tons de vermelha e laranja intenso, com copa frondosa.",
    ecologicalImportance: ["Sombra densa.", "Polinização ativa."],
    curbsideNotes: ["Suas raízes superficiais requerem espaço.", "As flores caídas formam um tapete colorido."],
    blocks: ["bloco-t"]
  },
  {
    id: "chicha-do-para",
    name: "Chichá do Pará",
    scientificName: "Sterculia apetala",
    family: "Malvaceae",
    origin: "Nativo da América Central e do Sul",
    biome: "Tropical",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Árvore de tronco reto e copa larga, produz frutos que contêm castanhas comestíveis.",
    ecologicalImportance: ["Fonte de gordura boa para fauna local.", "Semente dispersa naturally por aves."],
    curbsideNotes: ["O tronco reto é bom para construções navais simples.", "As castanhas lembram amendoim."],
    blocks: ["bloco-t"]
  },
  {
    id: "pacavira",
    name: "Pacavira",
    scientificName: "Heliconia psittacorum",
    family: "Heliconiaceae",
    origin: "Brasil",
    biome: "Mata Atlântica",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Planta herbácea com inflorescências que lembram bicos de papagaio, mantendo as cores por longo tempo.",
    ecologicalImportance: ["Polinização exclusiva por certos beija-flores.", "Satura as bordas das matas com cor."],
    curbsideNotes: ["Ideal para vasos e bordaduras.", "Também chamada de Heliconia-papagaio."],
    blocks: ["bloco-t"]
  },
  {
    id: "sombreiro",
    name: "Sombreiro",
    scientificName: "Clitoria fairchildiana",
    family: "Fabaceae",
    origin: "Nativo do Brasil (Amazônia)",
    biome: "Amazônia",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Árvore de sombra muito densa, com flores de cor lilás e roxas em formato de borboleta.",
    ecologicalImportance: ["Atrai grandes abelhas polinizadoras.", "Espécie regeneradora de solos."],
    curbsideNotes: ["A copa é tão fechada que mal passa luz.", "Crescimento rápido."],
    blocks: ["bloco-t"]
  },
  {
    id: "pinheiro",
    name: "Pinheiro",
    scientificName: "Pinus sp.",
    family: "Pinaceae",
    origin: "Hemisfério Norte",
    biome: "Temperado",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Possui folhas aciculares (agulhas) e sementes em cones (pinhas). Madeira leve e resinosa.",
    ecologicalImportance: ["Importante em áreas de clima frio.", "Seus cones protegem as sementes."],
    curbsideNotes: ["O pinhão é semente de outra árvore (Araucária).", "Gera acícula no solo, acidificando."],
    blocks: ["bloco-t"]
  },
  {
    id: "jiboia",
    name: "Jiboia",
    scientificName: "Epipremnum aureum",
    family: "Araceae",
    origin: "Ilhas Salomão",
    biome: "Tropical",
    thumbnailUrl: TRANSPARENT_PIXEL,
    imageUrl: TRANSPARENT_PIXEL,
    characteristics: "Planta trepadeira muito resistente, com folhas em formato de coração e variegação amarelada.",
    ecologicalImportance: ["Ajuda na purificação do ar.", "Cobertura vegetal em florestas tropicais."],
    curbsideNotes: ["Muito fácil de cuidar em ambientes internos.", "Pode tornar-se invasora em climas favoráveis."],
    blocks: ["bloco-t"]
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
