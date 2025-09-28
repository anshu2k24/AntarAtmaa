"use client";

import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("role");
      if (role === 'admin' && localStorage.getItem('adminId')) {
        router.replace('/admin/dashboard');
      } else if (role === 'employee' && localStorage.getItem('employeeId')) {
        router.replace('/dashboard');
      }
    }
  }, [router]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", { // Using relative path is better
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please check your credentials.");
        return;
      }
      
      console.log("Login successful:", data);

      if (typeof window !== 'undefined') {
        localStorage.setItem('role', data.role);
        
        if (data.role === 'admin') {
          localStorage.setItem('adminId', data.adminId);
          router.push('/approval');
        } else if (data.role === 'employee') {
          localStorage.setItem('employeeId', data.employeeId);
          localStorage.setItem('organizationId', data.organizationId);
          localStorage.setItem('siteId', data.siteId);
          router.push('/dashboard');
        }
      }
      
    } catch (err) {
      console.error("Login fetch error:", err);
      setError("A network error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f2f0ea] text-gray-800 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center mb-8">
        <FaLock className="h-12 w-12 text-[#645e54] mx-auto mb-4 drop-shadow-lg" />
        <h1 className="text-3xl font-bold text-[#373434]">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg text-gray-800 border border-gray-300 focus:border-[#645e54] focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#e8e6e0] rounded-lg text-gray-800 border border-gray-300 focus:border-[#645e54] focus:outline-none transition-colors"
              required
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#645e54] hover:bg-[#868172] text-white font-semibold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#645e54] hover:text-[#868172] font-semibold transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;