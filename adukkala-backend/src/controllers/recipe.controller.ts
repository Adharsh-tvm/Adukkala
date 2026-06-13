import { NextFunction, Response } from "express";
import { recipeService } from "../services/recipe.service";
import { AuthRequest } from "../types/auth-request";

export const searchRecipes = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const query = req.query.query as string;

        const page = Math.max(1, Number(req.query.page) || 1);

        const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 12));

        const result = await recipeService.searchRecipes(query, page, limit);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export const getRecipeDetails = async (req: AuthRequest, res: Response, next: NextFunction) => {
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