import { prisma } from "../prisma/prisma";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { ApiError } from "../utils/api-error";
import { GoogleLoginInput } from "../shared/types/auth.types";
import { verifyGoogleToken } from "../utils/google-auth";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { MESSAGES } from "../shared/constants/message.constants";

interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

interface LoginInput {
    email: string;
    password: string;
}

class AuthService {
    async register(data: RegisterInput) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.AUTH.USER_EXISTS);
        }

        const hashedPassword = await hashPassword(data.password);
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
            }
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }

    async login(data: LoginInput) {
        const user = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!user || !user.password) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.INVALID_CREDENTIALS);
        }

        const isMatch = await comparePassword(data.password, user.password);

        if (!isMatch) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.INVALID_CREDENTIALS);
        }

        const token = generateToken(user.id);
        return { token };
    }

    async googleLogin(data: GoogleLoginInput) {
        const googleUser = await verifyGoogleToken(data.credential);

        let user = await prisma.user.findUnique({
            where: { email: googleUser.email }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: googleUser.name,
                    email: googleUser.email,
                    googleId: googleUser.googleId,
                    profileImage: googleUser.picture
                }
            });
        } else if (!user.googleId) {
            user = await prisma.user.update({
                where: { id: user.id },
                data: {
                    googleId: googleUser.googleId,
                    profileImage: googleUser.picture
                }
            });
        }
        
        const token = generateToken(user.id);
        return { token };
    }
}

export const authService = new AuthService();