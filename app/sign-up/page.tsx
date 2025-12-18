import { User, Mail, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-12">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/signup-illustration.png"
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

            <form className="space-y-5">
              {/* First Name Input */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
                <Input
                  type="text"
                  placeholder="Enter First Name"
                  className="pl-12 h-14 bg-white border-2 border-border rounded-xl"
                />
              </div>

              {/* Last Name Input */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
                <Input
                  type="text"
                  placeholder="Enter Last Name"
                  className="pl-12 h-14 bg-white border-2 border-border rounded-xl"
                />
              </div>

              {/* Username Input */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
                <Input
                  type="text"
                  placeholder="Enter Username"
                  className="pl-12 h-14 bg-white border-2 border-border rounded-xl"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
                <Input
                  type="email"
                  placeholder="Enter Email"
                  className="pl-12 h-14 bg-white border-2 border-border rounded-xl"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
                <Input
                  type="password"
                  placeholder="Enter Password"
                  className="pl-12 h-14 bg-white border-2 border-border rounded-xl"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="pl-12 h-14 bg-white border-2 border-border rounded-xl"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm font-medium text-foreground cursor-pointer">
                  I agree to all terms
                </label>
              </div>

              {/* Register Button */}
              <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-base font-semibold rounded-xl">
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
