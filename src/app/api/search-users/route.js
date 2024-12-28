import { NextResponse } from "next/server";
import dynamoDB from "../lib/dynamodb";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');

        if (!username || username.trim() === '') {
            return NextResponse.json({ users: [] });
        }
        
        const params = {
            TableName: 'users',
            IndexName: 'username-index',
            KeyConditionExpression: 'username = :username',
            ExpressionAttributeValues: {
                ':username': username,
            }
        };

        const response = await dynamoDB.query(params).promise();
        const users = response.Items.map(item => item);
        console.log('users', users);
        return NextResponse.json({ message: 'Success', users: users })
    }
    catch (error) {
        return NextResponse.json({ message: `Error ${error}`})
    }
    
}