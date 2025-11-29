import { useState } from 'react'
import { usePurchasesStore, type Purchase } from '@/store/purchasesStore'
import { useProductsStore } from '@/store/productsStore'
import { useToastStore } from '@/store/toastStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { PurchaseModal } from '@/components/purchases/PurchaseModal'
import { PurchaseDetailModal } from '@/components/purchases/PurchaseDetailModal'
import { formatCurrency } from '@/lib/utils'
import { Plus, Search, Eye, ShoppingBag, CheckCircle, Clock, XCircle, FileSpreadsheet, FileText } from 'lucide-react'
import { exportPurchasesToExcel, exportPurchasesToPDF } from '@/lib/exportUtils'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function PurchasesPage() {
  const { purchases, updatePurchaseStatus } = usePurchasesStore()
  const { adjustStock } = useProductsStore()
  const { addToast } = useToastStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [viewingPurchase, setViewingPurchase] = useState<Purchase | null>(null)

  // Estados para ConfirmDialog
  const [confirmReceiveOpen, setConfirmReceiveOpen] = useState(false)
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Filtrar compras
  const filteredPurchases = purchases.filter((purchase: Purchase) => {
    const matchesSearch =
      purchase.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.items.some(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  const openReceiveConfirm = (purchase: Purchase) => {
    setSelectedPurchase(purchase)
    setConfirmReceiveOpen(true)
  }

  const openCancelConfirm = (purchase: Purchase) => {
    setSelectedPurchase(purchase)
    setConfirmCancelOpen(true)
  }

  const handleConfirmReceive = async () => {
    if (!selectedPurchase) return

    setIsProcessing(true)

    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 800))

    // Actualizar estado
    updatePurchaseStatus(selectedPurchase.id, 'received')

    // Aumentar stock
    selectedPurchase.items.forEach(item => {
      adjustStock(item.productId, item.quantity, `Compra #${selectedPurchase.id.slice(0, 8)} recibida`)
    })

    addToast({
      type: 'success',
      title: 'Orden Recibida',
      message: 'El stock ha sido actualizado correctamente.'
    })

    setIsProcessing(false)
    setConfirmReceiveOpen(false)
    setSelectedPurchase(null)
  }

  const handleConfirmCancel = async () => {
    if (!selectedPurchase) return

    setIsProcessing(true)

    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 500))

    updatePurchaseStatus(selectedPurchase.id, 'cancelled')
    addToast({
      type: 'info',
      title: 'Orden Cancelada',
      message: 'La orden ha sido marcada como cancelada.'
    })

    setIsProcessing(false)
    setConfirmCancelOpen(false)
    setSelectedPurchase(null)
  }

  const openDetailModal = (purchase: Purchase) => {
    setViewingPurchase(purchase)
    setIsDetailModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'received':
        return <Badge variant="success">Recibido</Badge>
      case 'pending':
        return <Badge variant="warning">Pendiente</Badge>
      case 'cancelled':
        return <Badge variant="error">Cancelado</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Métricas
  const totalPurchases = purchases.length
  const pendingPurchases = purchases.filter(p => p.status === 'pending').length
  const totalSpent = purchases
    .filter(p => p.status === 'received')
    .reduce((sum, p) => sum + p.total, 0)

  // Datos para gráfico de compras por proveedor
  const purchasesBySupplier = purchases.reduce((acc, purchase) => {
    const supplier = purchase.supplierName
    if (!acc[supplier]) {
      acc[supplier] = { supplier, total: 0, count: 0 }
    }
    if (purchase.status === 'received') {
      acc[supplier].total += purchase.total
      acc[supplier].count++
    }
    return acc
  }, {} as Record<string, { supplier: string; total: number; count: number }>)

  const supplierData = Object.values(purchasesBySupplier)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    .map(s => ({
      name: s.supplier.length > 20 ? s.supplier.slice(0, 20) + '...' : s.supplier,
      gasto: s.total,
      ordenes: s.count
    }))

  // Datos para gráfico de estados
  const statusData = [
    { name: 'Recibidas', value: purchases.filter(p => p.status === 'received').length, color: 'hsl(var(--success))' },
    { name: 'Pendientes', value: purchases.filter(p => p.status === 'pending').length, color: 'hsl(var(--warning))' },
    { name: 'Canceladas', value: purchases.filter(p => p.status === 'cancelled').length, color: 'hsl(var(--error))' }
  ].filter(s => s.value > 0)

  const handleExportExcel = () => {
    exportPurchasesToExcel(filteredPurchases)
    addToast({
      type: 'success',
      title: 'Exportado a Excel',
      message: 'El reporte de compras se ha descargado correctamente.'
    })
  }

  const handleExportPDF = () => {
    exportPurchasesToPDF(filteredPurchases)
    addToast({
      type: 'success',
      title: 'Exportado a PDF',
      message: 'El reporte de compras se ha descargado correctamente.'
    })
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Compras</h2>
          <p className="text-muted-foreground mt-1">
            Gestiona órdenes de compra y reabastecimiento
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPDF}
          >
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            aria-label="Nueva orden de compra"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nueva Orden
          </Button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover-lift relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Total Órdenes</CardTitle>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-primary">
              {totalPurchases}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Histórico de compras
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift relative overflow-hidden">
          <div className="absolute inset-0 bg-warning/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-warning" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-warning">
              {pendingPurchases}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Órdenes por recibir
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift relative overflow-hidden">
          <div className="absolute inset-0 bg-success/5" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Gasto Total</CardTitle>
            <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-success">
              {formatCurrency(totalSpent)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              En órdenes recibidas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Layout Único: Gráficos arriba lado a lado, Tabla abajo ancho completo */}
      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 text-primary" />
              </div>
              Gasto por Proveedor (Top 5)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={supplierData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="name"
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === 'gasto') return formatCurrency(value)
                    return value
                  }}
                />
                <Bar
                  dataKey="gasto"
                  fill="hsl(var(--primary))"
                  name="Gasto Total"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              Estado de Órdenes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Compras */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 text-primary" />
              </div>
              Historial de Compras
            </CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por proveedor, ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
                aria-label="Buscar compras"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground font-medium">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Fecha</th>
                    <th className="px-4 py-3">Proveedor</th>
                    <th className="px-4 py-3">Items</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3 text-right">Total</th>
                    <th className="px-4 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {filteredPurchases.length > 0 ? (
                    filteredPurchases.map((purchase: Purchase) => (
                      <tr key={purchase.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs">{purchase.id.slice(0, 8)}</td>
                        <td className="px-4 py-3">
                          {format(new Date(purchase.createdAt), 'dd MMM yyyy', { locale: es })}
                        </td>
                        <td className="px-4 py-3 font-medium">{purchase.supplierName}</td>
                        <td className="px-4 py-3">
                          {purchase.items.length} item(s)
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(purchase.status)}
                        </td>
                        <td className="px-4 py-3 text-right font-bold">
                          {formatCurrency(purchase.total)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => openDetailModal(purchase)}
                              title="Ver detalles"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {purchase.status === 'pending' && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-success hover:text-success"
                                  onClick={() => openReceiveConfirm(purchase)}
                                  title="Marcar como recibido"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-error hover:text-error"
                                  onClick={() => openCancelConfirm(purchase)}
                                  title="Cancelar orden"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                        {searchTerm ? 'No se encontraron órdenes' : 'No hay órdenes de compra registradas'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <PurchaseDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        purchase={viewingPurchase}
      />

      <ConfirmDialog
        isOpen={confirmReceiveOpen}
        onClose={() => !isProcessing && setConfirmReceiveOpen(false)}
        onConfirm={handleConfirmReceive}
        title="Confirmar Recepción"
        message={`¿Confirmar recepción de la orden #${selectedPurchase?.id.slice(0, 8)}? Esto aumentará el stock de los productos.`}
        confirmText="Recibir Orden"
        variant="info"
        isLoading={isProcessing}
      />

      <ConfirmDialog
        isOpen={confirmCancelOpen}
        onClose={() => !isProcessing && setConfirmCancelOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Cancelar Orden"
        message={`¿Estás seguro de cancelar la orden #${selectedPurchase?.id.slice(0, 8)}? Esta acción no se puede deshacer.`}
        confirmText="Cancelar Orden"
        variant="danger"
        isLoading={isProcessing}
      />
    </div>
  )
}
