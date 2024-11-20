import { NextResponse } from 'next/server';
import { generateSessionId, storeSession } from '../lib/session';
const { v4: uuidv4 } = require('uuid');
import bcrypt from 'bcryptjs';

import dynamoDB from '../lib/dynamodb';


export async function POST(request) {
    try {
        const data = await request.json();
        if (data.password.length < 8) {
            return NextResponse.json({ message: 'Password does not minimum length requirement of 8 characters' })
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
    
        const uniqueId = uuidv4();
        const params = {
            TableName: 'users',
            Item: {
                id: uniqueId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                username: data.username,
                password: hashedPassword,
            },
        };
        
        await dynamoDB.put(params).promise();

        const sessionId = generateSessionId();
        storeSession(sessionId, {
            id: uniqueId,
            email: data.email,
            username: data.username
        });

        const response = NextResponse.json({ message: 'Success' })
        response.cookies.set('sessionId', sessionId, { httpOnly: true, maxAge: 3600 });
        return response;
    }
    catch(error) {
        console.error(`Error storing data', ${error}`)
        return NextResponse.error()
    }

}