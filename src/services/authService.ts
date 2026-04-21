import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export const signUp = async (email: string, password: string) => {
  if (!isFirebaseConfigured) return { user: { uid: "mock-user-1", email } };
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
  if (!isFirebaseConfigured) return { user: { uid: "mock-user-1", email } };
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
  if (!isFirebaseConfigured) return { user: { uid: "mock-user-1", email: "mock@google.com" } };
  return await signInWithPopup(auth, googleProvider);
};

export const signOutUser = async () => {
  if (!isFirebaseConfigured) return;
  return await signOut(auth);
};
