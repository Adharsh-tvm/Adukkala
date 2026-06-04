import axios from "axios";
import { number } from "zod";
import { ApiError } from "../utils/api-error";

const API_KEY = process.env.SPOONACULAR_API_KEY;

class RecipeService {

    async searchRecipes(
        query: string,
        page: number
    ) {
        const pageSize = 10;
        const offset = (page - 1) * pageSize;

        try {
            const response = await axios.get(
                "https://api.spoonacular.com/recipes/complexSearch",
                {
                    params: {
                        apiKey: API_KEY,
                        query,
                        number: pageSize,
                        offset,
                        addRecipeInformation: true
                    }
                }
            );

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
                total: response.data.totalResults
            };
        } catch (error) {
            throw new ApiError(
                500,
                "Failed to fetch recipes"
            );
        }
    }

    async getRecipeById(
        recipeId: number
    ) {
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
            throw new ApiError(
                404,
                "Recipe not found"
            );
        }
    }
}

export const recipeService = new RecipeService();