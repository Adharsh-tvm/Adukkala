"use server";

import { revalidatePath } from "next/cache";

import { getToken } from "@/lib/auth";

import { favoriteService } from "@/services/favorite.service";

import { CreateFavoriteDto } from "@/types/favorite.types";

export async function addFavoriteAction(
    payload: CreateFavoriteDto
) {
    const token =
        await getToken();

    if (!token) {
        throw new Error(
            "Unauthorized"
        );
    }

    await favoriteService.addFavorite(
        token,
        payload
    );

    revalidatePath("/favorites");

    return {
        success: true,
    };
}