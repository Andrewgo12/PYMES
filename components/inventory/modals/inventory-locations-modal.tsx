"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Warehouse, Package, Search, Plus, Edit, Trash2, QrCode } from "lucide-react"
import { useState } from "react"

interface InventoryLocationsModalProps {
  isOpen: boolean
  onClose: () => void
  items: any[]
}

export function InventoryLocationsModal({ isOpen, onClose, items }: InventoryLocationsModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedZone, setSelectedZone] = useState("all")

  const locations = [
    {
      id: "A1-B2-C3",
      zone: "Zona A",
      type: "estanteria",
      capacity: 100,
      occupied: 45,
      products: [{ name: "Laptop Dell XPS 13", quantity: 45, sku: "DELL-XPS13-001" }],
      temperature: "ambiente",
      access: "normal",
      lastUpdate: "2024-05-20 14:30",
    },
    {
      id: "B2-C1-D4",
      zone: "Zona B",
      type: "estanteria",
      capacity: 200,
      occupied: 8,
      products: [{ name: "Mouse Inalámbrico Logitech", quantity: 8, sku: "LOG-MX3-002" }],
      temperature: "ambiente",
      access: "normal",
      lastUpdate: "2024-05-18 11:15",
    },
    {
      id: "C3-D2-E1",
      zone: "Zona C",
      type: "estanteria",
      capacity: 50,
      occupied: 0,
      products: [],
      temperature: "ambiente",
      access: "normal",
      lastUpdate: "2024-05-15 16:45",
    },
    {
      id: "A2-B1-C2",
      zone: "Zona A",
      type: "pallet",
      capacity: 500,
      occupied: 250,
      products: [{ name: "Cajas de Embalaje", quantity: 250, sku: "BOX-STD-001" }],
      temperature: "ambiente",
      access: "montacargas",
      lastUpdate: "2024-05-19 09:20",
    },
  ]

  const zones = [
    { id: "A", name: "Zona A - Electrónicos", color: "bg-blue-500", locations: 8, capacity: 800, occupied: 295 },
    { id: "B", name: "Zona B - Accesorios", color: "bg-green-500", locations: 6, capacity: 600, occupied: 180 },
    { id: "C", name: "Zona C - Monitores", color: "bg-purple-500", locations: 4, capacity: 400, occupied: 120 },
    { id: "D", name: "Zona D - Almacén", color: "bg-orange-500", locations: 10, capacity: 1000, occupied: 750 },
  ]

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-600 bg-red-50"
    if (percentage >= 70) return "text-yellow-600 bg-yellow-50"
    if (percentage >= 50) return "text-blue-600 bg-blue-50"
    return "text-green-600 bg-green-50"
  }

  const getOccupancyPercentage = (occupied: number, capacity: number) => {
    return Math.round((occupied / capacity) * 100)
  }

  const filteredLocations = locations.filter(
    (location) =>
      location.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.products.some((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Gestión de Ubicaciones
          </DialogTitle>
          <DialogDescription>Mapa interactivo del almacén y gestión de ubicaciones</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumen de zonas */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {zones.map((zone) => (
              <Card key={zone.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${zone.color}`} />
                        <span className="font-medium text-sm">{zone.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{zone.locations} ubicaciones</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{getOccupancyPercentage(zone.occupied, zone.capacity)}%</div>
                      <div className="text-xs text-muted-foreground">
                        {zone.occupied}/{zone.capacity}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${zone.color}`}
                        style={{ width: `${getOccupancyPercentage(zone.occupied, zone.capacity)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="map" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="map">Mapa de Almacén</TabsTrigger>
                <TabsTrigger value="locations">Lista de Ubicaciones</TabsTrigger>
                <TabsTrigger value="management">Gestión</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar ubicaciones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Ubicación
                </Button>
              </div>
            </div>

            <TabsContent value="map" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Warehouse className="h-4 w-4" />
                    Mapa Interactivo del Almacén
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Zona A */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded" />
                        <h3 className="font-semibold">Zona A - Electrónicos</h3>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 16 }, (_, i) => {
                          const locationId = `A${Math.floor(i / 4) + 1}-B${(i % 4) + 1}-C${Math.floor(i / 8) + 1}`
                          const location = locations.find((loc) => loc.id.startsWith(`A${Math.floor(i / 4) + 1}`))
                          const occupancy = location ? getOccupancyPercentage(location.occupied, location.capacity) : 0

                          return (
                            <div
                              key={i}
                              className={`h-12 rounded border-2 flex items-center justify-center text-xs font-medium cursor-pointer transition-colors ${
                                occupancy >= 90
                                  ? "bg-red-500/20 border-red-500 hover:bg-red-500/30"
                                  : occupancy >= 70
                                    ? "bg-yellow-500/20 border-yellow-500 hover:bg-yellow-500/30"
                                    : occupancy >= 50
                                      ? "bg-blue-500/20 border-blue-500 hover:bg-blue-500/30"
                                      : occupancy > 0
                                        ? "bg-green-500/20 border-green-500 hover:bg-green-500/30"
                                        : "bg-muted border-border hover:bg-muted/70"
                              }`}
                              title={`${locationId} - ${occupancy}% ocupado`}
                            >
                              A{Math.floor(i / 4) + 1}-{(i % 4) + 1}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Zona B */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded" />
                        <h3 className="font-semibold">Zona B - Accesorios</h3>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 16 }, (_, i) => {
                          const location = locations.find((loc) => loc.id.startsWith(`B${Math.floor(i / 4) + 1}`))
                          const occupancy = location ? getOccupancyPercentage(location.occupied, location.capacity) : 0

                          return (
                            <div
                              key={i}
                              className={`h-12 rounded border-2 flex items-center justify-center text-xs font-medium cursor-pointer transition-colors ${
                                occupancy >= 90
                                  ? "bg-red-500/20 border-red-500"
                                  : occupancy >= 70
                                    ? "bg-yellow-500/20 border-yellow-500"
                                    : occupancy >= 50
                                      ? "bg-blue-500/20 border-blue-500"
                                      : occupancy > 0
                                        ? "bg-green-500/20 border-green-500"
                                        : "bg-muted border-border"
                              }`}
                            >
                              B{Math.floor(i / 4) + 1}-{(i % 4) + 1}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Zona C */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded" />
                        <h3 className="font-semibold">Zona C - Monitores</h3>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 16 }, (_, i) => {
                          const location = locations.find((loc) => loc.id.startsWith(`C${Math.floor(i / 4) + 1}`))
                          const occupancy = location ? getOccupancyPercentage(location.occupied, location.capacity) : 0

                          return (
                            <div
                              key={i}
                              className={`h-12 rounded border-2 flex items-center justify-center text-xs font-medium cursor-pointer transition-colors ${
                                occupancy >= 90
                                  ? "bg-red-500/20 border-red-500"
                                  : occupancy >= 70
                                    ? "bg-yellow-500/20 border-yellow-500"
                                    : occupancy >= 50
                                      ? "bg-blue-500/20 border-blue-500"
                                      : occupancy > 0
                                        ? "bg-green-500/20 border-green-500"
                                        : "bg-muted border-border"
                              }`}
                            >
                              C{Math.floor(i / 4) + 1}-{(i % 4) + 1}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500/20 border-2 border-green-500 rounded" />
                      <span className="text-sm">0-50% ocupado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500/20 border-2 border-blue-500 rounded" />
                      <span className="text-sm">50-70% ocupado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500/20 border-2 border-yellow-500 rounded" />
                      <span className="text-sm">70-90% ocupado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500/20 border-2 border-red-500 rounded" />
                      <span className="text-sm">90-100% ocupado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-muted border-2 border-border rounded" />
                      <span className="text-sm">Vacío</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="locations" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Detalle de Ubicaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredLocations.map((location) => (
                      <div key={location.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <QrCode className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                              <div className="font-mono text-sm font-medium">{location.id}</div>
                            </div>
                            <div>
                              <div className="font-medium">{location.zone}</div>
                              <div className="text-sm text-muted-foreground capitalize">{location.type}</div>
                              <Badge variant="outline" className="text-xs mt-1">
                                {location.access}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-lg font-semibold">{location.occupied}</div>
                              <div className="text-xs text-muted-foreground">de {location.capacity}</div>
                            </div>

                            <div className="text-center">
                              <Badge
                                className={`${getOccupancyColor(getOccupancyPercentage(location.occupied, location.capacity))} border-0`}
                              >
                                {getOccupancyPercentage(location.occupied, location.capacity)}%
                              </Badge>
                              <div className="text-xs text-muted-foreground mt-1">Ocupación</div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-medium">{location.products.length} productos</div>
                              <div className="text-xs text-muted-foreground">{location.lastUpdate}</div>
                            </div>
                          </div>
                        </div>

                        {location.products.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <div className="space-y-2">
                              {location.products.map((product, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span>{product.name}</span>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {product.sku}
                                    </Badge>
                                    <span className="font-medium">{product.quantity} unidades</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="management" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Gestión de Ubicaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {locations.map((location) => (
                      <div key={location.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="font-mono text-sm font-medium">{location.id}</div>
                            <div className="text-xs text-muted-foreground">{location.zone}</div>
                          </div>
                          <div>
                            <div className="font-medium">Capacidad: {location.capacity}</div>
                            <div className="text-sm text-muted-foreground">Ocupado: {location.occupied}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Package className="h-4 w-4 mr-2" />
                            Mover Stock
                          </Button>
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
