import { useState } from 'react'
import { useProductsStore, type Product } from '@/store/productsStore'
import { useToastStore } from '@/store/toastStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils'
import { exportProductsToExcel, exportProductsToPDF } from '@/lib/exportUtils'
import { ProductModal } from '@/components/products/ProductModal'
import { ProductDetailModal } from '@/components/products/ProductDetailModal'
import { Pagination } from '@/components/ui/Pagination'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Eye,
  FileSpreadsheet,
  FileText
} from 'lucide-react'

export function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductsStore()
  const { addToast } = useToastStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null)

  // Filtrar productos
  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  // Obtener categorías únicas
  const categories = ['all', ...new Set(products.map((p: Product) => p.category))]

  const handleAddProduct = (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    addProduct(data)
    addToast({
      type: 'success',
      title: 'Producto creado',
      message: `Se ha creado el producto ${data.name} correctamente.`
    })
  }

  const handleEditProduct = (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data)
      addToast({
        type: 'success',
        title: 'Producto actualizado',
        message: 'Los cambios se han guardado correctamente.'
      })
    }
  }

  const openAddModal = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const openDetailModal = (product: Product) => {
    setViewingProduct(product)
    setIsDetailModalOpen(true)
  }

  const handleEditFromDetail = (product: Product) => {
    setViewingProduct(null)
    setIsDetailModalOpen(false)
    openEditModal(product)
  }

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.')) {
      deleteProduct(id)
      addToast({
        type: 'success',
        title: 'Producto eliminado',
        message: 'El producto ha sido eliminado del inventario.'
      })
    }
  }

  const handleExportExcel = () => {
    exportProductsToExcel(filteredProducts)
    addToast({
      type: 'success',
      title: 'Exportado a Excel',
      message: 'El archivo se ha descargado correctamente.'
    })
  }

  const handleExportPDF = () => {
    exportProductsToPDF(filteredProducts)
    addToast({
      type: 'success',
      title: 'Exportado a PDF',
      message: 'El archivo se ha descargado correctamente.'
    })
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Productos</h2>
          <p className="text-muted-foreground">
            Gestiona tu catálogo de productos ({products.length} total)
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportExcel} aria-label="Exportar a Excel">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF} aria-label="Exportar a PDF">
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button onClick={openAddModal} aria-label="Crear nuevo producto">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o SKU..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8"
                aria-label="Buscar productos"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0" role="tablist" aria-label="Filtros de categoría">
              {categories.map((cat: string) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(cat)}
                  className="capitalize whitespace-nowrap"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                >
                  {cat === 'all' ? 'Todos' : cat}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground font-medium">
                  <tr>
                    <th className="px-4 py-3">Producto</th>
                    <th className="px-4 py-3">SKU</th>
                    <th className="px-4 py-3">Categoría</th>
                    <th className="px-4 py-3 text-right">Precio</th>
                    <th className="px-4 py-3 text-center">Stock</th>
                    <th className="px-4 py-3 text-center">Estado</th>
                    <th className="px-4 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product: Product) => (
                      <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 font-medium">{product.name}</td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{product.sku}</td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary" className="capitalize">
                            {product.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">
                          {formatCurrency(product.price)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {product.stock}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {product.stock <= product.minStock ? (
                            <Badge variant="error">Bajo Stock</Badge>
                          ) : (
                            <Badge variant="success">En Stock</Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => openDetailModal(product)}
                              aria-label={`Ver detalles de ${product.name}`}
                              title="Ver detalles"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => openEditModal(product)}
                              aria-label={`Editar ${product.name}`}
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-error hover:text-error hover:bg-error/10"
                              onClick={() => handleDelete(product.id)}
                              aria-label={`Eliminar ${product.name}`}
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
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                        No se encontraron productos
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
            totalItems={filteredProducts.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </CardContent>
      </Card>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        initialData={editingProduct}
        title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
      />

      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={viewingProduct}
        onEdit={handleEditFromDetail}
      />
    </div>
  )
}
