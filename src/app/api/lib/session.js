import dynamoDB from './dynamodb';

const crypto = require('crypto');
const { NextResponse } = require('next/server');


function generateSessionId() {
    return crypto.randomBytes(64).toString('hex');
};

async function storeSession(sessionId, userData) {
    const params = {
        TableName: 'sessions',
        Item: {
            sessionId,
            data: userData,
            expiry: Date.now() * 3600000,
        }
    };
    try {
        await dynamoDB.put(params).promise();
    } catch (error) {
        console.error('Error storing session', error);
    }
};

async function getSession(sessionId) {
    const params = {
        TableName: 'sessions',
        Key: { sessionId },
    };

    try {
        const result = await dynamoDB.get(params).promise();
        const session = result.Item;

        if (session && session.expiry > Date.now()) {
            return session;
        } else {
            if (session) {
                await deleteSession(sessionId)
            }
            return null;
        }
    } catch (error) {
        console.error('Error retrieving session', error)
    }
}

async function deleteSession(sessionId) {
    const params = {
        TableName: 'sessions',
        Key: { sessionId },
    };

    try {
        await dynamoDB.delete(params).promise();
    } catch (error) {
        console.error('Error deleting session', error);
    }

}

async function validateSession(req, res, next) {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
        return NextResponse.json({ message: 'Session validation failed' }, { status: 401 });
    }

    try {
        const params = {
            TableName: 'sessions',
            Key: { sessionId },
        };

        const result = await dynamoDB.get(params).promise();

        const session = result.Item;

        if (!session) {
            return NextResponse.json({ message: 'Session not found' }, { status: 401 });
        }

        if (Date.now() > session.expiry) {
            await dynamoDB.delete(params).promise();
            return NextResponse.json({ message: 'Session expired' }, { status: 401 });
        }

        req.user = session.data;
        next();
    } catch (error) {
        console.error('Error validating session:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
};

module.exports = {
    generateSessionId,
    storeSession,
    validateSession,
    getSession,
};