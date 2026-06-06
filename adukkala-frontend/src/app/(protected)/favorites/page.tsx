import Link from "next/link";
import { Heart } from "lucide-react";

export const metadata = {
  title: "Favorites | Adukkala",
  description: "View and manage your favorite recipes on Adukkala.",
};

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="h-16 w-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-6">
        <Heart className="h-8 w-8 fill-current" />
      </div>
      
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
        My Favorites
      </h1>
      
      <p className="text-gray-500 font-medium max-w-sm mb-6">
        You don't have any favorite recipes saved yet. Start exploring and click the heart icon on recipes you love!
      </p>
      
      <Link
        href="/dashboard"
        className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-xl transition-all duration-150 shadow-md shadow-orange-500/10 cursor-pointer active:scale-95"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
