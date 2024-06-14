
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBm-mZAXmNRmhbHjXNL_1qHWQ3sBN2sp_4",
  authDomain: "video-86dc1.firebaseapp.com",
  projectId: "video-86dc1",
  storageBucket: "video-86dc1.appspot.com",
  messagingSenderId: "344493502954",
  appId: "1:344493502954:web:9a6307dfd6ad46aaf0c293"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth()
export const provider= new GoogleAuthProvider();

export default app;
