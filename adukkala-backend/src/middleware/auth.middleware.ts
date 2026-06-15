import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { ApiError } from "../utils/api-error";
import { AuthRequest } from "../types/auth-request";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";

export const authenticate = (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(
            new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.UNAUTHORIZED)
        );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return next(
            new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.INVALID_TOKEN)
        );
    }

    try {
        const decoded = verifyToken(token);
        req.userId = decoded.userId as string;
        next();
    } catch {
        next(
            new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.INVALID_TOKEN)
        );
    }
};