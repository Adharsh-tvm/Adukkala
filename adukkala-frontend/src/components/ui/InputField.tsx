import React, { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, id, type = "text", className, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-gray-700 select-none cursor-pointer"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 shadow-xs hover:border-gray-400 disabled:opacity-50 disabled:bg-gray-50",
            error && "border-red-500 hover:border-red-500 focus:ring-red-400",
            className
          )}
          {...props}
        />
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

InputField.displayName = "InputField";

export default InputField;
