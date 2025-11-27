import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - ocupa su propio espacio */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Sidebar móvil - overlay */}
      <div className="lg:hidden">
        <Sidebar />
      </div>
      
      {/* Contenido principal - se adapta al espacio restante */}
      <main className="flex-1 min-w-0">
        <div className="p-4 lg:p-6 max-w-full h-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
