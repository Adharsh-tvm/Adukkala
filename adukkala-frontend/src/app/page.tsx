"use client"

import Image from "next/image";
import Link from "next/link";
import { Utensils, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {

const router = useRouter();
router.refresh()

  return (
    <div className="min-h-screen max-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 bg-orange-50 overflow-hidden">
      {/* Full Screen Background Image */}
      <Image 
        src="/images/auth-bg-light.png" 
        alt="Bright and airy cooking scene with fresh vegetables" 
        fill 
        className="object-cover opacity-95 scale-105"
        priority
      />
      
      {/* Overlay to ensure readability */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[3px]"></div>

      {/* Top Branding */}
      <div className="absolute top-4 left-6 md:top-6 md:left-10 z-20 flex items-center gap-2 animate-fadeIn">
        <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
          <Utensils className="h-4 w-4 md:h-5 md:w-5" />
        </div>
        <div>
          <span className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">
            Adukkala
          </span>
          <div className="h-1 w-6 bg-secondary rounded-full mt-0.5 shadow-xs" />
        </div>
      </div>

      {/* Main Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-lg bg-white/70 border border-white/60 rounded-3xl p-8 md:p-12 shadow-2xl shadow-orange-900/10 backdrop-blur-xl animate-fadeIn text-center flex flex-col items-center">
        <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/40 mix-blend-overlay"></div>
        
        <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
          <Utensils className="h-10 w-10" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 drop-shadow-sm">
          Welcome to Adukkala
        </h1>
        
        <p className="text-gray-700 text-lg mb-10 font-medium">
          Your personal recipe book and gateway to a world of flavors. Join our community of food lovers today.
        </p>
        
        <div className="flex flex-col w-full gap-4 relative z-10">
          <Link 
            href="/login"
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg shadow-orange-500/30 hover:bg-primary-hover hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            Sign In
            <ArrowRight className="h-5 w-5" />
          </Link>
          
          <Link 
            href="/register"
            className="w-full flex items-center justify-center py-4 px-6 rounded-2xl bg-white border-2 border-gray-100 text-gray-800 font-bold text-lg shadow-sm hover:border-gray-200 hover:bg-gray-50 transition-all duration-200"
          >
            Create an Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-6 right-6 md:bottom-6 md:left-10 md:right-10 z-20 flex flex-col md:flex-row items-center justify-between text-xs font-bold text-gray-700 animate-fadeIn gap-2">
        <span>&copy; {new Date().getFullYear()} Adukkala.</span>
      </div>
    </div>
  );
}