import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth-request";
import { RegisterDto, LoginDto, GoogleLoginDto } from "../dtos/auth.dto";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";
import { ApiResponse } from "../utils/api-response";
import { IAuthService } from "../services/interfaces/IAuthService";

export class AuthController {
    constructor(private readonly authService: IAuthService) {}
    public register = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const result = await this.authService.register(req.body as RegisterDto);
            res.status(HTTP_STATUS.CREATED).json(
                ApiResponse.success(result, MESSAGES.AUTH.REGISTER_SUCCESS)
            );
        } catch (error) {
            next(error);
        }
    };

    public login = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const result = await this.authService.login(req.body as LoginDto);
            res.status(HTTP_STATUS.OK).json(
                ApiResponse.success(result, MESSAGES.AUTH.LOGIN_SUCCESS)
            );
        } catch (error) {
            next(error);
        }
    };

    public googleLogin = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.authService.googleLogin(
                req.body as GoogleLoginDto
            );
            res.status(HTTP_STATUS.OK).json(
                ApiResponse.success(result, MESSAGES.AUTH.LOGIN_SUCCESS)
            );
        } catch (error) {
            next(error);
        }
    };
}