"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function TaskCategoriesPage() {
  const router = useRouter()
  const taskStatuses = useAppStore((state) => state.taskStatuses)
  const taskPriorities = useAppStore((state) => state.taskPriorities)
  const addTaskStatus = useAppStore((state) => state.addTaskStatus)
  const updateTaskStatus = useAppStore((state) => state.updateTaskStatus)
  const deleteTaskStatus = useAppStore((state) => state.deleteTaskStatus)
  const addTaskPriority = useAppStore((state) => state.addTaskPriority)
  const updateTaskPriority = useAppStore((state) => state.updateTaskPriority)
  const deleteTaskPriority = useAppStore((state) => state.deleteTaskPriority)

  const [showAddStatusDialog, setShowAddStatusDialog] = useState(false)
  const [showEditStatusDialog, setShowEditStatusDialog] = useState(false)
  const [showAddPriorityDialog, setShowAddPriorityDialog] = useState(false)
  const [showEditPriorityDialog, setShowEditPriorityDialog] = useState(false)
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null)
  const [editingPriorityId, setEditingPriorityId] = useState<string | null>(null)
  const [statusName, setStatusName] = useState("")
  const [priorityName, setPriorityName] = useState("")

  const handleAddStatus = () => {
    if (statusName.trim()) {
      addTaskStatus(statusName.trim())
      setStatusName("")
      setShowAddStatusDialog(false)
    }
  }

  const handleEditStatus = (id: string, name: string) => {
    setEditingStatusId(id)
    setStatusName(name)
    setShowEditStatusDialog(true)
  }

  const handleUpdateStatus = () => {
    if (editingStatusId && statusName.trim()) {
      updateTaskStatus(editingStatusId, statusName.trim())
      setStatusName("")
      setEditingStatusId(null)
      setShowEditStatusDialog(false)
    }
  }

  const handleDeleteStatus = (id: string) => {
    if (confirm("Are you sure you want to delete this status?")) {
      deleteTaskStatus(id)
    }
  }

  const handleAddPriority = () => {
    if (priorityName.trim()) {
      addTaskPriority(priorityName.trim())
      setPriorityName("")
      setShowAddPriorityDialog(false)
    }
  }

  const handleEditPriority = (id: string, name: string) => {
    setEditingPriorityId(id)
    setPriorityName(name)
    setShowEditPriorityDialog(true)
  }

  const handleUpdatePriority = () => {
    if (editingPriorityId && priorityName.trim()) {
      updateTaskPriority(editingPriorityId, priorityName.trim())
      setPriorityName("")
      setEditingPriorityId(null)
      setShowEditPriorityDialog(false)
    }
  }

  const handleDeletePriority = (id: string) => {
    if (confirm("Are you sure you want to delete this priority?")) {
      deleteTaskPriority(id)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title="Task Categories" />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="space-y-6 sm:space-y-8 max-w-5xl">
            {/* Task Status Section */}
            <div className="rounded-2xl border bg-card p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold">Task Status</h2>
                <button onClick={() => router.back()} className="text-sm underline hover:no-underline">
                  Go Back
                </button>
              </div>

              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-sm sm:text-base">S.No</th>
                        <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-sm sm:text-base">
                          Task Status Name
                        </th>
                        <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-sm sm:text-base">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {taskStatuses.map((status, i) => (
                        <tr key={status.id} className="border-b last:border-0 hover:bg-muted/30">
                          <td className="py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base">{i + 1}</td>
                          <td className="py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base">{status.name}</td>
                          <td className="py-3 sm:py-4 px-3 sm:px-4">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditStatus(status.id, status.name)}
                                className="bg-transparent text-xs sm:text-sm"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteStatus(status.id)}
                                className="text-xs sm:text-sm"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Button
                onClick={() => setShowAddStatusDialog(true)}
                className="mt-4 sm:mt-6 bg-primary hover:bg-primary/90 text-sm sm:text-base"
              >
                + Add New Status
              </Button>
            </div>

            {/* Task Priority Section */}
            <div className="rounded-2xl border bg-card p-4 sm:p-6 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Task Priority</h2>

              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-sm sm:text-base">S.No</th>
                        <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-sm sm:text-base">
                          Task Priority Name
                        </th>
                        <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-sm sm:text-base">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {taskPriorities.map((priority, i) => (
                        <tr key={priority.id} className="border-b last:border-0 hover:bg-muted/30">
                          <td className="py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base">{i + 1}</td>
                          <td className="py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base">{priority.name}</td>
                          <td className="py-3 sm:py-4 px-3 sm:px-4">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditPriority(priority.id, priority.name)}
                                className="bg-transparent text-xs sm:text-sm"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeletePriority(priority.id)}
                                className="text-xs sm:text-sm"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Button
                onClick={() => setShowAddPriorityDialog(true)}
                className="mt-4 sm:mt-6 bg-primary hover:bg-primary/90 text-sm sm:text-base"
              >
                + Add New Priority
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Add Status Dialog */}
      <Dialog open={showAddStatusDialog} onOpenChange={setShowAddStatusDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status-name">Task Status Name</Label>
              <Input
                id="status-name"
                placeholder="Enter status name"
                value={statusName}
                onChange={(e) => setStatusName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddStatus()}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleAddStatus} className="bg-primary hover:bg-primary/90">
                Add
              </Button>
              <Button variant="outline" onClick={() => setShowAddStatusDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Status Dialog */}
      <Dialog open={showEditStatusDialog} onOpenChange={setShowEditStatusDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-status-name">Task Status Name</Label>
              <Input
                id="edit-status-name"
                placeholder="Enter status name"
                value={statusName}
                onChange={(e) => setStatusName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUpdateStatus()}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleUpdateStatus} className="bg-primary hover:bg-primary/90">
                Update
              </Button>
              <Button variant="outline" onClick={() => setShowEditStatusDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Priority Dialog */}
      <Dialog open={showAddPriorityDialog} onOpenChange={setShowAddPriorityDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Priority</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="priority-name">Task Priority Name</Label>
              <Input
                id="priority-name"
                placeholder="Enter priority name"
                value={priorityName}
                onChange={(e) => setPriorityName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddPriority()}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleAddPriority} className="bg-primary hover:bg-primary/90">
                Add
              </Button>
              <Button variant="outline" onClick={() => setShowAddPriorityDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Priority Dialog */}
      <Dialog open={showEditPriorityDialog} onOpenChange={setShowEditPriorityDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Priority</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-priority-name">Task Priority Name</Label>
              <Input
                id="edit-priority-name"
                placeholder="Enter priority name"
                value={priorityName}
                onChange={(e) => setPriorityName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUpdatePriority()}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleUpdatePriority} className="bg-primary hover:bg-primary/90">
                Update
              </Button>
              <Button variant="outline" onClick={() => setShowEditPriorityDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
