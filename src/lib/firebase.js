import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'demo-sender',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'demo-app',
};

let app;
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (error) {
    console.warn('Firebase init error (using demo mode):', error.message);
  }
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
