import { prisma } from "../../../prisma/prisma";
import {
    IFavoriteRepository,
    FavoriteModel,
    CreateFavoriteData,
} from "../../interfaces/IFavoriteRepository";

export class PrismaFavoriteRepository implements IFavoriteRepository {
    findByUserAndRecipe(userId: string, recipeId: number): Promise<FavoriteModel | null> {
        return prisma.favorite.findFirst({ where: { userId, recipeId } });
    }

    create(data: CreateFavoriteData): Promise<FavoriteModel> {
        return prisma.favorite.create({ data });
    }

    findManyByUser(userId: string, skip: number, take: number): Promise<FavoriteModel[]> {
        return prisma.favorite.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            skip,
            take,
        });
    }

    countByUser(userId: string): Promise<number> {
        return prisma.favorite.count({ where: { userId } });
    }

    async deleteById(id: string): Promise<void> {
        await prisma.favorite.delete({ where: { id } });
    }
}
