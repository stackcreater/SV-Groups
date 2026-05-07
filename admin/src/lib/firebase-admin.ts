import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    let credential;
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      credential = admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT));
    } else {
      credential = admin.credential.cert(require('../../firebase-service-account.json'));
    }

    admin.initializeApp({
      credential,
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error);
  }
}

const db = admin.firestore();
export { db };
