"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { TaskCard } from "@/components/task-card"
import { Button } from "@/components/ui/button"
import { Trash2, Edit } from "lucide-react"
import Image from "next/image"
import { useAppStore, type Task } from "@/lib/store"
import { EditTaskDialog } from "@/components/dialog-components"

export default function MyTaskPage() {
  const router = useRouter()
  const { tasks, deleteTask, updateTask } = useAppStore()
  const [selectedTask, setSelectedTask] = useState<Task | null>(tasks[0] || null)
  const [showEditTask, setShowEditTask] = useState(false)

  const handleEdit = (task: Task) => {
    setSelectedTask(task)
    setShowEditTask(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(id)
      if (selectedTask?.id === id) {
        setSelectedTask(tasks[0] || null)
      }
    }
  }

  const handleFinish = (id: string) => {
    updateTask(id, { status: "Completed" })
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title="My Task" />

        <main className="flex-1 overflow-y-auto">
          <div className="grid lg:grid-cols-[1fr,500px] min-h-full">
            {/* Left Side - Task List */}
            <div className="p-4 sm:p-6 lg:p-8 border-r overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">My Tasks</h2>
                <button onClick={() => router.push("/dashboard")} className="text-sm underline hover:no-underline">
                  Go Back
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {tasks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No tasks available. Go to Dashboard to add tasks!
                  </p>
                ) : (
                  tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`cursor-pointer transition-all ${
                        selectedTask?.id === task.id ? "ring-2 ring-primary rounded-2xl" : ""
                      }`}
                      onClick={() => setSelectedTask(task)}
                    >
                      <TaskCard
                        {...task}
                        createdDate={task.date}
                        onEdit={() => handleEdit(task)}
                        onDelete={() => handleDelete(task.id)}
                        onFinish={() => handleFinish(task.id)}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Side - Task Detail */}
            {selectedTask && (
              <div className="p-4 sm:p-6 lg:p-8 bg-muted/20 overflow-y-auto">
                <div className="space-y-6">
                  <div className="relative rounded-2xl overflow-hidden bg-white p-4 sm:p-6">
                    {selectedTask.image && (
                      <Image
                        src={selectedTask.image || "/placeholder.svg"}
                        alt={selectedTask.title}
                        width={400}
                        height={250}
                        className="w-full rounded-xl object-cover mb-4"
                      />
                    )}

                    <h2 className="text-xl sm:text-2xl font-bold mb-3">{selectedTask.title}</h2>

                    <div className="space-y-2 text-xs sm:text-sm mb-4">
                      <p>
                        Priority:{" "}
                        <span
                          className={
                            selectedTask.priority === "Extreme"
                              ? "text-red-600 font-medium"
                              : selectedTask.priority === "Moderate"
                                ? "text-blue-600 font-medium"
                                : "text-green-600 font-medium"
                          }
                        >
                          {selectedTask.priority}
                        </span>
                      </p>
                      <p>
                        Status:{" "}
                        <span
                          className={
                            selectedTask.status === "Not Started"
                              ? "text-red-600 font-medium"
                              : selectedTask.status === "In Progress"
                                ? "text-blue-600 font-medium"
                                : "text-green-600 font-medium"
                          }
                        >
                          {selectedTask.status}
                        </span>
                      </p>
                      <p className="text-muted-foreground">Created on: {selectedTask.date}</p>
                    </div>

                    <div className="space-y-4 text-xs sm:text-sm">
                      <div>
                        <p className="font-semibold mb-1">Task Title:</p>
                        <p className="text-muted-foreground">{selectedTask.title}</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Task Description:</p>
                        <p className="text-muted-foreground">
                          {selectedTask.description || "No description provided."}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Deadline for Submission:</p>
                        <p className="text-muted-foreground">{selectedTask.date}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <Button
                        variant="destructive"
                        className="gap-2 w-full sm:w-auto"
                        size="lg"
                        onClick={() => handleDelete(selectedTask.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                      <Button
                        className="gap-2 bg-primary hover:bg-primary/90 w-full sm:w-auto"
                        size="lg"
                        onClick={() => handleEdit(selectedTask)}
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Empty state for mobile when no task selected */}
            {!selectedTask && (
              <div className="hidden lg:flex items-center justify-center p-8 bg-muted/20">
                <p className="text-muted-foreground">Select a task to view details</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {selectedTask && <EditTaskDialog open={showEditTask} onOpenChange={setShowEditTask} task={selectedTask} />}
    </div>
  )
}
