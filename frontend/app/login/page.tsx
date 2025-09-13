'use client';

import { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle authentication, e.g., with an API call
    console.log('Signing in with:', { email, password });
    
    // On successful login, redirect to the dashboard
    router.push('/dashboard');
  };

  return (
    <div className="bg-[#1e293b] text-white min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center mb-8">
        <FaLock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-400 mt-2">Sign in to your account</p>
      </div>

      <div className="bg-[#2a3648] p-8 md:p-12 rounded-xl shadow-lg w-full max-w-md border border-gray-700">
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#1e293b] rounded-lg text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#1e293b] rounded-lg text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-6 text-sm text-gray-400">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:text-blue-400 font-semibold transition-colors">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;