"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Zap, Search, Star, Clock } from "lucide-react"
import { useState } from "react"

interface DashboardQuickActionsModalProps {
  isOpen: boolean
  onClose: () => void
  actions: any[]
}

export function DashboardQuickActionsModal({ isOpen, onClose, actions }: DashboardQuickActionsModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  const recentActions = [
    "Crear producto iPhone 16",
    "Generar reporte de ventas",
    "Actualizar inventario almacén A",
    "Enviar notificación a clientes",
  ]

  const favoriteActions = ["Nuevo pedido express", "Backup de datos", "Sincronizar inventario", "Exportar reportes"]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Acciones Rápidas
          </DialogTitle>
          <DialogDescription>Ejecuta tareas comunes de forma rápida y eficiente</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Buscador de Acciones */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar acción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Acciones Principales */}
          <div className="grid gap-4 md:grid-cols-2">
            {actions.map((action) => (
              <Card
                key={action.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedAction === action.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedAction(action.id)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    {action.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button size="sm" className="w-full">
                    Ejecutar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Acciones Recientes */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Acciones Recientes
            </h3>
            <div className="space-y-2">
              {recentActions.map((action, index) => (
                <Button key={index} variant="ghost" className="w-full justify-start text-sm" size="sm">
                  {action}
                </Button>
              ))}
            </div>
          </div>

          {/* Acciones Favoritas */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Star className="h-4 w-4" />
              Favoritas
            </h3>
            <div className="grid gap-2 md:grid-cols-2">
              {favoriteActions.map((action, index) => (
                <Button key={index} variant="outline" className="justify-start text-sm bg-transparent" size="sm">
                  <Star className="h-3 w-3 mr-2 fill-yellow-400 text-yellow-400" />
                  {action}
                </Button>
              ))}
            </div>
          </div>

          {/* Formulario de Acción Personalizada */}
          {selectedAction && (
            <Card className="bg-muted/20">
              <CardHeader>
                <CardTitle className="text-sm">Configurar Acción</CardTitle>
                <CardDescription>Personaliza los parámetros de la acción</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="action-name">Nombre de la acción</Label>
                  <Input id="action-name" placeholder="Ej: Crear producto premium" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="action-description">Descripción</Label>
                  <Textarea id="action-description" placeholder="Describe qué hace esta acción..." rows={3} />
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Ejecutar Ahora</Button>
                  <Button variant="outline" size="sm">
                    Programar
                  </Button>
                  <Button variant="ghost" size="sm">
                    Guardar como Favorita
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
