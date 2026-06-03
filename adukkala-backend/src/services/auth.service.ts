import { email } from "zod";
import { prisma } from "../prisma/prisma";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

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
            where: {
                email: data.email
            }
        });

        if (existingUser) {
            throw new Error(
                "Email already registered"
            );
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
            where: {
                email: data.email
            }
        });

        if (!user) {
            throw new Error(
                "Invalid credentials"
            );
        }

        const isMatch = await comparePassword(
            data.password,
            user.password
        );

        if (!isMatch) {
            throw new Error(
                "Invalid credentials"
            )
        }

        const token = generateToken(user.id);

        return {
            token
        };
    }
}

export const authService = new AuthService()