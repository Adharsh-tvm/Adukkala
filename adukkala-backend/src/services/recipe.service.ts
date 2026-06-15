import axios from "axios";
import { ApiError } from "../utils/api-error";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";

const API_KEY = process.env.SPOONACULAR_API_KEY;

class RecipeService {
    async searchRecipes(query: string, page: number = 1, limit: number = 12) {
        const offset = (page - 1) * limit;

        try {
            const response = await axios.get(
                "https://api.spoonacular.com/recipes/complexSearch",
                {
                    params: {
                        apiKey: API_KEY,
                        query,
                        number: limit,
                        offset,
                        addRecipeInformation: true
                    }
                }
            );

            const total = response.data.totalResults;

            return {
                recipes: response.data.results.map(
                    (recipe: {
                        id: number;
                        title: string;
                        image: string;
                        summary: string;
                        readyInMinutes: number;
                    }) => ({
                        id: recipe.id,
                        title: recipe.title,
                        image: recipe.image,
                        summary: recipe.summary,
                        readyInMinutes: recipe.readyInMinutes
                    })
                ),
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.COMMON.SERVER_ERROR);
        }
    }

    async getRecipeById(recipeId: number) {
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/${recipeId}/information`,
                {
                    params: {
                        apiKey: API_KEY,
                        includeNutrition: true
                    }
                }
            );

            return response.data;
        } catch {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.RECIPE.NOT_FOUND);
        }
    }
}

export const recipeService = new RecipeService();