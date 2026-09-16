'use strict';

var crypto = require('node:crypto');
var express = require('express');
var helmet = require('helmet');
var cors = require('cors');
var rateLimit = require('express-rate-limit').rateLimit;
var auth = require('./auth');
var validatePrediction = require('./validation').validatePrediction;

function createApp(options) {
    if (!options || !options.repository || typeof options.verifyIdToken !== 'function') {
        throw new Error('repository and verifyIdToken are required');
    }

    var allowedOrigins = options.allowedOrigins || [];
    var app = express();
    app.disable('x-powered-by');
    app.use(function requestId(req, res, next) {
        req.id = crypto.randomUUID();
        res.set('x-request-id', req.id);
        next();
    });
    app.use(helmet());
    app.use(cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
            var error = new Error('origin_not_allowed');
            error.status = 403;
            return callback(error);
        },
        methods: ['GET', 'POST'],
        allowedHeaders: ['Authorization', 'Content-Type'],
        maxAge: 86400
    }));
    app.use(express.json({ limit: '16kb', strict: true }));

    app.use('/api', rateLimit({
        windowMs: 60 * 1000,
        limit: 120,
        standardHeaders: 'draft-8',
        legacyHeaders: false
    }));

    app.get('/health', function (req, res) {
        res.json({ status: 'ok' });
    });

    app.get('/api/v1/predictions', async function (req, res, next) {
        try {
            var requested = Number.parseInt(req.query.limit, 10);
            var limit = Number.isFinite(requested) ? Math.min(Math.max(requested, 1), 100) : 25;
            var predictions = await options.repository.listPublished(limit);
            res.json({ data: predictions, count: predictions.length });
        } catch (error) {
            next(error);
        }
    });

    var adminLimiter = rateLimit({ windowMs: 60 * 1000, limit: 20, standardHeaders: 'draft-8', legacyHeaders: false });
    app.post(
        '/api/v1/admin/predictions',
        adminLimiter,
        auth.authenticate(options.verifyIdToken),
        auth.requireEditor,
        async function (req, res, next) {
            var result = validatePrediction(req.body);
            if (!result.ok) return res.status(400).json({ error: 'validation_failed', details: result.errors });

            try {
                var created = await options.repository.create(result.value, { uid: req.user.uid });
                return res.status(201).json({ data: created });
            } catch (error) {
                return next(error);
            }
        }
    );

    app.use(function notFound(req, res) {
        res.status(404).json({ error: 'not_found' });
    });

    app.use(function errorHandler(error, req, res, next) {
        if (res.headersSent) return next(error);
        var status = Number.isInteger(error.status) ? error.status : 500;
        var body = { error: status === 500 ? 'internal_error' : error.message, requestId: req.id };
        return res.status(status).json(body);
    });

    return app;
}

module.exports = { createApp: createApp };
