"use client"

import { User, Lock, Facebook } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, type FormEvent, useEffect } from "react"
import { useAppStore } from "@/lib/store"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const login = useAppStore((state) => state.login)
  const setUser = useAppStore((state) => state.setUser)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccessMessage("Registration successful! Please sign in with your credentials.")
    }
  }, [searchParams])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    const success = login(username, password)
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid credentials. Please try signing up first.")
    }
  }

  const handleSocialLogin = (provider: string) => {
    // Create a demo user for social login
    const demoUser = {
      firstName: "Social",
      lastName: "User",
      username: `${provider.toLowerCase()}_user`,
      email: `user@${provider.toLowerCase()}.com`,
      contactNumber: "",
      position: "User",
      avatar: "",
    }

    setUser(demoUser)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FF7B6B] p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex items-center justify-center bg-[#FF7B6B] p-12">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/login.png"
              alt="Login illustration"
              width={500}
              height={600}
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center p-12 bg-white">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-foreground">Sign In</h1>

            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                {successMessage}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username Input */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
                <Input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-12 h-14 bg-white border-2 border-border rounded-xl"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
                <Input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-14 bg-white border-2 border-border rounded-xl"
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm font-medium text-foreground cursor-pointer">
                  Remember Me
                </label>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-base font-semibold rounded-xl"
              >
                Login
              </Button>

              {/* Social Login */}
              <div className="space-y-4">
                <p className="text-sm text-foreground">Or, Login with</p>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleSocialLogin("Facebook")}
                    className="h-12 w-12 rounded-lg border-2 hover:bg-muted bg-transparent"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleSocialLogin("Google")}
                    className="h-12 w-12 rounded-lg border-2 hover:bg-muted bg-transparent"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#4285F4"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleSocialLogin("X")}
                    className="h-12 w-12 rounded-lg border-2 hover:bg-muted bg-transparent"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Sign Up Link */}
              <p className="text-sm text-center text-foreground">
                Don't have an account?{" "}
                <Link href="/sign-up" className="text-blue-600 hover:underline font-medium">
                  Create One
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
