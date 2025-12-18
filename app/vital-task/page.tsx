import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"

export default function VitalTaskPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title="Vital Task" />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <h2 className="text-2xl font-bold mb-6">Vital Tasks</h2>
          <p className="text-muted-foreground">Your most important tasks will appear here.</p>
        </main>
      </div>
    </div>
  )
}
