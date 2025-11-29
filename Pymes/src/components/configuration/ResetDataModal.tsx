import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, Database } from 'lucide-react'

interface ResetDataModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    isResetting: boolean
}

export function ResetDataModal({ isOpen, onClose, onConfirm, isResetting }: ResetDataModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Restaurar Datos Iniciales">
            <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-warning/10 border-2 border-warning/30 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-warning flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h4 className="font-semibold text-warning mb-2">¡Advertencia! Esta acción no se puede deshacer</h4>
                        <p className="text-sm text-muted-foreground">
                            Al confirmar, se eliminarán todos los cambios realizados y se restaurarán los datos a su estado inicial original.
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-sm font-medium">Los siguientes datos serán restaurados:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span><strong>Productos:</strong> 25 productos iniciales con stock original</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span><strong>Ventas:</strong> 15 ventas de ejemplo</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span><strong>Clientes:</strong> 8 clientes iniciales</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span><strong>Proveedores:</strong> 5 proveedores iniciales</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span><strong>Compras:</strong> 1 compra de ejemplo</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span><strong>Movimientos:</strong> Se limpiarán todos los movimientos</span>
                        </li>
                    </ul>
                </div>

                <div className="flex gap-3 pt-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isResetting}
                        className="flex-1"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onConfirm}
                        loading={isResetting}
                        className="flex-1"
                    >
                        <Database className="mr-2 h-4 w-4" />
                        Restaurar Datos
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
