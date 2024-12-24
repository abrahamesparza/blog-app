import { NextResponse } from "next/server";
import dynamoDB from "../lib/dynamodb";

export async function POST(request) {
    const {
        loggedInUserId,
        friendRequest,
        friendRequestId,
        requestType
    } = await request.json();
    try {
        const friendData = { id: friendRequestId, username: friendRequest }

        const params = {
            TableName: 'users',
            Key: { id: loggedInUserId },
            ProjectionExpression: 'username, friendRequests'
        };
        const dbResponse = await dynamoDB.get(params).promise();
        const friendRequests = dbResponse.Item.friendRequests;
        const loggedInUsername = dbResponse.Item.username;
        const updatedFriendRequests = friendRequests.filter(item => item.id !== friendRequestId);

        const recipientData = { id: loggedInUserId, username: loggedInUsername }

        const updateParams = {
            TableName: 'users',
            Key: { id: loggedInUserId },
            UpdateExpression: 'SET friendRequests = :updatedFriendRequests',
            ExpressionAttributeValues: {
                ':updatedFriendRequests': updatedFriendRequests
            },
            ReturnValues: 'UPDATED_NEW',
        };
        const updatedFriendRequestsResponse = await dynamoDB.update(updateParams).promise();

        if (requestType === 'approve') {
            const loggedInParams = {
                TableName: 'users',
                Key: { id: loggedInUserId },
                UpdateExpression: `
                SET friends = list_append(if_not_exists(friends, :empty_list), :new_friend)
                `,
                ExpressionAttributeValues: {
                    ':new_friend': [friendData],
                    ':empty_list': [],
                },
                ReturnValues: 'UPDATED_NEW'
            };
            const loggedInFriends = await dynamoDB.update(loggedInParams).promise()

            const senderParams = {
                TableName: 'users',
                Key: { id: friendRequestId },
                UpdateExpression: `
                SET friends = list_append(if_not_exists(friends, :empty_list), :new_friend)
                `,
                ExpressionAttributeValues: {
                    ':new_friend': [recipientData],
                    ':empty_list': [],
                },
                ReturnValues: 'UPDATED_NEW'
            };
            await dynamoDB.update(senderParams).promise();


            return NextResponse.json({ message: 'Success', friendRequests: updatedFriendRequestsResponse.Attributes.friendRequests, friends: loggedInFriends.Attributes.friends });
        }
        else if (requestType === 'deny') {
            return NextResponse.json({ message: 'Success', friendRequests: updatedFriendRequestsResponse.Attributes.friendRequests });
        }
    }
    catch (error) {
        return NextResponse.json({ error: error });
    }
}