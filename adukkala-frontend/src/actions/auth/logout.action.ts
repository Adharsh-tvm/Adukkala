"use server";

import { removeToken } from "@/lib/auth";
import { ActionState } from "@/types/action.types";

export async function logoutAction(): Promise<ActionState> {
    await removeToken();

    return {
        success: true,
        message: "Logged out",
    };
}