"use server";

import { removeAccessToken } from "@/lib/auth/cookies";
import { success } from "zod";

export async function logoutAction() {

    await removeAccessToken();

    return {
        success: true
    }
}