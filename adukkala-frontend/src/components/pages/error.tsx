"use client";

import React, { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center select-none">
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
        Something went wrong!
      </h2>
      <p className="text-gray-500 font-medium max-w-sm mb-6">
        An unexpected error occurred. Please try reloading the page.
      </p>
      <button
        onClick={() => reset()}
        className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-xl transition-all duration-150 shadow-md shadow-orange-500/10 cursor-pointer active:scale-95"
      >
        Try again
      </button>
    </div>
  );
}
