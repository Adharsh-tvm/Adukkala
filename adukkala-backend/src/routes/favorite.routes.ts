import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { favoriteController } from "../container";
import { validate } from "../middleware/validate.middleware";
import { createFavoriteSchema } from "../validators/favorite.validator";

const router = Router();

router.post("/", authenticate, validate(createFavoriteSchema), favoriteController.addFavorite);

router.get("/", authenticate, favoriteController.getFavorites);

router.delete("/:recipeId", authenticate, favoriteController.deleteFavorite);

export default router;