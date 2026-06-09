"use server"

import { cookies } from "next/headers";

export async function setAccessToken(
    token: string
) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: Number(process.env.TOKEN_COOKIE_MAX_AGE)
    });
}

export async function removeAccessToken() {
    const cookieStore = await cookies();

    cookieStore.delete("accessToken");
}

export async function getAccessToken() {
    const cookieStore = await cookies();

    return cookieStore.get("accessToken")?.value;
}