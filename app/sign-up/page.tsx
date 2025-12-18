"use client"

import { User, Mail, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"
import { useAppStore } from "@/lib/store"

export default function SignUpPage() {
  const router = useRouter()
  const register = useAppStore((state) => state.register)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms")
      return
    }

    const success = register(
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        contactNumber: "",
        position: "",
      },
      formData.password,
    )

    if (success) {
      router.push("/sign-in?registered=true")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-12">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/signup.png"
              alt="Sign up illustration"
              width={400}
              height={600}
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center p-12 bg-white">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-foreground">Sign Up</h1>

            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* First Name Input */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
                <Input
                  type="text"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="pl-12 h-14 bg-white border-2 border-border rounded-xl"
                />
              </div>

              {/* Last Name Input */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
                <Input
                  type="text"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="pl-12 h-14 bg-white border-2 border-border rounded-xl"
                />
              </div>

              {/* Username Input */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
                <Input
                  type="text"
                  placeholder="Enter Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="pl-12 h-14 bg-white border-2 border-border rounded-xl"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
                <Input
                  type="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-12 h-14 bg-white border-2 border-border rounded-xl"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
                <Input
                  type="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-12 h-14 bg-white border-2 border-border rounded-xl"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-12 h-14 bg-white border-2 border-border rounded-xl"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm font-medium text-foreground cursor-pointer">
                  I agree to all terms
                </label>
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-base font-semibold rounded-xl"
              >
                Register
              </Button>

              {/* Sign In Link */}
              <p className="text-sm text-center text-foreground">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-blue-600 hover:underline font-medium">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
