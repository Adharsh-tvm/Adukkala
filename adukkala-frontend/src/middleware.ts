import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_ROUTES } from "./constants/routes";
import { verifyToken } from "./lib/auth/verify-token";

export function middleware(
    request: NextRequest
) {
    const { pathname } = request.nextUrl;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    const token = request.cookies.get("accessToken")?.value;

    //Public Route
    if (isPublicRoute) {
        if (token &&
            (pathname === "/login" || pathname === "/signup")
        ) {
            try {
                verifyToken(token);

                return NextResponse.redirect(
                    new URL("/user", request.url)
                );
            } catch { }
        }
        return NextResponse.next();
    }


    //Protected Route
    if (!token) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }
    try {
        verifyToken(token);

        return NextResponse.next();
    } catch {
        const response = NextResponse.redirect(
            new URL("/login", request.url)
        );

        response.cookies.delete("accessToken");

        return response;
    }
}
