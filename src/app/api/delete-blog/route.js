import { NextResponse } from "next/server";
import dynamoDB from "../lib/dynamodb";

export async function POST(request) {
    const { userId, blogId } = await request.json();
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
        blogs.splice(blogIndex, 1);

        const updateParams = {
            TableName: 'users',
            Key: { id: userId },
            UpdateExpression: 'SET blogs = :updatedBlogs',
            ExpressionAttributeValues: {
                ':updatedBlogs': blogs
            }
        };

        await dynamoDB.update(updateParams).promise();

        return NextResponse.json({ message: 'Success' });
    }
    catch (error) {
        return NextResponse.json({ error: 'Error deleting blog '});
    }
}