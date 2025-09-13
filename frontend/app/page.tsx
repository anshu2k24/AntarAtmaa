'use client'

import Hero from '@/components/Hero'
import Features from '@/components/Features'
import About from '@/components/About'
import Stats from '@/components/Stats'
import Footer from '@/components/Footer'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Home() {
  const { theme, setTheme } = useTheme()

  return (
    <main className="bg-background text-foreground">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-xl font-semibold text-primary">RockSafe AI</span>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-primary">Features</a>
            <a href="#about" className="hover:text-primary">About</a>
            <a href="/login" className="hover:text-primary">Login</a>
            <a href="/signup" className="px-3 py-1 rounded-md bg-primary text-primary-foreground">Sign Up</a>
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded hover:bg-muted"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* SECTIONS */}
      <Hero />
      <Features />
      <About />
      <Stats />
      <Footer />
    </main>
  )
}

