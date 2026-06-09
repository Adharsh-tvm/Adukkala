"use server";

import { setAccessToken } from "@/lib/auth/cookies";
import { authService } from "@/services/auth.service";
import { LoginRequest } from "@/types/auth.types";

export async function loginAction(
    payload: LoginRequest
) {

    const response = await authService.login(payload);

    await setAccessToken(
        response.data.token
    );

    return response;
}