import axios from "axios";
import {
    IRecipeRepository,
    RecipeSearchResult,
} from "../../interfaces/IRecipeRepository";

const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export class SpoonacularRecipeRepository implements IRecipeRepository {
    async search(query: string, limit: number, offset: number, filters?: { diet?: string; cuisine?: string; sort?: string; sortDirection?: string }): Promise<RecipeSearchResult> {
        const params: any = {
            apiKey: API_KEY,
            query,
            number: limit,
            offset,
            addRecipeInformation: true,
        };

        if (filters?.diet) {
            params.diet = filters.diet;
        }

        if (filters?.cuisine) {
            params.cuisine = filters.cuisine;
        }

        if (filters?.sort) {
            params.sort = filters.sort;
        }

        if (filters?.sortDirection) {
            params.sortDirection = filters.sortDirection;
        }

        const response = await axios.get<RecipeSearchResult>(`${BASE_URL}/complexSearch`, {
            params,
        });

        return response.data;
    }

    async getById(recipeId: number): Promise<unknown> {
        const response = await axios.get(`${BASE_URL}/${recipeId}/information`, {
            params: {
                apiKey: API_KEY,
                includeNutrition: true,
            },
        });

        return response.data;
    }
}
