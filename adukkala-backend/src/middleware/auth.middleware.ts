import {
    Request,
    Response,
    NextFunction
} from "express";

import { verifyToken } from "../utils/jwt";

import { ApiError } from "../utils/api-error";

export const authenticate = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const authHeader =
        req.headers.authorization;

    if (!authHeader) {
        return next(
            new ApiError(
                401,
                "Access denied"
            )
        );
    }

    const token =
        authHeader.split(" ")[1];

    if (!token) {
        return next(
            new ApiError(
                401,
                "Token missing"
            )
        );
    }

    try {
        const decoded =
            verifyToken(token);

        req.userId =
            decoded.userId as string;

        next();
    } catch {
        next(
            new ApiError(
                401,
                "Invalid token"
            )
        );
    }
};