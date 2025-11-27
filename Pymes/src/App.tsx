import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ProductsPage } from '@/pages/ProductsPage'
import { InventoryPage } from '@/pages/InventoryPage'
import { SalesPage } from '@/pages/SalesPage'
import { SuppliersPage } from '@/pages/SuppliersPage'
import { ClientsPage } from '@/pages/ClientsPage'
import { PurchasesPage } from '@/pages/PurchasesPage'
import { ReportsPage } from '@/pages/ReportsPage'
import { ConfigurationPage } from '@/pages/ConfigurationPage'
import { Toaster } from '@/components/ui/Toaster'

// Componente para proteger rutas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function App() {
  const { isDarkMode } = useThemeStore()

  // Initialize theme on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="productos" element={<ProductsPage />} />
          <Route path="inventario" element={<InventoryPage />} />
          <Route path="ventas" element={<SalesPage />} />
          <Route path="compras" element={<PurchasesPage />} />
          <Route path="proveedores" element={<SuppliersPage />} />
          <Route path="clientes" element={<ClientsPage />} />
          <Route path="reportes" element={<ReportsPage />} />
          <Route path="configuracion" element={<ConfigurationPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
