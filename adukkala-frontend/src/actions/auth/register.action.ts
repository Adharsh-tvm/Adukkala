"use server";

import { authService } from "@/services/auth.service";
import { RegisterRequest } from "@/types/auth.types";

import { isAxiosError } from "axios";

export async function registerAction(payload: RegisterRequest) {
    try {
        const response = await authService.register(payload);
        return response;
    } catch (error: any) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed",
            };
        }
        return {
            success: false,
            message: error.message || "An unexpected error occurred",
        };
    }
}