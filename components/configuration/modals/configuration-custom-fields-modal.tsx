"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Wrench, Plus, Type, Hash, Calendar, ToggleLeft, List, FileText, Edit, Trash2, Copy } from "lucide-react"

interface CustomFieldsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CustomFieldsModal({ isOpen, onClose }: CustomFieldsModalProps) {
  const [selectedModule, setSelectedModule] = useState("products")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const customFields = [
    {
      id: 1,
      name: "Código de Barras Interno",
      key: "internal_barcode",
      type: "text",
      module: "products",
      required: false,
      validation: "alphanumeric",
      defaultValue: "",
      description: "Código interno para identificación rápida",
      active: true,
      usageCount: 245,
    },
    {
      id: 2,
      name: "Fecha de Caducidad",
      key: "expiry_date",
      type: "date",
      module: "products",
      required: true,
      validation: "future_date",
      defaultValue: "",
      description: "Fecha límite de consumo del producto",
      active: true,
      usageCount: 189,
    },
    {
      id: 3,
      name: "Proveedor Preferido",
      key: "preferred_supplier",
      type: "select",
      module: "products",
      required: false,
      validation: "",
      defaultValue: "",
      options: ["Proveedor A", "Proveedor B", "Proveedor C"],
      description: "Proveedor principal para este producto",
      active: true,
      usageCount: 156,
    },
    {
      id: 4,
      name: "Notas del Cliente",
      key: "customer_notes",
      type: "textarea",
      module: "orders",
      required: false,
      validation: "",
      defaultValue: "",
      description: "Comentarios adicionales del cliente",
      active: true,
      usageCount: 89,
    },
    {
      id: 5,
      name: "Descuento Aplicado",
      key: "discount_applied",
      type: "number",
      module: "orders",
      required: false,
      validation: "percentage",
      defaultValue: "0",
      description: "Porcentaje de descuento aplicado",
      active: false,
      usageCount: 23,
    },
  ]

  const fieldTypes = [
    { value: "text", label: "Texto", icon: Type },
    { value: "number", label: "Número", icon: Hash },
    { value: "date", label: "Fecha", icon: Calendar },
    { value: "boolean", label: "Sí/No", icon: ToggleLeft },
    { value: "select", label: "Lista", icon: List },
    { value: "textarea", label: "Texto Largo", icon: FileText },
  ]

  const modules = [
    { value: "products", label: "Productos", count: customFields.filter((f) => f.module === "products").length },
    { value: "orders", label: "Pedidos", count: customFields.filter((f) => f.module === "orders").length },
    { value: "customers", label: "Clientes", count: customFields.filter((f) => f.module === "customers").length },
    { value: "inventory", label: "Inventario", count: customFields.filter((f) => f.module === "inventory").length },
  ]

  const validationRules = [
    { value: "", label: "Sin validación" },
    { value: "required", label: "Requerido" },
    { value: "email", label: "Email válido" },
    { value: "phone", label: "Teléfono válido" },
    { value: "alphanumeric", label: "Solo letras y números" },
    { value: "numeric", label: "Solo números" },
    { value: "percentage", label: "Porcentaje (0-100)" },
    { value: "future_date", label: "Fecha futura" },
    { value: "past_date", label: "Fecha pasada" },
  ]

  const filteredFields = customFields.filter((field) => field.module === selectedModule)

  const getTypeIcon = (type: string) => {
    const fieldType = fieldTypes.find((ft) => ft.value === type)
    const IconComponent = fieldType?.icon || Type
    return <IconComponent className="h-4 w-4" />
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Campos Personalizados
          </DialogTitle>
          <DialogDescription>Campos custom y validaciones específicas por módulo</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="fields" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="fields">Campos</TabsTrigger>
            <TabsTrigger value="create">Crear Campo</TabsTrigger>
            <TabsTrigger value="validation">Validaciones</TabsTrigger>
            <TabsTrigger value="usage">Uso</TabsTrigger>
          </TabsList>

          <TabsContent value="fields" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div>
                  <Label htmlFor="module-select">Módulo</Label>
                  <Select value={selectedModule} onValueChange={setSelectedModule}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {modules.map((module) => (
                        <SelectItem key={module.value} value={module.value}>
                          {module.label} ({module.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Campo
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredFields.map((field) => (
                <Card key={field.id} className="hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">{getTypeIcon(field.type)}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{field.name}</h4>
                            <Badge variant="outline">{field.type}</Badge>
                            {field.required && (
                              <Badge variant="destructive" className="text-xs">
                                Requerido
                              </Badge>
                            )}
                            {!field.active && (
                              <Badge variant="secondary" className="text-xs">
                                Inactivo
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{field.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <span>Clave: {field.key}</span>
                            <span>Usado en: {field.usageCount} registros</span>
                            {field.validation && <span>Validación: {field.validation}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked={field.active} />
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crear Nuevo Campo Personalizado</CardTitle>
                <CardDescription>Define un nuevo campo con sus propiedades y validaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="field-name">Nombre del Campo</Label>
                    <Input id="field-name" placeholder="Ej: Código de Barras" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="field-key">Clave (Key)</Label>
                    <Input id="field-key" placeholder="Ej: barcode" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="field-type">Tipo de Campo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="h-4 w-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="field-module">Módulo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un módulo" />
                      </SelectTrigger>
                      <SelectContent>
                        {modules.map((module) => (
                          <SelectItem key={module.value} value={module.value}>
                            {module.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field-description">Descripción</Label>
                  <Textarea id="field-description" placeholder="Describe el propósito de este campo..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="field-validation">Validación</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona validación" />
                      </SelectTrigger>
                      <SelectContent>
                        {validationRules.map((rule) => (
                          <SelectItem key={rule.value} value={rule.value}>
                            {rule.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="field-default">Valor por Defecto</Label>
                    <Input id="field-default" placeholder="Valor opcional por defecto" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="field-required" />
                    <Label htmlFor="field-required">Campo requerido</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="field-active" defaultChecked />
                    <Label htmlFor="field-active">Campo activo</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Crear Campo</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="validation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reglas de Validación</CardTitle>
                <CardDescription>Configura validaciones personalizadas para tus campos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {validationRules
                    .filter((rule) => rule.value !== "")
                    .map((rule) => (
                      <div key={rule.value} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{rule.label}</h4>
                          <p className="text-sm text-muted-foreground">
                            {rule.value === "required" && "El campo debe tener un valor"}
                            {rule.value === "email" && "Debe ser un email válido (ej: usuario@dominio.com)"}
                            {rule.value === "phone" && "Debe ser un número de teléfono válido"}
                            {rule.value === "alphanumeric" && "Solo se permiten letras y números"}
                            {rule.value === "numeric" && "Solo se permiten números"}
                            {rule.value === "percentage" && "Debe ser un número entre 0 y 100"}
                            {rule.value === "future_date" && "La fecha debe ser posterior a hoy"}
                            {rule.value === "past_date" && "La fecha debe ser anterior a hoy"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {customFields.filter((f) => f.validation === rule.value).length} campos
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {modules.map((module) => (
                <Card key={module.value}>
                  <CardHeader>
                    <CardTitle className="text-lg">{module.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Campos activos</span>
                        <span className="font-medium">{module.count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total registros</span>
                        <span className="font-medium">
                          {customFields
                            .filter((f) => f.module === module.value)
                            .reduce((sum, f) => sum + f.usageCount, 0)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Campos Más Utilizados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customFields
                    .sort((a, b) => b.usageCount - a.usageCount)
                    .slice(0, 5)
                    .map((field) => (
                      <div key={field.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(field.type)}
                          <div>
                            <p className="font-medium">{field.name}</p>
                            <p className="text-sm text-muted-foreground">{field.module}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{field.usageCount}</p>
                          <p className="text-xs text-muted-foreground">usos</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button>Guardar Cambios</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
