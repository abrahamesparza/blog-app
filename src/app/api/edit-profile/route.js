import { NextResponse } from 'next/server';
import dynamoDB from '../lib/dynamodb';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { data, page, username } = await request.json();

        const queryParams = {
            TableName: "users",
            IndexName: "username-index",
            KeyConditionExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": username,
            },
        };

        const queryResult = await dynamoDB.query(queryParams).promise();

        if (queryResult.Items.length === 0) {
            // Item doesn't exist, create it
            const putParams = {
                TableName: "users",
                Item: {
                    id: `${Date.now()}`,
                    username: username,
                    bio: page === "bio" ? data : null,
                    password: page === "password" ? await bcrypt.hash(data, 10) : null,
                },
            };
            await dynamoDB.put(putParams).promise();
            return NextResponse.json({ message: "Item created.", bio: data });
        }
        else {
            // Item exists, update it
            const userId = queryResult.Items[0].id;

            let updateExpression = "SET";
            const expressionAttributeValues = {};

            if (page === "bio") {
                updateExpression += " bio = :bio";
                expressionAttributeValues[":bio"] = data;
            }
            else if (page === "username") {
                updateExpression += " username = :username";
                expressionAttributeValues[":username"] = data;
            }
            else if (page === "password") {
                const hashedPassword = await bcrypt.hash(data, 10);
                updateExpression += " password = :password";
                expressionAttributeValues[":password"] = hashedPassword;
            }
            else {
                return NextResponse.json({ error: "Invalid page value." }, { status: 400 });
            }

            const updateParams = {
                TableName: "users",
                Key: { id: userId },
                UpdateExpression: updateExpression,
                ExpressionAttributeValues: expressionAttributeValues,
                ReturnValues: "UPDATED_NEW",
            };

            const updateResult = await dynamoDB.update(updateParams).promise();
            return NextResponse.json({
                message: "Success",
                updatedField: updateResult.Attributes.bio || updateResult.Attributes.username || updateResult.Attributes.password
            });
        }
    }
    catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}