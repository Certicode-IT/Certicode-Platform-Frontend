import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { useNavigate, Link } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaApple } from "react-icons/fa"
import certicodeLogo from "@/assets/certicode.png" 

export default function SignupPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const register = useAuthStore((s) => s.register)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName || !email || !password) {
      setError("All fields are required")
      return
    }

    const success = register(fullName, email, password)
    if (success) {
      navigate("/dashboard")
    } else {
      setError("Email already registered. Try another.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F8F8]">
      <Card className="w-[400px] border-none shadow-lg bg-white rounded-2xl">
        <CardHeader className="flex flex-col items-center space-y-3 pt-8">
          {/* Logo */}
          <img
            src={certicodeLogo}
            alt="Certicode Logo"
            className="w-16 h-16 object-contain"
          />

          <h1 className="text-3xl font-extrabold text-[#1C1C1C]">
            Certicode Platform
          </h1>
          <h2 className="text-lg font-semibold text-[#1C1C1C]">
            Sign Up to your account
          </h2>
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/" className="text-[#FF8C00] font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="focus-visible:ring-[#FF8C00]"
            />
            <Input
              type="email"
              placeholder="Business Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus-visible:ring-[#FF8C00]"
            />
        
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus-visible:ring-[#FF8C00]"
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-[#FF8C00] hover:bg-[#e67a00] text-white font-semibold transition-all rounded-lg"
            >
              SIGN UP
            </Button>

            <div className="flex items-center my-4">
            <div className="flex grow border-t border-gray-300"></div>
            <span className="mx-3 text-sm text-gray-400">Or sign up with</span>
            <div className="flex grow border-t border-gray-300"></div>    
            </div>


            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                className="w-[30%] flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-100"
              >
                <FaFacebook className="text-[#1877F2]" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-[30%] flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-100"
              >
                <FcGoogle />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-[30%] flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-100"
              >
                <FaApple className="text-black" />
              </Button>
            </div>

            <p className="text-xs text-center text-gray-400 mt-4">
              By signing up, you agree to our{" "}
              <a href="#" className="underline hover:text-gray-600">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-gray-600">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
