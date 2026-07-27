/* =========================================
   Zeepredict - Firebase Configuration
   =========================================
   To activate cloud storage:
   1. Go to https://console.firebase.google.com/
   2. Create a new project (or use existing)
   3. Enable "Cloud Firestore" → Create database
   4. Go to Project Settings → "Add app" → Web
   5. Copy the config object and paste below
   6. Replace the placeholder values
   ========================================= */

var ZEEPredictFirebase = {
    // 🔥 PASTE YOUR FIREBASE CONFIG HERE:
    config: {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    },
    initialized: false,
    db: null
};

// Initialize Firebase
function initFirebase() {
    var cfg = ZEEPredictFirebase.config;
    if (cfg.apiKey === "YOUR_API_KEY") {
        console.log("⚠️ Firebase not configured. Using localStorage only.");
        return false;
    }
    try {
        firebase.initializeApp(cfg);
        ZEEPredictFirebase.db = firebase.firestore();
        ZEEPredictFirebase.initialized = true;
        console.log("✅ Firebase connected!");
        return true;
    } catch (e) {
        console.warn("Firebase init failed:", e);
        return false;
    }
}
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCS-AWV0IoidI-RTzThHA7c5H17s-hCESM",
    authDomain: "zeepredict.firebaseapp.com",
    projectId: "zeepredict",
    storageBucket: "zeepredict.firebasestorage.app",
    messagingSenderId: "305238449603",
    appId: "1:305238449603:web:e3116dadf5c1ce0a9fb176",
    measurementId: "G-EPMPJSEQMW"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
