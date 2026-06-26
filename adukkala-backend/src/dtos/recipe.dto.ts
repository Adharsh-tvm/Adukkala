export interface SearchRecipeDto {
    query: string;
    page?: number;
    limit?: number;
    diet?: string;
    cuisine?: string;
    sort?: string;
    sortDirection?: 'asc' | 'desc';
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
    [key: string]: unknown;
}
