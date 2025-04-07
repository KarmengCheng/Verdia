import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA0nMQsP62eLdzOHOAGe86tIvhLNsjEj0c",
  authDomain: "verdia-ai.firebaseapp.com",
  projectId: "verdia-ai",
  storageBucket: "verdia-ai.firebasestorage.app",
  messagingSenderId: "42521555093",
  appId: "1:42521555093:web:b0d9bc75e7eb1a80a56b9c",
  measurementId: "G-DPE2LFZQ3Z",
};

const app = initializeApp(firebaseConfig);

// ✅ Only call getAnalytics if running in the browser
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) getAnalytics(app);
  });
}

// Export for use in auth.ts
export { app };
