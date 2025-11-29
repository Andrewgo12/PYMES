import { useState, useRef, useEffect } from 'react'
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
  FileText,
  Package
} from 'lucide-react'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useKeyboardShortcuts } from '@/lib/useKeyboardShortcuts'

export function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductsStore()
  const { addToast } = useToastStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

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

  const handleDelete = (product: Product) => {
    setProductToDelete(product)
    setIsConfirmDialogOpen(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id)
      addToast({
        type: 'success',
        title: 'Producto eliminado',
        message: `${productToDelete.name} ha sido eliminado del inventario.`
      })
      setProductToDelete(null)
    }
    setIsConfirmDialogOpen(false)
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Productos</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Gestiona tu catálogo de productos ({products.length} total)
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleExportExcel} aria-label="Exportar a Excel" className="flex-1 md:flex-none">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF} aria-label="Exportar a PDF" className="flex-1 md:flex-none">
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button onClick={openAddModal} aria-label="Crear nuevo producto" className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      <Card className="border-2">
        <CardHeader className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o SKU..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8"
                aria-label="Buscar productos"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar" role="tablist" aria-label="Filtros de categoría">
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
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                <tr>
                  <th className="px-4 py-3 pl-6 whitespace-nowrap">Producto</th>
                  <th className="px-4 py-3 whitespace-nowrap">SKU</th>
                  <th className="px-4 py-3 whitespace-nowrap">Categoría</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">Precio</th>
                  <th className="px-4 py-3 text-center whitespace-nowrap">Stock</th>
                  <th className="px-4 py-3 text-center whitespace-nowrap">Estado</th>
                  <th className="px-4 py-3 text-right pr-6 whitespace-nowrap">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product: Product) => (
                    <tr key={product.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="px-4 py-3 pl-6 font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border shrink-0">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                            ) : (
                              <Package className="h-5 w-5 text-muted-foreground/50" />
                            )}
                          </div>
                          <span className="font-semibold text-foreground line-clamp-2">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs whitespace-nowrap">{product.sku}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant="secondary" className="capitalize font-normal">
                          {product.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right font-medium tabular-nums whitespace-nowrap">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-4 py-3 text-center tabular-nums whitespace-nowrap">
                        {product.stock}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {product.stock <= product.minStock ? (
                          <Badge variant="error">Bajo Stock</Badge>
                        ) : (
                          <Badge variant="success">En Stock</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right pr-6 whitespace-nowrap">
                        <div className="flex justify-end gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                            onClick={() => openDetailModal(product)}
                            aria-label={`Ver detalles de ${product.name}`}
                            title="Ver detalles"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                            onClick={() => openEditModal(product)}
                            aria-label={`Editar ${product.name}`}
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-error/70 hover:text-error hover:bg-error/10"
                            onClick={() => handleDelete(product)}
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
                    <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search className="h-8 w-8 text-muted-foreground/30" />
                        <p>No se encontraron productos</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-border">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredProducts.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
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

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar Producto"
        message={`¿Estás seguro de eliminar "${productToDelete?.name}"? Esta acción no se puede deshacer y se eliminará permanentemente del inventario.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
      />
    </div>
  )
}
