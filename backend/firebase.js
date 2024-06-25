const admin = require('firebase-admin');
require('dotenv').config();

admin.initializeApp({
    credential: admin.credential.cert("vantasticplus-firebase-adminsdk-d98um-6b73460b2b.json"),
});

// Get a reference to the Firestore database
exports.db = admin.firestore();