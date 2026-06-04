export interface Favorite {
    recipeId: number;
    title: string;
    image: string;
}

export interface CreateFavoriteDto {
    recipeId: number;
    title: string;
    image: string;
}