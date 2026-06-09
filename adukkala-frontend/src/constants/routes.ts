export const ROUTES = {
    HOME: "/",

    LOGIN: "/login",
    REGISTER: "/register",

    FAVORITES: "/favorites",

    RECIPE_DETAILS: (id: number) =>
        `/recipe/${id}`,
} as const;

export const PUBLIC_ROUTES = [
    "/",
    "/login",
    "/register",
];

export const AUTH_ROUTES = [
    "/login",
    "/register",
];