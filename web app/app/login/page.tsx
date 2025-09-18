"use client";

import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const employeeId = localStorage.getItem("employeeId");
      const organizationId = localStorage.getItem("organizationId");
      const siteId = localStorage.getItem("siteId");

      if (employeeId && organizationId && siteId) {
        router.replace("/dashboard"); // redirect if already logged in
      }
    }
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Attempting to send login request...");

    try {
      const response = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        let errorMessage = "Login failed.";
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Save IDs in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("employeeId", data.employeeId);
        localStorage.setItem("organizationId", data.organizationId);
        localStorage.setItem("siteId", data.siteId);
      }

      // Redirect
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="bg-[#f9f5f0] text-gray-900 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center mb-8">
        <FaLock className="h-12 w-12 text-[#4a5a3c] mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-[#6b5c40] mt-2">Sign in to your account</p>
      </div>

      <div className="bg-[#f3e8d0]/90 p-8 md:p-12 rounded-xl shadow-lg w-full max-w-md border border-[#e6d3a3]">
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#4a3f2a] mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg text-gray-900 border border-[#c7b07a] focus:border-[#4a5a3c] focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#4a3f2a] mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#f9f5f0] rounded-lg text-gray-900 border border-[#c7b07a] focus:border-[#4a5a3c] focus:outline-none transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#4a5a3c] hover:bg-[#3e4730] text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-6 text-sm text-[#6b5c40]">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#4a5a3c] hover:text-[#3e4730] font-semibold transition-colors"
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
