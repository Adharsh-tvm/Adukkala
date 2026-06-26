import { PrismaUserRepository } from "./repositories/implementations/prisma/PrismaUserRepository";
import { PrismaFavoriteRepository } from "./repositories/implementations/prisma/PrismaFavoriteRepository";
import { SpoonacularRecipeRepository } from "./repositories/implementations/spoonacular/SpoonacularRecipeRepository";

import { AuthService } from "./services/auth.service";
import { FavoriteService } from "./services/favorite.service";
import { RecipeService } from "./services/recipe.service";

import { AuthController } from "./controllers/auth.controller";
import { FavoriteController } from "./controllers/favorite.controller";
import { RecipeController } from "./controllers/recipe.controller";

// ── Repositories ────────────────────────────────────────────────────────────
const userRepository = new PrismaUserRepository();
const favoriteRepository = new PrismaFavoriteRepository();
const recipeRepository = new SpoonacularRecipeRepository();

// ── Services ─────────────────────────────────────────────────────────────────
export const authService = new AuthService(userRepository);
export const favoriteService = new FavoriteService(favoriteRepository);
export const recipeService = new RecipeService(recipeRepository);

// ── Controllers ──────────────────────────────────────────────────────────────
export const authController = new AuthController(authService);
export const favoriteController = new FavoriteController(favoriteService);
export const recipeController = new RecipeController(recipeService);
