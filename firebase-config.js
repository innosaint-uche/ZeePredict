/* =========================================
   Zeepredict - Firebase Configuration
   =========================================
   This file contains the Firestore config used by the older (v8) Firebase
   namespaced SDK that is loaded via the CDN in index.html (firebase-app.js / firebase-firestore.js).

   IMPORTANT: Do NOT mix this approach with modular `import` statements in the same runtime.
   If you prefer the modular SDK (v9+), move those imports into a separate module file and
   update the app to use the modular API.
   ========================================= */

var ZEEPredictFirebase = {
    // Firebase Web config (paste your own values here if you want to use cloud sync)
    config: {
        apiKey: "AIzaSyCS-AWV0IoidI-RTzThHA7c5H17s-hCESM",
        authDomain: "zeepredict.firebaseapp.com",
        projectId: "zeepredict",
        storageBucket: "zeepredict.firebasestorage.app",
        messagingSenderId: "305238449603",
        appId: "1:305238449603:web:e3116dadf5c1ce0a9fb176",
        measurementId: "G-EPMPJSEQMW"
    },
    initialized: false,
    db: null
};

// Initialize Firebase (v8 namespaced SDK expected)
function initFirebase() {
    var cfg = ZEEPredictFirebase.config;
    if (!cfg || !cfg.apiKey || cfg.apiKey === "YOUR_API_KEY") {
        console.log("⚠️ Firebase not configured. Using localStorage only.");
        return false;
    }
    try {
        if (typeof firebase !== 'undefined' && firebase.initializeApp) {
            // Using the namespaced (v8) SDK which exposes `firebase` globally
            firebase.initializeApp(cfg);
            if (firebase.firestore) {
                ZEEPredictFirebase.db = firebase.firestore();
            }
            ZEEPredictFirebase.initialized = true;
            console.log("✅ Firebase connected (v8 namespaced SDK)!");
            return true;
        } else {
            console.warn("Firebase SDK not found or not the expected namespaced (v8) API. Cloud sync will be disabled.");
            return false;
        }
    } catch (e) {
        console.warn("Firebase init failed:", e);
        return false;
    }
}
