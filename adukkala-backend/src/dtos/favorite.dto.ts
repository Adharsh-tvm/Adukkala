export interface CreateFavoriteDto {
    recipeId: number;
    title: string;
    image: string;
}

export interface FavoriteResponseDto {
    id: string;
    recipeId: number;
    title: string;
    image: string;
    userId: string;
    createdAt: Date;
}

export interface GetFavoritesResponseDto {
    favorites: FavoriteResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface DeleteFavoriteResponseDto {
    message: string;
}
