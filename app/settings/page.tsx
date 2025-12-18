"use client"

import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title="Settings" />

        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-4xl">
            <div className="rounded-2xl border bg-card p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Account Information</h2>
                <button className="text-sm underline hover:no-underline">Go Back</button>
              </div>

              {/* Profile Section */}
              <div className="flex items-center gap-4 mb-8">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Shyamal" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">SH</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">Shyamal</h3>
                  <p className="text-muted-foreground">shyamal@example.com</p>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Shyamal" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" className="bg-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="shyamal@example.com" className="bg-white" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" type="tel" className="bg-white" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" defaultValue="Student / Developer" className="bg-white" />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="bg-[#FF5A3D] hover:bg-[#FF5A3D]/90">Update Info</Button>
                  <Button className="bg-[#FF5A3D] hover:bg-[#FF5A3D]/90">Change Password</Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
