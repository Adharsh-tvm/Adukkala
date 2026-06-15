import { NextFunction, Response } from "express";
import { favoriteService } from "../services/favorite.service";
import { AuthRequest } from "../types/auth-request";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";
import { ApiResponse } from "../utils/api-response";

export const addFavorite = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await favoriteService.addFavorite(
            req.userId!,
            req.body
        );
        res.status(HTTP_STATUS.CREATED).json(
            ApiResponse.success(result, MESSAGES.FAVORITE.ADD_SUCCESS)
        );
    } catch (error) {
        next(error)
    }
}

export const getFavorites = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 12));
        const result = await favoriteService.getFavorites(req.userId!, page, limit);

        res.status(HTTP_STATUS.OK).json(
            ApiResponse.success(result, MESSAGES.FAVORITE.FETCH_SUCCESS)
        );
    } catch (error) {
        next(error);
    }
};

export const deleteFavorite = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipeId = Number(req.params.recipeId);
        const result = await favoriteService.deleteFavorite(req.userId!, recipeId);

        res.status(HTTP_STATUS.OK).json(
            ApiResponse.success(result, MESSAGES.FAVORITE.REMOVE_SUCCESS)
        );
    } catch (error) {
        next(error);
    }
};
