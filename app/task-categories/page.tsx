"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { EditTaskStatusDialog } from "@/components/dialog-components"

export default function TaskCategoriesPage() {
  const [showEditDialog, setShowEditDialog] = useState(false)

  const taskStatuses = [
    { name: "Completed", count: 12 },
    { name: "In Progress", count: 8 },
    { name: "Not Started", count: 5 },
  ]

  const taskPriorities = [
    { name: "Extreme", count: 3 },
    { name: "Moderate", count: 15 },
    { name: "Low", count: 7 },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title="Task Categories" />

        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-8 max-w-5xl">
            {/* Task Status Section */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Task Status</h2>
                <button className="text-sm underline hover:no-underline">Go Back</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4 font-semibold">S.No</th>
                      <th className="text-left py-4 px-4 font-semibold">Task Status Name</th>
                      <th className="text-left py-4 px-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskStatuses.map((status, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="py-4 px-4">{i + 1}</td>
                        <td className="py-4 px-4">{status.name}</td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowEditDialog(true)}
                              className="bg-transparent"
                            >
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button className="mt-6 bg-primary hover:bg-primary/90">+ Add New Status</Button>
            </div>

            {/* Task Priority Section */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Task Priority</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4 font-semibold">S.No</th>
                      <th className="text-left py-4 px-4 font-semibold">Task Priority Name</th>
                      <th className="text-left py-4 px-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskPriorities.map((priority, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="py-4 px-4">{i + 1}</td>
                        <td className="py-4 px-4">{priority.name}</td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowEditDialog(true)}
                              className="bg-transparent"
                            >
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button className="mt-6 bg-primary hover:bg-primary/90">+ Add New Priority</Button>
            </div>
          </div>
        </main>
      </div>

      <EditTaskStatusDialog open={showEditDialog} onOpenChange={setShowEditDialog} />
    </div>
  )
}
