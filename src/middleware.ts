import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/register" || path === "/" || path === "/verifyEmail";
    const token = request.cookies.get("chat-auth")?.value || "";
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL("/chat", request.url))
    }
    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
    // return NextResponse.redirect(new URL("/login", request.url))
}


export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/chat/:id*',
        '/verifyEmail',
    ]
}