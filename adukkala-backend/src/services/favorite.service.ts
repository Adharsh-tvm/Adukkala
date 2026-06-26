import { IFavoriteRepository } from "../repositories/interfaces/IFavoriteRepository";
import { CreateFavoriteDto, FavoriteResponseDto, GetFavoritesResponseDto, DeleteFavoriteResponseDto } from "../dtos/favorite.dto";
import { FavoriteMapper } from "../mappers/favorite.mapper";
import { ApiError } from "../utils/api-error";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";

import { IFavoriteService } from "./interfaces/IFavoriteService";

export class FavoriteService implements IFavoriteService {
    constructor(private favoriteRepo: IFavoriteRepository) {}

    async addFavorite(userId: string, data: CreateFavoriteDto): Promise<FavoriteResponseDto> {
        const existingFavorite = await this.favoriteRepo.findByUserAndRecipe(userId, data.recipeId);

        if (existingFavorite) {
            throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.FAVORITE.ALREADY_SAVED);
        }

        const favorite = await this.favoriteRepo.create({
            recipeId: data.recipeId,
            title: data.title,
            image: data.image,
            userId,
        });

        return FavoriteMapper.toFavoriteResponseDto(favorite);
    }

    async getFavorites(userId: string, page: number = 1, limit: number = 12): Promise<GetFavoritesResponseDto> {
        const skip = (page - 1) * limit;

        const [favorites, total] = await Promise.all([
            this.favoriteRepo.findManyByUser(userId, skip, limit),
            this.favoriteRepo.countByUser(userId),
        ]);

        return FavoriteMapper.toGetFavoritesResponseDto(favorites, total, page, limit);
    }

    async deleteFavorite(userId: string, recipeId: number): Promise<DeleteFavoriteResponseDto> {
        const favorite = await this.favoriteRepo.findByUserAndRecipe(userId, recipeId);

        if (!favorite) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.FAVORITE.NOT_FOUND);
        }

        await this.favoriteRepo.deleteById(favorite.id);

        return {
            message: MESSAGES.FAVORITE.REMOVE_SUCCESS,
        };
    }
}