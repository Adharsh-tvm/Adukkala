"use server";

import { recipeService } from "@/services/recipe.service";

export async function getRecipeAction(
    id: number
) {
    return recipeService.getRecipe(id);
}