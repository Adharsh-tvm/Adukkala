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
    <div className="min-h-screen max-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 bg-orange-50 overflow-hidden">
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

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-275 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 mt-4 lg:mt-0">
        
        {/* Left Side: Hero Text */}
        <div className="hidden lg:flex flex-col max-w-lg animate-fadeIn animation-delay-2000">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-gray-900 drop-shadow-md">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-800 font-semibold leading-relaxed drop-shadow-sm border-l-4 border-primary pl-4">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Side: Auth Form Card (Glassmorphism) */}
        <div className="w-full max-w-md bg-white/70 border border-white/60 rounded-3xl p-6 md:p-8 shadow-2xl shadow-orange-900/10 backdrop-blur-xl hover:shadow-orange-900/20 transition-all duration-500 animate-fadeIn relative">
          
          {/* Subtle inner highlight for the glass effect */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/40 mix-blend-overlay"></div>

          {/* Mobile Hero Text (Visible only on small screens) */}
          <div className="lg:hidden mb-4 text-center relative z-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-1">
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
      <div className="absolute bottom-4 left-6 right-6 md:bottom-6 md:left-10 md:right-10 z-20 flex flex-col md:flex-row items-center justify-between text-xs font-bold text-gray-700 animate-fadeIn gap-2">
        <span>&copy; {new Date().getFullYear()} Adukkala.</span>
        <div className="flex gap-4">
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
