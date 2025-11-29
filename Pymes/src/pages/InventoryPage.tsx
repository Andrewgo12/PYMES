import { useState } from 'react'
import { useProductsStore, type Product } from '@/store/productsStore'
import { useMovementsStore, type Movement } from '@/store/movementsStore'
import { useToastStore } from '@/store/toastStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, ArrowRightLeft, CheckCircle, PackagePlus, ArrowUp, ArrowDown, Search } from 'lucide-react'
import { StockAdjustmentModal } from '@/components/inventory/StockAdjustmentModal'
import { formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'
import { Input } from '@/components/ui/Input'
import { Pagination } from '@/components/ui/Pagination'

export function InventoryPage() {
  const { products, adjustStock } = useProductsStore()
  const { getRecentMovements } = useMovementsStore()
  const { addToast } = useToastStore()
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false)
  const [selectedProductForAdjustment, setSelectedProductForAdjustment] = useState<string | undefined>(undefined)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  const lowStockProducts = products.filter((p: Product) => p.stock <= p.minStock)
  const recentMovements = getRecentMovements(10)

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page on search
  }

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
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Inventario</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Control de existencias y alertas de reabastecimiento.
        </p>
      </div>

      {/* Layout Único: Sidebar de Alertas (30%) + Contenido Principal (70%) */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">

        {/* Sidebar - Alertas y Acciones Rápidas */}
        <div className="lg:col-span-4 space-y-6">
          {/* Tarjeta de Acción Rápida */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-primary flex items-center gap-2 text-lg">
                <PackagePlus className="h-5 w-5" />
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Realiza ajustes de inventario rápidos sin entrar a los detalles del producto.
              </p>
              <Button onClick={() => openAdjustmentModal()} className="w-full">
                Realizar Ajuste de Stock
              </Button>
            </CardContent>
          </Card>

          {/* Alertas de Stock Bajo */}
          <Card className="border-l-4 border-l-error">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-error" />
                  <CardTitle className="text-lg">Alertas de Stock</CardTitle>
                </div>
                <Badge variant="error" className="rounded-full px-2">
                  {lowStockProducts.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {lowStockProducts.length > 0 ? (
                <div className="space-y-3">
                  {lowStockProducts.map((product: Product) => (
                    <div key={product.id} className="p-3 bg-error/5 rounded-lg border border-error/10 transition-all hover:bg-error/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                        </div>
                        <Badge variant="error" className="text-xs">
                          Crítico
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs">
                          <span className="text-muted-foreground">Stock: </span>
                          <span className="font-bold text-error">{product.stock}</span>
                          <span className="text-muted-foreground mx-1">/</span>
                          <span className="text-muted-foreground">Min: {product.minStock}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs text-error hover:text-error hover:bg-error/10 px-2"
                          onClick={() => openAdjustmentModal(product.id)}
                        >
                          Reabastecer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <CheckCircle className="h-10 w-10 text-success mb-2" />
                  <p className="text-sm">Inventario saludable</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contenido Principal */}
        <div className="lg:col-span-8 space-y-6">

          {/* Movimientos Recientes */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Movimientos Recientes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMovements.length > 0 ? (
                  recentMovements.map((movement: Movement) => {
                    const isIncrease = movement.quantity > 0
                    const Icon = isIncrease ? ArrowUp : ArrowDown

                    let badgeVariant: 'default' | 'success' | 'error' | 'warning' = 'default'
                    if (movement.type === 'PURCHASE' || movement.type === 'RETURN') badgeVariant = 'success'
                    if (movement.type === 'SALE') badgeVariant = 'error'
                    if (movement.type === 'ADJUSTMENT') badgeVariant = 'warning'

                    return (
                      <div key={movement.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${isIncrease ? 'bg-success/10' : 'bg-error/10'}`}>
                            <Icon className={`h-4 w-4 ${isIncrease ? 'text-success' : 'text-error'}`} />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{movement.productName}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{formatDistance(new Date(movement.createdAt), new Date(), { addSuffix: true, locale: es })}</span>
                              <span>•</span>
                              <span>{movement.reason || 'Sin descripción'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={badgeVariant} className="mb-1 text-[10px] px-1.5 py-0">
                            {movement.type === 'SALE' && 'Venta'}
                            {movement.type === 'PURCHASE' && 'Compra'}
                            {movement.type === 'ADJUSTMENT' && 'Ajuste'}
                            {movement.type === 'RETURN' && 'Devolución'}
                          </Badge>
                          <div className="flex items-center justify-end gap-1">
                            <span className={`text-sm font-bold ${isIncrease ? 'text-success' : 'text-error'}`}>
                              {isIncrease ? '+' : ''}{movement.quantity}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({movement.newStock})
                            </span>
                          </div>
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

          {/* Tabla de Inventario */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <CardTitle className="text-lg">Estado del Inventario</CardTitle>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar producto..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-8 h-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                    <tr>
                      <th className="px-4 py-3 pl-6 whitespace-nowrap">Producto</th>
                      <th className="px-4 py-3 whitespace-nowrap">Ubicación</th>
                      <th className="px-4 py-3 text-center whitespace-nowrap">Mínimo</th>
                      <th className="px-4 py-3 text-center whitespace-nowrap">Actual</th>
                      <th className="px-4 py-3 text-center pr-6 whitespace-nowrap">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {paginatedProducts.length > 0 ? (
                      paginatedProducts.map((product: Product) => (
                        <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 pl-6 font-medium">
                            {product.name}
                            <div className="text-xs text-muted-foreground font-normal font-mono">{product.sku}</div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            <Badge variant="secondary" className="font-normal">
                              {product.location || 'N/A'}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-center text-muted-foreground">{product.minStock}</td>
                          <td className="px-4 py-3 text-center font-bold text-base">{product.stock}</td>
                          <td className="px-4 py-3 text-center pr-6">
                            {product.stock <= product.minStock ? (
                              <Badge variant="error" className="shadow-sm">Crítico</Badge>
                            ) : (
                              <Badge variant="success" className="shadow-sm">OK</Badge>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Search className="h-8 w-8 text-muted-foreground/30" />
                            <p>No se encontraron productos</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-border">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredProducts.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                />
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

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
