              import { IRecipeRepository, RecipeItem } from "../repositories/interfaces/IRecipeRepository";
import { ApiError } from "../utils/api-error";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";

export class RecipeService {
    constructor(private recipeRepo: IRecipeRepository) {}

    async searchRecipes(query: string, page: number = 1, limit: number = 12) {
        const offset = (page - 1) * limit;

        try {
            const data = await this.recipeRepo.search(query, limit, offset);

            return {
                recipes: data.results.map((recipe: RecipeItem) => ({
                    id: recipe.id,
                    title: recipe.title,
                    image: recipe.image,
                    summary: recipe.summary,
                    readyInMinutes: recipe.readyInMinutes,
                })),
                total: data.totalResults,
                page,
                limit,
                totalPages: Math.ceil(data.totalResults / limit),
            };
        } catch {
            throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.COMMON.SERVER_ERROR);
        }
    }

    async getRecipeById(recipeId: number) {
        try {
            return await this.recipeRepo.getById(recipeId);
        } catch {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.RECIPE.NOT_FOUND);
        }
    }
}