import { NextResponse } from "next/server";
import s3 from "../lib/s3";
import dynamoDB from "../lib/dynamodb";

export async function GET() {
    try {
        const params = {
            TableName: 'users',
            ProjectionExpression: 'username, id'
        };
        const data = await dynamoDB.scan(params).promise();
        const results = [];

        for (const item of data.Items) {
            const key = `profiles/${item.id}/profile.jpg`;
            const s3Params = {
                Bucket: 'users-pfp',
                Key: key,
                Expires: 60,
                ContentType: 'image/jpeg',
            };
            const signedUrl = await s3.getSignedUrlPromise('putObject', s3Params);
            const imageId = Math.floor(Math.random() * 200)
            const seedImageUrl = `https://picsum.photos/id/${imageId}/200/300`;
            const response = await fetch(seedImageUrl);
            const arrayBuffer = await response.arrayBuffer();
            const imageBuffer = Buffer.from(arrayBuffer);

            await fetch(signedUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'image/jpeg',
                },
                body: imageBuffer
            });

            results.push({ username: item.username, key })
        };
        return NextResponse.json({ message: 'profile pictures uploaded successfully' });
    } catch(error) {
        console.error('Error getting users', error);
        return NextResponse.json({ error: error});
    };
}