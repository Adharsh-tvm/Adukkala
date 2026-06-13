import { recipeService } from "@/services/recipe.service";

export async function searchRecipesAction(
    query: string,
    page: number = 1,
    limit: number = 12
) {
    try {
        return await recipeService.search(
            query,
            page,
            limit
        );
    } catch (error) {
        console.error(error);

        return {
            recipes: [],
            total: 0,
            page: 1,
            limit,
            totalPages: 0,
        };
    }
}