export interface ReacItem {
  numero: string
  titulo: string
  descricao: string
}

export const reac = {
  eyebrow: 'O diferencial · Psiquiatria intervencionista',
  titulo: 'Neuromodulação REAC',
  intro:
    'REAC — Radio Electric Asymmetric Conveyer — é uma tecnologia de neuromodulação não invasiva: campos radioelétricos de intensidade extremamente baixa interagem com os mecanismos naturais de adaptação do sistema nervoso, favorecendo a autorregulação de respostas ligadas ao humor, à ansiedade e ao estresse.',
  disclaimer:
    'A indicação da REAC é definida individualmente, em consulta. Resultados variam de pessoa para pessoa — nenhum tratamento médico oferece garantia de resultado.',
  itens: [
    {
      numero: '01',
      titulo: 'Não invasiva e indolor',
      descricao:
        'Sem agulhas, sem sedação, sem afastamento das suas atividades. Você faz a sessão e segue o seu dia.',
    },
    {
      numero: '02',
      titulo: 'Além da medicação',
      descricao:
        'Uma via terapêutica que não depende exclusivamente de remédios — e pode ser combinada ao tratamento em curso.',
    },
    {
      numero: '03',
      titulo: 'Integrada ao cuidado',
      descricao:
        'Nada de protocolo isolado: cada indicação nasce de avaliação criteriosa e é acompanhada de perto, sessão a sessão.',
    },
  ] as ReacItem[],
}
