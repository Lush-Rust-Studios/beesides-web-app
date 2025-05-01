import React, { useState } from "react";
import { Link } from "../components/Link";
import { EyeIcon, EyeOffIcon, CheckIcon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    try {
      setError("");
      setIsLoading(true);
      await register(name, username, email, password);
      // After successful registration, redirect to onboarding
      navigate("/onboarding");
    } catch (err) {
      setError("Failed to create an account");
    } finally {
      setIsLoading(false);
    }
  };
  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password)
      return {
        strength: 0,
        text: "",
      };
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    const strengthText = ["Weak", "Fair", "Good", "Strong"];
    return {
      strength,
      text: strengthText[strength - 1] || "",
    };
  };
  const passwordStrength = getPasswordStrength();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-4 md:px-6 lg:px-8 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight">
            BEESIDES
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-gray-600">Join the Beesides community</p>
          </div>
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.toLowerCase().replace(/\s+/g, ""))
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="johndoe"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs">{passwordStrength.text}</div>
                    <div className="text-xs">
                      {password.length}/8+ characters
                    </div>
                  </div>
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength.strength === 1
                          ? "bg-red-500"
                          : passwordStrength.strength === 2
                          ? "bg-yellow-500"
                          : passwordStrength.strength === 3
                          ? "bg-green-500"
                          : passwordStrength.strength === 4
                          ? "bg-green-600"
                          : ""
                      }`}
                      style={{
                        width: `${(passwordStrength.strength / 4) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
                  placeholder="••••••••"
                  required
                />
                {confirmPassword && password === confirmPassword && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                    <CheckIcon size={18} />
                  </div>
                )}
              </div>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-bold disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </form>
          <div className="mt-8 pt-6 border-t text-center">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-black font-bold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex justify-center items-center py-2 px-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <span className="sr-only">Sign up with Google</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.787-1.676-4.139-2.701-6.735-2.701-5.522 0-10.013 4.491-10.013 10.013s4.491 10.013 10.013 10.013c8.025 0 9.939-7.56 9.075-11.693h-9.075z"
                    fill="#4285F4"
                  />
                </svg>
              </button>
              <button className="flex justify-center items-center py-2 px-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <span className="sr-only">Sign up with Apple</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-8 text-xs text-center text-gray-500">
            <p>
              By creating an account, you agree to our{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Beesides. All rights reserved.</p>
      </footer>
    </div>
  );
}
