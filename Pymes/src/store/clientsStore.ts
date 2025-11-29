import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Client {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  taxId?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

interface ClientsState {
  clients: Client[]
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateClient: (id: string, client: Partial<Client>) => void
  deleteClient: (id: string) => void
  getClient: (id: string) => Client | undefined
  resetToInitialData: () => void
}

const initialClients: Client[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    phone: '+34-600-123-456',
    address: 'Calle Principal 123',
    city: 'Barcelona',
    country: 'España',
    taxId: 'B12345678',
    notes: 'Cliente frecuente, descuento 5%',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'María González',
    email: 'maria.g@empresa.com',
    phone: '+34-611-234-567',
    address: 'Av. Diagonal 456',
    city: 'Madrid',
    country: 'España',
    taxId: 'B87654321',
    notes: 'Compras corporativas',
    createdAt: new Date('2024-02-20').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Roberto Silva',
    email: 'roberto.silva@tech.com',
    phone: '+52-55-9876-5432',
    city: 'Guadalajara',
    country: 'México',
    notes: 'Interesado en productos gaming',
    createdAt: new Date('2024-03-10').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Ana Martínez',
    email: 'ana.martinez@tech.com',
    phone: '+1-555-0123',
    address: '789 Tech Street',
    city: 'Austin',
    country: 'USA',
    taxId: 'US123456789',
    createdAt: new Date('2024-04-05').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Luis Ramírez',
    phone: '+54-11-2345-6789',
    city: 'Buenos Aires',
    country: 'Argentina',
    notes: 'Compras ocasionales',
    createdAt: new Date('2024-05-12').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Patricia Flores',
    email: 'p.flores@company.com',
    phone: '+56-2-9876-5432',
    address: 'Av. Providencia 200',
    city: 'Santiago',
    country: 'Chile',
    taxId: 'CL98765432',
    notes: 'Compras de almacenamiento y accesorios',
    createdAt: new Date('2024-06-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Jorge Herrera',
    phone: '+57-1-234-5678',
    city: 'Bogotá',
    country: 'Colombia',
    createdAt: new Date('2024-07-10').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Sandra López',
    email: 'sandra.lopez@stream.com',
    phone: '+34-622-345-678',
    city: 'Valencia',
    country: 'España',
    notes: 'Streamer profesional',
    createdAt: new Date('2024-08-15').toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const useClientsStore = create<ClientsState>()(
  persist(
    (set, get) => ({
      clients: initialClients,

      addClient: (clientData) => {
        const newClient: Client = {
          ...clientData,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          clients: [...state.clients, newClient],
        }))
      },

      updateClient: (id, clientData) => {
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === id
              ? { ...c, ...clientData, updatedAt: new Date().toISOString() }
              : c
          ),
        }))
      },

      deleteClient: (id) => {
        set((state) => ({
          clients: state.clients.filter((c) => c.id !== id),
        }))
      },

      getClient: (id) => {
        return get().clients.find((c) => c.id === id)
      },

      resetToInitialData: () => {
        set({ clients: initialClients })
      },
    }),
    {
      name: 'clients-storage',
    }
  )
)
