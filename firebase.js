// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2qT1SvHYr7Y9Mfnbegb5jW28s3VqMiFU",
  authDomain: "dbtesis-2fe55.firebaseapp.com",
  projectId: "dbtesis-2fe55",
  storageBucket: "dbtesis-2fe55.appspot.com",
  messagingSenderId: "499310183533",
  appId: "1:499310183533:web:9634f3b46530249f832b64",
  measurementId: "G-MHSXLM2Q4K"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);