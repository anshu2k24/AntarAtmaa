"use client";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import Features from "@/components/Features";
import About from "@/components/About";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <>
    <main className="bg-background text-foreground">

      <Hero />
      <Features />
      <About />
      <Reviews />
      <CallToActionSection />
      <Footer />
    </main>
    </>
  );
}
