"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { GitBranch, Plus, Play, Pause, Edit, Copy, Activity, Clock, AlertTriangle, ArrowRight } from "lucide-react"

interface WorkflowsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WorkflowsModal({ isOpen, onClose }: WorkflowsModalProps) {
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null)

  const workflows = [
    {
      id: 1,
      name: "Procesamiento de Pedidos",
      description: "Automatiza el flujo desde pedido hasta envío",
      status: "active",
      trigger: "new_order",
      steps: 5,
      executions: 1247,
      successRate: 98.5,
      lastRun: "Hace 5 min",
      category: "orders",
      created: "2024-01-15",
    },
    {
      id: 2,
      name: "Alerta de Stock Bajo",
      description: "Notifica cuando el inventario está bajo",
      status: "active",
      trigger: "inventory_low",
      steps: 3,
      executions: 89,
      successRate: 100,
      lastRun: "Hace 2 horas",
      category: "inventory",
      created: "2024-01-20",
    },
    {
      id: 3,
      name: "Onboarding de Clientes",
      description: "Secuencia de bienvenida para nuevos clientes",
      status: "paused",
      trigger: "new_customer",
      steps: 7,
      executions: 156,
      successRate: 94.2,
      lastRun: "Hace 1 día",
      category: "customers",
      created: "2024-02-01",
    },
    {
      id: 4,
      name: "Backup Automático",
      description: "Realiza backup y notifica el resultado",
      status: "active",
      trigger: "scheduled",
      steps: 4,
      executions: 30,
      successRate: 96.7,
      lastRun: "Hace 6 horas",
      category: "system",
      created: "2024-02-10",
    },
    {
      id: 5,
      name: "Seguimiento de Pagos",
      description: "Envía recordatorios de pagos pendientes",
      status: "draft",
      trigger: "payment_overdue",
      steps: 6,
      executions: 0,
      successRate: 0,
      lastRun: "Nunca",
      category: "payments",
      created: "2024-02-15",
    },
  ]

  const triggers = [
    { value: "new_order", label: "Nuevo Pedido", icon: "📦" },
    { value: "new_customer", label: "Nuevo Cliente", icon: "👤" },
    { value: "inventory_low", label: "Stock Bajo", icon: "📉" },
    { value: "payment_received", label: "Pago Recibido", icon: "💰" },
    { value: "payment_overdue", label: "Pago Vencido", icon: "⏰" },
    { value: "scheduled", label: "Programado", icon: "🕒" },
    { value: "manual", label: "Manual", icon: "👆" },
  ]

  const actions = [
    { value: "send_email", label: "Enviar Email", icon: "📧" },
    { value: "send_notification", label: "Enviar Notificación", icon: "🔔" },
    { value: "create_task", label: "Crear Tarea", icon: "✅" },
    { value: "update_record", label: "Actualizar Registro", icon: "📝" },
    { value: "call_webhook", label: "Llamar Webhook", icon: "🔗" },
    { value: "wait", label: "Esperar", icon: "⏳" },
    { value: "condition", label: "Condición", icon: "🔀" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "paused":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "draft":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "error":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="h-4 w-4" />
      case "paused":
        return <Pause className="h-4 w-4" />
      case "draft":
        return <Edit className="h-4 w-4" />
      case "error":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Workflows Visuales
          </DialogTitle>
          <DialogDescription>Automatización y procesos empresariales</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="workflows" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="builder">Constructor</TabsTrigger>
            <TabsTrigger value="executions">Ejecuciones</TabsTrigger>
            <TabsTrigger value="templates">Plantillas</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Workflows Activos</h3>
                <p className="text-sm text-muted-foreground">Automatizaciones configuradas en el sistema</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Workflow
              </Button>
            </div>

            <div className="grid gap-4">
              {workflows.map((workflow) => (
                <Card key={workflow.id} className="hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <GitBranch className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{workflow.name}</h4>
                            <Badge variant="outline" className={getStatusColor(workflow.status)}>
                              {getStatusIcon(workflow.status)}
                              <span className="ml-1 capitalize">{workflow.status}</span>
                            </Badge>
                            <Badge variant="outline">{workflow.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{workflow.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <span>{workflow.steps} pasos</span>
                            <span>{workflow.executions} ejecuciones</span>
                            <span>{workflow.successRate}% éxito</span>
                            <span>Última: {workflow.lastRun}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Activity className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Switch defaultChecked={workflow.status === "active"} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="builder" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Constructor Visual de Workflows</CardTitle>
                <CardDescription>Arrastra y suelta elementos para crear tu automatización</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Disparadores</h4>
                      <div className="space-y-2">
                        {triggers.slice(0, 4).map((trigger) => (
                          <div
                            key={trigger.value}
                            className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-muted/50"
                          >
                            <span>{trigger.icon}</span>
                            <span className="text-sm">{trigger.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Acciones</h4>
                      <div className="space-y-2">
                        {actions.slice(0, 4).map((action) => (
                          <div
                            key={action.value}
                            className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-muted/50"
                          >
                            <span>{action.icon}</span>
                            <span className="text-sm">{action.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 min-h-96">
                      <div className="text-center text-muted-foreground">
                        <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">Canvas del Workflow</p>
                        <p className="text-sm">Arrastra elementos aquí para construir tu automatización</p>
                      </div>

                      {/* Ejemplo de workflow visual */}
                      <div className="mt-8 flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <span>📦</span>
                          <span className="text-sm">Nuevo Pedido</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <span>📧</span>
                          <span className="text-sm">Enviar Email</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <div className="flex items-center gap-2 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <span>📝</span>
                          <span className="text-sm">Actualizar Estado</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="executions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Ejecuciones</CardTitle>
                <CardDescription>Registro de todas las ejecuciones de workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { workflow: "Procesamiento de Pedidos", status: "success", duration: "2.3s", time: "Hace 5 min" },
                    { workflow: "Procesamiento de Pedidos", status: "success", duration: "1.8s", time: "Hace 12 min" },
                    { workflow: "Alerta de Stock Bajo", status: "success", duration: "0.5s", time: "Hace 2 horas" },
                    { workflow: "Backup Automático", status: "success", duration: "45.2s", time: "Hace 6 horas" },
                    { workflow: "Procesamiento de Pedidos", status: "error", duration: "5.1s", time: "Hace 1 día" },
                  ].map((execution, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            execution.status === "success" ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></div>
                        <div>
                          <p className="text-sm font-medium">{execution.workflow}</p>
                          <p className="text-xs text-muted-foreground">Duración: {execution.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={execution.status === "success" ? "default" : "destructive"}>
                          {execution.status === "success" ? "Éxito" : "Error"}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{execution.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "E-commerce Básico",
                  description: "Pedido → Email → Actualizar Stock",
                  category: "E-commerce",
                  steps: 3,
                  icon: "🛒",
                },
                {
                  name: "Gestión de Leads",
                  description: "Lead → Asignar → Seguimiento",
                  category: "Ventas",
                  steps: 4,
                  icon: "🎯",
                },
                {
                  name: "Soporte al Cliente",
                  description: "Ticket → Asignar → Resolver",
                  category: "Soporte",
                  steps: 5,
                  icon: "🎧",
                },
                {
                  name: "Onboarding",
                  description: "Registro → Bienvenida → Configuración",
                  category: "RRHH",
                  steps: 6,
                  icon: "👋",
                },
                {
                  name: "Facturación",
                  description: "Venta → Factura → Pago → Contabilidad",
                  category: "Finanzas",
                  steps: 4,
                  icon: "💰",
                },
                {
                  name: "Marketing",
                  description: "Evento → Segmentar → Campaña",
                  category: "Marketing",
                  steps: 3,
                  icon: "📢",
                },
              ].map((template, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{template.icon}</div>
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>{template.category}</span>
                      <span>{template.steps} pasos</span>
                    </div>
                    <Button size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Usar Plantilla
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
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
