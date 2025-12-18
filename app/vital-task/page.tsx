"use client"

import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { TaskCard } from "@/components/task-card"
import { useAppStore, type Task } from "@/lib/store"
import { EditTaskDialog } from "@/components/dialog-components"
import { useState } from "react"

export default function VitalTaskPage() {
  const { tasks, deleteTask, updateTask } = useAppStore()
  const [showEditTask, setShowEditTask] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Show tasks with Extreme priority or In Progress status as "vital"
  const vitalTasks = tasks.filter((task) => task.priority === "Extreme" || task.status === "In Progress")

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setShowEditTask(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(id)
    }
  }

  const handleFinish = (id: string) => {
    updateTask(id, { status: "Completed" })
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title="Vital Task" />
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Vital Tasks</h2>
          {vitalTasks.length === 0 ? (
            <p className="text-muted-foreground">
              No vital tasks at the moment. Tasks with Extreme priority or In Progress status will appear here.
            </p>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {vitalTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  {...task}
                  createdDate={task.date}
                  onEdit={() => handleEdit(task)}
                  onDelete={() => handleDelete(task.id)}
                  onFinish={() => handleFinish(task.id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      {editingTask && <EditTaskDialog open={showEditTask} onOpenChange={setShowEditTask} task={editingTask} />}
    </div>
  )
}
