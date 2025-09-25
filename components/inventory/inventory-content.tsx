"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  MapPin,
  BarChart3,
  Search,
  Filter,
  RefreshCw,
  Warehouse,
  Move,
  Settings,
  Eye,
  ArrowUpDown,
  Target,
  Clock,
} from "lucide-react"

// Importar modales
import { InventoryMovementsModal } from "./modals/inventory-movements-modal"
import { InventoryAdjustmentsModal } from "./modals/inventory-adjustments-modal"
import { InventoryLocationsModal } from "./modals/inventory-locations-modal"
import { InventoryAlertsModal } from "./modals/inventory-alerts-modal"
import { InventoryCountModal } from "./modals/inventory-count-modal"
import { InventoryTransfersModal } from "./modals/inventory-transfers-modal"
import { InventoryReservationsModal } from "./modals/inventory-reservations-modal"
import { InventoryForecastModal } from "./modals/inventory-forecast-modal"

export function InventoryContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  // Estados de modales
  const [movementsModal, setMovementsModal] = useState(false)
  const [adjustmentsModal, setAdjustmentsModal] = useState(false)
  const [locationsModal, setLocationsModal] = useState(false)
  const [alertsModal, setAlertsModal] = useState(false)
  const [countModal, setCountModal] = useState(false)
  const [transfersModal, setTransfersModal] = useState(false)
  const [reservationsModal, setReservationsModal] = useState(false)
  const [forecastModal, setForecastModal] = useState(false)

  // Datos simulados de inventario
  const inventoryItems = [
    {
      id: 1,
      name: "Laptop Dell XPS 13",
      sku: "DELL-XPS13-001",
      category: "Electrónicos",
      currentStock: 45,
      minStock: 10,
      maxStock: 100,
      location: "A1-B2-C3",
      zone: "Zona A",
      lastMovement: "2024-05-20",
      movementType: "entrada",
      supplier: "TechSupply",
      cost: 899.99,
      value: 40499.55,
      status: "disponible",
      fifoDate: "2024-03-15",
      reserved: 5,
      available: 40,
      reorderPoint: 15,
      leadTime: 7,
      turnoverRate: 4.2,
    },
    {
      id: 2,
      name: "Mouse Inalámbrico Logitech",
      sku: "LOG-MX3-002",
      category: "Accesorios",
      currentStock: 8,
      minStock: 20,
      maxStock: 200,
      location: "B2-C1-D4",
      zone: "Zona B",
      lastMovement: "2024-05-18",
      movementType: "salida",
      supplier: "Distribuidora Premium",
      cost: 45.99,
      value: 367.92,
      status: "bajo_stock",
      fifoDate: "2024-04-01",
      reserved: 2,
      available: 6,
      reorderPoint: 20,
      leadTime: 3,
      turnoverRate: 8.1,
    },
    {
      id: 3,
      name: "Monitor 4K Samsung",
      sku: "SAM-4K27-003",
      category: "Monitores",
      currentStock: 0,
      minStock: 5,
      maxStock: 50,
      location: "C3-D2-E1",
      zone: "Zona C",
      lastMovement: "2024-05-15",
      movementType: "salida",
      supplier: "FastDelivery Corp",
      cost: 299.99,
      value: 0,
      status: "agotado",
      fifoDate: "2024-02-20",
      reserved: 3,
      available: 0,
      reorderPoint: 5,
      leadTime: 10,
      turnoverRate: 2.8,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "disponible":
        return "bg-green-500"
      case "bajo_stock":
        return "bg-yellow-500"
      case "agotado":
        return "bg-red-500"
      case "exceso":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "disponible":
        return "Disponible"
      case "bajo_stock":
        return "Bajo Stock"
      case "agotado":
        return "Agotado"
      case "exceso":
        return "Exceso"
      default:
        return "Desconocido"
    }
  }

  const getTurnoverColor = (rate: number) => {
    if (rate >= 6) return "text-green-600"
    if (rate >= 3) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredItems = inventoryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalValue = inventoryItems.reduce((sum, item) => sum + item.value, 0)
  const lowStockItems = inventoryItems.filter((item) => item.currentStock <= item.minStock).length
  const outOfStockItems = inventoryItems.filter((item) => item.currentStock === 0).length
  const totalItems = inventoryItems.reduce((sum, item) => sum + item.currentStock, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventario</h1>
          <p className="text-muted-foreground">Gestión completa de stock y almacén</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCountModal(true)}>
            <Target className="h-4 w-4 mr-2" />
            Conteo Cíclico
          </Button>
          <Button size="sm" onClick={() => setAdjustmentsModal(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Ajuste de Stock
          </Button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold text-blue-600">${totalValue.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+12.5%</span>
              <span className="text-muted-foreground ml-1">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Items Totales</p>
                <p className="text-2xl font-bold text-green-600">{totalItems.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <RefreshCw className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-muted-foreground">Rotación promedio: 5.0x</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bajo Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-yellow-600 hover:text-yellow-700 p-0 h-auto"
                onClick={() => setAlertsModal(true)}
              >
                Ver alertas →
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sin Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
              </div>
              <div className="h-12 w-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 p-0 h-auto"
                onClick={() => setForecastModal(true)}
              >
                Ver predicciones →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones rápidas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Button
          variant="outline"
          className="h-20 flex-col gap-2 bg-transparent"
          onClick={() => setMovementsModal(true)}
        >
          <ArrowUpDown className="h-6 w-6" />
          <span>Movimientos</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col gap-2 bg-transparent"
          onClick={() => setLocationsModal(true)}
        >
          <MapPin className="h-6 w-6" />
          <span>Ubicaciones</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col gap-2 bg-transparent"
          onClick={() => setTransfersModal(true)}
        >
          <Move className="h-6 w-6" />
          <span>Transferencias</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col gap-2 bg-transparent"
          onClick={() => setReservationsModal(true)}
        >
          <Clock className="h-6 w-6" />
          <span>Reservas</span>
        </Button>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="inventory">Inventario</TabsTrigger>
            <TabsTrigger value="warehouse">Mapa de Almacén</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <TabsContent value="inventory" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Lista de Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left p-3 font-medium">Producto</th>
                      <th className="text-center p-3 font-medium">Stock Actual</th>
                      <th className="text-center p-3 font-medium">Disponible</th>
                      <th className="text-center p-3 font-medium">Ubicación</th>
                      <th className="text-center p-3 font-medium">Estado</th>
                      <th className="text-center p-3 font-medium">Rotación</th>
                      <th className="text-center p-3 font-medium">Valor</th>
                      <th className="text-center p-3 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="border-b border-border hover:bg-muted/50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.sku}</div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {item.category}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="font-semibold text-lg">{item.currentStock}</div>
                          <div className="text-xs text-muted-foreground">
                            Min: {item.minStock} | Max: {item.maxStock}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="font-medium text-green-600">{item.available}</div>
                          <div className="text-xs text-muted-foreground">Reservado: {item.reserved}</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="font-medium">{item.location}</div>
                          <div className="text-xs text-muted-foreground">{item.zone}</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`} />
                            <Badge variant="secondary" className="text-xs">
                              {getStatusLabel(item.status)}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className={`font-semibold ${getTurnoverColor(item.turnoverRate)}`}>
                            {item.turnoverRate}x
                          </div>
                          <div className="text-xs text-muted-foreground">Lead: {item.leadTime}d</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="font-semibold text-green-600">${item.value.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">@${item.cost}</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
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

        <TabsContent value="warehouse" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Warehouse className="h-4 w-4" />
                Mapa de Almacén
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-4">
                  <h3 className="font-semibold">Zona A - Electrónicos</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 16 }, (_, i) => (
                      <div
                        key={i}
                        className={`h-12 rounded border-2 flex items-center justify-center text-xs font-medium ${
                          i === 5
                            ? "bg-green-500/20 border-green-500"
                            : i === 8
                              ? "bg-yellow-500/20 border-yellow-500"
                              : i === 12
                                ? "bg-red-500/20 border-red-500"
                                : "bg-muted border-border"
                        }`}
                      >
                        A{Math.floor(i / 4) + 1}-{(i % 4) + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Zona B - Accesorios</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 16 }, (_, i) => (
                      <div
                        key={i}
                        className={`h-12 rounded border-2 flex items-center justify-center text-xs font-medium ${
                          i === 2
                            ? "bg-yellow-500/20 border-yellow-500"
                            : i === 7
                              ? "bg-green-500/20 border-green-500"
                              : "bg-muted border-border"
                        }`}
                      >
                        B{Math.floor(i / 4) + 1}-{(i % 4) + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Zona C - Monitores</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 16 }, (_, i) => (
                      <div
                        key={i}
                        className={`h-12 rounded border-2 flex items-center justify-center text-xs font-medium ${
                          i === 10 ? "bg-red-500/20 border-red-500" : "bg-muted border-border"
                        }`}
                      >
                        C{Math.floor(i / 4) + 1}-{(i % 4) + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500/20 border-2 border-green-500 rounded" />
                  <span className="text-sm">Stock Normal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500/20 border-2 border-yellow-500 rounded" />
                  <span className="text-sm">Bajo Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500/20 border-2 border-red-500 rounded" />
                  <span className="text-sm">Sin Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted border-2 border-border rounded" />
                  <span className="text-sm">Vacío</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Análisis FIFO/LIFO</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground">FIFO: {item.fifoDate}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {Math.floor(
                            (new Date().getTime() - new Date(item.fifoDate).getTime()) / (1000 * 60 * 60 * 24),
                          )}{" "}
                          días
                        </div>
                        <div className="text-xs text-muted-foreground">Antigüedad</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Predicciones ML</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="font-medium text-blue-700 text-sm">Demanda Prevista</div>
                    <div className="text-2xl font-bold text-blue-600">+23%</div>
                    <div className="text-xs text-muted-foreground">Próximos 30 días</div>
                  </div>
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="font-medium text-green-700 text-sm">Optimización Stock</div>
                    <div className="text-2xl font-bold text-green-600">-15%</div>
                    <div className="text-xs text-muted-foreground">Reducción de costos</div>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="font-medium text-purple-700 text-sm">Rotación Mejorada</div>
                    <div className="text-2xl font-bold text-purple-600">+8.2x</div>
                    <div className="text-xs text-muted-foreground">Promedio proyectado</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modales */}
      <InventoryMovementsModal
        isOpen={movementsModal}
        onClose={() => setMovementsModal(false)}
        items={inventoryItems}
      />
      <InventoryAdjustmentsModal
        isOpen={adjustmentsModal}
        onClose={() => setAdjustmentsModal(false)}
        items={inventoryItems}
      />
      <InventoryLocationsModal
        isOpen={locationsModal}
        onClose={() => setLocationsModal(false)}
        items={inventoryItems}
      />
      <InventoryAlertsModal isOpen={alertsModal} onClose={() => setAlertsModal(false)} items={inventoryItems} />
      <InventoryCountModal isOpen={countModal} onClose={() => setCountModal(false)} items={inventoryItems} />
      <InventoryTransfersModal
        isOpen={transfersModal}
        onClose={() => setTransfersModal(false)}
        items={inventoryItems}
      />
      <InventoryReservationsModal
        isOpen={reservationsModal}
        onClose={() => setReservationsModal(false)}
        items={inventoryItems}
      />
      <InventoryForecastModal isOpen={forecastModal} onClose={() => setForecastModal(false)} items={inventoryItems} />
    </div>
  )
}
