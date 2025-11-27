import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { type Client } from '@/store/clientsStore'
import { User, Mail, Phone, MapPin, FileText, CreditCard } from 'lucide-react'

interface ClientDetailModalProps {
  isOpen: boolean
  onClose: () => void
  client: Client | null
}

export function ClientDetailModal({ isOpen, onClose, client }: ClientDetailModalProps) {
  if (!client) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalles del Cliente`}
      footer={
        <Button onClick={onClose}>Cerrar</Button>
      }
    >
      <div className="space-y-6">
        {/* Información Principal */}
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Nombre</p>
            <p className="font-semibold text-lg">{client.name}</p>
          </div>
        </div>

        {/* Información de Contacto */}
        {(client.email || client.phone) && (
          <div className="border-t border-border pt-4 space-y-3">
            <h3 className="font-semibold text-sm">Información de Contacto</h3>
            
            {client.email && (
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${client.email}`} className="text-sm hover:underline">
                    {client.email}
                  </a>
                </div>
              </div>
            )}

            {client.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <a href={`tel:${client.phone}`} className="text-sm hover:underline">
                    {client.phone}
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Información Fiscal y Ubicación */}
        {(client.taxId || client.address || client.city || client.country) && (
          <div className="border-t border-border pt-4 space-y-3">
            <h3 className="font-semibold text-sm">Datos Adicionales</h3>

            {client.taxId && (
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Tax ID / DNI</p>
                  <p className="text-sm font-mono">{client.taxId}</p>
                </div>
              </div>
            )}
            
            {(client.address || client.city || client.country) && (
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                  {client.address && <p className="text-sm">{client.address}</p>}
                  {(client.city || client.country) && (
                    <p className="text-sm text-muted-foreground">
                      {[client.city, client.country].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Notas */}
        {client.notes && (
          <div className="border-t border-border pt-4 space-y-2">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notas
            </h3>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              {client.notes}
            </p>
          </div>
        )}
      </div>
    </Modal>
  )
}
