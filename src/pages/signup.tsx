import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Eye, EyeOff, Calendar, ArrowLeft } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter(); // Router for navigation

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden border border-gray-300">
        
        {/* Left Side Image (Hidden on Small Screens) */}
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src="/image21.png"
            alt="Sign Up"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-10 flex flex-col">
          {/* 🔹 Back Button */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-gray-600 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" /> Back to Home
          </button>

          <h2 className="text-3xl font-serif mb-6 text-center md:text-left">Sign Up</h2>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Full Name Input */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Date of Birth Input */}
          <div className="relative">
            <input
              type="date"
              className="w-full border border-gray-300 p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Calendar className="absolute right-3 top-3 text-gray-400" size={20} />
          </div>

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

          {/* Sign Up Button */}
          <button className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition">
            Sign Up
          </button>

          {/* Already have an account? Sign In */}
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link href="/account" className="text-blue-500 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}