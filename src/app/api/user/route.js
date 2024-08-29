import NextRequest, { NextResponse } from 'next/server';

export async function POST(request) {
    const data = await request.json();
    const userData = JSON.stringify(data)
    console.log(`User Data received: ${userData}`);
    return NextResponse.json({'message': 'Data retrieved successfully.'});
}