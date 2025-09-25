"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Layers, Plus, Edit, Trash2, Search, Tag, TrendingUp, Package, DollarSign, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface ProductCategoriesModalProps {
  isOpen: boolean
  onClose: () => void
  categories: any[]
}

export function ProductCategoriesModal({ isOpen, onClose, categories }: ProductCategoriesModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)

  const detailedCategories = [
    {
      id: "smartphones",
      name: "Smartphones",
      description: "Teléfonos inteligentes de todas las marcas",
      productCount: 45,
      totalValue: 125000,
      avgPrice: 899,
      status: "active",
      parent: null,
      subcategories: ["iPhone", "Samsung Galaxy", "Google Pixel"],
      created: "2024-01-01",
      lastUpdated: "2024-01-15",
    },
    {
      id: "laptops",
      name: "Laptops",
      description: "Computadoras portátiles para trabajo y gaming",
      productCount: 23,
      totalValue: 89000,
      avgPrice: 1299,
      status: "active",
      parent: null,
      subcategories: ["MacBook", "ThinkPad", "Gaming"],
      created: "2024-01-01",
      lastUpdated: "2024-01-14",
    },
    {
      id: "tablets",
      name: "Tablets",
      description: "Tabletas para entretenimiento y productividad",
      productCount: 12,
      totalValue: 18000,
      avgPrice: 599,
      status: "active",
      parent: null,
      subcategories: ["iPad", "Android Tablets"],
      created: "2024-01-01",
      lastUpdated: "2024-01-13",
    },
    {
      id: "accesorios",
      name: "Accesorios",
      description: "Complementos y accesorios para dispositivos",
      productCount: 78,
      totalValue: 15600,
      avgPrice: 199,
      status: "active",
      parent: null,
      subcategories: ["Fundas", "Cargadores", "Cables"],
      created: "2024-01-01",
      lastUpdated: "2024-01-12",
    },
    {
      id: "audio",
      name: "Audio",
      description: "Auriculares, altavoces y equipos de audio",
      productCount: 34,
      totalValue: 25500,
      avgPrice: 299,
      status: "active",
      parent: null,
      subcategories: ["Auriculares", "Altavoces", "Micrófonos"],
      created: "2024-01-01",
      lastUpdated: "2024-01-11",
    },
  ]

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parent: "",
    status: "active",
  })

  const filteredCategories = detailedCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (category: any) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      parent: category.parent || "",
      status: category.status,
    })
    setShowForm(true)
  }

  const handleSubmit = () => {
    // Lógica para crear/editar categoría
    setShowForm(false)
    setEditingCategory(null)
    setFormData({ name: "", description: "", parent: "", status: "active" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Gestión de Categorías
          </DialogTitle>
          <DialogDescription>Organiza tus productos en categorías para mejor gestión</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Controles */}
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar categorías..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Categoría
            </Button>
          </div>

          {/* Estadísticas Generales */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold">{detailedCategories.length}</div>
                    <div className="text-sm text-muted-foreground">Categorías Activas</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold">
                      {detailedCategories.reduce((sum, cat) => sum + cat.productCount, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Productos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-purple-500" />
                  <div>
                    <div className="text-2xl font-bold">
                      ${detailedCategories.reduce((sum, cat) => sum + cat.totalValue, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Valor Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <div>
                    <div className="text-2xl font-bold">
                      $
                      {Math.round(
                        detailedCategories.reduce((sum, cat) => sum + cat.avgPrice, 0) / detailedCategories.length,
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">Precio Promedio</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Categorías */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(category)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Productos:</span>
                        <span className="font-medium">{category.productCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Valor Total:</span>
                        <span className="font-medium text-green-600">${category.totalValue.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Precio Promedio:</span>
                        <span className="font-medium">${category.avgPrice}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Estado:</span>
                        <Badge variant="outline" className="text-xs">
                          {category.status === "active" ? "Activa" : "Inactiva"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Subcategorías:</Label>
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.map((sub, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {sub}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                    <span>Creada: {category.created}</span>
                    <span>Actualizada: {category.lastUpdated}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Formulario de Categoría */}
          {showForm && (
            <Card className="bg-muted/20 border-2 border-dashed border-muted">
              <CardHeader>
                <CardTitle className="text-sm">{editingCategory ? "Editar Categoría" : "Nueva Categoría"}</CardTitle>
                <CardDescription>
                  {editingCategory
                    ? "Modifica los datos de la categoría"
                    : "Crea una nueva categoría para organizar tus productos"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="categoryName">Nombre de la Categoría *</Label>
                    <Input
                      id="categoryName"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Smartphones"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentCategory">Categoría Padre</Label>
                    <Input
                      id="parentCategory"
                      value={formData.parent}
                      onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                      placeholder="Opcional"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryDescription">Descripción</Label>
                  <Textarea
                    id="categoryDescription"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe qué tipo de productos incluye esta categoría..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Estado de la Categoría</Label>
                    <p className="text-xs text-muted-foreground">
                      Las categorías inactivas no se muestran en el catálogo
                    </p>
                  </div>
                  <Switch
                    checked={formData.status === "active"}
                    onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? "active" : "inactive" })}
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      setEditingCategory(null)
                      setFormData({ name: "", description: "", parent: "", status: "active" })
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleSubmit}>{editingCategory ? "Actualizar Categoría" : "Crear Categoría"}</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
