"use server";

import { setAccessToken } from "@/lib/auth/cookies";
import { authService } from "@/services/auth.service";
import { LoginRequest } from "@/types/auth.types";

import { isAxiosError } from "axios";

export async function loginAction(
    payload: LoginRequest
) {
    try {
        const response = await authService.login(payload);

        await setAccessToken(
            response.data.token
        );

        return response;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || "Login failed",
            };
        }
        return {
            success: false,
            message: error instanceof Error ? error.message : "An unexpected error occurred",
        };
    }
}