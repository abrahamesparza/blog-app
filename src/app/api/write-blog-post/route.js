import { NextResponse } from "next/server";
import dynamoDB from "../lib/dynamodb";
import { v4 } from 'uuid';

export async function POST(request) {
    try {
        let data = await request.json();
        data.id = v4();
        const username = data.author;
        console.log('username:', username);
        const queryParams = {
            TableName: 'users',
            IndexName: 'username-index',
            KeyConditionExpression: 'username = :username',
            ExpressionAttributeValues: {
                ':username': username
            }
        };
        const queryResult = await dynamoDB.query(queryParams).promise();
        if (!queryResult.Items || queryResult.Items.length === 0) {
            return NextResponse.json({ error: 'User not found' });
        }

        const userId = queryResult.Items[0].id;
        const updateParams = {
            TableName: 'users',
            Key: { id: userId },
            UpdateExpression: `
            SET blogs = list_append(if_not_exists(blogs, :empty_list), :new_blog)
            `,
            ExpressionAttributeValues: {
                ':new_blog': [data],
                ':empty_list': []
            },
            ReturnValues: 'UPDATED_NEW'
        };
        
        const updatedResult = await dynamoDB.update(updateParams).promise();
        return NextResponse.json({ message: 'Success', newBlog: updatedResult })
    }
    catch (error) {
        return NextResponse.json({ error: error.message ||  'Error posting blog data'})
    }
}