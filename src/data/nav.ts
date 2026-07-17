export interface NavLink {
  id: string
  label: string
}

export const navLinks: NavLink[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'tratamentos', label: 'Tratamentos' },
  { id: 'reac', label: 'REAC' },
  { id: 'instituto', label: 'O Instituto' },
  { id: 'como-chegar', label: 'Como Chegar' },
  { id: 'contato', label: 'Contato' },
]
