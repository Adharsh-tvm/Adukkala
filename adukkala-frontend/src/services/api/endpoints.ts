export const ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
    },

    RECIPES: {
        SEARCH: "/recipes/search",
        DETAILS: (id: number) => `/recipes/${id}`,
    },

    FAVORITES: {
        BASE: "/favorites",

        DELETE: (recipeId: number) => `/favorites/${recipeId}`,
    },
} as const;