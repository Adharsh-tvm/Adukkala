"use server";

import { getErrorMessage } from "@/lib/api-error";
import { registerSchema } from "@/lib/register.schema";
import { authService } from "@/services/auth.service";
import { ActionState } from "@/types/action.types";

export async function registerAction(
    name: string,
    email: string,
    password: string
): Promise<ActionState> {
    try {

        const parsed =
            registerSchema.safeParse({
                name,
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

        await authService.register({
            name,
            email,
            password,
        });

        return {
            success: true,
            message: "Registration successful",
        };
    } catch (error) {
        return {
            success: false,
            message: getErrorMessage(error)
        };
    }
}