import { SearchRecipeResponseDto, RecipeDetailResponseDto } from "../../dtos/recipe.dto";

export interface IRecipeService {
    searchRecipes(query: string, page?: number, limit?: number, filters?: { diet?: string; cuisine?: string; sort?: string; sortDirection?: string }): Promise<SearchRecipeResponseDto>;
    getRecipeById(recipeId: number): Promise<RecipeDetailResponseDto>;
}
