import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useMovementsStore } from './movementsStore'
import { useAuthStore } from './authStore'

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  minStock: number
  description?: string
  image?: string
  location?: string
  createdAt: string
  updatedAt: string
}

interface ProductsState {
  products: Product[]
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateProduct: (id: string, product: Partial<Product>, reason?: string) => void
  deleteProduct: (id: string) => void
  getProduct: (id: string) => Product | undefined
  adjustStock: (id: string, adjustment: number, reason: string) => void
  resetToInitialData: () => void
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Dell XPS 15',
    sku: 'DELL-XPS15-001',
    category: 'Electrónica',
    price: 1299.99,
    stock: 15,
    minStock: 5,
    description: 'Laptop de alto rendimiento con procesador Intel i7',
    location: 'Almacén Principal',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Mouse Logitech MX Master 3',
    sku: 'LOG-MX3-001',
    category: 'Accesorios',
    price: 99.99,
    stock: 45,
    minStock: 10,
    description: 'Mouse ergonómico inalámbrico de precisión',
    location: 'Almacén Principal',
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Teclado Mecánico Keychron K8',
    sku: 'KEY-K8-001',
    category: 'Accesorios',
    price: 89.99,
    stock: 8,
    minStock: 10,
    description: 'Teclado mecánico inalámbrico con switches Gateron',
    location: 'Almacén Principal',
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Monitor LG UltraWide 34"',
    sku: 'LG-UW34-001',
    category: 'Monitores',
    price: 599.99,
    stock: 12,
    minStock: 5,
    description: 'Monitor ultrawide 34 pulgadas 21:9 QHD',
    location: 'Almacén Principal',
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'iPhone 15 Pro 256GB',
    sku: 'APPL-IP15P-256',
    category: 'Electrónica',
    price: 1199.99,
    stock: 8,
    minStock: 3,
    description: 'Smartphone Apple iPhone 15 Pro con chip A17',
    location: 'Almacén Secundario',
    createdAt: new Date('2024-03-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Samsung Galaxy S24 Ultra',
    sku: 'SAMS-S24U-512',
    category: 'Electrónica',
    price: 1399.99,
    stock: 6,
    minStock: 3,
    description: 'Smartphone Samsung con S Pen y cámara de 200MP',
    location: 'Almacén Secundario',
    createdAt: new Date('2024-03-05').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Auriculares Sony WH-1000XM5',
    sku: 'SONY-WH1000-XM5',
    category: 'Audio',
    price: 399.99,
    stock: 20,
    minStock: 8,
    description: 'Auriculares con cancelación de ruido premium',
    location: 'Almacén Principal',
    createdAt: new Date('2024-03-10').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Tablet iPad Air M2',
    sku: 'APPL-IPAD-AIR-M2',
    category: 'Electrónica',
    price: 749.99,
    stock: 14,
    minStock: 5,
    description: 'Tablet Apple iPad Air con chip M2',
    location: 'Almacén Principal',
    createdAt: new Date('2024-03-15').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Webcam Logitech C920',
    sku: 'LOG-C920-HD',
    category: 'Accesorios',
    price: 79.99,
    stock: 32,
    minStock: 15,
    description: 'Cámara web Full HD 1080p con micrófono',
    location: 'Almacén Principal',
    createdAt: new Date('2024-04-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'Disco SSD Samsung 1TB',
    sku: 'SAMS-SSD-1TB-EVO',
    category: 'Almacenamiento',
    price: 129.99,
    stock: 28,
    minStock: 12,
    description: 'SSD NVMe M.2 de alta velocidad',
    location: 'Almacén Principal',
    createdAt: new Date('2024-04-05').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '11',
    name: 'Router WiFi 6 TP-Link',
    sku: 'TPL-AX3000-WIFI6',
    category: 'Redes',
    price: 149.99,
    stock: 18,
    minStock: 8,
    description: 'Router de doble banda con WiFi 6',
    location: 'Almacén Secundario',
    createdAt: new Date('2024-04-10').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '12',
    name: 'Impresora HP LaserJet Pro',
    sku: 'HP-LJ-PRO-M404',
    category: 'Oficina',
    price: 299.99,
    stock: 7,
    minStock: 3,
    description: 'Impresora láser monocromática de alta velocidad',
    location: 'Almacén Principal',
    createdAt: new Date('2024-04-15').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '13',
    name: 'Silla Ergonómica Herman Miller',
    sku: 'HM-AERON-CLASSIC',
    category: 'Muebles',
    price: 1499.99,
    stock: 5,
    minStock: 2,
    description: 'Silla de oficina ergonómica premium',
    location: 'Almacén Secundario',
    createdAt: new Date('2024-05-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '14',
    name: 'Escritorio Ajustable Standing Desk',
    sku: 'DESK-STAND-ELEC',
    category: 'Muebles',
    price: 599.99,
    stock: 4,
    minStock: 2,
    description: 'Escritorio eléctrico con altura ajustable',
    location: 'Almacén Secundario',
    createdAt: new Date('2024-05-05').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '15',
    name: 'Cable HDMI 2.1 4K',
    sku: 'CABLE-HDMI-2.1-3M',
    category: 'Accesorios',
    price: 24.99,
    stock: 85,
    minStock: 30,
    description: 'Cable HDMI 2.1 de 3 metros certificado',
    location: 'Almacén Principal',
    createdAt: new Date('2024-05-10').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '16',
    name: 'Hub USB-C 7 en 1',
    sku: 'HUB-USBC-7IN1',
    category: 'Accesorios',
    price: 49.99,
    stock: 42,
    minStock: 20,
    description: 'Hub multipuerto con HDMI, USB 3.0 y lector SD',
    location: 'Almacén Principal',
    createdAt: new Date('2024-05-15').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '17',
    name: 'Micrófono Blue Yeti',
    sku: 'BLUE-YETI-USB',
    category: 'Audio',
    price: 129.99,
    stock: 16,
    minStock: 6,
    description: 'Micrófono USB profesional para streaming',
    location: 'Almacén Principal',
    createdAt: new Date('2024-06-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '18',
    name: 'Monitor Dell 27" 4K',
    sku: 'DELL-U2723DE-4K',
    category: 'Monitores',
    price: 549.99,
    stock: 9,
    minStock: 4,
    description: 'Monitor 4K UHD con USB-C y altura ajustable',
    location: 'Almacén Principal',
    createdAt: new Date('2024-06-05').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '19',
    name: 'Teclado Apple Magic Keyboard',
    sku: 'APPL-MAGIC-KB',
    category: 'Accesorios',
    price: 149.99,
    stock: 22,
    minStock: 10,
    description: 'Teclado inalámbrico recargable de Apple',
    location: 'Almacén Principal',
    createdAt: new Date('2024-06-10').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '20',
    name: 'Mouse Pad XXL Gaming',
    sku: 'MPAD-XXL-RGB',
    category: 'Accesorios',
    price: 34.99,
    stock: 56,
    minStock: 25,
    description: 'Mouse pad extendido con iluminación RGB',
    location: 'Almacén Principal',
    createdAt: new Date('2024-06-15').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '21',
    name: 'Lámpara LED de Escritorio',
    sku: 'LAMP-LED-DESK-ADJ',
    category: 'Oficina',
    price: 59.99,
    stock: 24,
    minStock: 10,
    description: 'Lámpara LED con temperatura de color ajustable',
    location: 'Almacén Secundario',
    createdAt: new Date('2024-07-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '22',
    name: 'Cargador Inalámbrico 3 en 1',
    sku: 'CHRG-WIRELESS-3IN1',
    category: 'Accesorios',
    price: 79.99,
    stock: 31,
    minStock: 15,
    description: 'Cargador para iPhone, Apple Watch y AirPods',
    location: 'Almacén Principal',
    createdAt: new Date('2024-07-05').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '23',
    name: 'Soporte para Laptop Ajustable',
    sku: 'STAND-LAPTOP-ALU',
    category: 'Accesorios',
    price: 44.99,
    stock: 38,
    minStock: 18,
    description: 'Soporte de aluminio con 6 niveles de altura',
    location: 'Almacén Principal',
    createdAt: new Date('2024-07-10').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '24',
    name: 'Batería Externa 20000mAh',
    sku: 'PWR-BANK-20K-PD',
    category: 'Accesorios',
    price: 54.99,
    stock: 47,
    minStock: 20,
    description: 'Power bank con carga rápida USB-C PD',
    location: 'Almacén Principal',
    createdAt: new Date('2024-07-15').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '25',
    name: 'Switch de Red Gigabit 8 Puertos',
    sku: 'SWITCH-GIG-8P',
    category: 'Redes',
    price: 89.99,
    stock: 13,
    minStock: 6,
    description: 'Switch Ethernet no administrado de 8 puertos',
    location: 'Almacén Secundario',
    createdAt: new Date('2024-07-20').toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: Date.now().toString(),
          location: productData.location || 'Almacén Principal',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({ products: [...state.products, newProduct] }))
      },
      updateProduct: (id, productData, reason) => {
        const product = get().products.find((p) => p.id === id)
        
        // If stock is being updated, record the movement
        if (product && productData.stock !== undefined && productData.stock !== product.stock) {
          const movementsStore = useMovementsStore.getState()
          const authStore = useAuthStore.getState()
          
          movementsStore.addMovement({
            productId: product.id,
            productName: product.name,
            productSku: product.sku,
            type: 'ADJUSTMENT',
            quantity: productData.stock - product.stock,
            previousStock: product.stock,
            newStock: productData.stock,
            reason: reason || 'Ajuste manual',
            userId: authStore.user?.id,
            userName: authStore.user?.name,
          })
        }
        
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id
              ? { ...p, ...productData, updatedAt: new Date().toISOString() }
              : p
          ),
        }))
      },
      adjustStock: (id, adjustment, reason) => {
        const product = get().products.find((p) => p.id === id)
        if (!product) return
        
        const newStock = Math.max(0, product.stock + adjustment)
        const movementsStore = useMovementsStore.getState()
        const authStore = useAuthStore.getState()
        
        // Determine movement type
        let movementType: 'SALE' | 'PURCHASE' | 'ADJUSTMENT' | 'RETURN' = 'ADJUSTMENT'
        if (reason.toLowerCase().includes('venta') || reason.toLowerCase().includes('sale')) {
          movementType = 'SALE'
        } else if (reason.toLowerCase().includes('compra') || reason.toLowerCase().includes('purchase')) {
          movementType = 'PURCHASE'
        } else if (reason.toLowerCase().includes('devolución') || reason.toLowerCase().includes('return')) {
          movementType = 'RETURN'
        }
        
        movementsStore.addMovement({
          productId: product.id,
          productName: product.name,
          productSku: product.sku,
          type: movementType,
          quantity: adjustment,
          previousStock: product.stock,
          newStock: newStock,
          reason,
          userId: authStore.user?.id,
          userName: authStore.user?.name,
        })
        
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id
              ? { ...p, stock: newStock, updatedAt: new Date().toISOString() }
              : p
          ),
        }))
      },
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }))
      },
      getProduct: (id) => {
        return get().products.find((p) => p.id === id)
      },
      resetToInitialData: () => {
        set({ products: initialProducts })
      },
    }),
    {
      name: 'products-storage',
    }
  )
)
