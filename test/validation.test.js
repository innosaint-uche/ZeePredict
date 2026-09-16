'use strict';

var test = require('node:test');
var assert = require('node:assert/strict');
var validatePrediction = require('../backend/validation').validatePrediction;

test('published prediction requires evidence and model provenance', function () {
    var result = validatePrediction({
        match: 'Team A vs Team B', prediction: 'Home win', odds: 2.1, league: 'League',
        writeup: 'A sufficiently long explanation for editorial review.',
        kickoffAt: '2099-10-01T16:00:00Z', status: 'published', sourceUrls: [],
        modelVersion: '', confidence: 0.5
    });
    assert.equal(result.ok, false);
    assert.ok(result.errors.includes('published predictions require at least one source URL'));
    assert.ok(result.errors.includes('published predictions require modelVersion'));
});

test('validator normalises accepted input', function () {
    var result = validatePrediction({
        match: '  Team A   vs Team B  ', prediction: ' Home win ', odds: '2.10', league: ' League ',
        writeup: ' A sufficiently long explanation for editorial review. ',
        kickoffAt: '2099-10-01T16:00:00Z', status: 'draft', sourceUrls: [],
        modelVersion: '', confidence: 0.5
    });
    assert.equal(result.ok, true);
    assert.equal(result.value.match, 'Team A vs Team B');
    assert.equal(result.value.odds, 2.1);
});

test('published prediction cannot be backfilled after kickoff', function () {
    var result = validatePrediction({
        match: 'Team A vs Team B', prediction: 'Home win', odds: 2.1, league: 'League',
        writeup: 'A sufficiently long explanation for editorial review.',
        kickoffAt: '2020-01-01T16:00:00Z', status: 'published',
        sourceUrls: ['https://example.com/source'], modelVersion: 'model-1', confidence: 0.5
    });
    assert.equal(result.ok, false);
    assert.ok(result.errors.includes('published predictions require a future kickoffAt'));
});
