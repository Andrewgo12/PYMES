import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useProductsStore } from './productsStore'

export interface PurchaseItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface Purchase {
  id: string
  supplierName: string
  items: PurchaseItem[]
  total: number
  status: 'pending' | 'received' | 'cancelled'
  createdAt: string
  receivedAt?: string
  notes?: string
}

interface PurchasesState {
  purchases: Purchase[]
  addPurchase: (purchase: Omit<Purchase, 'id' | 'status' | 'createdAt'>) => string
  updatePurchaseStatus: (id: string, status: Purchase['status']) => void
  getPurchase: (id: string) => Purchase | undefined
  getRecentPurchases: (limit?: number) => Purchase[]
  resetToInitialData: () => void
}

// Datos de prueba iniciales
const initialPurchases: Purchase[] = [
  {
    id: 'PUR-001',
    supplierName: 'Distribuidora Central',
    items: [
      { productId: '1', productName: 'Laptop HP Pavilion', quantity: 5, unitPrice: 12000, subtotal: 60000 }
    ],
    total: 60000,
    status: 'received',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // Hace 5 días
    receivedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  }
]

export const usePurchasesStore = create<PurchasesState>()(
  persist(
    (set, get) => ({
      purchases: initialPurchases,

      addPurchase: (purchaseData) => {
        const newPurchase: Purchase = {
          ...purchaseData,
          id: `PUR-${Date.now().toString().slice(-6)}`,
          status: 'pending',
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          purchases: [newPurchase, ...state.purchases],
        }))
        return newPurchase.id
      },

      updatePurchaseStatus: (id, status) => {
        const purchase = get().purchases.find(p => p.id === id)

        // If status changing to received, add stock
        if (purchase && status === 'received' && purchase.status !== 'received') {
          const productsStore = useProductsStore.getState()
          purchase.items.forEach(item => {
            productsStore.adjustStock(item.productId, item.quantity, `Compra #${purchase.id} recibida`)
          })
        }

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

      resetToInitialData: () => {
        set({ purchases: initialPurchases })
      },
    }),
    {
      name: 'purchases-storage',
    }
  )
)
