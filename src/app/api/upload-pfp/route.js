import s3 from '../lib/s3';
import { NextResponse } from 'next/server';

const BUCKET = 'users-pfp';

export async function POST(request) {
    try {
        const { username, fileName } = await request.json();
        const key = `profiles/${username}/${fileName}`;
        const params = {
            Bucket: BUCKET,
            Key: key,
            Expires: 60,
            ACL: 'bucket-owner-full-control',
            ContentType: 'image/jpeg',
        };

        const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
        return NextResponse.json({ uploadUrl, key });
    }
    catch (error) {
        console.error('Error generating signed url -', error);
        return NextResponse.json({ error: 'Error generating signed url'});
    }
};