"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Users, Search, MoreHorizontal, Shield, Edit, UserPlus, Activity, CheckCircle, XCircle } from "lucide-react"

interface UsersModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UsersModal({ isOpen, onClose }: UsersModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)

  // Datos simulados de usuarios
  const users = [
    {
      id: 1,
      name: "Ana García",
      email: "ana.garcia@empresa.com",
      role: "admin",
      status: "active",
      lastLogin: "Hace 2 horas",
      permissions: ["read", "write", "delete", "admin"],
      department: "IT",
      phone: "+34 600 123 456",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Carlos López",
      email: "carlos.lopez@empresa.com",
      role: "manager",
      status: "active",
      lastLogin: "Hace 1 día",
      permissions: ["read", "write"],
      department: "Ventas",
      phone: "+34 600 789 012",
      createdAt: "2024-02-20",
    },
    {
      id: 3,
      name: "María Rodríguez",
      email: "maria.rodriguez@empresa.com",
      role: "user",
      status: "inactive",
      lastLogin: "Hace 1 semana",
      permissions: ["read"],
      department: "Marketing",
      phone: "+34 600 345 678",
      createdAt: "2024-03-10",
    },
  ]

  const roles = [
    { id: "admin", name: "Administrador", color: "bg-red-500/10 text-red-500 border-red-500/20" },
    { id: "manager", name: "Gerente", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    { id: "user", name: "Usuario", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  ]

  const getRoleColor = (role: string) => {
    const roleObj = roles.find((r) => r.id === role)
    return roleObj?.color || "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }

  const getStatusIcon = (status: string) => {
    return status === "active" ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    )
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gestión de Usuarios
          </DialogTitle>
          <DialogDescription>Control de acceso granular, roles y permisos del sistema</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="permissions">Permisos</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            {/* Controles de usuarios */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Nuevo Usuario
              </Button>
            </div>

            {/* Lista de usuarios */}
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="cursor-pointer hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{user.name}</h4>
                            {getStatusIcon(user.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={getRoleColor(user.role)}>
                              {roles.find((r) => r.id === user.role)?.name}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{user.department}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right text-sm">
                          <p className="text-muted-foreground">Último acceso</p>
                          <p className="font-medium">{user.lastLogin}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <div className="grid gap-4">
              {roles.map((role) => (
                <Card key={role.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          {role.name}
                        </CardTitle>
                        <CardDescription>Configuración de permisos para {role.name.toLowerCase()}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${role.id}-read`}>Lectura</Label>
                        <Switch id={`${role.id}-read`} defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${role.id}-write`}>Escritura</Label>
                        <Switch id={`${role.id}-write`} defaultChecked={role.id !== "user"} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${role.id}-delete`}>Eliminación</Label>
                        <Switch id={`${role.id}-delete`} defaultChecked={role.id === "admin"} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${role.id}-admin`}>Administración</Label>
                        <Switch id={`${role.id}-admin`} defaultChecked={role.id === "admin"} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Matriz de Permisos</CardTitle>
                <CardDescription>Control granular de acceso por módulo y funcionalidad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Dashboard", "Productos", "Inventario", "Reportes", "Configuración"].map((module) => (
                    <div key={module} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">{module}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center justify-between">
                          <Label>Ver</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Crear</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Editar</Label>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Eliminar</Label>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Registro de Auditoría
                </CardTitle>
                <CardDescription>Historial completo de acciones de usuarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { user: "Ana García", action: "Creó usuario", target: "Carlos López", time: "Hace 2 horas" },
                    {
                      user: "Carlos López",
                      action: "Modificó permisos",
                      target: "María Rodríguez",
                      time: "Hace 4 horas",
                    },
                    { user: "Ana García", action: "Desactivó usuario", target: "Juan Pérez", time: "Hace 1 día" },
                    {
                      user: "María Rodríguez",
                      action: "Cambió contraseña",
                      target: "Propia cuenta",
                      time: "Hace 2 días",
                    },
                  ].map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            <span className="text-primary">{log.user}</span> {log.action}
                          </p>
                          <p className="text-xs text-muted-foreground">Objetivo: {log.target}</p>
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
