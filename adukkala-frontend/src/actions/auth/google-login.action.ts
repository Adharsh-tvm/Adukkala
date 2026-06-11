"use server";

import { setAccessToken } from "@/lib/auth/cookies";
import { authService } from "@/services/auth.service";
import { isAxiosError } from "axios";

export async function googleLoginAction(
    credential: string
) {
    try {
        const response = await authService.googleLogin({
            credential
        });

        await setAccessToken(
            response.data.token
        );

        return response;
    } catch (error: any) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || "Google Login Failed"
            };
        }

        return {
            success: false,
            message: error.message || "Unexpected error"
        }
    }
}