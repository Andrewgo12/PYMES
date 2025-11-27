import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { type Product } from '@/store/productsStore'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils'
import { Package, DollarSign, Hash, Tag, Calendar } from 'lucide-react'

interface ProductDetailModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  onEdit?: (product: Product) => void
}

export function ProductDetailModal({ isOpen, onClose, product, onEdit }: ProductDetailModalProps) {
  if (!product) return null

  const handleEdit = () => {
    if (onEdit) {
      onEdit(product)
    }
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalles del Producto"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          {onEdit && (
            <Button onClick={handleEdit}>
              Editar Producto
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-6">
        {/* Product Image Placeholder */}
        <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
          <Package className="w-16 h-16 text-muted-foreground" />
        </div>

        {/* Product Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="w-4 h-4" />
              <span>Nombre</span>
            </div>
            <p className="font-medium">{product.name}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Hash className="w-4 h-4" />
              <span>SKU</span>
            </div>
            <p className="font-mono text-sm">{product.sku}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span>Precio</span>
            </div>
            <p className="font-bold text-lg">{formatCurrency(product.price)}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="w-4 h-4" />
              <span>Stock Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg">{product.stock}</p>
              {product.stock <= product.minStock ? (
                <Badge variant="error">Bajo</Badge>
              ) : (
                <Badge variant="success">OK</Badge>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Categoría</span>
            <p><Badge variant="secondary" className="capitalize">{product.category}</Badge></p>
          </div>

          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Stock Mínimo</span>
            <p className="font-medium">{product.minStock} unidades</p>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Descripción</span>
            <p className="text-sm">{product.description}</p>
          </div>
        )}

        {/* Timestamps */}
        <div className="pt-4 border-t border-border grid grid-cols-2 gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>Creado: {new Date(product.createdAt).toLocaleDateString('es-ES')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>Actualizado: {new Date(product.updatedAt).toLocaleDateString('es-ES')}</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
