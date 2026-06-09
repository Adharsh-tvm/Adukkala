import React, { ReactNode } from "react";
import { Utensils } from "lucide-react";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-8 bg-orange-50 overflow-hidden">
      {/* Full Screen Background Image */}
      <Image 
        src="/images/auth-bg-light.png" 
        alt="Bright and airy cooking scene with fresh vegetables" 
        fill 
        className="object-cover opacity-95 scale-105"
        priority
      />
      
      {/* Overlay to ensure readability of the whole page */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[3px]"></div>

      {/* Top Branding (Absolute) */}
      <div className="absolute top-6 left-6 md:top-10 md:left-12 z-20 flex items-center gap-3 animate-fadeIn">
        <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
          <Utensils className="h-5 w-5 md:h-6 md:w-6" />
        </div>
        <div>
          <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">
            Adukkala
          </span>
          <div className="h-1 md:h-1.5 w-6 md:w-8 bg-secondary rounded-full mt-1 shadow-xs" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-275 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mt-16 lg:mt-0">
        
        {/* Left Side: Hero Text */}
        <div className="hidden lg:flex flex-col max-w-lg animate-fadeIn animation-delay-2000">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-gray-900 drop-shadow-md">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-800 font-semibold leading-relaxed drop-shadow-sm border-l-4 border-primary pl-4">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Side: Auth Form Card (Glassmorphism) */}
        <div className="w-full max-w-md bg-white/70 border border-white/60 rounded-3xl p-8 md:p-10 shadow-2xl shadow-orange-900/10 backdrop-blur-xl hover:shadow-orange-900/20 transition-all duration-500 animate-fadeIn relative">
          
          {/* Subtle inner highlight for the glass effect */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/40 mix-blend-overlay"></div>

          {/* Mobile Hero Text (Visible only on small screens) */}
          <div className="lg:hidden mb-8 text-center relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-700 font-medium">
                {subtitle}
              </p>
            )}
          </div>

          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>

      {/* Footer (Absolute) */}
      <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-12 md:right-12 z-20 flex flex-col md:flex-row items-center justify-between text-xs md:text-sm font-bold text-gray-700 animate-fadeIn gap-4">
        <span>&copy; {new Date().getFullYear()} Adukkala.</span>
        <div className="flex gap-5">
          <a href="#" className="hover:text-primary transition-all">
            Terms of Use
          </a>
          <a href="#" className="hover:text-primary transition-all">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
