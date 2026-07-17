import { imagens } from './site'

export interface FotoInstituto {
  numero: string
  src: string
  legenda: string
  alt: string
}

export const instituto = {
  eyebrow: 'O Instituto',
  titulo: 'Um consultório com alma de galeria.',
  intro:
    'Um espaço pensado para você se sentir em casa desde o primeiro minuto — couro caramelo, plantas tropicais e a luz quente de fim de tarde.',
  recepcao: {
    numero: '01',
    src: imagens.recepcao,
    legenda: 'Recepção — Instituto de Psiquiatria Moderna',
    alt: 'Recepção do Instituto de Psiquiatria Moderna — poltronas de couro caramelo, plantas tropicais e luz quente',
  } as FotoInstituto,
  galeria: [
    {
      numero: '02',
      src: imagens.sala,
      legenda: 'Sala de atendimento',
      alt: 'Sala de atendimento — madeira, poltronas e luz indireta',
    },
    {
      numero: '03',
      src: imagens.detalhe,
      legenda: 'Detalhe do lounge',
      alt: 'Detalhe do lounge — planta tropical e arte na parede',
    },
  ] as FotoInstituto[],
}
