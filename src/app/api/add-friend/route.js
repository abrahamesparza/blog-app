import { NextResponse } from "next/server";

import dynamoDB from "../lib/dynamodb";

export async function POST(request) {
    const data = await request.json();
    const username = data.username;
    const loggedInUser = data.loggedInUser;

    try {
        const recipientQueryParams = {
            TableName: 'users',
            IndexName: 'username-index',
            KeyConditionExpression: 'username = :username',
            ExpressionAttributeValues: {
                ':username': username,
            },
        };
        const recipientQueryResult = await dynamoDB.query(recipientQueryParams).promise();
        if (!recipientQueryResult.Items) return NextResponse.json({ Error: 'Username not found'});

        const senderQueryParams = {
            TableName: 'users',
            IndexName: 'username-index',
            KeyConditionExpression: 'username = :username',
            ExpressionAttributeValues: {
                ':username': loggedInUser,
            },
        };
        const senderQueryResult = await dynamoDB.query(senderQueryParams).promise();
        if (!senderQueryResult.Items) return NextResponse.json({ Error: 'Username not found'});
        const senderUserId = senderQueryResult.Items[0].id;

        const requestData = { id: senderUserId, username: loggedInUser }
        const userIdToAdd = await recipientQueryResult.Items[0].id;
        const updateParams = {
            TableName: 'users',
            Key: { id: userIdToAdd },
            UpdateExpression: `
                SET friendRequests =  list_append(if_not_exists(friendRequests, :empty_list), :new_friend_request)
            `,
            ExpressionAttributeValues: {
                ':new_friend_request': [requestData],
                ':empty_list': []
            },
            ReturnValues: 'UPDATED_NEW'
        };

        const updatedResult = await dynamoDB.update(updateParams).promise();
        return NextResponse.json({ message: 'Success', data: updatedResult.Attributes.friendRequests });
    }
    catch (error) {
        console.error('Error sending reqeuest');
        return NextResponse.json({ Error: 'Error sending request' });
    }
};