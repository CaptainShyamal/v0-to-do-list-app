"use client"

import { MoreVertical } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  title: string
  description: string
  image?: string
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
    <div className="relative flex flex-col sm:flex-row items-start gap-3 sm:gap-4 rounded-2xl border bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 hidden sm:block">
        <div className="h-3 w-3 rounded-full border-2 border-blue-600 mt-1" />
      </div>

      <div className="flex-1 min-w-0 w-full">
        <h3 className="font-semibold text-base sm:text-lg mb-2 text-foreground pr-8">{title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs">
          <span className="flex items-center gap-1">
            Priority: <span className={cn("font-medium", priorityColor)}>{priority}</span>
          </span>
          <span className="flex items-center gap-1">
            Status: <span className={cn("font-medium", statusColor)}>{status}</span>
          </span>
          <span className="text-muted-foreground hidden sm:inline">Created on: {createdDate}</span>
        </div>
      </div>

      {image && (
        <div className="flex-shrink-0 w-full sm:w-auto order-first sm:order-last">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={120}
            height={120}
            className="rounded-xl object-cover w-full h-32 sm:w-[120px] sm:h-[120px]"
          />
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="absolute top-3 right-3 sm:top-4 sm:right-4 h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {onEdit && <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>}
          {onDelete && (
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              Delete
            </DropdownMenuItem>
          )}
          {onFinish && status !== "Completed" && (
            <DropdownMenuItem onClick={onFinish}>Mark as Complete</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
