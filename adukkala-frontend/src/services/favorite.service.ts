import { api } from "./api/client";
import { ENDPOINTS } from "./api/endpoints";

import type {
    CreateFavoriteDto,
    Favorite,
} from "@/types/favorite.types";

export const favoriteService = {
    async getFavorites(
        token: string
    ): Promise<Favorite[]> {
        const { data } =
            await api.get<Favorite[]>(
                ENDPOINTS.FAVORITES.BASE,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

        return data;
    },

    async addFavorite(
        token: string,
        payload: CreateFavoriteDto
    ) {
        const { data } =
            await api.post(
                ENDPOINTS.FAVORITES.BASE,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

        return data;
    },

    async removeFavorite(
        token: string,
        recipeId: number
    ) {
        const { data } =
            await api.delete(
                ENDPOINTS.FAVORITES.DELETE(recipeId),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

        return data;
    },
};