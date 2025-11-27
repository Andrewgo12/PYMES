import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { useProductsStore } from '@/store/productsStore'
import { useSuppliersStore } from '@/store/suppliersStore'
import { usePurchasesStore, type PurchaseItem } from '@/store/purchasesStore'
import { useAuthStore } from '@/store/authStore'
import { useToastStore } from '@/store/toastStore'
import { formatCurrency } from '@/lib/utils'
import { Plus, Trash2, ShoppingBag } from 'lucide-react'

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PurchaseModal({ isOpen, onClose }: PurchaseModalProps) {
  const { products } = useProductsStore()
  const { suppliers } = useSuppliersStore()
  const { addPurchase } = usePurchasesStore()
  const { user } = useAuthStore()
  const { addToast } = useToastStore()

  const [items, setItems] = useState<PurchaseItem[]>([])
  const [supplierId, setSupplierId] = useState('')
  const [notes, setNotes] = useState('')

  // Estado para agregar nuevo item
  const [selectedProductId, setSelectedProductId] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [unitCost, setUnitCost] = useState('')

  useEffect(() => {
    if (isOpen) {
      // Reset form
      setItems([])
      setSupplierId('')
      setNotes('')
      setSelectedProductId('')
      setQuantity('1')
      setUnitCost('')
    }
  }, [isOpen])

  const addItem = () => {
    if (!selectedProductId || !quantity || !unitCost) return

    const product = products.find(p => p.id === selectedProductId)
    if (!product) return

    const qty = Number(quantity)
    const cost = Number(unitCost)

    if (qty <= 0 || cost < 0) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Cantidad y costo deben ser valores válidos'
      })
      return
    }

    // Verificar si el producto ya está en la lista
    const existingItemIndex = items.findIndex(item => item.productId === selectedProductId)
    
    if (existingItemIndex >= 0) {
      // Actualizar cantidad del item existente
      const newItems = [...items]
      newItems[existingItemIndex].quantity += qty
      newItems[existingItemIndex].subtotal = newItems[existingItemIndex].quantity * cost
      setItems(newItems)
    } else {
      // Agregar nuevo item
      const newItem: PurchaseItem = {
        productId: product.id,
        productName: product.name,
        productSku: product.sku,
        quantity: qty,
        unitCost: cost,
        subtotal: qty * cost
      }
      setItems([...items, newItem])
    }

    setSelectedProductId('')
    setQuantity('1')
    setUnitCost('')
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.subtotal, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!supplierId) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Debes seleccionar un proveedor'
      })
      return
    }

    if (items.length === 0) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Debes agregar al menos un producto a la orden'
      })
      return
    }

    const supplier = suppliers.find(s => s.id === supplierId)
    if (!supplier) return

    // Crear la compra
    addPurchase({
      supplierId,
      supplierName: supplier.name,
      items,
      total: calculateTotal(),
      notes: notes.trim() || undefined,
      userId: user?.id,
      userName: user?.name
    })

    addToast({
      type: 'success',
      title: 'Orden creada',
      message: `Orden de compra por ${formatCurrency(calculateTotal())} registrada exitosamente`
    })

    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nueva Orden de Compra"
      footer={
        <>
          <Button variant="outline" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} type="submit" form="purchase-form">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Crear Orden
          </Button>
        </>
      }
    >
      <form id="purchase-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Selección de Proveedor */}
        <div className="space-y-4">
          <Select
            label="Proveedor *"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            options={[
              { value: '', label: 'Seleccionar proveedor...' },
              ...suppliers.map(s => ({
                value: s.id,
                label: s.name
              }))
            ]}
            required
          />
        </div>

        {/* Agregar Productos */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm">Productos</h3>
          <div className="grid md:grid-cols-12 gap-2">
            <div className="md:col-span-5">
              <Select
                label="Producto"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                options={[
                  { value: '', label: 'Seleccionar producto...' },
                  ...products.map(p => ({
                    value: p.id,
                    label: p.name
                  }))
                ]}
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Cant."
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="md:col-span-3">
              <Input
                label="Costo Unit."
                type="number"
                min="0"
                step="0.01"
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="md:col-span-2 flex items-end">
              <Button
                type="button"
                onClick={addItem}
                className="w-full"
                disabled={!selectedProductId || !unitCost}
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
                    <th className="px-3 py-2 text-right">Costo</th>
                    <th className="px-3 py-2 text-right">Subtotal</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2">{item.productName}</td>
                      <td className="px-3 py-2 text-center">{item.quantity}</td>
                      <td className="px-3 py-2 text-right">{formatCurrency(item.unitCost)}</td>
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

        <Textarea
          label="Notas (Opcional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Observaciones adicionales..."
          rows={3}
        />
      </form>
    </Modal>
  )
}
