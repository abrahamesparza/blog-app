import dynamoDB from "../lib/dynamodb";
import { NextResponse } from 'next/server';

export async function GET() {
    const params = {
        'TableName': 'users',
        'ProjectionExpression': 'id, username, blogs',
    };
    try {
        const data = await dynamoDB.scan(params).promise();
        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch data' })
    }
};