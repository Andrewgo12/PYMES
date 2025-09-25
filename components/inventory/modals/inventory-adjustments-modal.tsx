"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Plus, Minus, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"

interface InventoryAdjustmentsModalProps {
  isOpen: boolean
  onClose: () => void
  items: any[]
}

export function InventoryAdjustmentsModal({ isOpen, onClose, items }: InventoryAdjustmentsModalProps) {
  const [selectedItem, setSelectedItem] = useState("")
  const [adjustmentType, setAdjustmentType] = useState("")
  const [quantity, setQuantity] = useState("")
  const [reason, setReason] = useState("")
  const [notes, setNotes] = useState("")

  const adjustmentReasons = [
    "Inventario físico",
    "Producto dañado",
    "Producto vencido",
    "Error de sistema",
    "Robo/pérdida",
    "Devolución proveedor",
    "Corrección manual",
    "Otros",
  ]

  const recentAdjustments = [
    {
      id: 1,
      product: "Laptop Dell XPS 13",
      sku: "DELL-XPS13-001",
      type: "positivo",
      quantity: 3,
      reason: "Error de sistema",
      user: "Juan Pérez",
      date: "2024-05-20 15:30",
      status: "aprobado",
      notes: "Corrección por error en conteo automático",
    },
    {
      id: 2,
      product: "Mouse Inalámbrico Logitech",
      sku: "LOG-MX3-002",
      type: "negativo",
      quantity: -2,
      reason: "Producto dañado",
      user: "María García",
      date: "2024-05-19 11:20",
      status: "pendiente",
      notes: "Daños durante transporte",
    },
    {
      id: 3,
      product: "Monitor 4K Samsung",
      sku: "SAM-4K27-003",
      type: "negativo",
      quantity: -1,
      reason: "Inventario físico",
      user: "Carlos López",
      date: "2024-05-18 16:45",
      status: "aprobado",
      notes: "Diferencia encontrada en conteo físico",
    },
  ]

  const getAdjustmentIcon = (type: string) => {
    switch (type) {
      case "positivo":
        return <Plus className="h-4 w-4 text-green-500" />
      case "negativo":
        return <Minus className="h-4 w-4 text-red-500" />
      default:
        return <Settings className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aprobado":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pendiente":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "rechazado":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aprobado":
        return "text-green-600 bg-green-50"
      case "pendiente":
        return "text-yellow-600 bg-yellow-50"
      case "rechazado":
        return "text-red-600 bg-red-50"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const handleSubmitAdjustment = () => {
    // Lógica para procesar el ajuste
    console.log("[v0] Procesando ajuste:", {
      item: selectedItem,
      type: adjustmentType,
      quantity,
      reason,
      notes,
    })

    // Resetear formulario
    setSelectedItem("")
    setAdjustmentType("")
    setQuantity("")
    setReason("")
    setNotes("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Ajustes de Inventario
          </DialogTitle>
          <DialogDescription>Gestión de ajustes de stock con control de aprobaciones</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="new" className="space-y-4">
          <TabsList>
            <TabsTrigger value="new">Nuevo Ajuste</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="pending">Pendientes</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Crear Nuevo Ajuste</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="product">Producto</Label>
                    <Select value={selectedItem} onValueChange={setSelectedItem}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar producto..." />
                      </SelectTrigger>
                      <SelectContent>
                        {items.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name} - {item.sku}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Ajuste</Label>
                    <Select value={adjustmentType} onValueChange={setAdjustmentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="positivo">Ajuste Positivo (+)</SelectItem>
                        <SelectItem value="negativo">Ajuste Negativo (-)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Cantidad</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Cantidad a ajustar..."
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Motivo</Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar motivo..." />
                      </SelectTrigger>
                      <SelectContent>
                        {adjustmentReasons.map((reasonOption) => (
                          <SelectItem key={reasonOption} value={reasonOption}>
                            {reasonOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas Adicionales</Label>
                  <Textarea
                    id="notes"
                    placeholder="Descripción detallada del ajuste..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                {selectedItem && (
                  <Card className="bg-muted/50 border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Información del Producto</h4>
                          <p className="text-sm text-muted-foreground">
                            Stock actual: {items.find((item) => item.id.toString() === selectedItem)?.currentStock || 0}{" "}
                            unidades
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Stock después del ajuste:</p>
                          <p className="text-lg font-semibold">
                            {quantity && adjustmentType
                              ? (items.find((item) => item.id.toString() === selectedItem)?.currentStock || 0) +
                                (adjustmentType === "positivo" ? Number.parseInt(quantity) : -Number.parseInt(quantity))
                              : "---"}{" "}
                            unidades
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSubmitAdjustment}
                    disabled={!selectedItem || !adjustmentType || !quantity || !reason}
                  >
                    Crear Ajuste
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Historial de Ajustes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAdjustments.map((adjustment) => (
                    <div key={adjustment.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getAdjustmentIcon(adjustment.type)}
                          {getStatusIcon(adjustment.status)}
                        </div>
                        <div>
                          <div className="font-medium">{adjustment.product}</div>
                          <div className="text-sm text-muted-foreground">{adjustment.sku}</div>
                          <div className="text-xs text-muted-foreground mt-1">{adjustment.notes}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div
                            className={`font-semibold text-lg ${adjustment.quantity > 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {adjustment.quantity > 0 ? "+" : ""}
                            {adjustment.quantity}
                          </div>
                          <div className="text-xs text-muted-foreground">Cantidad</div>
                        </div>

                        <div className="text-center">
                          <Badge className={`${getStatusColor(adjustment.status)} border-0`}>{adjustment.status}</Badge>
                          <div className="text-xs text-muted-foreground mt-1">{adjustment.reason}</div>
                        </div>

                        <div className="text-right">
                          <div className="font-medium">{adjustment.user}</div>
                          <div className="text-xs text-muted-foreground">{adjustment.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  Ajustes Pendientes de Aprobación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAdjustments
                    .filter((adj) => adj.status === "pendiente")
                    .map((adjustment) => (
                      <div key={adjustment.id} className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-yellow-700">{adjustment.product}</div>
                            <div className="text-sm text-muted-foreground">{adjustment.reason}</div>
                            <div className="text-xs text-muted-foreground mt-1">{adjustment.notes}</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-yellow-600">
                                {adjustment.quantity > 0 ? "+" : ""}
                                {adjustment.quantity}
                              </div>
                              <div className="text-xs text-muted-foreground">Cantidad</div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 border-green-600 bg-transparent"
                              >
                                Aprobar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-600 bg-transparent"
                              >
                                Rechazar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
