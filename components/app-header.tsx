"use client"

import { Search, Bell, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AppHeader({ title = "Dashboard" }: { title?: string }) {
  const today = new Date()
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" })
  const date = today.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })

  return (
    <header className="sticky top-0 z-10 border-b bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <span className="text-primary">Dash</span>board
        </h1>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl mx-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search your task here..." className="pl-10 bg-muted/50 border-0" />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost" className="relative bg-primary/10 hover:bg-primary/20 text-primary">
            <Bell className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost" className="bg-primary/10 hover:bg-primary/20 text-primary">
            <Calendar className="h-5 w-5" />
          </Button>
          <div className="text-right">
            <p className="font-semibold text-sm">{dayName}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
