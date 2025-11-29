import { useProductsStore } from '@/store/productsStore'
import { useSalesStore } from '@/store/salesStore'
import { useClientsStore } from '@/store/clientsStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { DollarSign, Package, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function DashboardPage() {
    const products = useProductsStore((state) => state.products)
    const sales = useSalesStore((state) => state.sales)
    const clients = useClientsStore((state) => state.clients)

    // Calculate stats
    const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0)
    const totalProducts = products.length
    const lowStockProducts = products.filter((p) => p.stock <= p.minStock).length
    const totalClients = clients.length

    // Prepare chart data (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - i)
        return d.toISOString().split('T')[0]
    }).reverse()

    const chartData = last7Days.map((date) => {
        const daySales = sales.filter((s) => s.createdAt.startsWith(date))
        return {
            name: new Date(date).toLocaleDateString('es-ES', { weekday: 'short' }),
            total: daySales.reduce((acc, s) => acc + s.total, 0),
        }
    })

    return (
        <div className="space-y-4 animate-fade-in h-full flex flex-col">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-xs text-muted-foreground">Resumen general de tu negocio</p>
            </div>

            {/* Stats Grid - Compact */}
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                        <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
                        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">${totalSales.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 text-success mr-1" />
                            +20.1% vs mes anterior
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                        <CardTitle className="text-sm font-medium">Productos</CardTitle>
                        <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                            <Package className="h-4 w-4 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">{totalProducts}</div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 text-primary mr-1" />
                            {lowStockProducts} con stock bajo
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                        <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                        <div className="h-8 w-8 rounded-md bg-green-100 flex items-center justify-center">
                            <ShoppingCart className="h-4 w-4 text-green-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">{sales.length}</div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 text-success mr-1" />
                            +12 this week
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                        <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                        <div className="h-8 w-8 rounded-md bg-orange-100 flex items-center justify-center">
                            <Users className="h-4 w-4 text-orange-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">{totalClients}</div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 text-success mr-1" />
                            +2 nuevos hoy
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-7 flex-1 min-h-0">
                {/* Chart - Takes up more space */}
                <Card className="col-span-4 flex flex-col">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Resumen de Ventas</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-0 flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        borderColor: 'hsl(var(--border))',
                                        borderRadius: 'var(--radius)',
                                        fontSize: '12px',
                                        padding: '8px'
                                    }}
                                />
                                <Bar
                                    dataKey="total"
                                    fill="hsl(var(--primary))"
                                    radius={[4, 4, 0, 0]}
                                    barSize={30}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Recent Sales - Compact List */}
                <Card className="col-span-3 flex flex-col">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Ventas Recientes</CardTitle>
                        <p className="text-xs text-muted-foreground">
                            Últimas 5 transacciones
                        </p>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto pr-1">
                        <div className="space-y-3">
                            {sales.slice(0, 5).map((sale) => (
                                <div key={sale.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <DollarSign className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-medium leading-none">
                                                {sale.clientName || 'Cliente General'}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(sale.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="font-bold text-sm">
                                        +${sale.total.toLocaleString()}
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
