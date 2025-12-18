import Image from "next/image"
import { Check } from "lucide-react"

interface CompletedTaskCardProps {
  title: string
  description: string
  image: string
  completedDate: string
}

export function CompletedTaskCard({ title, description, image, completedDate }: CompletedTaskCardProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 rounded-2xl border bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex-shrink-0">
        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
          <Check className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="flex-1 min-w-0 w-full">
        <h3 className="font-semibold text-sm sm:text-base mb-1 text-foreground">{title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2">{description}</p>
        <div className="text-xs space-y-1">
          <p>
            Status: <span className="font-medium text-green-600">Completed</span>
          </p>
          <p className="text-muted-foreground">{completedDate}</p>
        </div>
      </div>

      {image && (
        <div className="flex-shrink-0 w-full sm:w-auto">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={100}
            height={100}
            className="rounded-xl object-cover w-full h-24 sm:w-[100px] sm:h-[100px]"
          />
        </div>
      )}
    </div>
  )
}
