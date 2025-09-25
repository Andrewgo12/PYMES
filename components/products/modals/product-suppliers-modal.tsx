"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, Star, Clock, MapPin, Phone, Mail, Plus, Search, Filter } from "lucide-react"
import { useState } from "react"

interface ProductSuppliersModalProps {
  isOpen: boolean
  onClose: () => void
  product: any
}

function ProductSuppliersModal({ isOpen, onClose, product }: ProductSuppliersModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null)

  if (!product) return null

  const suppliers = [
    {
      id: 1,
      name: "TechSupply Global",
      rating: 4.8,
      price: 45.99,
      deliveryTime: "3-5 días",
      location: "Madrid, España",
      phone: "+34 91 123 4567",
      email: "ventas@techsupply.es",
      status: "activo",
      reliability: 98,
      orders: 156,
      lastOrder: "2024-05-15",
      specialties: ["Electrónicos", "Tecnología", "Componentes"],
      certifications: ["ISO 9001", "CE", "RoHS"],
      paymentTerms: "30 días",
      minimumOrder: 50,
      discount: 5,
    },
    {
      id: 2,
      name: "Distribuidora Premium",
      rating: 4.6,
      price: 48.5,
      deliveryTime: "2-4 días",
      location: "Barcelona, España",
      phone: "+34 93 987 6543",
      email: "pedidos@premium.es",
      status: "activo",
      reliability: 95,
      orders: 89,
      lastOrder: "2024-05-10",
      specialties: ["Premium", "Calidad", "Servicio"],
      certifications: ["ISO 14001", "OHSAS 18001"],
      paymentTerms: "15 días",
      minimumOrder: 25,
      discount: 3,
    },
    {
      id: 3,
      name: "FastDelivery Corp",
      rating: 4.2,
      price: 52.0,
      deliveryTime: "1-2 días",
      location: "Valencia, España",
      phone: "+34 96 555 0123",
      email: "express@fastdelivery.es",
      status: "activo",
      reliability: 92,
      orders: 234,
      lastOrder: "2024-05-18",
      specialties: ["Entrega rápida", "Logística", "Express"],
      certifications: ["ISO 9001"],
      paymentTerms: "Inmediato",
      minimumOrder: 10,
      discount: 0,
    },
  ]

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activo":
        return "bg-green-500"
      case "inactivo":
        return "bg-red-500"
      case "pendiente":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 95) return "text-green-600"
    if (reliability >= 90) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Proveedores - {product.name}
          </DialogTitle>
          <DialogDescription>Gestión completa de proveedores y comparación de ofertas</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Barra de búsqueda y filtros */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar proveedores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Proveedor
            </Button>
          </div>

          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">Lista de Proveedores</TabsTrigger>
              <TabsTrigger value="comparison">Comparación</TabsTrigger>
              <TabsTrigger value="performance">Rendimiento</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <div className="grid gap-4">
                {filteredSuppliers.map((supplier) => (
                  <Card key={supplier.id} className="bg-card border-border hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                            {supplier.name.charAt(0)}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{supplier.name}</h3>
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(supplier.status)}`} />
                              <Badge variant="secondary" className="text-xs">
                                {supplier.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {supplier.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {supplier.phone}
                              </div>
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {supplier.email}
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{supplier.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{supplier.deliveryTime}</span>
                              </div>
                              <div className={`text-sm font-medium ${getReliabilityColor(supplier.reliability)}`}>
                                {supplier.reliability}% confiabilidad
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="text-2xl font-bold text-green-600">${supplier.price}</div>
                          <div className="text-sm text-muted-foreground">{supplier.orders} pedidos</div>
                          <Button size="sm" onClick={() => setSelectedSupplier(supplier)}>
                            Ver Detalles
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium">Especialidades:</span>
                          {supplier.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Pedido mínimo: {supplier.minimumOrder} unidades</span>
                          <span>Términos: {supplier.paymentTerms}</span>
                          {supplier.discount > 0 && (
                            <span className="text-green-600 font-medium">{supplier.discount}% descuento</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Comparación de Proveedores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border">
                        <tr>
                          <th className="text-left p-3 font-medium">Proveedor</th>
                          <th className="text-center p-3 font-medium">Precio</th>
                          <th className="text-center p-3 font-medium">Entrega</th>
                          <th className="text-center p-3 font-medium">Rating</th>
                          <th className="text-center p-3 font-medium">Confiabilidad</th>
                          <th className="text-center p-3 font-medium">Pedido Mín.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {suppliers.map((supplier) => (
                          <tr key={supplier.id} className="border-b border-border">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">
                                  {supplier.name.charAt(0)}
                                </div>
                                <span className="font-medium">{supplier.name}</span>
                              </div>
                            </td>
                            <td className="p-3 text-center font-semibold text-green-600">${supplier.price}</td>
                            <td className="p-3 text-center">{supplier.deliveryTime}</td>
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {supplier.rating}
                              </div>
                            </td>
                            <td className={`p-3 text-center font-medium ${getReliabilityColor(supplier.reliability)}`}>
                              {supplier.reliability}%
                            </td>
                            <td className="p-3 text-center">{supplier.minimumOrder}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {suppliers.map((supplier) => (
                  <Card key={supplier.id} className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">
                          {supplier.name.charAt(0)}
                        </div>
                        {supplier.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 rounded-lg bg-muted/50">
                            <div className="text-2xl font-bold text-blue-600">{supplier.orders}</div>
                            <div className="text-xs text-muted-foreground">Pedidos Totales</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-muted/50">
                            <div className={`text-2xl font-bold ${getReliabilityColor(supplier.reliability)}`}>
                              {supplier.reliability}%
                            </div>
                            <div className="text-xs text-muted-foreground">Confiabilidad</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Último pedido:</span>
                            <span className="font-medium">{supplier.lastOrder}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Certificaciones:</span>
                            <div className="flex gap-1">
                              {supplier.certifications.map((cert, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { ProductSuppliersModal }
