'use strict';

function serialiseTimestamp(value) {
    return value && typeof value.toDate === 'function' ? value.toDate().toISOString() : value;
}

function publicRecord(doc) {
    var data = doc.data();
    return {
        id: doc.id,
        match: data.match,
        prediction: data.prediction,
        odds: data.odds,
        league: data.league,
        writeup: data.writeup,
        kickoffAt: serialiseTimestamp(data.kickoffAt),
        sourceUrls: data.sourceUrls,
        modelVersion: data.modelVersion,
        confidence: data.confidence,
        publishedAt: serialiseTimestamp(data.publishedAt)
    };
}

function createFirestoreRepository(db, fieldValue) {
    return {
        listPublished: async function (limit) {
            var snapshot = await db.collection('publishedPredictions')
                .orderBy('publishedAt', 'desc')
                .limit(limit)
                .get();
            return snapshot.docs.map(publicRecord);
        },

        create: async function (prediction, actor) {
            var collection = prediction.status === 'published' ? 'publishedPredictions' : 'predictionDrafts';
            var predictionRef = db.collection(collection).doc();
            var auditRef = db.collection('auditEvents').doc();
            var record = Object.assign({}, prediction, {
                kickoffAt: new Date(prediction.kickoffAt),
                createdAt: fieldValue.serverTimestamp(),
                createdBy: actor.uid,
                version: 1
            });
            if (prediction.status === 'published') record.publishedAt = fieldValue.serverTimestamp();

            await db.runTransaction(async function (transaction) {
                transaction.create(predictionRef, record);
                transaction.create(auditRef, {
                    action: prediction.status === 'published' ? 'prediction.published' : 'prediction.draft_created',
                    actorUid: actor.uid,
                    predictionId: predictionRef.id,
                    occurredAt: fieldValue.serverTimestamp(),
                    version: 1
                });
            });

            return { id: predictionRef.id, status: prediction.status };
        }
    };
}

module.exports = { createFirestoreRepository: createFirestoreRepository };
