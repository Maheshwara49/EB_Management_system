import { ProtectedRoute } from "@/components/protected-route"
import { ConnectionsDashboard } from "@/components/connections-dashboard"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <ConnectionsDashboard />
        </main>
      </div>
    </ProtectedRoute>
  )
}
