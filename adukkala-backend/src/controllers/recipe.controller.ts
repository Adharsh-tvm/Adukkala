import { NextFunction, Request, Response } from "express";
import { recipeService } from "../services/recipe.service";

export const searchRecipes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = String(req.query.query || "");

        const page = Number(req.query.page || 1);

        const result = await recipeService.searchRecipes(query, page);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export const getRecipeDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipeId =
            Number(req.params.id);

        const result =
            await recipeService.getRecipeById(
                recipeId
            );

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};