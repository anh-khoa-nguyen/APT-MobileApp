import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Không cần cho React Native

const firebaseConfig = {
  apiKey: "AIzaSyCjGf8g8XMm-t1R9dlpndqil5AJh3HCIH8",
  authDomain: "chatapp-7092c.firebaseapp.com",
  projectId: "chatapp-7092c",
  storageBucket: "chatapp-7092c.firebasestorage.app",
  messagingSenderId: "368316514401",
  appId: "1:368316514401:web:ec5a85ccaaa7ec16deaa20",
  measurementId: "G-LVWPGTM584"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { app, database };