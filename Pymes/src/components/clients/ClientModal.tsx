import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { useClientsStore, type Client } from '@/store/clientsStore'
import { useToastStore } from '@/store/toastStore'
import { Users } from 'lucide-react'

interface ClientModalProps {
  isOpen: boolean
  onClose: () => void
  client?: Client | null
}

export function ClientModal({ isOpen, onClose, client }: ClientModalProps) {
  const { addClient, updateClient } = useClientsStore()
  const { addToast } = useToastStore()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [taxId, setTaxId] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (isOpen) {
      if (client) {
        setName(client.name)
        setEmail(client.email || '')
        setPhone(client.phone || '')
        setAddress(client.address || '')
        setCity(client.city || '')
        setCountry(client.country || '')
        setTaxId(client.taxId || '')
        setNotes(client.notes || '')
      } else {
        setName('')
        setEmail('')
        setPhone('')
        setAddress('')
        setCity('')
        setCountry('')
        setTaxId('')
        setNotes('')
      }
    }
  }, [isOpen, client])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'El nombre del cliente es obligatorio'
      })
      return
    }

    const clientData = {
      name: name.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
      city: city.trim() || undefined,
      country: country.trim() || undefined,
      taxId: taxId.trim() || undefined,
      notes: notes.trim() || undefined,
    }

    if (client) {
      updateClient(client.id, clientData)
      addToast({
        type: 'success',
        title: 'Cliente actualizado',
        message: `${name} ha sido actualizado correctamente.`
      })
    } else {
      addClient(clientData)
      addToast({
        type: 'success',
        title: 'Cliente creado',
        message: `${name} ha sido agregado correctamente.`
      })
    }

    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={client ? 'Editar Cliente' : 'Nuevo Cliente'}
      footer={
        <>
          <Button variant="outline" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} type="submit" form="client-form">
            <Users className="mr-2 h-4 w-4" />
            {client ? 'Actualizar' : 'Crear'} Cliente
          </Button>
        </>
      }
    >
      <form id="client-form" onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre Completo *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Juan Pérez"
          required
        />

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="cliente@email.com"
          />
          <Input
            label="Teléfono"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+34 600 123 456"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Tax ID / DNI / CIF"
            value={taxId}
            onChange={(e) => setTaxId(e.target.value)}
            placeholder="12345678A"
          />
          <Input
            label="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Calle Principal 123"
          />
        </div>

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
          placeholder="Información adicional sobre el cliente..."
          rows={3}
        />
      </form>
    </Modal>
  )
}
