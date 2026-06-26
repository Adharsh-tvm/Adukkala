import { IRecipeRepository, RecipeItem } from "../repositories/interfaces/IRecipeRepository";
import { SearchRecipeResponseDto, RecipeDetailResponseDto } from "../dtos/recipe.dto";
import { RecipeMapper } from "../mappers/recipe.mapper";
import { ApiError } from "../utils/api-error";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";

import { IRecipeService } from "./interfaces/IRecipeService";

export class RecipeService implements IRecipeService {
    constructor(private recipeRepo: IRecipeRepository) {}

    async searchRecipes(query: string, page: number = 1, limit: number = 12, filters?: { diet?: string; cuisine?: string; sort?: string; sortDirection?: string }): Promise<SearchRecipeResponseDto> {
        const offset = (page - 1) * limit;

        try {
            const data = await this.recipeRepo.search(query, limit, offset, filters);

            return RecipeMapper.toSearchRecipeResponseDto(data, page, limit);
        } catch {
            throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.COMMON.SERVER_ERROR);
        }
    }

    async getRecipeById(recipeId: number): Promise<RecipeDetailResponseDto> {
        try {
            return (await this.recipeRepo.getById(recipeId)) as RecipeDetailResponseDto;
        } catch {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.RECIPE.NOT_FOUND);
        }
    }
}