"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Grid3X3,
  List,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Trash2,
  BarChart3,
  Package,
  DollarSign,
  Star,
  QrCode,
  Camera,
  Users,
  History,
  Layers,
  ShoppingCart,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductDetailModal } from "./modals/product-detail-modal"
import { ProductFormModal } from "./modals/product-form-modal"
import { ProductGalleryModal } from "./modals/product-gallery-modal"
import { ProductCategoriesModal } from "./modals/product-categories-modal"
import { ProductBulkEditModal } from "./modals/product-bulk-edit-modal"
import { ProductCompareModal } from "./modals/product-compare-modal"
import { ProductHistoryModal } from "./modals/product-history-modal"
import { ProductSuppliersModal } from "./modals/product-suppliers-modal"

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    sku: "IPH15P-128-BLU",
    category: "Smartphones",
    price: 999.99,
    dynamicPrice: 1049.99,
    stock: 45,
    status: "active",
    image: "/iphone-15-pro-hands.png",
    variants: ["128GB", "256GB", "512GB"],
    colors: ["Azul", "Negro", "Blanco", "Natural"],
    supplier: "Apple Inc.",
    barcode: "123456789012",
    rating: 4.8,
    sales: 234,
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    name: "MacBook Air M3",
    sku: "MBA-M3-13-SLV",
    category: "Laptops",
    price: 1299.99,
    dynamicPrice: 1199.99,
    stock: 23,
    status: "active",
    image: "/macbook-air-m3.png",
    variants: ["13 pulgadas", "15 pulgadas"],
    colors: ["Plata", "Gris Espacial", "Oro", "Azul Medianoche"],
    supplier: "Apple Inc.",
    barcode: "123456789013",
    rating: 4.9,
    sales: 156,
    lastUpdated: "2024-01-14",
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    sku: "APP2-USB-C",
    category: "Accesorios",
    price: 249.99,
    dynamicPrice: 229.99,
    stock: 78,
    status: "active",
    image: "/airpods-pro-2.jpg",
    variants: ["USB-C", "Lightning"],
    colors: ["Blanco"],
    supplier: "Apple Inc.",
    barcode: "123456789014",
    rating: 4.7,
    sales: 445,
    lastUpdated: "2024-01-13",
  },
  {
    id: 4,
    name: "Samsung Galaxy S24",
    sku: "SGS24-256-BLK",
    category: "Smartphones",
    price: 899.99,
    dynamicPrice: 849.99,
    stock: 12,
    status: "low_stock",
    image: "/samsung-galaxy-s24.jpg",
    variants: ["128GB", "256GB", "512GB"],
    colors: ["Negro", "Violeta", "Amarillo", "Verde"],
    supplier: "Samsung Electronics",
    barcode: "123456789015",
    rating: 4.6,
    sales: 189,
    lastUpdated: "2024-01-12",
  },
  {
    id: 5,
    name: "iPad Pro 12.9",
    sku: "IPP-129-1TB-SLV",
    category: "Tablets",
    price: 1599.99,
    dynamicPrice: 1499.99,
    stock: 0,
    status: "out_of_stock",
    image: "/ipad-pro-12-9.jpg",
    variants: ["128GB", "256GB", "512GB", "1TB", "2TB"],
    colors: ["Plata", "Gris Espacial"],
    supplier: "Apple Inc.",
    barcode: "123456789016",
    rating: 4.8,
    sales: 67,
    lastUpdated: "2024-01-11",
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    sku: "SONY-WH1000XM5-BLK",
    category: "Audio",
    price: 399.99,
    dynamicPrice: 379.99,
    stock: 34,
    status: "active",
    image: "/sony-wh-1000xm5.jpg",
    variants: ["Inalámbricos"],
    colors: ["Negro", "Plata"],
    supplier: "Sony Corporation",
    barcode: "123456789017",
    rating: 4.9,
    sales: 298,
    lastUpdated: "2024-01-10",
  },
]

const categories = [
  { id: "all", name: "Todos", count: products.length },
  { id: "smartphones", name: "Smartphones", count: 2 },
  { id: "laptops", name: "Laptops", count: 1 },
  { id: "tablets", name: "Tablets", count: 1 },
  { id: "accesorios", name: "Accesorios", count: 1 },
  { id: "audio", name: "Audio", count: 1 },
]

export function ProductsContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [sortBy, setSortBy] = useState("name")
  const [filterStatus, setFilterStatus] = useState("all")

  const openModal = (modalType: string, product?: any) => {
    setSelectedProduct(product || null)
    setActiveModal(modalType)
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedProduct(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "low_stock":
        return "bg-yellow-500"
      case "out_of_stock":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "low_stock":
        return "Stock Bajo"
      case "out_of_stock":
        return "Agotado"
      default:
        return "Desconocido"
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory
    const matchesStatus = filterStatus === "all" || product.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Productos</h1>
          <p className="text-muted-foreground">
            Gestiona tu catálogo de productos con códigos de barras y precios dinámicos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => openModal("categories")}>
            <Layers className="h-4 w-4 mr-2" />
            Categorías
          </Button>
          <Button variant="outline" onClick={() => openModal("suppliers")}>
            <Users className="h-4 w-4 mr-2" />
            Proveedores
          </Button>
          <Button onClick={() => openModal("form")}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      {/* Controles y Filtros */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos por nombre o SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name} ({category.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="low_stock">Stock Bajo</SelectItem>
            <SelectItem value="out_of_stock">Agotados</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nombre</SelectItem>
            <SelectItem value="price">Precio</SelectItem>
            <SelectItem value="stock">Stock</SelectItem>
            <SelectItem value="sales">Ventas</SelectItem>
            <SelectItem value="rating">Calificación</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1 border rounded-lg p-1">
          <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Acciones Masivas */}
      {selectedProducts.length > 0 && (
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedProducts.length} producto{selectedProducts.length > 1 ? "s" : ""} seleccionado
                {selectedProducts.length > 1 ? "s" : ""}
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openModal("bulk-edit")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edición Masiva
                </Button>
                <Button size="sm" variant="outline" onClick={() => openModal("compare")}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Comparar
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista/Grid de Productos */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader className="p-4">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg bg-muted"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Badge variant="outline" className={`text-xs ${getStatusColor(product.status)} text-white`}>
                      {getStatusText(product.status)}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      className="rounded"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-card-foreground line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.sku}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openModal("detail", product)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openModal("form", product)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openModal("gallery", product)}>
                          <Camera className="h-4 w-4 mr-2" />
                          Galería
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openModal("history", product)}>
                          <History className="h-4 w-4 mr-2" />
                          Historial
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <QrCode className="h-4 w-4 mr-2" />
                          Código de Barras
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{product.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Precio:</span>
                      <div className="flex items-center gap-2">
                        {product.dynamicPrice !== product.price && (
                          <span className="text-xs text-muted-foreground line-through">${product.price}</span>
                        )}
                        <span className="font-semibold text-green-600">${product.dynamicPrice}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Stock:</span>
                      <span className={`text-sm font-medium ${product.stock < 20 ? "text-red-500" : "text-green-600"}`}>
                        {product.stock} unidades
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Ventas:</span>
                      <span className="text-sm font-medium">{product.sales}</span>
                    </div>
                  </div>

                  <div className="flex gap-1 flex-wrap">
                    {product.variants.slice(0, 2).map((variant, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {variant}
                      </Badge>
                    ))}
                    {product.variants.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{product.variants.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left">
                    <th className="p-4 w-12">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="p-4">Producto</th>
                    <th className="p-4">SKU</th>
                    <th className="p-4">Categoría</th>
                    <th className="p-4">Precio</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4">Ventas</th>
                    <th className="p-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-muted"
                          />
                          <div>
                            <div className="font-medium text-card-foreground">{product.name}</div>
                            <div className="text-xs text-muted-foreground">{product.supplier}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-sm">{product.sku}</td>
                      <td className="p-4">
                        <Badge variant="secondary">{product.category}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-green-600">${product.dynamicPrice}</span>
                          {product.dynamicPrice !== product.price && (
                            <span className="text-xs text-muted-foreground line-through">${product.price}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`font-medium ${product.stock < 20 ? "text-red-500" : "text-green-600"}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={`${getStatusColor(product.status)} text-white`}>
                          {getStatusText(product.status)}
                        </Badge>
                      </td>
                      <td className="p-4">{product.sales}</td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openModal("detail", product)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalle
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openModal("form", product)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openModal("gallery", product)}>
                              <Camera className="h-4 w-4 mr-2" />
                              Galería
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openModal("history", product)}>
                              <History className="h-4 w-4 mr-2" />
                              Historial
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estadísticas Rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{products.length}</div>
                <div className="text-sm text-muted-foreground">Total Productos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  ${products.reduce((sum, p) => sum + p.dynamicPrice, 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Valor Total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">{products.reduce((sum, p) => sum + p.sales, 0)}</div>
                <div className="text-sm text-muted-foreground">Ventas Totales</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">
                  {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Calificación Promedio</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modales Exclusivos de Productos */}
      <ProductDetailModal isOpen={activeModal === "detail"} onClose={closeModal} product={selectedProduct} />
      <ProductFormModal isOpen={activeModal === "form"} onClose={closeModal} product={selectedProduct} />
      <ProductGalleryModal isOpen={activeModal === "gallery"} onClose={closeModal} product={selectedProduct} />
      <ProductCategoriesModal isOpen={activeModal === "categories"} onClose={closeModal} categories={categories} />
      <ProductBulkEditModal
        isOpen={activeModal === "bulk-edit"}
        onClose={closeModal}
        selectedProducts={selectedProducts}
        products={products}
      />
      <ProductCompareModal
        isOpen={activeModal === "compare"}
        onClose={closeModal}
        selectedProducts={selectedProducts}
        products={products}
      />
      <ProductHistoryModal isOpen={activeModal === "history"} onClose={closeModal} product={selectedProduct} />
      <ProductSuppliersModal isOpen={activeModal === "suppliers"} onClose={closeModal} />
    </div>
  )
}
