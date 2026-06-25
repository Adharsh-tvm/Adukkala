import { Response, NextFunction } from "express";
import { authService } from "../container";
import { AuthRequest } from "../types/auth-request";
import { GoogleLoginInput } from "../shared/types/auth.types";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";
import { ApiResponse } from "../utils/api-response";

export const register = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const result = await authService.register(req.body);
        res.status(HTTP_STATUS.CREATED).json(
            ApiResponse.success(result, MESSAGES.AUTH.REGISTER_SUCCESS)
        );
    } catch (error) {
        next(error);
    }
}

export const login = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const result = await authService.login(req.body);
        res.status(HTTP_STATUS.OK).json(
            ApiResponse.success(result, MESSAGES.AUTH.LOGIN_SUCCESS)
        );
    } catch (error) {
        next(error)
    }
};

export const googleLogin = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await authService.googleLogin(
            req.body as GoogleLoginInput
        );
        res.status(HTTP_STATUS.OK).json(
            ApiResponse.success(result, MESSAGES.AUTH.LOGIN_SUCCESS)
        );
    } catch (error) {
        next(error);
    }
};