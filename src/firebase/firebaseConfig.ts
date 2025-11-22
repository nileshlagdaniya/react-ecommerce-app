import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBFg2oE-jeY_Trz11X7NApccNf03lQHTy4",
    authDomain: "react-ecommerce-app-df71f.firebaseapp.com",
    projectId: "react-ecommerce-app-df71f",
    storageBucket: "react-ecommerce-app-df71f.firebasestorage.app",
    messagingSenderId: "95618695358",
    appId: "1:95618695358:web:297a1fac32539b927fdeef",
    measurementId: "G-4DZ45EB636"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)

export default app;
