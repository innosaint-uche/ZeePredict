'use strict';

var ALLOWED_FIELDS = new Set([
    'match', 'prediction', 'odds', 'league', 'writeup', 'kickoffAt',
    'status', 'sourceUrls', 'modelVersion', 'confidence'
]);

function cleanString(value) {
    return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}

function validHttpsUrl(value) {
    try {
        return new URL(value).protocol === 'https:';
    } catch (error) {
        return false;
    }
}

function validIsoDate(value) {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && !Number.isNaN(Date.parse(value));
}

function validatePrediction(input) {
    var errors = [];
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
        return { ok: false, errors: ['body must be a JSON object'] };
    }

    Object.keys(input).forEach(function (key) {
        if (!ALLOWED_FIELDS.has(key)) errors.push('unknown field: ' + key);
    });

    var value = {
        match: cleanString(input.match),
        prediction: cleanString(input.prediction),
        league: cleanString(input.league),
        writeup: cleanString(input.writeup),
        kickoffAt: cleanString(input.kickoffAt),
        status: cleanString(input.status),
        modelVersion: cleanString(input.modelVersion),
        odds: Number(input.odds),
        confidence: Number(input.confidence),
        sourceUrls: Array.isArray(input.sourceUrls) ? input.sourceUrls.map(cleanString) : []
    };

    if (value.match.length < 3 || value.match.length > 160) errors.push('match must be 3 to 160 characters');
    if (value.prediction.length < 3 || value.prediction.length > 160) errors.push('prediction must be 3 to 160 characters');
    if (value.league.length < 2 || value.league.length > 100) errors.push('league must be 2 to 100 characters');
    if (value.writeup.length < 20 || value.writeup.length > 3000) errors.push('writeup must be 20 to 3000 characters');
    if (!Number.isFinite(value.odds) || value.odds < 1.01 || value.odds > 1000) errors.push('odds must be between 1.01 and 1000');
    if (!validIsoDate(value.kickoffAt)) errors.push('kickoffAt must be a valid ISO date-time with timezone');
    if (value.status !== 'draft' && value.status !== 'published') errors.push('status must be draft or published');
    if (!Array.isArray(input.sourceUrls) || value.sourceUrls.length > 10 || value.sourceUrls.some(function (url) { return !validHttpsUrl(url); })) errors.push('sourceUrls must contain at most 10 HTTPS URLs');
    if (value.modelVersion.length > 80) errors.push('modelVersion must not exceed 80 characters');
    if (!Number.isFinite(value.confidence) || value.confidence < 0 || value.confidence > 1) errors.push('confidence must be between 0 and 1');

    if (value.status === 'published') {
        if (value.sourceUrls.length === 0) errors.push('published predictions require at least one source URL');
        if (!value.modelVersion) errors.push('published predictions require modelVersion');
        if (validIsoDate(value.kickoffAt) && Date.parse(value.kickoffAt) <= Date.now()) errors.push('published predictions require a future kickoffAt');
    }

    return errors.length ? { ok: false, errors: errors } : { ok: true, value: value };
}

module.exports = { validatePrediction: validatePrediction };
