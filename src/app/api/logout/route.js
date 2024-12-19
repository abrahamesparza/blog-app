import { NextResponse } from "next/server";

export async function POST(request) {
    let sessionId = request.cookies.get('sessionId');
    console.log(`sessionId: ${sessionId}`);

    if (sessionId) {
        const response = NextResponse.json({message: 'Success' });
        response.cookies.set(
            'sessionId', '', {
                httpOnly: true,
                expires: new Date(0),
                path: '/'
            });
        return response;
    } else {
        return NextResponse.json({ message: 'No active session' });
    }
};