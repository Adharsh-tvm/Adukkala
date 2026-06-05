import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/favorites"];

const publicAuthRoutes = [
    "/login",
    "/register",
];

export function middleware(
    request: NextRequest
) {
    const token =
        request.cookies.get("token");

    const pathname =
        request.nextUrl.pathname;

    const isProtectedRoute =
        protectedRoutes.some(route =>
            pathname.startsWith(route)
        );

    const isAuthRoute =
        publicAuthRoutes.includes(
            pathname
        );

    if (
        isProtectedRoute &&
        !token
    ) {
        return NextResponse.redirect(
            new URL(
                "/login",
                request.url
            )
        );
    }

    if (
        isAuthRoute &&
        token
    ) {
        return NextResponse.redirect(
            new URL("/", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/favorites/:path*",
        "/login",
        "/register",
    ],
};