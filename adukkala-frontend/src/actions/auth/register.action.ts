"use server";

import { authService } from "@/services/auth.service";
import { RegisterRequest } from "@/types/auth.types";

export async function registerAction(payload: RegisterRequest) {
    const response = await authService.register(payload);
    return response;
}