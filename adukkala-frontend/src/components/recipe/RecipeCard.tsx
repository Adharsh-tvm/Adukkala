import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Recipe } from "@/types/recipe.types";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite }: RecipeCardProps) {
  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Favorite Button Overlay */}
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(recipe.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md shadow-sm transition-all duration-200 ${
            isFavorite 
              ? "bg-red-50 text-red-500 hover:bg-red-100" 
              : "bg-white/70 text-gray-400 hover:bg-white hover:text-red-400"
          }`}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} strokeWidth={2} />
        </button>
      )}

      {/* Image Link */}
      <Link href={`/recipe/${recipe.id}`} className="block relative w-full aspect-4/3 overflow-hidden bg-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallback for broken images
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=600&auto=format&fit=crop";
          }}
        />
        {recipe.readyInMinutes && (
          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
            {recipe.readyInMinutes} MINS
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        <Link href={`/recipe/${recipe.id}`}>
          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {recipe.title}
          </h3>
        </Link>
        {recipe.summary && (
          <p 
            className="text-gray-500 text-sm line-clamp-3 mt-auto"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          />
        )}
      </div>
    </div>
  );
}
