"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Upload } from "lucide-react"

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddTaskDialog({ open, onOpenChange }: AddTaskDialogProps) {
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

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter task title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Input id="date" type="date" />
              <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="extreme" className="text-destructive" />
                <span className="text-sm">Extreme</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="moderate" defaultChecked />
                <span className="text-sm">Moderate</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="low" />
                <span className="text-sm">Low</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="description">Task Description</Label>
              <Textarea id="description" placeholder="Start writing here..." className="min-h-[200px] resize-none" />
            </div>

            <div className="space-y-2">
              <Label>Upload Image</Label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg min-h-[200px] bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">Drag&Drop files here</p>
                <p className="text-xs text-muted-foreground">or</p>
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  Browse
                </Button>
              </div>
            </div>
          </div>

          <Button className="bg-[#FF5A3D] hover:bg-[#FF5A3D]/90">Done</Button>
        </div>
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
