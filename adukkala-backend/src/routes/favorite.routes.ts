import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { addFavorite, deleteFavorite, getFavorites } from "../controllers/favorite.controller";
import { validate } from "../middleware/validate.middleware";
import { createFavoriteSchema } from "../validators/favorite.validator";

const router = Router();

router.post("/", authenticate, validate(createFavoriteSchema), addFavorite);

router.get("/", authenticate, getFavorites);

router.delete("/:recipeId", authenticate, deleteFavorite);

export default router;