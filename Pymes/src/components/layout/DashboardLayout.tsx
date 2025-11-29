import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Fixed Sidebar - always visible, never scrolls */}
      <div className="fixed left-0 top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main content - offset by sidebar width, fills remaining space */}
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="p-4 max-w-full h-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
