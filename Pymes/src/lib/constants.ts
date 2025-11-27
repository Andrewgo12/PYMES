export interface User {
  id: string
  email: string
  password: string
  name: string
  role: 'admin' | 'user'
  avatar?: string
}

export const USERS: User[] = [
  {
    id: '1',
    email: 'admin@pymes.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin',
  },
  {
    id: '2',
    email: 'usuario@pymes.com',
    password: 'user123',
    name: 'Usuario Demo',
    role: 'user',
  },
]

export const APP_NAME = 'Sistema Inventario PYMES'
export const APP_VERSION = '1.0.0'
