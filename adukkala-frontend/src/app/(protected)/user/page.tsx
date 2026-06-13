"use client";

import Header from "@/components/layout/Header";
import CategoryCard from "@/components/home/CategoryCard";

export default function DashboardPage() {
  const categories = [
    {
      title: "Dinner",
      imageSrc: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
      href: "/search?query=dinner",
    },
    {
      title: "Salads",
      imageSrc: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
      href: "/search?query=salads",
    },
    {
      title: "Healthy",
      imageSrc: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
      href: "/search?query=healthy",
    },
    {
      title: "Quick and Easy",
      imageSrc: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=800&auto=format&fit=crop",
      href: "/search?query=quick",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12">
        
        {/* Banner Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 font-serif tracking-wide">
            Adukkala
          </h1>
          <p className="text-gray-500 italic tracking-widest text-sm sm:text-base">
            SIMPLE RECIPES MADE FOR <span className="text-primary/80 font-serif">real, actual, everyday life.</span>
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              imageSrc={category.imageSrc}
              href={category.href}
            />
          ))}
        </div>

      </main>
    </div>
  );
}
