"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import RecipeCard from "@/components/recipe/RecipeCard";
import Pagination from "@/components/common/Pagination";

import {
  getFavoritesAction,
  removeFavoriteAction,
} from "@/actions/favorite/favorite.action";

import type { Favorite } from "@/types/favorite.types";

import { Loader2, HeartCrack } from "lucide-react";

import { toast } from "sonner";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const limit = 4;

  const fetchFavorites = React.useCallback(async () => {
    setIsLoading(true);

    const result = await getFavoritesAction(page, limit);

    if (result.success && result.data) {
      setFavorites(result.data.favorites);

      setTotalPages(result.data.totalPages);
    } else {
      toast.error("Failed to load favorites");
    }

    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFavorites();
  }, [fetchFavorites]);


  const handleRemoveFavorite = async (id: number) => {
    const result = await removeFavoriteAction(id);

    if (result.success) {
      toast.success("Removed from favorites");

      await fetchFavorites();
    } else {
      toast.error("Failed to remove favorite");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            My Favorites
          </h1>

          <p className="text-gray-500">Your personal collection of recipes.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300 p-8">
            <div className="h-16 w-16 bg-red-50 text-red-300 rounded-full flex items-center justify-center mb-4">
              <HeartCrack className="h-8 w-8" />
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No favorites yet
            </h3>

            <p className="text-gray-500 mb-6 max-w-md">
              You haven&apos;t saved any recipes to your favorites. Start exploring
              and click the heart icon to save them here!
            </p>

            <Link
              href="/search"
              className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors"
            >
              Discover Recipes
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((fav) => (
                <RecipeCard
                  key={fav.recipeId}
                  recipe={{
                    id: fav.recipeId,
                    title: fav.title,
                    image: fav.image,
                  }}
                  isFavorite={true}
                  onToggleFavorite={handleRemoveFavorite}
                />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </main>
    </div>
  );
}
