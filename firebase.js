import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2qT1SvHYr7Y9Mfnbegb5jW28s3VqMiFU",
  authDomain: "dbtesis-2fe55.firebaseapp.com",
  projectId: "dbtesis-2fe55",
  storageBucket: "dbtesis-2fe55.appspot.com",
  messagingSenderId: "499310183533",
  appId: "1:499310183533:web:9634f3b46530249f832b64",
  measurementId: "G-MHSXLM2Q4K",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
