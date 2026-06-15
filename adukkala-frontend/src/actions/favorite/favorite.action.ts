"use server";

import { getAccessToken } from "@/lib/auth/cookies";
import { favoriteService } from "@/services/favorite.service";
import type { CreateFavoriteDto } from "@/types/favorite.types";

export async function getFavoritesAction(
  page: number = 1,
  limit: number = 4
) {
  const token =
    await getAccessToken();

  if (!token) {
    return { success: false, data: null };
  }

  try {
    const data =
      await favoriteService.getFavorites(token, page, limit);

    return { success: true, data };
  } catch (error: unknown) {
    return { success: false, data: null, message: error instanceof Error ? error.message : "An unexpected error occurred", };
  }
}

export async function addFavoriteAction(payload: CreateFavoriteDto) {
  const token = await getAccessToken();
  if (!token) return { success: false, message: "Unauthorized" };

  try {
    await favoriteService.addFavorite(token, payload);
    return { success: true };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

export async function removeFavoriteAction(recipeId: number) {
  const token = await getAccessToken();
  if (!token) return { success: false, message: "Unauthorized" };

  try {
    await favoriteService.removeFavorite(token, recipeId);
    return { success: true };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}
