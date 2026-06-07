import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center select-none">
      <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
        404 - Page Not Found
      </h2>
      <p className="text-gray-500 font-medium max-w-sm mb-6">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        href="/"
        className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-xl transition-all duration-150 shadow-md shadow-orange-500/10 cursor-pointer active:scale-95"
      >
        Go Home
      </Link>
    </div>
  );
}
