import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SaleItem {
  productId: string
  productName: string
  productSku: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface Sale {
  id: string
  items: SaleItem[]
  total: number
  clientName?: string
  clientEmail?: string
  paymentMethod: 'efectivo' | 'tarjeta' | 'transferencia'
  notes?: string
  userId?: string
  userName?: string
  createdAt: string
}

interface SalesState {
  sales: Sale[]
  addSale: (sale: Omit<Sale, 'id' | 'createdAt'>) => string
  getSale: (id: string) => Sale | undefined
  getSalesByDateRange: (startDate: Date, endDate: Date) => Sale[]
  getTotalSales: () => number
  clearSales: () => void
}

// Datos iniciales de ventas de ejemplo
const initialSales: Sale[] = [
  {
    id: 'sale-001',
    items: [
      { productId: '2', productName: 'Mouse Logitech MX Master 3', productSku: 'LOG-MX3-001', quantity: 2, unitPrice: 99.99, subtotal: 199.98 },
      { productId: '15', productName: 'Cable HDMI 2.1 4K', productSku: 'CABLE-HDMI-2.1-3M', quantity: 3, unitPrice: 24.99, subtotal: 74.97 }
    ],
    total: 274.95,
    clientName: 'Carlos Mendoza',
    clientEmail: 'carlos.mendoza@email.com',
    paymentMethod: 'tarjeta',
    notes: 'Cliente frecuente',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-20T10:30:00').toISOString(),
  },
  {
    id: 'sale-002',
    items: [
      { productId: '1', productName: 'Laptop Dell XPS 15', productSku: 'DELL-XPS15-001', quantity: 1, unitPrice: 1299.99, subtotal: 1299.99 }
    ],
    total: 1299.99,
    clientName: 'María González',
    clientEmail: 'maria.g@empresa.com',
    paymentMethod: 'transferencia',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-21T14:15:00').toISOString(),
  },
  {
    id: 'sale-003',
    items: [
      { productId: '7', productName: 'Auriculares Sony WH-1000XM5', productSku: 'SONY-WH1000-XM5', quantity: 1, unitPrice: 399.99, subtotal: 399.99 },
      { productId: '9', productName: 'Webcam Logitech C920', productSku: 'LOG-C920-HD', quantity: 1, unitPrice: 79.99, subtotal: 79.99 }
    ],
    total: 479.98,
    clientName: 'Roberto Silva',
    paymentMethod: 'efectivo',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-22T09:45:00').toISOString(),
  },
  {
    id: 'sale-004',
    items: [
      { productId: '3', productName: 'Teclado Mecánico Keychron K8', productSku: 'KEY-K8-001', quantity: 2, unitPrice: 89.99, subtotal: 179.98 },
      { productId: '20', productName: 'Mouse Pad XXL Gaming', productSku: 'MPAD-XXL-RGB', quantity: 2, unitPrice: 34.99, subtotal: 69.98 }
    ],
    total: 249.96,
    clientName: 'Ana Martínez',
    clientEmail: 'ana.martinez@tech.com',
    paymentMethod: 'tarjeta',
    notes: 'Setup gaming completo',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-23T11:20:00').toISOString(),
  },
  {
    id: 'sale-005',
    items: [
      { productId: '4', productName: 'Monitor LG UltraWide 34"', productSku: 'LG-UW34-001', quantity: 1, unitPrice: 599.99, subtotal: 599.99 }
    ],
    total: 599.99,
    clientName: 'Luis Ramírez',
    paymentMethod: 'transferencia',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-24T16:30:00').toISOString(),
  },
  {
    id: 'sale-006',
    items: [
      { productId: '10', productName: 'Disco SSD Samsung 1TB', productSku: 'SAMS-SSD-1TB-EVO', quantity: 3, unitPrice: 129.99, subtotal: 389.97 },
      { productId: '16', productName: 'Hub USB-C 7 en 1', productSku: 'HUB-USBC-7IN1', quantity: 2, unitPrice: 49.99, subtotal: 99.98 }
    ],
    total: 489.95,
    clientName: 'Patricia Flores',
    clientEmail: 'p.flores@company.com',
    paymentMethod: 'tarjeta',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-25T10:00:00').toISOString(),
  },
  {
    id: 'sale-007',
    items: [
      { productId: '5', productName: 'iPhone 15 Pro 256GB', productSku: 'APPL-IP15P-256', quantity: 1, unitPrice: 1199.99, subtotal: 1199.99 },
      { productId: '22', productName: 'Cargador Inalámbrico 3 en 1', productSku: 'CHRG-WIRELESS-3IN1', quantity: 1, unitPrice: 79.99, subtotal: 79.99 }
    ],
    total: 1279.98,
    clientName: 'Jorge Herrera',
    paymentMethod: 'efectivo',
    notes: 'Pago en efectivo completo',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-26T13:45:00').toISOString(),
  },
  {
    id: 'sale-008',
    items: [
      { productId: '17', productName: 'Micrófono Blue Yeti', productSku: 'BLUE-YETI-USB', quantity: 1, unitPrice: 129.99, subtotal: 129.99 },
      { productId: '23', productName: 'Soporte para Laptop Ajustable', productSku: 'STAND-LAPTOP-ALU', quantity: 1, unitPrice: 44.99, subtotal: 44.99 }
    ],
    total: 174.98,
    clientName: 'Sandra López',
    clientEmail: 'sandra.lopez@stream.com',
    paymentMethod: 'transferencia',
    notes: 'Setup para streaming',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-26T15:20:00').toISOString(),
  },
  {
    id: 'sale-009',
    items: [
      { productId: '8', productName: 'Tablet iPad Air M2', productSku: 'APPL-IPAD-AIR-M2', quantity: 1, unitPrice: 749.99, subtotal: 749.99 }
    ],
    total: 749.99,
    paymentMethod: 'tarjeta',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-27T09:00:00').toISOString(),
  },
  {
    id: 'sale-010',
    items: [
      { productId: '11', productName: 'Router WiFi 6 TP-Link', productSku: 'TPL-AX3000-WIFI6', quantity: 1, unitPrice: 149.99, subtotal: 149.99 },
      { productId: '25', productName: 'Switch de Red Gigabit 8 Puertos', productSku: 'SWITCH-GIG-8P', quantity: 1, unitPrice: 89.99, subtotal: 89.99 }
    ],
    total: 239.98,
    clientName: 'Fernando Castro',
    clientEmail: 'f.castro@network.com',
    paymentMethod: 'transferencia',
    notes: 'Infraestructura de red',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-27T10:30:00').toISOString(),
  },
  {
    id: 'sale-011',
    items: [
      { productId: '19', productName: 'Teclado Apple Magic Keyboard', productSku: 'APPL-MAGIC-KB', quantity: 1, unitPrice: 149.99, subtotal: 149.99 },
      { productId: '2', productName: 'Mouse Logitech MX Master 3', productSku: 'LOG-MX3-001', quantity: 1, unitPrice: 99.99, subtotal: 99.99 }
    ],
    total: 249.98,
    clientName: 'Gabriela Ruiz',
    paymentMethod: 'tarjeta',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-27T11:15:00').toISOString(),
  },
  {
    id: 'sale-012',
    items: [
      { productId: '24', productName: 'Batería Externa 20000mAh', productSku: 'PWR-BANK-20K-PD', quantity: 4, unitPrice: 54.99, subtotal: 219.96 }
    ],
    total: 219.96,
    clientName: 'Miguel Ángel Torres',
    clientEmail: 'ma.torres@mobile.com',
    paymentMethod: 'efectivo',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-27T12:00:00').toISOString(),
  },
  {
    id: 'sale-013',
    items: [
      { productId: '18', productName: 'Monitor Dell 27" 4K', productSku: 'DELL-U2723DE-4K', quantity: 1, unitPrice: 549.99, subtotal: 549.99 },
      { productId: '23', productName: 'Soporte para Laptop Ajustable', productSku: 'STAND-LAPTOP-ALU', quantity: 1, unitPrice: 44.99, subtotal: 44.99 }
    ],
    total: 594.98,
    clientName: 'Elena Vargas',
    paymentMethod: 'tarjeta',
    notes: 'Workstation profesional',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-27T13:30:00').toISOString(),
  },
  {
    id: 'sale-014',
    items: [
      { productId: '12', productName: 'Impresora HP LaserJet Pro', productSku: 'HP-LJ-PRO-M404', quantity: 1, unitPrice: 299.99, subtotal: 299.99 }
    ],
    total: 299.99,
    clientName: 'Ricardo Morales',
    clientEmail: 'r.morales@office.com',
    paymentMethod: 'transferencia',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-27T14:45:00').toISOString(),
  },
  {
    id: 'sale-015',
    items: [
      { productId: '21', productName: 'Lámpara LED de Escritorio', productSku: 'LAMP-LED-DESK-ADJ', quantity: 2, unitPrice: 59.99, subtotal: 119.98 },
      { productId: '15', productName: 'Cable HDMI 2.1 4K', productSku: 'CABLE-HDMI-2.1-3M', quantity: 5, unitPrice: 24.99, subtotal: 124.95 }
    ],
    total: 244.93,
    clientName: 'Sofía Jiménez',
    paymentMethod: 'efectivo',
    userId: '1',
    userName: 'Admin',
    createdAt: new Date('2024-11-27T15:00:00').toISOString(),
  },
]

export const useSalesStore = create<SalesState>()(
  persist(
    (set, get) => ({
      sales: initialSales,
      
      addSale: (saleData) => {
        const newSale: Sale = {
          ...saleData,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ 
          sales: [newSale, ...state.sales] 
        }))
        return newSale.id
      },
      
      getSale: (id) => {
        return get().sales.find((s) => s.id === id)
      },
      
      getSalesByDateRange: (startDate, endDate) => {
        return get().sales.filter((s) => {
          const saleDate = new Date(s.createdAt)
          return saleDate >= startDate && saleDate <= endDate
        })
      },
      
      getTotalSales: () => {
        return get().sales.reduce((sum, sale) => sum + sale.total, 0)
      },
      
      clearSales: () => {
        set({ sales: [] })
      },
    }),
    {
      name: 'sales-storage',
    }
  )
)
