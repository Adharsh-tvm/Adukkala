import { RecipeDetail, PaginatedRecipes } from "@/types/recipe.types";
import { api } from "./api/client";
import { ENDPOINTS } from "./api/endpoints";

export const recipeService = {
    async search(
        query: string,
        page: number = 1,
        limit: number = 12,
        diet?: string,
        cuisine?: string,
        sort?: string,
        sortDirection?: string
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
                    diet,
                    cuisine,
                    sort,
                    sortDirection,
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