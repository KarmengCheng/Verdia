// src/app/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Add this
// import { getAnalytics } from "firebase/analytics"; // optional if not used

const firebaseConfig = {
  apiKey: "AIzaSyA0nMQsP62eLdzOHOAGe86tIvhLNsjEj0c",
  authDomain: "verdia-ai.firebaseapp.com",
  projectId: "verdia-ai",
  storageBucket: "verdia-ai.firebasestorage.app",
  messagingSenderId: "42521555093",
  appId: "1:42521555093:web:b0d9bc75e7eb1a80a56b9c",
  measurementId: "G-DPE2LFZQ3Z",
};

// Prevent re-initialization in dev (Next.js fast refresh)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export the auth instance for use in other files
export const auth = getAuth(app); // ✅ THIS is what you use in auth.ts

// Optional: only if you're using analytics
// const analytics = getAnalytics(app);
