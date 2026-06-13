"use client";

import React, { useState, useEffect, use } from "react";
import Header from "@/components/layout/Header";
import { recipeService } from "@/services/recipe.service";
import { getFavoritesAction, addFavoriteAction, removeFavoriteAction } from "@/actions/favorite/favorite.action";
import type { RecipeDetail } from "@/types/recipe.types";
import { Loader2, Heart, Clock, Flame, Utensils } from "lucide-react";
import { toast } from "sonner";

export default function RecipeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const recipeId = parseInt(resolvedParams.id, 10);

  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [recipeData, favoritesResult] = await Promise.all([
          recipeService.getRecipe(recipeId),
          getFavoritesAction()
        ]);
        
        setRecipe(recipeData);

        if (favoritesResult.success && Array.isArray(favoritesResult.data)) {
          const found = favoritesResult.data.some((f: any) => f.recipeId === recipeId);
          setIsFavorite(found);
        }
      } catch (error) {
        console.error("Failed to load recipe", error);
        toast.error("Failed to load recipe details");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (!isNaN(recipeId)) {
      loadData();
    }
  }, [recipeId]);

  const handleToggleFavorite = async () => {
    if (!recipe) return;
    setIsToggling(true);

    if (isFavorite) {
      const res = await removeFavoriteAction(recipeId);
      if (res.success) {
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        toast.error("Failed to remove favorite");
      }
    } else {
      const res = await addFavoriteAction({
        recipeId: recipe.id,
        title: recipe.title,
        image: recipe.image
      });
      if (res.success) {
        setIsFavorite(true);
        toast.success("Added to favorites");
      } else {
        toast.error("Failed to add favorite");
      }
    }
    
    setIsToggling(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center text-gray-500 text-lg">
          Recipe not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pb-20">
      <Header />
      
      {/* Hero Image Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-gray-200">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-5xl mx-auto flex flex-col items-start gap-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {recipe.title}
          </h1>
          
          <div className="flex items-center gap-4 text-white/90 font-medium bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
            {recipe.nutrition?.calories && (
              <div className="flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-orange-400" />
                <span>{recipe.nutrition.calories}</span>
              </div>
            )}
            {recipe.nutrition?.protein && (
              <div className="flex items-center gap-1.5 border-l border-white/20 pl-4">
                <Utensils className="h-4 w-4 text-gray-300" />
                <span>{recipe.nutrition.protein} Protein</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-12 relative">
        
        {/* Floating Action Button */}
        <button
          onClick={handleToggleFavorite}
          disabled={isToggling}
          className={`absolute -top-8 right-6 md:right-12 z-20 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ${
            isFavorite 
              ? "bg-red-500 text-white hover:bg-red-600 shadow-red-500/30" 
              : "bg-white text-gray-400 hover:text-red-500 shadow-gray-200"
          }`}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isToggling ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <Heart className="h-8 w-8" fill={isFavorite ? "currentColor" : "none"} strokeWidth={2} />
          )}
        </button>

        {/* Content Column */}
        <div className="flex-1 flex flex-col gap-10">
          
          {/* Summary */}
          {recipe.summary && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">About this recipe</h2>
              <div 
                className="prose prose-orange max-w-none text-gray-600 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
            </section>
          )}

          {/* Ingredients */}
          {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (
            <section className="bg-orange-50/50 p-6 md:p-8 rounded-3xl border border-orange-100/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif flex items-center gap-2">
                <Utensils className="text-primary h-6 w-6" />
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-gray-700 text-lg">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Instructions */}
          {Array.isArray(recipe.instructions) && recipe.instructions.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif flex items-center gap-2">
                <Clock className="text-primary h-6 w-6" />
                Instructions
              </h2>
              <div className="space-y-6">
                {recipe.instructions.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-gray-100 text-gray-500 font-bold flex items-center justify-center shrink-0 border border-gray-200">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 text-lg pt-1.5 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

      </main>
    </div>
  );
}
