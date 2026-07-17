export interface FaqItem {
  pergunta: string
  resposta: string
}

export const faq: FaqItem[] = [
  {
    pergunta: 'Como funciona a primeira consulta?',
    resposta:
      'Reservo um tempo estendido para a primeira avaliação: sua história, seu momento atual, exames e tratamentos anteriores. O plano terapêutico é construído com você, com explicações claras sobre cada etapa.',
  },
  {
    pergunta: 'O atendimento é particular? E convênios?',
    resposta:
      'O atendimento é particular. Emitimos toda a documentação para você solicitar reembolso ao seu plano de saúde, conforme as regras do seu contrato. Valores e condições: fale com a equipe pelo WhatsApp.',
  },
  {
    pergunta: 'Vocês atendem por telemedicina?',
    resposta:
      'Sim. Consultas e acompanhamentos podem ser realizados por telemedicina, em plataforma segura, quando houver indicação clínica. A equipe orienta você sobre a melhor modalidade para o seu caso.',
  },
  {
    pergunta: 'O que é a Neuromodulação REAC?',
    resposta:
      'É uma tecnologia de neuromodulação não invasiva, que utiliza campos radioelétricos de intensidade muito baixa para favorecer a autorregulação do sistema nervoso. A indicação é sempre avaliada individualmente, em consulta.',
  },
  {
    pergunta: 'Como fica o sigilo das minhas informações?',
    resposta:
      'Todo o atendimento é protegido pelo sigilo médico, nos termos do Código de Ética Médica. Suas informações não são compartilhadas sem o seu consentimento, salvo nas exceções previstas em lei.',
  },
]
