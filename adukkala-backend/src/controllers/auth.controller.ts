import { Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { AuthRequest } from "../types/auth-request";

export const register = async (req: AuthRequest, res: Response, next: NextFunction) => {

    try {
        const result = await authService.register(req.body);

        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export const login = async (req: AuthRequest, res: Response, next: NextFunction) => {

    try {
        const result = await authService.login(req.body);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error)
    }
};