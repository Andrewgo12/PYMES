import { useState } from 'react'
import { useSalesStore, type Sale } from '@/store/salesStore'
// import { useToastStore } from '@/store/toastStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { SaleModal } from '@/components/sales/SaleModal'
import { SaleDetailModal } from '@/components/sales/SaleDetailModal'
import { formatCurrency } from '@/lib/utils'
import { Plus, Search, Eye, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react'
import { format, subDays, startOfDay, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Pagination } from '@/components/ui/Pagination'

export function SalesPage() {
  const { sales, getTotalSales } = useSalesStore()
  // const { addToast } = useToastStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [viewingSale, setViewingSale] = useState<Sale | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  // Filtrar ventas
  const filteredSales = sales.filter((sale: Sale) => {
    const matchesSearch = 
      sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.items.some(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  // Pagination Logic
  const totalPages = Math.ceil(filteredSales.length / ITEMS_PER_PAGE)
  const paginatedSales = filteredSales.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  // Calcular métricas
  const totalSales = getTotalSales()
  const todaySales = sales.filter(s => {
    const saleDate = new Date(s.createdAt)
    const today = new Date()
    return saleDate.toDateString() === today.toDateString()
  })
  const todayTotal = todaySales.reduce((sum, s) => sum + s.total, 0)

  // Datos para gráfico de ventas (últimos 7 días)
  const last7DaysSales = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 6 - i))
    const daySales = sales.filter(s => 
      isSameDay(new Date(s.createdAt), date)
    )
    const total = daySales.reduce((sum, s) => sum + s.total, 0)
    
    return {
      date: format(date, 'EEE', { locale: es }),
      ventas: total,
      cantidad: daySales.length
    }
  })

  // Datos para gráfico de métodos de pago
  const paymentMethods = sales.reduce((acc, sale) => {
    const method = sale.paymentMethod
    if (!acc[method]) {
      acc[method] = { method, count: 0, total: 0 }
    }
    acc[method].count++
    acc[method].total += sale.total
    return acc
  }, {} as Record<string, { method: string; count: number; total: number }>)

  const paymentData = Object.values(paymentMethods).map(pm => ({
    name: pm.method.charAt(0).toUpperCase() + pm.method.slice(1),
    ventas: pm.count,
    monto: pm.total
  }))

  const openDetailModal = (sale: Sale) => {
    setViewingSale(sale)
    setIsDetailModalOpen(true)
  }

  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case 'efectivo':
        return <Badge variant="success">Efectivo</Badge>
      case 'tarjeta':
        return <Badge variant="secondary">Tarjeta</Badge>
      case 'transferencia':
        return <Badge variant="default">Transferencia</Badge>
      default:
        return <Badge>{method}</Badge>
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ventas</h2>
          <p className="text-muted-foreground">
            Gestiona y registra todas tus transacciones de venta
          </p>
        </div>
        <Button onClick={() => setIsSaleModalOpen(true)} aria-label="Registrar nueva venta">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Venta
        </Button>
      </div>

      {/* Métricas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ventas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSales)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {sales.length} transacciones totales
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(todayTotal)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {todaySales.length} ventas realizadas
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(sales.length > 0 ? totalSales / sales.length : 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Por transacción
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Layout Único: Tabla a la izquierda (60%), Gráficos apilados a la derecha (40%) */}
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Tabla de Ventas - 3 columnas */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <CardTitle>Historial de Ventas</CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cliente, producto o ID..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-8"
                  aria-label="Buscar ventas"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border overflow-hidden">
              <div className="overflow-x-auto max-h-[600px]">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium sticky top-0">
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Fecha</th>
                      <th className="px-4 py-3">Cliente</th>
                      <th className="px-4 py-3">Items</th>
                      <th className="px-4 py-3">Pago</th>
                      <th className="px-4 py-3 text-right">Total</th>
                      <th className="px-4 py-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {paginatedSales.length > 0 ? (
                      paginatedSales.map((sale: Sale) => (
                        <tr key={sale.id} className="hover:bg-muted/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs">{sale.id.slice(0, 8)}</td>
                          <td className="px-4 py-3">
                            {format(new Date(sale.createdAt), 'dd MMM yyyy HH:mm', { locale: es })}
                          </td>
                          <td className="px-4 py-3">
                            {sale.clientName || <span className="text-muted-foreground italic">Sin cliente</span>}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-muted-foreground">{sale.items.length} item(s)</span>
                          </td>
                          <td className="px-4 py-3">
                            {getPaymentMethodBadge(sale.paymentMethod)}
                          </td>
                          <td className="px-4 py-3 text-right font-bold">
                            {formatCurrency(sale.total)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => openDetailModal(sale)}
                              aria-label={`Ver detalles de venta ${sale.id}`}
                              title="Ver detalles"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                          {searchTerm ? 'No se encontraron ventas' : 'No hay ventas registradas'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredSales.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </CardContent>
        </Card>

        {/* Gráficos apilados - 2 columnas */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ventas Últimos 7 Días</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={last7DaysSales}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                    tick={{ fill: 'currentColor' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'currentColor' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px'
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ventas" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Ventas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pago</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={paymentData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="name" 
                    className="text-xs"
                    tick={{ fill: 'currentColor' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'currentColor' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="ventas" fill="hsl(var(--primary))" name="Cantidad" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      <SaleModal
        isOpen={isSaleModalOpen}
        onClose={() => setIsSaleModalOpen(false)}
      />

      <SaleDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        sale={viewingSale}
      />
    </div>
  )
}
