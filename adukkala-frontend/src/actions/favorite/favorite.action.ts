"use server";

import { getAccessToken } from "@/lib/auth/cookies";
import { favoriteService } from "@/services/favorite.service";
import type { CreateFavoriteDto } from "@/types/favorite.types";

export async function getFavoritesAction() {
  const token = await getAccessToken();
  if (!token) return { success: false, data: [] };
  
  try {
    const data = await favoriteService.getFavorites(token);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, data: [], message: error.message };
  }
}

export async function addFavoriteAction(payload: CreateFavoriteDto) {
  const token = await getAccessToken();
  if (!token) return { success: false, message: "Unauthorized" };

  try {
    await favoriteService.addFavorite(token, payload);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function removeFavoriteAction(recipeId: number) {
  const token = await getAccessToken();
  if (!token) return { success: false, message: "Unauthorized" };

  try {
    await favoriteService.removeFavorite(token, recipeId);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
