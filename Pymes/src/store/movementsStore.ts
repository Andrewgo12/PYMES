import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type MovementType = 'SALE' | 'PURCHASE' | 'ADJUSTMENT' | 'RETURN'

export interface Movement {
  id: string
  productId: string
  productName: string
  productSku: string
  type: MovementType
  quantity: number
  previousStock: number
  newStock: number
  reason?: string
  userId?: string
  userName?: string
  createdAt: string
}

interface MovementsState {
  movements: Movement[]
  addMovement: (movement: Omit<Movement, 'id' | 'createdAt'>) => void
  getMovementsByProduct: (productId: string) => Movement[]
  getRecentMovements: (limit?: number) => Movement[]
  clearMovements: () => void
}

export const useMovementsStore = create<MovementsState>()(
  persist(
    (set, get) => ({
      movements: [],
      
      addMovement: (movementData) => {
        const newMovement: Movement = {
          ...movementData,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ 
          movements: [newMovement, ...state.movements] 
        }))
      },
      
      getMovementsByProduct: (productId) => {
        return get().movements.filter((m) => m.productId === productId)
      },
      
      getRecentMovements: (limit = 10) => {
        return get().movements.slice(0, limit)
      },
      
      clearMovements: () => {
        set({ movements: [] })
      },
    }),
    {
      name: 'movements-storage',
    }
  )
)
