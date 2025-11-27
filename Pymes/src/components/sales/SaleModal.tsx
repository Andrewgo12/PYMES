import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { useProductsStore } from '@/store/productsStore'
import { useSalesStore, type SaleItem } from '@/store/salesStore'
import { useAuthStore } from '@/store/authStore'
import { useToastStore } from '@/store/toastStore'
import { formatCurrency } from '@/lib/utils'
import { Plus, Trash2, ShoppingCart } from 'lucide-react'

interface SaleModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SaleModal({ isOpen, onClose }: SaleModalProps) {
  const { products, adjustStock } = useProductsStore()
  const { addSale } = useSalesStore()
  const { user } = useAuthStore()
  const { addToast } = useToastStore()

  const [items, setItems] = useState<SaleItem[]>([])
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'tarjeta' | 'transferencia'>('efectivo')
  const [notes, setNotes] = useState('')

  // Estado para agregar nuevo item
  const [selectedProductId, setSelectedProductId] = useState('')
  const [quantity, setQuantity] = useState('1')

  useEffect(() => {
    if (isOpen) {
      // Reset form
      setItems([])
      setClientName('')
      setClientEmail('')
      setPaymentMethod('efectivo')
      setNotes('')
      setSelectedProductId('')
      setQuantity('1')
    }
  }, [isOpen])

  const addItem = () => {
    if (!selectedProductId || !quantity) return

    const product = products.find(p => p.id === selectedProductId)
    if (!product) return

    const qty = Number(quantity)
    if (qty <= 0) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'La cantidad debe ser mayor a 0'
      })
      return
    }

    if (qty > product.stock) {
      addToast({
        type: 'error',
        title: 'Stock insuficiente',
        message: `Solo hay ${product.stock} unidades disponibles de ${product.name}`
      })
      return
    }

    // Verificar si el producto ya está en la lista
    const existingItemIndex = items.findIndex(item => item.productId === selectedProductId)
    
    if (existingItemIndex >= 0) {
      // Actualizar cantidad del item existente
      const newItems = [...items]
      const newQty = newItems[existingItemIndex].quantity + qty
      
      if (newQty > product.stock) {
        addToast({
          type: 'error',
          title: 'Stock insuficiente',
          message: `Solo hay ${product.stock} unidades disponibles`
        })
        return
      }
      
      newItems[existingItemIndex].quantity = newQty
      newItems[existingItemIndex].subtotal = newQty * product.price
      setItems(newItems)
    } else {
      // Agregar nuevo item
      const newItem: SaleItem = {
        productId: product.id,
        productName: product.name,
        productSku: product.sku,
        quantity: qty,
        unitPrice: product.price,
        subtotal: qty * product.price
      }
      setItems([...items, newItem])
    }

    setSelectedProductId('')
    setQuantity('1')
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.subtotal, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Debes agregar al menos un producto a la venta'
      })
      return
    }

    // Verificar stock disponible para todos los items
    for (const item of items) {
      const product = products.find(p => p.id === item.productId)
      if (!product || product.stock < item.quantity) {
        addToast({
          type: 'error',
          title: 'Stock insuficiente',
          message: `No hay suficiente stock de ${item.productName}`
        })
        return
      }
    }

    // Crear la venta
    const saleId = addSale({
      items,
      total: calculateTotal(),
      clientName: clientName.trim() || undefined,
      clientEmail: clientEmail.trim() || undefined,
      paymentMethod,
      notes: notes.trim() || undefined,
      userId: user?.id,
      userName: user?.name
    })

    // Reducir stock de cada producto
    items.forEach(item => {
      adjustStock(item.productId, -item.quantity, `Venta #${saleId.slice(0, 8)}`)
    })

    addToast({
      type: 'success',
      title: 'Venta registrada',
      message: `Venta por ${formatCurrency(calculateTotal())} registrada exitosamente`
    })

    onClose()
  }

  const availableProducts = products.filter(p => p.stock > 0)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nueva Venta"
      footer={
        <>
          <Button variant="outline" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} type="submit" form="sale-form">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Registrar Venta
          </Button>
        </>
      }
    >
      <form id="sale-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Información del Cliente */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm">Información del Cliente (Opcional)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Nombre del Cliente"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Juan Pérez"
            />
            <Input
              label="Email"
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="cliente@ejemplo.com"
            />
          </div>
        </div>

        {/* Agregar Productos */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm">Productos</h3>
          <div className="grid md:grid-cols-12 gap-2">
            <div className="md:col-span-7">
              <Select
                label="Producto"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                options={[
                  { value: '', label: 'Seleccionar producto...' },
                  ...availableProducts.map(p => ({
                    value: p.id,
                    label: `${p.name} - ${formatCurrency(p.price)} (Stock: ${p.stock})`
                  }))
                ]}
              />
            </div>
            <div className="md:col-span-3">
              <Input
                label="Cantidad"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="md:col-span-2 flex items-end">
              <Button
                type="button"
                onClick={addItem}
                className="w-full"
                disabled={!selectedProductId}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Lista de Items */}
          {items.length > 0 && (
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-3 py-2 text-left">Producto</th>
                    <th className="px-3 py-2 text-center">Cant.</th>
                    <th className="px-3 py-2 text-right">Precio</th>
                    <th className="px-3 py-2 text-right">Subtotal</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2">{item.productName}</td>
                      <td className="px-3 py-2 text-center">{item.quantity}</td>
                      <td className="px-3 py-2 text-right">{formatCurrency(item.unitPrice)}</td>
                      <td className="px-3 py-2 text-right font-bold">{formatCurrency(item.subtotal)}</td>
                      <td className="px-3 py-2 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-error"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-muted font-bold">
                  <tr>
                    <td colSpan={3} className="px-3 py-3 text-right">TOTAL:</td>
                    <td className="px-3 py-3 text-right text-lg">{formatCurrency(calculateTotal())}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* Método de Pago y Notas */}
        <div className="grid md:grid-cols-2 gap-4">
          <Select
            label="Método de Pago"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as any)}
            options={[
              { value: 'efectivo', label: 'Efectivo' },
              { value: 'tarjeta', label: 'Tarjeta' },
              { value: 'transferencia', label: 'Transferencia' }
            ]}
            required
          />
          <Textarea
            label="Notas (Opcional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Observaciones adicionales..."
            rows={3}
          />
        </div>
      </form>
    </Modal>
  )
}
