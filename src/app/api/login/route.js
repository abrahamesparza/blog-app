import { generateSessionId, storeSession } from '../lib/session';
const { v4: uuidv4 } = require('uuid');
import bcrypt from 'bcryptjs'

import { NextResponse } from 'next/server';

import dynamoDB from '../lib/dynamodb';


export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ 'error': 'Email and password are required' })
        }

        const params = {
            TableName: 'users',
            FilterExpression: 'email = :email',
            ExpressionAttributeValues: { ':email': email }
        };

        const result = await dynamoDB.scan(params).promise();
        console.log(`result items: ${result.Items}`)
        if (!result.Items) {
            return NextResponse.json({ message: 'User not found' })
        }

        const user = result.Items[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
        }

        const sessionId = generateSessionId();
        storeSession(sessionId, { id: user.id, email: user.email });

        const response = NextResponse.json({ message: 'Success' })
        response.cookies.set('sessionId', sessionId, {httpOnly: true, maxAge: 3600});
        
        return response;
    } catch(error) {
        console.error(`Error checking user: ${user}`);
        return NextResponse.error();
    }

}