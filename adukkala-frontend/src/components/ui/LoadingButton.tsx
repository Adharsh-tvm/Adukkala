import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export default function LoadingButton({
  children,
  isLoading = false,
  loadingText,
  className,
  disabled,
  type = "submit",
  ...props
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      className={cn(
        "relative w-full flex justify-center items-center px-4 py-3 rounded-xl font-semibold text-white bg-primary hover:bg-primary-hover active:scale-[0.98] transition-all duration-150 select-none shadow-md shadow-orange-500/10 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>{loadingText || children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
