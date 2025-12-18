"use client"

import { MoreVertical } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  title: string
  description: string
  image: string
  priority: "Extreme" | "Moderate" | "Low"
  status: "Not Started" | "In Progress" | "Completed"
  createdDate: string
  onEdit?: () => void
  onDelete?: () => void
  onFinish?: () => void
}

export function TaskCard({
  title,
  description,
  image,
  priority,
  status,
  createdDate,
  onEdit,
  onDelete,
  onFinish,
}: TaskCardProps) {
  const priorityColor = {
    Extreme: "text-red-600",
    Moderate: "text-blue-600",
    Low: "text-green-600",
  }[priority]

  const statusColor = {
    "Not Started": "text-red-600",
    "In Progress": "text-blue-600",
    Completed: "text-green-600",
  }[status]

  return (
    <div className="relative flex items-start gap-4 rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0">
        <div className="h-3 w-3 rounded-full border-2 border-blue-600 mt-1" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>

        <div className="flex items-center gap-4 text-xs">
          <span>
            Priority: <span className={cn("font-medium", priorityColor)}>{priority}</span>
          </span>
          <span>
            Status: <span className={cn("font-medium", statusColor)}>{status}</span>
          </span>
          <span className="text-muted-foreground">Created on: {createdDate}</span>
        </div>
      </div>

      <div className="flex-shrink-0">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={120}
          height={120}
          className="rounded-xl object-cover"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} className="text-destructive">
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onFinish}>Finish</DropdownMenuItem>
          <DropdownMenuItem>Remove from Vital</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
