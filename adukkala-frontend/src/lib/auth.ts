import { cookies } from "next/headers";

const TOKEN_KEY = "token";

export async function getToken() {
    const cookieStore = await cookies();

    return cookieStore.get(TOKEN_KEY)?.value;
}

export async function setToken(token: string) {
    const cookieStore = await cookies();

    cookieStore.set(TOKEN_KEY, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
}

export async function removeToken() {
    const cookieStore = await cookies();

    cookieStore.delete(TOKEN_KEY);
}