import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDkhDy7RVN0GzL16NVnkb18mBc2rqJNAcE",
  authDomain: "videosharing-d43f5.firebaseapp.com",
  projectId: "videosharing-d43f5",
  storageBucket: "videosharing-d43f5.appspot.com",
  messagingSenderId: "520710751456",
  appId: "1:520710751456:web:d8117596142145295c7c85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth()
export const provider= new GoogleAuthProvider()
export default app;