import { SearchRecipeResponseDto, RecipeDetailResponseDto } from "../../dtos/recipe.dto";

export interface IRecipeService {
    searchRecipes(query: string, page?: number, limit?: number): Promise<SearchRecipeResponseDto>;
    getRecipeById(recipeId: number): Promise<RecipeDetailResponseDto>;
}
