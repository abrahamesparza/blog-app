import { NextResponse } from "next/server";

import dynamoDB from "../lib/dynamodb";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    try {
        const params = {
            TableName: 'users',
            IndexName: 'profile-data-index',
            KeyConditionExpression: 'username = :username',
            ExpressionAttributeValues: {
                ':username': username,
            },
            ProjectionExpression: 'id, friendRequests',
        };
        
        const response = await dynamoDB.query(params).promise();
        const data = response.Items[0];
        return NextResponse.json({ message: 'Success', friendRequests: data.friendRequests});
    }
    catch (error) {
        console.error('Error retrieving friend reqeuests', error);
        return NextResponse.json({ Error: 'Error fetching friend requests' });
    }
}