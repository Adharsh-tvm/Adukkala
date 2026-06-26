import { RecipeItem, RecipeSearchResult } from "../repositories/interfaces/IRecipeRepository";
import { RecipeItemDto, SearchRecipeResponseDto } from "../dtos/recipe.dto";

export class RecipeMapper {
    static toRecipeItemDto(recipe: RecipeItem): RecipeItemDto {
        return {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            readyInMinutes: recipe.readyInMinutes,
        };
    }

    static toSearchRecipeResponseDto(data: RecipeSearchResult, page: number, limit: number): SearchRecipeResponseDto {
        return {
            recipes: data.results.map(RecipeMapper.toRecipeItemDto),
            total: data.totalResults,
            page,
            limit,
            totalPages: Math.ceil(data.totalResults / limit),
        };
    }
}
