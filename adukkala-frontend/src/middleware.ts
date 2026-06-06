import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/favorites", "/dashboard", "/recipe"];

const publicAuthRoutes = [
    "/",
    "/login",
    "/register",
];

export function middleware(
    request: NextRequest
) {
}