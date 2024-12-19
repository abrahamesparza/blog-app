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
            ProjectionExpression: 'friendRequests'
        };
        const dbResponse = await dynamoDB.get(params).promise();
        const friendRequests = dbResponse.Item.friendRequests;
        const updatedFriendRequests = friendRequests.filter(item => item.id !== friendRequestId);

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
            const params = {
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
            const updatedFriends = await dynamoDB.update(params).promise()
            console.log(updatedFriends.Attributes);
            return NextResponse.json({ message: 'Success', friendRequests: updatedFriendRequestsResponse.Attributes.friendRequests, friends: updatedFriends.Attributes.friends });
        }
        else if (requestType === 'deny') {
            return NextResponse.json({ message: 'Success', friendRequests: updatedFriendRequestsResponse.Attributes.friendRequests });
        }
    }
    catch (error) {
        return NextResponse.json({ error: error });
    }
}