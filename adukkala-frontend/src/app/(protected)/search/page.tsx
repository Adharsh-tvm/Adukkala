"use client";

import React, {
  useState,
  useEffect,
  Suspense,
} from "react";
import {
  useSearchParams,
  useRouter,
} from "next/navigation";
import {
  Search,
  Loader2,
} from "lucide-react";

import Header from "@/components/layout/Header";
import RecipeCard from "@/components/recipe/RecipeCard";
import Pagination from "@/components/common/Pagination";


import type { Recipe } from "@/types/recipe.types";
import { searchRecipesAction } from "@/actions/recipes/recipe.actions";

function SearchContent() {
  const searchParams =
    useSearchParams();

  const router = useRouter();

  const queryParam =
    searchParams.get("query") || "";

  const page =
    Number(
      searchParams.get("page")
    ) || 1;

  const limit =
    Number(
      searchParams.get("limit")
    ) || 12;

  const dietParam = searchParams.get("diet") || "";
  const cuisineParam = searchParams.get("cuisine") || "";
  const sortParam = searchParams.get("sort") || "";
  const sortDirectionParam = searchParams.get("sortDirection") || "";

  const [query, setQuery] = useState(queryParam);
  const [diet, setDiet] = useState(dietParam);
  const [cuisine, setCuisine] = useState(cuisineParam);
  const [sort, setSort] = useState(sortParam);
  const [sortDirection, setSortDirection] = useState(sortDirectionParam);

  const [recipes, setRecipes] =
    useState<Recipe[]>([]);

  const [totalPages, setTotalPages] =
    useState(1);

  const [isLoading, setIsLoading] =
    useState(false);

  const [hasSearched, setHasSearched] =
    useState(!!queryParam);

  const performSearch = React.useCallback(async (searchQuery: string, searchDiet: string, searchCuisine: string, searchSort: string, searchSortDirection: string) => {
    if (!searchQuery.trim()) {
      setRecipes([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);

    try {
      const result = await searchRecipesAction(searchQuery, page, limit, searchDiet, searchCuisine, searchSort, searchSortDirection);

      setRecipes(result.recipes || []);
      setTotalPages(result.totalPages || 1);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(queryParam);
    setDiet(dietParam);
    setCuisine(cuisineParam);
    setSort(sortParam);
    setSortDirection(sortDirectionParam);

    if (queryParam) {
      performSearch(queryParam, dietParam, cuisineParam, sortParam, sortDirectionParam);
    }
  }, [queryParam, dietParam, cuisineParam, sortParam, sortDirectionParam, page, limit, performSearch]);

  const handleSearch = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!query.trim()) return;

    let url = `/search?query=${encodeURIComponent(query)}&page=1&limit=${limit}`;
    if (diet) url += `&diet=${encodeURIComponent(diet)}`;
    if (cuisine) url += `&cuisine=${encodeURIComponent(cuisine)}`;
    if (sort) url += `&sort=${encodeURIComponent(sort)}`;
    if (sortDirection) url += `&sortDirection=${encodeURIComponent(sortDirection)}`;

    router.push(url);
  };

  const handleApplyFilters = () => {
    if (!query.trim()) return;

    let url = `/search?query=${encodeURIComponent(query)}&page=1&limit=${limit}`;
    if (diet) url += `&diet=${encodeURIComponent(diet)}`;
    if (cuisine) url += `&cuisine=${encodeURIComponent(cuisine)}`;
    if (sort) url += `&sort=${encodeURIComponent(sort)}`;
    if (sortDirection) url += `&sortDirection=${encodeURIComponent(sortDirection)}`;

    router.push(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Search & Filters Area */}
        <div className="w-full max-w-4xl mx-auto mt-2 space-y-4">
          {/* Search Bar */}
          <form
            onSubmit={
              handleSearch
            }
            className="relative"
          >
            <input
              type="text"
              value={query}
              onChange={(e) =>
                setQuery(
                  e.target.value
                )
              }
              placeholder="Search for recipes..."
              className="w-full px-6 py-4 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg pr-14"
            />

            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full hover:bg-primary-hover transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>

          {/* Top Filter Panel */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-5 items-end">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {/* Diet */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 px-1">Diet</label>
                <select
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-gray-700 font-medium transition-all cursor-pointer"
                >
                  <option value="">Any</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Gluten Free">Gluten Free</option>
                  <option value="Ketogenic">Keto</option>
                  <option value="Paleo">Paleo</option>
                </select>
              </div>

              {/* Cuisine */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 px-1">Cuisine</label>
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-gray-700 font-medium transition-all cursor-pointer"
                >
                  <option value="">Any</option>
                  <option value="Italian">Italian</option>
                  <option value="Indian">Indian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Asian">Asian</option>
                  <option value="American">American</option>
                  <option value="Mediterranean">Mediterranean</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 px-1">Sort By</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-gray-700 font-medium transition-all cursor-pointer"
                >
                  <option value="">Relevance</option>
                  <option value="popularity">Popularity</option>
                  <option value="healthiness">Healthiness</option>
                  <option value="time">Prep Time</option>
                  <option value="calories">Calories</option>
                </select>
              </div>

              {/* Order */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 px-1">Order</label>
                <select
                  value={sortDirection}
                  onChange={(e) => setSortDirection(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-gray-700 font-medium transition-all cursor-pointer disabled:opacity-50"
                  disabled={!sort}
                >
                  <option value="desc">Desc</option>
                  <option value="asc">Asc</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleApplyFilters}
              className="w-full md:w-auto px-8 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="w-full">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          ) : hasSearched &&
            recipes.length === 0 ? (
            <div className="text-center py-20 text-gray-500 text-lg">
              No recipes found for &quot;
              {queryParam}&quot;.
              Try another search
              term!
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipes.map(
                  (recipe) => (
                    <RecipeCard
                      key={
                        recipe.id
                      }
                      recipe={
                        recipe
                      }
                    />
                  )
                )}
              </div>

              <Pagination
                currentPage={page}
                totalPages={
                  totalPages
                }
                onPageChange={(
                  newPage
                ) => {
                  let url = `/search?query=${encodeURIComponent(queryParam)}&page=${newPage}&limit=${limit}`;
                  if (dietParam) url += `&diet=${encodeURIComponent(dietParam)}`;
                  if (cuisineParam) url += `&cuisine=${encodeURIComponent(cuisineParam)}`;
                  if (sortParam) url += `&sort=${encodeURIComponent(sortParam)}`;
                  if (sortDirectionParam) url += `&sortDirection=${encodeURIComponent(sortDirectionParam)}`;
                  router.push(url);
                }}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}