import { CreateFavoriteDto, FavoriteResponseDto, GetFavoritesResponseDto, DeleteFavoriteResponseDto } from "../../dtos/favorite.dto";

export interface IFavoriteService {
    addFavorite(userId: string, data: CreateFavoriteDto): Promise<FavoriteResponseDto>;
    getFavorites(userId: string, page?: number, limit?: number): Promise<GetFavoritesResponseDto>;
    deleteFavorite(userId: string, recipeId: number): Promise<DeleteFavoriteResponseDto>;
}
