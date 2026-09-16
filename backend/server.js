'use strict';

var initializeApp = require('firebase-admin/app').initializeApp;
var applicationDefault = require('firebase-admin/app').applicationDefault;
var getAuth = require('firebase-admin/auth').getAuth;
var firestoreAdmin = require('firebase-admin/firestore');
var loadConfig = require('./config').loadConfig;
var createApp = require('./app').createApp;
var createFirestoreRepository = require('./firestore-repository').createFirestoreRepository;

var config = loadConfig(process.env);

initializeApp({
    credential: applicationDefault(),
    projectId: config.projectId
});

var repository = createFirestoreRepository(
    firestoreAdmin.getFirestore(),
    firestoreAdmin.FieldValue
);

var app = createApp({
    repository: repository,
    verifyIdToken: function (token, checkRevoked) {
        return getAuth().verifyIdToken(token, checkRevoked);
    },
    allowedOrigins: config.allowedOrigins
});

var server = app.listen(config.port, function () {
    console.log('ZeePredict API listening on port ' + config.port);
});

function shutdown(signal) {
    console.log(signal + ' received, shutting down');
    server.close(function () { process.exit(0); });
    setTimeout(function () { process.exit(1); }, 10000).unref();
}

process.on('SIGTERM', function () { shutdown('SIGTERM'); });
process.on('SIGINT', function () { shutdown('SIGINT'); });
