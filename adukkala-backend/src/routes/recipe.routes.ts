import { Router } from "express";
import { recipeController } from "../container";

const router = Router();

router.get("/search", recipeController.searchRecipes);

router.get("/:id", recipeController.getRecipeDetails);

export default router;