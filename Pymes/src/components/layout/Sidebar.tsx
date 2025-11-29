import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Package,
    Warehouse,
    ShoppingCart,
    ShoppingBag,
    Building2,
    Users,
    BarChart3,
    Settings,
    LogOut,
} from 'lucide-react'
import { Button } from '../ui/Button'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Productos', href: '/productos', icon: Package },
    { name: 'Inventario', href: '/inventario', icon: Warehouse },
    { name: 'Ventas', href: '/ventas', icon: ShoppingCart },
    { name: 'Compras', href: '/compras', icon: ShoppingBag },
    { name: 'Proveedores', href: '/proveedores', icon: Building2 },
    { name: 'Clientes', href: '/clientes', icon: Users },
    { name: 'Reportes', href: '/reportes', icon: BarChart3 },
    { name: 'Configuración', href: '/configuracion', icon: Settings },
]

export function Sidebar() {
    const location = useLocation()
    const { user, logout } = useAuthStore()

    return (
        <aside className="w-64 bg-card border-r-2 border-border h-screen flex-shrink-0 shadow-lg flex flex-col">
            {/* Logo - Solid Background */}
            <div className="p-4 border-b-2 border-border bg-card flex-shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-105">
                        <Package className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="font-bold text-base tracking-tight text-foreground">PYMES</h1>
                        <p className="text-[10px] text-muted-foreground font-medium">Inventario</p>
                    </div>
                </div>
            </div>

            {/* Navigation - Solid Colors */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                                'flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 font-medium border-2 text-sm',
                                isActive
                                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                                    : 'text-foreground hover:bg-muted border-transparent hover:border-border'
                            )}
                        >
                            <item.icon className={cn(
                                "w-4 h-4",
                                isActive ? "text-primary-foreground" : "text-muted-foreground"
                            )} />
                            <span className="text-sm">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* User info - Solid Background */}
            <div className="p-3 border-t-2 border-border bg-card flex-shrink-0">
                <div className="flex items-center gap-2.5 mb-2 p-1.5 rounded-lg hover:bg-muted transition-colors duration-200">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
                        <span className="text-xs font-bold text-primary">
                            {user?.name.charAt(0)}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate text-foreground">{user?.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full hover:bg-error hover:text-white hover:border-error h-8 text-xs transition-colors"
                    onClick={logout}
                >
                    <LogOut className="w-3 h-3 mr-1.5" />
                    Cerrar Sesión
                </Button>
            </div>
        </aside>
    )
}
