'use strict';

var test = require('node:test');
var assert = require('node:assert/strict');
var fs = require('node:fs');
var path = require('node:path');

var root = path.resolve(__dirname, '..');
var publicPages = ['index.html', 'predictions.html', 'game-of-the-day.html', 'odds-5.html', 'odds-10.html', 'odds-50.html'];

test('all public product pages disclose demo and 18+ status', function () {
    publicPages.forEach(function (file) {
        var source = fs.readFileSync(path.join(root, file), 'utf8');
        assert.match(source, /demo-banner/);
        assert.match(source, /18\+/);
        assert.match(source, /responsible-use\.html/);
        assert.doesNotMatch(source, /firebasejs|firebase-config|firebase-sync/i);
        assert.doesNotMatch(source, /win[ -]?rate|accurate daily|most confident/i);
    });
});

test('prediction data is demo-only and has no mutation API', function () {
    var source = fs.readFileSync(path.join(root, 'predictions-data.js'), 'utf8');
    assert.match(source, /demo-read-only/);
    assert.match(source, /isDemo: true/);
    assert.doesNotMatch(source, /addTip|deleteTip|updateTipStatus|localStorage|ZEESync/);
});

test('public client admin and Firebase bootstrap files are absent', function () {
    ['admin.html', 'firebase-config.js', 'firebase-sync.js', 'archive/views-admin.html', 'views/admin.html'].forEach(function (file) {
        assert.equal(fs.existsSync(path.join(root, file)), false, file + ' must not be deployable');
    });
});

test('Firestore remains deny-by-default', function () {
    var rules = fs.readFileSync(path.join(root, 'firestore.rules'), 'utf8');
    assert.match(rules, /match \/\{document=\*\*\}/);
    assert.match(rules, /allow read, write: if false/);
    assert.doesNotMatch(rules, /if true/);
});

test('interim legal and responsible-use pages exist', function () {
    ['responsible-use.html', 'terms.html', 'privacy.html'].forEach(function (file) {
        var source = fs.readFileSync(path.join(root, file), 'utf8');
        assert.match(source, /18\+/);
    });
});
