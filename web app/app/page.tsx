"use client";
import Hero from "@/components/Hero";
import Help from "@/components/Help";
import Reviews from "@/components/Reviews";
import Features from "@/components/Features";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="bg-background text-foreground">
      {/* SECTIONS */}
      <Hero />
      <Help />
      <Reviews />
      <Features />
      <About />
      <Stats />
      <Footer />
    </main>
  );
}
