const { v4: uuidv4 } = require('uuid');
import bcrypt from 'bcryptjs';

import dynamoDB from '../lib/dynamodb';
import { NextResponse } from 'next/server';


export async function POST(request) {
    try {
        const data = await request.json();
        if (data.password.length < 8) {
            return NextResponse.json({ message: 'Password does not minimum length requirement of 8 characters' })
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        console.log(`hashed password: ${hashedPassword}`)
    
        const uniqueId = uuidv4();
        const params = {
            TableName: 'users',
            Item: {
                id: uniqueId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: data.role,
                password: hashedPassword,
            },
        };
        
        await dynamoDB.put(params).promise();
        return NextResponse.json({'message': 'Success'});
    }
    catch(error) {
        console.error(`Error storing data', ${error}`)
        return NextResponse.error()
    }

}