"use server";

import { recipeService } from "@/services/recipe.service";

export async function searchRecipesAction(
    query: string,
    page: number
) {
    return recipeService.search(
        query,
        page
    );
}