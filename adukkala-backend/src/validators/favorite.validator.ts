import { z } from "zod";

export const createFavoriteSchema =
    z.object({
        recipeId: z.number(),

        title: z.string(),

        image: z.url()
    });