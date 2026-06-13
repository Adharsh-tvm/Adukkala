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

  const [query, setQuery] =
    useState(queryParam);

  const [recipes, setRecipes] =
    useState<Recipe[]>([]);

  const [totalPages, setTotalPages] =
    useState(1);

  const [isLoading, setIsLoading] =
    useState(false);

  const [hasSearched, setHasSearched] =
    useState(!!queryParam);

  const performSearch = async (
    searchQuery: string
  ) => {
    if (!searchQuery.trim()) {
      setRecipes([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);

    try {
      const result =
        await searchRecipesAction(
          searchQuery,
          page,
          limit
        );

      setRecipes(
        result.recipes || []
      );

      setTotalPages(
        result.totalPages || 1
      );

      setHasSearched(true);
    } catch (error) {
      console.error(
        "Search failed:",
        error
      );

      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setQuery(queryParam);

    if (queryParam) {
      performSearch(queryParam);
    }
  }, [
    queryParam,
    page,
    limit,
  ]);

  const handleSearch = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(
      `/search?query=${encodeURIComponent(
        query
      )}&page=1&limit=${limit}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Search Bar */}

        <div className="w-full max-w-2xl mx-auto mt-4">
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
        </div>

        {/* Results */}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>
        ) : hasSearched &&
          recipes.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            No recipes found for "
            {queryParam}".
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
                router.push(
                  `/search?query=${encodeURIComponent(
                    queryParam
                  )}&page=${newPage}&limit=${limit}`
                );
              }}
            />
          </>
        )}
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