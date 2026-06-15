import { NextFunction, Response } from "express";
import { recipeService } from "../services/recipe.service";
import { AuthRequest } from "../types/auth-request";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";
import { ApiResponse } from "../utils/api-response";

export const searchRecipes = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const query = req.query.query as string;
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 12));
        const result = await recipeService.searchRecipes(query, page, limit);

        res.status(HTTP_STATUS.OK).json(
            ApiResponse.success(result, MESSAGES.RECIPE.FETCH_SUCCESS)
        );
    } catch (error) {
        next(error);
    }
}

export const getRecipeDetails = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const recipeId = Number(req.params.id);
        const result = await recipeService.getRecipeById(recipeId);

        res.status(HTTP_STATUS.OK).json(
            ApiResponse.success(result, MESSAGES.RECIPE.FETCH_SUCCESS)
        );
    } catch (error) {
        next(error);
    }
};