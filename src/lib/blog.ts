export const BLOG_BASE = 'https://www.drahelemmachado.com.br';

export type BlogBlock =
  | { type: 'answer'; text: string }
  | { type: 'h2'; id: string; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'cta' };

export type BlogFaq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  keywords: string[];
  category: string;
  categorySlug: string;
  excerpt: string;
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  image: { src: string; alt: string };
  faqs: BlogFaq[];
  references?: string[];
  blocks: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'menopausa-fogachos-o-que-fazer',
    title: 'Menopausa e fogachos: por que acontecem e o que realmente ajuda',
    metaTitle: 'Fogachos na menopausa: causas e o que ajuda | Dra. Hélem',
    metaDesc: 'Entenda por que os fogachos acontecem na menopausa, o que piora, quando investigar e quais estratégias médicas e de estilo de vida podem ajudar.',
    keywords: ['fogachos menopausa', 'calor menopausa', 'menopausa tratamento', 'climatério sintomas'],
    category: 'Saúde da Mulher',
    categorySlug: 'saude-da-mulher',
    excerpt: 'Fogachos não são “normais e pronto”. Entenda o mecanismo hormonal, gatilhos comuns e o caminho de investigação para recuperar bem-estar com segurança.',
    datePublished: '2026-03-10',
    dateModified: '2026-09-01',
    readingMinutes: 7,
    image: { src: '/images/hormonio-mulher.webp', alt: 'Saúde da mulher e equilíbrio hormonal' },
    faqs: [
      { q: 'Fogacho toda noite é normal na menopausa?', a: 'É comum, mas não deve ser ignorado. Suor noturno frequente atrapalha sono, humor e metabolismo e merece investigação de causa, gatilhos e opções de manejo individualizadas.' },
      { q: 'Reposição hormonal é obrigatória para tratar fogachos?', a: 'Não. A indicação depende de histórico, risco, intensidade dos sintomas e preferência da paciente. Há casos com boa resposta a ajustes de estilo de vida e outros com indicação de terapia hormonal bem acompanhada.' },
      { q: 'Quanto tempo duram os fogachos?', a: 'Varia muito. Em algumas mulheres duram meses; em outras, anos. Acompanhamento ajuda a reduzir frequência e intensidade e a proteger sono e saúde óssea/cardiometabólica no período.' },
    ],
    references: [
      'Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO) — Manual de Orientação em Climatério e Menopausa.',
      'The Endocrine Society — Clinical Practice Guideline: Treatment of Symptoms of the Menopause.',
      'Colégio Brasileiro de Medicina do Estilo de Vida (CBMEV) — Diretrizes em Mudança de Estilo de Vida e Longevidade Saudável.',
    ],
    blocks: [
      { type: 'answer', text: 'Fogachos na menopausa acontecem pela oscilação e queda de estrogênio, que desregula o termostato do cérebro (hipotálamo). Gatilhos como álcool, cafeína, noites mal dormidas, estresse e ambientes quentes pioram. O manejo combina investigação (histórico, comorbidades, exames quando indicados), ajustes de estilo de vida e, se houver indicação, terapia hormonal individualizada — sempre com acompanhamento médico.' },
      { type: 'h2', id: 'por-que-acontece', text: 'Por que o calor vem do nada?' },
      { type: 'p', text: 'No climatério, o ovário reduz a produção de estrogênio de forma irregular. O hipotálamo — que controla temperatura — passa a interpretar variações pequenas como “superaquecimento” e dispara vasodilatação e suor para esfriar. Não é frescura nem falta de força de vontade: é fisiologia.' },
      { type: 'h2', id: 'gatilhos', text: 'Gatilhos que pioram (e valem ajuste)' },
      { type: 'list', items: ['Álcool e refeições muito volumosas à noite', 'Cafeína em excesso e pouca hidratação', 'Estresse sustentado e privação de sono', 'Ambiente abafado, roupas sintéticas e banhos muito quentes', 'Tabagismo — agrava sintomas vasomotores e risco cardiometabólico'] },
      { type: 'h2', id: 'quando-investigar', text: 'Quando investigar além do “é da idade”' },
      { type: 'p', text: 'Se os fogachos vieram com ganho de peso rápido, alteração de humor importante, palpitações, queda de libido, secura vaginal ou exames já alterados (glicemia, tireoide, fígado), vale avaliação integral. Menopausa não apaga outras causas — tireoide, anemia, ansiedade e medicamentos também podem contribuir.' },
      { type: 'quote', text: 'A queixa “tenho calor e não durmo” raramente é só calor. É sono fragmentado, recuperação hormonal prejudicada e, com o tempo, mais irritabilidade, compulsão alimentar e cansaço diurno.' },
      { type: 'h2', id: 'o-que-ajuda', text: 'O que realmente ajuda' },
      { type: 'list', items: ['Rotina de sono com horário regular, quarto fresco e escuro e limite de telas à noite', 'Atividade física aeróbica + força: melhora termorregulação, humor e sensibilidade à insulina', 'Alimentação com proteína adequada, fibras e menos ultraprocessados — estabilidade glicêmica reduz gatilhos', 'Manejo de estresse (respiração, pausas, terapia quando indicado) e redução de álcool/cafeína', 'Avaliação médica para definir se terapia hormonal, não hormonal ou combinação é o melhor caminho no seu caso'] },
      { type: 'h2', id: 'quando-procurar', text: 'Quando procurar atendimento' },
      { type: 'p', text: 'Se os episódios são diários, atrapalham trabalho e sono, vieram com sangramento irregular, dor, ou se você tem histórico familiar de câncer hormônio-dependente, trombose ou doença cardiovascular, não adie a consulta. Decisão sobre hormônios exige análise de risco-benefício individual — feita em consulta, não por protocolo genérico.' },
      { type: 'cta' },
    ],
  },
  {
    slug: 'testosterona-baixa-sintomas-homens',
    title: 'Testosterona baixa em homens: sintomas, causas e quando investigar',
    metaTitle: 'Testosterona baixa: sintomas em homens | Dra. Hélem',
    metaDesc: 'Cansaço, queda de libido e perda de força podem ter relação com testosterona baixa. Veja sintomas, causas e como é a investigação médica.',
    keywords: ['testosterona baixa sintomas', 'andropausa', 'saúde do homem', 'cansaço homem'],
    category: 'Saúde do Homem',
    categorySlug: 'saude-do-homem',
    excerpt: 'Queda de energia, libido e desempenho não são “só idade”. Entenda sinais de testosterona baixa e o passo a passo de uma investigação responsável.',
    datePublished: '2026-03-18',
    dateModified: '2026-09-01',
    readingMinutes: 6,
    image: { src: '/images/hormonio-homem.webp', alt: 'Saúde do homem e andropausa' },
    faqs: [
      { q: 'Todo homem com cansaço precisa repor testosterona?', a: 'Não. Cansaço tem muitas causas — sono, estresse, tireoide, anemia, depressão, medicamentos. A dosagem e a interpretação clínica definem se há deficiência real e se há indicação e segurança para reposição.' },
      { q: 'Reposição de testosterona causa infertilidade?', a: 'Pode reduzir fertilidade durante o uso, porque inibe a produção natural. Homens com desejo de paternidade próximo precisam discutir alternativas e planejamento com o médico.' },
      { q: 'Exame de testosterona precisa ser em jejum e de manhã?', a: 'Sim, idealmente pela manhã (pico fisiológico) e com orientação prévia. A interpretação considera horário, sintomas, exames associados e repetição quando necessário.' },
    ],
    references: [
      'Sociedade Brasileira de Endocrinologia e Metabologia (SBEM) — Posicionamento sobre Reposição de Testosterona no Hipogonadismo Masculino.',
      'American Urological Association (AUA) — Identification and Management of Testosterone Deficiency Guideline.',
      'European Association of Urology (EAU) — Guidelines on Sexual and Reproductive Health: Male Hypogonadism.',
    ],
    blocks: [
      { type: 'answer', text: 'Testosterona baixa pode causar cansaço persistente, queda de libido, dificuldade de ganhar massa muscular, aumento de gordura abdominal, humor mais irritável e sono pior. Nem todo sintoma é hormonal — por isso a investigação inclui histórico completo, exame físico e exames laboratoriais bem indicados. Reposição só tem indicação quando há sintomas + comprovação laboratorial + avaliação de risco-benefício.' },
      { type: 'h2', id: 'sinais', text: 'Sinais que merecem atenção' },
      { type: 'list', items: ['Queda de libido e de ereções matinais', 'Cansaço que não melhora com descanso e piora à tarde', 'Perda de força, dificuldade de hipertrofia e acúmulo de gordura visceral', 'Humor mais “curto”, motivação baixa e sono não reparador', 'Queda de pelos, ondas de calor ou ginecomastia em alguns casos'] },
      { type: 'h2', id: 'causas', text: 'Causas além da idade' },
      { type: 'p', text: 'A partir dos 30–40 anos há queda gradual, mas estilo de vida pesa muito: privação de sono, estresse crônico, excesso de álcool, obesidade, apneia do sono, uso de opioides ou corticoides e doenças como diabetes e hipotireoidismo. Tratar a base muda o prognóstico — às vezes mais do que repor hormônio isoladamente.' },
      { type: 'h2', id: 'como-investigar', text: 'Como é a investigação séria' },
      { type: 'list', items: ['Consulta com linha do tempo: quando começou, o que piora/melhora, medicamentos e hábitos', 'Exame físico e rastreio de apneia, depressão e síndrome metabólica', 'Laboratório direcionado (testosterona total/livre, LH/FSH, prolactina, TSH, glicemia, perfil lipídico e outros quando indicados)', 'Reavaliação e correlação clínica — número isolado não define tratamento'] },
      { type: 'quote', text: 'Número sem contexto vira atalho perigoso. Sintoma + exame + contexto + risco individual é o que sustenta uma decisão segura.' },
      { type: 'h2', id: 'estilo-de-vida', text: 'O que melhora antes (ou junto) de qualquer reposição' },
      { type: 'list', items: ['Sono de 7–8h com regularidade e tratamento de ronco/apneia quando houver', 'Treino de força 2–3×/semana + aeróbico — estímulo direto à composição corporal', 'Perda de gordura visceral: melhora testosterona endógena e sensibilidade à insulina', 'Redução de álcool, manejo de estresse e revisão de medicações com o prescritor'] },
      { type: 'h2', id: 'quando-considerar', text: 'Quando considerar terapia' },
      { type: 'p', text: 'Quando há deficiência confirmada, sintomas compatíveis e ausência de contraindicações, a terapia de reposição pode ser discutida com metas claras, acompanhamento e monitoramento de próstata, hematócrito e resposta clínica. Sem acompanhamento, o risco supera o benefício.' },
      { type: 'cta' },
    ],
  },
  {
    slug: 'gordura-no-figado-esteatose-tem-reversao',
    title: 'Gordura no fígado (esteatose): tem reversão? O que fazer agora',
    metaTitle: 'Gordura no fígado tem reversão? Esteatose | Dra. Hélem',
    metaDesc: 'Esteatose hepática tem reversão em muitos casos quando a causa é tratada cedo. Veja o que é, por que acontece e o plano de manejo.',
    keywords: ['gordura no fígado', 'esteatose hepática reversão', 'fígado gorduroso tratamento', 'pré-diabetes'],
    category: 'Saúde Metabólica',
    categorySlug: 'saude-metabolica',
    excerpt: 'Recebeu “esteatose leve” no ultrassom e ficou sem orientação? Entenda por que acontece, quando preocupa e o plano prático para reverter.',
    datePublished: '2026-04-02',
    dateModified: '2026-09-01',
    readingMinutes: 7,
    image: { src: '/images/w1.webp', alt: 'Saúde metabólica e esteatose hepática' },
    faqs: [
      { q: 'Esteatose grau 1 é grave?', a: 'Grau 1 indica acúmulo inicial, mas já é sinal de alerta metabólico. Sem mudanças, pode evoluir. Com plano alimentar, atividade física e controle de glicemia/triglicérides, há boa chance de regressão.' },
      { q: 'Precisa de remédio para gordura no fígado?', a: 'Não existe “remédio para limpar o fígado” que resolva sozinho. O tratamento é da causa: resistência à insulina, excesso de gordura visceral, álcool, medicamentos. Suplementos só com indicação individual.' },
      { q: 'Quem tem esteatose pode comer fruta?', a: 'Pode, com porções e contexto. Fruta in natura é diferente de suco e de excesso de frutose ultraprocessada. O ajuste é feito dentro do plano alimentar global, não por alimento isolado.' },
    ],
    references: [
      'Sociedade Brasileira de Hepatologia (SBH) — Diretrizes e Recomendações no Manejo da Doença Hepática Gordurosa Não Alcoólica (DHGNA).',
      'European Association for the Study of the Liver (EASL) — Clinical Practice Guidelines for the management of non-alcoholic fatty liver disease.',
      'American Association for the Study of Liver Diseases (AASLD) — Practice Guidance on Non-Alcoholic Fatty Liver Disease.',
    ],
    blocks: [
      { type: 'answer', text: 'Sim — gordura no fígado (esteatose) tem reversão em muitos casos quando a causa é corrigida cedo. A forma mais comum vem da síndrome metabólica: resistência à insulina, excesso de gordura visceral, triglicérides altos e, em alguns casos, álcool. O manejo é clínico e de estilo de vida: alimentação com déficit calórico quando há excesso de peso, atividade física regular, controle de glicemia/colesterol e acompanhamento para afastar inflamação hepática (esteato-hepatite) e fibrose.' },
      { type: 'h2', id: 'o-que-e', text: 'O que significa “esteatose”' },
      { type: 'p', text: 'É o acúmulo de gordura dentro das células do fígado visto no ultrassom. Sozinho não dói, por isso passa despercebido. O risco está na evolução silenciosa para inflamação e, em parte dos casos, fibrose. O exame não mede tudo — história, enzimas hepáticas, glicemia, triglicérides e avaliação de risco completam o quadro.' },
      { type: 'h2', id: 'por-que-acontece', text: 'Por que acontece com tanta gente hoje' },
      { type: 'list', items: ['Excesso de calorias e de ultraprocessados + pouca fibra e proteína', 'Sedentarismo e perda de massa muscular', 'Resistência à insulina e pré-diabetes', 'Álcool mesmo em doses “sociais” frequentes em pessoas sensíveis', 'Medicamentos e condições associadas (hipotireoidismo, apneia do sono)'] },
      { type: 'h2', id: 'exames', text: 'Exames que importam (além do ultrassom)' },
      { type: 'p', text: 'TGO/TGP, GGT, glicemia de jejum, HbA1c, insulina quando indicada, triglicérides, HDL, ferritina e, em casos selecionados, elastografia ou escore de fibrose. A interpretação é conjunta — não se trata número isolado.' },
      { type: 'quote', text: '“Fígado gorduroso” não é diagnóstico final. É um sinal para investigar metabolismo como um todo — e agir antes de virar doença hepática.' },
      { type: 'h2', id: 'plano', text: 'Plano prático que funciona' },
      { type: 'list', items: ['Perda de 5–10% do peso quando há excesso: já reduz gordura hepática de forma relevante', '150–300 min/semana de aeróbico + 2× força; menos tempo sentado', 'Alimentação com proteína 1,2–1,6 g/kg (se rins ok), fibras, azeite, castanhas, menos açúcar e álcool', 'Sono regular e manejo de estresse — sem isso, insulina e fome desregulam', 'Acompanhamento médico para ajustar medicações e acompanhar enzimas e imagem'] },
      { type: 'h2', id: 'quando-voltar', text: 'Quando voltar ao médico mais rápido' },
      { type: 'p', text: 'Se houver dor persistente no quadrante superior direito, icterícia, náuseas frequentes, urina escura, ou se a esteatose veio com diabetes, triglicérides muito altos ou uso crônico de álcool. Nesses casos, a avaliação não pode esperar.' },
      { type: 'cta' },
    ],
  },
  {
    slug: 'consulta-online-telemedicina-como-funciona',
    title: 'Consulta online (telemedicina): como funciona, o que precisa e quando vale',
    metaTitle: 'Consulta online telemedicina: como funciona | Dra. Hélem',
    metaDesc: 'Como funciona a consulta online com a Dra. Hélem: duração, exames, receitas digitais e quando a telemedicina é indicada.',
    keywords: ['consulta online', 'telemedicina como funciona', 'consulta médica online receita', 'Dra Hélem telemedicina'],
    category: 'Telemedicina',
    categorySlug: 'telemedicina',
    excerpt: 'Telemedicina com a mesma profundidade do presencial: entenda duração, dinâmica, exames, receitas digitais e para quem faz sentido.',
    datePublished: '2026-04-15',
    dateModified: '2026-09-01',
    readingMinutes: 5,
    image: { src: '/images/Dra_Helem_5.webp', alt: 'Consulta online por telemedicina' },
    faqs: [
      { q: 'A consulta online é tão completa quanto a presencial?', a: 'Sim, em duração e profundidade. A diferença está no exame físico presencial quando necessário. Para seguimento hormonal e metabólico, a telemedicina resolve muito bem com vídeo, prontuário e exames digitais.' },
      { q: 'Receita e pedido de exame valem em todo o Brasil?', a: 'Sim. Receitas e pedidos são emitidos com assinatura digital válida nacionalmente, conforme regulamentação do CFM.' },
      { q: 'Preciso de algum preparo técnico?', a: 'Apenas celular ou computador com câmera/microfone e internet estável, além de um local reservado. Exames anteriores em PDF ajudam a agilizar.' },
    ],
    references: [
      'Conselho Federal de Medicina (CFM) — Resolução CFM nº 2.314/2022 (Regulamentação da Telemedicina no Brasil).',
      'Instituto Nacional de Tecnologia da Informação (ITI) — Infraestrutura de Chaves Públicas Brasileira (ICP-Brasil) para Documentos Médicos Digitais.',
      'Lei Federal nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais (LGPD) na Saúde.',
    ],
    blocks: [
      { type: 'answer', text: 'A consulta online (telemedicina) com a Dra. Hélem tem a mesma duração e profundidade da presencial, por videochamada segura. Você passa por anamnese completa, revisão de exames, plano alimentar e de estilo de vida e, quando indicado, prescrição com assinatura digital válida em todo o Brasil. É indicada para primeira consulta e seguimentos de saúde hormonal e metabólica — com orientação clara de quando o presencial é preferível.' },
      { type: 'h2', id: 'como-e', text: 'Como é na prática' },
      { type: 'list', items: ['Agendamento via WhatsApp ou formulário, com escolha de horário', 'Videochamada em plataforma segura, com prontuário e registro em conformidade com CFM e LGPD', 'Anamnese aprofundada: histórico, sintomas, sono, alimentação, treino, medicamentos', 'Plano escrito ao final: exames quando necessários, ajustes e retornos'] },
      { type: 'h2', id: 'receitas-exames', text: 'Receitas, atestados e pedidos de exame' },
      { type: 'p', text: 'Documentos são emitidos com assinatura digital (ICP-Brasil) e enviados por PDF. Valem em farmácias e laboratórios de todo o país. Quando o caso exige exame físico presencial ou procedimento, você recebe a orientação de onde e quando fazer.' },
      { type: 'h2', id: 'para-quem', text: 'Para quem faz mais sentido' },
      { type: 'list', items: ['Quem mora fora de Florianópolis/SC e quer acompanhamento contínuo', 'Rotina corrida que dificulta deslocamento frequente', 'Seguimento de modulação hormonal e saúde metabólica com exames periódicos', 'Quem já tem exames e quer segunda opinião com olhar integrativo'] },
      { type: 'h2', id: 'quando-presencial', text: 'Quando o presencial é melhor' },
      { type: 'p', text: 'Dor aguda, sangramento, falta de ar, febre persistente, necessidade de exame físico detalhado ou coleta no mesmo dia são situações em que o presencial (ou pronto-atendimento) é mais seguro. Na dúvida, a triagem orienta o melhor caminho antes da consulta.' },
      { type: 'quote', text: 'Telemedicina não é “consulta rápida”. É consulta completa, com tempo para ouvir, investigar causa raiz e construir um plano que caiba na sua rotina — só que sem deslocamento.' },
      { type: 'h2', id: 'preparo', text: 'Como se preparar' },
      { type: 'list', items: ['Lista de medicamentos/suplementos e doses', 'Exames dos últimos 12 meses em PDF/foto legível', 'Anotações de sintomas, horários de sono e rotina alimentar', 'Local silencioso e 60–90 min reservados sem interrupções'] },
      { type: 'cta' },
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find(p => p.slug === slug);
export const categories = [...new Set(blogPosts.map(p => p.category))];
