"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Search as SearchIcon, 
  Heart, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  Sparkles, 
  UtensilsCrossed 
} from "lucide-react";
import { toast } from "sonner";

import { Recipe } from "@/types/recipe.types";
import { searchRecipesAction } from "@/actions/recipes/search-recipes.action";
import { 
  getFavoritesAction, 
  addFavoriteAction, 
  removeFavoriteAction 
} from "@/actions";

export default function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

  const pageSize = 10;

  // Debounce query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1); // Reset to page 1 on new search
    }, 450);

    return () => clearTimeout(handler);
  }, [query]);

  // Load favorites on mount
  useEffect(() => {
    async function loadFavorites() {
      try {
        const favs = await getFavoritesAction();
        const favIds = new Set(favs.map(f => f.recipeId));
        setFavorites(favIds);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      } finally {
        setIsLoadingFavorites(false);
      }
    }
    loadFavorites();
  }, []);

  // Fetch recipes
  const fetchRecipes = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await searchRecipesAction(debouncedQuery, page);
      if (data) {
        setRecipes(data.recipes || []);
        setTotalResults(data.total || 0);
      } else {
        setRecipes([]);
        setTotalResults(0);
      }
    } catch (err) {
      toast.error("Failed to fetch recipes. Please try again.");
      setRecipes([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedQuery, page]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // Handle favorite toggling
  const handleToggleFavorite = async (e: React.MouseEvent, recipe: Recipe) => {
    e.preventDefault();
    e.stopPropagation();

    const isFav = favorites.has(recipe.id);
    const newFavorites = new Set(favorites);

    if (isFav) {
      newFavorites.delete(recipe.id);
      setFavorites(newFavorites);
      try {
        const result = await removeFavoriteAction(recipe.id);
        if (result.success) {
          toast.success(`Removed "${recipe.title}" from favorites`);
        } else {
          throw new Error("Failed to remove");
        }
      } catch (err) {
        newFavorites.add(recipe.id);
        setFavorites(newFavorites);
        toast.error("Could not remove recipe from favorites");
      }
    } else {
      newFavorites.add(recipe.id);
      setFavorites(newFavorites);
      try {
        const result = await addFavoriteAction({
          recipeId: recipe.id,
          title: recipe.title,
          image: recipe.image
        });
        if (result.success) {
          toast.success(`Added "${recipe.title}" to favorites`);
        } else {
          throw new Error("Failed to add");
        }
      } catch (err) {
        newFavorites.delete(recipe.id);
        setFavorites(newFavorites);
        toast.error("Could not add recipe to favorites");
      }
    }
  };

  const totalPages = Math.ceil(totalResults / pageSize);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
      // Smooth scroll back to search section
      document.getElementById("search-results-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
      // Smooth scroll back to search section
      document.getElementById("search-results-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full" id="search-results-section">
      {/* Search Input Container */}
      <div className="w-full max-w-2xl mx-auto select-none">
        <div className="relative group">
          <div className="absolute inset-0  from-orange-400 to-amber-500 rounded-2xl blur-md opacity-20 group-focus-within:opacity-40 transition-opacity duration-300"></div>
          <div className="relative flex items-center bg-white border border-gray-100 rounded-2xl shadow-xs focus-within:shadow-md focus-within:border-primary/30 transition-all duration-300">
            <div className="pl-4 pr-2 text-gray-400">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              ) : (
                <SearchIcon className="h-5 w-5 group-focus-within:text-primary transition-colors" />
              )}
            </div>
            <input
              type="text"
              placeholder="Search recipes (e.g., Pasta, Chicken, Dessert...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-4 bg-transparent border-0 text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-0 text-base"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-2 mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all cursor-pointer text-sm"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        
        {/* Suggestion tags */}
        <div className="flex flex-wrap gap-2 mt-3 justify-center text-xs text-gray-500">
          <span className="font-semibold text-gray-400 select-none">Suggestions:</span>
          {["Pasta", "Healthy", "Chicken", "Keto", "Dessert"].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-gray-100/60 hover:bg-orange-50 hover:text-primary rounded-full transition-colors cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Results Listing */}
      <div className="w-full mt-2">
        {isLoading ? (
          /* Recipe Card Skeletons */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs animate-pulse flex flex-col h-80"
              >
                <div className="h-44 w-full bg-gray-200"></div>
                <div className="p-5 flex-1 flex flex-col gap-3 justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-gray-200 rounded-md"></div>
                    <div className="h-3 w-1/2 bg-gray-200 rounded-md"></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : recipes.length > 0 ? (
          /* Recipe Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => {
              const isFav = favorites.has(recipe.id);
              return (
                <Link
                  key={recipe.id}
                  href={`/recipe/${recipe.id}`}
                  className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full select-none"
                >
                  {/* Image container with gradient overlay */}
                  <div className="relative h-44 w-full overflow-hidden bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={recipe.image || "/placeholder-recipe.jpg"}
                      alt={recipe.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => handleToggleFavorite(e, recipe)}
                      disabled={isLoadingFavorites}
                      className={`absolute top-4.5 right-4.5 h-9 w-9 rounded-xl flex items-center justify-center shadow-xs backdrop-blur-xs border transition-all active:scale-90 cursor-pointer ${
                        isFav 
                          ? "bg-red-500 border-red-500 text-white" 
                          : "bg-white/80 hover:bg-white border-white/40 text-gray-500 hover:text-red-500"
                      }`}
                    >
                      <Heart className={`h-4.5 w-4.5 ${isFav ? "fill-current" : ""}`} />
                    </button>

                    {/* Cook time badge if present */}
                    {recipe.readyInMinutes && (
                      <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[11px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 backdrop-blur-xs select-none">
                        <Clock className="h-3 w-3 text-orange-400" />
                        <span>{recipe.readyInMinutes}m</span>
                      </div>
                    )}
                  </div>

                  {/* Recipe Metadata */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-primary transition-colors text-base">
                        {recipe.title}
                      </h3>
                      {recipe.summary && (
                        <p 
                          className="text-xs text-gray-400 mt-1.5 line-clamp-2 font-medium"
                          dangerouslySetInnerHTML={{ __html: recipe.summary }}
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4.5 pt-3.5 border-t border-gray-50">
                      <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:underline">
                        <span>View Recipe</span>
                        <Sparkles className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center select-none bg-white border border-gray-50 rounded-3xl shadow-xs">
            <div className="h-16 w-16 rounded-2xl bg-orange-500/5 text-primary flex items-center justify-center mb-6">
              <UtensilsCrossed className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-400 max-w-sm font-medium text-sm">
              We couldn't find any recipes for "{debouncedQuery}". Try refining your search query or choosing one of the popular tags.
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 mt-6 select-none border-t border-gray-100 pt-6">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-xs"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <span className="text-sm font-semibold text-gray-500">
            Page <span className="text-gray-900">{page}</span> of <span className="text-gray-900">{totalPages}</span>
          </span>

          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-xs"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
