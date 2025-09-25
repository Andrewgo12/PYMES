"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Upload, QrCode, DollarSign, Package, Tag } from "lucide-react"
import { useState } from "react"

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  product?: any
}

export function ProductFormModal({ isOpen, onClose, product }: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    sku: product?.sku || "",
    description: "",
    category: product?.category || "",
    price: product?.price || "",
    dynamicPricing: true,
    stock: product?.stock || "",
    minStock: "10",
    maxStock: "1000",
    weight: "",
    dimensions: "",
    barcode: product?.barcode || "",
    supplier: product?.supplier || "",
    status: product?.status || "active",
  })

  const [variants, setVariants] = useState(product?.variants || [])
  const [colors, setColors] = useState(product?.colors || [])
  const [images, setImages] = useState([])
  const [newVariant, setNewVariant] = useState("")
  const [newColor, setNewColor] = useState("")

  const categories = ["Smartphones", "Laptops", "Tablets", "Accesorios", "Audio", "Gaming", "Hogar", "Deportes"]

  const suppliers = [
    "Apple Inc.",
    "Samsung Electronics",
    "Sony Corporation",
    "Microsoft",
    "Google",
    "Amazon",
    "Dell Technologies",
    "HP Inc.",
  ]

  const addVariant = () => {
    if (newVariant && !variants.includes(newVariant)) {
      setVariants([...variants, newVariant])
      setNewVariant("")
    }
  }

  const removeVariant = (variant: string) => {
    setVariants(variants.filter((v) => v !== variant))
  }

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor])
      setNewColor("")
    }
  }

  const removeColor = (color: string) => {
    setColors(colors.filter((c) => c !== color))
  }

  const generateSKU = () => {
    const prefix = formData.name.substring(0, 3).toUpperCase()
    const suffix = Math.random().toString(36).substring(2, 8).toUpperCase()
    setFormData({ ...formData, sku: `${prefix}-${suffix}` })
  }

  const generateBarcode = () => {
    const barcode = Math.floor(Math.random() * 900000000000) + 100000000000
    setFormData({ ...formData, barcode: barcode.toString() })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {product ? "Editar Producto" : "Nuevo Producto"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "Modifica la información del producto"
              : "Crea un nuevo producto con códigos de barras y precios dinámicos"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Información Básica</TabsTrigger>
            <TabsTrigger value="pricing">Precios y Stock</TabsTrigger>
            <TabsTrigger value="variants">Variantes</TabsTrigger>
            <TabsTrigger value="media">Imágenes</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: iPhone 15 Pro"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <div className="flex gap-2">
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="Ej: IPH15P-128-BLU"
                  />
                  <Button type="button" variant="outline" onClick={generateSKU}>
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier">Proveedor *</Label>
                <Select
                  value={formData.supplier}
                  onValueChange={(value) => setFormData({ ...formData, supplier: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier} value={supplier}>
                        {supplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe las características principales del producto..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.01"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="0.5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensiones (cm)</Label>
                <Input
                  id="dimensions"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  placeholder="15 x 7 x 1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="barcode">Código de Barras</Label>
                <div className="flex gap-2">
                  <Input
                    id="barcode"
                    value={formData.barcode}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                    placeholder="123456789012"
                  />
                  <Button type="button" variant="outline" onClick={generateBarcode}>
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                    <SelectItem value="draft">Borrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Configuración de Precios
                </CardTitle>
                <CardDescription>Configura precios base y dinámicos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio Base *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="999.99"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cost">Costo del Producto</Label>
                    <Input id="cost" type="number" step="0.01" placeholder="650.00" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Precios Dinámicos</Label>
                    <p className="text-xs text-muted-foreground">
                      Ajusta automáticamente los precios según demanda y competencia
                    </p>
                  </div>
                  <Switch
                    checked={formData.dynamicPricing}
                    onCheckedChange={(checked) => setFormData({ ...formData, dynamicPricing: checked })}
                  />
                </div>

                {formData.dynamicPricing && (
                  <div className="grid gap-4 md:grid-cols-2 p-4 bg-muted/20 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="minPrice">Precio Mínimo</Label>
                      <Input id="minPrice" type="number" step="0.01" placeholder="899.99" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxPrice">Precio Máximo</Label>
                      <Input id="maxPrice" type="number" step="0.01" placeholder="1199.99" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Gestión de Inventario
                </CardTitle>
                <CardDescription>Configura niveles de stock y alertas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Actual *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minStock">Stock Mínimo</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={formData.minStock}
                      onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                      placeholder="10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxStock">Stock Máximo</Label>
                    <Input
                      id="maxStock"
                      type="number"
                      value={formData.maxStock}
                      onChange={(e) => setFormData({ ...formData, maxStock: e.target.value })}
                      placeholder="1000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ubicación en Almacén</Label>
                  <Input placeholder="Ej: A-1-B-3" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Variantes del Producto
                </CardTitle>
                <CardDescription>Configura diferentes versiones del producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Variantes de Almacenamiento/Tamaño</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newVariant}
                      onChange={(e) => setNewVariant(e.target.value)}
                      placeholder="Ej: 128GB, XL, 15 pulgadas"
                    />
                    <Button type="button" onClick={addVariant}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((variant, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {variant}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeVariant(variant)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Colores Disponibles</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      placeholder="Ej: Azul, Negro, Blanco"
                    />
                    <Button type="button" onClick={addColor}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                        {color}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeColor(color)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Imágenes del Producto</CardTitle>
                <CardDescription>Sube imágenes de alta calidad del producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">Arrastra imágenes aquí o haz clic para seleccionar</p>
                  <Button variant="outline">Seleccionar Imágenes</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Imagen {i}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">Guardar como Borrador</Button>
            <Button>{product ? "Actualizar Producto" : "Crear Producto"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
