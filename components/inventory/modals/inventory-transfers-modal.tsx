"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Move, ArrowRight, Clock, CheckCircle, AlertCircle, Package, MapPin } from "lucide-react"
import { useState } from "react"

interface InventoryTransfersModalProps {
  isOpen: boolean
  onClose: () => void
  items: any[]
}

export function InventoryTransfersModal({ isOpen, onClose, items }: InventoryTransfersModalProps) {
  const [selectedItem, setSelectedItem] = useState("")
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [quantity, setQuantity] = useState("")
  const [reason, setReason] = useState("")
  const [notes, setNotes] = useState("")

  const transfers = [
    {
      id: 1,
      product: "Laptop Dell XPS 13",
      sku: "DELL-XPS13-001",
      quantity: 5,
      fromLocation: "A1-B2-C3",
      toLocation: "A2-B1-C2",
      fromZone: "Zona A",
      toZone: "Zona A",
      status: "completado",
      requestedBy: "Ana Martín",
      approvedBy: "Carlos López",
      requestDate: "2024-05-19 09:20",
      completedDate: "2024-05-19 14:30",
      reason: "Reorganización de almacén",
      notes: "Transferencia para optimizar espacio",
    },
    {
      id: 2,
      product: "Mouse Inalámbrico Logitech",
      sku: "LOG-MX3-002",
      quantity: 10,
      fromLocation: "B2-C1-D4",
      toLocation: "B1-C2-D3",
      fromZone: "Zona B",
      toZone: "Zona B",
      status: "en_transito",
      requestedBy: "Juan Pérez",
      approvedBy: "María García",
      requestDate: "2024-05-20 11:15",
      completedDate: null,
      reason: "Rebalanceo de stock",
      notes: "Mover a ubicación más accesible",
    },
    {
      id: 3,
      product: "Monitor 4K Samsung",
      sku: "SAM-4K27-003",
      quantity: 3,
      fromLocation: "C3-D2-E1",
      toLocation: "C1-D1-E2",
      fromZone: "Zona C",
      toZone: "Zona C",
      status: "pendiente",
      requestedBy: "María García",
      approvedBy: null,
      requestDate: "2024-05-20 16:45",
      completedDate: null,
      reason: "Solicitud de cliente",
      notes: "Cliente requiere acceso rápido",
    },
    {
      id: 4,
      product: "Teclado Mecánico",
      sku: "KBD-MECH-001",
      quantity: 8,
      fromLocation: "A3-B1-C4",
      toLocation: "B2-C3-D1",
      fromZone: "Zona A",
      toZone: "Zona B",
      status: "rechazado",
      requestedBy: "Carlos López",
      approvedBy: "Ana Martín",
      requestDate: "2024-05-18 13:20",
      completedDate: null,
      reason: "Consolidación de inventario",
      notes: "Rechazado: ubicación destino sin capacidad",
    },
  ]

  const locations = [
    { id: "A1-B2-C3", zone: "Zona A", capacity: 100, occupied: 45 },
    { id: "A2-B1-C2", zone: "Zona A", capacity: 80, occupied: 25 },
    { id: "B2-C1-D4", zone: "Zona B", capacity: 200, occupied: 8 },
    { id: "B1-C2-D3", zone: "Zona B", capacity: 150, occupied: 35 },
    { id: "C3-D2-E1", zone: "Zona C", capacity: 50, occupied: 0 },
    { id: "C1-D1-E2", zone: "Zona C", capacity: 75, occupied: 20 },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completado":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "en_transito":
        return <Move className="h-4 w-4 text-blue-500" />
      case "pendiente":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "rechazado":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Package className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completado":
        return "text-green-600 bg-green-50"
      case "en_transito":
        return "text-blue-600 bg-blue-50"
      case "pendiente":
        return "text-yellow-600 bg-yellow-50"
      case "rechazado":
        return "text-red-600 bg-red-50"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completado":
        return "Completado"
      case "en_transito":
        return "En Tránsito"
      case "pendiente":
        return "Pendiente"
      case "rechazado":
        return "Rechazado"
      default:
        return "Desconocido"
    }
  }

  const handleSubmitTransfer = () => {
    console.log("[v0] Creando transferencia:", {
      item: selectedItem,
      from: fromLocation,
      to: toLocation,
      quantity,
      reason,
      notes,
    })

    // Resetear formulario
    setSelectedItem("")
    setFromLocation("")
    setToLocation("")
    setQuantity("")
    setReason("")
    setNotes("")
  }

  const pendingTransfers = transfers.filter((t) => t.status === "pendiente")
  const activeTransfers = transfers.filter((t) => t.status === "en_transito")
  const completedTransfers = transfers.filter((t) => t.status === "completado")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Move className="h-5 w-5" />
            Transferencias de Inventario
          </DialogTitle>
          <DialogDescription>Gestión de movimientos entre ubicaciones del almacén</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Métricas de transferencias */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-yellow-500/10 border-yellow-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pendientes</p>
                    <p className="text-2xl font-bold text-yellow-600">{pendingTransfers.length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">En Tránsito</p>
                    <p className="text-2xl font-bold text-blue-600">{activeTransfers.length}</p>
                  </div>
                  <Move className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completadas</p>
                    <p className="text-2xl font-bold text-green-600">{completedTransfers.length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-500/10 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Mes</p>
                    <p className="text-2xl font-bold text-purple-600">{transfers.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Transferencias Activas</TabsTrigger>
              <TabsTrigger value="new">Nueva Transferencia</TabsTrigger>
              <TabsTrigger value="pending">Pendientes Aprobación</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Transferencias en Progreso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeTransfers.map((transfer) => (
                      <div key={transfer.id} className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Move className="h-6 w-6 text-blue-500" />
                            <div>
                              <div className="font-medium text-blue-700">{transfer.product}</div>
                              <div className="text-sm text-muted-foreground">{transfer.sku}</div>
                              <div className="text-xs text-muted-foreground mt-1">{transfer.reason}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-lg font-semibold text-blue-600">{transfer.quantity}</div>
                              <div className="text-xs text-muted-foreground">Unidades</div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="text-center">
                                <div className="font-medium">{transfer.fromLocation}</div>
                                <div className="text-xs text-muted-foreground">{transfer.fromZone}</div>
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              <div className="text-center">
                                <div className="font-medium">{transfer.toLocation}</div>
                                <div className="text-xs text-muted-foreground">{transfer.toZone}</div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-medium">{transfer.requestedBy}</div>
                              <div className="text-xs text-muted-foreground">{transfer.requestDate}</div>
                              <Button size="sm" className="mt-2">
                                Completar
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

            <TabsContent value="new" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Crear Nueva Transferencia</CardTitle>
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
                      <Label htmlFor="quantity">Cantidad</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Cantidad a transferir..."
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="from">Ubicación Origen</Label>
                      <Select value={fromLocation} onValueChange={setFromLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar origen..." />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              {location.id} - {location.zone} ({location.occupied}/{location.capacity})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="to">Ubicación Destino</Label>
                      <Select value={toLocation} onValueChange={setToLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar destino..." />
                        </SelectTrigger>
                        <SelectContent>
                          {locations
                            .filter((loc) => loc.id !== fromLocation)
                            .map((location) => (
                              <SelectItem key={location.id} value={location.id}>
                                {location.id} - {location.zone} ({location.occupied}/{location.capacity})
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason">Motivo</Label>
                      <Select value={reason} onValueChange={setReason}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar motivo..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reorganizacion">Reorganización de almacén</SelectItem>
                          <SelectItem value="rebalanceo">Rebalanceo de stock</SelectItem>
                          <SelectItem value="cliente">Solicitud de cliente</SelectItem>
                          <SelectItem value="consolidacion">Consolidación de inventario</SelectItem>
                          <SelectItem value="mantenimiento">Mantenimiento de ubicación</SelectItem>
                          <SelectItem value="otros">Otros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas Adicionales</Label>
                    <Textarea
                      id="notes"
                      placeholder="Descripción detallada de la transferencia..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {fromLocation && toLocation && (
                    <Card className="bg-muted/50 border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <MapPin className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                              <div className="font-medium text-sm">Origen</div>
                              <div className="text-xs text-muted-foreground">
                                {locations.find((loc) => loc.id === fromLocation)?.zone}
                              </div>
                            </div>
                            <ArrowRight className="h-6 w-6 text-muted-foreground" />
                            <div className="text-center">
                              <MapPin className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                              <div className="font-medium text-sm">Destino</div>
                              <div className="text-xs text-muted-foreground">
                                {locations.find((loc) => loc.id === toLocation)?.zone}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Capacidad disponible destino:</div>
                            <div className="font-semibold">
                              {(locations.find((loc) => loc.id === toLocation)?.capacity || 0) -
                                (locations.find((loc) => loc.id === toLocation)?.occupied || 0)}{" "}
                              unidades
                            </div>
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
                      onClick={handleSubmitTransfer}
                      disabled={!selectedItem || !fromLocation || !toLocation || !quantity || !reason}
                    >
                      Crear Transferencia
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    Transferencias Pendientes de Aprobación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingTransfers.map((transfer) => (
                      <div key={transfer.id} className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Clock className="h-6 w-6 text-yellow-500" />
                            <div>
                              <div className="font-medium text-yellow-700">{transfer.product}</div>
                              <div className="text-sm text-muted-foreground">{transfer.reason}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Solicitado por: {transfer.requestedBy}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-lg font-semibold text-yellow-600">{transfer.quantity}</div>
                              <div className="text-xs text-muted-foreground">Unidades</div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="text-center">
                                <div className="font-medium">{transfer.fromLocation}</div>
                                <div className="text-xs text-muted-foreground">{transfer.fromZone}</div>
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              <div className="text-center">
                                <div className="font-medium">{transfer.toLocation}</div>
                                <div className="text-xs text-muted-foreground">{transfer.toZone}</div>
                              </div>
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

            <TabsContent value="history" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Historial de Transferencias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transfers.map((transfer) => (
                      <div key={transfer.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(transfer.status)}
                            <Badge className={`${getStatusColor(transfer.status)} border-0`}>
                              {getStatusLabel(transfer.status)}
                            </Badge>
                          </div>
                          <div>
                            <div className="font-medium">{transfer.product}</div>
                            <div className="text-sm text-muted-foreground">{transfer.reason}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="font-semibold">{transfer.quantity}</div>
                            <div className="text-xs text-muted-foreground">Unidades</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="text-center">
                              <div className="font-medium text-sm">{transfer.fromLocation}</div>
                              <div className="text-xs text-muted-foreground">{transfer.fromZone}</div>
                            </div>
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            <div className="text-center">
                              <div className="font-medium text-sm">{transfer.toLocation}</div>
                              <div className="text-xs text-muted-foreground">{transfer.toZone}</div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-medium">{transfer.requestedBy}</div>
                            <div className="text-xs text-muted-foreground">{transfer.requestDate}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
