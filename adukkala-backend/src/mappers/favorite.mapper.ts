import { FavoriteModel } from "../repositories/interfaces/IFavoriteRepository";
import { FavoriteResponseDto, GetFavoritesResponseDto } from "../dtos/favorite.dto";

export class FavoriteMapper {
    static toFavoriteResponseDto(favorite: FavoriteModel): FavoriteResponseDto {
        return {
            id: favorite.id,
            recipeId: favorite.recipeId,
            title: favorite.title,
            image: favorite.image,
            userId: favorite.userId,
            createdAt: favorite.createdAt,
        };
    }

    static toGetFavoritesResponseDto(favorites: FavoriteModel[], total: number, page: number, limit: number): GetFavoritesResponseDto {
        return {
            favorites: favorites.map(FavoriteMapper.toFavoriteResponseDto),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
}
