import { useProductsStore } from '@/store/productsStore'
import { useToastStore } from '@/store/toastStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, DollarSign, FileSpreadsheet, FileText } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { exportReportsToExcel, exportReportsToPDF } from '@/lib/exportUtils'

const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--error))', 'hsl(var(--info))']

export function ReportsPage() {
  const { products } = useProductsStore()
  const { addToast } = useToastStore()

  // Calcular métricas reales
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0)

  // Valor por categoría
  const valueByCategory = products.reduce((acc: Record<string, number>, p) => {
    acc[p.category] = (acc[p.category] || 0) + (p.price * p.stock)
    return acc
  }, {})

  // Stock por categoría
  const stockByCategory = products.reduce((acc: Record<string, number>, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.stock
    return acc
  }, {})

  const categories = Object.keys(valueByCategory)

  // Datos para gráfico de barras
  const barChartData = categories.map(cat => ({
    categoria: cat,
    valor: valueByCategory[cat],
    stock: stockByCategory[cat]
  }))

  // Datos para gráfico de pie
  const pieChartData = categories.map(cat => ({
    name: cat,
    value: stockByCategory[cat]
  }))

  const handleExportExcel = () => {
    exportReportsToExcel(valueByCategory, stockByCategory)
    addToast({
      type: 'success',
      title: 'Exportado a Excel',
      message: 'El reporte se ha descargado correctamente.'
    })
  }

  const handleExportPDF = () => {
    exportReportsToPDF(valueByCategory, stockByCategory, totalValue)
    addToast({
      type: 'success',
      title: 'Exportado a PDF',
      message: 'El reporte se ha descargado correctamente.'
    })
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Reportes
          </h2>
          <p className="text-muted-foreground mt-1">
            Análisis visual del rendimiento y estado del inventario.
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
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Valor del Inventario por Categoría */}
        <Card className="hover-lift">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Valor por Categoría</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {categories.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="categoria"
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
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="valor" fill="hsl(var(--primary))" name="Valor Total" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-muted-foreground py-8">No hay datos disponibles</p>
            )}
          </CardContent>
        </Card>

        {/* Distribución de Stock */}
        <Card className="hover-lift">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <CardTitle>Distribución de Stock</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {categories.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-muted-foreground py-8">No hay datos disponibles</p>
            )}
          </CardContent>
        </Card>

        {/* Resumen General */}
        <Card className="md:col-span-2 hover-lift">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Resumen Financiero</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Valor Total Inventario</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(totalValue)}</p>
              </div>
              <div className="p-4 bg-success/5 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Categoría Más Valiosa</p>
                <p className="text-2xl font-bold text-success capitalize">
                  {categories.sort((a, b) => valueByCategory[b] - valueByCategory[a])[0] || '-'}
                </p>
              </div>
              <div className="p-4 bg-warning/5 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Promedio por Producto</p>
                <p className="text-2xl font-bold text-warning">
                  {formatCurrency(products.length ? totalValue / products.length : 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
