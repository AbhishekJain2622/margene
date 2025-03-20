import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function Account() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter(); // Router for navigation

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden border border-gray-300 bg-white">
        
        {/* Left Side Image (Hidden on Small Screens) */}
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src="/image21.png"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-10 flex flex-col">
          
          {/* 🔹 Back to Home Button */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-gray-600 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" /> Back to Home
          </button>

          <h2 className="text-3xl font-serif mb-6 text-center md:text-left">Sign In</h2>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Password Input with Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Remember Me / Forgot Password */}
          <div className="flex justify-between items-center mb-4 mt-2 text-sm">
            <div>
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <Link href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Sign In
          </button>

          {/* Sign Up Link */}
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}