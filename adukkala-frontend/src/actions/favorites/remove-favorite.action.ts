"use server";

import { revalidatePath } from "next/cache";

import { getToken } from "@/lib/auth";

import { favoriteService } from "@/services/favorite.service";

export async function removeFavoriteAction(
    recipeId: number
) {
    const token =
        await getToken();

    if (!token) {
        throw new Error(
            "Unauthorized"
        );
    }

    await favoriteService.removeFavorite(
        token,
        recipeId
    );

    revalidatePath("/favorites");

    return {
        success: true,
    };
}