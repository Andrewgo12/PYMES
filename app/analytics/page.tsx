import { DashboardLayout } from "@/components/dashboard-layout"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Métricas avanzadas y análisis predictivo</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground">Vista de Analytics - Próximamente</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
