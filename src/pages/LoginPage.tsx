import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { useNavigate, Link } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaApple } from "react-icons/fa"
import certicodeLogo from "@/assets/certicode.png"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(username, password)
    if (success) {
      navigate("/dashboard")
    } else {
      setError("Invalid username or password")
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
            Sign in to your account
          </h2>
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#FF8C00] font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="focus-visible:ring-[#FF8C00]"
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus-visible:ring-[#FF8C00]"
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              className="w-full bg-[#FF8C00] hover:bg-[#e67a00] text-white font-semibold rounded-lg transition-all"
              type="submit"
            >
              SIGN IN
            </Button>

            {/* Divider line */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3 text-sm text-gray-400">Or sign in with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
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
              By signing in, you agree to our{" "}
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
