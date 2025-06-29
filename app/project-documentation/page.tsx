import { ProtectedRoute } from "@/components/protected-route"
import { Header } from "@/components/header"
import { ProjectDocumentation } from "@/components/project-documentation"

export default function ProjectDocumentationPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <ProjectDocumentation />
        </main>
      </div>
    </ProtectedRoute>
  )
}
