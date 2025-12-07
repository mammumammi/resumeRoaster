import { getFirestore } from "firebase-admin/firestore";

var admin = require("firebase-admin");

var serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || '', 'base64').toString('utf-8')
  );

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const adminDb = getFirestore();
