export interface Tratamento {
  numero: string
  titulo: string
  descricao: string
}

export const tratamentos: Tratamento[] = [
  {
    numero: '01',
    titulo: 'Ansiedade',
    descricao:
      'Se a preocupação virou um ruído constante — no peito, no sono, nas decisões —, há caminhos sérios para reencontrar o silêncio.',
  },
  {
    numero: '02',
    titulo: 'Depressão',
    descricao:
      'Quando até o que você ama perde a cor, não é fraqueza nem falta de esforço. É uma condição médica — e ela pode ser tratada.',
  },
  {
    numero: '03',
    titulo: 'Insônia',
    descricao:
      'Noites que não descansam cobram caro dos dias. Investigar a causa — e não apenas o sintoma — é o primeiro passo.',
  },
  {
    numero: '04',
    titulo: 'TDAH no adulto',
    descricao:
      'Viver com mil abas abertas, começando tudo e terminando pouco, tem nome — e tem acompanhamento adequado.',
  },
  {
    numero: '05',
    titulo: 'Transtorno bipolar',
    descricao:
      'Oscilações que assustam você — e quem está por perto — pedem diagnóstico preciso e acompanhamento verdadeiramente próximo.',
  },
  {
    numero: '06',
    titulo: 'Burnout e estresse crônico',
    descricao:
      'Quando o trabalho consome mais do que devolve, o corpo avisa. Ouvi-lo a tempo pode mudar o desfecho.',
  },
]
