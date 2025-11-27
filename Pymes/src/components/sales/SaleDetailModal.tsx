import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { type Sale } from '@/store/salesStore'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { User, Mail, CreditCard, FileText, Package } from 'lucide-react'

interface SaleDetailModalProps {
  isOpen: boolean
  onClose: () => void
  sale: Sale | null
}

export function SaleDetailModal({ isOpen, onClose, sale }: SaleDetailModalProps) {
  if (!sale) return null

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'efectivo':
        return 'Efectivo'
      case 'tarjeta':
        return 'Tarjeta'
      case 'transferencia':
        return 'Transferencia'
      default:
        return method
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalle de Venta #${sale.id.slice(0, 8)}`}
      footer={
        <Button onClick={onClose}>Cerrar</Button>
      }
    >
      <div className="space-y-6">
        {/* Información General */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Cliente:</span>
              <span>{sale.clientName || <span className="italic text-muted-foreground">No especificado</span>}</span>
            </div>
            {sale.clientEmail && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <span>{sale.clientEmail}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Método de Pago:</span>
              <Badge variant={sale.paymentMethod === 'efectivo' ? 'success' : 'secondary'}>
                {getPaymentMethodLabel(sale.paymentMethod)}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm">
              <span className="font-medium">Fecha:</span>
              <p className="text-muted-foreground">
                {format(new Date(sale.createdAt), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}
              </p>
            </div>
            {sale.userName && (
              <div className="text-sm">
                <span className="font-medium">Vendedor:</span>
                <p className="text-muted-foreground">{sale.userName}</p>
              </div>
            )}
          </div>
        </div>

        {/* Productos */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Productos</h3>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left">Producto</th>
                  <th className="px-4 py-3 text-left">SKU</th>
                  <th className="px-4 py-3 text-center">Cantidad</th>
                  <th className="px-4 py-3 text-right">Precio Unit.</th>
                  <th className="px-4 py-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sale.items.map((item, index) => (
                  <tr key={index} className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{item.productName}</td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{item.productSku}</td>
                    <td className="px-4 py-3 text-center">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(item.unitPrice)}</td>
                    <td className="px-4 py-3 text-right font-bold">{formatCurrency(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-muted">
                <tr>
                  <td colSpan={4} className="px-4 py-4 text-right font-bold text-lg">TOTAL:</td>
                  <td className="px-4 py-4 text-right font-bold text-lg text-primary">
                    {formatCurrency(sale.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Notas */}
        {sale.notes && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Notas:</span>
            </div>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              {sale.notes}
            </p>
          </div>
        )}
      </div>
    </Modal>
  )
}
