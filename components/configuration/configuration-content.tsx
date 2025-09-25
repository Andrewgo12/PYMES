"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Settings,
  Plug,
  Database,
  Shield,
  Bell,
  Wrench,
  GitBranch,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Activity,
  Lock,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react"

// Importar modales
import { UsersModal } from "./modals/configuration-users-modal"
import { SystemModal } from "./modals/configuration-system-modal"
import { IntegrationsModal } from "./modals/configuration-integrations-modal"
import { BackupModal } from "./modals/configuration-backup-modal"
import { SecurityModal } from "./modals/configuration-security-modal"
import { NotificationsModal } from "./modals/configuration-notifications-modal"
import { CustomFieldsModal } from "./modals/configuration-custom-fields-modal"
import { WorkflowsModal } from "./modals/configuration-workflows-modal"

export function ConfigurationContent() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Datos simulados para configuración
  const configSections = [
    {
      id: "users",
      title: "Gestión de Usuarios",
      description: "Control de acceso granular y roles",
      icon: Users,
      status: "active",
      count: 24,
      lastUpdate: "Hace 2 horas",
    },
    {
      id: "system",
      title: "Configuración del Sistema",
      description: "Parámetros generales y preferencias",
      icon: Settings,
      status: "active",
      count: 12,
      lastUpdate: "Hace 1 día",
    },
    {
      id: "integrations",
      title: "Integraciones",
      description: "APIs y servicios externos",
      icon: Plug,
      status: "warning",
      count: 8,
      lastUpdate: "Hace 3 horas",
    },
    {
      id: "backup",
      title: "Backup y Restauración",
      description: "Copias de seguridad automáticas",
      icon: Database,
      status: "active",
      count: 5,
      lastUpdate: "Hace 6 horas",
    },
    {
      id: "security",
      title: "Seguridad",
      description: "Políticas y audit trail",
      icon: Shield,
      status: "active",
      count: 18,
      lastUpdate: "Hace 30 min",
    },
    {
      id: "notifications",
      title: "Notificaciones",
      description: "Alertas y comunicaciones",
      icon: Bell,
      status: "active",
      count: 32,
      lastUpdate: "Hace 1 hora",
    },
    {
      id: "custom-fields",
      title: "Campos Personalizados",
      description: "Campos custom y validaciones",
      icon: Wrench,
      status: "active",
      count: 15,
      lastUpdate: "Hace 2 días",
    },
    {
      id: "workflows",
      title: "Workflows Visuales",
      description: "Automatización y procesos",
      icon: GitBranch,
      status: "active",
      count: 7,
      lastUpdate: "Hace 4 horas",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
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
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "error":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredSections = configSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuración del Sistema</h1>
          <p className="text-muted-foreground">Control de acceso granular, audit trail y workflows visuales</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            Audit Trail
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Configuración
          </Button>
        </div>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar configuraciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Tabs de configuración */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="integrations">Integraciones</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Grid de secciones de configuración */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSections.map((section) => {
              const IconComponent = section.icon
              return (
                <Card
                  key={section.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 border-border/50 hover:border-border"
                  onClick={() => setActiveModal(section.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <Badge variant="outline" className={getStatusColor(section.status)}>
                          {getStatusIcon(section.status)}
                          <span className="ml-1 capitalize">{section.status}</span>
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{section.count} elementos</span>
                      <span className="text-muted-foreground">{section.lastUpdate}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSections
              .filter((section) => ["security", "users", "backup"].includes(section.id))
              .map((section) => {
                const IconComponent = section.icon
                return (
                  <Card
                    key={section.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200"
                    onClick={() => setActiveModal(section.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{section.title}</CardTitle>
                          <CardDescription>{section.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                          <Lock className="h-3 w-3 mr-1" />
                          Crítico
                        </Badge>
                        <span className="text-sm text-muted-foreground">{section.lastUpdate}</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSections
              .filter((section) => ["integrations", "notifications"].includes(section.id))
              .map((section) => {
                const IconComponent = section.icon
                return (
                  <Card
                    key={section.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200"
                    onClick={() => setActiveModal(section.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{section.title}</CardTitle>
                          <CardDescription>{section.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{section.count} configuradas</span>
                        <span className="text-sm text-muted-foreground">{section.lastUpdate}</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSections
              .filter((section) => ["workflows", "custom-fields"].includes(section.id))
              .map((section) => {
                const IconComponent = section.icon
                return (
                  <Card
                    key={section.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200"
                    onClick={() => setActiveModal(section.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{section.title}</CardTitle>
                          <CardDescription>{section.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                          Automatización
                        </Badge>
                        <span className="text-sm text-muted-foreground">{section.lastUpdate}</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modales */}
      <UsersModal isOpen={activeModal === "users"} onClose={() => setActiveModal(null)} />
      <SystemModal isOpen={activeModal === "system"} onClose={() => setActiveModal(null)} />
      <IntegrationsModal isOpen={activeModal === "integrations"} onClose={() => setActiveModal(null)} />
      <BackupModal isOpen={activeModal === "backup"} onClose={() => setActiveModal(null)} />
      <SecurityModal isOpen={activeModal === "security"} onClose={() => setActiveModal(null)} />
      <NotificationsModal isOpen={activeModal === "notifications"} onClose={() => setActiveModal(null)} />
      <CustomFieldsModal isOpen={activeModal === "custom-fields"} onClose={() => setActiveModal(null)} />
      <WorkflowsModal isOpen={activeModal === "workflows"} onClose={() => setActiveModal(null)} />
    </div>
  )
}
