"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpDown, TrendingUp, TrendingDown, Package, FileText, Filter, Download } from "lucide-react"
import { useState } from "react"

interface InventoryMovementsModalProps {
  isOpen: boolean
  onClose: () => void
  items: any[]
}

export function InventoryMovementsModal({ isOpen, onClose, items }: InventoryMovementsModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("today")

  const movements = [
    {
      id: 1,
      type: "entrada",
      product: "Laptop Dell XPS 13",
      sku: "DELL-XPS13-001",
      quantity: 25,
      location: "A1-B2-C3",
      user: "Juan Pérez",
      reason: "Recepción de compra",
      reference: "PO-2024-001",
      date: "2024-05-20 14:30",
      cost: 899.99,
      supplier: "TechSupply Global",
    },
    {
      id: 2,
      type: "salida",
      product: "Mouse Inalámbrico Logitech",
      sku: "LOG-MX3-002",
      quantity: -12,
      location: "B2-C1-D4",
      user: "María García",
      reason: "Venta a cliente",
      reference: "SO-2024-045",
      date: "2024-05-20 11:15",
      cost: 45.99,
      customer: "Cliente Premium S.L.",
    },
    {
      id: 3,
      type: "ajuste",
      product: "Monitor 4K Samsung",
      sku: "SAM-4K27-003",
      quantity: -2,
      location: "C3-D2-E1",
      user: "Carlos López",
      reason: "Ajuste por inventario físico",
      reference: "ADJ-2024-012",
      date: "2024-05-19 16:45",
      cost: 299.99,
      notes: "Productos dañados durante transporte",
    },
    {
      id: 4,
      type: "transferencia",
      product: "Laptop Dell XPS 13",
      sku: "DELL-XPS13-001",
      quantity: 5,
      location: "A1-B2-C3 → A2-B1-C2",
      user: "Ana Martín",
      reason: "Reorganización de almacén",
      reference: "TRF-2024-008",
      date: "2024-05-19 09:20",
      cost: 899.99,
      fromLocation: "A1-B2-C3",
      toLocation: "A2-B1-C2",
    },
  ]

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "entrada":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "salida":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "ajuste":
        return <FileText className="h-4 w-4 text-yellow-500" />
      case "transferencia":
        return <ArrowUpDown className="h-4 w-4 text-blue-500" />
      default:
        return <Package className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getMovementColor = (type: string) => {
    switch (type) {
      case "entrada":
        return "text-green-600 bg-green-50"
      case "salida":
        return "text-red-600 bg-red-50"
      case "ajuste":
        return "text-yellow-600 bg-yellow-50"
      case "transferencia":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getMovementLabel = (type: string) => {
    switch (type) {
      case "entrada":
        return "Entrada"
      case "salida":
        return "Salida"
      case "ajuste":
        return "Ajuste"
      case "transferencia":
        return "Transferencia"
      default:
        return "Desconocido"
    }
  }

  const filteredMovements = movements.filter(
    (movement) =>
      movement.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.user.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalEntries = movements.filter((m) => m.type === "entrada").reduce((sum, m) => sum + m.quantity, 0)
  const totalExits = movements.filter((m) => m.type === "salida").reduce((sum, m) => sum + Math.abs(m.quantity), 0)
  const totalAdjustments = movements.filter((m) => m.type === "ajuste").length
  const totalTransfers = movements.filter((m) => m.type === "transferencia").length

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            Movimientos de Inventario
          </DialogTitle>
          <DialogDescription>Seguimiento completo de todos los movimientos de stock</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Métricas de movimientos */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Entradas</p>
                    <p className="text-2xl font-bold text-green-600">{totalEntries}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-500/10 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Salidas</p>
                    <p className="text-2xl font-bold text-red-600">{totalExits}</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-500/10 border-yellow-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ajustes</p>
                    <p className="text-2xl font-bold text-yellow-600">{totalAdjustments}</p>
                  </div>
                  <FileText className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Transferencias</p>
                    <p className="text-2xl font-bold text-blue-600">{totalTransfers}</p>
                  </div>
                  <ArrowUpDown className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros y búsqueda */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Buscar movimientos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>

          <Tabs defaultValue="recent" className="space-y-4">
            <TabsList>
              <TabsTrigger value="recent">Recientes</TabsTrigger>
              <TabsTrigger value="entries">Entradas</TabsTrigger>
              <TabsTrigger value="exits">Salidas</TabsTrigger>
              <TabsTrigger value="adjustments">Ajustes</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Movimientos Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredMovements.map((movement) => (
                      <div
                        key={movement.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getMovementIcon(movement.type)}
                            <Badge className={`${getMovementColor(movement.type)} border-0`}>
                              {getMovementLabel(movement.type)}
                            </Badge>
                          </div>
                          <div>
                            <div className="font-medium">{movement.product}</div>
                            <div className="text-sm text-muted-foreground">{movement.sku}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div
                              className={`font-semibold text-lg ${movement.quantity > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {movement.quantity > 0 ? "+" : ""}
                              {movement.quantity}
                            </div>
                            <div className="text-xs text-muted-foreground">Cantidad</div>
                          </div>

                          <div className="text-center">
                            <div className="font-medium">{movement.location}</div>
                            <div className="text-xs text-muted-foreground">Ubicación</div>
                          </div>

                          <div className="text-center">
                            <div className="font-medium">{movement.user}</div>
                            <div className="text-xs text-muted-foreground">Usuario</div>
                          </div>

                          <div className="text-right">
                            <div className="font-medium">{movement.date}</div>
                            <div className="text-xs text-muted-foreground">{movement.reference}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="entries" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    Entradas de Inventario
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {movements
                      .filter((m) => m.type === "entrada")
                      .map((movement) => (
                        <div key={movement.id} className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-green-700">{movement.product}</div>
                              <div className="text-sm text-muted-foreground">{movement.reason}</div>
                              <div className="text-xs text-muted-foreground mt-1">Proveedor: {movement.supplier}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">+{movement.quantity}</div>
                              <div className="text-sm text-muted-foreground">{movement.date}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exits" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    Salidas de Inventario
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {movements
                      .filter((m) => m.type === "salida")
                      .map((movement) => (
                        <div key={movement.id} className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-red-700">{movement.product}</div>
                              <div className="text-sm text-muted-foreground">{movement.reason}</div>
                              <div className="text-xs text-muted-foreground mt-1">Cliente: {movement.customer}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-red-600">{movement.quantity}</div>
                              <div className="text-sm text-muted-foreground">{movement.date}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="adjustments" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4 text-yellow-500" />
                    Ajustes de Inventario
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {movements
                      .filter((m) => m.type === "ajuste")
                      .map((movement) => (
                        <div key={movement.id} className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-yellow-700">{movement.product}</div>
                              <div className="text-sm text-muted-foreground">{movement.reason}</div>
                              {movement.notes && (
                                <div className="text-xs text-muted-foreground mt-1">Notas: {movement.notes}</div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-yellow-600">{movement.quantity}</div>
                              <div className="text-sm text-muted-foreground">{movement.date}</div>
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
