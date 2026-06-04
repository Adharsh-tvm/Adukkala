export const ROUTES = {
    HOME: "/",

    LOGIN: "/login",
    REGISTER: "/register",

    FAVORITES: "/favorites",

    RECIPE_DETAILS: (id: number) =>
        `/recipe/${id}`,
} as const;