import { getFirestore } from "firebase-admin/firestore";

var admin = require("firebase-admin");

var serviceAccount = require("./../credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const adminDb = getFirestore();
