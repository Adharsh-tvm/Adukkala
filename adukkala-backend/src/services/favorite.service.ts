import { IFavoriteRepository } from "../repositories/interfaces/IFavoriteRepository";
import { CreateFavoriteDto } from "../shared/types/favorite.types";
import { ApiError } from "../utils/api-error";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";

export class FavoriteService {
    constructor(private favoriteRepo: IFavoriteRepository) {}

    async addFavorite(userId: string, data: CreateFavoriteDto) {
        const existingFavorite = await this.favoriteRepo.findByUserAndRecipe(userId, data.recipeId);

        if (existingFavorite) {
            throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.FAVORITE.ALREADY_SAVED);
        }

        return this.favoriteRepo.create({
            recipeId: data.recipeId,
            title: data.title,
            image: data.image,
            userId,
        });
    }

    async getFavorites(userId: string, page: number = 1, limit: number = 12) {
        const skip = (page - 1) * limit;

        const [favorites, total] = await Promise.all([
            this.favoriteRepo.findManyByUser(userId, skip, limit),
            this.favoriteRepo.countByUser(userId),
        ]);

        return {
            favorites,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async deleteFavorite(userId: string, recipeId: number) {
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