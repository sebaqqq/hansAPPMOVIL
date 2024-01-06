import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvp_68rAlsEF02lOfkdaWb94dX9cA5t0k",
  authDomain: "benji-a477c.firebaseapp.com",
  projectId: "benji-a477c",
  storageBucket: "benji-a477c.appspot.com",
  messagingSenderId: "917072874533",
  appId: "1:917072874533:web:f9ea7e7e1730abef8943cc",
  measurementId: "G-86WK4X2BXS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };