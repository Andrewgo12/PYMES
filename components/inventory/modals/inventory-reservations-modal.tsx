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
import { Clock, Package, AlertCircle, CheckCircle, XCircle, Timer } from "lucide-react"
import { useState } from "react"

interface InventoryReservationsModalProps {
  isOpen: boolean
  onClose: () => void
  items: any[]
}

export function InventoryReservationsModal({ isOpen, onClose, items }: InventoryReservationsModalProps) {
  const [selectedItem, setSelectedItem] = useState("")
  const [quantity, setQuantity] = useState("")
  const [customer, setCustomer] = useState("")
  const [reservationType, setReservationType] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  const [notes, setNotes] = useState("")

  const reservations = [
    {
      id: 1,
      product: "Laptop Dell XPS 13",
      sku: "DELL-XPS13-001",
      quantity: 5,
      customer: "Cliente Premium S.L.",
      type: "venta",
      status: "activa",
      createdBy: "María García",
      createdDate: "2024-05-20 09:30",
      expirationDate: "2024-05-25 18:00",
      location: "A1-B2-C3",
      orderReference: "SO-2024-045",
      notes: "Reserva para pedido especial",
      priority: "alta",
    },
    {
      id: 2,
      product: "Mouse Inalámbrico Logitech",
      sku: "LOG-MX3-002",
      quantity: 2,
      customer: "TechCorp Ltd.",
      type: "cotizacion",
      status: "activa",
      createdBy: "Juan Pérez",
      createdDate: "2024-05-19 14:15",
      expirationDate: "2024-05-22 12:00",
      location: "B2-C1-D4",
      orderReference: "QT-2024-128",
      notes: "Reserva temporal para cotización",
      priority: "media",
    },
    {
      id: 3,
      product: "Monitor 4K Samsung",
      sku: "SAM-4K27-003",
      quantity: 1,
      customer: "StartupXYZ",
      type: "demo",
      status: "vencida",
      createdBy: "Carlos López",
      createdDate: "2024-05-15 11:20",
      expirationDate: "2024-05-18 17:00",
      location: "C3-D2-E1",
      orderReference: "DEMO-2024-012",
      notes: "Producto para demostración",
      priority: "baja",
    },
    {
      id: 4,
      product: "Teclado Mecánico",
      sku: "KBD-MECH-001",
      quantity: 3,
      customer: "Oficinas Modernas S.A.",
      type: "mantenimiento",
      status: "liberada",
      createdBy: "Ana Martín",
      createdDate: "2024-05-17 16:45",
      expirationDate: "2024-05-20 10:00",
      location: "A3-B1-C4",
      orderReference: "MNT-2024-008",
      notes: "Reserva para mantenimiento preventivo",
      priority: "media",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "activa":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "vencida":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "liberada":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelada":
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return <Package className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activa":
        return "text-blue-600 bg-blue-50"
      case "vencida":
        return "text-red-600 bg-red-50"
      case "liberada":
        return "text-green-600 bg-green-50"
      case "cancelada":
        return "text-gray-600 bg-gray-50"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "text-red-600 bg-red-50"
      case "media":
        return "text-yellow-600 bg-yellow-50"
      case "baja":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "venta":
        return "Venta"
      case "cotizacion":
        return "Cotización"
      case "demo":
        return "Demostración"
      case "mantenimiento":
        return "Mantenimiento"
      case "evento":
        return "Evento"
      default:
        return "Otros"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "activa":
        return "Activa"
      case "vencida":
        return "Vencida"
      case "liberada":
        return "Liberada"
      case "cancelada":
        return "Cancelada"
      default:
        return "Desconocido"
    }
  }

  const isExpiringSoon = (expirationDate: string) => {
    const expiration = new Date(expirationDate)
    const now = new Date()
    const hoursUntilExpiration = (expiration.getTime() - now.getTime()) / (1000 * 60 * 60)
    return hoursUntilExpiration <= 24 && hoursUntilExpiration > 0
  }

  const handleSubmitReservation = () => {
    console.log("[v0] Creando reserva:", {
      item: selectedItem,
      quantity,
      customer,
      type: reservationType,
      expiration: expirationDate,
      notes,
    })

    // Resetear formulario
    setSelectedItem("")
    setQuantity("")
    setCustomer("")
    setReservationType("")
    setExpirationDate("")
    setNotes("")
  }

  const activeReservations = reservations.filter((r) => r.status === "activa")
  const expiredReservations = reservations.filter((r) => r.status === "vencida")
  const expiringSoonReservations = activeReservations.filter((r) => isExpiringSoon(r.expirationDate))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Reservas de Inventario
          </DialogTitle>
          <DialogDescription>Gestión de reservas temporales y asignaciones de stock</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Métricas de reservas */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Activas</p>
                    <p className="text-2xl font-bold text-blue-600">{activeReservations.length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-500/10 border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Por Vencer</p>
                    <p className="text-2xl font-bold text-orange-600">{expiringSoonReservations.length}</p>
                  </div>
                  <Timer className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-500/10 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Vencidas</p>
                    <p className="text-2xl font-bold text-red-600">{expiredReservations.length}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-500/10 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Stock Reservado</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {activeReservations.reduce((sum, r) => sum + r.quantity, 0)}
                    </p>
                  </div>
                  <Package className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Reservas Activas</TabsTrigger>
              <TabsTrigger value="new">Nueva Reserva</TabsTrigger>
              <TabsTrigger value="expiring">Por Vencer</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Reservas Activas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeReservations.map((reservation) => (
                      <div key={reservation.id} className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Clock className="h-6 w-6 text-blue-500" />
                            <div>
                              <div className="font-medium text-blue-700">{reservation.product}</div>
                              <div className="text-sm text-muted-foreground">{reservation.customer}</div>
                              <div className="text-xs text-muted-foreground mt-1">{reservation.notes}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-lg font-semibold text-blue-600">{reservation.quantity}</div>
                              <div className="text-xs text-muted-foreground">Unidades</div>
                            </div>

                            <div className="text-center">
                              <Badge className={`${getPriorityColor(reservation.priority)} border-0`}>
                                {reservation.priority}
                              </Badge>
                              <div className="text-xs text-muted-foreground mt-1">{getTypeLabel(reservation.type)}</div>
                            </div>

                            <div className="text-center">
                              <div className="font-medium">{reservation.location}</div>
                              <div className="text-xs text-muted-foreground">{reservation.orderReference}</div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-medium">
                                Vence: {new Date(reservation.expirationDate).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {isExpiringSoon(reservation.expirationDate) && (
                                  <span className="text-orange-600 font-medium">¡Vence pronto!</span>
                                )}
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600 border-green-600 bg-transparent"
                                >
                                  Liberar
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-blue-600 border-blue-600 bg-transparent"
                                >
                                  Extender
                                </Button>
                              </div>
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
                  <CardTitle className="text-sm">Crear Nueva Reserva</CardTitle>
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
                              {item.name} - {item.sku} (Disponible: {item.available})
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
                        placeholder="Cantidad a reservar..."
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer">Cliente</Label>
                      <Input
                        id="customer"
                        placeholder="Nombre del cliente..."
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de Reserva</Label>
                      <Select value={reservationType} onValueChange={setReservationType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="venta">Venta</SelectItem>
                          <SelectItem value="cotizacion">Cotización</SelectItem>
                          <SelectItem value="demo">Demostración</SelectItem>
                          <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                          <SelectItem value="evento">Evento</SelectItem>
                          <SelectItem value="otros">Otros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiration">Fecha de Vencimiento</Label>
                      <Input
                        id="expiration"
                        type="datetime-local"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas</Label>
                    <Textarea
                      id="notes"
                      placeholder="Descripción de la reserva..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {selectedItem && quantity && (
                    <Card className="bg-muted/50 border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Stock Disponible</h4>
                            <p className="text-2xl font-bold text-blue-600">
                              {items.find((item) => item.id.toString() === selectedItem)?.available || 0}
                            </p>
                          </div>
                          <div className="text-right">
                            <h4 className="font-medium">Después de Reserva</h4>
                            <p
                              className={`text-2xl font-bold ${
                                (items.find((item) => item.id.toString() === selectedItem)?.available || 0) -
                                  Number.parseInt(quantity || "0") >=
                                0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {(items.find((item) => item.id.toString() === selectedItem)?.available || 0) -
                                Number.parseInt(quantity || "0")}
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
                      onClick={handleSubmitReservation}
                      disabled={!selectedItem || !quantity || !customer || !reservationType || !expirationDate}
                    >
                      Crear Reserva
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expiring" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Timer className="h-4 w-4 text-orange-500" />
                    Reservas por Vencer (Próximas 24 horas)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expiringSoonReservations.map((reservation) => (
                      <div key={reservation.id} className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Timer className="h-6 w-6 text-orange-500" />
                            <div>
                              <div className="font-medium text-orange-700">{reservation.product}</div>
                              <div className="text-sm text-muted-foreground">{reservation.customer}</div>
                              <div className="text-xs text-orange-600 font-medium mt-1">
                                ¡Vence en{" "}
                                {Math.ceil(
                                  (new Date(reservation.expirationDate).getTime() - new Date().getTime()) /
                                    (1000 * 60 * 60),
                                )}{" "}
                                horas!
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-lg font-semibold text-orange-600">{reservation.quantity}</div>
                              <div className="text-xs text-muted-foreground">Unidades</div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {new Date(reservation.expirationDate).toLocaleString()}
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                  Extender
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600 border-green-600 bg-transparent"
                                >
                                  Liberar
                                </Button>
                              </div>
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
                  <CardTitle className="text-sm">Historial de Reservas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reservations.map((reservation) => (
                      <div
                        key={reservation.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(reservation.status)}
                            <Badge className={`${getStatusColor(reservation.status)} border-0`}>
                              {getStatusLabel(reservation.status)}
                            </Badge>
                          </div>
                          <div>
                            <div className="font-medium">{reservation.product}</div>
                            <div className="text-sm text-muted-foreground">{reservation.customer}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="font-semibold">{reservation.quantity}</div>
                            <div className="text-xs text-muted-foreground">Unidades</div>
                          </div>

                          <div className="text-center">
                            <Badge className={`${getPriorityColor(reservation.priority)} border-0`}>
                              {reservation.priority}
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">{getTypeLabel(reservation.type)}</div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-medium">{reservation.createdBy}</div>
                            <div className="text-xs text-muted-foreground">{reservation.createdDate}</div>
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
