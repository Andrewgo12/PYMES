"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Database,
  Plus,
  Settings,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  Eye,
  Zap,
  Cloud,
  Server,
  FileText,
  BarChart3,
} from "lucide-react"
import { useState } from "react"

interface ReportDataSourcesModalProps {
  isOpen: boolean
  onClose: () => void
}

function ReportDataSourcesModal({ isOpen, onClose }: ReportDataSourcesModalProps) {
  const [selectedSource, setSelectedSource] = useState<any>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionProgress, setConnectionProgress] = useState(0)

  const dataSources = [
    {
      id: 1,
      name: "Base de Datos Principal",
      type: "PostgreSQL",
      status: "connected",
      lastSync: "2024-01-15 14:30",
      tables: 12,
      records: "2.4M",
      health: 98,
      latency: "12ms",
      usage: 85,
      icon: <Database className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "CRM Salesforce",
      type: "API",
      status: "connected",
      lastSync: "2024-01-15 14:25",
      tables: 8,
      records: "156K",
      health: 95,
      latency: "45ms",
      usage: 62,
      icon: <Cloud className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Google Analytics",
      type: "API",
      status: "connected",
      lastSync: "2024-01-15 14:20",
      tables: 5,
      records: "890K",
      health: 92,
      latency: "78ms",
      usage: 43,
      icon: <BarChart3 className="h-5 w-5" />,
      color: "bg-orange-500",
    },
    {
      id: 4,
      name: "Archivo CSV Ventas",
      type: "File",
      status: "error",
      lastSync: "2024-01-14 16:00",
      tables: 1,
      records: "45K",
      health: 0,
      latency: "N/A",
      usage: 0,
      icon: <FileText className="h-5 w-5" />,
      color: "bg-red-500",
      error: "Archivo no encontrado",
    },
    {
      id: 5,
      name: "API Inventario",
      type: "REST API",
      status: "syncing",
      lastSync: "2024-01-15 14:35",
      tables: 3,
      records: "78K",
      health: 88,
      latency: "156ms",
      usage: 71,
      icon: <Server className="h-5 w-5" />,
      color: "bg-purple-500",
    },
  ]

  const availableConnectors = [
    {
      name: "MySQL",
      type: "Database",
      icon: <Database className="h-6 w-6" />,
      description: "Conectar base de datos MySQL",
      popular: true,
    },
    {
      name: "MongoDB",
      type: "Database",
      icon: <Database className="h-6 w-6" />,
      description: "Base de datos NoSQL",
      popular: true,
    },
    {
      name: "Shopify",
      type: "E-commerce",
      icon: <Cloud className="h-6 w-6" />,
      description: "Datos de tienda online",
      popular: true,
    },
    {
      name: "HubSpot",
      type: "CRM",
      icon: <Cloud className="h-6 w-6" />,
      description: "CRM y marketing",
      popular: false,
    },
    {
      name: "Stripe",
      type: "Payments",
      icon: <Cloud className="h-6 w-6" />,
      description: "Datos de pagos",
      popular: true,
    },
    {
      name: "Excel/CSV",
      type: "File",
      icon: <FileText className="h-6 w-6" />,
      description: "Archivos de datos",
      popular: false,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "syncing":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
      case "disconnected":
        return <Clock className="h-4 w-4 text-gray-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "Conectado"
      case "error":
        return "Error"
      case "syncing":
        return "Sincronizando"
      case "disconnected":
        return "Desconectado"
      default:
        return "Desconocido"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      case "syncing":
        return "bg-blue-500"
      case "disconnected":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleConnect = () => {
    setIsConnecting(true)
    setConnectionProgress(0)

    const interval = setInterval(() => {
      setConnectionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsConnecting(false)
          return 100
        }
        return prev + 12
      })
    }, 300)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Fuentes de Datos
          </DialogTitle>
          <DialogDescription>Gestiona conexiones a bases de datos, APIs y archivos para tus reportes</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="sources" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sources">Fuentes Activas</TabsTrigger>
            <TabsTrigger value="add">Agregar Nueva</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoreo</TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-6">
            {/* Resumen */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold">{dataSources.length}</div>
                      <div className="text-sm text-muted-foreground">Fuentes Totales</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold">
                        {dataSources.filter((s) => s.status === "connected").length}
                      </div>
                      <div className="text-sm text-muted-foreground">Conectadas</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="text-2xl font-bold">3.5M</div>
                      <div className="text-sm text-muted-foreground">Registros Totales</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="text-2xl font-bold">94%</div>
                      <div className="text-sm text-muted-foreground">Salud Promedio</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Fuentes */}
            <div className="grid gap-4">
              {dataSources.map((source) => (
                <Card key={source.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${source.color} text-white`}>{source.icon}</div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{source.name}</h3>
                            <Badge variant="outline" className={`${getStatusColor(source.status)} text-white`}>
                              {getStatusText(source.status)}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {source.type}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">Última sincronización: {source.lastSync}</div>
                          {source.error && <div className="text-sm text-red-600">Error: {source.error}</div>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-4 mt-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Tablas</div>
                        <div className="font-semibold">{source.tables}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Registros</div>
                        <div className="font-semibold">{source.records}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Latencia</div>
                        <div className="font-semibold">{source.latency}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Uso</div>
                        <div className="flex items-center gap-2">
                          <Progress value={source.usage} className="flex-1 h-2" />
                          <span className="text-sm font-semibold">{source.usage}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">Salud:</span>
                          <span
                            className={`font-semibold ${
                              source.health > 90
                                ? "text-green-600"
                                : source.health > 70
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {source.health}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(source.status)}
                          <span className="text-sm text-muted-foreground">{getStatusText(source.status)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            {/* Conectores Populares */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Conectores Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {availableConnectors
                    .filter((connector) => connector.popular)
                    .map((connector, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-border hover:border-blue-300 cursor-pointer transition-colors"
                        onClick={handleConnect}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          {connector.icon}
                          <div>
                            <div className="font-semibold">{connector.name}</div>
                            <Badge variant="secondary" className="text-xs">
                              {connector.type}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{connector.description}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Todos los Conectores */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Todos los Conectores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {availableConnectors.map((connector, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer"
                      onClick={handleConnect}
                    >
                      <div className="flex items-center gap-3">
                        {connector.icon}
                        <div>
                          <div className="font-medium">{connector.name}</div>
                          <div className="text-sm text-muted-foreground">{connector.description}</div>
                        </div>
                      </div>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Conectar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progreso de Conexión */}
            {isConnecting && (
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Estableciendo conexión...</span>
                      <span className="text-sm text-muted-foreground">{connectionProgress}%</span>
                    </div>
                    <Progress value={connectionProgress} className="w-full" />
                    <div className="text-sm text-muted-foreground">
                      Verificando credenciales y configurando conexión...
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Configuración Manual */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Configuración Manual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Nombre de la Fuente</Label>
                    <Input placeholder="Mi Base de Datos" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Conexión</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mysql">MySQL</SelectItem>
                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                        <SelectItem value="mongodb">MongoDB</SelectItem>
                        <SelectItem value="api">REST API</SelectItem>
                        <SelectItem value="file">Archivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Host/URL</Label>
                    <Input placeholder="localhost:5432" />
                  </div>
                  <div className="space-y-2">
                    <Label>Puerto</Label>
                    <Input placeholder="5432" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Usuario</Label>
                    <Input placeholder="usuario" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contraseña</Label>
                    <Input type="password" placeholder="contraseña" />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-border">
                  <Button variant="outline">Probar Conexión</Button>
                  <Button>Guardar Fuente</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Rendimiento de Fuentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Gráfico de Rendimiento</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Alertas y Notificaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        type: "error",
                        message: "Archivo CSV Ventas no encontrado",
                        time: "Hace 2 horas",
                      },
                      {
                        type: "warning",
                        message: "API Inventario con alta latencia",
                        time: "Hace 4 horas",
                      },
                      {
                        type: "info",
                        message: "Sincronización completada exitosamente",
                        time: "Hace 6 horas",
                      },
                    ].map((alert, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        {alert.type === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}
                        {alert.type === "warning" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                        {alert.type === "info" && <CheckCircle className="h-4 w-4 text-blue-500" />}
                        <div className="flex-1">
                          <div className="text-sm font-medium">{alert.message}</div>
                          <div className="text-xs text-muted-foreground">{alert.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Estadísticas de Uso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataSources.map((source) => (
                    <div key={source.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${source.color} text-white`}>{source.icon}</div>
                        <div>
                          <div className="font-medium">{source.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {source.records} registros • {source.tables} tablas
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{source.usage}% uso</div>
                        <div className="text-xs text-muted-foreground">{source.latency} latencia</div>
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

export { ReportDataSourcesModal }
