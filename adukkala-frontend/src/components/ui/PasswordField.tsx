import React, { InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const inputId = id || `password-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const errorId = `${inputId}-error`;

    const toggleVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="w-full flex flex-col gap-1.5 relative">
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-gray-700 select-none cursor-pointer"
        >
          {label}
        </label>
        
        <div className="relative w-full">
          <input
            ref={ref}
            id={inputId}
            type={showPassword ? "text" : "password"}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "w-full pl-4 pr-12 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 shadow-xs hover:border-gray-400 disabled:opacity-50 disabled:bg-gray-50",
              error && "border-red-500 hover:border-red-500 focus:ring-red-400",
              className
            )}
            {...props}
          />
          
          <button
            type="button"
            onClick={toggleVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors select-none focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-sm p-1"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
        
        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-xs font-medium text-red-500 mt-0.5 animate-fadeIn"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
