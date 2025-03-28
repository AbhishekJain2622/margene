import { useState } from "react";

interface LoginProps {
  closeModal: () => void;
}

export default function Login({ closeModal }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isSignUp ? "Signing up with:" : "Logging in with:", email, password);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Increased width and padding for larger box */}
      <div
        className="bg-white p-10 shadow-lg w-[450px] relative"
        // style={{ fontFamily: "Times New Roman, serif" }} // Ensuring Times New Roman
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-center text-3xl font-semibold mb-6">MARGENE</h2>
        <p className="text-center text-gray-600 mb-4 text-lg">{isSignUp ? "Sign Up" : "Log in"}</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name (Only for Sign Up) */}
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="Full name"
                className="w-full border-b border-gray-400 py-3 px-3 outline-none focus:border-black text-lg"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-400 py-3 px-3 outline-none focus:border-black text-lg"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-400 py-3 px-3 outline-none focus:border-black text-lg"
              required
            />
            {/* Show/Hide Password Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          {/* Forgot Password (Only for Login) */}
          {!isSignUp && (
            <p className="text-right text-gray-500 text-md cursor-pointer">Forgot Password?</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!email || !password}
            className={`w-full py-3 rounded-md text-white text-lg ${
              !email || !password
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {isSignUp ? "Sign Up" : "Log in"}
          </button>
        </form>

        {/* Toggle between Login & Signup */}
        <p className="text-center text-md mt-4">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-black font-semibold cursor-pointer"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
