"use client"

import type React from "react"

import { LayoutDashboard, AlertCircle, CheckSquare, List, Settings, HelpCircle, LogOut, Camera } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/lib/store"
import { handleImageUpload } from "@/lib/image-utils"
import { useRef } from "react"

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
  const router = useRouter()
  const user = useAppStore((state) => state.user)
  const logout = useAppStore((state) => state.logout)
  const updateUserProfile = useAppStore((state) => state.updateUserProfile)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogout = () => {
    logout()
    router.push("/sign-in")
  }

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const base64Image = await handleImageUpload(event)
    if (base64Image) {
      updateUserProfile({ avatar: base64Image })
    }
  }

  return (
    <div className="flex h-screen w-[280px] flex-col bg-primary text-primary-foreground">
      {/* User Profile Section */}
      <div className="flex flex-col items-center gap-3 border-b border-primary-foreground/20 p-6">
        <div className="relative group">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.avatar || "/placeholder.svg?height=96&width=96"} alt={user?.firstName || "User"} />
            <AvatarFallback className="bg-primary-foreground text-primary text-2xl">
              {user?.firstName?.[0] || "U"}
              {user?.lastName?.[0] || ""}
            </AvatarFallback>
          </Avatar>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Camera className="h-6 w-6 text-white" />
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>
        <div className="text-center">
          <h2 className="font-semibold text-lg">
            {user?.firstName || "User"} {user?.lastName || ""}
          </h2>
          <p className="text-sm text-primary-foreground/80">{user?.email || "user@example.com"}</p>
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
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}
