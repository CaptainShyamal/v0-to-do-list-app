"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { TaskCard } from "@/components/task-card"
import { Button } from "@/components/ui/button"
import { Trash2, Edit } from "lucide-react"
import Image from "next/image"

export default function MyTaskPage() {
  const [selectedTask, setSelectedTask] = useState<number | null>(0)

  const tasks = [
    {
      title: "Submit Documents",
      description: "Make sure to submit all the necessary docum.....",
      image: "/placeholder.svg?height=80&width=80",
      priority: "Extreme" as const,
      status: "Not Started" as const,
      createdDate: "20/06/2023",
      fullDescription: `Review the list of documents required for submission and ensure all necessary documents are ready. Organize the documents accordingly and scan them if physical copies need to be submitted digitally. Rename the scanned files appropriately for easy identification and verify the accepted file formats. Upload the documents securely to the designated platform, double-check for accuracy, and obtain confirmation of successful submission. Follow up if necessary to ensure proper processing.`,
      objective: "To submit required documents for something important",
      deadline: "End of Day",
      notes: [
        "Ensure that the documents are authentic and up-to-date.",
        "Maintain confidentiality and security of sensitive information during the submission process.",
        "If there are specific guidelines or deadlines for submission, adhere to them diligently.",
      ],
    },
    {
      title: "Complete assignments",
      description: "The assignments must be completed to pass final year....",
      image: "/placeholder.svg?height=80&width=80",
      priority: "Moderate" as const,
      status: "In Progress" as const,
      createdDate: "20/06/2023",
      fullDescription: "The assignments must be completed to pass final year.",
      objective: "To complete all assignments on time",
      deadline: "End of Week",
      notes: [],
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title="My Task" />

        <main className="flex-1 overflow-y-auto">
          <div className="grid lg:grid-cols-[1fr,500px] h-full">
            {/* Left Side - Task List */}
            <div className="p-8 border-r overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">My Tasks</h2>
                <button className="text-sm underline hover:no-underline">Go Back</button>
              </div>

              <div className="space-y-4">
                {tasks.map((task, i) => (
                  <div
                    key={i}
                    className={`cursor-pointer transition-all ${selectedTask === i ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setSelectedTask(i)}
                  >
                    <TaskCard {...task} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Task Detail */}
            {selectedTask !== null && (
              <div className="p-8 bg-muted/20 overflow-y-auto">
                <div className="space-y-6">
                  <div className="relative rounded-2xl overflow-hidden bg-white p-6">
                    <Image
                      src={tasks[selectedTask].image || "/placeholder.svg"}
                      alt={tasks[selectedTask].title}
                      width={400}
                      height={250}
                      className="w-full rounded-xl object-cover mb-4"
                    />

                    <h2 className="text-2xl font-bold mb-3">{tasks[selectedTask].title}</h2>

                    <div className="space-y-2 text-sm mb-4">
                      <p>
                        Priority:{" "}
                        <span
                          className={
                            tasks[selectedTask].priority === "Extreme" ? "text-red-600 font-medium" : "font-medium"
                          }
                        >
                          {tasks[selectedTask].priority}
                        </span>
                      </p>
                      <p>
                        Status:{" "}
                        <span
                          className={
                            tasks[selectedTask].status === "Not Started" ? "text-red-600 font-medium" : "font-medium"
                          }
                        >
                          {tasks[selectedTask].status}
                        </span>
                      </p>
                      <p className="text-muted-foreground">Created on: {tasks[selectedTask].createdDate}</p>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="font-semibold mb-1">Task Title: {tasks[selectedTask].title}.</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Objective:</p>
                        <p className="text-muted-foreground">{tasks[selectedTask].objective}</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Task Description:</p>
                        <p className="text-muted-foreground">{tasks[selectedTask].fullDescription}</p>
                      </div>
                      {tasks[selectedTask].notes.length > 0 && (
                        <div>
                          <p className="font-semibold mb-1">Additional Notes:</p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {tasks[selectedTask].notes.map((note, i) => (
                              <li key={i}>{note}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold mb-1">Deadline for Submission:</p>
                        <p className="text-muted-foreground">{tasks[selectedTask].deadline}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button variant="destructive" className="gap-2" size="lg">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                      <Button className="gap-2 bg-primary hover:bg-primary/90" size="lg">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
