/* =========================================
   Zeepredict - Firebase Sync Layer
   Syncs predictions with Cloud Firestore.
   Falls back to localStorage if Firebase
   is not configured or unavailable.
   ========================================= */

var ZEESync = {
    collectionName: "predictions",
    
    // Save all tips to Firestore
    saveToCloud: function(tips) {
        if (!ZEEPredictFirebase.initialized) return false;
        var db = ZEEPredictFirebase.db;
        
        tips.forEach(function(tip) {
            db.collection(ZEESync.collectionName)
              .doc(tip.id)
              .set(tip)
              .catch(function(err) {
                  console.warn("Firestore save error:", err);
              });
        });
        return true;
    },

    // Load all tips from Firestore
    loadFromCloud: function(callback) {
        if (!ZEEPredictFirebase.initialized) {
            callback(null);
            return;
        }
        var db = ZEEPredictFirebase.db;
        
        db.collection(ZEESync.collectionName)
          .get()
          .then(function(querySnapshot) {
              var tips = [];
              querySnapshot.forEach(function(doc) {
                  tips.push(doc.data());
              });
              callback(tips);
          })
          .catch(function(err) {
              console.warn("Firestore load error:", err);
              callback(null);
          });
    },

    // Delete a tip from Firestore
    deleteFromCloud: function(tipId) {
        if (!ZEEPredictFirebase.initialized) return false;
        ZEEPredictFirebase.db
            .collection(ZEESync.collectionName)
            .doc(tipId)
            .delete()
            .catch(function(err) {
                console.warn("Firestore delete error:", err);
            });
        return true;
    }
};
