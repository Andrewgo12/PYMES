import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <div className="p-4 lg:p-6 max-w-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
