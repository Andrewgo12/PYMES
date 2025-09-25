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
import { Progress } from "@/components/ui/progress"
import {
  Database,
  Download,
  Upload,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  HardDrive,
  Cloud,
  Shield,
} from "lucide-react"

interface BackupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BackupModal({ isOpen, onClose }: BackupModalProps) {
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    frequency: "daily",
    retention: "30",
    compression: true,
    encryption: true,
    cloudStorage: true,
  })

  const backupHistory = [
    { id: 1, date: "2024-01-20 02:00", size: "2.4 GB", status: "completed", type: "auto", duration: "12 min" },
    { id: 2, date: "2024-01-19 02:00", size: "2.3 GB", status: "completed", type: "auto", duration: "11 min" },
    { id: 3, date: "2024-01-18 14:30", size: "2.3 GB", status: "completed", type: "manual", duration: "10 min" },
    { id: 4, date: "2024-01-18 02:00", size: "2.2 GB", status: "failed", type: "auto", duration: "5 min" },
    { id: 5, date: "2024-01-17 02:00", size: "2.2 GB", status: "completed", type: "auto", duration: "13 min" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "running":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "failed":
        return <AlertTriangle className="h-4 w-4" />
      case "running":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Backup y Restauración
          </DialogTitle>
          <DialogDescription>Copias de seguridad automáticas y restauración de datos</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="backups" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="schedule">Programación</TabsTrigger>
            <TabsTrigger value="restore">Restaurar</TabsTrigger>
            <TabsTrigger value="storage">Almacenamiento</TabsTrigger>
          </TabsList>

          <TabsContent value="backups" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Historial de Backups</h3>
                <p className="text-sm text-muted-foreground">Últimas copias de seguridad realizadas</p>
              </div>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Crear Backup Manual
              </Button>
            </div>

            <div className="grid gap-4">
              {backupHistory.map((backup) => (
                <Card key={backup.id} className="hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Database className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{backup.date}</h4>
                            <Badge variant="outline" className={getStatusColor(backup.status)}>
                              {getStatusIcon(backup.status)}
                              <span className="ml-1 capitalize">{backup.status}</span>
                            </Badge>
                            <Badge variant="outline">{backup.type === "auto" ? "Automático" : "Manual"}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>Tamaño: {backup.size}</span>
                            <span>Duración: {backup.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Descargar
                        </Button>
                        <Button variant="outline" size="sm">
                          Restaurar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Configuración Automática
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-backup">Backup Automático</Label>
                    <Switch
                      id="auto-backup"
                      checked={backupSettings.autoBackup}
                      onCheckedChange={(checked) => setBackupSettings({ ...backupSettings, autoBackup: checked })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frecuencia</Label>
                    <Select
                      value={backupSettings.frequency}
                      onValueChange={(value) => setBackupSettings({ ...backupSettings, frequency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Cada hora</SelectItem>
                        <SelectItem value="daily">Diario</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retention">Retención (días)</Label>
                    <Input
                      id="retention"
                      type="number"
                      value={backupSettings.retention}
                      onChange={(e) => setBackupSettings({ ...backupSettings, retention: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-time">Hora de Backup</Label>
                    <Input id="backup-time" type="time" defaultValue="02:00" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Opciones de Seguridad
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compression">Compresión</Label>
                      <p className="text-sm text-muted-foreground">Reduce el tamaño del backup</p>
                    </div>
                    <Switch
                      id="compression"
                      checked={backupSettings.compression}
                      onCheckedChange={(checked) => setBackupSettings({ ...backupSettings, compression: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="encryption">Encriptación</Label>
                      <p className="text-sm text-muted-foreground">Protege los datos con AES-256</p>
                    </div>
                    <Switch
                      id="encryption"
                      checked={backupSettings.encryption}
                      onCheckedChange={(checked) => setBackupSettings({ ...backupSettings, encryption: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="cloud-storage">Almacenamiento en la Nube</Label>
                      <p className="text-sm text-muted-foreground">Copia adicional en AWS S3</p>
                    </div>
                    <Switch
                      id="cloud-storage"
                      checked={backupSettings.cloudStorage}
                      onCheckedChange={(checked) => setBackupSettings({ ...backupSettings, cloudStorage: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="restore" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Restaurar desde Backup</CardTitle>
                <CardDescription>Selecciona un backup para restaurar el sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="restore-backup">Seleccionar Backup</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un backup..." />
                    </SelectTrigger>
                    <SelectContent>
                      {backupHistory
                        .filter((b) => b.status === "completed")
                        .map((backup) => (
                          <SelectItem key={backup.id} value={backup.id.toString()}>
                            {backup.date} - {backup.size}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Opciones de Restauración</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="restore-database" defaultChecked />
                      <Label htmlFor="restore-database">Base de datos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="restore-files" defaultChecked />
                      <Label htmlFor="restore-files">Archivos del sistema</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="restore-config" />
                      <Label htmlFor="restore-config">Configuración</Label>
                    </div>
                  </div>
                </div>
                <Button className="w-full" variant="destructive">
                  <Database className="h-4 w-4 mr-2" />
                  Iniciar Restauración
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4" />
                    Almacenamiento Local
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Espacio utilizado</span>
                        <span className="font-medium">45.2 GB / 100 GB</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>• 12 backups almacenados</p>
                      <p>• Retención: 30 días</p>
                      <p>• Compresión activa</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-4 w-4" />
                    Almacenamiento en la Nube
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>AWS S3 utilizado</span>
                        <span className="font-medium">28.7 GB / 500 GB</span>
                      </div>
                      <Progress value={6} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>• Sincronización automática</p>
                      <p>• Encriptación AES-256</p>
                      <p>• Redundancia geográfica</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button>Guardar Configuración</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
