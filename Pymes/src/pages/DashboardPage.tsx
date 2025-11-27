import { useProductsStore, type Product } from '@/store/productsStore'
import { useMovementsStore } from '@/store/movementsStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { 
  DollarSign, 
  Package, 
  AlertTriangle, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { subDays, format, startOfDay, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'

export function DashboardPage() {
  const { products } = useProductsStore()
  const { movements } = useMovementsStore()

  // Calcular métricas
  const totalProducts = products.length
  const totalStock = products.reduce((acc: number, p: Product) => acc + p.stock, 0)
  const totalValue = products.reduce((acc: number, p: Product) => acc + (p.price * p.stock), 0)
  const lowStockProducts = products.filter((p: Product) => p.stock <= p.minStock).length

  // Preparar datos para el gráfico de movimientos (últimos 7 días)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 6 - i))
    const dayMovements = movements.filter(m => 
      isSameDay(new Date(m.createdAt), date)
    )
    
    const totalIn = dayMovements
      .filter(m => m.quantity > 0)
      .reduce((sum, m) => sum + m.quantity, 0)
    
    const totalOut = dayMovements
      .filter(m => m.quantity < 0)
      .reduce((sum, m) => sum + Math.abs(m.quantity), 0)

    return {
      date: format(date, 'EEE', { locale: es }),
      entradas: totalIn,
      salidas: totalOut,
      neto: totalIn - totalOut
    }
  })

  const stats = [
    {
      title: 'Valor Total Inventario',
      value: formatCurrency(totalValue),
      icon: DollarSign,
      trend: '+12.5%',
      trendUp: true,
      description: 'vs. mes anterior'
    },
    {
      title: 'Total Productos',
      value: formatNumber(totalProducts),
      icon: Package,
      trend: '+4',
      trendUp: true,
      description: 'nuevos este mes'
    },
    {
      title: 'Stock Total',
      value: formatNumber(totalStock),
      icon: TrendingUp,
      trend: '-2.3%',
      trendUp: false,
      description: 'unidades en almacén'
    },
    {
      title: 'Stock Bajo',
      value: lowStockProducts.toString(),
      icon: AlertTriangle,
      trend: lowStockProducts > 0 ? 'Requiere atención' : 'Todo en orden',
      trendUp: lowStockProducts === 0,
      description: 'productos bajo mínimo',
      alert: lowStockProducts > 0
    }
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Resumen general de tu inventario y métricas clave.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.alert ? 'text-error' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {stat.trendUp ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-success" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-error" />
                )}
                <span className={stat.trendUp ? 'text-success' : 'text-error'}>
                  {stat.trend}
                </span>
                <span className="ml-1 text-muted-foreground">
                  {stat.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Movimientos de Inventario (Últimos 7 días)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={last7Days}>
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
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="entradas" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Entradas"
                />
                <Line 
                  type="monotone" 
                  dataKey="salidas" 
                  stroke="hsl(var(--error))" 
                  strokeWidth={2}
                  name="Salidas"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Productos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.sku}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {formatCurrency(product.price)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
