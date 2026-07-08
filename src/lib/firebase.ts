// Firebase Client SDK for Google Authentication
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// 🔥 THIKANA Firebase Configuration (Real)
const firebaseConfig = {
  apiKey: "AIzaSyAh28xOTnbj0DD6AJDd_tiTugZ8kasy7tw",
  authDomain: "thikana-app-485ff.firebaseapp.com",
  databaseURL: "https://thikana-app-485ff-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thikana-app-485ff",
  storageBucket: "thikana-app-485ff.firebasestorage.app",
  messagingSenderId: "1092519449225",
  appId: "1:1092519449225:web:55025a11ffb8f22c85ec58",
  measurementId: "G-5LYPH81HM1"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Google Sign-In function — REAL implementation
export async function signInWithGoogle() {
  try {
    // Force account selection every time (better UX for multiple accounts)
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });

    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;

    // Get Google OAuth access token (optional, for backend verification)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    return {
      success: true,
      googleId: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || '',
      photoUrl: firebaseUser.photoURL || '',
      accessToken: accessToken || '',
    };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    
    // Specific error codes for better UX
    const errorCode = error.code;
    let errorMessage = 'Google login failed. Please try again.';
    
    if (errorCode === 'auth/popup-closed-by-user') {
      errorMessage = 'Login popup was closed. Please try again.';
    } else if (errorCode === 'auth/cancelled-popup-request') {
      errorMessage = 'Another login is in progress. Please wait.';
    } else if (errorCode === 'auth/account-exists-with-different-credential') {
      errorMessage = 'An account already exists with the same email address.';
    } else if (errorCode === 'auth/network-request-failed') {
      errorMessage = 'Network error. Please check your internet connection.';
    }

    return {
      success: false,
      error: errorMessage,
      errorCode: errorCode,
    };
  }
}