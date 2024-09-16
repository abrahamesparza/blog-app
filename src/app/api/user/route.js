import dynamoDB from '../lib/dynamodb';
import { NextResponse } from 'next/server';

const { v4: uuidv4 } = require('uuid');

export async function POST(request) {
    try {
        const data = await request.json();
        console.log(`data: ${data}`)
    
        const uniqueId = uuidv4();
        const params = {
            TableName: 'users',
            Item: {
                id: uniqueId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: data.role,
                password: data.password,
            },
        };
        
        await dynamoDB.put(params).promise();
        return NextResponse.json({'message': 'Data stored successfully.'});
    }
    catch(error) {
        console.error(`Error storing data', ${error}`)
        return NextResponse.error()
    }

}