'use strict';

function bearerToken(header) {
    if (typeof header !== 'string') return null;
    var match = header.match(/^Bearer\s+(.+)$/i);
    return match ? match[1].trim() : null;
}

function authenticate(verifyIdToken) {
    return async function (req, res, next) {
        var token = bearerToken(req.get('authorization'));
        if (!token) return res.status(401).json({ error: 'authentication_required' });

        try {
            req.user = await verifyIdToken(token, true);
            return next();
        } catch (error) {
            return res.status(401).json({ error: 'invalid_token' });
        }
    };
}

function requireEditor(req, res, next) {
    var roles = Array.isArray(req.user && req.user.roles) ? req.user.roles : [];
    if (req.user && typeof req.user.role === 'string') roles.push(req.user.role);
    if (!roles.some(function (role) { return role === 'editor' || role === 'admin'; })) {
        return res.status(403).json({ error: 'insufficient_role' });
    }
    return next();
}

module.exports = { authenticate: authenticate, requireEditor: requireEditor, bearerToken: bearerToken };
