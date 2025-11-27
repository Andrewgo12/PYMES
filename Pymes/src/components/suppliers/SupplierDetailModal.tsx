import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { type Supplier } from '@/store/suppliersStore'
import { Building2, User, Mail, Phone, MapPin, FileText } from 'lucide-react'

interface SupplierDetailModalProps {
  isOpen: boolean
  onClose: () => void
  supplier: Supplier | null
}

export function SupplierDetailModal({ isOpen, onClose, supplier }: SupplierDetailModalProps) {
  if (!supplier) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalles del Proveedor`}
      footer={
        <Button onClick={onClose}>Cerrar</Button>
      }
    >
      <div className="space-y-6">
        {/* Información Principal */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Building2 className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Empresa</p>
              <p className="font-semibold text-lg">{supplier.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Persona de Contacto</p>
              <p className="font-medium">{supplier.contactName}</p>
            </div>
          </div>
        </div>

        {/* Información de Contacto */}
        <div className="border-t border-border pt-4 space-y-3">
          <h3 className="font-semibold text-sm">Información de Contacto</h3>
          
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <a href={`mailto:${supplier.email}`} className="text-sm hover:underline">
                {supplier.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Teléfono</p>
              <a href={`tel:${supplier.phone}`} className="text-sm hover:underline">
                {supplier.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Ubicación */}
        {(supplier.address || supplier.city || supplier.country) && (
          <div className="border-t border-border pt-4 space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Ubicación
            </h3>
            
            {supplier.address && (
              <p className="text-sm">{supplier.address}</p>
            )}
            {(supplier.city || supplier.country) && (
              <p className="text-sm text-muted-foreground">
                {[supplier.city, supplier.country].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
        )}

        {/* Notas */}
        {supplier.notes && (
          <div className="border-t border-border pt-4 space-y-2">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notas
            </h3>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              {supplier.notes}
            </p>
          </div>
        )}
      </div>
    </Modal>
  )
}
