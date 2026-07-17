// Configuração central do site. Componentes nunca hardcodam este conteúdo.

const whatsappNumero = '5563984613530'
const mensagemPadrao = 'Olá! Vim pelo site e gostaria de agendar uma consulta.'

export const site = {
  nome: 'Dr. Luiz Prestes',
  instituto: 'Instituto de Psiquiatria Moderna',
  credenciais: {
    crm: 'CRM-TO 1751',
    rqe: 'RQE 1621',
    especialidade: 'Psiquiatria',
    fundacao: 2017,
  },
  whatsapp: whatsappNumero,
  waLink: `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensagemPadrao)}`,
  instagram: {
    handle: '@drluizprestes',
    url: 'https://www.instagram.com/drluizprestes',
  },
  endereco: {
    predio: 'Palmas Medical Center',
    sala: 'Sala 812 · 8º andar',
    logradouro: 'Q. 401 Sul, Av. LO 11',
    cidade: 'Palmas – TO',
    linha1: 'Palmas Medical Center — Sala 812',
    linha2: 'Q. 401 Sul, Av. LO 11 · Palmas – TO',
  },
  coordenadas: {
    lat: -10.2103303,
    lng: -48.3355088,
  },
  mapsBusca:
    'https://www.google.com/maps/search/?api=1&query=-10.2103303,-48.3355088',
  mapsEndereco:
    'https://www.google.com/maps/search/?api=1&query=Palmas%20Medical%20Center%2C%20Q.%20401%20Sul%2C%20Av.%20LO%2011%2C%20Palmas%20-%20TO',
  desenvolvedor: {
    nome: 'Gustavo Dev',
    url: 'https://gustavodev.dev',
  },
} as const

export const imagens = {
  terno: '/images/dr-luiz-terno.png',
  camisa: '/images/dr-luiz-camisa.png',
  recepcao: '/images/instituto-recepcao.png',
  sala: '/images/instituto-sala.png',
  detalhe: '/images/instituto-detalhe.png',
  reac: '/images/sala-reac.png',
} as const
