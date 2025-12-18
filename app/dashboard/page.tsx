"use client"

import { useState } from "react"
import { Plus, Users } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { TaskCard } from "@/components/task-card"
import { CompletedTaskCard } from "@/components/completed-task-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AddTaskDialog } from "@/components/dialog-components"

export default function DashboardPage() {
  const [showAddTask, setShowAddTask] = useState(false)

  const tasks = [
    {
      title: "Attend Nischal's Birthday Party",
      description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements).....",
      image: "/vibrant-birthday-celebration.png",
      priority: "Moderate" as const,
      status: "Not Started" as const,
      createdDate: "20/06/2023",
    },
    {
      title: "Landing Page Design for TravelDays",
      description: "Get the work done by EOD and discuss with client before leaving. (4 PM | Meeting Room)",
      image: "/travel-website.png",
      priority: "Moderate" as const,
      status: "In Progress" as const,
      createdDate: "20/06/2023",
    },
    {
      title: "Presentation on Final Product",
      description:
        "Make sure everything is functioning and all the necessities are properly met. Prepare the team and get the documents ready for...",
      image: "/business-meeting-collaboration.png",
      priority: "Moderate" as const,
      status: "In Progress" as const,
      createdDate: "19/06/2023",
    },
  ]

  const completedTasks = [
    {
      title: "Walk the dog",
      description: "Take the dog to the park and bring treats as well.",
      image: "/dog-walking.png",
      completedDate: "Completed 2 days ago.",
    },
    {
      title: "Conduct meeting",
      description: "Meet with the client and finalize requirements.",
      image: "/business-meeting-collaboration.png",
      completedDate: "Completed 2 days ago.",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />

        <main className="flex-1 overflow-y-auto px-8 py-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Welcome back, Shyamal <span className="inline-block">👋</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Avatar key={i} className="border-2 border-white h-10 w-10">
                    <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Users className="h-4 w-4" />
                Invite
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr,400px] gap-6">
            {/* Left Column - Tasks */}
            <div className="space-y-6">
              {/* To-Do Section */}
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-1">
                      <span className="text-primary">📋</span>
                      To-Do
                    </h3>
                    <p className="text-sm text-muted-foreground">20 June • Today</p>
                  </div>
                  <Button
                    onClick={() => setShowAddTask(true)}
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add task
                  </Button>
                </div>

                <div className="space-y-4">
                  {tasks.map((task, i) => (
                    <TaskCard key={i} {...task} />
                  ))}
                </div>
              </div>

              {/* Completed Task Section */}
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <span className="text-green-600">✓</span>
                  Completed Task
                </h3>

                <div className="space-y-4">
                  {completedTasks.map((task, i) => (
                    <CompletedTaskCard key={i} {...task} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Task Status */}
            <div className="space-y-6">
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
                  <span className="text-blue-600">📊</span>
                  Task Status
                </h3>

                <div className="space-y-6">
                  {/* Completed */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <div className="relative h-32 w-32">
                        <svg className="transform -rotate-90 h-32 w-32">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#e5e7eb"
                            strokeWidth="12"
                            fill="none"
                            className="text-gray-200"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#22c55e"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${(84 / 100) * 351.86} 351.86`}
                            className="text-green-500"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">84%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center font-medium flex items-center justify-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-green-500" />
                      Completed
                    </p>
                  </div>

                  {/* In Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <div className="relative h-32 w-32">
                        <svg className="transform -rotate-90 h-32 w-32">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#e5e7eb"
                            strokeWidth="12"
                            fill="none"
                            className="text-gray-200"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#3b82f6"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${(46 / 100) * 351.86} 351.86`}
                            className="text-blue-500"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">46%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center font-medium flex items-center justify-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-blue-500" />
                      In Progress
                    </p>
                  </div>

                  {/* Not Started */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <div className="relative h-32 w-32">
                        <svg className="transform -rotate-90 h-32 w-32">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#e5e7eb"
                            strokeWidth="12"
                            fill="none"
                            className="text-gray-200"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#ef4444"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${(13 / 100) * 351.86} 351.86`}
                            className="text-red-500"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">13%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center font-medium flex items-center justify-center gap-2">
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
    </div>
  )
}
