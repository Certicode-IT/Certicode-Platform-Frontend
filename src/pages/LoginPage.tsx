import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import certicodeLogo from "@/assets/certicode.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/dashboard"); 
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {
      // Capture server error messages if any
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F8F8]">
      <Card className="w-[400px] border-none shadow-lg bg-white rounded-2xl">
        <CardHeader className="flex flex-col items-center space-y-2 pt-8">
          <img src={certicodeLogo} alt="Certicode Logo" className="w-16 h-16" />

          <h1 className="text-3xl text-center font-extrabold text-[#1C1C1C]">
            Certicode Platform
          </h1>
          <h2 className="text-lg font-semibold text-center text-[#1C1C1C]">
            Sign in to your account
          </h2>

          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#FF8C00] font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex grow border-t border-gray-300"></div>
              <span className="mx-3 text-sm text-gray-400">Or sign in with</span>
              <div className="flex grow border-t border-gray-300"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex justify-center gap-4">
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
            </div>

            <p className="text-xs text-center text-gray-400 mt-4">
              By signing in, you agree to our{" "}
              <a href="#" className="underline hover:text-gray-600">Terms of Use</a> and{" "}
              <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
