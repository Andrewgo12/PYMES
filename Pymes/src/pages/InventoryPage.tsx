import { useState } from 'react'
import { useProductsStore, type Product } from '@/store/productsStore'
import { useMovementsStore, type Movement } from '@/store/movementsStore'
import { useToastStore } from '@/store/toastStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, ArrowRightLeft, CheckCircle, PackagePlus, ArrowUp, ArrowDown } from 'lucide-react'
import { StockAdjustmentModal } from '@/components/inventory/StockAdjustmentModal'
import { formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'

export function InventoryPage() {
  const { products, adjustStock } = useProductsStore()
  const { getRecentMovements } = useMovementsStore()
  const { addToast } = useToastStore()
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false)
  const [selectedProductForAdjustment, setSelectedProductForAdjustment] = useState<string | undefined>(undefined)

  const lowStockProducts = products.filter((p: Product) => p.stock <= p.minStock)
  const recentMovements = getRecentMovements(10)

  const handleStockAdjustment = (productId: string, adjustment: number, reason?: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      adjustStock(productId, adjustment, reason || 'Ajuste manual')
      
      addToast({
        type: 'success',
        title: 'Stock actualizado',
        message: `El stock de ${product.name} ha sido actualizado a ${product.stock + adjustment} unidades.`
      })
    }
  }

  const openAdjustmentModal = (productId?: string) => {
    setSelectedProductForAdjustment(productId)
    setIsAdjustmentModalOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventario</h2>
          <p className="text-muted-foreground">
            Control de existencias y alertas de reabastecimiento.
          </p>
        </div>
        <Button onClick={() => openAdjustmentModal()} aria-label="Realizar ajuste rápido de stock">
          <PackagePlus className="mr-2 h-4 w-4" />
          Ajuste Rápido
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Alertas de Stock Bajo */}
        <Card className="border-l-4 border-l-error">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-error" />
              <CardTitle>Alertas de Stock Bajo ({lowStockProducts.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length > 0 ? (
              <div className="space-y-4">
                {lowStockProducts.map((product: Product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-error/5 rounded-lg border border-error/10">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-error">
                        {product.stock} / {product.minStock}
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="mt-1 h-7 text-xs"
                        onClick={() => openAdjustmentModal(product.id)}
                        aria-label={`Reabastecer ${product.name}`}
                      >
                        Reabastecer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 text-success mb-2" />
                <p>Todo el inventario está saludable</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Movimientos Recientes */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5 text-primary" />
              <CardTitle>Movimientos Recientes</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMovements.length > 0 ? (
                recentMovements.map((movement: Movement) => {
                  const isIncrease = movement.quantity > 0
                  const Icon = isIncrease ? ArrowUp : ArrowDown
                  
                  // Determine badge variant based on movement type
                  let badgeVariant: 'default' | 'success' | 'error' | 'warning' = 'default'
                  if (movement.type === 'PURCHASE' || movement.type === 'RETURN') badgeVariant = 'success'
                  if (movement.type === 'SALE') badgeVariant = 'error'
                  if (movement.type === 'ADJUSTMENT') badgeVariant = 'warning'
                  
                  return (
                    <div key={movement.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${isIncrease ? 'bg-success/10' : 'bg-error/10'}`}>
                          <Icon className={`h-4 w-4 ${isIncrease ? 'text-success' : 'text-error'}`} />
                        </div>
                        <div>
                          <p className="font-medium">{movement.productName}</p>
                          <p className="text-xs text-muted-foreground">
                            SKU: {movement.productSku} • {movement.reason || 'Sin descripción'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDistance(new Date(movement.createdAt), new Date(), { addSuffix: true, locale: es })}
                            {movement.userName && ` • ${movement.userName}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={badgeVariant} className="mb-1">
                          {movement.type === 'SALE' && 'Venta'}
                          {movement.type === 'PURCHASE' && 'Compra'}
                          {movement.type === 'ADJUSTMENT' && 'Ajuste'}
                          {movement.type === 'RETURN' && 'Devolución'}
                        </Badge>
                        <p className={`text-sm font-bold ${isIncrease ? 'text-success' : 'text-error'}`}>
                          {isIncrease ? '+' : ''}{movement.quantity}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {movement.previousStock} → {movement.newStock}
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No hay movimientos recientes registrados
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Inventario Completo */}
      <Card>
        <CardHeader>
          <CardTitle>Estado del Inventario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground font-medium">
                <tr>
                  <th className="px-4 py-3">Producto</th>
                  <th className="px-4 py-3">Ubicación</th>
                  <th className="px-4 py-3 text-center">Mínimo</th>
                  <th className="px-4 py-3 text-center">Actual</th>
                  <th className="px-4 py-3 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {products.map((product: Product) => (
                  <tr key={product.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{product.location || 'Almacén Principal'}</td>
                    <td className="px-4 py-3 text-center">{product.minStock}</td>
                    <td className="px-4 py-3 text-center font-bold">{product.stock}</td>
                    <td className="px-4 py-3 text-center">
                      {product.stock <= product.minStock ? (
                        <Badge variant="error">Crítico</Badge>
                      ) : (
                        <Badge variant="success">OK</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <StockAdjustmentModal
        isOpen={isAdjustmentModalOpen}
        onClose={() => setIsAdjustmentModalOpen(false)}
        onConfirm={handleStockAdjustment}
        products={products}
        initialProductId={selectedProductForAdjustment}
      />
    </div>
  )
}
