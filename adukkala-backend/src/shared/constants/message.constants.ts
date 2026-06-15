export const MESSAGES = {
    COMMON: {
        SUCCESS: "Success",
        SERVER_ERROR: "Internal server error",
        VALIDATION_ERROR: "Validation error",
        NOT_FOUND: "Resource not found",
        UNAUTHORIZED: "Unauthorized",
        BAD_REQUEST: "Bad request",
    },
    AUTH: {
        REGISTER_SUCCESS: "User registered successfully",
        LOGIN_SUCCESS: "User logged in successfully",
        UNAUTHORIZED: "Unauthorized access",
        INVALID_CREDENTIALS: "Invalid credentials",
        USER_EXISTS: "User already exists",
        INVALID_TOKEN: "Invalid token",
    },
    RECIPE: {
        FETCH_SUCCESS: "Recipes fetched successfully",
        NOT_FOUND: "Recipe not found",
    },
    FAVORITE: {
        ADD_SUCCESS: "Added to favorites successfully",
        REMOVE_SUCCESS: "Favorite removed successfully",
        FETCH_SUCCESS: "Favorites fetched successfully",
        ALREADY_SAVED: "Recipe already saved",
        NOT_FOUND: "Favorite not found",
    }
} as const;
