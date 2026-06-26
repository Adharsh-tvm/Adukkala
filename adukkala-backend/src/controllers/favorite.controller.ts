import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";
import { ApiResponse } from "../utils/api-response";
import { IFavoriteService } from "../services/interfaces/IFavoriteService";
import { CreateFavoriteDto } from "../dtos/favorite.dto";
export class FavoriteController {
    constructor(private readonly favoriteService: IFavoriteService) {}

    public addFavorite = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.favoriteService.addFavorite(
                req.userId!,
                req.body as CreateFavoriteDto
            );
            res.status(HTTP_STATUS.CREATED).json(
                ApiResponse.success(result, MESSAGES.FAVORITE.ADD_SUCCESS)
            );
        } catch (error) {
            next(error)
        }
    };

    public getFavorites = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const page = Math.max(1, Number(req.query.page) || 1);
            const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 12));
            const result = await this.favoriteService.getFavorites(req.userId!, page, limit);

            res.status(HTTP_STATUS.OK).json(
                ApiResponse.success(result, MESSAGES.FAVORITE.FETCH_SUCCESS)
            );
        } catch (error) {
            next(error);
        }
    };

    public deleteFavorite = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const recipeId = Number(req.params.recipeId);
            const result = await this.favoriteService.deleteFavorite(req.userId!, recipeId);

            res.status(HTTP_STATUS.OK).json(
                ApiResponse.success(result, MESSAGES.FAVORITE.REMOVE_SUCCESS)
            );
        } catch (error) {
            next(error);
        }
    };
}
