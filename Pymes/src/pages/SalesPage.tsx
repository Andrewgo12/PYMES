import { useState } from 'react'
import { useProductsStore } from '@/store/productsStore'
import { useSalesStore } from '@/store/salesStore'
import { useClientsStore } from '@/store/clientsStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Search, ShoppingCart, Trash2, CreditCard } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export function SalesPage() {
    const { products, updateStock } = useProductsStore()
    const { addSale } = useSalesStore()
    const { clients } = useClientsStore()
    const { addToast } = useToast()

    const [searchTerm, setSearchTerm] = useState('')
    const [cart, setCart] = useState<{ productId: string; quantity: number; price: number; name: string }[]>([])
    const [selectedClientId, setSelectedClientId] = useState('')

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const addToCart = (product: any) => {
        if (product.stock <= 0) {
            addToast({ type: 'error', title: 'Error', message: 'Producto sin stock' })
            return
        }

        const existingItem = cart.find(item => item.productId === product.id)
        if (existingItem) {
            if (existingItem.quantity >= product.stock) {
                addToast({ type: 'error', title: 'Error', message: 'No hay suficiente stock' })
                return
            }
            setCart(cart.map(item =>
                item.productId === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ))
        } else {
            setCart([...cart, { productId: product.id, quantity: 1, price: product.price, name: product.name }])
        }
    }

    const removeFromCart = (productId: string) => {
        setCart(cart.filter(item => item.productId !== productId))
    }

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    const handleCheckout = () => {
        if (cart.length === 0) return

        const client = clients.find(c => c.id === selectedClientId)

        // Map cart items to SaleItem interface
        const saleItems = cart.map(item => {
            const product = products.find(p => p.id === item.productId)
            return {
                productId: item.productId,
                productName: item.name,
                productSku: product?.code || 'N/A',
                quantity: item.quantity,
                unitPrice: item.price,
                subtotal: item.price * item.quantity
            }
        })

        const saleData = {
            clientId: selectedClientId || undefined,
            clientName: client?.name || 'Cliente General',
            items: saleItems,
            total,
            paymentMethod: 'efectivo' as const, // Default to efectivo for now
            userId: '1', // Hardcoded for now, should come from auth
            userName: 'Admin'
        }

        addSale(saleData)

        // Update stock
        cart.forEach(item => {
            const product = products.find(p => p.id === item.productId)
            if (product) {
                updateStock(product.id, product.stock - item.quantity)
            }
        })

        setCart([])
        setSelectedClientId('')
        addToast({ type: 'success', title: 'Venta completada', message: 'La venta se ha registrado correctamente' })
    }

    return (
        <div className="h-full flex gap-4 animate-fade-in overflow-hidden">
            {/* Products Section */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Punto de Venta</h2>
                        <p className="text-xs text-muted-foreground">Selecciona productos para vender</p>
                    </div>
                    <div className="w-64">
                        <Input
                            placeholder="Buscar producto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon={<Search className="w-4 h-4" />}
                            className="h-9"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto pr-2 pb-2 content-start">
                    {filteredProducts.map((product) => (
                        <Card
                            key={product.id}
                            className="cursor-pointer hover:border-primary transition-colors flex flex-col"
                            onClick={() => addToCart(product)}
                        >
                            <CardContent className="p-3 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">
                                            {product.code}
                                        </span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${product.stock > 10 ? 'bg-green-100 text-green-700' :
                                            product.stock > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            Stock: {product.stock}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-sm line-clamp-2 mb-1">{product.name}</h3>
                                </div>
                                <div className="mt-2 text-lg font-bold text-primary">
                                    ${product.price.toLocaleString()}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Cart Section - Fixed width */}
            <Card className="w-80 flex flex-col h-full border-l-2 shadow-xl">
                <CardHeader className="pb-3 border-b bg-muted/20">
                    <CardTitle className="text-base flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Carrito de Venta
                    </CardTitle>
                </CardHeader>

                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-2 opacity-50">
                            <ShoppingCart className="w-12 h-12" />
                            <p className="text-sm">Carrito vacío</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.productId} className="flex items-center justify-between bg-muted/30 p-2 rounded-lg border border-border/50">
                                <div className="flex-1 min-w-0 mr-2">
                                    <p className="text-sm font-medium truncate">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {item.quantity} x ${item.price.toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="font-bold text-sm">
                                        ${(item.quantity * item.price).toLocaleString()}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-error hover:bg-error/10 hover:text-error"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeFromCart(item.productId)
                                        }}
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 bg-muted/20 border-t space-y-3">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span className="text-primary">${total.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="space-y-2 pt-2">
                        <select
                            className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            value={selectedClientId}
                            onChange={(e) => setSelectedClientId(e.target.value)}
                        >
                            <option value="">Cliente General</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>{client.name}</option>
                            ))}
                        </select>

                        <Button
                            className="w-full"
                            size="lg"
                            disabled={cart.length === 0}
                            onClick={handleCheckout}
                        >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Completar Venta
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
