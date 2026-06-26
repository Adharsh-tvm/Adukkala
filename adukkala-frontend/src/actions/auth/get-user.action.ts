"use server";

import { getAccessToken } from "@/lib/auth/cookies";
import { verifyToken } from "@/lib/auth/verify-token";

export async function getUserAction() {
    try {
        const token = await getAccessToken();
        if (!token) return null;

        const payload = verifyToken(token);
        if (!payload || typeof payload === "string") return null;

        return {
            userId: payload.userId as string,
            name: payload.name as string,
        };
    } catch {
        return null;
    }
}
