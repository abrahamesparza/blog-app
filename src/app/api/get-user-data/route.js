import { NextResponse } from "next/server";
import dynamoDB from "../lib/dynamodb";
import { useDebugValue } from "react";

export async function GET(request) {
    console.log('in get-user-data API')
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    
    if (!username) {
        return NextResponse.json({ message: 'No username in query' });
    }

    try {
        const params = {
            TableName: 'users',
            IndexName: 'profile-index',
            KeyConditionExpression: 'username = :username',
            ExpressionAttributeValues: {
                ':username': username,
            },
            ProjectionExpression: 'id, blogs, username, bio'
        };
        const data = await dynamoDB.query(params).promise();
        let userData = data.Items[0];

        if (!userData) {
            return NextResponse.json({ message: 404 })
        }
        if (userData.blogs) {
            userData.blogs.reverse();
            return NextResponse.json(userData);
        }
        
        return NextResponse.json(userData);
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch data' })
    }
}