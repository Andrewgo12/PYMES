import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Supplier {
  id: string
  name: string
  contactName: string
  email: string
  phone: string
  address?: string
  city?: string
  country?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

interface SuppliersState {
  suppliers: Supplier[]
  addSupplier: (supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void
  deleteSupplier: (id: string) => void
  getSupplier: (id: string) => Supplier | undefined
}

const initialSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Tech Distributors Inc.',
    contactName: 'John Smith',
    email: 'john@techdist.com',
    phone: '+1-555-0101',
    address: '123 Tech Avenue',
    city: 'San Francisco',
    country: 'USA',
    notes: 'Proveedor principal de electrónica',
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Global Electronics Supply',
    contactName: 'María García',
    email: 'maria@globales.com',
    phone: '+34-912-345-678',
    address: 'Calle Mayor 45',
    city: 'Madrid',
    country: 'España',
    notes: 'Importador de productos Apple y Samsung',
    createdAt: new Date('2024-02-15').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Office Supplies Co.',
    contactName: 'Robert Johnson',
    email: 'robert@officesupply.com',
    phone: '+1-555-0202',
    address: '456 Business Blvd',
    city: 'New York',
    country: 'USA',
    notes: 'Muebles y accesorios de oficina',
    createdAt: new Date('2024-03-20').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Network Solutions Ltd.',
    contactName: 'Ana Martínez',
    email: 'ana@netsolutions.com',
    phone: '+52-55-1234-5678',
    address: 'Av. Reforma 100',
    city: 'Ciudad de México',
    country: 'México',
    notes: 'Equipos de red y conectividad',
    createdAt: new Date('2024-04-05').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Audio Pro Distributors',
    contactName: 'Carlos López',
    email: 'carlos@audiopro.com',
    phone: '+54-11-4567-8901',
    address: 'Av. Corrientes 500',
    city: 'Buenos Aires',
    country: 'Argentina',
    notes: 'Especialistas en audio profesional',
    createdAt: new Date('2024-05-12').toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const useSuppliersStore = create<SuppliersState>()(
  persist(
    (set, get) => ({
      suppliers: initialSuppliers,

      addSupplier: (supplierData) => {
        const newSupplier: Supplier = {
          ...supplierData,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          suppliers: [...state.suppliers, newSupplier],
        }))
      },

      updateSupplier: (id, supplierData) => {
        set((state) => ({
          suppliers: state.suppliers.map((s) =>
            s.id === id
              ? { ...s, ...supplierData, updatedAt: new Date().toISOString() }
              : s
          ),
        }))
      },

      deleteSupplier: (id) => {
        set((state) => ({
          suppliers: state.suppliers.filter((s) => s.id !== id),
        }))
      },

      getSupplier: (id) => {
        return get().suppliers.find((s) => s.id === id)
      },
    }),
    {
      name: 'suppliers-storage',
    }
  )
)
