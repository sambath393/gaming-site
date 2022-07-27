import admin from 'firebase-admin';
import serviceAccount from '../../gaming-bot-c3d43-firebase-adminsdk-gomn2-7311677e79.json';

const config = {
  activeVersion: process.env.DB_VERSION_ACTIVE || 'dev',
};

if (admin.apps.length <= 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://gaming-bot-c3d43-default-rtdb.firebaseio.com',
    storageBucket: 'gs://gaming-bot-c3d43.appspot.com',
  });
}

export const firebase = admin;
export const auth = admin.auth();
export const db = admin.firestore();
export const col = admin.firestore().collection('version').doc(config.activeVersion);
export const storage = admin.storage().bucket();
