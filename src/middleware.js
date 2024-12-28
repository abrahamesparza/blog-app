import { NextResponse } from 'next/server';

export function middleware(request) {    
    const sessionId = request.cookies.get('sessionId')?.value;
    const currentPath = request.nextUrl.pathname;

    if (!sessionId && currentPath === '/') {
        return NextResponse.next();
    }

    if (!sessionId) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (sessionId && currentPath === '/') {
        const url = request.nextUrl.clone();
        url.pathname = '/explore';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/landing', '/write', '/explore', '/profile/:path*', '/blog/:path*'], 
};