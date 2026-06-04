import { Recipe, RecipeDetail } from "@/types/recipe.types";
import { api } from "./api/client"
import { ENDPOINTS } from "./api/endpoints";

export const recipeService = {

    async search(
        query: string,
        page: number
    ) {
        const { data } = await api.get<{
            results: Recipe[];
            totalResults: number;
        }>(
            ENDPOINTS.RECIPES.SEARCH,
            {
                params: {
                    query,
                    page,
                }
            }
        );

        return data;
    },

    async getRecipe(
        id: number
    ): Promise<RecipeDetail> {
        const { data } = await api.get<RecipeDetail>(
            ENDPOINTS.RECIPES.DETAILS(id)
        );

        return data;
    }
}