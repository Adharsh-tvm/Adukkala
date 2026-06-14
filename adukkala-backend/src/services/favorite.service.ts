import { prisma } from "../prisma/prisma";
import { CreateFavoriteDto } from "../shared/types/favorite.types";
import { ApiError } from "../utils/api-error";

class FavoriteService {

    async addFavorite(
        userId: string,
        data: CreateFavoriteDto
    ) {
        const existingFavorite = await prisma.favorite.findFirst({
            where: {
                userId,
                recipeId: data.recipeId
            }
        });

        if (existingFavorite) {
            throw new ApiError(
                409,
                "Recipe already saved"
            );
        }

        return prisma.favorite.create({
            data: {
                recipeId: data.recipeId,
                title: data.title,
                image: data.image,
                userId
            }
        });
    }

    async getFavorites(
        userId: string,
        page: number = 1,
        limit: number = 12
    ) {
        const skip = (page - 1) * limit;

        const [favorites, total] =
            await Promise.all([
                prisma.favorite.findMany({
                    where: {
                        userId,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    skip,
                    take: limit,
                }),

                prisma.favorite.count({
                    where: {
                        userId,
                    },
                }),
            ]);

        return {
            favorites,
            total,
            page,
            limit,
            totalPages: Math.ceil(
                total / limit
            ),
        };
    }

    async deleteFavorite(
        userId: string,
        recipeId: number
    ) {
        const favorite = await prisma.favorite.findFirst({
            where: {
                userId,
                recipeId
            }
        });

        if (!favorite) {
            throw new ApiError(
                404,
                "Favorite not found"
            );
        }

        await prisma.favorite.delete({
            where: {
                id: favorite.id
            }
        });

        return {
            message: "Favorite removed successfully"
        }
    }
}

export const favoriteService = new FavoriteService();