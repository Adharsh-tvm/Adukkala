import { Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";
import { ApiResponse } from "../utils/api-response";

export const errorHandler = (
    error: Error,
    _req: Request,
    res: Response,
) => {
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json(
            ApiResponse.error(error.message)
        );
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
        ApiResponse.error(MESSAGES.COMMON.SERVER_ERROR)
    );
};