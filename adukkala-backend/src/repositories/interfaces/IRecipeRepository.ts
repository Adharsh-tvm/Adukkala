export interface RecipeItem {
    id: number;
    title: string;
    image: string;
    summary: string;
    readyInMinutes: number;
}

export interface RecipeSearchResult {
    results: RecipeItem[];
    totalResults: number;
}

export interface IRecipeRepository {
    search(query: string, limit: number, offset: number): Promise<RecipeSearchResult>;
    getById(recipeId: number): Promise<unknown>;
}
