import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { type Product } from '@/store/productsStore'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void
  initialData?: Product | null
  title: string
}

const CATEGORIES = [
  { value: 'electronica', label: 'Electrónica' },
  { value: 'ropa', label: 'Ropa' },
  { value: 'hogar', label: 'Hogar' },
  { value: 'deportes', label: 'Deportes' },
  { value: 'otros', label: 'Otros' }
]

export function ProductModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData, 
  title 
}: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'otros',
    price: '',
    stock: '',
    minStock: '',
    description: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        sku: initialData.sku,
        category: initialData.category,
        price: initialData.price.toString(),
        stock: initialData.stock.toString(),
        minStock: initialData.minStock.toString(),
        description: initialData.description || ''
      })
    } else {
      setFormData({
        name: '',
        sku: '',
        category: 'otros',
        price: '',
        stock: '',
        minStock: '5',
        description: ''
      })
    }
  }, [initialData, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      minStock: Number(formData.minStock),
      description: formData.description
    })
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="outline" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} type="submit" form="product-form">
            Guardar
          </Button>
        </>
      }
    >
      <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ej. Camiseta Básica"
          />
          <Input
            label="SKU"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
            placeholder="Ej. CAM-001"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Categoría"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={CATEGORIES}
          />
          <Input
            label="Precio"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="0.00"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Stock Inicial"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            required
            placeholder="0"
          />
          <Input
            label="Stock Mínimo"
            name="minStock"
            type="number"
            min="0"
            value={formData.minStock}
            onChange={handleChange}
            required
            placeholder="5"
          />
        </div>

        <Textarea
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Detalles adicionales del producto..."
        />
      </form>
    </Modal>
  )
}
