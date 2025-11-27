import { useState } from 'react'
import { useSuppliersStore, type Supplier } from '@/store/suppliersStore'
import { useToastStore } from '@/store/toastStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { SupplierModal } from '@/components/suppliers/SupplierModal'
import { SupplierDetailModal } from '@/components/suppliers/SupplierDetailModal'
import { Plus, Search, Eye, Edit, Trash2, Building2, Users, Globe } from 'lucide-react'
// import { format } from 'date-fns'
// import { es } from 'date-fns/locale'

export function SuppliersPage() {
  const { suppliers, deleteSupplier } = useSuppliersStore()
  const { addToast } = useToastStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
  const [viewingSupplier, setViewingSupplier] = useState<Supplier | null>(null)

  // Filtrar proveedores
  const filteredSuppliers = suppliers.filter((supplier: Supplier) => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.country?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier)
    setIsModalOpen(true)
  }

  const handleDelete = (supplier: Supplier) => {
    if (window.confirm(`¿Estás seguro de eliminar al proveedor "${supplier.name}"?`)) {
      deleteSupplier(supplier.id)
      addToast({
        type: 'success',
        title: 'Proveedor eliminado',
        message: `${supplier.name} ha sido eliminado correctamente.`
      })
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingSupplier(null)
  }

  const openDetailModal = (supplier: Supplier) => {
    setViewingSupplier(supplier)
    setIsDetailModalOpen(true)
  }

  // Calcular estadísticas
  const totalSuppliers = suppliers.length
  const countriesCount = new Set(suppliers.map(s => s.country).filter(Boolean)).size

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Proveedores</h2>
          <p className="text-muted-foreground">
            Gestiona tu red de proveedores y contactos
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} aria-label="Agregar nuevo proveedor">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proveedor
        </Button>
      </div>

      {/* Métricas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Proveedores</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSuppliers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Proveedores activos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Países</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countriesCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Cobertura internacional
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contactos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSuppliers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Personas de contacto
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Proveedores */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <CardTitle>Lista de Proveedores</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar proveedores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
                aria-label="Buscar proveedores"
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
                    <th className="px-4 py-3">Empresa</th>
                    <th className="px-4 py-3">Contacto</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Teléfono</th>
                    <th className="px-4 py-3">Ubicación</th>
                    <th className="px-4 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {filteredSuppliers.length > 0 ? (
                    filteredSuppliers.map((supplier: Supplier) => (
                      <tr key={supplier.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 font-medium">{supplier.name}</td>
                        <td className="px-4 py-3">{supplier.contactName}</td>
                        <td className="px-4 py-3 text-muted-foreground">{supplier.email}</td>
                        <td className="px-4 py-3">{supplier.phone}</td>
                        <td className="px-4 py-3">
                          {supplier.city && supplier.country ? (
                            <Badge variant="secondary">
                              {supplier.city}, {supplier.country}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground italic">No especificado</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => openDetailModal(supplier)}
                              aria-label={`Ver detalles de ${supplier.name}`}
                              title="Ver detalles"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleEdit(supplier)}
                              aria-label={`Editar ${supplier.name}`}
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-error hover:text-error"
                              onClick={() => handleDelete(supplier)}
                              aria-label={`Eliminar ${supplier.name}`}
                              title="Eliminar"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                        {searchTerm ? 'No se encontraron proveedores' : 'No hay proveedores registrados'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <SupplierModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        supplier={editingSupplier}
      />

      <SupplierDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        supplier={viewingSupplier}
      />
    </div>
  )
}
