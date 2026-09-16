'use strict';

var test = require('node:test');
var assert = require('node:assert/strict');
var request = require('supertest');
var createApp = require('../backend/app').createApp;

function validPrediction(overrides) {
    return Object.assign({
        match: 'Rivers United vs Enyimba',
        prediction: 'Over 1.5 goals',
        odds: 1.72,
        league: 'NPFL',
        writeup: 'Model-backed editorial explanation with enough detail for review.',
        kickoffAt: '2099-10-01T16:00:00.000Z',
        status: 'published',
        sourceUrls: ['https://example.com/source'],
        modelVersion: 'model-2026-09',
        confidence: 0.61
    }, overrides || {});
}

function fixture(role) {
    var created = [];
    var repository = {
        listPublished: async function (limit) { return [{ id: 'one', limit: limit }]; },
        create: async function (prediction, actor) {
            created.push({ prediction: prediction, actor: actor });
            return { id: 'created-1', status: prediction.status };
        }
    };
    var app = createApp({
        repository: repository,
        allowedOrigins: ['https://zeepredict.example'],
        verifyIdToken: async function (token) {
            if (token === 'invalid') throw new Error('bad token');
            return { uid: 'user-1', role: role || 'viewer' };
        }
    });
    return { app: app, created: created };
}

test('health route exposes no framework signature', async function () {
    var response = await request(fixture().app).get('/health').expect(200);
    assert.deepEqual(response.body, { status: 'ok' });
    assert.equal(response.headers['x-powered-by'], undefined);
    assert.match(response.headers['content-security-policy'], /default-src/);
    assert.ok(response.headers['x-request-id']);
});

test('public route returns published repository records and clamps the limit', async function () {
    var response = await request(fixture().app).get('/api/v1/predictions?limit=999').expect(200);
    assert.equal(response.body.data[0].limit, 100);
    assert.equal(response.body.count, 1);
});

test('CORS rejects an origin outside the allowlist', async function () {
    var response = await request(fixture().app).get('/api/v1/predictions').set('Origin', 'https://evil.example').expect(403);
    assert.equal(response.body.error, 'origin_not_allowed');
});

test('admin route requires authentication and an editor role', async function () {
    await request(fixture('editor').app).post('/api/v1/admin/predictions').send(validPrediction()).expect(401);
    await request(fixture('viewer').app).post('/api/v1/admin/predictions').set('Authorization', 'Bearer valid').send(validPrediction()).expect(403);
    await request(fixture('editor').app).post('/api/v1/admin/predictions').set('Authorization', 'Bearer invalid').send(validPrediction()).expect(401);
});

test('editor can create a validated immutable prediction record', async function () {
    var context = fixture('editor');
    var response = await request(context.app)
        .post('/api/v1/admin/predictions')
        .set('Authorization', 'Bearer valid')
        .set('Origin', 'https://zeepredict.example')
        .send(validPrediction())
        .expect(201);

    assert.deepEqual(response.body.data, { id: 'created-1', status: 'published' });
    assert.equal(context.created.length, 1);
    assert.equal(context.created[0].actor.uid, 'user-1');
});

test('invalid fields are rejected and published records cannot be updated or deleted', async function () {
    var app = fixture('admin').app;
    var invalid = validPrediction({ confidence: 5, unexpected: true });
    var response = await request(app).post('/api/v1/admin/predictions').set('Authorization', 'Bearer valid').send(invalid).expect(400);
    assert.equal(response.body.error, 'validation_failed');
    assert.ok(response.body.details.some(function (detail) { return detail.includes('unknown field'); }));
    await request(app).patch('/api/v1/admin/predictions/one').set('Authorization', 'Bearer valid').send({}).expect(404);
    await request(app).delete('/api/v1/admin/predictions/one').set('Authorization', 'Bearer valid').expect(404);
});
