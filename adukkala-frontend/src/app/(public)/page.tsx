import Link from "next/link";
import { Utensils } from "lucide-react";

export const metadata = {
  title: "Adukkala - Discover, Cook, & Save Your Favorite Recipes",
  description: "Explore thousands of delicious recipes, save your favorite dishes, and manage your custom recipe collections on Adukkala.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-orange-500/20 mb-6 animate-float">
        <Utensils className="h-8 w-8" />
      </div>
      
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
        Adukkala
      </h1>
      
      <p className="text-lg text-gray-600 font-medium max-w-md mb-8">
        Discover, Cook, and Save Your Favorite Recipes. Find thousands of delicious recipes and manage your personal collections.
      </p>
      
      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-xl transition-all duration-150 shadow-md shadow-orange-500/10 active:scale-95 cursor-pointer"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
