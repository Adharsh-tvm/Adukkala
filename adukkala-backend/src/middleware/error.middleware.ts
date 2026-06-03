import { NextFunction, Request, Response } from "express";

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(400).json({
        success: false,
        message: error.message
    });
}