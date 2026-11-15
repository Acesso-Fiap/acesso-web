export const station = {
  name: "Trianon–Masp",
  coordinates: [-23.5631, -46.6544],
  address: "Av. Paulista, s/n, em frente ao nº 1485",
  hours: "Todos os dias, das 4h40 à meia-noite",
  url: "https://www.metro.sp.gov.br/pt_BR/sua-viagem/linhas-estacoes/linha-2-verde/estacao-trianon-masp/",
};
export const features = [
  { id: "stepFree", label: "Acesso com rampa" },
  { id: "toilet", label: "Banheiro acessível" },
  { id: "elevator", label: "Elevador" },
  { id: "menu", label: "Cardápio acessível" },
];
export const places = [
  {
    id: "masp",
    name: "MASP",
    category: "Cultura",
    number: "01",
    address: "Av. Paulista, 1578",
    coordinates: [-23.561859, -46.6557222],
    routeNote:
      "Chegada de referência na calçada da Avenida Paulista, junto ao MASP; não representa a localização de uma entrada acessível.",
    visual: "museum",
    description:
      "Arte, arquitetura e novas perspectivas no coração da Paulista.",
    resources: {
      stepFree: "institution",
      toilet: "institution",
      elevator: "institution",
      menu: "unknown",
    },
    detail:
      "O MASP oferece elevadores, sanitários acessíveis e cadeiras de rodas. Há recursos de mediação com Libras e audiodescrição, textos ampliados, lupas e abafadores. Cães-guia são permitidos.",
    checked: "11/11/2026",
    hours:
      "Terça: 10h–20h; quarta, quinta, sábado e domingo: 10h–18h; sexta: 10h–21h. Fechado às segundas.",
    contact: "acessibilidade@masp.org.br",
    contactUrl: "mailto:acessibilidade@masp.org.br",
    visit:
      "Pessoas com deficiência e um acompanhante têm gratuidade. Consulte a bilheteria para orientações de ingresso e solicite visitas acessíveis pelo e-mail do museu.",
    resourceNotes: {
      stepFree:
        "O cadastro MuseusBr registra rampa de acesso; não descreve um percurso contínuo desde a estação.",
      toilet: "Sanitários acessíveis informados pelo museu.",
      elevator: "Elevadores nos espaços de visitação.",
      menu: "As fontes consultadas não descrevem cardápio em braille ou compatibilidade com leitor de tela do restaurante.",
    },
    sources: [
      {
        label: "MASP — acessibilidade e gratuidade",
        url: "https://masp.org.br/gratuidadeparagrupos",
      },
      { label: "MASP — horários e visita", url: "https://masp.org.br/visite" },
      {
        label: "MuseusBr — recursos de acesso",
        url: "https://cadastro.museus.gov.br/museus/masp-museu-de-arte-de-sao-paulo-assis-chateaubriand/",
      },
    ],
  },
  {
    id: "trianon",
    name: "Parque Trianon",
    category: "Ao ar livre",
    number: "02",
    address: "Rua Peixoto Gomide, 949",
    coordinates: [-23.5634, -46.6577],
    visual: "park",
    description: "Uma pausa verde entre os caminhos e encontros da cidade.",
    resources: {
      stepFree: "institution",
      toilet: "institution",
      elevator: "na",
      menu: "unknown",
    },
    detail:
      "A Prefeitura informa rampa, sanitários, equipamentos de ginástica e áreas de circulação acessíveis. A ata da CPA de 21/01/2026 registra denúncia sobre acessibilidade e intervenções em aprovação, incluindo o piso em mosaico português. Esse registro não comprova a conclusão das obras nem o estado atual do piso.",
    checked: "11/11/2026",
    hours: "Todos os dias, das 6h às 18h.",
    contact: "(11) 3253-4973 / (11) 3289-2160",
    contactUrl: "tel:+551132534973",
    visit:
      "Entrada gratuita. Para informações sobre o portão com rampa e as condições dos caminhos, o canal publicado é a administração do parque.",
    resourceNotes: {
      stepFree:
        "Rampa publicada pela Prefeitura; a página não identifica o portão específico.",
      toilet: "Sanitários acessíveis constam na descrição municipal.",
      elevator:
        "Não se aplica aos recursos de visitação cadastrados para este parque.",
      menu: "A página do parque não publica informações sobre cardápios acessíveis.",
    },
    sources: [
      {
        label: "Prefeitura — estrutura, horários e contato",
        url: "https://prefeitura.sp.gov.br/web/meio_ambiente/w/parques/regiao_centrooeste/5773",
      },
      {
        label: "CPA — ata de 21/01/2026, páginas 3–4",
        url: "https://www2.prefeitura.sp.gov.br/documents/d/pessoa_com_deficiencia/ata-cpa-02-2026-21-01-26-pdf",
      },
    ],
  },
  {
    id: "shopping",
    name: "Shopping Cidade São Paulo",
    category: "Comércio",
    number: "03",
    address: "Av. Paulista, 1230",
    coordinates: [-23.563, -46.6525],
    visual: "shopping",
    description:
      "Serviços e possibilidades para incluir no seu dia pela região.",
    resources: {
      stepFree: "unknown",
      toilet: "institution",
      elevator: "unknown",
      menu: "unknown",
    },
    detail:
      "Há sanitários acessíveis em todos os pisos e empréstimo de cadeiras de rodas manuais e motorizadas no 1º subsolo. Abafadores de ruído são disponibilizados no SAC, no piso -1. Solicite apoio à equipe de segurança.",
    checked: "11/11/2026",
    hours:
      "Lojas: segunda a sábado, 10h–22h; domingos e feriados, 12h–18h. Alimentação: todos os dias, 11h–22h.",
    contact: "SAC: (11) 98695-0124, das 10h às 22h",
    contactUrl: "https://wa.me/5511986950124",
    visit:
      "Entradas de pedestres publicadas: Avenida Paulista, Rua Pamplona e Rua São Carlos do Pinhal. O número 627 da São Carlos do Pinhal é o acesso de veículos, não a indicação de uma porta acessível para pedestres.",
    resourceNotes: {
      stepFree:
        "A página Como chegar lista as três ruas de acesso, sem descrever degraus ou rampas de cada porta.",
      toilet: "Sanitários acessíveis em todos os pisos.",
      elevator:
        "As páginas consultadas não detalham localização ou condições de uso dos elevadores públicos.",
      menu: "Não há confirmação geral de cardápios acessíveis; as condições variam por restaurante.",
    },
    sources: [
      {
        label: "Shopping — serviços de acessibilidade e SAC",
        url: "https://shoppingcidadesp.com.br/servicos/",
      },
      {
        label: "Shopping — entradas e horários",
        url: "https://shoppingcidadesp.com.br/como-chegar/",
      },
    ],
  },
];
export const statusLabels = {
  institution: "Informado pela instituição",
  unknown: "Não informado nas fontes",
  na: "Não se aplica",
};

export const legacyReports = [
  {
    placeId: "shopping",
    type: "Calçada e travessia",
    description: "Boa calçada para deficientes visuais",
    observedAt: "2026-11-12",
    id: "legacy-1",
    verification: "community",
    canEdit: false,
    legacy: true,
  },
];
