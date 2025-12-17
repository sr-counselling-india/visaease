import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  Auth,
  UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const auth: Auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthService = {
  // Login with Email and Password
  loginWithEmail: async (email: string, password: string): Promise<string> => {
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      console.log(userData);
      return userData.user.uid;
    } catch (error) {
      console.error("Error logging in with email:", error);
      throw error;
    }
  },

  // Sign Up with Email and Password
  signupWithEmail: async (email: string, password: string): Promise<string> => {
    try {
      return (await createUserWithEmailAndPassword(auth, email, password)).user
        .uid;
    } catch (error) {
      console.error("Error signing up with email:", error);
      throw error;
    }
  },

  // Login with Google
  loginWithGoogle: async (): Promise<string> => {
    try {
      const data = (await signInWithPopup(auth, googleProvider)).user.uid;
      console.log(data);

      return data;
    } catch (error) {
      console.error("Error logging in with Google:", error);
      throw error;
    }
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },

  // Get User Access Token
  getUserAccessToken: async (
    forceRefresh: boolean = false
  ): Promise<string | null> => {
    const user = auth.currentUser;
    if (user) {
      try {
        return await user.getIdToken(forceRefresh);
      } catch (error) {
        console.error("Error getting access token:", error);
        return null;
      }
    }
    return null;
  },

  // Auth State Observer
  onAuthChange: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Automatically refresh token logic is handled by Firebase SDK internal timer usually,
        // but if we need to explicitly force something we can do it here.
        // For now, standard Firebase behavior ensures user.getIdToken() returns a fresh one if close to expiry.
        callback(user);
      } else {
        callback(null);
      }
    });
  },
};

export { auth, app };
