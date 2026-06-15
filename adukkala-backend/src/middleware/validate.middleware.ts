import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";
import { ApiResponse } from "../utils/api-response";

export const validate = (
    schema: ZodSchema
) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error.issues.map(
                issue => ({
                    field: issue.path.join("."),
                    message: issue.message
                })
            );
            return res.status(HTTP_STATUS.BAD_REQUEST).json(
                ApiResponse.error(MESSAGES.COMMON.VALIDATION_ERROR, { errors })
            );
        }

        req.body = result.data;

        next();
    };
};