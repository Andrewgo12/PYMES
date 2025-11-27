import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PurchaseItem {
  productId: string
  productName: string
  productSku: string
  quantity: number
  unitCost: number
  subtotal: number
}

export interface Purchase {
  id: string
  supplierId: string
  supplierName: string
  items: PurchaseItem[]
  total: number
  status: 'pending' | 'received' | 'cancelled'
  notes?: string
  userId?: string
  userName?: string
  createdAt: string
  receivedAt?: string
}

interface PurchasesState {
  purchases: Purchase[]
  addPurchase: (purchase: Omit<Purchase, 'id' | 'createdAt' | 'status'>) => string
  updatePurchaseStatus: (id: string, status: Purchase['status']) => void
  getPurchase: (id: string) => Purchase | undefined
  getRecentPurchases: (limit?: number) => Purchase[]
}

const initialPurchases: Purchase[] = [
  {
    id: 'pur-001',
    supplierId: '1',
    supplierName: 'Tech Distributors Inc.',
    items: [
      { productId: '1', productName: 'Laptop Dell XPS 15', productSku: 'DELL-XPS15-001', quantity: 5, unitCost: 1100.00, subtotal: 5500.00 },
      { productId: '4', productName: 'Monitor LG UltraWide 34"', productSku: 'LG-UW34-001', quantity: 3, unitCost: 450.00, subtotal: 1350.00 }
    ],
    total: 6850.00,
    status: 'received',
    notes: 'Pedido inicial de stock',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-01-05').toISOString(),
    receivedAt: new Date('2024-01-10').toISOString(),
  },
  {
    id: 'pur-002',
    supplierId: '2',
    supplierName: 'Global Electronics Supply',
    items: [
      { productId: '5', productName: 'iPhone 15 Pro 256GB', productSku: 'APPL-IP15P-256', quantity: 10, unitCost: 1050.00, subtotal: 10500.00 }
    ],
    total: 10500.00,
    status: 'received',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-02-25').toISOString(),
    receivedAt: new Date('2024-03-01').toISOString(),
  },
  {
    id: 'pur-003',
    supplierId: '1',
    supplierName: 'Tech Distributors Inc.',
    items: [
      { productId: '10', productName: 'Disco SSD Samsung 1TB', productSku: 'SAMS-SSD-1TB-EVO', quantity: 20, unitCost: 85.00, subtotal: 1700.00 }
    ],
    total: 1700.00,
    status: 'pending',
    notes: 'Esperando reposición',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date().toISOString(),
  }
]

export const usePurchasesStore = create<PurchasesState>()(
  persist(
    (set, get) => ({
      purchases: initialPurchases,

      addPurchase: (purchaseData) => {
        const newPurchase: Purchase = {
          ...purchaseData,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          status: 'pending',
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          purchases: [newPurchase, ...state.purchases],
        }))
        return newPurchase.id
      },

      updatePurchaseStatus: (id, status) => {
        set((state) => ({
          purchases: state.purchases.map((p) =>
            p.id === id
              ? { 
                  ...p, 
                  status, 
                  receivedAt: status === 'received' ? new Date().toISOString() : p.receivedAt 
                }
              : p
          ),
        }))
      },

      getPurchase: (id) => {
        return get().purchases.find((p) => p.id === id)
      },

      getRecentPurchases: (limit = 5) => {
        return get().purchases
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, limit)
      },
    }),
    {
      name: 'purchases-storage',
    }
  )
)
