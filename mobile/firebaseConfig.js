// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC8pIRW5AuZUmavm3NciJVXNP6TmFnDiZQ",
  authDomain: "fazil-11f23.firebaseapp.com",
  projectId: "fazil-11f23",
  storageBucket: "fazil-11f23.firebasestorage.app",
  messagingSenderId: "304143719817",
  appId: "1:304143719817:web:3e722ad39ebb30169b1558"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);