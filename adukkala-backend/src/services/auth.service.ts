import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { comparePassword, hashPassword } from "../utils/hash";
import { AuthMapper } from "../mappers/auth.mapper";
import { generateToken } from "../utils/jwt";
import { ApiError } from "../utils/api-error";
import { GoogleLoginDto, RegisterDto, LoginDto, RegisterResponseDto, LoginResponseDto, GoogleLoginResponseDto } from "../dtos/auth.dto";
import { verifyGoogleToken } from "../utils/google-auth";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";

import { IAuthService } from "./interfaces/IAuthService";

export class AuthService implements IAuthService {
    constructor(private userRepo: IUserRepository) {}

    async register(data: RegisterDto): Promise<RegisterResponseDto> {
        const existingUser = await this.userRepo.findByEmail(data.email);

        if (existingUser) {
            throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.AUTH.USER_EXISTS);
        }

        const hashedPassword = await hashPassword(data.password);
        const user = await this.userRepo.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });

        return AuthMapper.toRegisterResponse(user);
    }

    async login(data: LoginDto): Promise<LoginResponseDto> {
        const user = await this.userRepo.findByEmail(data.email);

        if (!user || !user.password) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.INVALID_CREDENTIALS);
        }

        const isMatch = await comparePassword(data.password, user.password);

        if (!isMatch) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.INVALID_CREDENTIALS);
        }

        const token = generateToken(user.id, user.name);
        return { token };
    }

    async googleLogin(data: GoogleLoginDto): Promise<GoogleLoginResponseDto> {
        const googleUser = await verifyGoogleToken(data.credential);

        let user = await this.userRepo.findByEmail(googleUser.email);

        if (!user) {
            user = await this.userRepo.create({
                name: googleUser.name,
                email: googleUser.email,
                googleId: googleUser.googleId,
                profileImage: googleUser.picture,
            });
        } else if (!user.googleId) {
            user = await this.userRepo.updateGoogleData(user.id, {
                googleId: googleUser.googleId,
                profileImage: googleUser.picture,
            });
        }

        const token = generateToken(user.id, user.name);
        return { token };
    }
}