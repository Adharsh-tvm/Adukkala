"use client";


import { LogOut, BookOpen, Heart, Flame } from "lucide-react";

export default function DashboardPage() {
 


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold animate-pulse">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Adukkala
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Welcome and Stats Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-gray-100">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Welcome to Adukkala!
              </h1>
              <p className="mt-1.5 text-gray-500 font-medium">
                Your kitchen helper. Find thousands of delicious recipes and save your favorites.
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="border border-gray-100 bg-gray-50/50 rounded-2xl p-5 flex items-center gap-4 hover:shadow-xs transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  My Collections
                </div>
              </div>
            </div>

            <div className="border border-gray-100 bg-gray-50/50 rounded-2xl p-5 flex items-center gap-4 hover:shadow-xs transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center animate-pulse">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{}</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Favorite Recipes
                </div>
              </div>
            </div>

            <div className="border border-gray-100 bg-gray-50/50 rounded-2xl p-5 flex items-center gap-4 hover:shadow-xs transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                <Flame className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Dishes Cooked
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Recipes Section */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col gap-6">
          <div className="flex flex-col gap-1 select-none">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Discover Delicious Recipes
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              Search by ingredients, cook times, cuisines, or dish names.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
