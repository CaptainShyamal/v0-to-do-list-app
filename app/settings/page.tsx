"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/lib/store"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Camera } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const user = useAppStore((state) => state.user)
  const updateUserProfile = useAppStore((state) => state.updateUserProfile)
  const changePassword = useAppStore((state) => state.changePassword)

  const [firstName, setFirstName] = useState(user?.firstName || "")
  const [lastName, setLastName] = useState(user?.lastName || "")
  const [email, setEmail] = useState(user?.email || "")
  const [contactNumber, setContactNumber] = useState(user?.contactNumber || "")
  const [position, setPosition] = useState(user?.position || "")
  const [avatar, setAvatar] = useState(user?.avatar || "")

  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpdateInfo = () => {
    updateUserProfile({
      firstName,
      lastName,
      email,
      contactNumber,
      position,
      avatar,
    })
    setSuccessMessage("Profile updated successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleChangePassword = () => {
    setPasswordError("")

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return
    }

    const success = changePassword(currentPassword, newPassword)

    if (success) {
      setShowPasswordDialog(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setSuccessMessage("Password changed successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } else {
      setPasswordError("Current password is incorrect")
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title="Settings" />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-4xl mx-auto">
            {successMessage && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                {successMessage}
              </div>
            )}

            <div className="rounded-2xl border bg-card p-4 sm:p-6 lg:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <h2 className="text-xl sm:text-2xl font-bold">Account Information</h2>
                <button
                  onClick={() => router.back()}
                  className="text-sm underline hover:no-underline self-start sm:self-auto"
                >
                  Go Back
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <div className="relative group">
                  <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                    <AvatarImage src={avatar || "/placeholder.svg?height=96&width=96"} alt={firstName} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {firstName.charAt(0).toUpperCase()}
                      {lastName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {firstName} {lastName}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{email}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="bg-white"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button onClick={handleUpdateInfo} className="bg-[#FF5A3D] hover:bg-[#FF5A3D]/90 w-full sm:w-auto">
                    Update Info
                  </Button>
                  <Button
                    onClick={() => setShowPasswordDialog(true)}
                    className="bg-[#FF5A3D] hover:bg-[#FF5A3D]/90 w-full sm:w-auto"
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>Enter your current password and choose a new one</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {passwordError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">{passwordError}</div>
            )}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowPasswordDialog(false)
                setPasswordError("")
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleChangePassword} className="bg-[#FF5A3D] hover:bg-[#FF5A3D]/90">
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
