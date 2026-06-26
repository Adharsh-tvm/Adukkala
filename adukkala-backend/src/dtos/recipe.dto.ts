export interface SearchRecipeDto {
    query: string;
    page?: number;
    limit?: number;
}

export interface RecipeItemDto {
    id: number;
    title: string;
    image: string;
    summary: string;
    readyInMinutes: number;
}

export interface SearchRecipeResponseDto {
    recipes: RecipeItemDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface RecipeDetailResponseDto {
    [key: string]: any;
}
