import { NextResponse } from "next/server";

export function middleware(request) {    
    const sessionId = request.cookies.get('sessionId')?.value;

    if (!sessionId) {
        return NextResponse.redirect(new URL('/', request.url));
    };

    return NextResponse.next();
};

export const config = {
    matcher: ['/landing', '/write', '/explore', '/profile/:path*'],
};