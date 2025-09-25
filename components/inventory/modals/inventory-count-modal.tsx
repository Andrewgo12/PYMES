"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, QrCode, CheckCircle, AlertCircle, Clock, Calendar, BarChart3 } from "lucide-react"
import { useState } from "react"

interface InventoryCountModalProps {
  isOpen: boolean
  onClose: () => void
  items: any[]
}

export function InventoryCountModal({ isOpen, onClose, items }: InventoryCountModalProps) {
  const [selectedZone, setSelectedZone] = useState("")
  const [countType, setCountType] = useState("")
  const [countedQuantity, setCountedQuantity] = useState("")
  const [selectedItem, setSelectedItem] = useState("")

  const cycleCounts = [
    {
      id: 1,
      name: "Conteo Zona A - Electrónicos",
      type: "ciclico",
      zone: "Zona A",
      status: "en_progreso",
      startDate: "2024-05-20",
      endDate: "2024-05-22",
      assignedTo: "Juan Pérez",
      itemsTotal: 25,
      itemsCounted: 18,
      discrepancies: 2,
      accuracy: 92.3,
    },
    {
      id: 2,
      name: "Inventario Físico Completo",
      type: "completo",
      zone: "Todas",
      status: "programado",
      startDate: "2024-05-25",
      endDate: "2024-05-27",
      assignedTo: "María García",
      itemsTotal: 150,
      itemsCounted: 0,
      discrepancies: 0,
      accuracy: 0,
    },
    {
      id: 3,
      name: "Conteo ABC - Productos A",
      type: "abc",
      zone: "Zona B",
      status: "completado",
      startDate: "2024-05-15",
      endDate: "2024-05-17",
      assignedTo: "Carlos López",
      itemsTotal: 35,
      itemsCounted: 35,
      discrepancies: 1,
      accuracy: 97.1,
    },
  ]

  const countItems = [
    {
      id: 1,
      product: "Laptop Dell XPS 13",
      sku: "DELL-XPS13-001",
      location: "A1-B2-C3",
      systemStock: 45,
      countedStock: 43,
      difference: -2,
      status: "discrepancia",
      countedBy: "Juan Pérez",
      countDate: "2024-05-20 14:30",
      notes: "2 unidades no encontradas en ubicación",
    },
    {
      id: 2,
      product: "Mouse Inalámbrico Logitech",
      sku: "LOG-MX3-002",
      location: "B2-C1-D4",
      systemStock: 8,
      countedStock: 8,
      difference: 0,
      status: "correcto",
      countedBy: "Juan Pérez",
      countDate: "2024-05-20 11:15",
      notes: "Conteo correcto",
    },
    {
      id: 3,
      product: "Monitor 4K Samsung",
      sku: "SAM-4K27-003",
      location: "C3-D2-E1",
      systemStock: 0,
      countedStock: 1,
      difference: 1,
      status: "discrepancia",
      countedBy: "Juan Pérez",
      countDate: "2024-05-20 16:45",
      notes: "1 unidad encontrada no registrada",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completado":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "en_progreso":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "programado":
        return <Calendar className="h-4 w-4 text-yellow-500" />
      case "discrepancia":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "correcto":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Target className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completado":
        return "text-green-600 bg-green-50"
      case "en_progreso":
        return "text-blue-600 bg-blue-50"
      case "programado":
        return "text-yellow-600 bg-yellow-50"
      case "discrepancia":
        return "text-red-600 bg-red-50"
      case "correcto":
        return "text-green-600 bg-green-50"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getDifferenceColor = (difference: number) => {
    if (difference > 0) return "text-green-600 bg-green-50"
    if (difference < 0) return "text-red-600 bg-red-50"
    return "text-blue-600 bg-blue-50"
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return "text-green-600"
    if (accuracy >= 90) return "text-yellow-600"
    return "text-red-600"
  }

  const handleStartCount = () => {
    console.log("[v0] Iniciando conteo:", { zone: selectedZone, type: countType })
  }

  const handleSubmitCount = () => {
    console.log("[v0] Registrando conteo:", {
      item: selectedItem,
      counted: countedQuantity,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Conteo Cíclico de Inventario
          </DialogTitle>
          <DialogDescription>Sistema de conteo físico con seguimiento de precisión</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Métricas de conteo */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">En Progreso</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {cycleCounts.filter((c) => c.status === "en_progreso").length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completados</p>
                    <p className="text-2xl font-bold text-green-600">
                      {cycleCounts.filter((c) => c.status === "completado").length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-500/10 border-yellow-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Programados</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {cycleCounts.filter((c) => c.status === "programado").length}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-500/10 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Precisión Promedio</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {(
                        cycleCounts.filter((c) => c.status === "completado").reduce((sum, c) => sum + c.accuracy, 0) /
                        cycleCounts.filter((c) => c.status === "completado").length
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Conteos Activos</TabsTrigger>
              <TabsTrigger value="new">Nuevo Conteo</TabsTrigger>
              <TabsTrigger value="results">Resultados</TabsTrigger>
              <TabsTrigger value="discrepancies">Discrepancias</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Conteos en Progreso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cycleCounts
                      .filter((count) => count.status === "en_progreso" || count.status === "programado")
                      .map((count) => (
                        <div key={count.id} className="p-4 rounded-lg bg-muted/50 border-l-4 border-l-blue-500">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(count.status)}
                                <Badge className={`${getStatusColor(count.status)} border-0`}>{count.type}</Badge>
                              </div>
                              <div>
                                <div className="font-medium">{count.name}</div>
                                <div className="text-sm text-muted-foreground">{count.zone}</div>
                                <div className="text-xs text-muted-foreground mt-1">Asignado a: {count.assignedTo}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-6">
                              <div className="text-center">
                                <div className="text-lg font-semibold">
                                  {count.itemsCounted}/{count.itemsTotal}
                                </div>
                                <div className="text-xs text-muted-foreground">Items Contados</div>
                              </div>

                              <div className="text-center">
                                <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center">
                                  <span className="text-sm font-bold text-blue-600">
                                    {Math.round((count.itemsCounted / count.itemsTotal) * 100)}%
                                  </span>
                                </div>
                              </div>

                              <div className="text-right">
                                <div className="text-sm font-medium">
                                  {count.startDate} - {count.endDate}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Discrepancias: {count.discrepancies}
                                </div>
                                <Button size="sm" className="mt-2">
                                  Continuar Conteo
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
                  <CardTitle className="text-sm">Programar Nuevo Conteo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="countType">Tipo de Conteo</Label>
                      <Select value={countType} onValueChange={setCountType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ciclico">Conteo Cíclico</SelectItem>
                          <SelectItem value="completo">Inventario Físico Completo</SelectItem>
                          <SelectItem value="abc">Conteo ABC</SelectItem>
                          <SelectItem value="spot">Conteo Spot</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zone">Zona/Ubicación</Label>
                      <Select value={selectedZone} onValueChange={setSelectedZone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar zona..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="zona-a">Zona A - Electrónicos</SelectItem>
                          <SelectItem value="zona-b">Zona B - Accesorios</SelectItem>
                          <SelectItem value="zona-c">Zona C - Monitores</SelectItem>
                          <SelectItem value="todas">Todas las Zonas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button onClick={handleStartCount} disabled={!countType || !selectedZone}>
                      Iniciar Conteo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Conteo rápido */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    Conteo Rápido por Código
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="item">Producto</Label>
                      <Select value={selectedItem} onValueChange={setSelectedItem}>
                        <SelectTrigger>
                          <SelectValue placeholder="Escanear o seleccionar..." />
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
                      <Label htmlFor="counted">Cantidad Contada</Label>
                      <Input
                        id="counted"
                        type="number"
                        placeholder="Cantidad física..."
                        value={countedQuantity}
                        onChange={(e) => setCountedQuantity(e.target.value)}
                      />
                    </div>

                    <div className="flex items-end">
                      <Button onClick={handleSubmitCount} disabled={!selectedItem || !countedQuantity}>
                        Registrar Conteo
                      </Button>
                    </div>
                  </div>

                  {selectedItem && (
                    <Card className="bg-muted/50 border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Stock del Sistema</h4>
                            <p className="text-2xl font-bold text-blue-600">
                              {items.find((item) => item.id.toString() === selectedItem)?.currentStock || 0}
                            </p>
                          </div>
                          <div className="text-right">
                            <h4 className="font-medium">Diferencia</h4>
                            <p
                              className={`text-2xl font-bold ${
                                countedQuantity
                                  ? Number.parseInt(countedQuantity) -
                                      (items.find((item) => item.id.toString() === selectedItem)?.currentStock || 0) >
                                    0
                                    ? "text-green-600"
                                    : Number.parseInt(countedQuantity) -
                                          (items.find((item) => item.id.toString() === selectedItem)?.currentStock ||
                                            0) <
                                        0
                                      ? "text-red-600"
                                      : "text-blue-600"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {countedQuantity
                                ? Number.parseInt(countedQuantity) -
                                    (items.find((item) => item.id.toString() === selectedItem)?.currentStock || 0) >
                                  0
                                  ? `+${
                                      Number.parseInt(countedQuantity) -
                                      (items.find((item) => item.id.toString() === selectedItem)?.currentStock || 0)
                                    }`
                                  : Number.parseInt(countedQuantity) -
                                    (items.find((item) => item.id.toString() === selectedItem)?.currentStock || 0)
                                : "---"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Resultados de Conteos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cycleCounts
                      .filter((count) => count.status === "completado")
                      .map((count) => (
                        <div key={count.id} className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-green-700">{count.name}</div>
                              <div className="text-sm text-muted-foreground">{count.zone}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Completado por: {count.assignedTo}
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-center">
                                <div className="text-lg font-semibold">{count.itemsTotal}</div>
                                <div className="text-xs text-muted-foreground">Items Contados</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-semibold">{count.discrepancies}</div>
                                <div className="text-xs text-muted-foreground">Discrepancias</div>
                              </div>
                              <div className="text-center">
                                <div className={`text-lg font-semibold ${getAccuracyColor(count.accuracy)}`}>
                                  {count.accuracy}%
                                </div>
                                <div className="text-xs text-muted-foreground">Precisión</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discrepancies" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    Discrepancias Encontradas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {countItems
                      .filter((item) => item.status === "discrepancia")
                      .map((item) => (
                        <div key={item.id} className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <AlertCircle className="h-6 w-6 text-red-500" />
                              <div>
                                <div className="font-medium text-red-700">{item.product}</div>
                                <div className="text-sm text-muted-foreground">{item.sku}</div>
                                <div className="text-xs text-muted-foreground mt-1">{item.notes}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-6">
                              <div className="text-center">
                                <div className="text-lg font-semibold">{item.systemStock}</div>
                                <div className="text-xs text-muted-foreground">Sistema</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-semibold">{item.countedStock}</div>
                                <div className="text-xs text-muted-foreground">Contado</div>
                              </div>
                              <div className="text-center">
                                <Badge className={`${getDifferenceColor(item.difference)} border-0`}>
                                  {item.difference > 0 ? "+" : ""}
                                  {item.difference}
                                </Badge>
                                <div className="text-xs text-muted-foreground mt-1">Diferencia</div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600 border-green-600 bg-transparent"
                                >
                                  Ajustar Sistema
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-blue-600 border-blue-600 bg-transparent"
                                >
                                  Recontar
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
