import { NextFunction, Response } from "express";
import { favoriteService } from "../services/favorite.service";
import { AuthRequest } from "../types/auth-request";

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

        res.status(201).json({
            success: true,
            data: result
        });
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

        const page = Math.max(
            1,
            Number(req.query.page) || 1
        );

        const limit = Math.min(
            50,
            Math.max(
                1,
                Number(req.query.limit) || 12
            )
        );

        const result =
            await favoriteService.getFavorites(
                req.userId!,
                page,
                limit
            );

        res.status(200).json({
            success: true,
            data: result
        });
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
        const recipeId =
            Number(req.params.recipeId);

        const result =
            await favoriteService.deleteFavorite(
                req.userId!,
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
