import { NextResponse } from "next/server";
import dynamoDB from "../lib/dynamodb";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    const cacheData = cache.get(username);
    if (cacheData) {
        return NextResponse.json(cacheData);
    }

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
        }

        cache.set(username, userData);
        return NextResponse.json(userData);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}
