import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User as FirebaseUser,
} from "firebase/auth";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";
import type { UserDoc } from "../types/user";

// Firestore user document path
const usersCollection = "users";

export const authService = {
    // --------------------------------------------------
    // REGISTER
    // --------------------------------------------------
    async register(email: string, password: string): Promise<UserDoc> {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = cred.user;

        const userDoc: UserDoc = {
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            role: "user", // default role
            createdAt: serverTimestamp(),
        };

        await setDoc(doc(db, usersCollection, firebaseUser.uid), userDoc);

        return userDoc;
    },

    // --------------------------------------------------
    // LOGIN
    // --------------------------------------------------
    async login(email: string, password: string): Promise<UserDoc> {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = cred.user;
        return await this.getUserDoc(firebaseUser.uid);
    },

    // --------------------------------------------------
    // LOGOUT
    // --------------------------------------------------
    async logout() {
        await signOut(auth);
    },

    // --------------------------------------------------
    // FETCH USER INFO FROM FIRESTORE
    // --------------------------------------------------
    async getUserDoc(uid: string): Promise<UserDoc> {
        const docRef = doc(db, usersCollection, uid);
        const snap = await getDoc(docRef);

        if (!snap.exists()) {
            throw new Error("User document not found!");
        }

        return snap.data() as UserDoc;
    },

    // --------------------------------------------------
    // LISTENER: AUTH STATE CHANGES
    // --------------------------------------------------
    subscribeToAuthChanges(
        callback: (firebaseUser: FirebaseUser | null) => void
    ) {
        return onAuthStateChanged(auth, callback);
    },
};
