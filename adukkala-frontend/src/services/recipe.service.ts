import { Recipe, RecipeDetail } from "@/types/recipe.types";
import { api } from "./api/client"
import { ENDPOINTS } from "./api/endpoints";

export const recipeService = {

    async search(
        query: string,
        page: number
    ) {
        const { data } = await api.get<{
            success: boolean;
            data: {
                recipes: Recipe[];
                total: number;
            };
        }>(
            ENDPOINTS.RECIPES.SEARCH,
            {
                params: {
                    query,
                    page,
                }
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
    }
}