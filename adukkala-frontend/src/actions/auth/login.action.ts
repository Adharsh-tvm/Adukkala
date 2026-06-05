"use server"

import { getErrorMessage } from "@/lib/api-error";
import { setToken } from "@/lib/auth";
import { loginSchema } from "@/lib/login.schema";
import { authService } from "@/services/auth.service";
import { ActionState } from "@/types/action.types";

export async function loginAction(
    email: string,
    password: string
): Promise<ActionState> {
    try {

        const parsed =
            loginSchema.safeParse({
                email,
                password,
            });

        if (!parsed.success) {
            return {
                success: false,
                message:
                    parsed.error.issues[0]?.message ??
                    "Invalid form data",
            };
        }

        const response = await authService.login({
            email,
            password
        });

        await setToken(
            response.data.token
        );

        return {
            success: true,
            message: "Login Successful",
        };
    } catch (error) {
        return {
            success: false,
            message: getErrorMessage(error),
        }
    }
}