import React, { ReactNode } from "react";
import { Utensils } from "lucide-react";

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
    <div className="min-h-screen w-full flex bg-gray-50/50">
      {/* Left Panel - Hero/Branding (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-50 to-orange-100/50 p-12 flex-col justify-between relative overflow-hidden border-r border-orange-100/30 select-none">
        {/* Abstract Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth="1.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Top Branding Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <Utensils className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Adukkala
            </span>
            <div className="h-1 w-6 bg-secondary rounded-full mt-0.5" />
          </div>
        </div>

        {/* Middle Illustration / Intro */}
        <div className="my-auto flex flex-col items-center text-center max-w-md mx-auto relative z-10">
          {/* Floating Premium SVG illustration */}
          <div className="w-72 h-72 mb-8 animate-float drop-shadow-2xl">
            <svg
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Table/Surface base */}
              <ellipse cx="200" cy="320" rx="150" ry="25" fill="#E2E8F0" />
              <ellipse cx="200" cy="320" rx="130" ry="15" fill="#CBD5E1" />

              {/* Cooking Pot/Pan */}
              <rect
                x="120"
                y="220"
                width="160"
                height="90"
                rx="20"
                fill="url(#panGrad)"
              />
              {/* Pan handles */}
              <rect
                x="90"
                y="245"
                width="30"
                height="10"
                rx="5"
                fill="#475569"
              />
              <rect
                x="280"
                y="245"
                width="30"
                height="10"
                rx="5"
                fill="#475569"
              />
              {/* Lid */}
              <path d="M 125 210 Q 200 170 275 210 Z" fill="#64748B" />
              <circle cx="200" cy="180" r="12" fill="#475569" />

              {/* Steam rising */}
              <path
                d="M 170 150 Q 160 120 180 90 T 170 50"
                stroke="#FF6B35"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="2 4"
                className="animate-pulse-slow"
              />
              <path
                d="M 205 160 Q 215 130 195 100 T 215 60"
                stroke="#4CAF50"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="2 4"
                className="animate-pulse-slow"
              />
              <path
                d="M 240 150 Q 230 120 250 90 T 240 50"
                stroke="#FF6B35"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="2 4"
                className="animate-pulse-slow"
              />

              {/* Floating vegetables */}
              {/* Tomato */}
              <g transform="translate(60, 150)">
                <circle cx="25" cy="25" r="20" fill="#EF4444" />
                <path
                  d="M 20 8 Q 25 15 20 20"
                  stroke="#15803D"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M 28 8 Q 25 15 28 20"
                  stroke="#15803D"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M 25 5 Q 25 2 27 0"
                  stroke="#15803D"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>

              {/* Carrot */}
              <g transform="translate(300, 140) rotate(25)">
                <path d="M10,10 Q25,0 55,20 Q25,35 10,20 Z" fill="#F97316" />
                {/* Leaves */}
                <path
                  d="M10,15 Q-5,10 -15,18"
                  stroke="#22C55E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10,15 Q-5,22 -10,32"
                  stroke="#22C55E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>

              {/* Broccoli / Leaf */}
              <g transform="translate(310, 240) rotate(-15)">
                <circle cx="20" cy="20" r="14" fill="#22C55E" />
                <circle cx="32" cy="25" r="10" fill="#15803D" />
                <circle cx="15" cy="30" r="11" fill="#16A34A" />
                <rect
                  x="20"
                  y="32"
                  width="6"
                  height="15"
                  rx="3"
                  fill="#854D0E"
                />
              </g>

              {/* Chef Hat */}
              <g transform="translate(160, 20) scale(0.2)">
                <path
                  d="M 100 200 C 100 120 180 80 250 120 C 320 80 400 120 400 200 C 400 210 390 220 380 220 L 120 220 C 110 220 100 210 100 200 Z"
                  fill="white"
                  stroke="#E2E8F0"
                  strokeWidth="8"
                />
                <rect
                  x="140"
                  y="210"
                  width="220"
                  height="40"
                  fill="#FF6B35"
                  rx="10"
                />
              </g>

              {/* Gradients */}
              <defs>
                <linearGradient
                  id="panGrad"
                  x1="120"
                  y1="220"
                  x2="280"
                  y2="310"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF6B35" />
                  <stop offset="1" stopColor="#E85A24" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-md text-gray-600 font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Footer Information */}
        <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-gray-500">
          <span>&copy; {new Date().getFullYear()} Adukkala.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Card Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 sm:p-8">
        <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}
