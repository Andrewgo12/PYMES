import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { type Product } from '@/store/productsStore'

interface StockAdjustmentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (productId: string, adjustment: number, reason?: string) => void
  products: Product[]
  initialProductId?: string
}

export function StockAdjustmentModal({ 
  isOpen, 
  onClose, 
  onConfirm,
  products,
  initialProductId
}: StockAdjustmentModalProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>('')
  const [adjustment, setAdjustment] = useState<string>('')
  const [type, setType] = useState<'add' | 'remove'>('add')
  const [reason, setReason] = useState<string>('')

  useEffect(() => {
    if (isOpen) {
      setAdjustment('')
      setType('add')
      setReason('')
      if (initialProductId) {
        setSelectedProductId(initialProductId)
      } else {
        setSelectedProductId('')
      }
    }
  }, [isOpen, initialProductId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProductId || !adjustment) return

    const value = Number(adjustment)
    const finalAdjustment = type === 'add' ? value : -value
    
    onConfirm(selectedProductId, finalAdjustment, reason || undefined)
    onClose()
    setAdjustment('')
    setSelectedProductId('')
    setReason('')
  }

  const productOptions = products.map(p => ({
    value: p.id,
    label: `${p.name} (Stock: ${p.stock})`
  }))

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ajuste Rápido de Stock"
      footer={
        <>
          <Button variant="outline" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} type="submit" form="stock-form">
            Confirmar Ajuste
          </Button>
        </>
      }
    >
      <form id="stock-form" onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Producto"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          options={[{ value: '', label: 'Seleccionar producto...' }, ...productOptions]}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Tipo de Movimiento"
            value={type}
            onChange={(e) => setType(e.target.value as 'add' | 'remove')}
            options={[
              { value: 'add', label: 'Entrada (+)' },
              { value: 'remove', label: 'Salida (-)' }
            ]}
          />
          <Input
            label="Cantidad"
            type="number"
            min="1"
            value={adjustment}
            onChange={(e) => setAdjustment(e.target.value)}
            required
            placeholder="0"
          />
        </div>
        
        <Textarea
          label="Motivo (opcional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Describe el motivo del ajuste..."
          rows={3}
        />
      </form>
    </Modal>
  )
}
