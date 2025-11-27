import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { type Purchase } from '@/store/purchasesStore'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Building2, Calendar, FileText, Package } from 'lucide-react'

interface PurchaseDetailModalProps {
  isOpen: boolean
  onClose: () => void
  purchase: Purchase | null
}

export function PurchaseDetailModal({ isOpen, onClose, purchase }: PurchaseDetailModalProps) {
  if (!purchase) return null

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'received':
        return <Badge variant="success">Recibido</Badge>
      case 'pending':
        return <Badge variant="warning">Pendiente</Badge>
      case 'cancelled':
        return <Badge variant="error">Cancelado</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Orden de Compra #${purchase.id.slice(0, 8)}`}
      footer={
        <Button onClick={onClose}>Cerrar</Button>
      }
    >
      <div className="space-y-6">
        {/* Información General */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Proveedor:</span>
              <span>{purchase.supplierName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Estado:</span>
              {getStatusBadge(purchase.status)}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Creado:</span>
              <span>{format(new Date(purchase.createdAt), 'dd MMM yyyy', { locale: es })}</span>
            </div>
            {purchase.receivedAt && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-success" />
                <span className="font-medium">Recibido:</span>
                <span>{format(new Date(purchase.receivedAt), 'dd MMM yyyy', { locale: es })}</span>
              </div>
            )}
          </div>
        </div>

        {/* Productos */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Productos Solicitados</h3>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left">Producto</th>
                  <th className="px-4 py-3 text-left">SKU</th>
                  <th className="px-4 py-3 text-center">Cant.</th>
                  <th className="px-4 py-3 text-right">Costo Unit.</th>
                  <th className="px-4 py-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {purchase.items.map((item, index) => (
                  <tr key={index} className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{item.productName}</td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{item.productSku}</td>
                    <td className="px-4 py-3 text-center">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(item.unitCost)}</td>
                    <td className="px-4 py-3 text-right font-bold">{formatCurrency(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-muted">
                <tr>
                  <td colSpan={4} className="px-4 py-4 text-right font-bold text-lg">TOTAL:</td>
                  <td className="px-4 py-4 text-right font-bold text-lg text-primary">
                    {formatCurrency(purchase.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Notas */}
        {purchase.notes && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Notas:</span>
            </div>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              {purchase.notes}
            </p>
          </div>
        )}
      </div>
    </Modal>
  )
}
