import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { useSuppliersStore, type Supplier } from '@/store/suppliersStore'
import { useToastStore } from '@/store/toastStore'
import { Building2 } from 'lucide-react'

interface SupplierModalProps {
  isOpen: boolean
  onClose: () => void
  supplier?: Supplier | null
}

export function SupplierModal({ isOpen, onClose, supplier }: SupplierModalProps) {
  const { addSupplier, updateSupplier } = useSuppliersStore()
  const { addToast } = useToastStore()

  const [name, setName] = useState('')
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (isOpen) {
      if (supplier) {
        setName(supplier.name)
        setContactName(supplier.contactName)
        setEmail(supplier.email)
        setPhone(supplier.phone)
        setAddress(supplier.address || '')
        setCity(supplier.city || '')
        setCountry(supplier.country || '')
        setNotes(supplier.notes || '')
      } else {
        setName('')
        setContactName('')
        setEmail('')
        setPhone('')
        setAddress('')
        setCity('')
        setCountry('')
        setNotes('')
      }
    }
  }, [isOpen, supplier])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !contactName.trim() || !email.trim() || !phone.trim()) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Por favor completa todos los campos obligatorios'
      })
      return
    }

    const supplierData = {
      name: name.trim(),
      contactName: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim() || undefined,
      city: city.trim() || undefined,
      country: country.trim() || undefined,
      notes: notes.trim() || undefined,
    }

    if (supplier) {
      updateSupplier(supplier.id, supplierData)
      addToast({
        type: 'success',
        title: 'Proveedor actualizado',
        message: `${name} ha sido actualizado correctamente.`
      })
    } else {
      addSupplier(supplierData)
      addToast({
        type: 'success',
        title: 'Proveedor creado',
        message: `${name} ha sido agregado correctamente.`
      })
    }

    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={supplier ? 'Editar Proveedor' : 'Nuevo Proveedor'}
      footer={
        <>
          <Button variant="outline" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} type="submit" form="supplier-form">
            <Building2 className="mr-2 h-4 w-4" />
            {supplier ? 'Actualizar' : 'Crear'} Proveedor
          </Button>
        </>
      }
    >
      <form id="supplier-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Nombre de la Empresa *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tech Distributors Inc."
            required
          />
          <Input
            label="Persona de Contacto *"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="John Smith"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Email *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contacto@empresa.com"
            required
          />
          <Input
            label="Teléfono *"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+34 912 345 678"
            required
          />
        </div>

        <Input
          label="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Calle Principal 123"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Madrid"
          />
          <Input
            label="País"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="España"
          />
        </div>

        <Textarea
          label="Notas"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Información adicional sobre el proveedor..."
          rows={3}
        />
      </form>
    </Modal>
  )
}
