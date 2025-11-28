import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import certicodeLogo from "@/assets/certicode.png";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset previous error

    if (!fullName || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const success = await register(fullName, email, password);
      if (success) {
        navigate("/dashboard"); // Redirect on successful registration
      } else {
        setError("Email already registered. Try another.");
      }
    } catch (err: any) {
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
          <img
            src={certicodeLogo}
            alt="Certicode Logo"
            className="w-16 h-16 object-contain"
          />
          <h1 className="text-3xl text-center font-extrabold text-[#1C1C1C]">
            Certicode Platform
          </h1>
          <h2 className="text-lg text-center font-semibold text-[#1C1C1C]">
            Sign up to your account
          </h2>
          <p className="text-sm text-center text-gray-500">
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
              placeholder="Email Address"
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

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex grow border-t border-gray-300"></div>
              <span className="mx-3 text-sm text-gray-400">Or sign up with</span>
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
  );
}
