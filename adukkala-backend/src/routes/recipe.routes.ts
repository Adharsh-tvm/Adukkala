import { Router } from "express";
import { getRecipeDetails, searchRecipes } from "../controllers/recipe.controller";

const router = Router();

router.get("/search", searchRecipes);

router.get("/:id", getRecipeDetails);

export default router;