export interface FavoriteModel {
    id: string;
    recipeId: number;
    title: string;
    image: string;
    userId: string;
    createdAt: Date;
}

export interface CreateFavoriteData {
    recipeId: number;
    title: string;
    image: string;
    userId: string;
}

export interface IFavoriteRepository {
    findByUserAndRecipe(userId: string, recipeId: number): Promise<FavoriteModel | null>;
    create(data: CreateFavoriteData): Promise<FavoriteModel>;
    findManyByUser(userId: string, skip: number, take: number): Promise<FavoriteModel[]>;
    countByUser(userId: string): Promise<number>;
    deleteById(id: string): Promise<void>;
}
