import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const env = (import.meta as any).env;

export const isFirebaseConfigured = Boolean(
  env.VITE_FIREBASE_API_KEY && 
  env.VITE_FIREBASE_PROJECT_ID &&
  !env.VITE_FIREBASE_API_KEY.includes("your_actual_key") &&
  !env.VITE_FIREBASE_PROJECT_ID.includes("your_project")
);

const getEnv = (key: string) => {
  try {
    return (import.meta as any).env[key];
  } catch (e) {
    return undefined;
  }
};

const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY"),
  authDomain: getEnv("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: getEnv("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: getEnv("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: getEnv("VITE_FIREBASE_APP_ID"),
};

// Initialize Firebase only if configured
const app = isFirebaseConfigured && !getApps().length ? initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : ({} as any);
export const db = app ? getFirestore(app) : ({} as any);
export const storage = app ? getStorage(app) : ({} as any);
