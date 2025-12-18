import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"

export default function HelpPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title="Help" />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Help & Support</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Need help with the application? Here are some resources:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Check our documentation for detailed guides</li>
                <li>Contact support team for assistance</li>
                <li>Browse frequently asked questions</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
