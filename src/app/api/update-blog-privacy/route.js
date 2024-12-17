import { NextResponse } from "next/server";
import dynamoDB from "../lib/dynamodb";

export async function POST(request) {
    const { updatedPrivacy, userId, blogId } = await request.json();    
    try {
        const getParams = {
            TableName: 'users',
            Key: { id: userId },
            ProjectionExpression: 'blogs'
        };

        const getBlogsResponse = await dynamoDB.get(getParams).promise();
        const blogs = getBlogsResponse.Item?.blogs;

        if (!blogs) return NextResponse.json({ error: 'No blogs found for this user' });

        const blogIndex = blogs.findIndex(blog => blog.id === blogId);
        if (blogIndex === -1) return NextResponse.json({ error: `Error, blog ${blogId} not found` });

        blogs[blogIndex].privacy = updatedPrivacy;
        const updatedBlog = blogs[blogIndex];

        const params = {
            TableName: 'users',
            Key: { id: userId },
            UpdateExpression: 'SET blogs = :blogs',
            ExpressionAttributeValues: {
                ':blogs': blogs, 
            },
            ReturnValues: 'UPDATED_NEW',
        };
        
        await dynamoDB.update(params).promise();
        return NextResponse.json({ message: 'Success', updatedBlog }); 
    } catch (error) {
        console.error('Error updating blog privacy', error);
        return NextResponse.json({ error: 'Error updating blog privacy', details: error });
    }
};