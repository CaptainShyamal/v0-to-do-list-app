"use client"

import { useState } from "react"
import { Plus, Users } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { TaskCard } from "@/components/task-card"
import { CompletedTaskCard } from "@/components/completed-task-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AddTaskDialog, EditTaskDialog } from "@/components/dialog-components"
import { useAppStore } from "@/lib/store"
import type { Task } from "@/lib/store"

export default function DashboardPage() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showEditTask, setShowEditTask] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const { tasks, user, deleteTask, updateTask } = useAppStore()

  const pendingTasks = tasks.filter((t) => t.status !== "Completed")
  const completedTasks = tasks.filter((t) => t.status === "Completed")

  const totalTasks = tasks.length || 1
  const completedPercentage = Math.round((completedTasks.length / totalTasks) * 100)
  const inProgressPercentage = Math.round((tasks.filter((t) => t.status === "In Progress").length / totalTasks) * 100)
  const notStartedPercentage = Math.round((tasks.filter((t) => t.status === "Not Started").length / totalTasks) * 100)

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
        <AppHeader />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Welcome Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Welcome back, {user?.firstName || "User"} <span className="inline-block">👋</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Avatar key={i} className="border-2 border-white h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Invite</span>
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr,400px] gap-4 sm:gap-6">
            {/* Left Column - Tasks */}
            <div className="space-y-4 sm:space-y-6">
              {/* To-Do Section */}
              <div className="rounded-2xl border bg-card p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-1">
                      <span className="text-primary">📋</span>
                      To-Do
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {new Date().toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                      })}{" "}
                      • Today
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowAddTask(true)}
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary w-full sm:w-auto"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add task
                  </Button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {pendingTasks.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No pending tasks. Click "Add task" to create one!
                    </p>
                  ) : (
                    pendingTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        {...task}
                        createdDate={task.date}
                        onEdit={() => handleEdit(task)}
                        onDelete={() => handleDelete(task.id)}
                        onFinish={() => handleFinish(task.id)}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Completed Task Section */}
              {completedTasks.length > 0 && (
                <div className="rounded-2xl border bg-card p-4 sm:p-6 shadow-sm">
                  <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-4">
                    <span className="text-green-600">✓</span>
                    Completed Task
                  </h3>

                  <div className="space-y-3 sm:space-y-4">
                    {completedTasks.map((task) => (
                      <CompletedTaskCard
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        image={task.image || "/placeholder.svg"}
                        completedDate={`Completed on ${task.date}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Task Status */}
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-2xl border bg-card p-4 sm:p-6 shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-6">
                  <span className="text-blue-600">📊</span>
                  Task Status
                </h3>

                <div className="space-y-6">
                  {/* Completed */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                        <svg className="transform -rotate-90 h-28 w-28 sm:h-32 sm:w-32">
                          <circle
                            cx="56"
                            cy="56"
                            r="50"
                            stroke="#e5e7eb"
                            strokeWidth="10"
                            fill="none"
                            className="text-gray-200 sm:hidden"
                          />
                          <circle
                            cx="56"
                            cy="56"
                            r="50"
                            stroke="#22c55e"
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray={`${(completedPercentage / 100) * 314.16} 314.16`}
                            className="text-green-500 sm:hidden"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#e5e7eb"
                            strokeWidth="12"
                            fill="none"
                            className="text-gray-200 hidden sm:block"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#22c55e"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${(completedPercentage / 100) * 351.86} 351.86`}
                            className="text-green-500 hidden sm:block"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl sm:text-2xl font-bold">{completedPercentage}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center font-medium flex items-center justify-center gap-2 text-sm sm:text-base">
                      <span className="h-3 w-3 rounded-full bg-green-500" />
                      Completed
                    </p>
                  </div>

                  {/* In Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                        <svg className="transform -rotate-90 h-28 w-28 sm:h-32 sm:w-32">
                          <circle
                            cx="56"
                            cy="56"
                            r="50"
                            stroke="#e5e7eb"
                            strokeWidth="10"
                            fill="none"
                            className="text-gray-200 sm:hidden"
                          />
                          <circle
                            cx="56"
                            cy="56"
                            r="50"
                            stroke="#3b82f6"
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray={`${(inProgressPercentage / 100) * 314.16} 314.16`}
                            className="text-blue-500 sm:hidden"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#e5e7eb"
                            strokeWidth="12"
                            fill="none"
                            className="text-gray-200 hidden sm:block"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#3b82f6"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${(inProgressPercentage / 100) * 351.86} 351.86`}
                            className="text-blue-500 hidden sm:block"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl sm:text-2xl font-bold">{inProgressPercentage}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center font-medium flex items-center justify-center gap-2 text-sm sm:text-base">
                      <span className="h-3 w-3 rounded-full bg-blue-500" />
                      In Progress
                    </p>
                  </div>

                  {/* Not Started */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                        <svg className="transform -rotate-90 h-28 w-28 sm:h-32 sm:w-32">
                          <circle
                            cx="56"
                            cy="56"
                            r="50"
                            stroke="#e5e7eb"
                            strokeWidth="10"
                            fill="none"
                            className="text-gray-200 sm:hidden"
                          />
                          <circle
                            cx="56"
                            cy="56"
                            r="50"
                            stroke="#ef4444"
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray={`${(notStartedPercentage / 100) * 314.16} 314.16`}
                            className="text-red-500 sm:hidden"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#e5e7eb"
                            strokeWidth="12"
                            fill="none"
                            className="text-gray-200 hidden sm:block"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#ef4444"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${(notStartedPercentage / 100) * 351.86} 351.86`}
                            className="text-red-500 hidden sm:block"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl sm:text-2xl font-bold">{notStartedPercentage}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center font-medium flex items-center justify-center gap-2 text-sm sm:text-base">
                      <span className="h-3 w-3 rounded-full bg-red-500" />
                      Not Started
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AddTaskDialog open={showAddTask} onOpenChange={setShowAddTask} />
      {editingTask && <EditTaskDialog open={showEditTask} onOpenChange={setShowEditTask} task={editingTask} />}
    </div>
  )
}
