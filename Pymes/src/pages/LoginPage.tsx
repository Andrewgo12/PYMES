import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { Lock, Mail, Package, TrendingUp, ShieldCheck, Zap } from 'lucide-react'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    const success = login(email, password)

    if (success) {
      navigate('/dashboard')
    } else {
      setError('Credenciales incorrectas')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-12 flex-col justify-between relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Logo and Title */}
        <div className="relative z-10 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-primary-foreground rounded-2xl flex items-center justify-center shadow-2xl">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground">PYMES</h1>
              <p className="text-primary-foreground/80 text-sm">Sistema de Inventario</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-primary-foreground mb-4 leading-tight">
            Gestiona tu negocio de forma inteligente
          </h2>
          <p className="text-primary-foreground/90 text-lg leading-relaxed">
            Controla tu inventario, ventas, compras y más desde una plataforma moderna y eficiente.
          </p>
        </div>

        {/* Features */}
        <div className="relative z-10 space-y-4 animate-fade-in-up">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-primary-foreground font-semibold mb-1">Análisis en tiempo real</h3>
              <p className="text-primary-foreground/80 text-sm">Toma decisiones informadas con datos actualizados</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-primary-foreground font-semibold mb-1">Seguro y confiable</h3>
              <p className="text-primary-foreground/80 text-sm">Tus datos protegidos con los más altos estándares</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-primary-foreground font-semibold mb-1">Rápido y eficiente</h3>
              <p className="text-primary-foreground/80 text-sm">Optimiza procesos y ahorra tiempo valioso</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-primary-foreground/60 text-sm">
          © 2024 PYMES. Sistema de gestión empresarial.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Package className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">PYMES</h1>
              <p className="text-muted-foreground text-sm">Sistema de Inventario</p>
            </div>
          </div>

          <Card className="border-2 shadow-2xl">
            <CardContent className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Bienvenido</h2>
                <p className="text-muted-foreground">Ingresa tus credenciales para continuar</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Correo Electrónico"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4" />}
                  required
                  autoComplete="email"
                />
                <Input
                  label="Contraseña"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  icon={<Lock className="w-4 h-4" />}
                  error={error}
                  required
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  className="w-full mt-6"
                  isLoading={isLoading}
                  size="lg"
                >
                  Iniciar Sesión
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted/30 border-2 border-border rounded-lg">
                <p className="text-xs font-semibold mb-2 text-muted-foreground">Usuarios de prueba:</p>
                <div className="text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-foreground/80">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-[10px] font-bold text-primary">A</span>
                    </div>
                    <div>
                      <span className="font-medium">admin@pymes.com</span>
                      <span className="text-muted-foreground"> / admin123</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/80">
                    <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center">
                      <span className="text-[10px] font-bold text-secondary">U</span>
                    </div>
                    <div>
                      <span className="font-medium">usuario@pymes.com</span>
                      <span className="text-muted-foreground"> / user123</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
