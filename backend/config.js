'use strict';

function loadConfig(env) {
    var nodeEnv = env.NODE_ENV || 'development';
    var allowedOrigins = (env.ALLOWED_ORIGINS || '')
        .split(',')
        .map(function (value) { return value.trim(); })
        .filter(Boolean);

    if (nodeEnv === 'production' && allowedOrigins.length === 0) {
        throw new Error('ALLOWED_ORIGINS is required in production');
    }
    if (!env.GOOGLE_CLOUD_PROJECT) {
        throw new Error('GOOGLE_CLOUD_PROJECT is required');
    }

    return Object.freeze({
        nodeEnv: nodeEnv,
        port: Number(env.PORT || 8080),
        projectId: env.GOOGLE_CLOUD_PROJECT,
        allowedOrigins: allowedOrigins
    });
}

module.exports = { loadConfig: loadConfig };
