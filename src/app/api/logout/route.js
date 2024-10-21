import { NextResponse } from "next/server";

export async function POST(request) {
    let sessionId = request.cookies._parsed.get('sessionId');
    console.log(`sessionId: ${sessionId}`);

    if (sessionId) {
        const response = NextResponse.json({message: 'Success' });
        response.cookies.set(
            'sessionId', '', {
                httpOnly: true,
                maxAge: 0
            });
        console.log(`response: ${response}`)
        return response;
    } else {
        return NextResponse.json({ message: 'No active session' });
    }
};