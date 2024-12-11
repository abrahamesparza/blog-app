import { NextResponse } from "next/server";

import dynamoDB from "../lib/dynamodb";

export async function POST(request) {
    const data = await request.json();
    const username = data.username;
    const loggedInUser = data.loggedInUser;

    try {
        const queryParams = {
            TableName: 'users',
            IndexName: 'username-index',
            KeyConditionExpression: 'username = :username',
            ExpressionAttributeValues: {
                ':username': username,
            },
        }

        const queryResut = await dynamoDB.query(queryParams).promise();

        if (!queryResut.Items) return NextResponse.json({ Error: 'Username not found'});

        const userId = await queryResut.Items[0].id;

        const updateParams = {
            TableName: 'users',
            Key: { id: userId },
            UpdateExpression: `
                SET friendRequests =  list_append(if_not_exists(friendRequests, :empty_list), :new_friend_request)
            `,
            ExpressionAttributeValues: {
                ':new_friend_request': [loggedInUser],
                ':empty_list': []
            },
            ReturnValues: 'UPDATED_NEW'
        };

        await dynamoDB.update(updateParams).promise();
        return NextResponse.json({ message: 'Success' });
    }
    catch (error) {
        console.error('Error sending reqeuest');
        return NextResponse.json({ Error: 'Error sending request' });
    }
};