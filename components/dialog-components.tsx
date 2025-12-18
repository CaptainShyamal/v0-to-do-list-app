"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Upload, X } from "lucide-react"
import { useState, useRef } from "react"
import { useAppStore, type Task } from "@/lib/store"
import { handleImageUpload } from "@/lib/image-utils"
import Image from "next/image"

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddTaskDialog({ open, onOpenChange }: AddTaskDialogProps) {
  const addTask = useAppStore((state) => state.addTask)
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    priority: "Moderate" as "Extreme" | "Moderate" | "Low",
    description: "",
    image: "",
  })
  const [imagePreview, setImagePreview] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const base64Image = await handleImageUpload(event)
    if (base64Image) {
      setFormData({ ...formData, image: base64Image })
      setImagePreview(base64Image)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.date) {
      alert("Please fill in title and date")
      return
    }

    addTask({
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: "Not Started",
      date: formData.date,
      image: formData.image,
    })

    // Reset form
    setFormData({
      title: "",
      date: "",
      priority: "Moderate",
      description: "",
      image: "",
    })
    setImagePreview("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Add New Task</DialogTitle>
            <button onClick={() => onOpenChange(false)} className="text-sm underline hover:no-underline">
              Go Back
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value="Extreme"
                  checked={formData.priority === "Extreme"}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="text-destructive"
                />
                <span className="text-sm">Extreme</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value="Moderate"
                  checked={formData.priority === "Moderate"}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                />
                <span className="text-sm">Moderate</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={formData.priority === "Low"}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                />
                <span className="text-sm">Low</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="description">Task Description</Label>
              <Textarea
                id="description"
                placeholder="Start writing here..."
                className="min-h-[200px] resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Image</Label>
              {imagePreview ? (
                <div className="relative border-2 rounded-lg min-h-[200px] overflow-hidden">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("")
                      setFormData({ ...formData, image: "" })
                    }}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg min-h-[200px] bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">Drag&Drop files here</p>
                  <p className="text-xs text-muted-foreground">or</p>
                  <Button type="button" variant="outline" size="sm" className="mt-2 bg-transparent">
                    Browse
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </div>
          </div>

          <Button type="submit" className="bg-[#FF5A3D] hover:bg-[#FF5A3D]/90">
            Done
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface EditTaskStatusDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditTaskStatusDialog({ open, onOpenChange }: EditTaskStatusDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              <span className="underline decoration-2 underline-offset-4">Edit</span> Task Status
            </DialogTitle>
            <button onClick={() => onOpenChange(false)} className="text-sm underline hover:no-underline">
              Go Back
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="status-name">Task Status Name</Label>
            <Input id="status-name" placeholder="Enter status name" />
          </div>

          <div className="flex gap-3">
            <Button className="bg-[#FF5A3D] hover:bg-[#FF5A3D]/90">Update</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface EditTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task
}

export function EditTaskDialog({ open, onOpenChange, task }: EditTaskDialogProps) {
  const updateTask = useAppStore((state) => state.updateTask)
  const [formData, setFormData] = useState({
    title: task.title,
    date: task.date,
    priority: task.priority,
    status: task.status,
    description: task.description,
    image: task.image || "",
  })
  const [imagePreview, setImagePreview] = useState(task.image || "")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const base64Image = await handleImageUpload(event)
    if (base64Image) {
      setFormData({ ...formData, image: base64Image })
      setImagePreview(base64Image)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.date) {
      alert("Please fill in title and date")
      return
    }

    updateTask(task.id, {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      date: formData.date,
      image: formData.image,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Edit Task</DialogTitle>
            <button onClick={() => onOpenChange(false)} className="text-sm underline hover:no-underline">
              Go Back
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-date">Date</Label>
            <div className="relative">
              <Input
                id="edit-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="edit-priority"
                  value="Extreme"
                  checked={formData.priority === "Extreme"}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="text-destructive"
                />
                <span className="text-sm">Extreme</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="edit-priority"
                  value="Moderate"
                  checked={formData.priority === "Moderate"}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                />
                <span className="text-sm">Moderate</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="edit-priority"
                  value="Low"
                  checked={formData.priority === "Low"}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                />
                <span className="text-sm">Low</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="edit-status"
                  value="Not Started"
                  checked={formData.status === "Not Started"}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                />
                <span className="text-sm">Not Started</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="edit-status"
                  value="In Progress"
                  checked={formData.status === "In Progress"}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                />
                <span className="text-sm">In Progress</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="edit-status"
                  value="Completed"
                  checked={formData.status === "Completed"}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                />
                <span className="text-sm">Completed</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="edit-description">Task Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Start writing here..."
                className="min-h-[150px] sm:min-h-[200px] resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Image</Label>
              {imagePreview ? (
                <div className="relative border-2 rounded-lg min-h-[150px] sm:min-h-[200px] overflow-hidden">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("")
                      setFormData({ ...formData, image: "" })
                    }}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg min-h-[150px] sm:min-h-[200px] bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50 mb-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground">Drag&Drop files here</p>
                  <p className="text-xs text-muted-foreground">or</p>
                  <Button type="button" variant="outline" size="sm" className="mt-2 bg-transparent">
                    Browse
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="bg-[#FF5A3D] hover:bg-[#FF5A3D]/90">
              Update Task
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
