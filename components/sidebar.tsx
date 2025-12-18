"use client"

import { LayoutDashboard, AlertCircle, CheckSquare, List, Settings, HelpCircle, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Vital Task", href: "/vital-task", icon: AlertCircle },
  { name: "My Task", href: "/my-task", icon: CheckSquare },
  { name: "Task Categories", href: "/task-categories", icon: List },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-[280px] flex-col bg-primary text-primary-foreground">
      {/* User Profile Section */}
      <div className="flex flex-col items-center gap-3 border-b border-primary-foreground/20 p-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Shyamal" />
          <AvatarFallback className="bg-primary-foreground text-primary text-2xl">SH</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="font-semibold text-lg">Shyamal</h2>
          <p className="text-sm text-primary-foreground/80">shyamal@example.com</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white text-primary shadow-sm"
                  : "text-primary-foreground/90 hover:bg-primary-foreground/10",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <Link
          href="/sign-in"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </div>
  )
}
