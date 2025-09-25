"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Package, DollarSign, Tag, Users, AlertTriangle, CheckCircle, X } from "lucide-react"
import { useState } from "react"

interface ProductBulkEditModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProducts: number[]
  products: any[]
}

export function ProductBulkEditModal({ isOpen, onClose, selectedProducts, products }: ProductBulkEditModalProps) {
  const [activeFields, setActiveFields] = useState<string[]>([])
  const [bulkData, setBulkData] = useState({
    category: "",
    supplier: "",
    status: "",
    priceAdjustment: "",
    priceType: "percentage", // percentage or fixed
    stockAdjustment: "",
    stockType: "add", // add, subtract, set
    tags: "",
  })

  const selectedProductsData = products.filter((p) => selectedProducts.includes(p.id))

  const toggleField = (field: string) => {
    setActiveFields((prev) => (prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]))
  }

  const calculatePricePreview = (originalPrice: number) => {
    if (!activeFields.includes("price") || !bulkData.priceAdjustment) return originalPrice

    const adjustment = Number.parseFloat(bulkData.priceAdjustment)
    if (bulkData.priceType === "percentage") {
      return originalPrice * (1 + adjustment / 100)
    }
    return originalPrice + adjustment
  }

  const calculateStockPreview = (originalStock: number) => {
    if (!activeFields.includes("stock") || !bulkData.stockAdjustment) return originalStock

    const adjustment = Number.parseInt(bulkData.stockAdjustment)
    switch (bulkData.stockType) {
      case "add":
        return originalStock + adjustment
      case "subtract":
        return Math.max(0, originalStock - adjustment)
      case "set":
        return adjustment
      default:
        return originalStock
    }
  }

  const applyBulkChanges = () => {
    // Lógica para aplicar cambios masivos
    console.log("Aplicando cambios masivos:", { activeFields, bulkData, selectedProducts })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edición Masiva de Productos
          </DialogTitle>
          <DialogDescription>
            Modifica múltiples productos simultáneamente. {selectedProducts.length} productos seleccionados.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Productos Seleccionados */}
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Package className="h-4 w-4" />
                Productos Seleccionados ({selectedProducts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {selectedProductsData.map((product) => (
                  <Badge key={product.id} variant="secondary" className="flex items-center gap-1">
                    {product.name}
                    <X className="h-3 w-3 cursor-pointer" />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="fields" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="fields">Campos a Editar</TabsTrigger>
              <TabsTrigger value="preview">Vista Previa</TabsTrigger>
              <TabsTrigger value="validation">Validación</TabsTrigger>
            </TabsList>

            <TabsContent value="fields" className="space-y-4">
              {/* Campos de Edición */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Categoría */}
                <Card className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        Categoría
                      </CardTitle>
                      <Checkbox
                        checked={activeFields.includes("category")}
                        onCheckedChange={() => toggleField("category")}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Select
                      value={bulkData.category}
                      onValueChange={(value) => setBulkData({ ...bulkData, category: value })}
                      disabled={!activeFields.includes("category")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smartphones">Smartphones</SelectItem>
                        <SelectItem value="laptops">Laptops</SelectItem>
                        <SelectItem value="tablets">Tablets</SelectItem>
                        <SelectItem value="accesorios">Accesorios</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Proveedor */}
                <Card className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Proveedor
                      </CardTitle>
                      <Checkbox
                        checked={activeFields.includes("supplier")}
                        onCheckedChange={() => toggleField("supplier")}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Select
                      value={bulkData.supplier}
                      onValueChange={(value) => setBulkData({ ...bulkData, supplier: value })}
                      disabled={!activeFields.includes("supplier")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar proveedor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">Apple Inc.</SelectItem>
                        <SelectItem value="samsung">Samsung Electronics</SelectItem>
                        <SelectItem value="sony">Sony Corporation</SelectItem>
                        <SelectItem value="microsoft">Microsoft</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Estado */}
                <Card className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Estado</CardTitle>
                      <Checkbox
                        checked={activeFields.includes("status")}
                        onCheckedChange={() => toggleField("status")}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Select
                      value={bulkData.status}
                      onValueChange={(value) => setBulkData({ ...bulkData, status: value })}
                      disabled={!activeFields.includes("status")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="inactive">Inactivo</SelectItem>
                        <SelectItem value="draft">Borrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Ajuste de Precios */}
                <Card className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Ajuste de Precios
                      </CardTitle>
                      <Checkbox checked={activeFields.includes("price")} onCheckedChange={() => toggleField("price")} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Select
                        value={bulkData.priceType}
                        onValueChange={(value) => setBulkData({ ...bulkData, priceType: value })}
                        disabled={!activeFields.includes("price")}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">%</SelectItem>
                          <SelectItem value="fixed">$</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        step="0.01"
                        value={bulkData.priceAdjustment}
                        onChange={(e) => setBulkData({ ...bulkData, priceAdjustment: e.target.value })}
                        placeholder={bulkData.priceType === "percentage" ? "10" : "50.00"}
                        disabled={!activeFields.includes("price")}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {bulkData.priceType === "percentage"
                        ? "Porcentaje de aumento/descuento (ej: 10 para +10%, -5 para -5%)"
                        : "Cantidad fija a sumar/restar (ej: 50 para +$50, -25 para -$25)"}
                    </p>
                  </CardContent>
                </Card>

                {/* Ajuste de Stock */}
                <Card className="bg-card border-border md:col-span-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Ajuste de Stock
                      </CardTitle>
                      <Checkbox checked={activeFields.includes("stock")} onCheckedChange={() => toggleField("stock")} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Select
                        value={bulkData.stockType}
                        onValueChange={(value) => setBulkData({ ...bulkData, stockType: value })}
                        disabled={!activeFields.includes("stock")}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="add">Sumar</SelectItem>
                          <SelectItem value="subtract">Restar</SelectItem>
                          <SelectItem value="set">Establecer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        value={bulkData.stockAdjustment}
                        onChange={(e) => setBulkData({ ...bulkData, stockAdjustment: e.target.value })}
                        placeholder="Cantidad"
                        disabled={!activeFields.includes("stock")}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {bulkData.stockType === "add" && "Sumar unidades al stock actual"}
                      {bulkData.stockType === "subtract" && "Restar unidades del stock actual"}
                      {bulkData.stockType === "set" && "Establecer stock a esta cantidad exacta"}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Vista Previa de Cambios</CardTitle>
                  <CardDescription>Revisa cómo quedarán los productos después de aplicar los cambios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b border-border">
                        <tr className="text-left">
                          <th className="p-2">Producto</th>
                          <th className="p-2">Precio Actual</th>
                          <th className="p-2">Precio Nuevo</th>
                          <th className="p-2">Stock Actual</th>
                          <th className="p-2">Stock Nuevo</th>
                          <th className="p-2">Cambios</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProductsData.map((product) => (
                          <tr key={product.id} className="border-b border-border">
                            <td className="p-2 font-medium">{product.name}</td>
                            <td className="p-2">${product.dynamicPrice}</td>
                            <td className="p-2">
                              <span className={activeFields.includes("price") ? "font-semibold text-blue-600" : ""}>
                                ${calculatePricePreview(product.dynamicPrice).toFixed(2)}
                              </span>
                            </td>
                            <td className="p-2">{product.stock}</td>
                            <td className="p-2">
                              <span className={activeFields.includes("stock") ? "font-semibold text-blue-600" : ""}>
                                {calculateStockPreview(product.stock)}
                              </span>
                            </td>
                            <td className="p-2">
                              <div className="flex gap-1">
                                {activeFields.map((field) => (
                                  <Badge key={field} variant="outline" className="text-xs">
                                    {field}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="validation" className="space-y-4">
              <div className="space-y-4">
                <Card className="bg-green-500/10 border-green-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-semibold text-green-700">Validación Exitosa</div>
                        <div className="text-sm text-green-600">
                          Todos los productos pueden ser actualizados sin problemas
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-sm">Resumen de Cambios</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Productos Afectados:</Label>
                        <div className="text-2xl font-bold">{selectedProducts.length}</div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Campos a Modificar:</Label>
                        <div className="text-2xl font-bold">{activeFields.length}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Campos Seleccionados:</Label>
                      <div className="flex flex-wrap gap-1">
                        {activeFields.map((field) => (
                          <Badge key={field} variant="secondary">
                            {field === "category" && "Categoría"}
                            {field === "supplier" && "Proveedor"}
                            {field === "status" && "Estado"}
                            {field === "price" && "Precio"}
                            {field === "stock" && "Stock"}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Advertencias */}
                <Card className="bg-yellow-500/10 border-yellow-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <div className="font-semibold text-yellow-700">Advertencias</div>
                        <ul className="text-sm text-yellow-600 mt-1 space-y-1">
                          <li>• Los cambios de precio afectarán inmediatamente las ventas</li>
                          <li>• Los ajustes de stock se reflejarán en el inventario</li>
                          <li>• Esta acción no se puede deshacer automáticamente</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Botones de Acción */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">Guardar como Plantilla</Button>
              <Button onClick={applyBulkChanges} disabled={activeFields.length === 0}>
                Aplicar Cambios ({selectedProducts.length} productos)
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
