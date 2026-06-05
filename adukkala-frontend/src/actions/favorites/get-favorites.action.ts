"use server";

import { getToken } from "@/lib/auth";
import { favoriteService } from "@/services/favorite.service";

export async function getFavoritesAction() {
    const token =
        await getToken();

    if (!token) {
        throw new Error(
            "Unauthorized"
        );
    }

    return favoriteService.getFavorites(
        token
    );
}