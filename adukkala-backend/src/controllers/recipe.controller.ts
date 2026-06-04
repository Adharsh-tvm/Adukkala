import { NextFunction, Response } from "express";
import { recipeService } from "../services/recipe.service";
import { AuthRequest } from "../types/auth-request";

export const searchRecipes = async (req: AuthRequest, res: Response, next: NextFunction) => {
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