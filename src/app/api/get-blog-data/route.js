import dynamoDB from "../lib/dynamodb";
import { NextResponse } from 'next/server';
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId');

    const cachedData = cache.get(userId);
    if (cachedData) {
        return NextResponse.json(({ items: cachedData }));
    }

    const params = {
        TableName: 'users',
        KeyConditionExpression: 'id = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        },
        ProjectionExpression: 'id, username, blogs, friends',
    };

    try {
        const userDataResponse = await dynamoDB.query(params).promise();
        const userData = userDataResponse.Items[0];
        const data = [];

        if (userData) {
            data.push({
                id: userData.id,
                username: userData.username,
                blogs: userData.blogs || [],
            });

            if (userData.friends) {
                const friendDataPromises = userData.friends.map(async (item) => {
                    const friendParams = {
                        TableName: 'users',
                        IndexName: 'profile-data-index',
                        KeyConditionExpression: 'username = :username',
                        ExpressionAttributeValues: {
                            ':username': item.username
                        },
                        ProjectionExpression: 'id, username, blogs, friends',
                    };
                    const friendDataResponse = await dynamoDB.query(friendParams).promise();
                    return friendDataResponse.Items[0];
                });
                
                const friendData = await Promise.all(friendDataPromises);
                friendData.forEach(friend => {
                    if (friend) {
                        data.push({
                            id: friend.id,
                            username: friend.username,
                            blogs: friend.blogs || [],
                        });
                    }
                });
            }
        }
        cache.set(userId, data);
        return NextResponse.json({ items: data });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch data' })
    }
};