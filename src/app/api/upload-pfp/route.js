import dynamoDB from '../lib/dynamodb';
import s3 from '../lib/s3';
import { NextResponse } from 'next/server';

const BUCKET = 'users-pfp';

export async function POST(request) {
    try {
        const { username } = await request.json();
        const dynamoParams = {
            TableName: 'users',
            IndexName: 'username-index',
            KeyConditionExpression: 'username = :username',
            ExpressionAttributeValues: {
                ":username": username,
            },
        }
        const queryResult = await dynamoDB.query(dynamoParams).promise();
        const userId = queryResult.Items[0].id;

        const key = `profiles/${userId}/profile.jpg`;
        const s3Params = {
            Bucket: BUCKET,
            Key: key,
            Expires: 60,
            ACL: 'bucket-owner-full-control',
            ContentType: 'image/jpeg',
        };
        const uploadUrl = await s3.getSignedUrlPromise('putObject', s3Params);
        return NextResponse.json({ uploadUrl, key });
    }
    catch (error) {
        console.error('Error generating signed url -', error);
        return NextResponse.json({ error: 'Error generating signed url'});
    }
};