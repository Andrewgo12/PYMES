"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Plug,
  Plus,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Mail,
  CreditCard,
  Truck,
  BarChart3,
} from "lucide-react"

interface IntegrationsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function IntegrationsModal({ isOpen, onClose }: IntegrationsModalProps) {
  const [integrations] = useState([
    {
      id: "stripe",
      name: "Stripe",
      description: "Procesamiento de pagos",
      icon: CreditCard,
      status: "connected",
      category: "payments",
      lastSync: "Hace 5 min",
      config: { apiKey: "sk_test_***", webhookUrl: "https://api.empresa.com/webhooks/stripe" },
    },
    {
      id: "sendgrid",
      name: "SendGrid",
      description: "Envío de emails",
      icon: Mail,
      status: "connected",
      category: "communication",
      lastSync: "Hace 1 hora",
      config: { apiKey: "SG.***", fromEmail: "noreply@empresa.com" },
    },
    {
      id: "fedex",
      name: "FedEx",
      description: "Gestión de envíos",
      icon: Truck,
      status: "error",
      category: "logistics",
      lastSync: "Hace 2 días",
      config: { accountNumber: "123456789", meterNumber: "987654321" },
    },
    {
      id: "analytics",
      name: "Google Analytics",
      description: "Análisis web",
      icon: BarChart3,
      status: "warning",
      category: "analytics",
      lastSync: "Hace 30 min",
      config: { trackingId: "GA-***", propertyId: "123456789" },
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "warning":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "error":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "error":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const categories = [
    { id: "all", name: "Todas", count: integrations.length },
    { id: "payments", name: "Pagos", count: integrations.filter((i) => i.category === "payments").length },
    {
      id: "communication",
      name: "Comunicación",
      count: integrations.filter((i) => i.category === "communication").length,
    },
    { id: "logistics", name: "Logística", count: integrations.filter((i) => i.category === "logistics").length },
    { id: "analytics", name: "Analytics", count: integrations.filter((i) => i.category === "analytics").length },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5" />
            Gestión de Integraciones
          </DialogTitle>
          <DialogDescription>APIs y servicios externos conectados al sistema</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">Activas</TabsTrigger>
            <TabsTrigger value="available">Disponibles</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Badge key={category.id} variant="outline" className="cursor-pointer">
                    {category.name} ({category.count})
                  </Badge>
                ))}
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Integración
              </Button>
            </div>

            <div className="grid gap-4">
              {integrations.map((integration) => {
                const IconComponent = integration.icon
                return (
                  <Card key={integration.id} className="hover:shadow-md transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{integration.name}</h4>
                              <Badge variant="outline" className={getStatusColor(integration.status)}>
                                {getStatusIcon(integration.status)}
                                <span className="ml-1 capitalize">{integration.status}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{integration.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Última sincronización: {integration.lastSync}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch defaultChecked={integration.status === "connected"} />
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Shopify", description: "E-commerce", icon: "🛍️" },
                { name: "Slack", description: "Comunicación", icon: "💬" },
                { name: "Zapier", description: "Automatización", icon: "⚡" },
                { name: "QuickBooks", description: "Contabilidad", icon: "📊" },
                { name: "Mailchimp", description: "Email Marketing", icon: "📧" },
                { name: "Twilio", description: "SMS/Llamadas", icon: "📱" },
              ].map((service, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{service.icon}</div>
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <Button size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Conectar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Configuración de Webhooks</CardTitle>
                    <CardDescription>Endpoints para recibir notificaciones de servicios externos</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Webhook
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      service: "Stripe",
                      url: "/webhooks/stripe",
                      events: ["payment.succeeded", "payment.failed"],
                      status: "active",
                    },
                    {
                      service: "SendGrid",
                      url: "/webhooks/sendgrid",
                      events: ["delivered", "bounced"],
                      status: "active",
                    },
                    { service: "FedEx", url: "/webhooks/fedex", events: ["shipment.delivered"], status: "inactive" },
                  ].map((webhook, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{webhook.service}</h4>
                          <Badge variant={webhook.status === "active" ? "default" : "secondary"}>
                            {webhook.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{webhook.url}</p>
                        <p className="text-xs text-muted-foreground">Eventos: {webhook.events.join(", ")}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked={webhook.status === "active"} />
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registro de Actividad</CardTitle>
                <CardDescription>Historial de sincronizaciones y errores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { service: "Stripe", action: "Pago procesado", status: "success", time: "Hace 5 min" },
                    { service: "SendGrid", action: "Email enviado", status: "success", time: "Hace 15 min" },
                    { service: "FedEx", action: "Error de conexión", status: "error", time: "Hace 2 horas" },
                    { service: "Analytics", action: "Datos sincronizados", status: "warning", time: "Hace 30 min" },
                  ].map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            log.status === "success"
                              ? "bg-green-500"
                              : log.status === "error"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                          }`}
                        ></div>
                        <div>
                          <p className="text-sm font-medium">
                            {log.service}: {log.action}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{log.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
