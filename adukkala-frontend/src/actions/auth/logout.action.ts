"use server";

import { removeAccessToken } from "@/lib/auth/cookies";

export async function logoutAction() {

    await removeAccessToken();

    return {
        success: true
    }
}