import { getSession } from "../lib/session";
import { NextResponse } from "next/server";

export async function GET(request) {
    const cookies = request.cookies.toString();
    const cookieSession = cookies.split('%3B')[0]
    const sessionId = cookieSession.split('=')[1];

    if (!sessionId) {
        return NextResponse.json({ message: 'Unauthorized' });
    }

    const session = await getSession(sessionId);
    
    if (!session.sessionId) {
        return NextResponse.json({ message: 'Session not found' });
    }

    return NextResponse.json({ username: session.data.username });
};