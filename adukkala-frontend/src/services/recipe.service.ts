import { Recipe, RecipeDetail, PaginatedRecipes } from "@/types/recipe.types";
import { api } from "./api/client";
import { ENDPOINTS } from "./api/endpoints";

export const recipeService = {
    async search(
        query: string,
        page: number = 1,
        limit: number = 12
    ): Promise<PaginatedRecipes> {
        const { data } = await api.get<{
            success: boolean;
            data: PaginatedRecipes;
        }>(
            ENDPOINTS.RECIPES.SEARCH,
            {
                params: {
                    query,
                    page,
                    limit,
                },
            }
        );

        return data.data;
    },

    async getRecipe(
        id: number
    ): Promise<RecipeDetail> {
        const { data } = await api.get<{
            success: boolean;
            data: RecipeDetail;
        }>(
            ENDPOINTS.RECIPES.DETAILS(id)
        );

        return data.data;
    },
};