const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const { NextResponse } = require('next/server');

const sessions = {};

function generateSessionId() {
    return crypto.randomBytes(64).toString('hex');
};

function storeSession(sessionId, userData) {
    sessions[sessionId] = {
        data: userData,
        expiry: Date.now() + 3600000
    };
};

function validateSession(req, res, next) {
    const sessionId = req.cookies.sessionId;
    if (!sessionId || !sessions[sessionId]) {
        return NextResponse.json({ message: 'Session validation failed' });
    };

    const session = sessions[sessionId];
    if (Date.now() > session.expiry) {
        delete sessions[sessionId];
        return NextResponse.json({ message: 'Session expired' });
    }

    req.user = session.data;
    next();
};

module.exports = {
    generateSessionId,
    storeSession,
    validateSession
};